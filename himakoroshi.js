// ヒマコロシ — 講義中の暇つぶし（フクロウ育成・勉強ミニ・ミニゲーム）
// 参考：himakoroshi-ref.html を移植。保存は別キー oretachi:hima（本編の oretachi:v1 には触らない）。
// 音は鳴らさない（講義中に使うため）。

import DECKS from './data/hima-words.js';
import { makeRPG } from './rpg.js';

const KEY = 'oretachi:hima';
const DEF = {
  food: 3, xp: 0, level: 1, correct: 0, fed: 0, plays: 0, best: {},
  cards: [
    ['abandon', '見捨てる'], ['evacuate', '避難させる'], ['resilience', '回復力'], ['diplomacy', '外交'],
    ['hazard', '危険要因'], ['negotiate', '交渉する'], ['sovereignty', '主権'], ['infrastructure', '社会基盤'],
  ],
  daily: { d: '', ids: {} }, // 本編の正解でもらったエサ（1問1日1回）
  deck: 'all', // 単語クイズ・単語カードで最後に選んだ単語帳
};
let S;
try { S = Object.assign(structuredClone(DEF), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { S = structuredClone(DEF); }
if (!S.daily || typeof S.daily !== 'object') S.daily = { d: '', ids: {} };
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* 保存できない環境 */ } };

const rnd = (n) => Math.floor(Math.random() * n);
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const $ = (s) => document.querySelector(s);
let toastT;
function toast(m) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = m; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1600);
}
function addFood(n) { if (n <= 0) return; S.food += n; save(); renderTop(); }
function setBest(k, v, low) { const o = S.best[k]; if (o == null || (low ? v < o : v > o)) { S.best[k] = v; save(); return true; } return false; }

/* ---------- 単語帳（秋学期の科目の用語＋自分の単語） ---------- */
function deckCards(id) {
  if (id === 'mine') return S.cards;
  if (id === 'all') return [...DECKS.flatMap((d) => d.words), ...S.cards];
  return DECKS.find((d) => d.id === id)?.words || [];
}
function deckName(id) { return id === 'mine' ? '自分の単語' : id === 'all' ? '全部まぜる' : DECKS.find((d) => d.id === id)?.name || ''; }
// 単語帳を選ぶ画面（単語クイズ・単語カード共通）
function pickDeck(title, min, start) {
  openOv(title);
  const rows = [
    ...DECKS.map((d) => ({ id: d.id, mark: d.mark, color: d.color, name: d.name, n: d.words.length })),
    { id: 'mine', mark: '★', color: '#f59e0b', name: '自分の単語', n: S.cards.length },
    { id: 'all', mark: '全', color: '#64748b', name: '全部まぜる', n: deckCards('all').length },
  ];
  body().innerHTML = `<p class="muted small" style="align-self:stretch;margin:0 0 10px">どの単語帳で${title === '単語クイズ' ? '解く' : '覚える'}？</p>
    <div class="hk-decks">${rows.map((r) => `<button class="hk-deck${r.id === S.deck ? ' last' : ''}" data-deck="${r.id}" ${r.n < min ? 'disabled' : ''}>
      <span class="m" style="background:${r.color}">${esc(r.mark)}</span><span class="nm">${esc(r.name)}<small>${r.n}語${r.n < min ? `（${min}語以上必要）` : ''}</small></span><span class="go">›</span></button>`).join('')}</div>`;
  body().querySelector('.hk-decks').onclick = (e) => {
    const b = e.target.closest('[data-deck]'); if (!b || b.disabled) return;
    S.deck = b.dataset.deck; save(); start(S.deck);
  };
}

/* ---------- 本編との連携 ---------- */
const today = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
// 本編で正解したときに呼ぶ。同じ問題（key）は1日1回だけエサ+1。もらえたら true
export function rewardCorrect(key) {
  if (S.daily.d !== today()) S.daily = { d: today(), ids: {} };
  if (S.daily.ids[key]) return false;
  S.daily.ids[key] = 1;
  S.food++;
  save();
  return true;
}
export const himaFood = () => S.food;

/* ---------- フクロウ ---------- */
const need = (l) => l * 30;
const stage = () => (S.level >= 15 ? 3 : S.level >= 8 ? 2 : S.level >= 3 ? 1 : 0);
const STAGE_NAME = ['ひなフクロウ', '見習いフクロウ', '学生フクロウ', 'フクロウ博士'];
export function owlSVG(st = stage(), happy = false) {
  const s = [0.72, 0.85, 0.95, 1][st];
  const eye = happy
    ? '<path d="M190 248 q15 -14 30 0" stroke="#222" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M292 248 q15 -14 30 0" stroke="#222" stroke-width="9" fill="none" stroke-linecap="round"/>'
    : '<circle cx="215" cy="248" r="16" fill="#222"/><circle cx="317" cy="248" r="16" fill="#222"/><circle cx="221" cy="242" r="5" fill="#fff"/><circle cx="323" cy="242" r="5" fill="#fff"/>';
  const glasses = st >= 1 ? '<circle cx="205" cy="240" r="48" fill="none" stroke="#222" stroke-width="9"/><circle cx="307" cy="240" r="48" fill="none" stroke="#222" stroke-width="9"/><line x1="253" y1="240" x2="259" y2="240" stroke="#222" stroke-width="9"/>' : '';
  const book = st >= 2 ? '<rect x="160" y="370" width="190" height="80" rx="12" fill="#e53935"/><rect x="250" y="370" width="10" height="80" fill="#b71c1c"/><text x="185" y="425" font-size="34" font-family="sans-serif" font-weight="bold" fill="#fff">A+</text>' : '';
  const hat = st >= 3 ? '<polygon points="256,60 380,110 256,160 132,110" fill="#222"/><rect x="196" y="120" width="120" height="40" fill="#222"/><line x1="370" y1="112" x2="380" y2="180" stroke="#ffb300" stroke-width="6"/><circle cx="380" cy="184" r="9" fill="#ffb300"/>' : '';
  return `<svg viewBox="0 0 512 512"><g transform="translate(256 300) scale(${s}) translate(-256 -300)">
  <path d="M150 160 L180 110 L210 150 Z" fill="#8d6e63"/><path d="M362 160 L332 110 L302 150 Z" fill="#8d6e63"/>
  <ellipse cx="256" cy="290" rx="135" ry="150" fill="#8d6e63"/><ellipse cx="256" cy="330" rx="85" ry="95" fill="#d7ccc8"/>
  <circle cx="205" cy="240" r="44" fill="#fff"/><circle cx="307" cy="240" r="44" fill="#fff"/>
  ${eye}${glasses}<path d="M240 285 L256 310 L272 285 Z" fill="#ffb300"/>${book}${hat}</g></svg>`;
}
const LINES = {
  idle: ['ホー。', '講義、ちゃんと聞いてる？', 'ヒマなら勉強しよ', 'おなかすいた…', 'ノートとった？', 'あと何分？'],
  fed: ['うまい！', 'もっとちょうだい', '知識の味がする', 'ホッホー！'],
  poke: ['なに？', 'くすぐったい', '今いいとこなのに', '先生こっち見てるよ'],
  nofood: ['エサがない…勉強してきて', '計算アタックで🐛がもらえるよ'],
};
const say = (k) => { const a = LINES[k], el = $('#hk-say'); if (el) el.textContent = a[rnd(a.length)]; };
function renderTop() { const p = $('#hk-food'); if (p) p.textContent = '🐛 ' + S.food; }
function renderHome(happy) {
  if (!$('#hk-owl')) return;
  $('#hk-owl').innerHTML = owlSVG(stage(), happy);
  $('#hk-name').textContent = `Lv.${S.level} ${STAGE_NAME[stage()]}`;
  $('#hk-xpbar').style.width = Math.min(100, (S.xp / need(S.level)) * 100) + '%';
  $('#hk-xptext').textContent = `次のレベルまで ${need(S.level) - S.xp} XP`;
  $('#hk-stc').textContent = S.correct; $('#hk-stf').textContent = S.fed; $('#hk-stp').textContent = S.plays;
  renderTop();
}
function feed() {
  if (S.food <= 0) { say('nofood'); return; }
  S.food--; S.fed++; S.xp += 10;
  const before = stage(); let up = false;
  while (S.xp >= need(S.level)) { S.xp -= need(S.level); S.level++; up = true; }
  save(); renderHome(true); say('fed');
  if (up) toast(stage() > before ? `進化！${STAGE_NAME[stage()]}になった` : `レベルアップ！ Lv.${S.level}`);
  setTimeout(() => renderHome(false), 900);
}
function poke() { say('poke'); renderHome(true); setTimeout(() => renderHome(false), 600); }

/* ---------- 画面 ---------- */
let tab = 'home';
let $root = null;
const TABS = [['home', '🦉', 'ホーム'], ['quest', '⚔️', '冒険'], ['study', '📚', '勉強'], ['game', '🎮', 'ゲーム'], ['words', '🗂️', '単語']];
let rpg = null;

export function viewHima($app, top, api) {
  leaveHima();
  if (!rpg) rpg = makeRPG({ S, save, openOv, closeOv, body: () => body(), info: (t) => info(t), toast, setCleanup: (f) => { cleanup = f; }, esc, shuffle, rnd, owlSVG, DECKS, addFood, api });
  $app.innerHTML = `
    ${top('ヒマコロシ', { back: '', right: '<span class="hk-pill" id="hk-food"></span>' })}
    <main class="wrap hima" id="hk-main"></main>
    <nav class="hk-nav">${TABS.map(([k, i, n]) => `<button data-hk-tab="${k}" class="${k === tab ? 'on' : ''}"><span class="i">${i}</span>${n}</button>`).join('')}</nav>`;
  $root = $app;
  $app.querySelector('.hk-nav').addEventListener('click', (e) => {
    const b = e.target.closest('[data-hk-tab]'); if (!b) return;
    tab = b.dataset.hkTab;
    $app.querySelectorAll('.hk-nav button').forEach((x) => x.classList.toggle('on', x === b));
    renderTab();
  });
  $app.querySelector('#hk-main').addEventListener('click', onMainClick);
  renderTab();
}

function renderTab() {
  const m = $('#hk-main'); if (!m) return;
  window.scrollTo(0, 0);
  if (tab === 'quest') {
    m.onclick = null;
    rpg.renderQuestTab(m);
    renderTop();
    return;
  }
  m.onclick = null;
  if (tab === 'home') {
    m.innerHTML = `
      <div class="card hk-owlwrap">
        <div class="hk-bubble" id="hk-say">ホー。</div>
        <div id="hk-owl" class="hk-owl"></div>
        <div style="font-weight:800" id="hk-name"></div>
        <div class="hk-bar"><i id="hk-xpbar"></i></div>
        <div class="muted small" id="hk-xptext"></div>
      </div>
      <div class="row mt">
        <button class="btn" data-hk="feed">エサをあげる 🐛</button>
        <button class="btn sub" data-hk="poke">つつく</button>
      </div>
      <div class="card hk-stats mt">
        <div><b id="hk-stc">0</b>正解数</div>
        <div><b id="hk-stf">0</b>エサやり</div>
        <div><b id="hk-stp">0</b>ゲーム</div>
      </div>
      <p class="muted small center">勉強で正解するとエサ🐛がもらえる。エサでフクロウが育つ。<br>本編（模試・分野別・復習・基礎コース）の正解でも1問につき1日1回🐛+1。</p>`;
    say('idle'); renderHome();
  } else if (tab === 'study') {
    m.innerHTML = `
      <div class="hk-grid2 mt">
        <button class="hk-tile" data-open="calc"><span class="e">➗</span>計算アタック<small>60秒・1問🐛1</small></button>
        <button class="hk-tile" data-open="quiz"><span class="e">📝</span>単語クイズ<small>4択・1問🐛1・科目の用語も</small></button>
        <button class="hk-tile" data-open="flash"><span class="e">🃏</span>単語カード<small>めくって覚える・科目の用語も</small></button>
        <button class="hk-tile" data-open="brain"><span class="e">🧠</span>大小くらべ<small>30秒・脳トレ</small></button>
      </div>
      <div class="card mt"><b>ベスト記録</b><div class="muted small" id="hk-studybest" style="margin-top:6px"></div></div>`;
    renderStudyBest();
  } else if (tab === 'game') {
    m.innerHTML = `
      <div class="hk-grid2 mt">
        <button class="hk-tile" data-open="g2048"><span class="e">🔢</span>2048<small>スワイプ</small></button>
        <button class="hk-tile" data-open="block"><span class="e">🟦</span>ブロック<small>8×8に置いて消す</small></button>
        <button class="hk-tile" data-open="sudoku"><span class="e">9️⃣</span>数独<small>クリアで🐛5</small></button>
        <button class="hk-tile" data-open="mine"><span class="e">💣</span>マインスイーパー<small>クリアで🐛3</small></button>
      </div>
      <div class="card mt"><b>ベスト記録</b><div class="muted small" id="hk-gamebest" style="margin-top:6px"></div></div>`;
    renderGameBest();
  } else {
    m.innerHTML = `
      <div class="card mt">
        <b>単語を登録</b>
        <p class="muted small" style="margin:4px 0 8px">1行に「問題,答え」。まとめて貼り付けOK。</p>
        <textarea class="hk-input" id="hk-wordin" placeholder="apple,りんご&#10;evacuation,避難"></textarea>
        <button class="btn wide" data-hk="addwords" style="margin-top:8px">追加</button>
      </div>
      <div class="card mt">
        <div class="hk-wordhead"><b id="hk-wordcount">登録済み</b><button class="btn sub" data-hk="clearwords">全部消す</button></div>
        <ul class="hk-list" id="hk-wordlist"></ul>
      </div>
      <div class="card mt">
        <b>秋学期の単語帳</b>
        <p class="muted small" style="margin:4px 0 4px">単語クイズ・単語カードで選べる（中身は変えられない）</p>
        ${DECKS.map((d) => `<details class="hk-deckview"><summary><span class="m" style="background:${d.color}">${esc(d.mark)}</span>${esc(d.name)}<small>${d.words.length}語</small></summary>
          <ul class="hk-list">${d.words.map((w) => `<li><span><b>${esc(w[0])}</b>　${esc(w[1])}</span></li>`).join('')}</ul></details>`).join('')}
      </div>`;
    renderWords();
  }
  renderTop();
}
function renderStudyBest() { const b = S.best, el = $('#hk-studybest'); if (el) el.innerHTML = `計算アタック：${b.calc ?? '-'}問<br>大小くらべ：${b.brain ?? '-'}問<br>単語クイズ連続正解：${b.quiz ?? '-'}`; }
function renderGameBest() { const b = S.best, el = $('#hk-gamebest'); if (el) el.innerHTML = `2048：${b.g2048 ?? '-'}<br>ブロック：${b.block ?? '-'}<br>数独：${b.sudoku != null ? fmt(b.sudoku) : '-'}<br>マインスイーパー：${b.mine != null ? fmt(b.mine) : '-'}`; }
function renderWords() {
  if (!$('#hk-wordlist')) return;
  $('#hk-wordcount').textContent = `登録済み ${S.cards.length}語`;
  $('#hk-wordlist').innerHTML = S.cards.map((c, i) => `<li><span><b>${esc(c[0])}</b>　${esc(c[1])}</span><button data-del="${i}">削除</button></li>`).join('');
}

function onMainClick(e) {
  const op = e.target.closest('[data-open]'); if (op) return OPEN[op.dataset.open]();
  const del = e.target.closest('[data-del]'); if (del) { S.cards.splice(+del.dataset.del, 1); save(); renderWords(); return; }
  const h = e.target.closest('[data-hk]'); if (!h) return;
  const a = h.dataset.hk;
  if (a === 'feed') feed();
  else if (a === 'poke') poke();
  else if (a === 'addwords') {
    let n = 0;
    $('#hk-wordin').value.split('\n').forEach((l) => { const m = l.split(/[,，、\t]/); if (m.length >= 2 && m[0].trim() && m[1].trim()) { S.cards.push([m[0].trim(), m.slice(1).join(',').trim()]); n++; } });
    save(); $('#hk-wordin').value = ''; renderWords(); toast(n ? `${n}語追加した` : '「問題,答え」の形で入れてね');
  } else if (a === 'clearwords') {
    if (confirm('登録した単語を全部消す？')) { S.cards = []; save(); renderWords(); }
  }
}

/* ---------- オーバーレイ（勉強・ゲームの画面） ---------- */
let cleanup = null;
function openOv(title, inf = '') {
  if (cleanup) { cleanup(); cleanup = null; }
  let ov = $('#hk-ov');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'hk-ov'; ov.className = 'hk-ov';
    ov.innerHTML = `<div class="hk-ohead"><button id="hk-close">← 戻る</button><span class="t" id="hk-otitle"></span><span class="hk-timer" id="hk-oinfo"></span></div><div class="hk-obody" id="hk-obody"></div>`;
    document.body.appendChild(ov);
    ov.querySelector('#hk-close').onclick = closeOv;
  }
  $('#hk-otitle').textContent = title; $('#hk-oinfo').textContent = inf; $('#hk-obody').innerHTML = '';
  document.body.classList.add('hk-lock');
}
function closeOv() {
  if (cleanup) { cleanup(); cleanup = null; }
  $('#hk-ov')?.remove();
  document.body.classList.remove('hk-lock');
  renderTop(); renderStudyBest(); renderGameBest();
  if (tab === 'quest' && $('#hk-main')) renderTab();
}
// 画面を離れるとき（ルーターから呼ぶ）
export function leaveHima() { if (cleanup || $('#hk-ov')) closeOv(); $root = null; }
const info = (t) => { const el = $('#hk-oinfo'); if (el) el.textContent = t; };
const body = () => $('#hk-obody');
function timerLoop(sec, onTick, onEnd) {
  let left = sec; onTick(left);
  const id = setInterval(() => { left--; onTick(left); if (left <= 0) { clearInterval(id); onEnd(); } }, 1000);
  cleanup = () => clearInterval(id);
}
function resultView(title, big, sub, again) {
  if (!body()) return;
  body().innerHTML = `<div class="hk-result card"><div class="muted">${title}</div><div class="big">${big}</div><p>${sub}</p><div class="row"><button class="btn" id="hk-again">もう一回</button><button class="btn sub" id="hk-back">戻る</button></div></div>`;
  $('#hk-again').onclick = again; $('#hk-back').onclick = closeOv;
}
function study() { S.correct++; addFood(1); }

const OPEN = {};
/* ===== 計算アタック ===== */
OPEN.calc = () => {
  openOv('計算アタック'); let score = 0;
  const lv = Math.min(S.level, 20);
  function gen() {
    const op = ['+', '−', '×'][rnd(lv >= 3 ? 3 : 2)]; let a, b, ans;
    const m = 10 + lv * 4;
    if (op === '+') { a = rnd(m) + 2; b = rnd(m) + 2; ans = a + b; }
    else if (op === '−') { a = rnd(m) + 5; b = rnd(a) + 1; ans = a - b; }
    else { a = rnd(Math.min(9 + lv, 19)) + 2; b = rnd(9) + 2; ans = a * b; }
    const set = new Set([ans]); while (set.size < 4) { const d = ans + (rnd(2) ? 1 : -1) * (rnd(op === '×' ? b * 2 : 10) + 1); if (d >= 0) set.add(d); }
    return { q: `${a} ${op} ${b}`, ans, ch: shuffle([...set]) };
  }
  function show() {
    if (!body()) return;
    const p = gen();
    body().innerHTML = `<div class="hk-q">${p.q}</div><div class="hk-choices">${p.ch.map((c) => `<button>${c}</button>`).join('')}</div><p class="muted small">正解 ${score}問</p>`;
    body().querySelectorAll('.hk-choices button').forEach((b) => (b.onclick = () => {
      if (+b.textContent === p.ans) { score++; study(); b.classList.add('ok'); setTimeout(show, 150); }
      else { b.classList.add('ng'); setTimeout(show, 350); }
    }));
  }
  show();
  timerLoop(60, (t) => info(`残り${t}秒`), () => { const nb = setBest('calc', score); resultView('計算アタック', `${score}問`, `🐛${score}ゲット${nb ? '　ベスト更新！' : ''}`, OPEN.calc); });
};
/* ===== 大小くらべ ===== */
OPEN.brain = () => {
  openOv('大小くらべ'); let score = 0;
  function expr() { const a = rnd(20) + 1, b = rnd(12) + 1; const t = rnd(3); return t === 0 ? [`${a}+${b}`, a + b] : t === 1 ? [`${a + b}−${b}`, a] : [`${Math.min(a, 9)}×${Math.min(b, 9)}`, Math.min(a, 9) * Math.min(b, 9)]; }
  function show() {
    if (!body()) return;
    let L, R; do { L = expr(); R = expr(); } while (L[1] === R[1]);
    body().innerHTML = `<p class="muted small">大きいほうをタップ</p><div class="hk-choices" style="margin-top:20px"><button>${L[0]}</button><button>${R[0]}</button></div><p class="muted small">正解 ${score}問</p>`;
    const bs = body().querySelectorAll('.hk-choices button');
    bs[0].onclick = () => judge(L[1] > R[1], bs[0]); bs[1].onclick = () => judge(R[1] > L[1], bs[1]);
  }
  function judge(ok, b) { if (ok) { score++; if (score % 2 === 0) study(); else S.correct++; b.classList.add('ok'); setTimeout(show, 150); } else { b.classList.add('ng'); setTimeout(show, 350); } }
  show();
  timerLoop(30, (t) => info(`残り${t}秒`), () => { save(); const nb = setBest('brain', score); resultView('大小くらべ', `${score}問`, `🐛${Math.floor(score / 2)}ゲット${nb ? '　ベスト更新！' : ''}`, OPEN.brain); });
};
/* ===== 単語クイズ ===== */
OPEN.quiz = (deck) => (deck ? quiz(deck) : pickDeck('単語クイズ', 4, quiz));
function quiz(deck) {
  const cards = deckCards(deck);
  if (cards.length < 4) { toast('単語を4語以上登録してね'); return; }
  openOv('単語クイズ'); let streak = 0, total = 0;
  function show() {
    if (!body()) return;
    const pool = shuffle([...cards]); const c = pool[0]; const flip = rnd(2) === 1;
    const q = flip ? c[1] : c[0], a = flip ? c[0] : c[1];
    // 同じ問題文の別の単語（別の単語帳の同じ用語など）は選択肢に入れない
    const opts = shuffle([a, ...[...new Set(pool.slice(1).filter((x) => (flip ? x[1] : x[0]) !== q).map((x) => (flip ? x[0] : x[1])).filter((x) => x !== a))].slice(0, 3)]);
    info(`連続${streak}`);
    body().innerHTML = `<p class="muted small" style="margin:0">${esc(deckName(deck))}</p><div class="hk-q${q.length > 14 ? ' long' : ''}" style="font-size:28px">${esc(q)}</div><div class="hk-choices word">${opts.map((o) => `<button>${esc(o)}</button>`).join('')}</div><p class="muted small">正解 ${total}問</p>`;
    body().querySelectorAll('.hk-choices button').forEach((b, i) => (b.onclick = () => {
      if (opts[i] === a) { streak++; total++; study(); setBest('quiz', streak); b.classList.add('ok'); setTimeout(show, 250); }
      else { streak = 0; b.classList.add('ng'); body().querySelectorAll('.hk-choices button').forEach((x, j) => { if (opts[j] === a) x.classList.add('ok'); }); setTimeout(show, 1600); }
    }));
  }
  show();
}
/* ===== 単語カード ===== */
OPEN.flash = (id) => (id ? flash(id) : pickDeck('単語カード', 1, flash));
function flash(id) {
  const cards = deckCards(id);
  if (!cards.length) { toast('単語を登録してね'); return; }
  openOv('単語カード'); const deck = shuffle([...cards]); let i = 0, open = false, known = 0;
  function show() {
    if (i >= deck.length) { resultView('単語カード', `${known}/${deck.length}`, '覚えた数', () => OPEN.flash(id)); return; }
    const c = deck[i]; info(`${i + 1}/${deck.length}`);
    body().innerHTML = `<p class="muted small" style="margin:0">${esc(deckName(id))}</p><div class="hk-flash${(open ? c[1] : c[0]).length > 14 ? ' long' : ''}" id="hk-fc">${esc(open ? c[1] : c[0])}</div><p class="muted small">タップでめくる</p><div class="row" style="width:100%;max-width:420px"><button class="btn sub" id="hk-no">まだ</button><button class="btn" id="hk-yes">覚えた</button></div>`;
    $('#hk-fc').onclick = () => { open = !open; show(); };
    $('#hk-no').onclick = () => { open = false; i++; show(); };
    $('#hk-yes').onclick = () => { open = false; i++; known++; show(); };
  }
  show();
}

/* ===== 2048 ===== */
OPEN.g2048 = () => {
  openOv('2048'); const b = Array(16).fill(0); let score = 0, over = false;
  const COL = { 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e' };
  function add() { const e = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0); if (e.length) b[e[rnd(e.length)]] = rnd(10) ? 2 : 4; }
  function line(a) { const f = a.filter((x) => x); const r = []; for (let i = 0; i < f.length; i++) { if (f[i] === f[i + 1]) { r.push(f[i] * 2); score += f[i] * 2; i++; } else r.push(f[i]); } while (r.length < 4) r.push(0); return r; }
  function move(d) { // 0左 1右 2上 3下
    if (over) return; const old = b.join();
    for (let k = 0; k < 4; k++) {
      const idx = [0, 1, 2, 3].map((j) => (d < 2 ? k * 4 + j : j * 4 + k)); if (d === 1 || d === 3) idx.reverse();
      const r = line(idx.map((i) => b[i])); idx.forEach((i, j) => (b[i] = r[j]));
    }
    if (b.join() !== old) { add(); draw(); if (dead()) { over = true; end(); } }
  }
  function dead() { if (b.includes(0)) return false; for (let i = 0; i < 16; i++) { if (i % 4 < 3 && b[i] === b[i + 1]) return false; if (i < 12 && b[i] === b[i + 4]) return false; } return true; }
  function end() { S.plays++; const f = Math.floor(score / 500); addFood(f); save(); const nb = setBest('g2048', score); setTimeout(() => body() && resultView('2048', score, `🐛${f}ゲット${nb ? '　ベスト更新！' : ''}`, OPEN.g2048), 600); }
  body().innerHTML = `<div class="hk-2048" id="hk-bd"></div><p class="muted small">スワイプで動かす</p><button class="btn sub" id="hk-giveup" style="max-width:200px">やめる</button>`;
  function draw() { info(`${score}点`); $('#hk-bd').innerHTML = b.map((v) => `<div style="${v ? `background:${COL[v] || '#3c3a32'};color:${v > 4 ? '#fff' : '#776e65'}` : ''}">${v || ''}</div>`).join(''); }
  let sx, sy; const bd = $('#hk-bd');
  bd.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  bd.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; Math.abs(dx) > Math.abs(dy) ? move(dx < 0 ? 0 : 1) : move(dy < 0 ? 2 : 3); });
  const kd = (e) => { const m = { ArrowLeft: 0, ArrowRight: 1, ArrowUp: 2, ArrowDown: 3 }[e.key]; if (m != null) { e.preventDefault(); move(m); } };
  document.addEventListener('keydown', kd); cleanup = () => document.removeEventListener('keydown', kd);
  $('#hk-giveup').onclick = () => { if (!over) { over = true; end(); } };
  add(); add(); draw();
};

/* ===== ブロック ===== */
OPEN.block = () => {
  openOv('ブロック');
  const SH = [[[0, 0]], [[0, 0], [0, 1]], [[0, 0], [1, 0]], [[0, 0], [0, 1], [0, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [1, 0], [1, 1]], [[0, 1], [1, 0], [1, 1]], [[0, 0], [0, 1], [1, 0]], [[0, 0], [0, 1], [1, 1]], [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 0], [1, 0], [2, 0], [2, 1]], [[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]];
  const g = Array(64).fill(0); let pcs = [], sel = -1, score = 0, over = false;
  const deal = () => { pcs = [0, 1, 2].map(() => SH[rnd(SH.length)]); };
  const fits = (p, r, c) => p.every(([dr, dc]) => { const R = r + dr, C = c + dc; return R < 8 && C < 8 && !g[R * 8 + C]; });
  const anyFit = (p) => { for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (fits(p, r, c)) return true; return false; };
  body().innerHTML = `<div class="hk-blk" id="hk-bg"></div><div class="hk-pieces" id="hk-pc"></div><p class="muted small">ピースを選んで、置きたい場所（左上）をタップ</p>`;
  function draw() {
    info(`${score}点`);
    $('#hk-bg').innerHTML = g.map((v, i) => `<div data-i="${i}" class="${v ? 'f' : ''}"></div>`).join('');
    $('#hk-pc').innerHTML = pcs.map((p, i) => {
      if (!p) return '<div style="width:60px"></div>';
      const h = Math.max(...p.map((x) => x[0])) + 1, w = Math.max(...p.map((x) => x[1])) + 1; let cells = '';
      for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) cells += p.some((x) => x[0] === r && x[1] === c) ? '<i></i>' : '<i class="e"></i>';
      return `<div class="hk-piece ${i === sel ? 'sel' : ''}" data-p="${i}" style="grid-template-columns:repeat(${w},16px)">${cells}</div>`;
    }).join('');
  }
  $('#hk-pc').onclick = (e) => { const p = e.target.closest('[data-p]'); if (p) { sel = +p.dataset.p; draw(); } };
  $('#hk-bg').onclick = (e) => {
    if (over || sel < 0 || !pcs[sel]) return; const i = +e.target.dataset.i; if (isNaN(i)) return;
    const r = Math.floor(i / 8), c = i % 8, p = pcs[sel];
    if (!fits(p, r, c)) { toast('そこには置けない'); return; }
    p.forEach(([dr, dc]) => (g[(r + dr) * 8 + c + dc] = 1)); score += p.length;
    const rows = [], cols = []; for (let k = 0; k < 8; k++) { if ([...Array(8)].every((_, j) => g[k * 8 + j])) rows.push(k); if ([...Array(8)].every((_, j) => g[j * 8 + k])) cols.push(k); }
    rows.forEach((k) => { for (let j = 0; j < 8; j++) g[k * 8 + j] = 0; }); cols.forEach((k) => { for (let j = 0; j < 8; j++) g[j * 8 + k] = 0; });
    const n = rows.length + cols.length; if (n) { score += n * 10 * n; toast(n > 1 ? `${n}ライン！` : '1ライン'); }
    pcs[sel] = null; sel = -1; if (pcs.every((x) => !x)) deal();
    draw();
    if (!pcs.some((x) => x && anyFit(x))) { over = true; S.plays++; const f = Math.floor(score / 100); addFood(f); save(); const nb = setBest('block', score); setTimeout(() => body() && resultView('ブロック', score, `🐛${f}ゲット${nb ? '　ベスト更新！' : ''}`, OPEN.block), 700); }
  };
  deal(); draw();
};

/* ===== 数独 ===== */
OPEN.sudoku = () => {
  openOv('数独');
  const full = Array(81).fill(0);
  const ok = (a, i, v) => { const r = Math.floor(i / 9), c = i % 9; for (let k = 0; k < 9; k++) { if (a[r * 9 + k] === v || a[k * 9 + c] === v) return false; } const br = r - (r % 3), bc = c - (c % 3); for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (a[(br + y) * 9 + bc + x] === v) return false; return true; };
  (function fill(i) { if (i === 81) return true; for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) { if (ok(full, i, v)) { full[i] = v; if (fill(i + 1)) return true; full[i] = 0; } } return false; })(0);
  const giv = full.slice(); shuffle([...Array(81).keys()]).slice(0, 46).forEach((i) => (giv[i] = 0));
  const cur = giv.slice(); let sel = -1, sec = 0, done = false;
  body().innerHTML = `<div class="hk-sdk" id="hk-sg"></div><div class="hk-pad" id="hk-sp">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button>${n}</button>`).join('')}<button>消</button></div>`;
  function conflict(i) { const v = cur[i]; if (!v) return false; cur[i] = 0; const r = !ok(cur, i, v); cur[i] = v; return r; }
  function draw() {
    const sv = sel >= 0 ? cur[sel] : 0;
    $('#hk-sg').innerHTML = cur.map((v, i) => { const c = i % 9, r = Math.floor(i / 9); let cl = giv[i] ? 'g' : 'u'; if (c === 2 || c === 5) cl += ' br'; if (r === 2 || r === 5) cl += ' bb'; if (i === sel) cl += ' sel'; else if (sv && v === sv) cl += ' same'; if (!giv[i] && conflict(i)) cl += ' bad'; return `<div data-i="${i}" class="${cl}">${v || ''}</div>`; }).join('');
  }
  $('#hk-sg').onclick = (e) => { const i = e.target.dataset.i; if (i != null) { sel = +i; draw(); } };
  $('#hk-sp').onclick = (e) => {
    if (done || sel < 0 || giv[sel] || e.target.tagName !== 'BUTTON') return;
    const t = e.target.textContent; cur[sel] = t === '消' ? 0 : +t; draw();
    if (cur.every((v, i) => v && !conflict(i))) { done = true; stop(); S.plays++; addFood(5); const nb = setBest('sudoku', sec, true); setTimeout(() => body() && resultView('数独クリア', fmt(sec), `🐛5ゲット${nb ? '　ベスト更新！' : ''}`, OPEN.sudoku), 500); }
  };
  const id = setInterval(() => { sec++; info(fmt(sec)); }, 1000); const stop = () => clearInterval(id); cleanup = stop;
  info('0:00'); draw();
};

/* ===== マインスイーパー ===== */
OPEN.mine = () => {
  openOv('マインスイーパー');
  const N = 9, M = 10; let mines = null, flagMode = false, over = false, sec = 0, id = null;
  const open = Array(81).fill(0), flag = Array(81).fill(0);
  const nb = (i) => { const r = Math.floor(i / N), c = i % N, a = []; for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { if (!dr && !dc) continue; const R = r + dr, C = c + dc; if (R >= 0 && R < N && C >= 0 && C < N) a.push(R * N + C); } return a; };
  const cnt = (i) => nb(i).filter((j) => mines[j]).length;
  function place(safe) { mines = Array(81).fill(0); const ban = new Set([safe, ...nb(safe)]); shuffle([...Array(81).keys()].filter((i) => !ban.has(i))).slice(0, M).forEach((i) => (mines[i] = 1)); id = setInterval(() => { sec++; info(`💣${M - flag.filter((x) => x).length}　${fmt(sec)}`); }, 1000); cleanup = () => clearInterval(id); }
  function reveal(i) { if (open[i] || flag[i]) return; open[i] = 1; if (!mines[i] && cnt(i) === 0) nb(i).forEach(reveal); }
  const NC = ['', '#1565c0', '#2e7d32', '#c62828', '#283593', '#6d4c41', '#00838f', '#000', '#555'];
  body().innerHTML = `<div class="hk-mine" id="hk-mg"></div><div class="hk-mtool"><button class="btn sub" id="hk-mf">🚩 旗モード：OFF</button></div>`;
  function draw(boom) {
    info(`💣${M - flag.filter((x) => x).length}　${fmt(sec)}`);
    $('#hk-mg').innerHTML = open.map((o, i) => { if (o) { if (mines[i]) return '<div class="o boom">💣</div>'; const n = cnt(i); return `<div class="o" style="color:${NC[n]}">${n || ''}</div>`; } if (boom && mines[i]) return `<div data-i="${i}">💣</div>`; return `<div data-i="${i}">${flag[i] ? '🚩' : ''}</div>`; }).join('');
  }
  $('#hk-mf').onclick = () => { flagMode = !flagMode; $('#hk-mf').textContent = `🚩 旗モード：${flagMode ? 'ON' : 'OFF'}`; $('#hk-mf').className = 'btn ' + (flagMode ? 'hk-red' : 'sub'); };
  $('#hk-mg').onclick = (e) => {
    const i = e.target.dataset.i; if (over || i == null) return; const k = +i;
    if (flagMode) { if (!open[k]) { flag[k] ^= 1; draw(); } return; }
    if (flag[k]) return; if (!mines) place(k);
    if (mines[k]) { open[k] = 1; over = true; clearInterval(id); S.plays++; save(); draw(true); setTimeout(() => body() && resultView('ドカン', '💥', 'また挑戦しよう', OPEN.mine), 900); return; }
    reveal(k); draw();
    if (open.filter((o, j) => o && !mines[j]).length === 81 - M) { over = true; clearInterval(id); S.plays++; addFood(3); const b = setBest('mine', sec, true); setTimeout(() => body() && resultView('クリア！', fmt(sec), `🐛3ゲット${b ? '　ベスト更新！' : ''}`, OPEN.mine), 500); }
  };
  draw();
};
