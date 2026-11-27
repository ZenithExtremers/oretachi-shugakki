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
<path d="M84 94 l10 8" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
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
<g font-family="monospace" font-size="7" font-weight="900" fill="#fecaca" opacity=".9"></g>
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
<g fill="#d6d3d1" stroke="${OL}" stroke-width="1.5"><path d="M100 100 l6 -4 l4 6 l-6 3z"/><path d="M92 106 l4 -2 l2 4 l-4 2z"/></g>`, { aura: '#a8a29e' }),
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
<g font-family="monospace" font-size="7" font-weight="900" fill="#1e3a8a"></g>`),
  // 未初期化：中身がわからない「？」のつまった箱のモンスター
  'ccpp|未初期化': sprite('uninit', `
<path d="M30 54 l30 -14 l30 14 v40 l-30 14 l-30 -14z" fill="#c4b5fd" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M30 54 l30 14 l30 -14 M60 68 v40" stroke="${OL}" stroke-width="2.5" fill="none"/>
<path d="M30 54 l-6 -16 l30 -10 l6 12z M90 54 l6 -16 l-30 -10 l-6 12z" fill="#ddd6fe" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<g font-size="16" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width="1.2"><text x="54" y="34">?</text><text x="38" y="22" font-size="11">?</text><text x="72" y="24" font-size="12">?</text></g>
${evil(80, 0, '#fde047').replace(/cx="60"/g, 'cx="45"')}<path d="M40 82 q6 -5 12 1 q-6 4 -12 -1z" fill="#fde047" stroke="${OL}" stroke-width="2"/><path d="M80 82 q-6 -5 -12 1 q6 4 12 -1z" fill="#fde047" stroke="${OL}" stroke-width="2"/>
`),
  // セミコロン忘れ：しっぽが「;」の形のバイキン
  'ccpp|セミコロン忘れ': sprite('semi', `
<g stroke="${OL}" stroke-width="3" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2, x1 = 60 + Math.cos(a) * 28, y1 = 64 + Math.sin(a) * 26, x2 = 60 + Math.cos(a) * 38, y2 = 64 + Math.sin(a) * 36; return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3" fill="#a3e635"/>`; }).join('')}</g>
<ellipse cx="60" cy="64" rx="30" ry="28" fill="#84cc16" stroke="${OL}" stroke-width="3"/>${hl(42, 54)}
${evil(60, 10, '#fef9c3')}${grin(74, 10)}
<g transform="translate(98 96)"><circle r="6" fill="#fde047" stroke="${OL}" stroke-width="2"/><path d="M0 12 q4 8 -4 14" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0 12 q4 8 -4 14" stroke="#fde047" stroke-width="3" fill="none" stroke-linecap="round"/></g>
<path d="M84 100 l6 -2" stroke="#ef4444" stroke-width="3"/>`),
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
`),
  // リンクできん：ちぎれた鎖のヘビ
  'ccpp|リンクできん': sprite('link', `
<g fill="none" stroke="${OL}" stroke-width="8"><ellipse cx="30" cy="88" rx="12" ry="8"/><ellipse cx="48" cy="80" rx="12" ry="8" transform="rotate(-20 48 80)"/><ellipse cx="88" cy="84" rx="12" ry="8" transform="rotate(20 88 84)"/></g>
<g fill="none" stroke="#94a3b8" stroke-width="4.5"><ellipse cx="30" cy="88" rx="12" ry="8"/><ellipse cx="48" cy="80" rx="12" ry="8" transform="rotate(-20 48 80)"/><ellipse cx="88" cy="84" rx="12" ry="8" transform="rotate(20 88 84)"/></g>
<path d="M62 70 l4 6 M70 66 l-2 8 M72 78 l-6 2" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
<path d="M76 70 q2 -26 20 -28 q14 2 14 16 q0 12 -14 14z" fill="#64748b" stroke="${OL}" stroke-width="3"/>
<path d="M90 50 l8 2 M92 56 q4 -3 8 0 q-4 3 -8 0z" stroke="${OL}" stroke-width="2" fill="#fde047"/><path d="M98 66 l8 -2 l-2 4" stroke="#ef4444" stroke-width="2" fill="none"/>
`),
  // 切り捨てスライム：下半分がスパッと切れたスライム。7/2=3
  'ccpp|切り捨てスライム': sprite('truncslime', `
<path d="M28 84 q-2 -46 32 -46 q34 0 32 46z" fill="#a3e635" stroke="${OL}" stroke-width="3"/><path d="M24 84 h72" stroke="${OL}" stroke-width="3"/>
<path d="M34 96 q12 -6 26 0 q14 6 26 0" stroke="#a3e635" stroke-width="5" fill="none" stroke-dasharray="4 6" opacity=".7"/>
${hl(40, 56)}${evil(62, 10, '#fef9c3')}<path d="M50 74 h20" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M92 50 l14 -14" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/><path d="M104 38 l6 -6" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
`),
  // イコール1本：= を1本しか持っていない、仮面のピエロ
  'ccpp|イコール1本': sprite('equal1', `
<path d="M30 112 q2 -34 30 -36 q28 2 30 36z" fill="#a855f7" stroke="${OL}" stroke-width="3"/><g fill="#fde047" stroke="${OL}" stroke-width="1.5"><circle cx="60" cy="88" r="4"/><circle cx="60" cy="102" r="4"/></g>
<path d="M34 40 l-8 -16 l18 8 l16 -18 l16 18 l18 -8 l-8 16z" fill="#ef4444" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="26" cy="24" r="4" fill="#fde047" stroke="${OL}" stroke-width="1.5"/><circle cx="94" cy="24" r="4" fill="#fde047" stroke="${OL}" stroke-width="1.5"/>
<ellipse cx="60" cy="56" rx="24" ry="22" fill="#fff" stroke="${OL}" stroke-width="3"/>
${evil(52, 10, '#a855f7')}<path d="M46 66 q14 10 28 0" stroke="${OL}" stroke-width="2.5" fill="#fecaca"/>
<g transform="translate(98 62)"><rect x="-10" y="-3" width="20" height="5" fill="#fde047" stroke="${OL}" stroke-width="1.5"/><path d="M-10 8 h20" stroke="#cbd5e1" stroke-width="5" stroke-dasharray="3 3"/></g>
`),
  // break忘れ：とびらが閉まらず、次の部屋まで走りぬけるドアのモンスター
  'ccpp|break忘れ': sprite('nobreak', `
<rect x="20" y="30" width="44" height="76" rx="3" fill="#78350f" stroke="${OL}" stroke-width="3"/><path d="M26 36 h32 v70 h-32z" fill="#fef3c7"/>
<path d="M26 36 l22 6 v70 l-22 -6z" fill="#b45309" stroke="${OL}" stroke-width="2.5"/>
<g font-family="monospace" font-size="7" font-weight="900" fill="#78350f"></g>
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
`),
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
<path d="M14 40 q6 -8 14 -2" stroke="#3b82f6" stroke-width="2.5" fill="none"/>`),
  // return忘れ：もどる矢印がとちゅうで迷子になったブーメラン
  'ccpp|return忘れ': sprite('noreturn', `
<path d="M24 60 q36 -40 72 0 l-14 10 q-22 -24 -44 0z" fill="#f59e0b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M34 54 q26 -22 52 0" stroke="#fde68a" stroke-width="3" fill="none" stroke-linecap="round"/>
${evil(52, 12, '#fff').replace(/y="52"/g, 'y="52"')}<path d="M52 62 q8 -4 16 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
<path d="M20 90 q20 14 40 4 q10 -6 22 4" stroke="#94a3b8" stroke-width="3" fill="none" stroke-dasharray="4 4"/><text x="86" y="102" font-size="14" font-weight="900" fill="#ef4444">?</text>
`),
  // 再帰とまらず：自分の中に自分が入ったつむじ風
  'ccpp|再帰とまらず': sprite('recur', `
<path d="M22 30 q38 -12 76 0 q-6 14 -22 18 q12 6 10 18 q-10 10 -24 10 q6 8 2 16 q-8 6 -16 4 q4 10 -4 16" fill="#a5f3fc" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M34 34 q26 -6 52 0 M44 52 q18 -4 32 2 M50 70 q10 0 18 4" stroke="#0891b2" stroke-width="2" fill="none"/>
${evil(38, 12, '#fff')}<path d="M54 46 q6 3 12 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g transform="translate(60 80) scale(.32)">${''}<path d="M22 30 q38 -12 76 0 q-6 14 -22 18 q12 6 10 18 q-10 10 -24 10" fill="#67e8f9" stroke="${OL}" stroke-width="5"/></g>
`),
  // アドレス迷子：地図のピンが自分の家（アドレス）をさがしてうろうろ
  'ccpp|アドレス迷子': sprite('addr', `
<path d="M60 102 q-28 -30 -28 -52 a28 28 0 0 1 56 0 q0 22 -28 52z" fill="#ef4444" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="50" r="15" fill="#fff" stroke="${OL}" stroke-width="2.5"/>${evil(50, 6, '#fde047')}
<path d="M54 58 q6 -3 12 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g font-family="monospace" font-size="9" font-weight="900"></g>
<path d="M22 36 q-6 10 4 16 M98 36 q6 10 -4 16" stroke="#94a3b8" stroke-width="2" fill="none" stroke-dasharray="3 3"/>`),
  // delete二度押し：2回押されて爆発しかけているボタン
  'ccpp|delete二度押し': sprite('dbldel', `
<path d="M60 14 l8 18 l20 -10 l-6 20 l22 2 l-18 12 l14 16 l-22 -2 l2 22 l-18 -14 l-12 18 l-4 -22 l-20 10 l8 -20 l-20 -6 l20 -10 l-12 -18 l22 4z" fill="#fb923c" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="60" cy="96" rx="30" ry="10" fill="#7f1d1d" stroke="${OL}" stroke-width="3"/><path d="M34 70 v26 h52 v-26z" fill="#b91c1c"/><ellipse cx="60" cy="70" rx="26" ry="10" fill="#ef4444" stroke="${OL}" stroke-width="3"/><path d="M34 70 v24 M86 70 v24" stroke="${OL}" stroke-width="3"/>
<text x="60" y="73" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="monospace">delete</text>
${evil(54, 12, '#fde047')}<path d="M52 62 q8 4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
`),
  // ナル文字ぬけ：文字列の最後の \0 がぬけて、どこまでも続く穴
  'ccpp|ナル文字ぬけ': sprite('nonull', `
<ellipse cx="60" cy="92" rx="40" ry="14" fill="#1e1b4b" stroke="${OL}" stroke-width="3"/><ellipse cx="60" cy="94" rx="30" ry="9" fill="#020617"/>
<g font-family="monospace" font-size="11" font-weight="900" fill="#e0e7ff" stroke="${OL}" stroke-width=".6"><text x="16" y="50">'H'</text><text x="40" y="44">'e'</text><text x="64" y="50">'l'</text></g>
<path d="M24 60 q30 -20 56 10 q4 10 -10 16" stroke="#a5b4fc" stroke-width="2" fill="none" stroke-dasharray="3 4"/>
${evil(92, 10, '#c4b5fd')}`),
  // strcpyあふれ：小さなコップから、文字の波があふれ出す
  'ccpp|strcpyあふれ': sprite('strcpy', `
<path d="M34 54 h40 l-4 50 h-32z" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 58 q-4 -20 16 -24 q10 -14 26 -4 q20 -6 24 14 q14 10 6 26 q-8 10 -16 4 q-4 20 -18 22 q4 -14 -6 -18 h-24 q-10 0 -8 -20z" fill="#38bdf8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g font-family="monospace" font-size="8" font-weight="900" fill="#e0f2fe"><text x="40" y="48">ABCDEF</text></g>
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
`, { aura: '#818cf8' }),
  // 添字オーバーラン：配列の箱から8本の足を外まで伸ばす大ダコ
  'ccpp|添字オーバーラン': sprite('overrun', `
<g fill="none" stroke-linecap="round"><g stroke="${OL}" stroke-width="10"><path d="M40 78 q-20 10 -30 30"/><path d="M48 84 q-6 16 -18 24"/><path d="M72 84 q6 16 18 24"/><path d="M80 78 q20 10 30 30"/><path d="M36 70 q-18 0 -30 -10"/><path d="M84 70 q18 0 30 -10"/></g>
<g stroke="#e11d48" stroke-width="6"><path d="M40 78 q-20 10 -30 30"/><path d="M48 84 q-6 16 -18 24"/><path d="M72 84 q6 16 18 24"/><path d="M80 78 q20 10 30 30"/><path d="M36 70 q-18 0 -30 -10"/><path d="M84 70 q18 0 30 -10"/></g></g>
<g fill="#fecdd3">${[[18, 100], [26, 108], [102, 100], [94, 108], [12, 62], [108, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g>
<rect x="30" y="76" width="60" height="16" fill="#fde68a" stroke="${OL}" stroke-width="2.5"/><g stroke="${OL}" stroke-width="2"><path d="M42 76 v16 M54 76 v16 M66 76 v16 M78 76 v16"/></g>
<path d="M30 60 q0 -40 30 -40 q30 0 30 40 q0 18 -30 20 q-30 -2 -30 -20z" fill="#f43f5e" stroke="${OL}" stroke-width="3"/>
${evil(52, 12, '#fde047')}${grin(64, 12)}
<g fill="#fda4af"><circle cx="46" cy="32" r="4"/><circle cx="74" cy="30" r="3"/></g>
`, { aura: '#f43f5e' }),
  // 再帰スタック魔人：積み重なった呼び出しの皿の上から立ちのぼる魔人
  'ccpp|再帰スタック魔人': sprite('stackdjinn', `
<g stroke="${OL}" stroke-width="2.5">${[0, 1, 2, 3].map((i) => `<rect x="${32 + i * 2}" y="${100 - i * 9}" width="${56 - i * 4}" height="8" rx="3" fill="${['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'][i]}"/>`).join('')}</g>
<g font-family="monospace" font-size="5.5" font-weight="900" fill="#ede9fe">${[0, 1, 2, 3].map((i) => `<text x="${42 + i * 2}" y="${106 - i * 9}">f(${4 - i})</text>`).join('')}</g>
<path d="M54 74 q-10 -10 0 -20 q-14 -6 -10 -22 q4 -16 16 -16 q12 0 16 16 q4 16 -10 22 q10 10 0 20z" fill="#7c3aed" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M44 46 q-18 -2 -24 -16 q10 4 18 0 M76 46 q18 -2 24 -16 q-10 4 -18 0" fill="#7c3aed" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M48 20 l-6 -12 l12 6z M72 20 l6 -12 l-12 6z" fill="url(#eg-stackdjinn)" stroke="${OL}" stroke-width="2"/>
${evil(32, 9, '#fde047')}${grin(42, 8)}
`, { aura: '#a78bfa' }),
  // ダングリングポインタ：消えた領域を指したままの、骨の指の悪魔
  'ccpp|ダングリングポインタ': sprite('dangling', `
<path d="M86 74 h14 v20 h-14z" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4 3"/>
<path d="M30 112 q-4 -30 14 -42 h32 q18 12 14 42z" fill="#4c1d95" stroke="${OL}" stroke-width="3"/>
<path d="M76 80 l10 -2 l6 4" stroke="#e5e7eb" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M76 80 l10 -2 l6 4" stroke="${OL}" stroke-width="1" fill="none"/>
<path d="M30 34 l-10 -22 l20 12z M90 34 l10 -22 l-20 12z" fill="#1e1b4b" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 50 q0 -26 30 -28 q30 2 30 28 q0 22 -30 26 q-30 -4 -30 -26z" fill="#6d28d9" stroke="${OL}" stroke-width="3"/>
${evil(48, 11, '#f0abfc')}${grin(62, 12)}
<path d="M92 64 l-16 -10 M98 58 l-4 -8" stroke="#f0abfc" stroke-width="2" stroke-dasharray="3 3"/>
`, { aura: '#a21caf' }),
  // ナル文字わすれ：しっぽの先で '\0' を食べてしまうサソリ
  'ccpp|ナル文字わすれ': sprite('nullscorp', `
<path d="M76 80 q22 -6 26 -30 q2 -16 -10 -22" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M76 80 q22 -6 26 -30 q2 -16 -10 -22" fill="none" stroke="#b45309" stroke-width="7" stroke-linecap="round"/>
<path d="M88 26 l-8 -6 l2 10z" fill="#fde047" stroke="${OL}" stroke-width="2"/>
<g transform="translate(78 14)"><circle r="8" fill="#fff" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="#dc2626" font-family="monospace">\\0</text></g>
<path d="M30 62 q-16 -8 -20 -24 l10 4 l2 -10 q10 10 8 22 M30 76 q-18 0 -26 10" fill="#b45309" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<g stroke="${OL}" stroke-width="3" stroke-linecap="round"><path d="M40 88 l-8 14 M50 90 l-4 14 M66 90 l4 14 M76 88 l8 14"/></g>
<ellipse cx="56" cy="74" rx="28" ry="18" fill="#d97706" stroke="${OL}" stroke-width="3"/><path d="M42 74 h28 M44 82 h24" stroke="#92400e" stroke-width="2"/>
${evil(66, 9, '#fef08a').replace(/cx="51"/g, 'cx="47"')}${grin(76, 8)}
<g font-family="monospace" font-size="9" font-weight="900" fill="#fde68a"></g>`, { aura: '#f59e0b' }),
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
${evil(76, 12, '#fff')}<path d="M50 92 q10 -5 20 0" stroke="${OL}" stroke-width="2.3" fill="none"/>`),
  'ccpp|金のソースコード': gold('goldsrc', `
<path d="M30 30 h52 q10 0 10 10 v60 q0 8 -8 8 h-54 q-8 0 -8 -8 v-60 q0 -10 8 -10z" fill="url(#eg-goldsrc)" stroke="${OL}" stroke-width="3"/><path d="M30 30 q-10 0 -10 10 v8 h10" fill="#f59e0b" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#92400e" stroke-width="2"><path d="M40 82 h18 M40 90 h28 M40 98 h14"/></g><text x="40" y="76" font-size="7" font-weight="900" fill="#166534" font-family="monospace">// good</text>
${smug(52, 10)}`),
  'ccpp|エンドル忘れ': sprite('noendl', `
<rect x="16" y="40" width="88" height="44" rx="6" fill="#0f172a" stroke="${OL}" stroke-width="3"/><text x="22" y="58" font-size="9" font-weight="900" fill="#4ade80" font-family="monospace">HelloWorldAB</text>
<path d="M104 62 q10 0 10 10" stroke="#4ade80" stroke-width="3" fill="none"/>
<path d="M30 84 q30 30 60 0" fill="#334155" stroke="${OL}" stroke-width="3"/>${evil(94, 10, '#4ade80')}
`),
  'ccpp|main不在': sprite('nomain', `
<path d="M26 98 q-4 -56 34 -60 q38 4 34 60 l-10 -8 l-8 10 l-8 -10 l-8 10 l-8 -10 l-8 10 l-8 -10z" fill="#e2e8f0" fill-opacity=".55" stroke="${OL}" stroke-width="3" stroke-dasharray="6 4" stroke-linejoin="round"/>
${evil(62, 10, '#cbd5e1')}<path d="M52 78 h16" stroke="${OL}" stroke-width="2.2"/>
`),
  'ccpp|金のHello': gold('goldhello', `
<g fill="url(#eg-goldhello)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round" transform="rotate(-12 60 74)"><rect x="34" y="40" width="10" height="34" rx="5"/><rect x="46" y="32" width="10" height="40" rx="5"/><rect x="58" y="30" width="10" height="42" rx="5"/><rect x="70" y="36" width="10" height="36" rx="5"/><rect x="82" y="62" width="10" height="26" rx="5" transform="rotate(-40 87 75)"/><path d="M32 66 h50 q6 0 6 8 v14 q0 20 -26 20 q-30 0 -30 -22z"/></g>
${smug(76, 9)}<g font-family="monospace" font-size="8" font-weight="900" fill="#fde047"></g>
<path d="M30 60 q-6 -6 -4 -12 M94 54 q8 -4 10 -10" stroke="#fde68a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  // ----- 第2回 -----
  'ccpp|double嫌い': sprite('nodouble', `
<path d="M28 44 l32 -14 l32 14 v40 l-32 14 l-32 -14z" fill="#bae6fd" fill-opacity=".9" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M28 44 l32 14 l32 -14 M60 58 v40" stroke="#0284c7" stroke-width="2" fill="none"/>
${hl(36, 52, 8)}${evil(70, 12, '#fff')}<path d="M50 86 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
`),
  'ccpp|cin空振り': sprite('cinmiss', `
<path d="M24 100 q-2 -34 28 -36 q28 2 26 36z" fill="#0ea5e9" stroke="${OL}" stroke-width="3"/>${evil(80, 10, '#fff').replace(/60 -/g, '50 -')}
<path d="M66 70 l30 -46" stroke="#78350f" stroke-width="4" stroke-linecap="round"/><path d="M96 24 q8 30 -2 60" stroke="#e5e7eb" stroke-width="1.5" fill="none"/><path d="M94 84 q-4 6 2 8 q4 -2 2 -6" stroke="#94a3b8" stroke-width="2.5" fill="none"/>
`),
  'ccpp|金の変数': gold('goldvar', `
<path d="M24 50 l20 -18 h52 v52 h-52 z" fill="url(#eg-goldvar)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="38" cy="58" r="6" fill="#fff" stroke="${OL}" stroke-width="2"/>
<text x="68" y="76" text-anchor="middle" font-size="9" font-weight="900" fill="#78350f" font-family="monospace">score</text>${smug(54, 8).replace(/60 -/g, '70 -').replace(/60 \+/g, '70 +')}
<path d="M32 58 q-14 10 -12 30" stroke="#94a3b8" stroke-width="2" fill="none"/>`),
  'ccpp|else迷子': sprite('elselost', `
<path d="M60 108 v-40 M60 68 l-30 -30 M60 68 l30 -30" stroke="#78350f" stroke-width="8" stroke-linecap="round" fill="none"/>
<g transform="translate(30 30)"><rect x="-16" y="-8" width="32" height="14" rx="2" fill="#fde68a" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="${OL}" font-family="monospace">if</text></g>
<g transform="translate(90 30)"><rect x="-16" y="-8" width="32" height="14" rx="2" fill="#fde68a" stroke="${OL}" stroke-width="2"/><text y="3" text-anchor="middle" font-size="8" font-weight="900" fill="${OL}" font-family="monospace">else</text></g>
<circle cx="60" cy="74" r="17" fill="#a3e635" stroke="${OL}" stroke-width="3"/><path d="M52 72 l4 1 M64 72 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="53" cy="75" r="1.8" fill="${OL}"/><circle cx="67" cy="75" r="1.8" fill="${OL}"/><path d="M55 82 q5 -3 10 0" stroke="${OL}" stroke-width="2" fill="none"/>
`),
  'ccpp|論理演算こんがら': sprite('logictangle', `
<circle cx="60" cy="68" r="32" fill="#f472b6" stroke="${OL}" stroke-width="3"/>
<g fill="none" stroke="#9d174d" stroke-width="2.5"><path d="M34 54 q26 30 52 0 M32 78 q28 -30 56 0 M44 40 q4 40 32 56 M76 40 q-6 40 -34 56"/></g>
${evil(60, 11, '#fff')}<path d="M98 88 q12 6 10 18" stroke="#f472b6" stroke-width="4" fill="none" stroke-linecap="round"/>
<g font-family="monospace" font-size="10" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width=".5"></g>`),
  'ccpp|金の条件式': gold('goldcond', `
<path d="M60 26 v70 M34 104 h52" stroke="url(#eg-goldcond)" stroke-width="6" stroke-linecap="round"/><path d="M24 44 h72" stroke="url(#eg-goldcond)" stroke-width="5" stroke-linecap="round"/>
<path d="M24 44 l-10 24 h20z M96 44 l-10 24 h20z" fill="url(#eg-goldcond)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="30" r="12" fill="url(#eg-goldcond)" stroke="${OL}" stroke-width="2.5"/>${smug(28, 5)}
<g font-family="monospace" font-size="8" font-weight="900" fill="#78350f"></g>`),
  // ----- 第3回 -----
  'ccpp|case迷子': sprite('caselost', `
<rect x="26" y="44" width="68" height="54" rx="8" fill="#7c3aed" stroke="${OL}" stroke-width="3"/><path d="M48 44 v-8 q0 -6 6 -6 h12 q6 0 6 6 v8" fill="none" stroke="${OL}" stroke-width="3"/>
<g fill="#fde047" stroke="${OL}" stroke-width="1.5"><rect x="30" y="58" width="16" height="8" rx="2"/><rect x="74" y="80" width="16" height="8" rx="2"/></g><g font-size="5.5" font-weight="900" fill="${OL}" font-family="monospace"><text x="32" y="64">case 1</text><text x="76" y="86">case 3</text></g>
${evil(72, 10, '#fff')}<path d="M52 86 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
`),
  'ccpp|do-while早とちり': sprite('dowhile', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M10 54 h16 M6 66 h14 M12 78 h14"/></g>
<path d="M38 100 l-8 10 M78 100 l10 8" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="60" cy="70" rx="30" ry="32" fill="#f97316" stroke="${OL}" stroke-width="3"/>
${evil(62, 11, '#fff')}<path d="M50 78 q10 6 20 0" stroke="${OL}" stroke-width="2.2" fill="#7f1d1d"/>
<g font-family="monospace" font-size="8" font-weight="900"></g>
`),
  'ccpp|金のswitch': gold('goldswitch', `
<rect x="24" y="34" width="72" height="66" rx="8" fill="url(#eg-goldswitch)" stroke="${OL}" stroke-width="3"/>
<g fill="#78350f">${[0, 1, 2].map((i) => `<rect x="${34 + i * 20}" y="72" width="12" height="20" rx="3"/><circle cx="${40 + i * 20}" cy="${i === 1 ? 76 : 88}" r="5" fill="#fde047" stroke="${OL}" stroke-width="1.5"/>`).join('')}</g>
${smug(52, 10)}`),
  'ccpp|カウンタ暴走': sprite('counter', `
<rect x="24" y="44" width="72" height="44" rx="8" fill="#334155" stroke="${OL}" stroke-width="3"/>
<g font-family="monospace" font-size="20" font-weight="900" fill="#f87171">${['9', '9', '9'].map((t, i) => `<rect x="${32 + i * 20}" y="52" width="16" height="26" rx="2" fill="#0f172a"/><text x="${34 + i * 20}" y="72">${t}</text>`).join('')}</g>
<path d="M36 44 l-4 -12 M84 44 l4 -12" stroke="${OL}" stroke-width="3"/><circle cx="32" cy="30" r="4" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/><circle cx="88" cy="30" r="4" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/>
<path d="M40 88 l-6 16 M80 88 l6 16" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
`),
  'ccpp|二重ループ迷宮': sprite('nested', `
<g fill="none" stroke-linecap="round"><circle cx="60" cy="62" r="40" stroke="#6366f1" stroke-width="7" stroke-dasharray="40 12"/><circle cx="60" cy="62" r="26" stroke="#a5b4fc" stroke-width="6" stroke-dasharray="22 8"/></g>
<circle cx="60" cy="62" r="14" fill="#4f46e5" stroke="${OL}" stroke-width="3"/>${evil(62, 5, '#fde047')}
<g font-family="monospace" font-size="7" font-weight="900" fill="#c7d2fe"></g>`),
  'ccpp|金のfor': gold('goldfor', `
<path d="M28 60 a32 32 0 1 1 6 22" fill="none" stroke="url(#eg-goldfor)" stroke-width="12" stroke-linecap="round"/><path d="M22 76 l12 8 l4 -14z" fill="url(#eg-goldfor)" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="60" r="18" fill="url(#eg-goldfor)" stroke="${OL}" stroke-width="2.5"/>${smug(56, 6)}
<g font-family="monospace" font-size="6.5" font-weight="900" fill="#fde68a"></g>`),
  // ----- 第4回 -----
  'ccpp|初期化もれ': sprite('noinit', `
<path d="M36 40 h48 v6 q8 4 8 14 v40 q0 8 -8 8 h-48 q-8 0 -8 -8 v-40 q0 -10 8 -14z" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="3"/><rect x="34" y="32" width="52" height="10" rx="3" fill="#94a3b8" stroke="${OL}" stroke-width="2.5"/>
<g font-size="11" font-weight="900" fill="#64748b" font-family="monospace"><text x="40" y="70">?</text><text x="58" y="84">?</text><text x="72" y="66">?</text><text x="48" y="98">?</text></g>
${evil(56, 10, '#fff')}`),
  'ccpp|要素数まちがい': sprite('sizewrong', `
<g transform="rotate(-20 60 70)"><path d="M20 60 h80 l-80 30z" fill="#fde047" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g stroke="${OL}" stroke-width="1.5"><path d="M30 60 v5 M40 60 v5 M50 60 v5 M60 60 v5 M70 60 v5 M80 60 v5"/></g></g>
${evil(72, 8, '#fff').replace(/60 -/g, '46 -').replace(/60 \+/g, '46 +')}
<g font-family="monospace" font-size="9" font-weight="900"></g>`),
  'ccpp|金の配列': gold('goldarr', `
<path d="M14 64 h92 v26 h-92z" fill="url(#eg-goldarr)" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2">${[1, 2, 3, 4].map((i) => `<path d="M${14 + i * 18.4} 64 v26"/>`).join('')}</g>
<g font-family="monospace" font-size="9" font-weight="900" fill="#78350f">${[0, 1, 2, 3, 4].map((i) => `<text x="${20 + i * 18.4}" y="81">${i}</text>`).join('')}</g>
<path d="M30 64 q0 -28 30 -28 q30 0 30 28" fill="url(#eg-goldarr)" stroke="${OL}" stroke-width="3"/>${smug(50, 9)}`),
  'ccpp|二次元迷子': sprite('grid2d', `
<g stroke="${OL}" stroke-width="2">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${28 + c * 22}" y="${40 + r * 22}" width="22" height="22" fill="${(r + c) % 2 ? '#99f6e4' : '#5eead4'}"/>`).join('')).join('')}</g>
<g font-family="monospace" font-size="7" font-weight="900" fill="#134e4a"></g>
<circle cx="72" cy="84" r="12" fill="#14b8a6" stroke="${OL}" stroke-width="2.5"/><path d="M66 82 l4 1 M74 82 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="68" cy="85" r="1.5" fill="${OL}"/><circle cx="76" cy="85" r="1.5" fill="${OL}"/>
`),
  'ccpp|合計ずれ': sprite('sumoff', `
<circle cx="60" cy="66" r="34" fill="#22c55e" stroke="${OL}" stroke-width="3"/><path d="M60 46 v40 M40 66 h40" stroke="#14532d" stroke-width="8" stroke-linecap="round" opacity=".35"/>
${evil(58, 11, '#fff')}<path d="M50 78 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
<g font-family="monospace" font-size="9" font-weight="900"></g>`),
  'ccpp|金のマス目': gold('goldgrid', `
<g stroke="${OL}" stroke-width="2">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${30 + c * 20}" y="${40 + r * 20}" width="20" height="20" fill="url(#eg-goldgrid)"/>`).join('')).join('')}</g>
<rect x="30" y="40" width="60" height="60" fill="none" stroke="${OL}" stroke-width="3"/><g fill="#78350f" font-size="9" font-weight="900" font-family="monospace">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => `<text x="${36 + (i % 3) * 20}" y="${54 + Math.floor(i / 3) * 20}">${n}</text>`).join('')}</g>
${smug(28, 9)}`),
});

Object.assign(ENEMY_ART, {
  // ----- C/C++：ステージ専用（第5回） -----
  'ccpp|引数迷子': sprite('argslost', `
<path d="M22 50 h76 v46 h-76z" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><path d="M22 50 l38 28 l38 -28" fill="none" stroke="${OL}" stroke-width="2.5"/>
${evil(70, 14, '#fde047').replace(/y="70"/g, 'y="70"')}<path d="M50 88 q10 -4 20 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g font-family="monospace" font-size="8" font-weight="900"></g><path d="M34 40 q24 -10 40 -4" stroke="#94a3b8" stroke-width="2" fill="none" stroke-dasharray="3 3"/>`),
  'ccpp|プロトタイプ忘れ': sprite('noproto', `
<path d="M30 30 h50 l12 12 v66 h-62z" fill="#f8fafc" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M80 30 v12 h12" fill="#e2e8f0" stroke="${OL}" stroke-width="2.5"/>
<rect x="36" y="38" width="38" height="10" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/><text x="38" y="46" font-size="6" font-weight="900" fill="#ef4444" font-family="monospace">int f();?</text>
${evil(72, 10, '#93c5fd')}<path d="M52 88 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g stroke="#cbd5e1" stroke-width="2"><path d="M38 98 h40 M38 104 h30"/></g>`),
  'ccpp|金の関数': gold('goldfunc', `
<path d="M26 44 h22 q0 -12 12 -12 q12 0 12 12 h22 v22 q12 0 12 12 q0 12 -12 12 v18 h-68z" fill="url(#eg-goldfunc)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${smug(64, 10)}<text x="40" y="100" font-size="9" font-weight="900" fill="#78350f" font-family="monospace">f(x)</text>`),
  'ccpp|ビットこぼし': sprite('bitspill', `
<path d="M30 40 h60 l-6 56 q-24 10 -48 0z" fill="#334155" stroke="${OL}" stroke-width="3"/><ellipse cx="60" cy="40" rx="30" ry="8" fill="#475569" stroke="${OL}" stroke-width="3"/>
${evil(64, 12, '#22d3ee')}${grin(78, 9)}
<g font-family="monospace" font-size="11" font-weight="900" fill="#22d3ee"><text x="20" y="28">1</text><text x="36" y="18">0</text><text x="84" y="24">1</text><text x="96" y="40">0</text><text x="98" y="104">1</text><text x="12" y="104">0</text></g>
<g font-family="monospace" font-size="8" font-weight="900" fill="#fde047"></g>`),
  'ccpp|シフト暴走': sprite('shift', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M8 46 h14 M4 60 h16 M8 74 h14"/></g>
<path d="M26 40 h56 l20 24 l-20 24 h-56z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${evil(62, 12, '#fff').replace(/60 -/g, '54 -').replace(/60 \+/g, '54 +')}<path d="M44 76 q10 4 20 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g font-family="monospace" font-size="10" font-weight="900" fill="#fde047"><text x="36" y="30">&lt;&lt;</text><text x="72" y="30">&gt;&gt;</text></g>`),
  'ccpp|金のビット': gold('goldbit', `
<path d="M50 96 h20 v8 h-20z" fill="#78350f" stroke="${OL}" stroke-width="2"/><path d="M44 86 h32 v10 h-32z" fill="#a16207" stroke="${OL}" stroke-width="2"/>
<path d="M60 22 q26 0 26 26 q0 16 -12 26 v12 h-28 v-12 q-12 -10 -12 -26 q0 -26 26 -26z" fill="url(#eg-goldbit)" stroke="${OL}" stroke-width="3"/>
${smug(50, 8)}`),
  // ----- 第6回 -----
  'ccpp|ヌル参照': sprite('nullref', `
<ellipse cx="60" cy="98" rx="36" ry="10" fill="#020617" stroke="${OL}" stroke-width="3"/>
<path d="M60 86 v-30" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 3"/>
<path d="M36 52 q-2 -26 24 -28 q26 2 24 28 q-2 16 -24 18 q-22 -2 -24 -18z" fill="#64748b" stroke="${OL}" stroke-width="3"/>
${evil(46, 10, '#f87171')}<path d="M50 60 q10 -4 20 0" stroke="${OL}" stroke-width="2" fill="none"/>
`),
  'ccpp|アスタリスク酔い': sprite('asterisk', `
<g stroke="${OL}" stroke-width="12" stroke-linecap="round"><path d="M60 24 v76 M28 42 l64 40 M92 42 l-64 40"/></g>
<g stroke="#facc15" stroke-width="8" stroke-linecap="round"><path d="M60 24 v76 M28 42 l64 40 M92 42 l-64 40"/></g>
<circle cx="60" cy="62" r="16" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<g fill="none" stroke="${OL}" stroke-width="2"><path d="M50 58 m-3 0 a3 3 0 1 1 3 3"/><path d="M70 58 m-3 0 a3 3 0 1 1 3 3"/></g><path d="M54 68 q6 3 12 -1" stroke="${OL}" stroke-width="2" fill="none"/>
<g font-family="monospace" font-size="9" font-weight="900" fill="#fde68a"></g>`),
  'ccpp|金のアドレス': gold('goldaddr', `
<path d="M60 104 q-26 -28 -26 -50 a26 26 0 0 1 52 0 q0 22 -26 50z" fill="url(#eg-goldaddr)" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="54" r="15" fill="#fff7ed" stroke="${OL}" stroke-width="2.5"/>${smug(52, 6)}
`),
  'ccpp|new出しっぱなし': sprite('newleak', `
<path d="M60 84 q4 12 -2 26" stroke="#94a3b8" stroke-width="2" fill="none"/>
<ellipse cx="60" cy="52" rx="30" ry="34" fill="#f472b6" stroke="${OL}" stroke-width="3"/><path d="M56 86 h8 l-4 6z" fill="#f472b6" stroke="${OL}" stroke-width="2"/>${hl(42, 42, 12)}
${evil(52, 11, '#fff')}${grin(66, 11)}
<text x="44" y="24" font-size="10" font-weight="900" fill="#fbcfe8" font-family="monospace">new</text>`),
  'ccpp|delete[]忘れ': sprite('nodelarr', `
<path d="M32 46 h56 l-6 58 h-44z" fill="#64748b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M26 38 h68 v8 h-68z" fill="#94a3b8" stroke="${OL}" stroke-width="3"/><path d="M52 38 v-6 h16 v6" fill="none" stroke="${OL}" stroke-width="3"/>
${evil(66, 11, '#fde047')}<path d="M50 82 q10 -4 20 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g stroke="${OL}" stroke-width="1.5"><rect x="76" y="22" width="10" height="10" fill="#38bdf8"/><rect x="88" y="22" width="10" height="10" fill="#38bdf8"/><rect x="100" y="22" width="10" height="10" fill="#38bdf8"/></g>
`),
  'ccpp|金のヒープ': gold('goldheap', `
<path d="M10 104 l30 -50 l14 18 l16 -36 l40 68z" fill="url(#eg-goldheap)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M64 46 l6 -10 l6 10 l-6 4z" fill="#fff" stroke="${OL}" stroke-width="1.5"/>
${smug(78, 9)}`),
  // ----- 第8回 -----
  'ccpp|sizeofちがい': sprite('sizeof', `
<rect x="18" y="56" width="84" height="26" rx="3" fill="#fde047" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2"><path d="M39 56 v26 M60 56 v26 M81 56 v26"/></g>
<g font-family="monospace" font-size="10" font-weight="900" fill="${OL}"><text x="24" y="74">A</text><text x="45" y="74">B</text><text x="66" y="74">C</text><text x="84" y="74" fill="#ef4444">\\0</text></g>
<path d="M30 56 q0 -26 30 -26 q30 0 30 26" fill="#f59e0b" stroke="${OL}" stroke-width="3"/>${evil(44, 10, '#fff')}
<g font-family="monospace" font-size="8" font-weight="900"></g>`),
  'ccpp|一文字ちがい': sprite('onechar', `
<g transform="translate(36 64)"><circle r="20" fill="#38bdf8" stroke="${OL}" stroke-width="3"/><text y="7" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" font-family="monospace">'A'</text></g>
<g transform="translate(86 64)"><rect x="-22" y="-20" width="44" height="40" rx="8" fill="#f472b6" stroke="${OL}" stroke-width="3"/><text y="6" text-anchor="middle" font-size="16" font-weight="900" fill="#fff" font-family="monospace">"A"</text></g>
<path d="M28 38 l6 2 M44 38 l-6 2 M78 38 l6 2 M94 38 l-6 2" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M56 64 h8" stroke="#ef4444" stroke-width="3"/>`),
  'ccpp|金の文字列': gold('goldstr', `
<path d="M12 70 q12 -20 24 0 t24 0 t24 0 t24 0" fill="none" stroke="url(#eg-goldstr)" stroke-width="8" stroke-linecap="round"/>
<g font-family="monospace" font-size="9" font-weight="900" fill="#78350f">${['H', 'i', '!', '\\0'].map((t, i) => `<circle cx="${24 + i * 24}" cy="${i % 2 ? 76 : 64}" r="9" fill="url(#eg-goldstr)" stroke="${OL}" stroke-width="2"/><text x="${24 + i * 24}" y="${(i % 2 ? 76 : 64) + 3}" text-anchor="middle">${t}</text>`).join('')}</g>
<circle cx="60" cy="38" r="14" fill="url(#eg-goldstr)" stroke="${OL}" stroke-width="2.5"/>${smug(36, 5)}`),
  'ccpp|strncpyのこし': sprite('strncpy', `
<path d="M30 84 l40 -40 M40 30 l40 40" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round"/><path d="M30 84 l40 -40 M40 30 l40 40" stroke="${OL}" stroke-width="2" stroke-linecap="round" fill="none"/>
<circle cx="28" cy="88" r="12" fill="none" stroke="#ef4444" stroke-width="6"/><circle cx="84" cy="74" r="12" fill="none" stroke="#ef4444" stroke-width="6"/>
<circle cx="56" cy="56" r="8" fill="#94a3b8" stroke="${OL}" stroke-width="2"/>${evil(40, 10, '#fde047')}
<g font-family="monospace" font-size="8" font-weight="900"></g>`),
  'ccpp|連結しすぎ': sprite('strcat', `
<g fill="none" stroke-width="8">${[[20, 66], [36, 58], [52, 66], [68, 58], [84, 66], [100, 58]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="7" stroke="${OL}" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<g fill="none" stroke-width="4.5">${[[20, 66], [36, 58], [52, 66], [68, 58], [84, 66], [100, 58]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="7" stroke="#a78bfa" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<circle cx="60" cy="88" r="14" fill="#8b5cf6" stroke="${OL}" stroke-width="3"/>${evil(88, 5, '#fde047')}
`),
  'ccpp|金のcstring': gold('goldcstr', `
<g stroke="${OL}" stroke-width="2.5"><rect x="22" y="56" width="18" height="50" fill="url(#eg-goldcstr)"/><rect x="42" y="46" width="18" height="60" fill="#f59e0b"/><rect x="62" y="52" width="18" height="54" fill="url(#eg-goldcstr)"/><rect x="82" y="62" width="16" height="44" fill="#d97706"/></g>
<g font-family="monospace" font-size="5" font-weight="900" fill="#78350f"></g>
<circle cx="60" cy="30" r="14" fill="url(#eg-goldcstr)" stroke="${OL}" stroke-width="2.5"/>${smug(28, 5)}`),
});

// 小さな表（テーブル）と DB の筒
const tbl = (x, y, w, h, c = '#e0f2fe', rows = 3, cols = 3) => `<g stroke="${OL}" stroke-width="2"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}"/><rect x="${x}" y="${y}" width="${w}" height="${h / (rows + 1)}" rx="3" fill="#38bdf8"/>${Array.from({ length: rows }, (_, i) => `<path d="M${x} ${y + (h / (rows + 1)) * (i + 1)} h${w}"/>`).join('')}${Array.from({ length: cols - 1 }, (_, i) => `<path d="M${x + (w / cols) * (i + 1)} ${y} v${h}"/>`).join('')}</g>`;
const cyl = (x, y, w, h, c = '#38bdf8') => `<g stroke="${OL}" stroke-width="2.5"><path d="M${x} ${y} v${h} a${w / 2} ${w / 6} 0 0 0 ${w} 0 v-${h}" fill="${c}"/><ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2}" ry="${w / 6}" fill="#bae6fd"/><path d="M${x} ${y + h / 2} a${w / 2} ${w / 6} 0 0 0 ${w} 0" fill="none"/></g>`;
const keyShape = (x, y, c = '#fbbf24', r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})" stroke="${OL}" stroke-width="2.5"><circle r="11" fill="${c}"/><circle r="4" fill="#fff"/><path d="M11 -3 h26 v6 h-4 v6 h-5 v-6 h-4 v6 h-5 v-6 h-8z" fill="${c}" stroke-linejoin="round"/></g>`;

Object.assign(ENEMY_ART, {
  // ----- DB：どの回にも出る雑魚 -----
  'db|NULL霊': sprite('dbnull', `
<path d="M30 98 q-6 -58 30 -64 q36 6 30 64 l-8 -8 l-8 10 l-7 -10 l-7 10 l-7 -10 l-8 10 l-7 -10z" fill="#e2e8f0" fill-opacity=".75" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${evil(56, 10, '#94a3b8')}<ellipse cx="60" cy="74" rx="6" ry="8" fill="#334155" stroke="${OL}" stroke-width="2"/>
<path d="M28 70 q-12 0 -14 10 M92 70 q12 0 14 10" stroke="${OL}" stroke-width="2.5" fill="none"/>`),
  'db|重複レコード': sprite('dup', `
${[0, 1].map((i) => `<g transform="translate(${i * 30} ${i * -4})"><ellipse cx="44" cy="70" rx="22" ry="26" fill="#a78bfa" stroke="${OL}" stroke-width="3"/>${''}<path d="M34 64 l5 1.5 M50 64 l-5 1.5" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/><circle cx="37" cy="68" r="2" fill="${OL}"/><circle cx="51" cy="68" r="2" fill="${OL}"/><path d="M38 80 q6 4 12 0" stroke="${OL}" stroke-width="2" fill="none"/><rect x="30" y="88" width="28" height="9" rx="2" fill="#ede9fe" stroke="${OL}" stroke-width="1.8"/></g>`).join('')}`),
  'db|ゴミデータ': sprite('garbage', `
<path d="M30 48 h60 l-6 60 h-48z" fill="#78716c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><rect x="24" y="40" width="72" height="10" rx="3" fill="#a8a29e" stroke="${OL}" stroke-width="3" transform="rotate(-8 60 45)"/>
<g stroke="${OL}" stroke-width="1.5"><rect x="38" y="26" width="12" height="10" fill="#fca5a5" transform="rotate(-20 44 31)"/><rect x="64" y="22" width="12" height="10" fill="#fde047" transform="rotate(15 70 27)"/></g>
${evil(74, 12, '#bef264')}${grin(88, 9)}`),
  'db|文字化け': sprite('mojibake', `
${blob('#f472b6', 66, 30, 30)}
<g font-size="12" font-weight="900" fill="#831843" opacity=".75"><text x="38" y="58">縺</text><text x="66" y="54">繧</text><text x="54" y="96">�</text></g>
<g fill="none" stroke="${OL}" stroke-width="2.2"><path d="M42 72 l8 -4 l-8 -4 M78 72 l-8 -4 l8 -4"/></g><path d="M50 84 q5 -4 10 0 t10 0" stroke="${OL}" stroke-width="2.2" fill="none"/>`),
  'db|全件DELETE魔': sprite('delall', `
<path d="M74 28 q8 -12 18 -10" stroke="#78350f" stroke-width="3" fill="none"/><path d="M90 16 l4 -6 M94 20 l6 -2 M88 12 l-2 -6" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="60" cy="68" r="36" fill="#1f2937" stroke="${OL}" stroke-width="3"/><rect x="64" y="26" width="14" height="10" rx="2" fill="#475569" stroke="${OL}" stroke-width="2"/>
${hl(38, 52, 12)}${evil(64, 12, '#ef4444')}${grin(80, 12)}`),
  'db|迷子の主キー': sprite('lostpk', `
<g transform="translate(-30 -20) scale(1.6)">${keyShape(44, 60, '#fbbf24', -10)}</g>
<circle cx="40" cy="76" r="13" fill="#fbbf24"/><path d="M30 68 l7 3 M50 68 l-7 3" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/><circle cx="34" cy="74" r="2.4" fill="${OL}"/><circle cx="46" cy="74" r="2.4" fill="${OL}"/>
<path d="M35 84 q5 -4 10 0" stroke="${OL}" stroke-width="2.2" fill="none"/><text x="92" y="42" font-size="18" font-weight="900" fill="#fde047">?</text>`),
  // ----- DB：回ごとの雑魚 -----
  'db|INSERT忘れ': sprite('noinsert', `
<path d="M50 108 v-46" stroke="#78350f" stroke-width="6"/><path d="M26 40 h48 q12 0 12 12 v18 h-60z" fill="#3b82f6" stroke="${OL}" stroke-width="3"/><path d="M26 40 q-12 0 -12 12 v18 h12" fill="#1d4ed8" stroke="${OL}" stroke-width="3"/>
<path d="M86 48 v-16 h10 v6 h-6" fill="#ef4444" stroke="${OL}" stroke-width="2"/>${evil(56, 10, '#fff').replace(/60 -/g, '56 -').replace(/60 \+/g, '56 +')}`),
  'db|命令まちがい': sprite('wrongcmd', `
<g stroke="${OL}" stroke-width="2.5">${[['#38bdf8', -18], ['#4ade80', -6], ['#fbbf24', 6], ['#f87171', 18]].map(([c, r], i) => `<rect x="44" y="34" width="32" height="46" rx="4" fill="${c}" transform="rotate(${r} 60 100)"/>`).join('')}</g>
${evil(56, 8, '#fff')}<path d="M52 68 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'db|LIKE迷い': sprite('like', `
<circle cx="52" cy="54" r="28" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="5"/><path d="M72 74 l24 24" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M72 74 l24 24" stroke="#a16207" stroke-width="7" stroke-linecap="round"/>
${evil(54, 9, '#0ea5e9').replace(/60 -/g, '52 -').replace(/60 \+/g, '52 +')}<text x="44" y="72" font-size="11" font-weight="900" fill="#0369a1">%</text>`),
  'db|BETWEENはみ出し': sprite('between', `
<path d="M14 62 h92" stroke="#94a3b8" stroke-width="4"/><path d="M30 50 v24 M90 50 v24" stroke="${OL}" stroke-width="4"/>
<ellipse cx="96" cy="62" rx="16" ry="20" fill="#fb923c" stroke="${OL}" stroke-width="3"/>${evil(58, 5, '#fff').replace(/60 -/g, '96 -').replace(/60 \+/g, '96 +')}
<path d="M88 72 q8 3 14 -1" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'db|ORDER逆さま': sprite('orderrev', `
<g stroke="${OL}" stroke-width="2.5"><rect x="26" y="34" width="20" height="70" fill="#f472b6"/><rect x="50" y="54" width="20" height="50" fill="#fb923c"/><rect x="74" y="74" width="20" height="30" fill="#facc15"/></g>
<path d="M98 40 v40 l-8 -8 M98 80 l8 -8" stroke="#fde047" stroke-width="3" fill="none" stroke-linecap="round"/>
${evil(48, 0, '#fff').replace(/cx="60"/g, 'cx="36"')}<path d="M30 46 l4 1 M40 46 l-4 1" stroke="${OL}" stroke-width="0"/>
<g transform="translate(36 52)"><circle cx="-4" r="2" fill="${OL}"/><circle cx="4" r="2" fill="${OL}"/><path d="M-4 8 q4 -3 8 0" stroke="${OL}" stroke-width="2" fill="none"/></g>`),
  'db|LIMITかくれんぼ': sprite('limit', `
<rect x="20" y="30" width="80" height="78" rx="6" fill="#64748b" stroke="${OL}" stroke-width="3"/><rect x="20" y="30" width="80" height="26" rx="6" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="72" r="18" fill="#a78bfa" stroke="${OL}" stroke-width="3"/><path d="M42 66 q18 -8 36 0 l-4 10 q-14 -6 -28 0z" fill="#facc15" stroke="${OL}" stroke-width="2"/>
<path d="M52 84 q8 4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'db|CASEまよい': sprite('casesql', `
<path d="M60 104 v-30 l-24 -24 M60 74 l24 -24 M60 74 v-34" stroke="#78350f" stroke-width="7" stroke-linecap="round" fill="none"/>
<circle cx="60" cy="86" r="16" fill="#22d3ee" stroke="${OL}" stroke-width="3"/>${evil(84, 5, '#fff')}
<g fill="#fde047" stroke="${OL}" stroke-width="2"><circle cx="36" cy="46" r="6"/><circle cx="60" cy="36" r="6"/><circle cx="84" cy="46" r="6"/></g>`),
  'db|NULL伝染': sprite('nullinf', `
<path d="M48 24 h24 v10 l14 46 q4 20 -16 24 h-20 q-20 -4 -16 -24 l14 -46z" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M36 72 q24 -8 48 0 l2 10 q2 16 -16 20 h-20 q-18 -4 -16 -20z" fill="#a3e635"/>
<g fill="#ecfccb"><circle cx="50" cy="84" r="3"/><circle cx="66" cy="90" r="2.5"/></g>${evil(70, 9, '#fff')}`),
  'db|HAVINGまちがい': sprite('havingx', `
<rect x="26" y="30" width="68" height="76" rx="8" fill="#0f766e" stroke="${OL}" stroke-width="3"/><rect x="34" y="38" width="52" height="16" rx="2" fill="#99f6e4" stroke="${OL}" stroke-width="2"/>
<g fill="#5eead4" stroke="${OL}" stroke-width="1.5">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${36 + c * 17}" y="${62 + r * 13}" width="13" height="9" rx="2"/>`).join('')).join('')}</g>
${evil(46, 10, '#0f766e')}`),
  'db|GROUPはぐれ': sprite('groupstray', `
<g fill="#f8fafc" stroke="${OL}" stroke-width="2">${[[22, 60], [34, 52], [28, 72], [42, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join('')}</g>
<g fill="#fff" stroke="${OL}" stroke-width="2.5">${[[80, 64], [92, 58], [96, 72], [84, 76], [74, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10"/>`).join('')}</g>
<ellipse cx="86" cy="68" rx="10" ry="12" fill="#334155" stroke="${OL}" stroke-width="2"/><circle cx="82" cy="66" r="2" fill="#fde047"/><circle cx="90" cy="66" r="2" fill="#fde047"/>
<path d="M78 86 v10 M92 86 v10" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`),
  'db|副問合せ複数': sprite('multisub', `
${[[34, 70, '#f472b6'], [60, 62, '#a78bfa'], [86, 70, '#38bdf8']].map(([x, y, c]) => `<g><ellipse cx="${x}" cy="${y}" rx="15" ry="20" fill="${c}" stroke="${OL}" stroke-width="2.5"/><path d="M${x - 7} ${y - 6} l5 1.5 M${x + 7} ${y - 6} l-5 1.5" stroke="${OL}" stroke-width="2"/><circle cx="${x - 5}" cy="${y - 2}" r="1.6" fill="${OL}"/><circle cx="${x + 5}" cy="${y - 2}" r="1.6" fill="${OL}"/></g>`).join('')}
<path d="M14 40 q46 -24 92 0" stroke="#fde047" stroke-width="3" fill="none" stroke-dasharray="4 4"/>`),
  'db|NOT IN罠': sprite('notin', `
<path d="M16 96 h88" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
<path d="M24 96 a36 36 0 0 1 72 0" fill="none" stroke="#94a3b8" stroke-width="5"/><g stroke="#cbd5e1" stroke-width="3">${Array.from({ length: 7 }, (_, i) => { const a = Math.PI + (i + 1) * Math.PI / 8; return `<path d="M${(60 + Math.cos(a) * 36).toFixed(1)} ${(96 + Math.sin(a) * 36).toFixed(1)} l${(Math.cos(a) * -8).toFixed(1)} ${(Math.sin(a) * -8).toFixed(1)}"/>`; }).join('')}</g>
<rect x="48" y="80" width="24" height="12" rx="2" fill="#ef4444" stroke="${OL}" stroke-width="2"/>${evil(72, 10, '#fde047')}`),
  'db|結合条件忘れ': sprite('joinx', `
${tbl(10, 46, 36, 40, '#e0f2fe')}${tbl(74, 46, 36, 40, '#fce7f3')}
<g stroke="#ef4444" stroke-width="2.5" fill="none"><path d="M46 56 l28 22 M46 66 l28 -8 M46 76 l28 4"/></g>
${evil(36, 22, '#fde047')}`),
  'db|あいまい列': sprite('ambigcol', `
<path d="M14 70 q10 -28 30 -22 q8 -18 26 -12 q18 -10 30 8 q16 4 12 22 q-2 18 -22 16 h-56 q-24 -2 -20 -12z" fill="#cbd5e1" fill-opacity=".9" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#94a3b8" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M24 90 h40 M50 98 h50"/></g>${evil(68, 12, '#e2e8f0')}`),
  // ----- DB：回のボス -----
  'db|WHERE忘れ大王': sprite('wherek', `
<path d="M16 110 q4 -36 44 -42 q40 6 44 42z" fill="#1e3a8a" stroke="${OL}" stroke-width="3"/>
<g fill="#60a5fa" stroke="${OL}" stroke-width="1.5" opacity=".9">${[0, 1, 2].map((r) => `<rect x="${32 + r * 4}" y="${84 + r * 8}" width="${56 - r * 8}" height="6" rx="1"/>`).join('')}</g>
<path d="M22 40 l-6 -18 l14 10 M98 40 l6 -18 l-14 10" fill="#1e40af" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="52" r="24" fill="#3b82f6" stroke="${OL}" stroke-width="3"/>
<path d="M36 32 l6 -16 l10 10 l8 -14 l8 14 l10 -10 l6 16z" fill="url(#eg-wherek)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
${evil(50, 10, '#fde047')}${grin(62, 12)}`, { aura: '#3b82f6' }),
  'db|検索の迷宮主': sprite('mazelord', `
<rect x="16" y="22" width="88" height="88" rx="6" fill="#134e4a" stroke="${OL}" stroke-width="3"/>
<g stroke="#5eead4" stroke-width="4" fill="none" stroke-linecap="round"><path d="M26 32 h30 v14 h20 M86 32 v28 h-14 M26 46 v24 h16 v14 M50 60 h14 v24 M76 74 h18 v24 h-30 M26 96 h22"/></g>
<circle cx="60" cy="62" r="18" fill="#0d9488" stroke="${OL}" stroke-width="3"/>${evil(60, 7, '#fde047')}${grin(70, 7)}
<path d="M44 40 l-6 -14 l12 8z M76 40 l6 -14 l-12 8z" fill="url(#eg-mazelord)" stroke="${OL}" stroke-width="2"/>`, { aura: '#14b8a6' }),
  'db|並び替えカオス': sprite('chaos', `
<path d="M20 30 q40 -14 80 0 q-6 14 -24 18 q14 6 10 20 q-12 10 -28 8 q6 10 0 18 q-10 4 -16 0 q2 10 -6 14 q-8 -8 -4 -18 q-12 -4 -10 -16 q-10 -8 -6 -22 q-10 -6 4 -22z" fill="#c084fc" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g stroke="${OL}" stroke-width="1.5">${[[30, 20, '#fde047'], [90, 26, '#38bdf8'], [16, 60, '#4ade80'], [100, 70, '#fb7185'], [84, 100, '#fde047']].map(([x, y, c], i) => `<rect x="${x}" y="${y}" width="12" height="8" fill="${c}" transform="rotate(${i * 30} ${x + 6} ${y + 4})"/>`).join('')}</g>
${evil(40, 11, '#fde047')}${grin(54, 12)}`, { aura: '#a855f7' }),
  'db|関数キメラ': sprite('chimera', `
<path d="M16 110 q-2 -30 20 -40 h48 q22 10 20 40z" fill="#16a34a" stroke="${OL}" stroke-width="3"/>
${[[30, 50, '#f97316'], [60, 38, '#22c55e'], [90, 50, '#3b82f6']].map(([x, y, c]) => `<g><path d="M${x - 8} ${y - 10} l-4 -10 l9 5z M${x + 8} ${y - 10} l4 -10 l-9 5z" fill="${c}" stroke="${OL}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="15" fill="${c}" stroke="${OL}" stroke-width="3"/><path d="M${x - 9} ${y - 4} l6 2 M${x + 9} ${y - 4} l-6 2" stroke="${OL}" stroke-width="2.2"/><circle cx="${x - 5}" cy="${y}" r="2" fill="#fde047"/><circle cx="${x + 5}" cy="${y}" r="2" fill="#fde047"/><path d="M${x - 6} ${y + 7} l3 3 l3 -3 l3 3 l3 -3" stroke="#fff" stroke-width="1.6" fill="none"/></g>`).join('')}`, { aura: '#22c55e' }),
  'db|集計ゴーレム': sprite('sumgolem', `
<path d="M22 66 l-12 6 l-2 18 l12 4 l8 -14z M98 66 l12 6 l2 18 l-12 4 l-8 -14z" fill="#64748b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 108 l-2 -48 l8 -14 h52 l8 14 l-2 48z" fill="#94a3b8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g font-size="16" font-weight="900" fill="#fde047" stroke="${OL}" stroke-width=".8"><text x="50" y="92">Σ</text></g>
<path d="M40 44 l4 -22 h32 l4 22z" fill="#cbd5e1" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M46 32 h12 v5 h-12z M62 32 h12 v5 h-12z" fill="#f97316" stroke="${OL}" stroke-width="1.5"/>`, { aura: '#94a3b8' }),
  'db|副問合せの影': sprite('subshadow', `
<path d="M24 108 q-6 -60 36 -70 q42 10 36 70 q-10 -10 -18 0 q-8 -10 -18 0 q-10 -10 -18 0 q-8 -10 -18 0z" fill="#1e1b4b" stroke="${OL}" stroke-width="3"/>
<g fill="none" stroke="#6366f1" stroke-width="3"><path d="M44 56 q-8 14 0 28 M76 56 q8 14 0 28"/><path d="M50 62 q-4 8 0 16 M70 62 q4 8 0 16"/></g>
${evil(46, 10, '#a5b4fc')}`, { aura: '#6366f1' }),
  'db|NULL消しの番人': sprite('nullguard', `
<ellipse cx="60" cy="100" rx="40" ry="10" fill="#020617" stroke="${OL}" stroke-width="3"/>
<path d="M30 96 v-40 q0 -26 30 -26 q30 0 30 26 v40" fill="#334155" stroke="${OL}" stroke-width="3"/>
<path d="M30 60 h60" stroke="#475569" stroke-width="5"/><path d="M22 40 v60 M98 40 v60" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/><path d="M18 40 l4 -10 l4 10 M94 40 l4 -10 l4 10" fill="#cbd5e1" stroke="${OL}" stroke-width="1.5"/>
${evil(46, 11, '#f87171')}${grin(58, 10)}`, { aura: '#ef4444' }),
  'db|ゴールデンインデックス': gold('goldidx', `
<path d="M28 30 h56 q8 0 8 8 v64 h-56 q-8 0 -8 -8z" fill="url(#eg-goldidx)" stroke="${OL}" stroke-width="3"/><path d="M36 102 v-72" stroke="#92400e" stroke-width="2"/>
<g stroke="${OL}" stroke-width="1.5"><rect x="92" y="36" width="10" height="12" fill="#ef4444"/><rect x="92" y="52" width="10" height="12" fill="#38bdf8"/><rect x="92" y="68" width="10" height="12" fill="#4ade80"/></g>
${smug(62, 10).replace(/60 -/g, '64 -').replace(/60 \+/g, '64 +')}`),
});

Object.assign(ENEMY_ART, {
  // ----- DB：ステージ専用（第2回） -----
  'db|テーブル迷子': sprite('tablelost', `${tbl(24, 38, 72, 56, '#e0f2fe', 3, 3)}
<path d="M30 94 l-4 14 M90 94 l4 14" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>${evil(64, 14, '#fde047')}<path d="M52 80 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'db|DBMS居眠り': sprite('dbmssleep', `${cyl(30, 42, 60, 54, '#60a5fa')}
<path d="M44 70 q6 4 12 0 M64 70 q6 4 12 0" stroke="${OL}" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="60" cy="84" rx="5" ry="3" fill="#1e3a8a"/>
<g font-weight="900" fill="#e0f2fe"><text x="88" y="34" font-size="14">z</text><text x="100" y="22" font-size="10">z</text></g>`),
  'db|金のテーブル': gold('goldtbl', `<g transform="translate(0 0)">${tbl(26, 40, 68, 56, '#fde68a', 3, 3).replace(/#38bdf8/g, '#f59e0b')}</g>${smug(78, 12)}`),
  'db|UPDATE暴走': sprite('updrun', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M4 60 h18 M2 74 h14 M6 88 h16"/></g>
<path d="M22 86 q4 -20 22 -22 l12 -14 h24 l14 16 q14 2 16 20z" fill="#ef4444" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M58 52 h18 l10 12 h-28z" fill="#bae6fd" stroke="${OL}" stroke-width="2"/>
<circle cx="38" cy="88" r="10" fill="#1f2937" stroke="${OL}" stroke-width="2.5"/><circle cx="90" cy="88" r="10" fill="#1f2937" stroke="${OL}" stroke-width="2.5"/>${evil(72, 10, '#fde047').replace(/60 -/g, '46 -').replace(/60 \+/g, '46 +')}`),
  'db|VALUES迷子': sprite('valueslost', `
<path d="M24 50 l36 -14 l36 14 v44 l-36 14 l-36 -14z" fill="#d6a76c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M24 50 l36 14 l36 -14 M60 64 v44" stroke="${OL}" stroke-width="2.5" fill="none"/>
<g stroke="${OL}" stroke-width="1.5"><rect x="36" y="22" width="10" height="10" fill="#38bdf8" transform="rotate(20 41 27)"/><rect x="62" y="16" width="10" height="10" fill="#f472b6" transform="rotate(-15 67 21)"/><rect x="80" y="26" width="10" height="10" fill="#4ade80"/></g>
${evil(82, 0, '#fff').replace(/cx="60"/g, 'cx="42"')}<path d="M34 80 l5 1 M48 80 l-5 1" stroke="${OL}" stroke-width="0"/>`),
  'db|金の4大命令': gold('gold4', `
<g stroke="${OL}" stroke-width="2.5">${[-24, -8, 8, 24].map((r, i) => `<rect x="46" y="36" width="28" height="44" rx="4" fill="url(#eg-gold4)" transform="rotate(${r} 60 100)"/>`).join('')}</g>
${smug(56, 7)}`),
  // ----- 第3回 -----
  'db|アスタリスク乱用': sprite('starabuse', `
<path d="M60 18 l12 26 l28 4 l-20 20 l6 28 l-26 -14 l-26 14 l6 -28 l-20 -20 l28 -4z" fill="#facc15" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${evil(58, 9, '#fff')}${grin(70, 8)}<g fill="#fde047"><circle cx="14" cy="96" r="4"/><circle cx="104" cy="96" r="3"/><circle cx="28" cy="108" r="2.5"/></g>`),
  'db|IN迷子': sprite('inlost', `
<path d="M24 58 h72 l-8 46 h-56z" fill="#d97706" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M28 70 h64 M30 82 h60 M32 94 h56" stroke="#92400e" stroke-width="2"/><path d="M36 58 q24 -40 48 0" stroke="${OL}" stroke-width="4" fill="none"/>
<circle cx="60" cy="52" r="12" fill="#a3e635" stroke="${OL}" stroke-width="2.5"/><circle cx="56" cy="51" r="1.8" fill="${OL}"/><circle cx="64" cy="51" r="1.8" fill="${OL}"/><path d="M56 57 q4 2 8 0" stroke="${OL}" stroke-width="1.6" fill="none"/>
<g stroke="${OL}" stroke-width="1.5"><circle cx="16" cy="40" r="7" fill="#f87171"/><circle cx="104" cy="44" r="7" fill="#60a5fa"/></g>`),
  'db|金のWHERE': gold('goldwhere', `
<circle cx="54" cy="54" r="26" fill="#fef9c3" fill-opacity=".8" stroke="url(#eg-goldwhere)" stroke-width="7"/><path d="M74 74 l22 22" stroke="url(#eg-goldwhere)" stroke-width="11" stroke-linecap="round"/><path d="M74 74 l22 22" stroke="${OL}" stroke-width="1.5" fill="none"/>
${smug(52, 8).replace(/60 -/g, '54 -').replace(/60 \+/g, '54 +')}`),
  'db|AND/OR混線': sprite('andor', `
<g fill="none" stroke-linecap="round" stroke-width="5"><path d="M14 40 q30 30 46 20 t46 -20" stroke="#ef4444"/><path d="M14 60 q30 -30 46 0 t46 0" stroke="#3b82f6"/><path d="M14 84 q40 -10 46 -24 t46 24" stroke="#22c55e"/></g>
<rect x="44" y="52" width="32" height="30" rx="6" fill="#334155" stroke="${OL}" stroke-width="3"/>${evil(66, 7, '#fde047')}
<g stroke="${OL}" stroke-width="2"><rect x="8" y="34" width="8" height="12" fill="#fbbf24"/><rect x="104" y="78" width="8" height="12" fill="#fbbf24"/></g>`),
  'db|IS NULL忘れ': sprite('isnull', `
${blob('#e2e8f0', 66, 30, 30)}<path d="M56 46 q0 -10 8 -10 q8 0 8 8 q0 6 -8 8 v6" stroke="#64748b" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>
${evil(68, 10, '#94a3b8')}<path d="M52 82 h16" stroke="${OL}" stroke-width="2.2"/>`),
  'db|金の検索': gold('goldsearch', `
<circle cx="60" cy="64" r="34" fill="url(#eg-goldsearch)" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="64" r="24" fill="#fffbeb" stroke="${OL}" stroke-width="2"/>
<path d="M60 44 l6 20 l-6 20 l-6 -20z" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/><path d="M60 64 l6 20 l-6 0z" fill="#3b82f6"/>
${smug(56, 13)}`),
  // ----- 第4回 -----
  'db|DISTINCT忘れ': sprite('nodistinct', `
${[0, 1, 2].map((i) => `<g transform="translate(${i * 24 - 24} ${i % 2 ? 6 : 0})"><path d="M44 96 q-4 -40 16 -42 q20 2 16 42z" fill="#fb7185" stroke="${OL}" stroke-width="2.5"/><path d="M52 70 l4 1 M68 70 l-4 1" stroke="${OL}" stroke-width="2"/><circle cx="54" cy="74" r="1.6" fill="${OL}"/><circle cx="66" cy="74" r="1.6" fill="${OL}"/><path d="M56 82 q4 2 8 0" stroke="${OL}" stroke-width="1.6" fill="none"/></g>`).join('')}`),
  'db|DESC逆走': sprite('desc', `
<path d="M60 108 l-28 -40 h18 v-44 h20 v44 h18z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>${evil(46, 7, '#fff')}${grin(58, 6)}
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M36 30 v-14 M84 30 v-14 M96 46 v-14"/></g>`),
  'db|金の並び順': gold('goldorder', `
<g stroke="${OL}" stroke-width="2.5"><rect x="26" y="78" width="18" height="26" fill="url(#eg-goldorder)"/><rect x="48" y="62" width="18" height="42" fill="url(#eg-goldorder)"/><rect x="70" y="44" width="18" height="60" fill="url(#eg-goldorder)"/></g>
${smug(64, 12).replace(/60 -/g, '57 -').replace(/60 \+/g, '57 +')}`),
  'db|OFFSETずれ': sprite('offset', `
<g stroke="${OL}" stroke-width="2"><rect x="18" y="36" width="56" height="12" rx="2" fill="#cbd5e1" opacity=".6"/><rect x="18" y="52" width="56" height="12" rx="2" fill="#cbd5e1" opacity=".6"/><rect x="32" y="68" width="56" height="12" rx="2" fill="#38bdf8"/><rect x="32" y="84" width="56" height="12" rx="2" fill="#38bdf8"/></g>
<path d="M90 42 q16 8 0 30" stroke="#fde047" stroke-width="3" fill="none"/><path d="M86 70 l4 4 l4 -6" stroke="#fde047" stroke-width="3" fill="none"/>${evil(80, 12, '#fff')}`),
  'db|UNIONかぶり': sprite('union', `
<circle cx="46" cy="62" r="28" fill="#f472b6" fill-opacity=".85" stroke="${OL}" stroke-width="3"/><circle cx="74" cy="62" r="28" fill="#60a5fa" fill-opacity=".85" stroke="${OL}" stroke-width="3"/>
<path d="M60 38 a28 28 0 0 1 0 48 a28 28 0 0 1 0 -48z" fill="#a78bfa" stroke="${OL}" stroke-width="2"/>${evil(60, 18, '#fff')}${grin(74, 8)}`),
  'db|金の集合': gold('goldset', `
<g stroke="${OL}" stroke-width="3"><circle cx="46" cy="58" r="22" fill="url(#eg-goldset)" fill-opacity=".9"/><circle cx="74" cy="58" r="22" fill="url(#eg-goldset)" fill-opacity=".9"/><circle cx="60" cy="80" r="22" fill="url(#eg-goldset)" fill-opacity=".9"/></g>
${smug(64, 8)}`),
});

Object.assign(ENEMY_ART, {
  // ----- DB：ステージ専用（第5回） -----
  'db|文字列連結ミス': sprite('concat', `
<g stroke="${OL}" stroke-width="3"><rect x="14" y="52" width="38" height="26" rx="6" fill="#f472b6"/><rect x="68" y="52" width="38" height="26" rx="6" fill="#60a5fa"/></g>
<path d="M52 60 q8 -10 16 0 M52 70 q8 10 16 0" stroke="#94a3b8" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M58 56 l4 -8" stroke="#fde047" stroke-width="3"/>
${evil(64, 26, '#fff')}`),
  'db|ROUNDずれ': sprite('round', `
<circle cx="60" cy="64" r="34" fill="#a3e635" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="64" r="26" fill="none" stroke="#4d7c0f" stroke-width="2" stroke-dasharray="4 4"/>
${evil(58, 11, '#fff')}<path d="M50 76 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>`),
  'db|金の関数': gold('golddbfn', `
<path d="M32 104 l40 -64" stroke="#78350f" stroke-width="6" stroke-linecap="round"/><path d="M72 40 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4z" fill="url(#eg-golddbfn)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="44" cy="80" r="14" fill="url(#eg-golddbfn)" stroke="${OL}" stroke-width="2.5"/>${smug(78, 5).replace(/60 -/g, '44 -').replace(/60 \+/g, '44 +')}`),
  'db|日付迷子': sprite('datelost', `
<rect x="24" y="30" width="72" height="72" rx="8" fill="#fff" stroke="${OL}" stroke-width="3"/><rect x="24" y="30" width="72" height="18" rx="8" fill="#ef4444" stroke="${OL}" stroke-width="3"/><path d="M40 24 v14 M80 24 v14" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>
<g fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1">${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${32 + c * 15}" y="${56 + r * 14}" width="11" height="10" rx="2"/>`).join('')).join('')}</g>
${evil(72, 12, '#fde047')}`),
  'db|型変換ミス': sprite('castmiss', `
<path d="M60 30 a32 32 0 1 1 -30 22" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M60 30 a32 32 0 1 1 -30 22" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/><path d="M22 44 l8 10 l8 -10" fill="#38bdf8" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="62" r="16" fill="#e0f2fe" stroke="${OL}" stroke-width="2.5"/>${evil(62, 6, '#0ea5e9')}`),
  'db|金のCASE': gold('goldcase', `
<rect x="30" y="38" width="60" height="62" rx="8" fill="url(#eg-goldcase)" stroke="${OL}" stroke-width="3"/>
<g stroke="${OL}" stroke-width="2">${[0, 1, 2].map((i) => `<path d="M${42 + i * 18} 50 v40" stroke="#92400e"/><rect x="${36 + i * 18}" y="${[56, 74, 64][i]}" width="12" height="8" rx="2" fill="#fff7ed"/>`).join('')}</g>${smug(30, 9)}`),
  // ----- 第6回 -----
  'db|COUNTかぞえ違い': sprite('countx', `
<g fill="#f8fafc" stroke="${OL}" stroke-width="2.5">${[[30, 86], [50, 92], [70, 88], [90, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10"/>`).join('')}</g><circle cx="90" cy="84" r="10" fill="#cbd5e1" stroke="${OL}" stroke-width="2.5" stroke-dasharray="3 2"/>
<circle cx="60" cy="48" r="22" fill="#14b8a6" stroke="${OL}" stroke-width="3"/>${evil(46, 8, '#fff')}<path d="M52 58 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
<path d="M78 56 l10 18" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>`),
  'db|AVGまよい': sprite('avg', `
<path d="M16 100 h88" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2.5"><rect x="22" y="60" width="14" height="40" fill="#60a5fa"/><rect x="42" y="44" width="14" height="56" fill="#60a5fa"/><rect x="62" y="74" width="14" height="26" fill="#60a5fa"/><rect x="82" y="52" width="14" height="48" fill="#cbd5e1" stroke-dasharray="3 2"/></g>
<path d="M16 66 h88" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6 4"/>${evil(30, 12, '#fde047')}`),
  'db|金の集計': gold('goldsum', `
<path d="M34 54 q-8 -6 -4 -16 h60 q4 10 -4 16 q16 10 16 30 q0 24 -30 24 q-30 0 -30 -24 q0 -20 16 -30z" fill="url(#eg-goldsum)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 38 q20 -14 40 0" stroke="#92400e" stroke-width="3" fill="none"/>${smug(76, 11)}`),
  'db|GROUP BY迷子': sprite('groupby', `
<g stroke="${OL}" stroke-width="2.5"><rect x="16" y="56" width="26" height="40" rx="3" fill="#f472b6"/><rect x="47" y="56" width="26" height="40" rx="3" fill="#60a5fa"/><rect x="78" y="56" width="26" height="40" rx="3" fill="#4ade80"/></g>
<g stroke="${OL}" stroke-width="1.5" fill="#fff">${[[22, 64], [30, 76], [52, 66], [62, 80], [86, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
<circle cx="60" cy="34" r="16" fill="#fde047" stroke="${OL}" stroke-width="3"/><circle cx="55" cy="33" r="1.8" fill="${OL}"/><circle cx="65" cy="33" r="1.8" fill="${OL}"/><path d="M55 40 q5 -3 10 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'db|HAVING取り違え': sprite('havingmix', `
<path d="M60 108 v-50" stroke="#78350f" stroke-width="6"/><rect x="22" y="22" width="76" height="40" rx="4" fill="#fde68a" stroke="${OL}" stroke-width="3" transform="rotate(-6 60 42)"/>
${evil(42, 12, '#fff')}<path d="M50 54 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>`),
  'db|金のグループ': gold('goldgroup', `
<g stroke="${OL}" stroke-width="2.5">${[[38, 70], [60, 62], [82, 70]].map(([x, y]) => `<path d="M${x - 14} ${y + 34} q0 -30 14 -34 q14 4 14 34z" fill="url(#eg-goldgroup)"/><circle cx="${x}" cy="${y - 4}" r="11" fill="url(#eg-goldgroup)"/>`).join('')}</g>
${[38, 60, 82].map((x, i) => smug([66, 58, 66][i], 4).replace(/60 -/g, `${x} -`).replace(/60 \+/g, `${x} +`)).join('')}`),
  // ----- 第7回 -----
  'db|カッコ迷子': sprite('paren', `
<path d="M40 22 q-24 40 0 80" stroke="${OL}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M40 22 q-24 40 0 80" stroke="#a78bfa" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M80 22 q24 40 0 80" stroke="#94a3b8" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="6 6"/>
${evil(60, 10, '#fde047')}<path d="M52 72 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'db|ANY/ALL混同': sprite('anyall', `
<circle cx="40" cy="66" r="22" fill="#38bdf8" stroke="${OL}" stroke-width="3"/><circle cx="80" cy="66" r="22" fill="#f472b6" stroke="${OL}" stroke-width="3"/>
${evil(64, 0, '#fff').replace(/cx="60"/g, 'cx="40"')}<g transform="translate(40 0)"><circle cx="35" cy="62" r="2" fill="${OL}"/><circle cx="45" cy="62" r="2" fill="${OL}"/></g>
<g transform="translate(40 62)"><circle cx="-6" r="2" fill="${OL}"/><circle cx="6" r="2" fill="${OL}"/><path d="M-5 9 q5 -3 10 0" stroke="${OL}" stroke-width="1.8" fill="none"/></g>
<g transform="translate(80 62)"><path d="M-8 -4 l5 2 M8 -4 l-5 2" stroke="${OL}" stroke-width="2"/><path d="M-5 9 q5 3 10 0" stroke="${OL}" stroke-width="1.8" fill="none"/></g>
<path d="M54 40 l12 -12 M66 40 l-12 -12" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>`),
  'db|金の副問合せ': gold('goldsub', `
<ellipse cx="60" cy="62" rx="30" ry="40" fill="url(#eg-goldsub)" stroke="${OL}" stroke-width="3"/><ellipse cx="60" cy="62" rx="20" ry="28" fill="#fef9c3" stroke="#b45309" stroke-width="2"/><ellipse cx="60" cy="62" rx="10" ry="14" fill="#fde68a" stroke="#b45309" stroke-width="1.5"/>
${smug(56, 8)}`),
  'db|相関迷子': sprite('correl', `
<path d="M30 78 q30 -50 60 0" stroke="#fb923c" stroke-width="4" fill="none" stroke-dasharray="5 4"/>
<circle cx="30" cy="80" r="16" fill="#fb923c" stroke="${OL}" stroke-width="3"/><circle cx="90" cy="80" r="16" fill="#facc15" stroke="${OL}" stroke-width="3"/>
<g transform="translate(30 78)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g><g transform="translate(90 78)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g>
<path d="M60 30 v-8" stroke="#fde047" stroke-width="3"/>`),
  'db|EXISTS迷い': sprite('exists', `
${blob('#2dd4bf', 66, 30, 30)}<g fill="#fff" stroke="${OL}" stroke-width="2.5"><circle cx="48" cy="60" r="10"/><circle cx="72" cy="60" r="10"/></g><circle cx="50" cy="62" r="4" fill="${OL}"/><circle cx="74" cy="62" r="4" fill="${OL}"/>
<path d="M52 82 q8 -4 16 0" stroke="${OL}" stroke-width="2.2" fill="none"/>`),
  'db|金の入れ子': gold('goldnest', `
<path d="M38 104 q-10 -30 4 -44 q-8 -20 18 -26 q26 6 18 26 q14 14 4 44z" fill="url(#eg-goldnest)" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="48" r="14" fill="#fff7ed" stroke="${OL}" stroke-width="2"/>
<path d="M40 74 q20 8 40 0" stroke="#92400e" stroke-width="2.5" fill="none"/>${smug(46, 5)}`),
  // ----- 第8回 -----
  'db|外部キー迷子': sprite('fklost', `${tbl(64, 50, 44, 44, '#fce7f3', 3, 2)}
<path d="M44 66 q12 -20 24 -4" stroke="#94a3b8" stroke-width="3" fill="none" stroke-dasharray="4 3"/>
<g transform="translate(-6 10) scale(1.1)">${keyShape(30, 60, '#fb923c', 20)}</g><circle cx="27" cy="76" r="1.8" fill="${OL}"/><circle cx="33" cy="76" r="1.8" fill="${OL}"/>`),
  'db|ON忘れ': sprite('noon', `
<path d="M14 54 h30 v-10 q0 -8 8 -8 q8 0 8 8 v10 h12 v28 h-58z" fill="#f472b6" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M76 58 h30 v28 h-30 v-8 q-8 0 -8 -6 q0 -6 8 -6z" fill="#60a5fa" stroke="${OL}" stroke-width="3" stroke-linejoin="round" transform="rotate(10 90 72)"/>
${evil(68, 22, '#fff').replace(/60 -/g, '50 -').replace(/60 \+/g, '50 +')}`),
  'db|金のリレーション': gold('goldrel', `
<path d="M18 80 q12 -20 30 -16 l14 10 q4 6 -2 8 l-10 -4 M102 80 q-12 -20 -30 -16 l-14 10" fill="url(#eg-goldrel)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M44 70 q16 -10 32 0 q-4 16 -16 18 q-12 -2 -16 -18z" fill="url(#eg-goldrel)" stroke="${OL}" stroke-width="3"/>${smug(46, 10)}`),
  'db|RIGHT JOIN迷子': sprite('rightjoin', `
<circle cx="44" cy="64" r="26" fill="#cbd5e1" fill-opacity=".6" stroke="${OL}" stroke-width="2.5" stroke-dasharray="5 3"/><circle cx="76" cy="64" r="26" fill="#22c55e" stroke="${OL}" stroke-width="3"/>
${evil(62, 8, '#fff').replace(/60 -/g, '80 -').replace(/60 \+/g, '80 +')}<path d="M72 76 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
<path d="M98 30 l10 0 l-4 -4 M108 30 l-4 4" stroke="#fde047" stroke-width="3" fill="none"/>`),
  'db|自己結合迷子': sprite('selfjoin', `
<rect x="54" y="30" width="12" height="72" rx="3" fill="#e2e8f0" stroke="${OL}" stroke-width="2.5"/>
<circle cx="34" cy="66" r="20" fill="#a78bfa" stroke="${OL}" stroke-width="3"/><circle cx="86" cy="66" r="20" fill="#a78bfa" fill-opacity=".6" stroke="${OL}" stroke-width="3"/>
<g transform="translate(34 64)"><path d="M-8 -6 l5 2 M8 -6 l-5 2" stroke="${OL}" stroke-width="2"/><circle cx="-5" cy="-1" r="1.8" fill="${OL}"/><circle cx="5" cy="-1" r="1.8" fill="${OL}"/></g>
<g transform="translate(86 64)"><path d="M-8 -6 l5 2 M8 -6 l-5 2" stroke="${OL}" stroke-width="2"/><circle cx="-5" cy="-1" r="1.8" fill="${OL}"/><circle cx="5" cy="-1" r="1.8" fill="${OL}"/></g>`),
  'db|金のJOIN': gold('goldjoin', `
<g fill="none" stroke-width="9">${[[24, 64], [44, 56], [64, 64], [84, 56], [100, 64]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" stroke="${OL}" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<g fill="none" stroke-width="5">${[[24, 64], [44, 56], [64, 64], [84, 56], [100, 64]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" stroke="url(#eg-goldjoin)" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<circle cx="60" cy="92" r="13" fill="url(#eg-goldjoin)" stroke="${OL}" stroke-width="2.5"/>${smug(90, 5)}`),
});

// UML のクラスの箱（3段）
const umlBox = (x, y, w, h, c = '#fef3c7') => `<g stroke="${OL}" stroke-width="2.5"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}"/><path d="M${x} ${y + h * 0.33} h${w} M${x} ${y + h * 0.66} h${w}"/></g>`;
const stick = (x, y, c = '#fff') => `<g stroke="${OL}" stroke-width="3" stroke-linecap="round" fill="${c}"><circle cx="${x}" cy="${y}" r="7"/><path d="M${x} ${y + 7} v16 M${x - 10} ${y + 13} h20 M${x} ${y + 23} l-8 12 M${x} ${y + 23} l8 12" fill="none"/></g>`;

Object.assign(ENEMY_ART, {
  // ----- 設計：どの回にも出る雑魚 -----
  'sd|仕様あいまい': sprite('vague', `
<path d="M16 76 q8 -30 30 -26 q8 -20 28 -14 q20 -8 28 12 q14 6 8 26 q-4 16 -22 14 h-54 q-22 0 -18 -12z" fill="#e2e8f0" fill-opacity=".85" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${evil(64, 12, '#cbd5e1')}<path d="M50 80 q5 -4 10 0 t10 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|分析中毒': sprite('analysis', `
${blob('#c084fc', 68, 30, 30)}<g fill="none" stroke="${OL}" stroke-width="2.2"><path d="M44 62 m-5 0 a5 5 0 1 1 5 5 a2.5 2.5 0 1 1 -2 -3"/><path d="M76 62 m-5 0 a5 5 0 1 1 5 5 a2.5 2.5 0 1 1 -2 -3"/></g>
<path d="M52 82 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/><g stroke="#fde047" stroke-width="2.5" stroke-linecap="round"><path d="M36 30 l-6 -8 M60 24 v-10 M84 30 l6 -8"/></g>`),
  'sd|スパゲッティ': sprite('spaghetti', `
<ellipse cx="60" cy="96" rx="40" ry="10" fill="#f8fafc" stroke="${OL}" stroke-width="3"/>
<g fill="none" stroke-linecap="round"><path d="M28 90 q10 -40 30 -20 t20 -20 t14 30 M34 92 q20 -60 40 -10 M50 94 q-10 -40 20 -40 q20 4 10 36" stroke="${OL}" stroke-width="7"/><path d="M28 90 q10 -40 30 -20 t20 -20 t14 30 M34 92 q20 -60 40 -10 M50 94 q-10 -40 20 -40 q20 4 10 36" stroke="#fcd34d" stroke-width="4"/></g>
<g fill="#ef4444" stroke="${OL}" stroke-width="2"><circle cx="46" cy="66" r="8"/><circle cx="74" cy="66" r="8"/></g><circle cx="46" cy="66" r="2" fill="#fff"/><circle cx="74" cy="66" r="2" fill="#fff"/>`),
  'sd|多重度ミス': sprite('multip', `
${umlBox(14, 44, 32, 40)}${umlBox(74, 44, 32, 40)}<path d="M46 64 h28" stroke="${OL}" stroke-width="3"/>
<path d="M50 40 l20 20 M70 40 l-20 20" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>${evil(94, 0, '#fff').replace(/cx="60"/g, 'cx="30"').replace(/cx="60"/g, 'cx="90"')}`),
  'sd|矢印まちがい': sprite('arrowx', `
<path d="M20 90 l50 -50" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M20 90 l50 -50" stroke="#f97316" stroke-width="6" stroke-linecap="round"/><path d="M62 30 l22 0 l0 22z" fill="#fff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 96 h40 l-10 -8 M100 96 l-10 8" stroke="${OL}" stroke-width="3" fill="none" stroke-dasharray="5 3"/>${evil(64, 8, '#fff').replace(/60 -/g, '40 -').replace(/60 \+/g, '40 +')}`),
  'sd|図なし魔': sprite('nodiagram', `
<path d="M34 24 h42 l12 12 v72 h-54z" fill="#f8fafc" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M76 24 v12 h12" fill="#e2e8f0" stroke="${OL}" stroke-width="2.5"/>
${evil(60, 10, '#a855f7')}${grin(76, 10)}<path d="M24 30 l-6 -8 M96 30 l6 -8" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>`),
  // ----- 設計：回ごとの雑魚 -----
  'sd|カプセルやぶり': sprite('capbreak', `
<g transform="rotate(-20 60 60)"><path d="M26 60 a16 16 0 0 1 16 -16 h18 v32 h-18 a16 16 0 0 1 -16 -16z" fill="#f87171" stroke="${OL}" stroke-width="3"/><path d="M64 44 h14 a16 16 0 0 1 0 32 h-14" fill="#fff" stroke="${OL}" stroke-width="3" transform="translate(10 -6) rotate(14 70 60)"/></g>
<g fill="#fde047" stroke="${OL}" stroke-width="1.2"><circle cx="66" cy="76" r="3"/><circle cx="74" cy="84" r="2.5"/><circle cx="62" cy="88" r="2"/></g>${evil(58, 9, '#fff').replace(/60 -/g, '42 -').replace(/60 \+/g, '42 +')}`),
  'sd|UML迷子': sprite('umllost', `${umlBox(30, 40, 60, 56, '#ddd6fe')}
<path d="M30 96 l-6 12 M90 96 l6 12" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>${evil(52, 12, '#fde047')}<path d="M52 82 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|アクター迷子': sprite('actorlost', `<g transform="translate(-60 -40) scale(2)">${stick(60, 38, '#fde68a')}</g><circle cx="55" cy="36" r="2" fill="${OL}"/><circle cx="65" cy="36" r="2" fill="${OL}"/><path d="M54 30 l4 1.5 M66 30 l-4 1.5" stroke="${OL}" stroke-width="2"/><text x="84" y="34" font-size="18" font-weight="900" fill="#fde047">?</text>`),
  'sd|include逆向き': sprite('includerev', `
<ellipse cx="34" cy="64" rx="24" ry="14" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><ellipse cx="88" cy="64" rx="24" ry="14" fill="#fef3c7" stroke="${OL}" stroke-width="3"/>
<path d="M64 64 h-6 M58 64 l8 -6 M58 64 l8 6" stroke="${OL}" stroke-width="2.5" stroke-dasharray="0" fill="none"/>${evil(64, 0, '#fff').replace(/cx="60"/g, 'cx="34"')}
<g transform="translate(34 62)"><circle cx="-6" r="2" fill="${OL}"/><circle cx="6" r="2" fill="${OL}"/></g><g transform="translate(88 62)"><circle cx="-6" r="2" fill="${OL}"/><circle cx="6" r="2" fill="${OL}"/></g>`),
  'sd|リンク切れ': sprite('linkbreak', `
<g stroke="${OL}" stroke-width="3"><rect x="10" y="50" width="34" height="26" rx="4" fill="#bae6fd"/><rect x="76" y="50" width="34" height="26" rx="4" fill="#bae6fd"/></g>
<path d="M44 63 h10 M66 63 h10" stroke="${OL}" stroke-width="4"/><path d="M54 56 l6 8 l-4 4 l6 8" stroke="#fde047" stroke-width="3" fill="none"/>
<g transform="translate(27 62)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g><g transform="translate(93 62)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g>`),
  'sd|下線わすれ': sprite('nounder', `
<rect x="20" y="44" width="80" height="34" rx="6" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><path d="M30 86 h60" stroke="#94a3b8" stroke-width="4" stroke-dasharray="6 6"/>${evil(60, 14, '#fff')}`),
  'sd|可視性まちがい': sprite('visib', `
<ellipse cx="60" cy="64" rx="40" ry="26" fill="#fff" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="64" r="16" fill="#8b5cf6" stroke="${OL}" stroke-width="2.5"/><circle cx="60" cy="64" r="7" fill="${OL}"/><circle cx="64" cy="60" r="3" fill="#fff"/>
<path d="M20 50 q40 -20 80 0" stroke="${OL}" stroke-width="3" fill="none"/><path d="M28 44 l-4 -8 M44 38 l-2 -8 M76 38 l2 -8 M92 44 l4 -8" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>`),
  'sd|ひし形まちがい': sprite('diamondx', `
<path d="M60 18 l32 40 l-32 40 l-32 -40z" fill="#fff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M60 58 l32 0 l-32 40 l-32 -40z" fill="#1f2937"/>
${evil(52, 10, '#a855f7')}<path d="M52 72 q8 -4 16 0" stroke="#fff" stroke-width="2" fill="none"/>`),
  'sd|ライフライン切れ': sprite('lifeline', `
<rect x="36" y="20" width="48" height="24" rx="3" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><path d="M60 44 v24 M60 84 v24" stroke="${OL}" stroke-width="3" stroke-dasharray="6 4"/><path d="M54 70 l6 6 l-4 4 l6 6" stroke="#ef4444" stroke-width="3" fill="none"/>
${evil(32, 10, '#fff')}`),
  'sd|非同期まちがい': sprite('async', `
<path d="M20 44 h76 v50 h-76z" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><path d="M20 44 l38 28 l38 -28" fill="none" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M100 54 h14 M104 66 h12 M100 78 h14"/></g>${evil(76, 14, '#a855f7')}`),
  'sd|番号ずれ': sprite('numoff', `
<g stroke="${OL}" stroke-width="2.5" font-weight="900" font-size="14">${[[28, 60, '2', '#fda4af'], [60, 44, '1', '#93c5fd'], [92, 66, '3', '#86efac']].map(([x, y, t, c]) => `<circle cx="${x}" cy="${y}" r="16" fill="${c}"/><text x="${x}" y="${y + 5}" text-anchor="middle" fill="${OL}" stroke="none">${t}</text>`).join('')}</g>
<g fill="${OL}"><circle cx="22" cy="52" r="1.8"/><circle cx="34" cy="52" r="1.8"/><circle cx="86" cy="58" r="1.8"/><circle cx="98" cy="58" r="1.8"/></g>`),
  'sd|コネクタ迷子': sprite('connector', `
<path d="M14 64 q12 -20 24 0 t24 0 t24 0 t24 0" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M14 64 q12 -20 24 0 t24 0 t24 0 t24 0" stroke="#a78bfa" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="106" cy="64" r="10" fill="#a78bfa" stroke="${OL}" stroke-width="2.5"/><circle cx="103" cy="62" r="1.8" fill="${OL}"/><circle cx="109" cy="62" r="1.8" fill="${OL}"/>`),
  'sd|出口なし': sprite('noexit', `
<rect x="20" y="40" width="80" height="50" rx="20" fill="#fca5a5" stroke="${OL}" stroke-width="3"/><g stroke="#f59e0b" stroke-width="6"><path d="M14 98 l92 -6" /></g><path d="M14 98 l92 -6" stroke="${OL}" stroke-width="1.5" stroke-dasharray="8 8"/>
${evil(62, 14, '#fff')}<path d="M50 78 q10 -5 20 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|ガード無視': sprite('guard', `
<path d="M60 18 l28 12 v26 q0 26 -28 40 q-28 -14 -28 -40 v-26z" fill="#ef4444" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M60 26 l20 8 v20 q0 18 -20 30 q-20 -12 -20 -30 v-20z" fill="#fca5a5"/>
${evil(52, 9, '#fff')}<path d="M50 68 q10 -5 20 0" stroke="${OL}" stroke-width="2.2" fill="none"/>`),
  // ----- 設計：回のボス -----
  'sd|設計図なし魔王': sprite('nodemon', `
<path d="M16 112 q4 -40 44 -46 q40 6 44 46z" fill="#3f6212" stroke="${OL}" stroke-width="3"/>
<g stroke="#a3e635" stroke-width="2" fill="none" opacity=".7"><path d="M30 100 l14 -12 M70 96 l18 -10"/></g>
<path d="M28 34 l-8 -20 l18 10 M92 34 l8 -20 l-18 10" fill="#365314" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M34 54 q0 -28 26 -28 q26 0 26 28 q0 22 -26 26 q-26 -4 -26 -26z" fill="#84cc16" stroke="${OL}" stroke-width="3"/>
<path d="M44 66 l6 4 M74 66 l-6 4" stroke="#365314" stroke-width="2"/>${evil(50, 10, '#fde047')}${grin(62, 11)}
<g transform="translate(96 76) rotate(16)"><rect x="-10" y="-14" width="20" height="26" fill="#bfdbfe" stroke="${OL}" stroke-width="2"/><path d="M-10 -14 l20 26 M10 -14 l-20 26" stroke="#ef4444" stroke-width="3"/></g>`, { aura: '#84cc16' }),
  'sd|境界こわし': sprite('boundary', `
<rect x="14" y="26" width="92" height="78" rx="4" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="14 10"/><g fill="#38bdf8" stroke="${OL}" stroke-width="1.5"><path d="M100 30 l10 -6 l-2 8z"/><path d="M12 96 l-6 8 l10 -2z"/></g>
<path d="M30 56 l-6 -18 l14 10 M90 56 l6 -18 l-14 10" fill="#b91c1c" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M30 74 q0 -30 30 -30 q30 0 30 30 q0 26 -30 30 q-30 -4 -30 -30z" fill="#ef4444" stroke="${OL}" stroke-width="3"/>${evil(70, 11, '#fde047')}${grin(84, 12)}
<path d="M14 80 l-6 -4 M106 60 l8 -2" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>`, { aura: '#38bdf8' }),
  'sd|スナップショット幽霊': sprite('snapghost', `
<rect x="16" y="28" width="88" height="70" rx="6" fill="#1e293b" stroke="${OL}" stroke-width="3"/><circle cx="92" cy="38" r="4" fill="#fde047"/>
<path d="M36 92 q-4 -46 24 -50 q28 4 24 50 l-6 -6 l-6 8 l-6 -8 l-6 8 l-6 -8 l-6 8z" fill="#e0e7ff" fill-opacity=".85" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
${evil(62, 9, '#818cf8')}${grin(74, 7)}<path d="M8 20 l14 0 M8 20 l0 14 M112 20 l-14 0 M112 20 l0 14 M8 106 l14 0 M112 106 l-14 0" stroke="#fff" stroke-width="3"/>`, { aura: '#818cf8' }),
  'sd|継承地獄': sprite('inherithell', `
<g stroke="${OL}" stroke-width="2">${[[60, 18], [40, 40], [80, 40], [30, 62], [50, 62], [70, 62], [90, 62]].map(([x, y]) => `<rect x="${x - 9}" y="${y - 6}" width="18" height="12" rx="2" fill="#fca5a5"/>`).join('')}<path d="M60 24 l-20 10 M60 24 l20 10 M40 46 l-10 10 M40 46 l10 10 M80 46 l-10 10 M80 46 l10 10" fill="none"/></g>
<path d="M24 112 q-2 -30 36 -36 q38 6 36 36z" fill="#b91c1c" stroke="${OL}" stroke-width="3"/>
<path d="M34 96 q0 -18 26 -20 q26 2 26 20" fill="#ef4444" stroke="${OL}" stroke-width="3"/>${evil(90, 10, '#fde047')}${grin(100, 10)}
<path d="M30 82 l-10 -10 M90 82 l10 -10" stroke="#f97316" stroke-width="5" stroke-linecap="round"/>`, { aura: '#ef4444' }),
  'sd|待ちぼうけデッドロック': sprite('deadlock', `
<g fill="none" stroke-width="7"><path d="M38 52 v-12 a14 14 0 0 1 28 0 v12" stroke="${OL}"/><path d="M58 52 v-12 a14 14 0 0 1 28 0 v12" stroke="${OL}" transform="translate(0 6)"/></g>
<g fill="none" stroke-width="4"><path d="M38 52 v-12 a14 14 0 0 1 28 0 v12" stroke="#94a3b8"/><path d="M58 52 v-12 a14 14 0 0 1 28 0 v12" stroke="#cbd5e1" transform="translate(0 6)"/></g>
<rect x="24" y="52" width="72" height="54" rx="8" fill="#475569" stroke="${OL}" stroke-width="3"/>${evil(76, 14, '#f87171')}${grin(92, 12)}
<g font-weight="900" fill="#cbd5e1"><text x="96" y="30" font-size="12">z</text><text x="106" y="20" font-size="9">z</text></g>`, { aura: '#64748b' }),
  'sd|番号ちがい伝令': sprite('wrongmsgr', `
<path d="M24 64 q-10 -18 4 -30 q4 12 14 14 M96 64 q10 -18 -4 -30 q-4 12 -14 14" fill="#16a34a" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M36 108 q-6 -40 24 -50 q30 10 24 50z" fill="#22c55e" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="44" r="22" fill="#22c55e" stroke="${OL}" stroke-width="3"/><path d="M50 18 l4 -10 l4 10 l4 -10 l4 10" fill="#ef4444" stroke="${OL}" stroke-width="2"/>
${evil(40, 9, '#fde047')}<path d="M56 50 l14 4 l-14 4z" fill="#f59e0b" stroke="${OL}" stroke-width="2"/>
<g transform="translate(60 86)"><rect x="-14" y="-10" width="28" height="20" fill="#fef3c7" stroke="${OL}" stroke-width="2"/><text y="5" text-anchor="middle" font-size="12" font-weight="900" fill="#ef4444">3?</text></g>`, { aura: '#22c55e' }),
  'sd|出口なしステート': sprite('nostate', `
<rect x="24" y="22" width="72" height="88" rx="6" fill="#78350f" stroke="${OL}" stroke-width="3"/><rect x="32" y="30" width="56" height="74" rx="4" fill="#92400e" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#475569" stroke-width="4"><path d="M28 52 h64 M28 82 h64"/></g><circle cx="80" cy="70" r="4" fill="#fbbf24" stroke="${OL}" stroke-width="1.5"/>
${evil(62, 12, '#fde047')}${grin(74, 10)}`, { aura: '#f97316' }),
  'sd|ゴールデンパターン': gold('goldpat', `
<path d="M60 18 l12 22 h24 l-18 16 l8 24 l-26 -14 l-26 14 l8 -24 l-18 -16 h24z" fill="url(#eg-goldpat)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${umlBox(44, 80, 32, 26, '#fde68a')}${smug(54, 7)}`),
});

Object.assign(ENEMY_ART, {
  // ----- 設計：ステージ専用（第1回） -----
  'sd|クラス迷子': sprite('classlost', `
<path d="M18 46 l42 -22 l42 22z" fill="#e2e8f0" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g stroke="${OL}" stroke-width="2.5" fill="#f1f5f9"><rect x="26" y="50" width="10" height="44"/><rect x="84" y="50" width="10" height="44"/></g><rect x="18" y="94" width="84" height="10" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/>
${evil(68, 11, '#a855f7')}<path d="M52 82 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|継承しすぎ': sprite('toomuchinh', `
<path d="M60 108 v-44" stroke="#78350f" stroke-width="8"/><g fill="#4ade80" stroke="${OL}" stroke-width="2.5">${[[60, 32, 22], [36, 50, 16], [84, 50, 16], [24, 72, 11], [46, 72, 11], [74, 72, 11], [96, 72, 11]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
${evil(32, 9, '#fde047')}<path d="M54 42 q6 -3 12 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|金のオブジェクト': gold('goldobj', `
<rect x="28" y="52" width="64" height="52" rx="4" fill="url(#eg-goldobj)" stroke="${OL}" stroke-width="3"/><rect x="22" y="40" width="76" height="14" rx="3" fill="#ef4444" stroke="${OL}" stroke-width="3"/><path d="M60 40 v64" stroke="#ef4444" stroke-width="8"/>
<path d="M60 40 q-16 -18 -22 -4 q8 6 22 4 q16 -18 22 -4 q-8 6 -22 4" fill="#ef4444" stroke="${OL}" stroke-width="2"/>${smug(76, 14)}`),
  'sd|ポリモ迷子': sprite('polylost', `
<path d="M24 34 q36 -14 72 0 q4 40 -36 64 q-40 -24 -36 -64z" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M60 26 v70" stroke="${OL}" stroke-width="2"/><path d="M60 30 q34 -10 36 4 q2 36 -36 58z" fill="#a855f7"/>
<path d="M36 48 l12 4 M84 48 l-12 4" stroke="${OL}" stroke-width="2.5"/><path d="M38 56 q5 -4 10 0 M72 56 q5 4 10 0" stroke="${OL}" stroke-width="2.5" fill="none"/>
<path d="M40 74 q8 6 16 0 M66 76 q8 -6 16 0" stroke="${OL}" stroke-width="2.5" fill="none"/>`),
  'sd|図の種類迷子': sprite('diagkinds', `
<g stroke="${OL}" stroke-width="2.5">${umlBox(16, 30, 26, 32, '#bfdbfe')}<ellipse cx="86" cy="44" rx="18" ry="10" fill="#fef3c7"/><rect x="18" y="78" width="26" height="16" rx="8" fill="#bbf7d0"/><path d="M72 76 v30 M98 76 v30" stroke-dasharray="4 3"/></g>
<circle cx="60" cy="64" r="16" fill="#f472b6" stroke="${OL}" stroke-width="3"/><g fill="none" stroke="${OL}" stroke-width="2"><path d="M50 62 m-3 0 a3 3 0 1 1 3 3"/><path d="M70 62 m-3 0 a3 3 0 1 1 3 3"/></g>`),
  'sd|金のUML': gold('golduml', `
<path d="M22 100 l76 -76 l8 8 l-76 76z" fill="url(#eg-golduml)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g stroke="#92400e" stroke-width="2">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${32 + i * 11} ${90 - i * 11} l4 4"/>`).join('')}</g>
<circle cx="60" cy="62" r="14" fill="url(#eg-golduml)" stroke="${OL}" stroke-width="2.5"/>${smug(60, 5)}`),
  // ----- 第2回 -----
  'sd|境界はみ出し': sprite('bndover', `
<rect x="16" y="26" width="70" height="80" rx="4" fill="#e0f2fe" fill-opacity=".4" stroke="#38bdf8" stroke-width="3"/>
<ellipse cx="80" cy="66" rx="26" ry="16" fill="#fef3c7" stroke="${OL}" stroke-width="3"/>${evil(64, 9, '#a855f7').replace(/60 -/g, '80 -').replace(/60 \+/g, '80 +')}`),
  'sd|関連線迷子': sprite('assoclost', `
<path d="M20 80 q20 -40 40 -10 t40 -20" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M20 80 q20 -40 40 -10 t40 -20" stroke="#cbd5e1" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="100" cy="50" r="12" fill="#cbd5e1" stroke="${OL}" stroke-width="2.5"/><circle cx="96" cy="48" r="1.8" fill="${OL}"/><circle cx="104" cy="48" r="1.8" fill="${OL}"/><path d="M96 55 q4 -2 8 0" stroke="${OL}" stroke-width="1.6" fill="none"/>`),
  'sd|金のユースケース': gold('golduc', `
<circle cx="60" cy="62" r="38" fill="url(#eg-golduc)" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="62" r="26" fill="#fff7ed" stroke="${OL}" stroke-width="2"/><circle cx="60" cy="62" r="14" fill="url(#eg-golduc)" stroke="${OL}" stroke-width="2"/>${smug(60, 4)}`),
  'sd|extend逆向き': sprite('extendrev', `
<path d="M90 40 q10 40 -30 50 l-20 0" stroke="${OL}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M90 40 q10 40 -30 50 l-20 0" stroke="#f97316" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="10 5"/>
<path d="M30 90 l14 -10 v20z" fill="#f97316" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="90" cy="38" r="16" fill="#f97316" stroke="${OL}" stroke-width="3"/>${evil(36, 6, '#fff').replace(/60 -/g, '90 -').replace(/60 \+/g, '90 +')}`),
  'sd|アクター分身': sprite('actortwins', `<g transform="translate(-44 -30) scale(1.7)">${stick(46, 40, '#fde68a')}</g><g transform="translate(-34 -30) scale(1.7)" opacity=".55">${stick(66, 40, '#fde68a')}</g>`),
  'sd|金のシナリオ': gold('goldscen', `
<path d="M60 36 q-20 -10 -40 0 v62 q20 -10 40 0 q20 -10 40 0 v-62 q-20 -10 -40 0z" fill="url(#eg-goldscen)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M60 36 v62" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#92400e" stroke-width="2"><path d="M28 74 h24 M28 82 h20 M68 74 h24 M68 82 h18"/></g>${smug(56, 18)}`),
  // ----- 第4回 -----
  'sd|スナップ迷子': sprite('snaplost', `
<rect x="20" y="40" width="80" height="58" rx="8" fill="#334155" stroke="${OL}" stroke-width="3"/><rect x="40" y="30" width="24" height="12" rx="3" fill="#475569" stroke="${OL}" stroke-width="2.5"/>
<circle cx="60" cy="69" r="20" fill="#0ea5e9" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="69" r="11" fill="#0c4a6e"/><circle cx="64" cy="65" r="3.5" fill="#fff"/>
<path d="M28 52 l10 3 M92 52 l-10 3" stroke="#fde047" stroke-width="2.5" stroke-linecap="round"/>`),
  'sd|属性値わすれ': sprite('noattr', `
<path d="M22 50 l20 -18 h52 v52 h-52z" fill="#fde68a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="36" cy="58" r="5" fill="#fff" stroke="${OL}" stroke-width="2"/>
<path d="M58 70 h28" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 3"/>${evil(52, 10, '#fff').replace(/60 -/g, '70 -').replace(/60 \+/g, '70 +')}`),
  'sd|金のスナップショット': gold('goldsnap', `
<rect x="20" y="30" width="80" height="70" rx="4" fill="url(#eg-goldsnap)" stroke="${OL}" stroke-width="3"/><rect x="30" y="40" width="60" height="44" fill="#e0f2fe" stroke="${OL}" stroke-width="2"/>
<path d="M30 84 l18 -18 l12 10 l14 -16 l16 24z" fill="#4ade80" stroke="${OL}" stroke-width="1.5"/>${smug(58, 9)}`),
  'sd|リンク迷子': sprite('knot', `
<path d="M20 70 q20 -40 40 -10 q20 30 40 -10 q-6 30 -30 22 q-30 -10 -50 -2z" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M20 70 q20 -40 40 -10 q20 30 40 -10 q-6 30 -30 22 q-30 -10 -50 -2z" fill="none" stroke="#fb923c" stroke-width="6" stroke-linecap="round"/>
<circle cx="60" cy="62" r="12" fill="#fb923c" stroke="${OL}" stroke-width="2.5"/><circle cx="56" cy="61" r="1.8" fill="${OL}"/><circle cx="64" cy="61" r="1.8" fill="${OL}"/>`),
  'sd|インスタンス迷子': sprite('instlost', `
<g fill="none" stroke-width="6" stroke-linecap="round"><path d="M44 20 q32 20 0 40 t0 40" stroke="${OL}"/><path d="M76 20 q-32 20 0 40 t0 40" stroke="${OL}"/></g>
<g fill="none" stroke-width="3.5" stroke-linecap="round"><path d="M44 20 q32 20 0 40 t0 40" stroke="#22d3ee"/><path d="M76 20 q-32 20 0 40 t0 40" stroke="#f472b6"/></g>
<g stroke="${OL}" stroke-width="2"><path d="M50 32 h20 M48 50 h24 M48 72 h24 M50 90 h20"/></g>${evil(60, 18, '#fde047')}`),
  'sd|金のインスタンス': gold('goldinst', `
<path d="M60 22 l10 24 l26 4 l-20 18 l6 26 l-22 -14 l-22 14 l6 -26 l-20 -18 l26 -4z" fill="url(#eg-goldinst)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>${smug(58, 7)}`),
  // ----- 第5回 -----
  'sd|多重度ずれ': sprite('multioff', `
${umlBox(14, 44, 32, 40, '#bfdbfe')}${umlBox(74, 44, 32, 40, '#fbcfe8')}<path d="M46 64 h28" stroke="${OL}" stroke-width="3"/>
<g font-weight="900" font-size="12" fill="#fde047" stroke="${OL}" stroke-width=".6"><text x="50" y="58">*</text><text x="64" y="58">1</text></g>
<g fill="${OL}"><circle cx="25" cy="73" r="1.8"/><circle cx="35" cy="73" r="1.8"/><circle cx="85" cy="73" r="1.8"/><circle cx="95" cy="73" r="1.8"/></g>`),
  'sd|属性迷子': sprite('attrlost', `
<path d="M34 24 h52 v80 h-52z" fill="#fef9c3" stroke="${OL}" stroke-width="3"/><path d="M34 24 h52 v14 h-52z" fill="#fde047" stroke="${OL}" stroke-width="3"/><g stroke="#cbd5e1" stroke-width="2"><path d="M40 92 h40 M40 98 h30"/></g>
${evil(62, 10, '#a855f7')}<path d="M52 78 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|金のクラス図': gold('goldclassd', `
${umlBox(36, 24, 48, 34, '#fde68a')}${umlBox(14, 76, 36, 30, '#fde68a')}${umlBox(70, 76, 36, 30, '#fde68a')}
<path d="M32 76 v-8 h56 v8 M60 68 v-10" stroke="${OL}" stroke-width="2.5" fill="none"/><path d="M60 58 l-6 8 h12z" fill="#fff" stroke="${OL}" stroke-width="2"/>${smug(40, 9)}`),
  'sd|汎化逆向き': sprite('genrev', `
<path d="M60 102 l-34 -56 h68z" fill="#fff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M60 46 v-26" stroke="${OL}" stroke-width="3"/>
${evil(62, 11, '#a855f7')}<path d="M52 78 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|依存迷子': sprite('dependlost', `
<path d="M16 88 l70 -50" stroke="${OL}" stroke-width="4" stroke-dasharray="8 6"/><path d="M76 34 l12 2 l-4 12" stroke="${OL}" stroke-width="4" fill="none" stroke-linejoin="round"/>
<circle cx="36" cy="74" r="18" fill="#c4b5fd" stroke="${OL}" stroke-width="3"/>${evil(72, 6, '#fff').replace(/60 -/g, '36 -').replace(/60 \+/g, '36 +')}`),
  'sd|金の継承': gold('goldinh', `
<path d="M24 74 l8 -40 l16 18 l12 -26 l12 26 l16 -18 l8 40z" fill="url(#eg-goldinh)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><rect x="24" y="74" width="72" height="14" rx="3" fill="url(#eg-goldinh)" stroke="${OL}" stroke-width="3"/>
<g fill="#ef4444" stroke="${OL}" stroke-width="1.5"><circle cx="60" cy="81" r="4"/><circle cx="40" cy="81" r="3"/><circle cx="80" cy="81" r="3"/></g>${smug(56, 10)}`),
  // ----- 第6回 -----
  'sd|返事待ち': sprite('waitreply', `
<rect x="30" y="18" width="60" height="10" rx="3" fill="#7c3aed" stroke="${OL}" stroke-width="2.5"/><rect x="30" y="94" width="60" height="10" rx="3" fill="#7c3aed" stroke="${OL}" stroke-width="2.5"/>
<path d="M36 28 h48 q0 22 -16 33 q16 11 16 33 h-48 q0 -22 16 -33 q-16 -11 -16 -33z" fill="#ede9fe" fill-opacity=".85" stroke="${OL}" stroke-width="3"/><path d="M42 94 q4 -12 18 -14 q14 2 18 14z" fill="#a78bfa"/>
${evil(44, 8, '#fff')}<path d="M54 52 h12" stroke="${OL}" stroke-width="2"/>`),
  'sd|活性区間迷子': sprite('activation', `
<path d="M60 18 v92" stroke="${OL}" stroke-width="3" stroke-dasharray="6 4"/><rect x="48" y="36" width="24" height="56" rx="3" fill="#fbbf24" stroke="${OL}" stroke-width="3"/>
${evil(56, 5, '#fff')}<path d="M55 66 q5 -3 10 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|金のシーケンス': gold('goldseq', `
<g stroke="${OL}" stroke-width="2.5"><rect x="16" y="22" width="30" height="16" rx="3" fill="url(#eg-goldseq)"/><rect x="74" y="22" width="30" height="16" rx="3" fill="url(#eg-goldseq)"/></g>
<path d="M31 38 v70 M89 38 v70" stroke="${OL}" stroke-width="2.5" stroke-dasharray="5 4"/><path d="M31 58 h52 l-8 -5 M83 58 l-8 5 M89 82 h-52 l8 -5 M37 82 l8 5" stroke="url(#eg-goldseq)" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="60" cy="70" r="9" fill="url(#eg-goldseq)" stroke="${OL}" stroke-width="2"/>${smug(68, 4)}`),
  'sd|alt迷子': sprite('altlost', `
<rect x="18" y="26" width="84" height="76" rx="4" fill="#ecfccb" fill-opacity=".9" stroke="${OL}" stroke-width="3"/><path d="M18 64 h84" stroke="${OL}" stroke-width="2.5" stroke-dasharray="6 4"/><path d="M18 26 h26 v10 l-6 6 h-20z" fill="#84cc16" stroke="${OL}" stroke-width="2.5"/>
${evil(52, 12, '#a855f7')}<path d="M52 84 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|生成迷子': sprite('createlost', `
<path d="M30 74 q0 -40 30 -46 q30 6 30 46z" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><path d="M28 74 l8 -8 l8 8 l8 -8 l8 8 l8 -8 l8 8 l8 -8 l8 8" fill="none" stroke="${OL}" stroke-width="2.5"/>
<path d="M30 74 q0 34 30 34 q30 0 30 -34z" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="74" r="14" fill="#fde047" stroke="${OL}" stroke-width="2.5"/>
<circle cx="56" cy="72" r="1.8" fill="${OL}"/><circle cx="64" cy="72" r="1.8" fill="${OL}"/><path d="M57 78 l3 3 l3 -3z" fill="#fb923c"/>`),
  'sd|金の複合フラグメント': gold('goldfrag', `
<g stroke="${OL}" stroke-width="2.5">${[[22, 36], [62, 36], [22, 70], [62, 70]].map(([x, y]) => `<rect x="${x}" y="${y}" width="36" height="30" rx="2" fill="url(#eg-goldfrag)"/>`).join('')}</g>${smug(64, 12)}`),
  // ----- 第7回 -----
  'sd|番号迷子': sprite('numlost', `
<g stroke="${OL}" stroke-width="2.5" font-weight="900" font-size="12">${[[30, 74, '1.1', '#a5b4fc'], [60, 52, '1', '#fde047'], [90, 74, '2', '#a5b4fc']].map(([x, y, t, c]) => `<circle cx="${x}" cy="${y}" r="16" fill="${c}"/><text x="${x}" y="${y + 4}" text-anchor="middle" fill="${OL}" stroke="none">${t}</text>`).join('')}</g>
<g fill="${OL}"><circle cx="54" cy="44" r="1.8"/><circle cx="66" cy="44" r="1.8"/></g>`),
  'sd|リンク切れ伝令': sprite('msgrlost', `
<path d="M30 60 q-14 -16 -6 -30 q10 4 14 16 M90 60 q14 -16 6 -30 q-10 4 -14 16" fill="#94a3b8" stroke="${OL}" stroke-width="2.5"/>
<ellipse cx="60" cy="70" rx="30" ry="26" fill="#cbd5e1" stroke="${OL}" stroke-width="3"/><path d="M52 66 l16 4 l-16 4z" fill="#f59e0b" stroke="${OL}" stroke-width="2"/>
<path d="M40 58 l8 3 M80 58 l-8 3" stroke="${OL}" stroke-width="2.4"/><circle cx="44" cy="64" r="2" fill="${OL}"/><circle cx="76" cy="64" r="2" fill="${OL}"/>`),
  'sd|金のコミュニケーション': gold('goldcomm', `
<path d="M60 96 v-30" stroke="${OL}" stroke-width="5"/><path d="M36 56 a24 24 0 0 1 48 0z" fill="url(#eg-goldcomm)" stroke="${OL}" stroke-width="3"/><path d="M28 104 h64" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>
<g fill="none" stroke="#fde68a" stroke-width="3" stroke-linecap="round"><path d="M88 34 q8 6 0 14 M96 28 q14 12 0 26"/></g>${smug(46, 9)}`),
  'sd|並び順迷子': sprite('orderlost', `
<g stroke="${OL}" stroke-width="2.5">${[[24, 60, '#fda4af'], [48, 40, '#fde047'], [72, 74, '#86efac'], [96, 50, '#93c5fd']].map(([x, y, c]) => `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="4" fill="${c}"/>`).join('')}</g>
<path d="M24 60 L48 40 L72 74 L96 50" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="3 3"/><g fill="${OL}"><circle cx="44" cy="38" r="1.6"/><circle cx="52" cy="38" r="1.6"/></g>`),
  'sd|反復迷子': sprite('repeatlost', `
<path d="M30 60 a30 30 0 1 1 8 20" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M30 60 a30 30 0 1 1 8 20" fill="none" stroke="#2dd4bf" stroke-width="7" stroke-linecap="round"/><path d="M26 74 l12 8 l4 -14z" fill="#2dd4bf" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="60" r="14" fill="#2dd4bf" stroke="${OL}" stroke-width="2.5"/>${evil(60, 5, '#fff')}`),
  'sd|金の伝令': gold('goldmsgr', `
<path d="M60 70 q-30 -30 -46 -14 q16 6 22 18 q-10 2 -14 10 q20 4 38 -14 q18 18 38 14 q-4 -8 -14 -10 q6 -12 22 -18 q-16 -16 -46 14z" fill="url(#eg-goldmsgr)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="56" r="14" fill="url(#eg-goldmsgr)" stroke="${OL}" stroke-width="2.5"/>${smug(54, 5)}<path d="M72 58 l8 2 l-8 3z" fill="#f59e0b" stroke="${OL}" stroke-width="1.5"/>`),
  // ----- 第8回 -----
  'sd|トリガ迷子': sprite('triggerlost', `
<path d="M66 14 l-30 50 h22 l-8 44 l36 -58 h-22z" fill="#facc15" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>${evil(52, 7, '#fff')}<path d="M54 64 q5 -3 10 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'sd|entry迷子': sprite('entrylost', `
<rect x="30" y="24" width="60" height="84" rx="4" fill="#0ea5e9" stroke="${OL}" stroke-width="3"/><path d="M38 32 h44 v76 h-44z" fill="#0c4a6e"/><path d="M38 32 l30 6 v76 l-30 -6z" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/>
${evil(60, 0, '#fff').replace(/cx="60"/g, 'cx="52"')}<g transform="translate(52 62)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/><path d="M-4 8 q4 -3 8 0" stroke="${OL}" stroke-width="1.8" fill="none"/></g>`),
  'sd|金のステート': gold('goldstate', `
<rect x="20" y="34" width="80" height="54" rx="22" fill="url(#eg-goldstate)" stroke="${OL}" stroke-width="3"/><path d="M20 60 h80" stroke="#92400e" stroke-width="2"/>${smug(46, 14)}`),
  'sd|遷移ループ': sprite('selfloop', `
<rect x="24" y="56" width="72" height="44" rx="18" fill="#f472b6" stroke="${OL}" stroke-width="3"/>
<path d="M44 56 q-6 -36 16 -36 q22 0 16 36" fill="none" stroke="${OL}" stroke-width="4"/><path d="M70 50 l6 8 l6 -8" fill="none" stroke="${OL}" stroke-width="4"/>${evil(76, 12, '#fff')}`),
  'sd|終了状態迷子': sprite('finallost', `
<circle cx="60" cy="64" r="36" fill="#fff" stroke="${OL}" stroke-width="4"/><circle cx="60" cy="64" r="26" fill="#1f2937" stroke="${OL}" stroke-width="3"/>
${evil(60, 9, '#f87171')}<path d="M52 76 q8 -4 16 0" stroke="#f87171" stroke-width="2" fill="none"/>`),
  'sd|金の遷移': gold('goldtrans', `
<path d="M14 92 q46 -80 92 0" fill="none" stroke="#f87171" stroke-width="6"/><path d="M22 92 q38 -66 76 0" fill="none" stroke="#fde047" stroke-width="6"/><path d="M30 92 q30 -52 60 0" fill="none" stroke="#4ade80" stroke-width="6"/><path d="M38 92 q22 -38 44 0" fill="none" stroke="#60a5fa" stroke-width="6"/>
<circle cx="60" cy="78" r="14" fill="url(#eg-goldtrans)" stroke="${OL}" stroke-width="2.5"/>${smug(76, 5)}`),
});

// 吹き出し・音の波
const bubble = (x, y, w, h, c = '#fff') => `<path d="M${x} ${y} h${w} q6 0 6 6 v${h - 12} q0 6 -6 6 h-${w * 0.6} l-8 8 v-8 h-${w * 0.4 - 8} q-6 0 -6 -6 v-${h - 12} q0 -6 6 -6z" fill="${c}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`;
const waves = (x, y, c = '#fde047', dir = 1) => `<g fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"><path d="M${x} ${y - 6} q${4 * dir} 6 0 12"/><path d="M${x + 8 * dir} ${y - 12} q${8 * dir} 12 0 24"/></g>`;

Object.assign(ENEMY_ART, {
  // ----- TOEIC リスニング：どの回にも出る雑魚 -----
  'toeicL|聞きのがし': sprite('missear', `
<path d="M76 30 q-36 -10 -40 26 q-2 16 10 22 q6 4 4 14 q-2 12 10 14 q14 0 14 -14 q2 -10 8 -14 q14 -10 10 -26 q-4 -16 -16 -22z" fill="#fda4af" stroke="${OL}" stroke-width="3"/><path d="M62 44 q-14 2 -12 16 q2 8 8 8" stroke="#be123c" stroke-width="3" fill="none"/>
${evil(52, 0, '#fff').replace(/cx="60"/g, 'cx="72"')}<path d="M66 50 l5 1.5 M82 50 l-5 1.5" stroke="${OL}" stroke-width="0"/><g transform="translate(74 52)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g>
<g stroke="#94a3b8" stroke-width="3" stroke-linecap="round"><path d="M14 40 l12 4 M14 56 h12 M16 72 l10 -4"/></g>`),
  'toeicL|早口モンスター': sprite('fastmon', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M6 50 h18 M2 64 h16 M6 78 h18"/></g>
${blob('#38bdf8', 66, 30, 30)}${evil(62, 11, '#fff')}<path d="M48 76 q12 12 24 0 q-12 4 -24 0z" fill="#7f1d1d" stroke="${OL}" stroke-width="2"/>
${bubble(70, 18, 36, 22, '#fef9c3')}<g stroke="${OL}" stroke-width="2"><path d="M76 26 h24 M76 32 h18"/></g>`),
  'toeicL|似た音トラップ': sprite('similar', `
<path d="M20 98 h80 l-10 -16 h-60z" fill="#78716c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g stroke="${OL}" stroke-width="2.5"><path d="M30 82 l6 -46 l18 0 l6 46z" fill="#a8a29e"/><path d="M60 82 l6 -46 l18 0 l6 46z" fill="#a8a29e"/></g>
<path d="M36 50 q9 -8 18 0 M66 50 q9 -8 18 0" stroke="#fde047" stroke-width="2.5" fill="none"/>${waves(98, 52, '#fde047')}
<g fill="${OL}"><circle cx="40" cy="62" r="2"/><circle cx="50" cy="62" r="2"/><circle cx="70" cy="62" r="2"/><circle cx="80" cy="62" r="2"/></g>`),
  'toeicL|集中切れ': sprite('sleepy', `
${blob('#a5b4fc', 66, 30, 28)}<path d="M42 62 q6 4 12 0 M66 62 q6 4 12 0" stroke="${OL}" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="60" cy="80" rx="6" ry="4" fill="#312e81"/>
<path d="M84 74 q8 0 8 10 q-6 4 -8 -2z" fill="#bfdbfe" stroke="${OL}" stroke-width="1.5"/><g font-weight="900" fill="#e0e7ff"><text x="86" y="40" font-size="14">z</text><text x="98" y="28" font-size="10">z</text></g>`),
  'toeicL|数字まちがい': sprite('numwrong', `
<g stroke="${OL}" stroke-width="3" font-weight="900" font-size="26">${[[32, '1', '#fde047'], [62, '5', '#f472b6']].map(([x, t, c]) => `<rect x="${x - 16}" y="36" width="34" height="52" rx="8" fill="${c}"/><text x="${x + 1}" y="72" text-anchor="middle" fill="${OL}" stroke="none">${t}</text>`).join('')}<rect x="80" y="36" width="34" height="52" rx="8" fill="#cbd5e1" stroke-dasharray="5 3"/><text x="97" y="72" text-anchor="middle" fill="#64748b" stroke="none">0?</text></g>
<g fill="${OL}"><circle cx="26" cy="46" r="1.8"/><circle cx="38" cy="46" r="1.8"/><circle cx="56" cy="46" r="1.8"/><circle cx="68" cy="46" r="1.8"/></g>`),
  'toeicL|言いかえ忍者': sprite('ninjapara', `
<path d="M26 112 q2 -32 34 -36 q32 4 34 36z" fill="#1e293b" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="54" r="28" fill="#1e293b" stroke="${OL}" stroke-width="3"/><rect x="34" y="46" width="52" height="16" fill="#f5d0b0" stroke="${OL}" stroke-width="2.5"/>${evil(54, 11, '#111827')}
<path d="M84 44 q14 -6 20 4 q-10 0 -14 6" fill="#ef4444" stroke="${OL}" stroke-width="2"/>
<g transform="translate(98 88) rotate(20)"><path d="M0 -10 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z" fill="#cbd5e1" stroke="${OL}" stroke-width="1.5"/></g>`),
  // ----- 回ごとの雑魚 -----
  'toeicL|being 幽霊': sprite('beingghost', `
<path d="M28 96 q-6 -58 32 -64 q38 6 32 64 l-8 -8 l-8 10 l-8 -10 l-8 10 l-8 -10 l-8 10 l-8 -10z" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${evil(54, 10, '#7dd3fc')}<ellipse cx="60" cy="72" rx="5" ry="7" fill="#0c4a6e"/>
<rect x="82" y="84" width="22" height="18" rx="2" fill="#78350f" stroke="${OL}" stroke-width="2"/>`),
  'toeicL|着ている状態の影': sprite('wearshadow', `
<path d="M30 40 l14 -10 h32 l14 10 l14 20 l-12 8 l-8 -10 v52 h-48 v-52 l-8 10 l-12 -8z" fill="#475569" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M50 30 l10 12 l10 -12" fill="none" stroke="${OL}" stroke-width="2.5"/>${evil(64, 12, '#fde047')}<path d="M50 82 q10 -5 20 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeicL|Yes/No 小僧': sprite('yesno', `
<circle cx="60" cy="64" r="32" fill="#fcd34d" stroke="${OL}" stroke-width="3"/><path d="M28 58 q0 -30 32 -30 q32 0 32 30 q-16 -10 -32 -10 q-16 0 -32 10z" fill="#1f2937" stroke="${OL}" stroke-width="3"/>
${evil(66, 11, '#fff')}${grin(80, 10)}
<g font-weight="900" font-size="13" stroke="${OL}" stroke-width=".6"><text x="6" y="40" fill="#4ade80">○</text><text x="100" y="40" fill="#f87171">×</text></g>`),
  'toeicL|選択疑問ゴブリン': sprite('ororgoblin', `
<path d="M26 40 l-14 -6 l12 18 M94 40 l14 -6 l-12 18" fill="#84cc16" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="62" r="30" fill="#84cc16" stroke="${OL}" stroke-width="3"/>${evil(58, 11, '#fde047')}${grin(74, 10)}
<g stroke="${OL}" stroke-width="2"><rect x="10" y="84" width="22" height="16" rx="3" fill="#f87171"/><rect x="88" y="84" width="22" height="16" rx="3" fill="#60a5fa"/></g>`),
  'toeicL|3人目の声': sprite('third', `
${[[26, 70, '#f472b6'], [60, 56, '#a78bfa'], [94, 70, '#38bdf8']].map(([x, y, c], i) => `<g><circle cx="${x}" cy="${y}" r="16" fill="${c}" stroke="${OL}" stroke-width="3"/><circle cx="${x - 5}" cy="${y - 2}" r="2" fill="${OL}"/><circle cx="${x + 5}" cy="${y - 2}" r="2" fill="${OL}"/><ellipse cx="${x}" cy="${y + 7}" rx="${i === 1 ? 5 : 3}" ry="${i === 1 ? 4 : 2}" fill="#7f1d1d"/></g>`).join('')}
${waves(60, 30, '#fde047')}`),
  'toeicL|次の行動ピクシー': sprite('pixie', `
<path d="M48 54 q-26 -26 -32 -6 q10 6 30 12 M72 54 q26 -26 32 -6 q-10 6 -30 12" fill="#bae6fd" fill-opacity=".85" stroke="${OL}" stroke-width="2.5"/>
<ellipse cx="60" cy="72" rx="14" ry="22" fill="#a3e635" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="46" r="14" fill="#a3e635" stroke="${OL}" stroke-width="3"/>${evil(46, 5, '#fff')}
<path d="M84 96 h20 l-6 -6 M104 96 l-6 6" stroke="#fde047" stroke-width="3" fill="none" stroke-linecap="round"/>`),
  'toeicL|アナウンス嵐': sprite('announce', `
<path d="M20 52 h18 l36 -22 v68 l-36 -22 h-18z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M38 52 v24" stroke="${OL}" stroke-width="2.5"/>
${waves(84, 64, '#fde047')}<g transform="translate(18 20)"><path d="M10 0 l-6 12 h8 l-6 12" stroke="#fde047" stroke-width="3" fill="none"/></g>
${evil(62, 0, '#fff').replace(/cx="60"/g, 'cx="52"')}<g transform="translate(52 64)"><circle cx="-6" r="2" fill="${OL}"/><circle cx="6" r="2" fill="${OL}"/></g>`),
  'toeicL|留守電ミミック': sprite('phonemimic', `
<rect x="22" y="40" width="76" height="58" rx="10" fill="#334155" stroke="${OL}" stroke-width="3"/><path d="M30 40 q30 -30 60 0" fill="#475569" stroke="${OL}" stroke-width="3"/>
<path d="M30 70 q30 26 60 0 q-30 8 -60 0z" fill="#7f1d1d" stroke="${OL}" stroke-width="2.5"/><path d="M34 72 l4 6 l4 -5 l4 6 l4 -5 l4 6 l4 -5 l4 6 l4 -5 l4 6 l4 -5 l4 6 l4 -6" fill="none" stroke="#fff" stroke-width="1.6"/>
${evil(58, 14, '#fde047')}<circle cx="88" cy="50" r="4" fill="#ef4444"/>`),
  // ----- 回のボス -----
  'toeicL|写真の番人': sprite('photoguard', `
<rect x="14" y="34" width="92" height="66" rx="10" fill="#1f2937" stroke="${OL}" stroke-width="3"/><rect x="38" y="22" width="30" height="14" rx="3" fill="#374151" stroke="${OL}" stroke-width="2.5"/>
<circle cx="60" cy="67" r="25" fill="#0ea5e9" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="67" r="15" fill="#082f49"/><circle cx="60" cy="67" r="6" fill="#ef4444"/><circle cx="66" cy="61" r="4" fill="#fff"/>
<path d="M30 46 l14 6 M90 46 l-14 6" stroke="#fde047" stroke-width="3" stroke-linecap="round"/><path d="M96 40 l4 -12 l6 10" fill="url(#eg-photoguard)" stroke="${OL}" stroke-width="1.5"/>`, { aura: '#0ea5e9' }),
  'toeicL|応答の門番': sprite('gatekeeper', `
<path d="M14 110 v-60 q0 -34 46 -34 q46 0 46 34 v60z" fill="#78350f" stroke="${OL}" stroke-width="3"/><path d="M28 110 v-56 q0 -24 32 -24 q32 0 32 24 v56z" fill="#451a03" stroke="${OL}" stroke-width="2.5"/>
<g stroke="#a16207" stroke-width="3"><path d="M44 34 v76 M60 30 v80 M76 34 v76"/></g>${evil(58, 14, '#fbbf24')}${grin(74, 13)}`, { aura: '#f59e0b' }),
  'toeicL|会話のうず': sprite('convvortex', `
<path d="M60 64 m-40 0 a40 40 0 1 1 40 40 a28 28 0 1 1 -24 -40 a16 16 0 1 1 20 12" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M60 64 m-40 0 a40 40 0 1 1 40 40 a28 28 0 1 1 -24 -40 a16 16 0 1 1 20 12" fill="none" stroke="#818cf8" stroke-width="6" stroke-linecap="round"/>
${bubble(6, 10, 26, 18, '#fbcfe8')}${bubble(88, 14, 26, 18, '#bfdbfe')}${evil(62, 9, '#fde047')}`, { aura: '#818cf8' }),
  'toeicL|ラジオの怪人': sprite('radiomon', `
<path d="M42 32 l-12 -20 M78 32 l12 -20" stroke="${OL}" stroke-width="3"/><circle cx="30" cy="12" r="4" fill="#ef4444"/><circle cx="90" cy="12" r="4" fill="#ef4444"/>
<rect x="16" y="32" width="88" height="68" rx="12" fill="#b45309" stroke="${OL}" stroke-width="3"/><rect x="24" y="40" width="44" height="52" rx="6" fill="#78350f" stroke="${OL}" stroke-width="2"/>
<g fill="#451a03">${[0, 1, 2, 3, 4].map((i) => `<rect x="28" y="${46 + i * 9}" width="36" height="4" rx="2"/>`).join('')}</g>
<circle cx="86" cy="54" r="9" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="86" cy="80" r="7" fill="#fbbf24" stroke="${OL}" stroke-width="2"/>
<path d="M28 50 l14 5 M64 50 l-14 5" stroke="#fde047" stroke-width="3"/><circle cx="36" cy="60" r="3" fill="#fde047"/><circle cx="56" cy="60" r="3" fill="#fde047"/>`, { aura: '#f97316' }),
  'toeicL|金のイヤホン': gold('goldbuds', `
<path d="M38 74 q-4 20 22 30 q26 -10 22 -30" stroke="${OL}" stroke-width="2.5" fill="none"/>
<g stroke="${OL}" stroke-width="3"><rect x="32" y="56" width="10" height="22" rx="5" fill="url(#eg-goldbuds)"/><rect x="78" y="56" width="10" height="22" rx="5" fill="url(#eg-goldbuds)"/><circle cx="37" cy="48" r="17" fill="url(#eg-goldbuds)"/><circle cx="83" cy="48" r="17" fill="url(#eg-goldbuds)"/></g>
<path d="M33 56 q4 3 8 0 M79 56 q4 3 8 0" stroke="${OL}" stroke-width="2" fill="none"/><g fill="none" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"><path d="M31 46 q6 -4 12 0 M77 46 q6 -4 12 0"/></g>`),
  // ----- ステージ専用 -----
  'toeicL|ななめ写真': sprite('tiltphoto', `
<g transform="rotate(-14 60 64)"><rect x="22" y="32" width="76" height="62" rx="3" fill="#fff" stroke="${OL}" stroke-width="3"/><rect x="28" y="38" width="64" height="44" fill="#bae6fd"/><path d="M28 82 l20 -20 l14 12 l12 -10 l18 18z" fill="#4ade80"/></g>
${evil(54, 12, '#fff')}`),
  'toeicL|物だけ写真': sprite('chairphoto', `
<path d="M36 30 h48 v38 h-48z" fill="#b45309" stroke="${OL}" stroke-width="3"/><rect x="30" y="66" width="60" height="12" rx="3" fill="#d97706" stroke="${OL}" stroke-width="3"/><path d="M36 78 v28 M84 78 v28" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>
${evil(48, 11, '#fde047')}<path d="M52 60 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeicL|金のカメラ': gold('goldcam', `
<rect x="18" y="40" width="84" height="58" rx="8" fill="url(#eg-goldcam)" stroke="${OL}" stroke-width="3"/><rect x="42" y="28" width="28" height="14" rx="3" fill="url(#eg-goldcam)" stroke="${OL}" stroke-width="2.5"/>
<circle cx="60" cy="70" r="20" fill="#fef9c3" stroke="${OL}" stroke-width="3"/>${smug(68, 7)}`),
  'toeicL|動作まちがい': sprite('actwrong', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M6 60 h16 M10 74 h12"/></g>
<path d="M44 104 l8 -22 l-16 -8 M76 104 l-6 -22 l16 -4" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="60" cy="62" rx="26" ry="28" fill="#fb923c" stroke="${OL}" stroke-width="3"/>${evil(56, 10, '#fff')}<path d="M52 72 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeicL|場所の言いかえ': sprite('placepara', `
<path d="M60 104 q-26 -28 -26 -50 a26 26 0 0 1 52 0 q0 22 -26 50z" fill="#22c55e" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="52" r="14" fill="#fff" stroke="${OL}" stroke-width="2.5"/>${evil(52, 6, '#86efac')}
<path d="M22 30 l12 8 M98 30 l-12 8" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>`),
  'toeicL|金のフィルム': gold('goldfilm', `
<path d="M14 40 h92 v40 h-92z" fill="url(#eg-goldfilm)" stroke="${OL}" stroke-width="3"/><g fill="#78350f">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${18 + i * 13}" y="43" width="7" height="5" rx="1"/><rect x="${18 + i * 13}" y="72" width="7" height="5" rx="1"/>`).join('')}</g>
<rect x="44" y="50" width="32" height="20" fill="#fef9c3" stroke="${OL}" stroke-width="2"/>${smug(58, 6)}`),
  'toeicL|Who の影': sprite('whoshadow', `
<path d="M30 112 q-4 -34 30 -40 q34 6 30 40z" fill="#1e293b" stroke="${OL}" stroke-width="3"/><path d="M26 52 q0 -30 34 -30 q34 0 34 30 l10 4 h-88z" fill="#1e293b" stroke="${OL}" stroke-width="3"/>
<ellipse cx="60" cy="62" rx="22" ry="16" fill="#0f172a" stroke="${OL}" stroke-width="2"/>${evil(60, 8, '#fde047')}`),
  'toeicL|How much 商人': sprite('merchant', `
<path d="M30 104 q-4 -36 30 -40 q34 4 30 40z" fill="#a16207" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="46" r="22" fill="#fcd34d" stroke="${OL}" stroke-width="3"/>
<path d="M36 30 q24 -18 48 0 l-4 6 h-40z" fill="#7c2d12" stroke="${OL}" stroke-width="2.5"/>${evil(46, 8, '#fff')}<path d="M52 56 q8 6 16 0" stroke="${OL}" stroke-width="2" fill="none"/>
<g transform="translate(92 88)"><circle r="12" fill="#facc15" stroke="${OL}" stroke-width="2.5"/><text y="5" text-anchor="middle" font-size="13" font-weight="900" fill="#92400e">$</text></g>`),
  'toeicL|金のマイク': gold('goldmic', `
<path d="M60 76 v24 M44 104 h32" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><path d="M40 56 q0 22 20 22 q20 0 20 -22" fill="none" stroke="${OL}" stroke-width="4"/>
<rect x="44" y="20" width="32" height="52" rx="16" fill="url(#eg-goldmic)" stroke="${OL}" stroke-width="3"/>${smug(46, 6)}`),
  'toeicL|提案スルー': sprite('ignoreprop', `
${blob('#f87171', 68, 30, 30)}<path d="M42 62 l12 2 M66 64 l12 -2" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><path d="M50 80 h20" stroke="${OL}" stroke-width="2.5"/>
<path d="M20 36 l14 14 M34 36 l-14 14" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><path d="M20 36 l14 14 M34 36 l-14 14" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>`),
  'toeicL|わかりません回答': sprite('dunno', `
<path d="M14 62 l18 -8 l6 10 M106 62 l-18 -8 l-6 10" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
${blob('#c4b5fd', 70, 28, 28)}<path d="M44 62 q5 -4 10 0 M66 62 q5 -4 10 0" stroke="${OL}" stroke-width="2.6" fill="none"/><path d="M52 80 q8 4 16 0" stroke="${OL}" stroke-width="2.2" fill="none"/>
<text x="54" y="34" font-size="18" font-weight="900" fill="#fde047">?</text>`),
  'toeicL|金の受話器': gold('goldphone', `
<path d="M28 34 q-10 10 -4 24 l14 -6 q-4 -8 2 -12z M92 86 q10 -10 4 -24 l-14 6 q4 8 -2 12z" fill="url(#eg-goldphone)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M34 40 q26 -6 52 44" stroke="${OL}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M34 40 q26 -6 52 44" stroke="url(#eg-goldphone)" stroke-width="8" fill="none" stroke-linecap="round"/>
<circle cx="56" cy="58" r="13" fill="url(#eg-goldphone)" stroke="${OL}" stroke-width="2.5"/>${smug(56, 5).replace(/60 -/g, '56 -').replace(/60 \+/g, '56 +')}`),
  'toeicL|予約の会話': sprite('reserve', `
<rect x="22" y="30" width="76" height="74" rx="8" fill="#fff" stroke="${OL}" stroke-width="3"/><rect x="22" y="30" width="76" height="18" rx="8" fill="#38bdf8" stroke="${OL}" stroke-width="3"/>
<circle cx="78" cy="78" r="9" fill="none" stroke="#ef4444" stroke-width="3"/>${evil(66, 12, '#fde047').replace(/60 -/g, '52 -').replace(/60 \+/g, '52 +')}`),
  'toeicL|お店の会話': sprite('shopbag', `
<path d="M28 44 h64 l6 62 h-76z" fill="#ec4899" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M44 44 v-10 q0 -12 16 -12 q16 0 16 12 v10" fill="none" stroke="${OL}" stroke-width="3"/>
${evil(68, 12, '#fff')}${grin(82, 10)}`),
  'toeicL|金の会話': gold('goldtalk', `${bubble(20, 28, 74, 56, 'url(#eg-goldtalk)')}${smug(52, 10).replace(/60 -/g, '57 -').replace(/60 \+/g, '57 +')}`),
  'toeicL|出張の会話': sprite('tripcase', `
<rect x="20" y="42" width="80" height="58" rx="8" fill="#0d9488" stroke="${OL}" stroke-width="3"/><path d="M46 42 v-10 h28 v10" fill="none" stroke="${OL}" stroke-width="3"/><path d="M20 70 h80" stroke="#134e4a" stroke-width="2.5"/>
<g stroke="${OL}" stroke-width="1.5"><rect x="24" y="78" width="16" height="10" fill="#fde047" transform="rotate(-10 32 83)"/></g>${evil(58, 14, '#fff')}`),
  'toeicL|職場の3人': sprite('office3', `
${[[30, '#f87171'], [60, '#60a5fa'], [90, '#4ade80']].map(([x, c], i) => `<g><path d="M${x - 14} 110 q0 -24 14 -26 q14 2 14 26z" fill="${c}" stroke="${OL}" stroke-width="2.5"/><circle cx="${x}" cy="${i === 1 ? 62 : 70}" r="13" fill="${c}" stroke="${OL}" stroke-width="2.5"/><circle cx="${x - 4}" cy="${i === 1 ? 60 : 68}" r="1.8" fill="${OL}"/><circle cx="${x + 4}" cy="${i === 1 ? 60 : 68}" r="1.8" fill="${OL}"/></g>`).join('')}
${bubble(42, 18, 36, 22, '#fff')}`),
  'toeicL|金のヘッドセット': gold('goldheadset', `
<path d="M28 66 q0 -40 32 -40 q32 0 32 40" fill="none" stroke="${OL}" stroke-width="9"/><path d="M28 66 q0 -40 32 -40 q32 0 32 40" fill="none" stroke="url(#eg-goldheadset)" stroke-width="5"/>
<rect x="18" y="58" width="18" height="28" rx="7" fill="url(#eg-goldheadset)" stroke="${OL}" stroke-width="3"/><rect x="84" y="58" width="18" height="28" rx="7" fill="url(#eg-goldheadset)" stroke="${OL}" stroke-width="3"/>
<path d="M28 86 q4 18 24 18" stroke="${OL}" stroke-width="3" fill="none"/><circle cx="54" cy="104" r="4" fill="url(#eg-goldheadset)" stroke="${OL}" stroke-width="1.5"/>${smug(62, 9)}`),
  'toeicL|空港アナウンス': sprite('airport', `
<path d="M10 66 l40 -6 l30 -30 h10 l-14 30 l26 -2 l8 -10 h6 l-4 18 l4 18 h-6 l-8 -10 l-26 -2 l14 30 h-10 l-30 -30 l-40 -6z" fill="#e2e8f0" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${evil(62, 0, '#fff').replace(/cx="60"/g, 'cx="40"')}<g transform="translate(40 64)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g>`),
  'toeicL|天気予報': sprite('weather', `
<circle cx="40" cy="40" r="16" fill="#fde047" stroke="${OL}" stroke-width="3"/>
<path d="M30 80 q0 -22 22 -22 q6 -14 22 -12 q18 2 18 18 q14 2 12 16 z" fill="#94a3b8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#38bdf8" stroke-width="3" stroke-linecap="round"><path d="M44 90 l-4 10 M60 90 l-4 10 M76 90 l-4 10"/></g>${evil(70, 10, '#fff').replace(/60 -/g, '66 -').replace(/60 \+/g, '66 +')}`),
  'toeicL|金のスピーカー': gold('goldspk', `
<rect x="30" y="22" width="60" height="84" rx="8" fill="url(#eg-goldspk)" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="76" r="18" fill="#78350f" stroke="${OL}" stroke-width="2.5"/><circle cx="60" cy="76" r="8" fill="#a16207"/>
${smug(42, 9)}${waves(96, 70, '#fde68a')}`),
  'toeicL|工場見学ガイド': sprite('factory', `
<path d="M14 104 v-44 l22 -14 v14 l22 -14 v14 l22 -14 v58z" fill="#64748b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><rect x="84" y="24" width="14" height="80" fill="#475569" stroke="${OL}" stroke-width="3"/>
<path d="M90 20 q-6 -10 4 -14 q10 -2 10 6" fill="#e2e8f0" stroke="${OL}" stroke-width="2"/>${evil(78, 18, '#fde047').replace(/60 -/g, '46 -').replace(/60 \+/g, '46 +')}`),
  'toeicL|社内連絡': sprite('memo', `
<path d="M30 24 h52 l10 10 v74 h-62z" fill="#fef9c3" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="24" r="6" fill="#ef4444" stroke="${OL}" stroke-width="2"/>
<g stroke="#cbd5e1" stroke-width="2.5"><path d="M38 86 h40 M38 94 h30"/></g>${evil(56, 10, '#a78bfa')}<path d="M52 70 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeicL|金のラジオ': gold('goldradio', `
<path d="M38 36 l26 -14" stroke="${OL}" stroke-width="3"/><rect x="16" y="36" width="88" height="62" rx="12" fill="url(#eg-goldradio)" stroke="${OL}" stroke-width="3"/>
<circle cx="40" cy="70" r="14" fill="#78350f" stroke="${OL}" stroke-width="2.5"/><rect x="62" y="56" width="32" height="12" rx="3" fill="#fef9c3" stroke="${OL}" stroke-width="2"/>${smug(80, 6).replace(/60 -/g, '78 -').replace(/60 \+/g, '78 +')}`),
});

// 本（ひらいた本）
const book = (x, y, w, h, c = '#fff') => `<path d="M${x + w / 2} ${y + 6} q-${w / 4} -8 -${w / 2} 0 v${h} q${w / 4} -8 ${w / 2} 0 q${w / 4} -8 ${w / 2} 0 v-${h} q-${w / 4} -8 -${w / 2} 0z" fill="${c}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><path d="M${x + w / 2} ${y + 6} v${h}" stroke="${OL}" stroke-width="2"/>`;

Object.assign(ENEMY_ART, {
  // ----- TOEIC リーディング：どの回にも出る雑魚 -----
  'toeic|三単現のS落とし': sprite('dropS', `
<path d="M30 92 q-20 -10 -6 -30 q14 -18 36 -8 q20 10 34 -8" stroke="${OL}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M30 92 q-20 -10 -6 -30 q14 -18 36 -8 q20 10 34 -8" stroke="#22c55e" stroke-width="9" fill="none" stroke-linecap="round"/>
<circle cx="94" cy="44" r="13" fill="#22c55e" stroke="${OL}" stroke-width="3"/><path d="M88 40 l4 1 M98 40 l4 1" stroke="${OL}" stroke-width="2"/><circle cx="90" cy="44" r="1.8" fill="${OL}"/><circle cx="100" cy="44" r="1.8" fill="${OL}"/><path d="M106 48 l8 2" stroke="#ef4444" stroke-width="2.5"/>
<text x="20" y="108" font-size="16" font-weight="900" fill="#fde047" transform="rotate(20 26 104)">s</text>`),
  'toeic|冠詞まよい': sprite('article', `
<path d="M34 40 h52 l-4 -24 h-44z" fill="#1f2937" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><rect x="22" y="38" width="76" height="8" rx="3" fill="#111827" stroke="${OL}" stroke-width="2.5"/><path d="M38 34 h44" stroke="#ef4444" stroke-width="4"/>
<ellipse cx="60" cy="74" rx="28" ry="28" fill="#e9d5ff" stroke="${OL}" stroke-width="3"/>${evil(70, 10, '#7c3aed')}<path d="M52 86 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeic|時制ずれ': sprite('tenseoff', `
<rect x="34" y="18" width="52" height="10" rx="3" fill="#0ea5e9" stroke="${OL}" stroke-width="2.5"/><rect x="34" y="96" width="52" height="10" rx="3" fill="#0ea5e9" stroke="${OL}" stroke-width="2.5"/>
<path d="M40 28 h40 q0 20 -14 30 q14 10 14 30 h-40 q0 -20 14 -30 q-14 -10 -14 -30z" fill="#e0f2fe" fill-opacity=".85" stroke="${OL}" stroke-width="3" transform="rotate(12 60 62)"/>
${evil(46, 7, '#fff')}<path d="M54 54 h12" stroke="${OL}" stroke-width="2"/>`),
  'toeic|スペルミス': sprite('spell', `
<g transform="rotate(-35 60 60)"><rect x="50" y="10" width="20" height="78" fill="#facc15" stroke="${OL}" stroke-width="3"/><rect x="50" y="10" width="20" height="12" fill="#f472b6" stroke="${OL}" stroke-width="3"/><path d="M50 88 l10 18 l10 -18z" fill="#fde68a" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M56 100 l4 6 l4 -6z" fill="${OL}"/></g>
${evil(54, 8, '#fff')}<path d="M18 104 q10 -8 20 0 t20 0" stroke="#ef4444" stroke-width="3" fill="none"/>`),
  'toeic|和製英語': sprite('japlish', `
<circle cx="60" cy="64" r="34" fill="#fff" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="64" r="15" fill="#dc2626"/>
${evil(56, 18, '#fde047')}<path d="M48 86 q12 -6 24 0" stroke="${OL}" stroke-width="2.2" fill="none"/>`),
  'toeic|前置詞ふらふら': sprite('kite', `
<path d="M60 18 l28 30 l-28 40 l-28 -40z" fill="#38bdf8" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M60 18 v70 M32 48 h56" stroke="#0369a1" stroke-width="2"/>
<path d="M60 88 q-10 10 0 16 q10 6 -4 14" stroke="${OL}" stroke-width="2" fill="none"/><g fill="#f472b6" stroke="${OL}" stroke-width="1.5"><path d="M56 98 l-6 -4 l2 6z"/><path d="M60 108 l6 -4 l-2 6z"/></g>
${evil(46, 8, '#fff')}`),
  // ----- 回ごとの雑魚 -----
  'toeic|品詞まちがい': sprite('posmix', `
<g stroke="${OL}" stroke-width="2.5">${[[24, 40, '#fde047', 'n'], [58, 30, '#93c5fd', 'v'], [86, 52, '#f9a8d4', 'adj']].map(([x, y, c, t]) => `<rect x="${x - 12}" y="${y - 10}" width="${t.length > 1 ? 30 : 24}" height="20" rx="4" fill="${c}"/>`).join('')}</g>
${blob('#a78bfa', 82, 26, 22)}${evil(80, 9, '#fff')}`),
  'toeic|by-until混同': sprite('byuntil', `
<rect x="22" y="26" width="76" height="76" rx="8" fill="#fff" stroke="${OL}" stroke-width="3"/><rect x="22" y="26" width="76" height="18" rx="8" fill="#f97316" stroke="${OL}" stroke-width="3"/>
<path d="M34 70 h52" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/><circle cx="86" cy="70" r="6" fill="#ef4444" stroke="${OL}" stroke-width="2"/>${evil(56, 12, '#fde047')}`),
  'toeic|受け身わすれ': sprite('passive', `
<path d="M60 26 a34 34 0 1 1 -32 22" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M60 26 a34 34 0 1 1 -32 22" fill="none" stroke="#14b8a6" stroke-width="7" stroke-linecap="round"/><path d="M20 40 l10 10 l8 -12" fill="#14b8a6" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="60" r="16" fill="#14b8a6" stroke="${OL}" stroke-width="3"/>${evil(60, 6, '#fff')}`),
  'toeic|because-of迷子': sprite('becauseof', `
<circle cx="60" cy="62" r="36" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2"><path d="M60 30 v6 M60 88 v6 M28 62 h6 M86 62 h6"/></g>
<path d="M60 62 l-12 -22 l14 18z" fill="#ef4444" stroke="${OL}" stroke-width="1.5"/><path d="M60 62 l12 22 l-14 -18z" fill="#94a3b8" stroke="${OL}" stroke-width="1.5"/><circle cx="60" cy="62" r="4" fill="${OL}"/>
<g fill="${OL}"><circle cx="46" cy="68" r="2"/><circle cx="74" cy="56" r="2"/></g>`),
  'toeic|倒置トラップ': sprite('inversion', `
<g transform="rotate(180 60 62)">${blob('#fb7185', 62, 30, 30)}${evil(60, 11, '#fff')}${grin(74, 10)}</g>`),
  'toeic|関係詞ジャングル': sprite('jungle', `
<g fill="#16a34a" stroke="${OL}" stroke-width="2.5">${[[30, 40, -30], [60, 30, 0], [90, 40, 30], [40, 60, -60], [80, 60, 60]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="9" transform="rotate(${r} ${x} ${y})"/>`).join('')}</g>
<path d="M60 108 v-60" stroke="#78350f" stroke-width="8"/><g fill="none" stroke="#65a30d" stroke-width="3"><path d="M30 60 q4 30 -6 50 M90 60 q-4 30 6 50"/></g>${evil(78, 8, '#fde047')}`),
  'toeic|つなぎ言葉まよい': sprite('connective', `
<g fill="none" stroke-width="8">${[[30, 64], [50, 56], [70, 64], [90, 56]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" stroke="${OL}" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<g fill="none" stroke-width="4.5">${[[30, 64], [50, 56], [70, 64], [90, 56]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" stroke="${['#f87171', '#fbbf24', '#4ade80', '#60a5fa'][i]}" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<circle cx="60" cy="90" r="12" fill="#cbd5e1" stroke="${OL}" stroke-width="2.5"/><circle cx="56" cy="89" r="1.6" fill="${OL}"/><circle cx="64" cy="89" r="1.6" fill="${OL}"/>`),
  'toeic|文挿入ゴースト': sprite('insertghost', `
<rect x="16" y="56" width="88" height="44" rx="4" fill="#fff" stroke="${OL}" stroke-width="3"/><g stroke="#cbd5e1" stroke-width="3"><path d="M24 68 h30 M66 68 h30 M24 80 h72 M24 92 h50"/></g><rect x="54" y="62" width="12" height="12" fill="#fde047" stroke="${OL}" stroke-width="1.5"/>
<path d="M44 54 q-4 -36 16 -40 q20 4 16 40 l-5 -4 l-5 6 l-6 -6 l-6 6 l-5 -6z" fill="#e0e7ff" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>${evil(32, 7, '#818cf8')}`),
  'toeic|NOT問題の罠': sprite('nottrap', `
<circle cx="60" cy="64" r="36" fill="#fff" stroke="#dc2626" stroke-width="9"/><path d="M36 40 l48 48" stroke="#dc2626" stroke-width="9"/>
${evil(58, 12, '#fde047')}<path d="M50 80 q10 -5 20 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeic|言いかえ迷彩': sprite('camopara', `
<path d="M18 70 q8 -32 40 -32 q26 0 34 16 q4 14 -8 24 q-30 8 -66 -8z" fill="#65a30d" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g fill="#3f6212" opacity=".8"><circle cx="40" cy="56" r="7"/><circle cx="62" cy="50" r="5"/><circle cx="74" cy="66" r="6"/></g><g fill="#a3e635" opacity=".8"><circle cx="52" cy="66" r="5"/><circle cx="82" cy="54" r="4"/></g>
<path d="M18 70 q-8 -10 -2 -22 q10 2 14 12" fill="#65a30d" stroke="${OL}" stroke-width="2.5"/><circle cx="28" cy="58" r="7" fill="#d9f99d" stroke="${OL}" stroke-width="2.5"/><circle cx="30" cy="58" r="3" fill="${OL}"/>
<path d="M76 82 q24 2 26 16 q2 12 -10 12 q-8 0 -8 -8" fill="none" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M76 82 q24 2 26 16 q2 12 -10 12 q-8 0 -8 -8" fill="none" stroke="#65a30d" stroke-width="4" stroke-linecap="round"/>`),
  // ----- 回のボス -----
  'toeic|ボキャ不足ゴーレム': sprite('vocabgolem', `
<path d="M22 66 l-12 6 l-2 18 l12 4 l8 -14z M98 66 l12 6 l2 18 l-12 4 l-8 -14z" fill="#78716c" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 108 l-2 -48 l8 -14 h52 l8 14 l-2 48z" fill="#a8a29e" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g fill="#57534e" stroke="${OL}" stroke-width="1.5">${[[38, 64], [62, 70], [46, 86], [72, 90]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="10" rx="2"/>`).join('')}</g>
<path d="M40 44 l4 -22 h32 l4 22z" fill="#d6d3d1" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M46 32 h12 v5 h-12z M62 32 h12 v5 h-12z" fill="#f87171" stroke="${OL}" stroke-width="1.5"/>`, { aura: '#a8a29e' }),
  'toeic|タイムアウト時計塔': sprite('clocktower', `
<path d="M36 110 v-66 l24 -30 l24 30 v66z" fill="#78350f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="56" r="18" fill="#fef3c7" stroke="${OL}" stroke-width="3"/>
<path d="M60 56 v-12 M60 56 l10 6" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><g fill="#fde047"><rect x="48" y="84" width="8" height="12"/><rect x="64" y="84" width="8" height="12"/></g>
<path d="M44 40 l10 4 M76 40 l-10 4" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>`, { aura: '#f59e0b' }),
  'toeic|ネイティブの影': sprite('nativeshadow', `
<path d="M24 110 q-4 -66 36 -76 q40 10 36 76 q-10 -10 -18 0 q-8 -10 -18 0 q-10 -10 -18 0 q-8 -10 -18 0z" fill="#312e81" stroke="${OL}" stroke-width="3"/>
${evil(58, 12, '#c4b5fd')}${grin(74, 12)}<g fill="#a5b4fc" opacity=".7"><circle cx="18" cy="30" r="3"/><circle cx="100" cy="24" r="2.5"/></g>`, { aura: '#6366f1' }),
  'toeic|長文の番人': sprite('longguard', `
<path d="M28 18 h64 q8 0 8 8 v88 h-72 q-8 0 -8 -8 v-80 q0 -8 8 -8z" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><rect x="20" y="12" width="80" height="12" rx="6" fill="#a16207" stroke="${OL}" stroke-width="3"/><rect x="20" y="104" width="80" height="12" rx="6" fill="#a16207" stroke="${OL}" stroke-width="3"/>
<g fill="#fde047" stroke="${OL}" stroke-width="1.5">${[0, 1, 2, 3].map((i) => `<rect x="${34 + (i % 2) * 30}" y="${66 + Math.floor(i / 2) * 16}" width="22" height="9"/>`).join('')}</g>${evil(42, 12, '#b45309')}${grin(54, 10)}`, { aura: '#f59e0b' }),
  'toeic|読解の大迷宮': sprite('readmaze', `
<path d="M12 110 v-60 l48 -32 l48 32 v60z" fill="#e2e8f0" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g stroke="${OL}" stroke-width="2.5" fill="#cbd5e1">${[26, 46, 66, 86].map((x) => `<rect x="${x - 4}" y="56" width="10" height="50"/>`).join('')}</g>
<path d="M12 52 h96" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="38" r="10" fill="#475569" stroke="${OL}" stroke-width="2.5"/><circle cx="56" cy="37" r="2" fill="#fde047"/><circle cx="64" cy="37" r="2" fill="#fde047"/>`, { aura: '#94a3b8' }),
  'toeic|ゴールデンスコア': gold('goldscore', `
<path d="M34 22 h52 v84 h-52z" fill="url(#eg-goldscore)" stroke="${OL}" stroke-width="3"/><g stroke="#92400e" stroke-width="2.5"><path d="M42 74 h36 M42 84 h28 M42 94 h32"/></g>
<text x="60" y="66" text-anchor="middle" font-size="16" font-weight="900" fill="#78350f">990</text>${smug(38, 9)}`),
});

Object.assign(ENEMY_ART, {
  // ----- TOEIC リーディング：ステージ専用（第1回） -----
  'toeic|a/an迷い': sprite('aan', `
<g stroke="${OL}" stroke-width="3" font-weight="900" font-size="22"><rect x="14" y="40" width="40" height="44" rx="10" fill="#f87171"/><rect x="66" y="40" width="40" height="44" rx="10" fill="#60a5fa"/></g>
<g font-weight="900" font-size="20" fill="#fff" text-anchor="middle"><text x="34" y="70">a</text><text x="86" y="70">an</text></g><text x="54" y="34" font-size="16" font-weight="900" fill="#fde047">?</text>`),
  'toeic|複数形もれ': sprite('plural', `
<path d="M20 70 q0 -20 18 -22 l20 -6 q8 18 30 18 q14 2 14 16 v8 h-82z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M18 84 h86 v10 h-86z" fill="#fff" stroke="${OL}" stroke-width="3"/>
<path d="M78 70 q10 8 20 6" stroke="#fff" stroke-width="3" fill="none"/>${evil(62, 0, '#fff').replace(/cx="60"/g, 'cx="40"')}<g transform="translate(40 64)"><circle cx="-5" r="2" fill="${OL}"/><circle cx="5" r="2" fill="${OL}"/></g>
<path d="M94 40 l8 -8" stroke="#ef4444" stroke-width="3"/>`),
  'toeic|金の単語帳': gold('goldvocab', `
<circle cx="40" cy="34" r="8" fill="none" stroke="#94a3b8" stroke-width="4"/><g stroke="${OL}" stroke-width="2.5"><rect x="28" y="40" width="64" height="40" rx="4" fill="#fde68a"/><rect x="24" y="46" width="64" height="40" rx="4" fill="url(#eg-goldvocab)"/></g>${smug(64, 10).replace(/60 -/g, '56 -').replace(/60 \+/g, '56 +')}`),
  'toeic|be動詞迷子': sprite('bevb', `
<circle cx="60" cy="64" r="34" fill="#3b82f6" stroke="${OL}" stroke-width="3"/><text x="60" y="56" text-anchor="middle" font-size="16" font-weight="900" fill="#bfdbfe">be</text>
${evil(68, 11, '#fff')}<path d="M52 84 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeic|疑問文迷子': sprite('questionlost', `
<path d="M40 44 q0 -24 22 -24 q22 0 22 20 q0 14 -16 20 q-6 4 -6 14 v6" fill="none" stroke="${OL}" stroke-width="17" stroke-linecap="round"/><path d="M40 44 q0 -24 22 -24 q22 0 22 20 q0 14 -16 20 q-6 4 -6 14 v6" fill="none" stroke="#a855f7" stroke-width="11" stroke-linecap="round"/>
<circle cx="62" cy="102" r="9" fill="#a855f7" stroke="${OL}" stroke-width="3"/><circle cx="56" cy="34" r="2" fill="#fff"/><circle cx="70" cy="34" r="2" fill="#fff"/>`),
  'toeic|金のスコア500': gold('gold500', `
<circle cx="60" cy="62" r="34" fill="#d97706" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="62" r="25" fill="#f59e0b" stroke="#92400e" stroke-width="2"/><text x="60" y="76" text-anchor="middle" font-size="16" font-weight="900" fill="#78350f">500</text>
${smug(52, 8)}<path d="M40 92 l-6 20 l10 -6 l6 10 l4 -18 M80 92 l6 20 l-10 -6 l-6 10 l-4 -18" fill="#ef4444" stroke="${OL}" stroke-width="2"/>`),
  // ----- 第2回 -----
  'toeic|動名詞迷い': sprite('gerund', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M6 58 h16 M10 72 h12"/></g>
<path d="M44 104 l8 -22 l-16 -8 M76 104 l-6 -22 l16 -4" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="60" cy="62" rx="26" ry="28" fill="#4ade80" stroke="${OL}" stroke-width="3"/><text x="60" y="80" text-anchor="middle" font-size="11" font-weight="900" fill="#14532d">-ing</text>${evil(56, 10, '#fff')}`),
  'toeic|不定詞迷い': sprite('infinitive', `
<circle cx="60" cy="62" r="38" fill="#fff" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="62" r="28" fill="#ef4444"/><circle cx="60" cy="62" r="18" fill="#fff"/><circle cx="60" cy="62" r="9" fill="#ef4444"/>
<path d="M104 18 l-38 38" stroke="${OL}" stroke-width="4"/><path d="M104 18 l-4 12 M104 18 l-12 4" stroke="${OL}" stroke-width="3"/>${evil(60, 18, '#fde047')}`),
  'toeic|金の動詞': gold('goldverb', `
<path d="M30 92 l34 -34 a16 16 0 1 1 10 10 l-34 34 z" fill="url(#eg-goldverb)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="80" cy="42" r="7" fill="#fef9c3" stroke="${OL}" stroke-width="2"/>${smug(62, 7).replace(/60 -/g, '52 -').replace(/60 \+/g, '52 +')}`),
  'toeic|比較級迷子': sprite('compar', `
<path d="M14 100 h92" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2.5"><rect x="24" y="70" width="20" height="30" fill="#93c5fd"/><rect x="50" y="50" width="20" height="50" fill="#60a5fa"/><rect x="76" y="30" width="20" height="70" fill="#cbd5e1" stroke-dasharray="4 3"/></g>
<path d="M22 66 l70 -42" stroke="#22c55e" stroke-width="3" stroke-dasharray="5 4"/>${evil(66, 0, '#fff').replace(/cx="60"/g, 'cx="60"')}`),
  'toeic|語法迷子': sprite('usage', `
<circle cx="60" cy="62" r="34" fill="#1e3a8a" stroke="${OL}" stroke-width="3"/><path d="M60 32 l8 30 l-8 30 l-8 -30z" fill="#ef4444" stroke="${OL}" stroke-width="2"/><path d="M60 62 l8 30 l-8 0z" fill="#e2e8f0"/>
<g fill="#fde047"><circle cx="44" cy="52" r="3"/><circle cx="76" cy="52" r="3"/></g>`),
  'toeic|金のスコア650': gold('gold650', `
<circle cx="60" cy="62" r="34" fill="#94a3b8" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="62" r="25" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/><text x="60" y="76" text-anchor="middle" font-size="16" font-weight="900" fill="#334155">650</text>
${smug(52, 8)}<path d="M40 92 l-6 20 l10 -6 l6 10 l4 -18 M80 92 l6 20 l-10 -6 l-6 10 l-4 -18" fill="#3b82f6" stroke="${OL}" stroke-width="2"/>`),
  // ----- 第3回 -----
  'toeic|仮定法迷子': sprite('crystal', `
<path d="M30 104 h60 l-8 -14 h-44z" fill="#78350f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="58" r="32" fill="#c4b5fd" fill-opacity=".9" stroke="${OL}" stroke-width="3"/>
<path d="M42 42 q8 -10 20 -10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><text x="60" y="64" text-anchor="middle" font-size="14" font-weight="900" fill="#5b21b6">if…</text>${evil(76, 10, '#fff')}`),
  'toeic|分詞構文迷子': sprite('participle', `
<path d="M0 72 q15 -14 30 0 t30 0 t30 0 t30 0 v48 h-120z" fill="#0ea5e9" stroke="${OL}" stroke-width="3"/><path d="M0 88 q15 -10 30 0 t30 0 t30 0 t30 0" stroke="#bae6fd" stroke-width="3" fill="none"/>
<circle cx="60" cy="56" r="20" fill="#38bdf8" stroke="${OL}" stroke-width="3"/>${evil(54, 7, '#fff')}`),
  'toeic|金の文法書': gold('goldgram', `
<path d="M30 24 h56 q6 0 6 6 v76 h-56 q-6 0 -6 -6z" fill="url(#eg-goldgram)" stroke="${OL}" stroke-width="3"/><path d="M36 106 v-82" stroke="#92400e" stroke-width="3"/><rect x="46" y="40" width="38" height="14" rx="2" fill="#fef9c3" stroke="${OL}" stroke-width="1.5"/>${smug(76, 10).replace(/60 -/g, '64 -').replace(/60 \+/g, '64 +')}`),
  'toeic|難語の霧': sprite('hardfog', `
<path d="M12 74 q8 -30 30 -26 q8 -20 28 -14 q20 -8 28 12 q14 6 10 24 q-4 18 -22 16 h-58 q-20 0 -16 -12z" fill="#cbd5e1" fill-opacity=".9" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#94a3b8" stroke-width="3" stroke-linecap="round"><path d="M18 100 h38 M50 108 h50"/></g>${evil(66, 12, '#e2e8f0')}`),
  'toeic|熟語の迷路': sprite('idiommaze', `
<rect x="18" y="22" width="84" height="84" rx="6" fill="#4c1d95" stroke="${OL}" stroke-width="3"/>
<g stroke="#c4b5fd" stroke-width="4" fill="none" stroke-linecap="round"><path d="M28 32 h28 v14 h18 M92 32 v26 h-14 M28 46 v22 h14 v14 M48 60 h14 v22 M76 72 h16 v24 h-28 M28 96 h22"/></g>
<circle cx="60" cy="62" r="12" fill="#8b5cf6" stroke="${OL}" stroke-width="2.5"/><circle cx="56" cy="61" r="2" fill="#fde047"/><circle cx="64" cy="61" r="2" fill="#fde047"/>`),
  'toeic|金のスコア800': gold('gold800', `
<circle cx="60" cy="62" r="34" fill="url(#eg-gold800)" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="62" r="25" fill="#fde68a" stroke="#b45309" stroke-width="2"/><text x="60" y="76" text-anchor="middle" font-size="16" font-weight="900" fill="#78350f">800</text>
${smug(52, 8)}<path d="M40 92 l-6 20 l10 -6 l6 10 l4 -18 M80 92 l6 20 l-10 -6 l-6 10 l-4 -18" fill="#dc2626" stroke="${OL}" stroke-width="2"/>`),
  // ----- 第6回 -----
  'toeic|時制ちぐはぐ': sprite('tensemix', `
<circle cx="60" cy="62" r="36" fill="#fef3c7" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="3" stroke-linecap="round"><path d="M60 62 v-22 M60 62 l18 8 M60 62 l-14 14"/></g><circle cx="60" cy="62" r="4" fill="${OL}"/>
<g fill="${OL}"><circle cx="46" cy="50" r="2.4"/><circle cx="74" cy="50" r="2.4"/></g><path d="M50 40 l8 3 M70 40 l-8 3" stroke="${OL}" stroke-width="2.4"/>`),
  'toeic|代名詞まいご': sprite('pronoun', `
<g stroke="${OL}" stroke-width="3" font-weight="900" font-size="16"><rect x="14" y="44" width="34" height="34" rx="8" fill="#fbbf24"/><rect x="72" y="44" width="34" height="34" rx="8" fill="#a78bfa"/></g>
<g font-weight="900" font-size="15" fill="${OL}" text-anchor="middle"><text x="31" y="66">it</text><text x="89" y="66">they</text></g><path d="M50 60 h20" stroke="#fde047" stroke-width="3" stroke-dasharray="4 3"/><text x="54" y="40" font-size="16" font-weight="900" fill="#fde047">?</text>`),
  'toeic|金の接続詞': gold('goldconj', `
<g fill="none" stroke-width="9">${[[26, 64], [46, 56], [66, 64], [86, 56]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" stroke="${OL}" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<g fill="none" stroke-width="5">${[[26, 64], [46, 56], [66, 64], [86, 56]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="7" stroke="url(#eg-goldconj)" transform="rotate(${i % 2 ? 20 : -20} ${x} ${y})"/>`).join('')}</g>
<circle cx="60" cy="90" r="12" fill="url(#eg-goldconj)" stroke="${OL}" stroke-width="2.5"/>${smug(88, 4)}`),
  'toeic|段落とばし': sprite('skippara', `
<rect x="26" y="20" width="68" height="88" rx="4" fill="#fff" stroke="${OL}" stroke-width="3"/><g stroke="#cbd5e1" stroke-width="3"><path d="M34 32 h52 M34 40 h44 M34 82 h52 M34 90 h40 M34 98 h48"/></g>
<path d="M30 50 q30 -6 60 0 l-4 22 q-26 6 -52 0z" fill="#fde047" stroke="${OL}" stroke-width="2.5"/>${evil(62, 9, '#fff')}`),
  'toeic|話題ずれ': sprite('offtopic', `
<path d="M24 34 q36 -14 72 0 q4 40 -36 64 q-40 -24 -36 -64z" fill="#f472b6" stroke="${OL}" stroke-width="3"/><path d="M36 50 l12 4 M84 50 l-12 4" stroke="${OL}" stroke-width="2.5"/><path d="M38 58 q5 -4 10 0 M72 58 q5 -4 10 0" stroke="${OL}" stroke-width="2.5" fill="none"/>
<path d="M42 78 q6 -6 14 2 q8 -8 18 -2" stroke="${OL}" stroke-width="2.5" fill="none"/>`),
  'toeic|金の段落': gold('goldpara', `
<rect x="26" y="22" width="68" height="84" rx="4" fill="url(#eg-goldpara)" stroke="${OL}" stroke-width="3"/><g stroke="#92400e" stroke-width="3"><path d="M40 70 h46 M34 78 h52 M34 86 h52 M34 94 h36"/></g>${smug(44, 10)}`),
  // ----- 第7回 -----
  'toeic|チャットの意図': sprite('chatintent', `${bubble(12, 22, 56, 36, '#bfdbfe')}${bubble(54, 62, 56, 36, '#bbf7d0')}
<g fill="${OL}"><circle cx="32" cy="38" r="2.2"/><circle cx="46" cy="38" r="2.2"/><circle cx="74" cy="78" r="2.2"/><circle cx="88" cy="78" r="2.2"/></g><path d="M36 46 q4 -2 8 0 M78 86 q4 2 8 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'toeic|時刻の迷路': sprite('watch', `
<rect x="46" y="12" width="28" height="22" rx="4" fill="#475569" stroke="${OL}" stroke-width="3"/><rect x="46" y="88" width="28" height="22" rx="4" fill="#475569" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="61" r="30" fill="#e2e8f0" stroke="${OL}" stroke-width="4"/><g stroke="${OL}" stroke-width="3" stroke-linecap="round"><path d="M60 61 v-18 M60 61 l14 6"/></g>
<g fill="${OL}"><circle cx="48" cy="70" r="2.2"/><circle cx="72" cy="52" r="2.2"/></g>`),
  'toeic|金の付せん': gold('goldsticky', `
<path d="M60 24 l-6 30 h12z" fill="#94a3b8" stroke="${OL}" stroke-width="2"/><circle cx="60" cy="24" r="10" fill="#ef4444" stroke="${OL}" stroke-width="2.5"/>
<rect x="30" y="52" width="60" height="50" rx="3" fill="url(#eg-goldsticky)" stroke="${OL}" stroke-width="3" transform="rotate(-4 60 77)"/>${smug(76, 10)}`),
  'toeic|記事の見出し': sprite('headline', `
<rect x="20" y="26" width="80" height="80" rx="3" fill="#f8fafc" stroke="${OL}" stroke-width="3"/><rect x="28" y="34" width="64" height="16" fill="#1f2937"/><g stroke="#cbd5e1" stroke-width="3"><path d="M28 90 h64 M28 98 h50"/></g>
${evil(68, 12, '#a78bfa')}`),
  'toeic|広告の小さな字': sprite('smallprint', `
<rect x="20" y="22" width="80" height="84" rx="4" fill="#fde047" stroke="${OL}" stroke-width="3"/><text x="60" y="50" text-anchor="middle" font-size="16" font-weight="900" fill="#dc2626">SALE</text>
<g stroke="#a16207" stroke-width="1.2"><path d="M28 92 h64 M28 96 h64 M28 100 h50"/></g><circle cx="78" cy="88" r="12" fill="#e0f2fe" fill-opacity=".8" stroke="${OL}" stroke-width="3"/>${evil(70, 14, '#fff')}`),
  'toeic|金の新聞': gold('goldnews', `
<path d="M22 32 h70 v74 h-70z" fill="url(#eg-goldnews)" stroke="${OL}" stroke-width="3"/><path d="M92 46 h8 v54 q0 6 -8 6" fill="#fde68a" stroke="${OL}" stroke-width="3"/>
<rect x="30" y="40" width="54" height="12" fill="#78350f"/><g stroke="#92400e" stroke-width="2.5"><path d="M30 88 h54 M30 96 h40"/></g>${smug(70, 10).replace(/60 -/g, '57 -').replace(/60 \+/g, '57 +')}`),
});

// 車（横向き）とタイヤ
const car = (x, y, c = '#ef4444', w = 70) => `<g transform="translate(${x} ${y})"><path d="M0 0 q2 -14 16 -16 l10 -12 h${w * 0.4} l12 12 q${w * 0.2} 2 ${w * 0.22} 16 v8 h-${w}z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M28 -26 h${w * 0.36} l9 10 h-${w * 0.36 + 9}z" fill="#bae6fd" stroke="${OL}" stroke-width="2"/><path d="M${w * 0.42} -21 l4 1.5 M${w * 0.42 + 12} -21 l-4 1.5" stroke="${OL}" stroke-width="1.8" stroke-linecap="round"/><circle cx="${w * 0.42 + 2}" cy="-18" r="1.7" fill="${OL}"/><circle cx="${w * 0.42 + 10}" cy="-18" r="1.7" fill="${OL}"/><circle cx="16" cy="8" r="8" fill="#1f2937" stroke="${OL}" stroke-width="2"/><circle cx="${w - 14}" cy="8" r="8" fill="#1f2937" stroke="${OL}" stroke-width="2"/><circle cx="16" cy="8" r="3" fill="#cbd5e1"/><circle cx="${w - 14}" cy="8" r="3" fill="#cbd5e1"/></g>`;
const road = `<path d="M0 100 h120 v20 h-120z" fill="#64748b"/><path d="M6 110 h16 M34 110 h16 M62 110 h16 M90 110 h16" stroke="#fff" stroke-width="3"/>`;

Object.assign(ENEMY_ART, {
  // ----- 免許：どの回にも出る雑魚 -----
  'menkyo|ながらスマホ': sprite('phone', `
<rect x="34" y="20" width="52" height="88" rx="10" fill="#1f2937" stroke="${OL}" stroke-width="3"/><rect x="40" y="30" width="40" height="64" rx="3" fill="#38bdf8"/>
${evil(56, 10, '#fff')}${grin(72, 9)}<g fill="#fde047"><path d="M16 30 l6 6 M14 44 h8 M104 30 l-6 6 M106 44 h-8" stroke="#fde047" stroke-width="3" stroke-linecap="round"/></g>`),
  'menkyo|うっかり信号無視': sprite('runred', `
<rect x="20" y="36" width="80" height="34" rx="12" fill="#1f2937" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2"><circle cx="38" cy="53" r="10" fill="#475569"/><circle cx="60" cy="53" r="10" fill="#fde047"/><circle cx="82" cy="53" r="10" fill="#475569"/></g>
<path d="M60 70 v40" stroke="#64748b" stroke-width="6"/><path d="M56 50 l3 1 M64 50 l-3 1" stroke="${OL}" stroke-width="1.8"/><circle cx="56" cy="55" r="1.6" fill="${OL}"/><circle cx="64" cy="55" r="1.6" fill="${OL}"/>`),
  'menkyo|合図わすれ': sprite('nosignal', `
<rect x="26" y="46" width="68" height="40" rx="14" fill="#fbbf24" stroke="${OL}" stroke-width="3"/><path d="M40 66 h40 l-10 -8 M80 66 l-10 8" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round" opacity=".35"/>
${evil(62, 14, '#fff')}<path d="M20 36 l10 8 M100 36 l-10 8" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>`),
  'menkyo|車間つめすぎ': sprite('tailgate', `${road}${car(6, 84, '#60a5fa', 56)}${car(56, 84, '#ef4444', 58)}<path d="M60 64 l6 6 M66 60 l4 8" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
<g transform="translate(92 66)"><path d="M-6 -4 l5 2 M6 -4 l-5 2" stroke="${OL}" stroke-width="2"/></g>`),
  'menkyo|シートベルトはずし': sprite('seatbelt', `
<path d="M26 110 v-50 q0 -24 34 -24 q34 0 34 24 v50z" fill="#475569" stroke="${OL}" stroke-width="3"/><path d="M38 40 l44 70" stroke="#94a3b8" stroke-width="9" stroke-dasharray="14 8"/>
<rect x="70" y="80" width="18" height="12" rx="2" fill="#cbd5e1" stroke="${OL}" stroke-width="2"/>${evil(64, 12, '#fde047')}`),
  'menkyo|あおり運転': sprite('roadrage', `${road}${car(10, 84, '#1f2937', 96)}
<path d="M58 54 l8 -4 M74 54 l-8 -4" stroke="#ef4444" stroke-width="3"/><g stroke="#fde047" stroke-width="3" stroke-linecap="round"><path d="M14 66 l-8 -6 M12 76 h-10"/></g>
<g fill="#ef4444" stroke="${OL}" stroke-width="1.5"><path d="M92 40 l6 -8 l2 10 l8 -4 l-4 10z"/></g>`),
  // ----- 回ごとの雑魚 -----
  'menkyo|標識見落とし': sprite('signmiss', `
<path d="M60 64 v46" stroke="#94a3b8" stroke-width="6"/><circle cx="60" cy="46" r="30" fill="#fff" stroke="#dc2626" stroke-width="8"/><circle cx="60" cy="46" r="30" fill="none" stroke="${OL}" stroke-width="2"/>
${evil(46, 10, '#fde047')}<path d="M52 58 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'menkyo|手信号まよい': sprite('handsig', `
<path d="M14 54 h28 M78 54 h28" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M14 54 h28 M78 54 h28" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<ellipse cx="60" cy="66" rx="20" ry="26" fill="#1e40af" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="36" r="14" fill="#1e40af" stroke="${OL}" stroke-width="3"/><path d="M44 30 q16 -16 32 0z" fill="#1e3a8a" stroke="${OL}" stroke-width="2"/>
<circle cx="55" cy="38" r="2" fill="#fde047"/><circle cx="65" cy="38" r="2" fill="#fde047"/>`),
  'menkyo|はみ出しくん': sprite('overline', `
<path d="M0 100 h120 v20 h-120z" fill="#64748b"/><path d="M0 108 h120" stroke="#facc15" stroke-width="4"/>
<ellipse cx="60" cy="74" rx="28" ry="30" fill="#f97316" stroke="${OL}" stroke-width="3"/><path d="M44 104 l-6 8 M76 104 l6 8" stroke="${OL}" stroke-width="5" stroke-linecap="round"/>${evil(70, 10, '#fff')}${grin(84, 9)}`),
  'menkyo|サイレンあわて': sprite('siren', `
<path d="M34 68 q0 -40 26 -40 q26 0 26 40z" fill="#ef4444" stroke="${OL}" stroke-width="3"/><rect x="26" y="68" width="68" height="16" rx="3" fill="#94a3b8" stroke="${OL}" stroke-width="3"/>
<g stroke="#fca5a5" stroke-width="3" stroke-linecap="round"><path d="M20 40 l-8 -6 M100 40 l8 -6 M60 18 v-8"/></g>${evil(52, 10, '#fff')}<path d="M54 62 q6 -6 12 0" stroke="${OL}" stroke-width="2" fill="#7f1d1d"/>`),
  'menkyo|スピード狂': sprite('speedmania', `
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M2 60 h18 M0 74 h14"/></g>${road}
<path d="M22 92 q4 -16 20 -18 l10 -10 h22 l18 10 q16 2 16 18z" fill="#dc2626" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="40" cy="94" r="9" fill="#1f2937" stroke="${OL}" stroke-width="2"/><circle cx="92" cy="94" r="9" fill="#1f2937" stroke="${OL}" stroke-width="2"/>
<path d="M60 66 l6 -2 M74 66 l-6 -2" stroke="${OL}" stroke-width="2.4"/><circle cx="62" cy="70" r="1.8" fill="${OL}"/><circle cx="72" cy="70" r="1.8" fill="${OL}"/>`),
  'menkyo|無理な追い越し': sprite('overtake', `${road}${car(4, 92, '#60a5fa', 54)}${car(58, 72, '#f97316', 58)}
<path d="M40 60 q20 -20 40 0" stroke="#fde047" stroke-width="3" fill="none" stroke-dasharray="5 4"/>`),
  'menkyo|飛び出しボール': sprite('ball', `
<circle cx="60" cy="66" r="34" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M60 46 l14 10 l-6 16 h-16 l-6 -16z" fill="${OL}"/><g stroke="${OL}" stroke-width="2"><path d="M60 46 v-14 M74 56 l14 -4 M68 72 l8 12 M52 72 l-8 12 M46 56 l-14 -4"/></g>
<path d="M40 80 l7 2 M80 80 l-7 2" stroke="${OL}" stroke-width="2.4"/><circle cx="44" cy="85" r="2.2" fill="${OL}"/><circle cx="76" cy="85" r="2.2" fill="${OL}"/><g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M10 60 h14 M6 74 h14"/></g>`),
  'menkyo|迷惑駐車': sprite('badpark', `
<rect x="20" y="20" width="44" height="44" rx="6" fill="#2563eb" stroke="${OL}" stroke-width="3"/><text x="42" y="54" text-anchor="middle" font-size="30" font-weight="900" fill="#fff">P</text><path d="M24 24 l36 36" stroke="#ef4444" stroke-width="6"/>
${car(40, 96, '#a855f7', 72)}<path d="M76 74 l5 2 M90 74 l-5 2" stroke="${OL}" stroke-width="2"/>`),
  'menkyo|ハイビームおばけ': sprite('highbeam', `
<path d="M60 54 l60 -30 v60z" fill="#fef9c3" opacity=".6"/><path d="M28 96 q-6 -56 30 -62 q36 6 30 62 l-8 -8 l-7 10 l-7 -10 l-8 10 l-7 -10 l-8 10 l-7 -10z" fill="#e2e8f0" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="48" cy="56" r="9" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="72" cy="56" r="9" fill="#fde047" stroke="${OL}" stroke-width="2"/><ellipse cx="60" cy="76" rx="5" ry="6" fill="#334155"/>`),
  'menkyo|逆走ドライバー': sprite('wrongway', `${road}
<g transform="translate(120 0) scale(-1 1)">${car(20, 90, '#16a34a', 80)}</g><path d="M14 40 h30 l-8 -8 M14 40 l8 8" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M50 70 l5 -2 M64 70 l-5 -2" stroke="${OL}" stroke-width="2.4"/>`),
  'menkyo|ハイドロすべり': sprite('hydro', `
<path d="M0 92 q15 -8 30 0 t30 0 t30 0 t30 0 v28 h-120z" fill="#38bdf8" stroke="${OL}" stroke-width="2.5"/>
<g transform="rotate(-10 60 70)">${car(24, 78, '#f472b6', 72)}</g><g fill="#bae6fd"><circle cx="16" cy="80" r="4"/><circle cx="104" cy="82" r="3"/></g>`),
  'menkyo|パンク魔': sprite('puncture', `
<circle cx="60" cy="64" r="38" fill="#1f2937" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="64" r="18" fill="#94a3b8" stroke="${OL}" stroke-width="2.5"/><g stroke="#475569" stroke-width="3">${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${(60 + Math.cos(a) * 26).toFixed(1)} ${(64 + Math.sin(a) * 26).toFixed(1)} L${(60 + Math.cos(a) * 36).toFixed(1)} ${(64 + Math.sin(a) * 36).toFixed(1)}"/>`; }).join('')}</g>
<path d="M94 50 l14 -8" stroke="#cbd5e1" stroke-width="4"/>${evil(62, 7, '#f87171')}`),
  'menkyo|かげの飛び出し': sprite('shadowdash', `
${car(8, 96, '#64748b', 68)}<path d="M78 104 q-4 -36 20 -40 q20 4 18 40z" fill="#1e293b" stroke="${OL}" stroke-width="3"/><circle cx="94" cy="54" r="12" fill="#1e293b" stroke="${OL}" stroke-width="3"/>
<circle cx="90" cy="54" r="2" fill="#fde047"/><circle cx="98" cy="54" r="2" fill="#fde047"/>`),
  'menkyo|見えない二輪車': sprite('ghostbike', `
<g opacity=".7"><circle cx="30" cy="92" r="16" fill="none" stroke="${OL}" stroke-width="5"/><circle cx="90" cy="92" r="16" fill="none" stroke="${OL}" stroke-width="5"/><path d="M30 92 l20 -30 h20 l20 30 M50 62 l-6 -10 h-10 M70 62 l4 -10 h10" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linejoin="round"/></g>
<circle cx="60" cy="46" r="14" fill="#e2e8f0" fill-opacity=".7" stroke="${OL}" stroke-width="2.5" stroke-dasharray="4 3"/><circle cx="56" cy="45" r="2" fill="${OL}"/><circle cx="64" cy="45" r="2" fill="${OL}"/>`),
  // ----- 回のボス -----
  'menkyo|赤信号の番人': sprite('redguard', `
<path d="M60 84 v28" stroke="#475569" stroke-width="8"/><rect x="30" y="12" width="60" height="76" rx="14" fill="#1f2937" stroke="${OL}" stroke-width="3"/>
<circle cx="60" cy="32" r="12" fill="#ef4444" stroke="${OL}" stroke-width="2"/><circle cx="60" cy="54" r="10" fill="#57534e" stroke="${OL}" stroke-width="2"/><circle cx="60" cy="74" r="10" fill="#57534e" stroke="${OL}" stroke-width="2"/>
<path d="M50 28 l6 2 M70 28 l-6 2" stroke="${OL}" stroke-width="2.4"/><path d="M54 38 q6 -3 12 0" stroke="${OL}" stroke-width="2" fill="none"/>
<path d="M30 30 l-12 -8 M90 30 l12 -8" stroke="#fca5a5" stroke-width="3" stroke-linecap="round"/>`, { aura: '#ef4444' }),
  'menkyo|車線ふさぎ大王': sprite('laneking', `${road}
<rect x="8" y="44" width="64" height="50" rx="4" fill="#64748b" stroke="${OL}" stroke-width="3"/><path d="M72 58 h22 l16 18 v18 h-38z" fill="#f59e0b" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M78 62 h14 l10 12 h-24z" fill="#bae6fd" stroke="${OL}" stroke-width="2"/>
<g fill="#1f2937" stroke="${OL}" stroke-width="2"><circle cx="24" cy="96" r="9"/><circle cx="52" cy="96" r="9"/><circle cx="92" cy="96" r="9"/></g>
<path d="M18 44 l6 -16 l8 10 l8 -14 l8 14 l8 -10 l6 16z" fill="url(#eg-laneking)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>${evil(68, 0, '#fde047').replace(/cx="60"/g, 'cx="40"')}`, { aura: '#f59e0b' }),
  'menkyo|暴走ドリフター': sprite('drifter', `
<path d="M10 104 q50 -30 100 -10" stroke="#475569" stroke-width="14" fill="none"/><g fill="#cbd5e1" opacity=".7"><circle cx="14" cy="88" r="8"/><circle cx="26" cy="78" r="6"/></g>
<g transform="rotate(-16 60 70)">${car(22, 80, '#7c3aed', 78)}</g><path d="M58 50 l6 -2 M72 48 l-6 1" stroke="#fde047" stroke-width="3"/>`, { aura: '#a855f7' }),
  'menkyo|路駐の主': sprite('parkboss', `${road}
${car(14, 92, '#0f766e', 92)}<path d="M38 58 l8 -4 M84 56 l-8 -3" stroke="${OL}" stroke-width="3"/><circle cx="46" cy="62" r="3" fill="#fde047"/><circle cx="76" cy="60" r="3" fill="#fde047"/>
<g transform="translate(96 30)"><circle r="14" fill="#2563eb" stroke="#dc2626" stroke-width="4"/><path d="M-10 -10 l20 20" stroke="#dc2626" stroke-width="4"/></g>`, { aura: '#14b8a6' }),
  'menkyo|霧の高速ゴースト': sprite('fogghost', `
<path d="M10 80 q10 -20 30 -16 q10 -16 30 -10 q20 -6 30 10 q14 4 10 20z" fill="#e2e8f0" opacity=".6"/>
<path d="M28 100 q-6 -60 32 -66 q38 6 32 66 l-8 -8 l-8 10 l-8 -10 l-8 10 l-8 -10 l-8 10 l-8 -10z" fill="#f1f5f9" fill-opacity=".9" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="46" cy="58" r="8" fill="#fde047" stroke="${OL}" stroke-width="2"/><circle cx="74" cy="58" r="8" fill="#fde047" stroke="${OL}" stroke-width="2"/>${grin(76, 10)}`, { aura: '#e2e8f0' }),
  'menkyo|事故現場の混乱': sprite('accident', `
<path d="M14 104 h92 l-10 -14 h-72z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g fill="#fff"><path d="M30 104 l8 -14 h8 l-8 14z M54 104 l8 -14 h8 l-8 14z M78 104 l8 -14 h8 l-8 14z"/></g>
<path d="M30 90 l12 -60 h36 l12 60z" fill="#f97316" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M38 70 h44 M42 50 h36" stroke="#fff" stroke-width="7"/>
${evil(60, 9, '#fde047')}${grin(80, 8)}`, { aura: '#f97316' }),
  'menkyo|かもしれない魔王': sprite('maybeking', `
<path d="M16 112 q4 -40 44 -46 q40 6 44 46z" fill="#4c1d95" stroke="${OL}" stroke-width="3"/>
<path d="M28 34 l-8 -22 l18 12 M92 34 l8 -22 l-18 12" fill="#3b0764" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="52" r="26" fill="#7c3aed" stroke="${OL}" stroke-width="3"/><path d="M36 30 l6 -16 l10 10 l8 -14 l8 14 l10 -10 l6 16z" fill="url(#eg-maybeking)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
${evil(50, 11, '#fde047')}${grin(64, 13)}<g transform="translate(96 82)"><path d="M0 -14 l14 24 h-28z" fill="#fde047" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><text y="7" text-anchor="middle" font-size="13" font-weight="900" fill="${OL}">!</text></g>`, { aura: '#7c3aed' }),
  'menkyo|金の若葉マーク': gold('goldwakaba', `
<path d="M60 28 l-26 14 v44 l26 -14z" fill="url(#eg-goldwakaba)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M60 28 l26 14 v44 l-26 -14z" fill="#4ade80" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 72 v34" stroke="#78350f" stroke-width="4"/>${smug(54, 13)}`),
});

// 標識（丸・三角・逆三角・ひし形）
const signPole = (inner) => `<path d="M60 70 v40" stroke="#94a3b8" stroke-width="6"/>${inner}`;

Object.assign(ENEMY_ART, {
  // ----- 免許：ステージ専用（第1回） -----
  'menkyo|止まれ無視': sprite('stopx', signPole(`<path d="M20 18 h80 l-40 60z" fill="#dc2626" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M28 22 h64 l-32 48z" fill="none" stroke="#fff" stroke-width="2.5"/>
${evil(38, 10, '#fff')}`)),
  'menkyo|左折可まちがい': sprite('leftok', signPole(`<rect x="28" y="18" width="64" height="48" rx="4" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M76 54 v-18 h-30 l8 -8 M46 36 l8 8" stroke="#2563eb" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g fill="${OL}"><circle cx="52" cy="52" r="2"/><circle cx="64" cy="52" r="2"/></g>`)),
  'menkyo|金の信号機': gold('goldlight', `
<path d="M60 84 v24" stroke="${OL}" stroke-width="6"/><rect x="18" y="40" width="84" height="40" rx="14" fill="url(#eg-goldlight)" stroke="${OL}" stroke-width="3"/>
<g stroke="${OL}" stroke-width="2"><circle cx="38" cy="60" r="10" fill="#fef9c3"/><circle cx="60" cy="60" r="10" fill="#fef9c3"/><circle cx="82" cy="60" r="10" fill="#fef9c3"/></g>${smug(58, 0).replace(/M54 58 q6 -4 12 0/, '')}<path d="M55 64 q5 4 10 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'menkyo|ひし形スルー': sprite('diamondsk', `
<path d="M0 90 h120 v30 h-120z" fill="#64748b"/><path d="M60 72 l24 14 l-24 14 l-24 -14z" fill="#fff" stroke="${OL}" stroke-width="2"/>
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M4 50 h16 M8 64 h14"/></g>${car(30, 64, '#22c55e', 64)}`),
  'menkyo|路側帯ふみこみ': sprite('sidestrip', `
<path d="M0 60 h120 v60 h-120z" fill="#64748b"/><path d="M0 70 h120 M0 76 h120" stroke="#fff" stroke-width="3"/>${car(22, 84, '#f97316', 72)}`),
  'menkyo|金の標識': gold('goldsign', `<path d="M60 74 v34" stroke="${OL}" stroke-width="6"/><circle cx="60" cy="46" r="30" fill="url(#eg-goldsign)" stroke="${OL}" stroke-width="3"/><circle cx="60" cy="46" r="22" fill="none" stroke="#fff" stroke-width="3"/>${smug(44, 8)}`),
  // ----- 第2回 -----
  'menkyo|ウインカーなし': sprite('noblinker', `
<rect x="24" y="44" width="72" height="40" rx="14" fill="#94a3b8" stroke="${OL}" stroke-width="3"/><path d="M28 50 l-12 14 l12 14z M92 50 l12 14 l-12 14z" fill="#475569" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
${evil(62, 14, '#fff')}<path d="M52 76 h16" stroke="${OL}" stroke-width="2"/>`),
  'menkyo|右側通行': sprite('rightside', `<path d="M0 100 h120 v20 h-120z" fill="#64748b"/><path d="M60 100 v20" stroke="#facc15" stroke-width="4"/>${car(56, 92, '#a855f7', 62)}<path d="M20 50 h30 l-8 -8 M50 50 l-8 8" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  'menkyo|金のウインカー': gold('goldblink', `
<path d="M40 30 l-30 34 l30 34z" fill="url(#eg-goldblink)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M80 30 l30 34 l-30 34z" fill="url(#eg-goldblink)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="60" cy="64" r="18" fill="url(#eg-goldblink)" stroke="${OL}" stroke-width="3"/>${smug(62, 6)}`),
  'menkyo|バス専用ふみこみ': sprite('buslane', `
<path d="M0 100 h120 v20 h-120z" fill="#b91c1c"/><path d="M10 40 h96 q6 0 6 6 v48 h-102z" fill="#38bdf8" stroke="${OL}" stroke-width="3"/><g fill="#e0f2fe" stroke="${OL}" stroke-width="2"><rect x="18" y="48" width="18" height="16"/><rect x="40" y="48" width="18" height="16"/><rect x="62" y="48" width="18" height="16"/><rect x="84" y="48" width="18" height="22"/></g>
<g fill="#1f2937" stroke="${OL}" stroke-width="2"><circle cx="30" cy="96" r="9"/><circle cx="92" cy="96" r="9"/></g><path d="M86 56 l5 1 M98 56 l-5 1" stroke="${OL}" stroke-width="2"/>`),
  'menkyo|若葉いじめ': sprite('bully', `${road}${car(4, 92, '#fde047', 54)}${car(52, 84, '#1f2937', 64)}<path d="M52 66 l6 -6 M58 70 l8 -4" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>`),
  'menkyo|金のハンドル': gold('goldwheel', `
<circle cx="60" cy="62" r="36" fill="none" stroke="${OL}" stroke-width="12"/><circle cx="60" cy="62" r="36" fill="none" stroke="url(#eg-goldwheel)" stroke-width="8"/>
<path d="M28 66 h64 M60 66 v30" stroke="${OL}" stroke-width="10"/><path d="M28 66 h64 M60 66 v30" stroke="url(#eg-goldwheel)" stroke-width="6"/><circle cx="60" cy="64" r="14" fill="url(#eg-goldwheel)" stroke="${OL}" stroke-width="2.5"/>${smug(62, 5)}`),
  // ----- 第3回 -----
  'menkyo|空走おくれ': sprite('sleepdrive', `${road}${car(18, 88, '#60a5fa', 84)}<g font-weight="900" fill="#e0e7ff"><text x="82" y="38" font-size="14">z</text><text x="94" y="26" font-size="10">z</text></g>`),
  'menkyo|カーブ突っこみ': sprite('curve', `
<path d="M10 110 q0 -70 70 -80" stroke="#64748b" stroke-width="30" fill="none"/><path d="M10 110 q0 -70 70 -80" stroke="#fff" stroke-width="2.5" fill="none" stroke-dasharray="8 8"/>
<g transform="rotate(-30 70 70)">${car(46, 78, '#ef4444', 60)}</g>`),
  'menkyo|金のスピードメーター': gold('goldmeter', `
<path d="M18 84 a42 42 0 0 1 84 0z" fill="url(#eg-goldmeter)" stroke="${OL}" stroke-width="3"/><g stroke="${OL}" stroke-width="2">${Array.from({ length: 7 }, (_, i) => { const a = Math.PI + i * Math.PI / 6; return `<path d="M${(60 + Math.cos(a) * 34).toFixed(1)} ${(84 + Math.sin(a) * 34).toFixed(1)} L${(60 + Math.cos(a) * 40).toFixed(1)} ${(84 + Math.sin(a) * 40).toFixed(1)}"/>`; }).join('')}</g>
<path d="M60 84 l-16 -22" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>${smug(70, 12)}`),
  'menkyo|踏切エンスト': sprite('crossing', `
<path d="M10 90 h100" stroke="#78350f" stroke-width="6"/><path d="M10 100 h100" stroke="#94a3b8" stroke-width="4"/>
<path d="M30 30 l60 30 M90 30 l-60 30" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M30 30 l60 30 M90 30 l-60 30" stroke="#fde047" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 6"/>
<circle cx="60" cy="45" r="12" fill="#ef4444" stroke="${OL}" stroke-width="2.5"/><circle cx="56" cy="44" r="1.8" fill="${OL}"/><circle cx="64" cy="44" r="1.8" fill="${OL}"/>`),
  'menkyo|右折せっかち': sprite('hastyturn', `
<path d="M60 108 v-30 q0 -20 20 -20 h30" stroke="#64748b" stroke-width="26" fill="none"/>
<g transform="rotate(-40 66 74)">${car(36, 84, '#f97316', 58)}</g><g stroke="#fde047" stroke-width="3" stroke-linecap="round"><path d="M20 70 l-8 -4 M22 82 h-10"/></g>`),
  'menkyo|金の踏切': gold('goldbell', `
<path d="M60 22 q-24 0 -26 30 l-6 22 h64 l-6 -22 q-2 -30 -26 -30z" fill="url(#eg-goldbell)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="82" r="7" fill="url(#eg-goldbell)" stroke="${OL}" stroke-width="2"/>${smug(52, 8)}`),
  // ----- 第4回 -----
  'menkyo|横断歩道スルー': sprite('zebrax', `
<path d="M0 60 h120 v60 h-120z" fill="#64748b"/><g fill="#fff">${[0, 1, 2, 3, 4].map((i) => `<rect x="${8 + i * 22}" y="64" width="12" height="40"/>`).join('')}</g>
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M2 30 h16 M6 44 h14"/></g>${car(24, 56, '#dc2626', 70)}`),
  'menkyo|つえの人見落とし': sprite('canemiss', `
<path d="M0 90 h120 v30 h-120z" fill="#64748b"/>${car(8, 92, '#334155', 66)}<path d="M98 30 l8 60" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M98 30 l8 60" stroke="#ef4444" stroke-width="5" stroke-dasharray="6 10"/>
<text x="64" y="34" font-size="16" font-weight="900" fill="#fde047">!</text>`),
  'menkyo|金の横断歩道': gold('goldzebra', `
<rect x="14" y="40" width="92" height="50" rx="4" fill="#475569" stroke="${OL}" stroke-width="3"/><g fill="url(#eg-goldzebra)" stroke="${OL}" stroke-width="1.5">${[0, 1, 2, 3].map((i) => `<rect x="${22 + i * 22}" y="46" width="12" height="38"/>`).join('')}</g>${smug(64, 0).replace('M54 64 q6 -4 12 0', '')}`),
  'menkyo|消火栓ふさぎ': sprite('hydrant', `
<path d="M38 108 v-56 q0 -22 22 -22 q22 0 22 22 v56z" fill="#ef4444" stroke="${OL}" stroke-width="3"/><rect x="30" y="44" width="60" height="10" rx="3" fill="#b91c1c" stroke="${OL}" stroke-width="2.5"/><path d="M82 70 h12 v12 h-12 M38 70 h-12 v12 h12" fill="#b91c1c" stroke="${OL}" stroke-width="2.5"/>
${evil(74, 9, '#fde047')}<path d="M52 92 q8 -4 16 0" stroke="${OL}" stroke-width="2" fill="none"/>`),
  'menkyo|酒気帯び': sprite('drunk', `
<path d="M34 34 h48 v58 q0 12 -12 12 h-24 q-12 0 -12 -12z" fill="#fbbf24" stroke="${OL}" stroke-width="3"/><path d="M82 46 q16 0 16 14 q0 14 -16 14" fill="none" stroke="${OL}" stroke-width="5"/>
<path d="M30 34 q4 -14 16 -10 q6 -10 18 -4 q12 -6 18 6 q6 0 4 8z" fill="#fff" stroke="${OL}" stroke-width="2.5"/>
<g fill="none" stroke="${OL}" stroke-width="2.2"><path d="M46 64 m-4 0 a4 4 0 1 1 4 4"/><path d="M70 64 m-4 0 a4 4 0 1 1 4 4"/></g><path d="M50 82 q8 6 16 0" stroke="${OL}" stroke-width="2" fill="none"/><ellipse cx="40" cy="76" rx="5" ry="3" fill="#ef4444" opacity=".6"/><ellipse cx="78" cy="76" rx="5" ry="3" fill="#ef4444" opacity=".6"/>`),
  'menkyo|金のパーキング': gold('goldpark', `<rect x="24" y="24" width="72" height="72" rx="10" fill="url(#eg-goldpark)" stroke="${OL}" stroke-width="3"/><text x="60" y="80" text-anchor="middle" font-size="44" font-weight="900" fill="#78350f">P</text>${smug(40, 18)}`),
  // ----- 第5回 -----
  'menkyo|合流もたつき': sprite('merge', `<path d="M0 70 h120 v50 h-120z" fill="#64748b"/><path d="M0 96 l60 -8 h60" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/>${car(8, 102, '#84cc16', 56)}${car(56, 82, '#3b82f6', 60)}`),
  'menkyo|路肩走り': sprite('shoulder', `<path d="M0 80 h120 v40 h-120z" fill="#64748b"/><path d="M0 88 h120" stroke="#fff" stroke-width="3"/><path d="M0 80 h120" stroke="#78716c" stroke-width="10"/>${car(24, 76, '#ef4444', 70)}`),
  'menkyo|金の料金所': gold('goldtoll', `
<path d="M14 52 h92 l-8 -18 h-76z" fill="url(#eg-goldtoll)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><g stroke="${OL}" stroke-width="2.5" fill="url(#eg-goldtoll)"><rect x="22" y="52" width="16" height="50"/><rect x="82" y="52" width="16" height="50"/></g>
<path d="M38 70 h44" stroke="#dc2626" stroke-width="5" stroke-dasharray="6 6"/>${smug(42, 14)}`),
  'menkyo|凍結スリップ': sprite('ice', `
<path d="M10 96 h100 l-6 12 h-88z" fill="#bae6fd" stroke="${OL}" stroke-width="2.5"/><g transform="rotate(14 60 70)">${car(24, 84, '#f472b6', 72)}</g><g fill="#fff"><path d="M20 40 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z"/><path d="M100 30 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z"/></g>`),
  'menkyo|蒸発現象': sprite('vanish', `
<path d="M0 60 l40 -20 v40z M120 60 l-40 -20 v40z" fill="#fef9c3" opacity=".7"/>
<path d="M44 104 q-4 -40 16 -46 q20 6 16 46z" fill="#e2e8f0" fill-opacity=".45" stroke="${OL}" stroke-width="2.5" stroke-dasharray="4 4"/><circle cx="60" cy="46" r="12" fill="#e2e8f0" fill-opacity=".45" stroke="${OL}" stroke-width="2.5" stroke-dasharray="4 4"/>
<circle cx="56" cy="46" r="1.8" fill="${OL}"/><circle cx="64" cy="46" r="1.8" fill="${OL}"/>`),
  'menkyo|金のヘッドライト': gold('goldlamp', `
<path d="M70 62 l44 -24 v48z" fill="#fef9c3" opacity=".8"/><circle cx="50" cy="62" r="30" fill="url(#eg-goldlamp)" stroke="${OL}" stroke-width="3"/><circle cx="50" cy="62" r="18" fill="#fffbeb" stroke="${OL}" stroke-width="2"/>${smug(60, 6).replace(/60 -/g, '50 -').replace(/60 \+/g, '50 +')}`),
  // ----- 第6回 -----
  'menkyo|クリープ暴走': sprite('creep', `
<path d="M24 96 q-6 -30 18 -40 q14 -20 36 -10 q22 8 20 30 q6 4 4 20z" fill="#16a34a" stroke="${OL}" stroke-width="3"/><g fill="#4ade80" stroke="#14532d" stroke-width="1.5"><path d="M50 52 l10 6 v10 l-10 6 l-10 -6 v-10z"/><path d="M72 56 l8 5 v8 l-8 5 l-8 -5 v-8z"/></g>
<circle cx="100" cy="82" r="11" fill="#86efac" stroke="${OL}" stroke-width="2.5"/><circle cx="102" cy="80" r="2" fill="${OL}"/><text x="18" y="40" font-size="13" font-weight="900" fill="#fde047">D</text>`),
  'menkyo|フェード現象': sprite('fade', `
<circle cx="60" cy="68" r="34" fill="#94a3b8" stroke="${OL}" stroke-width="3"/><g fill="#475569">${Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return `<circle cx="${(60 + Math.cos(a) * 24).toFixed(1)}" cy="${(68 + Math.sin(a) * 24).toFixed(1)}" r="3"/>`; }).join('')}</g>
<path d="M40 30 q-6 -14 4 -22 q2 10 8 10 q0 -10 8 -14 q2 12 10 14 q4 -8 10 -6 q-4 10 -2 18" fill="#f97316" stroke="${OL}" stroke-width="2"/>${evil(66, 9, '#fde047')}`),
  'menkyo|金のエンジン': gold('goldgear', `
<g transform="translate(60 64)"><path d="${Array.from({ length: 10 }, (_, i) => { const a1 = (i / 10) * Math.PI * 2, a2 = ((i + 0.5) / 10) * Math.PI * 2; return `${i ? 'L' : 'M'}${(Math.cos(a1) * 38).toFixed(1)} ${(Math.sin(a1) * 38).toFixed(1)} L${(Math.cos(a2) * 30).toFixed(1)} ${(Math.sin(a2) * 30).toFixed(1)}`; }).join(' ')}z" fill="url(#eg-goldgear)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle r="16" fill="#fef9c3" stroke="${OL}" stroke-width="2.5"/></g>${smug(62, 5)}`),
  'menkyo|ひき逃げ未遂': sprite('hitrun', `<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M90 60 h20 M96 74 h18"/></g>${road}<g transform="translate(120 0) scale(-1 1)">${car(30, 90, '#1f2937', 70)}</g><text x="20" y="44" font-size="16" font-weight="900" fill="#ef4444">!</text>`),
  'menkyo|自賠責なし': sprite('noinsur', `
<path d="M32 22 h44 l12 12 v74 h-56z" fill="#fff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><path d="M32 22 h56 v86 h-56z" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 4"/>
${evil(58, 10, '#a78bfa')}<path d="M50 74 q10 -5 20 0" stroke="${OL}" stroke-width="2" fill="none"/><g stroke="#cbd5e1" stroke-width="2.5"><path d="M40 90 h40 M40 98 h30"/></g>`),
  'menkyo|金の車検証': gold('goldcert', `
<path d="M28 26 h64 v76 h-64z" fill="url(#eg-goldcert)" stroke="${OL}" stroke-width="3"/><circle cx="76" cy="86" r="10" fill="#dc2626" stroke="${OL}" stroke-width="2"/><g stroke="#92400e" stroke-width="2.5"><path d="M36 64 h48 M36 72 h36"/></g>${smug(44, 10)}`),
  // ----- 第7回 -----
  'menkyo|ボールの影': sprite('ballshadow', `
<circle cx="60" cy="72" r="26" fill="#a3e635" stroke="${OL}" stroke-width="3"/><path d="M38 60 q22 10 44 0 M38 84 q22 -10 44 0" stroke="#fff" stroke-width="3" fill="none"/>
<path d="M90 28 q-10 -2 -14 8" stroke="${OL}" stroke-width="0"/><g fill="#1e293b" opacity=".75"><circle cx="96" cy="30" r="10"/><path d="M86 70 q0 -30 10 -30 q10 0 10 30z"/></g><circle cx="93" cy="29" r="1.6" fill="#fde047"/><circle cx="99" cy="29" r="1.6" fill="#fde047"/>
${evil(72, 9, '#fff')}`),
  'menkyo|バスのかげ': sprite('busshadow', `
<path d="M6 42 h76 q6 0 6 6 v48 h-82z" fill="#22c55e" stroke="${OL}" stroke-width="3"/><g fill="#dcfce7" stroke="${OL}" stroke-width="2"><rect x="14" y="50" width="18" height="16"/><rect x="36" y="50" width="18" height="16"/><rect x="58" y="50" width="18" height="16"/></g><g fill="#1f2937" stroke="${OL}" stroke-width="2"><circle cx="24" cy="96" r="8"/><circle cx="70" cy="96" r="8"/></g>
<g fill="#1e293b"><circle cx="100" cy="62" r="9"/><path d="M90 100 q0 -30 10 -30 q10 0 10 30z"/></g><circle cx="97" cy="61" r="1.6" fill="#fde047"/><circle cx="103" cy="61" r="1.6" fill="#fde047"/>`),
  'menkyo|金の安全運転': gold('goldtrophy', `
<path d="M40 26 h40 v24 q0 22 -20 24 q-20 -2 -20 -24z" fill="url(#eg-goldtrophy)" stroke="${OL}" stroke-width="3"/><path d="M40 32 q-16 0 -14 14 q2 10 16 10 M80 32 q16 0 14 14 q-2 10 -16 10" fill="none" stroke="${OL}" stroke-width="4"/>
<path d="M54 74 h12 v14 h-12z M42 88 h36 v14 h-36z" fill="url(#eg-goldtrophy)" stroke="${OL}" stroke-width="3"/>${smug(44, 7)}`),
  'menkyo|雨夜のまぼろし': sprite('rainnight', `
<g stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round">${[[14, 20], [34, 30], [90, 18], [104, 40], [24, 60], [100, 76]].map(([x, y]) => `<path d="M${x} ${y} l-4 10"/>`).join('')}</g>
<path d="M40 104 q-4 -44 20 -50 q24 6 20 50z" fill="#334155" fill-opacity=".6" stroke="${OL}" stroke-width="2.5"/><circle cx="60" cy="42" r="14" fill="#334155" fill-opacity=".6" stroke="${OL}" stroke-width="2.5"/>
<circle cx="55" cy="42" r="2" fill="#fde047"/><circle cx="65" cy="42" r="2" fill="#fde047"/>`),
  'menkyo|トラックのかげ': sprite('truckshadow', `${road}
<rect x="4" y="38" width="60" height="56" rx="4" fill="#e2e8f0" stroke="${OL}" stroke-width="3"/><path d="M64 54 h20 l14 18 v22 h-34z" fill="#3b82f6" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<g fill="#1f2937" stroke="${OL}" stroke-width="2"><circle cx="20" cy="96" r="8"/><circle cx="84" cy="96" r="8"/></g><g transform="translate(108 70)"><circle r="8" fill="#1e293b"/><circle cx="-3" r="1.4" fill="#fde047"/><circle cx="3" r="1.4" fill="#fde047"/></g>`),
  'menkyo|金の免許証': gold('goldlicense', `
<rect x="16" y="34" width="88" height="56" rx="6" fill="url(#eg-goldlicense)" stroke="${OL}" stroke-width="3"/><rect x="24" y="44" width="26" height="34" rx="3" fill="#fef9c3" stroke="${OL}" stroke-width="2"/>
<g stroke="#92400e" stroke-width="2.5"><path d="M58 50 h38 M58 60 h30 M58 70 h34"/></g><path d="M30 58 q3 -3 6 0 M40 58 q3 -3 6 0 M32 68 q5 4 10 0" stroke="${OL}" stroke-width="1.8" fill="none"/>`),
});
