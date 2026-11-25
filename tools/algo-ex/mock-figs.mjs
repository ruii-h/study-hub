// Diagrams for the Mock Exams tab: the question pictures that were missing from the markdown
// (Mock 1 Q5 curve, Mock 1 Q16 topological-sort graph, Mock 3 Q8 seating rings, Mock 3 Q22 Venn options).
import { fig, node, line, txt } from './svg.mjs';

const f1 = (n) => Math.round(n * 10) / 10;

/** Mock 1 Q5: operations vs input size, the curve of ~3n^2 (about 310 at n=10, about 1,230 at n=20). */
export function curveFig() {
  const X0 = 58, X1 = 340, Y0 = 214, Y1 = 22;
  const px = (n) => X0 + ((n - 2) / 18) * (X1 - X0), py = (v) => Y0 - (v / 1400) * (Y0 - Y1);
  let s = '';
  for (let v = 0; v <= 1400; v += 200) {
    s += `<line class="dg-q" x1="${X0}" y1="${f1(py(v))}" x2="${X1}" y2="${f1(py(v))}"/>`
      + `<text class="dg-s" style="text-anchor:end" x="${X0 - 6}" y="${f1(py(v) + 4)}">${v}</text>`;
  }
  for (let n = 2; n <= 20; n += 2) s += `<text class="dg-s" x="${f1(px(n))}" y="${Y0 + 16}">${n}</text><line class="dg-e" x1="${f1(px(n))}" y1="${Y0}" x2="${f1(px(n))}" y2="${Y0 + 4}"/>`;
  s += `<line class="dg-e" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="dg-e" x1="${X0}" y1="${Y1}" x2="${X0}" y2="${Y0}"/>`;
  const pts = []; for (let n = 2; n <= 20.001; n += 0.5) pts.push(`${f1(px(n))},${f1(py(3.05 * n * n))}`);
  s += `<polyline class="dg-cg" points="${pts.join(' ')}" stroke-linejoin="round"/>`;
  s += `<text class="dg-hd" x="${(X0 + X1) / 2}" y="${Y0 + 36}">Input size</text><text class="dg-hd" transform="rotate(-90 13 ${(Y0 + Y1) / 2})" x="13" y="${(Y0 + Y1) / 2}">No of operations</text>`;
  return fig(360, 262, s, 'Number of operations against input size: about 300 operations at input size 10 and about 1,200 at input size 20.', 'Curve of number of operations against input size, rising from near 0 at size 2 to about 1200 at size 20');
}

/** Mock 3 Q8: eleven seats in a circle, the sisters shaded. */
function ring(sis, title, good) {
  const cx = 62, cy = 70, R = 44, W = 124, H = 148;
  let s = `<text class="dg-hd" x="${cx}" y="12" style="fill:var(--${good ? 'green' : 'red'})">${title}</text>`;
  for (let i = 0; i < 11; i++) {
    const a = (i / 11) * 2 * Math.PI - Math.PI / 2, x = f1(cx + R * Math.cos(a)), y = f1(cy + 8 + R * Math.sin(a));
    s += sis.includes(i) ? node(x, y, 'S', 'dg-h', 10) : `<circle class="dg-n" cx="${x}" cy="${y}" r="10"/>`;
  }
  return { w: W, h: H, body: s };
}
export function ringsFig() {
  const parts = [ring([1, 2, 3], 'Not OK', false), ring([1, 2, 5], 'OK', true), ring([0, 4, 8], 'OK', true)];
  let w = 0, body = '';
  parts.forEach((p) => { body += `<g transform="translate(${w} 0)">${p.body}</g>`; w += p.w + 6; });
  return fig(w - 6, 166, `<g transform="translate(0 18)">${body}</g>`, 'Eleven seats around a circle; the shaded seats (S) are the three sisters. Not OK: the three sisters form one block. OK: they are not all side by side.', 'Three seating circles of 11 seats: three sisters seated together is not allowed, two other arrangements are allowed');
}

/** Mock 3 Q22: the six candidate Venn diagrams. */
const mark = (x, y, t, c) => `<text style="fill:var(--${c});font:700 16px system-ui,Segoe UI,sans-serif;text-anchor:middle;dominant-baseline:central" x="${x}" y="${y}">${t}</text>`;
function venn(label, X, Y) {
  const W = 150, H = 196;
  let s = `<circle class="dg-fo" cx="75" cy="58" r="50"/><circle class="dg-fa" cx="75" cy="112" r="48"/>`
    + `<ellipse class="dg-q" cx="75" cy="142" rx="28" ry="11"/>`
    + `<text class="dg-s" x="75" y="26" style="font-size:10.5px">NP-Hard</text>`
    + `<text class="dg-s" x="75" y="80" style="font-size:9.5px">NP-Complete</text>`
    + `<text class="dg-s" x="112" y="124" style="font-size:10.5px">NP</text>`
    + `<text class="dg-s" x="58" y="146" style="font-size:10.5px">P</text>`
    + mark(X[0], X[1], 'X', 'red') + mark(Y[0], Y[1], 'Y', 'accent')
    + `<text class="dg-hd" x="75" y="${H - 4}">(${label})</text>`;
  return { w: W, h: H, body: s };
}
export function vennFig() {
  const P = [
    venn('a', [60, 98], [108, 40]),   // X in NP-Complete, Y NP-Hard only
    venn('b', [55, 98], [95, 98]),    // both in NP-Complete
    venn('c', [90, 142], [100, 40]),  // X in P, Y NP-Hard only
    venn('d', [46, 128], [75, 98]),   // X in NP only, Y in NP-Complete
    venn('e', [58, 42], [96, 42]),    // both NP-Hard only
    venn('f', [104, 42], [46, 128]),  // X NP-Hard only, Y in NP only
  ];
  let body = '';
  P.forEach((p, i) => { body += `<g transform="translate(${(i % 2) * 168} ${Math.floor(i / 2) * 202})">${p.body}</g>`; });
  return fig(318, 624, `<g transform="translate(0 18)">${body}</g>`, 'The six options. Red X is problem X and blue Y is problem Y. NP-Complete is the overlap of NP-Hard and NP, and P sits inside NP (the dashed oval).', 'Six Venn diagrams of P, NP, NP-Complete and NP-Hard with the positions of X and Y marked in each');
}

/** Mock 1 Q16: the 14-vertex DAG, laid out left to right in layers (an edge always points to the right). */
export function topoFig() {
  const pos = {
    m: [45, 45], n: [190, 45], o: [342, 45], p: [492, 45],
    q: [118, 120], r: [265, 120], s: [418, 120],
    t: [45, 195], u: [190, 195], v: [342, 195], w: [492, 195],
    x: [118, 268], y: [265, 268], z: [418, 268],
  };
  const E = ['mq', 'mr', 'mx', 'no', 'nq', 'nu', 'or', 'os', 'ov', 'po', 'ps', 'pz', 'qt', 'ru', 'ry', 'sr', 'ut', 'vw', 'vx', 'wz', 'yv'];
  const R = 17, W = 540, H = 300;
  let e = '', n = '';
  for (const [a, b] of E) {
    const [x1, y1] = pos[a], [x2, y2] = pos[b], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    e += `<line class="dg-ar" x1="${f1(x1 + ux * R)}" y1="${f1(y1 + uy * R)}" x2="${f1(x2 - ux * (R + 3))}" y2="${f1(y2 - uy * (R + 3))}" marker-end="url(#A)"/>`;
  }
  Object.keys(pos).forEach((k) => { n += node(pos[k][0], pos[k][1], k, 'dg-n', R); });
  return fig(W, H, e + n, 'Figure 3.', 'Directed acyclic graph on vertices m to z');
}
