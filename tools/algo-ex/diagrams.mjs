// Diagrams injected into the existing (original) exercise cards. Each entry: { t: title substring, at: 'q' | 'ans' | 'work', h: html }.
// 'q' = shown with the question, 'ans' = at the top of "Show answer", 'work' = at the top of "Show full working".
import { arr, bst, bstFrom, fig, graph, heapTree, heightOf, join, mergePasses, one, pathTo, relabel, row, runRows, stack } from './svg.mjs';

// ---------- helpers ----------
const heapInsert = (a, v) => { a = a.slice(); a.push(v); let i = a.length - 1, sw = 0; while (i > 0) { const p = (i - 1) >> 1; if (a[p] <= a[i]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; sw++; } return [a, sw]; };
const buildHeap = (src) => { const a = src.slice(); let sw = 0; for (let s = (a.length >> 1) - 1; s >= 0; s--) { let i = s; for (;;) { let m = i; const l = 2 * i + 1, r = 2 * i + 2; if (l < a.length && a[l] < a[m]) m = l; if (r < a.length && a[r] < a[m]) m = r; if (m === i) break; [a[i], a[m]] = [a[m], a[i]]; i = m; sw++; } } return [a, sw]; };

// ---------- chapter 3: merge sort, runs before the final merge ----------
const passes = (a, cap) => {
  const L = mergePasses(a); const keep = L.filter((l) => l.w === undefined || l.w < a.length);
  const last = keep[keep.length - 1]; if (last) last.cls = last.runs.map(() => 'dg-h');
  return keep.map((l) => ({ ...l, title: l.title }));
};
const mergeFig = (a, cap) => one(runRows(passes(a), { cw: a.length > 11 ? 21 : 24 }), cap, 'Bottom-up merge sort: each row doubles the length of the sorted runs');

// ---------- chapter 6: trees ----------
const names = { Lexus: 'Lex', Mercedes: 'Mer', BMW: 'BMW', Audi: 'Aud', Lamborghini: 'Lam', Chevrolet: 'Che', Porsche: 'Por', Maserati: 'Mas', Lotus: 'Lot' };
const cars = ['Lexus', 'Mercedes', 'BMW', 'Audi', 'Lamborghini', 'Chevrolet', 'Porsche', 'Maserati', 'Lotus'];
const carTree = (list) => relabel(bstFrom(list), (v) => names[v]);
const orders = { BST1: [55, 4, 23, 21, 12, 7, 66, 1, 91, 44], BST2: [23, 7, 66, 55, 12, 91, 21, 1, 4, 44], BST3: [1, 91, 7, 55, 4, 44, 12, 23, 21, 66] };
const searchTree = (name) => { const t = bstFrom(orders[name]); const p = pathTo(t, 1); const d = bst(t, { hl: p, dx: 30, dy: 44, foot: `${name}: search for 1 visits ${p.join(' → ')}` }); return d; };
const A6 = [2, 10, 4, 7, 19, 5, 8, 11, 3, 15];
const B6 = [2, 19, 3, 15, 4, 11, 5, 10, 7, 8];
const opsTree = ['A', ['B', ['D', null, null], ['G', null, null]], ['C', null, ['E', ['F', null, null], null]]];
const mirrorSrc = [1, [2, [4, null, null], [5, null, null]], [3, null, null]];
const mirror = (t) => (t ? [t[0], mirror(t[2]), mirror(t[1])] : null);

// ---------- chapter 7: heaps ----------
const S7 = [83, 43, 88, 39, 44, 82, 65, 45, 27, 79];
let ins = []; for (const v of S7) ins = heapInsert(ins, v)[0];
let insSw = 0; { let a = []; for (const v of S7) { const r = heapInsert(a, v); a = r[0]; insSw += r[1]; } }
const [bu, buSw] = buildHeap(S7);
const idxTree = heapTree(Array.from({ length: 15 }, (_, i) => i), { dx: 30, dy: 46 });

// ---------- chapter 9 / 10: graphs ----------
const g10 = graph(
  { A: [0.6, 0], B: [2, 0], I: [1.3, 1.1], D: [3.4, 0], H: [4.8, 0.2], C: [4.8, 1.4], E: [3.4, 1.7], F: [2, 2.2], G: [0.6, 2.2], J: [-0.4, 1.1] },
  [['A', 'B'], ['A', 'I'], ['B', 'D'], ['B', 'H', '', { curve: -18 }], ['C', 'D'], ['D', 'H'], ['E', 'F'], ['E', 'G'], ['F', 'A', '', { curve: 26 }], ['G', 'J'], ['H', 'E'], ['I', 'B'], ['I', 'J'], ['J', 'A']],
  { directed: true, scale: 62 });
const courses = graph(
  { IS200: [0, 0.2], DM: [0, 1.8], PMSB: [0, 3.2], OOAD: [1.5, 0.6], SE: [3, 0], EI: [3, 2.2], AA: [4.6, 2.9], EWS: [4.6, 0.8] },
  [['IS200', 'OOAD'], ['IS200', 'AA', '', { curve: 60 }], ['OOAD', 'SE'], ['OOAD', 'EI'], ['DM', 'EI'], ['PMSB', 'EI'], ['EI', 'AA'], ['EI', 'EWS'], ['SE', 'EWS']],
  { directed: true, scale: 62, r: 25 });
const gG = graph(
  { A: [0, 1.2], B: [1.3, 0], E: [1.3, 2.4], C: [2.9, 0], D: [2.9, 1.3], F: [4.2, 1.2] },
  [['A', 'B'], ['A', 'E'], ['A', 'F', '', { curve: 40 }], ['B', 'C'], ['B', 'D'], ['B', 'F'], ['C', 'D'], ['D', 'F'], ['E', 'D'], ['E', 'F', '', { curve: -20 }], ['F', 'C', 'cycle edge', { red: true, cls: 'dg-arr' }]],
  { directed: true, scale: 62 });
const G1 = graph(
  { A: [1.5, 0], B: [0.5, 1], C: [2.5, 1], D: [0.5, 2], F: [2.5, 2], E: [1.5, 3], G: [3.7, 1] },
  [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'F'], ['C', 'D'], ['C', 'F'], ['D', 'E'], ['F', 'E'], ['G', 'C']],
  { directed: true, scale: 58 });
const G3 = graph(
  { A: [0, 1.4], B: [1.2, 0], C: [2.6, 0], D: [1.2, 2.8], E: [2.6, 2.8], F: [3.9, 1.4], G: [5.1, 1.4] },
  [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'G', '', { curve: -45 }], ['C', 'D'], ['C', 'E'], ['C', 'F'], ['C', 'G'], ['D', 'E'], ['D', 'G', '', { curve: 45 }], ['E', 'F'], ['F', 'G']],
  { directed: true, scale: 58 });
const G4pos = { A: [0, 1.2], B: [1.3, 1.2], C: [2.6, 0], E: [2.6, 2.4], D: [3.9, 0], F: [3.9, 1.7], G: [5.2, 0.9] };
const G4edges = [['A', 'B', 2], ['B', 'C', 3], ['B', 'E', 2], ['C', 'D', 1], ['C', 'F', 4], ['D', 'F', 3], ['D', 'G', 1], ['E', 'F', 5], ['F', 'G', 4]];
const G4 = graph(G4pos, G4edges, { directed: true, scale: 58 });
const G4path = graph(G4pos, G4edges, { directed: true, scale: 58, hlEdges: ['A-B', 'B-C', 'C-D', 'D-G'], hlNodes: ['A', 'B', 'C', 'D', 'G'] });

export const DIAGRAMS = {
  3: [
    { t: 'Merge sort just before the final merge', at: 'work', h: mergeFig([62, 77, 18, 48, 64, 45, 34, 88, 82, 87, 17], 'Bottom-up merge sort of the 11-number example. The highlighted row is the array just before the final merge: a sorted run of 8 and a sorted run of 3.') },
    { t: 'The array just before the final merge', at: 'work', h: mergeFig([8, 12, 55, 89, 54, 22, 95, 25, 75, 59, 29, 18, 79], 'Part (b) with 13 numbers. The highlighted row is the array just before the final merge: a sorted run of 8 and a sorted run of 5.') },
  ],
  4: [
    { t: 'Pascal triangle recursion', at: 'work', h: one(bst(['pt(4,2)', ['pt(3,1)', null, null], ['pt(3,2)', ['pt(2,1)', null, null], ['pt(2,2)', null, null]]], { dx: 58, dy: 50, cls: { 'pt(3,1)': 'dg-g', 'pt(2,1)': 'dg-g' } }), 'The call tree of pt(4, 2). The first entry of a level (k = 1) is a base case that returns 1; pt(2, 2) = 2 comes from the next level down.', 'Call tree of pt(4,2)') },
  ],
  5: [
    { t: 'Which pop sequences are possible', at: 'work', h: (() => {
      const st = [stack(['1'], { title: 'push 1' }), stack([], { title: 'pop → 1' }), stack(['3', '2'], { title: 'push 2, 3' }), stack(['2'], { title: 'pop → 3' }), stack(['5', '4', '2'], { title: 'push 4, 5' }), stack(['4', '2'], { title: 'pop → 5' }), stack(['2'], { title: 'pop → 4' }), stack([], { title: 'pop → 2' })].map((s) => ({ ...s, w: s.w + 14, h: 112 }));
      return one(join([join(st.slice(0, 4)), join(st.slice(4))], true, 4), 'The stack after each step of the answer 1 3 5 4 2 (top of the stack at the top). Values are pushed in increasing order; a pop prints the top.', 'Stack states for the pop sequence');
    })() },
  ],
  6: [
    { t: 'Three insertion orders', at: 'ans', h: row([searchTree('BST1'), searchTree('BST2'), searchTree('BST3')], 'The three trees. Highlighted: the nodes visited when searching for 1. The same ten numbers give heights 6, 4 and 8, because the shape depends on insertion order.', 'Three BSTs built from the same numbers', { stack: true }) },
    { t: 'Cars BST', at: 'ans', h: row([bst(carTree(cars), { dx: 36, dy: 46, foot: `Listed order (height ${heightOf(bstFrom(cars))})`, hl: [] }), bst(carTree([...cars].sort()), { dx: 34, dy: 26, foot: `Alphabetical order: a chain (height ${heightOf(bstFrom([...cars].sort()))})` })], 'Abbreviations: Lex = Lexus, Mer = Mercedes, Aud = Audi, Lam = Lamborghini, Che = Chevrolet, Por = Porsche, Mas = Maserati, Lot = Lotus.', 'Cars BST in listed and alphabetical order', { stack: true }) },
    { t: 'BST from an array and traversals', at: 'ans', h: row([bst(bstFrom(A6), { dx: 34, dy: 50, foot: 'A = [2, 10, 4, 7, 19, 5, 8, 11, 3, 15]' }), bst(bstFrom(B6), { dx: 30, dy: 34, foot: `B: a zig-zag chain (height ${heightOf(bstFrom(B6))})` })], 'Left: the BST built from A. Right: the reordered array B gives the worst-case chain that alternates right and left.', 'BST from A and the chain from B', { stack: true }) },
    { t: 'Build a tree with set operations', at: 'ans', h: one(bst(opsTree, { dx: 44, dy: 56, hl: ['A'] }), 'The tree after the seven operations. A is the root; E is C’s right child, and F is E’s left child.', 'Binary tree with A at the root') },
    { t: 'The mirror of a binary tree', at: 'work', h: row([bst(mirrorSrc, { dx: 40, dy: 50, foot: 'before' }), bst(mirror(mirrorSrc), { dx: 40, dy: 50, foot: 'after mirror()' })], 'Every node swaps its left and right child, so the picture is reflected left to right.', 'A tree and its mirror image') },
  ],
  7: [
    { t: 'Array indices of a complete tree', at: 'q', h: one(idxTree, 'The 15 array positions as a complete binary tree (index 0 at the root). The children of index j are 2j + 1 and 2j + 2.', 'Complete binary tree with indices 0 to 14') },
    { t: 'Heap construction', at: 'work', h: row([heapTree(ins, { dx: 34, dy: 46 }), heapTree(bu, { dx: 34, dy: 46 })].map((d, k) => ({ ...d, h: d.h + 18, body: d.body + `<text class="dg-hd" x="${d.w / 2}" y="${d.h + 8}">${k ? `bottom-up: ${buSw} swaps` : `one by one: ${insSw} swaps`}</text>` })), 'The two resulting heaps for S = [83, 43, 88, 39, 44, 82, 65, 45, 27, 79]. Inserting one by one needs more swaps than bottom-up construction, and the heaps are different but both valid.', 'Heap built by insertion and heap built bottom-up', { stack: true }) },
  ],
  9: [
    { t: 'Degrees, BFS and DFS of a 10-vertex graph', at: 'q', h: one(g10, 'The graph, drawn from the edge list in the question.', 'Directed graph on vertices A to J') },
    { t: 'Course prerequisites as a graph', at: 'ans', h: one(courses, 'Prerequisite graph: an edge a → b means “a must be passed before b”. IS200, DM and PMSB have no incoming edges, so they can be taken first.', 'Course prerequisite graph') },
    { t: 'Make a graph acyclic', at: 'q', h: one(gG, 'Graph G. The edge F → C (dashed) closes the cycle C → D → F → C.', 'Directed graph G with one cycle') },
  ],
  10: [
    { t: 'Stack DFS on Graph 1', at: 'q', h: one(G1, 'Graph 1.', 'Graph 1') },
    { t: 'Stack DFS and BFS on Graph 3', at: 'q', h: one(G3, 'Graph 3. The edges A → B → C → D → E → F → G form a chain through all seven vertices, which is why its topological order is unique.', 'Graph 3') },
    { t: 'Stack DFS on a weighted graph', at: 'q', h: one(G4, 'Graph 4 (edge labels are weights; DFS ignores them).', 'Graph 4') },
    { t: 'Uniform cost search from A to G', at: 'ans', h: one(G4path, 'The shortest path found by UCS, highlighted: A → B → C → D → G, total cost 2 + 3 + 1 + 1 = 7.', 'Graph 4 with the shortest path highlighted') },
  ],
};

export const exported = { G4, G4path, G1, G3 };
