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
  // ヌルポ：中身が空っぽ（NULL）のおばけ。おなかに「NULL」の穴
  'ccpp|ヌルポ': sprite('nullpo', `
<path d="M28 96 q-6 -60 32 -66 q38 6 32 66 l-8 -8 l-8 10 l-8 -10 l-8 10 l-8 -10 l-8 10 l-8 -10z" fill="#e0e7ff" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M36 52 q6 -14 18 -16" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M22 66 q-10 2 -12 12 q8 0 14 -4 M98 66 q10 2 12 12 q-8 0 -14 -4" fill="#e0e7ff" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
${evil(52, 11, '#a5b4fc')}
<ellipse cx="60" cy="76" rx="14" ry="9" fill="#1e1b4b" stroke="${OL}" stroke-width="2"/><text x="60" y="79.5" text-anchor="middle" font-size="8" font-weight="900" fill="#a5b4fc" font-family="monospace">NULL</text>`),

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
