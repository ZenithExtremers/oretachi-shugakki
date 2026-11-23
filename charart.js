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
