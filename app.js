// 俺たち秋学期 — 本番形式の5択問題アプリ
import SUBJECTS from './data/subjects.js';

const KEY = 'oretachi:v1';
const SKEY = 'oretachi:session';
const $app = document.getElementById('app');

/* ---------- 保存 ---------- */
function readJSON(k, fallback) {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function writeJSON(k, v) {
  try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch { /* 保存できない環境 */ }
}
const store = Object.assign({ settings: { shufflePast: false, shuffleOriginal: true }, stats: {}, history: [] }, readJSON(KEY, {}));
const save = () => writeJSON(KEY, store);
let session = readJSON(SKEY, null);
const saveSession = () => writeJSON(SKEY, session);

/* ---------- 小物 ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const NUMS = ['(1)', '(2)', '(3)', '(4)', '(5)'];
const ICON = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>',
};

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200);
}

function top(title, { back = null, sub = '', right = '' } = {}) {
  return `<header class="top"><div class="top-in">
    ${back !== null ? `<button class="icon-btn" data-act="back" data-to="${esc(back)}" aria-label="戻る">${ICON.back}</button>` : ''}
    <h1>${esc(title)}</h1>${sub ? `<span class="sub" id="topsub">${sub}</span>` : ''}${right}
  </div></header>`;
}

/* ---------- 科目データ ---------- */
const loaded = {};
async function getSubject(id) {
  if (loaded[id]) return loaded[id];
  const meta = SUBJECTS.find((s) => s.id === id);
  if (!meta) return null;
  const mod = (await import('./data/' + meta.module.replace(/^\.\//, ''))).default;
  const s = { ...meta, ...mod, meta, groupById: {}, qById: {} };
  for (const g of s.groups) {
    g.source = g.source || 'original';
    s.groupById[g.id] = g;
    for (const q of g.questions) { s.qById[q.id] = q; q.group = g; }
  }
  return (loaded[id] = s);
}
const isPast = (g) => g.source !== 'original';
const choicesOf = (q) => q.choices || q.group.sharedChoices;
const monoOf = (q) => q.mono || q.group.sharedMono;
const stat = (qid) => store.stats[qid] || (store.stats[qid] = { c: 0, w: 0, r: false });
const reviewIds = (s) => s.groups.flatMap((g) => g.questions).filter((q) => store.stats[q.id]?.r).map((q) => q.id);

/* ---------- ルーター ---------- */
let timer = null;
window.addEventListener('hashchange', route);
async function route() {
  clearInterval(timer);
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  window.scrollTo(0, 0);
  if (parts[0] === 's' && parts[1]) {
    const s = await getSubject(parts[1]);
    if (!s) return go('');
    const page = parts[2] || '';
    if (page === 'field') return viewField(s);
    if (page === 'past') return viewPast(s);
    if (page === 'history') return viewHistory(s);
    if (page === 'quiz') return session && session.subject === s.id && !session.finished ? viewQuiz(s) : go('s/' + s.id);
    if (page === 'result') return session && session.subject === s.id && session.finished ? viewResult(s) : go('s/' + s.id);
    return viewSubject(s);
  }
  if (parts[0] === 'settings') return viewSettings();
  return viewHome();
}
function go(path) {
  const h = '#/' + path;
  if (location.hash === h) route(); else location.hash = h;
}

/* ---------- ホーム ---------- */
function viewHome() {
  const resume = session && !session.finished ? session : null;
  const resumeMeta = resume && SUBJECTS.find((s) => s.id === resume.subject);
  $app.innerHTML = `
    ${top('俺たち秋学期', { right: `<button class="icon-btn" data-act="share" aria-label="共有">${ICON.share}</button><button class="icon-btn" data-act="nav" data-to="settings" aria-label="設定">${ICON.gear}</button>` })}
    <main class="wrap">
      <div class="hero"><img src="icons/icon-192.png" alt=""><div><h2>俺たち秋学期</h2><p>本番と同じ形式で、テスト対策。</p></div></div>
      ${resume && resumeMeta ? `
        <h3 class="sec">続きから</h3>
        <button class="card subject resume" data-act="resume">
          <div class="dot" style="background:${resumeMeta.color}">▶</div>
          <div><b>${esc(resume.title)}</b><small>${esc(resumeMeta.name)} ・ 回答 ${Object.keys(resume.answers).length}/${resume.qids.length}</small></div>
          <span class="chev">${ICON.next}</span>
        </button>` : ''}
      <h3 class="sec">科目</h3>
      ${SUBJECTS.map((s) => `
        <button class="card subject" data-act="nav" data-to="s/${s.id}">
          <div class="dot" style="background:${s.color}">${esc(s.mark || s.name.slice(0, 2))}</div>
          <div><b>${esc(s.name)}</b><small>${esc(s.sub || '')}</small></div>
          <span class="chev">${ICON.next}</span>
        </button>`).join('')}
      <p class="muted small mt">ほかの科目は資料がそろいしだい追加します。</p>
    </main>`;
}

/* ---------- 科目トップ ---------- */
function viewSubject(s) {
  const all = s.groups.flatMap((g) => g.questions);
  const tried = all.filter((q) => store.stats[q.id] && store.stats[q.id].c + store.stats[q.id].w > 0);
  const c = tried.reduce((a, q) => a + store.stats[q.id].c, 0);
  const w = tried.reduce((a, q) => a + store.stats[q.id].w, 0);
  const rev = reviewIds(s).length;
  const hist = store.history.filter((h) => h.subject === s.id && h.kind !== 'review');
  const resume = session && !session.finished && session.subject === s.id;
  $app.innerHTML = `
    ${top(s.name, { back: '' })}
    <main class="wrap">
      <div class="stats mt">
        <div><b>${all.length}</b><small>問題数</small></div>
        <div><b>${tried.length}</b><small>解いた問題</small></div>
        <div><b>${c + w ? Math.round((c / (c + w)) * 100) + '%' : '—'}</b><small>正答率</small></div>
      </div>
      ${resume ? `<h3 class="sec">続きから</h3><div class="menu"><button class="menu-btn resume" data-act="resume"><span class="ic">▶</span><div><b>${esc(session.title)}</b><small>回答 ${Object.keys(session.answers).length}/${session.qids.length}</small></div></button></div>` : ''}
      <h3 class="sec">解く</h3>
      <div class="menu">
        ${s.mock ? `<button class="menu-btn" data-act="mock"><span class="ic">模</span><div><b>${esc(s.mock.name)}</b><small>本番と同じ配分 ・ 最後にまとめて採点${s.mock.minutes ? ` ・ ${s.mock.minutes}分` : ''}</small></div></button>` : ''}
        <button class="menu-btn" data-act="nav" data-to="s/${s.id}/past"><span class="ic">本</span><div><b>本番の問題</b><small>${esc((s.pastExams || []).map((p) => p.name).join('・') || 'まだありません')}</small></div></button>
        <button class="menu-btn" data-act="nav" data-to="s/${s.id}/field"><span class="ic">分</span><div><b>分野別</b><small>回・問題の型を選んで、1問ずつ解説つき</small></div></button>
        <button class="menu-btn" data-act="review" ${rev ? '' : 'disabled'}><span class="ic">復</span><div><b>間違えた問題の復習</b><small>${rev ? '正解すると復習リストから消えます' : 'まだありません'}</small></div>${rev ? `<span class="badge">${rev}</span>` : ''}</button>
      </div>
      <h3 class="sec">成績</h3>
      <div class="card">
        ${hist.length ? hist.slice(-5).reverse().map(histRow).join('') + (hist.length > 5 ? `<button class="btn sub wide mt" data-act="nav" data-to="s/${s.id}/history">すべて見る</button>` : '') : '<p class="muted small" style="margin:0">模試や本番の問題を解くと、ここに記録されます。</p>'}
      </div>
    </main>`;
}
function histRow(h) {
  const d = new Date(h.date);
  return `<div class="hist"><span>${esc(h.title)}<br><small class="muted">${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</small></span><b>${h.score}/${h.total}</b></div>`;
}
function viewHistory(s) {
  const hist = store.history.filter((h) => h.subject === s.id && h.kind !== 'review');
  $app.innerHTML = `${top('成績の記録', { back: 's/' + s.id })}<main class="wrap"><div class="card mt">${hist.slice().reverse().map(histRow).join('') || '<p class="muted">まだありません</p>'}</div></main>`;
}

/* ---------- 本番の問題 ---------- */
function viewPast(s) {
  const list = s.pastExams || [];
  $app.innerHTML = `
    ${top('本番の問題', { back: 's/' + s.id })}
    <main class="wrap">
      ${list.map((p) => {
        const n = s.groups.filter((g) => g.source === p.source).reduce((a, g) => a + g.questions.length, 0);
        return `<div class="card mt"><b>${esc(p.name)}</b> <span class="muted small">全${n}問</span>
          ${p.note ? `<p class="muted small" style="margin:4px 0 12px">${esc(p.note)}</p>` : ''}
          <div class="row"><button class="btn" data-act="past" data-src="${esc(p.source)}" data-mode="exam">本番形式で解く</button>
          <button class="btn sub" data-act="past" data-src="${esc(p.source)}" data-mode="practice">解説を見ながら</button></div></div>`;
      }).join('') || '<p class="muted mt">まだありません</p>'}
      <p class="muted small mt">本番形式：最後にまとめて採点。 解説を見ながら：1問ごとに正解と解説が出ます。</p>
    </main>`;
}

/* ---------- 分野別 ---------- */
let fieldSel = null;
function viewField(s) {
  if (!fieldSel || fieldSel.subject !== s.id) fieldSel = { subject: s.id, lectures: new Set(), types: new Set(), src: 'all', shuffle: true };
  const f = fieldSel;
  const match = (g, ignore) =>
    (ignore === 'l' || !f.lectures.size || f.lectures.has(String(g.lecture))) &&
    (ignore === 't' || !f.types.size || f.types.has(g.type)) &&
    (f.src === 'all' || (f.src === 'original' ? !isPast(g) : isPast(g)));
  const count = (pred) => s.groups.filter(pred).reduce((a, g) => a + g.questions.length, 0);
  const n = count((g) => match(g));
  $app.innerHTML = `
    ${top('分野別', { back: 's/' + s.id })}
    <main class="wrap">
      <h3 class="sec">回（選ばなければ全部）</h3>
      <div class="chips">${Object.entries(s.lectures).map(([k, v]) => `<button class="chip" data-act="fl" data-k="${k}" aria-pressed="${f.lectures.has(k)}">${esc(v)}<small>${count((g) => String(g.lecture) === k && match(g, 'l'))}</small></button>`).join('')}</div>
      <h3 class="sec">問題の型（選ばなければ全部）</h3>
      <div class="chips">${Object.entries(s.types).map(([k, v]) => `<button class="chip" data-act="ft" data-k="${k}" aria-pressed="${f.types.has(k)}">${esc(v)}<small>${count((g) => g.type === k && match(g, 't'))}</small></button>`).join('')}</div>
      <h3 class="sec">問題の種類</h3>
      <div class="chips">${[['all', '両方'], ['original', 'オリジナル'], ['past', '本番の問題']].map(([k, v]) => `<button class="chip" data-act="fs" data-k="${k}" aria-pressed="${f.src === k}">${v}</button>`).join('')}</div>
      <div class="card mt"><label class="switch"><span>出題順をシャッフル</span><input type="checkbox" data-act="fsh" ${f.shuffle ? 'checked' : ''}></label></div>
    </main>
    <div class="bottom"><div class="bottom-in"><button class="btn" data-act="fstart" ${n ? '' : 'disabled'}>${n}問を解く</button></div></div>`;
  fieldSel.match = match;
}

/* ---------- セッション作成 ---------- */
function makeSession(s, { kind, mode, title, groups, minutes = 0 }) {
  const pages = [];
  const order = {};
  const shufflePast = store.settings.shufflePast, shuffleOrig = store.settings.shuffleOriginal;
  for (const { g, qs } of groups) {
    pages.push({ gid: g.id, qids: qs.map((q) => q.id) });
    const doShuffle = isPast(g) ? shufflePast : shuffleOrig;
    const perm = () => (doShuffle ? shuffle([0, 1, 2, 3, 4]) : [0, 1, 2, 3, 4]);
    if (g.sharedChoices) order[g.id] = perm();
    for (const q of qs) if (!g.sharedChoices) order[q.id] = perm();
  }
  session = {
    subject: s.id, kind, mode, title, minutes, pages, order,
    qids: pages.flatMap((p) => p.qids), answers: {}, page: 0,
    startedAt: Date.now(), finished: false,
  };
  saveSession();
  go(`s/${s.id}/quiz`);
}

function startMock(s) {
  const picked = [];
  for (const { lecture, n } of s.mock.blueprint) {
    const orig = shuffle(s.groups.filter((g) => g.lecture === lecture && !isPast(g)));
    const past = shuffle(s.groups.filter((g) => g.lecture === lecture && isPast(g)));
    let rest = n;
    for (const g of [...orig, ...past]) {
      if (rest <= 0) break;
      const qs = g.questions.slice(0, rest);
      picked.push({ g, qs });
      rest -= qs.length;
    }
  }
  makeSession(s, { kind: 'mock', mode: 'exam', title: s.mock.name, groups: picked, minutes: s.mock.minutes });
}

function startPast(s, src, mode) {
  const p = (s.pastExams || []).find((x) => x.source === src);
  const groups = s.groups.filter((g) => g.source === src).map((g) => ({ g, qs: g.questions }));
  makeSession(s, { kind: 'past', mode, title: p ? p.name : '本番の問題', groups, minutes: mode === 'exam' ? s.mock?.minutes : 0 });
}

function startField(s) {
  const f = fieldSel;
  let gs = s.groups.filter((g) => f.match(g)).sort((a, b) => a.lecture - b.lecture);
  if (f.shuffle) gs = shuffle(gs);
  const labels = [...f.lectures].sort().map((k) => `第${k}回`).concat([...f.types].map((k) => s.types[k]));
  makeSession(s, { kind: 'field', mode: 'practice', title: '分野別' + (labels.length ? '：' + labels.join('・') : ''), groups: gs.map((g) => ({ g, qs: g.questions })) });
}

function startReview(s, qids, title = '間違えた問題の復習') {
  const set = new Set(qids);
  const groups = s.groups
    .map((g) => ({ g, qs: g.questions.filter((q) => set.has(q.id)) }))
    .filter((x) => x.qs.length);
  if (!groups.length) return toast('復習する問題はありません');
  makeSession(s, { kind: 'review', mode: 'practice', title, groups: shuffle(groups) });
}

/* ---------- 問題画面 ---------- */
function qNumber(qid) { return session.qids.indexOf(qid) + 1; }

function highlight(line) {
  const re = /(\/\/.*$)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(\?{8})|\b(int|double|float|char|string|void|return|if|else|for|while|do|switch|case|default|break|continue|goto|const|using|namespace|new|delete|unsigned|bool|true|false|sizeof)\b/g;
  let out = '', last = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index));
    const cls = m[1] ? 'cm' : m[2] || m[3] ? 'str' : m[4] ? 'hole' : 'kw';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(line.slice(last));
}
function renderCode(code, gid) {
  const rows = code.split('\n').map((l, i) => `<tr data-line="${i + 1}"><td class="n">${i + 1}</td><td class="l">${highlight(l) || ' '}</td></tr>`).join('');
  return `<div class="code" id="code-${gid}"><table>${rows}</table></div>`;
}
function renderPassage(text) {
  return `<div class="passage">${esc(text).replace(/［[^］]+］/g, (m) => `<span class="blank">${m}</span>`)}</div>`;
}
function choiceHTML(q, mono, txt) {
  if (mono) return txt.includes('\n') ? `<pre>${esc(txt)}</pre>` : `<code>${esc(txt)}</code>`;
  return esc(txt).replace(/\(改行\)/g, '<span class="nl">(改行)</span>');
}
function renderQuestion(q) {
  const g = q.group;
  const perm = session.order[g.sharedChoices ? g.id : q.id];
  const ch = choicesOf(q);
  const ans = session.answers[q.id];
  const reveal = session.mode === 'practice' && ans !== undefined;
  const text = esc(q.q).replace(/(\d+)行目/g, (m, n) => (g.code ? `<span class="lref" data-act="line" data-g="${g.id}" data-line="${n}">${m}</span>` : m));
  const btns = perm.map((oi, di) => {
    let cls = 'choice';
    if (reveal) { if (oi === q.answer) cls += ' ok'; else if (oi === ans) cls += ' ng'; }
    else if (oi === ans) cls += ' sel';
    return `<button class="${cls}" data-act="ans" data-q="${q.id}" data-o="${oi}" ${reveal ? 'disabled' : ''}><span class="num">${NUMS[di]}</span><span class="txt">${choiceHTML(q, monoOf(q), ch[oi])}</span></button>`;
  }).join('');
  let exp = '';
  if (reveal) {
    const ok = ans === q.answer;
    exp = `<div class="exp ${ok ? 'ok' : 'ng'}"><span class="verdict">${ok ? '正解' : '不正解'}</span>正解は ${NUMS[perm.indexOf(q.answer)]}。${esc(q.exp)}</div>`;
  }
  return `<div class="q" id="q-${q.id}"><div class="q-text"><span class="qn">問${qNumber(q.id)}</span>${text}</div><div class="choices">${btns}</div>${exp}</div>`;
}

function viewQuiz(s) {
  const p = session.pages[session.page];
  const g = s.groupById[p.gid];
  const qs = p.qids.map((id) => s.qById[id]);
  const last = session.page === session.pages.length - 1;
  const answered = Object.keys(session.answers).length;
  const nums = qs.map((q) => qNumber(q.id));
  const label = nums.length > 1 ? `問${nums[0]}〜${nums[nums.length - 1]}` : `問${nums[0]}`;
  const sourceTag = isPast(g) ? (s.pastExams || []).find((x) => x.source === g.source)?.name || '本番' : 'オリジナル';
  $app.innerHTML = `
    ${top(session.title, { back: 's/' + s.id, sub: session.mode === 'exam' && session.minutes ? '<span id="timer"></span>' : `${session.page + 1}/${session.pages.length}` })}
    <div class="progress"><i style="width:${(answered / session.qids.length) * 100}%"></i></div>
    <main class="wrap">
      <div class="group-head">
        <span class="no">${label}</span><span class="tag">${esc(s.lectures[g.lecture] || '')} ・ ${esc(sourceTag)}</span>
        <h2>${esc(g.title)}</h2>
      </div>
      ${g.intro ? `<p class="intro">${esc(g.intro)}</p>` : ''}
      ${g.passage ? renderPassage(g.passage) : ''}
      ${g.code ? renderCode(g.code, g.id) : ''}
      ${qs.map(renderQuestion).join('')}
    </main>
    <div class="bottom"><div class="bottom-in">
      <button class="icon-btn" data-act="prev" aria-label="前へ" ${session.page ? '' : 'disabled'}>${ICON.back}</button>
      <button class="icon-btn" data-act="palette" aria-label="問題一覧">${ICON.grid}</button>
      ${last
        ? `<button class="btn" data-act="finish">${session.mode === 'exam' ? '採点する' : '結果を見る'}</button>`
        : `<button class="btn" data-act="next">次へ ${ICON.next.replace('<svg', '<svg width="18" height="18"')}</button>`}
    </div></div>`;
  if (session.mode === 'exam' && session.minutes) {
    const tick = () => {
      const el = document.getElementById('timer');
      if (!el) return clearInterval(timer);
      const left = session.minutes * 60 - Math.floor((Date.now() - session.startedAt) / 1000);
      const a = Math.abs(left);
      el.textContent = `${left < 0 ? '超過 ' : '残り '}${Math.floor(a / 60)}:${String(a % 60).padStart(2, '0')}`;
      el.style.color = left < 0 ? 'var(--ng)' : '';
    };
    tick(); timer = setInterval(tick, 1000);
  }
}

function answer(s, qid, oi) {
  const q = s.qById[qid];
  if (session.mode === 'practice') {
    if (session.answers[qid] !== undefined) return;
    session.answers[qid] = oi;
    record(q, oi === q.answer);
  } else {
    session.answers[qid] = oi;
  }
  saveSession();
  const el = document.getElementById('q-' + qid);
  if (el) el.outerHTML = renderQuestion(q);
  const bar = document.querySelector('.progress i');
  if (bar) bar.style.width = (Object.keys(session.answers).length / session.qids.length) * 100 + '%';
}

function record(q, ok) {
  const st = stat(q.id);
  if (ok) { st.c++; st.r = false; } else { st.w++; st.r = true; }
  st.t = Date.now();
  save();
}

function openPalette(s) {
  const dlg = document.createElement('dialog');
  const cls = (qid) => {
    const a = session.answers[qid];
    if (a === undefined) return '';
    if (session.mode === 'practice') return a === s.qById[qid].answer ? 'ok' : 'ng';
    return 'done';
  };
  dlg.innerHTML = `<div class="dlg"><h3>問題一覧</h3><div class="palette">${session.pages.map((p, pi) => p.qids.map((qid) => `<button class="${cls(qid)}" data-pi="${pi}" data-q="${qid}">${qNumber(qid)}</button>`).join('')).join('')}</div>
    <button class="btn sub wide mt" data-close>閉じる</button></div>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (e.target === dlg || (b && b.hasAttribute('data-close'))) return dlg.close();
    if (b && b.dataset.pi) {
      dlg.close(); session.page = +b.dataset.pi; saveSession(); viewQuiz(s);
      requestAnimationFrame(() => document.getElementById('q-' + b.dataset.q)?.scrollIntoView({ block: 'start' }));
    }
  });
  dlg.addEventListener('close', () => dlg.remove());
  dlg.showModal();
}

function finish(s) {
  const un = session.qids.filter((id) => session.answers[id] === undefined).length;
  if (session.mode === 'exam' && un && !confirm(`未回答が ${un} 問あります。採点しますか？`)) return;
  const res = { score: 0, total: session.qids.length, byLecture: {}, byType: {} };
  for (const qid of session.qids) {
    const q = s.qById[qid];
    const a = session.answers[qid];
    const ok = a === q.answer;
    if (session.mode === 'exam') record(q, ok);
    if (ok) res.score++;
    for (const [k, v] of [['byLecture', q.group.lecture], ['byType', q.group.type]]) {
      const b = (res[k][v] ||= { c: 0, n: 0 }); b.n++; if (ok) b.c++;
    }
  }
  session.finished = true;
  session.result = res;
  session.seconds = Math.floor((Date.now() - session.startedAt) / 1000);
  store.history.push({ subject: s.id, kind: session.kind, title: session.title, score: res.score, total: res.total, date: Date.now() });
  if (store.history.length > 200) store.history = store.history.slice(-200);
  save(); saveSession();
  go(`s/${s.id}/result`);
}

/* ---------- 結果 ---------- */
function viewResult(s) {
  const r = session.result;
  const pct = r.total ? Math.round((r.score / r.total) * 100) : 0;
  const wrong = session.qids.filter((id) => session.answers[id] !== s.qById[id].answer);
  const bars = (obj, names) => Object.entries(obj).map(([k, b]) => `<div class="bar"><span>${esc(names[k] || k)}</span><b>${b.c}/${b.n}</b><span class="track"><i style="width:${(b.c / b.n) * 100}%"></i></span></div>`).join('');
  const items = session.qids.map((id) => {
    const q = s.qById[id];
    const a = session.answers[id];
    const ok = a === q.answer;
    const perm = session.order[q.group.sharedChoices ? q.group.id : q.id];
    const ch = choicesOf(q);
    return `<details class="res-item-wrap"><summary class="res-item"><span class="mark ${ok ? 'ok' : 'ng'}">${ok ? '○' : '×'}</span><span>問${qNumber(id)} ${esc(q.q.length > 46 ? q.q.slice(0, 46) + '…' : q.q)}<small>あなた：${a === undefined ? '未回答' : NUMS[perm.indexOf(a)] + ' ' + esc(ch[a].replace(/\n/g, ' / '))} ／ 正解：${NUMS[perm.indexOf(q.answer)]} ${esc(ch[q.answer].replace(/\n/g, ' / '))}</small></span></summary>
      <div class="exp ${ok ? 'ok' : 'ng'}">${esc(q.exp)}</div></details>`;
  }).join('');
  const m = Math.floor((session.seconds || 0) / 60);
  $app.innerHTML = `
    ${top('結果', { back: 's/' + s.id })}
    <main class="wrap">
      <div class="score"><div class="big">${r.score}<small> / ${r.total}</small></div><p>${esc(session.title)} ・ 正答率 ${pct}%${session.mode === 'exam' ? ` ・ ${m}分` : ''}</p></div>
      <div class="row mt">
        <button class="btn" data-act="retrywrong" ${wrong.length ? '' : 'disabled'}>間違えた ${wrong.length} 問を解き直す</button>
      </div>
      <h3 class="sec">回ごと</h3><div class="card bars">${bars(r.byLecture, s.lectures)}</div>
      <h3 class="sec">問題の型ごと</h3><div class="card bars">${bars(r.byType, s.types)}</div>
      <h3 class="sec">全問（タップで解説）</h3><div class="card">${items}</div>
      <button class="btn sub wide mt" data-act="nav" data-to="s/${s.id}">${esc(s.name)} のトップへ</button>
    </main>`;
  session.wrong = wrong;
}

/* ---------- 設定 ---------- */
function viewSettings() {
  $app.innerHTML = `
    ${top('設定', { back: '' })}
    <main class="wrap">
      <h3 class="sec">選択肢の順番</h3>
      <div class="card">
        <label class="switch"><span>オリジナル問題の選択肢をシャッフル</span><input type="checkbox" data-act="set" data-k="shuffleOriginal" ${store.settings.shuffleOriginal ? 'checked' : ''}></label>
        <label class="switch"><span>本番の問題の選択肢もシャッフル<br><small class="muted">オフ＝本番と同じ並び</small></span><input type="checkbox" data-act="set" data-k="shufflePast" ${store.settings.shufflePast ? 'checked' : ''}></label>
      </div>
      <h3 class="sec">データ</h3>
      <div class="card">
        <p class="small muted" style="margin-top:0">成績と間違えた問題の記録は、この端末のブラウザの中だけに保存されます。</p>
        <button class="btn sub wide" data-act="reset">記録をすべて消す</button>
      </div>
      <p class="muted small mt center">俺たち秋学期 ・ 解答は公式のものではありません</p>
    </main>`;
}

/* ---------- イベント ---------- */
document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  const sid = (location.hash.match(/#\/s\/([^/]+)/) || [])[1];
  const s = sid ? await getSubject(sid) : null;
  switch (act) {
    case 'nav': return go(el.dataset.to);
    case 'back': return go(el.dataset.to);
    case 'resume': return session && go(`s/${session.subject}/quiz`);
    case 'share': {
      const url = location.origin + location.pathname;
      if (navigator.share) return navigator.share({ title: '俺たち秋学期', url }).catch(() => {});
      try { await navigator.clipboard.writeText(url); toast('リンクをコピーしました'); } catch { prompt('このリンクを共有してください', url); }
      return;
    }
    case 'mock': return confirmReplace() && startMock(s);
    case 'past': return confirmReplace() && startPast(s, el.dataset.src, el.dataset.mode);
    case 'review': return confirmReplace() && startReview(s, reviewIds(s));
    case 'retrywrong': return startReview(s, session.wrong, '解き直し');
    case 'fl': case 'ft': {
      const set = act === 'fl' ? fieldSel.lectures : fieldSel.types;
      const k = el.dataset.k; set.has(k) ? set.delete(k) : set.add(k);
      return viewField(s);
    }
    case 'fs': fieldSel.src = el.dataset.k; return viewField(s);
    case 'fsh': fieldSel.shuffle = el.checked; return;
    case 'fstart': return confirmReplace() && startField(s);
    case 'ans': return answer(s, el.dataset.q, +el.dataset.o);
    case 'prev': session.page--; saveSession(); return viewQuiz(s);
    case 'next': session.page++; saveSession(); window.scrollTo(0, 0); return viewQuiz(s);
    case 'palette': return openPalette(s);
    case 'finish': return finish(s);
    case 'line': {
      const tr = document.querySelector(`#code-${el.dataset.g} tr[data-line="${el.dataset.line}"]`);
      if (!tr) return;
      tr.scrollIntoView({ block: 'center', behavior: 'smooth' });
      tr.classList.add('flash'); setTimeout(() => tr.classList.remove('flash'), 1600);
      return;
    }
    case 'set': store.settings[el.dataset.k] = el.checked; save(); return;
    case 'reset':
      if (confirm('成績と間違えた問題の記録をすべて消しますか？')) { store.stats = {}; store.history = []; save(); toast('消しました'); }
      return;
  }
});
function confirmReplace() {
  if (session && !session.finished && Object.keys(session.answers).length) {
    if (!confirm(`解きかけの「${session.title}」があります。破棄して新しく始めますか？`)) return false;
  }
  return true;
}

route();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
