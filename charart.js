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
