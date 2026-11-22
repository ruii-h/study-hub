// IS1704 type-in questions: "what does this print?" snippets adapted from the weekly quizzes (G15 quiz bank).
// Expected output is produced by running the snippet in Python at build time, so the answer can never be wrong.
import { execFileSync } from 'node:child_process';
import { K } from './h.mjs';

function run(src) {
  try {
    return { out: execFileSync('python', ['-I', '-c', src], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).replace(/\r/g, '').replace(/\n+$/, ''), err: false };
  } catch (e) {
    return { out: String(e.stdout || '').replace(/\r/g, '').replace(/\n+$/, ''), err: true };
  }
}
const ASK = 'What is printed when the code runs? Type each line of output on its own line; type <code>error</code> as the last line if it crashes (the output before the crash still counts).';
const T = (code, note) => {
  const r = run(code);
  const a = r.err ? (r.out ? [r.out + '\nerror', r.out + '\n- error -'] : ['error', '- error -']) : [r.out === '' ? 'nothing' : r.out];
  if (!r.err && r.out === '') a.push('- nothing -', '');
  return [ASK + K(code), a, note || (r.err ? 'The program crashes, so everything printed before the crash counts and the last line is <code>error</code>.' : ''), 'out'];
};
const E = (expr, note) => T(`print(${expr})`, note || 'Work through the precedence rules step by step; keep the type (int or float) in your answer.');

export const fill = {
  1: [
    E('10 - 2 ** 1 ** 3 / 4 * 2', '`**` binds tightest and groups right to left: `1 ** 3` is 1, `2 ** 1` is 2; then `2 / 4 * 2` is 1.0, and `10 - 1.0` is 9.0 (a float).'),
    E('float("22" + "10") + len("4" + "0.5")', '`"22" + "10"` joins the text first, so the float is 2210.0; `"4" + "0.5"` is `"40.5"` with length 4.'),
    E('min(0.8, 0.5, (3 // 6 * 2)) + int(3.5)', '`3 // 6` is 0, so `0 * 2` is 0 (an int); the smallest is 0, and `int(3.5)` is 3.'),
    T(`word = 'abcdefg'
print('X' + word[5:3] + 'Y')
print(word[2:4:3])
print('a' in 'a1b2c3')
print('a b' in 'a1b')`, 'A slice whose start is past its end is empty, so `word[5:3]` is `""`; `word[2:4:3]` takes only index 2.'),
    T(`word = 'ChineseNewYear'
if 'New' in word:
    print(word[0] + 'NY')
if 'year' in word:
    print(word[7] + word[10] + 'C')
elif 'New Year' in word:
    print('Bye!')`, '`in` is case-sensitive: `"year"` is not in `"ChineseNewYear"` (it is `"Year"`), and neither is `"New Year"`.'),
    T(`string1 = 'funny'
string2 = string1
string1 = string1.upper()
print(string1 + string2)`, '`upper()` returns a new string and `string1` is rebound to it; `string2` still names the old one.'),
  ],
  2: [
    T(`x = 3
y = 5
total = 0
total -= x - y
print(total)
value = 1.23
print(value * 100 // 100)`, '`total -= (x - y)` subtracts -2, so total is 2. `1.23 * 100` is about 123.0, and `// 100` floors to 1.0.'),
    T(`a = 8
b = 3
c = 2
print(str(a) + str(b))
total = a + b
print(total)
print(a / c ** b)`, '`str` makes joining text; `+` on ints adds; `/` always gives a float.'),
    E('7 - 7 % 3 * 2', '`%` and `*` go left to right before `-`: `7 % 3` is 1, `1 * 2` is 2, `7 - 2` is 5.'),
    T(`x = 3
y = 2
z = y % x
print(y + 1)
print(x * y ** z)`, '`y % x` is 2, so `y ** z` is 4 and `x * 4` is 12.'),
  ],
  3: [
    T(`def do_x():
    print('go')
print('pong')
print(do_x())
print('ping')`, '`do_x()` prints go and returns `None`, which the outer `print` then shows.'),
    T(`def do_two(s):
    print('r' + s)
def do_one(msg):
    msg = msg.strip('ar') + msg
    print('2')
    do_two(msg)
    print(msg)
s = 'radar'
do_one(s)
print(s)`, '`strip("ar")` removes any leading and trailing `a` or `r` characters, leaving `"d"`; the new `msg` is `"dradar"`.'),
    T(`def manipulate(n):
    n = int(str(n + 1) * n)
    return n
n = 2
print(manipulate(n))`, '`str(3) * 2` is `"33"`, which `int` turns into 33.'),
    T(`def do_x():
    print('apple')
    return do_y()
def do_y():
    print('orange')
    return 'ping'
print('pear')
print(do_x())
print('pong')`, 'Calls print in the order they run: pear, apple, orange, then the returned `ping`, then pong.'),
    T(`def perform_magic(n):
    n = int(str(n * 2) * n) + 1
    return n
n = 3
print(perform_magic(n))`, '`str(6) * 3` is `"666"`, so the result is 667.'),
    T(`def str_function(message):
    message += 'o'
msg = 'bingo'
print(str_function(msg))
print(msg)`, 'The function has no `return`, so the call gives `None`, and the string outside is unchanged.'),
    T(`def list_function(message_list, word):
    message_list.extend([word])
msg_list = ['Annie']
list_function(msg_list, 'Apple')
print(msg_list)`, '`extend` mutates the shared list, so the caller sees the new item.'),
  ],
  4: [
    T(`def test_one(x):
    print('alpha')
    return x > 4
def test_two(x):
    print('beta')
    return x <= 8
for i in range(4, 6):
    if test_one(i) and test_two(i):
        print("apple")
    elif test_one(i) or test_two(i):
        print("orange")
    print('--')`, '`and` and `or` short-circuit, so the second test is not called if the first already decides the result; each `elif` call prints again.'),
    T(`a = 1
b = 5.0
if (a % 2 == 1):
    print(a / a)
else:
    print(b / a)`, '`a % 2 == 1` is true, and `1 / 1` is the float 1.0.'),
  ],
  5: [
    T(`is_mystery = False
is_magic = False
for i in range(3):
    if is_mystery:
        print('apple')
        is_magic = not is_magic
    if is_mystery and is_magic:
        print('pear')
    elif is_magic:
        print('orange')
    is_mystery = not is_mystery`, 'Trace the two flags each time round the loop: the second pass flips `is_magic` to True.'),
    T(`for i in range(4, -2, -1):
    print(4 * i - 1)`, 'The loop runs i = 4, 3, 2, 1, 0, -1.'),
    T(`for i in range(15, -2, -4):
    print(i)`, 'The stop value is excluded: 15, 11, 7, 3, -1.'),
  ],
  6: [
    T(`numbers = [1, 2, 3, 4, 5]
print(numbers[::-2])
numbers = [2, 4, 7, 3, 1, 9]
print(numbers[4:7])
values = ['apple', 'orange', 'pear']
print(['apple'] in values)
line = 'apple##orange#word'
print(line.split('#'))`, '`[::-2]` walks backwards in steps of 2; a slice past the end is clipped; `["apple"]` (a list) is not an element; splitting on `#` keeps empty strings between adjacent separators.'),
    T(`def do_magic(words):
    words = ['apple']
    return words
words = ['orange']
result = do_magic(words)
print(words)
print(result)`, 'Rebinding the parameter does not change the caller\'s list.'),
    T(`colors = ['green', 'yellow', 'blue', 'purple']
print(colors[:-3])
print(colors[4])`, '`[:-3]` keeps everything except the last three items; index 4 is out of range.'),
    T(`def perform_magic(orig):
    copy = orig
    orig.append(1)
    copy += orig

fruits = [2]
perform_magic(fruits)
print(fruits)`, '`copy = orig` is an alias, and `copy += orig` extends the same list in place (with itself).'),
    T(`words = 'hello hi bonjour salut nihao'
new_list = []
for element in words.split():
    if len(element) >= 5:
        new_list.append(element)
print(new_list)`, 'Only words with five or more letters are kept.'),
  ],
  7: [
    T(`values = [('a', 1), ('b', 2), ('c', 3)]
total = 0
for name, n in values:
    total += n
print(name, total)`, 'The loop variables keep their last values after the loop ends.'),
  ],
  9: [
    T(`x = 10
def f():
    x = 5
    return x
print(f(), x)`, 'The assignment inside `f` creates a local `x`; the global stays 10.'),
    T(`count = 0
def inc():
    count += 1
inc()
print(count)`, 'Assigning to `count` makes it local, but it has no value yet, so the call raises `UnboundLocalError`.'),
  ],
  11: [
    T(`def count_ops(n):
    ops = 0
    for i in range(n):
        for j in range(n):
            ops += 1
    return ops
print(count_ops(3), count_ops(6))`, 'Two nested loops over `n` run `n * n` times: doubling n quadruples the work.'),
  ],
};
