// One-time: dissolve every "N.0b How it works, slowly" section and put each walk-through at the
// start of the section that teaches the same item (slow version first, then the formal version).
import fs from 'fs';
const P = 'src/courses/algo/data.json';
const D = JSON.parse(fs.readFileSync(P, 'utf8'));
const H3 = '<div role="heading" aria-level="3" class="t-h3x">';

// chapter -> list of moves. at: target section number; take: indexes of h3x blocks; pre: take the preamble; end: append at end of the section (no panel)
const PLAN = {
  5: [{ at: 2, take: [], pre: 1 }, { at: 3, take: [0, 1] }, { at: 4, take: [2] }, { at: 5, take: [3] }, { at: 5, take: [4], end: 1 }],
  6: [{ at: 3, take: [2] }, { at: 4, take: [0, 1], pre: 1 }],
  7: [{ at: 1, take: [], pre: 1 }, { at: 2, take: [0] }, { at: 3, take: [1] }, { at: 4, take: [2] }, { at: 6, take: [3] }],
  8: [{ at: 2, take: [0], pre: 1 }, { at: 4, take: [1] }, { at: 5, take: [2] }, { at: 6, take: [3], end: 1 }],
  9: [{ at: 3, take: [0], pre: 1 }, { at: 4, take: [1], fig: 1 }, { at: 6, take: [2] }],
  10: [{ at: 3, take: [0], pre: 1 }, { at: 4, take: [1] }],
  11: [{ at: 3, take: [0] }, { at: 4, take: [1], pre: 1 }, { at: 5, take: [2] }, { at: 6, take: [3] }, { at: 7, take: [4] }],
  12: [{ at: 3, take: [0], pre: 1 }, { at: 5, take: [1] }, { at: 6, take: [2], end: 1 }],
};
const RENAME = { 10: [['>HOW<', '>Uniform cost search, one step at a time<']] };

const h2end = (h, id) => {
  const a = h.indexOf(`id="${id}"`); if (a < 0) throw new Error('no section ' + id);
  const t = h.indexOf('class="t-h2"', a); return h.indexOf('</div>', t) + 6;
};
const secEnd = (h, id) => {
  const a = h.indexOf(`id="${id}"`); let e = h.indexOf('<div class="t-section', a + 10); if (e < 0) e = h.length;
  return h.lastIndexOf('</div>', e); // closing div of the section
};

let moved = 0;
for (const l of D.lessons) {
  const plan = PLAN[l.n]; if (!plan) continue;
  let h = l.html; const id = `s${l.n}-how`;
  const a = h.indexOf(`id="${id}"`); if (a < 0) continue;
  const s = h.lastIndexOf('<div class="t-section', a); let e = h.indexOf('<div class="t-section', a); if (e < 0) e = h.length;
  let sec = h.slice(s, e);
  h = h.slice(0, s) + h.slice(e);
  let rest = sec.slice(sec.indexOf('</div>', sec.indexOf('class="t-h2"')) + 6);
  rest = rest.replace(/<\/div>\s*$/, ''); // the section's own closing tag
  const parts = rest.split(new RegExp('(?=' + H3.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')'));
  let pre = parts.shift(), blocks = parts;
  for (const [x, y] of RENAME[l.n] || []) blocks = blocks.map((b) => b.replace(x, y));
  if (l.n === 9) {
    const fig = /<figure class="film-tree" data-flow="1">[\s\S]*?<\/figure>/.exec(pre)[0];
    pre = pre.replace('Read the two traces below with', 'Read the traces below with').replace(/ Do BFS fully first[^<]*/, '');
    blocks[1] = fig + blocks[1];
  }
  for (const m of plan) {
    const body = (m.pre ? pre : '') + m.take.map((i) => blocks[i]).join('');
    const sid = `s${l.n}-${m.at}`;
    if (m.end) { const p = secEnd(h, sid); h = h.slice(0, p) + body + h.slice(p); }
    else {
      const p = h2end(h, sid);
      const panel = `<div class="t-slow"><div class="t-slow-tag">In plain words, step by step</div>${body}</div>${H3}The formal version</div>`;
      h = h.slice(0, p) + panel + h.slice(p);
    }
    moved++;
  }
  l.html = h;
}
fs.writeFileSync(P, JSON.stringify(D));
console.log('moved', moved);
