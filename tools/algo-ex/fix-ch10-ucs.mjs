// One-time edit of chapter 10 (theory), section 10.0b: draw the example graph and show the trace table as frames.
import fs from 'fs';
const F = new URL('../../src/courses/algo/data.json', import.meta.url);
const D = JSON.parse(fs.readFileSync(F, 'utf8'));
const L = D.lessons.find((l) => l.n === 10);
let h = L.html;
if (h.includes('data-ucs="1"')) { console.log('already applied'); process.exit(0); }

const P = { A: [45, 100], B: [150, 38], C: [150, 162], D: [255, 100] };
const E = [['A', 'B', 4], ['A', 'C', 1], ['B', 'C', 2], ['B', 'D', 1], ['C', 'D', 5]];
const GREEN = 'rgba(63,185,80,.45)', YEL = 'rgba(210,153,34,.35)', BLUE = 'rgba(88,166,255,.35)';
const key = (a, b) => [a, b].sort().join('');
let uid = 0;
/** state: done[], wait{v:cost}, cur, used[] (edges drawn yellow), route[] (edges drawn green), queue[] strip entries */
function svg(label, st, queue, withStrip) {
  const id = 'uc' + ++uid;
  let s = '';
  for (const [a, b, w] of E) {
    const [x1, y1] = P[a], [x2, y2] = P[b], k = key(a, b);
    const cls = st.route?.includes(k) ? 'stroke="var(--green)" stroke-width="4"' : st.used?.includes(k) ? 'stroke="var(--yellow)" stroke-width="3"' : 'stroke="var(--muted)" stroke-width="1.6" opacity="0.7"';
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${cls}/>`;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L2 = Math.hypot(dx, dy), ox = (-dy / L2) * 11, oy = (dx / L2) * 11;
    s += `<rect x="${mx + ox - 10}" y="${my + oy - 9}" width="20" height="18" rx="5" fill="var(--surface)" stroke="var(--border)"/><text x="${mx + ox}" y="${my + oy + 4.5}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">${w}</text>`;
  }
  for (const v of Object.keys(P)) {
    const [x, y] = P[v];
    const done = st.done?.includes(v), wait = st.wait && v in st.wait, cur = st.cur === v;
    const fill = cur ? BLUE : done ? GREEN : wait ? YEL : 'var(--surface2)';
    const stroke = cur ? 'var(--accent)' : done ? 'var(--green)' : wait ? 'var(--yellow)' : 'var(--border)';
    s += `<circle cx="${x}" cy="${y}" r="16" fill="${fill}" stroke="${stroke}" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">${v}</text>`;
    const c = done ? st.cost?.[v] : wait ? st.wait[v] : null;
    if (c !== null && c !== undefined) s += `<text x="${x}" y="${y - 22}" text-anchor="middle" font-size="12" font-weight="700" fill="${done ? 'var(--green)' : 'var(--yellow)'}">${c}</text>`;
  }
  if (withStrip) {
    s += `<text x="8" y="197" font-size="11" fill="var(--muted)">priority queue (cheapest first ▸)</text>`;
    if (!queue.length) s += `<text x="8" y="225" font-size="12" fill="var(--muted)">empty</text>`;
    queue.forEach((q, i) => { const x = 8 + i * 62; s += `<rect x="${x}" y="206" width="56" height="28" rx="5" fill="${i === 0 ? 'rgba(210,153,34,.3)' : 'rgba(210,153,34,.14)'}" stroke="var(--yellow)" stroke-width="${i === 0 ? 2 : 1.2}"/><text x="${x + 28}" y="225" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">${q}</text>`; });
  }
  return `<svg viewBox="0 0 300 ${withStrip ? 250 : 200}" role="img" aria-label="${label}" class="film-svg" id="${id}">${s}</svg>`;
}

// frames mirror the trace table row by row
const frames = [
  ['Start', 'Put A in the queue with cost 0.', { wait: { A: 0 }, cur: null }, ['A 0']],
  ['Remove A (0)', 'A is final. Relax its roads: B costs 0+4 = 4, C costs 0+1 = 1. Both join the queue (yellow roads).', { done: ['A'], cost: { A: 0 }, wait: { B: 4, C: 1 }, used: ['AB', 'AC'] }, ['C 1', 'B 4']],
  ['Remove C (1)', 'C is final. B via C costs 1+2 = 3, cheaper than 4, so B is updated. D costs 1+5 = 6 and joins.', { done: ['A', 'C'], cost: { A: 0, C: 1 }, wait: { B: 3, D: 6 }, used: ['BC', 'CD'] }, ['B 3', 'D 6']],
  ['Remove B (3)', 'B is final. D via B costs 3+1 = 4, cheaper than 6, so D is updated.', { done: ['A', 'C', 'B'], cost: { A: 0, C: 1, B: 3 }, wait: { D: 4 }, used: ['BD'] }, ['D 4']],
  ['Remove D (4): target', 'D is the target and is removed, so its cost 4 is final. Stop. The green road is A, C, B, D.', { done: ['A', 'C', 'B', 'D'], cost: { A: 0, C: 1, B: 3, D: 4 }, route: ['AC', 'BC', 'BD'] }, []],
];
const filmKey = '<div class="film-key"><span><i style="background:rgba(210,153,34,.5)"></i>waiting in the priority queue (yellow number = best cost so far)</span><span><i style="background:rgba(63,185,80,.6)"></i>finished (green number = final cost)</span><span><i class="ln" style="background:var(--yellow)"></i>road relaxed this step</span><span><i class="ln" style="background:var(--green)"></i>final cheapest route</span></div>';
const film = '<div class="film">' + frames.map(([t, cap, st, q], i) => `<figure class="frame"><div class="frame-h"><span class="frame-n">${i}</span>${t}</div>${svg('UCS step ' + i, st, q, true)}<figcaption>${cap}</figcaption></figure>`).join('') + '</div>';

const graphFig = `<figure class="film-tree" data-ucs="1">${svg('The example road map', {}, [], false)}<figcaption>The example: two-way roads with their costs. A to D has two routes worth comparing: A, B, D (2 hops, cost 5) and A, C, B, D (3 hops, cost 4).</figcaption></figure>`;

const rep = (a, b) => { const n = h.split(a).length - 1; if (n !== 1) throw new Error(`matched ${n}x: ${a.slice(0, 60)}`); h = h.replace(a, () => b); };
rep('Each waiting entry is written <code>vertex(cost so far, came from)</code>.</p>', 'Each waiting entry is written <code>vertex(cost so far, came from)</code>.</p>' + graphFig);
rep('</tbody></table></div><p>Route by following “came from”', `</tbody></table></div><p><strong class="k-c">Picture it, frame by frame.</strong> Each card is one row of the table above, drawn on the road map. Watch the queue strip: the cheapest entry (left, bold outline) is always the next one removed, and a vertex's number can drop while it waits.</p>${filmKey}${film}<p>Route by following “came from”`);
L.html = h;
fs.writeFileSync(F, JSON.stringify(D));
console.log('ok');
