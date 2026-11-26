// 免許：標識と危険予測（イラスト問題）の図。すべてコードで描くオリジナルの図（標識は法令で決まった形を簡略化して描く）
const K = '#111827';
const W = (s, w = 100, h = 100) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" style="width:100%;max-width:${Math.min(w, 380)}px;height:auto;display:block;margin:0 auto">${s}</svg>`; // 画面の幅に合わせて縮む

// ---------- 標識（1枚 100×100） ----------
const ring = (fill, inner = '') => `<circle cx="50" cy="50" r="44" fill="${fill}" stroke="#dc2626" stroke-width="9"/>${inner}`;
export const SIGN = {
  stop: `<path d="M8 14 H92 L50 90 Z" fill="#dc2626" stroke="#fff" stroke-width="3"/><text x="50" y="44" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">止まれ</text><text x="50" y="58" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">STOP</text>`,
  noEntry: `<circle cx="50" cy="50" r="46" fill="#dc2626"/><rect x="18" y="42" width="64" height="16" fill="#fff"/>`,
  closed: ring('#fff'),
  noParking: ring('#1d4ed8', '<path d="M22 22 L78 78" stroke="#dc2626" stroke-width="9"/>'),
  noStopping: ring('#1d4ed8', '<path d="M22 22 L78 78 M78 22 L22 78" stroke="#dc2626" stroke-width="9"/>'),
  speed40: ring('#fff', '<text x="50" y="66" text-anchor="middle" font-size="44" font-weight="900" fill="#1d4ed8">40</text>'),
  slow: `<path d="M8 14 H92 L50 90 Z" fill="#fff" stroke="#dc2626" stroke-width="7"/><text x="50" y="44" text-anchor="middle" font-size="17" font-weight="900" fill="#dc2626">徐行</text><text x="50" y="57" text-anchor="middle" font-size="8" font-weight="700" fill="#dc2626">SLOW</text>`,
  oneWay: `<rect x="4" y="30" width="92" height="40" rx="4" fill="#1d4ed8"/><path d="M14 50 H70 M60 40 L76 50 L60 60" stroke="#fff" stroke-width="7" fill="none" stroke-linejoin="round"/><path d="M60 38 L82 50 L60 62 Z" fill="#fff"/>`,
  leftOnly: `<circle cx="50" cy="50" r="46" fill="#1d4ed8"/><path d="M62 80 V44 H34" stroke="#fff" stroke-width="10" fill="none"/><path d="M38 30 L20 44 L38 58 Z" fill="#fff"/>`,
  pedOnly: `<circle cx="50" cy="50" r="46" fill="#1d4ed8"/><circle cx="52" cy="24" r="7" fill="#fff"/><path d="M50 33 L46 56 L36 78 M46 56 L58 78 M48 40 L36 50 M50 40 L62 50" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/>`,
  noUturn: ring('#fff', '<path d="M38 78 V44 Q38 28 52 28 Q66 28 66 44 V58" stroke="#111" stroke-width="7" fill="none"/><path d="M56 56 L66 70 L76 56 Z" fill="#111"/><path d="M24 24 L76 76" stroke="#dc2626" stroke-width="7"/>'),
  railroad: `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#facc15" stroke="${K}" stroke-width="3"/><rect x="28" y="44" width="40" height="16" fill="${K}"/><rect x="58" y="34" width="12" height="12" fill="${K}"/><rect x="32" y="36" width="6" height="8" fill="${K}"/><circle cx="36" cy="64" r="5" fill="${K}"/><circle cx="50" cy="64" r="5" fill="${K}"/><circle cx="64" cy="64" r="5" fill="${K}"/>`,
  crosswalk: `<rect x="4" y="4" width="92" height="92" rx="6" fill="#1d4ed8"/><path d="M50 12 L88 84 H12 Z" fill="#fff"/><circle cx="54" cy="38" r="5" fill="${K}"/><path d="M52 45 L48 62 L42 74 M48 62 L58 74 M50 50 L42 56 M52 50 L60 56" stroke="${K}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M24 80 H34 M40 80 H50 M56 80 H66 M72 80 H80" stroke="${K}" stroke-width="4"/>`,
  priority: `<rect x="4" y="4" width="92" height="92" rx="6" fill="#1d4ed8"/><path d="M18 56 H82" stroke="#fff" stroke-width="6"/><path d="M50 86 V30" stroke="#fff" stroke-width="12"/><path d="M34 34 L50 14 L66 34 Z" fill="#fff"/>`,
  school: `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#facc15" stroke="${K}" stroke-width="3"/><circle cx="40" cy="34" r="6" fill="${K}"/><circle cx="60" cy="40" r="5" fill="${K}"/><path d="M40 42 L36 60 L30 72 M36 60 L44 72 M60 47 L58 62 L54 72 M58 62 L64 72 M38 48 L58 52" stroke="${K}" stroke-width="5" stroke-linecap="round" fill="none"/>`,
  signal: `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#facc15" stroke="${K}" stroke-width="3"/><rect x="40" y="24" width="20" height="52" rx="6" fill="${K}"/><circle cx="50" cy="34" r="6" fill="#dc2626"/><circle cx="50" cy="50" r="6" fill="#f59e0b"/><circle cx="50" cy="66" r="6" fill="#16a34a"/>`,
  slippery: `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#facc15" stroke="${K}" stroke-width="3"/><rect x="34" y="30" width="30" height="16" rx="5" fill="${K}" transform="rotate(-15 49 38)"/><path d="M36 54 q4 6 0 12 q-4 6 0 12 M50 54 q4 6 0 12 q-4 6 0 12 M64 54 q4 6 0 12 q-4 6 0 12" stroke="${K}" stroke-width="3.5" fill="none"/>`,
  work: `<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#facc15" stroke="${K}" stroke-width="3"/><circle cx="44" cy="30" r="6" fill="${K}"/><path d="M44 38 L46 56 L38 72 M46 56 L56 70 M44 44 L62 52 L70 46" stroke="${K}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M56 72 L72 72 L66 62 Z" fill="${K}"/>`,
};
// 標識をA〜Fのように並べた図
export const signBoard = (items) => {
  const cols = 3, cw = 120, ch = 140, rows = Math.ceil(items.length / cols);
  return W(items.map(([label, key], i) => {
    const x = (i % cols) * cw + 10, y = Math.floor(i / cols) * ch + 6;
    return `<g transform="translate(${x} ${y})"><g transform="scale(1)">${SIGN[key]}</g><text x="50" y="124" text-anchor="middle" font-size="18" font-weight="800" fill="${K}">（${label}）</text></g>`;
  }).join(''), cols * cw, rows * ch);
};

// ---------- 危険予測の場面（上から見た図。320×220） ----------
const car = (x, y, c = '#2563eb', r = 0, me = false) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-11" y="-18" width="22" height="36" rx="6" fill="${c}" stroke="${K}" stroke-width="1.5"/><rect x="-8" y="-12" width="16" height="8" rx="2" fill="#bfdbfe"/>${me ? '<text x="0" y="34" text-anchor="middle" font-size="10" font-weight="800" fill="#dc2626">自分</text>' : ''}</g>`;
const truck = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-14" y="-28" width="28" height="56" rx="3" fill="#e5e7eb" stroke="${K}" stroke-width="1.5"/><rect x="-14" y="-28" width="28" height="14" rx="3" fill="#94a3b8" stroke="${K}" stroke-width="1.5"/></g>`;
const bus = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-14" y="-38" width="28" height="76" rx="4" fill="#f59e0b" stroke="${K}" stroke-width="1.5"/><text x="0" y="4" text-anchor="middle" font-size="9" font-weight="800" fill="${K}" transform="rotate(90)">BUS</text></g>`;
const bike = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4" y="-12" width="8" height="24" rx="3" fill="#16a34a" stroke="${K}" stroke-width="1.2"/><circle r="4" fill="#fde68a" stroke="${K}" stroke-width="1"/></g>`;
const person = (x, y, c = '#ef4444') => `<g transform="translate(${x} ${y})"><circle r="6" fill="${c}" stroke="${K}" stroke-width="1.5"/><circle r="2.5" fill="#fde68a"/></g>`;
const road = (s) => `<rect width="320" height="220" fill="#d9f99d"/>${s}`;
const arrow = (d) => `<path d="${d}" stroke="#dc2626" stroke-width="3" fill="none" stroke-dasharray="6 4" marker-end="url(#ah)"/>`;
const defs = '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#dc2626"/></marker></defs>';
const note = (t) => `<rect x="0" y="198" width="320" height="22" fill="rgba(15,23,42,.75)"/><text x="160" y="213" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${t}</text>`;

export const SCENE = {
  // 住宅街：右前方に止まっている車の陰からボールと子ども
  ball: W(defs + road(`<rect x="110" y="0" width="100" height="220" fill="#9ca3af"/><path d="M160 0 V200" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
    <rect x="70" y="20" width="36" height="40" fill="#fca5a5" stroke="${K}"/><rect x="214" y="30" width="40" height="44" fill="#fdba74" stroke="${K}"/><rect x="214" y="110" width="40" height="40" fill="#c4b5fd" stroke="${K}"/>
    ${car(194, 80, '#64748b')}<circle cx="176" cy="72" r="5" fill="#f43f5e" stroke="${K}"/>${person(214, 92, '#22c55e')}
    ${car(136, 160, '#2563eb', 0, true)}${arrow('M136 138 V96')}`), 320, 220),
  // 交差点で右折待ち。対向のトラックが止まってゆずってくれている（陰に二輪車）
  rightTurn: W(defs + road(`<rect x="0" y="80" width="320" height="64" fill="#9ca3af"/><rect x="128" y="0" width="64" height="220" fill="#9ca3af"/>
    <path d="M0 112 H128 M192 112 H320 M160 0 V80 M160 144 V200" stroke="#fff" stroke-width="2" stroke-dasharray="10 8"/>
    <path d="M128 80 h-20 v-6 h20 M192 144 h20 v6 h-20" stroke="#fff" stroke-width="3"/>
    ${truck(176, 50)}${bike(150, 40)}${person(206, 96, '#a855f7')}${person(214, 104, '#a855f7')}
    ${car(146, 170, '#2563eb', 0, true)}${arrow('M150 150 Q156 110 212 104')}`), 320, 220),
  // 雨の夜、信号のない横断歩道。対向車のライト
  rainNight: W(defs + `<rect width="320" height="220" fill="#0f172a"/><rect x="100" y="0" width="120" height="220" fill="#334155"/>
    <path d="M160 0 V200" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10 8"/>
    <g fill="#e2e8f0">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${104 + i * 19}" y="88" width="11" height="26"/>`).join('')}</g>
    ${car(188, 50, '#475569', 180)}<path d="M180 66 L150 130 L210 130 Z" fill="#fef08a" opacity=".35"/><path d="M196 66 L170 130 L226 130 Z" fill="#fef08a" opacity=".25"/>
    ${person(160, 100, '#1f2937')}<g stroke="#93c5fd" stroke-width="1.2" opacity=".7">${Array.from({ length: 26 }, (_, i) => `<path d="M${(i * 37) % 320} ${(i * 53) % 190} l-4 10"/>`).join('')}</g>
    ${car(132, 170, '#2563eb', 0, true)}`, 320, 220),
  // 停留所に止まっている路線バス。対向車あり
  busStop: W(defs + road(`<rect x="100" y="0" width="120" height="220" fill="#9ca3af"/><path d="M160 0 V200" stroke="#facc15" stroke-width="3"/>
    ${bus(124, 70)}<rect x="88" y="54" width="8" height="34" fill="#475569"/><circle cx="92" cy="50" r="7" fill="#fff" stroke="${K}"/>${person(92, 98)}${person(110, 112, '#f97316')}
    ${car(190, 40, '#a3a3a3', 180)}${car(126, 172, '#2563eb', 0, true)}`), 320, 220),
  // 高速道路の合流
  merge: W(defs + `<rect width="320" height="220" fill="#d9f99d"/><path d="M0 60 H320 V150 H0 Z" fill="#9ca3af"/><path d="M0 105 H320" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>
    <path d="M0 150 H200 L320 150 L320 168 H120 Q60 168 0 200 Z" fill="#a8a29e"/><path d="M120 150 H260" stroke="#fff" stroke-width="2" stroke-dasharray="8 6"/>
    ${car(150, 128, '#a3a3a3', 90)}${car(240, 84, '#22c55e', 90)}${car(70, 166, '#2563eb', 80, true)}${arrow('M92 162 Q170 156 230 136')}`, 320, 220),
};
