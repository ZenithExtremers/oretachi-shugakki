// ヒマコロシ「冒険」— 問題に答えてバグ（敵）と戦うクイズRPG
// 主人公はアプリのアイコンの人。仲間はガチャで集めて育てる。キャラ・敵・物語はすべてオリジナル。
// 雑魚戦：単語帳（data/hima-words.js）の4択 ／ ボス戦：本編のその回の5択（コード・図つき）
// 保存は ヒマコロシの S.rpg（キー oretachi:hima）

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

// 敵（バグ）。雑魚とボス（回ごと）
const ENEMIES = {
  ccpp: {
    zako: [['ヌルポ', '👻'], ['オフバイワン', '🐛'], ['メモリリーク', '💧'], ['未初期化', '❓'], ['セミコロン忘れ', '🦠'], ['型ちがい', '🧩']],
    boss: { 1: ['コンパイルエラー大王', '👹'], 2: ['切り捨てゴーレム', '🗿'], 3: ['無限ループの主', '🌀'], 4: ['添字オーバーラン', '🐙'], 5: ['再帰スタック魔人', '🧞'], 6: ['ダングリングポインタ', '👿'] },
  },
  db: {
    zako: [['NULL霊', '👻'], ['重複レコード', '👯'], ['ゴミデータ', '🗑️'], ['文字化け', '🔣'], ['全件DELETE魔', '💣'], ['迷子の主キー', '🔑']],
    boss: { 2: ['WHERE忘れ大王', '👹'], 3: ['検索の迷宮主', '🧩'], 4: ['並び替えカオス', '🌪️'], 5: ['関数キメラ', '🐲'], 6: ['集計ゴーレム', '🗿'], 7: ['副問合せの影', '👤'] },
  },
  sd: {
    zako: [['仕様あいまい', '🌫️'], ['分析中毒', '🤯'], ['スパゲッティ', '🍝'], ['多重度ミス', '❌'], ['矢印まちがい', '🔀'], ['図なし魔', '📄']],
    boss: { 1: ['設計図なし魔王', '🧟'], 2: ['境界こわし', '👹'], 4: ['スナップショット幽霊', '👻'], 5: ['継承地獄', '🐉'], 6: ['待ちぼうけデッドロック', '🔒'], 7: ['番号ちがい伝令', '🦜'] },
  },
};

/* ---------- 計算 ---------- */
const needExp = (lv) => lv * 50;
const statOf = (base, lv) => Math.round(base * (1 + (lv - 1) * 0.12));
const SUBJ = [['ccpp', 'C/C++'], ['db', 'DB'], ['sd', '設計']];

export function makeRPG(ctx) {
  const { S, save, openOv, closeOv, body, info, toast, setCleanup, esc, shuffle, rnd, owlSVG, DECKS, addFood, api } = ctx;
  const R = () => {
    if (!S.rpg) S.rpg = { coins: 300, hero: { lv: 1, exp: 0 }, owned: { owl: { lv: 1, exp: 0 } }, party: ['owl'], clear: {}, subj: 'ccpp', pulls: 0 };
    return S.rpg;
  };
  let lectures = null; // { ccpp: {1:'第1回 …'}, … }

  const iconHTML = (id, cls = '') => {
    if (id === 'hero') return `<img class="rp-face ${cls}" src="icons/icon-192.png" alt="">`;
    const c = CHARS[id];
    return c.icon === 'owl' ? `<span class="rp-face rp-owl ${cls}">${owlSVG(2)}</span>` : `<span class="rp-face rp-emo ${cls}">${c.icon}</span>`;
  };
  const member = (id) => {
    const r = R();
    if (id === 'hero') return { id, name: HERO.name, lv: r.hero.lv, hp: statOf(HERO.hp, r.hero.lv), atk: statOf(HERO.atk, r.hero.lv), skill: HERO.skill, subj: null };
    const c = CHARS[id], o = r.owned[id];
    return { id, name: c.name, lv: o.lv, hp: statOf(c.hp, o.lv), atk: statOf(c.atk, o.lv), skill: c.skill, subj: c.subj, rar: c.rar };
  };
  const team = () => ['hero', ...R().party.filter((id) => R().owned[id])].map(member);

  /* ---------- 冒険タブ ---------- */
  async function renderQuestTab(m) {
    const r = R();
    if (!lectures) lectures = await api.lectures();
    const t = team();
    m.innerHTML = `
      <div class="card mt rp-hero">
        <img class="rp-heroimg" src="icons/icon-192.png" alt="">
        <div class="rp-herotxt"><b>${HERO.name} Lv.${r.hero.lv}</b>
          <div class="hk-bar"><i style="width:${(r.hero.exp / needExp(r.hero.lv)) * 100}%"></i></div>
          <small class="muted">パーティ HP ${t.reduce((a, x) => a + x.hp, 0)} ・ 攻撃 ${t.reduce((a, x) => a + x.atk, 0)}</small></div>
        <span class="hk-pill">🪙 ${r.coins}</span>
      </div>
      <div class="rp-partyrow">${t.map((x) => `<span class="rp-pm">${iconHTML(x.id)}<small>Lv.${x.lv}</small></span>`).join('')}${Array(4 - t.length).fill('<span class="rp-pm empty">＋</span>').join('')}</div>
      <div class="row"><button class="btn sub" data-rp="party">👥 パーティ</button><button class="btn" data-rp="gacha">🎁 ガチャ</button></div>
      <div class="seg mt" role="group">${SUBJ.map(([k, n]) => `<button data-rp="subj" data-k="${k}" aria-pressed="${r.subj === k}">${n}</button>`).join('')}</div>
      <div class="rp-chapters">${Object.entries(lectures[r.subj] || {}).map(([k, v], ci) => {
        const mt = v.match(/^(第\S+?回)\s*(.*)$/) || [null, v, ''];
        return `<div class="card rp-ch"><div class="rp-chhead"><b>${esc(mt[1])}</b><span class="muted small">${esc(mt[2])}</span></div>
          <div class="rp-nodes">${[1, 2, 3].map((n) => {
            const id = `${r.subj}-${k}-${n}`, open = isOpen(r.subj, k, n, ci), done = r.clear[id];
            return `<button class="rp-node${n === 3 ? ' boss' : ''}${done ? ' done' : ''}" data-rp="stage" data-k="${k}" data-n="${n}" ${open ? '' : 'disabled'}>
              <span>${!open ? '🔒' : n === 3 ? '👑' : n}</span><small>${n === 3 ? 'ボス' : 'ステージ' + n}${done ? ' ✓' : ''}</small></button>`;
          }).join('<span class="rp-path"></span>')}</div></div>`;
      }).join('')}</div>
      <p class="muted small center">雑魚は単語帳の4択、ボスは本番形式の5択。速く答えるほど大ダメージ。</p>`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-rp]'); if (!b || b.disabled) return;
      const a = b.dataset.rp;
      if (a === 'subj') { R().subj = b.dataset.k; save(); renderQuestTab(m); }
      else if (a === 'party') openParty();
      else if (a === 'gacha') openGacha();
      else if (a === 'stage') startBattle(R().subj, b.dataset.k, +b.dataset.n);
    };
  }
  // 解放条件：その科目の最初のステージは最初から。ほかは1つ前のステージをクリア
  function isOpen(subj, k, n, ci) {
    const r = R(), keys = Object.keys(lectures[subj]);
    if (n > 1) return !!r.clear[`${subj}-${k}-${n - 1}`];
    if (ci === 0) return true;
    return !!r.clear[`${subj}-${keys[ci - 1]}-3`];
  }

  /* ---------- パーティ編成 ---------- */
  function openParty() {
    openOv('パーティ編成');
    const draw = () => {
      const r = R(), ids = Object.keys(CHARS).filter((id) => r.owned[id]);
      body().innerHTML = `<p class="muted small rp-full">主人公＋仲間3人まで。タップで入れ替え（★の多いほど強い）</p>
        <div class="rp-list">${ids.map((id) => {
          const x = member(id), inP = r.party.includes(id), o = r.owned[id];
          return `<button class="rp-card${inP ? ' on' : ''}" data-id="${id}">${iconHTML(id)}
            <span class="rp-cinfo"><b>${esc(x.name)} <span class="rp-rar r${x.rar}">${RAR[x.rar]}</span></b>
            <small>Lv.${x.lv} ・ HP ${x.hp} ・ 攻撃 ${x.atk} ・ 得意 ${x.subj === 'all' ? 'ぜんぶ' : SUBJ.find((s) => s[0] === x.subj)[1]}</small>
            <small>スキル「${esc(x.skill.name)}」${SKILL_DESC[x.skill.kind](x.skill)}（正解${x.skill.cost}回でたまる）</small>
            <span class="hk-bar"><i style="width:${(o.exp / needExp(o.lv)) * 100}%"></i></span></span>
            <span class="rp-in">${inP ? 'パーティ' : ''}</span></button>`;
        }).join('')}</div>
        <p class="muted small rp-full">まだ ${Object.keys(CHARS).length - ids.length} 人の仲間がいる。ガチャで見つけよう。</p>`;
    };
    draw();
    body().onclick = (e) => {
      const c = e.target.closest('[data-id]'); if (!c) return;
      const r = R(), id = c.dataset.id, i = r.party.indexOf(id);
      if (i >= 0) r.party.splice(i, 1);
      else if (r.party.length >= 3) { toast('仲間は3人まで。先にだれかを外してね'); return; }
      else r.party.push(id);
      save(); draw();
    };
  }

  /* ---------- ガチャ ---------- */
  function pullOne() {
    const x = Math.random(), rar = x < 0.06 ? 3 : x < 0.32 ? 2 : 1;
    const pool = Object.keys(CHARS).filter((id) => CHARS[id].rar === rar && id !== 'owl');
    return pool[rnd(pool.length)];
  }
  function openGacha() {
    openOv('ガチャ');
    const draw = (res) => {
      const r = R();
      body().innerHTML = `
        <div class="card rp-gacha rp-full"><div class="rp-gbox">🎁</div>
          <p class="muted small" style="margin:6px 0 12px">★★★ 6% ・ ★★ 26% ・ ★ 68%　かぶったらレベル+1</p>
          <div class="row"><button class="btn" data-g="1" ${r.coins < 100 ? 'disabled' : ''}>1回 🪙100</button><button class="btn" data-g="10" ${r.coins < 900 ? 'disabled' : ''}>10回 🪙900</button></div>
          <p class="small" style="margin:10px 0 0">持っている 🪙 <b>${r.coins}</b></p></div>
        ${res ? `<div class="rp-gres">${res.map(([id, isNew]) => `<span class="rp-gitem r${CHARS[id].rar}">${iconHTML(id)}<small>${esc(CHARS[id].name)}</small><em>${isNew ? 'NEW!' : 'Lv+1'}</em></span>`).join('')}</div>` : ''}`;
    };
    draw();
    body().onclick = (e) => {
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
      if (res.some(([id, isNew]) => isNew && CHARS[id].rar === 3)) toast('★★★ の仲間が来た！');
    };
  }

  /* ---------- バトル ---------- */
  async function startBattle(subj, lec, n) {
    const ci = Object.keys(lectures[subj]).indexOf(String(lec));
    const boss = n === 3;
    const E = ENEMIES[subj];
    const lvScale = 1 + ci * 0.4 + (n - 1) * 0.15;
    const foes = boss
      ? [{ name: E.boss[lec][0], icon: E.boss[lec][1], hp: Math.round(380 * lvScale), atk: Math.round(35 * lvScale), boss: true }]
      : shuffle([...E.zako]).slice(0, 3).map(([name, icon]) => ({ name, icon, hp: Math.round(100 * lvScale), atk: Math.round(18 * lvScale) }));
    const t = team();
    const maxHp = t.reduce((a, x) => a + x.hp, 0);
    const st = { foes, fi: 0, ehp: foes[0].hp, hp: maxHp, maxHp, gauge: Object.fromEntries(t.map((x) => [x.id, 0])), guard: 0, bonusT: 0, q: null, timer: null, left: 0, limit: boss ? 90 : 12, busy: false, combo: 0, correct: 0, over: false };
    const deck = DECKS.find((d) => d.id === subj).words;
    const title = `${(lectures[subj][lec].match(/^(第\S+?回)/) || [lectures[subj][lec]])[0]} ${boss ? 'ボス' : 'ステージ' + n}`;
    openOv(title);
    setCleanup(() => clearInterval(st.timer));

    const atkOf = (x) => x.atk * (x.subj === subj ? 1.5 : x.subj === 'all' ? 1.2 : 1);
    const partyAtk = () => t.reduce((a, x) => a + atkOf(x), 0);

    function layout() {
      body().innerHTML = `
        <div class="rp-battle">
          <div class="rp-field${foes[st.fi].boss ? ' boss' : ''}">
            <div class="rp-wave muted small">${foes[st.fi].boss ? 'BOSS' : `${st.fi + 1} / ${foes.length}`}</div>
            <div class="rp-enemy" id="rp-enemy">${foes[st.fi].icon}</div>
            <div class="rp-ename">${esc(foes[st.fi].name)}</div>
            <div class="rp-hpbar enemy"><i id="rp-ehp"></i></div>
            <div class="rp-pop" id="rp-pop"></div>
          </div>
          <div class="rp-team" id="rp-team"></div>
          <div class="rp-hpbar party"><i id="rp-php"></i><span id="rp-phptxt"></span></div>
          <div class="rp-timebar"><i id="rp-time"></i></div>
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
      const e = document.getElementById('rp-ehp'), p = document.getElementById('rp-php'), pt = document.getElementById('rp-phptxt');
      if (e) e.style.width = Math.max(0, (st.ehp / foes[st.fi].hp) * 100) + '%';
      if (p) p.style.width = Math.max(0, (st.hp / st.maxHp) * 100) + '%';
      if (pt) pt.textContent = `HP ${Math.max(0, Math.round(st.hp))} / ${st.maxHp}${st.guard ? ` 🛡️${st.guard}` : ''}`;
    }
    function pop(txt, cls) {
      const p = document.getElementById('rp-pop'); if (!p) return;
      const s = document.createElement('span'); s.className = 'rp-num ' + cls; s.textContent = txt;
      p.appendChild(s); setTimeout(() => s.remove(), 900);
    }
    function hitEnemy(dmg, label) {
      dmg = Math.max(1, Math.round(dmg));
      st.ehp -= dmg; pop((label ? label + ' ' : '') + dmg, 'hit');
      const en = document.getElementById('rp-enemy'); if (en) { en.classList.remove('shake'); void en.offsetWidth; en.classList.add('shake'); }
      drawHp();
    }
    function hitParty() {
      let d = foes[st.fi].atk * (0.85 + Math.random() * 0.3);
      if (st.guard) { d /= 2; st.guard--; }
      st.hp -= Math.round(d);
      const bt = document.querySelector('.rp-battle'); if (bt) { bt.classList.remove('ouch'); void bt.offsetWidth; bt.classList.add('ouch'); }
      drawHp();
    }

    async function nextQuestion() {
      if (st.over) return;
      st.busy = false;
      const qEl = document.getElementById('rp-q'); if (!qEl) return;
      if (foes[st.fi].boss) {
        const bq = await api.bossQuestion(subj, lec);
        if (!document.getElementById('rp-q')) return;
        st.q = { answer: bq.answer, exp: bq.exp, n: bq.choices.length };
        qEl.innerHTML = `<div class="rp-bq">${bq.body}<div class="q-text">${bq.q}</div>${bq.qcode}</div>
          <div class="choices">${bq.choices.map((c, i) => `<button class="choice" data-c="${i}"><span class="num">(${i + 1})</span><span class="txt">${c}</span></button>`).join('')}</div>`;
      } else {
        const pool = shuffle([...deck]); const c = pool[0]; const flip = rnd(2) === 1;
        const q = flip ? c[1] : c[0], a = flip ? c[0] : c[1];
        const opts = shuffle([a, ...pool.slice(1, 4).map((x) => (flip ? x[0] : x[1]))]);
        st.q = { answer: opts.indexOf(a), exp: `${c[0]}：${c[1]}`, n: 4 };
        qEl.innerHTML = `<div class="hk-q${q.length > 14 ? ' long' : ''}" style="font-size:24px;margin:10px 0">${esc(q)}</div>
          <div class="hk-choices word">${opts.map((o, i) => `<button data-c="${i}">${esc(o)}</button>`).join('')}</div>`;
      }
      st.left = st.limit + st.bonusT;
      st.total = st.left;
      clearInterval(st.timer);
      const tick = () => {
        st.left -= 0.1;
        const tb = document.getElementById('rp-time'); if (tb) tb.style.width = Math.max(0, (st.left / st.total) * 100) + '%';
        info(`⏱ ${Math.max(0, Math.ceil(st.left))}`);
        if (st.left <= 0) { clearInterval(st.timer); answer(-1, null); }
      };
      tick(); st.timer = setInterval(tick, 100);
    }

    function answer(i, btn) {
      if (st.busy || st.over) return;
      st.busy = true; clearInterval(st.timer);
      const ok = i === st.q.answer;
      const btns = document.querySelectorAll('#rp-q [data-c]');
      btns.forEach((b) => { b.disabled = true; if (+b.dataset.c === st.q.answer) b.classList.add('ok'); });
      if (btn && !ok) btn.classList.add('ng');
      if (ok) {
        st.combo++; st.correct++;
        const speed = 1 + (Math.max(0, st.left) / st.total) * 0.6; // 1.0〜1.6
        hitEnemy(partyAtk() * speed * (1 + Math.min(st.combo - 1, 5) * 0.1), st.combo > 1 ? `${st.combo}コンボ` : '');
        t.forEach((x) => { st.gauge[x.id]++; });
        drawTeam();
      } else {
        st.combo = 0;
        hitParty(); pop(i < 0 ? '時間切れ' : 'ミス', 'miss');
      }
      const wait = ok ? 700 : foes[st.fi].boss ? 0 : 1300;
      if (!ok && foes[st.fi].boss) {
        // ボスで間違えたら解説を見せる
        const qEl = document.getElementById('rp-q');
        qEl.insertAdjacentHTML('beforeend', `<div class="exp ng"><span class="verdict">${i < 0 ? '時間切れ' : '不正解'}</span>${st.q.exp}</div><button class="btn wide mt" id="rp-next">つづける</button>`);
        document.getElementById('rp-next').onclick = () => afterTurn();
        document.getElementById('rp-next').scrollIntoView({ block: 'nearest' });
      } else setTimeout(afterTurn, wait);
    }

    function afterTurn() {
      if (st.over) return;
      if (st.hp <= 0) return finish(false);
      if (st.ehp <= 0) {
        if (st.fi + 1 < foes.length) {
          st.fi++; st.ehp = foes[st.fi].hp;
          layout(); pop('つぎの敵！', 'info');
        } else return finish(true);
      }
      nextQuestion();
    }

    function useSkill(id) {
      const x = t.find((m) => m.id === id); if (!x || st.gauge[id] < x.skill.cost || st.over) return;
      st.gauge[id] = 0;
      const k = x.skill;
      if (k.kind === 'heal') { st.hp = Math.min(st.maxHp, st.hp + st.maxHp * k.pow); pop(`回復！`, 'heal'); drawHp(); }
      else if (k.kind === 'dmg') { hitEnemy(atkOf(x) * k.pow, k.name); if (st.ehp <= 0 && !st.busy) { st.busy = true; clearInterval(st.timer); setTimeout(afterTurn, 600); } }
      else if (k.kind === 'time') { st.bonusT += k.pow; st.left += k.pow; st.total += k.pow; pop(`+${k.pow}秒`, 'info'); }
      else if (k.kind === 'guard') { st.guard += k.pow; pop('ガード！', 'info'); drawHp(); }
      else if (k.kind === 'hint') {
        const wrong = [...document.querySelectorAll('#rp-q [data-c]')].filter((b) => +b.dataset.c !== st.q.answer && !b.disabled);
        shuffle(wrong).slice(0, k.pow).forEach((b) => { b.disabled = true; b.classList.add('rp-gone'); });
        pop('ひらめき！', 'info');
      }
      toast(`${x.name}「${k.name}」`);
      drawTeam();
    }

    function finish(win) {
      st.over = true; clearInterval(st.timer);
      const r = R(), id = `${subj}-${lec}-${n}`, first = win && !r.clear[id];
      let coins = 0, exp = 0, ups = [];
      if (win) {
        coins = Math.round((boss ? 120 : 40) * (1 + ci * 0.15)) * (first ? 2 : 1);
        exp = boss ? 80 : 30;
        r.coins += coins; r.clear[id] = 1;
        const grow = (o, name) => { o.exp += exp; while (o.exp >= needExp(o.lv)) { o.exp -= needExp(o.lv); o.lv++; ups.push(`${name} Lv.${o.lv}`); } };
        grow(r.hero, HERO.name);
        r.party.forEach((pid) => r.owned[pid] && grow(r.owned[pid], CHARS[pid].name));
        if (first) addFood(2);
        save();
      }
      body().innerHTML = `<div class="hk-result card">
        <div class="rp-endicon">${win ? '🏆' : '💫'}</div>
        <div class="big">${win ? 'クリア！' : 'やられた…'}</div>
        <p>${win ? `🪙 ${coins}${first ? '（初クリア×2）' : ''} ・ EXP ${exp}${first ? ' ・ 🐛2' : ''}` : `正解 ${st.correct}問。パーティを育ててまた挑戦しよう`}</p>
        ${ups.length ? `<p class="small"><b>レベルアップ！</b><br>${ups.map(esc).join('<br>')}</p>` : ''}
        <div class="row"><button class="btn" id="rp-again">${win ? 'もう一回' : 'リトライ'}</button><button class="btn sub" id="rp-back">冒険へ</button></div></div>`;
      document.getElementById('rp-again').onclick = () => startBattle(subj, lec, n);
      document.getElementById('rp-back').onclick = closeOv;
    }

    body().onclick = (e) => {
      const sk = e.target.closest('[data-skill]'); if (sk && !sk.disabled) return useSkill(sk.dataset.skill);
      const c = e.target.closest('#rp-q [data-c]'); if (c && !c.disabled) answer(+c.dataset.c, c);
    };
    layout();
    nextQuestion();
  }

  return { renderQuestTab };
}
