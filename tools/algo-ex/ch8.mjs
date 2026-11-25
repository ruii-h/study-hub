import { ex, section, ask, theory, step, p, check, slip, why, table, ul, ol, code } from './lib.mjs';
import { arr, hashRows, join, one } from './svg.mjs';

// tables computed here so the pictures always match the working
const K17 = [12, 44, 13, 88, 23, 94, 11, 39, 20, 16, 5];
const chainRows = (keys, N, h) => { const r = Array.from({ length: N }, (_, i) => ({ i, chain: [] })); keys.forEach((k) => r[h(k) % N].chain.push(k)); return r; };
const probeRow = (keys, N, h) => { const t = Array(N).fill(''); const moved = {}; keys.forEach((k) => { let i = h(k) % N, s = 0; while (t[i] !== '') { i = (i + 1) % N; s++; } t[i] = k; if (s) moved[i] = 'dg-w'; }); return [t, moved]; };
const twoCols = (rows) => { const m = Math.ceil(rows.length / 2); return join([hashRows(rows.slice(0, m)), hashRows(rows.slice(m))]); };
const chainFig = (rows, cap) => one(rows.length > 8 ? twoCols(rows) : hashRows(rows), cap, 'Hash table with chains');
const probeFig = (t, moved, cap, cw = 26) => one(arr(t, { cw, cls: Object.fromEntries(t.map((v, i) => [i, v === '' ? 'dg-n' : moved[i] || 'dg-h'])) }), cap, 'Hash table with linear probing');
const letters = 'EASYQUTION'.split('');
const val = (c) => c.charCodeAt(0) - 64;
const h11 = (c) => 11 * val(c);

const ic = (n) => `IN-CLASS · Q${n}`;
const tq = (n) => `TUTORIAL 7 · Q${n}`;
const ex7 = (n) => `TUTORIAL 7 · EXTRA ${n}`;

const KEYS = '12, 44, 13, 88, 23, 94, 11, 39, 20, 16, 5';
const calc = table([['Key k', '3k', '3k mod 17 (row)', 'Note'],
  ['12', '36', '2', ''], ['44', '132', '13', ''], ['13', '39', '5', ''], ['88', '264', '9', ''], ['23', '69', '1', ''], ['94', '282', '10', ''],
  ['11', '33', '16', ''], ['39', '117', '15', ''], ['20', '60', '9', '<b>collision</b> with 88'], ['16', '48', '14', ''], ['5', '15', '15', '<b>collision</b> with 39']]);
const hint = (k) => p(`<b>Arithmetic tip.</b> To get ${k} mod 17 quickly, subtract the biggest multiple of 17 that fits: 17, 34, 51, 68, 85, 102, 119, 136, 153, 170, 187, 204, 221, 238, 255, 272. Example: 264 − 255 = 9, so 264 mod 17 = 9.`);

const chaining = (chip, title, q) => ex({
  chip, title, q,
  ans: chainFig(chainRows(K17, 17, (k) => 3 * k), 'The table after all 11 keys. A highlighted row holds a chain; the arrow shows the order of insertion within the chain (88 came before 20, 39 before 5).') + p('Rows 0 to 16 (an empty row is not shown):') + table([['Row', 'Chain (in insertion order)'],
    ['1', '23'], ['2', '12'], ['5', '13'], ['9', '88 → 20'], ['10', '94'], ['13', '44'], ['14', '16'], ['15', '39 → 5'], ['16', '11'],
    ['0, 3, 4, 6, 7, 8, 11, 12', 'empty']]),
  work: [
    ask('Insert the keys one at a time. For each key compute its row with the hash function, then put it into that row. With <b>separate chaining</b> every row holds a list (a bucket), so a collision just adds the key to the end of the list at that row.'),
    theory('<b>Hash function</b> h(k) = (3k) mod 17 sends every key to a row between 0 and 16. A <b>collision</b> happens when two different keys get the same row. <b>Separate chaining</b> resolves it by letting each row hold a chain of entries.'),
    step(1, 'Compute the row of every key.'), calc, hint('3k'),
    step(2, 'Insert in order, reading the table above from the top. Rows 2, 13, 5, 9, 1, 10, 16, 15 and 14 each receive their first key, so nothing collides until the keys 20 and 5.'),
    step(3, 'Key 20 goes to row 9, which already holds 88. Chaining does not look elsewhere: it appends, so row 9 becomes <code>88 → 20</code>. Key 5 goes to row 15, which holds 39, so row 15 becomes <code>39 → 5</code>.'),
    check('Count the keys in the chains: 1 + 1 + 1 + 2 + 1 + 1 + 1 + 2 + 1 = 11, which matches the 11 keys. The load factor is λ = 11/17 ≈ 0.65, so the average chain is shorter than one entry.'),
    slip('Do not move a key to another row when it collides. That is linear probing, a different scheme. Also keep insertion order inside a chain: 88 came before 20, so 88 is first.'),
  ],
});

const probing = (chip, title, q) => ex({
  chip, title, q,
  ans: probeFig(...probeRow(K17, 17, (k) => 3 * k), 'The table after all 11 keys. Yellow cells are keys that did not land on their own row: 20 slid from row 9 to 11, and 5 slid from row 15 round to row 0.') + p('Final table (rows 0 to 16):') + code('row: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16\nkey: 5  23 12 .  .  13 .  .  .  88 94 20 .  44 16 39 11', 'final table')
    + p('20 is stored in row 11 and 5 wraps around to row 0.'),
  work: [
    ask('Same keys and hash function, but now every row holds <b>one</b> entry. If the row is taken, try the next row (row + 1), then row + 2, and so on, <i>wrapping around</i> from row 16 back to row 0, until a free row is found.'),
    theory('<b>Linear probing</b>: the probe sequence for a key is h(k), h(k) + 1, h(k) + 2, … all taken mod 17. Insert goes into the first free row on this sequence.'),
    step(1, 'The rows of all keys are the same as in the chaining table, so reuse them:'), calc,
    step(2, 'The first nine keys (12, 44, 13, 88, 23, 94, 11, 39) land in free rows 2, 13, 5, 9, 1, 10, 16, 15 at their first try.'),
    step(3, '<b>Key 20</b>: its row is 9, taken by 88. Try row 10: taken by 94. Try row 11: free. So 20 goes to <b>row 11</b> after 2 extra probes.'),
    step(4, '<b>Key 16</b>: row 14 is free, no collision.'),
    step(5, '<b>Key 5</b>: its row is 15, taken by 39. Try row 16: taken by 11. Row 17 does not exist, so <b>wrap around</b> to row 0: free. So 5 goes to <b>row 0</b> after 2 extra probes.'),
    check('Eleven keys sit in eleven distinct rows (0, 1, 2, 5, 9, 10, 11, 13, 14, 15, 16) ✔. A later lookup of 20 starts at row 9 and follows the same path 9 → 10 → 11, so it will be found; a lookup that stops at the first empty row is therefore correct only because we never removed anything.'),
    slip('Forgetting the wrap-around: the probe after row 16 is row 0, not an error and not row 17. Also note the order of insertion matters: if 5 had been inserted before 39, then 39 would be the one probing.'),
  ],
});

const inclass = [
  chaining(ic(1), 'Hash table with separate chaining', `Draw the 17-row hash table that results from the hash function h(k) = (3k) mod 17 and the keys (${KEYS}), inserted in this order, when collisions are handled by <b>separate chaining</b> (buckets).`),
  probing(ic(2), 'Hash table with linear probing', `Repeat In-class Q1, but this time the hash table uses <b>linear probing</b>: keys (${KEYS}), h(k) = (3k) mod 17, inserted in this order.`),
];

const tutorial = [
  ex({
    chip: tq(1), title: 'Draw the tables for both collision schemes',
    q: `Draw the 17-entry hash table that results from using h(k) = (3k) mod 17 on the keys (${KEYS}) under (a) separate chaining and (b) linear probing.`,
    ans: p('<b>(a)</b> chains: row 1: 23; row 2: 12; row 5: 13; row 9: 88 → 20; row 10: 94; row 13: 44; row 14: 16; row 15: 39 → 5; row 16: 11.') + p('<b>(b)</b> probing: row 0: 5; row 1: 23; row 2: 12; row 5: 13; row 9: 88; row 10: 94; row 11: 20; row 13: 44; row 14: 16; row 15: 39; row 16: 11.'),
    work: [
      ask('This is the same pair of tables built step by step in the two in-class exercises above (In-class Q1 for chaining, In-class Q2 for probing). Redo it here without looking: the point is to be fast and accurate at the arithmetic.'),
      theory('h(k) = (3k) mod 17. Chaining keeps a list per row; linear probing takes the next free row, wrapping around from 16 to 0.'),
      step(1, 'Rows: 12 → 2, 44 → 13, 13 → 5, 88 → 9, 23 → 1, 94 → 10, 11 → 16, 39 → 15, 20 → 9 (collision), 16 → 14, 5 → 15 (collision).'),
      step(2, '<b>Chaining:</b> the two collisions simply extend the chains of rows 9 and 15.'),
      step(3, '<b>Probing:</b> 20 slides 9 → 10 → 11; 5 slides 15 → 16 → 0 (wrap-around).'),
      check('Total entries: 11 in both tables. In the chaining table the rows with data are 1, 2, 5, 9, 10, 13, 14, 15, 16 (9 rows). In the probing table 11 rows are used.'),
      slip('Mixing the two schemes up: in the chaining table no key ever leaves its own row; in the probing table no row ever holds more than one key.'),
    ],
  }),
  ex({
    chip: tq(2), title: 'Letters as keys, chaining versus probing',
    q: 'Insert the keys E, A, S, Y, Q, U, T, I, O, N, in this order, into an empty table of size N using h(k) = (11k) mod N, where k is the position of the letter in the alphabet (A = 1, Z = 26). (a) Separate chaining with N = 5. (b) Linear probing with N = 16.',
    ans: p('<b>(a)</b> N = 5: row 0: E → Y → T → O; row 1: A → U; row 2: Q; row 3: empty; row 4: S → I → N.') + p('<b>(b)</b> N = 16: row 1: S; row 3: Y; row 4: I; row 5: O; row 7: E; row 8: U; row 10: N; row 11: A; row 12: Q; row 13: T; all other rows empty.'),
    work: [
      ask('First turn each letter into its number k, then compute (11k) mod N, then place it using the scheme asked. Do the two parts separately: N is different, so every row changes.'),
      theory('Same hash function shape as before, but with a different table size N. A smaller N means more collisions, so chains get longer (part a); a larger N leaves room for probing (part b).'),
      p('<b>Part (a): separate chaining, N = 5.</b>'),
      table([['Letter', 'k', '11k', '11k mod 5', 'Placement'],
        ['E', '5', '55', '0', 'row 0 (first in this row)'], ['A', '1', '11', '1', 'row 1'], ['S', '19', '209', '4', 'row 4'],
        ['Y', '25', '275', '0', 'row 0, <b>collision</b>: chain E → Y'], ['Q', '17', '187', '2', 'row 2'], ['U', '21', '231', '1', 'row 1, collision: A → U'],
        ['T', '20', '220', '0', 'row 0, collision: E → Y → T'], ['I', '9', '99', '4', 'row 4, collision: S → I'], ['O', '15', '165', '0', 'row 0, collision: E → Y → T → O'],
        ['N', '14', '154', '4', 'row 4, collision: S → I → N']]),
      chainFig(chainRows(letters, 5, h11), 'Part (a): the chains in insertion order. Row 0 has the longest chain (E, Y, T, O).'),
      p('<b>Shortcut.</b> 11 mod 5 = 1, so (11k) mod 5 = k mod 5. You can read the row straight off the letter number: E = 5 → 0, A = 1 → 1, S = 19 → 4, and so on.'),
      p('<b>Part (b): linear probing, N = 16.</b> Probe sequence: h, h + 1, h + 2, …, taken mod 16.'),
      table([['Letter', 'k', '11k', '11k mod 16', 'Probes and final row'],
        ['E', '5', '55', '7', 'row 7 free → 7'], ['A', '1', '11', '11', 'row 11 free → 11'], ['S', '19', '209', '1', 'row 1 free → 1'], ['Y', '25', '275', '3', 'row 3 free → 3'],
        ['Q', '17', '187', '11', 'row 11 taken by A → row 12 free → <b>12</b>'], ['U', '21', '231', '7', 'row 7 taken by E → row 8 free → <b>8</b>'],
        ['T', '20', '220', '12', 'row 12 taken by Q → row 13 free → <b>13</b>'], ['I', '9', '99', '3', 'row 3 taken by Y → row 4 free → <b>4</b>'],
        ['O', '15', '165', '5', 'row 5 free → 5'], ['N', '14', '154', '10', 'row 10 free → 10']]),
      probeFig(...probeRow(letters, 16, h11), 'Part (b): the final table. Yellow cells were displaced from their own row: Q (11 to 12), U (7 to 8), T (12 to 13) and I (3 to 4).', 28),
      check('Part (a): 4 + 2 + 1 + 0 + 3 = 10 letters ✔. Part (b): ten letters occupy ten different rows ✔.'),
      slip('In (b), T collides with Q, not with A: Q already moved to row 12 before T arrived, so T (whose own row is 12) has to go to row 13. Always probe against the table as it is <i>now</i>.'),
    ],
  }),
];

const extras = [
  ex({
    chip: ex7(1), title: 'Three numbers that sum to x in O(n²) with a hash map',
    q: 'Design an algorithm that takes O(n²) time on average to decide whether an array of n numbers contains three elements (at three different positions) whose sum equals a given integer x. Consider using a hash map.',
    ans: p('For every pair of positions i &lt; j, compute <code>need = x − A[i] − A[j]</code> and look it up in a hash map of the array values. If <code>need</code> is stored at a position other than i and j, return True. After all pairs, return False.') + p('There are about n²/2 pairs and each lookup is O(1) on average, so the total is <b>O(n²) on average</b>.'),
    work: [
      ask('The brute-force answer tries all triples (three nested loops), which is O(n³). The question wants us to save one loop by replacing it with a <i>lookup</i>.'),
      theory('A hash map answers “is this value present, and where?” in O(1) on average. This is the same idea as the two-sum question: instead of searching for the partner, ask the map.'),
      step(1, 'Build a hash map from value to the <b>list of positions</b> where it occurs (one pass, O(n)). A list is needed because the same value can appear twice, for example [2, 2, 5].'),
      step(2, 'Loop over every pair of positions i &lt; j. Compute need = x − A[i] − A[j].'),
      step(3, 'Look up need in the map. It is a valid answer only if the map holds a position k with k ≠ i and k ≠ j. Return True as soon as that happens.'),
      step(4, 'If no pair finds a third element, return False.'),
      code('def three_sum(A, x):\n    where = {}\n    for pos, v in enumerate(A):\n        where.setdefault(v, []).append(pos)\n    n = len(A)\n    for i in range(n):\n        for j in range(i + 1, n):\n            need = x - A[i] - A[j]\n            for k in where.get(need, []):\n                if k != i and k != j:\n                    return True\n    return False'),
      p('<b>Cost.</b> The pair loops run n(n − 1)/2 times. The lookup is O(1) on average and the innermost list has at most 3 useful entries to inspect (we only need one position different from i and j), so each pair costs O(1) on average. Total: O(n) + O(n²) = <b>O(n²) on average</b>.'),
      p('<b>Example.</b> A = [4, 1, 8, 6], x = 15. Pair (4, 1): need 10, not in map. Pair (4, 8): need 3, no. Pair (4, 6): need 5, no. Pair (1, 8): need 6, which is at position 3, different from positions 1 and 2: return True (1 + 8 + 6 = 15).'),
      check('The pair (i, j) must not be allowed to use itself as the third number. Example: A = [5, 3], x = 15. Pair (5, 3): need 7, absent. A = [5], x = 15: no pairs, False. A = [5, 5], x = 15: need 5 is at position 0 or 1, but both equal i or j, so False ✔.'),
      slip('Using a plain set and forgetting that the third element must be a different position. With only a set, A = [5, 10] and x = 20 would wrongly succeed as 5 + 5 + 10.'),
    ],
  }),
  ex({
    chip: ex7(3), title: 'Attributes of a good hash function (final-exam style)',
    q: 'Which of the following are attributes of a good hashing algorithm? (a) It distributes keys uniformly across the hash table. (b) It is deterministic (always produces the same hash value for the same key). (c) It changes the hash value each time the program runs. (d) It maps all keys to consecutive memory locations. (e) It guarantees zero collisions for all inputs.',
    ans: '<b>(a) and (b) only.</b>',
    work: [
      ask('Judge each statement separately: is it a property that makes a hash function <i>work</i> and <i>perform well</i>?'),
      theory('A hash function must be <b>deterministic</b> (so a stored key can be found again) and should spread keys <b>uniformly</b> (so chains and probe runs stay short, giving O(1) on average).'),
      table([['Statement', 'Verdict', 'Reason'],
        ['(a) uniform distribution', '<b>Yes</b>', 'Uniform spread keeps buckets short, which is what makes get/put O(1) on average.'],
        ['(b) deterministic', '<b>Yes</b>', 'The same key must always hash to the same row; otherwise get(k) looks in the wrong row and the entry cannot be found.'],
        ['(c) changes value each run', '<b>No</b>', 'A value that changes between runs is harmless inside one run, but it is not a desirable attribute; and a function that changed <i>during</i> a run would break lookups. Stability is the property that is required.'],
        ['(d) consecutive memory locations', '<b>No</b>', 'Good hashing scatters keys. Mapping keys to consecutive locations clusters them, which is the opposite of uniform.'],
        ['(e) zero collisions for all inputs', '<b>No</b>', 'Impossible when there are more possible keys than rows (pigeonhole principle). Collisions are expected and must be handled by chaining or probing.']]),
      check('Only (a) and (b) are things we want to be true of a hash function; (e) is a trap because it is impossible, not just unlikely.'),
      slip('Do not pick (e) because “fewer collisions is good”. A good hash function <i>reduces</i> collisions; it cannot <i>eliminate</i> them.'),
    ],
  }),
];

export default {
  week: 7,
  tier1Nums: [3, 4],
  tier1Chip: (n) => `TUTORIAL 7 · Q${n}`,
  tier1Sub: 'The hash questions from the week 7 tutorial, with the answer key.',
  inclassNew: section({ id: 'ic-new', heading: '📝 In-class exercises', sub: 'From the lecture slides. Attempt it first, then open the answer.', items: inclass }),
  tier2: section({ id: 'tut-x', heading: '📚 More tutorial questions', sub: 'The remaining hash questions and the extra exercises from the week 7 tutorial.', items: [...tutorial, ...extras] }),
};
