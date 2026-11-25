// Small SVG diagram helpers for the ALGO tutorials. They output markup that uses the guide's own diagram palette
// (.dg-n node, .dg-h highlighted, .dg-g green, .dg-w yellow, .dg-r red, .dg-e edge, .dg-t label ...), so every
// figure follows the light/dark theme. Sizes are kept small (viewBox <= ~520 wide) so they stay readable on a phone.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let uid = 0;
const R = 17; // node radius

/** Wrap an svg body into a captioned figure. */
export function fig(w, h, body, caption, label) {
  const id = 'f' + ++uid;
  const defs = `<defs><marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="dg-ah"/></marker>`
    + `<marker id="${id}h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="dg-aha"/></marker>`
    + `<marker id="${id}r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="dg-ahr"/></marker></defs>`;
  body = body.replace(/url\(#A\)/g, `url(#${id}a)`).replace(/url\(#H\)/g, `url(#${id}h)`).replace(/url\(#X\)/g, `url(#${id}r)`);
  return `<figure class="diagram"><svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${Math.round(w * 1.5)}px" role="img" aria-label="${esc(label || caption || 'diagram')}">${defs}${body}</svg>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
}

const node = (x, y, label, cls = 'dg-n', r = R) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/><text class="dg-t" x="${x}" y="${y}">${esc(label)}</text>`;
const line = (x1, y1, x2, y2, cls = 'dg-e') => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
const txt = (x, y, s, cls = 'dg-s') => `<text class="${cls}" x="${x}" y="${y}">${esc(s)}</text>`;

/** Binary tree from nested [value, left, right] (null for empty). opts.hl = values to highlight, opts.cls = {value: 'dg-g' ...}. */
export function bst(root, opts = {}) {
  const dx = opts.dx ?? 38, dy = opts.dy ?? 58, pad = 26;
  const pos = []; let k = 0;
  const walk = (t, d) => { if (!t) return null; const l = walk(t[1], d + 1); const me = { v: t[0], x: k++, d }; const r = walk(t[2], d + 1); me.l = l; me.r = r; pos.push(me); return me; };
  const top = walk(root, 0);
  const maxD = Math.max(...pos.map((p) => p.d));
  const W = Math.max(k * dx + pad * 2 - dx / 2, 120), H = maxD * dy + pad * 2 + (opts.foot ? 18 : 0);
  const X = (p) => pad + p.x * dx, Y = (p) => pad + p.d * dy;
  let e = '', n = '';
  for (const p of pos) { if (p.l) e += line(X(p), Y(p), X(p.l), Y(p.l)); if (p.r) e += line(X(p), Y(p), X(p.r), Y(p.r)); }
  for (const p of pos) n += node(X(p), Y(p), p.v, opts.cls?.[p.v] || (opts.hl?.includes(p.v) ? 'dg-h' : 'dg-n'));
  return { w: W, h: H, body: e + n + (opts.foot ? txt(W / 2, H - 4, opts.foot, 'dg-hd') : ''), top };
}

/** Complete binary tree drawn from an array (heap layout, index 0 = root). */
export function heapTree(arr, opts = {}) {
  const n = arr.length, levels = Math.floor(Math.log2(n)) + 1, leaf = 2 ** (levels - 1);
  const dx = opts.dx ?? 40, dy = opts.dy ?? 56, pad = 26;
  const W = leaf * dx + pad * 2 - dx / 2 + 8, H = (levels - 1) * dy + pad * 2 + (opts.idx ? 16 : 0);
  const P = (i) => { const d = Math.floor(Math.log2(i + 1)), j = i + 1 - 2 ** d, span = leaf / 2 ** d; return [pad + (j * span + span / 2) * dx - dx / 2 + 4, pad + d * dy]; };
  let e = '', s = '';
  for (let i = 1; i < n; i++) { const [x1, y1] = P((i - 1) >> 1), [x2, y2] = P(i); e += line(x1, y1, x2, y2); }
  for (let i = 0; i < n; i++) { const [x, y] = P(i); s += node(x, y, arr[i], opts.cls?.[i] || (opts.hl?.includes(i) ? 'dg-h' : 'dg-n')); if (opts.idx) s += txt(x + 15, y + 22, i, 'dg-s'); }
  return { w: W, h: H, body: e + s };
}

/** Row of array cells. opts.hl = indices to highlight, opts.cls = {i: 'dg-g'}, opts.idx = show indices, opts.title. */
export function arr(values, opts = {}) {
  const cw = opts.cw ?? 34, ch = 32, pad = 10, top = opts.title ? 20 : 4;
  const W = values.length * cw + pad * 2, H = top + ch + (opts.idx === false ? 6 : 20);
  let s = opts.title ? txt(W / 2, 14, opts.title, 'dg-hd') : '';
  values.forEach((v, i) => {
    const cls = opts.cls?.[i] || (opts.hl?.includes(i) ? 'dg-h' : 'dg-n');
    s += `<rect class="${cls}" x="${pad + i * cw}" y="${top}" width="${cw - 2}" height="${ch}" rx="5"/><text class="dg-t" x="${pad + i * cw + (cw - 2) / 2}" y="${top + ch / 2}">${esc(v ?? '')}</text>`;
    if (opts.idx !== false) s += txt(pad + i * cw + (cw - 2) / 2, top + ch + 14, i, 'dg-s');
  });
  return { w: W, h: H, body: s };
}

/** Hash table drawn as rows with chains: rows = [{i, chain:[...]}] (chain empty = empty row). */
export function hashRows(rows, opts = {}) {
  const rh = 28, pad = 10, cw = 36;
  const maxC = Math.max(1, ...rows.map((r) => r.chain.length));
  const W = pad * 2 + 34 + maxC * (cw + 14) + 4, H = rows.length * rh + pad * 2 + (opts.title ? 16 : 0);
  let s = opts.title ? txt(W / 2, 14, opts.title, 'dg-hd') : '';
  const top = pad + (opts.title ? 16 : 0);
  rows.forEach((r, k) => {
    const y = top + k * rh;
    s += `<rect class="${r.chain.length ? 'dg-h' : 'dg-n'}" x="${pad}" y="${y}" width="32" height="${rh - 4}" rx="4"/><text class="dg-t" x="${pad + 16}" y="${y + (rh - 4) / 2}">${r.i}</text>`;
    r.chain.forEach((c, j) => {
      const x = pad + 44 + j * (cw + 14);
      if (j === 0) s += line(pad + 32, y + (rh - 4) / 2, x, y + (rh - 4) / 2, 'dg-ar');
      else s += `<line class="dg-ar" x1="${x - 14}" y1="${y + (rh - 4) / 2}" x2="${x}" y2="${y + (rh - 4) / 2}" marker-end="url(#A)"/>`;
      s += `<rect class="${(opts.cls && opts.cls[c]) || 'dg-g'}" x="${x}" y="${y}" width="${cw}" height="${rh - 4}" rx="4"/><text class="dg-t" x="${x + cw / 2}" y="${y + (rh - 4) / 2}">${esc(c)}</text>`;
    });
  });
  return { w: W, h: H, body: s };
}

/**
 * Graph. nodes: {A:[x,y]} in drawing units (x right, y down); edges: [from, to, label?, opts?] with opts {cls, curve}.
 * opts.directed draws arrowheads; opts.hlNodes / opts.cls = {A:'dg-g'}; opts.hlEdges = ['A-B'] (accent colour).
 */
export function graph(nodes, edges, opts = {}) {
  const sc = opts.scale ?? 60, pad = 30;
  const xs = Object.values(nodes).map((p) => p[0]), ys = Object.values(nodes).map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  const W = (Math.max(...xs) - x0) * sc + pad * 2, H = (Math.max(...ys) - y0) * sc + pad * 2 + (opts.foot ? 16 : 0);
  const P = (k) => [pad + (nodes[k][0] - x0) * sc, pad + (nodes[k][1] - y0) * sc];
  let e = '', n = '', lab = '';
  const pairKey = (a, b) => (opts.directed ? a + '-' + b : [a, b].sort().join('-'));
  const hl = new Set((opts.hlEdges || []).map((x) => { const [a, b] = x.split('-'); return pairKey(a, b); }));
  for (const [a, b, label, o = {}] of edges) {
    const [x1, y1] = P(a), [x2, y2] = P(b);
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const on = hl.has(pairKey(a, b)) || o.hl;
    const cls = o.cls || (on ? 'dg-ara' : 'dg-ar');
    const mk = on ? 'url(#H)' : o.red ? 'url(#X)' : 'url(#A)';
    const sx = x1 + ux * R, sy = y1 + uy * R, ex = x2 - ux * (R + (opts.directed ? 3 : 0)), ey = y2 - uy * (R + (opts.directed ? 3 : 0));
    if (o.curve) {
      const mx = (sx + ex) / 2 - uy * o.curve, my = (sy + ey) / 2 + ux * o.curve;
      e += `<path class="${cls}" d="M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}"${opts.directed ? ` marker-end="${mk}"` : ''}/>`;
      if (label !== undefined && label !== null && label !== '') lab += txt(((sx + ex) / 2 + mx) / 2 - uy * 6, ((sy + ey) / 2 + my) / 2 + ux * 6, label, 'dg-s');
    } else {
      e += `<line class="${cls}" x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}"${opts.directed ? ` marker-end="${mk}"` : ''}/>`;
      if (label !== undefined && label !== null && label !== '') lab += `<text class="dg-s" x="${((x1 + x2) / 2 - uy * 10).toFixed(1)}" y="${((y1 + y2) / 2 + ux * 10 + 3).toFixed(1)}">${esc(label)}</text>`;
    }
  }
  for (const k of Object.keys(nodes)) { const [x, y] = P(k); n += node(x, y, k, opts.cls?.[k] || (opts.hlNodes?.includes(k) ? 'dg-h' : 'dg-n'), opts.r ?? R); if (opts.sub?.[k]) n += txt(x, y + R + 11, opts.sub[k], 'dg-s'); }
  return { w: W, h: H, body: e + n + lab + (opts.foot ? txt(W / 2, H - 4, opts.foot, 'dg-hd') : '') };
}

/** Points joined by a closed tour (for TSP / 2-opt). order = array of point labels. */
export function tour(points, order, opts = {}) {
  const sc = opts.scale ?? 40, pad = 28;
  const xs = Object.values(points).map((p) => p[0]), ys = Object.values(points).map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  const W = (Math.max(...xs) - x0) * sc + pad * 2, H = (Math.max(...ys) - y0) * sc + pad * 2 + (opts.title ? 18 : 0);
  const P = (k) => [pad + (points[k][0] - x0) * sc, pad + (opts.title ? 18 : 0) + (points[k][1] - y0) * sc];
  let e = '', n = '';
  order.forEach((a, i) => { const b = order[(i + 1) % order.length]; const [x1, y1] = P(a), [x2, y2] = P(b); e += line(x1, y1, x2, y2, opts.cls || 'dg-ara'); });
  Object.keys(points).forEach((k) => { const [x, y] = P(k); n += node(x, y, k, 'dg-n', 14); });
  return { w: W, h: H, body: (opts.title ? txt(W / 2, 13, opts.title, 'dg-hd') : '') + e + n };
}

/** Place several diagram bodies side by side (or stacked when `stack`) into one figure. */
export function row(parts, caption, label, o = {}) {
  const gap = 18, stack = o.stack;
  let w = 0, h = 0, body = '';
  if (stack) { w = Math.max(...parts.map((p) => p.w)); parts.forEach((p) => { body += `<g transform="translate(${(w - p.w) / 2} ${h})">${p.body}</g>`; h += p.h + gap; }); h -= gap; }
  else { h = Math.max(...parts.map((p) => p.h)); parts.forEach((p) => { body += `<g transform="translate(${w} ${(h - p.h) / 2})">${p.body}</g>`; w += p.w + gap; }); w -= gap; }
  return fig(w, h, body, caption, label);
}

/** One diagram part -> figure. */
export const one = (d, caption, label) => fig(d.w, d.h, d.body, caption, label);

/** Vertical stack of boxes (top of the stack at the top), plus optional label. */
export function stack(items, opts = {}) {
  const bw = 54, bh = 26, pad = 12;
  const W = bw + pad * 2 + (opts.label ? 52 : 0), H = items.length * bh + pad * 2 + (opts.title ? 16 : 0);
  let s = opts.title ? txt(bw / 2 + pad, 12, opts.title, 'dg-hd') : '';
  const top = pad + (opts.title ? 14 : 0);
  items.forEach((v, i) => { const y = top + i * bh; s += `<rect class="${i === 0 ? 'dg-h' : 'dg-n'}" x="${pad}" y="${y}" width="${bw}" height="${bh - 3}" rx="4"/><text class="dg-t" x="${pad + bw / 2}" y="${y + (bh - 3) / 2}">${esc(v)}</text>`; });
  if (opts.label && items.length) s += txt(pad + bw + 6, top + 14, opts.label, 'dg-lt');
  return { w: W, h: H, body: s };
}

export { node, line, txt };

/** Build a BST (nested [value, left, right]) by inserting `list` in order. */
export function bstFrom(list, less = (a, b) => a < b) {
  let root = null;
  const ins = (t, v) => { if (!t) return [v, null, null]; if (less(v, t[0])) t[1] = ins(t[1], v); else t[2] = ins(t[2], v); return t; };
  for (const v of list) root = ins(root, v);
  return root;
}
/** Relabel every node of a nested tree. */
export const relabel = (t, f) => (t ? [f(t[0]), relabel(t[1], f), relabel(t[2], f)] : null);
/** Values on the search path to `v`. */
export function pathTo(t, v, less = (a, b) => a < b) { const p = []; while (t) { p.push(t[0]); if (t[0] === v) break; t = less(v, t[0]) ? t[1] : t[2]; } return p; }
export const heightOf = (t) => (t ? 1 + Math.max(heightOf(t[1]), heightOf(t[2])) : 0);

/** Runs of an array in merge sort: `levels` = [{title, runs:[[..],[..]]}]; each run is drawn as a joined block. */
export function runRows(levels, opts = {}) {
  const cw = opts.cw ?? 26, ch = 26, gap = 7, pad = 8, lab = opts.lab ?? 0;
  const widths = levels.map((L) => L.runs.reduce((s, r) => s + r.length * cw + gap, 0) - gap);
  const W = Math.max(...widths) + pad * 2 + lab, rowH = ch + 20;
  const H = levels.length * rowH + pad;
  let s = '';
  levels.forEach((L, li) => {
    const y = pad + li * rowH + 12; let x = pad + lab;
    if (lab) s += txt(pad, y + ch / 2 + 4, L.title, 'dg-lt');
    else s += txt(pad, y - 4, L.title, 'dg-lt');
    L.runs.forEach((run, ri) => {
      const cls = L.cls?.[ri] || 'dg-n';
      run.forEach((v, i) => { s += `<rect class="${cls}" x="${x + i * cw}" y="${y}" width="${cw - 1}" height="${ch}" rx="3"/><text class="dg-t" x="${x + i * cw + (cw - 1) / 2}" y="${y + ch / 2}">${esc(v)}</text>`; });
      x += run.length * cw + gap;
    });
  });
  return { w: W, h: H + (opts.extra ?? 0), body: s };
}

/** Bottom-up merge sort passes (run width 1, 2, 4, ...) up to, and including, the pass before the final merge. */
export function mergePasses(a) {
  const x = a.slice(), out = []; const n = x.length;
  const chunks = (w) => { const r = []; for (let i = 0; i < n; i += w) r.push(x.slice(i, i + w)); return r; };
  out.push({ title: 'start', runs: chunks(1).map((c) => c) });
  for (let w = 1; w < n; w *= 2) {
    for (let i = 0; i < n; i += 2 * w) { const seg = x.slice(i, i + 2 * w).sort((p, q) => p - q); for (let j = 0; j < seg.length; j++) x[i + j] = seg[j]; }
    out.push({ title: `runs of ${2 * w}`, runs: chunks(2 * w), w: 2 * w });
  }
  return out;
}

/** Combine parts into one part (side by side, or stacked when `vertical`). */
export function join(parts, vertical = false, gap = 16) {
  let w = 0, h = 0, body = '';
  if (vertical) { w = Math.max(...parts.map((p) => p.w)); parts.forEach((p) => { body += `<g transform="translate(${(w - p.w) / 2} ${h})">${p.body}</g>`; h += p.h + gap; }); h -= gap; }
  else { h = Math.max(...parts.map((p) => p.h)); parts.forEach((p) => { body += `<g transform="translate(${w} ${(h - p.h) / 2})">${p.body}</g>`; w += p.w + gap; }); w -= gap; }
  return { w, h, body };
}
