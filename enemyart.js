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
