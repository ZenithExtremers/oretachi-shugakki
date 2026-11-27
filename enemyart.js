// 冒険の敵（バグ）のオリジナルイラスト（SVG）。すべてオリジナル。キーは「科目|敵の名前」
// ゆるコワ：雑魚はちょっと憎めないバグのモンスター、ボスは強そうでこわい。仲間と同じ黒い縁取り
// 枠はつけず、足もとに影。レアは金の光、ボスは角やオーラ。絵がない敵は今までどおり絵文字
const OL = '#1f2937';
const sprite = (id, body, { aura = '', shadow = true } = {}) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="rp-art en">
<defs><radialGradient id="ea-${id}" cx="50%" cy="55%" r="50%"><stop offset="0" stop-color="${aura || '#fff'}" stop-opacity="${aura ? '.55' : '0'}"/><stop offset="1" stop-color="${aura || '#fff'}" stop-opacity="0"/></radialGradient>
<linearGradient id="eg-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#b7791f"/></linearGradient></defs>
${aura ? `<circle cx="60" cy="62" r="58" fill="url(#ea-${id})"/>` : ''}${shadow ? '<ellipse cx="60" cy="110" rx="34" ry="6" fill="#000" opacity=".22"/>' : ''}
${body}</svg>`;
// ゆるコワの目：つり上がった半目（いたずらっぽい）
const evil = (y = 50, dx = 12, col = '#fde047') => `<path d="M${60 - dx - 7} ${y - 2} q7 -3 13 2 q-6 5 -13 -2z" fill="${col}" stroke="${OL}" stroke-width="2"/><path d="M${60 + dx + 7} ${y - 2} q-7 -3 -13 2 q6 5 13 -2z" fill="${col}" stroke="${OL}" stroke-width="2"/>
<circle cx="${60 - dx}" cy="${y}" r="1.8" fill="${OL}"/><circle cx="${60 + dx}" cy="${y}" r="1.8" fill="${OL}"/><path d="M${60 - dx - 8} ${y - 7} l12 4 M${60 + dx + 8} ${y - 7} l-12 4" stroke="${OL}" stroke-width="2.6" stroke-linecap="round"/>`;
// ギザギザの歯の口
const grin = (y = 66, w = 14) => `<path d="M${60 - w} ${y} q${w} ${w * 0.7} ${w * 2} 0 q-${w} ${w * 0.25} -${w * 2} 0z" fill="#7f1d1d" stroke="${OL}" stroke-width="2"/><path d="M${60 - w + 3} ${y + 1} l3 4 l3 -3 l3 4 l3 -3 l3 4 l3 -3 l3 4 l3 -4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>`;

export const ENEMY_ART = {
  // オフバイワン：足が1本だけ多い（ずれている）イモムシのバグ。体の節に 0 1 2 … の番号
  'ccpp|オフバイワン': sprite('offby1', `
<g fill="#86efac" stroke="${OL}" stroke-width="2.5">${[[22, 84], [38, 80], [54, 78], [70, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12"/>`).join('')}</g>
<g font-family="monospace" font-size="8" font-weight="900" fill="#14532d" text-anchor="middle">${[[22, 87, '0'], [38, 83, '1'], [54, 81, '2'], [70, 83, '3']].map(([x, y, t]) => `<text x="${x}" y="${y}">${t}</text>`).join('')}</g>
<g stroke="${OL}" stroke-width="2.5" stroke-linecap="round"><path d="M18 94 v8 M34 92 v8 M50 90 v8 M66 92 v8 M80 92 l6 8"/></g>
<path d="M84 94 l10 8" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/><text x="100" y="108" font-size="8" font-weight="900" fill="#ef4444">+1</text>
<circle cx="88" cy="66" r="18" fill="#4ade80" stroke="${OL}" stroke-width="3"/>
<path d="M82 50 q-4 -10 -10 -12 M94 50 q4 -10 10 -12" stroke="${OL}" stroke-width="2.5" fill="none"/><circle cx="72" cy="38" r="3" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/><circle cx="104" cy="38" r="3" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/>
<path d="M76 62 q5 -3 9 1 q-5 3 -9 -1z M100 62 q-5 -3 -9 1 q5 3 9 -1z" fill="#fde047" stroke="${OL}" stroke-width="1.6"/><circle cx="81" cy="62" r="1.4" fill="${OL}"/><circle cx="95" cy="62" r="1.4" fill="${OL}"/><path d="M74 56 l9 3 M102 56 l-9 3" stroke="${OL}" stroke-width="2.2" stroke-linecap="round"/>
<path d="M80 72 q8 6 16 0 q-8 2 -16 0z" fill="#7f1d1d" stroke="${OL}" stroke-width="1.8"/>`),

  // ゴールデンバグ（レア）：金色にかがやく甲虫。たおすとコインがたくさん
  'ccpp|ゴールデンバグ': sprite('goldbug', `
<g fill="#fde68a"><path d="M18 30 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z"/><path d="M100 22 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z"/><path d="M104 88 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2z"/></g>
<g stroke="${OL}" stroke-width="3" stroke-linecap="round"><path d="M36 64 l-14 -6 M34 78 l-16 2 M38 92 l-12 10 M84 64 l14 -6 M86 78 l16 2 M82 92 l12 10"/></g>
<ellipse cx="60" cy="78" rx="28" ry="26" fill="url(#eg-goldbug)" stroke="${OL}" stroke-width="3"/>
<path d="M60 54 v50" stroke="#92400e" stroke-width="2.5"/><path d="M42 66 q6 -10 14 -10" stroke="#fffbeb" stroke-width="4" fill="none" stroke-linecap="round"/>
<g fill="#b45309"><circle cx="46" cy="84" r="4"/><circle cx="74" cy="84" r="4"/><circle cx="50" cy="96" r="3"/><circle cx="70" cy="96" r="3"/></g>
<ellipse cx="60" cy="50" rx="16" ry="12" fill="#b45309" stroke="${OL}" stroke-width="2.5"/>
<path d="M52 40 q-6 -12 -14 -14 M68 40 q6 -12 14 -14" stroke="${OL}" stroke-width="2.5" fill="none"/>
<path d="M50 49 q4 -3 8 1 q-4 3 -8 -1z M70 49 q-4 -3 -8 1 q4 3 8 -1z" fill="#fff" stroke="${OL}" stroke-width="1.5"/><circle cx="54" cy="49" r="1.4" fill="${OL}"/><circle cx="66" cy="49" r="1.4" fill="${OL}"/>
<path d="M54 56 q6 3 12 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>`, { aura: '#fde047' }),

  // ビルド待ち（ステージ専用）：砂時計のモンスター。ビルドが終わるまで動けない…と思わせて動く
  'ccpp|ビルド待ち': sprite('buildwait', `
<rect x="30" y="18" width="60" height="10" rx="3" fill="#92400e" stroke="${OL}" stroke-width="2.5"/><rect x="30" y="94" width="60" height="10" rx="3" fill="#92400e" stroke="${OL}" stroke-width="2.5"/>
<path d="M36 28 h48 q0 24 -18 33 q18 9 18 33 h-48 q0 -24 18 -33 q-18 -9 -18 -33z" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="3"/>
<path d="M42 32 h36 q-2 14 -18 22 q-16 -8 -18 -22z" fill="#fcd34d"/><path d="M60 58 v18" stroke="#fcd34d" stroke-width="2" stroke-dasharray="2 3"/><path d="M42 94 q4 -12 18 -14 q14 2 18 14z" fill="#fcd34d"/>
${evil(42, 9, '#fff')}
<path d="M52 50 q8 4 16 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M30 60 q-12 0 -16 10 M90 60 q12 0 16 10" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<g transform="translate(100 34)"><circle r="9" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M-4 0 a4 4 0 1 1 1 3" fill="none" stroke="#0284c7" stroke-width="2"/></g>`),

  // コンパイルエラー大王（ボス）：赤いエラー文字のマントと、波線の王冠。手にエラーの巻物
  'ccpp|コンパイルエラー大王': sprite('compileking', `
<path d="M14 110 q4 -40 46 -48 q42 8 46 48z" fill="#991b1b" stroke="${OL}" stroke-width="3"/>
<g font-family="monospace" font-size="7" font-weight="900" fill="#fecaca" opacity=".9"><text x="28" y="96">error:</text><text x="64" y="102">expected ';'</text><text x="36" y="106">line 12</text></g>
<path d="M22 40 l-6 -20 l14 10 M98 40 l6 -20 l-14 10" fill="#7f1d1d" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="54" r="26" fill="#ef4444" stroke="${OL}" stroke-width="3"/>
<path d="M34 34 l6 -18 l10 12 l10 -16 l10 16 l10 -12 l6 18z" fill="url(#eg-compileking)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M38 26 q6 4 12 0 t12 0 t12 0 t8 0" stroke="#dc2626" stroke-width="2" fill="none"/>
${evil(50, 11, '#fde047')}
${grin(64, 13)}
<g transform="translate(100 74) rotate(16)"><rect x="-10" y="-16" width="20" height="30" rx="2" fill="#fef3c7" stroke="${OL}" stroke-width="2"/><path d="M-6 -10 h12 M-6 -5 h10 M-6 0 h12 M-6 5 h8" stroke="#dc2626" stroke-width="1.6"/><path d="M-8 -14 q2 4 0 8 M-8 -2 q2 4 0 8" stroke="#ef4444" stroke-width="1.6" fill="none"/></g>`, { aura: '#ef4444' }),

  // 切り捨てゴーレム（ボス）：小数点以下をけずり落とす岩の巨人。7/2 を 3 にする
  'ccpp|切り捨てゴーレム': sprite('truncgolem', `
<path d="M24 66 l-12 6 l-4 18 l12 4 l10 -14z M96 66 l12 6 l4 18 l-12 4 l-10 -14z" fill="#78716c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M30 108 l-2 -46 l8 -18 h48 l8 18 l-2 46z" fill="#a8a29e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M36 62 l12 4 l-4 12 M84 62 l-12 6 l6 10 M52 88 l10 -4 l8 8" stroke="#57534e" stroke-width="2" fill="none"/>
<path d="M40 44 l4 -22 h32 l4 22z" fill="#d6d3d1" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M46 34 h12 v5 h-12z M62 34 h12 v5 h-12z" fill="#22d3ee" stroke="${OL}" stroke-width="1.5"/><path d="M44 30 l14 3 M76 30 l-14 3" stroke="${OL}" stroke-width="2.4"/>
<path d="M52 44 h16" stroke="${OL}" stroke-width="2.5"/>
<g transform="translate(60 92)"><rect x="-18" y="-10" width="36" height="18" rx="3" fill="#44403c" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="10" font-weight="900" fill="#fde047" font-family="monospace">7/2=3</text></g>
<g fill="#d6d3d1" stroke="${OL}" stroke-width="1.5"><path d="M100 100 l6 -4 l4 6 l-6 3z"/><path d="M92 106 l4 -2 l2 4 l-4 2z"/><text x="104" y="94" font-size="9" font-weight="900" fill="#ef4444" stroke="none">.5</text></g>`, { aura: '#a8a29e' }),
};

// まるいスライム体（色・目・口をかえて使う）
const blob = (c, y = 70, rx = 30, ry = 26) => `<path d="M${60 - rx} ${y + ry * 0.6} q-2 -${ry * 1.6} ${rx} -${ry * 1.6} q${rx + 2} 0 ${rx} ${ry * 1.6} q-${rx} ${ry * 0.5} -${rx * 2} 0z" fill="${c}" stroke="${OL}" stroke-width="3"/>`;
const hl = (x, y, r = 10) => `<path d="M${x} ${y} q${r * 0.4} -${r} ${r * 1.2} -${r * 1.1}" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".7"/>`;

Object.assign(ENEMY_ART, {
  // ----- C/C++：どの回にも出る雑魚 -----
  // メモリリーク：からだから少しずつしずくがもれていくスライム
  'ccpp|メモリリーク': sprite('leak', `${blob('#60a5fa', 64, 28, 28)}${hl(42, 56)}
<path d="M58 98 q-4 6 0 10 q4 -4 0 -10z M74 100 q-3 5 0 8 q3 -3 0 -8z" fill="#60a5fa" stroke="${OL}" stroke-width="1.8"/><ellipse cx="66" cy="110" rx="12" ry="3" fill="#93c5fd" opacity=".8"/>
${evil(62, 10, '#e0f2fe')}<path d="M52 78 q8 -5 16 0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<g font-family="monospace" font-size="7" font-weight="900" fill="#1e3a8a"><text x="84" y="40">new</text><text x="16" y="44" fill="#ef4444">delete?</text></g>`),
  // 未初期化：中身がわからない「？」のつまった箱のモンスター
  'ccpp|未初期化': sprite('uninit', `
<path d="M30 54 l30 -14 l30 14 v40 l-30 14 l-30 -14z" fill="#c4b5fd" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M30 54 l30 14 l30 -14 M60 68 v40" stroke="${OL}" stroke-width="2.5" fill="none"/>
<path d="M30 54 l-6 -16 l30 -10 l6 12z M90 54 l6 -16 l-30 -10 l-6 12z" fill="#ddd6fe" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<g font-size="16" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width="1.2"><text x="54" y="34">?</text><text x="38" y="22" font-size="11">?</text><text x="72" y="24" font-size="12">?</text></g>
${evil(80, 0, '#fde047').replace(/cx="60"/g, 'cx="45"')}<path d="M40 82 q6 -5 12 1 q-6 4 -12 -1z" fill="#fde047" stroke="${OL}" stroke-width="2"/><path d="M80 82 q-6 -5 -12 1 q6 4 12 -1z" fill="#fde047" stroke="${OL}" stroke-width="2"/>
<text x="74" y="98" font-size="10" font-weight="900" fill="#4c1d95" font-family="monospace">x=?</text>`),
  // セミコロン忘れ：しっぽが「;」の形のバイキン
  'ccpp|セミコロン忘れ': sprite('semi', `
<g stroke="${OL}" stroke-width="3" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2, x1 = 60 + Math.cos(a) * 28, y1 = 64 + Math.sin(a) * 26, x2 = 60 + Math.cos(a) * 38, y2 = 64 + Math.sin(a) * 36; return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3" fill="#a3e635"/>`; }).join('')}</g>
<ellipse cx="60" cy="64" rx="30" ry="28" fill="#84cc16" stroke="${OL}" stroke-width="3"/>${hl(42, 54)}
${evil(60, 10, '#fef9c3')}${grin(74, 10)}
<g transform="translate(98 96)"><circle r="6" fill="#fde047" stroke="${OL}" stroke-width="2"/><path d="M0 12 q4 8 -4 14" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0 12 q4 8 -4 14" stroke="#fde047" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<path d="M84 100 l6 -2" stroke="#ef4444" stroke-width="3"/><text x="100" y="82" font-size="9" font-weight="900" fill="#ef4444">?</text>`),
  // 型ちがい：形の合わないパズルのピースどうしが無理やりくっついたモンスター
  'ccpp|型ちがい': sprite('typemis', `
<path d="M20 50 h20 q0 -10 8 -10 q8 0 8 10 h8 v20 q10 0 10 8 q0 8 -10 8 v20 h-44z" fill="#f472b6" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M66 44 h34 v54 h-34 v-12 q-8 0 -8 -8 q0 -8 8 -8z" fill="#38bdf8" stroke="${OL}" stroke-width="3" stroke-linejoin="round" transform="rotate(8 82 70)"/>
<text x="30" y="96" font-size="10" font-weight="900" fill="#831843" font-family="monospace">int</text><text x="74" y="96" font-size="9" font-weight="900" fill="#0c4a6e" font-family="monospace" transform="rotate(8 82 70)">3.14</text>
${evil(64, 20, '#fff')}<path d="M48 80 q12 -6 24 0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M60 40 l-4 -8 M60 40 l6 -10" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>`),

  // ----- C/C++：回ごとの雑魚 -----
  // ヘッダ迷子：#include のラベルが取れた段ボール箱のおばけ
  'ccpp|ヘッダ迷子': sprite('header', `
<path d="M28 50 h64 v54 h-64z" fill="#d6a76c" stroke="${OL}" stroke-width="3"/><path d="M28 50 l-8 -14 h64 l16 14 M28 50 l12 -16" fill="#e7c08f" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M44 50 v54 M76 50 v54" stroke="#b07d42" stroke-width="2"/>
<g transform="translate(96 32) rotate(20)"><rect x="-16" y="-7" width="32" height="12" rx="2" fill="#fff" stroke="${OL}" stroke-width="1.8"/><text y="2" text-anchor="middle" font-size="6" font-weight="900" fill="${OL}" font-family="monospace">&lt;iostream&gt;</text></g>
${evil(72, 12, '#fff')}<path d="M50 88 q10 -6 20 0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<text x="34" y="66" font-size="7" font-weight="900" fill="#7c2d12" font-family="monospace">#include ?</text>`),
  // リンクできん：ちぎれた鎖のヘビ
  'ccpp|リンクできん': sprite('link', `
<g fill="none" stroke="${OL}" stroke-width="8"><ellipse cx="30" cy="88" rx="12" ry="8"/><ellipse cx="48" cy="80" rx="12" ry="8" transform="rotate(-20 48 80)"/><ellipse cx="88" cy="84" rx="12" ry="8" transform="rotate(20 88 84)"/></g>
<g fill="none" stroke="#94a3b8" stroke-width="4.5"><ellipse cx="30" cy="88" rx="12" ry="8"/><ellipse cx="48" cy="80" rx="12" ry="8" transform="rotate(-20 48 80)"/><ellipse cx="88" cy="84" rx="12" ry="8" transform="rotate(20 88 84)"/></g>
<path d="M62 70 l4 6 M70 66 l-2 8 M72 78 l-6 2" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
<path d="M76 70 q2 -26 20 -28 q14 2 14 16 q0 12 -14 14z" fill="#64748b" stroke="${OL}" stroke-width="3"/>
<path d="M90 50 l8 2 M92 56 q4 -3 8 0 q-4 3 -8 0z" stroke="${OL}" stroke-width="2" fill="#fde047"/><path d="M98 66 l8 -2 l-2 4" stroke="#ef4444" stroke-width="2" fill="none"/>
<text x="16" y="56" font-size="8" font-weight="900" fill="#ef4444" font-family="monospace">ld: error</text>`),
  // 切り捨てスライム：下半分がスパッと切れたスライム。7/2=3
  'ccpp|切り捨てスライム': sprite('truncslime', `
<path d="M28 84 q-2 -46 32 -46 q34 0 32 46z" fill="#a3e635" stroke="${OL}" stroke-width="3"/><path d="M24 84 h72" stroke="${OL}" stroke-width="3"/>
<path d="M34 96 q12 -6 26 0 q14 6 26 0" stroke="#a3e635" stroke-width="5" fill="none" stroke-dasharray="4 6" opacity=".7"/><text x="74" y="110" font-size="9" font-weight="900" fill="#ef4444" font-family="monospace">.5</text>
${hl(40, 56)}${evil(62, 10, '#fef9c3')}<path d="M50 74 h20" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M92 50 l14 -14" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/><path d="M104 38 l6 -6" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
<text x="18" y="30" font-size="10" font-weight="900" fill="#365314" font-family="monospace">7/2=3</text>`),
  // イコール1本：= を1本しか持っていない、仮面のピエロ
  'ccpp|イコール1本': sprite('equal1', `
<path d="M30 112 q2 -34 30 -36 q28 2 30 36z" fill="#a855f7" stroke="${OL}" stroke-width="3"/><g fill="#fde047" stroke="${OL}" stroke-width="1.5"><circle cx="60" cy="88" r="4"/><circle cx="60" cy="102" r="4"/></g>
<path d="M34 40 l-8 -16 l18 8 l16 -18 l16 18 l18 -8 l-8 16z" fill="#ef4444" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="26" cy="24" r="4" fill="#fde047" stroke="${OL}" stroke-width="1.5"/><circle cx="94" cy="24" r="4" fill="#fde047" stroke="${OL}" stroke-width="1.5"/>
<ellipse cx="60" cy="56" rx="24" ry="22" fill="#fff" stroke="${OL}" stroke-width="3"/>
${evil(52, 10, '#a855f7')}<path d="M46 66 q14 10 28 0" stroke="${OL}" stroke-width="2.5" fill="#fecaca"/>
<g transform="translate(98 62)"><rect x="-10" y="-3" width="20" height="5" fill="#fde047" stroke="${OL}" stroke-width="1.5"/><path d="M-10 8 h20" stroke="#cbd5e1" stroke-width="5" stroke-dasharray="3 3"/></g>
<text x="12" y="74" font-size="9" font-weight="900" fill="#ef4444" font-family="monospace">a=1</text>`),
  // break忘れ：とびらが閉まらず、次の部屋まで走りぬけるドアのモンスター
  'ccpp|break忘れ': sprite('nobreak', `
<rect x="20" y="30" width="44" height="76" rx="3" fill="#78350f" stroke="${OL}" stroke-width="3"/><path d="M26 36 h32 v70 h-32z" fill="#fef3c7"/>
<path d="M26 36 l22 6 v70 l-22 -6z" fill="#b45309" stroke="${OL}" stroke-width="2.5"/>
<g font-family="monospace" font-size="7" font-weight="900" fill="#78350f"><text x="30" y="28">case 1:</text><text x="70" y="28">case 2:</text></g>
<g stroke="#f97316" stroke-width="3" stroke-linecap="round"><path d="M62 62 h14 M66 72 h16 M62 82 h12"/></g>
<path d="M80 104 q-4 -30 16 -30 q20 0 16 30z" fill="#ef4444" stroke="${OL}" stroke-width="2.5"/><path d="M84 104 l-4 6 M106 104 l6 4" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M88 86 l5 1 M100 86 l5 1" stroke="${OL}" stroke-width="2"/><circle cx="90" cy="89" r="1.6" fill="${OL}"/><circle cx="102" cy="89" r="1.6" fill="${OL}"/><path d="M92 96 q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none"/>
<path d="M44 74 q3 -3 6 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  // 無限ループ虫：自分のしっぽを追いかけてぐるぐる回る虫
  'ccpp|無限ループ虫': sprite('loopbug', `
<path d="M60 26 a34 34 0 1 1 -32 22" fill="none" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M60 26 a34 34 0 1 1 -32 22" fill="none" stroke="#fb923c" stroke-width="11" stroke-linecap="round"/>
<g stroke="#c2410c" stroke-width="2">${Array.from({ length: 8 }, (_, i) => { const a = (-90 + 35 + i * 33) * Math.PI / 180; return `<path d="M${(60 + Math.cos(a) * 28).toFixed(1)} ${(60 + Math.sin(a) * 28).toFixed(1)} L${(60 + Math.cos(a) * 40).toFixed(1)} ${(60 + Math.sin(a) * 40).toFixed(1)}"/>`; }).join('')}</g>
<circle cx="34" cy="38" r="13" fill="#fb923c" stroke="${OL}" stroke-width="3"/><path d="M28 36 l4 1 M38 34 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="31" cy="38" r="2" fill="${OL}"/><circle cx="41" cy="36" r="2" fill="${OL}"/>
<path d="M34 26 q-4 -8 -10 -8 M40 26 q2 -8 8 -10" stroke="${OL}" stroke-width="2" fill="none"/>
<path d="M60 44 a16 16 0 1 1 -2 0" fill="none" stroke="#fde68a" stroke-width="3" stroke-dasharray="4 4"/><path d="M58 40 l4 4 l-5 3" stroke="#fde68a" stroke-width="2.5" fill="none"/>
<text x="48" y="64" font-size="8" font-weight="900" fill="#7c2d12" font-family="monospace">i++?</text>`),
  // 添字はみ出し：定規の目盛りの外まで足をのばすムカデ
  'ccpp|添字はみ出し': sprite('idxover', `
<rect x="10" y="88" width="80" height="12" fill="#fde68a" stroke="${OL}" stroke-width="2"/><g stroke="${OL}" stroke-width="1.5">${[0, 1, 2, 3, 4].map((i) => `<path d="M${14 + i * 18} 88 v6"/>`).join('')}</g>
<g font-family="monospace" font-size="6" font-weight="900" fill="${OL}">${[0, 1, 2, 3, 4].map((i) => `<text x="${16 + i * 18}" y="99">${i}</text>`).join('')}</g>
<path d="M90 88 h20 v12 h-20" fill="#fecaca" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/><text x="96" y="98" font-size="7" font-weight="900" fill="#ef4444">[5]</text>
<g fill="#22c55e" stroke="${OL}" stroke-width="2.5">${[22, 38, 54, 70].map((x) => `<circle cx="${x}" cy="72" r="9"/>`).join('')}</g>
<g stroke="${OL}" stroke-width="2"><path d="M22 80 v6 M38 80 v6 M54 80 v6 M70 80 v6"/></g>
<path d="M76 72 q16 -2 26 16" stroke="${OL}" stroke-width="3" fill="none"/><circle cx="102" cy="90" r="3" fill="#22c55e" stroke="${OL}" stroke-width="1.5"/>
<circle cx="84" cy="56" r="13" fill="#4ade80" stroke="${OL}" stroke-width="3"/><path d="M78 54 l4 1 M88 54 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="80" cy="57" r="1.8" fill="${OL}"/><circle cx="90" cy="57" r="1.8" fill="${OL}"/><path d="M80 62 q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none"/>`),
  // ゼロ番忘れ：0 の形の体で、自分を数え忘れられてすねている
  'ccpp|ゼロ番忘れ': sprite('zero', `
<ellipse cx="60" cy="64" rx="28" ry="38" fill="#fde047" stroke="${OL}" stroke-width="3"/><ellipse cx="60" cy="64" rx="12" ry="22" fill="#fef9c3" stroke="${OL}" stroke-width="2.5"/>
${evil(46, 14, '#fff')}<path d="M48 86 q12 -6 24 0" stroke="${OL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<g font-family="monospace" font-size="14" font-weight="900" fill="#94a3b8"><text x="94" y="56">1</text><text x="96" y="76">2</text><text x="94" y="96">3</text></g>
<path d="M14 40 q6 -8 14 -2" stroke="#3b82f6" stroke-width="2.5" fill="none"/><text x="10" y="34" font-size="9" font-weight="900" fill="#3b82f6">a[0]</text>`),
  // return忘れ：もどる矢印がとちゅうで迷子になったブーメラン
  'ccpp|return忘れ': sprite('noreturn', `
<path d="M24 60 q36 -40 72 0 l-14 10 q-22 -24 -44 0z" fill="#f59e0b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M34 54 q26 -22 52 0" stroke="#fde68a" stroke-width="3" fill="none" stroke-linecap="round"/>
${evil(52, 12, '#fff').replace(/y="52"/g, 'y="52"')}<path d="M52 62 q8 -4 16 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
<path d="M20 90 q20 14 40 4 q10 -6 22 4" stroke="#94a3b8" stroke-width="3" fill="none" stroke-dasharray="4 4"/><text x="86" y="102" font-size="14" font-weight="900" fill="#ef4444">?</text>
<text x="14" y="30" font-size="8" font-weight="900" fill="#92400e" font-family="monospace">return ?;</text>`),
  // 再帰とまらず：自分の中に自分が入ったつむじ風
  'ccpp|再帰とまらず': sprite('recur', `
<path d="M22 30 q38 -12 76 0 q-6 14 -22 18 q12 6 10 18 q-10 10 -24 10 q6 8 2 16 q-8 6 -16 4 q4 10 -4 16" fill="#a5f3fc" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M34 34 q26 -6 52 0 M44 52 q18 -4 32 2 M50 70 q10 0 18 4" stroke="#0891b2" stroke-width="2" fill="none"/>
${evil(38, 12, '#fff')}<path d="M54 46 q6 3 12 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g transform="translate(60 80) scale(.32)">${''}<path d="M22 30 q38 -12 76 0 q-6 14 -22 18 q12 6 10 18 q-10 10 -24 10" fill="#67e8f9" stroke="${OL}" stroke-width="5"/></g>
<text x="84" y="104" font-size="8" font-weight="900" fill="#0e7490" font-family="monospace">f(f(f(</text>`),
  // アドレス迷子：地図のピンが自分の家（アドレス）をさがしてうろうろ
  'ccpp|アドレス迷子': sprite('addr', `
<path d="M60 102 q-28 -30 -28 -52 a28 28 0 0 1 56 0 q0 22 -28 52z" fill="#ef4444" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="50" r="15" fill="#fff" stroke="${OL}" stroke-width="2.5"/>${evil(50, 6, '#fde047')}
<path d="M54 58 q6 -3 12 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g font-family="monospace" font-size="9" font-weight="900"><text x="8" y="30" fill="#2563eb">&amp;x</text><text x="94" y="30" fill="#7c3aed">*p</text><text x="12" y="100" fill="#64748b">0x7ff?</text></g>
<path d="M22 36 q-6 10 4 16 M98 36 q6 10 -4 16" stroke="#94a3b8" stroke-width="2" fill="none" stroke-dasharray="3 3"/>`),
  // delete二度押し：2回押されて爆発しかけているボタン
  'ccpp|delete二度押し': sprite('dbldel', `
<path d="M60 14 l8 18 l20 -10 l-6 20 l22 2 l-18 12 l14 16 l-22 -2 l2 22 l-18 -14 l-12 18 l-4 -22 l-20 10 l8 -20 l-20 -6 l20 -10 l-12 -18 l22 4z" fill="#fb923c" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="96" rx="30" ry="10" fill="#7f1d1d" stroke="${OL}" stroke-width="3"/><path d="M34 70 v26 h52 v-26z" fill="#b91c1c"/><ellipse cx="60" cy="70" rx="26" ry="10" fill="#ef4444" stroke="${OL}" stroke-width="3"/><path d="M34 70 v24 M86 70 v24" stroke="${OL}" stroke-width="3"/>
<text x="60" y="73" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="monospace">delete</text>
${evil(54, 12, '#fde047')}<path d="M52 62 q8 4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
<text x="92" y="98" font-size="10" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width=".6">×2</text>`),
  // ナル文字ぬけ：文字列の最後の \0 がぬけて、どこまでも続く穴
  'ccpp|ナル文字ぬけ': sprite('nonull', `
<ellipse cx="60" cy="92" rx="40" ry="14" fill="#1e1b4b" stroke="${OL}" stroke-width="3"/><ellipse cx="60" cy="94" rx="30" ry="9" fill="#020617"/>
<g font-family="monospace" font-size="11" font-weight="900" fill="#e0e7ff" stroke="${OL}" stroke-width=".6"><text x="16" y="50">'H'</text><text x="40" y="44">'e'</text><text x="64" y="50">'l'</text><text x="80" y="64" fill="#94a3b8">'?'</text><text x="66" y="80" fill="#64748b" font-size="8">'?'</text></g>
<path d="M24 60 q30 -20 56 10 q4 10 -10 16" stroke="#a5b4fc" stroke-width="2" fill="none" stroke-dasharray="3 4"/>
${evil(92, 10, '#c4b5fd')}`),
  // strcpyあふれ：小さなコップから、文字の波があふれ出す
  'ccpp|strcpyあふれ': sprite('strcpy', `
<path d="M34 54 h40 l-4 50 h-32z" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 58 q-4 -20 16 -24 q10 -14 26 -4 q20 -6 24 14 q14 10 6 26 q-8 10 -16 4 q-4 20 -18 22 q4 -14 -6 -18 h-24 q-10 0 -8 -20z" fill="#38bdf8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g font-family="monospace" font-size="8" font-weight="900" fill="#e0f2fe"><text x="40" y="48">ABCDEF</text><text x="74" y="70">GHI</text></g>
${evil(58, 10, '#fff')}${grin(70, 9)}
<path d="M94 92 q6 6 0 12 M104 88 q8 8 0 18" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"/>`),

  // ----- C/C++：回のボス -----
  // 無限ループの主：うずまきの目をした竜巻の王。ぐるぐると永遠に回す
  'ccpp|無限ループの主': sprite('loopking', `
<path d="M14 30 q46 -20 92 0 q-8 16 -28 20 q16 8 12 22 q-14 12 -30 10 q8 10 2 20 q-12 6 -20 2 q4 10 -4 16 q-10 -8 -6 -18 q-12 -4 -12 -16 q-12 -8 -8 -22 q-12 -6 -14 -22z" fill="#818cf8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M24 34 q36 -12 72 0 M36 54 q22 -6 44 2 M46 74 q12 -2 22 4" stroke="#c7d2fe" stroke-width="3" fill="none"/>
<g fill="none" stroke="#fde047" stroke-width="2.5"><path d="M42 44 m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -2 -4"/><path d="M78 44 m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -2 -4"/></g>
<path d="M30 30 l12 6 M90 30 l-12 6" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
${grin(58, 13)}
<path d="M40 14 l4 -10 l6 8 l6 -10 l6 10 l6 -8 l4 10z" fill="url(#eg-loopking)" stroke="${OL}" stroke-width="2"/>
<text x="84" y="104" font-size="8" font-weight="900" fill="#c7d2fe" font-family="monospace">while(1)</text>`, { aura: '#818cf8' }),
  // 添字オーバーラン：配列の箱から8本の足を外まで伸ばす大ダコ
  'ccpp|添字オーバーラン': sprite('overrun', `
<g fill="none" stroke-linecap="round"><g stroke="${OL}" stroke-width="10"><path d="M40 78 q-20 10 -30 30"/><path d="M48 84 q-6 16 -18 24"/><path d="M72 84 q6 16 18 24"/><path d="M80 78 q20 10 30 30"/><path d="M36 70 q-18 0 -30 -10"/><path d="M84 70 q18 0 30 -10"/></g>
<g stroke="#e11d48" stroke-width="6"><path d="M40 78 q-20 10 -30 30"/><path d="M48 84 q-6 16 -18 24"/><path d="M72 84 q6 16 18 24"/><path d="M80 78 q20 10 30 30"/><path d="M36 70 q-18 0 -30 -10"/><path d="M84 70 q18 0 30 -10"/></g></g>
<g fill="#fecdd3">${[[18, 100], [26, 108], [102, 100], [94, 108], [12, 62], [108, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g>
<rect x="30" y="76" width="60" height="16" fill="#fde68a" stroke="${OL}" stroke-width="2.5"/><g stroke="${OL}" stroke-width="2"><path d="M42 76 v16 M54 76 v16 M66 76 v16 M78 76 v16"/></g>
<path d="M30 60 q0 -40 30 -40 q30 0 30 40 q0 18 -30 20 q-30 -2 -30 -20z" fill="#f43f5e" stroke="${OL}" stroke-width="3"/>
${evil(52, 12, '#fde047')}${grin(64, 12)}
<g fill="#fda4af"><circle cx="46" cy="32" r="4"/><circle cx="74" cy="30" r="3"/></g>
<text x="96" y="40" font-size="10" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width=".6" font-family="monospace">[n]</text>`, { aura: '#f43f5e' }),
  // 再帰スタック魔人：積み重なった呼び出しの皿の上から立ちのぼる魔人
  'ccpp|再帰スタック魔人': sprite('stackdjinn', `
<g stroke="${OL}" stroke-width="2.5">${[0, 1, 2, 3].map((i) => `<rect x="${32 + i * 2}" y="${100 - i * 9}" width="${56 - i * 4}" height="8" rx="3" fill="${['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'][i]}"/>`).join('')}</g>
<g font-family="monospace" font-size="5.5" font-weight="900" fill="#ede9fe">${[0, 1, 2, 3].map((i) => `<text x="${42 + i * 2}" y="${106 - i * 9}">f(${4 - i})</text>`).join('')}</g>
<path d="M54 74 q-10 -10 0 -20 q-14 -6 -10 -22 q4 -16 16 -16 q12 0 16 16 q4 16 -10 22 q10 10 0 20z" fill="#7c3aed" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M44 46 q-18 -2 -24 -16 q10 4 18 0 M76 46 q18 -2 24 -16 q-10 4 -18 0" fill="#7c3aed" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M48 20 l-6 -12 l12 6z M72 20 l6 -12 l-12 6z" fill="url(#eg-stackdjinn)" stroke="${OL}" stroke-width="2"/>
${evil(32, 9, '#fde047')}${grin(42, 8)}
<text x="90" y="70" font-size="7" font-weight="900" fill="#ef4444" font-family="monospace">overflow!</text>`, { aura: '#a78bfa' }),
  // ダングリングポインタ：消えた領域を指したままの、骨の指の悪魔
  'ccpp|ダングリングポインタ': sprite('dangling', `
<path d="M86 74 h14 v20 h-14z" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4 3"/><text x="88" y="106" font-size="7" font-weight="900" fill="#94a3b8" font-family="monospace">freed</text>
<path d="M30 112 q-4 -30 14 -42 h32 q18 12 14 42z" fill="#4c1d95" stroke="${OL}" stroke-width="3"/>
<path d="M76 80 l10 -2 l6 4" stroke="#e5e7eb" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M76 80 l10 -2 l6 4" stroke="${OL}" stroke-width="1" fill="none"/>
<path d="M30 34 l-10 -22 l20 12z M90 34 l10 -22 l-20 12z" fill="#1e1b4b" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 50 q0 -26 30 -28 q30 2 30 28 q0 22 -30 26 q-30 -4 -30 -26z" fill="#6d28d9" stroke="${OL}" stroke-width="3"/>
${evil(48, 11, '#f0abfc')}${grin(62, 12)}
<path d="M92 64 l-16 -10 M98 58 l-4 -8" stroke="#f0abfc" stroke-width="2" stroke-dasharray="3 3"/>
<text x="10" y="104" font-size="9" font-weight="900" fill="#f0abfc" font-family="monospace">*p</text>`, { aura: '#a21caf' }),
  // ナル文字わすれ：しっぽの先で '\0' を食べてしまうサソリ
  'ccpp|ナル文字わすれ': sprite('nullscorp', `
<path d="M76 80 q22 -6 26 -30 q2 -16 -10 -22" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M76 80 q22 -6 26 -30 q2 -16 -10 -22" fill="none" stroke="#b45309" stroke-width="7" stroke-linecap="round"/>
<path d="M88 26 l-8 -6 l2 10z" fill="#fde047" stroke="${OL}" stroke-width="2"/>
<g transform="translate(78 14)"><circle r="8" fill="#fff" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="#dc2626" font-family="monospace">\\0</text></g>
<path d="M30 62 q-16 -8 -20 -24 l10 4 l2 -10 q10 10 8 22 M30 76 q-18 0 -26 10" fill="#b45309" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<g stroke="${OL}" stroke-width="3" stroke-linecap="round"><path d="M40 88 l-8 14 M50 90 l-4 14 M66 90 l4 14 M76 88 l8 14"/></g>
<ellipse cx="56" cy="74" rx="28" ry="18" fill="#d97706" stroke="${OL}" stroke-width="3"/><path d="M42 74 h28 M44 82 h24" stroke="#92400e" stroke-width="2"/>
${evil(66, 9, '#fef08a').replace(/cx="51"/g, 'cx="47"')}${grin(76, 8)}
<g font-family="monospace" font-size="9" font-weight="900" fill="#fde68a"><text x="10" y="112">"ABC</text></g>`, { aura: '#f59e0b' }),
});

// 金のレア：金色にかがやくモノに顔。うしろに金の光ときらめき
const sparkle = `<g fill="#fef9c3"><path d="M16 26 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z"/><path d="M102 18 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z"/><path d="M106 84 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2z"/></g>`;
const smug = (y = 58, dx = 10) => `<path d="M${60 - dx - 6} ${y} q6 -4 12 0" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M${60 + dx - 6} ${y} q6 -4 12 0" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M${60 - 7} ${y + 9} q7 5 14 0" stroke="${OL}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
const gold = (id, body) => sprite(id, `${sparkle}${body}`, { aura: '#fde047' });

Object.assign(ENEMY_ART, {
  // ----- C/C++：ステージ専用（第1回） -----
  'ccpp|実行形式迷子': sprite('exelost', `
<path d="M22 44 h30 l6 8 h40 v52 h-76z" fill="#fbbf24" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M22 58 h76" stroke="#b45309" stroke-width="2"/>
<g transform="translate(86 34) rotate(16)"><rect x="-10" y="-12" width="20" height="24" rx="2" fill="#fff" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="6.5" font-weight="900" fill="#2563eb" font-family="monospace">.exe</text></g>
${evil(76, 12, '#fff')}<path d="M50 92 q10 -5 20 0" stroke="${OL}" stroke-width="2.3" fill="none"/><text x="26" y="40" font-size="8" font-weight="900" fill="#fde68a" font-family="monospace">.cpp?</text>`),
  'ccpp|金のソースコード': gold('goldsrc', `
<path d="M30 30 h52 q10 0 10 10 v60 q0 8 -8 8 h-54 q-8 0 -8 -8 v-60 q0 -10 8 -10z" fill="url(#eg-goldsrc)" stroke="${OL}" stroke-width="3"/><path d="M30 30 q-10 0 -10 10 v8 h10" fill="#f59e0b" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#92400e" stroke-width="2"><path d="M40 82 h18 M40 90 h28 M40 98 h14"/></g><text x="40" y="76" font-size="7" font-weight="900" fill="#166534" font-family="monospace">// good</text>
${smug(52, 10)}`),
  'ccpp|エンドル忘れ': sprite('noendl', `
<rect x="16" y="40" width="88" height="44" rx="6" fill="#0f172a" stroke="${OL}" stroke-width="3"/><text x="22" y="58" font-size="9" font-weight="900" fill="#4ade80" font-family="monospace">HelloWorldAB</text><text x="22" y="72" font-size="9" font-weight="900" fill="#4ade80" font-family="monospace">CDEFGH...</text>
<path d="M104 62 q10 0 10 10" stroke="#4ade80" stroke-width="3" fill="none"/>
<path d="M30 84 q30 30 60 0" fill="#334155" stroke="${OL}" stroke-width="3"/>${evil(94, 10, '#4ade80')}
<text x="80" y="34" font-size="9" font-weight="900" fill="#ef4444" font-family="monospace">\\n?</text>`),
  'ccpp|main不在': sprite('nomain', `
<path d="M26 98 q-4 -56 34 -60 q38 4 34 60 l-10 -8 l-8 10 l-8 -10 l-8 10 l-8 -10 l-8 10 l-8 -10z" fill="#e2e8f0" fill-opacity=".55" stroke="${OL}" stroke-width="3" stroke-dasharray="6 4" stroke-linejoin="round"/>
${evil(62, 10, '#cbd5e1')}<path d="M52 78 h16" stroke="${OL}" stroke-width="2.2"/>
<text x="38" y="30" font-size="9" font-weight="900" fill="#94a3b8" font-family="monospace">int main()?</text>`),
  'ccpp|金のHello': gold('goldhello', `
<g fill="url(#eg-goldhello)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round" transform="rotate(-12 60 74)"><rect x="34" y="40" width="10" height="34" rx="5"/><rect x="46" y="32" width="10" height="40" rx="5"/><rect x="58" y="30" width="10" height="42" rx="5"/><rect x="70" y="36" width="10" height="36" rx="5"/><rect x="82" y="62" width="10" height="26" rx="5" transform="rotate(-40 87 75)"/><path d="M32 66 h50 q6 0 6 8 v14 q0 20 -26 20 q-30 0 -30 -22z"/></g>
${smug(76, 9)}<g font-family="monospace" font-size="8" font-weight="900" fill="#fde047"><text x="10" y="40">Hello,</text><text x="76" y="30">World!</text></g>
<path d="M30 60 q-6 -6 -4 -12 M94 54 q8 -4 10 -10" stroke="#fde68a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  // ----- 第2回 -----
  'ccpp|double嫌い': sprite('nodouble', `
<path d="M28 44 l32 -14 l32 14 v40 l-32 14 l-32 -14z" fill="#bae6fd" fill-opacity=".9" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M28 44 l32 14 l32 -14 M60 58 v40" stroke="#0284c7" stroke-width="2" fill="none"/>
${hl(36, 52, 8)}${evil(70, 12, '#fff')}<path d="M50 86 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
<text x="64" y="24" font-size="10" font-weight="900" fill="#ef4444" font-family="monospace">3.14→3</text>`),
  'ccpp|cin空振り': sprite('cinmiss', `
<path d="M24 100 q-2 -34 28 -36 q28 2 26 36z" fill="#0ea5e9" stroke="${OL}" stroke-width="3"/>${evil(80, 10, '#fff').replace(/60 -/g, '50 -')}
<path d="M66 70 l30 -46" stroke="#78350f" stroke-width="4" stroke-linecap="round"/><path d="M96 24 q8 30 -2 60" stroke="#e5e7eb" stroke-width="1.5" fill="none"/><path d="M94 84 q-4 6 2 8 q4 -2 2 -6" stroke="#94a3b8" stroke-width="2.5" fill="none"/>
<text x="28" y="40" font-size="9" font-weight="900" fill="#0c4a6e" font-family="monospace">cin &gt;&gt; x</text><text x="76" y="104" font-size="10" font-weight="900" fill="#ef4444">"abc"</text>`),
  'ccpp|金の変数': gold('goldvar', `
<path d="M24 50 l20 -18 h52 v52 h-52 z" fill="url(#eg-goldvar)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="38" cy="58" r="6" fill="#fff" stroke="${OL}" stroke-width="2"/>
<text x="68" y="76" text-anchor="middle" font-size="9" font-weight="900" fill="#78350f" font-family="monospace">score</text>${smug(54, 8).replace(/60 -/g, '70 -').replace(/60 \+/g, '70 +')}
<path d="M32 58 q-14 10 -12 30" stroke="#94a3b8" stroke-width="2" fill="none"/>`),
  'ccpp|else迷子': sprite('elselost', `
<path d="M60 108 v-40 M60 68 l-30 -30 M60 68 l30 -30" stroke="#78350f" stroke-width="8" stroke-linecap="round" fill="none"/>
<g transform="translate(30 30)"><rect x="-16" y="-8" width="32" height="14" rx="2" fill="#fde68a" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="${OL}" font-family="monospace">if</text></g>
<g transform="translate(90 30)"><rect x="-16" y="-8" width="32" height="14" rx="2" fill="#fde68a" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="${OL}" font-family="monospace">else</text></g>
<circle cx="60" cy="74" r="17" fill="#a3e635" stroke="${OL}" stroke-width="3"/><path d="M52 72 l4 1 M64 72 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="53" cy="75" r="1.8" fill="${OL}"/><circle cx="67" cy="75" r="1.8" fill="${OL}"/><path d="M55 82 q5 -3 10 0" stroke="${OL}" stroke-width="2" fill="none"/>
<text x="74" y="62" font-size="12" font-weight="900" fill="#ef4444">?</text>`),
  'ccpp|論理演算こんがら': sprite('logictangle', `
<circle cx="60" cy="68" r="32" fill="#f472b6" stroke="${OL}" stroke-width="3"/>
<g fill="none" stroke="#9d174d" stroke-width="2.5"><path d="M34 54 q26 30 52 0 M32 78 q28 -30 56 0 M44 40 q4 40 32 56 M76 40 q-6 40 -34 56"/></g>
${evil(60, 11, '#fff')}<path d="M98 88 q12 6 10 18" stroke="#f472b6" stroke-width="4" fill="none" stroke-linecap="round"/>
<g font-family="monospace" font-size="10" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width=".5"><text x="10" y="30">&amp;&amp;</text><text x="94" y="30">||</text><text x="12" y="104">!</text></g>`),
  'ccpp|金の条件式': gold('goldcond', `
<path d="M60 26 v70 M34 104 h52" stroke="url(#eg-goldcond)" stroke-width="6" stroke-linecap="round"/><path d="M24 44 h72" stroke="url(#eg-goldcond)" stroke-width="5" stroke-linecap="round"/>
<path d="M24 44 l-10 24 h20z M96 44 l-10 24 h20z" fill="url(#eg-goldcond)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="30" r="12" fill="url(#eg-goldcond)" stroke="${OL}" stroke-width="2.5"/>${smug(28, 5)}
<g font-family="monospace" font-size="8" font-weight="900" fill="#78350f"><text x="16" y="66">a&gt;0</text><text x="88" y="66">b</text></g>`),
  // ----- 第3回 -----
  'ccpp|case迷子': sprite('caselost', `
<rect x="26" y="44" width="68" height="54" rx="8" fill="#7c3aed" stroke="${OL}" stroke-width="3"/><path d="M48 44 v-8 q0 -6 6 -6 h12 q6 0 6 6 v8" fill="none" stroke="${OL}" stroke-width="3"/>
<g fill="#fde047" stroke="${OL}" stroke-width="1.5"><rect x="30" y="58" width="16" height="8" rx="2"/><rect x="74" y="80" width="16" height="8" rx="2"/></g><g font-size="5.5" font-weight="900" fill="${OL}" font-family="monospace"><text x="32" y="64">case 1</text><text x="76" y="86">case 3</text></g>
${evil(72, 10, '#fff')}<path d="M52 86 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
<text x="70" y="26" font-size="8" font-weight="900" fill="#c4b5fd" font-family="monospace">default</text>`),
  'ccpp|do-while早とちり': sprite('dowhile', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M10 54 h16 M6 66 h14 M12 78 h14"/></g>
<path d="M38 100 l-8 10 M78 100 l10 8" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="60" cy="70" rx="30" ry="32" fill="#f97316" stroke="${OL}" stroke-width="3"/>
${evil(62, 11, '#fff')}<path d="M50 78 q10 6 20 0" stroke="${OL}" stroke-width="2.2" fill="#7f1d1d"/>
<g font-family="monospace" font-size="8" font-weight="900"><text x="34" y="30" fill="#fde68a">do{ … }</text><text x="76" y="112" fill="#94a3b8">while?</text></g>
<text x="92" y="58" font-size="10" font-weight="900" fill="#fde047">1回</text>`),
  'ccpp|金のswitch': gold('goldswitch', `
<rect x="24" y="34" width="72" height="66" rx="8" fill="url(#eg-goldswitch)" stroke="${OL}" stroke-width="3"/>
<g fill="#78350f">${[0, 1, 2].map((i) => `<rect x="${34 + i * 20}" y="72" width="12" height="20" rx="3"/><circle cx="${40 + i * 20}" cy="${i === 1 ? 76 : 88}" r="5" fill="#fde047" stroke="${OL}" stroke-width="1.5"/>`).join('')}</g>
${smug(52, 10)}`),
  'ccpp|カウンタ暴走': sprite('counter', `
<rect x="24" y="44" width="72" height="44" rx="8" fill="#334155" stroke="${OL}" stroke-width="3"/>
<g font-family="monospace" font-size="20" font-weight="900" fill="#f87171">${['9', '9', '9'].map((t, i) => `<rect x="${32 + i * 20}" y="52" width="16" height="26" rx="2" fill="#0f172a"/><text x="${34 + i * 20}" y="72">${t}</text>`).join('')}</g>
<path d="M36 44 l-4 -12 M84 44 l4 -12" stroke="${OL}" stroke-width="3"/><circle cx="32" cy="30" r="4" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/><circle cx="88" cy="30" r="4" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/>
<path d="M40 88 l-6 16 M80 88 l6 16" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
<text x="90" y="40" font-size="8" font-weight="900" fill="#fde047" font-family="monospace">i++?</text>`),
  'ccpp|二重ループ迷宮': sprite('nested', `
<g fill="none" stroke-linecap="round"><circle cx="60" cy="62" r="40" stroke="#6366f1" stroke-width="7" stroke-dasharray="40 12"/><circle cx="60" cy="62" r="26" stroke="#a5b4fc" stroke-width="6" stroke-dasharray="22 8"/></g>
<circle cx="60" cy="62" r="14" fill="#4f46e5" stroke="${OL}" stroke-width="3"/>${evil(62, 5, '#fde047')}
<g font-family="monospace" font-size="7" font-weight="900" fill="#c7d2fe"><text x="8" y="112">for(i)</text><text x="82" y="112">for(j)</text></g>`),
  'ccpp|金のfor': gold('goldfor', `
<path d="M28 60 a32 32 0 1 1 6 22" fill="none" stroke="url(#eg-goldfor)" stroke-width="12" stroke-linecap="round"/><path d="M22 76 l12 8 l4 -14z" fill="url(#eg-goldfor)" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="60" r="18" fill="url(#eg-goldfor)" stroke="${OL}" stroke-width="2.5"/>${smug(56, 6)}
<g font-family="monospace" font-size="6.5" font-weight="900" fill="#fde68a"><text x="18" y="22">i=0;</text><text x="50" y="16">i&lt;n;</text><text x="86" y="22">i++</text></g>`),
  // ----- 第4回 -----
  'ccpp|初期化もれ': sprite('noinit', `
<path d="M36 40 h48 v6 q8 4 8 14 v40 q0 8 -8 8 h-48 q-8 0 -8 -8 v-40 q0 -10 8 -14z" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="3"/><rect x="34" y="32" width="52" height="10" rx="3" fill="#94a3b8" stroke="${OL}" stroke-width="2.5"/>
<g font-size="11" font-weight="900" fill="#64748b" font-family="monospace"><text x="40" y="70">?</text><text x="58" y="84">?</text><text x="72" y="66">?</text><text x="48" y="98">?</text></g>
${evil(56, 10, '#fff')}<text x="72" y="24" font-size="8" font-weight="900" fill="#0ea5e9" font-family="monospace">={ }?</text>`),
  'ccpp|要素数まちがい': sprite('sizewrong', `
<g transform="rotate(-20 60 70)"><path d="M20 60 h80 l-80 30z" fill="#fde047" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g stroke="${OL}" stroke-width="1.5"><path d="M30 60 v5 M40 60 v5 M50 60 v5 M60 60 v5 M70 60 v5 M80 60 v5"/></g></g>
${evil(72, 8, '#fff').replace(/60 -/g, '46 -').replace(/60 \+/g, '46 +')}
<g font-family="monospace" font-size="9" font-weight="900"><text x="62" y="40" fill="#22c55e">a[5]</text><text x="70" y="104" fill="#ef4444">a[5]=?</text></g>`),
  'ccpp|金の配列': gold('goldarr', `
<path d="M14 64 h92 v26 h-92z" fill="url(#eg-goldarr)" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2">${[1, 2, 3, 4].map((i) => `<path d="M${14 + i * 18.4} 64 v26"/>`).join('')}</g>
<g font-family="monospace" font-size="9" font-weight="900" fill="#78350f">${[0, 1, 2, 3, 4].map((i) => `<text x="${20 + i * 18.4}" y="81">${i}</text>`).join('')}</g>
<path d="M30 64 q0 -28 30 -28 q30 0 30 28" fill="url(#eg-goldarr)" stroke="${OL}" stroke-width="3"/>${smug(50, 9)}`),
  'ccpp|二次元迷子': sprite('grid2d', `
<g stroke="${OL}" stroke-width="2">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${28 + c * 22}" y="${40 + r * 22}" width="22" height="22" fill="${(r + c) % 2 ? '#99f6e4' : '#5eead4'}"/>`).join('')).join('')}</g>
<g font-family="monospace" font-size="7" font-weight="900" fill="#134e4a"><text x="10" y="54">[0]</text><text x="10" y="76">[1]</text><text x="34" y="34">[0]</text><text x="56" y="34">[1]</text></g>
<circle cx="72" cy="84" r="12" fill="#14b8a6" stroke="${OL}" stroke-width="2.5"/><path d="M66 82 l4 1 M74 82 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="68" cy="85" r="1.5" fill="${OL}"/><circle cx="76" cy="85" r="1.5" fill="${OL}"/>
<text x="90" y="80" font-size="14" font-weight="900" fill="#ef4444">?</text>`),
  'ccpp|合計ずれ': sprite('sumoff', `
<circle cx="60" cy="66" r="34" fill="#22c55e" stroke="${OL}" stroke-width="3"/><path d="M60 46 v40 M40 66 h40" stroke="#14532d" stroke-width="8" stroke-linecap="round" opacity=".35"/>
${evil(58, 11, '#fff')}<path d="M50 78 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
<g font-family="monospace" font-size="9" font-weight="900"><text x="6" y="24" fill="#fde047">sum=?</text><text x="84" y="110" fill="#ef4444">+1</text></g>`),
  'ccpp|金のマス目': gold('goldgrid', `
<g stroke="${OL}" stroke-width="2">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${30 + c * 20}" y="${40 + r * 20}" width="20" height="20" fill="url(#eg-goldgrid)"/>`).join('')).join('')}</g>
<rect x="30" y="40" width="60" height="60" fill="none" stroke="${OL}" stroke-width="3"/><g fill="#78350f" font-size="9" font-weight="900" font-family="monospace">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => `<text x="${36 + (i % 3) * 20}" y="${54 + Math.floor(i / 3) * 20}">${n}</text>`).join('')}</g>
${smug(28, 9)}`),
});
