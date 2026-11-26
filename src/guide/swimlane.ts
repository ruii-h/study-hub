/**
 * Swimlane renderer: draws a Mermaid-style flowchart that uses `subgraph` blocks as lanes (or pools) as a horizontal
 * BPMN-like workflow: one band per participant, time flowing left to right, hand-offs as vertical arrows between bands.
 * Used for diagrams marked `<pre class="mermaid swim">`; the same source still reads as a valid Mermaid flowchart.
 */
type Kind = 'rect' | 'diamond' | 'start' | 'end' | 'merge' | 'and' | 'ghost';
interface N { id: string; label: string; kind: Kind; lane: number; col: number; row: number; x: number; y: number; w: number; h: number; lines: string[]; cx: number; cy: number }
interface E { a: string; b: string; label: string; dotted: boolean; pts: [number, number][]; lines: string[] }

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
let swId = 0;
let ctx: CanvasRenderingContext2D | null = null;
const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
function tw(s: string, size: number, weight = 400) {
  ctx ||= document.createElement('canvas').getContext('2d');
  if (!ctx) return s.length * size * 0.56;
  ctx.font = `${weight} ${size}px ${FONT}`;
  return ctx.measureText(s).width;
}
/** Word-wrap `s` (explicit <br> kept) into lines no wider than `max` px. */
function wrap(s: string, max: number, size: number): string[] {
  const out: string[] = [];
  s.split(/<br\s*\/?>/i).forEach((para) => {
    let cur = '';
    para.trim().split(/\s+/).forEach((w) => {
      const t = cur ? cur + ' ' + w : w;
      if (cur && tw(t, size) > max) { out.push(cur); cur = w; } else cur = t;
    });
    if (cur) out.push(cur);
  });
  return out;
}

export function swimlaneSvg(src: string): string | null {
  const lanes: string[] = [];
  const nodes = new Map<string, N>();
  const edges: E[] = [];
  let cur = -1;
  const order: string[] = [];
  const text = src.replace(/%%.*$/gm, '');

  const readNode = (s: string, i: number): [string, number] | null => {
    const m = /^\s*([A-Za-z_]\w*)/.exec(s.slice(i)); if (!m) return null;
    const id = m[1]; let p = i + m[0].length; let label: string | null = null; let kind: Kind = 'rect';
    const open = [['(["', '"])', 'term'], ['(("', '"))', 'circle'], ['["', '"]', 'rect'], ['{"', '"}', 'diamond']] as const;
    for (const [o, c, k] of open) {
      if (s.startsWith(o, p)) {
        const e = s.indexOf(c, p + o.length); if (e < 0) return null;
        label = s.slice(p + o.length, e); p = e + c.length;
        kind = k === 'term' ? 'start' : k === 'circle' ? (/and|parallel/i.test(label) ? 'and' : 'merge') : (k as Kind);
        break;
      }
    }
    let n = nodes.get(id);
    if (!n) { n = { id, label: label ?? id, kind, lane: cur, col: 0, row: 0, x: 0, y: 0, w: 0, h: 0, lines: [], cx: 0, cy: 0 }; nodes.set(id, n); order.push(id); }
    else if (label !== null) { n.label = label; n.kind = kind; if (cur >= 0) n.lane = cur; }
    if (n.lane < 0 && cur >= 0) n.lane = cur;
    return [id, p];
  };

  for (const raw of text.split('\n')) {
    const line = raw.trim(); if (!line || /^(flowchart|graph)\b/.test(line)) continue;
    const sg = /^subgraph\s+(\w+)?\s*(?:\[\s*"?([^"\]]*)"?\s*\])?/.exec(line);
    if (sg) { lanes.push((sg[2] || sg[1] || '').trim()); cur = lanes.length - 1; continue; }
    if (line === 'end') { cur = -1; continue; }
    let p = 0; let prev: string | null = null;
    for (let guard = 0; guard < 40; guard++) {
      const r = readNode(line, p); if (!r) break;
      const [id, np] = r; p = np;
      if (prev) { const last = edges[edges.length - 1]; if (last && last.b === '') last.b = id; }
      prev = id;
      const cm = /^\s*(-\.->|-->)\s*(?:\|\s*"?([^|"]*)"?\s*\|)?/.exec(line.slice(p));
      if (!cm) break;
      p += cm[0].length;
      edges.push({ a: id, b: '', label: (cm[2] || '').trim(), dotted: cm[1] === '-.->', pts: [], lines: [] });
    }
  }
  edges.splice(0, edges.length, ...edges.filter((e) => e.b && nodes.has(e.a) && nodes.has(e.b)));
  nodes.forEach((n) => { if (n.kind === 'start' && !edges.some((e) => e.a === n.id)) n.kind = 'end'; });
  if (!lanes.length || nodes.size < 2) return null;
  // nodes never placed in a lane join the last one
  nodes.forEach((n) => { if (n.lane < 0) n.lane = lanes.length - 1; });

  // ---- node sizes ----
  const CW = 164, GAP = 58, LABW = 44, PADX = 26, FS = 13;
  nodes.forEach((n) => {
    const ghost = /^\((from|to)\b/i.test(n.label);
    if (ghost) { n.kind = 'ghost'; n.label = n.label.replace(/^\(|\)$/g, ''); }
    if (n.kind === 'merge' || n.kind === 'and') { n.w = n.h = 38; n.lines = []; }
    else if (n.kind === 'diamond') { n.w = n.h = 40; n.lines = wrap(n.label, 120, 12); } // BPMN: a small X gateway, its question written beside it
    else if (n.kind === 'start' || n.kind === 'end') { n.w = n.h = 28; n.lines = /^(start|end|process end)$/i.test(n.label.trim()) ? [] : wrap(n.label, 120, 12); }
    else {
      const pad = 22;
      const maxW = CW - pad;
      n.lines = wrap(n.label, maxW, FS);
      const widest = Math.max(...n.lines.map((l) => tw(l, FS)));
      n.w = Math.min(CW, Math.ceil(widest + pad + 4));
      n.w = Math.max(n.w, 96);
      n.h = Math.max(46, n.lines.length * 17 + 20);
    }
  });

  // ---- columns: longest path over forward edges, then keep one node per (lane, column) ----
  // loop-backs (edges into a node still being visited) are drawn around the diagram, they must not drive the column layout
  const back = new Set<E>(); const vis = new Map<string, number>();
  const dfs = (id: string) => { vis.set(id, 1); edges.filter((e) => e.a === id && !e.dotted).forEach((e) => { const st = vis.get(e.b) || 0; if (st === 1) back.add(e); else if (!st) dfs(e.b); }); vis.set(id, 2); };
  const hasIn = new Set(edges.filter((e) => !e.dotted).map((e) => e.b));
  order.filter((id) => !hasIn.has(id)).forEach((id) => { if (!vis.get(id)) dfs(id); });
  order.forEach((id) => { if (!vis.get(id)) dfs(id); });
  const hasSolidIn = new Set(edges.filter((e) => !e.dotted).map((e) => e.b));
  const fwd = edges.filter((e) => !back.has(e) && (!e.dotted || !hasSolidIn.has(e.b)));
  const indeg = new Map<string, number>(); nodes.forEach((_, id) => indeg.set(id, 0));
  fwd.forEach((e) => indeg.set(e.b, (indeg.get(e.b) || 0) + 1));
  const queue = order.filter((id) => !indeg.get(id)); const topo: string[] = []; const seen = new Set<string>();
  while (queue.length) {
    const id = queue.shift()!; if (seen.has(id)) continue; seen.add(id); topo.push(id);
    fwd.filter((e) => e.a === id).forEach((e) => { indeg.set(e.b, indeg.get(e.b)! - 1); if (indeg.get(e.b)! <= 0) queue.push(e.b); });
  }
  order.forEach((id) => { if (!seen.has(id)) topo.push(id); });
  const cell = new Set<string>();
  topo.forEach((id) => {
    const n = nodes.get(id)!;
    let c = 0; fwd.filter((e) => e.b === id).forEach((e) => { const a = nodes.get(e.a)!; if (seen.has(e.a)) c = Math.max(c, a.col + 1); });
    let r = 0;
    for (;;) { r = [0, 1, 2].find((k) => !cell.has(n.lane + ':' + c + ':' + k)) ?? -1; if (r >= 0) break; c++; }
    n.col = c; n.row = r; cell.add(n.lane + ':' + c + ':' + r);
  });
  const ncols = Math.max(...[...nodes.values()].map((n) => n.col)) + 1;

  const colW: number[] = [], colX: number[] = [];
  for (let c = 0; c < ncols; c++) colW[c] = Math.max(0, ...[...nodes.values()].filter((n) => n.col === c).map((n) => n.w));
  for (let c = 0; c < ncols; c++) colX[c] = c ? colX[c - 1] + colW[c - 1] + GAP : LABW + PADX;

  // ---- lanes ----
  const rowH = lanes.map((_, i) => Math.max(108, Math.max(0, ...[...nodes.values()].filter((n) => n.lane === i).map((n) => n.h)) + 50));
  const laneRows = lanes.map((_, i) => Math.max(1, ...[...nodes.values()].filter((n) => n.lane === i).map((n) => n.row + 1)));
  const laneH = lanes.map((_, i) => rowH[i] * laneRows[i]);
  const laneTop: number[] = []; let y = 0; laneH.forEach((h, i) => { laneTop[i] = y; y += h; });
  const bodyH = y;
  nodes.forEach((n) => {
    n.x = colX[n.col] + (colW[n.col] - n.w) / 2; n.cx = n.x + n.w / 2;
    n.cy = laneTop[n.lane] + rowH[n.lane] * (n.row + 0.5); n.y = n.cy - n.h / 2;
  });
  const chX = (col: number) => colX[col] + colW[col] + GAP / 2; // channel after column `col`
  const W = LABW + PADX * 2 + colX[ncols - 1] + colW[ncols - 1] - LABW - PADX + 50;

  // ---- edge routing ----
  type P = [number, number];
  const boxes = [...nodes.values()];
  const hit = (a: P, b: P, skip: string[]) => boxes.some((n) => {
    if (skip.includes(n.id)) return false;
    const x1 = n.x - 4, x2 = n.x + n.w + 4, y1 = n.y - 4, y2 = n.y + n.h + 4;
    const sx1 = Math.min(a[0], b[0]), sx2 = Math.max(a[0], b[0]), sy1 = Math.min(a[1], b[1]), sy2 = Math.max(a[1], b[1]);
    return sx2 > x1 && sx1 < x2 && sy2 > y1 && sy1 < y2;
  });
  const clear = (pts: P[], skip: string[]) => pts.every((p, i) => i === 0 || !hit(pts[i - 1], p, skip));
  const len = (pts: P[]) => pts.reduce((s, p, i) => (i ? s + Math.abs(p[0] - pts[i - 1][0]) + Math.abs(p[1] - pts[i - 1][1]) : 0), 0);
  const used = new Map<string, number>();
  const port = (n: N, side: 'r' | 'l' | 't' | 'b'): P => side === 'r' ? [n.x + n.w, n.cy] : side === 'l' ? [n.x, n.cy] : side === 't' ? [n.cx, n.y] : [n.cx, n.y + n.h];
  edges.forEach((e) => {
    const A = nodes.get(e.a)!, B = nodes.get(e.b)!;
    const skip = [A.id, B.id];
    const down = B.cy > A.cy, same = Math.abs(B.cy - A.cy) < 1;
    const exit: 't' | 'b' = down ? 'b' : 't', enter: 't' | 'b' = down ? 't' : 'b';
    const cands: { pts: P[]; side: string; bonus: number }[] = [];
    const R = port(A, 'r'), L = port(B, 'l');
    if (B.col > A.col) {
      if (same) cands.push({ pts: [R, L], side: 'r', bonus: 0 });
      else {
        const x1 = chX(A.col), x2 = chX(B.col - 1);
        cands.push({ pts: [R, [x1, R[1]], [x1, L[1]], L], side: 'r', bonus: 20 });
        cands.push({ pts: [R, [x2, R[1]], [x2, L[1]], L], side: 'r', bonus: 30 });
        const T = port(A, exit); cands.push({ pts: [T, [T[0], L[1]], L], side: exit, bonus: 0 });
        const Bp = port(B, enter); cands.push({ pts: [R, [Bp[0], R[1]], Bp], side: 'r', bonus: 0 });
      }
    } else if (B.col === A.col && !same) {
      cands.push({ pts: [port(A, exit), port(B, enter)], side: exit, bonus: 0 });
    }
    // loop-backs and fallbacks: run through the gutter under/over both nodes
    const yb = Math.max(A.y + A.h, B.y + B.h) + 16, yt = Math.min(A.y, B.y) - 16;
    cands.push({ pts: [port(A, 'b'), [A.cx, yb], [B.cx, yb], port(B, 'b')], side: 'b', bonus: 60 });
    cands.push({ pts: [port(A, 't'), [A.cx, yt], [B.cx, yt], port(B, 't')], side: 't', bonus: 60 });
    // loop-backs: out over the top of the lanes, or under the bottom, where nothing else is drawn
    const yTop = laneTop[Math.min(A.lane, B.lane)] + 12, yBot = laneTop[Math.max(A.lane, B.lane)] + laneH[Math.max(A.lane, B.lane)] - 12;
    cands.push({ pts: [port(A, 't'), [A.cx, yTop], [B.cx, yTop], port(B, 't')], side: 't', bonus: back.has(e) ? 20 : 150 });
    cands.push({ pts: [port(A, 'b'), [A.cx, yBot], [B.cx, yBot], port(B, 'b')], side: 'b', bonus: back.has(e) ? 25 : 150 });
    const x1 = chX(Math.max(A.col, B.col - 1));
    cands.push({ pts: [R, [x1, R[1]], [x1, yb], [chX(B.col - 1), yb], [chX(B.col - 1), L[1]], L], side: 'r', bonus: 120 });
    let best: P[] | null = null, bs = Infinity;
    cands.forEach((c) => {
      if (!clear(c.pts, skip)) return;
      const s = len(c.pts) + c.bonus + c.pts.length * 6 + (used.get(A.id + c.side) || 0) * 400;
      if (s < bs) { bs = s; best = c.pts; (best as any).side = c.side; }
    });
    const pick = best ?? cands[0].pts;
    used.set(A.id + ((best as any)?.side ?? cands[0].side), 1);
    e.pts = pick;
    e.lines = e.label ? wrap(e.label, 62, 12) : [];
  });

  // ---- edge labels: find a clear spot on one of the segments ----
  const placed: { x: number; y: number; w: number; h: number }[] = [];
  // the question / event name written under a gateway or event is reserved space, edge labels keep clear of it
  nodes.forEach((n) => { if (n.lines.length && (n.kind === 'diamond' || n.kind === 'start' || n.kind === 'end')) { const nw = Math.max(...n.lines.map((l) => tw(l, 12))) + 6; placed.push({ x: n.cx - nw / 2, y: n.y + n.h + 2, w: nw, h: n.lines.length * 14 + 6 }); } });
  const labelSvg: string[] = [];
  edges.forEach((e) => {
    if (!e.lines.length) return;
    const lw = Math.max(...e.lines.map((l) => tw(l, 12, 600))) + 8, lh = e.lines.length * 14 + 4;
    const spots: { x: number; y: number }[] = [];
    e.pts.forEach((p, i) => {
      if (!i) return; const q = e.pts[i - 1];
      const horiz = Math.abs(p[1] - q[1]) < 1, mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, segLen = Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);
      if (horiz) {
        const lo = Math.min(p[0], q[0]), hi = Math.max(p[0], q[0]);
        [mx - lw / 2, lo + 4, hi - lw - 4].forEach((x) => { spots.push({ x, y: p[1] - lh - 2 }); spots.push({ x, y: p[1] + 3 }); });
      } else if (segLen > lh) {
        spots.push({ x: p[0] + 5, y: (i === 1 ? q[1] + (p[1] > q[1] ? 4 : -lh - 4) : my - lh / 2) });
        spots.push({ x: p[0] - lw - 5, y: my - lh / 2 });
      }
    });
    const ok = (s: { x: number; y: number }) => !boxes.some((n) => s.x < n.x + n.w + 2 && s.x + lw > n.x - 2 && s.y < n.y + n.h + 2 && s.y + lh > n.y - 2) && !placed.some((r) => s.x < r.x + r.w && s.x + lw > r.x && s.y < r.y + r.h && s.y + lh > r.y);
    const s = spots.find(ok) ?? spots[0]; if (!s) return;
    placed.push({ x: s.x, y: s.y, w: lw, h: lh });
    labelSvg.push(`<g class="sw-el"><rect x="${s.x.toFixed(1)}" y="${s.y.toFixed(1)}" width="${lw.toFixed(1)}" height="${lh}" rx="4"/>${e.lines.map((l, i) => `<text x="${(s.x + lw / 2).toFixed(1)}" y="${(s.y + 12 + i * 14).toFixed(1)}" text-anchor="middle">${esc(l)}</text>`).join('')}</g>`);
  });

  // ---- svg ----
  const id = 'sw' + ++swId;
  const lineH = (n: N, size: number) => n.lines.length * size;
  const usesDec = [...nodes.values()].some((n) => n.kind === 'diamond'), usesAnd = [...nodes.values()].some((n) => n.kind === 'and'), usesMerge = [...nodes.values()].some((n) => n.kind === 'merge');
  const legend: string[] = [];
  if (usesDec) legend.push('X gateway: decision, one exit is taken');
  if (usesAnd) legend.push('+ gateway: parallel split / join, all exits taken');
  if (usesMerge) legend.push('X gateway with several entries: paths rejoin');
  const legH = legend.length ? 34 : 0;
  const H = bodyH + legH;
  let s = `<svg class="swim-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" font-family='${FONT}'>`;
  s += '<style>.swim-svg .sw-task{fill:#fff8cc;stroke:#6b6b3a;stroke-width:1.3}.swim-svg .sw-tt{fill:#1f2328}.swim-svg .sw-g{fill:var(--surface);stroke:var(--text);stroke-width:1.6}.swim-svg .sw-gm{fill:none;stroke:var(--text);stroke-width:2.6}'
    + '.swim-svg .sw-start{fill:var(--surface);stroke:var(--text);stroke-width:1.5}.swim-svg .sw-end{fill:var(--surface);stroke:var(--text);stroke-width:3.2}.swim-svg .sw-note{paint-order:stroke;stroke:var(--surface);stroke-width:3px;stroke-linejoin:round}'
    + '.swim-svg .sw-e{stroke:var(--text);stroke-width:1.5}.swim-svg .sw-ah{fill:var(--text)}</style>';
  s += `<defs><marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="sw-ah"/></marker></defs>`;
  lanes.forEach((t, i) => {
    s += `<rect class="sw-lane sw-l${i % 2}" x="0" y="${laneTop[i]}" width="${W}" height="${laneH[i]}"/>`;
    s += `<rect class="sw-head" x="0" y="${laneTop[i]}" width="${LABW}" height="${laneH[i]}"/>`;
    const L = wrap(t, laneH[i] - 14, 12.5); const cx = LABW / 2, cy = laneTop[i] + laneH[i] / 2;
    s += `<text class="sw-lt" transform="rotate(-90 ${cx} ${cy})" x="${cx}" y="${cy - (L.length - 1) * 7.5 + 4}" text-anchor="middle">${L.map((l, k) => `<tspan x="${cx}" dy="${k ? 15 : 0}">${esc(l)}</tspan>`).join('')}</text>`;
  });
  edges.forEach((e) => {
    const d = e.pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    s += `<path class="sw-e${e.dotted ? ' sw-dot' : ''}" d="${d}" marker-end="url(#${id}a)"/>`;
  });
  const notes: string[] = [];
  nodes.forEach((n) => {
    const { x, y, w, h, cx, cy } = n;
    const gate = n.kind === 'diamond' || n.kind === 'merge' || n.kind === 'and';
    if (gate) {
      const k = n.kind === 'and' ? 9 : 7;
      s += `<polygon class="sw-n sw-g" points="${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}"/>`
        + (n.kind === 'and' ? `<path class="sw-gm" d="M${cx - k} ${cy}H${cx + k}M${cx} ${cy - k}V${cy + k}"/>` : `<path class="sw-gm" d="M${cx - k} ${cy - k}L${cx + k} ${cy + k}M${cx + k} ${cy - k}L${cx - k} ${cy + k}"/>`);
    } else if (n.kind === 'start' || n.kind === 'end') s += `<circle class="sw-n sw-${n.kind}" cx="${cx}" cy="${cy}" r="${w / 2}"/>`;
    else s += `<rect class="sw-n sw-task${n.kind === 'ghost' ? ' sw-ghost' : ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
    if (n.lines.length && (gate || n.kind === 'start' || n.kind === 'end')) {
      // the question / event name is written under the symbol, with a halo so a line passing through stays readable
      const top = y + h + 14;
      notes.push(`<text class="sw-t sw-note" x="${cx}" y="${top}" text-anchor="middle" font-size="12">${n.lines.map((l, k) => `<tspan x="${cx}" dy="${k ? 14 : 0}">${esc(l)}</tspan>`).join('')}</text>`);
    } else if (n.lines.length) {
      const size = n.kind === 'diamond' ? 12.5 : FS, lh2 = n.kind === 'diamond' ? 16 : 17;
      const top = cy - (n.lines.length - 1) * lh2 / 2 + size * 0.36;
      s += `<text class="sw-t${n.kind === 'ghost' ? '' : ' sw-tt'}" x="${cx}" y="${top.toFixed(1)}" text-anchor="middle" font-size="${size}">${n.lines.map((l, k) => `<tspan x="${cx}" dy="${k ? lh2 : 0}">${esc(l)}</tspan>`).join('')}</text>`;
    }
    void lineH;
  });
  s += labelSvg.join('') + notes.join('');
  if (legend.length) s += `<text class="sw-lg" x="${LABW + 8}" y="${bodyH + 22}" font-size="12">${esc(legend.join('     '))}</text>`;
  return s + '</svg>';
}
