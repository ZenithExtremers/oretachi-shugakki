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

// ---- SQL（MariaDB）----
function sqlType(vals) {
  const v = vals.filter((x) => x !== null);
  if (v.length && v.every((x) => typeof x === 'number' && Number.isInteger(x))) return 'INT';
  if (v.length && v.every((x) => typeof x === 'number')) return 'DECIMAL(10,2)';
  if (v.length && v.every((x) => /^\d{4}-\d{2}-\d{2}$/.test(x))) return 'DATE';
  return 'VARCHAR(100)';
}
const lit = (x) => (x === null ? 'NULL' : typeof x === 'number' ? String(x) : `'${String(x).replace(/'/g, "''")}'`);
function setupSQL(tables) {
  return tables.map((t) => {
    const types = t.cols.map((c, i) => (t.types && t.types[i]) || sqlType(t.rows.map((r) => r[i])));
    return `DROP TABLE IF EXISTS \`${t.name}\`; CREATE TABLE \`${t.name}\` (${t.cols.map((c, i) => `\`${c}\` ${types[i]}`).join(', ')});` +
      (t.rows.length ? ` INSERT INTO \`${t.name}\` VALUES ${t.rows.map((r) => `(${r.map(lit).join(', ')})`).join(', ')};` : '');
  }).join('\n');
}
function runSQL(tables, sql) {
  const input = 'CREATE DATABASE IF NOT EXISTS verify; USE verify;\n' + setupSQL(tables) + '\n' + sql;
  const out = execFileSync('mariadb', ['-uroot', '-B', '--default-character-set=utf8mb4'], { input, stdio: ['pipe', 'pipe', 'pipe'] }).toString();
  const lines = out.replace(/\n$/, '').split('\n');
  return lines.map((l) => l.split('\t').join('|')).join('\n');
}
const norm = (t) => t.split('\n').map((l) => l.split('|').map((c) => c.trim()).join('|')).join('\n');
function checkSQL(where, tables, sql, expect) {
  runs++;
  let got;
  try { got = runSQL(tables, sql); } catch (e) { err(where, `SQLエラー: ${sql}\n${e.stderr}`); return; }
  if (got === '' && norm(expect).split('\n').length === 1) return norm(expect); // 0行（MariaDB は見出しも出さない）
  if (norm(got) !== norm(expect)) err(where, `SQLの結果が違う\n${sql}\n--- 実際 ---\n${got}\n--- 正解の選択肢 ---\n${expect}`);
  return got;
}

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
      if (!ch || ch.length !== (subj.choices || 5)) err(w, `選択肢が${subj.choices || 5}つでない`);
      else if (new Set(ch.map((c) => (q.tableChoices || g.tableChoices ? norm(c) : c))).size !== ch.length) err(w, '選択肢に同じものがある');
      const qsql = q.sql || ((q.lang || g.lang) === 'sql' && (q.tableChoices || g.tableChoices) ? q.code : null);
      if (qsql && g.tables) {
        const got = checkSQL(w, g.tables, qsql, ch[q.answer]);
        if (got !== undefined) ch.forEach((c, i) => { if (i !== q.answer && norm(c) === norm(got)) err(w, `不正解の選択肢(${i})も実際の結果と同じ`); });
      }
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
    for (const c of g.checks || []) checkSQL(where + ' checks', g.tables, c.sql, c.expect);
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
  for (const l of subj.lessons || []) {
    const where = l.id;
    if (ids.has(l.id)) err(where, 'lesson id が重複'); ids.add(l.id);
    if (!subj.lectures[l.lecture]) err(where, `lecture ${l.lecture} が未定義`);
    if (!l.blocks?.length) err(where, '説明(blocks)が無い');
    l.questions.forEach((q, i) => {
      const w = `${where}/Q${i + 1}`;
      if (!q.choices || q.choices.length < 2 || q.choices.length > 5) err(w, '選択肢が2〜5つでない');
      else if (new Set(q.choices).size !== q.choices.length) err(w, '選択肢に同じものがある');
      if (!(q.answer >= 0 && q.answer < (q.choices || []).length)) err(w, 'answer が範囲外');
      if (!q.exp) err(w, '解説が無い');
      if (q.sql && (q.tables || l.tables)) checkSQL(w, q.tables || l.tables, q.sql, q.choices[q.answer]);
    });
    if (l.run && subj.lang === 'cpp') {
      for (const r of l.run) {
        const cpp = join(tmp, l.id + '.cpp'), exe = join(tmp, l.id);
        writeFileSync(cpp, r.code);
        try { execFileSync('g++', ['-std=c++17', '-o', exe, cpp], { stdio: 'pipe' }); } catch (e) { err(where, 'コンパイルエラー\n' + e.stderr); continue; }
        runs++;
        const out = execFileSync(exe, { input: r.stdin || '', timeout: 3000 }).toString();
        for (const c of r.contains || []) if (!out.includes(c)) err(where, `出力に ${JSON.stringify(c)} が無い\n${out}`);
      }
    }
  }
  console.log(`  レッスン ${(subj.lessons || []).length}`);
  console.log(`[${meta.id}]`, Object.entries(counts).sort().map(([k, v]) => `${k}:${v}`).join('  '));
}
console.log(`\n${groups} 大問 / ${questions} 問 / 実行チェック ${runs} 件 / エラー ${errors} 件`);
process.exit(errors ? 1 : 0);
