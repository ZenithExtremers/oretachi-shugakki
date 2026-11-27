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

  // ききみみウサギ（TOEIC リスニング）：長い耳に大きなヘッドホン、音符
  kikimimi: wrap('kikimimi', '#bae6fd', '#0369a1', `
<path d="M38 112 q2 -30 22 -32 q20 2 22 32z" fill="#f1f5f9" stroke="${OL}" stroke-width="3"/>
<path d="M46 50 q-10 -40 2 -44 q10 0 6 42z" fill="#f8fafc" stroke="${OL}" stroke-width="3"/><path d="M48 44 q-4 -26 2 -32" stroke="#fda4af" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M74 50 q10 -40 -2 -44 q-10 0 -6 42z" fill="#f8fafc" stroke="${OL}" stroke-width="3"/><path d="M72 44 q4 -26 -2 -32" stroke="#fda4af" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="60" cy="64" r="24" fill="#f8fafc" stroke="${OL}" stroke-width="3"/>
${eyes(64, '#0f172a')}
<path d="M56 74 q4 4 8 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="60" cy="71" r="2.5" fill="#f472b6"/>
<path d="M34 62 q0 -32 26 -32 q26 0 26 32" fill="none" stroke="#0f172a" stroke-width="5"/>
<rect x="26" y="56" width="14" height="22" rx="6" fill="#0ea5e9" stroke="${OL}" stroke-width="2.5"/><rect x="80" y="56" width="14" height="22" rx="6" fill="#0ea5e9" stroke="${OL}" stroke-width="2.5"/>
<g fill="url(#gd-kikimimi)" stroke="${OL}" stroke-width="1.5"><path d="M96 30 v14 a4 4 0 1 1 -3 -4 v-14 l10 -3 v4z"/><path d="M16 88 v10 a4 4 0 1 1 -3 -4 v-10 l8 -2 v3z"/></g>`),

  // ドライブ教官（免許）：緑の帽子と制服、チェックボード、ハンドルのバッジ
  kyokan: wrap('kyokan', '#bbf7d0', '#15803d', `
<path d="M28 112 q2 -32 32 -34 q30 2 32 34z" fill="#166534" stroke="${OL}" stroke-width="3"/>
<path d="M50 80 l10 14 l10 -14" fill="#f8fafc" stroke="${OL}" stroke-width="2"/><path d="M56 88 h8 l-2 18 h-4z" fill="#dc2626" stroke="${OL}" stroke-width="1.5"/>
<circle cx="60" cy="58" r="25" fill="#f5d0b0" stroke="${OL}" stroke-width="3"/>
${eyes(58)}
<path d="M51 71 q9 5 18 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M32 44 q28 -22 56 0 v4 h-56z" fill="#15803d" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M30 48 q30 8 64 0 l2 6 q-34 8 -68 0z" fill="#14532d" stroke="${OL}" stroke-width="2.5"/>
<circle cx="60" cy="36" r="5" fill="url(#gd-kyokan)" stroke="${OL}" stroke-width="1.5"/>
<g transform="translate(92 92) rotate(12)"><rect x="-12" y="-15" width="24" height="30" rx="3" fill="#fef3c7" stroke="${OL}" stroke-width="2"/><rect x="-6" y="-18" width="12" height="6" rx="2" fill="url(#gd-kyokan)" stroke="${OL}" stroke-width="1.5"/><path d="M-7 -5 l3 3 l5 -6 M-7 5 l3 3 l5 -6" stroke="#16a34a" stroke-width="2" fill="none"/></g>
<g transform="translate(26 94)"><circle r="10" fill="none" stroke="url(#gd-kyokan)" stroke-width="4"/><path d="M-10 0 h20 M0 0 v10" stroke="url(#gd-kyokan)" stroke-width="3"/></g>`),
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

// ===== ★★★★（レジェンド）の仲間：勉強に出てくる用語がモチーフ。虹色のふちと二重の光の輪 =====
const wrap4 = (id, c1, c2, body) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="rp-art r4">
<defs>
  <radialGradient id="au-${id}" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="${c1}"/><stop offset=".7" stop-color="${c2}"/><stop offset="1" stop-color="#0b1020"/></radialGradient>
  <clipPath id="cl-${id}"><circle cx="60" cy="60" r="55"/></clipPath>
  <linearGradient id="rb-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f472b6"/><stop offset=".25" stop-color="#facc15"/><stop offset=".5" stop-color="#4ade80"/><stop offset=".75" stop-color="#38bdf8"/><stop offset="1" stop-color="#a78bfa"/></linearGradient>
  <linearGradient id="gd-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#b7791f"/></linearGradient>
</defs>
<circle cx="60" cy="60" r="57" fill="url(#au-${id})"/>
<g stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"><path d="M60 6v8M60 106v8M6 60h8M106 60h8M22 22l6 6M92 92l6 6M98 22l-6 6M28 92l-6 6"/></g>
<g clip-path="url(#cl-${id})">${body}</g>
<circle cx="60" cy="60" r="57" fill="none" stroke="url(#rb-${id})" stroke-width="5"/>
<circle cx="60" cy="60" r="52" fill="none" stroke="url(#gd-${id})" stroke-width="1.5" opacity=".9"/>
<path d="M60 0 l3 6 l-3 3 l-3 -3z" fill="#fff"/>
</svg>`;

Object.assign(CHAR_ART, {
  // タキオン：光より速い粒子。水色の流線形の髪、光の尾、速度の線
  tachyon: wrap4('tachyon', '#e0f2fe', '#0284c7', `
<g stroke="#e0f2fe" stroke-width="3" stroke-linecap="round" opacity=".85"><path d="M2 40 h26M0 52 h20M4 76 h24M0 88 h16"/></g>
<path d="M30 112 q4 -30 30 -32 q26 2 30 32z" fill="#f8fafc" stroke="${OL}" stroke-width="3"/>
<path d="M48 82 l12 14 l12 -14" fill="none" stroke="#0284c7" stroke-width="4"/>
<path d="M56 96 l-6 16 M64 96 l6 16" stroke="#38bdf8" stroke-width="3"/>
<circle cx="62" cy="56" r="25" fill="#fde7d4" stroke="${OL}" stroke-width="3"/>
${eyes(57, '#0ea5e9')}
<path d="M54 70 q8 4 16 -1" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M36 50 q2 -26 30 -26 q20 0 26 18 l-10 -4 l4 10 l-12 -8 l-2 10 l-8 -10 l-6 10 l-4 -12 l-8 10z" fill="#38bdf8" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M36 46 l-26 -6 l24 12 l-22 2 l26 6z" fill="#7dd3fc" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<g transform="translate(92 92)"><circle r="10" fill="#0ea5e9" stroke="${OL}" stroke-width="2"/><path d="M-5 -5 l6 5 l-6 5z M1 -5 l6 5 l-6 5z" fill="#fff"/></g>`),

  // ニュクリ：燃える原子核そのもの。陽子と中性子のかたまりのまわりを電子が3つの軌道で回る
  nyukuri: wrap4('nyukuri', '#fed7aa', '#9a3412', `
<g fill="none" stroke="#fde047" stroke-width="2.5" opacity=".9">
<ellipse cx="60" cy="60" rx="50" ry="17" transform="rotate(30 60 60)"/><ellipse cx="60" cy="60" rx="50" ry="17" transform="rotate(-30 60 60)"/><ellipse cx="60" cy="60" rx="50" ry="17" transform="rotate(90 60 60)"/></g>
<g fill="#fff" stroke="#38bdf8" stroke-width="2"><circle cx="103" cy="35" r="5"/><circle cx="17" cy="85" r="5"/><circle cx="60" cy="10" r="5"/></g>
<g stroke="#fb923c" stroke-width="3" stroke-linecap="round" opacity=".9"><path d="M60 22 v-6M60 98 v6M24 60 h-6M96 60 h6M34 34 l-5 -5M86 86 l5 5M86 34 l5 -5M34 86 l-5 5"/></g>
<circle cx="60" cy="60" r="30" fill="#f97316" stroke="${OL}" stroke-width="3"/>
<g stroke="${OL}" stroke-width="1.6" fill="#fdba74"><circle cx="44" cy="42" r="6"/><circle cx="55" cy="36" r="6" fill="#ef4444"/><circle cx="67" cy="36" r="6"/><circle cx="77" cy="43" r="6" fill="#ef4444"/><circle cx="61" cy="45" r="5" fill="#ef4444"/></g>
<g stroke="${OL}" stroke-width="1.6"><circle cx="50" cy="58" r="7" fill="#ef4444"/><circle cx="63" cy="56" r="7" fill="#fdba74"/><circle cx="74" cy="64" r="6" fill="#ef4444"/><circle cx="46" cy="72" r="6" fill="#fdba74"/><circle cx="58" cy="70" r="7" fill="#ef4444"/><circle cx="70" cy="77" r="6" fill="#fdba74"/></g>
<circle cx="60" cy="60" r="30" fill="none" stroke="#fde047" stroke-width="2" opacity=".8"/>
`),

  // ホメオスタシス：恒常性。核と細い毛をもつ丸い細胞と、いつも同じ状態に保つ天秤
  homeo: wrap4('homeo', '#d1fae5', '#047857', `
<circle cx="60" cy="60" r="46" fill="none" stroke="#a7f3d0" stroke-width="2" stroke-dasharray="3 6"/>
<g stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round">${Array.from({ length: 20 }, (_, i) => { const a = (i / 20) * Math.PI * 2, x1 = 60 + Math.cos(a) * 34, y1 = 58 + Math.sin(a) * 32, x2 = 60 + Math.cos(a) * 41, y2 = 58 + Math.sin(a) * 39; return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; }).join('')}</g>
<ellipse cx="60" cy="58" rx="34" ry="32" fill="#a7f3d0" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="58" rx="34" ry="32" fill="#34d399" opacity=".35"/>
<circle cx="74" cy="44" r="9" fill="#059669" stroke="${OL}" stroke-width="2"/><circle cx="76" cy="42" r="3" fill="#a7f3d0"/>
<circle cx="40" cy="70" r="3" fill="#10b981"/><circle cx="82" cy="70" r="2.5" fill="#10b981"/><circle cx="46" cy="40" r="2" fill="#10b981"/>
<g fill="none" stroke="#059669" stroke-width="2" opacity=".7"><path d="M38 60 q8 -6 16 0 t16 0 t14 0"/><path d="M40 72 q6 -4 12 0"/></g>
<ellipse cx="54" cy="48" rx="4" ry="2.5" fill="#6ee7b7" stroke="#047857" stroke-width="1"/><ellipse cx="68" cy="74" rx="5" ry="3" fill="#6ee7b7" stroke="#047857" stroke-width="1"/>
<g transform="translate(60 102)" stroke="${OL}" stroke-width="2"><path d="M0 -12 v12 M-22 -10 h44" fill="none"/><path d="M-28 -10 l6 10 l6 -10z M16 -10 l6 10 l6 -10z" fill="url(#gd-homeo)"/><circle cy="-13" r="3" fill="url(#gd-homeo)"/></g>`),

  // イナーシャ：慣性の法則。鋼の球が、一度転がり出したら止まらない（回転の軸と矢印）
  inertia: wrap4('inertia', '#e2e8f0', '#1e293b', `
<g stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round" opacity=".85"><path d="M2 46 h22M0 60 h18M4 74 h22M10 88 h14"/></g>
<path d="M10 104 h100" stroke="#64748b" stroke-width="3"/>
<circle cx="64" cy="60" r="38" fill="#94a3b8" stroke="${OL}" stroke-width="3"/>
<path d="M34 46 a38 38 0 0 1 54 -16" stroke="#f1f5f9" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
<path d="M28 64 q36 10 72 0" stroke="#475569" stroke-width="2.5" fill="none"/>
<path d="M44 30 q20 30 0 66 M84 30 q-20 30 0 66" stroke="#475569" stroke-width="2" fill="none" opacity=".6"/>
<g fill="#64748b" stroke="${OL}" stroke-width="1.2"><circle cx="40" cy="40" r="2.5"/><circle cx="90" cy="44" r="2.5"/><circle cx="92" cy="78" r="2.5"/><circle cx="42" cy="84" r="2.5"/></g>
<circle cx="64" cy="60" r="11" fill="#cbd5e1" stroke="${OL}" stroke-width="2.5"/><circle cx="64" cy="60" r="4" fill="#475569"/>
<path d="M64 49 v-8 M64 71 v8 M53 60 h-8 M75 60 h8" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M90 30 a40 40 0 0 1 10 26" stroke="#fbbf24" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M96 54 l4 4 l3 -5" stroke="#fbbf24" stroke-width="3" fill="none" stroke-linecap="round"/>
<g transform="translate(100 96)"><path d="M-12 0 h12 v-6 l10 6 l-10 6 v-6" fill="#fbbf24" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/></g>
<text x="64" y="92" text-anchor="middle" font-size="9" font-weight="900" fill="#1e293b" font-family="serif">F=ma</text>`),
});

// ===== ガチャ限定の★★★★（v4.11.0）：シナプス（秋学期）・エティモロジー（TOEIC）・ドア・イン・ザ・フェイス（免許） =====
Object.assign(CHAR_ART, {
  // シナプス：2つの神経細胞がつながる場所。左の軸索の先から光の粒（神経伝達物質）が飛び、右の受け手が光る
  synapse: wrap4('synapse', '#fbcfe8', '#7e22ce', `
<g fill="none" stroke-linecap="round">
<path d="M-4 22 Q14 30 22 44 M-6 54 Q10 52 22 56 M2 96 Q12 80 24 70" stroke="#e879f9" stroke-width="4" opacity=".55"/>
<path d="M8 28 l-6 -8 M12 34 l-10 2 M6 88 l-8 4 M10 84 l-4 10" stroke="#e879f9" stroke-width="2.5" opacity=".55"/>
<path d="M124 20 Q104 30 98 46 M126 64 Q112 60 100 62 M118 108 Q106 92 98 78" stroke="#f0abfc" stroke-width="4" opacity=".55"/>
<path d="M114 26 l6 -10 M110 34 l12 0 M114 98 l10 4" stroke="#f0abfc" stroke-width="2.5" opacity=".55"/></g>
<circle cx="26" cy="58" r="17" fill="#a855f7" stroke="${OL}" stroke-width="3"/><circle cx="26" cy="58" r="7" fill="#581c87" stroke="${OL}" stroke-width="1.5"/><circle cx="23" cy="55" r="2" fill="#e9d5ff"/>
<path d="M42 58 Q48 54 52 58" stroke="${OL}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M42 58 Q48 54 52 58" stroke="#c084fc" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M52 44 q14 -2 14 14 q0 16 -14 14 q-6 -14 0 -28z" fill="#d8b4fe" stroke="${OL}" stroke-width="3"/>
<g fill="#fde047" stroke="#a16207" stroke-width=".8"><circle cx="56" cy="52" r="3"/><circle cx="58" cy="62" r="3"/><circle cx="55" cy="68" r="2.4"/></g>
<path d="M98 34 q-18 2 -24 24 q6 22 24 24 q8 -24 0 -48z" fill="#f0abfc" stroke="${OL}" stroke-width="3"/>
<g stroke="${OL}" stroke-width="1.5" fill="#86efac"><path d="M76 46 h5 v4 h-5z M74 56 h5 v4 h-5z M74 66 h5 v4 h-5z M77 76 h5 v4 h-5z"/></g>
<g fill="#fef08a">${[[68, 48], [70, 58], [66, 64], [71, 70], [64, 54], [69, 78]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>
<g fill="#fff" opacity=".9">${[[66, 44], [64, 74], [72, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2"/>`).join('')}</g>
<path d="M30 24 l-6 10 h8 l-6 10" stroke="#fde047" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M98 92 l-5 8 h7 l-5 8" stroke="#fde047" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="100" cy="58" r="22" fill="#fde047" opacity=".18"/>
<g fill="#fff" opacity=".8"><circle cx="40" cy="96" r="1.8"/><circle cx="88" cy="20" r="1.6"/><circle cx="16" cy="88" r="1.4"/></g>`),

  // エティモロジー：語源の大樹。葉のあいだに語の実がなり、光る根っこが語根（port・spect・dict）になっている
  etymo: wrap4('etymo', '#ecfccb', '#166534', `
<circle cx="60" cy="40" r="34" fill="#fef9c3" opacity=".25"/>
<path d="M6 92 Q60 80 114 92 V120 H6z" fill="#3f2a14"/>
<g stroke="${OL}" stroke-width="2.5"><circle cx="34" cy="46" r="17" fill="#15803d"/><circle cx="86" cy="46" r="17" fill="#15803d"/><circle cx="46" cy="30" r="18" fill="#16a34a"/><circle cx="74" cy="30" r="18" fill="#16a34a"/><circle cx="60" cy="44" r="20" fill="#22c55e"/></g>
<g fill="none" stroke="#86efac" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M40 22 q6 -4 12 -2 M68 20 q6 -3 12 1 M52 40 q6 -4 14 -1"/></g>
<g font-family="serif" font-weight="900" font-size="7.5" text-anchor="middle" stroke="${OL}" stroke-width=".4">${[[36, 44, 'trans'], [84, 44, 'im'], [60, 52, 'ex'], [48, 26, 'pro'], [74, 28, 'in']].map(([x, y, t]) => `<circle cx="${x}" cy="${y - 2.5}" r="7" fill="url(#gd-etymo)"/><text x="${x}" y="${y}" fill="#422006">${t}</text>`).join('')}</g>
<path d="M53 62 Q56 76 50 92 H70 Q64 76 67 62z" fill="#92400e" stroke="${OL}" stroke-width="2.5"/>
<path d="M58 68 q2 8 -1 16 M63 70 q1 6 0 12" stroke="#78350f" stroke-width="1.5" fill="none"/>
<g fill="none" stroke-linecap="round"><path d="M52 92 Q40 96 30 104 M60 92 V104 M68 92 Q80 96 90 104" stroke="${OL}" stroke-width="7"/><path d="M52 92 Q40 96 30 104 M60 92 V104 M68 92 Q80 96 90 104" stroke="#a3e635" stroke-width="4"/></g>
<g font-family="serif" font-weight="900" font-size="10" text-anchor="middle" fill="#fef08a" stroke="${OL}" stroke-width="3" paint-order="stroke"><text x="37" y="102">port</text><text x="60" y="113">spect</text><text x="83" y="102">dict</text></g>
<g fill="#fef08a"><circle cx="14" cy="30" r="1.8"/><circle cx="106" cy="24" r="1.8"/><circle cx="100" cy="72" r="1.4"/><circle cx="18" cy="74" r="1.4"/></g>`),

  // ドア・イン・ザ・フェイス：大きな顔のまん中に扉。いったんバタンと閉めて（NO!）、すき間を少しだけ開けて光がもれる
  ditf: wrap4('ditf', '#fef3c7', '#b45309', `
<g stroke="#fde047" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M60 2 v10 M14 18 l7 7 M106 18 l-7 7 M2 62 h10 M108 62 h10"/></g>
<circle cx="60" cy="64" r="44" fill="#fde7d4" stroke="${OL}" stroke-width="3"/>
<path d="M20 50 q2 -36 40 -36 q38 0 40 36 q-10 -14 -22 -16 l-4 8 l-6 -9 l-8 9 l-6 -9 l-6 9 l-6 -8 q-14 4 -22 16z" fill="#7c2d12" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 44 l14 4 M90 44 l-14 4" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
<g><ellipse cx="38" cy="54" rx="5" ry="6" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="39" cy="55" r="3" fill="${OL}"/><ellipse cx="82" cy="54" rx="5" ry="6" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="81" cy="55" r="3" fill="${OL}"/></g>
<ellipse cx="28" cy="70" rx="6" ry="3.5" fill="#fca5a5" opacity=".7"/><ellipse cx="92" cy="70" rx="6" ry="3.5" fill="#fca5a5" opacity=".7"/>
<rect x="43" y="58" width="34" height="50" rx="2" fill="#451a03" stroke="${OL}" stroke-width="2.5"/>
<path d="M47 62 h26 v46 h-26z" fill="#fef08a"/>
<path d="M47 62 L66 66 L66 104 L47 108z" fill="#b45309" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M51 70 l11 2 v12 l-11 -1z M51 89 l11 0 v11 l-11 2z" fill="#d97706" stroke="${OL}" stroke-width="1.5"/>
<circle cx="62" cy="86" r="2.4" fill="url(#gd-ditf)" stroke="${OL}" stroke-width="1"/>
<path d="M68 64 L100 76 L100 112 L68 106z" fill="#fef08a" opacity=".45"/>
<g transform="translate(92 26) rotate(10)"><path d="M-16 -9 h32 v16 h-20 l-6 6 v-6 h-6z" fill="#fff" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><text x="0" y="3" text-anchor="middle" font-size="10" font-weight="900" fill="#e11d48">NO!</text></g>
<g stroke="#f43f5e" stroke-width="3" stroke-linecap="round"><path d="M4 92 l9 -4 M2 104 h10"/></g>`),
});

// ===== ラスボス（TOEIC リスニング・リーディング・免許）と、改心した白バイ隊長。すべてオリジナル =====
const LK = '#0f172a';
const lframe = (id, c1, c2, body) => `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" class="rp-art lb">
<defs><radialGradient id="a${id}" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="${c1}"/><stop offset=".7" stop-color="${c2}"/><stop offset="1" stop-color="#05020f"/></radialGradient>
<linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#b7791f"/></linearGradient>
<clipPath id="c${id}"><circle cx="80" cy="80" r="74"/></clipPath></defs>
<circle cx="80" cy="80" r="76" fill="url(#a${id})"/>
<g clip-path="url(#c${id})">${body}</g>
<circle cx="80" cy="80" r="76" fill="none" stroke="url(#g${id})" stroke-width="5"/>
<circle cx="80" cy="80" r="70" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 5"/></svg>`;
const lcrown = (x, y, s = 1, id = 'x') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 10 L-26 -14 L-12 0 L0 -18 L12 0 L26 -14 L22 10 Z" fill="url(#g${id})" stroke="${LK}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="0" cy="-2" r="3.5" fill="#dc2626" stroke="${LK}" stroke-width="1"/></g>`;

// ① 雑音王ノイズキング：大きなスピーカーの体、2つのウーファーが目、王冠、音の波
const noise = lframe('n', '#a5f3fc', '#155e75', `
<g stroke="#22d3ee" stroke-width="3" fill="none" opacity=".8"><path d="M22 60 q-10 20 0 40 M12 52 q-16 28 0 56 M138 60 q10 20 0 40 M148 52 q16 28 0 56"/></g>
<rect x="38" y="38" width="84" height="108" rx="10" fill="#1e1b4b" stroke="${LK}" stroke-width="3"/>
<rect x="44" y="44" width="72" height="96" rx="6" fill="#312e81"/>
<circle cx="62" cy="72" r="15" fill="#0f172a" stroke="#64748b" stroke-width="3"/><circle cx="62" cy="72" r="6" fill="#f43f5e"/>
<circle cx="98" cy="72" r="15" fill="#0f172a" stroke="#64748b" stroke-width="3"/><circle cx="98" cy="72" r="6" fill="#f43f5e"/>
<path d="M50 60 l20 6 M110 60 l-20 6" stroke="#f43f5e" stroke-width="3.5" stroke-linecap="round"/>
<circle cx="80" cy="118" r="20" fill="#0f172a" stroke="#64748b" stroke-width="3"/><circle cx="80" cy="118" r="11" fill="#1e293b" stroke="#475569" stroke-width="2"/><circle cx="80" cy="118" r="4" fill="#22d3ee"/>
<g fill="#22d3ee">${[0,1,2,3,4,5,6].map(i => `<rect x="${52 + i * 8}" y="${96 - [4,8,12,6,10,5,9][i]}" width="5" height="${[4,8,12,6,10,5,9][i]}" rx="1"/>`).join('')}</g>
${lcrown(80, 30, 1.1, 'n')}`);

// ② 千ページの魔導書：開いた分厚い本、ページの文字、まわりを回る文字、留め金の目
const tome = lframe('t', '#e9d5ff', '#4c1d95', `
<g font-family="serif" font-weight="900" fill="#c4b5fd" font-size="13" opacity=".85"><text x="20" y="40">A</text><text x="132" y="44">B</text><text x="18" y="122">C</text><text x="134" y="120">D</text><text x="74" y="24">Ω</text></g>
<path d="M80 54 Q52 42 26 50 L26 120 Q52 112 80 124 Z" fill="#fef9c3" stroke="${LK}" stroke-width="2.5"/>
<path d="M80 54 Q108 42 134 50 L134 120 Q108 112 80 124 Z" fill="#fef3c7" stroke="${LK}" stroke-width="2.5"/>
<g stroke="#a8a29e" stroke-width="2.2">${[0,1,2,3,4].map(i => `<path d="M36 ${62 + i * 11} q20 -4 36 2 M88 ${64 + i * 11} q20 -6 38 -2"/>`).join('')}</g>
<path d="M26 120 Q52 112 80 124 Q108 112 134 120 L136 130 Q108 122 80 134 Q52 122 24 130 Z" fill="#7c2d12" stroke="${LK}" stroke-width="2.5"/>
<circle cx="80" cy="90" r="13" fill="url(#gt)" stroke="${LK}" stroke-width="2.5"/><ellipse cx="80" cy="90" rx="8" ry="5" fill="#fff"/><circle cx="80" cy="90" r="3.5" fill="#7e22ce"/>
<path d="M30 46 l-8 -10 M130 46 l8 -10 M24 70 l-12 -2 M136 70 l12 -2" stroke="#e9d5ff" stroke-width="3" stroke-linecap="round"/>
${lcrown(80, 36, 0.9, 't')}`);

// ③ 暴走王ノーライセンス：炎を出すバイク、黒いバイザーのヘルメットに王冠
const biker = lframe('b', '#fecaca', '#7f1d1d', `
<path d="M10 140 q20 -30 10 -50 q16 14 14 30 q8 -26 26 -34 q-8 22 6 38 q4 -18 16 -24 q-2 22 10 40 z" fill="#f97316" opacity=".85"/>
<circle cx="44" cy="124" r="20" fill="#111827" stroke="#9ca3af" stroke-width="4"/><circle cx="44" cy="124" r="6" fill="#9ca3af"/>
<circle cx="120" cy="124" r="20" fill="#111827" stroke="#9ca3af" stroke-width="4"/><circle cx="120" cy="124" r="6" fill="#9ca3af"/>
<path d="M44 124 L70 96 L104 96 L120 124 M70 96 L84 112 L104 96" stroke="#dc2626" stroke-width="7" fill="none" stroke-linejoin="round"/>
<path d="M66 94 q20 -12 44 0 l-4 8 h-36z" fill="#b91c1c" stroke="${LK}" stroke-width="2"/>
<path d="M108 90 l14 -6 l2 6" stroke="#9ca3af" stroke-width="4" fill="none"/><circle cx="128" cy="88" r="5" fill="#fef08a" stroke="${LK}"/>
<path d="M76 92 L82 70 L96 66" stroke="#111827" stroke-width="10" stroke-linecap="round" fill="none"/>
<circle cx="86" cy="54" r="16" fill="#111827" stroke="${LK}" stroke-width="2"/><path d="M76 52 q12 -8 22 2 v6 h-22z" fill="#334155"/><path d="M78 54 h18" stroke="#f43f5e" stroke-width="2.5"/>
${lcrown(86, 34, 0.75, 'b')}`);

// ③' 改心した白バイ隊長（仲間になった姿）
const police = lframe('p', '#e0f2fe', '#1d4ed8', `
<circle cx="44" cy="124" r="20" fill="#111827" stroke="#cbd5e1" stroke-width="4"/><circle cx="44" cy="124" r="6" fill="#cbd5e1"/>
<circle cx="120" cy="124" r="20" fill="#111827" stroke="#cbd5e1" stroke-width="4"/><circle cx="120" cy="124" r="6" fill="#cbd5e1"/>
<path d="M44 124 L70 96 L104 96 L120 124 M70 96 L84 112 L104 96" stroke="#f8fafc" stroke-width="7" fill="none" stroke-linejoin="round"/>
<path d="M66 94 q20 -12 44 0 l-4 8 h-36z" fill="#f8fafc" stroke="${LK}" stroke-width="2"/>
<rect x="104" y="80" width="10" height="6" rx="2" fill="#ef4444"/><rect x="114" y="80" width="10" height="6" rx="2" fill="#3b82f6"/>
<path d="M76 92 L82 70 L96 66" stroke="#1e3a8a" stroke-width="10" stroke-linecap="round" fill="none"/>
<circle cx="86" cy="54" r="16" fill="#f8fafc" stroke="${LK}" stroke-width="2"/><path d="M76 52 q12 -8 22 2 v6 h-22z" fill="#93c5fd"/>
<path d="M80 40 l6 -6 l6 6 l-6 4z" fill="url(#gp)" stroke="${LK}" stroke-width="1.2"/>
<path d="M30 40 l8 8 M130 40 l-8 8" stroke="#fef08a" stroke-width="3" stroke-linecap="round"/>`);


export const LAST_ART = { noise, tome, biker, police };
Object.assign(CHAR_ART, { noiseking: noise, tome, police });

// ===== ガチャの仲間（★〜★★★）のオリジナルイラスト（v4.13〜）。ゆるい子はゆるく、かっこいい子はかっこよく =====
// ★：パステルの丸に黒い線のふち／★★：銀のふちとやわらかい光／★★★：金のふちと光の線（wrap）
const wrap1 = (id, c1, c2, body) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="rp-art r1">
<defs><radialGradient id="au-${id}" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient><clipPath id="cl-${id}"><circle cx="60" cy="60" r="55"/></clipPath></defs>
<circle cx="60" cy="60" r="57" fill="url(#au-${id})"/>
<g clip-path="url(#cl-${id})">${body}</g>
<circle cx="60" cy="60" r="56" fill="none" stroke="${OL}" stroke-width="2.5"/>
</svg>`;
const wrap2 = (id, c1, c2, body) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="rp-art r2">
<defs><radialGradient id="au-${id}" cx="50%" cy="42%" r="58%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient><clipPath id="cl-${id}"><circle cx="60" cy="60" r="54"/></clipPath>
<linearGradient id="sv-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset=".5" stop-color="#94a3b8"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient></defs>
<circle cx="60" cy="60" r="57" fill="url(#au-${id})"/>
<g fill="#fff" opacity=".7"><circle cx="20" cy="40" r="1.6"/><circle cx="100" cy="30" r="1.4"/><circle cx="96" cy="84" r="1.8"/></g>
<g clip-path="url(#cl-${id})">${body}</g>
<circle cx="60" cy="60" r="56" fill="none" stroke="url(#sv-${id})" stroke-width="4"/><circle cx="60" cy="60" r="58.5" fill="none" stroke="${OL}" stroke-width="1"/>
</svg>`;
// ゆるい目（まるい黒目に白い光）
const cute = (y = 58, dx = 11, r = 4.5) => `<circle cx="${60 - dx}" cy="${y}" r="${r}" fill="${OL}"/><circle cx="${60 + dx}" cy="${y}" r="${r}" fill="${OL}"/><circle cx="${61.5 - dx}" cy="${y - 1.6}" r="${r * 0.38}" fill="#fff"/><circle cx="${61.5 + dx}" cy="${y - 1.6}" r="${r * 0.38}" fill="#fff"/>`;
const blush = (y = 66, dx = 20) => `<ellipse cx="${60 - dx}" cy="${y}" rx="5.5" ry="3" fill="#fb7185" opacity=".45"/><ellipse cx="${60 + dx}" cy="${y}" rx="5.5" ry="3" fill="#fb7185" opacity=".45"/>`;

Object.assign(CHAR_ART, {
  // ピヨ（★・ゆるい）：たまごのからから出たばかりのひよこ。頭にちょこんと毛
  piyo: wrap1('piyo', '#fff7d6', '#fde68a', `
<path d="M24 120 q0 -18 8 -24 l8 8 l8 -8 l8 8 l8 -8 l8 8 l8 -8 l8 8 l8 -8 q8 6 8 24z" fill="#fffbeb" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="66" rx="30" ry="28" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<path d="M34 72 q-8 -2 -10 6 q8 4 12 -1z M86 72 q8 -2 10 6 q-8 4 -12 -1z" fill="#eab308" stroke="${OL}" stroke-width="2"/>
<path d="M58 38 q-4 -10 2 -12 q-1 6 4 8 q2 -6 6 -4 q-6 2 -6 9z" fill="#facc15" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
${cute(60, 11, 4.5)}${blush(70, 19)}
<path d="M54 68 l6 6 l6 -6 q-6 -3 -12 0z" fill="#fb923c" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>`),

  // デバッグてんとう（★・ゆるい）：赤いこうらのてんとう虫が、虫めがねでバグをさがす
  debugten: wrap1('debugten', '#dcfce7', '#86efac', `
<path d="M48 30 q-6 -12 -14 -12 M72 30 q6 -12 14 -12" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="34" cy="18" r="3.5" fill="${OL}"/><circle cx="86" cy="18" r="3.5" fill="${OL}"/>
<path d="M22 88 q0 -44 38 -44 q38 0 38 44 q-38 14 -76 0z" fill="#ef4444" stroke="${OL}" stroke-width="3"/>
<path d="M60 46 v48" stroke="${OL}" stroke-width="2.5"/>
<g fill="${OL}"><circle cx="40" cy="64" r="6"/><circle cx="80" cy="64" r="6"/><circle cx="34" cy="82" r="4.5"/><circle cx="86" cy="82" r="4.5"/><circle cx="50" cy="84" r="4"/><circle cx="70" cy="84" r="4"/></g>
<path d="M28 62 q6 -14 18 -16" stroke="#fecaca" stroke-width="4" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="42" rx="18" ry="14" fill="#1f2937" stroke="${OL}" stroke-width="2.5"/>
<circle cx="53" cy="41" r="5" fill="#fff"/><circle cx="67" cy="41" r="5" fill="#fff"/><circle cx="54" cy="42" r="2.6" fill="${OL}"/><circle cx="68" cy="42" r="2.6" fill="${OL}"/><circle cx="55" cy="41" r="1" fill="#fff"/><circle cx="69" cy="41" r="1" fill="#fff"/>
<path d="M56 49 q4 3 8 0" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<g transform="translate(88 86) rotate(-30) scale(.85)"><path d="M0 9 v14" stroke="#92400e" stroke-width="5" stroke-linecap="round"/><circle r="11" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="3"/><path d="M-5 -2 l4 -4 M-1 2 l3 -3" stroke="#fff" stroke-width="2" stroke-linecap="round"/><text y="4" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="900">!</text></g>`),

  // ジョイン・アザラシ（★★・ゆるい）：2ひきのアザラシがヒレで手をつなぐ。首輪に「ON」の札
  azarashi: wrap2('azarashi', '#bae6fd', '#0284c7', `
<path d="M0 98 q30 -8 60 0 t60 0 v22 h-120z" fill="#e0f2fe" stroke="${OL}" stroke-width="2"/>
<g transform="translate(-2 4)"><ellipse cx="40" cy="74" rx="24" ry="22" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/><ellipse cx="40" cy="80" rx="15" ry="12" fill="#f1f5f9"/>
${'<circle cx="32" cy="66" r="3.4" fill="#1f2937"/><circle cx="48" cy="66" r="3.4" fill="#1f2937"/><circle cx="33" cy="65" r="1.2" fill="#fff"/><circle cx="49" cy="65" r="1.2" fill="#fff"/>'}
<ellipse cx="40" cy="74" rx="5" ry="3.5" fill="#475569"/><path d="M30 76 h-10 M30 79 h-9 M50 76 h10 M50 79 h9" stroke="#475569" stroke-width="1.2"/>
<path d="M22 86 q-8 6 -4 12 q6 -2 10 -8z" fill="#94a3b8" stroke="${OL}" stroke-width="2"/></g>
<g transform="translate(2 8)"><ellipse cx="82" cy="74" rx="20" ry="18" fill="#e2e8f0" stroke="${OL}" stroke-width="3"/><ellipse cx="82" cy="80" rx="12" ry="9" fill="#f8fafc"/>
<circle cx="75" cy="68" r="3" fill="#1f2937"/><circle cx="89" cy="68" r="3" fill="#1f2937"/><circle cx="76" cy="67" r="1.1" fill="#fff"/><circle cx="90" cy="67" r="1.1" fill="#fff"/>
<ellipse cx="82" cy="75" rx="4.2" ry="3" fill="#475569"/><path d="M98 84 q8 6 4 12 q-6 -2 -10 -8z" fill="#94a3b8" stroke="${OL}" stroke-width="2"/></g>
<path d="M54 92 q8 -8 16 -2" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M54 92 q8 -8 16 -2" stroke="#94a3b8" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M22 54 q16 8 32 0" stroke="#0ea5e9" stroke-width="4" fill="none"/>
<g transform="translate(38 62)"><rect x="-10" y="-4" width="20" height="12" rx="3" fill="#fde047" stroke="${OL}" stroke-width="2"/><text y="5.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="${OL}">ON</text></g>
<path d="M60 30 c-4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4z" fill="#f472b6" stroke="${OL}" stroke-width="2"/>`),

  // 再帰ヘビ（★★・かっこいい寄り）：自分の中にもう一度とぐろを巻く、うずまきのヘビ
  hebi: wrap2('hebi', '#bbf7d0', '#15803d', `
<path d="M60 104 c-30 0 -40 -20 -40 -34 c0 -22 20 -32 38 -32 c16 0 28 10 28 24 c0 14 -10 22 -22 22 c-10 0 -16 -6 -16 -14 c0 -6 4 -10 10 -10" fill="none" stroke="${OL}" stroke-width="15" stroke-linecap="round"/>
<path d="M60 104 c-30 0 -40 -20 -40 -34 c0 -22 20 -32 38 -32 c16 0 28 10 28 24 c0 14 -10 22 -22 22 c-10 0 -16 -6 -16 -14 c0 -6 4 -10 10 -10" fill="none" stroke="#22c55e" stroke-width="10" stroke-linecap="round"/>
<path d="M60 104 c-30 0 -40 -20 -40 -34 c0 -22 20 -32 38 -32 c16 0 28 10 28 24 c0 14 -10 22 -22 22" fill="none" stroke="#bbf7d0" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>
<g transform="translate(62 60)"><path d="M-8 6 q-2 -14 10 -16 q14 -2 16 10 q2 10 -12 12 q-10 1 -14 -6z" fill="#22c55e" stroke="${OL}" stroke-width="3"/>
<path d="M-2 -4 l6 2 M14 -4 l-6 3" stroke="${OL}" stroke-width="2.3" stroke-linecap="round"/><path d="M-1 0 q3 -3 6 0 q-3 3 -6 0z M8 0 q3 -3 6 0 q-3 3 -6 0z" fill="#facc15" stroke="${OL}" stroke-width="1"/>
<path d="M18 4 l8 2 l-3 2 l4 3z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/></g>
<g font-family="monospace" font-weight="900" font-size="9" fill="#14532d"><text x="42" y="22">f(f(f(</text></g>`),

  // デザインパターン鷹（★★★・かっこいい）：翼を大きく広げて急降下する鷹。足のつめで設計図のひし形の紋章をつかむ
  taka: wrap('taka', '#fef3c7', '#b45309', `
<g stroke="#fde68a" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M60 2 v18 M40 6 l6 14 M80 6 l-6 14"/></g>
<path d="M56 50 q-20 -18 -50 -14 q8 6 10 10 q-8 0 -12 4 q10 4 14 8 q-8 2 -10 6 q14 2 22 4 q-4 4 -4 8 q14 -2 26 -10z" fill="#78350f" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M64 50 q20 -18 50 -14 q-8 6 -10 10 q8 0 12 4 q-10 4 -14 8 q8 2 10 6 q-14 2 -22 4 q4 4 4 8 q-14 -2 -26 -10z" fill="#78350f" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<g stroke="#b45309" stroke-width="1.8" fill="none" opacity=".9"><path d="M14 42 q20 0 38 12 M10 54 q20 2 40 6 M112 42 q-20 0 -38 12 M110 54 q-20 2 -40 6"/></g>
<path d="M46 60 q0 -10 14 -10 q14 0 14 10 q0 22 -14 30 q-14 -8 -14 -30z" fill="#92400e" stroke="${OL}" stroke-width="2.5"/>
<path d="M52 66 q8 4 16 0 M52 74 q8 4 16 0" stroke="#b45309" stroke-width="1.8" fill="none"/>
<path d="M52 88 l-6 10 h28 l-6 -10" fill="#78350f" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M44 40 q0 -20 16 -20 q16 0 16 20 q0 12 -16 14 q-16 -2 -16 -14z" fill="#f8fafc" stroke="${OL}" stroke-width="3"/>
<path d="M46 34 l10 4 M74 34 l-10 4" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
<path d="M48 39 q4 -3 8 1 q-4 3 -8 -1z M72 39 q-4 -3 -8 1 q4 3 8 -1z" fill="#f59e0b" stroke="${OL}" stroke-width="1.1"/><circle cx="52" cy="39" r="1.5" fill="${OL}"/><circle cx="68" cy="39" r="1.5" fill="${OL}"/>
<path d="M54 44 q6 -3 12 0 q-1 9 -6 12 q-5 -3 -6 -12z" fill="url(#gd-taka)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<g transform="translate(60 106)"><path d="M0 -10 l10 10 l-10 10 l-10 -10z" fill="#1e3a8a" stroke="url(#gd-taka)" stroke-width="3"/><path d="M0 -5 v10 M-5 0 h10" stroke="#93c5fd" stroke-width="2"/></g>
<g fill="none" stroke="url(#gd-taka)" stroke-width="3.5" stroke-linecap="round"><path d="M50 98 q-4 4 -2 9 M56 98 q-2 5 0 8 M64 98 q2 5 0 8 M70 98 q4 4 2 9"/></g>`),

  // ハイウェイ・タイガー（★★★・かっこいい）：道路に前足をついて身がまえるトラ。額にゴーグル、後ろに流れる光の線
  tora2: wrap('tora2', '#fed7aa', '#c2410c', `
<g stroke="#fff7ed" stroke-width="3" stroke-linecap="round" opacity=".85"><path d="M2 40 h22 M0 54 h14 M98 40 h22 M106 54 h14"/></g>
<path d="M0 100 h120 v20 h-120z" fill="#334155"/><path d="M6 108 h16 M34 108 h16 M62 108 h16 M90 108 h16" stroke="#fde047" stroke-width="3"/>
<path d="M30 40 l-6 -18 l18 8z M90 40 l6 -18 l-18 8z" fill="#f97316" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M31 33 l-2 -7 l7 3z M89 33 l2 -7 l-7 3z" fill="#fde68a"/>
<path d="M26 60 q-4 -10 2 -18 q8 -16 32 -16 q24 0 32 16 q6 8 2 18 q6 6 2 14 q-8 18 -36 20 q-28 -2 -36 -20 q-4 -8 2 -14z" fill="#fb923c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 70 q20 -8 40 0 q-2 20 -20 22 q-18 -2 -20 -22z" fill="#fff7ed"/>
<g fill="${OL}"><path d="M60 28 l-5 12 l5 -3 l5 3z"/><path d="M27 52 l12 3 l-12 4z M93 52 l-12 3 l12 4z"/><path d="M26 66 l10 1 l-9 4z M94 66 l-10 1 l9 4z"/><path d="M44 30 l4 8 l-6 -2z M76 30 l-4 8 l6 -2z"/></g>
${eyes(56, '#16a34a')}
<path d="M55 68 h10 l-5 5z" fill="${OL}"/><path d="M60 73 v4 M60 77 q-6 5 -11 0 M60 77 q6 5 11 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M52 80 l2 5 l2 -5 M64 80 l2 5 l2 -5" fill="#fff" stroke="${OL}" stroke-width="1"/>
<g transform="translate(60 36)"><rect x="-26" y="-6" width="52" height="5" rx="2" fill="#111827"/><circle cx="-12" cy="-4" r="7" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/><circle cx="12" cy="-4" r="7" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/><path d="M-15 -7 l4 -2 M9 -7 l4 -2" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>
<g stroke="${OL}" stroke-width="2.5"><path d="M30 104 q-2 -14 10 -14 q12 0 10 14z" fill="#fb923c"/><path d="M70 104 q-2 -14 10 -14 q12 0 10 14z" fill="#fb923c"/></g>
<g stroke="${OL}" stroke-width="1.6"><path d="M36 104 v-5 M42 104 v-5 M76 104 v-5 M82 104 v-5"/><path d="M34 94 l6 2 M80 94 l6 2" stroke-width="2.4"/></g>`),
});

// ----- 秋学期のはじめの仲間 -----
Object.assign(CHAR_ART, {
  // チュー（★・C/C++）：{ } の形のチーズをかじるネズミ
  chu: wrap1('chu', '#f1f5f9', '#bfdbfe', `
<path d="M86 96 q22 4 18 -16 q-2 -8 -8 -6" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="36" cy="42" r="15" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/><circle cx="36" cy="42" r="8" fill="#fbcfe8"/>
<circle cx="84" cy="42" r="15" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/><circle cx="84" cy="42" r="8" fill="#fbcfe8"/>
<ellipse cx="60" cy="72" rx="30" ry="27" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/>
${cute(64, 11, 4.2)}${blush(73, 19)}
<ellipse cx="60" cy="74" rx="4" ry="3" fill="#f472b6" stroke="${OL}" stroke-width="1.5"/><path d="M46 74 h-12 M46 78 h-11 M74 74 h12 M74 78 h11" stroke="${OL}" stroke-width="1.3"/>
<path d="M57 79 h6 v5 h-6z" fill="#fff" stroke="${OL}" stroke-width="1.2"/>
<g transform="translate(60 104)"><path d="M-22 4 l22 -16 l22 16z" fill="#fde047" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><text y="3" text-anchor="middle" font-size="11" font-weight="900" fill="#a16207" font-family="monospace">{ }</text></g>`),

  // ケロ（★・DB）：はすの葉にすわるカエル。となりに小さなデータベースの筒
  kero: wrap1('kero', '#ecfccb', '#a5f3fc', `
<ellipse cx="60" cy="104" rx="46" ry="12" fill="#4ade80" stroke="${OL}" stroke-width="2.5"/><path d="M60 104 l20 -10" stroke="${OL}" stroke-width="2"/>
<ellipse cx="60" cy="76" rx="32" ry="24" fill="#86efac" stroke="${OL}" stroke-width="3"/>
<circle cx="44" cy="52" r="12" fill="#86efac" stroke="${OL}" stroke-width="3"/><circle cx="76" cy="52" r="12" fill="#86efac" stroke="${OL}" stroke-width="3"/>
<circle cx="44" cy="52" r="6.5" fill="#fff" stroke="${OL}" stroke-width="1.5"/><circle cx="76" cy="52" r="6.5" fill="#fff" stroke="${OL}" stroke-width="1.5"/><circle cx="45" cy="53" r="3.5" fill="${OL}"/><circle cx="77" cy="53" r="3.5" fill="${OL}"/><circle cx="46" cy="51.5" r="1.2" fill="#fff"/><circle cx="78" cy="51.5" r="1.2" fill="#fff"/>
<path d="M42 74 q18 12 36 0" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>${blush(70, 24)}
<ellipse cx="60" cy="88" rx="16" ry="8" fill="#dcfce7"/>
<g transform="translate(96 82)"><path d="M-8 -8 v14 a8 3 0 0 0 16 0 v-14" fill="#38bdf8" stroke="${OL}" stroke-width="2"/><ellipse cy="-8" rx="8" ry="3" fill="#bae6fd" stroke="${OL}" stroke-width="2"/><path d="M-8 -1 a8 3 0 0 0 16 0" fill="none" stroke="${OL}" stroke-width="1.5"/></g>`),

  // ミミ（★・DB）：にんじんをかかえた白いウサギ
  mimi: wrap1('mimi', '#fff1f2', '#fecdd3', `
<path d="M44 48 q-12 -36 0 -40 q12 0 10 38z" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M46 42 q-6 -22 -1 -28" stroke="#fda4af" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M76 48 q12 -36 0 -40 q-12 0 -10 38z" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M74 42 q6 -22 1 -28" stroke="#fda4af" stroke-width="5" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="74" rx="32" ry="28" fill="#fff" stroke="${OL}" stroke-width="3"/>
${cute(66, 12, 4.3)}${blush(75, 20)}
<path d="M56 74 q4 3 8 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M58 71 l2 2 l2 -2z" fill="#f472b6"/>
<g transform="translate(60 98) rotate(-20)"><path d="M-4 -12 l4 26 l4 -26z" fill="#fb923c" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M-1 -6 h3 M-1 0 h3" stroke="#c2410c" stroke-width="1.2"/><path d="M0 -12 q-6 -8 -2 -12 M0 -12 q2 -10 6 -10 M0 -12 q6 -6 8 -2" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<ellipse cx="44" cy="96" rx="7" ry="5" fill="#fff" stroke="${OL}" stroke-width="2.5"/><ellipse cx="76" cy="96" rx="7" ry="5" fill="#fff" stroke="${OL}" stroke-width="2.5"/>`),

  // マイマイ（★・設計）：からが時計になっているのんびりカタツムリ
  maimai: wrap1('maimai', '#fefce8', '#d9f99d', `
<path d="M10 96 q0 -10 14 -12 h56 q16 0 18 14 q-40 8 -88 -2z" fill="#fde68a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M22 84 q-4 -20 2 -36" stroke="${OL}" stroke-width="3" fill="none"/><path d="M32 84 q2 -22 12 -34" stroke="${OL}" stroke-width="3" fill="none"/>
<circle cx="24" cy="46" r="6" fill="#fff" stroke="${OL}" stroke-width="2.5"/><circle cx="25" cy="46" r="3" fill="${OL}"/><circle cx="45" cy="48" r="6" fill="#fff" stroke="${OL}" stroke-width="2.5"/><circle cx="46" cy="48" r="3" fill="${OL}"/>
<path d="M18 78 q6 4 12 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="72" cy="62" r="28" fill="#c084fc" stroke="${OL}" stroke-width="3"/>
<path d="M72 62 m-20 0 a20 20 0 1 1 20 20 a14 14 0 1 1 -12 -16" fill="none" stroke="#7e22ce" stroke-width="2.5"/>
<circle cx="72" cy="62" r="11" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M72 55 v7 l5 3" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<text x="96" y="30" font-size="12" font-weight="900" fill="#65a30d">z</text><text x="104" y="22" font-size="9" font-weight="900" fill="#65a30d">z</text>`),

  // カメキチ（★・設計）：六角形のこうらで身を守るカメ
  kame: wrap1('kame', '#ecfdf5', '#a7f3d0', `
<ellipse cx="30" cy="96" rx="8" ry="6" fill="#86efac" stroke="${OL}" stroke-width="2.5"/><ellipse cx="90" cy="96" rx="8" ry="6" fill="#86efac" stroke="${OL}" stroke-width="2.5"/>
<path d="M20 88 q0 -44 40 -44 q40 0 40 44z" fill="#16a34a" stroke="${OL}" stroke-width="3"/>
<g fill="#4ade80" stroke="#14532d" stroke-width="2"><path d="M60 54 l10 6 v12 l-10 6 l-10 -6 v-12z"/><path d="M38 66 l8 5 v10 l-8 5 l-8 -5 v-10z"/><path d="M82 66 l8 5 v10 l-8 5 l-8 -5 v-10z"/></g>
<path d="M22 88 h76" stroke="${OL}" stroke-width="3"/><path d="M28 50 q8 -6 16 -6" stroke="#bbf7d0" stroke-width="3" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="96" rx="16" ry="12" fill="#86efac" stroke="${OL}" stroke-width="3"/>
${cute(94, 7, 3)}<path d="M57 100 q3 2 6 0" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`),

  // ペン（★★・C/C++）：マフラーを巻いたペンギン。まわりに雪
  pen: wrap2('pen', '#e0f2fe', '#38bdf8', `
<g fill="#fff"><circle cx="20" cy="34" r="2.5"/><circle cx="100" cy="44" r="2"/><circle cx="26" cy="70" r="1.8"/><circle cx="96" cy="76" r="2.4"/></g>
<ellipse cx="60" cy="72" rx="30" ry="36" fill="#1e293b" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="80" rx="20" ry="26" fill="#fff"/>
<path d="M30 70 q-12 10 -6 22 q8 -4 10 -12z M90 70 q12 10 6 22 q-8 -4 -10 -12z" fill="#1e293b" stroke="${OL}" stroke-width="2.5"/>
<ellipse cx="60" cy="56" rx="18" ry="14" fill="#fff"/>
${cute(54, 8, 3.6)}${blush(62, 14)}
<path d="M55 60 l5 5 l5 -5z" fill="#f59e0b" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M36 70 q24 12 48 0 l-2 8 q-22 10 -44 0z" fill="#ef4444" stroke="${OL}" stroke-width="2.5"/><path d="M76 74 l6 18 l-8 2 l-4 -16z" fill="#ef4444" stroke="${OL}" stroke-width="2.5"/>
<path d="M48 106 l-6 6 h14z M72 106 l6 6 h-14z" fill="#f59e0b" stroke="${OL}" stroke-width="2"/>`),

  // トラ（★★・C/C++）：ツメの一撃をくりだす子どものトラ
  tora: wrap2('tora', '#ffedd5', '#fb923c', `
<g stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"><path d="M84 20 l-14 30 M96 26 l-14 30 M108 34 l-14 28"/></g>
<path d="M34 42 l-4 -14 l14 6z M86 42 l4 -14 l-14 6z" fill="#fb923c" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="72" rx="34" ry="30" fill="#fb923c" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="84" rx="18" ry="12" fill="#fff7ed"/>
<g fill="${OL}"><path d="M60 42 l-4 9 h8z"/><path d="M27 66 l10 2 l-10 4z M93 66 l-10 2 l10 4z"/></g>
${cute(70, 13, 4.4)}
<path d="M56 80 h8 l-4 4z" fill="${OL}"/><path d="M60 84 q-4 4 -8 1 M60 84 q4 4 8 1" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<g transform="translate(92 92)"><circle r="11" fill="#fb923c" stroke="${OL}" stroke-width="2.5"/><path d="M-6 -10 l-2 -5 M0 -11 v-6 M6 -10 l2 -5" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="-4" cy="2" r="2" fill="#fda4af"/><circle cx="4" cy="2" r="2" fill="#fda4af"/></g>`),

  // コンコ（★★・DB）：青いきつね火をともすキツネ
  konko: wrap2('konko', '#fef3c7', '#f97316', `
<g transform="translate(22 30)"><path d="M0 12 q-10 -10 0 -24 q2 10 8 8 q2 8 -8 16z" fill="#60a5fa" stroke="#1d4ed8" stroke-width="2"/><path d="M0 8 q-4 -6 0 -12 q2 6 4 6 q0 4 -4 6z" fill="#dbeafe"/></g>
<g transform="translate(100 40)"><path d="M0 12 q-10 -10 0 -24 q2 10 8 8 q2 8 -8 16z" fill="#60a5fa" stroke="#1d4ed8" stroke-width="2"/><path d="M0 8 q-4 -6 0 -12 q2 6 4 6 q0 4 -4 6z" fill="#dbeafe"/></g>
<path d="M30 54 l-4 -34 l26 20z M90 54 l4 -34 l-26 20z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M31 44 l-2 -16 l12 10z M89 44 l2 -16 l-12 10z" fill="#fff7ed"/>
<path d="M26 58 q0 -20 34 -20 q34 0 34 20 q-4 22 -34 40 q-30 -18 -34 -40z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 70 q20 6 40 0 q-6 18 -20 28 q-14 -10 -20 -28z" fill="#fff7ed"/>
<path d="M42 60 q6 -4 12 2 M78 60 q-6 -4 -12 2" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="88" rx="4" ry="3" fill="${OL}"/>${blush(72, 22)}
<path d="M60 91 q-4 4 -7 1 M60 91 q4 4 7 1" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`),

  // クマ（★★・DB）：どっしりすわるクマ。おなかにはちみつのつぼ
  kuma: wrap2('kuma', '#fef3c7', '#a16207', `
<circle cx="34" cy="34" r="12" fill="#92400e" stroke="${OL}" stroke-width="3"/><circle cx="34" cy="34" r="6" fill="#fcd34d"/><circle cx="86" cy="34" r="12" fill="#92400e" stroke="${OL}" stroke-width="3"/><circle cx="86" cy="34" r="6" fill="#fcd34d"/>
<path d="M22 116 q0 -40 38 -40 q38 0 38 40z" fill="#92400e" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="52" r="28" fill="#92400e" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="62" rx="13" ry="10" fill="#fcd34d" stroke="${OL}" stroke-width="2"/>
${cute(48, 11, 4)}<ellipse cx="60" cy="57" rx="4.5" ry="3.2" fill="${OL}"/><path d="M60 60 v4 q-4 3 -7 0 M60 64 q4 3 7 0" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<g transform="translate(60 98)"><path d="M-12 -10 h24 l-2 4 q6 6 4 14 q-2 6 -14 6 q-12 0 -14 -6 q-2 -8 4 -14z" fill="#fbbf24" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><text y="7" text-anchor="middle" font-size="7" font-weight="900" fill="#92400e">HONEY</text></g>
<ellipse cx="34" cy="96" rx="9" ry="12" fill="#a16207" stroke="${OL}" stroke-width="2.5"/><ellipse cx="86" cy="96" rx="9" ry="12" fill="#a16207" stroke="${OL}" stroke-width="2.5"/>`),

  // パンダ先輩（★★・設計）：まるめがねをかけて笹をもつパンダ
  panda: wrap2('panda', '#f0fdf4', '#86efac', `
<g transform="translate(96 74) rotate(10)"><path d="M0 40 v-60" stroke="#15803d" stroke-width="5"/><path d="M0 -10 h-3 M0 10 h-3" stroke="#14532d" stroke-width="2"/><path d="M0 -18 q14 -10 18 -2 q-10 4 -18 2z M0 -4 q-14 -10 -18 -2 q10 4 18 2z M0 -28 q10 -12 16 -6 q-8 6 -16 6z" fill="#4ade80" stroke="#14532d" stroke-width="1.5"/></g>
<circle cx="36" cy="36" r="11" fill="${OL}"/><circle cx="84" cy="36" r="11" fill="${OL}"/>
<ellipse cx="60" cy="64" rx="34" ry="30" fill="#fff" stroke="${OL}" stroke-width="3"/>
<ellipse cx="46" cy="62" rx="9" ry="11" fill="${OL}" transform="rotate(-20 46 62)"/><ellipse cx="74" cy="62" rx="9" ry="11" fill="${OL}" transform="rotate(20 74 62)"/>
<circle cx="47" cy="61" r="3" fill="#fff"/><circle cx="73" cy="61" r="3" fill="#fff"/>
<circle cx="46" cy="61" r="10" fill="none" stroke="#a16207" stroke-width="2.2"/><circle cx="74" cy="61" r="10" fill="none" stroke="#a16207" stroke-width="2.2"/><path d="M56 60 h8" stroke="#a16207" stroke-width="2.2"/>
<ellipse cx="60" cy="75" rx="4" ry="3" fill="${OL}"/><path d="M60 78 q-4 4 -7 1 M60 78 q4 4 7 1" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M28 116 q0 -22 32 -22 q32 0 32 22z" fill="${OL}"/>`),

  // ロボ博士（★★★・C/C++）：アンテナと片めがねのロボット。右うでがコンパイル砲
  robo: wrap('robo', '#e0f2fe', '#0369a1', `
<path d="M60 18 v-10" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="8" r="5" fill="#ef4444" stroke="${OL}" stroke-width="2"/>
<path d="M30 116 v-24 q0 -10 10 -10 h40 q10 0 10 10 v24z" fill="#94a3b8" stroke="${OL}" stroke-width="3"/>
<rect x="44" y="92" width="32" height="18" rx="3" fill="#1e293b" stroke="${OL}" stroke-width="2"/><g fill="#22d3ee"><circle cx="52" cy="101" r="3"/><circle cx="60" cy="101" r="3" fill="#facc15"/><circle cx="68" cy="101" r="3" fill="#4ade80"/></g>
<rect x="34" y="20" width="52" height="56" rx="12" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/>
<rect x="40" y="34" width="40" height="22" rx="6" fill="#0f172a" stroke="${OL}" stroke-width="2"/>
<path d="M44 44 l10 2 l-10 3z" fill="#22d3ee"/><circle cx="70" cy="45" r="6" fill="#22d3ee"/><circle cx="70" cy="45" r="9" fill="none" stroke="url(#gd-robo)" stroke-width="2.5"/><path d="M78 50 q4 10 2 18" stroke="url(#gd-robo)" stroke-width="1.6" fill="none"/>
<path d="M46 64 h28" stroke="${OL}" stroke-width="2.5"/><path d="M50 64 v4 M56 64 v4 M62 64 v4 M68 64 v4" stroke="${OL}" stroke-width="2"/>
<g transform="translate(96 88)"><rect x="-8" y="-10" width="18" height="20" rx="4" fill="#64748b" stroke="${OL}" stroke-width="2.5"/><rect x="8" y="-6" width="12" height="12" fill="#475569" stroke="${OL}" stroke-width="2.5"/><circle cx="20" cy="0" r="5" fill="#fde047" stroke="#f97316" stroke-width="2"/></g>
<g transform="translate(22 88)"><circle r="9" fill="#64748b" stroke="${OL}" stroke-width="2.5"/><path d="M-4 -4 l8 8 M4 -4 l-8 8" stroke="#e2e8f0" stroke-width="2"/></g>`),

  // クジラ（★★★・DB）：波間からしおをふく大きなクジラ
  kujira: wrap('kujira', '#e0f2fe', '#0c4a6e', `
<g fill="#bae6fd" stroke="#0369a1" stroke-width="2"><path d="M60 30 q-4 -14 -14 -18 q8 0 12 6 q2 -10 4 -14 q2 4 2 14 q4 -6 12 -6 q-10 4 -14 18z"/></g>
<g fill="#e0f2fe"><circle cx="44" cy="14" r="3"/><circle cx="78" cy="12" r="3.5"/><circle cx="60" cy="4" r="2.5"/></g>
<path d="M12 78 q4 -46 52 -46 q36 0 44 28 q4 16 -6 22 l14 -6 q-2 14 -14 14 q-10 2 -22 0 q-30 4 -68 -12z" fill="#1d4ed8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M14 80 q30 14 70 10 q-2 10 -18 12 q-30 2 -52 -22z" fill="#bfdbfe" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#60a5fa" stroke-width="1.8" fill="none"><path d="M30 92 q20 6 40 4 M26 86 q24 8 48 6"/></g>
<path d="M30 54 l10 3 M30 60 q6 -4 12 1 q-6 4 -12 -1z" stroke="${OL}" stroke-width="2.5" fill="#fff" stroke-linecap="round"/><circle cx="36" cy="60" r="2" fill="${OL}"/>
<path d="M56 74 q-6 12 6 16" stroke="${OL}" stroke-width="2.5" fill="#1e40af"/>
<path d="M0 104 q15 -8 30 0 t30 0 t30 0 t30 0 v16 h-120z" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/>`),

  // チョウ（★★★・設計）：模様が設計図になっている大きな羽のチョウ。りんぷんがきらめく
  chou: wrap('chou', '#fae8ff', '#7e22ce', `
<path d="M58 56 q-20 -40 -46 -32 q-10 16 6 34 q-16 8 -8 28 q20 12 46 -16z" fill="#a855f7" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M62 56 q20 -40 46 -32 q10 16 -6 34 q16 8 8 28 q-20 12 -46 -16z" fill="#a855f7" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g fill="none" stroke="#f0abfc" stroke-width="2"><path d="M50 48 q-14 -14 -30 -14 M48 54 l-28 4 M50 64 q-14 6 -24 18"/><path d="M70 48 q14 -14 30 -14 M72 54 l28 4 M70 64 q14 6 24 18"/></g>
<g fill="url(#gd-chou)" stroke="${OL}" stroke-width="1.5"><circle cx="30" cy="40" r="6"/><circle cx="90" cy="40" r="6"/><rect x="22" y="72" width="9" height="9" rx="2"/><rect x="89" y="72" width="9" height="9" rx="2"/></g>
<ellipse cx="60" cy="66" rx="6" ry="24" fill="#3b0764" stroke="${OL}" stroke-width="2.5"/>
<circle cx="60" cy="40" r="8" fill="#3b0764" stroke="${OL}" stroke-width="2.5"/>
<path d="M56 34 q-6 -14 -14 -18 M64 34 q6 -14 14 -18" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="42" cy="16" r="3" fill="url(#gd-chou)"/><circle cx="78" cy="16" r="3" fill="url(#gd-chou)"/>
<g fill="#fef08a">${[[40, 100], [52, 108], [70, 104], [84, 110], [62, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g>`),

  // ユニ（★★★・全科目）：にじ色のたてがみと金の角のユニコーン
  yuni: wrap('yuni', '#fdf4ff', '#a78bfa', `
<path d="M30 116 q-4 -34 12 -52 l24 6 q-8 20 2 46z" fill="#fff" stroke="${OL}" stroke-width="3"/>
<path d="M40 60 q-4 -30 22 -36 q26 -4 36 18 q6 12 0 22 q-6 8 -16 6 l-8 -2 q-8 10 -20 4z" fill="#fff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M64 26 l14 -24 l-2 28z" fill="url(#gd-yuni)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M68 20 l8 -2 M70 14 l6 -2" stroke="#b7791f" stroke-width="1.5"/>
<path d="M56 30 q-10 -4 -10 -12 l10 6z" fill="#fff" stroke="${OL}" stroke-width="2.5"/>
<path d="M50 28 q-22 4 -24 30 q-2 20 6 40 q6 -16 10 -30 q4 -18 14 -30z" fill="#f472b6" stroke="${OL}" stroke-width="2.5"/>
<path d="M44 36 q-12 10 -12 30 q2 16 4 26" stroke="#facc15" stroke-width="5" fill="none"/><path d="M48 40 q-8 10 -8 26 q0 14 2 22" stroke="#4ade80" stroke-width="4" fill="none"/><path d="M38 50 q-4 12 -4 26" stroke="#60a5fa" stroke-width="4" fill="none"/>
<path d="M70 44 q4 -4 9 0 q-4 4 -9 0z" fill="#7c3aed" stroke="${OL}" stroke-width="1.5"/><path d="M68 40 l12 -2" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>
<ellipse cx="94" cy="56" rx="2.5" ry="1.8" fill="${OL}"/><ellipse cx="78" cy="56" rx="5" ry="3" fill="#fbcfe8" opacity=".8"/>
<g fill="#fff"><path d="M100 90 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z"/><path d="M88 106 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5z"/></g>`),

  // リュウ（★★★・全科目）：角とたてがみのドラゴンが、りゅうのいぶきを吐く
  ryu: wrap('ryu', '#dcfce7', '#065f46', `
<path d="M74 72 q24 -6 46 4 q-10 10 -30 10 q14 8 30 4 q-14 18 -48 0z" fill="#fb923c" stroke="#c2410c" stroke-width="2"/><path d="M76 76 q18 -2 32 4 q-14 4 -30 2z" fill="#fde047"/>
<path d="M16 116 q-2 -30 18 -40 l20 10 q-14 12 -8 30z" fill="#059669" stroke="${OL}" stroke-width="3"/>
<g fill="#fde68a" stroke="${OL}" stroke-width="1.5"><path d="M24 92 l6 -6 l4 8z M30 104 l6 -6 l4 8z"/></g>
<path d="M28 34 l-10 -24 l20 14z M58 26 l6 -24 l6 22z" fill="url(#gd-ryu)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M24 56 q0 -30 30 -32 q24 0 32 20 l-2 10 q8 4 6 14 q-4 10 -22 10 l-14 0 q-30 4 -30 -22z" fill="#10b981" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 66 q14 -2 26 0 q-2 10 -14 12 q-10 0 -12 -12z" fill="#7f1d1d" stroke="${OL}" stroke-width="2"/><path d="M64 66 l2 4 l2 -4 M72 66 l2 4 l2 -4" fill="#fff" stroke="${OL}" stroke-width="1"/>
<path d="M22 40 q-14 6 -14 22 q8 -6 14 -6 q-8 10 -4 22 q6 -10 12 -12" fill="#065f46" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M50 40 l12 4 M52 47 q6 -4 11 0 q-6 4 -11 0z" stroke="${OL}" stroke-width="2.5" fill="#fde047" stroke-linecap="round"/><circle cx="57" cy="47" r="1.6" fill="${OL}"/>
<circle cx="80" cy="50" r="2" fill="${OL}"/><g stroke="#6ee7b7" stroke-width="2" fill="none"><path d="M34 66 q6 4 12 2 M32 58 q6 4 12 2"/></g>`),
});

// ----- C/C++・DB・設計の追加の仲間 -----
Object.assign(CHAR_ART, {
  // インデックスインコ（★・DB）：付せんの見出し（インデックス）をくちばしにくわえたインコ
  inko: wrap1('inko', '#ecfccb', '#bef264', `
<path d="M60 22 q-8 -14 -2 -18 q2 8 8 10 q0 -8 6 -10 q-2 10 -4 16z" fill="#ef4444" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M32 112 q-6 -30 6 -52 l40 0 q14 24 4 52z" fill="#22c55e" stroke="${OL}" stroke-width="3"/>
<path d="M44 112 q-2 -20 4 -36 M72 112 q4 -20 -2 -36" stroke="#15803d" stroke-width="2" fill="none"/>
<circle cx="60" cy="50" r="28" fill="#4ade80" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="62" rx="16" ry="12" fill="#fef9c3"/>
${cute(46, 12, 4.2)}
<path d="M54 54 q6 -6 12 0 q0 10 -6 12 q-6 -2 -6 -12z" fill="#f97316" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<g transform="translate(72 64) rotate(12)"><rect x="0" y="-4" width="24" height="9" rx="1.5" fill="#fde047" stroke="${OL}" stroke-width="1.8"/><rect x="0" y="6" width="20" height="8" rx="1.5" fill="#60a5fa" stroke="${OL}" stroke-width="1.8"/><rect x="0" y="15" width="16" height="7" rx="1.5" fill="#f472b6" stroke="${OL}" stroke-width="1.8"/><text x="12" y="3.5" text-anchor="middle" font-size="6.5" font-weight="900" fill="${OL}">A-K</text></g>`),

  // カプセル化ヤドカリ（★・設計）：カプセル（薬の形）のからに入って、中身をかくすヤドカリ
  yadokari: wrap1('yadokari', '#fef2f2', '#fecaca', `
<path d="M0 106 q30 -6 60 0 t60 0 v14 h-120z" fill="#fde68a" stroke="${OL}" stroke-width="2"/>
<g transform="translate(66 58) rotate(-24)"><rect x="-34" y="-20" width="68" height="40" rx="20" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M0 -20 v40" stroke="${OL}" stroke-width="2.5"/><path d="M-34 0 a20 20 0 0 1 20 -20 h14 v40 h-14 a20 20 0 0 1 -20 -20z" fill="#60a5fa"/><rect x="-34" y="-20" width="68" height="40" rx="20" fill="none" stroke="${OL}" stroke-width="3"/><path d="M-22 -12 q8 -4 14 -4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><g transform="translate(16 0)"><rect x="-6" y="-2" width="12" height="10" rx="2" fill="#facc15" stroke="${OL}" stroke-width="1.8"/><path d="M-3 -2 v-3 a3 3 0 0 1 6 0 v3" fill="none" stroke="${OL}" stroke-width="1.8"/></g></g>
<path d="M22 96 q-10 -10 -4 -22 q8 -2 12 6 M42 98 q4 -14 -2 -24 q-10 0 -8 10" fill="#f87171" stroke="${OL}" stroke-width="2.5"/>
<path d="M18 72 l-6 -6 l8 2 M30 74 l4 -8 l-1 8" fill="none" stroke="${OL}" stroke-width="2"/>
<ellipse cx="34" cy="86" rx="16" ry="12" fill="#f87171" stroke="${OL}" stroke-width="3"/>
<path d="M28 78 v-10 M40 78 v-10" stroke="${OL}" stroke-width="2.5"/><circle cx="28" cy="66" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="40" cy="66" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="28.5" cy="66.5" r="2" fill="${OL}"/><circle cx="40.5" cy="66.5" r="2" fill="${OL}"/>
<path d="M30 90 q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`),

  // 継承カンガルー（★★・設計）：おなかのふくろに子ども。親の力を子が受けつぐ
  kangaroo: wrap2('kangaroo', '#fef3c7', '#d97706', `
<path d="M86 104 q26 0 30 -22" stroke="${OL}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M86 104 q26 0 30 -22" stroke="#d97706" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M44 34 l-6 -24 l14 18z M64 32 l4 -24 l6 22z" fill="#d97706" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M34 116 q-6 -34 8 -52 q-8 -10 -4 -22 q6 -14 22 -14 q18 2 20 18 q2 10 -6 16 q16 18 12 54z" fill="#f59e0b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M46 62 q14 6 28 0" stroke="${OL}" stroke-width="2" fill="none"/>
${cute(40, 8, 3.4)}<ellipse cx="68" cy="46" rx="4" ry="3" fill="${OL}"/><path d="M60 50 q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none"/>
<path d="M46 84 q14 -6 28 0 q2 22 -14 24 q-16 -2 -14 -24z" fill="#fcd34d" stroke="${OL}" stroke-width="2.5"/>
<g transform="translate(60 82)"><path d="M-6 -8 l-2 -8 l6 5z M6 -8 l2 -8 l-6 5z" fill="#f59e0b" stroke="${OL}" stroke-width="1.8"/><circle r="9" fill="#f59e0b" stroke="${OL}" stroke-width="2.2"/><circle cx="-3.5" cy="-1" r="2" fill="${OL}"/><circle cx="3.5" cy="-1" r="2" fill="${OL}"/><ellipse cy="3" rx="2" ry="1.4" fill="${OL}"/></g>
<path d="M46 84 q14 4 28 0" stroke="${OL}" stroke-width="2.5" fill="none"/>
<g transform="translate(92 26)"><path d="M0 -8 l8 14 h-16z" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M0 6 v10" stroke="${OL}" stroke-width="2"/></g>`),

  // ポリモーフィ・タコ（★★・設計）：8本の足で○△□をもちかえる、多態性のタコ
  tako: wrap2('tako', '#fce7f3', '#db2777', `
<g fill="#f472b6" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"><path d="M34 78 q-18 8 -22 26 q8 0 12 -8 q2 8 8 8 q-2 -12 10 -20z"/><path d="M86 78 q18 8 22 26 q-8 0 -12 -8 q-2 8 -8 8 q2 -12 -10 -20z"/><path d="M44 84 q-8 16 -4 30 q6 -4 8 -12 q4 6 8 4 q-6 -10 -2 -20z"/><path d="M76 84 q8 16 4 30 q-6 -4 -8 -12 q-4 6 -8 4 q6 -10 2 -20z"/></g>
<path d="M28 58 q0 -40 32 -40 q32 0 32 40 q0 26 -32 28 q-32 -2 -32 -28z" fill="#f472b6" stroke="${OL}" stroke-width="3"/>
<g fill="#fbcfe8"><circle cx="44" cy="34" r="4"/><circle cx="78" cy="30" r="3"/><circle cx="74" cy="44" r="2.5"/></g>
${cute(58, 11, 4.4)}${blush(67, 20)}<path d="M55 70 q5 -4 10 0 q-5 5 -10 0z" fill="#be185d" stroke="${OL}" stroke-width="1.8"/>
<circle cx="24" cy="94" r="8" fill="#60a5fa" stroke="${OL}" stroke-width="2.2"/><rect x="88" y="86" width="15" height="15" fill="#facc15" stroke="${OL}" stroke-width="2.2"/><path d="M52 112 l8 -14 l8 14z" fill="#4ade80" stroke="${OL}" stroke-width="2.2"/>`),

  // ガベージコレクタ（★★★・C/C++）：目のまわりが黒いアライグマ。いらないメモリのブロックを集めて片づける
  gc: wrap('gc', '#e2e8f0', '#334155', `
<g transform="translate(94 90)"><path d="M-14 -12 h28 l-4 28 h-20z" fill="#475569" stroke="${OL}" stroke-width="2.5"/><path d="M-16 -16 h32 v5 h-32z" fill="#64748b" stroke="${OL}" stroke-width="2.5"/><text y="4" text-anchor="middle" font-size="6" font-weight="900" fill="#22d3ee" font-family="monospace">free()</text></g>
<g stroke="${OL}" stroke-width="1.8"><rect x="86" y="56" width="10" height="10" fill="#22d3ee" transform="rotate(14 91 61)"/><rect x="100" y="62" width="9" height="9" fill="#a78bfa" transform="rotate(-10 104 66)"/></g>
<path d="M30 112 q-24 -4 -20 -28 q4 -10 12 -8" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M30 112 q-24 -4 -20 -28 q4 -10 12 -8" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
<g stroke="#1e293b" stroke-width="4"><path d="M12 100 l8 -2 M12 88 l8 2 M24 108 l2 -8"/></g>
<ellipse cx="54" cy="96" rx="26" ry="20" fill="#94a3b8" stroke="${OL}" stroke-width="3"/><ellipse cx="54" cy="100" rx="15" ry="12" fill="#e2e8f0"/>
<ellipse cx="38" cy="110" rx="8" ry="5" fill="#475569" stroke="${OL}" stroke-width="2.5"/><ellipse cx="70" cy="110" rx="8" ry="5" fill="#475569" stroke="${OL}" stroke-width="2.5"/>
<ellipse cx="76" cy="86" rx="6" ry="5" fill="#475569" stroke="${OL}" stroke-width="2.5"/>
<path d="M28 30 l-4 -18 l16 10z M80 30 l4 -18 l-16 10z" fill="#64748b" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M22 50 q0 -30 32 -30 q32 0 32 30 q0 24 -32 30 q-32 -6 -32 -30z" fill="#94a3b8" stroke="${OL}" stroke-width="3"/>
<path d="M26 48 q14 -10 26 2 q-4 10 -14 8 q-10 -2 -12 -10z M82 48 q-14 -10 -26 2 q4 10 14 8 q10 -2 12 -10z" fill="#1e293b"/>
<path d="M34 48 q6 -4 11 1 q-6 4 -11 -1z M74 48 q-6 -4 -11 1 q6 4 11 -1z" fill="#fde047"/><circle cx="40" cy="48" r="1.6" fill="${OL}"/><circle cx="68" cy="48" r="1.6" fill="${OL}"/>
<path d="M40 62 q14 -6 28 0 q-4 14 -14 16 q-10 -2 -14 -16z" fill="#f1f5f9"/><ellipse cx="54" cy="64" rx="4" ry="3" fill="${OL}"/><path d="M48 70 q6 4 12 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>`),

  // トランザクション象（★★★・DB）：鼻を高く上げた象。ROLLBACK の矢印と COMMIT の錠
  zou: wrap('zou', '#e0e7ff', '#3730a3', `
<path d="M100 22 a20 20 0 1 0 6 18" fill="none" stroke="url(#gd-zou)" stroke-width="4" stroke-linecap="round"/><path d="M108 32 l-2 10 l-8 -6z" fill="url(#gd-zou)" stroke="${OL}" stroke-width="1.5"/><text x="88" y="28" text-anchor="middle" font-size="5.5" font-weight="900" fill="#fde68a">UNDO</text>
<path d="M36 40 q-30 -8 -30 24 q2 26 26 26 q8 0 10 -10z" fill="#a5b4fc" stroke="${OL}" stroke-width="3"/><path d="M30 50 q-16 2 -14 18 q2 12 14 12" fill="#c7d2fe"/>
<path d="M84 40 q30 -8 30 24 q-2 26 -26 26 q-8 0 -10 -10z" fill="#a5b4fc" stroke="${OL}" stroke-width="3"/><path d="M90 50 q16 2 14 18 q-2 12 -14 12" fill="#c7d2fe"/>
<path d="M58 76 q2 22 24 18 q18 -6 16 -32 q-1 -8 -8 -12" fill="none" stroke="${OL}" stroke-width="15" stroke-linecap="round"/><path d="M58 76 q2 22 24 18 q18 -6 16 -32 q-1 -8 -8 -12" fill="none" stroke="#818cf8" stroke-width="10" stroke-linecap="round"/>
<path d="M66 92 l-1 4 M76 92 v4 M88 84 l3 2 M94 72 l3 0" stroke="#6366f1" stroke-width="1.8"/>
<ellipse cx="60" cy="54" rx="28" ry="30" fill="#a5b4fc" stroke="${OL}" stroke-width="3"/>
<path d="M54 76 q6 4 12 0 l0 -4 h-12z" fill="#a5b4fc"/>
<path d="M46 74 q-6 8 -2 16 q4 -6 8 -12z M74 74 q6 8 2 16 q-4 -6 -8 -12z" fill="#f8fafc" stroke="${OL}" stroke-width="2"/>
<path d="M40 50 l12 4 M80 50 l-12 4" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
<path d="M43 58 q5 -4 10 1 q-5 4 -10 -1z M77 58 q-5 -4 -10 1 q5 4 10 -1z" fill="#f8fafc" stroke="${OL}" stroke-width="1.5"/><circle cx="48" cy="58" r="1.8" fill="${OL}"/><circle cx="72" cy="58" r="1.8" fill="${OL}"/>
<g transform="translate(48 104) scale(.85)"><rect x="-14" y="-6" width="28" height="16" rx="3" fill="url(#gd-zou)" stroke="${OL}" stroke-width="2"/><path d="M-7 -6 v-5 a7 7 0 0 1 14 0 v5" fill="none" stroke="${OL}" stroke-width="2.5"/><text y="5.5" text-anchor="middle" font-size="6" font-weight="900" fill="${OL}">COMMIT</text></g>`),
});

// ----- TOEIC（リスニング・リーディング）の仲間 -----
Object.assign(CHAR_ART, {
  // エコーコウモリ（★・リスニング）：こだまの音の輪を出すコウモリ
  echo: wrap1('echo', '#ede9fe', '#c4b5fd', `
<g fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" opacity=".7"><path d="M92 50 q6 10 0 20 M100 44 q10 16 0 32 M108 38 q14 22 0 44"/></g>
<path d="M44 62 q-18 -16 -40 -8 q8 4 8 12 q8 -4 12 2 q6 -4 10 4 q6 -2 10 0z" fill="#6d28d9" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M76 62 q18 -16 36 -12 q-6 4 -6 12 q-8 -4 -10 2 q-6 -4 -10 4 q-6 -2 -10 0z" fill="#6d28d9" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M44 44 l-4 -16 l12 10z M76 44 l4 -16 l-12 10z" fill="#8b5cf6" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="64" rx="20" ry="22" fill="#8b5cf6" stroke="${OL}" stroke-width="3"/>
${cute(58, 8, 3.8)}${blush(66, 13)}<path d="M55 70 q5 4 10 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M56 70 l1.5 4 l1.5 -3.5 M61 70 l1.5 4 l1.5 -3.5" fill="#fff" stroke="${OL}" stroke-width=".8"/>`),

  // ディクテーション猫（★・リスニング）：耳をそばだてて、えんぴつでノートに書き取るネコ
  dictat: wrap1('dictat', '#fff7ed', '#fed7aa', `
<path d="M34 44 l-4 -22 l18 12z M86 44 l4 -22 l-18 12z" fill="#fdba74" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M35 38 l-2 -10 l8 6z M85 38 l2 -10 l-8 6z" fill="#fda4af"/>
<ellipse cx="60" cy="60" rx="32" ry="26" fill="#fdba74" stroke="${OL}" stroke-width="3"/>
<path d="M44 40 l4 8 M60 36 v8 M76 40 l-4 8" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
${cute(58, 12, 4)}${blush(66, 20)}<path d="M57 64 l3 3 l3 -3z" fill="#f472b6"/><path d="M60 67 q-4 4 -8 1 M60 67 q4 4 8 1" stroke="${OL}" stroke-width="1.8" fill="none"/><path d="M30 62 h-12 M30 66 l-11 3 M90 62 h12 M90 66 l11 3" stroke="${OL}" stroke-width="1.3"/>
<g transform="translate(60 98) rotate(-4)"><rect x="-26" y="-12" width="52" height="26" rx="3" fill="#fff" stroke="${OL}" stroke-width="2.5"/><path d="M-20 -4 h22 M-20 2 h30 M-20 8 h16" stroke="#94a3b8" stroke-width="2"/><path d="M-26 -12 v26" stroke="#ef4444" stroke-width="2"/></g>
<g transform="translate(92 90) rotate(35)"><rect x="-3" y="-18" width="6" height="26" fill="#facc15" stroke="${OL}" stroke-width="2"/><path d="M-3 8 l3 7 l3 -7z" fill="#fde68a" stroke="${OL}" stroke-width="1.5"/></g>`),

  // ナチュラルスピード・リス（★・リスニング）：ほおぶくろにコインをためこむリス
  risu: wrap1('risu', '#fef3c7', '#fcd34d', `
<path d="M86 104 q30 -10 24 -46 q-6 -24 -26 -18 q-12 6 -6 20 q10 0 10 14 q0 18 -14 22z" fill="#c2410c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M98 60 q6 14 -2 30" stroke="#fdba74" stroke-width="3" fill="none"/>
<path d="M38 40 l-2 -16 l12 10z M76 40 l2 -16 l-12 10z" fill="#ea580c" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="56" cy="88" rx="22" ry="22" fill="#ea580c" stroke="${OL}" stroke-width="3"/><ellipse cx="56" cy="92" rx="12" ry="14" fill="#fed7aa"/>
<ellipse cx="56" cy="56" rx="26" ry="22" fill="#ea580c" stroke="${OL}" stroke-width="3"/>
<ellipse cx="38" cy="64" rx="10" ry="8" fill="#fed7aa" stroke="${OL}" stroke-width="2"/><ellipse cx="74" cy="64" rx="10" ry="8" fill="#fed7aa" stroke="${OL}" stroke-width="2"/>
${cute(52, 9, 3.8)}<ellipse cx="56" cy="60" rx="3" ry="2.2" fill="${OL}"/><path d="M53 66 h6 v4 h-6z" fill="#fff" stroke="${OL}" stroke-width="1.2"/>
<g transform="translate(56 96)"><circle r="9" fill="url(#gd-risu)" stroke="${OL}" stroke-width="2"/><text y="3.5" text-anchor="middle" font-size="9" font-weight="900" fill="#92400e">¢</text></g>
<defs><linearGradient id="gd-risu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset="1" stop-color="#d97706"/></linearGradient></defs>`),

  // イントネーション・イルカ（★★・リスニング）：上がり下がりの抑揚の波にのって跳ぶイルカ
  iruka: wrap2('iruka', '#cffafe', '#0891b2', `
<path d="M0 96 q20 -14 40 0 t40 0 t40 0 v24 h-120z" fill="#22d3ee" stroke="${OL}" stroke-width="2.5"/>
<path d="M8 40 q12 -14 24 0 t24 0" stroke="#f0f9ff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/><path d="M50 40 l6 0 l-3 -5" stroke="#f0f9ff" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M18 92 q10 -48 60 -50 q18 0 26 10 q-10 0 -14 4 q8 10 4 24 q-6 -10 -16 -12 q-28 -2 -46 26z" fill="#38bdf8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M58 44 l-4 -12 l14 8z" fill="#0ea5e9" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 86 q14 -20 40 -22 q-10 10 -40 22z" fill="#e0f2fe"/>
<path d="M18 92 l-10 6 l4 -12z" fill="#0ea5e9" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="88" cy="52" r="3.6" fill="${OL}"/><circle cx="89" cy="51" r="1.3" fill="#fff"/><path d="M94 60 q4 2 8 -2" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="86" cy="60" rx="4" ry="2.4" fill="#fb7185" opacity=".5"/>`),

  // パラフレーズ・カメレオン（★★・リスニング）：体の色を変えて「同じ意味」を言いかえるカメレオン
  chamele: wrap2('chamele', '#ecfccb', '#65a30d', `
<path d="M8 82 h104" stroke="#78350f" stroke-width="7" stroke-linecap="round"/>
<path d="M74 82 q22 2 26 16 q2 12 -10 12 q-8 0 -8 -8 q0 -6 6 -6" fill="none" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M74 82 q22 2 26 16 q2 12 -10 12 q-8 0 -8 -8 q0 -6 6 -6" fill="none" stroke="#a855f7" stroke-width="5" stroke-linecap="round"/>
<path d="M20 70 q8 -30 40 -30 q24 0 32 16 q4 14 -8 24 q-30 8 -64 -10z" fill="#4ade80" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M58 42 q14 4 22 14 q4 12 -4 22 q-14 4 -18 0z" fill="#38bdf8" opacity=".75"/><path d="M76 52 q8 6 8 16 q-4 8 -8 10z" fill="#a855f7" opacity=".75"/>
<path d="M20 70 q-8 -10 -2 -22 q10 2 14 12" fill="#4ade80" stroke="${OL}" stroke-width="2.5"/>
<circle cx="30" cy="58" r="8" fill="#bbf7d0" stroke="${OL}" stroke-width="2.5"/><circle cx="32" cy="58" r="3" fill="${OL}"/><path d="M14 66 q6 4 12 2" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M40 76 l-2 8 M70 78 l2 6" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
<g transform="translate(36 22)"><path d="M-20 -10 h40 v16 h-24 l-6 6 v-6 h-10z" fill="#fff" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><text y="2" text-anchor="middle" font-size="9" font-weight="900" fill="#7c3aed">A ≒ B</text></g>`),

  // サウンドウェーブ・クラゲ（★★・リスニング）：音の波の形の足をゆらすクラゲ
  kurage: wrap2('kurage', '#e0e7ff', '#6366f1', `
<g fill="#fff" opacity=".5"><circle cx="20" cy="30" r="3"/><circle cx="98" cy="20" r="2"/><circle cx="104" cy="96" r="3"/></g>
<g fill="none" stroke-linecap="round"><path d="M40 62 q-6 10 0 20 t0 20 t0 20" stroke="${OL}" stroke-width="6"/><path d="M40 62 q-6 10 0 20 t0 20 t0 20" stroke="#c4b5fd" stroke-width="3"/>
<path d="M54 64 q6 8 0 16 t0 16 t0 16" stroke="${OL}" stroke-width="6"/><path d="M54 64 q6 8 0 16 t0 16 t0 16" stroke="#f0abfc" stroke-width="3"/>
<path d="M66 64 q-6 8 0 16 t0 16 t0 16" stroke="${OL}" stroke-width="6"/><path d="M66 64 q-6 8 0 16 t0 16 t0 16" stroke="#c4b5fd" stroke-width="3"/>
<path d="M80 62 q6 10 0 20 t0 20 t0 20" stroke="${OL}" stroke-width="6"/><path d="M80 62 q6 10 0 20 t0 20 t0 20" stroke="#f0abfc" stroke-width="3"/></g>
<path d="M26 62 q0 -40 34 -40 q34 0 34 40 q-8 6 -17 0 q-8 6 -17 0 q-8 6 -17 0 q-9 6 -17 0z" fill="#a78bfa" fill-opacity=".9" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M38 36 q10 -8 22 -8" stroke="#ede9fe" stroke-width="4" fill="none" stroke-linecap="round"/>
${cute(48, 10, 3.8)}${blush(55, 17)}<path d="M56 54 q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`),

  // 同時通訳オオカミ（★★★・リスニング）：ヘッドセットをつけ、月に向かって遠吠えするオオカミ
  ookami: wrap('ookami', '#e0e7ff', '#1e1b4b', `
<circle cx="92" cy="26" r="14" fill="#fef9c3" stroke="#fde047" stroke-width="2"/><circle cx="88" cy="22" r="3" fill="#fde68a"/><circle cx="96" cy="30" r="2" fill="#fde68a"/>
<path d="M20 116 l8 -26 l-10 4 l8 -16 l-10 2 l14 -14 h60 l14 14 l-10 -2 l8 16 l-10 -4 l8 26z" fill="#475569" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M32 44 l-4 -30 l20 18z M88 44 l4 -30 l-20 18z" fill="#64748b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M33 36 l-2 -14 l10 9z M87 36 l2 -14 l-10 9z" fill="#cbd5e1"/>
<path d="M26 56 q0 -26 34 -28 q34 2 34 28 q0 14 -8 22 l-12 14 q-14 8 -28 0 l-12 -14 q-8 -8 -8 -22z" fill="#94a3b8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M44 66 q16 -6 32 0 l-4 18 q-12 8 -24 0z" fill="#e2e8f0"/>
<path d="M30 64 l-8 6 l10 0 M90 64 l8 6 l-10 0" fill="#e2e8f0" stroke="${OL}" stroke-width="2"/>
<path d="M60 32 l-6 14 l6 -3 l6 3z" fill="#64748b"/>
${eyes(56, '#38bdf8')}
<path d="M54 70 h12 l-6 6z" fill="${OL}"/><path d="M60 76 v4 M60 80 q-6 4 -10 0 M60 80 q6 4 10 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M30 54 q0 -30 30 -32 q30 2 30 32" stroke="#0f172a" stroke-width="4.5" fill="none"/>
<rect x="20" y="50" width="12" height="18" rx="5" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/><rect x="88" y="50" width="12" height="18" rx="5" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/>
<path d="M26 68 q4 16 22 16" stroke="#0f172a" stroke-width="3" fill="none"/><circle cx="48" cy="84" r="3.5" fill="url(#gd-ookami)" stroke="${OL}" stroke-width="1.5"/>
<g fill="none" stroke="#a5b4fc" stroke-width="2.5" stroke-linecap="round"><path d="M104 60 q4 4 0 8 M110 56 q8 8 0 16"/></g>`),

  // 発音クジャク（★★★・リスニング）：羽を広げると目玉もようが発音記号になっているクジャク
  kujaku: wrap('kujaku', '#ccfbf1', '#0f766e', `
<g stroke="${OL}" stroke-width="2">${Array.from({ length: 9 }, (_, i) => { const a = (-160 + i * 17.5) * Math.PI / 180, x = 60 + Math.cos(a) * 46, y = 84 + Math.sin(a) * 46; return `<path d="M60 84 L${x.toFixed(1)} ${y.toFixed(1)}" stroke="#065f46" stroke-width="3"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="9" ry="11" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#14b8a6"/>`; }).join('')}</g>
<g font-family="serif" font-size="9" font-weight="900" text-anchor="middle">${['θ', 'ð', 'æ', 'ʃ', 'ə', 'ŋ', 'ʒ', 'ɔ', 'r'].map((t, i) => { const a = (-160 + i * 17.5) * Math.PI / 180, x = 60 + Math.cos(a) * 46, y = 84 + Math.sin(a) * 46; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="url(#gd-kujaku)" stroke="#1e3a8a" stroke-width="1.5"/><text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" fill="#1e3a8a">${t}</text>`; }).join('')}</g>
<path d="M48 116 q-4 -24 4 -40 q-6 -16 2 -30 q6 -8 12 -2 q6 8 0 20 q10 20 6 52z" fill="#1d4ed8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M56 42 l-4 -12 M60 40 v-14 M64 42 l4 -12" stroke="${OL}" stroke-width="1.5"/><g fill="url(#gd-kujaku)" stroke="${OL}" stroke-width="1"><circle cx="52" cy="29" r="2.5"/><circle cx="60" cy="25" r="2.5"/><circle cx="68" cy="29" r="2.5"/></g>
<path d="M54 50 l8 2 M56 55 q4 -3 8 1 q-4 3 -8 -1z" stroke="${OL}" stroke-width="2" fill="#fff" stroke-linecap="round"/><circle cx="60" cy="55" r="1.4" fill="${OL}"/>
<path d="M66 54 l8 2 l-7 3z" fill="#f59e0b" stroke="${OL}" stroke-width="1.5" stroke-linejoin="round"/>
<g fill="none" stroke="#5eead4" stroke-width="2" stroke-linecap="round"><path d="M80 56 q4 3 0 6 M86 52 q8 7 0 14"/></g>`),

  // スキミング・ハチ（★・リーディング）：ページの上をすいすい飛んで、大事なところだけ拾うハチ
  hachi: wrap1('hachi', '#fefce8', '#fde047', `
<g transform="translate(60 100)"><path d="M-40 -6 q20 -6 40 0 q20 -6 40 0 v18 q-20 -6 -40 0 q-20 -6 -40 0z" fill="#fff" stroke="${OL}" stroke-width="2.5"/><path d="M0 -6 v18" stroke="${OL}" stroke-width="2"/><path d="M-34 0 h26 M-34 6 h20 M6 0 h28 M6 6 h18" stroke="#cbd5e1" stroke-width="2"/><path d="M-30 0 h12 M10 6 h14" stroke="#fde047" stroke-width="4" opacity=".8"/></g>
<path d="M14 80 q20 -12 30 -28" stroke="#a16207" stroke-width="2" stroke-dasharray="3 5" fill="none"/>
<ellipse cx="46" cy="38" rx="14" ry="9" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="2" transform="rotate(-25 46 38)"/><ellipse cx="72" cy="36" rx="14" ry="9" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="2" transform="rotate(25 72 36)"/>
<ellipse cx="62" cy="60" rx="24" ry="18" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<path d="M56 43 q-4 8 -2 34 M70 44 q-4 10 -2 32" stroke="${OL}" stroke-width="5" fill="none"/>
<path d="M86 60 l8 2 l-8 3z" fill="${OL}"/>
<circle cx="44" cy="56" r="13" fill="#facc15" stroke="${OL}" stroke-width="3"/>
${'<circle cx="39" cy="54" r="3" fill="#1f2937"/><circle cx="49" cy="54" r="3" fill="#1f2937"/><circle cx="40" cy="53" r="1" fill="#fff"/><circle cx="50" cy="53" r="1" fill="#fff"/>'}<path d="M41 61 q3 2 6 0" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M40 44 q-4 -10 -10 -12 M48 44 q2 -10 8 -12" stroke="${OL}" stroke-width="2" fill="none"/><circle cx="30" cy="32" r="2.5" fill="${OL}"/><circle cx="56" cy="32" r="2.5" fill="${OL}"/>`),

  // スキャニング・ハリネズミ（★・リーディング）：虫めがねで数字や名前をさがすハリネズミ
  harine: wrap1('harine', '#fef3c7', '#fdba74', `
<path d="M24 92 q-6 -18 2 -32 l-8 -4 l10 -4 l-6 -10 l12 2 l-2 -12 l10 6 l2 -12 l8 10 l6 -10 l4 12 l10 -6 l-2 12 l12 -2 l-6 10 l10 4 l-8 4 q8 14 2 32z" fill="#92400e" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 92 q-4 -14 4 -24 q12 -10 26 -10 q14 0 24 10 q8 10 4 24z" fill="#fde68a" stroke="${OL}" stroke-width="2.5"/>
${cute(74, 11, 3.8)}${blush(82, 18)}<ellipse cx="60" cy="82" rx="4" ry="3" fill="${OL}"/><path d="M57 87 q3 2 6 0" stroke="${OL}" stroke-width="1.8" fill="none"/>
<g transform="translate(92 96) rotate(-35)"><path d="M0 9 v14" stroke="#92400e" stroke-width="5" stroke-linecap="round"/><circle r="12" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="3"/><text y="4" text-anchor="middle" font-size="10" font-weight="900" fill="#1d4ed8">$5</text></g>
<ellipse cx="44" cy="104" rx="7" ry="4" fill="#fde68a" stroke="${OL}" stroke-width="2"/><ellipse cx="72" cy="104" rx="7" ry="4" fill="#fde68a" stroke="${OL}" stroke-width="2"/>`),

  // 単語帳ハムスター（★・リーディング）：単語カードの輪っかを抱え、ほおに単語をためこむハムスター
  hamu: wrap1('hamu', '#fff7ed', '#fed7aa', `
<circle cx="38" cy="38" r="9" fill="#fdba74" stroke="${OL}" stroke-width="2.5"/><circle cx="82" cy="38" r="9" fill="#fdba74" stroke="${OL}" stroke-width="2.5"/>
<ellipse cx="60" cy="70" rx="36" ry="34" fill="#fdba74" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="80" rx="22" ry="22" fill="#fff7ed"/>
<ellipse cx="32" cy="70" rx="12" ry="11" fill="#fff7ed" stroke="${OL}" stroke-width="2"/><ellipse cx="88" cy="70" rx="12" ry="11" fill="#fff7ed" stroke="${OL}" stroke-width="2"/>
${cute(56, 11, 3.6)}<ellipse cx="60" cy="64" rx="2.6" ry="2" fill="#f472b6"/><path d="M57 67 q3 3 6 0" stroke="${OL}" stroke-width="1.6" fill="none"/>
<g transform="translate(60 94)"><circle cx="-14" cy="-10" r="4" fill="none" stroke="#94a3b8" stroke-width="2.5"/><rect x="-20" y="-8" width="40" height="22" rx="3" fill="#fff" stroke="${OL}" stroke-width="2"/><rect x="-18" y="-5" width="40" height="20" rx="3" fill="#bfdbfe" stroke="${OL}" stroke-width="2"/><text x="2" y="8" text-anchor="middle" font-size="9" font-weight="900" fill="#1e3a8a">word</text></g>
<ellipse cx="38" cy="96" rx="6" ry="5" fill="#fdba74" stroke="${OL}" stroke-width="2"/><ellipse cx="82" cy="96" rx="6" ry="5" fill="#fdba74" stroke="${OL}" stroke-width="2"/>`),

  // 文法ゴリラ（★★・リーディング）：分厚い文法書を盾のように構えるゴリラ
  gorira: wrap2('gorira', '#e2e8f0', '#475569', `
<path d="M14 116 q-4 -30 18 -40 q10 -4 18 2 q10 -6 20 0 q8 -6 18 -2 q22 10 18 40z" fill="#334155" stroke="${OL}" stroke-width="3"/>
<circle cx="30" cy="54" r="9" fill="#334155" stroke="${OL}" stroke-width="2.5"/><circle cx="90" cy="54" r="9" fill="#334155" stroke="${OL}" stroke-width="2.5"/>
<path d="M32 52 q0 -32 28 -32 q28 0 28 32 q0 24 -28 26 q-28 -2 -28 -26z" fill="#334155" stroke="${OL}" stroke-width="3"/>
<path d="M40 46 q20 -10 40 0 q2 10 -4 14 q8 6 4 14 q-16 8 -36 0 q-4 -8 4 -14 q-6 -4 -8 -14z" fill="#94a3b8" stroke="${OL}" stroke-width="2"/>
<path d="M42 44 q8 -6 14 0 M78 44 q-8 -6 -14 0" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>${cute(50, 10, 3.4)}
<ellipse cx="56" cy="60" rx="2.5" ry="2" fill="${OL}"/><ellipse cx="64" cy="60" rx="2.5" ry="2" fill="${OL}"/><path d="M52 68 q8 4 16 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<g transform="translate(60 98)"><rect x="-26" y="-14" width="52" height="28" rx="3" fill="#b91c1c" stroke="${OL}" stroke-width="2.5"/><rect x="-22" y="-10" width="44" height="20" rx="2" fill="none" stroke="#fde68a" stroke-width="1.5"/><text y="4.5" text-anchor="middle" font-size="12" font-weight="900" fill="#fde68a">文法</text></g>
<ellipse cx="34" cy="98" rx="9" ry="8" fill="#475569" stroke="${OL}" stroke-width="2.5"/><ellipse cx="86" cy="98" rx="9" ry="8" fill="#475569" stroke="${OL}" stroke-width="2.5"/>`),

  // 品詞ヒツジ（★★・リーディング）：ふわふわの毛に n. v. adj. adv. の札がついたヒツジ
  hitsuji: wrap2('hitsuji', '#f0fdf4', '#86efac', `
<g fill="#fff" stroke="${OL}" stroke-width="2.5">${[[32, 54], [48, 40], [66, 38], [84, 48], [92, 66], [86, 84], [68, 92], [48, 92], [30, 84], [24, 68]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13"/>`).join('')}</g>
<ellipse cx="58" cy="66" rx="32" ry="26" fill="#fff"/>
<path d="M40 96 v14 M54 98 v14 M66 98 v14 M80 96 v14" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="58" cy="66" rx="14" ry="16" fill="#334155" stroke="${OL}" stroke-width="2.5"/>
<path d="M44 58 q-10 -2 -12 6 q6 4 12 0z M72 58 q10 -2 12 6 q-6 4 -12 0z" fill="#334155" stroke="${OL}" stroke-width="2"/>
<circle cx="53" cy="64" r="3" fill="#fff"/><circle cx="63" cy="64" r="3" fill="#fff"/><circle cx="53.5" cy="64.5" r="1.6" fill="${OL}"/><circle cx="63.5" cy="64.5" r="1.6" fill="${OL}"/>
<path d="M55 74 q3 2 6 0" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<g font-size="7" font-weight="900" text-anchor="middle" stroke="${OL}" stroke-width="1.5">${[[30, 46, 'n.', '#fde047'], [88, 42, 'v.', '#93c5fd'], [96, 76, 'adj.', '#f9a8d4'], [22, 82, 'adv.', '#86efac']].map(([x, y, t, c]) => `<rect x="${x - 9}" y="${y - 6}" width="18" height="11" rx="2" fill="${c}"/><text x="${x}" y="${y + 2}" fill="${OL}" stroke="none">${t}</text>`).join('')}</g>`),

  // 長文キリン（★★・リーディング）：長い首で、長い長い文章の巻物を上から読むキリン
  kirin: wrap2('kirin', '#fef9c3', '#eab308', `
<g transform="translate(28 40)"><rect x="-14" y="0" width="28" height="70" fill="#fff" stroke="${OL}" stroke-width="2.5"/><rect x="-16" y="-4" width="32" height="7" rx="3" fill="#a16207" stroke="${OL}" stroke-width="2"/><rect x="-16" y="68" width="32" height="7" rx="3" fill="#a16207" stroke="${OL}" stroke-width="2"/><path d="M-10 10 h20 M-10 16 h16 M-10 22 h20 M-10 28 h12 M-10 34 h20 M-10 40 h18 M-10 46 h20 M-10 52 h14 M-10 58 h20" stroke="#94a3b8" stroke-width="1.8"/></g>
<path d="M66 116 v-60 q0 -10 8 -10 h6 q8 0 8 10 v60z" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<g fill="#b45309"><rect x="70" y="64" width="9" height="8" rx="2"/><rect x="78" y="82" width="8" height="9" rx="2"/><rect x="69" y="98" width="9" height="8" rx="2"/><rect x="80" y="104" width="6" height="8" rx="2"/></g>
<path d="M60 28 l-4 -12 M76 28 l4 -12" stroke="${OL}" stroke-width="3"/><circle cx="56" cy="15" r="3.5" fill="#a16207" stroke="${OL}" stroke-width="2"/><circle cx="80" cy="15" r="3.5" fill="#a16207" stroke="${OL}" stroke-width="2"/>
<path d="M50 30 q2 -8 18 -8 q16 0 18 8 q2 16 -4 22 q-8 6 -24 0 q-10 -6 -8 -22z" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<path d="M48 42 q-4 0 -6 4 q4 4 8 2" fill="#fde68a" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="36" r="3.2" fill="${OL}"/><circle cx="74" cy="36" r="3.2" fill="${OL}"/><circle cx="61" cy="35" r="1.1" fill="#fff"/><circle cx="75" cy="35" r="1.1" fill="#fff"/>
<ellipse cx="68" cy="48" rx="9" ry="5" fill="#fde68a" stroke="${OL}" stroke-width="2"/><circle cx="65" cy="47" r="1.3" fill="${OL}"/><circle cx="71" cy="47" r="1.3" fill="${OL}"/>`),

  // 速読チーター（★★★・リーディング）：本を背に、光の線を引いて全力で走るチーター
  chita: wrap('chita', '#fef3c7', '#b45309', `
<g stroke="#fff7ed" stroke-width="3.5" stroke-linecap="round" opacity=".9"><path d="M0 40 h24 M0 54 h16 M2 72 h20 M0 88 h26 M96 40 h24 M104 54 h16 M98 72 h22 M94 88 h26"/></g>
<path d="M36 40 l-4 -14 l14 6z M84 40 l4 -14 l-14 6z" fill="#fbbf24" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M37 34 l-1 -5 l5 2z M83 34 l1 -5 l-5 2z" fill="${OL}"/>
<path d="M30 116 q2 -26 30 -30 q28 4 30 30z" fill="#fbbf24" stroke="${OL}" stroke-width="3"/>
<g fill="${OL}"><circle cx="44" cy="102" r="2.5"/><circle cx="56" cy="108" r="2.5"/><circle cx="70" cy="100" r="2.5"/><circle cx="78" cy="110" r="2.5"/></g>
<path d="M30 58 q0 -28 30 -28 q30 0 30 28 q0 22 -30 28 q-30 -6 -30 -28z" fill="#fbbf24" stroke="${OL}" stroke-width="3"/>
<path d="M44 66 q16 -4 32 0 q-2 16 -16 18 q-14 -2 -16 -18z" fill="#fff7ed"/>
<g fill="${OL}">${[[40, 42], [50, 38], [70, 38], [80, 42], [36, 52], [84, 52], [60, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join('')}</g>
${eyes(56, '#d97706')}
<path d="M48 60 q-4 8 -2 16 M72 60 q4 8 2 16" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M55 68 h10 l-5 5z" fill="${OL}"/><path d="M60 73 v3 M60 76 q-5 4 -9 0 M60 76 q5 4 9 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<g transform="translate(92 98) rotate(-14)"><path d="M-12 -8 h24 v16 h-24z" fill="#1d4ed8" stroke="${OL}" stroke-width="2"/><path d="M0 -8 v16" stroke="#bfdbfe" stroke-width="1.5"/><path d="M-9 -3 h7 M-9 1 h7 M3 -3 h7 M3 1 h7" stroke="#bfdbfe" stroke-width="1.2"/></g>`),

  // 語彙ライオン（★★★・リーディング）：たてがみが単語の文字でできたライオン。大きく吠える
  raion: wrap('raion', '#fef3c7', '#9a3412', `
<g font-family="serif" font-weight="900" font-size="9" fill="#7c2d12" text-anchor="middle">${['abc', 'vow', 'lex', 'syn', 'ant', 'def', 'idm', 'pre', 'suf', 'etc'].map((t, i) => { const a = i / 10 * Math.PI * 2, x = 60 + Math.cos(a) * 42, y = 58 + Math.sin(a) * 40; return `<text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}">${t}</text>`; }).join('')}</g>
<path d="M60 14 l8 10 l12 -4 l2 12 l12 2 l-4 12 l10 8 l-10 8 l4 12 l-12 2 l-2 12 l-12 -4 l-8 10 l-8 -10 l-12 4 l-2 -12 l-12 -2 l4 -12 l-10 -8 l10 -8 l-4 -12 l12 -2 l2 -12 l12 4z" fill="#ea580c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="60" cy="58" r="24" fill="#fbbf24" stroke="${OL}" stroke-width="3"/>
<circle cx="42" cy="38" r="6" fill="#fbbf24" stroke="${OL}" stroke-width="2.5"/><circle cx="78" cy="38" r="6" fill="#fbbf24" stroke="${OL}" stroke-width="2.5"/>
${eyes(52, '#b45309')}
<path d="M54 60 h12 l-6 6z" fill="${OL}"/>
<path d="M48 68 q12 -4 24 0 q-2 12 -12 12 q-10 0 -12 -12z" fill="#7f1d1d" stroke="${OL}" stroke-width="2.5"/><path d="M50 68 l3 5 l3 -4 M64 68 l3 4 l3 -5" fill="#fff" stroke="${OL}" stroke-width="1"/>
<g fill="none" stroke="url(#gd-raion)" stroke-width="3" stroke-linecap="round"><path d="M80 98 q8 4 14 -2 M76 106 q12 6 22 -4 M72 114 q16 6 30 -6"/></g>
<path d="M40 116 q2 -16 20 -18 q18 2 20 18z" fill="#ea580c" stroke="${OL}" stroke-width="2.5"/>`),
});

// ----- 免許の仲間 -----
Object.assign(CHAR_ART, {
  // ひよこドライバー（★・免許）：若葉マークをつけた小さな車にのるひよこ
  hiyoko: wrap1('hiyoko', '#f0f9ff', '#bae6fd', `
<path d="M0 104 h120 v16 h-120z" fill="#94a3b8"/><path d="M8 110 h14 M36 110 h14 M64 110 h14 M92 110 h14" stroke="#fff" stroke-width="2.5"/>
<ellipse cx="60" cy="48" rx="20" ry="18" fill="#fde047" stroke="${OL}" stroke-width="3"/>
<path d="M58 30 q-2 -8 4 -10 q-1 5 3 6" fill="#fde047" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
${cute(46, 8, 3.4)}${blush(52, 14)}<path d="M56 52 l4 4 l4 -4z" fill="#fb923c" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M18 92 q0 -20 18 -24 h48 q18 4 18 24 v8 h-84z" fill="#f43f5e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M36 68 q4 -6 12 -6 h24 q8 0 12 6z" fill="#bae6fd" stroke="${OL}" stroke-width="2.5"/>
<circle cx="36" cy="100" r="9" fill="#1f2937" stroke="${OL}" stroke-width="2"/><circle cx="36" cy="100" r="3.5" fill="#cbd5e1"/><circle cx="84" cy="100" r="9" fill="#1f2937" stroke="${OL}" stroke-width="2"/><circle cx="84" cy="100" r="3.5" fill="#cbd5e1"/>
<circle cx="98" cy="84" r="3" fill="#fde047" stroke="${OL}" stroke-width="1.5"/>
<g transform="translate(56 84)"><path d="M0 -8 l-8 4 v10 l8 -4z" fill="#facc15" stroke="${OL}" stroke-width="1.5"/><path d="M0 -8 l8 4 v10 l-8 -4z" fill="#22c55e" stroke="${OL}" stroke-width="1.5"/></g>`),

  // シグナル・ロブスター（★・免許）：赤信号でストップ！のハサミをかかげるロブスター
  ebi: wrap1('ebi', '#fff1f2', '#fecaca', `
<g transform="translate(86 34)"><rect x="-9" y="-22" width="18" height="44" rx="5" fill="#1f2937" stroke="${OL}" stroke-width="2"/><circle cy="-12" r="5.5" fill="#ef4444"/><circle cy="-12" r="8" fill="#ef4444" opacity=".25"/><circle cy="0" r="5" fill="#57534e"/><circle cy="12" r="5" fill="#57534e"/><path d="M0 22 v24" stroke="#64748b" stroke-width="4"/></g>
<path d="M24 54 q-10 -16 0 -30 q10 2 10 14 l-4 2 q4 6 2 14z" fill="#f87171" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 24 l-6 -8 M30 26 l2 -10" stroke="${OL}" stroke-width="2" fill="none"/>
<path d="M66 56 q8 -14 0 -26 q-10 2 -10 12 l4 2 q-4 6 -2 12z" fill="#f87171" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 62 q30 -10 40 0 q6 22 -4 40 q-6 10 -14 10 q-8 0 -12 -6 q-14 -20 -10 -44z" fill="#ef4444" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M38 80 q12 4 24 0 M40 92 q10 4 20 0" stroke="#b91c1c" stroke-width="2" fill="none"/>
<path d="M44 112 l-6 6 h24 l-6 -6" fill="#ef4444" stroke="${OL}" stroke-width="2.5"/>
<path d="M42 62 l-6 -14 M58 62 l6 -14" stroke="${OL}" stroke-width="2"/><circle cx="36" cy="46" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="64" cy="46" r="4" fill="#fff" stroke="${OL}" stroke-width="2"/><circle cx="36" cy="46" r="2" fill="${OL}"/><circle cx="64" cy="46" r="2" fill="${OL}"/>
<path d="M44 70 q6 4 12 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M36 64 q-14 -2 -20 6 M64 64 q14 -2 20 6" stroke="${OL}" stroke-width="1.5" fill="none"/>`),

  // 合流カモ（★・免許）：子ガモを連れて、ゆずりあいながら合流するカモ
  kamo: wrap1('kamo', '#ecfeff', '#a5f3fc', `
<path d="M0 98 h120 v22 h-120z" fill="#94a3b8"/><path d="M0 98 l60 -20 h60" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="8 6"/>
<path d="M96 44 l10 6 l-10 6 v-4 h-12 v-4 h12z" fill="#22c55e" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M30 80 l-12 -10 l14 2z" fill="#78350f" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M28 84 q0 -16 20 -18 h20 q18 2 18 18 q-2 12 -20 12 h-28 q-10 0 -10 -12z" fill="#a16207" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M40 80 q12 -8 26 0 q-12 6 -26 0z" fill="#78350f" stroke="${OL}" stroke-width="2"/><path d="M44 96 v6 M62 96 v6" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>
<path d="M48 54 q10 -10 22 -4 q6 4 4 12 q-4 6 -14 6 q-10 -2 -12 -14z" fill="#16a34a" stroke="${OL}" stroke-width="2.5"/>
<path d="M50 66 q10 4 22 0" stroke="#fff" stroke-width="3"/>
<path d="M74 56 l10 2 l-10 4z" fill="#facc15" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<circle cx="64" cy="55" r="3" fill="${OL}"/><circle cx="65" cy="54" r="1" fill="#fff"/>

<g transform="translate(96 88)"><ellipse rx="9" ry="7" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="2" cy="-8" r="5.5" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="3" cy="-9" r="1.4" fill="${OL}"/><path d="M7 -8 l4 1 l-4 2z" fill="#fb923c"/></g>
<g transform="translate(14 88)"><ellipse rx="8" ry="6" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="2" cy="-7" r="5" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="3" cy="-8" r="1.3" fill="${OL}"/><path d="M7 -7 l4 1 l-4 2z" fill="#fb923c"/></g>`),

  // 白線ドッグ（★★・免許）：白い線の上をまっすぐ走る、白黒もようのイヌ
  hakusen: wrap2('hakusen', '#e0f2fe', '#475569', `
<path d="M0 82 l120 -10 v48 h-120z" fill="#64748b"/><path d="M0 100 l120 -10" stroke="#fff" stroke-width="5"/><path d="M0 116 l120 -10" stroke="#fde047" stroke-width="3" stroke-dasharray="12 8"/>
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M4 40 h18 M2 52 h14"/></g>
<path d="M28 64 q-14 -4 -16 -16" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M28 64 q-14 -4 -16 -16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M32 76 l-10 16 l6 2 l12 -14 M72 76 l12 14 l-5 4 l-14 -12" fill="#fff" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M26 66 q4 -16 26 -16 h24 q8 0 10 8 l-6 18 h-48 q-8 -2 -6 -10z" fill="#fff" stroke="${OL}" stroke-width="3"/>
<path d="M40 54 q8 -2 10 6 q-4 8 -12 4z" fill="${OL}"/><circle cx="62" cy="68" r="5" fill="${OL}"/>
<path d="M44 76 l-6 18 l6 2 l8 -18 M62 76 l6 18 l-6 2 l-6 -18" fill="#fff" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M76 46 q2 -16 18 -16 q14 0 16 14 q0 12 -12 14 h-10 q-12 0 -12 -12z" fill="#fff" stroke="${OL}" stroke-width="3"/>
<path d="M84 30 q-10 -2 -12 10 q6 6 10 2z" fill="${OL}"/><path d="M102 32 q8 4 6 14 q-6 0 -8 -6z" fill="${OL}"/>
<circle cx="92" cy="42" r="3" fill="${OL}"/><circle cx="93" cy="41" r="1" fill="#fff"/><ellipse cx="108" cy="50" rx="3.5" ry="2.6" fill="${OL}"/><path d="M98 56 q4 4 8 0" stroke="${OL}" stroke-width="1.8" fill="none"/>
<path d="M84 56 q8 6 16 4" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  // 雪道シロクマ（★★・免許）：スタッドレスタイヤを抱えて雪道を歩くシロクマ
  shirokuma: wrap2('shirokuma', '#f0f9ff', '#7dd3fc', `
<g fill="#fff"><circle cx="20" cy="30" r="2.5"/><circle cx="98" cy="22" r="2"/><circle cx="104" cy="56" r="2.6"/><circle cx="14" cy="66" r="1.8"/><circle cx="34" cy="16" r="1.8"/></g>
<path d="M0 104 q30 -8 60 0 t60 0 v16 h-120z" fill="#fff" stroke="${OL}" stroke-width="2"/>
<circle cx="36" cy="34" r="9" fill="#f8fafc" stroke="${OL}" stroke-width="2.5"/><circle cx="84" cy="34" r="9" fill="#f8fafc" stroke="${OL}" stroke-width="2.5"/>
<path d="M24 116 q-2 -30 36 -34 q38 4 36 34z" fill="#f8fafc" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="54" r="26" fill="#f8fafc" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="64" rx="12" ry="9" fill="#e2e8f0" stroke="${OL}" stroke-width="1.5"/>
${cute(50, 10, 3.6)}<ellipse cx="60" cy="60" rx="4" ry="3" fill="${OL}"/><path d="M56 66 q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none"/>
<g transform="translate(60 98)"><circle r="16" fill="#1f2937" stroke="${OL}" stroke-width="2.5"/><circle r="7" fill="#94a3b8" stroke="${OL}" stroke-width="2"/><g fill="#cbd5e1">${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<circle cx="${(Math.cos(a) * 12).toFixed(1)}" cy="${(Math.sin(a) * 12).toFixed(1)}" r="1.4"/>`; }).join('')}</g></g>
<ellipse cx="40" cy="96" rx="8" ry="7" fill="#f8fafc" stroke="${OL}" stroke-width="2.5"/><ellipse cx="80" cy="96" rx="8" ry="7" fill="#f8fafc" stroke="${OL}" stroke-width="2.5"/>`),

  // 馬力ウマ（★★・免許）：エンジンの力を表すメーターをつけた、たてがみのなびくウマ
  uma: wrap2('uma', '#fef3c7', '#b45309', `
<g transform="translate(88 92)"><path d="M-18 6 a18 18 0 0 1 36 0" fill="#1f2937" stroke="${OL}" stroke-width="2.5"/><path d="M-13 4 a13 13 0 0 1 26 0" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2"/><path d="M0 6 l10 -10" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/><circle cy="6" r="2.5" fill="#fff"/><text y="16" text-anchor="middle" font-size="7" font-weight="900" fill="#78350f">HP</text></g>
<path d="M30 116 q-6 -30 6 -50 l20 6 q-10 20 -4 44z" fill="#92400e" stroke="${OL}" stroke-width="3"/>
<path d="M36 70 q-4 -30 18 -44 q22 -10 34 6 q8 12 10 28 q2 10 -8 12 q-8 2 -14 -4 q-10 4 -16 -2 q-8 10 -24 4z" fill="#b45309" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M54 24 l-2 -12 l10 8z" fill="#b45309" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M50 26 q-24 2 -28 26 q-2 16 4 36 q6 -10 8 -22 q6 4 8 -10 q4 6 8 -2 q2 -14 0 -28z" fill="#1f2937" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="92" cy="60" rx="8" ry="6" fill="#d97706" stroke="${OL}" stroke-width="2"/><ellipse cx="94" cy="58" rx="2" ry="1.5" fill="${OL}"/>
<path d="M64 38 l10 3 M66 44 q4 -3 8 0 q-4 3 -8 0z" stroke="${OL}" stroke-width="2.3" fill="#fff" stroke-linecap="round"/><circle cx="70" cy="44" r="1.6" fill="${OL}"/>
<path d="M60 52 q8 6 14 4" stroke="#78350f" stroke-width="2" fill="none"/>`),

  // ブレーキ・バイソン（★★★・免許）：角を前に向けて踏んばるバイソン。後ろにブレーキの火花
  bison: wrap('bison', '#fee2e2', '#7f1d1d', `
<g stroke="#fde047" stroke-width="2.5" stroke-linecap="round"><path d="M14 104 l-8 -6 M18 110 l-10 0 M100 104 l8 -6 M102 110 l10 0"/></g>
<path d="M0 112 h120 v8 h-120z" fill="#334155"/>
<path d="M20 112 q-4 -22 10 -30 h60 q14 8 10 30z" fill="#451a03" stroke="${OL}" stroke-width="3"/>
<path d="M22 52 q-14 -4 -16 -18 q8 6 18 4 M98 52 q14 -4 16 -18 q-8 6 -18 4" fill="#f5f5f4" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M18 52 q0 -30 42 -32 q42 2 42 32 q-4 14 -12 18 l-6 18 q-24 12 -48 0 l-6 -18 q-8 -4 -12 -18z" fill="#78350f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 40 q8 -16 32 -18 q24 2 32 18 q-10 -6 -16 -4 l-6 -6 l-4 6 l-6 -8 l-6 8 l-4 -6 l-6 6 q-6 -2 -16 4z" fill="#451a03" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
${eyes(52, '#ef4444')}
<path d="M44 70 q16 -6 32 0 q2 12 -16 16 q-18 -4 -16 -16z" fill="#57534e" stroke="${OL}" stroke-width="2.5"/>
<ellipse cx="53" cy="74" rx="3" ry="2.4" fill="${OL}"/><ellipse cx="67" cy="74" rx="3" ry="2.4" fill="${OL}"/>
<circle cx="60" cy="84" r="4" fill="none" stroke="url(#gd-bison)" stroke-width="2.5"/>
<path d="M48 88 q12 8 24 0 q-4 14 -12 16 q-8 -2 -12 -16z" fill="#451a03" stroke="${OL}" stroke-width="2"/>`),
});
