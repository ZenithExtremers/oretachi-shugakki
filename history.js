// ヒマコロシ「歴史」：第一次世界大戦の追体験ゲーム
// 物語モード（架空の4人の視点）・指導者モード（国の決断）・資料館（遊ぶと解放される資料）
// 保存は S.hist（キー oretachi:hima）
import { CHARS } from './data/history/story.js';
import { NATIONS } from './data/history/leaders.js';
import * as A from './data/history/archive.js';

const SIDE = { E: '協商国（連合国）', C: '同盟国', N: 'その他' };
const COL = { E: '#7ea6d4', C: '#d98a76', N: '#cfcdc0', X: '#e8c36a', W: '#7ea6d4', L: '#d98a76', NEW: '#7cc3a3' };
const ENG = { UK: 'United Kingdom', FR: 'France', DE: 'Germany', AH: 'Austria', IT: 'Italy', RU: 'Russia', SR: 'Serbia', OT: 'Turkey' };
const STAT = [['pow', '国力'], ['mor', '国民の士気'], ['dip', '外交'], ['loss', '犠牲']];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function makeHistory(ctx) {
  const { S, save, openOv, closeOv, body, toast, esc, shuffle, addFood } = ctx;
  const H = () => {
    if (!S.hist) S.hist = { st: {}, ld: {}, arch: {}, quiz: { ok: 0, n: 0 } };
    return S.hist;
  };
  let sub = 'story';
  const unlock = (keys) => {
    const h = H(), got = [];
    for (const k of keys) if (!h.arch[k]) { h.arch[k] = 1; got.push(k.slice(2)); }
    return got;
  };

  /* ---------- タブの画面 ---------- */
  function render(m) {
    const h = H();
    const nArch = Object.keys(h.arch).length;
    m.innerHTML = `
      <div class="hs-hero"><div class="hs-yrs">1914 — 1918</div><b>歴史追体験：第一次世界大戦</b><small>あの4年間を、兵士・看護師・記者の目で、そして国の指導者として。</small></div>
      <div class="seg hs-seg" role="group">${[['story', '📖 物語'], ['leader', '👑 指導者'], ['arch', `🏛️ 資料館 <small>${nArch}</small>`]].map(([k, n]) => `<button data-hs="${k}" aria-pressed="${sub === k}">${n}</button>`).join('')}</div>
      <div id="hs-sub"></div>`;
    m.onclick = (e) => {
      const b = e.target.closest('[data-hs]'); if (b) { sub = b.dataset.hs; render(m); window.scrollTo(0, 0); return; }
      const c = e.target.closest('[data-char]'); if (c) { openStory(c.dataset.char, c.dataset.restart === '1'); return; }
      const n = e.target.closest('[data-nation]'); if (n) { openLeader(n.dataset.nation, n.dataset.restart === '1'); return; }
      const ar = e.target.closest('[data-arch]'); if (ar) { openArch(ar.dataset.arch); }
    };
    const el = m.querySelector('#hs-sub');
    if (sub === 'story') el.innerHTML = `<p class="hs-note">架空の4人が、史実の出来事の中を生きる物語。章ごとに選択と史実クイズがあり、出会った人物や戦いが資料館に登録される。</p>
      ${CHARS.map((c) => { const p = h.st[c.id]; const ci = p ? p.ci : 0; return `<div class="hs-card">
        <div class="hs-ch"><span class="hs-flag">${c.icon}</span><div><b>${esc(c.name)}</b><small>${esc(c.who)}</small></div><span class="hs-tag s${c.side}">${SIDE[c.side]}</span></div>
        <p>${esc(c.intro)}</p>
        <div class="hs-prog"><i style="width:${(ci / c.ch.length) * 100}%"></i></div>
        <div class="hs-row"><small>${p?.done ? '✓ 読了' : `第${Math.min(ci + 1, c.ch.length)}章 / ${c.ch.length}章`}</small>
          ${p?.done ? `<button class="btn sub" data-char="${c.id}" data-restart="1">最初から</button>` : `<button class="btn" data-char="${c.id}">${ci ? '続きから' : 'はじめる'}</button>`}</div></div>`; }).join('')}`;
    else if (sub === 'leader') el.innerHTML = `<p class="hs-note">国の指導者になって、史実の分かれ道で決断する。国力・国民の士気・外交・犠牲が変わり、最後に史実の結末と比べられる。史実と違う道は「もしも」の推測。</p>
      ${NATIONS.map((n) => { const p = h.ld[n.id]; const ti = p ? p.ti : 0; return `<div class="hs-card">
        <div class="hs-ch"><span class="hs-flag">${n.icon}</span><div><b>${esc(n.name)}</b><small>${esc(n.who)}</small></div><span class="hs-tag s${n.side}">${SIDE[n.side]}</span></div>
        <div class="hs-prog"><i style="width:${(ti / n.turns.length) * 100}%"></i></div>
        <div class="hs-row"><small>${p?.done ? `✓ 終了・史実と同じ決断 ${p.picks.filter((x) => x.h).length}/${n.turns.length}` : `決断 ${Math.min(ti + 1, n.turns.length)} / ${n.turns.length}`}</small>
          ${p?.done ? `<button class="btn sub" data-nation="${n.id}" data-restart="1">もう一度</button>` : `<button class="btn" data-nation="${n.id}">${ti ? '続きから' : 'はじめる'}</button>`}</div></div>`; }).join('')}`;
    else el.innerHTML = archIndex();
  }

  /* ---------- 物語モード ---------- */
  function openStory(id, restart) {
    const c = CHARS.find((x) => x.id === id), h = H();
    if (restart || !h.st[id]) h.st[id] = { ci: 0, hp: 7, mind: 6, picks: [], done: false };
    const p = h.st[id];
    if (p.done) return showEnding(c, p);
    openOv(c.name);
    showChapter(c, p);
  }
  const bars = (p) => `<div class="hs-stats"><span>体力<i class="hs-bar"><b style="width:${p.hp * 10}%"></b></i></span><span>心<i class="hs-bar m"><b style="width:${p.mind * 10}%"></b></i></span></div>`;
  function showChapter(c, p) {
    const ch = c.ch[p.ci];
    body().innerHTML = `<article class="hs-page">
      <div class="hs-meta"><span>${c.icon} 第${p.ci + 1}章 / ${c.ch.length}</span><b>${esc(ch.y)}</b><small>${esc(ch.at)}</small></div>
      ${ch.p.map((x) => `<p>${esc(x)}</p>`).join('')}
      ${bars(p)}
      <div class="hs-choice"><b>${esc(ch.c.q)}</b>${ch.c.o.map((o, i) => `<button class="hs-opt" data-o="${i}">${esc(o.t)}</button>`).join('')}</div>
    </article>`;
    body().scrollTo?.(0, 0);
    body().onclick = (e) => {
      const b = e.target.closest('[data-o]'); if (!b) return;
      const o = ch.c.o[+b.dataset.o];
      p.hp = clamp(p.hp + o.hp, 1, 10); p.mind = clamp(p.mind + o.mind, 0, 10);
      p.picks[p.ci] = +b.dataset.o; save();
      afterChoice(c, p, ch, o);
    };
  }
  const diff = (v, n) => (v ? `<span class="${v > 0 ? 'up' : 'dn'}">${n} ${v > 0 ? '+' : ''}${v}</span>` : '');
  function afterChoice(c, p, ch, o) {
    const qz = ch.z, ord = shuffle(qz.c.map((_, i) => i));
    body().innerHTML = `<article class="hs-page">
      <div class="hs-meta"><span>${c.icon} 第${p.ci + 1}章</span><b>${esc(ch.y)}</b></div>
      <div class="hs-result"><p>${esc(o.r)}</p><div class="hs-fx">${diff(o.hp, '体力')}${diff(o.mind, '心')}</div></div>
      ${bars(p)}
      <div class="hs-quiz"><span class="hs-qlab">史実クイズ</span><b>${esc(qz.q)}</b>${ord.map((i) => `<button class="hs-opt" data-q="${i}">${esc(qz.c[i])}</button>`).join('')}<div id="hs-qexp"></div></div>
    </article>`;
    body().onclick = (e) => {
      const b = e.target.closest('[data-q]'); if (!b || b.disabled) return;
      const ok = +b.dataset.q === qz.a, h = H();
      h.quiz.n++; if (ok) h.quiz.ok++;
      body().querySelectorAll('[data-q]').forEach((x) => { x.disabled = true; if (+x.dataset.q === qz.a) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      const got = unlock(ch.u);
      const last = p.ci + 1 >= c.ch.length;
      document.getElementById('hs-qexp').innerHTML = `<div class="hs-exp ${ok ? 'ok' : 'ng'}"><b>${ok ? '正解！' : '不正解'}</b>${esc(qz.e)}</div>
        ${got.length ? `<div class="hs-unl">🏛️ 資料館に登録：${got.map(esc).join('・')}</div>` : ''}
        <button class="btn wide mt" data-next>${last ? 'エピローグへ' : '次の章へ ▶'}</button>`;
      if (ok) { addFood(1); }
      p.ci++; if (last) { p.done = true; unlock(['n:数字で見る']); }
      save();
      body().querySelector('[data-next]').onclick = () => (last ? showEnding(c, p) : showChapter(c, p));
    };
  }
  function showEnding(c, p) {
    if (!document.getElementById('hk-ov')) openOv(c.name);
    const good = p.mind >= 6;
    body().innerHTML = `<article class="hs-page hs-end">
      <div class="hs-meta"><span>${c.icon} エピローグ</span><b>${esc(c.name)}</b></div>
      <p>${esc(good ? c.end.good : c.end.hard)}</p>
      ${bars(p)}
      <div class="hs-endnote">あなたの選択で、${esc(c.name)}の心は ${p.mind}/10。${good ? '傷を抱えながらも、前を向く結末になった。' : '戦争の傷が深く残る結末になった。選択を変えると、別のエピローグが読める。'}</div>
      <p class="hs-note">ここで描かれた人物は架空だが、出来事・日付・数字は史実にもとづいている。資料館で、くわしい流れや人物を確かめられる。</p>
      <div class="row"><button class="btn" data-again>最初から読む</button><button class="btn sub" data-close>閉じる</button></div>
    </article>`;
    body().onclick = (e) => {
      if (e.target.closest('[data-again]')) { H().st[c.id] = { ci: 0, hp: 7, mind: 6, picks: [], done: false }; save(); showChapter(c, H().st[c.id]); }
      if (e.target.closest('[data-close]')) closeOv();
    };
  }

  /* ---------- 指導者モード ---------- */
  function openLeader(id, restart) {
    const n = NATIONS.find((x) => x.id === id), h = H();
    if (restart || !h.ld[id]) h.ld[id] = { ti: 0, s: { ...n.start }, picks: [], done: false };
    const p = h.ld[id];
    openOv(n.name);
    if (p.done) return showResult(n, p);
    showTurn(n, p);
  }
  const meters = (s) => `<div class="hs-meters">${STAT.map(([k, nm]) => `<span class="${k}"><small>${nm}</small><i class="hs-bar ${k}"><b style="width:${clamp(s[k], 0, 100)}%"></b></i><em>${s[k]}</em></span>`).join('')}</div>`;
  function showTurn(n, p) {
    const t = n.turns[p.ti], ord = shuffle(t.o.map((_, i) => i));
    body().innerHTML = `<article class="hs-page">
      <div class="hs-meta"><span>${n.icon} 決断 ${p.ti + 1} / ${n.turns.length}</span><b>${esc(t.y)}　${esc(t.t)}</b><small>${esc(n.who)}</small></div>
      <p>${esc(t.s)}</p>
      ${meters(p.s)}
      <div class="hs-choice"><b>どうする？</b>${ord.map((i) => `<button class="hs-opt" data-o="${i}">${esc(t.o[i].t)}</button>`).join('')}</div>
    </article>`;
    body().onclick = (e) => {
      const b = e.target.closest('[data-o]'); if (!b) return;
      const o = t.o[+b.dataset.o];
      for (const [k] of STAT) p.s[k] = clamp(p.s[k] + (o.fx[k] || 0), 0, 100);
      p.picks[p.ti] = { i: +b.dataset.o, h: !!o.h }; save();
      const got = unlock(t.u);
      const last = p.ti + 1 >= n.turns.length;
      body().innerHTML = `<article class="hs-page">
        <div class="hs-meta"><span>${n.icon} 決断 ${p.ti + 1}</span><b>${esc(t.t)}</b></div>
        <div class="hs-result"><span class="hs-hist ${o.h ? 'h' : 'w'}">${o.h ? '📜 史実と同じ決断' : '🔀 史実とは違う道'}</span><p><b>${esc(o.t)}</b></p><p>${esc(o.r)}</p>
          <div class="hs-fx">${STAT.map(([k, nm]) => { const v = o.fx[k] || 0; return v ? `<span class="${(k === 'loss' ? -v : v) > 0 ? 'up' : 'dn'}">${nm} ${v > 0 ? '+' : ''}${v}</span>` : ''; }).join('')}</div></div>
        <div class="hs-real"><b>史実では</b><p>${esc(t.n)}</p></div>
        ${meters(p.s)}
        ${got.length ? `<div class="hs-unl">🏛️ 資料館に登録：${got.map(esc).join('・')}</div>` : ''}
        <button class="btn wide mt" data-next>${last ? '結末を見る' : '次の決断へ ▶'}</button>
      </article>`;
      p.ti++; if (last) { p.done = true; unlock([`a:${n.aim}`, 'r:国どうしの関係']); addFood(3); }
      else addFood(1);
      save();
      body().querySelector('[data-next]').onclick = () => (last ? showResult(n, p) : showTurn(n, p));
    };
  }
  function showResult(n, p) {
    const hist = { ...n.start };
    for (const t of n.turns) { const o = t.o.find((x) => x.h); for (const [k] of STAT) hist[k] = clamp(hist[k] + (o.fx[k] || 0), 0, 100); }
    const same = p.picks.filter((x) => x && x.h).length, aim = A.AIMS.find((a) => a.n === n.aim);
    const title = same === n.turns.length ? '史実をたどった指導者' : same >= n.turns.length - 2 ? '歴史に近い道を選んだ指導者' : same <= 1 ? '歴史を大きく変えた指導者' : '別の歴史を歩んだ指導者';
    body().innerHTML = `<article class="hs-page hs-end">
      <div class="hs-meta"><span>${n.icon} 結末</span><b>${esc(n.name)}</b></div>
      <div class="hs-title">${esc(title)}<small>史実と同じ決断 ${same} / ${n.turns.length}</small></div>
      <div class="hs-cmp">${STAT.map(([k, nm]) => `<div><small>${nm}</small><span>あなた <b>${p.s[k]}</b></span><span>史実 <b>${hist[k]}</b></span></div>`).join('')}</div>
      <div class="hs-real"><b>史実の結末</b><p>${esc(aim ? aim.r : '')}</p></div>
      ${aim ? `<dl class="hs-dl"><dt>欲しかった</dt><dd>${esc(aim.w)}</dd><dt>恐れていた</dt><dd>${esc(aim.f)}</dd></dl>` : ''}
      <p class="hs-note">史実と違う選択の結果は、当時の状況からの推測。実際にどうなったかは誰にもわからない。</p>
      <div class="row"><button class="btn" data-again>もう一度</button><button class="btn sub" data-close>閉じる</button></div>
    </article>`;
    body().onclick = (e) => {
      if (e.target.closest('[data-again]')) { H().ld[n.id] = { ti: 0, s: { ...n.start }, picks: [], done: false }; save(); showTurn(n, H().ld[n.id]); }
      if (e.target.closest('[data-close]')) closeOv();
    };
  }

  /* ---------- 資料館 ---------- */
  const has = (k) => !!H().arch[k];
  // 場面は、物語で読んだ章の時期までが解放される（それ以前の流れも含む）。指導者モードを始めると開戦前とサラエボ事件の場面も開く
  const sceneOpen = (i) => {
    const h = H();
    let reach = -1;
    for (const c of CHARS) { const p = h.st[c.id]; if (p) for (const ch of c.ch.slice(0, p.done ? c.ch.length : p.ci)) reach = Math.max(reach, ch.sc); }
    if (Object.values(h.ld).some((p) => p.ti > 0 || p.done)) reach = Math.max(reach, 1);
    return i <= reach;
  };
  function archIndex() {
    const sec = [
      ['flow', '📅 流れと陣営図', A.ST.length, A.ST.filter((_, i) => sceneOpen(i)).length, '物語を読むと場面が解放'],
      ['web', '🕸️ 国どうしの関係', 1, has('r:国どうしの関係') ? 1 : 0, '指導者モードを1か国終えると解放'],
      ['aims', '🎯 各国の思惑', A.AIMS.length, A.AIMS.filter((a) => has('a:' + a.n)).length, '指導者モードで国を終えると解放'],
      ['secret', '🤫 秘密外交', A.SECRET.length, A.SECRET.filter((a) => has('x:' + a.n)).length, '物語・指導者モードで解放'],
      ['people', '👤 人物図鑑', A.PEOPLE.length, A.PEOPLE.filter((a) => has('p:' + a.n)).length, '物語・指導者モードで解放'],
      ['battles', '⚔️ 戦い図鑑', A.BAT.length, A.BAT.filter((a) => has('b:' + a.n)).length, '物語・指導者モードで解放'],
      ['weapons', '💣 新兵器と総力戦', A.WEAP.length, A.WEAP.filter((a) => has('w:' + a.n)).length, '物語で解放'],
      ['numbers', '📊 数字で見る', 1, has('n:数字で見る') ? 1 : 0, '物語を1人読み終えると解放'],
    ];
    const q = H().quiz;
    return `<p class="hs-note">物語や指導者モードで出会った出来事・人物・戦いが登録される。史実クイズ ${q.ok}/${q.n} 問正解。</p>
      <div class="hs-arch">${sec.map(([k, nm, tot, got, how]) => `<button class="hs-ab" data-arch="${k}" ${got ? '' : 'disabled'}><b>${nm}</b><span>${got} / ${tot}</span><small>${got ? 'タップで開く' : esc(how)}</small><i class="hs-prog"><i style="width:${(got / tot) * 100}%"></i></i></button>`).join('')}</div>`;
  }
  const lockCard = (how) => `<div class="hs-acard lock"><b>？？？</b><p>${how}</p></div>`;
  function campMap(i) {
    const m = A.sides(i);
    const side = (id) => (ENG[id] ? m[ENG[id]] : id === 'JP' ? (i >= 8 ? 'W' : i >= 2 ? 'E' : 'N') : id === 'US' ? (i >= 8 ? 'W' : i >= 6 ? 'E' : 'N') : 'N') || 'N';
    return `<svg viewBox="0 0 400 360" class="hs-map">${A.EDGES.filter((e) => e[2] === 'a').map((e) => { const a = A.NODES.find((x) => x.id === e[0]), b = A.NODES.find((x) => x.id === e[1]); return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="currentColor" stroke-opacity=".15" stroke-width="2"/>`; }).join('')}
      ${A.NODES.map((nd) => { const s = side(nd.id), w = Math.max(58, nd.n.length * 13 + 18); return `<g><rect x="${nd.x - w / 2}" y="${nd.y - 16}" width="${w}" height="32" rx="16" fill="${COL[s] || COL.N}"/><text x="${nd.x}" y="${nd.y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#1b1d17">${esc(nd.n)}</text></g>`; }).join('')}</svg>
      <div class="hs-leg">${[...new Set(A.NODES.map((nd) => side(nd.id)))].map((s) => `<span><i style="background:${COL[s]}"></i>${esc((A.ST[i].lg && A.ST[i].lg[s]) || A.LG[s])}</span>`).join('')}</div>`;
  }
  function openArch(k) {
    openOv('資料館');
    let html = '';
    if (k === 'flow') html = `<h2 class="hs-h">流れと陣営図</h2>${A.ST.map((s, i) => (sceneOpen(i) ? `<section class="hs-scene"><p class="hs-when">場面 ${i + 1}　${esc(s.y)}</p><h3>${esc(s.t)}</h3>${campMap(i)}
        <ol class="hs-mk">${s.m.map((x) => `<li>${esc(x[2])}</li>`).join('')}</ol>${s.p.map((x) => `<p>${esc(x)}</p>`).join('')}<div class="hs-key">ポイント：${esc(s.k)}</div></section>` : `<section class="hs-scene">${lockCard(`場面 ${i + 1}：物語でこの時期に進むと解放`)}</section>`)).join('')}`;
    else if (k === 'web') html = `<h2 class="hs-h">国どうしの関係</h2><p class="hs-note">実線は同盟・協力、赤い点線は対立。色は最終的に属した陣営。</p>
      <svg viewBox="0 0 400 360" class="hs-map">${A.EDGES.map((e) => { const a = A.NODES.find((x) => x.id === e[0]), b = A.NODES.find((x) => x.id === e[1]); return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${e[2] === 'r' ? '#c4241a' : 'currentColor'}" stroke-width="2.5" ${e[2] === 'r' ? 'stroke-dasharray="7 5"' : 'stroke-opacity=".7"'}/>`; }).join('')}${A.NODES.map((nd) => { const w = Math.max(58, nd.n.length * 13 + 18); return `<rect x="${nd.x - w / 2}" y="${nd.y - 16}" width="${w}" height="32" rx="16" fill="${COL[nd.s]}"/><text x="${nd.x}" y="${nd.y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#1b1d17">${esc(nd.n)}</text>`; }).join('')}</svg>
      ${A.EDGES.map((e) => `<div class="hs-rel ${e[2]}"><b>${esc(A.NODES.find((x) => x.id === e[0]).n)}と${esc(A.NODES.find((x) => x.id === e[1]).n)}</b>：${esc(e[3])}</div>`).join('')}
      <h3 class="hs-h3">同盟ができるまで</h3><ul class="hs-tl">${A.ALT.map((a) => `<li><b>${esc(a[0])}</b>${esc(a[1])}</li>`).join('')}</ul>`;
    else if (k === 'aims') html = `<h2 class="hs-h">各国の思惑</h2>${A.AIMS.map((a) => (has('a:' + a.n) ? `<div class="hs-acard"><b>${esc(a.n)}</b><span class="hs-tag s${a.s}">${SIDE[a.s]}</span><dl class="hs-dl"><dt>欲しかった</dt><dd>${esc(a.w)}</dd><dt>恐れていた</dt><dd>${esc(a.f)}</dd><dt>結果</dt><dd>${esc(a.r)}</dd></dl></div>` : lockCard(`${esc(a.n)}：指導者モードで${NATIONS.some((n) => n.aim === a.n) ? 'この国を終えると解放' : '（今後追加予定）'}`))).join('')}`;
    else if (k === 'secret') html = `<h2 class="hs-h">秘密外交：裏で交わされた約束</h2>${A.SECRET.map((a) => (has('x:' + a.n) ? `<div class="hs-acard"><p class="hs-when">${esc(a.y)}</p><b>${esc(a.n)}</b><p>${esc(a.t)}</p></div>` : lockCard('物語・指導者モードで解放'))).join('')}`;
    else if (k === 'people') html = `<h2 class="hs-h">人物図鑑</h2>${A.PEOPLE.map((a) => (has('p:' + a.n) ? `<div class="hs-acard"><b>${esc(a.n)}</b><div class="hs-role"><span class="hs-tag s${a.s}">${SIDE[a.s]}</span>${esc(a.r)}</div><p>${esc(a.t)}</p></div>` : lockCard('物語・指導者モードで解放'))).join('')}`;
    else if (k === 'battles') html = `<h2 class="hs-h">戦い図鑑</h2><p class="hs-note">死傷者数は概数で、資料によって差がある。</p>${A.BAT.map((a) => (has('b:' + a.n) ? `<div class="hs-acard"><p class="hs-when">${esc(a.d)}</p><b>${esc(a.n)}</b><dl class="hs-dl"><dt>対戦</dt><dd>${esc(a.v)}</dd><dt>結果</dt><dd>${esc(a.res)}</dd><dt>損害</dt><dd>${esc(a.l)}</dd></dl><p>${esc(a.p)}</p></div>` : lockCard('物語・指導者モードで解放'))).join('')}`;
    else if (k === 'weapons') html = `<h2 class="hs-h">新兵器と総力戦</h2>${A.WEAP.map((a) => (has('w:' + a.n) ? `<div class="hs-acard"><b>${esc(a.n)}</b><p>${esc(a.t)}</p></div>` : lockCard('物語で解放'))).join('')}`;
    else if (k === 'numbers') { const mx = Math.max(...A.DEATH.map((d) => d[1])); html = `<h2 class="hs-h">数字で見る：国別の軍人の死者</h2><p class="hs-note">軍人の死者の概数。資料によって大きく差があり、民間人の死者は含まない。軍民合わせた死者は約1500万〜2000万人とされ、1918年からのスペイン風邪では世界で数千万人が亡くなったと推定されている。</p>${A.DEATH.map((d) => `<div class="hs-dbar"><span>${esc(d[0])}</span><i style="width:${Math.round((d[1] / mx) * 100)}%"></i><b>約${d[1]}万人</b></div>`).join('')}`; }
    body().innerHTML = `<article class="hs-page hs-archp">${html}<p class="hs-note">数値や日付は一般的な概説書でよく使われるもの。細かな数字には諸説ある。</p></article>`;
    body().onclick = null;
  }

  return { render };
}
