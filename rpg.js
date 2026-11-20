// ヒマコロシ「冒険」— 問題に答えてバグ（敵）と戦うクイズRPG
// 主人公はアプリのアイコンの人。仲間はガチャで集めて育てる。キャラ・敵・物語はすべてオリジナル。
// 雑魚戦：単語帳（data/hima-words.js）の4択 ／ ボス戦：本編のその回の5択（コード・図つき）
// 保存は ヒマコロシの S.rpg（キー oretachi:hima）
import { bgm } from './bgm.js';
import { ENEMIES } from './enemies.js';

/* ---------- データ ---------- */
// 仲間。subj が一致するステージでは攻撃力×1.5（'all' はどこでも×1.2）
// スキル：heal（HP回復 pow割合）／dmg（攻撃力×pow のダメージ）／time（制限時間+pow秒）／guard（次の pow 回の被ダメ半分）／hint（不正解の選択肢を2つ消す）
export const CHARS = {
  owl: { name: 'フクロウ', icon: 'owl', rar: 2, subj: 'all', hp: 70, atk: 14, skill: { kind: 'heal', pow: 0.3, cost: 3, name: 'ホーホーの歌' } },
  piyo: { name: 'ピヨ', icon: '🐣', rar: 1, subj: 'ccpp', hp: 50, atk: 10, skill: { kind: 'heal', pow: 0.15, cost: 3, name: 'ぴよぴよ' } },
  chu: { name: 'チュー', icon: '🐭', rar: 1, subj: 'ccpp', hp: 45, atk: 12, skill: { kind: 'dmg', pow: 2, cost: 3, name: 'かじりつく' } },
  kero: { name: 'ケロ', icon: '🐸', rar: 1, subj: 'db', hp: 55, atk: 10, skill: { kind: 'dmg', pow: 2, cost: 3, name: 'ケロケロ砲' } },
  mimi: { name: 'ミミ', icon: '🐰', rar: 1, subj: 'db', hp: 50, atk: 11, skill: { kind: 'heal', pow: 0.15, cost: 3, name: 'にんじん' } },
  maimai: { name: 'マイマイ', icon: '🐌', rar: 1, subj: 'sd', hp: 65, atk: 8, skill: { kind: 'time', pow: 5, cost: 3, name: 'のんびり' } },
  kame: { name: 'カメキチ', icon: '🐢', rar: 1, subj: 'sd', hp: 70, atk: 8, skill: { kind: 'guard', pow: 2, cost: 3, name: 'こうらガード' } },
  pen: { name: 'ペン', icon: '🐧', rar: 2, subj: 'ccpp', hp: 70, atk: 16, skill: { kind: 'time', pow: 8, cost: 3, name: 'ひんやり' } },
  tora: { name: 'トラ', icon: '🐯', rar: 2, subj: 'ccpp', hp: 75, atk: 20, skill: { kind: 'dmg', pow: 3, cost: 4, name: 'ツメの一撃' } },
  konko: { name: 'コンコ', icon: '🦊', rar: 2, subj: 'db', hp: 70, atk: 19, skill: { kind: 'dmg', pow: 3, cost: 4, name: 'きつね火' } },
  kuma: { name: 'クマ', icon: '🐻', rar: 2, subj: 'db', hp: 95, atk: 14, skill: { kind: 'guard', pow: 3, cost: 3, name: 'どっしり' } },
  panda: { name: 'パンダ先輩', icon: '🐼', rar: 2, subj: 'sd', hp: 85, atk: 15, skill: { kind: 'heal', pow: 0.35, cost: 4, name: 'ささの差し入れ' } },
  robo: { name: 'ロボ博士', icon: '🤖', rar: 3, subj: 'ccpp', hp: 100, atk: 28, skill: { kind: 'dmg', pow: 4, cost: 4, name: 'コンパイル砲' } },
  kujira: { name: 'クジラ', icon: '🐳', rar: 3, subj: 'db', hp: 130, atk: 22, skill: { kind: 'heal', pow: 0.6, cost: 4, name: 'しおふき' } },
  chou: { name: 'チョウ', icon: '🦋', rar: 3, subj: 'sd', hp: 90, atk: 26, skill: { kind: 'time', pow: 15, cost: 3, name: 'りんぷん' } },
  yuni: { name: 'ユニ', icon: '🦄', rar: 3, subj: 'all', hp: 110, atk: 24, skill: { kind: 'heal', pow: 1, cost: 5, name: 'にじの癒し' } },
  ryu: { name: 'リュウ', icon: '🐉', rar: 3, subj: 'all', hp: 120, atk: 30, skill: { kind: 'dmg', pow: 5, cost: 5, name: 'りゅうのいぶき' } },
};
const HERO = { name: '主人公', hp: 100, atk: 20, skill: { kind: 'hint', pow: 2, cost: 4, name: 'ひらめき' } };
const SKILL_DESC = {
  heal: (k) => `パーティのHPを${Math.round(k.pow * 100)}%回復`,
  dmg: (k) => `攻撃力×${k.pow} のダメージ`,
  time: (k) => `制限時間を${k.pow}秒のばす`,
  guard: (k) => `次の${k.pow}回、受けるダメージ半分`,
  hint: () => '不正解の選択肢を2つ消す',
};
const RAR = ['', '★', '★★', '★★★'];

// 敵（バグ）は enemies.js
// 難易度（周回用）：ノーマル → ハード → ゲキムズ
const DIFF = [
  { name: 'ノーマル', tag: '', hp: 1, atk: 1, time: 1, rew: 1 },
  { name: 'ハード', tag: '🔥', hp: 1.6, atk: 1.5, time: 0.85, rew: 1.8 },
  { name: 'ゲキムズ', tag: '💀', hp: 2.5, atk: 2.2, time: 0.7, rew: 3 },
];
// デイリー・ウィークリー目標
const DAILY = [
  { id: 'stage', name: 'ステージを3回クリア', n: 3, coins: 60, food: 1 },
  { id: 'zako', name: '雑魚を10体たおす', n: 10, coins: 60, food: 1 },
  { id: 'correct', name: 'バトルで20問正解', n: 20, coins: 60, food: 1 },
];
const WEEKLY = [
  { id: 'boss', name: 'ボスを5回たおす', n: 5, coins: 300, food: 3 },
  { id: 'stage', name: 'ステージを20回クリア', n: 20, coins: 300, food: 3 },
  { id: 'star3', name: '★3を5回とる', n: 5, coins: 300, food: 3 },
  { id: 'hard', name: 'ハード以上を3回クリア', n: 3, coins: 300, food: 3 },
];
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayKey = () => ymd(new Date());
const weekKey = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return ymd(d); }; // 月曜はじまり
// 図鑑：科目ごとの全部の敵 [{key,name,icon,desc,kind,lec}]
function allEnemies(subj) {
  const E = ENEMIES[subj], out = [];
  for (const [k, b] of Object.entries(E.boss)) out.push({ kind: 'boss', lec: k, name: b[0], icon: b[1], desc: b[2] });
  for (const [k, zs] of Object.entries(E.lec)) for (const z of zs) out.push({ kind: 'lec', lec: k, name: z[0], icon: z[1], desc: z[2] });
  for (const z of E.common) out.push({ kind: 'common', name: z[0], icon: z[1], desc: z[2] });
  out.push({ kind: 'rare', name: E.rare[0], icon: E.rare[1], desc: E.rare[2] });
  return out.map((x) => ({ ...x, key: `${subj}|${x.name}` }));
}

/* ---------- 計算 ---------- */
const needExp = (lv) => lv * 50;
const statOf = (base, lv) => Math.round(base * (1 + (lv - 1) * 0.12));
const SUBJ = [['ccpp', 'C/C++'], ['db', 'DB'], ['sd', '設計']];

export function makeRPG(ctx) {
  const { S, save, openOv, closeOv, body, info, toast, setCleanup, esc, shuffle, rnd, owlSVG, DECKS, addFood, api } = ctx;
  const R = () => {
    if (!S.rpg) S.rpg = { coins: 300, hero: { lv: 1, exp: 0 }, owned: { owl: S.owl || { lv: 1, exp: 0 } }, party: ['owl'], clear: {}, subj: 'ccpp', pulls: 0 };
    const r = S.rpg;
    if (S.owl && r.owned.owl !== S.owl) r.owned.owl = S.owl; // フクロウはホームと共通
    if (!r.heroName) r.heroName = '主人公';
    if (!r.sound) r.sound = 'silent'; // 'silent' | 'bgm'（講義中に使うので最初はサイレント）
    if (!r.stars) { r.stars = {}; for (const id of Object.keys(r.clear)) r.stars[`${id}#0`] = 1; } // 前のデータのクリアは★1から
    if (!r.zukan) r.zukan = {};
    return r;
  };
  bgm.setEnabled(R().sound === 'bgm');
  let lectures = null; // { ccpp: {1:'第1回 …'}, … }
  const heroName = () => R().heroName;

  const iconHTML = (id, cls = '') => {
    if (id === 'hero') return `<img class="rp-face ${cls}" src="icons/icon-192.png" alt="">`;
    const c = CHARS[id];
    return c.icon === 'owl' ? `<span class="rp-face rp-owl ${cls}">${owlSVG(2)}</span>` : `<span class="rp-face rp-emo ${cls}">${c.icon}</span>`;
  };
  const member = (id) => {
    const r = R();
    if (id === 'hero') return { id, name: heroName(), lv: r.hero.lv, hp: statOf(HERO.hp, r.hero.lv), atk: statOf(HERO.atk, r.hero.lv), skill: HERO.skill, subj: null };
    const c = CHARS[id], o = r.owned[id];
    return { id, name: c.name, lv: o.lv, hp: statOf(c.hp, o.lv), atk: statOf(c.atk, o.lv), skill: c.skill, subj: c.subj, rar: c.rar };
  };
  const team = () => ['hero', ...R().party.filter((id) => R().owned[id])].map(member);
  const darkOv = () => document.getElementById('hk-ov')?.classList.add('rp-ov');

  /* ---------- 冒険（ゲーム画面）：下のゲーム用タブで マップ・編成・ガチャ・図鑑・目標 ---------- */
  let gtab = 'map', $m = null;
  const GTABS = [['map', '🗺️', 'マップ'], ['party', '👥', '編成'], ['gacha', '🎁', 'ガチャ'], ['zukan', '📖', '図鑑'], ['goals', '🎯', '目標']];
  async function renderQuestTab(m) {
    $m = m;
    if (!lectures) lectures = await api.lectures();
    const canClaim = goalList().some((g) => g.done && !g.got);
    m.innerHTML = `<div id="rp-page"></div>
      <nav class="rp-gnav">${GTABS.map(([k, i, n]) => `<button data-gtab="${k}" class="${k === gtab ? 'on' : ''}"><span class="i">${i}</span>${n}${k === 'goals' && canClaim ? '<em class="rp-dot"></em>' : ''}</button>`).join('')}</nav>`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-gtab]'); if (!b) return;
      bgm.sfx('tap'); gtab = b.dataset.gtab; renderQuestTab(m);
    };
    const pg = m.querySelector('#rp-page');
    window.scrollTo(0, 0);
    if (gtab === 'map') renderMap(pg);
    else if (gtab === 'party') openParty(pg);
    else if (gtab === 'gacha') openGacha(pg);
    else if (gtab === 'zukan') renderZukan(pg);
    else renderGoals(pg);
    bgm.play('map');
  }
  const starsOf = (id) => [0, 1, 2].map((d) => R().stars[`${id}#${d}`] || 0);
  const starTxt = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
  function renderMap(m) {
    const r = R();
    const t = team();
    const chapters = Object.entries(lectures[r.subj] || {});
    // 下から上へ：各章 章の看板 → ステージ1 → ステージ2 → ボス
    const rows = [];
    chapters.forEach(([k, v], ci) => {
      const mt = v.match(/^(第\S+?回)\s*(.*)$/) || [null, v, ''];
      rows.push({ kind: 'sign', no: mt[1], title: mt[2], ci });
      [1, 2, 3].forEach((n) => rows.push({ kind: 'node', k, n, ci, open: isOpen(r.subj, k, n, ci), done: !!r.clear[`${r.subj}-${k}-${n}`] }));
    });
    const nodes = rows.filter((x) => x.kind === 'node');
    const here = nodes.find((x) => x.open && !x.done) || nodes[nodes.length - 1];
    const RH = { node: 96, sign: 58 };
    let y = 40; const pos = [];
    for (let i = 0; i < rows.length; i++) {
      const x = rows[i];
      const h = RH[x.kind];
      pos[i] = { y: y + h / 2, x: x.kind === 'sign' ? 50 : x.n === 3 ? 50 : x.n === 1 ? 28 : 72 };
      y += h;
    }
    const H = y + 30;
    const Y = (i) => H - pos[i].y; // 下から積む
    const pts = rows.map((x, i) => (x.kind === 'node' ? `${pos[i].x},${Y(i)}` : null)).filter(Boolean).join(' ');
    const doneIdx = rows.map((x, i) => (x.kind === 'node' && x.done ? i : -1)).filter((i) => i >= 0);
    const lastDone = doneIdx.length ? doneIdx[doneIdx.length - 1] : -1;
    const donePts = rows.slice(0, lastDone + 2).map((x, i) => (x.kind === 'node' ? `${pos[i].x},${Y(i)}` : null)).filter(Boolean).join(' ');
    const E = ENEMIES[r.subj];
    m.innerHTML = `
      <div class="rp-hud">
        <div class="rp-hudtop">
          <img class="rp-heroimg" src="icons/icon-192.png" alt="">
          <div class="rp-herotxt">
            <button class="rp-name" data-rp="rename"><b>${esc(heroName())}</b><span>✏️</span></button>
            <div class="rp-lv">Lv.${r.hero.lv}<span class="rp-exp"><i style="width:${(r.hero.exp / needExp(r.hero.lv)) * 100}%"></i></span></div>
          </div>
          <div class="rp-hudright">
            <span class="rp-coin">🪙 ${r.coins}</span>
            <button class="rp-sound" data-rp="sound" aria-label="音の切り替え">${r.sound === 'bgm' ? '🎵 BGM' : '🔇 サイレント'}</button>
          </div>
        </div>
        <div class="rp-hudparty">
          <div class="rp-faces">${t.map((x) => iconHTML(x.id, 'sm')).join('')}${Array(4 - t.length).fill('<span class="rp-face sm empty">＋</span>').join('')}</div>
          <div class="rp-stat"><span>HP <b>${t.reduce((a, x) => a + x.hp, 0)}</b></span><span>攻撃 <b>${t.reduce((a, x) => a + x.atk, 0)}</b></span></div>
        </div>
        <div class="seg rp-seg" role="group">${SUBJ.map(([k, n]) => `<button data-rp="subj" data-k="${k}" aria-pressed="${r.subj === k}">${n}</button>`).join('')}</div>
      </div>
      <div class="rp-mapbox" id="rp-mapbox"><div class="rp-map" style="height:${H}px">
        <svg class="rp-road" viewBox="0 0 100 ${H}" preserveAspectRatio="none"><polyline points="${pts}" class="all"/>${donePts ? `<polyline points="${donePts}" class="done"/>` : ''}</svg>
        ${rows.map((x, i) => {
          const top = Y(i);
          if (x.kind === 'sign') return `<div class="rp-sign" style="top:${top}px"><b>${esc(x.no)}</b><span>${esc(x.title)}</span></div>`;
          const isHere = x === here;
          const boss = x.n === 3;
          const st = starsOf(`${r.subj}-${x.k}-${x.n}`), best = Math.max(...st), dmax = st[2] ? 2 : st[1] ? 1 : 0;
          return `<button class="rp-spot${boss ? ' boss' : ''}${x.done ? ' done' : ''}${isHere ? ' here' : ''}" style="left:${pos[i].x}%;top:${top}px" data-rp="stage" data-k="${x.k}" data-n="${x.n}" ${x.open ? '' : 'disabled'}>
            <span class="c">${!x.open ? '🔒' : boss ? esc(E.boss[x.k]?.[1] || '👑') : x.n}</span>
            <small>${boss ? 'BOSS' : 'STAGE ' + x.n}${x.done ? ` <i class="rp-stars">${starTxt(best)}</i>${DIFF[dmax].tag}` : ''}</small>
            ${isHere ? '<img class="rp-me" src="icons/icon-192.png" alt="">' : ''}
          </button>`;
        }).join('')}
      </div></div>
      <p class="rp-tip">クリアしたステージはハード🔥・ゲキムズ💀で周回できる。</p>`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-rp]'); if (!b || b.disabled) return;
      e.stopPropagation();
      const a = b.dataset.rp;
      bgm.sfx('tap');
      if (a === 'subj') { R().subj = b.dataset.k; save(); renderMap(m); }
      else if (a === 'rename') openRename();
      else if (a === 'sound') {
        const r2 = R(); r2.sound = r2.sound === 'bgm' ? 'silent' : 'bgm'; save();
        bgm.setEnabled(r2.sound === 'bgm');
        if (r2.sound === 'bgm') bgm.play('map');
        toast(r2.sound === 'bgm' ? '🎵 BGMモード：音楽と効果音が鳴る' : '🔇 サイレントモード：音は鳴らない');
        renderMap(m);
      } else if (a === 'stage') openStage(m, R().subj, b.dataset.k, +b.dataset.n);
    };
    // いる場所まで自動でスクロール
    requestAnimationFrame(() => {
      const box = m.querySelector('#rp-mapbox'), here2 = m.querySelector('.rp-spot.here');
      if (box && here2) box.scrollTop = here2.offsetTop - box.clientHeight / 2;
    });
  }

  // ステージをタップ：出てくる敵・難易度・★を見て出撃
  function openStage(m, subj, k, n) {
    const r = R(), id = `${subj}-${k}-${n}`, st = starsOf(id), boss = n === 3, E = ENEMIES[subj];
    const no = (lectures[subj][k].match(/^(第\S+?回)/) || [lectures[subj][k]])[0];
    const foes = boss ? [E.boss[k]] : [...(E.lec[k] || []), ...E.common];
    const seen = (nm) => (r.zukan[`${subj}|${nm}`] || 0) > 0;
    let d = Math.min(2, st[2] ? 2 : st[1] ? 2 : st[0] ? 1 : 0); // 次の難易度を初期選択
    if (!r.clear[id]) d = 0;
    const draw = () => {
      sh.innerHTML = `<div class="rp-sheet-in">
        <div class="rp-sheet-h"><b>${esc(no)} ${boss ? 'BOSS' : 'STAGE ' + n}</b><button class="rp-x" data-sx aria-label="閉じる">✕</button></div>
        <div class="rp-sfoes">${foes.slice(0, boss ? 1 : 8).map((f) => `<span class="${seen(f[0]) ? '' : 'unk'}">${seen(f[0]) ? f[1] : '？'}</span>`).join('')}${boss ? '' : '<span class="rare">🌟?</span>'}</div>
        <div class="rp-diffs">${DIFF.map((x, i) => {
          const open = i === 0 || st[i - 1] > 0;
          return `<button class="rp-diff${d === i ? ' on' : ''}" data-d="${i}" ${open ? '' : 'disabled'}><b>${x.tag}${x.name}</b><i class="rp-stars">${open ? starTxt(st[i]) : '🔒'}</i><small>${i ? `報酬×${x.rew}` : open ? '' : ''}${!open ? `${DIFF[i - 1].name}をクリアで解放` : ''}</small></button>`;
        }).join('')}</div>
        <p class="rp-starrule">★1 クリア　★2 HPを半分以上残す　★3 ノーミス</p>
        <button class="rp-btn gold big wide" data-go>出撃！</button></div>`;
    };
    const sh = document.createElement('div'); sh.className = 'rp-sheet';
    m.appendChild(sh); draw();
    sh.onclick = (e) => {
      e.stopPropagation();
      if (e.target === sh || e.target.closest('[data-sx]')) { sh.remove(); return; }
      const db = e.target.closest('[data-d]'); if (db && !db.disabled) { d = +db.dataset.d; bgm.sfx('tap'); draw(); return; }
      if (e.target.closest('[data-go]')) { sh.remove(); startBattle(subj, k, n, d); }
    };
  }

  /* ---------- 図鑑：倒した敵が登録される ---------- */
  let zsubj = null, zsel = null;
  function renderZukan(m) {
    const r = R(); zsubj = zsubj || r.subj;
    const list = allEnemies(zsubj), got = list.filter((x) => r.zukan[x.key]).length;
    const lecName = (k) => (lectures[zsubj][k] || `第${k}回`);
    const cell = (x) => { const c = r.zukan[x.key] || 0; return `<button class="rp-zc${c ? '' : ' unk'}${x.kind === 'boss' ? ' boss' : ''}${x.kind === 'rare' ? ' rare' : ''}${zsel === x.key ? ' sel' : ''}" data-z="${esc(x.key)}" ${c ? '' : 'disabled'}><span>${c ? x.icon : '？'}</span><small>${c ? esc(x.name) : '？？？'}</small></button>`; };
    const lecs = Object.keys(lectures[zsubj]);
    const sel = list.find((x) => x.key === zsel);
    const where = (x) => (x.kind === 'boss' ? `${lecName(x.lec)} のボス` : x.kind === 'lec' ? `${lecName(x.lec)} のステージ` : x.kind === 'rare' ? 'どのステージにもたまに出る' : 'どのステージにも出る');
    m.innerHTML = `
      <div class="rp-zhead"><b>📖 敵キャラ図鑑</b><span>登録 <b>${got}</b> / ${list.length}</span></div>
      <div class="rp-zbar"><i style="width:${(got / list.length) * 100}%"></i></div>
      <div class="seg rp-seg mt" role="group">${SUBJ.map(([k, n]) => `<button data-zs="${k}" aria-pressed="${zsubj === k}">${n}</button>`).join('')}</div>
      ${sel ? `<div class="rp-zdetail"><span class="rp-zbig">${sel.icon}</span><div><b>${esc(sel.name)}</b>${sel.kind === 'boss' ? '<em>BOSS</em>' : sel.kind === 'rare' ? '<em class="rare">レア</em>' : ''}
        <p>${esc(sel.desc)}</p><small>${esc(where(sel))}・たおした数 ${r.zukan[sel.key]}</small></div><button class="rp-x" data-zx aria-label="閉じる">✕</button></div>` : '<p class="rp-tip">たおした敵が登録される。タップで説明が見られる。</p>'}
      <h3 class="rp-zsec">ボス</h3><div class="rp-zgrid">${list.filter((x) => x.kind === 'boss').map(cell).join('')}</div>
      <h3 class="rp-zsec">レア</h3><div class="rp-zgrid">${list.filter((x) => x.kind === 'rare').map(cell).join('')}</div>
      ${lecs.filter((k) => ENEMIES[zsubj].lec[k]).map((k) => `<h3 class="rp-zsec">${esc(lecName(k))}</h3><div class="rp-zgrid">${list.filter((x) => x.kind === 'lec' && x.lec === k).map(cell).join('')}</div>`).join('')}
      <h3 class="rp-zsec">どこにでも出る</h3><div class="rp-zgrid">${list.filter((x) => x.kind === 'common').map(cell).join('')}</div>`;
    m.onclick = (e) => {
      const zs = e.target.closest('[data-zs]'); if (zs) { e.stopPropagation(); zsubj = zs.dataset.zs; zsel = null; bgm.sfx('tap'); renderZukan(m); return; }
      if (e.target.closest('[data-zx]')) { e.stopPropagation(); zsel = null; renderZukan(m); return; }
      const z = e.target.closest('[data-z]'); if (z && !z.disabled) { e.stopPropagation(); zsel = z.dataset.z; bgm.sfx('tap'); renderZukan(m); window.scrollTo(0, 0); }
    };
  }

  /* ---------- デイリー・ウィークリー目標 ---------- */
  function goalState() {
    const r = R();
    if (!r.goals || r.goals.day !== dayKey()) r.goals = { ...(r.goals || {}), day: dayKey(), d: {}, dc: {} };
    if (r.goals.week !== weekKey()) Object.assign(r.goals, { week: weekKey(), w: {}, wc: {} });
    return r.goals;
  }
  function goalList() {
    const g = goalState();
    return [...DAILY.map((x) => ({ ...x, scope: 'd', v: g.d[x.id] || 0, got: !!g.dc[x.id] })), ...WEEKLY.map((x) => ({ ...x, scope: 'w', v: g.w[x.id] || 0, got: !!g.wc[x.id] }))].map((x) => ({ ...x, done: x.v >= x.n }));
  }
  function bump(id, by = 1, scope) {
    const g = goalState();
    if (!scope || scope === 'd') if (DAILY.some((x) => x.id === id)) g.d[id] = (g.d[id] || 0) + by;
    if (!scope || scope === 'w') if (WEEKLY.some((x) => x.id === id)) g.w[id] = (g.w[id] || 0) + by;
  }
  function renderGoals(m) {
    const gl = goalList();
    const row = (x) => `<div class="rp-goal${x.got ? ' got' : x.done ? ' done' : ''}">
      <div><b>${esc(x.name)}</b><span class="rp-gbar"><i style="width:${Math.min(100, (x.v / x.n) * 100)}%"></i></span><small>${Math.min(x.v, x.n)} / ${x.n}　報酬 🪙${x.coins} 🌰${x.food}</small></div>
      ${x.got ? '<span class="rp-gok">✓ 受け取り済み</span>' : `<button class="rp-btn gold" data-claim="${x.scope}:${x.id}" ${x.done ? '' : 'disabled'}>受け取る</button>`}</div>`;
    m.innerHTML = `
      <div class="rp-zhead"><b>🎯 デイリー目標</b><span>毎日0時に更新</span></div>${gl.filter((x) => x.scope === 'd').map(row).join('')}
      <div class="rp-zhead mt"><b>🏅 ウィークリー目標</b><span>毎週月曜に更新</span></div>${gl.filter((x) => x.scope === 'w').map(row).join('')}`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-claim]'); if (!b || b.disabled) return;
      e.stopPropagation();
      const [sc, id] = b.dataset.claim.split(':'), g = goalState(), x = gl.find((y) => y.scope === sc && y.id === id);
      if (!x || !x.done || x.got) return;
      g[sc + 'c'][id] = 1; R().coins += x.coins; addFood(x.food); save(); ctx.renderTop?.();
      bgm.sfx('win'); toast(`🪙${x.coins} と 🌰${x.food} をゲット！`);
      renderQuestTab($m);
    };
  }
  // 解放条件：その科目の最初のステージは最初から。ほかは1つ前のステージをクリア
  function isOpen(subj, k, n, ci) {
    const r = R(), keys = Object.keys(lectures[subj]);
    if (n > 1) return !!r.clear[`${subj}-${k}-${n - 1}`];
    if (ci === 0) return true;
    return !!r.clear[`${subj}-${keys[ci - 1]}-3`];
  }

  /* ---------- 名前を変える ---------- */
  function openRename() {
    openOv('主人公の名前'); darkOv();
    body().innerHTML = `<div class="card rp-full" style="max-width:420px">
      <img class="rp-heroimg big" src="icons/icon-192.png" alt="">
      <input class="hk-input rp-nameinput" id="rp-nin" maxlength="10" value="${esc(heroName())}" style="min-height:0">
      <p class="muted small">10文字まで</p>
      <button class="btn wide" id="rp-nok">決定</button></div>`;
    const inp = document.getElementById('rp-nin');
    const ok = () => { const v = inp.value.trim().slice(0, 10); if (!v) { toast('名前を入れてね'); return; } R().heroName = v; save(); toast(`「${v}」になった！`); closeOv(); };
    document.getElementById('rp-nok').onclick = ok;
    inp.onkeydown = (e) => { if (e.key === 'Enter') ok(); };
  }

  /* ---------- パーティ編成（上に編成枠、下に仲間のマス目。タップで詳しく・知恵の実をあげる） ---------- */
  const FEED_EXP = 20; // 🌰1つで経験値20
  function feedTo(o, n) {
    let ups = 0;
    o.exp += FEED_EXP * n;
    while (o.exp >= needExp(o.lv)) { o.exp -= needExp(o.lv); o.lv++; ups++; }
    return ups;
  }
  function openParty(B) {
    let sel = null, sort = 'rar';
    const draw = () => {
      const r = R(), t = team();
      const ownedIds = Object.keys(CHARS).filter((id) => r.owned[id]);
      const sorted = [...ownedIds].sort((a, b) => (sort === 'lv' ? r.owned[b].lv - r.owned[a].lv : CHARS[b].rar - CHARS[a].rar || r.owned[b].lv - r.owned[a].lv));
      const unknown = Object.keys(CHARS).length - ownedIds.length;
      const d = sel ? member(sel) : null;
      const o = sel === 'hero' ? r.hero : sel ? r.owned[sel] : null;
      B.innerHTML = `
        <div class="rp-form rp-full">
          <div class="rp-formhead"><b>編成</b><span>HP <b>${t.reduce((a, x) => a + x.hp, 0)}</b>　攻撃 <b>${t.reduce((a, x) => a + x.atk, 0)}</b></span></div>
          <div class="rp-slots">
            ${['hero', ...r.party, null, null, null].slice(0, 4).map((id, i) => id
              ? `<button class="rp-slot${sel === id ? ' sel' : ''}" data-pick="${id}">${iconHTML(id)}<small>${esc(member(id).name)}</small><em>Lv.${member(id).lv}</em>${i === 0 ? '<i class="rp-leader">リーダー</i>' : ''}</button>`
              : '<span class="rp-slot empty"><span class="rp-face empty">＋</span><small>空き</small></span>').join('')}
          </div>
        </div>
        <div class="rp-gridhead rp-full"><b>仲間 ${ownedIds.length}/${Object.keys(CHARS).length}</b>
          <span class="rp-sort"><button data-sort="rar" aria-pressed="${sort === 'rar'}">★順</button><button data-sort="lv" aria-pressed="${sort === 'lv'}">Lv順</button></span></div>
        <div class="rp-grid rp-full">
          ${sorted.map((id) => `<button class="rp-cell r${CHARS[id].rar}${r.party.includes(id) ? ' inp' : ''}${sel === id ? ' sel' : ''}" data-pick="${id}">${iconHTML(id)}<span class="rp-rar">${RAR[CHARS[id].rar]}</span><em>Lv.${r.owned[id].lv}</em>${r.party.includes(id) ? '<i>編成中</i>' : ''}</button>`).join('')}
          ${Array(unknown).fill('<span class="rp-cell unknown"><span class="rp-face empty">？</span><em>未発見</em></span>').join('')}
        </div>
        <p class="muted small rp-full">🌰知恵の実はヒマコロシ全体で共通（今 🌰 ${S.food}）。🌰1つで経験値${FEED_EXP}。</p>
        ${d ? `<div class="rp-detail">
          <div class="rp-dhead">${iconHTML(sel)}<div><b>${esc(d.name)}</b> ${d.rar ? `<span class="rp-rar">${RAR[d.rar]}</span>` : '<span class="rp-rar">リーダー</span>'}
            <div class="rp-lv">Lv.${d.lv}<span class="rp-exp"><i style="width:${(o.exp / needExp(o.lv)) * 100}%"></i></span><small>${o.exp}/${needExp(o.lv)}</small></div></div>
            <button class="rp-x" data-close-detail aria-label="閉じる">✕</button></div>
          <div class="rp-tags"><em>HP ${d.hp}</em><em>攻撃 ${d.atk}</em><em>得意 ${d.subj == null ? 'なし' : d.subj === 'all' ? 'ぜんぶ' : SUBJ.find((x) => x[0] === d.subj)[1]}</em></div>
          <p class="rp-skill">スキル「${esc(d.skill.name)}」：${SKILL_DESC[d.skill.kind](d.skill)}（正解${d.skill.cost}回でたまる）</p>
          <div class="rp-dbtns">
            ${sel === 'hero' ? '<span class="muted small">リーダーはいつも出撃</span>' : `<button class="rp-btn" data-toggle>${r.party.includes(sel) ? '編成から外す' : '編成に入れる'}</button>`}
            <button class="rp-btn gold" data-feed="1" ${S.food < 1 ? 'disabled' : ''}>🌰 あげる</button>
            <button class="rp-btn gold" data-feed="5" ${S.food < 5 ? 'disabled' : ''}>🌰×5</button>
          </div></div>` : ''}`;
    };
    draw();
    B.onclick = (e) => {
      const r = R();
      const sb = e.target.closest('[data-sort]'); if (sb) { sort = sb.dataset.sort; draw(); return; }
      if (e.target.closest('[data-close-detail]')) { sel = null; draw(); return; }
      const pk = e.target.closest('[data-pick]'); if (pk) { sel = pk.dataset.pick; bgm.sfx('tap'); draw(); return; }
      if (e.target.closest('[data-toggle]') && sel && sel !== 'hero') {
        const i = r.party.indexOf(sel);
        if (i >= 0) r.party.splice(i, 1);
        else if (r.party.length >= 3) { toast('仲間は3人まで。先にだれかを外してね'); return; }
        else r.party.push(sel);
        bgm.sfx('tap'); save(); draw(); return;
      }
      const fb = e.target.closest('[data-feed]');
      if (fb && !fb.disabled && sel) {
        const n = +fb.dataset.feed; if (S.food < n) return;
        S.food -= n;
        const o = sel === 'hero' ? r.hero : r.owned[sel];
        const ups = feedTo(o, n);
        save(); ctx.renderTop?.();
        if (ups) { bgm.sfx('win'); toast(`${member(sel).name} が Lv.${o.lv} になった！`); } else { bgm.sfx('heal'); toast(`経験値 +${FEED_EXP * n}`); }
        draw();
      }
    };
  }

  /* ---------- ガチャ ---------- */
  function pullOne() {
    const x = Math.random(), rar = x < 0.06 ? 3 : x < 0.32 ? 2 : 1;
    const pool = Object.keys(CHARS).filter((id) => CHARS[id].rar === rar && id !== 'owl');
    return pool[rnd(pool.length)];
  }
  function openGacha(B) {
    const draw = (res) => {
      const r = R();
      B.innerHTML = `
        <div class="rp-gacha rp-full"><div class="rp-gbox${res ? ' open' : ''}">🎁</div>
          <p class="rp-rates">★★★ 6% ・ ★★ 26% ・ ★ 68%　かぶったらレベル+1</p>
          <div class="row"><button class="rp-btn gold big" data-g="1" ${r.coins < 100 ? 'disabled' : ''}>1回<small>🪙100</small></button><button class="rp-btn gold big" data-g="10" ${r.coins < 900 ? 'disabled' : ''}>10回<small>🪙900</small></button></div>
          <p class="rp-have">持っている 🪙 <b>${r.coins}</b></p></div>
        ${res ? `<div class="rp-gres">${res.map(([id, isNew], i) => `<span class="rp-gitem r${CHARS[id].rar}" style="animation-delay:${i * 0.08}s">${iconHTML(id)}<span class="rp-rar">${RAR[CHARS[id].rar]}</span><small>${esc(CHARS[id].name)}</small><em>${isNew ? 'NEW!' : 'Lv+1'}</em></span>`).join('')}</div>` : ''}`;
    };
    draw();
    B.onclick = (e) => {
      const b = e.target.closest('[data-g]'); if (!b || b.disabled) return;
      const n = +b.dataset.g, r = R(), cost = n === 10 ? 900 : 100;
      if (r.coins < cost) return;
      r.coins -= cost; r.pulls += n;
      const res = [];
      for (let i = 0; i < n; i++) {
        const id = pullOne();
        if (r.owned[id]) { r.owned[id].lv++; res.push([id, false]); }
        else { r.owned[id] = { lv: 1, exp: 0 }; res.push([id, true]); if (r.party.length < 3) r.party.push(id); }
      }
      save(); draw(res);
      const rare = res.some(([id]) => CHARS[id].rar === 3);
      bgm.sfx('gacha'); if (rare) setTimeout(() => bgm.sfx('rare'), 500);
      if (res.some(([id, isNew]) => isNew && CHARS[id].rar === 3)) toast('★★★ の仲間が来た！');
    };
  }

  /* ---------- バトル ---------- */
  async function startBattle(subj, lec, n, d = 0) {
    const ci = Object.keys(lectures[subj]).indexOf(String(lec));
    const boss = n === 3;
    const E = ENEMIES[subj], D = DIFF[d];
    const lvScale = 1 + ci * 0.4 + (n - 1) * 0.15;
    // 雑魚：その回専用（あれば2体）＋どこにでも出る雑魚 で3体。たまにレアが混ざる
    const zakos = () => {
      const lz = shuffle([...(E.lec[lec] || [])]).slice(0, 2);
      const z = shuffle([...lz, ...shuffle([...E.common]).slice(0, 3 - lz.length)]);
      if (Math.random() < (d ? 0.12 : 0.08)) z[rnd(z.length)] = E.rare;
      return z.map(([name, icon]) => { const rare = name === E.rare[0]; return { name, icon, rare, hp: Math.round(100 * lvScale * D.hp * (rare ? 0.7 : 1)), atk: Math.round(18 * lvScale * D.atk * (rare ? 0.5 : 1)) }; });
    };
    const foes = boss
      ? [{ name: E.boss[lec][0], icon: E.boss[lec][1], hp: Math.round(380 * lvScale * D.hp), atk: Math.round(35 * lvScale * D.atk), boss: true }]
      : zakos();
    const t = team();
    const maxHp = t.reduce((a, x) => a + x.hp, 0);
    const st = { foes, fi: 0, ehp: foes[0].hp, hp: maxHp, maxHp, gauge: Object.fromEntries(t.map((x) => [x.id, 0])), guard: 0, bonusT: 0, q: null, timer: null, left: 0, total: 1, limit: Math.round((boss ? 90 : 12) * D.time), busy: false, combo: 0, correct: 0, miss: 0, over: false, turns: 0, event: null, rares: 0 };
    const deck = DECKS.find((d) => d.id === subj).words;
    const no = (lectures[subj][lec].match(/^(第\S+?回)/) || [lectures[subj][lec]])[0];
    openOv(`${no} ${boss ? 'BOSS' : 'STAGE ' + n}${d ? ' ' + D.tag + D.name : ''}`); darkOv();
    setCleanup(() => { clearInterval(st.timer); bgm.play('map'); });
    bgm.play(boss ? 'boss' : 'battle');

    const atkOf = (x) => x.atk * (x.subj === subj ? 1.5 : x.subj === 'all' ? 1.2 : 1);
    const partyAtk = () => t.reduce((a, x) => a + atkOf(x), 0);

    function layout() {
      const f = foes[st.fi];
      body().innerHTML = `
        <div class="rp-battle">
          <div class="rp-head">
            <div class="rp-field${f.boss ? ' boss' : ''}${f.rare ? ' rare' : ''}">
              <div class="rp-enemy" id="rp-enemy">${f.icon}</div>
              <div class="rp-einfo">
                <div class="rp-wave">${f.boss ? 'BOSS' : `ENEMY ${st.fi + 1}/${foes.length}`}${f.rare ? '　🌟レア！' : ''}</div>
                <div class="rp-ename">${esc(f.name)}</div>
                <div class="rp-hpbar enemy"><i id="rp-ehp"></i><span id="rp-ehptxt"></span></div>
              </div>
              <div class="rp-pop" id="rp-pop"></div>
            </div>
            <div class="rp-team" id="rp-team"></div>
            <div class="rp-hpbar party"><i id="rp-php"></i><span id="rp-phptxt"></span></div>
            <div class="rp-timebar"><i id="rp-time"></i></div>
            <div class="rp-event" id="rp-event" hidden></div>
          </div>
          <div id="rp-q"></div>
        </div>`;
      drawTeam(); drawHp();
    }
    function drawTeam() {
      const el = document.getElementById('rp-team'); if (!el) return;
      el.innerHTML = t.map((x) => {
        const g = st.gauge[x.id], full = g >= x.skill.cost;
        return `<button class="rp-tm${full ? ' ready' : ''}" data-skill="${x.id}" ${full ? '' : 'disabled'} title="${esc(x.skill.name)}">${iconHTML(x.id)}
          <span class="rp-gauge"><i style="width:${Math.min(100, (g / x.skill.cost) * 100)}%"></i></span><small>${full ? 'スキル!' : esc(x.name)}</small></button>`;
      }).join('');
    }
    function drawHp() {
      const f = foes[st.fi];
      const e = document.getElementById('rp-ehp'), et = document.getElementById('rp-ehptxt'), p = document.getElementById('rp-php'), pt = document.getElementById('rp-phptxt');
      if (e) e.style.width = Math.max(0, (st.ehp / f.hp) * 100) + '%';
      if (et) et.textContent = `${Math.max(0, Math.round(st.ehp))} / ${f.hp}`;
      if (p) { p.style.width = Math.max(0, (st.hp / st.maxHp) * 100) + '%'; p.classList.toggle('low', st.hp / st.maxHp < 0.3); }
      if (pt) pt.textContent = `HP ${Math.max(0, Math.round(st.hp))} / ${st.maxHp}${st.guard ? `　🛡️×${st.guard}` : ''}`;
    }
    function pop(txt, cls) {
      const p = document.getElementById('rp-pop'); if (!p) return;
      const s = document.createElement('span'); s.className = 'rp-num ' + cls; s.textContent = txt;
      s.style.left = 30 + Math.random() * 40 + '%';
      p.appendChild(s); setTimeout(() => s.remove(), 1000);
    }
    function hitEnemy(dmg, label, big) {
      dmg = Math.max(1, Math.round(dmg));
      // ヌルポには「ガッ！」（ネットのお約束「ぬるぽ」→「ガッ」）
      const gah = foes[st.fi].name === 'ヌルポ';
      st.ehp -= dmg;
      pop((gah ? 'ガッ！ ' : '') + (label ? label + ' ' : '') + dmg, gah ? 'hit big gah' : big ? 'hit big' : 'hit');
      bgm.sfx(gah ? 'gah' : big ? 'crit' : 'hit');
      const en = document.getElementById('rp-enemy'); if (en) { en.classList.remove('shake'); void en.offsetWidth; en.classList.add('shake'); }
      const fl = document.querySelector('.rp-field'); if (fl) { fl.classList.remove('flash'); void fl.offsetWidth; fl.classList.add('flash'); }
      drawHp();
    }
    function hitParty(mult = 1) {
      let d = foes[st.fi].atk * (0.85 + Math.random() * 0.3) * mult;
      if (st.guard) { d /= 2; st.guard--; }
      st.hp -= Math.round(d);
      bgm.sfx('ouch');
      const bt = document.querySelector('.rp-battle'); if (bt) { bt.classList.remove('ouch'); void bt.offsetWidth; bt.classList.add('ouch'); }
      drawHp();
    }

    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    // チャンス（次の攻撃2倍）／ピンチ（敵が力をためる：次に受けるダメージ2倍）
    function rollEvent() {
      st.event = null;
      if (st.turns > 0) { const x = Math.random(); st.event = x < 0.16 ? 'chance' : x < 0.3 ? 'charge' : null; }
      const ev = document.getElementById('rp-event'); if (!ev) return;
      ev.hidden = !st.event;
      ev.className = 'rp-event ' + (st.event || '');
      ev.textContent = st.event === 'chance' ? '✨ チャンス！ 次の攻撃が2倍' : st.event === 'charge' ? `⚠️ ${foes[st.fi].name}が力をためている…（ミスすると大ダメージ）` : '';
      if (st.event) bgm.sfx(st.event === 'chance' ? 'skill' : 'miss');
    }

    async function nextQuestion() {
      if (st.over) return;
      st.busy = true;
      const qEl = document.getElementById('rp-q'); if (!qEl) return;
      rollEvent();
      // Ready… GO!（問題が出てから時間が動く）
      qEl.innerHTML = '<div class="rp-ready"><span>READY…</span></div>';
      const bqP = foes[st.fi].boss ? api.bossQuestion(subj, lec) : null;
      await wait(st.event ? 900 : 550);
      if (st.over || !document.getElementById('rp-q')) return;
      qEl.innerHTML = '<div class="rp-ready go"><span>GO!</span></div>';
      bgm.sfx('tap');
      await wait(320);
      if (st.over || !document.getElementById('rp-q')) return;
      if (bqP) {
        const bq = await bqP;
        if (st.over || !document.getElementById('rp-q')) return;
        st.q = { answer: bq.answer, exp: bq.exp, n: bq.choices.length, boss: true };
        qEl.innerHTML = `<div class="rp-bq">${bq.body}<div class="q-text">${bq.q}</div>${bq.qcode}</div>
          <div class="choices">${bq.choices.map((c, i) => `<button class="choice" data-c="${i}"><span class="num">(${i + 1})</span><span class="txt">${c}</span></button>`).join('')}</div>`;
      } else {
        const pool = shuffle([...deck]); const c = pool[0]; const flip = rnd(2) === 1;
        const q = flip ? c[1] : c[0], a = flip ? c[0] : c[1];
        const opts = shuffle([a, ...pool.slice(1, 4).map((x) => (flip ? x[0] : x[1]))]);
        st.q = { answer: opts.indexOf(a), exp: `<b>${esc(c[0])}</b>：${esc(c[1])}`, n: 4 };
        qEl.innerHTML = `<div class="rp-zq${q.length > 14 ? ' long' : ''}">${esc(q)}</div>
          <div class="hk-choices word rp-zc">${opts.map((o, i) => `<button data-c="${i}">${esc(o)}</button>`).join('')}</div>`;
      }
      document.querySelector('#hk-obody')?.scrollTo({ top: 0 });
      st.busy = false;
      st.left = st.limit + st.bonusT;
      st.total = st.left;
      clearInterval(st.timer);
      const tick = () => {
        if (document.hidden) return; // 別のアプリにいるあいだは止める
        st.left -= 0.1;
        const tb = document.getElementById('rp-time');
        if (tb) { tb.style.width = Math.max(0, (st.left / st.total) * 100) + '%'; tb.classList.toggle('hurry', st.left < Math.min(5, st.total * 0.25)); }
        info(`⏱ ${Math.max(0, Math.ceil(st.left))}`);
        if (st.left <= 0) { clearInterval(st.timer); answer(-1, null); }
      };
      tick(); st.timer = setInterval(tick, 100);
    }

    function anim(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
    async function answer(i, btn) {
      if (st.busy || st.over) return;
      st.busy = true; clearInterval(st.timer); st.turns++;
      const ok = i === st.q.answer;
      const ev = st.event; st.event = null;
      const btns = document.querySelectorAll('#rp-q [data-c]');
      btns.forEach((b) => { b.disabled = true; if (+b.dataset.c === st.q.answer) b.classList.add('ok'); });
      if (btn && !ok) btn.classList.add('ng');
      const evEl = document.getElementById('rp-event'); if (evEl) evEl.hidden = true;
      let line = '';
      if (ok) {
        st.combo++; st.correct++;
        const speed = 1 + (Math.max(0, st.left) / st.total) * 0.6; // 1.0〜1.6
        const mult = ev === 'chance' ? 2 : 1;
        const big = speed > 1.45 || st.combo >= 3 || mult > 1;
        anim(document.getElementById('rp-team'), 'atk'); // 仲間が飛びかかる
        await wait(380);
        if (st.over) return;
        hitEnemy(partyAtk() * speed * mult * (1 + Math.min(st.combo - 1, 5) * 0.1), mult > 1 ? 'チャンス！' : st.combo > 1 ? `${st.combo}コンボ` : speed > 1.45 ? 'はやい！' : '', big);
        t.forEach((x) => { st.gauge[x.id]++; });
        drawTeam();
        line = `<div class="rp-after ok"><b>正解！</b>${st.q.boss ? '' : `<span>${st.q.exp}</span>`}</div>`;
      } else {
        st.combo = 0; st.miss++;
        bgm.sfx('miss');
        anim(document.getElementById('rp-enemy'), 'lunge'); // 敵の反撃
        await wait(380);
        if (st.over) return;
        hitParty(ev === 'charge' ? 2 : 1); pop(ev === 'charge' ? '大ダメージ！' : i < 0 ? '時間切れ' : 'ミス', 'miss');
        line = st.q.boss
          ? `<div class="exp ng"><span class="verdict">${i < 0 ? '時間切れ' : '不正解'}</span>${st.q.exp}</div>`
          : `<div class="rp-after ng"><b>${i < 0 ? '時間切れ…' : 'ざんねん…'}</b><span>${st.q.exp}</span></div>`;
      }
      // 自分のペースで「つぎへ」
      const qEl = document.getElementById('rp-q'); if (!qEl) return;
      const label = st.hp <= 0 ? '結果を見る' : st.ehp <= 0 ? (st.fi + 1 < foes.length ? 'たおした！ つぎの敵へ ▶' : 'たおした！ ▶') : 'つぎへ ▶';
      qEl.insertAdjacentHTML('beforeend', `${line}<button class="rp-btn gold wide mt" id="rp-next">${label}</button>`);
      const nb = document.getElementById('rp-next');
      nb.onclick = () => { nb.disabled = true; afterTurn(); };
      nb.scrollIntoView({ block: 'nearest' });
    }

    function afterTurn() {
      if (st.over) return;
      if (st.hp <= 0) return finish(false);
      if (st.ehp <= 0) {
        const en = document.getElementById('rp-enemy');
        if (en) en.classList.add('ko');
        bgm.sfx('ko');
        // 図鑑に登録・目標
        { const f = foes[st.fi], r = R(), key = `${subj}|${f.name}`; const isNew = !r.zukan[key]; r.zukan[key] = (r.zukan[key] || 0) + 1; if (f.rare) st.rares++; if (!f.boss) bump('zako'); save(); if (isNew) setTimeout(() => toast(`📖 図鑑に「${f.name}」が登録された！`), 300); }
        st.busy = true;
        setTimeout(() => {
          if (st.over) return;
          if (st.fi + 1 < foes.length) { st.fi++; st.ehp = foes[st.fi].hp; layout(); pop('つぎの敵！', 'info'); nextQuestion(); }
          else finish(true);
        }, 650);
        return;
      }
      nextQuestion();
    }

    function useSkill(id) {
      const x = t.find((m) => m.id === id); if (!x || st.gauge[id] < x.skill.cost || st.over) return;
      st.gauge[id] = 0;
      const k = x.skill;
      if (k.kind === 'heal') { st.hp = Math.min(st.maxHp, st.hp + st.maxHp * k.pow); pop('回復！', 'heal'); bgm.sfx('heal'); drawHp(); }
      else if (k.kind === 'dmg') { bgm.sfx('skill'); hitEnemy(atkOf(x) * k.pow, k.name, true); if (st.ehp <= 0 && !st.busy) { st.busy = true; clearInterval(st.timer); document.querySelectorAll('#rp-q [data-c]').forEach((b) => { b.disabled = true; }); setTimeout(afterTurn, 600); } }
      else if (k.kind === 'time') { st.bonusT += k.pow; st.left += k.pow; st.total += k.pow; pop(`+${k.pow}秒`, 'info'); bgm.sfx('skill'); }
      else if (k.kind === 'guard') { st.guard += k.pow; pop('ガード！', 'info'); bgm.sfx('skill'); drawHp(); }
      else if (k.kind === 'hint') {
        const wrong = [...document.querySelectorAll('#rp-q [data-c]')].filter((b) => +b.dataset.c !== st.q.answer && !b.disabled);
        shuffle(wrong).slice(0, k.pow).forEach((b) => { b.disabled = true; b.classList.add('rp-gone'); });
        pop('ひらめき！', 'info'); bgm.sfx('skill');
      }
      toast(`${x.name}「${k.name}」`);
      drawTeam();
    }

    function finish(win) {
      st.over = true; clearInterval(st.timer);
      bgm.stop(); bgm.sfx(win ? 'win' : 'lose');
      const r = R(), id = `${subj}-${lec}-${n}`, dk = `${id}#${d}`, first = win && !r.stars[dk];
      let coins = 0, exp = 0, food = 0, stars = 0, newBest = false;
      const ups = [];
      bump('correct', st.correct);
      if (win) {
        stars = 1 + (st.hp / st.maxHp >= 0.5 ? 1 : 0) + (st.miss === 0 ? 1 : 0);
        newBest = stars > (r.stars[dk] || 0);
        coins = Math.round((boss ? 120 : 40) * (1 + ci * 0.15) * D.rew) * (first ? 2 : 1) + st.rares * 150;
        exp = Math.round((boss ? 80 : 30) * D.rew);
        food = first ? 2 : 1;
        r.coins += coins; r.clear[id] = 1; if (newBest) r.stars[dk] = stars;
        const grow = (o, name) => { o.exp += exp; while (o.exp >= needExp(o.lv)) { o.exp -= needExp(o.lv); o.lv++; ups.push(`${name} Lv.${o.lv}`); } };
        grow(r.hero, heroName());
        r.party.forEach((pid) => r.owned[pid] && grow(r.owned[pid], CHARS[pid].name));
        addFood(food);
        bump('stage'); if (boss) bump('boss'); if (stars === 3) bump('star3'); if (d) bump('hard');
      }
      save();
      const nextD = win && d < 2 && first ? DIFF[d + 1] : null;
      body().innerHTML = `<div class="rp-result${win ? ' win' : ''}">
        <div class="rp-endicon">${win ? '🏆' : '💫'}</div>
        <div class="rp-endtitle">${win ? 'STAGE CLEAR!' : 'GAME OVER'}</div>
        ${win ? `<div class="rp-endstars">${[1, 2, 3].map((k) => `<span class="${k <= stars ? 'on' : ''}" style="animation-delay:${k * 0.18}s">★</span>`).join('')}</div>
        <p class="rp-starrule">★1 クリア ${'✓'}　★2 HP半分以上 ${st.hp / st.maxHp >= 0.5 ? '✓' : '✗'}　★3 ノーミス ${st.miss === 0 ? '✓' : `✗（ミス${st.miss}）`}</p>` : ''}
        <p class="rp-endsub">${win ? `${esc(foes[foes.length - 1].name)}をたおした！${newBest && !first ? ' ★の記録更新！' : ''}` : `正解 ${st.correct}問。パーティを育ててまた挑戦しよう`}</p>
        ${win ? `<div class="rp-rewards"><span>🪙 ${coins}${first ? '<em>初クリア×2</em>' : ''}${st.rares ? `<em>レア+${st.rares * 150}</em>` : ''}</span><span>EXP ${exp}</span><span>🌰 ${food}</span></div>` : ''}
        ${nextD ? `<p class="rp-unlock">${nextD.tag}${nextD.name}が解放された！</p>` : ''}
        ${ups.length ? `<div class="rp-ups"><b>LEVEL UP!</b>${ups.map((u) => `<span>${esc(u)}</span>`).join('')}</div>` : ''}
        <div class="row"><button class="rp-btn gold big" id="rp-again">${win ? 'もう一回' : 'リトライ'}</button><button class="rp-btn big" id="rp-back">マップへ</button></div></div>`;
      document.getElementById('rp-again').onclick = () => startBattle(subj, lec, n, d);
      document.getElementById('rp-back').onclick = closeOv;
    }

    body().onclick = (e) => {
      const sk = e.target.closest('[data-skill]'); if (sk && !sk.disabled) return useSkill(sk.dataset.skill);
      const c = e.target.closest('#rp-q [data-c]'); if (c && !c.disabled) answer(+c.dataset.c, c);
    };
    layout();
    nextQuestion();
  }

  // ヒマコロシの冒険タブから離れたとき
  function leave() { bgm.stop(); }

  // ヒマコロシのホームから使う：主人公・仲間の情報と記録（rec を書きかえるとレベルが変わる）
  function memberInfo(id) {
    const r = R();
    const m = member(id);
    return { ...m, rec: id === 'hero' ? r.hero : r.owned[id] };
  }

  return { renderQuestTab, leave, memberInfo, resetTab: () => { gtab = 'map'; } };
}
