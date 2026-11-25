import { ex, section, ask, theory, step, p, check, slip, why, table, ul, code } from './lib.mjs';

const chip = (n) => `TUTORIAL 5 · TIER 2 · Q${n}`;

const items = [
  ex({
    chip: chip(6), title: 'What queue does do_strange_stuff(6) return?',
    q: 'Draw the queue returned for n = 6, and mark the head.<br>' + code('def do_strange_stuff(n):\n    q = Queue()\n    q.enqueue(0)\n    for i in range(0, n):\n        if i % 2 == 0:\n            x = q.dequeue()\n            q.enqueue(i - x)\n        else:\n            q.enqueue(i)\n    return q'),
    ans: `<p><code>[2, 3, 3, 5]</code>, with <b>2 at the head</b> (front) and 5 at the tail (back).</p>`,
    work: [
      ask('Run the function by hand. Keep a picture of the queue after every iteration, written head on the left, tail on the right. The queue is FIFO: <b>dequeue removes the left end, enqueue adds at the right end</b>.'),
      theory('Queue (FIFO): the item that arrived first leaves first. Enqueue joins the back, dequeue serves the front.'),
      p('Start: <code>enqueue(0)</code> gives <b>[0]</b>.'),
      table([['i', 'Branch', 'What happens', 'Queue (head on the left)'], ['0', 'even', 'x = dequeue() = 0, enqueue(0 − 0 = 0)', '[0]'], ['1', 'odd', 'enqueue(1)', '[0, 1]'], ['2', 'even', 'x = dequeue() = 0, enqueue(2 − 0 = 2)', '[1, 2]'], ['3', 'odd', 'enqueue(3)', '[1, 2, 3]'], ['4', 'even', 'x = dequeue() = 1, enqueue(4 − 1 = 3)', '[2, 3, 3]'], ['5', 'odd', 'enqueue(5)', '[2, 3, 3, 5]']]),
      p('<b>Answer:</b> head → <code>2, 3, 3, 5</code> ← tail.'),
      check('Count the items: every even i does one dequeue and one enqueue (size unchanged) and every odd i only enqueues (size +1). Starting at 1 and with 3 odd values of i, the size is 1 + 3 = 4. ✔'),
      slip('Writing the result with the tail first reverses the queue. Always say which end is the head. Note also that <code>i − x</code> uses the value that was <i>just removed</i> from the front, not the one still sitting at the front.'),
    ],
  }),
  ex({
    chip: chip(7), title: 'The mystery stack function',
    q: code('def mystery(x):\n    s = Stack()\n    out = 0\n    while x > 0:\n        s.push(x % 2)\n        x = x // 2\n    while s.count() > 0:\n        out = out * 10 + s.pop()\n    return out') + '(a) What does <code>mystery(3)</code> return? (b) <code>mystery(5)</code>? (c) What does the function do? (d) Rewrite it so that <code>x // 2</code> is pushed onto the stack instead of <code>x % 2</code>, keeping the behaviour.',
    ans: `<p>(a) <code>11</code>. (b) <code>101</code>.</p><p>(c) It writes the <b>binary form</b> of x as a decimal-looking number (3 → 11, 5 → 101, 10 → 1010).</p><p>(d) Push the quotients and take <code>% 2</code> when popping (code in the working below).</p>`,
    work: [
      ask('First trace it, then find the pattern in the outputs. The stack reverses the order in which digits come out, and that is the key to understanding (c).'),
      theory('Stack (LIFO): the last item pushed is the first item popped, so a stack reverses a sequence.'),
      p('<b>Part (a): mystery(3).</b>'),
      table([['Loop 1 step', 'x % 2 pushed', 'x after', 'Stack (top on the right)'], ['1', '3 % 2 = 1', '1', '[1]'], ['2', '1 % 2 = 1', '0', '[1, 1]']]),
      p('Loop 2 pops: 1, then 1. out = 0 · 10 + 1 = 1, then 1 · 10 + 1 = <b>11</b>.'),
      p('<b>Part (b): mystery(5).</b>'),
      table([['Loop 1 step', 'x % 2 pushed', 'x after', 'Stack (top on the right)'], ['1', '5 % 2 = 1', '2', '[1]'], ['2', '2 % 2 = 0', '1', '[1, 0]'], ['3', '1 % 2 = 1', '0', '[1, 0, 1]']]),
      p('Loop 2 pops 1, 0, 1: out = 1, then 10, then <b>101</b>.'),
      step('c', 'Repeated division by 2 produces the binary digits <b>from the least significant end</b> (the remainder 1 for 5 is the last binary digit). Reading them from the stack top reverses them, so the first digit out is the most significant. The function returns the binary representation of x, written as a decimal number (101 for 5, which is 5 in binary).'),
      p('Check with a longer one: 10 → remainders 0, 1, 0, 1 pushed in that order; popped as 1, 0, 1, 0 → <b>1010</b> = 10 in binary. ✔'),
      step('d', 'Push the <i>quotient</i> and work out each digit when you pop it. Keep the original idea: the stack holds “what is still to process”.'),
      code('def mystery(x):\n    s = Stack()\n    out = ""\n    s.push(x)                     # push x itself first\n    while s.count() > 0:\n        v = s.pop()\n        out = str(v % 2) + out    # digit of v, put in FRONT\n        if v > 0:\n            s.push(v // 2)        # push the quotient\n    return int(out)'),
      p('For x = 5: pop 5 → out "1", push 2; pop 2 → "01", push 1; pop 1 → "101", push 0; pop 0 → "0101", stop. <code>int("0101")</code> is 101, so the leading zero disappears.'),
      why('In the rewritten version the stack never holds more than one item, so it does not really reverse anything: the reversal now comes from building <code>out</code> by putting each new digit at the <i>front</i>. Either way the cost is O(log x), because x is halved each time.'),
      slip('The answer to (a) is 11, not 3 or 2. The function returns a <i>number whose digits are 1 and 1</i>, not the value of the binary number.'),
    ],
  }),
  ex({
    chip: chip(8), title: 'Which sequences can a queue produce?',
    q: 'You may enqueue the numbers 1 to n only in increasing order, and you may call dequeue at any time and print the result. (a) Give a list of queue operations that produces 1 2 3 4 5. (b) Is there any sequence that cannot occur? Give an example and explain.',
    ans: `<p>(a) Enqueue 1, 2, 3, 4, 5, then dequeue five times; or interleave them (enqueue 1, dequeue, enqueue 2, dequeue, …).</p><p>(b) <b>Yes: every sequence except 1 2 3 4 5.</b> A queue is FIFO, so the output order is always the same as the input order. For example, 2 1 3 4 5 is impossible.</p>`,
    work: [
      ask('Compare with the stack version in Tier 1 (Q3), where many different output orders were possible. Here you have a <i>queue</i>, and that changes everything.'),
      theory('Queue (FIFO): items leave in the order they arrived. The number you enqueue first is always dequeued first.'),
      step('a', 'Any order of enqueues and dequeues that never dequeues from an empty queue works. Two valid lists:'),
      code('# all enqueues first          # interleaved\nq = Queue()                    q = Queue()\nq.enqueue(1)                   q.enqueue(1)\nq.enqueue(2)                   print(q.dequeue())   # 1\nq.enqueue(3)                   q.enqueue(2)\nq.enqueue(4)                   print(q.dequeue())   # 2\nq.enqueue(5)                   q.enqueue(3)\nprint(q.dequeue())   # 1      print(q.dequeue())   # 3\nprint(q.dequeue())   # 2      q.enqueue(4)\nprint(q.dequeue())   # 3      print(q.dequeue())   # 4\nprint(q.dequeue())   # 4      q.enqueue(5)\nprint(q.dequeue())   # 5      print(q.dequeue())   # 5', 'python'),
      step('b', 'Because 1 is enqueued before 2, and the queue serves the earliest item first, 1 must be dequeued before 2. The same argument applies to every pair, so 2 is out before 3, 3 before 4, and so on. <b>The only possible output is 1 2 3 4 5</b>.'),
      p('Any other order, such as 2 1 3 4 5, 1 3 2 4 5 or 5 4 3 2 1, would need an item to overtake an earlier one, which a queue never allows.'),
      table([['Structure', 'Input 1, 2, 3 (in increasing order)', 'Possible outputs'], ['Queue (FIFO)', 'always the same order', '123 only'], ['Stack (LIFO)', 'can be reordered', '123, 132, 213, 231, 321 (not 312)']]),
      slip('Do not apply the stack rule “you cannot output a big number, then two smaller ones in increasing order” to queues. For a queue the rule is simpler and much stronger: nothing may overtake.'),
    ],
  }),
  ex({
    chip: chip(9), title: 'is_palindrome with two queues, and with one stack',
    q: 'The slides implement <code>is_palindrome(word)</code> using a queue and a stack. Design alternatives using (a) two queues only; (b) one stack only.',
    ans: code('def is_palindrome_2q(word):\n    q1, q2 = Queue(), Queue()\n    for ch in word:\n        q1.enqueue(ch)                 # forwards\n    for ch in reversed(word):\n        q2.enqueue(ch)                 # backwards\n    while q1.count() > 0:\n        if q1.dequeue() != q2.dequeue():\n            return False\n    return True\n\ndef is_palindrome_stack(word):\n    s = Stack()\n    for ch in word:\n        s.push(ch)\n    for ch in word:                    # read forwards\n        if ch != s.pop():              # pop gives the letters backwards\n            return False\n    return True'),
    work: [
      ask('A palindrome reads the same forwards and backwards. So you need the letters in <b>both orders</b> and then compare them one by one. The structures differ in how they give you the second order.'),
      theory('A queue returns items in the order they went in (forwards). A stack returns them in the reverse order (backwards).'),
      p('<b>The original idea.</b> Put every letter into a queue (forwards when dequeued) and into a stack (backwards when popped). Compare dequeue() with pop() letter by letter.'),
      step('a', '<b>Two queues.</b> A queue cannot reverse by itself, so we supply the reversed order directly: fill Q1 with the letters left to right, and Q2 with <code>reversed(word)</code>. Then dequeue both together and compare. Any mismatch means not a palindrome.'),
      step('b', '<b>One stack.</b> Push all letters. Now pop gives the word backwards. Walk through the word from the left, and compare each letter with the popped letter. The word itself plays the role of the “forwards” source, so no queue is needed.'),
      p('<b>Trace of the stack version on "madam":</b>'),
      table([['Read', 'Popped', 'Equal?'], ['m', 'm', 'yes'], ['a', 'a', 'yes'], ['d', 'd', 'yes'], ['a', 'a', 'yes'], ['m', 'm', 'yes → palindrome']]),
      p('For "madman": the stack pops n, a, m, d, a, m, while we read m, a, d, m, a, n. The very first pair is m against n, which is a mismatch, so the function returns False immediately.'),
      check('Both versions take O(n) time. The stack version uses one structure only (half the memory); it also compares every letter against its mirror twice, which is harmless.'),
      slip('In the two-queue version, the second queue must be filled with the letters in reverse order. If you simply copy the word into both queues you compare the word with itself, and every word looks like a palindrome.'),
    ],
  }),
  ex({
    chip: chip(10), title: 'Recursive GCD (subtraction), converted to a stack',
    q: 'Convert this recursive subtraction-GCD into a non-recursive function that uses a stack.<br>' + code('def dijkstra(a, b):\n    if a == b:\n        return a\n    if a > b:\n        return dijkstra(a - b, b)\n    else:\n        return dijkstra(a, b - a)'),
    ans: code('def dijkstra(a, b):\n    s = Stack()\n    s.push(b)\n    s.push(a)                  # top of the stack = first argument\n    while s.count() > 0:\n        a = s.pop()\n        b = s.pop()\n        if a == b:\n            return a           # base case\n        if a > b:\n            s.push(b)\n            s.push(a - b)      # the next call: (a - b, b)\n        else:\n            s.push(b - a)\n            s.push(a)          # the next call: (a, b - a)'),
    work: [
      ask('A recursive call uses the program’s <b>call stack</b> to remember the arguments of each call that has not finished yet. To remove the recursion, build that stack yourself: push the arguments, and loop until the stack is empty.'),
      theory('Every recursion can be turned into a loop with an explicit stack: “call f(args)” becomes “push args”, and “the body of f” becomes the loop body that pops the args.'),
      step(1, '<b>Push the first “call”.</b> The arguments a and b go on the stack. Push b first, then a, so that a is on top and comes off first.'),
      step(2, '<b>Loop.</b> Pop a, then b. This is “entering the call”.'),
      step(3, '<b>Base case.</b> If a == b, return a. No more pushes.'),
      step(4, '<b>Recursive cases.</b> If a &gt; b, the call dijkstra(a − b, b) becomes push b, then push a − b. Otherwise the call dijkstra(a, b − a) becomes push b − a, then push a.'),
      p('<b>Trace of dijkstra(6, 4):</b>'),
      table([['Pop', 'Condition', 'Pushed (top last)'], ['a = 6, b = 4', 'a &gt; b', 'b = 4, then a − b = 2'], ['a = 2, b = 4', 'a &lt; b', 'b − a = 2, then a = 2'], ['a = 2, b = 2', 'a == b', 'returns 2']]),
      why('The stack never holds more than one pending call here, because each call makes exactly one further call and nothing is left to do after it returns (tail recursion). So a plain loop that updates a and b would work too. The stack version is a faithful translation and shows how the mechanism works.'),
      p('<b>Queue variant.</b> Because only one call is pending at a time, a queue works equally well: enqueue a, enqueue b, then dequeue a and b in the same order, and enqueue the next pair.'),
      slip('If you push a first and b second, then the first pop returns b. The answer is still correct (gcd is symmetric), but the code no longer matches the recursive version, which makes it harder to check.'),
    ],
  }),
];

export default {
  week: 5,
  tier2: section({ id: 'tut-t2', heading: '📚 Tutorial questions: Tier 2', sub: 'The harder questions from the same tutorial. Trace or design on paper first, then open the answer, then the full working.', items }),
};
