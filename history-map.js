// 歴史「地図アニメ」：1871〜1919年のヨーロッパを、地図の塗り分け・カメラ・アイコンで自動再生する
import { MAP, COUNTRIES } from './data/history/eumap.js';
import { COLORS, NAMES, START, CITIES, EVENTS, FRONT } from './data/history/timeline.js';

const NS = 'http://www.w3.org/2000/svg';
const mercY = (la) => Math.log(Math.tan(Math.PI / 4 + (la * Math.PI) / 360));
const YTOP = mercY(MAP.lat1);
const proj = ([lo, la]) => [(lo - MAP.lon0) * MAP.kx, (YTOP - mercY(la)) * MAP.k];
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// アイコンの絵柄（24×24の白い絵）
const GLYPH = {
  ally: '<path d="M2 12.5l4.2-4.2h3.6l2.4 2.3 2.4-2.3h3.6l4.2 4.2-2.3 2.2-1.3-1.2-5.4 5.5c-.8.8-2 .8-2.8 0l-1-1-.9.9c-.7.7-1.8.7-2.5 0l-.7-.7-.5.5c-.7.7-1.8.7-2.5 0-.6-.7-.6-1.7.1-2.4L6.6 13l-2.3 1.8z" fill="#fff"/>',
  factory: '<path d="M3 21V11l5 3v-3l5 3V7h2.5V3h2.5v4H21v14z" fill="#fff"/><rect x="6" y="16" width="2.4" height="2.4" fill="#455a64"/><rect x="11" y="16" width="2.4" height="2.4" fill="#455a64"/><rect x="16" y="16" width="2.4" height="2.4" fill="#455a64"/>',
  person: '<circle cx="12" cy="7.5" r="4.2" fill="#fff"/><path d="M4.5 21.5c0-5 3.3-8.2 7.5-8.2s7.5 3.2 7.5 8.2z" fill="#fff"/>',
  fist: '<path d="M6 10.5h12.5v5.5c0 3.2-2.4 5.5-5.5 5.5h-1.5c-3.2 0-5.5-2.4-5.5-5.5z" fill="#fff"/><path d="M6 10.5V7.3c0-.9.7-1.6 1.6-1.6S9.2 6.4 9.2 7.3v3.2M9.2 10.5V6c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v4.5M12.4 10.5V6c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v4.5M15.6 10.5V7.3c0-.9.7-1.6 1.5-1.6s1.4.7 1.4 1.6v3.2" fill="#fff" stroke="#c62828" stroke-width=".8"/>',
  battle: '<path d="M12 2l2.2 5.4 5.6-2.2-2.2 5.6L23 13l-5.4 2.2 2.2 5.6-5.6-2.2L12 24l-2.2-5.4-5.6 2.2 2.2-5.6L1 13l5.4-2.2-2.2-5.6 5.6 2.2z" fill="#fff" transform="translate(0 -1) scale(.95)"/>',
};
const ICOL = { ally: '#2e7d32', factory: '#546e7a', person: '#6a1b9a', fist: '#d32f2f', battle: '#e65100' };

export function openMapAnime({ openOv, body, setCleanup }) {
  openOv('地図アニメ　第一次世界大戦');
  const root = body();
  root.innerHTML = `<div class="gm">
    <div class="gm-stage"><svg class="gm-svg" xmlns="${NS}"><rect class="gm-sea" x="-3000" y="-3000" width="7000" height="7000"/>
      <g class="gm-land">${COUNTRIES.map((c, i) => `<path data-i="${i}" d="${c.d}"/>`).join('')}</g>
      <polyline class="gm-front" points="${FRONT.map((p) => proj(p).join(',')).join(' ')}" vector-effect="non-scaling-stroke"/>
      <g class="gm-lines"></g><g class="gm-cities"></g><g class="gm-icons"></g></svg>
      <div class="gm-top"><div class="gm-band"></div><div class="gm-year"></div></div>
      <button class="gm-legbtn" data-g="leg">🎨 凡例</button><div class="gm-legend" hidden></div>
    </div>
    <div class="gm-cap"><b class="gm-ct"></b><p class="gm-cd"></p></div>
    <div class="gm-ctrl">
      <button class="gm-b" data-g="prev" aria-label="前へ">⏮</button><button class="gm-b gm-play" data-g="play" aria-label="再生・一時停止">⏸</button><button class="gm-b" data-g="next" aria-label="次へ">⏭</button>
      <input class="gm-seek" type="range" min="0" max="${EVENTS.length - 1}" value="0" aria-label="年代">
      <button class="gm-b gm-spd" data-g="spd">1×</button>
    </div>
    <p class="gm-note">国の塗り分けは今の国境を当時の国にまとめた、おおよそのもの。</p></div>`;
  const svg = root.querySelector('.gm-svg'), land = [...root.querySelectorAll('.gm-land path')];
  const gLines = root.querySelector('.gm-lines'), gCities = root.querySelector('.gm-cities'), gIcons = root.querySelector('.gm-icons');
  const front = root.querySelector('.gm-front');
  // 都市（小さな黒い点と太めのラベル）
  const MAJOR = ['ロンドン', 'パリ', 'ベルリン', 'ウィーン', 'ローマ', 'コンスタンティノープル', 'サンクトペテルブルク'];
  gCities.innerHTML = CITIES.map(([n, lo, la]) => { const [x, y] = proj([lo, la]); return `<g class="gm-city${MAJOR.includes(n) ? ' major' : ''}" data-x="${x}" data-y="${y}"><circle r="3"/><text x="6" y="-5">${esc(n)}</text></g>`; }).join('');
  const cityEls = [...gCities.children];

  // カメラ：表示している範囲の中心と幅（地図の単位）
  const cam = { x: MAP.w / 2, y: MAP.h / 2, w: MAP.w };
  let anim = null;
  const ppu = () => svg.clientWidth / cam.w; // 1単位あたりの画面のピクセル
  function applyCam() {
    const W = svg.clientWidth || 1, H = svg.clientHeight || 1, h = (cam.w * H) / W;
    // 上に年と出来事名が重なるので、注目する場所は画面の中央より少し下に来るようにする
    svg.setAttribute('viewBox', `${cam.x - cam.w / 2} ${cam.y - h * 0.4} ${cam.w} ${h}`);
    const s = 1 / ppu(), zoom = MAP.w / cam.w;
    for (const c of cityEls) { c.setAttribute('transform', `translate(${c.dataset.x} ${c.dataset.y}) scale(${s})`); c.style.display = zoom >= 1.8 || c.classList.contains('major') ? '' : 'none'; }
    for (const ic of gIcons.children) ic.setAttribute('transform', `translate(${ic.dataset.x} ${ic.dataset.y}) scale(${s}) rotate(${ic.dataset.r || 0})`);
  }
  function moveCam([lo, la, z], ms = 1100) {
    const [x, y] = proj([lo, la]), from = { ...cam }, to = { x, y, w: MAP.w / z }, t0 = performance.now();
    cancelAnimationFrame(anim);
    const step = (t) => {
      const k = ms ? Math.min(1, (t - t0) / ms) : 1, e = ease(k);
      cam.x = from.x + (to.x - from.x) * e; cam.y = from.y + (to.y - from.y) * e; cam.w = from.w + (to.w - from.w) * e;
      applyCam();
      if (k < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  // 塗り分け：はじめから i 番目までの変化を重ねる
  function ownersAt(i) { const o = { ...START }; for (let k = 0; k <= i; k++) Object.assign(o, EVENTS[k].set || {}); return o; }
  function paint(i) {
    const o = ownersAt(i);
    land.forEach((p) => { const c = o[COUNTRIES[+p.dataset.i].n]; p.style.fill = c ? COLORS[c] : '#ffffff'; });
    const used = [...new Set(Object.values(o))];
    root.querySelector('.gm-legend').innerHTML = ['UK', 'FR', 'DE', 'AH', 'RU', 'IT', 'OT'].concat(used.filter((c) => !['UK', 'FR', 'DE', 'AH', 'RU', 'IT', 'OT'].includes(c))).filter((c) => used.includes(c)).map((c) => `<span><i style="background:${COLORS[c]}"></i>${esc(NAMES[c])}</span>`).join('');
  }

  // アイコン
  const icon = (k, [x, y], label, delay) => {
    const g = document.createElementNS(NS, 'g');
    g.dataset.x = x; g.dataset.y = y; g.setAttribute('class', 'gm-ic');
    g.innerHTML = `<g class="gm-pop" style="animation-delay:${delay}ms"><circle r="17" fill="${ICOL[k]}" stroke="#fff" stroke-width="2.5"/><circle r="18.5" fill="none" stroke="#111" stroke-width="1"/><g transform="translate(-11 -11) scale(.92)">${GLYPH[k]}</g>${label ? `<text y="33" class="gm-il">${esc(label)}</text>` : ''}</g>`;
    gIcons.appendChild(g);
  };
  function arrow(a, b, delay) {
    const [x1, y1] = proj(a), [x2, y2] = proj(b), dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const cx = (x1 + x2) / 2 - (dy / L) * L * 0.18, cy = (y1 + y2) / 2 + (dx / L) * L * 0.18;
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`); p.setAttribute('pathLength', '1');
    p.setAttribute('class', 'gm-arrow'); p.setAttribute('vector-effect', 'non-scaling-stroke'); p.style.animationDelay = delay + 'ms';
    gLines.appendChild(p);
    // 矢じり（線が伸びきったところに出る）
    const ang = (Math.atan2(y2 - cy, x2 - cx) * 180) / Math.PI;
    const g = document.createElementNS(NS, 'g');
    g.dataset.x = x2; g.dataset.y = y2; g.dataset.r = ang; g.setAttribute('class', 'gm-ic');
    g.innerHTML = `<g class="gm-pop" style="animation-delay:${delay + 700}ms"><path d="M10 0L-12 -11L-7 0L-12 11z" fill="#d32f2f" stroke="#7f0000" stroke-width="1.2"/></g>`;
    gIcons.appendChild(g);
  }
  function tie(a, b, delay) {
    const [x1, y1] = proj(a), [x2, y2] = proj(b);
    const l = document.createElementNS(NS, 'line');
    Object.entries({ x1, y1, x2, y2 }).forEach(([k, v]) => l.setAttribute(k, v));
    l.setAttribute('class', 'gm-tie'); l.setAttribute('vector-effect', 'non-scaling-stroke'); l.style.animationDelay = delay + 'ms';
    gLines.appendChild(l);
  }
  function showIcons(ev) {
    let d = 650;
    for (const ic of ev.ic || []) {
      if (ic.k === 'arrow') { arrow(ic.a, ic.b, d); d += 350; }
      else if (ic.k === 'ally') { if (ic.a) { tie(ic.a, ic.b, d); icon('ally', proj([(ic.a[0] + ic.b[0]) / 2, (ic.a[1] + ic.b[1]) / 2]), ic.l, d + 200); } else icon('ally', proj(ic.at), ic.l, d); d += 300; }
      else if (ic.k === 'fist') { ic.at.forEach((p, j) => icon('fist', proj(p), '', d + j * 180)); d += 500; }
      else { icon(ic.k, proj(ic.at), ic.l, d); d += 300; }
    }
    applyCam();
  }
  function clearIcons(instant) {
    const old = [...gIcons.children, ...gLines.children];
    if (instant) { old.forEach((e) => e.remove()); return; }
    old.forEach((e) => e.classList.add('gm-out'));
    setTimeout(() => old.forEach((e) => e.remove()), 450);
  }

  // 再生
  let idx = 0, playing = true, speed = 1, timer = null;
  const seek = root.querySelector('.gm-seek'), playB = root.querySelector('.gm-play'), spdB = root.querySelector('.gm-spd');
  function show(i, { instant = false } = {}) {
    idx = Math.max(0, Math.min(EVENTS.length - 1, i));
    const ev = EVENTS[idx];
    clearIcons(instant);
    paint(idx);
    front.classList.toggle('on', !!ev.front);
    moveCam(ev.cam, instant ? 0 : 1100);
    const band = root.querySelector('.gm-band'), year = root.querySelector('.gm-year');
    band.textContent = ev.t; band.className = `gm-band ${idx % 2 ? 'p' : 'g'} gm-in`;
    year.textContent = ev.y; year.classList.remove('gm-flip'); void year.offsetWidth; year.classList.add('gm-flip');
    void band.offsetWidth;
    root.querySelector('.gm-ct').textContent = `${ev.y}　${ev.t}`;
    root.querySelector('.gm-cd').textContent = ev.d;
    seek.value = idx;
    setTimeout(() => showIcons(ev), instant ? 0 : 150);
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    if (!playing) return;
    timer = setTimeout(() => { if (idx < EVENTS.length - 1) show(idx + 1); else { playing = false; playB.textContent = '▶'; } }, 6500 / speed);
  }
  root.querySelector('.gm-legbtn').onclick = (e) => { const l = root.querySelector('.gm-legend'); l.hidden = !l.hidden; e.currentTarget.classList.toggle('on', !l.hidden); };
  root.querySelector('.gm-ctrl').onclick = (e) => {
    const b = e.target.closest('[data-g]'); if (!b) return;
    const g = b.dataset.g;
    if (g === 'play') { if (!playing && idx >= EVENTS.length - 1) { playing = true; show(0); } else { playing = !playing; schedule(); } playB.textContent = playing ? '⏸' : '▶'; }
    else if (g === 'prev') show(idx - 1);
    else if (g === 'next') show(idx + 1);
    else if (g === 'leg') { const l = root.querySelector('.gm-legend'); l.hidden = !l.hidden; b.classList.toggle('on', !l.hidden); }
    else if (g === 'spd') { speed = speed === 1 ? 2 : speed === 2 ? 0.5 : 1; b.textContent = `${speed}×`; schedule(); }
  };
  seek.oninput = () => show(+seek.value, { instant: true });
  const onResize = () => applyCam();
  window.addEventListener('resize', onResize);
  setCleanup?.(() => { clearTimeout(timer); cancelAnimationFrame(anim); window.removeEventListener('resize', onResize); });
  // はじめはヨーロッパ全体から、最初の出来事へ寄っていく
  applyCam();
  requestAnimationFrame(() => { applyCam(); show(0); });
}
