import { ex, section, ask, theory, step, p, check, slip, why, table, ul, ol, code } from './lib.mjs';
import { graph, one } from './svg.mjs';

// Scout Airways: Singapore in the middle, the nine capitals on a ring in population order
const ring = ['BSB', 'Nay', 'PP', 'KL', 'Man', 'Vie', 'Han', 'Ban', 'Jak'];
const scoutPos = { SG: [0, 0] }; ring.forEach((c, i) => { const a = (-90 + i * 40) * Math.PI / 180; scoutPos[c] = [2.3 * Math.cos(a), 2.3 * Math.sin(a)]; });
const scoutEdges = [...ring.map((c) => ['SG', c, '', { curve: 10 }]), ...ring.slice(0, -1).map((c, i) => [c, ring[i + 1]]), ...['Vie', 'Han', 'Ban', 'Jak'].map((c) => [c, 'SG', '', { curve: 10, cls: 'dg-arr', red: true }])];
const scoutFig = one(graph(scoutPos, scoutEdges, { directed: true, scale: 62, r: 19, cls: { SG: 'dg-h' } }), 'Grey: outbound flights from Singapore (SG) to all nine capitals. Along the ring: the flight to the next-largest population. Dashed red: return flights to Singapore. BSB = Bandar Seri Begawan, Nay = Naypyidaw, PP = Phnom Penh, KL = Kuala Lumpur, Man = Manila, Vie = Vientiane, Han = Hanoi, Ban = Bangkok, Jak = Jakarta.', 'Scout Airways flight graph');
const twoPath = (hl) => one(graph({ A: [0, 1], B: [1.3, 0], C: [2.6, 0], D: [1.3, 2], E: [2.6, 2], F: [3.9, 1] }, [['A', 'B'], ['B', 'C'], ['C', 'F'], ['A', 'D'], ['D', 'E'], ['E', 'F']], { directed: true, scale: 62, hlNodes: hl }), 'Two chains from A to F. The pair B, C and the pair D, E are not ordered relative to each other.', 'Two paths from A to F');
const hexPos = { A: [0, 1], B: [1, 0], F: [2.4, 0], D: [3.4, 1], C: [2.4, 2], E: [1, 2] };
const cycleFig = one(graph(hexPos, [['A', 'B', 2], ['A', 'E', 1], ['A', 'F', 5], ['B', 'D', 3], ['B', 'F', 3], ['D', 'C', 4], ['D', 'F', 3], ['C', 'E', 'new', { cls: 'dg-arr' }]], { scale: 62, hlEdges: ['A-B', 'B-F', 'F-D', 'D-C', 'E-A'] }), 'Graph G plus the new edge C – E (dashed red). The highlighted edges form the cycle A → B → F → D → C → E → A. Edge labels are weights.', 'Graph G with the added edge');
const courseFig = one(graph({ '1A': [0, 0], '1B': [0, 1.4], '1C': [0, 2.8], '2A': [1.5, 0.4], '2B': [1.5, 2.1], '3A': [3, 0], '3B': [3, 1.2], '3C': [3, 2.4] }, [['1A', '2A'], ['1B', '2A'], ['1B', '2B'], ['1C', '2B'], ['2A', '3A'], ['2A', '3B'], ['2A', '3C'], ['2B', '3B'], ['1C', '3C', '', { curve: 30 }]], { directed: true, scale: 62, r: 20 }), 'Prerequisite graph of the certificate. An edge a → b means “a must come before b”.', 'Prerequisite graph');

const t1 = (n) => `TUTORIAL 9 · TIER 1 · Q${n}`;
const t2 = (n) => `TUTORIAL 9 · TIER 2 · Q${n}`;

const tier1More = [
  ex({
    chip: t1(1), title: 'Scout Airways: draw the flight graph',
    q: 'Scout Airways flies from Singapore to every ASEAN capital. A capital has a return flight to Singapore only if its population is larger than Singapore’s; otherwise you must first fly to another capital that has a return flight. There is always a flight from any capital (other than Singapore) to the capital with the next largest population. Draw the directed graph: vertices are the capitals, and there is an edge a → b exactly when there is a flight from a to b.',
    ans: scoutFig + p('Adjacency list (21 edges):') + code('Singapore            -> Jakarta, Kuala Lumpur, Bangkok, Manila, Bandar Seri Begawan, Hanoi, Phnom Penh, Vientiane, Naypyidaw\nBandar Seri Begawan  -> Naypyidaw\nNaypyidaw            -> Phnom Penh\nPhnom Penh           -> Kuala Lumpur\nKuala Lumpur         -> Manila\nManila               -> Vientiane\nVientiane            -> Singapore, Hanoi\nHanoi                -> Singapore, Bangkok\nBangkok              -> Singapore, Jakarta\nJakarta              -> Singapore', 'adjacency list')
      + p('Shape: a <b>fan</b> out of Singapore to all nine capitals, one <b>chain</b> from the smallest capital to the largest, and a <b>return edge</b> to Singapore from the four biggest capitals.'),
    work: [
      ask('Turn three sentences of English into three kinds of edges. The vertices are Singapore and the nine other capitals; every flight is a <b>directed</b> edge because a flight from a to b does not mean there is one back.'),
      theory('A <b>directed graph</b> stores each flight as an ordered pair (from, to). Writing an <b>adjacency list</b> means listing, for every vertex, the vertices it has an edge to.'),
      step(1, '<b>Outbound edges.</b> Singapore flies to all nine capitals, so Singapore has out-degree 9 and these nine edges.'),
      step(2, '<b>The population chain.</b> Sort the nine capitals by population. “A flight from any capital to the one with the next largest population” gives one edge from each capital to the next one up. Reading the answer key, the order from smallest to largest is Bandar Seri Begawan, Naypyidaw, Phnom Penh, Kuala Lumpur, Manila, Vientiane, Hanoi, Bangkok, Jakarta. That gives 8 chain edges: BSB → Naypyidaw → Phnom Penh → Kuala Lumpur → Manila → Vientiane → Hanoi → Bangkok → Jakarta.'),
      step(3, '<b>Return flights.</b> Only capitals with a population larger than Singapore’s fly back to Singapore directly. In the answer key these are Vientiane, Hanoi, Bangkok and Jakarta, so each of them gets one edge to Singapore: 4 edges. The five smaller capitals (BSB, Naypyidaw, Phnom Penh, Kuala Lumpur, Manila) have no direct return.'),
      step(4, 'Count: 9 + 8 + 4 = 21 edges ✔ (matches the adjacency list).'),
      check('Start at Bandar Seri Begawan, the smallest capital, and follow edges: it reaches Singapore only after climbing the chain up to Vientiane, which is the first capital that flies back. This is exactly what the question says: smaller capitals must hop through other capitals first.'),
      slip('The chain does not include Singapore: Singapore is not a capital with “next largest population” edges, it only has the nine outbound edges. Also remember the edges are one-way; Singapore → Jakarta and Jakarta → Singapore are two separate edges.'),
    ],
  }),
  ex({
    chip: t1(5), title: 'Topological ordering of two parallel paths',
    q: 'A graph has six vertices A to F. There are exactly two paths from A to F: (A, B, C, F) and (A, D, E, F). Every edge belongs to one of these paths. (a) If you run a topological sorting algorithm, what ordering do you get? (b) Could more than one output be possible? What decides which one you get?',
    ans: p('<b>(a)</b> For example <b>A, B, C, D, E, F</b>.') + p('<b>(b)</b> Yes. Six orderings are valid: A is always first and F is always last; B must come before C and D before E, but the pair (B, C) and the pair (D, E) can be interleaved in any way. Which one the algorithm outputs depends on the <b>order of the adjacency lists</b> (and the order in which it picks the starting vertices).'),
    work: [
      ask('Draw the graph first, then write down the <i>only</i> constraints a topological order must obey: for every edge u → v, u comes before v.'),
      theory('A <b>topological order</b> lists all vertices of a DAG so that every edge points forward. Different valid lists exist whenever two vertices are not forced to be in a particular order.'),
      twoPath([]),
      step(1, 'Edges: A → B, B → C, C → F, A → D, D → E, E → F (six edges, two branches that split at A and join at F).'),
      step(2, 'Constraints: A before B, B before C, C before F, A before D, D before E, E before F. So A is first and F is last (every other vertex lies on a path between them). The only free choice is how to interleave the two chains B → C and D → E.'),
      step(3, 'Count the interleavings: choose which 2 of the 4 middle positions hold B and C (the rest hold D and E, in order). That is 4 choose 2 = <b>6</b> orderings:'),
      code('A B C D E F\nA B D C E F\nA B D E C F\nA D B C E F\nA D B E C F\nA D E B C F', 'the 6 valid orders'),
      step(4, '<b>What decides the output?</b> The DFS-based algorithm visits neighbours in adjacency-list order and starts new searches in vertex order, and the order produced reverses the finishing order. With A’s list [D, B] the DFS first goes A → D → E → F, then A → B → C, which reverses into A, B, C, D, E, F. With A’s list [B, D] you would get A, D, E, B, C, F instead. A queue-based algorithm (Kahn) also depends on the order in which the vertices with in-degree 0 are queued.'),
      check('Verify one answer, A, D, E, B, C, F: A→B (A is at position 1, B at 4) ✔, B→C ✔, C→F ✔, A→D ✔, D→E ✔, E→F ✔.'),
      slip('Do not say “the answer is unique”. A topological order is unique only if the graph has a Hamiltonian path in it (every consecutive pair of vertices is joined by an edge), which this graph does not.'),
    ],
  }),
];

const tier2 = [
  ex({
    chip: t2(6), title: 'Who knows whom at a party: directed or undirected?',
    q: 'You want to track who knows whom at a friend’s birthday party. Should you use a directed or an undirected graph? Can it have cycles?',
    ans: p('Use an <b>undirected</b> graph: vertices are the guests, and an edge joins two guests who know each other. <b>Yes, it can have cycles</b>: if Ann knows Ben, Ben knows Cai and Cai knows Ann, they form a cycle.') + p('If “knows” can be one-sided (you know a celebrity who does not know you), use a <b>directed</b> graph instead, which can also contain cycles.'),
    work: [
      ask('Pick the graph type from the meaning of the relationship: is “knows” the same in both directions, and can following the relationship bring you back to where you started?'),
      theory('An <b>undirected</b> graph has symmetric edges (if a is joined to b then b is joined to a). A <b>directed</b> graph has one-way edges. A <b>cycle</b> is a path that returns to its start vertex.'),
      step(1, '“Alice knows Bob” normally means “Bob knows Alice” as well, so the relationship is symmetric. One undirected edge captures both directions with half the bookkeeping of two directed edges.'),
      step(2, 'Cycles: in a group of friends it is very common that three people all know each other. Edges Ann–Ben, Ben–Cai, Cai–Ann form a cycle of length 3. Nothing in the problem prevents this, so cycles are allowed.'),
      step(3, 'The exception: if you want to track one-sided knowledge (“I know of the host”), a directed graph is needed. Even then cycles are possible (Ann → Ben → Cai → Ann).'),
      check('Contrast with the prerequisite graph of courses: there a cycle would be impossible (a course cannot be required before itself), so that graph must be a DAG. A friendship graph has no such restriction.'),
      slip('Do not think “no cycles” just because most graphs in lecture were DAGs. DAG is a special case, not the default.'),
    ],
  }),
  ex({
    chip: t2(8), title: 'Add one edge to create a cycle through every vertex',
    q: 'G is a weighted undirected graph with adjacency list: A: (B, 2) (E, 1) (F, 5); B: (A, 2) (D, 3) (F, 3); C: (D, 4); D: (B, 3) (C, 4) (F, 3); E: (A, 1); F: (A, 5) (B, 3) (D, 3). A simple cycle goes through each of its nodes exactly once. Add one edge so that the graph contains a simple cycle that goes through all the nodes.',
    ans: p('Add the edge <b>C – E</b> (any weight). Then the cycle <b>A → B → F → D → C → E → A</b> visits all six vertices exactly once.'),
    work: [
      ask('We need a cycle that passes through <b>all six</b> vertices, using each exactly once, and we may add only one new edge.'),
      theory('In a simple cycle through all vertices, every vertex has exactly two cycle edges attached to it, so <b>every vertex must have degree at least 2</b> in the final graph.'),
      cycleFig,
      step(1, 'Count degrees in G: A has 3 (B, E, F), B has 3 (A, D, F), D has 3 (B, C, F), F has 3 (A, B, D), but <b>C has 1</b> (only D) and <b>E has 1</b> (only A).'),
      step(2, 'C and E each have degree 1, so each needs at least one more edge. A single new edge can serve both only if it joins C and E. So the new edge must be <b>C – E</b>.'),
      step(3, 'Check that it works: C – E gives C the neighbours {D, E} and E the neighbours {A, C}. Walk: start at A, go to B (edge A–B), then F (B–F), then D (F–D), then C (D–C), then E (the new edge C–E), then back to A (E–A).'),
      code('A -> B -> F -> D -> C -> E -> A\n    2    3    3    4    new   1', 'the cycle (edge weights)'),
      check('All six vertices appear once: A, B, F, D, C, E ✔. Every consecutive pair is an edge of G or the new edge ✔. The cycle closes at A ✔.'),
      slip('Joining C or E to a different vertex (for example C – A) fixes only one of them; the other stays at degree 1 and the cycle cannot pass through it.'),
    ],
  }),
  ex({
    chip: t2(9), title: 'Plan eight terms of a marketing certificate',
    q: 'A marketing certificate has three levels. Level 1: 1A, 1B, 1C (no prerequisites). Level 2: 2A needs 1A and 1B; 2B needs 1B and 1C. Level 3: 3A, 3B, 3C all need 2A; in addition 3B needs 2B and 3C needs 1C. You take one course per term over eight terms. Give one valid sequence.',
    ans: p('One valid sequence: <b>1A, 1B, 1C, 2A, 2B, 3A, 3B, 3C</b>.'),
    work: [
      ask('Eight courses, one per term, so the plan is a <b>topological ordering</b> of the prerequisite graph: every course must come after all its prerequisites.'),
      theory('Draw an edge from each prerequisite to the course that needs it. A valid study plan is a topological order of this directed acyclic graph.'),
      courseFig,
      step(1, 'Edges: 1A → 2A, 1B → 2A, 1B → 2B, 1C → 2B, 2A → 3A, 2A → 3B, 2A → 3C, 2B → 3B, 1C → 3C (9 edges).'),
      step(2, 'Courses with no incoming edge can start: 1A, 1B, 1C. Take them first (any order).'),
      step(3, 'After 1A and 1B, course 2A is available; after 1B and 1C, 2B is available. Take 2A, then 2B.'),
      step(4, 'Now 3A (needs 2A), 3B (needs 2A and 2B) and 3C (needs 2A and 1C) are all available. Take them in any order.'),
      table([['Term', 'Course', 'Prerequisites already done'],
        ['1', '1A', 'none'], ['2', '1B', 'none'], ['3', '1C', 'none'], ['4', '2A', '1A, 1B'], ['5', '2B', '1B, 1C'], ['6', '3A', '2A'], ['7', '3B', '2A, 2B'], ['8', '3C', '2A, 1C']]),
      check('Each row’s prerequisites appear in earlier rows ✔. Another valid answer is 1B, 1A, 2A, 1C, 2B, 3C, 3B, 3A; there are many.'),
      slip('Do not take 2B before 1C, and do not take 3B before <i>both</i> 2A and 2B. A third-level course can need courses from <i>two</i> different levels (3C needs 2A and 1C).'),
    ],
  }),
  ex({
    chip: t2(10), title: 'The graph with an edge from every smaller label to every larger one',
    q: 'A graph has n vertices labelled 1, 2, …, n, and an edge from vertex i to vertex j whenever i < j. (a) How many edges does it have? (b) Does it contain a cycle? (c) How many topological orderings does it have?',
    ans: p('<b>(a)</b> n(n − 1)/2 edges. <b>(b)</b> No cycle (it is a DAG). <b>(c)</b> Exactly <b>one</b> topological ordering: 1, 2, …, n.'),
    work: [
      ask('Count the pairs, argue about cycles from the direction of the edges, and use the edges to see how much freedom a topological order has.'),
      theory('A directed graph with an edge for every pair (i, j) with i &lt; j has one edge per <i>unordered pair</i> of vertices, because for each pair only the smaller-to-larger direction exists.'),
      step(1, '<b>(a) Edges.</b> The number of unordered pairs is n choose 2 = n(n − 1)/2. Check with n = 4: edges 1→2, 1→3, 1→4, 2→3, 2→4, 3→4 = 6 = 4·3/2 ✔.'),
      step(2, '<b>(b) Cycles.</b> Every edge goes from a smaller label to a larger one, so following edges makes the label strictly increase. A cycle would have to return to its starting label, which is impossible. Hence there is <b>no cycle</b>.'),
      step(3, '<b>(c) Topological orderings.</b> Every pair i &lt; j is joined by an edge i → j, so i must come before j in every valid order. All pairs are forced, which leaves exactly one order: 1, 2, 3, …, n.'),
      check('n = 3: edges 1→2, 1→3, 2→3. The order 1, 3, 2 breaks 2→3; 2, 1, 3 breaks 1→2. Only 1, 2, 3 works ✔.'),
      slip('A graph with many edges can have a unique topological order, while a graph with few edges has many orders. In the extreme, n vertices with no edges at all have n! orders; here, the maximum number of edges for a DAG gives exactly 1.'),
    ],
  }),
];

export default {
  week: 9,
  tier1Nums: [2, 3, 4],
  tier1More,
  tier2: section({ id: 'tut-t2', heading: '📚 Tutorial questions: tier 2', sub: 'The harder tutorial questions from week 9, with the answer worked out.', items: tier2 }),
};
