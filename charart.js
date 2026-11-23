// 章限定の仲間のオリジナルイラスト（SVG）。かっこいいデフォルメ：大きめの頭・鋭い目・金のふちと光のオーラ
// 絵文字の代わりに使う。viewBox 120×120
const OL = '#1f2937'; // 線の色
const wrap = (id, c1, c2, body) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="rp-art">
<defs>
  <radialGradient id="au-${id}" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="${c1}" stop-opacity=".95"/><stop offset=".65" stop-color="${c2}" stop-opacity=".55"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
  <clipPath id="cl-${id}"><circle cx="60" cy="60" r="56"/></clipPath>
  <linearGradient id="gd-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#b7791f"/></linearGradient>
</defs>
<circle cx="60" cy="60" r="57" fill="url(#au-${id})"/>
<g stroke="#fde68a" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M60 4v10M60 106v10M4 60h10M106 60h10M20 20l7 7M93 93l7 7M100 20l-7 7M27 93l-7 7"/></g>
<g clip-path="url(#cl-${id})">${body}</g>
<circle cx="60" cy="60" r="57" fill="none" stroke="url(#gd-${id})" stroke-width="4"/>
</svg>`;
// 鋭い目（左右）
const eyes = (y = 54, col = '#111827') => `
<path d="M44 ${y - 4} l12 3" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><path d="M76 ${y - 4} l-12 3" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
<path d="M44 ${y + 1} q6 -4 12 1 q-6 5 -12 -1z" fill="${col}"/><path d="M76 ${y + 1} q-6 -4 -12 1 q6 5 12 -1z" fill="${col}"/>
<circle cx="52" cy="${y + 1}" r="1.4" fill="#fff"/><circle cx="68" cy="${y + 1}" r="1.4" fill="#fff"/>`;

export const CHAR_ART = {
  // ポインタ忍者（C/C++）：紺の頭巾、赤いマフラー、アドレス手裏剣（＊）
  ninja: wrap('ninja', '#93c5fd', '#1d4ed8', `
<path d="M30 112 q2 -30 30 -32 q28 2 30 32z" fill="#1e3a8a" stroke="${OL}" stroke-width="3"/>
<path d="M36 84 q24 12 48 0 l4 9 q-28 14 -56 0z" fill="#dc2626" stroke="${OL}" stroke-width="2.5"/>
<path d="M84 86 l14 14 l-6 4 l-12 -12z" fill="#dc2626" stroke="${OL}" stroke-width="2.5"/>
<circle cx="60" cy="54" r="30" fill="#1e3a8a" stroke="${OL}" stroke-width="3"/>
<path d="M34 46 h52 v16 h-52z" fill="#f5d0b0" stroke="${OL}" stroke-width="2.5"/>
${eyes(54)}
<path d="M30 42 q30 -10 60 0" stroke="#93c5fd" stroke-width="3" fill="none"/>
<g transform="translate(26 88) rotate(-15)"><path d="M0 -13 L3 -3 L13 0 L3 3 L0 13 L-3 3 L-13 0 L-3 -3z" fill="url(#gd-ninja)" stroke="${OL}" stroke-width="2"/><circle r="3" fill="${OL}"/></g>`),

  // テーブル賢者（DB）：緑のとんがり帽子、白いひげ、データベースの杖
  kenja: wrap('kenja', '#5eead4', '#0f766e', `
<path d="M28 112 q2 -32 32 -34 q30 2 32 34z" fill="#115e59" stroke="${OL}" stroke-width="3"/>
<rect x="88" y="34" width="5" height="76" rx="2" fill="#92400e" stroke="${OL}" stroke-width="2"/>
<g transform="translate(90 26)"><ellipse cx="0" cy="-6" rx="11" ry="4" fill="#99f6e4" stroke="${OL}" stroke-width="2"/><path d="M-11 -6 v14 a11 4 0 0 0 22 0 v-14" fill="#5eead4" stroke="${OL}" stroke-width="2"/><path d="M-11 1 a11 4 0 0 0 22 0" fill="none" stroke="${OL}" stroke-width="1.6"/></g>
<circle cx="58" cy="58" r="26" fill="#f5d0b0" stroke="${OL}" stroke-width="3"/>
<path d="M36 62 q5 9 11 7 q5 5 11 3 q6 2 11 -3 q6 2 11 -7 q-1 28 -22 40 q-21 -12 -22 -40z" fill="#f8fafc" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M52 70 q6 3 12 0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
${eyes(56, '#0f172a')}
<path d="M26 44 L58 4 L90 44 q-32 10 -64 0z" fill="#0d9488" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 44 q30 9 60 0" stroke="url(#gd-kenja)" stroke-width="5" fill="none"/>
<path d="M57 18 l2.5 5 5.5 .8 -4 3.8 1 5.4 -5 -2.6 -5 2.6 1 -5.4 -4 -3.8 5.5 -.8z" fill="url(#gd-kenja)" stroke="${OL}" stroke-width="1.2"/>`),

  // UML建築士（設計）：黄色いヘルメット、紫のベスト、設計図の巻物
  kenchiku: wrap('kenchiku', '#d8b4fe', '#6d28d9', `
<path d="M30 112 q2 -30 30 -32 q28 2 30 32z" fill="#7c3aed" stroke="${OL}" stroke-width="3"/>
<path d="M48 82 l12 16 l12 -16" fill="#fde047" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="56" r="27" fill="#f5d0b0" stroke="${OL}" stroke-width="3"/>
${eyes(57)}
<path d="M52 70 q8 4 16 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M30 46 q0 -26 30 -26 q30 0 30 26z" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<rect x="26" y="44" width="68" height="7" rx="3" fill="#eab308" stroke="${OL}" stroke-width="2.5"/>
<path d="M60 20 v24" stroke="${OL}" stroke-width="2.5"/>
<g transform="translate(18 88) rotate(-25)"><rect x="-6" y="-16" width="12" height="32" rx="5" fill="#bfdbfe" stroke="${OL}" stroke-width="2"/><path d="M-3 -10 h6 M-3 -4 h6 M-3 2 h4" stroke="#2563eb" stroke-width="1.6"/><rect x="-7" y="-18" width="14" height="5" rx="2" fill="url(#gd-kenchiku)" stroke="${OL}" stroke-width="1.5"/></g>`),

  // ことばの船長（TOEIC）：いかりの付いた船長帽、紺のコート、金のボタン、辞書の羅針盤
  senchou: wrap('senchou', '#fdba74', '#c2410c', `
<path d="M28 112 q2 -32 32 -34 q30 2 32 34z" fill="#1e293b" stroke="${OL}" stroke-width="3"/>
<circle cx="52" cy="96" r="2.6" fill="url(#gd-senchou)" stroke="${OL}" stroke-width="1"/><circle cx="68" cy="96" r="2.6" fill="url(#gd-senchou)" stroke="${OL}" stroke-width="1"/>
<path d="M44 82 l16 10 l16 -10" fill="none" stroke="#f8fafc" stroke-width="4"/>
<circle cx="60" cy="58" r="26" fill="#f5d0b0" stroke="${OL}" stroke-width="3"/>
${eyes(58)}
<path d="M51 71 q9 5 18 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M28 42 q32 -26 64 0 l-4 8 h-56z" fill="#f8fafc" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M30 50 h60 v6 h-60z" fill="#1e293b" stroke="${OL}" stroke-width="2.5"/>
<g transform="translate(60 36)" stroke="#1e3a8a" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M0 -8 v15"/><path d="M-6 3 q6 8 12 0"/><path d="M-4 -4 h8"/></g>
<g transform="translate(96 92)"><circle r="12" fill="url(#gd-senchou)" stroke="${OL}" stroke-width="2"/><circle r="8" fill="#fff7ed" stroke="${OL}" stroke-width="1.4"/><path d="M0 -7 l2.5 7 -2.5 7 -2.5 -7z" fill="#dc2626" stroke="${OL}" stroke-width="1"/><text y="-9.5" text-anchor="middle" font-size="6" font-weight="900" fill="${OL}">A</text></g>`),
};

// ===== 中間ボスのキャラ（すべてオリジナル） =====
// 5色の列車戦隊「ビルドライナー」：列車の窓の形のバイザーのヘルメット、胸に回のマーク
const ranger = (id, c, c2, mark) => wrap(id, c2, c, `
<path d="M30 112 q2 -30 30 -32 q28 2 30 32z" fill="${c}" stroke="${OL}" stroke-width="3"/>
<path d="M44 84 h32 l-4 28 h-24z" fill="#f8fafc" stroke="${OL}" stroke-width="2.5"/>
<text x="60" y="104" text-anchor="middle" font-size="13" font-weight="900" fill="${c}" font-family="monospace">${mark}</text>
<path d="M30 58 q0 -32 30 -32 q30 0 30 32 v10 q0 10 -10 10 h-40 q-10 0 -10 -10z" fill="${c}" stroke="${OL}" stroke-width="3"/>
<path d="M38 50 h44 q4 0 4 4 v8 q0 4 -4 4 h-44 q-4 0 -4 -4 v-8 q0 -4 4 -4z" fill="#0f172a" stroke="${OL}" stroke-width="2.5"/>
<path d="M42 54 l10 -2 M78 54 l-10 -2" stroke="#93c5fd" stroke-width="3" stroke-linecap="round"/>
<path d="M60 50 v16" stroke="${c}" stroke-width="3"/>
<circle cx="60" cy="30" r="5" fill="#fef08a" stroke="${OL}" stroke-width="2"/>
<path d="M36 72 h48" stroke="url(#gd-${id})" stroke-width="4"/>`);

export const MID_ART = {
  red: ranger('red', '#dc2626', '#fca5a5', '{ }'),
  blue: ranger('blue', '#2563eb', '#93c5fd', 'x='),
  yellow: ranger('yellow', '#ca8a04', '#fde68a', '↻'),
  green: ranger('green', '#16a34a', '#86efac', '[ ]'),
  pink: ranger('pink', '#db2777', '#f9a8d4', '*p'),
  // 合体した姿「グランドビルドライナー」：5色の帯の機関車の顔、金の角
  liner: wrap('liner', '#fde68a', '#b45309', `
<path d="M22 112 q4 -34 38 -36 q34 2 38 36z" fill="#334155" stroke="${OL}" stroke-width="3"/>
<g stroke="${OL}" stroke-width="1.5"><path d="M30 92 h60 v4 h-60z" fill="#dc2626"/><path d="M28 96 h64 v4 h-64z" fill="#2563eb"/><path d="M27 100 h66 v4 h-66z" fill="#ca8a04"/><path d="M26 104 h68 v4 h-68z" fill="#16a34a"/><path d="M25 108 h70 v4 h-70z" fill="#db2777"/></g>
<path d="M26 62 q0 -36 34 -36 q34 0 34 36 v8 q0 12 -12 12 h-44 q-12 0 -12 -12z" fill="#475569" stroke="${OL}" stroke-width="3"/>
<path d="M36 50 h48 q5 0 5 5 v8 q0 5 -5 5 h-48 q-5 0 -5 -5 v-8 q0 -5 5 -5z" fill="#0f172a" stroke="${OL}" stroke-width="2.5"/>
<path d="M40 56 l14 -3 M80 56 l-14 -3" stroke="#fde047" stroke-width="3.5" stroke-linecap="round"/>
<path d="M30 30 l-8 -16 l16 10z M90 30 l8 -16 l-16 10z" fill="url(#gd-liner)" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="26" r="7" fill="#fef08a" stroke="${OL}" stroke-width="2.5"/>
<path d="M34 74 h52" stroke="url(#gd-liner)" stroke-width="5"/>`),
  // 旅の敵（DB）
  ticket: wrap('ticket', '#a5f3fc', '#0e7490', `
<path d="M34 34 h52 v54 l-8 -6 -8 6 -9 -6 -9 6 -9 -6 -9 6z" fill="#ecfeff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="86" cy="54" r="5" fill="#0e7490"/><circle cx="34" cy="54" r="5" fill="#0e7490"/>
${eyes(56)}
<path d="M52 72 q8 -5 16 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<text x="60" y="44" text-anchor="middle" font-size="9" font-weight="900" fill="#0e7490" font-family="monospace">NULL</text>`),
  suitcase: wrap('suitcase', '#fecaca', '#b91c1c', `
<rect x="46" y="22" width="28" height="12" rx="5" fill="none" stroke="${OL}" stroke-width="4"/>
<rect x="28" y="32" width="64" height="62" rx="10" fill="#b45309" stroke="${OL}" stroke-width="3"/>
<path d="M28 50 h64 M28 78 h64" stroke="#78350f" stroke-width="3"/>
${eyes(62)}
<path d="M50 76 q10 -6 20 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<rect x="64" y="84" width="22" height="10" rx="2" fill="#fef3c7" stroke="${OL}" stroke-width="1.5"/><text x="75" y="92" text-anchor="middle" font-size="6.5" font-weight="900" fill="${OL}">SORT</text>`),
  stationmaster: wrap('stationmaster', '#c7d2fe', '#3730a3', `
<path d="M30 112 q2 -30 30 -32 q28 2 30 32z" fill="#312e81" stroke="${OL}" stroke-width="3"/>
<circle cx="52" cy="96" r="2.4" fill="url(#gd-stationmaster)"/><circle cx="68" cy="96" r="2.4" fill="url(#gd-stationmaster)"/>
<circle cx="60" cy="58" r="25" fill="#f5d0b0" stroke="${OL}" stroke-width="3"/>
${eyes(60)}
<path d="M48 70 q12 6 24 0 q-4 6 -12 6 q-8 0 -12 -6z" fill="#475569" stroke="${OL}" stroke-width="2"/>
<path d="M32 42 h56 l-4 -14 h-48z" fill="#312e81" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<rect x="30" y="40" width="60" height="7" rx="3" fill="#1e1b4b" stroke="${OL}" stroke-width="2.5"/>
<rect x="50" y="29" width="20" height="9" rx="2" fill="url(#gd-stationmaster)" stroke="${OL}" stroke-width="1.5"/>`),
  // 隣の部屋のヤンキー（夜中にうるさい）：リーゼント、サングラス、ラジカセ
  yankee: wrap('yankee', '#fda4af', '#9f1239', `
<path d="M28 112 q2 -32 32 -34 q30 2 32 34z" fill="#111827" stroke="${OL}" stroke-width="3"/>
<path d="M48 80 l12 14 l12 -14" fill="#f8fafc" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="58" r="25" fill="#f5d0b0" stroke="${OL}" stroke-width="3"/>
<path d="M34 40 q-2 -26 30 -26 q30 2 24 18 q-8 -6 -22 -4 q-20 2 -32 12z" fill="#111827" stroke="${OL}" stroke-width="3"/>
<path d="M36 52 h48 l-3 10 h-16 l-2 -5 h-6 l-2 5 h-16z" fill="#111827" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M42 55 l8 0 M70 55 l8 0" stroke="#f43f5e" stroke-width="2"/>
<path d="M52 72 q8 -4 16 2" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<g transform="translate(14 84)"><rect width="30" height="20" rx="4" fill="#374151" stroke="${OL}" stroke-width="2"/><circle cx="8" cy="10" r="5" fill="#9ca3af" stroke="${OL}" stroke-width="1.5"/><circle cx="22" cy="10" r="5" fill="#9ca3af" stroke="${OL}" stroke-width="1.5"/></g>
<path d="M10 76 q-4 -6 2 -10 M18 72 q-4 -8 4 -12" stroke="#fde047" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  // 設計竜スペック：設計図の翼をもつ竜（Claude のとっておき）
  spec: wrap('spec', '#ddd6fe', '#5b21b6', `
<path d="M14 40 l30 18 l-6 30 z" fill="#bfdbfe" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 46 l18 11 M26 60 l12 6 M30 72 l8 4" stroke="#2563eb" stroke-width="1.6"/>
<path d="M106 40 l-30 18 l6 30 z" fill="#bfdbfe" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M100 46 l-18 11 M94 60 l-12 6 M90 72 l-8 4" stroke="#2563eb" stroke-width="1.6"/>
<path d="M34 112 q4 -34 26 -34 q22 0 26 34z" fill="#7c3aed" stroke="${OL}" stroke-width="3"/>
<path d="M50 90 h20 v16 h-20z" fill="#ede9fe" stroke="${OL}" stroke-width="2"/><path d="M53 95 h14 M53 99 h10 M53 103 h12" stroke="#7c3aed" stroke-width="1.5"/>
<path d="M36 62 q0 -30 24 -30 q24 0 24 30 q0 16 -24 18 q-24 -2 -24 -18z" fill="#8b5cf6" stroke="${OL}" stroke-width="3"/>
<path d="M40 36 l-6 -16 l14 10z M80 36 l6 -16 l-14 10z" fill="url(#gd-spec)" stroke="${OL}" stroke-width="2"/>
${eyes(56, '#facc15')}
<path d="M48 70 q12 6 24 0" stroke="${OL}" stroke-width="2.5" fill="none"/><path d="M52 71 l2 4 l2 -3 M66 71 l-2 4 l-2 -3" fill="#fff" stroke="${OL}" stroke-width="1"/>`),
};

// 中間ボスで仲間になる3体（★3クリアで仲間に）も、同じイラストを使う
Object.assign(CHAR_ART, { liner: MID_ART.liner, yankee: MID_ART.yankee, spec: MID_ART.spec });
