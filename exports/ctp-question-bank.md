# IS1704 Computational Thinking & Programming: question bank

Types: **MCQ** one correct option, **MSQ** select all that apply, **Fill** type the answer, **Short** short answer (self-marked). Correct options are marked ✅.

---

## Chapter 1. Variables, Types & Strings

1. **[MCQ]** What is `type(3.0)`?
   - `int`
   - ✅ `float`
   - `str`
   - `bool`
   *Why:* A number with a decimal point is a float.

2. **[MCQ]** What does `int("42") + 1` evaluate to?
   - `"421"`
   - `"43"`
   - ✅ `43`
   - An error
   *Why:* `int()` converts the text to a number first.

3. **[MCQ]** What does `"Python"[1:4]` return?
   - `"Pyth"`
   - `"ytho"`
   - `"y"`
   - ✅ `"yth"`
   *Why:* Indices 1, 2 and 3 are y, t and h.

4. **[MCQ]** Which is a valid variable name?
   - ✅ `my_score`
   - `2nd_place`
   - `user-name`
   - `class`
   *Why:* Letters, digits and underscores only, and not a keyword.

5. **[MCQ]** What happens with `text = "Python"` then `text[0] = "J"`?
   - text becomes "Jython"
   - ✅ A `TypeError`, because strings are immutable
   - Nothing happens
   - text becomes "J"
   *Why:* Build a new string with `"J" + text[1:]`.

6. **[MSQ]** Which statements about conversion between types are correct?
   - ✅ `int(3.9)` is `3`.
   - `int("3.5")` returns `3`.
   - ✅ `float("2")` is `2.0`.
   - `type(7 / 2)` is `int`.
   - ✅ `str(12) + "3"` is `"123"`.
   *Why:* Conversions change the type, and `/` always gives a float.

7. **[MSQ]** With `text = "Python"`, which statements are correct?
   - ✅ `text[1:4]` is `"yth"`.
   - ✅ `text[-1]` is `"n"`.
   - `text[1:10]` raises `IndexError`.
   - ✅ `text[::-1]` is `"nohtyP"`.
   - `text[0] = "J"` changes the string to `"Jython"`.
   *Why:* Indexing can fail out of range; slicing cannot.

8. **[MSQ]** Which statements about strings and their methods are correct?
   - ✅ `"J" + text[1:]` creates a new string.
   - `text.upper()` changes `text` itself.
   - ✅ `text.replace("o", "0")` returns a new string and leaves `text` unchanged.
   - ✅ `"  Hello World  ".strip()` is `"Hello World"`.
   - ✅ `"Hello World".split()` is `["Hello", "World"]`.
   *Why:* String methods return new strings.

9. **[MSQ]** Which are valid variable names?
   - ✅ `second_place`
   - `user-name`
   - `my score`
   - ✅ `price`
   - `class`
   *Why:* No spaces, hyphens, leading digits or keywords.

10. **[MSQ]** A program runs `age = input("Age: ")` and the user types `12`. Which statements are correct?
   - ✅ `age` holds a string.
   - `age + 1` gives `13`.
   - ✅ `int(age) + 1` gives `13`.
   - ✅ `age * 2` gives `"1212"`.
   - ✅ `float(age)` gives `12.0`.
   *Why:* Convert the text before arithmetic.

11. **[MSQ]** Which statements about parentheses and quotes are correct?
   - ✅ `print("Hello")` uses parentheses to call a function.
   - ✅ `(2 + 3) * 4` is `20`.
   - ✅ `(10,)` is a tuple with one item.
   - `(10)` is a tuple.
   - ✅ `'He said "hi"'` is a valid string.
   *Why:* The comma, not the parentheses, makes a tuple.

12. **[MSQ]** With `text = "banana"`, which results are correct?
   - ✅ `len(text)` is `6`.
   - ✅ `text.count("a")` is `3`.
   - ✅ `text[-2:]` is `"na"`.
   - ✅ `text[::2]` is `"bnn"`.
   - `text.count("an")` is `3`.
   *Why:* Count, slice and length results for a short word.

13. **[MSQ]** With `s = "hello"`, which results are correct?
   - ✅ `s[1:-1]` is `"ell"`.
   - ✅ `s[:2] + s[2:]` equals `s`.
   - ✅ `s[-2]` is `"l"`.
   - `s[5]` is `"o"`.
   - ✅ `len(s[1:4])` is `3`.
   *Why:* Index 5 is out of range for a five-letter string.

14. **[MSQ]** Which statements about booleans and types are correct?
   - ✅ `type(1.5)` is `float`.
   - ✅ `True + 1` is `2`.
   - ✅ `bool("")` is `False`.
   - `bool("False")` is `False`.
   - `type("1") == int` is `True`.
   *Why:* Empty values are falsy; non-empty ones are truthy.

15. **[MSQ]** Run `a = 2`, `b = a`, `b += 1`. Which statements are correct?
   - ✅ `a` is still `2`.
   - ✅ `b` is `3`.
   - ✅ Integers are immutable, so `b += 1` rebinds `b` to a new integer.
   - `b += 1` also changes `a` to `3`.
   - ✅ If `b` was never assigned, `b += 1` raises a `NameError`.
   *Why:* Assignment rebinds a name; it does not change other names.

16. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonprint(10 - 2 ** 1 ** 3 / 4 * 2)
   **Answer:** `9.0`
   *Note:* `**` binds tightest and groups right to left: `1 ** 3` is 1, `2 ** 1` is 2; then `2 / 4 * 2` is 1.0, and `10 - 1.0` is 9.0 (a float).

17. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonprint(float("22" + "10") + len("4" + "0.5"))
   **Answer:** `2214.0`
   *Note:* `"22" + "10"` joins the text first, so the float is 2210.0; `"4" + "0.5"` is `"40.5"` with length 4.

18. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonprint(min(0.8, 0.5, (3 // 6 * 2)) + int(3.5))
   **Answer:** `3`
   *Note:* `3 // 6` is 0, so `0 * 2` is 0 (an int); the smallest is 0, and `int(3.5)` is 3.

19. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonword = 'abcdefg'
print('X' + word[5:3] + 'Y')
print(word[2:4:3])
print('a' in 'a1b2c3')
print('a b' in 'a1b')
   **Answer:** `XY
c
True
False`
   *Note:* A slice whose start is past its end is empty, so `word[5:3]` is `""`; `word[2:4:3]` takes only index 2.

20. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonword = 'ChineseNewYear'
if 'New' in word:
    print(word[0] + 'NY')
if 'year' in word:
    print(word[7] + word[10] + 'C')
elif 'New Year' in word:
    print('Bye!')
   **Answer:** `CNY`
   *Note:* `in` is case-sensitive: `"year"` is not in `"ChineseNewYear"` (it is `"Year"`), and neither is `"New Year"`.

21. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonstring1 = 'funny'
string2 = string1
string1 = string1.upper()
print(string1 + string2)
   **Answer:** `FUNNYfunny`
   *Note:* `upper()` returns a new string and `string1` is rebound to it; `string2` still names the old one.

---

## Chapter 2. Input, Output & Arithmetic

22. **[MCQ]** What does `input("Age: ")` always return?
   - An integer
   - A float
   - ✅ A string
   - A boolean
   *Why:* Convert it with `int()` or `float()` when you need a number.

23. **[MCQ]** What is `17 // 5`?
   - `3.4`
   - `2`
   - `4`
   - ✅ `3`
   *Why:* Floor division discards the fractional part (rounding down).

24. **[MCQ]** What is `2 + 3 * 4`?
   - ✅ `14`
   - `20`
   - `24`
   - `9`
   *Why:* Multiplication binds tighter than addition.

25. **[MCQ]** After `score = 100`, `score += 50`, `score -= 20`, `score *= 2`, what is `score`?
   - `130`
   - ✅ `260`
   - `230`
   - `150`
   *Why:* 100, then 150, then 130, then 260.

26. **[MCQ]** What does `print("Hello,", "Ana")` output?
   - `Hello,Ana`
   - `"Hello, Ana"`
   - ✅ `Hello, Ana`
   - `Hello,`
   *Why:* Arguments are separated by one space.

27. **[MSQ]** With `name = "Ana"`, which calls print exactly `Hello, Ana`?
   - ✅ `print(f"Hello, {name}")`
   - ✅ `print("Hello,", name)`
   - `print("Hello," + name)`
   - ✅ `print("Hello, " + name)`
   - `print("Hello, {name}")`
   *Why:* Watch the space: `,` adds one, `+` does not.

28. **[MSQ]** Which formatting results are correct?
   - ✅ `f"{3.14159:.2f}"` is `"3.14"`.
   - ✅ `round(3.756, 2)` is `3.76`.
   - ✅ `f"{5:.1f}"` is `"5.0"`.
   - `f"{x}"` always shows exactly two decimals.
   - ✅ `f"{2/3:.2f}"` is `"0.67"`.
   *Why:* The `.2f` format sets the decimal places.

29. **[MSQ]** Which results are correct for the arithmetic operators?
   - ✅ `17 // 5` is `3`.
   - `17 / 5` is `3`.
   - ✅ `17 % 5` is `2`.
   - ✅ `2 ** 3` is `8`.
   - `-7 // 2` is `-3`.
   *Why:* Floor division rounds toward minus infinity.

30. **[MSQ]** Which results follow operator precedence?
   - ✅ `2 + 3 * 4` is `14`.
   - ✅ `(2 + 3) * 4` is `20`.
   - `2 * 3 ** 2` is `36`.
   - ✅ `10 - 4 / 2` is `8.0`.
   - ✅ `8 // 3 * 3` is `6`.
   *Why:* Powers bind tighter than multiplication.

31. **[MSQ]** Starting with `score = 100`, then `score += 50`, `score -= 20`, `score *= 2`, and `cents = 587`, `dollars = cents // 100`, `cents %= 100`, which are correct?
   - ✅ `score` ends as `260`.
   - ✅ `dollars` is `5`.
   - ✅ `cents` ends as `87`.
   - `x //= 2` with `x = 9` makes `x` equal to `4.5`.
   - ✅ `b += 1` before `b` exists raises `NameError`.
   *Why:* Compound assignment uses the current value.

32. **[MSQ]** Which statements about `input()` are correct?
   - ✅ It returns a string.
   - ✅ `int(input())` with `7` typed gives the integer `7`.
   - ✅ `int("3.5")` raises `ValueError`.
   - ✅ The prompt text is shown to the user.
   - With `5` typed, `x = input()` then `x + 1` gives `6`.
   *Why:* Always convert input to the number type you need.

33. **[MSQ]** Which results involving `/` and `//` are correct?
   - ✅ `6 / 3` is `2.0`.
   - ✅ `type(6 // 3)` is `int`.
   - ✅ `7.0 // 2` is `3.0`.
   - `6 / 3` is `2` with type `int`.
   - ✅ `2 ** -1` is `0.5`.
   *Why:* `/` always returns a float.

34. **[MSQ]** Which results for splitting 587 cents are correct?
   - ✅ `587 // 100` is `5`.
   - ✅ `587 % 100` is `87`.
   - ✅ `87 // 25` is `3`.
   - `87 % 25` is `13`.
   - ✅ `5 * 100 + 87` is `587`.
   *Why:* Use // and % together to split a quantity into units.

35. **[MSQ]** Which statements about `print` options are correct?
   - ✅ `print("a", end="")` followed by `print("b")` shows `ab` on one line.
   - ✅ `print(1, 2)` shows `1 2`.
   - ✅ `print("ab", "c")` shows `ab c`.
   - ✅ `print()` prints a blank line.
   - `print("x", end=" ")` ends with a newline.
   *Why:* `end` replaces the newline.

36. **[MSQ]** Which results mixing strings and numbers are correct?
   - ✅ `"12" + "3"` is `"123"`.
   - ✅ `"12" * 2` is `"1212"`.
   - ✅ `int("12") * 2` is `24`.
   - `"12" + 3` is `15`.
   - ✅ `str(12) + str(3)` is `"123"`.
   *Why:* + joins strings but cannot mix str and int.

37. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonx = 3
y = 5
total = 0
total -= x - y
print(total)
value = 1.23
print(value * 100 // 100)
   **Answer:** `2
1.0`
   *Note:* `total -= (x - y)` subtracts -2, so total is 2. `1.23 * 100` is about 123.0, and `// 100` floors to 1.0.

38. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythona = 8
b = 3
c = 2
print(str(a) + str(b))
total = a + b
print(total)
print(a / c ** b)
   **Answer:** `83
11
1.0`
   *Note:* `str` makes joining text; `+` on ints adds; `/` always gives a float.

39. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonprint(7 - 7 % 3 * 2)
   **Answer:** `5`
   *Note:* `%` and `*` go left to right before `-`: `7 % 3` is 1, `1 * 2` is 2, `7 - 2` is 5.

40. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonx = 3
y = 2
z = y % x
print(y + 1)
print(x * y ** z)
   **Answer:** `3
12`
   *Note:* `y % x` is 2, so `y ** z` is 4 and `x * 4` is 12.

---

## Chapter 3. Functions

41. **[MCQ]** What does a function return if it has no `return` statement?
   - `0`
   - An empty string
   - It raises an error
   - ✅ `None`
   *Why:* Python returns `None` for you.

42. **[MCQ]** Which is a parameter in `def greet(name):`?
   - ✅ `name`
   - `greet`
   - `"Alice"` in `greet("Alice")`
   - `def`
   *Why:* The parameter is the variable in the header.

43. **[MCQ]** With `def power(base, exp=2): return base ** exp`, what is `power(5)`?
   - `10`
   - ✅ `25`
   - `5`
   - An error
   *Why:* 5 to the power of the default 2.

44. **[MCQ]** What does `sorted([3, 1, 4, 2])` return?
   - `None`
   - It sorts the original in place
   - ✅ A new list `[1, 2, 3, 4]`
   - `(1, 2, 3, 4)`
   *Why:* `sorted` always returns a new list.

45. **[MCQ]** What does the call `function(2, 3)` do if `def function(a, b, c):` has no default for `c`?
   - Uses `c = 0`
   - Prints 2 3
   - Returns `None`
   - ✅ Raises a `TypeError`
   *Why:* A required argument is missing.

46. **[MSQ]** A function is defined as `def func(a, b): print(a + b); return None`. Which statements about `func(3, 4)` and `print(func(3, 4))` are correct?
   - ✅ `func(3, 4)` prints `7`.
   - ✅ `print(func(3, 4))` prints `7` and then `None`.
   - `func(3, 4)` returns `7`.
   - ✅ The function returns `None`.
   - `print(func(3, 4))` prints only `None`.
   *Why:* Printing inside a function is not returning.

47. **[MSQ]** Given `def f(a, b, c=5): print(a, b, c)`, which calls give the stated output?
   - ✅ `f(2, 3)` prints `2 3 5`.
   - ✅ `f(2, 3, 4)` prints `2 3 4`.
   - `f(2)` prints `2 5`.
   - ✅ `f(b=1, a=2)` prints `2 1 5`.
   - ✅ `f(2, 3, c=9)` prints `2 3 9`.
   *Why:* Required parameters must be supplied.

48. **[MSQ]** The function `calculate_total_amount(fifty_note, ten_note, five_note=0, two_note=0, one_coin=0)` returns `fifty_note*50 + ten_note*10 + five_note*5 + two_note*2 + one_coin`. Which calls are correct?
   - ✅ `calculate_total_amount(2, 3)` returns `130`.
   - ✅ `calculate_total_amount(2, 3, 4)` returns `150`.
   - ✅ `calculate_total_amount(2, 3, 4, 1, 3)` returns `155`.
   - `calculate_total_amount(3, two_note=4, five_note=1)` returns `163`.
   - ✅ `calculate_total_amount(2, 3, two_note=4)` returns `138`.
   *Why:* A missing required argument is an error, not zero.

49. **[MSQ]** Which statements about `return` are correct?
   - ✅ Code after `return` on the same path never runs.
   - ✅ A function without `return` returns `None`.
   - A function may contain only one `return`.
   - ✅ `return a, b` returns two values as a tuple.
   - ✅ A bare `return` and `return None` both give `None`.
   *Why:* Several returns are normal; the first one reached ends the call.

50. **[MSQ]** Which statements about variables inside functions are correct?
   - ✅ A variable created in a function is local.
   - ✅ Reading a function's local `pi` after the call raises `NameError`.
   - ✅ A docstring is the triple-quoted string at the top of the function.
   - A docstring is printed every time the function runs.
   - ✅ Parameters are local variables of the function.
   *Why:* Locals live only as long as the call.

51. **[MSQ]** Which statements about `sorted` and `sort` are correct?
   - ✅ `sorted(nums)` returns a new list.
   - `nums.sort()` returns the sorted list.
   - ✅ `sorted("hello")` is `["e", "h", "l", "l", "o"]`.
   - ✅ `sorted(nums)` leaves `nums` unchanged.
   - ✅ `print(nums.sort())` prints `None`.
   *Why:* Method on the list changes it; the built-in returns a new list.

52. **[MSQ]** `def show(a, b): print(a + b)` has no `return`. After `x = show(1, 2)`, which statements are correct?
   - ✅ It prints `3`.
   - `x` is `3`.
   - ✅ `x` is `None`.
   - ✅ `print(x)` prints `None`.
   - `show(1, 2) + 1` is `4`.
   *Why:* Capture a value with `return`, not `print`.

53. **[MSQ]** With `def power(base, exp=2): return base ** exp`, which calls are correct?
   - ✅ `power(5)` is `25`.
   - ✅ `power(2, 3)` is `8`.
   - ✅ `power(exp=3, base=2)` is `8`.
   - `power(exp=3, 2)` is `8`.
   - ✅ `power(base=4)` is `16`.
   *Why:* Positional arguments first, keywords after.

54. **[MSQ]** `def double(n): return n * 2`. Which results are correct?
   - ✅ `double(double(3))` is `12`.
   - ✅ `double("ab")` is `"abab"`.
   - ✅ `double([1])` is `[1, 1]`.
   - `double(None)` is `0`.
   - ✅ `double(2.5)` is `5.0`.
   *Why:* The operator decides the behaviour for each type.

55. **[MSQ]** Which statements about defining and calling functions are correct?
   - ✅ A function must be defined before the line that calls it runs.
   - Defining a function runs its body.
   - ✅ Calling `f()` runs the body.
   - ✅ A function can call another function.
   - Argument variable names must match the parameter names.
   *Why:* Define first, call later.

56. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef do_x():
    print('go')
print('pong')
print(do_x())
print('ping')
   **Answer:** `pong
go
None
ping`
   *Note:* `do_x()` prints go and returns `None`, which the outer `print` then shows.

57. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef do_two(s):
    print('r' + s)
def do_one(msg):
    msg = msg.strip('ar') + msg
    print('2')
    do_two(msg)
    print(msg)
s = 'radar'
do_one(s)
print(s)
   **Answer:** `2
rdradar
dradar
radar`
   *Note:* `strip("ar")` removes any leading and trailing `a` or `r` characters, leaving `"d"`; the new `msg` is `"dradar"`.

58. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef manipulate(n):
    n = int(str(n + 1) * n)
    return n
n = 2
print(manipulate(n))
   **Answer:** `33`
   *Note:* `str(3) * 2` is `"33"`, which `int` turns into 33.

59. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef do_x():
    print('apple')
    return do_y()
def do_y():
    print('orange')
    return 'ping'
print('pear')
print(do_x())
print('pong')
   **Answer:** `pear
apple
orange
ping
pong`
   *Note:* Calls print in the order they run: pear, apple, orange, then the returned `ping`, then pong.

60. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef perform_magic(n):
    n = int(str(n * 2) * n) + 1
    return n
n = 3
print(perform_magic(n))
   **Answer:** `667`
   *Note:* `str(6) * 3` is `"666"`, so the result is 667.

61. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef str_function(message):
    message += 'o'
msg = 'bingo'
print(str_function(msg))
print(msg)
   **Answer:** `None
bingo`
   *Note:* The function has no `return`, so the call gives `None`, and the string outside is unchanged.

62. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef list_function(message_list, word):
    message_list.extend([word])
msg_list = ['Annie']
list_function(msg_list, 'Apple')
print(msg_list)
   **Answer:** `['Annie', 'Apple']`
   *Note:* `extend` mutates the shared list, so the caller sees the new item.

---

## Chapter 4. Conditionals & Error Handling

63. **[MCQ]** Which operator tests whether two values are equal?
   - ✅ `==`
   - `=`
   - `!=`
   - `<>`
   *Why:* `==` compares; `=` assigns.

64. **[MCQ]** With age = 13 in `if age < 13 ... elif age < 20 ... else ...`, which branch runs?
   - The `if` branch
   - ✅ The `elif` branch
   - The `else` branch
   - Both `if` and `elif`
   *Why:* 13 is not less than 13 but is less than 20.

65. **[MCQ]** What is `not (True and False)`?
   - `False`
   - An error
   - ✅ `True`
   - `None`
   *Why:* Not of False is True.

66. **[MCQ]** Which exception does `int("abc")` raise?
   - `TypeError`
   - `ZeroDivisionError`
   - `NameError`
   - ✅ `ValueError`
   *Why:* The text is not a valid integer.

67. **[MCQ]** Which value is falsy?
   - ✅ An empty list `[]`
   - The string `"0"`
   - The string `"False"`
   - The list `[0]`
   *Why:* Empty containers are false.

68. **[MSQ]** A program classifies `age` as kid (`age < 13`), teenager (`age < 20`) or adult (`else`) using `if`/`elif`/`else`. Which statements are correct?
   - ✅ Only the first true branch runs.
   - ✅ `age = 13` gives teenager.
   - ✅ `age = 20` gives adult.
   - ✅ `age = 12.5` gives kid.
   - `age = 5` prints both kid and teenager.
   *Why:* An elif chain is mutually exclusive.

69. **[MSQ]** Which statements about `=`, `==` and `!=` are correct?
   - ✅ `==` compares two values.
   - ✅ `if age = 18:` is a SyntaxError.
   - ✅ `!=` means not equal.
   - `<>` is a valid not-equal operator in Python 3.
   - ✅ `age >= 18` is `True` when `age` is `18`.
   *Why:* `=` assigns, `==` compares.

70. **[MSQ]** Which statements about logical operators are correct?
   - ✅ `True and False` is `False`.
   - ✅ `not True or True` is `True`.
   - ✅ `True or False and False` is `True`.
   - `not (A and B)` equals `not A and not B`.
   - ✅ `not (A or B)` equals `not A and not B`.
   *Why:* Mixing `and` and `or` needs precedence in mind.

71. **[MSQ]** Predict the outputs of the three expressions: `print(not True or (3 >= 3 or 9 < 4) and False)`, `print(not True or 3 >= 3 or 9 < 4 and False)`, and `print(False == (False or not True) or not (2 * 4 % 3 == 1))`. Which statements are correct?
   - ✅ The first prints `False`.
   - ✅ The second prints `True`.
   - ✅ The third prints `True`.
   - The first prints `True`.
   - ✅ `and` is evaluated before `or`.
   *Why:* Brackets, then not, then and, then or.

72. **[MSQ]** Which statements about `try`/`except` are correct?
   - ✅ `except ValueError:` handles `int("abc")`.
   - ✅ `except ZeroDivisionError:` handles `10 / 0`.
   - ✅ `except Exception as e:` lets you print the error message from `e`.
   - After an error inside `try`, the remaining lines of the `try` block still run.
   - ✅ The `except` block runs only when an error occurs in the `try`.
   *Why:* An error abandons the rest of the try block.

73. **[MSQ]** With `if a and b:` then `if c: print("Alpha") else: print("Beta")`, else `if d: print("Gamma") else: print("Delta")`, which results are correct?
   - ✅ `a=1, b=1, c=0` prints `Beta`.
   - ✅ `a=0, b=1, d=1` prints `Gamma`.
   - ✅ `a=1, b=0, d=0` prints `Delta`.
   - ✅ `a=1, b=1, c=1` prints `Alpha`.
   - `a=0, b=1, c=1, d=1` prints `Alpha`.
   *Why:* Resolve the outer condition before the inner one.

74. **[MSQ]** Which statements about the ternary operator and truthiness are correct?
   - ✅ `"kid" if age < 13 else "adult"` is `"kid"` for `age = 12`.
   - ✅ It is `"adult"` for `age = 13`.
   - A ternary needs an `elif` part.
   - ✅ `if []:` does not run its block.
   - `if "0":` does not run its block.
   *Why:* Non-empty strings are always truthy.

75. **[MSQ]** `display_numbers(4, 16)` loops over `i` and prints `#` if `i % 15 == 0`, else `-` if `i % 3 == 0`, else `*` if `i % 5 == 0`, else `i`. Which statements are correct?
   - ✅ 15 prints `#`.
   - ✅ If the `% 3` test came first, 15 would print `-`.
   - ✅ 10 prints `*`.
   - 6 prints `*`.
   - ✅ 16 prints `16`.
   *Why:* Order of the tests matters.

76. **[MSQ]** Which statements about a helper such as `def is_even(n)` used in a condition are correct?
   - ✅ `if is_even(x):` works because the function returns a boolean.
   - ✅ `n % 2 == 0` is `True` for even `n`.
   - ✅ `return n % 2 == 0` replaces the whole if/else.
   - `if is_even(x) == True:` is required.
   - ✅ `-4 % 2 == 0` is `True`.
   *Why:* A boolean expression can be returned directly.

77. **[MSQ]** A loop must stop when `x < 8` and `y > 2` are both true. Which loop conditions are correct?
   - ✅ `while x >= 8 or y <= 2:`
   - ✅ `while not (x < 8 and y > 2):`
   - `while x < 8 or y > 2:`
   - `while not (x <= 8 and y >= 2):`
   - ✅ De Morgan: `not (A and B)` equals `not A or not B`.
   *Why:* Negate the stop condition with De Morgan's law.

78. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef test_one(x):
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
    print('--')
   **Answer:** `alpha
alpha
beta
orange
--
alpha
beta
apple
--`
   *Note:* `and` and `or` short-circuit, so the second test is not called if the first already decides the result; each `elif` call prints again.

79. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythona = 1
b = 5.0
if (a % 2 == 1):
    print(a / a)
else:
    print(b / a)
   **Answer:** `1.0`
   *Note:* `a % 2 == 1` is true, and `1 / 1` is the float 1.0.

---

## Chapter 5. Loops

80. **[MCQ]** Which values does `range(1, 4)` produce?
   - 1, 2, 3, 4
   - ✅ 1, 2, 3
   - 0, 1, 2, 3
   - 1, 4
   *Why:* The end is never included.

81. **[MCQ]** Which statement leaves a loop immediately?
   - `continue`
   - `pass`
   - ✅ `break`
   - `return` outside a function
   *Why:* `break` ends the loop.

82. **[MCQ]** Which loop is best when you know the number of repeats in advance?
   - `while True`
   - No loop
   - `if`
   - ✅ `for`
   *Why:* `for` with `range` is the usual choice.

83. **[MCQ]** What is the first value of `range(5, 0, -1)`?
   - ✅ 5
   - 0
   - 4
   - 1
   *Why:* It runs 5, 4, 3, 2, 1.

84. **[MCQ]** What goes wrong with `count = 0` then `while count < 5: print(count)` (no update)?
   - It prints once
   - ✅ It never ends
   - It raises NameError
   - It prints 0 to 4
   *Why:* The loop variable must be updated.

85. **[MSQ]** Which statements about `range` are correct?
   - ✅ `range(5)` yields 0 to 4.
   - `range(2, 6)` includes 6.
   - ✅ `range(5, 0, -1)` yields 5, 4, 3, 2, 1.
   - ✅ `sum(range(1, 6))` is `15`.
   - ✅ `len(range(3, 10))` is `7`.
   *Why:* The end value is excluded.

86. **[MSQ]** The loop `for i in range(2, 6): output = i*2; print(output, end="")` runs. Which statements are correct?
   - ✅ It prints `46810`.
   - It prints each number on its own line.
   - ✅ After the loop `output` is `10`.
   - ✅ After the loop `i` is `5`.
   - The body runs 5 times.
   *Why:* Count the iterations from the range.

87. **[MSQ]** `for i in range(5): if i == 2: continue; if i == 4: break; print(i)` runs. Which statements are correct?
   - ✅ It prints `0`, `1`, `3`.
   - ✅ `continue` skips the rest of the current iteration.
   - ✅ `break` exits the loop entirely.
   - `pass` skips to the next iteration.
   - `2` is printed.
   *Why:* `pass` is only a placeholder.

88. **[MSQ]** Which countdown statements are correct?
   - ✅ `for i in range(5, 0, -1)` prints 5 4 3 2 1.
   - `for i in range(5, 0)` prints 5 4 3 2 1.
   - ✅ A `while seconds > 0:` loop that does `seconds -= 1` ends.
   - ✅ Forgetting `seconds -= 1` gives an infinite loop.
   - ✅ `range(10, 0, -2)` yields 10, 8, 6, 4, 2.
   *Why:* The step controls the direction.

89. **[MSQ]** The loop `total = 0; for i in range(1, 1000): if i % 3 == 0 or i % 5 == 0: total += i` runs. Which statements are correct?
   - ✅ `total` is `233168`.
   - ✅ `range(1, 1000)` excludes 1000.
   - A number such as 15 is added twice.
   - ✅ Using `and` instead of `or` would add only the multiples of 15.
   - ✅ The one-line `sum(i for i in range(1, 1000) if ...)` gives the same total.
   *Why:* `or` includes a number once even if both conditions hold.

90. **[MSQ]** A loop reads scores with `while True: raw = input(...); if raw == "": break; values.append(int(raw))`. Which statements are correct?
   - ✅ `while True:` runs until a `break`.
   - ✅ An empty entry ends the loop.
   - ✅ The average is `sum(values) / len(values)`.
   - ✅ With no values, `len(values)` is zero and dividing raises `ZeroDivisionError`.
   - The `break` is optional because the loop ends by itself.
   *Why:* Guard the average against an empty list.

91. **[MSQ]** A string must have between 3 and 8 characters. Which loop conditions are correct for re-asking?
   - ✅ `while len(s) < 3 or len(s) > 8:`
   - `while len(s) >= 3 and len(s) <= 8:`
   - ✅ `while not (3 <= len(s) <= 8):`
   - ✅ The input must be read again inside the loop.
   - `while len(s) < 3 and len(s) > 8:`
   *Why:* Loop while the value is invalid.

92. **[MSQ]** Which statements about loops over strings are correct?
   - ✅ `"-".join(["a", "b", "c"])` is `"a-b-c"`.
   - ✅ Repeating `result += letter + "-"` gives `"a-b-c-"`.
   - ✅ `for ch in "Python"` visits each character.
   - ✅ `for i in range(len(text))` gives the positions.
   - `"-".join([1, 2, 3])` works.
   *Why:* join only accepts strings.

93. **[MSQ]** The loop `i = 0; while i < len(items): if items[i] == 2: items.pop(i) else: i += 1` runs on `items = [1, 2, 3, 2, 4, 2]`. Which statements are correct?
   - ✅ The final list is `[1, 3, 4]`.
   - ✅ Not incrementing `i` after `pop` is deliberate.
   - ✅ For `[2, 2, 3]`, always incrementing `i` would leave a `2` behind.
   - `items.remove(2)` would remove every 2 in one call.
   - ✅ `pop(i)` removes and returns the item at index `i`.
   *Why:* Changing a list while looping needs care with the index.

94. **[MSQ]** `count = 0; for i in range(3): for j in range(2): count += 1; print(count)`. Which statements are correct?
   - ✅ It prints `6`.
   - ✅ The inner loop runs 2 times for each outer iteration.
   - The body runs 5 times in total.
   - ✅ A `break` in the inner loop exits only the inner loop.
   - ✅ Two nested loops over `n` take about `n²` steps.
   *Why:* Multiply the loop counts for nested loops.

95. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonis_mystery = False
is_magic = False
for i in range(3):
    if is_mystery:
        print('apple')
        is_magic = not is_magic
    if is_mystery and is_magic:
        print('pear')
    elif is_magic:
        print('orange')
    is_mystery = not is_mystery
   **Answer:** `apple
pear
orange`
   *Note:* Trace the two flags each time round the loop: the second pass flips `is_magic` to True.

96. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonfor i in range(4, -2, -1):
    print(4 * i - 1)
   **Answer:** `15
11
7
3
-1
-5`
   *Note:* The loop runs i = 4, 3, 2, 1, 0, -1.

97. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonfor i in range(15, -2, -4):
    print(i)
   **Answer:** `15
11
7
3
-1`
   *Note:* The stop value is excluded: 15, 11, 7, 3, -1.

---

## Chapter 6. Lists

98. **[MCQ]** What does `print(a.append(3))` print?
   - The new list
   - `3`
   - ✅ `None`
   - Nothing at all
   *Why:* Mutating methods return `None`.

99. **[MCQ]** After `a = [1, 2]`, `b = a`, `b.append(3)`, what is `a`?
   - `[1, 2]`
   - `[3]`
   - An error
   - ✅ `[1, 2, 3]`
   *Why:* `a` and `b` refer to one list.

100. **[MCQ]** What is `[10, 9, 8, 7, 6][0:2]`?
   - ✅ `[10, 9]`
   - `[10, 9, 8]`
   - `10`
   - `[9, 8]`
   *Why:* Indices 0 and 1.

101. **[MCQ]** Which creates an independent copy of list `a`?
   - `b = a`
   - ✅ `a.copy()`
   - `a.sort()`
   - `a.append(a)`
   *Why:* `copy()` makes a new list.

102. **[MCQ]** What is `[x**2 for x in range(4)]`?
   - `[1, 4, 9, 16]`
   - `[0, 1, 2, 3]`
   - ✅ `[0, 1, 4, 9]`
   - `(0, 1, 4, 9)`
   *Why:* Squares of 0, 1, 2, 3.

103. **[MSQ]** With `fruits = ["apple", "banana", "cherry"]`, which results are correct?
   - ✅ `fruits[-1]` is `"cherry"`.
   - ✅ `fruits[1:3]` is `["banana", "cherry"]`.
   - ✅ `fruits[:2]` is `["apple", "banana"]`.
   - ✅ `fruits[::-1]` is `["cherry", "banana", "apple"]`.
   - `fruits[3]` is `"cherry"`.
   *Why:* Valid indices run from 0 to 2.

104. **[MSQ]** `numbers = [3, 1, 4, 1, 5]` then `append(9)`, `insert(0, 2)`, `remove(1)`, `x = numbers.pop()`, `numbers.sort()`, `numbers.reverse()`. Which statements are correct?
   - ✅ After the first three calls the list is `[2, 3, 4, 1, 5, 9]`.
   - ✅ `x` is `9`.
   - ✅ The final list is `[5, 4, 3, 2, 1]`.
   - `numbers.sort()` returns the sorted list.
   - `remove(1)` removes every 1.
   *Why:* Trace the list after every call.

105. **[MSQ]** With `list1 = [1, 2]`, `list2 = list1`, `list2.append(3)`, `list3 = list1 + [4]`, `list4 = list1.copy()`, which statements are correct?
   - ✅ `list1` is `[1, 2, 3]`.
   - ✅ `list2 is list1` is `True`.
   - ✅ `list3` is a new list `[1, 2, 3, 4]`.
   - ✅ `list4` is an independent copy.
   - `list2 = list1` creates a separate copy.
   *Why:* Only copy() and + create new lists.

106. **[MSQ]** Which statements about functions and mutable arguments are correct?
   - ✅ `my_list = []` inside a function leaves the caller's list unchanged.
   - ✅ `my_list[0] = "Zeus"` inside a function changes the caller's list.
   - ✅ `your_list = my_list; your_list.append(["Hades"])` adds a nested list to the caller's list.
   - Adding `"2"` to a local string copy changes the caller's list item.
   - `my_list = my_list + [1]` inside a function changes the caller's list.
   *Why:* Mutate versus rebind.

107. **[MSQ]** With `nums = [10, 9, 8, 7, 6]`, which results are correct?
   - ✅ `nums[len(nums) - 1]` is `6`.
   - `nums[:1]` is `10`.
   - ✅ `nums[0:2]` is `[10, 9]`.
   - ✅ `nums[-2:]` is `[7, 6]`.
   - `nums[5]` is `6`.
   *Why:* A slice is always a list.

108. **[MSQ]** With `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`, which results are correct?
   - ✅ `matrix[0][1]` is `2`.
   - ✅ `matrix[1]` is `[4, 5, 6]`.
   - `matrix[2][0]` is `3`.
   - ✅ `[row[0] for row in matrix]` is `[1, 4, 7]`.
   - ✅ `len(matrix)` is `3`.
   *Why:* First index is the row.

109. **[MSQ]** Which comprehension results are correct?
   - ✅ `[x**2 for x in range(5)]` is `[0, 1, 4, 9, 16]`.
   - ✅ `[x for x in range(10) if x % 2 == 0]` is `[0, 2, 4, 6, 8]`.
   - ✅ The `if` filter goes after the `for` clause.
   - `[x for x in range(3)]` is the tuple `(0, 1, 2)`.
   - ✅ A comprehension builds a new list.
   *Why:* Brackets decide the result type.

110. **[MSQ]** Which statements about `enumerate` and searching are correct?
   - ✅ `enumerate(fruits)` gives (index, item) pairs.
   - ✅ With `i + 1` the first printed number is 1.
   - `enumerate` changes the list.
   - ✅ `for fruit in fruits` does not give the position.
   - ✅ `fruits.index("banana")` is `1`.
   *Why:* `enumerate` adds the index to a loop.

111. **[MSQ]** Run `a = [1, 2]`, `b = a`, `print(a.append(3))`, `c = a + [9]`. Which statements are correct?
   - ✅ The print shows `None`.
   - ✅ `b` is `[1, 2, 3]`.
   - ✅ `c` is `[1, 2, 3, 9]`.
   - `c` and `a` are the same object.
   - `a.append(3)` returns the new list.
   *Why:* Alias, then a new list.

112. **[MSQ]** With `fruits = ["apple", "banana", "cherry"]`, which statements are correct?
   - ✅ `fruits.count("apple")` counts the matches.
   - ✅ `fruits.index("banana")` is the position of the first match.
   - ✅ `"kiwi" in fruits` is `False`.
   - `fruits.index("kiwi")` returns `-1`.
   - ✅ `len(fruits)` counts the items.
   *Why:* `index` raises an error for a missing item.

113. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonnumbers = [1, 2, 3, 4, 5]
print(numbers[::-2])
numbers = [2, 4, 7, 3, 1, 9]
print(numbers[4:7])
values = ['apple', 'orange', 'pear']
print(['apple'] in values)
line = 'apple##orange#word'
print(line.split('#'))
   **Answer:** `[5, 3, 1]
[1, 9]
False
['apple', '', 'orange', 'word']`
   *Note:* `[::-2]` walks backwards in steps of 2; a slice past the end is clipped; `["apple"]` (a list) is not an element; splitting on `#` keeps empty strings between adjacent separators.

114. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef do_magic(words):
    words = ['apple']
    return words
words = ['orange']
result = do_magic(words)
print(words)
print(result)
   **Answer:** `['orange']
['apple']`
   *Note:* Rebinding the parameter does not change the caller's list.

115. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythoncolors = ['green', 'yellow', 'blue', 'purple']
print(colors[:-3])
print(colors[4])
   **Answer:** `['green']
error`  or  `['green']
- error -`
   *Note:* `[:-3]` keeps everything except the last three items; index 4 is out of range.

116. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef perform_magic(orig):
    copy = orig
    orig.append(1)
    copy += orig

fruits = [2]
perform_magic(fruits)
print(fruits)
   **Answer:** `[2, 1, 2, 1]`
   *Note:* `copy = orig` is an alias, and `copy += orig` extends the same list in place (with itself).

117. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonwords = 'hello hi bonjour salut nihao'
new_list = []
for element in words.split():
    if len(element) >= 5:
        new_list.append(element)
print(new_list)
   **Answer:** `['hello', 'bonjour', 'salut', 'nihao']`
   *Note:* Only words with five or more letters are kept.

---

## Chapter 7. Tuples

118. **[MCQ]** Which of these is a tuple with one item?
   - `(1)`
   - `[1]`
   - `{1}`
   - ✅ `(1,)`
   *Why:* The trailing comma makes the tuple.

119. **[MCQ]** What does `t = (1, 2, 3)` then `t[0] = 10` do?
   - ✅ Raises a `TypeError`
   - Changes t to (10, 2, 3)
   - Appends 10
   - Does nothing
   *Why:* Tuples cannot be changed in place.

120. **[MCQ]** After `x, y = (10, 20)`, what is `y`?
   - `10`
   - ✅ `20`
   - `(10, 20)`
   - An error
   *Why:* Unpacking assigns in order.

121. **[MCQ]** Which can be used as a dictionary key?
   - The list `[1, 2]`
   - A dictionary
   - ✅ The tuple `(1, 2)`
   - A set
   *Why:* Immutable types can be keys.

122. **[MCQ]** When is a tuple a better choice than a list?
   - When you need to append items
   - When you need to sort in place
   - When the length will grow
   - ✅ When the data should not change
   *Why:* Tuples signal fixed data.

123. **[MSQ]** Which of these are tuples?
   - ✅ `(1,)`
   - `(1)`
   - ✅ `fruits = "apple", "banana"`
   - ✅ `()`
   - `[1, 2]`
   *Why:* The comma is what makes a tuple.

124. **[MSQ]** With `t = (1, 2, 3)`, which statements are correct?
   - ✅ `t[0] = 10` raises a `TypeError`.
   - `t.append(4)` works.
   - ✅ `t + (4,)` creates a new tuple.
   - ✅ `t[1:]` is `(2, 3)`.
   - Tuples cannot be indexed.
   *Why:* Read freely; do not modify.

125. **[MSQ]** Which statements about unpacking are correct?
   - ✅ `x, y = (10, 20)` makes `x` 10 and `y` 20.
   - ✅ `name, age = get_name_age()` works if the function does `return "Bob", 13`.
   - `a, b = (1, 2, 3)` works.
   - ✅ `return "Bob", 13` returns a tuple.
   - ✅ `a, b = b, a` swaps two variables.
   *Why:* The numbers of names and values must match.

126. **[MSQ]** With `numbers = (1, 2, 3, 2, 4, 2)`, which statements are correct?
   - ✅ `numbers.count(2)` is `3`.
   - ✅ `numbers.index(3)` is `2`.
   - `numbers.index(2)` is `3`.
   - ✅ `numbers.index(9)` raises `ValueError`.
   - ✅ `len(numbers)` is `6`.
   *Why:* `index` returns the first position.

127. **[MSQ]** Which statements about tuples as dictionary keys are correct?
   - ✅ `{(1, 2): "x"}` is valid.
   - `{[1, 2]: "x"}` is valid.
   - ✅ Tuples of immutable items can be keys.
   - A tuple that contains a list can be a key.
   - ✅ Lists are mutable, so they cannot be keys.
   *Why:* Keys must be hashable.

128. **[MSQ]** Which statements about choosing a tuple or a list are correct?
   - ✅ Use a tuple for data that should not change.
   - ✅ Use a tuple to return several values from a function.
   - ✅ Use a list when items must be added or removed.
   - A to-do list that grows is best stored as a tuple.
   - ✅ Tuples can be dictionary keys but lists cannot.
   *Why:* Choose by whether the data changes.

129. **[MSQ]** `for item in inventory: name, price, on_sale = item` where each `item` is `("banana", 0.49, True)`. Which statements are correct?
   - ✅ It unpacks a three-item tuple into three names.
   - ✅ It raises `ValueError` if an item does not have three values.
   - ✅ `item[1]` is the price.
   - ✅ It also works for a three-item list.
   - It changes `item`.
   *Why:* Unpacking reads; it does not change the tuple.

130. **[MSQ]** Which statements comparing lists and tuples are correct?
   - ✅ A tuple is written with parentheses.
   - ✅ A tuple cannot `append`.
   - ✅ Both can be indexed.
   - ✅ Both can be looped over.
   - Tuples are mutable.
   *Why:* Same reading operations, different writing rights.

131. **[MSQ]** With `colours = ("red", "green", "blue")`, which results are correct?
   - ✅ `colours[1:3]` is `("green", "blue")`.
   - `colours[1:3]` is a list.
   - ✅ `colours[-1]` is `"blue"`.
   - ✅ `colours[::-1]` is `("blue", "green", "red")`.
   - `colours[3]` is `"blue"`.
   *Why:* A slice keeps the type.

132. **[MSQ]** With `person = ("Alice", 12, True)`, which statements are correct?
   - ✅ `person[-1]` is `True`.
   - ✅ `person.index(12)` is `1`.
   - ✅ `person.count("Alice")` is `1`.
   - ✅ A tuple can hold mixed types.
   - `person[1] = 13` works.
   *Why:* Mixed types are fine; changes are not.

133. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonvalues = [('a', 1), ('b', 2), ('c', 3)]
total = 0
for name, n in values:
    total += n
print(name, total)
   **Answer:** `c 6`
   *Note:* The loop variables keep their last values after the loop ends.

---

## Chapter 8. Dictionaries

134. **[MCQ]** What does `student.get("gender")` return if the key is missing?
   - ✅ `None`
   - `KeyError`
   - An empty string
   - `0`
   *Why:* `get` returns `None` by default.

135. **[MCQ]** Which can NOT be a dictionary key?
   - A string
   - ✅ A list
   - A tuple
   - An integer
   *Why:* Lists are mutable, so unhashable.

136. **[MCQ]** What does `for k, v in d.items():` give each time?
   - Only the keys
   - Only the values
   - ✅ A key and its value
   - The index
   *Why:* `items()` gives pairs.

137. **[MCQ]** After `counts = {}` and `counts["a"] = counts.get("a", 0) + 1`, what is `counts`?
   - `{}`
   - `{"a": 0}`
   - A KeyError
   - ✅ `{"a": 1}`
   *Why:* 0 + 1 = 1.

138. **[MCQ]** What does `"age" in student` test?
   - ✅ Whether `"age"` is a key
   - Whether it is a value
   - Whether it is a type
   - Whether it is sorted
   *Why:* Membership tests keys.

139. **[MSQ]** With `student = {"name": "Alice", "age": 20, "grade": "A"}`, which statements are correct?
   - ✅ `student["age"] = 21` updates an existing key.
   - ✅ `student["major"] = "CS"` adds a new key.
   - ✅ `student["gender"]` raises `KeyError`.
   - ✅ `student.get("gender")` returns `None`.
   - `student.get("gender", "N/A")` raises `KeyError`.
   *Why:* `[]` is strict; `get` is safe.

140. **[MSQ]** `word_counts = {}` and `for word in ["apple", "banana", "apple"]: word_counts[word] = word_counts.get(word, 0) + 1`. Which statements are correct?
   - ✅ The result is `{"apple": 2, "banana": 1}`.
   - ✅ `get(word, 0)` supplies 0 for an unseen word.
   - `word_counts[word] += 1` would also work for an unseen word.
   - ✅ The dictionary ends with two keys.
   - ✅ Keys keep their insertion order.
   *Why:* Initialise before you increment.

141. **[MSQ]** Which statements about dictionary keys and values are correct?
   - ✅ A tuple key such as `(1, 2)` is valid.
   - ✅ `{[1, 2]: "x"}` raises `TypeError`.
   - ✅ Values can be lists.
   - Keys must be strings.
   - ✅ `"age" in student` tests the keys.
   *Why:* Keys must be hashable; values can be anything.

142. **[MSQ]** `my_dict = {"nums": [1, 2]}`, `a = my_dict["nums"]`, `b = a`, `b.append(99)`. Which statements are correct?
   - ✅ `a` is `[1, 2, 99]`.
   - ✅ `my_dict["nums"]` is `[1, 2, 99]`.
   - ✅ `b = a.copy()` before the append would leave `a` unchanged.
   - `b = a` creates an independent list.
   - `my_dict.copy()` makes a deep copy of the nested lists.
   *Why:* Aliasing applies to values too.

143. **[MSQ]** `students = {"Alice": {"age": 12, "grade": "A"}, "Bob": {...}}`. Which statements are correct?
   - ✅ `students["Alice"]["age"]` is `12`.
   - ✅ `students["David"]["age"]` raises `KeyError`.
   - ✅ `students.get("David", {}).get("age", "Not found")` is `"Not found"`.
   - ✅ `"David" in students and "age" in students["David"]` checks safely.
   - `students.get("David")["age"]` is `"Not found"`.
   *Why:* Check or default at every level.

144. **[MSQ]** `invert_actor_dictionary(actor_db)` loops `for actor, movies in actor_db.items():` and `for movie in movies:`. Which statements are correct?
   - ✅ It uses a nested loop over actors and their movies.
   - ✅ `if movie not in dct: dct[movie] = []` creates the list the first time.
   - ✅ `dct[movie].append(actor)` adds the actor to that movie.
   - It requires every movie to belong to only one actor.
   - ✅ The result maps each movie to a list of actors.
   *Why:* Create-then-append builds groups.

145. **[MSQ]** Movies are grouped as `dct[(film, year)]` with the actors in a list. Which statements are correct?
   - ✅ The key `(film, year)` is a tuple, so it is valid.
   - ✅ Two films with the same title but different years get different keys.
   - ✅ The year must be converted with `int(...)` if the file holds text.
   - Using a list `[film, year]` as the key works equally well.
   - ✅ `if key not in dct: dct[key] = []` must come before the append.
   *Why:* A compound key needs a tuple.

146. **[MSQ]** Which statements about iterating over a dictionary are correct?
   - ✅ `for key in d` iterates over the keys.
   - ✅ `for k, v in d.items()` gives keys and values.
   - ✅ `for v in d.values()` gives the values.
   - ✅ `list(d.keys())` gives a list of keys.
   - `d.items()` gives only the values.
   *Why:* Choose keys, values or items.

147. **[MSQ]** Which statements about dictionary efficiency are correct?
   - ✅ A dictionary lookup is O(1) on average.
   - ✅ Scanning a list of pairs for a key is O(n).
   - ✅ Memoization stores results in a dictionary.
   - A memoized `fibonacci(n)` recomputes every smaller value each time.
   - A dictionary lookup takes longer the bigger the dictionary is.
   *Why:* Dictionaries trade memory for speed.

148. **[MSQ]** Run `def my_func(my_list): my_dict = {}; for i in range(len(my_list)): new_list = my_list + [i]; my_dict[i] = new_list[i::i+1]; my_list.append(my_dict[0]); return my_dict` with `a_list = [5, 6, 7]`. Which statements are correct?
   - ✅ `my_dict[1]` is `[6, 1]`.
   - ✅ `my_dict[2]` is `[7]`.
   - ✅ `a_list` has 4 elements afterwards.
   - ✅ `a_list[3]` is `[5, 6, 7, 0]`.
   - `my_dict[0]` is `[5, 6, 7]`.
   *Why:* new_list is a fresh list each time; my_list is mutated once.

---

## Chapter 9. Scope, Global Variables & Nested Functions

149. **[MCQ]** What does `count += 1` do inside a function if `count` is global and not declared `global`?
   - Increments the global
   - ✅ Raises an error
   - Creates a second global
   - Does nothing
   *Why:* Python treats the name as local.

150. **[MCQ]** Which keyword lets an inner function modify a variable of its outer function?
   - `global`
   - `local`
   - ✅ `nonlocal`
   - `static`
   *Why:* `nonlocal` rebinds the enclosing variable.

151. **[MCQ]** Where can a nested function `inner()` be called?
   - Anywhere in the file
   - Only at module level
   - From other modules
   - ✅ Only inside the outer function
   *Why:* It exists only while outer runs.

152. **[MCQ]** What is `double(5)` after `double = make_multiplier(2)`?
   - ✅ `10`
   - `7`
   - `25`
   - An error
   *Why:* The inner function remembers x = 2.

153. **[MCQ]** What is the best way to share a counter between calls without `global`?
   - Use a hidden global
   - ✅ Pass it in and return the new value
   - Use `print`
   - Redefine it each call
   *Why:* `count = increment(count)`.

154. **[MSQ]** Which statements about global variables are correct?
   - ✅ A function can read a global without declaring it.
   - ✅ `count += 1` inside a function fails without `global`.
   - ✅ Declaring `global count` allows the function to change it.
   - Globals are the best way to share data in large programs.
   - ✅ A global is defined outside every function.
   *Why:* Assignment decides locality.

155. **[MSQ]** Which statements about local variables are correct?
   - ✅ A variable assigned in a function is local.
   - ✅ It exists only during the call.
   - It can be read after the function returns.
   - ✅ Parameters are local.
   - ✅ Two functions can each have a local `x`.
   *Why:* Locals are private to a call.

156. **[MSQ]** With `def outer(): def inner(): print("Inner")  inner()`, which statements are correct?
   - ✅ `outer()` prints `Inner`.
   - ✅ `inner()` called at module level raises `NameError`.
   - Defining `inner` runs it.
   - ✅ Nested functions keep helpers private.
   - Every function must be nested.
   *Why:* A nested function is local to its outer function.

157. **[MSQ]** With `def make_multiplier(x): def multiplier(n): return n * x  return multiplier`, `double = make_multiplier(2)`, `triple = make_multiplier(3)`, which results are correct?
   - ✅ `double(5)` is `10`.
   - ✅ `triple(5)` is `15`.
   - ✅ `double` remembers `x` after `make_multiplier` returned.
   - `triple(5)` is `25`.
   - Both functions share one `x`.
   *Why:* Each call to the outer function makes a new closure.

158. **[MSQ]** With `def outer(): count = 0  def inner(): nonlocal count; count += 1; print(count)  return inner` and `counter = outer()`, which statements are correct?
   - ✅ Three calls of `counter()` print 1, 2, 3.
   - ✅ Without `nonlocal`, `count += 1` would fail.
   - `nonlocal` refers to a global variable.
   - ✅ `outer()` returns the function `inner`.
   - Each call to `counter()` resets `count` to 0.
   *Why:* `nonlocal` is for enclosing functions.

159. **[MSQ]** Which versions of a counter avoid `global`?
   - ✅ `def increment(count): return count + 1` with `count = increment(count)`.
   - `def increment(): global count; count += 1`.
   - ✅ A closure with `nonlocal`.
   - `def increment(): count += 1`.
   - A function that prints instead of returning.
   *Why:* State can live in parameters or closures.

160. **[MSQ]** Which statements about `process_data(data)` with a nested `clean(text)` that does `text.strip().lower()` are correct?
   - ✅ `clean` is hidden inside `process_data`.
   - ✅ `[clean(item) for item in data]` applies it to each item.
   - ✅ For `[" Alice ", "BOB "]` the result is `["alice", "bob"]`.
   - `clean` can be called from anywhere.
   - `clean` changes the strings in `data`.
   *Why:* Helpers keep logic organised.

161. **[MSQ]** Which statements about scope are correct?
   - ✅ Python looks for a name in local scope first.
   - ✅ A local name hides a global of the same name.
   - Reading a global requires `global`.
   - Using `global` for everything is good practice.
   - ✅ Locals of one call are separate from locals of another call.
   *Why:* Local first, then outward.

162. **[MSQ]** `x = 10`, `def f(): x = 5`, `f()`, `print(x)`. Which statements are correct?
   - ✅ It prints `10`.
   - ✅ The `x = 5` created a local variable.
   - ✅ Adding `global x` in `f` would make it print `5`.
   - It prints `5`.
   - It raises `NameError`.
   *Why:* Without `global`, assignment is local.

163. **[MSQ]** Which statements about closures are correct?
   - ✅ An inner function can use variables of the outer function.
   - ✅ The outer variables survive after the outer function finished.
   - A closure needs the `global` keyword.
   - ✅ Closures let you build several customised functions from one definition.
   - A closure is a copy of the outer function's code.
   *Why:* A closure bundles a function with its environment.

164. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythonx = 10
def f():
    x = 5
    return x
print(f(), x)
   **Answer:** `5 10`
   *Note:* The assignment inside `f` creates a local `x`; the global stays 10.

165. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythoncount = 0
def inc():
    count += 1
inc()
print(count)
   **Answer:** `error`  or  `- error -`
   *Note:* Assigning to `count` makes it local, but it has no value yet, so the call raises `UnboundLocalError`.

---

## Chapter 10. File Input & Output

166. **[MCQ]** Which mode erases an existing file when opened?
   - `"r"`
   - `"a"`
   - ✅ `"w"`
   - `"r+"`
   *Why:* `"w"` truncates.

167. **[MCQ]** Why use `with open(...)`?
   - It makes reading faster
   - It creates the file
   - It sorts the lines
   - ✅ It closes the file automatically
   *Why:* It guarantees the file is closed.

168. **[MCQ]** What does a line read from a file usually end with?
   - ✅ A newline character
   - A comma
   - Nothing
   - A space
   *Why:* Use `strip()` to remove it.

169. **[MCQ]** Which exception is raised when opening a missing file?
   - `ValueError`
   - ✅ `FileNotFoundError`
   - `KeyError`
   - `IndexError`
   *Why:* Catch it with try/except.

170. **[MCQ]** What does `csv.DictReader` give for each row?
   - A tuple
   - A single string
   - ✅ A dictionary keyed by the header names
   - A set
   *Why:* Access fields as `row["Name"]`.

171. **[MSQ]** Which statements about file modes are correct?
   - ✅ `"r"` is the default mode.
   - ✅ `"w"` overwrites an existing file.
   - ✅ `"a"` adds to the end of the file.
   - `"w"` keeps the existing content.
   - ✅ Opening a missing file with `"r"` raises `FileNotFoundError`.
   *Why:* `"w"` is destructive.

172. **[MSQ]** Which statements about `with open("x.txt") as f:` are correct?
   - ✅ The file is closed when the block ends.
   - ✅ `f.read()` returns the whole content as a string.
   - ✅ `for line in f:` reads one line at a time.
   - You must call `f.close()` yourself.
   - ✅ Each `line` includes its trailing newline.
   *Why:* `with` manages closing.

173. **[MSQ]** Which statements about writing are correct?
   - ✅ `f.write("a")` followed by `f.write("b")` writes `ab` on one line.
   - ✅ `f.write("Hello\n")` ends the line.
   - ✅ `f.writelines(["Line 1\n", "Line 2\n"])` writes two lines.
   - `write` adds a newline automatically.
   - Opening with `"w"` twice on the same file keeps both writes.
   *Why:* You control newlines.

174. **[MSQ]** A file has lines like `Alice,90`. Which code fragments correctly build a list of `(name, int score)` tuples?
   - ✅ `name, score = line.strip().split(","); scores.append((name, int(score)))`
   - `scores.append(line.split(","))`
   - `name, score = line.split(",")` without `int` gives a number.
   - ✅ Looping `for line in file:` reads every line.
   - `strip()` removes the comma.
   *Why:* Convert the score; split on the right delimiter.

175. **[MSQ]** Which statements about missing files are correct?
   - ✅ `os.path.exists("data.csv")` tells you if it exists.
   - ✅ `try: open(...) except FileNotFoundError:` handles a missing file.
   - A missing file silently gives an empty string.
   - ✅ Handling the error lets the program continue gracefully.
   - `FileNotFoundError` is raised for `"w"` on a new file.
   *Why:* Check or catch.

176. **[MSQ]** Which statements about CSV files are correct?
   - ✅ Use `newline=""` when writing with `csv.writer`.
   - ✅ `csv.reader` gives each row as a list.
   - ✅ `csv.DictReader` lets you use `row["Name"]`.
   - The column order must never change when using `DictReader`.
   - ✅ `writer.writerow(["Alice", "Gryffindor"])` writes one row.
   *Why:* DictReader adapts to column order.

177. **[MSQ]** `def read_actor_db(filename)` uses the header row to find the `Film`, `Actor` and `Year` columns and returns `{(film, int(year)): [actors]}`. Which statements are correct?
   - ✅ Finding columns by header name copes with a changed column order.
   - ✅ A tuple key `(film, year)` is valid.
   - ✅ `int(data[year_col])` converts the year.
   - ✅ `if key not in dct: dct[key] = []` creates the list first.
   - A list could be used as the key instead.
   *Why:* Header, tuple key, conversion, grouping.

178. **[MSQ]** Which statements about tab-delimited parsing are correct?
   - ✅ `line.rstrip("\n").split("\t")` splits on tab.
   - Splitting on `","` would work for tab-separated data.
   - ✅ A `try`/`except FileNotFoundError` around the `with open` handles a missing file.
   - ✅ The function can return a list of `(name, phone)` tuples.
   - Tabs are removed by `strip()` in the middle of a line.
   *Why:* Choose the right delimiter.

179. **[MSQ]** With `"r+"`, `"w"`, `"a"`, which statements are correct?
   - ✅ `"r+"` reads and writes an existing file.
   - ✅ `"a"` never deletes existing lines.
   - ✅ `"w"` creates a new file if needed.
   - `"a"` truncates the file.
   - `"r"` can write to the file.
   *Why:* Pick the mode for the job.

180. **[MSQ]** Which statements about saving and loading a to-do list are correct?
   - ✅ Saving writes each task with a separator such as `|`.
   - ✅ Loading splits each line on the separator.
   - ✅ `done_str == "True"` converts the stored text back to a boolean.
   - ✅ A missing file on first run can be ignored with `except FileNotFoundError: pass`.
   - Using `bool("False")` converts it correctly.
   *Why:* Text files store text; convert on load.

---

## Chapter 11. Computational Efficiency

181. **[MCQ]** What is the Big O of a single loop over a list of length n?
   - `O(1)`
   - `O(n²)`
   - `O(log n)`
   - ✅ `O(n)`
   *Why:* One pass is linear.

182. **[MCQ]** What is `O(3n² + 5n + 10)` simplified?
   - ✅ `O(n²)`
   - `O(n)`
   - `O(3n²)`
   - `O(10)`
   *Why:* Keep the dominant term only.

183. **[MCQ]** Doubling n for an O(n²) algorithm roughly multiplies the work by?
   - 2
   - ✅ 4
   - 1
   - 8
   *Why:* (2n)² = 4n².

184. **[MCQ]** Which is O(1)?
   - Searching a list for a value
   - Sorting a list with bubble sort
   - ✅ `lst[0]`
   - Summing a list
   *Why:* One indexing operation.

185. **[MCQ]** Which describes the worst case of linear search?
   - Only the first item is checked
   - No items are checked
   - Half the items are skipped
   - ✅ Every item is checked
   *Why:* A missing target forces a full pass.

186. **[MSQ]** Which are the basic operations counted in the course?
   - ✅ Variable assignment.
   - ✅ Arithmetic.
   - ✅ Comparison.
   - ✅ List or string indexing.
   - Printing to the screen.
   *Why:* Count assignments, arithmetic, comparisons and indexing.

187. **[MSQ]** Which statements about Big O are correct?
   - ✅ It describes the worst case.
   - ✅ It keeps the dominant term.
   - Constants are kept: `O(3n)` is different from `O(n)`.
   - ✅ `O(2n + 3)` simplifies to `O(n)`.
   - ✅ `O(n² + n)` simplifies to `O(n²)`.
   *Why:* Drop constants and smaller terms.

188. **[MSQ]** Which complexities are correct?
   - ✅ `lst[0]` is O(1).
   - ✅ A single `for` loop over the list is O(n).
   - ✅ Two nested full loops over the list are O(n²).
   - A loop that returns when it finds the target has worst case O(1).
   - ✅ Three nested full loops are O(n³).
   *Why:* Early return does not lower the worst case.

189. **[MSQ]** `search_1` loops once and returns at a match; `search_2` has two nested loops over the list; `search_3` has three nested loops with an early return. Which statements are correct?
   - ✅ `search_1` is O(n).
   - ✅ `search_2` is O(n²).
   - ✅ `search_3` is O(n³) in the worst case.
   - `search_1` and `search_3` have the same worst case.
   - All three have the same worst case.
   *Why:* Count the nested loops.

190. **[MSQ]** Which statements about the two largest-number algorithms are correct?
   - ✅ Both give the correct answer.
   - ✅ The "track the largest so far" version is about `2l` operations.
   - ✅ The "compare with everyone" version is about `l²` operations.
   - ✅ For large lists the quadratic version is much slower.
   - They are equally fast for 20,000 items.
   *Why:* Correct does not mean efficient.

191. **[MSQ]** Doubling the input size: which statements are correct?
   - ✅ O(n) work roughly doubles.
   - ✅ O(n²) work roughly quadruples.
   - ✅ O(1) work stays the same.
   - ✅ For O(2ⁿ), adding one to n doubles the work.
   - O(n²) work only doubles.
   *Why:* Match the growth to the doubling effect.

192. **[MSQ]** Which statements about bubble sort are correct?
   - ✅ It swaps adjacent items that are out of order.
   - ✅ It has an outer loop and an inner loop.
   - ✅ It is O(n²) in the worst case.
   - It is O(n).
   - ✅ The result is a sorted list.
   *Why:* Nested loops over n give O(n²).

193. **[MSQ]** Which statements about lookups are correct?
   - ✅ A dictionary lookup is O(1) on average.
   - ✅ Searching a list of pairs for a key is O(n).
   - ✅ For 100,000 items the dictionary lookup is much faster.
   - A dictionary gets slower for every key added.
   - `x in some_list` is O(1).
   *Why:* Use dictionaries for lookups.

194. **[MSQ]** Which are rules of thumb for estimating complexity?
   - ✅ A single loop over the input is usually O(n).
   - ✅ A loop inside a loop is usually O(n²).
   - ✅ Drop constants and lower-order terms.
   - ✅ With added terms, only the dominant one matters: `O(2ⁿ + n²)` is `O(2ⁿ)`.
   - Keep every term for accuracy.
   *Why:* Estimate by loop structure.

195. **[MSQ]** Which statements about the efficiency of `find_largest_number_2` are correct?
   - ✅ It assigns `largest = num_list[0]` once.
   - ✅ The loop runs `l` times.
   - ✅ It performs about `2l` operations.
   - It checks every item against every other item.
   - ✅ It is O(n).
   *Why:* One pass tracking the maximum.

196. **[Fill]** What is printed when the code runs? Type each line of output on its own line; type `error` as the last line if it crashes (the output before the crash still counts).pythondef count_ops(n):
    ops = 0
    for i in range(n):
        for j in range(n):
            ops += 1
    return ops
print(count_ops(3), count_ops(6))
   **Answer:** `9 36`
   *Note:* Two nested loops over `n` run `n * n` times: doubling n quadruples the work.

---

## Chapter 12. Mini Projects

197. **[MCQ]** When does the `else` of a `while` loop run?
   - ✅ When the loop ends without `break`
   - Every time the loop starts
   - Only when `break` runs
   - When the condition is true
   *Why:* No break means the else runs.

198. **[MCQ]** Which check should come before `int(guess)` in the guessing game?
   - `guess.isalpha()`
   - ✅ `guess.isdigit()`
   - `len(guess)`
   - `guess == ""`
   *Why:* It avoids a `ValueError`.

199. **[MCQ]** Is hashing the same as encryption?
   - Yes, both can be reversed
   - Yes, but hashing is faster
   - ✅ No, hashing is one-way
   - No, encryption is one-way
   *Why:* A hash cannot be turned back into the text.

200. **[MCQ]** What does `if __name__ == "__main__":` do?
   - Always runs main
   - Imports the main module
   - Defines `main`
   - ✅ Runs `main()` only when the file is run directly
   *Why:* It makes a file importable.

201. **[MCQ]** What is a good structure to hold many tasks, each with a name and a done flag?
   - ✅ A list of dictionaries
   - A single string
   - A tuple of numbers
   - A set
   *Why:* Each dict is a task.

202. **[MSQ]** In the guessing game, which statements are correct?
   - ✅ `random.randint(1, 20)` can return 20.
   - ✅ `guess.isdigit()` stops non-numeric input before conversion.
   - ✅ `continue` skips counting an invalid entry.
   - ✅ `break` ends the loop when the guess is right.
   - The `else` of the `while` runs after a correct guess.
   *Why:* else runs when the guesses are used up.

203. **[MSQ]** Which statements about `while ... else` are correct?
   - ✅ The `else` runs if the loop ends normally.
   - ✅ The `else` is skipped if `break` ran.
   - ✅ It belongs to the `while`, not to an `if`.
   - It always runs.
   - ✅ It is useful for "all attempts used".
   *Why:* Break skips the else.

204. **[MSQ]** In the to-do app, which statements are correct?
   - ✅ Tasks are stored as a list of dictionaries.
   - ✅ `enumerate(tasks)` gives the number shown to the user.
   - ✅ Entering a task number needs `int(...) - 1` for the index.
   - ✅ A non-numeric entry is handled with `except ValueError`.
   - Tasks are saved in a tuple that is updated.
   *Why:* List of dicts plus input validation.

205. **[MSQ]** Which statements about loading tasks from a file are correct?
   - ✅ `line.strip().split("|")` separates name and status.
   - ✅ `done_str == "True"` gives a boolean.
   - ✅ `except FileNotFoundError: pass` starts with an empty list.
   - The file must always exist.
   - `bool(done_str)` gives the right boolean.
   *Why:* Convert the text back carefully.

206. **[MSQ]** Which statements about `if __name__ == "__main__":` are correct?
   - ✅ It runs `main()` only if the file is run directly.
   - ✅ When the file is imported, `main()` does not run.
   - It is required for every Python file.
   - ✅ It lets other files reuse the functions safely.
   - `__name__` is `"__main__"` for imported modules.
   *Why:* A guard for scripts.

207. **[MSQ]** Which statements about password checks are correct?
   - ✅ `any(c.isdigit() for c in pw)` checks for a digit.
   - ✅ `any(c.isupper() for c in pw)` checks for a capital.
   - ✅ A strong password in the notes needs 8+ characters, a digit, a capital and a symbol.
   - Checking `len(pw) < 8` is enough for strength.
   - ✅ Confirming the password twice catches typing mistakes.
   *Why:* Several independent rules.

208. **[MSQ]** Which statements about hashing are correct?
   - ✅ `hashlib.sha256(password.encode()).hexdigest()` gives a fixed-length string.
   - ✅ Hashing is one-way.
   - Hashing is the same as encryption.
   - ✅ Login compares the hash of the entered password with the stored hash.
   - ✅ Real systems use salted algorithms such as bcrypt or argon2.
   *Why:* Store hashes, not passwords.

209. **[MSQ]** Which statements about storing users in `users.json` are correct?
   - ✅ `json.load` reads the dictionary back.
   - ✅ `json.dump(users, f, indent=4)` saves it readably.
   - ✅ A missing file can return `{}` via `except FileNotFoundError`.
   - ✅ Usernames are the keys and hashes the values.
   - The password is stored in plain text.
   *Why:* Dictionaries map users to hashes.

210. **[MSQ]** Which statements about the login flow are correct?
   - ✅ Registration rejects a username already in the dictionary.
   - ✅ Login checks the username exists first.
   - ✅ Reset password repeats the strength checks.
   - ✅ Account menu loops until logout.
   - Login compares plain-text passwords.
   *Why:* Functions share a loaded dictionary.

211. **[MSQ]** Which statements about writing programs in functions are correct?
   - ✅ Small functions such as `add_task` and `view_tasks` are easier to test.
   - ✅ `main()` ties the menu together.
   - ✅ Functions can share a module-level `tasks` list.
   - A global list needs `global` to `append`.
   - ✅ Returning early with `return` handles empty lists.
   *Why:* append mutates; no global needed.
