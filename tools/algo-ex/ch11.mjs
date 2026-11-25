import { ex, section, ask, theory, step, p, check, slip, why, table, ul, ol, code } from './lib.mjs';
import { join, one, tour } from './svg.mjs';
const PTS = { P0: [2, 3], P1: [1, 0], P2: [6, 7], P3: [2, 2], P4: [0, 6], P5: [3, 2] };
const twoOptFig = one(join([tour(PTS, ['P0', 'P2', 'P4', 'P1', 'P3', 'P5'], { scale: 26, title: '2-opt stops here: 22.47' }), tour(PTS, ['P0', 'P3', 'P1', 'P5', 'P2', 'P4'], { scale: 26, title: 'best tour: 21.58', cls: 'dg-cg' })]), 'The same six cities, two tours. Left: no single 2-opt move shortens it, so 2-opt stops. Right: the best tour, which differs in more than two edges.', 'Two tours of six points');

const t2 = (n) => `TUTORIAL 11 · TIER 2 · Q${n}`;
const ic = (t) => `IN-CLASS · ${t}`;

const twoOpt = [
  ex({
    chip: ic('2-OPT'), title: 'Five questions about 2-opt local search',
    q: 'For the 2-opt neighbourhood: (a) What is the work per iteration? (b) If 2-opt only stops at a local optimum, what is the overall complexity? (c) Could 2-opt run forever? (d) Give a scenario in which 2-opt stops with an optimal tour. (e) Give a scenario in which it stops, with no improving move left, but the tour is not optimal.',
    ans: ul(['<b>(a)</b> O(n²) per iteration: there are n(n − 3)/2 pairs of edges to try, and each one is judged in O(1).', '<b>(b)</b> O(n²) × (number of iterations). Each iteration strictly shortens the tour; the number of iterations is not bounded by a small polynomial in the worst case, but is usually modest in practice.', '<b>(c)</b> No: every accepted move strictly reduces the length and there are only finitely many tours, so the loop must end.', '<b>(d)</b> For example 4 cities in convex position: the only non-crossing tour is the optimal one.', '<b>(e)</b> The 6-city example below: the 2-opt local optimum is 22.47 but the best tour is 21.58.']),
    work: [
      ask('These five questions test whether you understand what 2-opt <i>does</i> (delete two edges and reconnect by reversing a segment) and what it <i>guarantees</i> (only a local optimum).'),
      theory('<b>2-opt local search.</b> Start from any complete tour. A <b>neighbour</b> of the tour is what you get by removing two edges and reconnecting the two pieces the other way. Move to a better neighbour while one exists; stop when none is better (a <b>local optimum</b>).'),
      step(1, '<b>(a) Work per iteration.</b> Choose 2 of the n edges that do not share a city: n(n − 3)/2 choices (for n = 6 that is 9). The new length is found from four distances (old two removed, new two added), which is O(1). So scanning all neighbours costs O(n²).'),
      step(2, '<b>(b) Overall.</b> Total work = (number of improving moves) × O(n²). The number of moves is data-dependent. It is finite, but there is no small guaranteed bound, so the honest answer is “O(n²) per iteration times the number of iterations”.'),
      step(3, '<b>(c) Can it loop forever?</b> No. A move is accepted only if the tour gets strictly shorter. A tour can never repeat (its length would have to be strictly smaller than itself), and there are only (n − 1)!/2 distinct tours, so the process must stop.'),
      step(4, '<b>(d) Stops at an optimum.</b> With 4 cities at the corners of a rectangle, the best tour is the perimeter. A tour with a crossing (a “bow tie”) is longer, and one 2-opt move removes the crossing and gives the perimeter. Any instance with cities on a convex polygon also works, because the uncrossed tour is optimal.'),
      step(5, '<b>(e) Stops but not optimal.</b> Take these six points: P0 (2, 3), P1 (1, 0), P2 (6, 7), P3 (2, 2), P4 (0, 6), P5 (3, 2).'),
      twoOptFig,
      table([['Tour', 'Order', 'Length (straight-line)'], ['2-opt local optimum (no improving move)', 'P0 → P2 → P4 → P1 → P3 → P5 → P0', '22.47'], ['Best tour (checked over all 120)', 'P0 → P3 → P1 → P5 → P2 → P4 → P0', '21.58']]),
      p('Every 2-opt move from the first tour makes it longer or leaves it the same, yet a different tour is shorter. To reach it you would have to change more than two edges at once.'),
      check('The conclusion for the exam: 2-opt is fast and always terminates, but it only guarantees a <b>local</b> optimum, never a global one.'),
      slip('“No crossing edges” is not the same as “optimal”. Removing every crossing makes the tour a local optimum for 2-opt, but a better non-crossing tour can still exist.'),
    ],
  }),
];

const tier2 = [
  ex({
    chip: t2(6), title: 'TSP for 20 cities when the tour does not return',
    q: 'Suppose we solve the TSP for 20 cities, but the tour must cover all cities without returning to the starting point. How many possible routes must be examined if (a) distances are symmetric (A to B equals B to A)? (b) distances differ by direction?',
    ans: p('<b>(a)</b> 20!/2 routes. <b>(b)</b> 20! routes.') + p('(If the starting city is fixed in advance, the counts are 19! in both cases.)'),
    work: [
      ask('Compare with the usual round-trip count (19!/2 and 19!). What changes when the tour is a <i>path</i> that ends where it ends, instead of a cycle?'),
      theory('A route that visits every city once is an ordering (permutation) of the cities. A round trip is a <i>cycle</i>, so rotating the starting city gives the same tour. A path has a first and a last city, so rotations are different routes.'),
      step(1, '<b>Count all orderings.</b> With no requirement to return and no fixed start, every permutation of the 20 cities is a different route: 20! of them.'),
      step(2, '<b>(b) Asymmetric distances.</b> Reversing a path changes its length (A → B is not B → A), so all 20! orderings are different routes to check: <b>20!</b>.'),
      step(3, '<b>(a) Symmetric distances.</b> Reversing a path gives the same length, so each route and its mirror image are one and the same: 20!/2.'),
      table([['Version', 'Symmetric', 'Asymmetric'], ['Round trip (Q1)', '19!/2', '19!'], ['Path, no return, start free', '20!/2', '20!'], ['Path, no return, start fixed', '19!', '19!']]),
      check('Sanity check with 3 cities A, B, C and symmetric distances, no return, start free: the orderings ABC, ACB, BAC, BCA, CAB, CBA make 6 = 3!, and each path equals its mirror (ABC = CBA, ACB = BCA, BAC = CAB), leaving 3 = 3!/2 ✔.'),
      slip('For a path with a fixed start and symmetric distances you do <b>not</b> divide by 2: with the start fixed, a route and its reverse begin at different cities, so they are not the same route.'),
    ],
  }),
  ex({
    chip: t2(7), title: 'Complexities of the two greedy TSP algorithms',
    q: 'What are the time complexities of the first greedy algorithm (nearest neighbour) and the second greedy algorithm (cheapest-side insertion) for the TSP?',
    ans: p('Greedy 1 (nearest neighbour): <b>O(n²)</b>. Greedy 2 (cheapest-side insertion): <b>O(n³)</b>.'),
    work: [
      ask('Count how many distance comparisons each algorithm makes in total. Do it round by round.'),
      theory('Sum the work done in each round. A sum like 1 + 2 + … + (n − 1) grows like n²; a sum like n·1 + (n − 1)·2 + … grows like n³.'),
      p('<b>Greedy 1: nearest neighbour.</b> The tour T starts with 1 city; S holds the other n − 1.'),
      table([['Round', 'Cities left in S', 'Comparisons to find the nearest (from the last city)'], ['1', 'n − 1', 'n − 1'], ['2', 'n − 2', 'n − 2'], ['…', '…', '…'], ['n − 1', '1', '1']]),
      p('Total = (n − 1) + (n − 2) + … + 1 = n(n − 1)/2, which is <b>O(n²)</b>.'),
      p('<b>Greedy 2: cheapest-side insertion.</b> First pick the closest pair of cities: n choose 2 comparisons. Then each round must find the smallest distance between <i>any</i> city already in the tour and <i>any</i> city outside it.'),
      table([['Tour size', 'Cities in S', 'Comparisons'], ['2', 'n − 2', '2 × (n − 2)'], ['3', 'n − 3', '3 × (n − 3)'], ['4', 'n − 4', '4 × (n − 4)'], ['…', '…', '…'], ['n − 1', '1', '(n − 1) × 1']]),
      p('Total = n(n − 1)/2 + 2(n − 2) + 3(n − 3) + … + (n − 1) × 1. The sum of k(n − k) over k is about n³/6, so the algorithm is <b>O(n³)</b>. (The insertion step itself, looking at the two sides of one city, is only O(1) per round.)'),
      check('Order of magnitude check for n = 100: greedy 1 makes about 5,000 comparisons, greedy 2 about 170,000; brute force would have to examine 99!/2 tours.'),
      slip('Do not say O(n) for greedy 1 just because it “goes through the cities once”: at every step it scans all the remaining cities to find the nearest, which makes it quadratic.'),
    ],
  }),
  ex({
    chip: t2(9), title: 'Greedy coin change in the Kingdom of Shrek',
    q: 'The coins are 1 dollar (100 cents), 60 cents, 35 cents, 5 cents and 1 cent. The greedy rule always returns the largest coin that fits. For $2.65 it gives 100 + 100 + 60 + 5 = 4 coins, which is optimal. (a) Give another amount for which greedy is optimal. (b) Give an amount for which greedy fails.',
    ans: ul(['<b>(a)</b> 65 cents: greedy gives 60 + 5 = 2 coins, and one coin cannot make 65, so 2 is optimal.', '<b>(b)</b> 70 cents: greedy gives 60 + 5 + 5 = 3 coins, but 35 + 35 = 2 coins. Greedy fails. (75 cents also fails: greedy 60 + 5 + 5 + 5 = 4 coins; best 35 + 35 + 5 = 3 coins.)']),
    work: [
      ask('Run the greedy rule yourself and compare with the best possible number of coins. For (a) we need an amount where they agree; for (b) one where greedy uses more coins than necessary.'),
      theory('<b>Greedy change</b>: repeatedly take the largest coin not exceeding what is left. It is optimal for “nice” coin systems (like 20, 10, 5, 1), but not for every system. A large coin can leave a remainder that needs many small coins.'),
      step(1, '<b>(a)</b> 65 cents. Largest coin ≤ 65 is 60 → remainder 5. Largest coin ≤ 5 is 5 → remainder 0. Greedy = 2 coins. Could 1 coin do it? No coin is worth 65, so 2 is the minimum ✔.'),
      step(2, '<b>(b)</b> 70 cents. Largest coin ≤ 70 is 60 → remainder 10. Largest coin ≤ 10 is 5 → remainder 5, then 5 again → 0. Greedy = 60 + 5 + 5 = <b>3 coins</b>.'),
      step(3, 'Look for something better: 35 + 35 = 70 uses <b>2 coins</b>. The optimum is 2, greedy found 3, so greedy fails.'),
      table([['Amount', 'Greedy', 'Coins', 'Optimal', 'Coins'], ['65', '60 + 5', '2', '60 + 5', '2'], ['70', '60 + 5 + 5', '3', '35 + 35', '2'], ['75', '60 + 5 + 5 + 5', '4', '35 + 35 + 5', '3']]),
      p('<b>Why it fails.</b> Taking the 60-cent coin “wastes” the chance to use the 35-cent coin twice. The 35 does not divide nicely into 60 (60 = 35 + 25, and 25 needs five 5-cent coins).'),
      check('You can find failures systematically: a greedy failure needs an amount where the greedy coin leaves a remainder that is expensive. Try amounts just above the second-largest coin multiples: 70, 71 (greedy 60 + 5 + 5 + 1 = 4 coins, best 35 + 35 + 1 = 3).'),
      slip('Do not propose an amount like 35. Greedy takes 35 immediately (1 coin, optimal), so it does not fail there. Failures start at 70.'),
    ],
  }),
  ex({
    chip: t2(10), title: 'Assign skis to skiers to minimise the total mismatch',
    q: 'A ski team has 5 skiers of heights h1 … h5 and 5 skis of lengths l1 … l5. Assign one ski to each skier so that the sum of the absolute differences |height − length| is as small as possible. Describe a greedy algorithm for a good assignment and give its worst-case complexity.',
    ans: p('<b>Sort the skiers by height and the skis by length, then give the i-th shortest ski to the i-th shortest skier.</b> Complexity: <b>O(n log n)</b> (the cost of sorting).') + p('A second greedy idea, “repeatedly pair the closest unmatched skier and ski”, costs <b>O(n³)</b> if the pair scan is done naively, and it can fail.'),
    work: [
      ask('There are n! assignments, so brute force is hopeless for large teams. We want a rule that picks pairs without looking at all of them.'),
      theory('<b>Greedy algorithm</b>: build the answer one decision at a time, and never undo a decision. We must decide <i>what to be greedy about</i>.'),
      p('<b>Greedy A: sort both lists and match in order.</b>'),
      step(1, 'Sort the skiers by height h and the skis by length l, both ascending.'),
      step(2, 'Give the shortest ski to the shortest skier, the second shortest to the second shortest, and so on. Cost: two sorts, O(n log n), plus one pass, O(n), so O(n log n) in total.'),
      step(3, '<b>Example.</b> Skiers 160, 170, 180; skis 165, 168, 185. Sorted pairs: (160, 165) → 5, (170, 168) → 2, (180, 185) → 5. Total 12.'),
      p('<b>Why it is not just “reasonable” but optimal (exchange argument).</b> Suppose two pairs cross: a shorter skier h1 &lt; h2 has the longer ski l1 &gt; l2. Swapping to (h1, l2) and (h2, l1) never increases |h1 − l1| + |h2 − l2|. Repeating this uncrosses every pair, giving the sorted matching. So sorted matching is at least as good as any other.'),
      p('<b>Greedy B: closest pair first.</b>'),
      step(4, 'Among all unmatched (skier, ski) pairs, take the pair with the smallest |height − length|, match it, remove both, repeat n times. Each round scans up to n² pairs, so n rounds cost about n² + (n − 1)² + … = O(n³).'),
      step(5, '<b>Greedy B can fail.</b> Skiers 4 and 7, skis 1 and 5. The closest pair is (4, 5) with difference 1; then the leftover is (7, 1), difference 6. Total 7. But (4, 1) and (7, 5) cost 3 + 2 = 5. Greedy B is worse than Greedy A, which gives (4, 1) and (7, 5) = 5.'),
      table([['Algorithm', 'Complexity', 'Always optimal?'], ['A: sort and match in order', 'O(n log n)', 'Yes (exchange argument)'], ['B: closest pair first', 'O(n³) naive', 'No (4, 7 against 1, 5)']]),
      check('For the five-skier case: 120 assignments for brute force, but two sorts of 5 numbers for greedy A.'),
      slip('“Matching tallest with longest” is the same as sorted matching; “matching tallest with shortest” is the opposite idea and is the <i>worst</i> assignment, not a heuristic.'),
    ],
  }),
];

export default {
  week: 11,
  inclassMore: twoOpt,
  tier2: section({ id: 'tut-t2', heading: '📚 Tutorial questions: tier 2', sub: 'The harder tutorial questions from week 11, with the answer worked out.', items: tier2 }),
};
