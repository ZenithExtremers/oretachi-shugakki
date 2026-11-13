// 問題データのチェック
//   node tools/verify.mjs          … 全科目をチェック（C++ は g++ でコンパイル・実行して答えを確認）
//   node tools/verify.mjs ccpp     … 科目を指定
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import subjects from '../data/subjects.js';

const only = process.argv[2];
let errors = 0, groups = 0, questions = 0, runs = 0;
const err = (where, msg) => { errors++; console.log(`✗ ${where}: ${msg}`); };
const tmp = mkdtempSync(join(tmpdir(), 'verify-'));

for (const meta of subjects) {
  if (only && meta.id !== only) continue;
  const subj = (await import('../data/' + meta.module.replace(/^\.\//, ''))).default;
  const ids = new Set();
  const counts = {};
  for (const g of subj.groups) {
    groups++;
    const where = g.id;
    if (ids.has(g.id)) err(where, 'group id が重複'); ids.add(g.id);
    if (!subj.lectures[g.lecture]) err(where, `lecture ${g.lecture} が未定義`);
    if (!subj.types[g.type]) err(where, `type ${g.type} が未定義`);
    const lines = g.code ? g.code.split('\n') : [];
    for (const q of g.questions) {
      questions++;
      const w = `${where}/${q.id}`;
      if (ids.has(q.id)) err(w, 'question id が重複'); ids.add(q.id);
      const ch = q.choices || g.sharedChoices;
      if (!ch || ch.length !== 5) err(w, '選択肢が5つでない');
      else if (new Set(ch).size !== 5) err(w, '選択肢に同じものがある');
      if (!(q.answer >= 0 && q.answer < 5)) err(w, 'answer が範囲外');
      if (!q.exp) err(w, '解説(exp)が無い');
      if (q.line) {
        const l = lines[q.line - 1];
        if (l === undefined) err(w, `${q.line}行目が無い`);
        else if (q.lineHas && !l.includes(q.lineHas)) err(w, `${q.line}行目に "${q.lineHas}" が無い → "${l.trim()}"`);
      }
      const src = g.source || 'original';
      const key = `${src} L${g.lecture}`;
      counts[key] = (counts[key] || 0) + 1;
    }
    // 実行チェック
    if (g.run && subj.lang === 'cpp') {
      let src = g.code;
      const holes = (src.match(/\?{8}/g) || []).length;
      if (holes !== (g.fill || []).length) { err(where, `???????? が ${holes} 個なのに fill が ${(g.fill || []).length} 個`); continue; }
      for (const f of g.fill || []) src = src.replace('????????', f);
      const cpp = join(tmp, g.id + '.cpp'), exe = join(tmp, g.id);
      writeFileSync(cpp, src);
      try { execFileSync('g++', ['-std=c++17', '-o', exe, cpp], { stdio: 'pipe' }); }
      catch (e) { err(where, 'コンパイルエラー\n' + e.stderr); continue; }
      for (const r of g.run) {
        runs++;
        let out;
        try { out = execFileSync(exe, { input: r.stdin, timeout: 3000 }).toString(); }
        catch (e) { err(where, `実行エラー (stdin=${JSON.stringify(r.stdin)})`); continue; }
        for (const c of r.contains || []) if (!out.includes(c)) err(where, `出力に ${JSON.stringify(c)} が無い\n--- 出力 ---\n${out}`);
        for (const c of r.notContains || []) if (out.includes(c)) err(where, `出力に ${JSON.stringify(c)} がある`);
      }
    }
  }
  console.log(`[${meta.id}]`, Object.entries(counts).sort().map(([k, v]) => `${k}:${v}`).join('  '));
}
console.log(`\n${groups} 大問 / ${questions} 問 / 実行チェック ${runs} 件 / エラー ${errors} 件`);
process.exit(errors ? 1 : 0);
