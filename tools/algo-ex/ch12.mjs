import { ex, section, ask, theory, step, p, check, slip, why, table, ul, ol, code } from './lib.mjs';
import { graph, join, one } from './svg.mjs';
const sortG = one(graph({ 1: [0, 0.6], 2: [1.3, 0], 3: [2.6, 0], 4: [3.9, 0.6] }, [[1, 2], [2, 3], [3, 4], [1, 3, '', { curve: -30 }], [2, 4, '', { curve: 30 }], [1, 4, '', { curve: 60 }]].map(([a, b, l, o]) => [String(a), String(b), l, o]).filter(Boolean), { directed: true, scale: 62, r: 16 }), 'The graph built from [2, 1, 4, 3]: one edge from each smaller number to each larger one. Its only topological order is 1, 2, 3, 4.', 'Graph for sorting');
const mk = (E, hl) => { const pos = { 1: [0.8, 0], 2: [1.8, 0.9], 3: [1.4, 2.1], 4: [0.2, 2.1], 5: [-0.2, 0.9] }; return graph(pos, E.map(([a, b]) => [String(a), String(b), '', hl && hl.includes(a + '-' + b) ? { hl: true } : {}]), { scale: 52, r: 15, hlEdges: hl }); };
const G1E = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 1], [1, 3]], G2E = [[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]];
const hcpFig = one(join([
  mk(G1E, ['1-2', '2-3', '3-4', '4-5', '5-1']), mk(G2E, [])]), 'Left: G₁ with its Hamiltonian cycle highlighted (1 → 2 → 3 → 4 → 5 → 1). Right: G₂, where vertex 5 has only one edge, so no cycle can pass through it.', 'The two graphs G1 and G2');

const ic = (t) => `IN-CLASS · ${t}`;
const mf = (m, q) => `MOCK FINAL ${m} · Q${q}`;

const inclass = [
  ex({
    chip: ic('SOLVE VS VERIFY'), title: 'Subset sum: check an answer, then find one',
    q: 'Does any non-empty subset of [11, 5, −3, −1, −2, 7, −4] sum to zero? (a) Someone claims {5, −1, −4} works. How much work is it to check? (b) How much work is it to find a zero-sum subset from scratch by brute force?',
    ans: ul(['<b>(a)</b> Check: 5 − 1 − 4 = 0 ✔. One pass over the claimed subset: <b>O(n)</b>.', '<b>(b)</b> Brute force tries every subset: 2ⁿ of them (2⁷ = 128 here), and adding up each costs up to O(n): <b>O(2ⁿ · n)</b>.', 'The four zero-sum subsets are {5, −3, −2}, {5, −1, −4}, {−3, 7, −4} and {−1, −2, 7, −4}.']),
    work: [
      ask('The point of the exercise is the <i>gap</i> between two jobs on the same problem: verifying a proposed answer and finding an answer.'),
      theory('A problem is in <b>NP</b> if a proposed solution can be verified in polynomial time. A problem is in <b>P</b> if it can be solved in polynomial time. Subset sum is in NP, and nobody knows a polynomial algorithm to solve it.'),
      step(1, '<b>(a) Verify.</b> Add the claimed numbers: 5 + (−1) + (−4) = 0. The work is one addition per element of the claimed subset, at most n additions, so <b>O(n)</b>. If the claim were {5, −1}, the sum is 4 ≠ 0 and the check says no immediately.'),
      step(2, '<b>(b) Solve by brute force.</b> Each of the 7 numbers is either in the subset or out, so there are 2⁷ = 128 subsets (127 non-empty). For each you add up to 7 numbers.'),
      table([['n', 'subsets 2ⁿ', 'time at 10⁹ checks per second (rough)'], ['7', '128', 'instant'], ['20', '1,048,576', 'a millisecond'], ['30', '1,073,741,824', 'about a second'], ['60', '≈ 1.2 × 10¹⁸', 'about 36 years']]),
      step(3, 'Brute-force search finds the four zero-sum subsets listed above (any one of them is a correct answer).'),
      check('Verifying cost O(n) while solving cost O(2ⁿ · n). This gap, easy to check but apparently hard to find, is what the class NP describes.'),
      slip('“NP” does not mean “not polynomial”. It means a solution can be verified in polynomial time (non-deterministic polynomial). Every problem in P is also in NP, because you can verify by simply solving again.'),
    ],
  }),
  ex({
    chip: ic('REDUCTION'), title: 'Reduce integer sorting to topological sorting',
    q: 'Show how to sort the array [2, 1, 4, 3] using only an algorithm for topological sorting. State what the vertices and edges are.',
    ans: p('Make each number a vertex and draw an edge u → v whenever u &lt; v. The only topological order of this graph is <b>1, 2, 3, 4</b>, which is the sorted array.'),
    work: [
      ask('We have a black box that solves problem 2 (topological sorting). We must <i>convert</i> an instance of problem 1 (sorting) into an instance of problem 2, run the box, and read the answer back. This conversion is called a <b>reduction</b>.'),
      theory('Problem 1 <b>reduces to</b> problem 2 when every instance of problem 1 can be translated (quickly) into an instance of problem 2 with the same answer. Then problem 1 is no harder than problem 2: an algorithm for problem 2 solves problem 1 as well.'),
      sortG,
      step(1, '<b>Build the graph.</b> Vertices: 2, 1, 4, 3. Add an edge from every smaller number to every larger number: 1 → 2, 1 → 3, 1 → 4, 2 → 3, 2 → 4, 3 → 4 (6 edges, n(n − 1)/2).'),
      step(2, '<b>Run topological sorting.</b> Vertex 1 has no incoming edge; after it comes 2, then 3, then 4. Every pair is joined by an edge, so there is exactly one valid order: 1, 2, 3, 4.'),
      step(3, '<b>Read the answer back.</b> The topological order <i>is</i> the sorted array.'),
      check('The graph has an edge for every pair, so it has a unique topological order (the chapter on graphs counted this: n vertices with an edge between every smaller and larger label give exactly one ordering).'),
      p('<b>What it shows.</b> Sorting is a special case of topological sorting, so if you can solve topological sorting you can sort. It does not say sorting is <i>fast</i> this way: building the graph takes O(n²) here. A reduction is a proof that one problem is no harder than another, not a recommendation to use it.'),
      slip('Reductions point from the problem you want to solve <b>to</b> the problem you have a solver for. Sorting reduces to topological sorting; the reverse is not true.'),
    ],
  }),
  ex({
    chip: ic('REDUCTION'), title: 'Reduce the Hamiltonian cycle problem to TSP, with two instances',
    q: 'The Hamiltonian cycle problem (HCP) asks whether a graph has a cycle visiting every vertex exactly once. Use a TSP solver to answer it for these two graphs on vertices 1 to 5. Graph G₁: edges 1–2, 2–3, 3–4, 4–5, 5–1, 1–3. Graph G₂: edges 1–2, 2–3, 3–4, 4–1, 1–5.',
    ans: ul(['<b>G₁</b>: the shortest TSP tour in G₁′ has length <b>5 = n</b>, so a Hamiltonian cycle exists (1 → 2 → 3 → 4 → 5 → 1).', '<b>G₂</b>: the shortest TSP tour in G₂′ has length <b>6 &gt; n = 5</b>, so there is <b>no</b> Hamiltonian cycle (vertex 5 hangs off vertex 1 by a single edge).']),
    work: [
      ask('TSP needs a <i>complete</i> weighted graph; HCP gives an incomplete unweighted graph. We must translate, solve TSP, and read the HCP answer from the tour length.'),
      theory('<b>Reduction HCP → TSP.</b> Build G′ on the same n vertices: every edge of G gets weight 1 and every missing edge gets weight 2, so G′ is complete. Then G has a Hamiltonian cycle ⇔ the shortest tour in G′ has length exactly n.'),
      hcpFig,
      step(1, '<b>Why that works.</b> Any tour in G′ visits n vertices and uses n edges, so it costs at least n. It costs exactly n only if all n edges have weight 1, i.e. all of them are real edges of G. A tour of cost n is therefore a Hamiltonian cycle in G. If the best tour costs more than n, every tour uses at least one missing edge, so there is none.'),
      step(2, '<b>G₁.</b> Real edges (weight 1): 1–2, 2–3, 3–4, 4–5, 5–1, 1–3. All other pairs (1–4, 2–4, 2–5, 3–5) get weight 2. The tour 1 → 2 → 3 → 4 → 5 → 1 uses edges 12, 23, 34, 45, 51, all weight 1, total <b>5</b>. No tour can cost less than 5, so the shortest is 5 = n: <b>yes</b>.'),
      step(3, '<b>G₂.</b> Real edges: 1–2, 2–3, 3–4, 4–1, 1–5. Vertex 5 has only one real edge (to 1), but a tour must enter and leave 5 using two edges, so at least one of them is a missing edge (weight 2). The best tour is 1 → 2 → 3 → 4 → 5 → 1 with weights 1 + 1 + 1 + 2 + 1 = <b>6</b>. Since 6 &gt; 5: <b>no</b> Hamiltonian cycle.'),
      table([['Graph', 'Shortest TSP tour in G′', 'Compare with n = 5', 'HCP answer'], ['G₁', '5', '= 5', 'yes'], ['G₂', '6', '&gt; 5', 'no']]),
      check('Look at G₂ directly: a Hamiltonian cycle would need vertex 5 to have two neighbours, but 5 has only one ✔. For G₁ the cycle 1–2–3–4–5–1 is visible by inspection ✔.'),
      p('<b>What it shows.</b> A fast TSP algorithm would give a fast HCP algorithm. HCP is known to be NP-complete, so TSP is at least as hard: <b>NP-hard</b>. Reductions run from the known-hard problem (HCP) to the new problem (TSP).'),
      slip('The weights 1 and 2 are not about real distances; they are a trick so that “tour length = n” exactly encodes “every edge used is a real edge”.'),
    ],
  }),
];

const mock = [
  ex({
    chip: mf(1, 7), title: 'Facts about a problem in P and an NP-complete problem',
    q: 'Suppose X is in the class P and Y is NP-complete. Which statements are true? (1) X is in NP. (2) Y is in NP. (3) X is NP-complete. (4) X can be reduced to Y. (5) Y can be reduced to X. Options: (a) 1 and 2 only; (b) 2 and 3 only; (c) 1, 2 and 3 only; (d) 1, 2 and 4 only; (e) 1, 2 and 5 only.',
    ans: '<b>(d)</b>: statements 1, 2 and 4 are true; 3 and 5 are false.',
    work: [
      ask('Judge each statement from the definitions of P, NP and NP-complete. Use the picture: P sits inside NP, and the NP-complete problems are the hardest problems inside NP.'),
      theory('<b>P ⊆ NP.</b> <b>NP-complete</b> = in NP, and <i>every</i> NP problem reduces to it. “A reduces to B” means A is no harder than B, so a solver for B solves A.'),
      table([['#', 'Statement', 'True?', 'Reason'],
        ['1', 'X in NP', '<b>True</b>', 'P ⊆ NP: if you can solve X fast, you can verify an answer by solving again.'],
        ['2', 'Y in NP', '<b>True</b>', 'Being NP-complete includes being in NP.'],
        ['3', 'X is NP-complete', '<b>False</b>', 'Then every NP problem would reduce to X, which is in P, so all of NP would be solvable in polynomial time: P = NP, which is unproven. Treat it as false.'],
        ['4', 'X reduces to Y', '<b>True</b>', 'Every NP problem reduces to an NP-complete problem, and X is in NP.'],
        ['5', 'Y reduces to X', '<b>False</b>', 'Then every NP problem would reduce through Y to X, again giving P = NP.']]),
      step(1, 'The true statements are 1, 2 and 4. Option (d).'),
      check('Rule of thumb: reductions go from easier to harder problems. X (in P) is easier, so X → Y is fine; Y → X would collapse the hierarchy.'),
      slip('Do not tick 3 because “P is inside NP and both are hard”: being in P means a known polynomial algorithm exists, which would make X an NP-complete problem solvable fast, so P would equal NP.'),
    ],
  }),
  ex({
    chip: mf(1, 8), title: 'Good advice for an NP-hard optimisation problem',
    q: 'Someone brings you an NP-hard optimisation problem. Which advice reflects computational thinking? (1) Solve it exactly with backtracking search. (2) Solve it heuristically with a greedy algorithm. (3) Implement it in Python instead of Java. (4) Reduce it to another NP-hard optimisation problem. (5) Reduce another NP-hard optimisation problem to it. Options: (a) 1 and 2; (b) 2 and 3; (c) 1, 2 and 3; (d) 1, 2 and 4; (e) 1, 2 and 5.',
    ans: '<b>(d)</b>: advice 1, 2 and 4.',
    work: [
      ask('Decide which pieces of advice actually help you solve a hard problem in practice.'),
      theory('No known polynomial exact algorithm exists for NP-hard problems. You can (i) solve small inputs exactly, (ii) use heuristics or approximations on large ones, or (iii) <i>reduce</i> your problem to a problem for which good tools already exist. Speed-ups from the programming language do not change growth rates.'),
      table([['#', 'Advice', 'Good?', 'Reason'],
        ['1', 'Exact backtracking search', '<b>Yes</b>', 'Fine when the instance is small; exact answers are guaranteed.'],
        ['2', 'Greedy heuristic', '<b>Yes</b>', 'Fast and often good enough, though with no optimality guarantee.'],
        ['3', 'Python instead of Java', '<b>No</b>', 'The language changes constants, not the complexity class.'],
        ['4', 'Reduce it to another NP-hard problem', '<b>Yes</b>', 'If that problem already has a good heuristic or solver, translating your instance into it lets you reuse that solver.'],
        ['5', 'Reduce another NP-hard problem to it', '<b>No</b>', 'That shows <i>your</i> problem is hard, but it gives you no way to solve it.']]),
      step(1, 'Choose 1, 2 and 4: option (d).'),
      check('Direction matters. In (4) the arrow goes <i>from</i> your problem; in (5) the arrow points <i>into</i> your problem, and a solver for your problem is exactly what you lack.'),
      slip('Mixing up directions of reduction is the commonest error here. Ask: which problem do I already have a solver for? Convert <i>my</i> instance into <i>that</i> problem.'),
    ],
  }),
  ex({
    chip: mf(3, 7), title: 'A problem that reduces to TSP, solved in polynomial time',
    q: 'Hermione finds that a problem X reduces to the Travelling Salesman Problem (TSP), and designs an algorithm solving X in polynomial time. What does this imply? (a) TSP can be solved in polynomial time and she has solved P vs NP. (b) Her discovery must be wrong. (c) X is harder than TSP. (d) TSP is still NP-hard.',
    ans: '<b>(d)</b>: TSP is still NP-hard.',
    work: [
      ask('Work out what “X reduces to TSP” and “X is solved in polynomial time” each say, and whether together they say anything new about TSP.'),
      theory('“X reduces to TSP” means X is no harder than TSP. It says nothing about TSP being easy: a polynomial algorithm for X does not give one for TSP. To solve TSP fast you would need the reduction in the other direction.'),
      table([['Option', 'Verdict', 'Reason'],
        ['(a)', 'False', 'TSP is NP-hard; nothing here gives a fast TSP algorithm. P vs NP is unaffected.'],
        ['(b)', 'False', 'Not wrong. X can be in P: then X is also in NP, and every NP problem reduces to an NP-hard problem such as TSP, so X reduces to TSP. Everything is consistent.'],
        ['(c)', 'False', 'X is in P, so it is easier than TSP, not harder.'],
        ['(d)', '<b>True</b>', 'Nothing has changed: TSP is still NP-hard.']]),
      check('Easy problems reduce to hard ones all the time, for example sorting reduces to topological sorting. Hermione has found an easy problem that can be written as a TSP instance, not a way to solve TSP.'),
      slip('Do not read “X reduces to TSP and X is in P” as “TSP is in P”. The implication runs the other way: <i>if</i> TSP were in P <i>then</i> X would be.'),
    ],
  }),
  ex({
    chip: mf(3, 21), title: 'A tour of exactly three cities: is it hard?',
    q: 'There are n cities 1 … n. A tourist wants the shortest tour that leaves City 1, visits exactly 2 other cities, and returns to City 1. Assuming P ≠ NP, which statement is correct? (a) TSP can be reduced to this problem. (b) This problem is NP-hard. (c) This problem is in P. (d) The number of possible solutions is smaller than for TSP.',
    ans: '<b>(c)</b>: the problem is in P. Enumerating the choices takes O(n⁴) time.',
    work: [
      ask('Count the work of a direct algorithm. If it is polynomial, the problem is in P, and then (under P ≠ NP) it cannot be NP-hard.'),
      theory('A problem solved by a polynomial-time algorithm is in <b>P</b>. NP-hard problems cannot be solved in polynomial time unless P = NP.'),
      step(1, 'Choose the two other cities in order: (n − 1)(n − 2) ways, which is O(n²).'),
      step(2, 'For each choice add three distances (City 1 → a → b → City 1): O(1). Keep the best. That gives O(n²) in total. (The exam key uses a cruder bound of O(n⁴); either way the running time is polynomial.)'),
      step(3, 'So the problem is solved in polynomial time: it is in P.'),
      table([['Option', 'Verdict', 'Reason'],
        ['(a)', 'False', 'TSP is NP-hard. It cannot reduce to a problem in P, otherwise TSP would be solvable in polynomial time (P = NP).'],
        ['(b)', 'False', 'It has a polynomial algorithm, so it is not NP-hard (assuming P ≠ NP).'],
        ['(c)', '<b>True</b>', 'Polynomial algorithm above.'],
        ['(d)', 'False', 'The exam key marks it false: the solutions of this problem are tours of exactly 3 cities, but the question is about hardness, and a count of candidate solutions does not decide membership of P or NP-hard. What matters is that a polynomial algorithm exists.']]),
      check('The number of cities to visit is fixed at 3, so it does not grow with n. Compare TSP, where the tour length is n and the number of tours grows like (n − 1)!.'),
      slip('Do not assume “it looks like TSP, so it is NP-hard”. Fixing the tour length at a constant turns an exponential search into a polynomial one.'),
    ],
  }),
  ex({
    chip: mf(3, 22), title: 'Place problems X and Y in the Venn diagram of complexity classes',
    q: 'X and Y have input size n. The most efficient known algorithm to <i>solve</i> X takes O(n!), and to <i>verify</i> a proposed solution takes O(n⁵). For Y, solving takes O(3ⁿ) and verifying also takes O(3ⁿ). Assuming P ≠ NP, where do X and Y sit?',
    ans: p('<b>X is in NP</b> (it can be verified in polynomial time) and not known to be in P. <b>Y is outside NP</b> (it cannot be verified in polynomial time as far as we know), so Y cannot be NP-complete; it may be NP-hard. This is option (a) in the exam.'),
    work: [
      ask('Use only the two numbers for each problem: how long to solve and how long to verify. Decide which classes each can be in.'),
      theory('<b>P</b>: polynomial-time solvable. <b>NP</b>: polynomial-time verifiable. <b>NP-complete</b> = in NP and NP-hard. A problem outside NP can never be NP-complete.'),
      table([['Problem', 'Solve', 'Verify', 'In P?', 'In NP?', 'NP-complete?'],
        ['X', 'O(n!)', 'O(n⁵)', 'no (factorial is not polynomial)', '<b>yes</b>', 'possible, not forced'],
        ['Y', 'O(3ⁿ)', 'O(3ⁿ)', 'no', '<b>no</b> (verification is exponential)', 'no']]),
      step(1, 'Solving time for X and Y is not polynomial, so neither is known to be in P.'),
      step(2, 'Verification time for X is polynomial (n⁵), so X is in NP. Verification for Y is exponential, so Y is not known to be in NP.'),
      step(3, 'Any NP-complete problem is in NP, so Y cannot be NP-complete. X is in NP but we cannot tell whether it is NP-complete; the only diagram that is consistent places X inside NP (outside P) and Y outside NP.'),
      check('Each fact used is one-directional: “verifiable in polynomial time” puts X in NP, but “verification takes exponential time” only says that <i>this known algorithm</i> is slow, so strictly we say Y is not known to be in NP.'),
      slip('Do not use the solving time to place X in NP or not: NP is about <i>verification</i>. A problem that takes O(n!) to solve is in NP if answers are easy to check.'),
    ],
  }),
];

export default {
  week: 13,
  inclassNew: section({ id: 'ic-new', heading: '📝 In-class exercises', sub: 'Worked from the lecture slides. Attempt it first, then open the answer.', items: inclass }),
  tier1New: section({ id: 't1-new', heading: '📚 Mock final exam questions', sub: 'The P, NP and reduction questions from the mock finals, with the reasoning for every option.', items: mock }),
};
