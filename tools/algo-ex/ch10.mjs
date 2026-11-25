import { ex, ask, theory, step, p, check, slip, table, ul, code } from './lib.mjs';

const ic = (n) => `IN-CLASS · Q${n}`;

const more = [
  ex({
    chip: ic(4), title: 'Count the topological orderings of Graph 2',
    q: 'How many distinct topological orderings are possible for Graph 2 (the eight-vertex DAG on the slide)? Its structure: vertex 1 must come first and vertex 8 last; vertex 4 sits in the middle; 2 and 3 lie between 1 and 4; 5, 6 and 7 lie between 4 and 8, with 5 forced before 7.',
    ans: p('<b>6</b> orderings: 2 ways to arrange vertices 2 and 3, times 3 ways to arrange vertices 5, 6 and 7.'),
    work: [
      ask('The question is a <b>counting</b> question: do not list the orders blindly. Split the DAG into segments that are separated by vertices which are forced into one place, count each segment, then multiply.'),
      theory('If a vertex v must come after everything on its left and before everything on its right (every other vertex is comparable with v), v splits the problem into independent parts. The number of orders is the product of the numbers of orders of the parts. For k free vertices with no constraints the count is k!; each fixed “a before b” pair halves it.'),
      step(1, 'Every valid order has the shape <code>1 … 4 … 8</code>: vertex 1 is the only source, 4 is the bottleneck every path goes through, and 8 is the only sink.'),
      step(2, '<b>Between 1 and 4</b> sit vertices 2 and 3, which have no edge between them. They can appear as 2, 3 or 3, 2: <b>2 ways</b>.'),
      step(3, '<b>Between 4 and 8</b> sit vertices 5, 6 and 7. Without constraints there would be 3! = 6 arrangements, but 5 must come before 7. Exactly half of the six arrangements put 5 before 7, so 6 / 2 = <b>3 ways</b>: (5, 6, 7), (5, 7, 6) and (6, 5, 7).'),
      step(4, 'The two segments are independent, so multiply: 2 × 3 = <b>6</b>.'),
      table([['Segment', 'Vertices', 'Constraint', 'Count'], ['between 1 and 4', '2, 3', 'none', '2! = 2'], ['between 4 and 8', '5, 6, 7', '5 before 7', '3!/2 = 3'], ['whole graph', '', 'product', '2 × 3 = 6']]),
      check('List one: 1, 2, 3, 4, 5, 6, 7, 8 is valid. Swap 2 and 3: 1, 3, 2, 4, … is valid. Try 5 after 7: 1, 2, 3, 4, 7, 5, 6, 8 is <i>invalid</i>, so it is not counted ✔.'),
      slip('Do not write 3! for the second segment: the 5-before-7 edge removes half of the arrangements. Do not add the segment counts either: independent choices multiply.'),
    ],
  }),
  ex({
    chip: ic(10), title: 'Topological order of Graph 4',
    q: 'Find a topological ordering of Graph 4 (A [(B, 2)], B [(C, 3), (E, 2)], C [(D, 1), (F, 4)], D [(F, 3), (G, 1)], E [(F, 5)], F [(G, 4)], G []), following alphabetical order. Ignore the weights.',
    ans: p('With the lecture’s algorithm and alphabetical neighbour order the answer is <b>A, B, E, C, D, F, G</b>. Another valid order is A, B, C, D, E, F, G (found when E is explored before C).'),
    work: [
      ask('A topological order only cares about <i>direction</i>, so ignore the weights and find a list in which every edge goes from left to right. “Alphabetical order” fixes the order in which each vertex’s neighbours are explored.'),
      theory('<b>Topological sort (lecture algorithm).</b> Run DFS from every unvisited vertex, taking vertices in order. Inside topsort_dfs(v): visit v, call topsort_dfs on each unvisited neighbour <i>in adjacency-list order</i>, and only then push v onto a stack. When all vertices are done, popping the stack gives the order: a vertex is pushed only after everything that depends on it.'),
      step(1, 'Edges without weights: A → B; B → C, B → E; C → D, C → F; D → F, D → G; E → F; F → G.'),
      step(2, 'DFS(A): A’s only neighbour is B. DFS(B): neighbours in alphabetical order are C, then E. DFS(C): neighbours D, then F. DFS(D): neighbours F, then G. DFS(F): neighbour G. DFS(G): no out-edges, so <b>push G</b>. Back in F: push <b>F</b>. Back in D: G is visited, push <b>D</b>.'),
      step(3, 'Back in C: F is visited, push <b>C</b>. Back in B: now the neighbour E. DFS(E): F is visited, push <b>E</b>. Push <b>B</b>, then push <b>A</b>.'),
      table([['Push #', '1', '2', '3', '4', '5', '6', '7'], ['Vertex', 'G', 'F', 'D', 'C', 'E', 'B', 'A']]),
      step(4, 'Pop the stack (last pushed comes out first): <b>A, B, E, C, D, F, G</b>.'),
      table([['Edge', 'Positions', 'Forward?'], ['A → B', '1 → 2', '✔'], ['B → C', '2 → 4', '✔'], ['B → E', '2 → 3', '✔'], ['C → D', '4 → 5', '✔'], ['C → F', '4 → 6', '✔'], ['D → F', '5 → 6', '✔'], ['D → G', '5 → 7', '✔'], ['E → F', '3 → 6', '✔'], ['F → G', '6 → 7', '✔']]),
      check('All nine edges point forward ✔. If B’s neighbours were explored as E first, then C, the pushes would be G, F, E, D, C, B, A and the order A, B, C, D, E, F, G, which is also valid.'),
      slip('The order is not unique (C and E are not ordered relative to each other, and neither are E and D), so another correct answer may differ from the key; check that every edge points forward rather than matching the list letter by letter.'),
    ],
  }),
  ex({
    chip: ic(11), title: 'Graphs with exactly N!, (N − 1)!, (N − 2)!, … , 1 topological orders',
    q: 'Given a graph of N nodes, in which situations is the number of valid topological orders N!, (N − 1)!, (N − 2)!, …, 2!, 1?',
    ans: ul(['<b>N!</b>: no edges at all.', '<b>(N − 1)!</b>: node 1 points to every other node; nodes 2 … N have no edges.', '<b>(N − 2)!</b>: node 1 → node 2, and node 2 points to every node 3 … N.', '… and in general <b>(N − k)!</b>: a chain 1 → 2 → … → k, and node k points to every node k + 1 … N.', '<b>1</b>: one single chain 1 → 2 → … → N.']),
    work: [
      ask('Find a family of graphs whose number of topological orders shrinks by one factor each time: N!, (N − 1)!, …, 1. Think about how many vertices are still <i>free</i> (unordered relative to each other).'),
      theory('Orders of a set of free vertices = (number of free vertices)!. A vertex or chain that must come before everything else is <i>fixed</i> and adds no choice.'),
      step(1, '<b>No edges</b>: all N vertices are free, so N! orders (any permutation).'),
      step(2, '<b>Node 1 → every other node</b>: node 1 must come first. The other N − 1 nodes are free, so (N − 1)! orders.'),
      step(3, '<b>Chain 1 → 2, then node 2 → every node 3 … N</b>: nodes 1 and 2 are fixed in positions 1 and 2; the other N − 2 nodes are free: (N − 2)! orders.'),
      step(4, 'Pattern: make the first k nodes a chain 1 → 2 → … → k and let node k point to all the rest. The first k positions are fixed; N − k nodes are free: (N − k)! orders.'),
      table([['k (fixed chain length)', 'Edges', 'Free vertices', 'Orders'], ['0', 'none', 'N', 'N!'], ['1', '1 → 2, 3, …, N', 'N − 1', '(N − 1)!'], ['2', '1 → 2, then 2 → 3, …, N', 'N − 2', '(N − 2)!'], ['N − 2', 'chain up to N − 2, then → N − 1 and N', '2', '2!'], ['N − 1', 'one chain through all N vertices', '1', '1! = 1']]),
      p('<b>Example with N = 4.</b> No edges: 24 orders. 1 → 2, 3, 4: 3! = 6 orders. 1 → 2 → 3, 4: 2! = 2 orders (1, 2, 3, 4 and 1, 2, 4, 3). 1 → 2 → 3 → 4: a single order.'),
      check('N = 3, edges 1 → 2 and 1 → 3: orders 1, 2, 3 and 1, 3, 2: that is 2 = (3 − 1)! ✔.'),
      slip('Adding edges never <i>increases</i> the number of valid orders, since every edge removes some permutations. So the counts shrink as the graph gets more constrained.'),
    ],
  }),
];

const G1adj = { A: ['B', 'C'], B: ['D', 'F'], C: ['D', 'F'], D: ['E'], E: [], F: ['E'], G: ['C'] };
const topo = (adj, order) => { const seen = new Set(), pushed = []; const dfs = (v) => { seen.add(v); for (const w of adj[v]) if (!seen.has(w)) dfs(w); pushed.push(v); }; for (const v of order) if (!seen.has(v)) dfs(v); return pushed; };
const g1 = topo(G1adj, 'ABCDEFG'.split(''));
const replace = {
  'Topological order of Graph 1': ex({
    chip: ic(3), title: 'Topological order of Graph 1',
    q: 'Find a topological order of Graph 1 (A [B, C], B [D, F], C [D, F], D [E], E [], F [E], G [C]) using the stack-based algorithm from the slides, following alphabetical order.',
    ans: p(`Vertices are pushed in the order <b>${g1.join(', ')}</b>, so popping gives <b>${[...g1].reverse().join(', ')}</b>.`),
    work: [
      ask('Apply the lecture’s topological-sort algorithm exactly: loop over the vertices in alphabetical order; for each unvisited vertex run DFS, exploring neighbours in alphabetical order, and <i>push a vertex only after all its neighbours are done</i>.'),
      theory('<b>Topological sort with a stack.</b> topsort_dfs(v) visits v, recurses on every unvisited neighbour, then pushes v. A vertex is pushed only when everything reachable from it is already on the stack, so popping the stack lists every vertex before the vertices it points to.'),
      step(1, '<b>Start A.</b> Neighbours B, C. Go to B (alphabetical first). B’s neighbours: D, F. Go to D: neighbour E. E has no out-edges: <b>push E</b>. Back in D: <b>push D</b>. Back in B: next neighbour F; its neighbour E is visited, so <b>push F</b>. Then <b>push B</b>.'),
      step(2, 'Back in A: next neighbour C. Its neighbours D and F are both visited, so <b>push C</b>. Then <b>push A</b>.'),
      step(3, 'The outer loop continues: B to F are visited. G is not: its neighbour C is visited, so <b>push G</b>.'),
      table([['Push #', '1', '2', '3', '4', '5', '6', '7'], ['Vertex', ...g1]]),
      step(4, 'Pop everything: <b>' + [...g1].reverse().join(', ') + '</b>.'),
      check('Every edge goes forward: G → C, A → B, A → C, B → D, B → F, C → D, C → F, D → E and F → E ✔.'),
      slip('Several orders are valid. If you explore C before B (as the stack-based DFS of Q1 pops C first), you push E, F, D, C, B, A, G instead and get G, A, B, C, D, F, E. Both are correct topological orders; follow the order of the adjacency list when the question says “alphabetical”.'),
    ],
  }),
  'Topological order of Graph 3': ex({
    chip: ic(7), title: 'Topological order of Graph 3',
    q: 'Find a topological order of Graph 3 (A [B, D], B [C, G], C [D, E, F, G], D [E, G], E [F], F [G], G []) with the stack-based algorithm, taking neighbours in reverse alphabetical order. Is the order unique?',
    ans: p('<b>A, B, C, D, E, F, G</b>. It is the only valid order, because the edges A → B → C → D → E → F → G join consecutive vertices and force a single chain.'),
    work: [
      ask('Run the lecture algorithm, but exploring each vertex’s neighbours in <i>reverse</i> alphabetical order, then decide whether any other order is possible.'),
      theory('<b>Topological sort with a stack</b>: push a vertex after all its neighbours. A topological order is unique when consecutive vertices are linked by edges, because every vertex is then forced to come right after its predecessor.'),
      step(1, 'Reverse alphabetical neighbour lists: A [D, B], B [G, C], C [G, F, E, D], D [G, E], E [F], F [G].'),
      step(2, '<b>DFS(A)</b>: go to D first. D’s neighbours: G first. G has no out-edges: <b>push G</b>. Next D’s neighbour E; E goes to F; F’s neighbour G is visited, so <b>push F</b>, then <b>push E</b>, then <b>push D</b>.'),
      step(3, 'Back in A: next neighbour B. B’s neighbours G (visited) and then C. C’s neighbours G, F, E, D are all visited, so <b>push C</b>, then <b>push B</b>, then <b>push A</b>.'),
      table([['Push #', '1', '2', '3', '4', '5', '6', '7'], ['Vertex', 'G', 'F', 'E', 'D', 'C', 'B', 'A']]),
      step(4, 'Pop: <b>A, B, C, D, E, F, G</b>.'),
      step(5, '<b>Unique?</b> Yes. The edges A → B, B → C, C → D, D → E, E → F and F → G all exist, so A must precede B, B must precede C, and so on: only one arrangement satisfies every one of these constraints.'),
      check('The same order comes out for any neighbour order, which is the sign of a unique topological order.'),
      slip('Reversing the neighbour order changes which branch DFS explores first (D before B here), but never the result when the order is unique.'),
    ],
  }),
};

export default {
  replace,
  week: 10,
  inclassNums: ['1', '2', '3', '5 & 6', '7', '8', '9'],
  inclassMore: more,
};
