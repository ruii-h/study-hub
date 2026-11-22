# 🐍 Python IS1704

> A complete summary of everything learned so far in Python — from basics to mini-projects.

<style>
  body { line-height: 1.65; font-size: 15.5px; }
  h1 {
    font-size: 2.1em;
    border-bottom: 3px solid var(--vscode-textLink-foreground);
    padding-bottom: 0.3em;
  }
  h2 {
    font-size: 1.55em;
    margin-top: 2.2em;
    padding: 0.35em 0.7em;
    border-left: 5px solid var(--vscode-textLink-foreground);
    background: var(--vscode-textBlockQuote-background);
    border-radius: 0 6px 6px 0;
  }
  h3 {
    font-size: 1.22em;
    margin-top: 1.7em;
    color: var(--vscode-textLink-foreground);
  }
  h4 {
    font-size: 1.05em;
    margin-top: 1.3em;
    font-weight: 700;
    opacity: 0.88;
  }
  p, li { font-size: 1em; }
  li { line-height: 1.65; }
  code {
    font-size: 0.92em;
    padding: 0.15em 0.4em;
    border-radius: 4px;
  }
  pre {
    border-radius: 8px;
    padding: 1em 1.2em;
    line-height: 1.55;
    font-size: 0.92em;
    border: 1px solid var(--vscode-panel-border);
  }
  pre code { padding: 0; border-radius: 0; }
  table { border-collapse: collapse; margin: 1em 0; }
  th, td { border: 1px solid var(--vscode-panel-border); padding: 6px 14px; }
  th { background: var(--vscode-textBlockQuote-background); }
  blockquote {
    border-left: 4px solid var(--vscode-textLink-foreground);
    padding: 0.4em 1em;
    opacity: 0.88;
  }
  hr { border: none; border-top: 2px solid var(--vscode-panel-border); margin: 2.6em 0; }
</style>

*(Note: the styling above only renders in VS Code's built-in preview — press `Ctrl+Shift+V`. It won't show on GitHub or other markdown viewers, but the plain structure still reads fine there.)*

---

## 📘 Table of Contents

1. [Basic Concepts](#1-basic-concepts)
2. [Input & Output](#2-input--output)
3. [Functions](#3-functions)
4. [Basic Math](#4-basic-math)
5. [Conditionals](#5-conditionals)
6. [Loops](#6-loops)
7. [Lists](#7-lists)
8. [Tuples](#8-tuples)
9. [Dictionaries](#9-dictionaries)
10. [Global Variables & Nested Functions](#10-global-variables--nested-functions)
11. [File Input & Output](#11-file-input--output)
12. [Computational Efficiency](#12-computational-efficiency)
13. [Mini Projects Built](#13-mini-projects-built)

---

## 1. Basic Concepts

### 📊 Data Types

```python
name = "Alice"        # str
age = 12              # int
height = 1.5          # float
is_student = True     # boolean
```

### 🔁 Type Conversion

```python
age_str = input("Enter age: ")
age_int = int(age_str)
```

### 🔍 Type Checking

```python
type("hello")   # <class 'str'>
type(123)       # <class 'int'>
```

### 🟢 Quotation Marks

Use `" "` or `' '` for strings:
```python
message = "Hello"
color = 'blue'
```

### 🟡 Parentheses `()`

Parentheses show up in a few different roles:
- **Calling functions:** `print("Hello")`
- **Grouping expressions:** `(2 + 3) * 4`
- **Tuples:** `coordinates = (10, 20)`
- **Control flow:** conditionals & loops

### 𓍼 Strings

```python
# String indexing and slicing
text = "Python"
print(text[0])      # "P"
print(text[-1])     # "n"
print(text[1:4])    # "yth"

text = "  Hello World  "
print(text.upper())            # "  HELLO WORLD  "
print(text.lower())            # "  hello world  "
print(text.strip())            # "Hello World"
print(text.replace("o", "0"))  # "  Hell0 W0rld  "
print(text.split())            # ["Hello", "World"]
print(*text)                   # "  H e l l o   W o r l d  "    
```

### 🧱 String Immutability and Safety

```python
text = "Python"
# text[0] = "J"   # ❌ Error: strings are immutable

new_text = "J" + text[1:]  # ✅ Create a new string instead
print(new_text)             # "Jython"

# Index safety
word = "cat"
# print(word[10])           # ❌ IndexError
print(word[1:10])           # ✅ "at" (slicing is safe)
```

### 📛 Variable Naming Rules

- Use descriptive names (`user_age` instead of `x`)
- No spaces (use underscores `_`)
- Case-sensitive (`age` ≠ `Age`)
- Cannot start with a number
- Only alphanumeric characters and underscores (no special characters)
- Cannot be a reserved keyword

❌ Examples of invalid variable names:
```python
2nd_place = 10        # starts with a number
user-name = "Tom"     # hyphen is not allowed
my score = 95         # spaces are not allowed
class = "A"           # reserved keyword
price$ = 20           # special character is not allowed
```

✅ Fixed versions:
```python
second_place = 10
user_name = "Tom"
my_score = 95
class_name = "A"
price = 20
```

---

## 2. Input & Output

```python
name = input("What is your name? ")
print("Nice to meet you, " + name)
print("Hello,", name)
print(f"Hello, {name}") #f-strings are most modern and easiest
```
Used to get information from the user and display results back.

---

## 3. Functions

### 🔧 `def` — Create a New Function

```python
def greet(name):
    print("Hello, " + name + "!")

greet("Alice")
```

### ↩️ `return` — Function Gives Back a Result

```python
def add(a, b):
    return a + b #Using return gives more flexibility

result = add(3.25, 4.125)
print(f"{result:.2f}") #{value:.2f} within an f-string gives the sum to 2 decimal points (7.38)

#return will exit the function, any code under return will not run
```

### 🔀 `sorted` — Sort Any Iterable

Takes an iterable (string, list, tuple, etc.) and returns a **new list** with the elements sorted in ascending order:
```python
print(sorted([3, 1, 4, 2]))                   # [1, 2, 3, 4]
print(sorted("hello"))                        # ['e', 'h', 'l', 'l', 'o']
print(sorted(["banana", "apple", "cherry"]))  # ['apple', 'banana', 'cherry']

nums = [3, 1, 4, 2]
sorted(nums)    # → [1,2,3,4] (new list)
nums.sort()     # Modifies original list
```

### 🏷️ Parameters vs Arguments

A parameter is a variable defined in the function header.
An argument is the actual value passed into the function when it is called.

```python
def greet(name):      # name is a parameter
    print(f"Hello, {name}")

greet("Alice")       # "Alice" is an argument

def function(a, b, c=5):   # a, b, c are parameters
    print(a, b, c)

a = 2
b = 3
c = 4

function(a, b, c)   # 2, 3, 4 are arguments
# Output: 2 3 4

function(a, b)      # c is not passed, so it uses its default value 5
# Output: 2 3 5
```

- `a`, `b`, and `c` are parameters
- `2`, `3`, and `4` are arguments
- If a parameter has a default value, it can be left out when calling the function

What happens if you call a function with fewer arguments than defined parameters?
```python
def function(a, b, c):
    print(a, b, c)

function(2, 3)
# ❌ TypeError: function() missing 1 required positional argument: 'c'
```

So:
- `function(a, b, c)` → works
- `function(a, b)` → works only if `c` has a default value
- `function(a, b)` with no default for `c` → causes a `TypeError`

### ⚙️ Default and Keyword Arguments

```python
def power(base, exp=2):
    return base ** exp

print(power(5))          # 25
print(power(2, 3))       # 8
print(power(exp=3, base=2))  # 8
```

### 📝 Docstrings and Scope/Lifetime

```python
def area_of_circle(radius):
    """Return the area of a circle with radius r."""
    pi = 3.14159     # local variable, exists only inside this function
    return pi * radius * radius

print(area_of_circle(3))
```

### 🖨️ Printing a Function Call

Printing a function call prints what the function *returns* — not necessarily what it prints internally:
```python
def func(a, b):
    print(a + b)   # prints inside the function
    return None    # Python keyword is None (not none)

a = 3
b = 4

func(a, b)            # Output: 7
print(func(a, b))     # Output: 7 then None
```
Why does this happen?
- `func(a, b)` runs the function, so `print(a + b)` prints `7`.
- The function returns `None`.
- `print(func(a, b))` then prints that returned value, which is `None`.

Functions let you reuse code and organize logic.

---

## 4. Basic Math

```python
x = int(input("Enter a number: "))
y = int(input("Enter another number: "))

print(x + y)   # addition
print(x - y)   # subtraction
print(x * y)   # multiplication
print(x / y)   # division (always returns a float)
print(x % y)   # remainder (modulus)
print(x**y)    # exponent
print(x//y)    # floor division 
```

### 🧩 Operator Precedence

💡 Order of Operations:
1. Parentheses `()`
2. Exponent `**`
3. Multiply/Divide `* / // %`
4. Add/Subtract `+ -`

**Example:**
```python
(2 + 3) * 4   # 20
2 + 3 * 4     # 14
```

💡 Rounding
```python
round(3.756, 2)  # 3.76
```

---

### 🧩 Compound Operators

| Operator | Equivalent To | Use Case |
|----------|---------------|----------|
| `+=`  | `x = x + y`  | Add & update |
| `-=`  | `x = x - y`  | Subtract & update |
| `*=`  | `x = x * y`  | Multiply & update |
| `/=`  | `x = x / y`  | Divide & update |
| `//=` | `x = x // y` | Floor divide & update |
| `%=`  | `x = x % y`  | Modulo & update |
| `**=` | `x = x ** y` | Exponent & update |

Compound operators update a variable using its current value by combining an operation (like `+`, `-`, `*`) with assignment (`=`) into a single symbol.
```python
total = 0
for i in range(1, 6):  # 1 to 5
    total += i
print(total)  # Output: 15

score = 100
score += 50   # Power-up!
score -= 20   # Penalty
score *= 2    # Double points!
print(score)  # Output: 260

# Money denomination example with %=
amount_cents = 587
dollars = amount_cents // 100
amount_cents %= 100          # keep remaining cents after taking dollars
print(dollars)               # 5
print(amount_cents)          # 87

#remember to always initialise first
```

---

## 5. Conditionals

### 🔀 `if`, `elif`, `else`

```python
age = int(input("How old are you? "))
if age < 13:
    print("You're a kid!")
elif age < 20:
    print("You're a teenager.")
else:
    print("You're an adult.")
```

💡 **Ternary Operator (One-liner if)**
```python
status = "kid" if age < 13 else "adult"
```

🚫 **Common Mistake**
```python
if age = 18:  # ❌ = is assignment
if age == 18: # ✅ == is comparison
```

### 🔁 Comparison Operators

| Operator | Meaning |
|----------|---------|
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater or equal |
| `<=` | Less or equal |
| `==` | Equal to |
| `!=` | Not equal to |

### 🧠 Logical Operators

`and` – both must be true  
`or` – at least one must be true  
`not` – reverses the truth

```python
True and False #False
True and True #True
True or False #True
False or False #False
```

`and` has higher precedence than `or`.

**De Morgan's Law** (helpful for simplifying conditions):
```python
# not (A and B) == (not A) or (not B)
# not (A or B)  == (not A) and (not B)
```

Nested conditional example:
```python
age = 15
has_id = True

if age >= 13:
    if has_id:
        print("Entry allowed")
    else:
        print("Bring your ID")
else:
    print("Too young")
```

Using a function inside a condition:
```python
def is_even(n):
    if n%2 == 0:
        return True
    else:
        return False

x = int(input("What's X?"))
if is_even(x):
    print("Even")
else:
    print("Odd")
```
Use `if`, `elif`, and `else` to make decisions in your programs.

### 🧯 Handling Errors: try/except

Sometimes code fails because of something outside your control — bad user input, a missing file, dividing by zero. `try`/`except` lets your program handle these errors gracefully instead of crashing:
```python
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old.")
except ValueError:
    print("❌ That's not a valid number.")
```
You can catch specific error types (`ValueError`, `FileNotFoundError`, `ZeroDivisionError`, etc.), or catch anything with a bare `except:`:
```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("❌ Can't divide by zero!")
except Exception as e:
    print(f"Something else went wrong: {e}")
```
`try`/`except` is especially useful when working with user input or files — you'll see it used again in those sections.

---

## 6. Loops

### 🔁 `for` Loop

```python
for i in range(5):
    print(i)
```
Use `for` when you know how many times to repeat (e.g. with `range` or a list).

### 🔄 `while` Loop

```python
count = 0
while count < 5:
    print(count)
    count += 1

user_input = ""
while user_input != "quit":
    user_input = input("Enter command (or 'quit'): ")
    print(f"You entered: {user_input}")
```
Use `while` when waiting for a condition (user input, game loop).

Loops help repeat actions until a condition is met.

### 🧩 Loop Control Keywords

```python
break    # Exit loop
continue # Skip to next iteration
pass     # Do nothing (placeholder)
```

### 🕒 Count Down Timer

```python
for i in range(5, 0, -1): #for loop
    print(i)
print("Blast off!")

seconds = 10
while seconds > 0:        #while loop
    print(seconds)
    seconds -= 1  
print("Blast off!")
```

### 🔢 Loop Through Every Number in a Range

```python
total = 0
for i in range(1, 1000):
    if i % 3 == 0 or i % 5 == 0:
        total += i
print(total)

print(sum(i for i in range(1,1000) if i%3==0 or i%5==0))
```

### 🔁 Conditional `while` Loop

```python
# Keep reading until blank input, then summarize
values = []
while True:
    raw = input("Enter a score (blank to stop): ")
    if raw == "":
        break
    values.append(int(raw))

if values:
    print("Count:", len(values))
    print("Average:", sum(values) / len(values))

# Keep prompting until valid length [3, 8]
s = input("Enter a string: ")
while len(s) < 3 or len(s) > 8:
    print("The string must have between 3 and 8 characters.")
    s = input("Enter a string: ")
print("Great!")
```

### 🔁𓍼 For Loop and Strings

```python
# Loop through each character
word = "Python"
for char in word:
    print(char)
# Output: P, y, t, h, o, n (each on new line)

# Count vowels
def count_vowels(text):
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        if char in vowels:
            count += 1
    return count

# Find specific characters
def find_letter_positions(text, letter):
    positions = []
    for i in range(len(text)):
        if text[i] == letter:
            positions.append(i)
    return positions

# Building strings
letters = ['a', 'b', 'c']
result = ""
for letter in letters:
    result += letter + "-"
print(result)  # "a-b-c-"

# Better approach with join()
result = "-".join(letters)
print(result)  # "a-b-c"
```

### 🔄📋 While Loop and Lists

```python
# Processing lists with while
numbers = [1, 2, 3, 4, 5]
index = 0
while index < len(numbers):
    print(numbers[index])
    index += 1

# Removing items while iterating (careful!)
items = [1, 2, 3, 2, 4, 2]
i = 0
while i < len(items):
    if items[i] == 2:
        items.pop(i)
        # Don't increment i, check same position again
    else:
        i += 1
```

---

## 7. Lists

### 📋 List Methods

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])       # Output: apple
print(fruits[-1])      # Output: cherry

# Change or add items:
fruits[1] = "blueberry"
fruits.append("grape")
fruits.remove("apple")

# Loop through list:
for fruit in fruits:
    print(fruit)

# List Slicing
fruits[1:3]    # ["banana", "cherry"]
fruits[:2]     # First 2
fruits[-2:]    # Last 2
fruits[::-1]   # Reverse!

# Common Methods
len(fruits)            # How many items in the list
fruits.count("apple")  # How many times a specific value appears in the list
fruits.index("banana") # Returns the index(position) of the first occurence of that item in the list

# Methods Review
numbers = [3, 1, 4, 1, 5]
numbers.append(9)        # Add to end
numbers.insert(0, 2)     # Insert at position
numbers.remove(1)        # Remove first occurrence
numbers.pop()            # Remove and return last item
numbers.sort()           # Sort in place
numbers.reverse()        # Reverse in place
```
📋 Use lists to store multiple values in one variable.

#### 🧪 List Mutability When Passed to Functions

```python
def add_item(items, value):
    items.append(value)   # modifies caller's list (same object)

scores = [80, 90]
add_item(scores, 100)
print(scores)  # [80, 90, 100]
```

Tip: use `items.copy()` when you want to avoid changing the original list.

### 🧠 Memory State Tracing (Aliasing vs Rebinding)

Example 1 (immutable integers):
```python
a = 2
b = a
b += 1
print(b)  # b = 3
print(a)  # a = 2 (unchanged)
```
Why? `int` is immutable. `b += 1` rebinds `b` to a new integer object instead of changing `a`.

⚠️ Order matters — `b` must exist before you can update it:
```python
b += 1    # ❌ NameError: b is not defined yet
```

---

### 🪺 Nested Lists

```python
# 2D lists (like matrices)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Accessing elements
print(matrix[0][1])  # 2

# Looping through 2D lists
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()  # New line after each row
```

### 📖 List Comprehensions

```python
# Traditional way
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension (more Pythonic)
squares = [x**2 for x in range(10)]

# With conditions
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Transforming lists
words = ["hello", "world", "python"]
upper_words = [word.upper() for word in words]
```

💡 **Loop with `enumerate()`**
```python
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")
```

---

## 8. Tuples

A tuple is like a list, but cannot be changed after creation (immutable).  
Store related data that shouldn’t be modified — like coordinates, dates, or RGB colours.

### 🧩 Create a Tuple

```python
empty_tuple = ()
single_tuple = (1,)
coordinates = (10, 20)
colours = ("red", "green", "blue")
person = ("Alice", 12, True)  # name, age, is_student (mixed tuple)

#parentheses () are used, but they’re optional
fruits = "apple", "banana", "cherry"  # Still a tuple!
```

### 🔍 Access Items (Just Like Lists)

```python
print(coordinates[0])     # 10
print(person[-1])         # True
print(colours[1:3])       # ("green", "blue")

coordinates[0] = 15       # ❌ Error! Tuples are immutable, cannot change values
```
🔄 Packing & Unpacking
```python
#unpack tuples into variables
x, y = coordinates
print(x, y)  # 10 20

#functions
def get_name_age():
    return "Bob", 13

name, age = get_name_age()
print(name, age)  # Bob 13

# Count how many times a value appears
print(person.count("Alice"))     # 1

# Find index of first occurrence
print(person.index(12))          # 1 (age is at index 1)

numbers = (1, 2, 3, 2, 4, 2)
print(numbers.count(2))    # 3 (count of 2s)
print(numbers.index(3))    # 2 (index of first 3)
```

#### 🔑 Key Differences from Lists

```python
# Lists (mutable)
my_list = [1, 2, 3]
my_list[0] = 10         # OK
my_list.append(4)       # OK

# Tuples (immutable)
my_tuple = (1, 2, 3)
# my_tuple[0] = 10      # ERROR!
# my_tuple.append(4)    # ERROR!
```

### 📋 When to Use Tuples vs Lists

| Tuples | Lists |
|--------|-------|
| Data shouldn't change (e.g., days of week) | Data may change (e.g., to-do list) |
| Returning multiple values from a function | Storing dynamic collections |
| Using as dictionary keys (lists can't be keys) | Need to add/remove items |

### ✅ Summary Table

| Feature | List | Tuple |
|--------|------|-------|
| Syntax | `[1, 2, 3]` | `(1, 2, 3)` |
| Mutable? | ✅ Yes | ❌ No |
| Can append? | ✅ Yes | ❌ No |
| Can index? | ✅ Yes | ✅ Yes |
| Can loop? | ✅ Yes | ✅ Yes |
| Can be dict key? | ❌ No | ✅ Yes |

---

## 9. Dictionaries

### 📚 Dictionary Basics

Dictionaries store data as key-value pairs.
```python
student = {
    "name": "Alice",
    "age": 20,
    "is_student": True,
    "grade": "A"
}

empty_dict = {}
grades = dict(math=95, science=87, english=92)

print(student["name"])                     # Alice
student["age"] = 21                       # Update
student["major"] = "Computer Science"     # Add new key

student.keys()     # ['name', 'age', 'is_student', 'grade']
student.values()   # ['Alice', 20, True, 'A']
student.items()    # [('name', 'Alice'), ('age', 20), ('is_student', True), ('grade', 'A')]
```

### 🧾 Dictionary Methods

```python
student = {"name": "Alice", "age": 20, "grade": "A"}

# Safe Value Access
print(student.get("name"))                 # "Alice"
print(student.get("gender"))               # None
print(student.get("gender", "Not found"))  # Not found

# Iterating by looping through dictionary
for key in student:
    print(f"{key}: {student[key]}")
    
for key, value in student.items():
    print(f"{key}: {value}")

# Getting keys and values
keys = list(student.keys())
values = list(student.values())
```

#### 🔢 Counting with `.get()`

```python
word_counts = {}
words = ["apple", "banana", "apple"]

for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

{'apple': 2, 'banana': 1} # Result
```
Why `.get()`?  
Safer way to access keys that may not exist.

#### ✅ Key Existence and Key-Type Rules

```python
if "age" in student:
    print(student["age"])

# Dictionary keys must be immutable types
valid = {(1, 2): "tuple key works"}
# invalid = {[1, 2]: "list key fails"}  # ❌ TypeError
```

### 🧠 Memory State with Dictionary Values

Case A: list used as a key
```python
my_dict = {}
key = [1, 2]
# my_dict[key] = "value"   # ❌ TypeError: unhashable type: 'list'
```
Lists are mutable, so they cannot be dictionary keys.

Case B: dictionary value is a list (aliasing)
```python
my_dict = {"nums": [1, 2]}
key = "nums"

a = my_dict[key]   # a refers to the list [1, 2]
b = a              # b refers to the SAME list
b.append(99)

print(b)           # b = [1, 2, 99]
print(a)           # a = [1, 2, 99]
print(my_dict[key])# [1, 2, 99]
```
Because `a` and `b` point to the same mutable list object, mutating `b` also changes `a` and the dictionary value.

If you want independent lists:
```python
b = a.copy()
b.append(99)
print(a)  # [1, 2]
print(b)  # [1, 2, 99]
```

### 🪺 Nested Dictionaries

```python
students = {
    "Alice": {"age": 12, "grade": "A"},
    "Bob": {"age": 13, "grade": "B"}
}

# Accessing nested values
print(students["Alice"]["age"])      # 12
print(students["Bob"]["grade"])      # B

# Adding new students
students["Charlie"] = {"age": 11, "grade": "A"}

# Adding new properties to existing students
students["Alice"]["subject"] = "Math"
```

**Complex example — school database:**
```python
school = {
    "class_1A": {
        "teacher": "Ms. Smith",
        "students": {
            "Alice": {"age": 12, "grades": {"math": 85, "english": 92}},
            "Bob": {"age": 13, "grades": {"math": 78, "english": 88}}
        }
    },
    "class_1B": {
        "teacher": "Mr. Johnson",
        "students": {
            "Charlie": {"age": 12, "grades": {"math": 95, "english": 87}},
            "Diana": {"age": 13, "grades": {"math": 91, "english": 94}}
        }
    }
}

# Accessing deeply nested data
print(school["class_1A"]["students"]["Alice"]["grades"]["math"])  # 85
```

### ✍🏻 Working with Nested Dictionaries

#### 🛡️ Safe Access Pattern

```python
# Problem: KeyError if keys don't exist
# students["David"]["age"]  # KeyError!

# Solution 1: Check each level
if "David" in students and "age" in students["David"]:
    age = students["David"]["age"]

# Solution 2: Using get() method
age = students.get("David", {}).get("age", "Not found")
```

#### 🔁 Iterating Through Nested Dictionaries

```python
# Iterate through students
for student_name, student_info in students.items():
    print(f"Student: {student_name}")
    for key, value in student_info.items():
        print(f"  {key}: {value}")
    print()

# Output:
# Student: Alice
#   age: 12
#   grade: A
#
# Student: Bob
#   age: 13
#   grade: B
```

#### 🛠️ Practical Functions for Nested Dictionaries

```python
def add_student(students_dict, name, age, grade):
    """Add a new student to the dictionary"""
    students_dict[name] = {"age": age, "grade": grade}

def update_student_grade(students_dict, name, new_grade):
    """Update a student's grade"""
    if name in students_dict:
        students_dict[name]["grade"] = new_grade
    else:
        print(f"Student {name} not found!")

def get_student_info(students_dict, name):
    """Get student information safely"""
    return students_dict.get(name, "Student not found")

def calculate_average_age(students_dict):
    """Calculate average age of all students"""
    if not students_dict:
        return 0
    total_age = sum(student["age"] for student in students_dict.values())
    return total_age / len(students_dict)

# Usage
add_student(students, "David", 14, "C")
update_student_grade(students, "Alice", "A+")
print(get_student_info(students, "Bob"))
print(f"Average age: {calculate_average_age(students)}")
```

#### 📦 Dictionary Methods with Nested Structures

```python
# Update nested dictionaries
students["Alice"].update({"height": 150, "weight": 45})

# Deep copying (important!)
import copy
students_copy = copy.deepcopy(students)  # Safe copy
students_shallow = students.copy()       # Shallow copy (nested dicts still reference original)

# Flattening nested dictionaries
def flatten_dict(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

# Example usage
flattened = flatten_dict(students["Alice"])
# Result: {"age": 12, "grade": "A", "height": 150, "weight": 45}
```

### 🎯 Dictionary Efficiency

```python
import time

# O(1) average case for dictionary lookup
large_dict = {i: i**2 for i in range(100000)}
large_list = [(i, i**2) for i in range(100000)]

# Fast dictionary lookup
start = time.time()
value = large_dict[50000]  # O(1)
dict_time = time.time() - start

# Slow list lookup (linear search)
start = time.time()
value = None
for key, val in large_list:
    if key == 50000:
        value = val
        break
list_time = time.time() - start

print(f"Dictionary lookup: {dict_time:.6f} seconds")
print(f"List lookup: {list_time:.6f} seconds")
```

### ✍ Practical Dictionary Applications

```python
# Counting frequencies
def count_letters(text):
    frequency = {}
    for char in text.lower():
        if char.isalpha():
            frequency[char] = frequency.get(char, 0) + 1
    return frequency

# Caching/Memoization
cache = {}
def fibonacci(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        result = n
    else:
        result = fibonacci(n-1) + fibonacci(n-2)
    cache[n] = result
    return result

# Grouping data
def group_by_grade(students):
    groups = {}
    for student, grade in students:
        if grade not in groups:
            groups[grade] = []
        groups[grade].append(student)
    return groups
```

---

## 10. Global Variables & Nested Functions

### 🌍 Global Variables

A global variable is defined outside any function and can be accessed from anywhere in the code — including inside functions.
```python
name = "Alice"  #global variable

def greet():
    print(f"Hello, {name}!")  # Can access 'name' even though it's outside

greet()  # Output: Hello, Alice!
```

#### 🔒 Modifying a Global Variable Inside a Function

```python
count = 0

def increment():
    count += 1  # ❌ Error! Python thinks 'count' is local

#When assigning (= or +=) to a variable inside a function, Python assumes it’s local unless told otherwise

count = 0

def increment():
    global count  # ✅ Fix: Use the global Keyword
    count += 1

increment()
print(count)  # Output: 1
```

| Use Global | Avoid Global |
|------------|--------------|
| For configuration values that don't change much | When you can pass data via parameters instead |
| In simple scripts or games with shared state | In large programs — makes code harder to test and debug |

```python
# ✅ Better: No global needed
def increment(count):   #function parameters
    return count + 1    #return values

count = 0
count = increment(count)
```

---

### 🪺 Nested Functions (Functions Inside Functions)

- Keep helper functions private  
- Organize complex logic  
- Use closures   
```python
def outer():
    print("Outer function")

    def inner():
        print("Inner function")

    inner()  # Call the inner function

outer()

# output:
Outer function
Inner function
```
🔐 The `inner()` function only exists inside `outer()` — you can't call it from outside  

#### 💡 Example: Private Helper Function

```python
def process_data(data):
    def clean(text):
        return text.strip().lower()

    cleaned = [clean(item) for item in data]
    return cleaned

names = [" Alice ", "BOB ", "  Charlie  "]
print(process_data(names))
# Output: ['alice', 'bob', 'charlie']
```
The `clean()` function is hidden inside `process_data()` — clean and organized  

---

### 🪄 Closures: Inner Functions That Remember Outer Variables

```python
def make_multiplier(x):
    def multiplier(n):
        return n * x
    return multiplier

# Create two new functions
double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```
A closure happens when an inner function remembers variables from its outer function — even after the outer function finishes

---

### 🔐 Accessing Outer (Non-Global) Variables: nonlocal Keyword

Modifying a variable from an outer (but not global) function with `nonlocal`
```python
def outer():
    count = 0

    def inner():
        nonlocal count  # Allows modification of 'count' from outer scope
        count += 1
        print(f"Count: {count}")

    return inner

counter = outer()
counter()  # Count: 1
counter()  # Count: 2
counter()  # Count: 3
```
Without `nonlocal`, Python would create a new local `count` — this tells it to use the one from `outer()`

---

## 11. File Input & Output

- **Input:** Reading data from a file into your program
- **Output:** Writing data from your program into a file

### 📂 Types of Files

**Text Files (`.txt`)**
- Simple files that store plain text — like notes or logs.

**CSV Files (`.csv`)**
- Comma-Separated Values — like mini-spreadsheets. Used for storing structured data (e.g., names and phone numbers).

### 🔍 Basic File Operations

- `"r"` — Read (default)
- `"w"` — Write (overwrites existing file or creates new one)
- `"a"` — Append (adds to end of file without deleting contents)
- `"r+"` — Read and write

```python
file = open("filename.txt", "r")            # open() function

with open("example.txt", "r") as file:      # 📖Reading from a File
    content = file.read()                   # reads the entire file into a variable called content
    print(content)

with open("large_file.txt", "r") as file:
    for line in file:                       # Reading line by line
        print(line.strip())                 # strip() removes newline characters, good for large files

with open("example.txt", "w") as file:      # 📝Writing to a File
    file.write("Hello, world!\n")           # Create or overwrite example.txt with that message
    file.write("This is a new line.\n")

with open("example.txt", "a") as file:      # ➕Appending to a File
    file.write("\nGoodbye, world!")         # Adds a new line to the end of the file 

data = ["Line 1\n", "Line 2\n", "Line 3\n"] # Writing multiple lines
with open("output.txt", "w") as file:  
    file.writelines(data)
```
`with` statement automatically closes the file after use.

File handling helps persist data between sessions.

### 💡 Check if File Exists

```python
import os
if os.path.exists("data.csv"):
    with open("data.csv", "r") as f:
        ...
else:
    print("File not found!")
```

### 📊 Working with CSV Files

```python
import csv

with open("students.csv", "w", newline="") as file: 
    writer = csv.writer(file)                        # writing to a CSV
    writer.writerow(["Name", "House"])               # creates a CSV file with headers and two rows
    writer.writerow(["Alice", "Gryffindor"])
    writer.writerow(["Bob", "Hufflepuff"])

with open("students.csv") as file:
    reader = csv.reader(file)                        # reading from a CSV
    for row in reader:
        print(row)

# Output:
# ['Name', 'House']
# ['Alice', 'Gryffindor']
# ['Bob', 'Hufflepuff']
```

#### 🧮 Reading and Writing Structured Data

```python
def process_scores(filename):                        # reading and processing structured data
    scores = []
    with open(filename, "r") as file:
        for line in file:
            name, score = line.strip().split(",")
            scores.append((name, int(score)))
    return scores

def save_scores(filename, scores):                   # writing structured data
    with open(filename, "w") as file:
        for name, score in scores:
            file.write(f"{name},{score}\n")
```

#### 📄 Tab-Delimited Parsing Pattern

Used often in exercises:
```python
def load_phone_book(filename):
    records = []
    try:
        with open(filename, "r") as file:
            for line in file:
                name, phone = line.rstrip("\n").split("\t")
                records.append((name, phone))
    except FileNotFoundError:
        print("File not found:", filename)
    return records
```

### 🧠 Using Dictionaries with CSV

Use `csv.DictReader` and `csv.DictWriter` to treat each row like a dictionary:
```python
import csv

with open("students.csv") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["Name"], "is in", row["House"])

# Output:
# Alice is in Gryffindor
# Bob is in Hufflepuff
```

### 🧠 CSV Best Practices

- 📌 Use `newline=""` when writing CSV to avoid blank lines
- 📌 Use `csv.DictReader` for cleaner access to data (like `row["Name"]`)
- 📌 Always handle `FileNotFoundError`

---

## 12. Computational Efficiency

### 🤖 What is an Algorithm?

An **algorithm** is a step-by-step procedure for solving a class of problems — not just one specific case.

```python
# This only solves ONE specific case: comparing exactly two numbers
def find_larger_number(n1, n2):
    if n1 >= n2:
        return n1
    else:
        return n2

# This only solves for exactly three numbers
def find_largest_number_among_three(n1, n2, n3):
    if n1 >= n2 and n1 >= n3:
        return n1
    elif n2 >= n1 and n2 >= n3:
        return n2
    else:
        return n3
```
Neither function works for a list of *any* length. An **algorithm** for "find the largest number" needs to work no matter how many numbers are given.

### ⚖️ Comparing Two Algorithms for the Same Problem

Here are two different algorithms that both correctly find the largest number in a list:
```python
# Algorithm 1: for every number, check whether it's >= every other number
def find_largest_number_1(num_list):
    for num in num_list:
        if larger_than_or_equal_to_all(num, num_list):
            return num
    return None

def larger_than_or_equal_to_all(n, n_list):
    for m in n_list:
        if m > n:
            return False
    return True

# Algorithm 2: keep track of the largest number seen so far
def find_largest_number_2(num_list):
    if num_list == []:
        return None
    largest = num_list[0]
    for num in num_list:
        if num > largest:
            largest = num
    return largest
```
Both give the correct answer — but `find_largest_number_1` takes noticeably longer to run on a large list. This is what **computational efficiency** measures: not *whether* code works, but *how well it scales* as the input grows.

### 🔢 Counting Basic Operations

To compare algorithms rigorously, we count the number of **basic operations** they perform, in terms of the input size (usually called `n` or `l`):
- **Variable assignment** — assigning or updating a value
- **Arithmetic operations** — e.g. addition, multiplication
- **Comparison** — comparing two values
- **List or string indexing** — accessing an element by its index

We usually count the **worst case** — the maximum number of operations the algorithm could need.

```python
def find_largest_number_2(num_list):
    largest = num_list[0]        # 1 assignment
    for num in num_list:         # runs l times
        if num > largest:        # l comparisons total
            largest = num        # up to l-1 assignments
    return largest
```
For a list of length `l`, this performs about `2l` operations — this is called a **linear time** algorithm, because the number of operations grows linearly (in direct proportion) with `l`.

Compare this with `find_largest_number_1`: for each of the `l` numbers, it calls `larger_than_or_equal_to_all`, which itself checks up to `l` numbers. In the worst case that's `l * l`, or `l²`, operations — this is a **quadratic time** algorithm.

When `l` is small the difference barely matters, but when `l` is large (say, 20,000), `l²` becomes far bigger than `2l` — which is why `find_largest_number_1` is so much slower in practice.

### 📉 Asymptotic Behaviour & the Dominant Term

When comparing algorithms, we care about what happens as the input size grows very large (**asymptotic behaviour**). At that scale, constants and smaller terms stop mattering:
```python
# 2n + 3   → as n grows, the "+3" becomes irrelevant → treat as O(n)
# n² + n   → the n² term grows much faster than n   → treat as O(n²)
```
The fastest-growing term in the formula is called the **dominant term**, and it alone determines the algorithm's complexity.

### 🧮 Big O Notation

**Big O** notation is used to describe an algorithm's worst-case complexity using its dominant term:

| Name | Big O | Remarks |
|------|-------|---------|
| Constant | `O(1)` | Not affected by input size `n` |
| Linear | `O(n)` | Running time is proportional to `n`; if `n` doubles, operations roughly double |
| Polynomial | `O(n^k)` | E.g. `O(n²)` — if `n` doubles, operations roughly quadruple |
| Exponential | `O(k^n)` | E.g. `O(2ⁿ)` — if `n` increases by 1, operations roughly double |

```python
def get_first_element(lst):
    return lst[0]              # O(1): always exactly one operation

def linear_search(lst, target):
    for item in lst:           # O(n): may need to check every item
        if item == target:
            return True
    return False
```

### 🐢 Worked Example: Bubble Sort — O(n²)

Bubble Sort repeatedly steps through a list, swapping adjacent items that are in the wrong order, until the list is sorted:
```python
def bubble_sort(lst):
    n = len(lst)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
    return lst
```
The outer loop runs `n` times, and for each pass the inner loop runs roughly `n` times too — so in the worst case Bubble Sort performs about `n * n = n²` comparisons. That makes it an **O(n²)** algorithm, just like `find_largest_number_1` above.

### 📏 Quick Rules of Thumb

- 🔢 A single loop through the input → usually `O(n)`
- 🔁 A loop inside a loop (both depending on `n`) → usually `O(n²)`
- 🧹 Drop constants and lower-order terms: `O(3n² + 5n + 10)` → `O(n²)`
- 🏆 When multiple terms are added together, only the **dominant** (fastest-growing) term matters: `O(2ⁿ + n²)` → `O(2ⁿ)`

*(Note: exponential complexity is included above for completeness, but a full analysis of `O(2ⁿ)` cases is more advanced than this course covers.)*

---

## 13. Mini Projects Built

### 🎮 1. Number Guessing Game

```python
import random
number_to_guess = random.randint(1, 20)
max_attempts = 5
attempts = 0

print("🎯 Welcome to 'Guess the Number'!")
print("I'm thinking of a number between 1 and 20.")
print(f"You have {max_attempts} tries to guess it.")

while attempts < max_attempts:
    guess = input("Enter your guess: ")

    if not guess.isdigit():
        print("❌ Please enter a valid number.")
        continue

    guess = int(guess)
    attempts += 1

    if guess < number_to_guess:
        print("🔼 Too low!")
    elif guess > number_to_guess:
        print("🔽 Too high!")
    else:
        print(f"🎉 Congratulations! You guessed the number in {attempts} tries.")
        break
else:
    print(f"😢 Sorry, you've used all your guesses. The number was {number_to_guess}.")
```
With Explanation
```python
#🔧Step 1: Import Python's built-in random module, which helps generate random numbers
import random

#🎲Step 2: Setting Up the Game

# Game settings
number_to_guess = random.randint(1, 20)
max_attempts = 5
attempts = 0

#💬Step 3: Displaying Welcome Messages
print("🎯 Welcome to 'Guess the Number'!")
print("I'm thinking of a number between 1 and 20.")
print(f"You have {max_attempts} tries to guess it.")
#f"..." is called an f-string — it lets you insert variables directly into text inside quotes. 

#🔁Step 4: Start the Guessing Loop
while attempts < max_attempts:  #Conditionals and Variables
#Starts a loop that will keep running as long as the user hasn’t used all their attempts.

#📥Step 5: Getting User Input
    guess = input("Enter your guess: ") #Value is stored as a string in the variable guess.
    
#🔍 Step 6: Validating the Input    
    # Make sure the user enters a number
    if not guess.isdigit(): #.isdigit() a method that checks if a string contains only digits 
        print("❌ Please enter a valid number.")
        continue #continue skips the rest of the loop and goes to the next iteration.

#🔄Step 7: Converting Input to Integer
    guess = int(guess) 
    attempts += 1

#🧾Step 8: Checking the Guess

    if guess < number_to_guess:
        print("🔼 Too low!")
    elif guess > number_to_guess:
        print("🔽 Too high!")
    else:
        print(f"🎉 Congratulations! You guessed the number in {attempts} tries.")
        break #break exits the loop if the user guesses correctly.

#🙌 Step 9: What Happens When the Loop Ends
else:
    print(f"😢 Sorry, you've used all your guesses. The number was {number_to_guess}.")
#This else block belongs to the while loop, not the if. 
#It runs only if the loop ended normally (i.e., the user ran out of guesses without winning).
```

### 📝 2. To-Do List App

```python
tasks = []

def add_task():
    task = input("Enter a new task: ")
    tasks.append({"name": task, "done": False})
    print("Task added!")

def view_tasks():
    if not tasks:
        print("No tasks yet!")
        return

    print("\nYour Tasks:")
    for i, task in enumerate(tasks):
        status = "✓" if task["done"] else "✗"
        print(f"{i+1}. [{status}] {task['name']}")

def mark_done():
    view_tasks()
    try:
        task_num = int(input("Enter task number to mark as done: ")) - 1
        if 0 <= task_num < len(tasks):
            tasks[task_num]["done"] = True
            print("Task marked as done!")
        else:
            print("Invalid task number.")
    except ValueError:
        print("Please enter a valid number.")

def save_tasks():
    with open("tasks.txt", "w") as file:
        for task in tasks:
            file.write(f"{task['name']}|{task['done']}\n")
    print("Tasks saved to file!")

def load_tasks():
    try:
        with open("tasks.txt", "r") as file:
            for line in file:
                name, done_str = line.strip().split("|")
                tasks.append({"name": name, "done": done_str == "True"})
    except FileNotFoundError:
        # No file means no saved tasks — just start fresh
        pass

def main():
    load_tasks()
    while True:
        print("\n--- Personal Task Manager ---")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Mark Task as Done")
        print("4. Save Tasks")
        print("5. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            add_task()
        elif choice == "2":
            view_tasks()
        elif choice == "3":
            mark_done()
        elif choice == "4":
            save_tasks()
        elif choice == "5":
            save_tasks()  # Auto-save on exit
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__": #If this file is being run directly (not imported), then run main()
    main()
```
Used concepts:
- Lists of dictionaries
- Functions
- File handling

### 🔐 3. Password Checker & Login System

```python
# Part 1: Password Creation
def get_strength(password):
    score = 0
    if len(password) >= 8:
        score += 1
    if any(char.isdigit() for char in password):
        score += 1
    if any(char.isupper() for char in password):
        score += 1
    if any(char in "!@#$%^&*(),.?\":{}|<>" for char in password):
        score += 1

    if score == 4:
        return "Strong"
    elif score == 3:
        return "Medium"
    else:
        return "Weak"

tries = 0

while True:
    tries += 1
    try:
        print(f"\n--- Try #{tries} ---")
        password1 = input("Enter a password: ")
        password2 = input("Confirm your password: ")

        if password1 != password2:
            print("❌ Passwords do not match. Please try again.")
            continue

        if len(password1) < 8:
            print("❌ Password must be at least 8 characters.")
            continue

        if not any(char.isdigit() for char in password1):
            print("❌ Password must contain at least one number.")
            continue

        if not any(char.isupper() for char in password1):
            print("❌ Password must contain at least one uppercase letter.")
            continue

        special_chars = "!@#$%^&*(),.?\":{}|<>"
        if not any(char in special_chars for char in password1):
            print(f"❌ Password must contain at least one special character {special_chars}")
            continue

        with open("user_password.txt", "w") as file:
            file.write(password1)

        print(f"✅ Great password! You succeeded in {tries} tries.")
        print(f"🔒 Your password strength: {get_strength(password1)}")
        break

    except KeyboardInterrupt:
        print("\n❌ You can't skip this – please set a password.")

# Part 2: Login System
print("\n🔐 Login Time!")

login_tries = 0
max_login_tries = 3

with open("user_password.txt", "r") as file:
    correct_password = file.read()

while login_tries < max_login_tries:
    login_tries += 1
    entered_password = input(f"Enter your password (Attempt {login_tries}/{max_login_tries}): ")

    if entered_password == correct_password:
        print("🎉 Login successful!")
        break
    else:
        print("❌ Incorrect password.")

if login_tries == max_login_tries:
    print("🔒 Too many failed attempts. Account locked.")
```
Checks strong password rules:  
- At least 8 characters  
- One uppercase letter  
- One number  
- One special character  
- Confirms passwords match  
- Tracks how many tries it took  
- Saves password to a file for demo purposes (plaintext in this version)  
- Lets user log in again later

#### Advanced Features Added

#### 🔒 Hashed Passwords

- Hashing turns text (like a password) into a fixed-length string of characters.
```python
import hashlib
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Test it out
password = "SecurePass123!"
hashed = hash_password(password)

print("Original:", password)
print("Hashed:", hashed)
```
🔍 Output:
```
Original: SecurePass123!
Hashed:4d8c0e9c5a7b3d0f6e1a2c8d0e7f4a9b1c2d3e4f5a6b7c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c0d1e2f
```
Hashing is one-way (not encryption). For real applications, use salted password hashing algorithms such as `bcrypt` or `argon2`.

#### 👤 Username System

- Users can register with a unique username  
- Each user has their own password
```python
def register_user():
    print("\n--- Register ---")
    users = load_users()

    while True:
        username = input("Enter a username: ")
        if username in users:
            print("❌ That username already exists. Try another one.")
        else:
            break

    while True:
        password = input("Enter a password: ")
        confirm = input("Confirm your password: ")
        if password != confirm:
            print("❌ Passwords don't match.")
        elif not check_password_strength(password):
            print("❌ Password must be at least 8 characters long, include uppercase and a number.")
        else:
            break

    users[username] = hash_password(password)
    save_users(users)
    print("✅ Registration successful!")
```

#### 🔐 Log In Existing User

```python
def login_user():
    print("\n--- Login ---")
    users = load_users()

    username = input("Username: ")
    password = input("Password: ")

    if username not in users:
        print("❌ Username not found.")
        return None

    hashed_pw = hash_password(password)
    if hashed_pw == users[username]:
        print(f"✅ Welcome back, {username}!")
        return username
    else:
        print("❌ Incorrect password.")
        return None
```

#### 🔁 Password Reset

- Logged-in users can reset their password
- Repeats validation checks
```python
def reset_password(username):
    print("\n--- Reset Password ---")
    users = load_users()

    while True:
        new_password = input("Enter a new password: ")
        confirm = input("Confirm new password: ")
        if new_password != confirm:
            print("❌ Passwords do not match.")
        elif not check_password_strength(new_password):
            print("❌ Password must be at least 8 characters, include uppercase and a number.")
        else:
            users[username] = hash_password(new_password)
            save_users(users)
            print("✅ Password updated successfully!")
            break
```

#### 💾 File Storage

- Saved users and hashed passwords in a JSON file
- Can load and update the file when logging in or resetting passwords
We use the built-in `json` module to store and load user data from a file:
```python
import json

def load_users():
    try:
        with open("users.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open("users.json", "w") as f:
        json.dump(users, f, indent=4)
```
Store registered users in a file called users.json.

#### Full Username Password Login

```python
import hashlib
import json

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def check_password_strength(password):
    if len(password) < 8:
        return False
    if not any(char.isupper() for char in password):
        return False
    if not any(char.isdigit() for char in password):
        return False
    return True

def load_users():
    try:
        with open("users.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open("users.json", "w") as f:
        json.dump(users, f, indent=4)

def register_user():
    print("\n--- Register ---")
    users = load_users()

    while True:
        username = input("Enter a username: ")
        if username in users:
            print("❌ That username already exists. Try another one.")
        else:
            break

    while True:
        password = input("Enter a password: ")
        confirm = input("Confirm your password: ")
        if password != confirm:
            print("❌ Passwords don't match.")
        elif not check_password_strength(password):
            print("❌ Password must be at least 8 characters, have uppercase and a number.")
        else:
            break

    users[username] = hash_password(password)
    save_users(users)
    print("✅ Registration successful!")

def login_user():
    print("\n--- Login ---")
    users = load_users()

    username = input("Username: ")
    password = input("Password: ")

    if username not in users:
        print("❌ Username not found.")
        return None

    hashed_pw = hash_password(password)
    if hashed_pw == users[username]:
        print(f"✅ Welcome back, {username}!")
        return username
    else:
        print("❌ Incorrect password.")
        return None

def reset_password(username):
    print("\n--- Reset Password ---")
    users = load_users()

    while True:
        new_password = input("Enter a new password: ")
        confirm = input("Confirm new password: ")
        if new_password != confirm:
            print("❌ Passwords do not match.")
        elif not check_password_strength(new_password):
            print("❌ Password must be at least 8 characters, include uppercase and a number.")
        else:
            users[username] = hash_password(new_password)
            save_users(users)
            print("✅ Password updated successfully!")
            break

def main():
    print("🔐 Welcome to the Secure Login System")

    while True:
        print("\n1. Register")
        print("2. Login")
        print("3. Exit")
        choice = input("Choose an option: ")

        if choice == "1":
            register_user()
        elif choice == "2":
            logged_in_user = login_user()
            if logged_in_user:
                while True:
                    print("\n--- Account Menu ---")
                    print("1. Reset Password")
                    print("2. Logout")
                    account_choice = input("Choose an option: ")

                    if account_choice == "1":
                        reset_password(logged_in_user)
                    elif account_choice == "2":
                        print("👋 Logged out.")
                        break
                    else:
                        print("❌ Invalid choice.")
        elif choice == "3":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice.")

if __name__ == "__main__":
    main()
