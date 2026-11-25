// One-time edit of chapter 9 (theory) in data.json: draw the running graph first, announce the order of the section,
// and tie each trace table to the picture it produces. Safe to run once (it refuses to run twice).
import fs from 'fs';
const F = new URL('../../src/courses/algo/data.json', import.meta.url);
const D = JSON.parse(fs.readFileSync(F, 'utf8'));
const L = D.lessons.find((l) => l.n === 9);
let h = L.html;
if (h.includes('data-flow="1"')) { console.log('already applied'); process.exit(0); }
const rep = (a, b) => { const n = h.split(a).length - 1; if (n !== 1) throw new Error(`matched ${n}x: ${a.slice(0, 60)}`); h = h.replace(a, () => b); };

// the plain graph, taken from BFS frame 0 (same coordinates, so every later picture matches it)
const f0 = /<figure class="frame">[\s\S]*?<\/figure>/.exec(h)[0];
let inner = f0.slice(f0.indexOf('</defs>') + 7, f0.indexOf('<text x="8" y="197"'));
inner = inner.replace(/opacity="0\.55"/g, 'opacity="1"').replace(/fm0n/g, 'rgn').replace('fill="rgba(210,153,34,.35)" stroke="var(--yellow)"', 'fill="var(--surface2)" stroke="var(--border)"');
const graphFig = (cap) => `<figure class="film-tree" data-flow="1"><svg viewBox="0 0 300 185" role="img" aria-label="The running example graph with vertices A to F" class="film-svg"><defs><marker id="rgn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>${inner}</svg><figcaption>${cap}</figcaption></figure>`;

// 9.0: draw the graph right after the edge list, before the list/matrix table
rep('E→D. Written down as an <strong class="k-c">adjacency list</strong>',
  'E→D. Here it is as a picture. <strong>Every later picture in this chapter is drawn on this same graph</strong>, so come back to it whenever a trace mentions a vertex.</p>' + graphFig('The running example: 6 vertices (A to F) and 10 arrows. A and C point at each other, B and D point at each other; F has no outgoing arrow.') + '<p>The same graph written down as an <strong class="k-c">adjacency list</strong>');

// 9.0b: reading guide + the graph again
rep('and a pen.</p><p><strong class="k-c">Breadth-first search (BFS)',
  'and a pen.</p>' + graphFig('The running example again (from 9.0). Neighbours are always taken in A to Z order.')
  + '<p><strong class="k-c">How this section is ordered.</strong> Each search is shown the same four ways, in this order: (1) the <em>steps</em> in words, (2) a <em>trace table</em>, one row per step, (3) <em>frames</em>, the same rows drawn on the graph above, and (4) the <em>tree</em> that the search builds. Do BFS fully first, then DFS, then topological sort, which is just DFS with a twist.</p><p><strong class="k-c">Breadth-first search (BFS)');
rep('Each card is one row of the table, drawn on the graph.', 'Each card is one row of the trace table above, drawn on the running-example graph.');
rep('Same graph, same table, but now the strip is a stack:', 'These cards are the rows of the DFS trace table just above, drawn on the same running-example graph. The only change from BFS is the strip at the bottom: it is now a stack:');
rep('<p><strong class="k-c">The DFS tree.</strong> The green edges now make',
  '<p><strong class="k-c">The DFS tree.</strong> Now keep only the green edges, the ones that discovered a new vertex. Read it against the table: every row marked <em>visit</em> is one vertex of the tree, and the extra copies that were <em>discarded</em> never become tree edges. The green edges make');
rep('<p>Step through both on the real graph yourself:</p>', '<p><strong class="k-c">Try it yourself.</strong> Step through BFS and DFS on this same graph with the tracer, and check each step against the two tables above:</p>');
D.lessons.find((l) => l.n === 9).html = h;
fs.writeFileSync(F, JSON.stringify(D));
console.log('ok');
