import { ex, section, ask, theory, step, p, check, slip, why, table, ul, code } from './lib.mjs';

const chip = (n) => `TUTORIAL 2 · TIER 2 · Q${n}`;

const items = [
  ex({
    chip: chip(7), title: 'A table that stops growing',
    q: 'A table lists the number of times an operation is performed for each input size n. For the first few values of n the count rises (1, 2, 3, 4, 5, 6, …), but from n = 20 onwards it is 50 for every n listed: 21, 22, 23, …, 500, 501, 502, …, 1000, 1001, 1002, and every other n above 1002. What is the Big O complexity?',
    ans: `<code>O(1)</code>: constant. The count never exceeds 50, however large n becomes.`,
    work: [
      ask('Big O describes what happens for <b>very large n</b>. So ignore the early rows and ask: as n keeps growing, what does the count do?'),
      theory('Growth rate and Big O: only the behaviour as n → ∞ matters, and constants are dropped. A bounded count is the smallest growth class, O(1).'),
      step(1, 'Look at the far end of the table: n = 500, 501, 502, 1000, 1001, 1002 and “every other n above 1002” all give exactly <b>50</b>.'),
      step(2, 'The count never goes above 50. A quantity that is bounded by a fixed number, whatever n is, is <b>constant</b>.'),
      step(3, 'The early rows (1, 2, 3, … up to 50) are a start-up effect on small inputs. Big O is only about large inputs, so they do not change the answer.'),
      p('Formally: choose c = 50 and n₀ = 1. Then count(n) ≤ 50 · 1 for every n ≥ n₀, which is exactly the definition of <code>count = O(1)</code>.'),
      slip('Do not call it O(n) because the first few rows look linear. Compare Q1 in Tier 1, where the count was n + 9 and never stopped growing: that is O(n). Here the growth stops.'),
    ],
  }),
  ex({
    chip: chip(8), title: 'Simplify eight step-count expressions',
    q: 'Each expression gives the number of steps for a problem of size N. Give the simplified Big O: (a) 2N² + 2N³ + 3N⁴; (b) N² × 2^(N−3); (c) N! × 100N²⁰; (d) 5 × (2N)!; (e) N·log₂N + N·log₃N + N·log₄N; (f) N·log₂(2N); (g) 1000 + 5·log N + 2N + N² + 2^(2N); (h) log(N⁵) + log₅(N) + 5N.',
    ans: table([['Part', 'Simplified Big O'], ['(a)', 'O(N⁴)'], ['(b)', 'O(N² · 2^N)'], ['(c)', 'O(N! · N²⁰)'], ['(d)', 'O((2N)!)'], ['(e)', 'O(N log N)'], ['(f)', 'O(N log N)'], ['(g)', 'O(2^(2N)) = O(4^N)'], ['(h)', 'O(N)']]),
    work: [
      ask('Apply the same two rules to every part: <b>(1) drop constant factors</b>, <b>(2) keep only the dominating term</b> (the one that grows fastest). Product terms are kept whole; you only drop a factor if it is a pure constant.'),
      p('<b>Growth ladder, slowest to fastest:</b> 1 &lt; log N &lt; √N &lt; N &lt; N log N &lt; N² &lt; N³ &lt; 2^N &lt; N! &lt; N^N.'),
      step('a', '2N² + 2N³ + 3N⁴. The highest power wins: 3N⁴. Drop the constant 3: <b>O(N⁴)</b>.'),
      step('b', 'N² × 2^(N−3) = N² × 2^N / 8. The 1/8 is a constant, so it disappears, but N² multiplies 2^N and is <i>not</i> a constant. Answer <b>O(N² · 2^N)</b>.'),
      step('c', 'N! × 100N²⁰: drop the constant 100, keep both factors: <b>O(N! · N²⁰)</b>. You cannot absorb N²⁰ into N! because it is multiplied, not added.'),
      step('d', '5 × (2N)!: drop the 5: <b>O((2N)!)</b>. Note (2N)! is a much bigger function than N!, so do not “simplify” it to O(N!).'),
      step('e', 'log₃N = log₂N / log₂3 and log₄N = log₂N / 2. A change of base only multiplies by a constant. So all three terms are constant multiples of N log N: <b>O(N log N)</b>.'),
      step('f', 'N·log₂(2N) = N·(log₂2 + log₂N) = N·(1 + log₂N) = N + N log₂N. The N log N term dominates: <b>O(N log N)</b>.'),
      step('g', 'Compare the terms: constant, log N, N, N² and 2^(2N). The exponential wins. Since 2^(2N) = (2²)^N = 4^N, the answer is <b>O(2^(2N))</b>, which is the same class as O(4^N).'),
      step('h', 'log(N⁵) = 5 log N (power rule for logs), log₅N is a constant times log N, and 5N is linear. The linear term dominates: <b>O(N)</b>.'),
      check('Quick test for dominance: divide the big term by the small one. If the ratio grows without bound as N grows, the numerator dominates. For N⁴ / N³ = N → ∞, so N⁴ dominates N³.'),
      slip('Exponents inside the base matter: 2^(2N) is <i>not</i> O(2^N). 2^(2N) / 2^N = 2^N, which grows without bound. This is the same trap as Q13(b).'),
    ],
  }),
  ex({
    chip: chip(9), title: 'A loop calling a helper: three cases',
    q: 'Give the Big O of each function. (a) <code>q1</code> loops j over n values and calls <code>f(j)</code>, which takes constant time. (b) <code>q2</code> loops j over n values and calls <code>g(j)</code>, which takes time proportional to its parameter. (c) <code>q3(n, k)</code> loops j over n values and calls <code>g(k)</code>, where g again takes time proportional to its parameter.',
    ans: table([['Part', 'Total work', 'Big O'], ['(a)', 'n × constant', 'O(n)'], ['(b)', '0 + 1 + 2 + … + (n−1) = n(n−1)/2', 'O(n²)'], ['(c)', 'n × k', 'O(n · k)']]),
    work: [
      ask('A loop that calls a helper costs <b>(number of iterations) × (cost of one call)</b>, but only if every call costs the same. When the cost of the call changes with the loop variable, you have to <i>add up</i> the cost of each call instead.'),
      code('def q1(n):\n    for j in range(n):\n        f(j)        # constant time\n    return\n\ndef q2(n):\n    for j in range(n):\n        g(j)        # takes about j steps\n    return\n\ndef q3(n, k):\n    for j in range(n):\n        g(k)        # takes about k steps\n    return'),
      step('a', 'n iterations, each costing a constant: n × 1 = <b>O(n)</b>.'),
      step('b', 'The cost of call j is j. So the iterations cost 0, 1, 2, …, n−1. Add them: 0 + 1 + 2 + … + (n−1) = n(n−1)/2. That is half of n² minus half of n, so <b>O(n²)</b>.'),
      step('c', 'Here the helper receives <code>k</code>, which never changes, so every call costs k steps. n iterations × k = <b>O(n · k)</b>. This is a two-variable answer; do not rewrite it as O(n²) because k is a separate input.'),
      why('The only difference between (b) and (c) is the argument. (b) passes the <i>loop variable</i>, so later calls are more expensive. (c) passes a <i>fixed value</i>, so every call costs the same.'),
      slip('Writing “n × n = n²” for (b) is correct by luck here, but the reasoning must be the sum 0 + 1 + … + (n−1). Writing O(n²) for (c) is wrong unless k is proportional to n.'),
    ],
  }),
  ex({
    chip: chip(10), title: 'Helper calls inside loops: which count to multiply?',
    q: 'In each part, <code>sub_func</code> is the stated cost. (a) <code>sub_func(n)</code> is O(n); <code>my_func</code> loops i over range(n) and calls <code>sub_func(n)</code> only when <code>i % 2 == 0</code>. What if the test is <code>i % 3 == 0</code>? (b) <code>sub_func(n)</code> is O(log n); <code>my_func</code> starts at i = 2 and loops while i &lt; n, adding 1 each time and calling <code>sub_func(n)</code>. (c) <code>sub_func(n)</code> is O(n); <code>my_func</code> loops i over range(n) and calls <code>sub_func(i)</code>.',
    ans: table([['Part', 'Number of calls × cost per call', 'Big O'], ['(a) i % 2', '(n / 2) × n', 'O(n²)'], ['(a) i % 3', '(n / 3) × n', 'O(n²)'], ['(b)', '(n − 2) × log n', 'O(n log n)'], ['(c)', '0 + 1 + … + (n−1) = n(n−1)/2', 'O(n²)']]),
    work: [
      ask('For each loop: <b>how many times is the helper called</b>, and <b>what does one call cost</b>? Then combine them. Ignore the loop test and increment themselves, which are constant time.'),
      step('a', 'The condition <code>i % 2 == 0</code> is true for i = 0, 2, 4, …, so about n/2 values of i. Each call costs n, so total ≈ (n/2) × n = n²/2. Drop the ½: <b>O(n²)</b>.'),
      step('a', 'Change the test to <code>% 3</code> and the helper runs about n/3 times: (n/3) × n = n²/3, still <b>O(n²)</b>. A constant fraction of n iterations is still proportional to n, and the constant is thrown away.'),
      step('b', 'i runs 2, 3, 4, …, n−1, which is n − 2 iterations. Each calls <code>sub_func(n)</code> at cost log n. Total (n − 2) · log n, and the “− 2” is dropped: <b>O(n log n)</b>.'),
      step('c', 'This time the call is <code>sub_func(i)</code>, so call number i costs i. Total 0 + 1 + 2 + … + (n−1) = n(n−1)/2: <b>O(n²)</b>.'),
      check('Compare (a) and (c): both are O(n²) but they get there differently. (a) is “n/2 calls, each costing n”; (c) is “n calls, whose costs grow 0, 1, 2, …”. Both have the same total area of a triangle versus a half-filled rectangle.'),
      slip('In (b) the loop is a <code>while</code> that adds 1, not one that doubles. Only a doubling or halving loop gives log n iterations. Counting up by one gives n iterations.'),
    ],
  }),
  ex({
    chip: chip(11), title: 'The switch combination machine',
    q: 'You must start a machine by setting four switches, each ON or OFF, to the right combination. A function <code>start(combination)</code> returns True if the combination starts the machine, otherwise False. (a) Write pseudocode that finds the right combination. (b) Counting only calls to <code>start</code> as operations, what is the worst-case complexity for N switches? (c) Combinations with two or more consecutive ONs, or two or more consecutive OFFs, overheat the machine. If you only call <code>start</code> on safe combinations, what is the complexity?',
    ans: `<p>(a) Four nested loops, one per switch, trying ON then OFF, stopping when <code>start</code> returns True.</p><p>(b) <code>O(2^N)</code>. (c) <code>O(1)</code>: only two safe combinations exist for any N.</p>`,
    work: [
      ask('This is <b>brute force</b>: try every possibility until one works. The question is how many possibilities there are, because each one costs a call to <code>start</code>.'),
      step('a', 'One loop per switch. The innermost body is the check:'),
      code('for s1 in ["ON", "OFF"]:\n    for s2 in ["ON", "OFF"]:\n        for s3 in ["ON", "OFF"]:\n            for s4 in ["ON", "OFF"]:\n                combo = [s1, s2, s3, s4]\n                if start(combo):\n                    print(combo)\n                    stop'),
      step('b', 'Each switch has 2 positions, and the choices are independent, so the product rule gives 2 × 2 × … × 2 (N times) = 2^N combinations. In the worst case the right one is the last one tried, so <b>2^N</b> calls: <b>O(2^N)</b>. For N = 4 that is only 16 calls, but N = 40 is already about a trillion.'),
      step('c', 'Which strings of ON/OFF never have two equal neighbours? Each switch must differ from the one before it, so after choosing the first switch the rest are forced. Only <b>two</b> strings exist for any N: ON, OFF, ON, OFF, … and OFF, ON, OFF, ON, …'),
      step('c', 'So you make at most 2 calls whatever N is: a constant number of operations, <b>O(1)</b>.'),
      why('The “no two equal in a row” rule removes almost all the search space (2^N down to 2). Cutting down the candidates before testing them is the same idea as pruning in later chapters.'),
      slip('The cost of <i>generating</i> each safe combination (building a list of N entries) is O(N), but the question says to count only calls to <code>start</code>, so the answer to (c) is O(1).'),
    ],
  }),
  ex({
    chip: chip(12), title: 'Finding the k-th smallest number',
    q: 'Array a holds n distinct numbers. The function <code>find_minimum(a, k)</code> finds the k-th smallest: it first finds min and max (part a), returns early if k ≤ 1 (the minimum) or k ≥ n (the maximum), and otherwise runs a loop for i = 2 … k that finds the next smallest value (part c). Lines 20–25 set <code>ith_min = max</code> and then, for every j, set <code>ith_min = a[j]</code> when <code>a[j] &lt; ith_min and a[j] &gt; min</code>; line 27 then sets <code>min = ith_min</code>. (a) What do lines 20–25 compute? Trace them for a = [1, 2, 3, 4, 5] with max = 5 and min = 1, then with min = 3. (b) For a = [3, 5, 1, 10, 7, 22, 15, 19, 6, 8, 16] and k = 6, what is printed when i = 4? (c) What is the worst-case complexity? (d) Describe a faster algorithm and show it has a better worst case.',
    ans: `<p>(a) The <b>smallest value that is larger than the current min</b>, i.e. the next smallest. min = 1 gives 2; min = 3 gives 4.</p><p>(b) <code>ith_min = 6</code>.</p><p>(c) <code>O(n²)</code> in the worst case (k close to n).</p><p>(d) Sort once with merge sort and return <code>sorted[k−1]</code>: <code>O(n log n)</code>.</p>`,
    work: [
      ask('The algorithm is a “repeated minimum” (selection) method: it finds the smallest, then the next smallest, then the next, until it has found the k-th. You need to understand what one pass of the inner loop produces, then count how many passes there are.'),
      p('<b>Part (a): what lines 20–25 do.</b> Line 20 sets <code>ith_min</code> to the largest value, so any real element can beat it. The loop keeps replacing <code>ith_min</code> with an element that is <i>smaller than the best so far</i> but <i>larger than min</i>. At the end <code>ith_min</code> is the smallest value that is strictly greater than <code>min</code>.'),
      table([['Trace', 'min', 'j = 0 … 4 (values 1, 2, 3, 4, 5)', 'ith_min at line 26'], ['First', '1', '1: not &gt; 1. 2: &lt; 5 and &gt; 1, so 2. 3: &lt; 2? no. 4, 5: no.', '2'], ['Second', '3', '1, 2, 3: not &gt; 3. 4: &lt; 5 and &gt; 3, so 4. 5: &lt; 4? no.', '4']]),
      p('Line 27 then makes that value the new <code>min</code>, so the next pass finds the next larger one. That is why the loop over i prints the 2nd, 3rd, … smallest.'),
      step('b', 'Sort the array in your head: [1, 3, 5, 6, 7, 8, 10, 15, 16, 19, 22]. min = 1 and max = 22 after the first loops. i = 2 finds 3, i = 3 finds 5, i = 4 finds <b>6</b>. So when line 28 prints 4, line 29 prints <b>6</b>.'),
      step('c', 'The first loop is O(n). Then the loop over i runs about k − 1 times, and each pass of the inner loop scans all n elements. That is (k − 1) · n steps. Because k ≥ n returns early, the worst case is k = n − 1, giving about (n − 2) · n steps. Total O(n + k·n) = <b>O(n²)</b> in the worst case.'),
      step('d', 'Sort the array with merge sort in O(n log n) and return the element at index k − 1. Merge sort is covered in the Searching and Sorting chapter, and sorting once beats scanning k times.'),
      table([['n', 'k · n steps (k ≈ n)', 'n log₂ n steps'], ['1,000', '≈ 1,000,000', '≈ 10,000'], ['1,000,000', '≈ 10¹²', '≈ 20,000,000']]),
      p('Since n log n grows more slowly than n², the sort-based method has a better worst-case complexity. A heap (a later chapter) can even do it in O(n + k log n), and a selection algorithm called quickselect averages O(n).'),
      slip('For (c), do not say O(n) because the loops are not nested in the code layout. They are nested in <i>effect</i>: the outer loop (over i) repeats the inner scan (over j), and the outer loop’s length depends on k, which can be as large as n.'),
    ],
  }),
  ex({
    chip: chip(13), title: 'Does the exponent inside a Big O matter?',
    q: '(a) Is 2^(n+1) = O(2^n)? (b) Is 2^(2n) = O(2^n)? (adapted from CLRS Exercise 3.1-4)',
    ans: `<p>(a) <b>Yes.</b> 2^(n+1) = 2 · 2^n, a constant multiple.</p><p>(b) <b>No.</b> 2^(2n) = 2^n · 2^n, and the extra factor 2^n is not a constant.</p>`,
    work: [
      ask('Big O of f is “O(g)” if f(n) ≤ c · g(n) for some fixed constant c, once n is large. The test is whether f(n) / g(n) stays bounded by a constant.'),
      step('a', 'Use the exponent rule 2^(n+1) = 2¹ · 2^n = 2 · 2^n. The ratio 2^(n+1) / 2^n = 2 is a constant. So with c = 2: 2^(n+1) ≤ 2 · 2^n for all n. <b>True</b>.'),
      step('b', 'Use 2^(2n) = 2^n · 2^n. The ratio 2^(2n) / 2^n = 2^n, which grows without limit (2, 4, 8, 16, …). No constant c can keep up with it. <b>False</b>: 2^(2n) is a strictly larger growth class. Equivalently 2^(2n) = 4^n, and 4^n outgrows 2^n.'),
      why('Adding a constant to the exponent multiplies the function by a constant (so the class does not change). Multiplying the exponent by a constant raises the base (so the class does change).'),
      table([['Expression', 'Same class as 2^n?'], ['2^(n+5)', 'yes, 32 · 2^n'], ['2^(n−3)', 'yes, ⅛ · 2^n'], ['2^(2n) = 4^n', 'no, bigger'], ['2^(n/2) = (√2)^n', 'no, smaller']]),
      slip('Students often say “constants do not matter” and then drop the 2 in 2n. A constant <i>factor</i> outside the function is dropped; a constant factor <i>in the exponent</i> changes the base and so the growth class.'),
    ],
  }),
];

export default {
  week: 2,
  tier2: section({ id: 'tut-t2', heading: '📚 Tutorial questions: Tier 2', sub: 'The harder questions from the same tutorial. Try each on paper, then open the answer, then the full working.', items }),
};
