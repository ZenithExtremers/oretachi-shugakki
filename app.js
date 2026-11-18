// 俺たちの秋学期 — 本番形式の5択問題アプリ
import SUBJECTS from './data/subjects.js';
import NOTES from './data/patchnotes.js';
import { sfx } from './sfx.js';
import { viewHima, leaveHima, rewardCorrect, himaFood, owlSVG } from './himakoroshi.js';

const VERSION = NOTES[0].version;

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
const store = Object.assign({ settings: { shufflePast: false, shuffleOriginal: true, sound: true }, stats: {}, history: [], lessons: {} }, readJSON(KEY, {}));
store.lessons ||= {};
if (store.settings.sound === undefined) store.settings.sound = true;
sfx.enabled = store.settings.sound;
store.settings.theme ||= 'auto';
function applyTheme() {
  const t = store.settings.theme;
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}
applyTheme();
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
  s.lessons = s.lessons || [];
  s.lessonById = {};
  s.lessons.forEach((l, i) => { l.index = i; s.lessonById[l.id] = l; });
  return (loaded[id] = s);
}
const isPast = (g) => g.source !== 'original';
const choicesOf = (q) => q.choices || q.group.sharedChoices;
const monoOf = (q) => q.mono || q.group.sharedMono;
const stat = (qid) => store.stats[qid] || (store.stats[qid] = { c: 0, w: 0, r: false });
const reviewIds = (s) => s.groups.flatMap((g) => g.questions).filter((q) => store.stats[q.id]?.r).map((q) => q.id);

/* ---------- ルーター ---------- */
let timer = null;
let cur = null; // 表示中の科目
window.addEventListener('hashchange', route);
async function route() {
  clearInterval(timer);
  leaveHima();
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  window.scrollTo(0, 0);
  if (parts[0] === 's' && parts[1]) {
    const s = await getSubject(parts[1]);
    if (!s) return go('');
    cur = s;
    const page = parts[2] || '';
    if (page === 'lessons') return viewLessons(s);
    if (page === 'lesson' && s.lessonById[parts[3]]) return viewLesson(s, s.lessonById[parts[3]]);
    if (page === 'field') return viewField(s);
    if (page === 'past') return viewPast(s);
    if (page === 'history') return viewHistory(s);
    if (page === 'quiz') return session && session.subject === s.id && !session.finished ? viewQuiz(s) : go('s/' + s.id);
    if (page === 'result') return session && session.subject === s.id && session.finished ? viewResult(s) : go('s/' + s.id);
    return viewSubject(s);
  }
  if (parts[0] === 'settings') return viewSettings();
  if (parts[0] === 'notes') return viewNotes();
  if (parts[0] === 'hima') return viewHima($app, top);
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
    ${top('俺たちの秋学期', { right: `<button class="icon-btn" data-act="share" aria-label="共有">${ICON.share}</button><button class="icon-btn" data-act="nav" data-to="settings" aria-label="設定">${ICON.gear}</button>` })}
    <main class="wrap">
      <div class="hero"><img src="icons/icon-192.png" alt=""><div><h2>俺たちの秋学期</h2><p>本番と同じ形式で、テスト対策。</p></div></div>
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
      <h3 class="sec">ひと休み</h3>
      <button class="card subject" data-act="nav" data-to="hima">
        <div class="dot hk-homeowl">${owlSVG()}</div>
        <div><b>ヒマコロシ</b><small>フクロウ育成・勉強ミニ・ミニゲーム ・ 🐛 ${himaFood()}</small></div>
        <span class="chev">${ICON.next}</span>
      </button>
      <h3 class="sec">お知らせ</h3>
      <button class="card subject" data-act="nav" data-to="notes">
        <div class="dot" style="background:var(--brand-soft);color:var(--brand)">📝</div>
        <div><b>パッチノート</b><small>v${VERSION} ・ ${fmtDate(NOTES[0].date)} 更新</small></div>
        <span class="chev">${ICON.next}</span>
      </button>
      <p class="muted small center mt">俺たちの秋学期 v${VERSION}</p>
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
        ${s.lessons.length ? `<button class="menu-btn" data-act="nav" data-to="s/${s.id}/lessons"><span class="ic">基</span><div><b>基礎コース</b><small>説明を読んで確認問題 ・ クリア ${s.lessons.filter((l) => store.lessons?.[l.id]).length}/${s.lessons.length}</small></div></button>` : ''}
        ${s.mock ? `<button class="menu-btn" data-act="mock"><span class="ic">模</span><div><b>${esc(s.mock.name)}</b><small>${s.mock.note ? esc(s.mock.note) : '本番と同じ配分'} ・ 最後にまとめて採点${s.mock.minutes ? ` ・ ${s.mock.minutes}分` : ''}</small></div></button>` : ''}
        <button class="menu-btn" ${(s.pastExams || []).length ? `data-act="nav" data-to="s/${s.id}/past"` : 'disabled'}><span class="ic">本</span><div><b>本番の問題</b><small>${esc((s.pastExams || []).map((p) => p.name).join('・') || 'まだありません')}</small></div></button>
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
      <div class="sec-row"><h3 class="sec">回（選ばなければ全部）</h3>
        <div class="mini-btns"><button data-act="fall">すべて</button><button data-act="fnone">解除</button></div></div>
      <div class="lec-list">${Object.entries(s.lectures).map(([k, v]) => {
        const m = v.match(/^(第\S+?回)\s*(.*)$/) || [null, v, ''];
        const qn = count((g) => String(g.lecture) === k && match(g, 'l'));
        const acc = accFor(s, (g) => String(g.lecture) === k);
        const on = f.lectures.has(k);
        return `<button class="lec" data-act="fl" data-k="${k}" aria-pressed="${on}" ${qn || on ? '' : 'disabled'}>
          <span class="box">${on ? '✓' : ''}</span>
          <span class="body"><span class="no">${esc(m[1])}</span><span class="ttl">${esc(m[2])}</span>
            <span class="meta"><span>${qn}問 ・ ${acc ? `正答率 ${acc.pct}%` : 'まだ解いていない'}</span>${acc ? `<span class="meter"><i style="width:${acc.pct}%"></i></span>` : ''}</span></span>
        </button>`;
      }).join('')}</div>
      <div class="sec-row"><h3 class="sec">問題の型（選ばなければ全部）</h3>
        <div class="mini-btns"><button data-act="tall">すべて</button><button data-act="tnone">解除</button></div></div>
      <div class="lec-list">${Object.entries(s.types).map(([k, v]) => {
        const qn = count((g) => g.type === k && match(g, 't'));
        const acc = accFor(s, (g) => g.type === k);
        const on = f.types.has(k);
        return `<button class="lec" data-act="ft" data-k="${k}" aria-pressed="${on}" ${qn || on ? '' : 'disabled'}>
          <span class="box">${on ? '✓' : ''}</span>
          <span class="body"><span class="no">${esc(v)}</span>
            <span class="meta"><span>${qn}問 ・ ${acc ? `正答率 ${acc.pct}%` : 'まだ解いていない'}</span>${acc ? `<span class="meter"><i style="width:${acc.pct}%"></i></span>` : ''}</span></span>
        </button>`;
      }).join('')}</div>
      <h3 class="sec">問題の種類</h3>
      <div class="chips">${[['all', '両方'], ['original', 'オリジナル'], ['past', '本番の問題']].map(([k, v]) => `<button class="chip" data-act="fs" data-k="${k}" aria-pressed="${f.src === k}">${v}</button>`).join('')}</div>
      <div class="card mt"><label class="switch"><span>出題順をシャッフル</span><input type="checkbox" data-act="fsh" ${f.shuffle ? 'checked' : ''}></label></div>
    </main>
    <div class="bottom"><div class="bottom-in"><button class="btn" data-act="fstart" ${n ? '' : 'disabled'}>${n}問を解く</button></div></div>`;
  fieldSel.match = match;
}

// 条件に合う大問の自分の正答率（解いたことのある問題の正解・不正解の合計から）
function accFor(s, pred) {
  let c = 0, w = 0;
  for (const g of s.groups) if (pred(g)) for (const q of g.questions) { const st = store.stats[q.id]; if (st) { c += st.c; w += st.w; } }
  return c + w ? { pct: Math.round((c / (c + w)) * 100) } : null;
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

const SQL_KW = /\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|BETWEEN|LIKE|IS|NULL|ORDER|BY|ASC|DESC|LIMIT|OFFSET|GROUP|HAVING|AS|DISTINCT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|CASE|WHEN|THEN|ELSE|END|JOIN|INNER|LEFT|RIGHT|OUTER|ON|UNION|ALL|EXISTS|ANY|COUNT|SUM|AVG|MAX|MIN|PRIMARY|KEY|INTEGER|INT|VARCHAR|CHAR|DATE|DECIMAL)\b/i;
function highlightSQL(line) {
  const re = new RegExp(String.raw`(--.*$)|('(?:''|[^'])*')|(\?{3,})|` + SQL_KW.source, 'gi');
  let out = '', last = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index));
    const cls = m[1] ? 'cm' : m[2] ? 'str' : m[3] ? 'hole' : 'kw';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(line.slice(last));
}
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
const yen = (h) => (cur && cur.yen ? h.replace(/\\/g, '¥') : h);
function renderCode(code, gid, lang = 'cpp', numbers = true) {
  const hl = lang === 'sql' ? highlightSQL : lang === 'text' ? esc : highlight;
  const rows = code.split('\n').map((l, i) => `<tr data-line="${i + 1}">${numbers ? `<td class="n">${i + 1}</td>` : ''}<td class="l">${yen(hl(l)) || ' '}</td></tr>`).join('');
  return `<div class="code${numbers ? '' : ' nonum'}" id="code-${gid}"><table>${rows}</table></div>`;
}
function renderTable(t) {
  return `<div class="dtable">${t.name ? `<div class="tname">${esc(t.name)}</div>` : ''}<div class="tscroll"><table>
    <thead><tr>${t.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
    <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${c === null ? '<span class="null">NULL</span>' : esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
}
// "列1|列2\n値|値" 形式の文字列を小さな表に
function miniTable(txt) {
  const lines = txt.split('\n');
  if (lines.length === 1 && !lines[0].includes('|')) return esc(txt);
  const [h, ...rows] = lines.map((l) => l.split('|').map((c) => c.trim()));
  return `<table class="mini"><thead><tr>${h.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map((r) => `<tr>${r.map((c) => `<td>${c === 'NULL' ? '<span class="null">NULL</span>' : esc(c)}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${h.length}" class="null">（0行）</td></tr>`}</tbody></table>`;
}
function renderDiagram(svg) { return `<div class="diagram">${svg}</div>`; }
function renderGroupBody(g) {
  return `${g.intro ? `<p class="intro">${inline(g.intro)}</p>` : ''}
      ${g.passage ? renderPassage(g.passage) : ''}
      ${g.diagram ? renderDiagram(g.diagram) : ''}
      ${(g.tables || []).map(renderTable).join('')}
      ${g.code ? renderCode(g.code, g.id, g.lang || cur.lang) : ''}`;
}
// 説明文中の **太字** と `コード`
function inline(t) {
  return esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, (m, c) => `<code>${yen(c)}</code>`);
}
function renderPassage(text) {
  return `<div class="passage">${esc(text).replace(/［[^］]+］/g, (m) => `<span class="blank">${m}</span>`)}</div>`;
}
function choiceHTML(q, mono, txt) {
  if (q.tableChoices || q.group?.tableChoices) return miniTable(txt);
  if (mono) txt = cur && cur.yen ? txt.replace(/\\/g, '¥') : txt;
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
    exp = `<div class="exp ${ok ? 'ok' : 'ng'}"><span class="verdict">${ok ? '正解' : '不正解'}</span>正解は ${NUMS[perm.indexOf(q.answer)]}。${inline(q.exp)}</div>`;
  }
  const qcode = q.code ? renderCode(q.code, 'q-' + q.id, q.lang || g.lang || cur.lang, q.code.includes('\n')) : '';
  return `<div class="q" id="q-${q.id}"><div class="q-text"><span class="qn">問${qNumber(q.id)}</span>${text}</div>${qcode}<div class="choices">${btns}</div>${exp}</div>`;
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
      ${renderGroupBody(g)}
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
    oi === q.answer ? sfx.ok() : sfx.ng();
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
  if (ok) rewardCorrect(q.id); // ヒマコロシのエサ（1問1日1回）
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
  if (session.mode === 'exam') {
    const pct = res.total ? res.score / res.total : 0;
    if (pct >= 0.8) sfx.fanfare(); else if (pct >= 0.6) sfx.ok(); else sfx.ng();
  }
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
      <div class="exp ${ok ? 'ok' : 'ng'}">${inline(q.exp)}</div></details>`;
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

/* ---------- 基礎コース ---------- */
const lessonOpen = (s, l) => l.index === 0 || !!store.lessons[s.lessons[l.index - 1].id];
function viewLessons(s) {
  const byL = {};
  for (const l of s.lessons) (byL[l.lecture] ||= []).push(l);
  const done = s.lessons.filter((l) => store.lessons[l.id]).length;
  $app.innerHTML = `
    ${top('基礎コース', { back: 's/' + s.id, sub: `${done}/${s.lessons.length}` })}
    <main class="wrap">
      <p class="muted small mt">説明を読んで確認問題に全問正解するとクリア。クリアすると次のレッスンが開きます。</p>
      ${Object.entries(byL).map(([k, ls]) => `
        <h3 class="sec">${esc(s.lectures[k] || k)}</h3>
        <div class="menu">${ls.map((l) => {
          const open = lessonOpen(s, l), clear = !!store.lessons[l.id];
          return `<button class="menu-btn" ${open ? `data-act="nav" data-to="s/${s.id}/lesson/${l.id}"` : 'disabled'}>
            <span class="ic ${clear ? 'clear' : ''}">${clear ? '✓' : open ? l.index + 1 : '🔒'}</span>
            <div><b>${esc(l.title)}</b><small>${clear ? 'クリア' : open ? `確認問題 ${l.questions.length}問` : '前のレッスンをクリアすると開きます'}</small></div></button>`;
        }).join('')}</div>`).join('')}
    </main>`;
}
let lessonState = null;
function renderBlock(b) {
  if (typeof b === 'string') return `<p>${inline(b)}</p>`;
  if (b.code) return renderCode(b.code, 'lb' + Math.random().toString(36).slice(2, 8), b.lang || cur.lang, b.numbers !== false);
  if (b.table) return renderTable(b.table);
  if (b.svg) return renderDiagram(b.svg);
  if (b.list) return `<ul>${b.list.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`;
  if (b.note) return `<div class="note">${inline(b.note)}</div>`;
  if (b.h) return `<h4>${inline(b.h)}</h4>`;
  return '';
}
function lessonQ(l, q, i) {
  const st = lessonState;
  const perm = st.order[i];
  const ans = st.answers[i];
  const done = ans !== undefined;
  const btns = perm.map((oi, di) => {
    let cls = 'choice';
    if (done) { if (oi === q.answer) cls += ' ok'; else if (oi === ans) cls += ' ng'; }
    return `<button class="${cls}" data-act="lans" data-i="${i}" data-o="${oi}" ${done ? 'disabled' : ''}><span class="num">${NUMS[di]}</span><span class="txt">${choiceHTML(q, q.mono, q.choices[oi])}</span></button>`;
  }).join('');
  const exp = done ? `<div class="exp ${ans === q.answer ? 'ok' : 'ng'}"><span class="verdict">${ans === q.answer ? '正解' : '不正解'}</span>${inline(q.exp)}</div>` : '';
  return `<div class="q" id="lq-${i}"><div class="q-text"><span class="qn">Q${i + 1}</span>${inline(q.q)}</div>${q.code ? renderCode(q.code, 'lq' + i, q.lang || cur.lang) : ''}${q.table ? renderTable(q.table) : ''}<div class="choices">${btns}</div>${exp}</div>`;
}
function viewLesson(s, l) {
  if (!lessonOpen(s, l)) return go(`s/${s.id}/lessons`);
  if (!lessonState || lessonState.id !== l.id) lessonState = { id: l.id, answers: {}, order: l.questions.map((q) => shuffle(q.choices.map((_, i) => i))) };
  const next = s.lessons[l.index + 1];
  $app.innerHTML = `
    ${top(l.title, { back: `s/${s.id}/lessons`, sub: `${l.index + 1}/${s.lessons.length}` })}
    <main class="wrap lesson">
      <div class="group-head"><span class="no">レッスン ${l.index + 1}</span><span class="tag">${esc(s.lectures[l.lecture] || '')}</span><h2>${esc(l.title)}</h2></div>
      <div class="lesson-body">${l.blocks.map(renderBlock).join('')}</div>
      <h3 class="sec">確認問題</h3>
      ${l.questions.map((q, i) => lessonQ(l, q, i)).join('')}
      <div id="lresult"></div>
    </main>
    ${next ? '' : ''}`;
  lessonFinishCheck(s, l);
}
function lessonFinishCheck(s, l) {
  const st = lessonState;
  const box = document.getElementById('lresult');
  if (!box || Object.keys(st.answers).length < l.questions.length) return;
  const ok = l.questions.every((q, i) => st.answers[i] === q.answer);
  const next = s.lessons[l.index + 1];
  if (ok && !store.lessons[l.id]) { store.lessons[l.id] = Date.now(); save(); }
  if (ok) setTimeout(() => sfx.fanfare(), 650);
  box.innerHTML = ok
    ? `<div class="card mt center"><b style="font-size:20px">🎉 クリア！</b><div class="row mt">${next ? `<button class="btn" data-act="lnext" data-to="s/${s.id}/lesson/${next.id}">次のレッスンへ</button>` : `<button class="btn" data-act="nav" data-to="s/${s.id}">${esc(s.name)} のトップへ</button>`}</div></div>`
    : `<div class="card mt center"><b>${l.questions.filter((q, i) => st.answers[i] === q.answer).length}/${l.questions.length} 問正解</b><p class="muted small">全問正解でクリアです。説明を読み直してもう一度。</p><button class="btn wide" data-act="lretry">もう一度</button></div>`;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---------- パッチノート ---------- */
function fmtDate(d) { const [y, m, dd] = d.split('-').map(Number); return `${y}/${m}/${dd}`; }
function viewNotes() {
  $app.innerHTML = `
    ${top('パッチノート', { back: '', sub: `v${VERSION}` })}
    <main class="wrap">
      ${NOTES.map((n, i) => `
        <div class="card mt">
          <div class="note-head"><b>v${esc(n.version)}</b>${i === 0 ? '<span class="cur">現在のバージョン</span>' : ''}<span class="muted small">${fmtDate(n.date)}</span></div>
          <ul class="note-list">${n.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>`).join('')}
    </main>`;
}

/* ---------- 設定 ---------- */
function viewSettings() {
  $app.innerHTML = `
    ${top('設定', { back: '' })}
    <main class="wrap">
      <h3 class="sec">画面の明るさ</h3>
      <div class="card">
        <div class="seg" role="group" aria-label="テーマ">${[['auto', '自動'], ['light', 'ライト'], ['dark', 'ダーク']].map(([k, v]) => `<button data-act="theme" data-v="${k}" aria-pressed="${store.settings.theme === k}">${v}</button>`).join('')}</div>
        <p class="muted small" style="margin:8px 0 0">自動：端末の設定（ライト／ダーク）に合わせる</p>
      </div>
      <h3 class="sec">効果音</h3>
      <div class="card">
        <label class="switch"><span>正解・不正解の効果音<br><small class="muted">分野別・復習・基礎コースで1問ごと、模試は採点時に鳴る</small></span><input type="checkbox" data-act="set" data-k="sound" ${store.settings.sound ? 'checked' : ''}></label>
      </div>
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
      <p class="muted small mt center">俺たちの秋学期 v${VERSION} ・ 解答は公式のものではありません</p>
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
      if (navigator.share) return navigator.share({ title: '俺たちの秋学期', url }).catch(() => {});
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
    case 'lans': {
      const l = s.lessonById[lessonState.id];
      const i = +el.dataset.i;
      if (lessonState.answers[i] !== undefined) return;
      lessonState.answers[i] = +el.dataset.o;
      if (+el.dataset.o === l.questions[i].answer) { sfx.ok(); rewardCorrect(`${l.id}#${i}`); } else sfx.ng();
      document.getElementById('lq-' + i).outerHTML = lessonQ(l, l.questions[i], i);
      return lessonFinishCheck(s, l);
    }
    case 'lretry': { const l = s.lessonById[lessonState.id]; lessonState = null; viewLesson(s, l); window.scrollTo(0, 0); return; }
    case 'lnext': lessonState = null; return go(el.dataset.to);
    case 'line': {
      const tr = document.querySelector(`#code-${el.dataset.g} tr[data-line="${el.dataset.line}"]`);
      if (!tr) return;
      tr.scrollIntoView({ block: 'center', behavior: 'smooth' });
      tr.classList.add('flash'); setTimeout(() => tr.classList.remove('flash'), 1600);
      return;
    }
    case 'set':
      store.settings[el.dataset.k] = el.checked; save();
      if (el.dataset.k === 'sound') { sfx.enabled = el.checked; if (el.checked) sfx.ok(); }
      return;
    case 'theme':
      store.settings.theme = el.dataset.v; save(); applyTheme();
      document.querySelectorAll('[data-act=theme]').forEach((b) => b.setAttribute('aria-pressed', b === el));
      return;
    case 'fall': Object.keys(s.lectures).forEach((k) => fieldSel.lectures.add(k)); return viewField(s);
    case 'fnone': fieldSel.lectures.clear(); return viewField(s);
    case 'tall': Object.keys(s.types).forEach((k) => fieldSel.types.add(k)); return viewField(s);
    case 'tnone': fieldSel.types.clear(); return viewField(s);
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
