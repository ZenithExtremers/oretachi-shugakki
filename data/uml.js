// UML 図を SVG 文字列で描く小さな道具（ソフトウェア設計の問題用）
// 座標は手で指定する。文字幅は「全角=1文字分、半角=0.6文字分」で見積もる。

const FS = 14; // 文字の大きさ
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const tw = (s, fs = FS) => [...String(s)].reduce((a, c) => a + (c.charCodeAt(0) < 0x2000 ? 0.6 : 1), 0) * fs;
const n1 = (v) => (typeof v === 'number' ? v.toFixed(1) : v);

const DEFS = `<defs>
<marker id="u-tri" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="14" markerHeight="14" orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11 Z" fill="#fff" stroke="#111" stroke-width="1.2"/></marker>
<marker id="u-open" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11" fill="none" stroke="#111" stroke-width="1.4"/></marker>
<marker id="u-fill" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11 Z" fill="#111"/></marker>
<marker id="u-dia" viewBox="0 0 20 12" refX="19" refY="6" markerWidth="20" markerHeight="12" orient="auto-start-reverse"><path d="M1,6 L10,1 L19,6 L10,11 Z" fill="#fff" stroke="#111" stroke-width="1.2"/></marker>
<marker id="u-diaf" viewBox="0 0 20 12" refX="19" refY="6" markerWidth="20" markerHeight="12" orient="auto-start-reverse"><path d="M1,6 L10,1 L19,6 L10,11 Z" fill="#111"/></marker>
</defs>`;

const wrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" font-family="'Hiragino Sans','Noto Sans JP','Yu Gothic',sans-serif" font-size="${FS}" fill="#111">${DEFS}${body}</svg>`;
const text = (x, y, s, o = {}) =>
  `<text x="${n1(x)}" y="${n1(y)}" text-anchor="${o.anchor || 'middle'}"${o.weight ? ` font-weight="${o.weight}"` : ''}${o.size ? ` font-size="${o.size}"` : ''}${o.under ? ' text-decoration="underline"' : ''}>${esc(s)}</text>`;

// 箱の中心から点 (px,py) へ向かう直線と箱の縁の交点
function clipRect(b, px, py) {
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2, dx = px - cx, dy = py - cy;
  if (!dx && !dy) return [cx, cy];
  const s = Math.min(Math.abs(b.w / 2 / (dx || 1e-9)), Math.abs(b.h / 2 / (dy || 1e-9)));
  return [cx + dx * s, cy + dy * s];
}
function clipEllipse(b, px, py) {
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2, dx = px - cx, dy = py - cy, a = b.w / 2, c = b.h / 2;
  const s = 1 / Math.sqrt((dx * dx) / (a * a) + (dy * dy) / (c * c));
  return [cx + dx * s, cy + dy * s];
}
const center = (b) => [b.x + b.w / 2, b.y + b.h / 2];
function ends(A, B) {
  const [ax, ay] = center(A), [bx, by] = center(B);
  const p = (A.shape === 'ellipse' ? clipEllipse : clipRect)(A, bx, by);
  const q = (B.shape === 'ellipse' ? clipEllipse : clipRect)(B, ax, ay);
  return [...p, ...q];
}
function line(x1, y1, x2, y2, { dash, start, end } = {}) {
  return `<line x1="${n1(x1)}" y1="${n1(y1)}" x2="${n1(x2)}" y2="${n1(y2)}" stroke="#111" stroke-width="1.3"${dash ? ' stroke-dasharray="6 4"' : ''}${start ? ` marker-start="url(#${start})"` : ''}${end ? ` marker-end="url(#${end})"` : ''}/>`;
}
// 線の端の近くに文字（多重度など）。side=1/-1 で線のどちら側か
function nearEnd(x1, y1, x2, y2, s, side = 1, along = 16) {
  const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const nx = -uy * side, ny = ux * side;
  return text(x1 + ux * along + nx * 14, y1 + uy * along + ny * 14 + 5, s, { size: 13 });
}
const mid = (x1, y1, x2, y2) => [(x1 + x2) / 2, (y1 + y2) / 2];

/* ---------- ユースケース図 ---------- */
// usecase({ w, h, boundary:{x,y,w,h,name}, actors:[{id,name,x,y}], cases:[{id,name,x,y,w?}], links:[{from,to,type}] })
// type: 'assoc'（関連）| 'include' | 'extend' | 'gen'（汎化：from が子、to が親）
export function usecase(d) {
  const box = {};
  let body = '';
  if (d.boundary) {
    const b = d.boundary;
    body += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="#fff" stroke="#111" stroke-width="1.3"/>` + text(b.x + 10, b.y + 22, b.name, { anchor: 'start', weight: 700 });
  }
  for (const a of d.actors || []) box[a.id] = { x: a.x - 18, y: a.y - 4, w: 36, h: 98, shape: 'rect' };
  for (const c of d.cases || []) { const w = c.w || tw(c.name) + 36; box[c.id] = { x: c.x - w / 2, y: c.y - 22, w, h: 44, shape: 'ellipse' }; }
  let links = '';
  for (const l of d.links || []) {
    const [x1, y1, x2, y2] = ends(box[l.from], box[l.to]);
    if (l.type === 'gen') links += line(x1, y1, x2, y2, { end: 'u-tri' });
    else if (l.type === 'include' || l.type === 'extend') {
      links += line(x1, y1, x2, y2, { dash: true, end: 'u-open' });
      const [mx, my] = mid(x1, y1, x2, y2);
      links += text(mx + 8, my + 4, `«${l.type}»`, { size: 12, anchor: 'start' });
    } else links += line(x1, y1, x2, y2);
  }
  for (const a of d.actors || []) {
    const { x, y } = a;
    body += `<g stroke="#111" stroke-width="1.6" fill="#fff"><circle cx="${x}" cy="${y + 10}" r="10"/><line x1="${x}" y1="${y + 20}" x2="${x}" y2="${y + 48}"/><line x1="${x - 16}" y1="${y + 30}" x2="${x + 16}" y2="${y + 30}"/><line x1="${x}" y1="${y + 48}" x2="${x - 13}" y2="${y + 68}"/><line x1="${x}" y1="${y + 48}" x2="${x + 13}" y2="${y + 68}"/></g>`;
    body += text(x, y + 88, a.name);
  }
  for (const c of d.cases || []) {
    const b = box[c.id];
    body += `<ellipse cx="${b.x + b.w / 2}" cy="${b.y + b.h / 2}" rx="${b.w / 2}" ry="${b.h / 2}" fill="#fff" stroke="#111" stroke-width="1.3"/>` + text(b.x + b.w / 2, b.y + b.h / 2 + 5, c.name);
  }
  return wrap(d.w, d.h, body + links);
}

/* ---------- クラス図・オブジェクト図 ---------- */
// classes:[{id,name,x,y,w?,attrs:[],ops:[],stereo?,object?:true}]
// links:[{from,to,type,fromMult,toMult,label,multSide}]
// type: 'assoc' | 'gen'（from=子 → to=親）| 'real'（実現）| 'agg' / 'comp'（from=全体）| 'dep'（from=使う側）| 'nav'（誘導可能性）
const LH = 20;
function classBox(c) {
  const lines = [...(c.attrs || []), ...(c.ops || [])];
  const w = c.w || Math.max(tw(c.name) + 30, ...lines.map((s) => tw(s, 13) + 20), 90);
  const head = c.stereo ? 44 : 30;
  const ha = c.object ? (c.attrs?.length ? c.attrs.length * LH + 10 : 0) : Math.max(1, c.attrs?.length || 0) * LH + 8;
  const ho = c.object ? 0 : Math.max(1, c.ops?.length || 0) * LH + 8;
  return { x: c.x, y: c.y, w, h: head + ha + ho, head, ha, shape: 'rect' };
}
export function classDiagram(d) {
  const box = {};
  for (const c of d.classes) box[c.id] = classBox(c);
  let links = '';
  for (const l of d.links || []) {
    const [x1, y1, x2, y2] = ends(box[l.from], box[l.to]);
    const t = l.type || 'assoc';
    const o = t === 'gen' ? { end: 'u-tri' } : t === 'real' ? { end: 'u-tri', dash: true } : t === 'agg' ? { start: 'u-dia' } : t === 'comp' ? { start: 'u-diaf' } : t === 'dep' ? { end: 'u-open', dash: true } : t === 'nav' ? { end: 'u-open' } : {};
    links += line(x1, y1, x2, y2, o);
    if (l.fromMult) links += nearEnd(x1, y1, x2, y2, l.fromMult, l.multSide || 1, t === 'agg' || t === 'comp' ? 30 : 16);
    if (l.toMult) links += nearEnd(x2, y2, x1, y1, l.toMult, -(l.multSide || 1));
    if (l.label) {
      const [mx, my] = mid(x1, y1, x2, y2), lw = tw(l.label, 13);
      links += `<rect x="${n1(mx - lw / 2 - 3)}" y="${n1(my - 15)}" width="${n1(lw + 6)}" height="18" fill="#fff"/>` + text(mx, my - 1, l.label, { size: 13 });
    }
  }
  let body = '';
  for (const c of d.classes) {
    const b = box[c.id];
    body += `<rect x="${b.x}" y="${b.y}" width="${n1(b.w)}" height="${b.h}" fill="#fff" stroke="#111" stroke-width="1.3"/>`;
    if (c.stereo) body += text(b.x + b.w / 2, b.y + 18, `«${c.stereo}»`, { size: 12 });
    body += text(b.x + b.w / 2, b.y + b.head - 10, c.name, { weight: c.object ? 400 : 700, under: !!c.object });
    let y = b.y + b.head;
    if (!c.object || c.attrs?.length) body += line(b.x, y, b.x + b.w, y);
    (c.attrs || []).forEach((a, i) => { body += text(b.x + 8, y + 18 + i * LH, a, { anchor: 'start', size: 13 }); });
    if (!c.object) {
      y += b.ha;
      body += line(b.x, y, b.x + b.w, y);
      (c.ops || []).forEach((a, i) => { body += text(b.x + 8, y + 18 + i * LH, a, { anchor: 'start', size: 13 }); });
    }
  }
  return wrap(d.w, d.h, links + body);
}

/* ---------- シーケンス図 ---------- */
// lifelines:[{id,name,x}], msgs:[{from,to,text,kind:'sync'|'async'|'reply'|'create'}], frames:[{op,cond,from,to,x1,x2}]（from/to はメッセージ番号 0始まり）
export function sequence(d) {
  const top = 20, headH = 34, gap = d.gap || 50, y0 = top + headH + 36;
  const ll = {};
  for (const l of d.lifelines) ll[l.id] = { ...l, w: Math.max(tw(l.name) + 24, 80), headY: top };
  const ys = d.msgs.map((m, i) => y0 + i * gap);
  d.msgs.forEach((m, i) => { if (m.kind === 'create') ll[m.to].headY = ys[i] - headH / 2; });
  const H = y0 + d.msgs.length * gap + 10;
  let body = '';
  for (const f of d.frames || []) {
    const yA = ys[f.from] - 40, yB = ys[f.to] + 26;
    body += `<rect x="${f.x1}" y="${yA}" width="${f.x2 - f.x1}" height="${yB - yA}" fill="none" stroke="#555" stroke-width="1.2"/>`;
    const lw = tw(f.op, 13) + 14;
    body += `<path d="M${f.x1},${yA} h${n1(lw)} v12 l-6,6 h${n1(-lw + 6)} Z" fill="#fff" stroke="#555"/>` + text(f.x1 + 6, yA + 14, f.op, { anchor: 'start', size: 13, weight: 700 });
    if (f.cond) body += text(f.x1 + lw + 8, yA + 15, `[${f.cond}]`, { anchor: 'start', size: 13 });
  }
  for (const l of Object.values(ll)) {
    body += `<line x1="${l.x}" y1="${l.headY + headH}" x2="${l.x}" y2="${H - 6}" stroke="#777" stroke-dasharray="5 4"/>`;
    body += `<rect x="${n1(l.x - l.w / 2)}" y="${l.headY}" width="${n1(l.w)}" height="${headH}" fill="#fff" stroke="#111" stroke-width="1.3"/>` + text(l.x, l.headY + 22, l.name);
  }
  d.msgs.forEach((m, i) => {
    const a = ll[m.from], b = ll[m.to], y = ys[i];
    let x2 = b.x;
    if (m.kind === 'create') x2 = b.x + (b.x > a.x ? -b.w / 2 : b.w / 2);
    const kind = m.kind || 'sync';
    body += line(a.x, y, x2, y, { dash: kind === 'reply' || kind === 'create', end: kind === 'sync' ? 'u-fill' : 'u-open' });
    body += text((a.x + x2) / 2, y - 6, kind === 'create' ? '«create»' : m.text, { size: 13 });
  });
  return wrap(d.w, H, body);
}

/* ---------- コミュニケーション図 ---------- */
// nodes:[{id,name,x,y}] (x,y は中心), links:[{from,to,side,msgs:[{text,back?,async?}]}]
export function communication(d) {
  const box = {};
  for (const n of d.nodes) { const w = Math.max(tw(n.name) + 24, 80); box[n.id] = { x: n.x - w / 2, y: n.y - 17, w, h: 34, shape: 'rect' }; }
  let body = '';
  for (const l of d.links) {
    const [x1, y1, x2, y2] = ends(box[l.from], box[l.to]);
    body += line(x1, y1, x2, y2);
    const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const [mx, my] = mid(x1, y1, x2, y2);
    const side = l.side || 1;
    (l.msgs || []).forEach((m, i) => {
      const sx = m.back ? -ux : ux, sy = m.back ? -uy : uy; // メッセージの向き
      const mk = m.async ? 'u-open' : 'u-fill';
      if (Math.abs(ux) >= Math.abs(uy)) { // 横向きの線：文字の左に小さな矢印
        const ty = my + side * (20 + i * 22) + (side > 0 ? 6 : 0);
        const w = tw(m.text, 13), ax = mx - w / 2 - 22, ay = ty - 5;
        body += line(ax - sx * 12, ay - sy * 12, ax + sx * 12, ay + sy * 12, { end: mk });
        body += text(mx, ty, m.text, { size: 13 });
      } else { // 縦向きの線：線の横に小さな矢印と文字
        const ty = my + i * 24;
        body += line(mx + side * 14 - sx * 10, ty - 5 - sy * 10, mx + side * 14 + sx * 10, ty - 5 + sy * 10, { end: mk });
        body += text(mx + side * 28, ty, m.text, { size: 13, anchor: side > 0 ? 'start' : 'end' });
      }
    });
  }
  for (const n of d.nodes) {
    const b = box[n.id];
    body += `<rect x="${n1(b.x)}" y="${n1(b.y)}" width="${n1(b.w)}" height="${b.h}" fill="#fff" stroke="#111" stroke-width="1.3"/>` + text(n.x, n.y + 5, n.name);
  }
  return wrap(d.w, d.h, body);
}

/* ---------- ステートマシン図 ---------- */
// stateMachine({ w, h, states:[{id,name,x,y,w,acts?:['entry / …']}], starts:[{x,y}], finals:[{x,y}],
//   trans:[{ pts:[[x,y],…], label?, lx?, ly?, anchor? }] })   座標は手で指定（x,y は箱の左上）
export function stateMachine(d) {
  let body = '';
  for (const t of d.trans) {
    const p = t.pts;
    for (let i = 0; i < p.length - 1; i++) body += line(p[i][0], p[i][1], p[i + 1][0], p[i + 1][1], i === p.length - 2 ? { end: 'u-open' } : {});
    if (t.label) body += text(t.lx, t.ly, t.label, { size: 13, anchor: t.anchor });
  }
  for (const s of d.starts || []) body += `<circle cx="${s.x}" cy="${s.y}" r="10" fill="#111"/>`;
  for (const f of d.finals || []) body += `<circle cx="${f.x}" cy="${f.y}" r="12" fill="#fff" stroke="#111" stroke-width="1.5"/><circle cx="${f.x}" cy="${f.y}" r="7" fill="#111"/>`;
  for (const s of d.states) {
    const acts = s.acts || [], h = 34 + acts.length * 22;
    body += `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${h}" rx="9" fill="#fff" stroke="#111" stroke-width="1.3"/>`;
    body += text(s.x + s.w / 2, s.y + 22, s.name, { weight: 700 });
    if (acts.length) body += line(s.x, s.y + 32, s.x + s.w, s.y + 32);
    acts.forEach((a, i) => { body += text(s.x + 8, s.y + 50 + i * 22, a, { size: 12, anchor: 'start' }); });
  }
  return wrap(d.w, d.h, body);
}
