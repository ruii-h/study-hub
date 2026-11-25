import { ex, section, ask, theory, step, p, check, slip, why, table, ul, code } from './lib.mjs';
import { heapTree, one, row } from './svg.mjs';
const heapFig = (arrs, labels, cap, hl = []) => row(arrs.map((a, k) => { const d = heapTree(a, { dx: 36, dy: 46, hl: hl[k] || [] }); return { ...d, h: d.h + 16, body: d.body + `<text class="dg-hd" x="${d.w / 2}" y="${d.h + 8}">${labels[k]}</text>` }; }), cap, 'Heap diagram');

const ic = (n) => `IN-CLASS · Q${n}`;
const extra = (n) => `TUTORIAL 7 · EXTRA ${n}`;

const inclass = [
  ex({
    chip: ic(1), title: 'Run a sequence of priority-queue operations on a heap',
    q: 'Starting from an empty min-heap, apply these operations and draw the heap after the last one: insert(4, A), insert(37, B), insert(91, C), insert(22, D), removeMin(), insert(82, E), removeMin(), removeMin(), insert(66, F), insert(93, G), removeMin(), insert(24, H), removeMin().',
    ans: `<p>removeMin returns, in order: <b>A (4), D (22), B (37), F (66), H (24)</b>.</p><p>The final heap holds (82, E), (91, C), (93, G): array <code>[82, 91, 93]</code>.</p>` + heapFig([[82, 91, 93]], ['final heap'], 'The final min-heap: E (82) at the root, C (91) and G (93) below it.'),
    work: [
      ask('Keep track of the heap as an <b>array</b> (index 0 is the root; the children of index j are 2j + 1 and 2j + 2; the parent is (j − 1) // 2). The heap must always be a complete tree where every parent is smaller than its children (min-heap).'),
      theory('<b>insert</b>: put the new entry in the next free leaf position (end of the array), then <b>up-heap bubble</b>: while it is smaller than its parent, swap upwards. <b>removeMin</b>: return the root, move the last entry to the root, then <b>down-heap bubble</b>: while it is bigger than its smaller child, swap with that child.'),
      table([['#', 'Operation', 'What happens', 'Heap array afterwards'],
        ['1', 'insert(4, A)', 'first entry, becomes the root', '[4]'],
        ['2', 'insert(37, B)', 'goes to index 1; 37 &gt; 4, no swap', '[4, 37]'],
        ['3', 'insert(91, C)', 'goes to index 2; 91 &gt; 4, no swap', '[4, 37, 91]'],
        ['4', 'insert(22, D)', 'goes to index 3 (child of 37); 22 &lt; 37, swap; 22 &gt; 4, stop', '[4, 22, 91, 37]'],
        ['5', 'removeMin()', 'returns <b>A (4)</b>. Last entry 37 moves to the root; smaller child 22 &lt; 37, swap', '[22, 37, 91]'],
        ['6', 'insert(82, E)', 'goes to index 3 (child of 37); 82 &gt; 37, no swap', '[22, 37, 91, 82]'],
        ['7', 'removeMin()', 'returns <b>D (22)</b>. 82 moves to the root; smaller child 37 &lt; 82, swap', '[37, 82, 91]'],
        ['8', 'removeMin()', 'returns <b>B (37)</b>. 91 moves to the root; its only child 82 &lt; 91, swap', '[82, 91]'],
        ['9', 'insert(66, F)', 'goes to index 2 (child of 82); 66 &lt; 82, swap', '[66, 91, 82]'],
        ['10', 'insert(93, G)', 'goes to index 3 (child of 91); 93 &gt; 91, no swap', '[66, 91, 82, 93]'],
        ['11', 'removeMin()', 'returns <b>F (66)</b>. 93 moves to the root; smaller child 82 &lt; 93, swap', '[82, 91, 93]'],
        ['12', 'insert(24, H)', 'goes to index 3 (child of 91); 24 &lt; 91, swap; 24 &lt; 82, swap again', '[24, 82, 93, 91]'],
        ['13', 'removeMin()', 'returns <b>H (24)</b>. 91 moves to the root; smaller child 82 &lt; 91, swap', '[82, 91, 93]']]),
      p('<b>Spot the pattern.</b> A removeMin always returns the <i>smallest key present at that moment</i>, regardless of when it arrived: after step 4 the keys are 4, 22, 37, 91 and the smallest is 4 (A); after step 6 they are 22, 37, 82, 91 and the smallest is 22 (D); and in step 13, 24 (H) is returned even though it was inserted just before.'),
      p('<b>Step 12 in pictures</b> (the only insert that bubbles up two levels):'),
      heapFig([[82, 91, 93], [82, 91, 93, 24], [82, 24, 93, 91], [24, 82, 93, 91]], ['before', 'append 24', 'swap with 91', 'swap with 82'], 'insert(24, H): the new key goes into the next free leaf and bubbles up while it is smaller than its parent. The highlighted node is the one being moved.', [[], [3], [1], [0]]),
      check('The count of entries: 13 operations with 8 inserts and 5 removeMins leaves 8 − 5 = 3 entries. Which ones remain? E (82), C (91) and G (93), the three largest keys. ✔'),
      slip('When you remove the minimum, the new root is the <i>last</i> entry of the array (the rightmost leaf on the last level), not the second-smallest key. The down-heap bubble then repairs the order.'),
    ],
  }),
];

const extras = [
  ex({
    chip: extra(2), title: 'Parent of node 21 after five heap operations (final-exam style)',
    q: 'A min-heap is stored in the array [2, 18, 19, 21, 24, 33, 28, 50, 48, 25, 40]. Apply Insert(22), RemoveMin(), RemoveMin(), Insert(9), Insert(17). Who is the parent of the node 21?',
    ans: `<b>19.</b> At the end the array is <code>[9, 19, 17, 33, 21, 22, 28, 50, 48, 25, 24, 40]</code>, node 21 is at index 4 and its parent is index (4 − 1) // 2 = 1, which holds 19.`,
    work: [
      ask('Simulate the five operations on the array, one at a time, and finally find where 21 ended up. Each operation restores the heap order before the next begins.'),
      theory('Array heap: parent of index j is (j − 1) // 2; children are 2j + 1 and 2j + 2. Insert = append and up-heap; removeMin = move last to root and down-heap.'),
      table([['Operation', 'Detail', 'Array afterwards'],
        ['start', '', '[2, 18, 19, 21, 24, 33, 28, 50, 48, 25, 40]'],
        ['Insert(22)', 'appended at index 11 (parent index 5 holds 33); 22 &lt; 33 swap; parent now index 2 holds 19; 22 &gt; 19 stop', '[2, 18, 19, 21, 24, 22, 28, 50, 48, 25, 40, 33]'],
        ['RemoveMin()', 'remove 2; last entry 33 to the root. Children 18, 19: swap with 18. Children of index 1 are 21, 24: swap with 21. Children of index 3 are 50, 48: both bigger than 33, stop', '[18, 21, 19, 33, 24, 22, 28, 50, 48, 25, 40]'],
        ['RemoveMin()', 'remove 18; last entry 40 to the root. Children 21, 19: swap with 19. Children of index 2 are 22, 28: swap with 22. Index 5 has no children, stop', '[19, 21, 22, 33, 24, 40, 28, 50, 48, 25]'],
        ['Insert(9)', 'appended at index 10 (parent index 4 holds 24); swap; parent index 1 holds 21; swap; parent index 0 holds 19; swap. 9 is the new root', '[9, 19, 22, 33, 21, 40, 28, 50, 48, 25, 24]'],
        ['Insert(17)', 'appended at index 11 (parent index 5 holds 40); swap; parent index 2 holds 22; swap; parent index 0 holds 9; 17 &gt; 9 stop', '[9, 19, 17, 33, 21, 22, 28, 50, 48, 25, 24, 40]']]),
      heapFig([[9, 19, 17, 33, 21, 22, 28, 50, 48, 25, 24, 40]], ['the heap after all five operations'], 'Final heap. Node 21 (highlighted, index 4) hangs below 19 (index 1).', [[4]]),
      step(1, 'Find 21 in the final array: index 4.'),
      step(2, 'Its parent is at index (4 − 1) // 2 = 1. The entry at index 1 is <b>19</b>.'),
      check('Is the heap order still valid? Parent of index 4 is index 1: 19 &lt; 21 ✔. Parent of index 1 is index 0: 9 &lt; 19 ✔. Index 2 holds 17 and its children are 22 and 28: ✔.'),
      slip('Notice that 21 started at index 3 (parent 18), moved to index 1 during the first removeMin and then dropped back to index 4 after Insert(9). Do not assume a key stays near its old position.'),
    ],
  }),
];

export default {
  week: 7,
  tier1Nums: [5, 7, 8, 6],
  tier1Chip: (n) => `TUTORIAL 7 · Q${n}`,
  tier1Sub: 'The heap questions from the week 7 tutorial, with the answer key.',
  inclassNew: section({ id: 'ic-new', heading: '📝 In-class exercises', sub: 'From the lecture slides. Attempt it first, then open the answer.', items: inclass }),
  tier2: section({ id: 'tut-x', heading: '📚 Tutorial questions: extra exercise', sub: 'An extra heap question from the tutorial session (taken from a past final exam).', items: extras }),
};
