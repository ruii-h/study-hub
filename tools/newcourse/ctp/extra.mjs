// IS1704 past-exam tab: AY2024-25 (with published solutions) and the multiple-choice part of AY2020-21 (answers worked out by running the code).
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const code = (s) => `<div class="t-code"><div class="t-code-header"><span>python</span></div><div class="t-code-body" tabindex="0">${esc(s.replace(/^\n|\n$/g, ''))}</div></div>`;
const out = (s) => `<span style="white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace">${esc(s)}</span>`;
const stem = (text, src) => text + (src ? code(src) : '');
const isProse = (x) => !x.includes('\n') && /^[A-Z]\S*( \S+){3,}$/.test(x) && !/[{}=[\]]/.test(x);
const M = (n, ch, q, o, a, e, no) => ({ n, no, ch, q, o: o.map((x) => (isProse(x) ? esc(x) : out(x))), a, e });

const mcq24 = [
  M(1, 5, stem('What is the output of the following program?', `output = 0
for i in range(2, 6):
    output = i*2
    print(output, end = '')`), ['2468', '4681012', '2345', '46810', 'None of the given options are correct.'], 'D', 'i takes 2, 3, 4, 5, so the printed values are 4, 6, 8 and 10, with no separator: 46810.'),
  M(2, 5, stem('Which code snippet generates exactly the following output?<br>IS1704<br>IS1704'), [
    'for i in range(1, 3):\n    print("IS1704\\n")', 'counter = 1\nwhile (counter > 0):\n    print("IS1704")\n    counter = counter + 1', "my_str = 'IS1704'\nwhile len(my_str) == 2:\n    print(my_str)", 'str_list = ["IS1704", "IS1704", "IS1704"]\ni=0\nwhile i < 2:\n    print(str_list[i])\n    i=i+1', 'a_str = "IS1704"\nfor i in range(2, 3):\n    print(a_str)'], 'D', 'A prints a blank line after each message; B never stops; C never starts because the length is 6; E runs once. D runs twice with i = 0 and 1.'),
  M(3, 1, stem('What is the output of the following program?', `my_str = '12ab45'
num = 10

x = float(my_str[1:2])
print(x)
print(int(x) + num)`), ['2.0\n22', '2.0\n12', 'Execution error only', '2\nExecution error', '2\n12'], 'B', "my_str[1:2] is '2', so x = 2.0. int(x) + 10 = 12."),
  M(4, 4, stem('The while loop must be terminated when the value of x is less than 8 <b>and</b> the value of y is more than 2. Which code should fill the blank?', `x = int(input('Enter x:'))
y = int(input('Enter y:'))

while ____________________:
    print("Please enter again!")
    x = int(input('Enter x again:'))
    y = int(input('Enter y again:'))`), ['not (x > 8 and y < 2)', 'x < 8 or y > 2', 'not (x <=8 and y >=2)', 'x >= 8 or y <= 2', 'None of the given options are correct.'], 'D', 'The loop must continue while NOT (x < 8 and y > 2). By De Morgan\'s law that is x >= 8 or y <= 2.'),
  M(5, 1, stem('What is the output of the following program?', `a_str = 'abcdefg'
if len(a_str[2:5] + a_str[::]) >= 11:
    print('Yes')
elif len(a_str[:2]) + len(a_str[2::2]) <= 5:
    print('No')
else:
    print('Done')`), ['Yes', 'Yes\nDone', 'No', 'No\nDone', 'Done'], 'C', "a_str[2:5] is 'cde' (3) plus the 7 characters of the whole string = 10, which is not >= 11. Next: len('ab') = 2 and a_str[2::2] = 'ceg' (3), so 5 <= 5 is True and only 'No' prints."),
  M(6, 6, stem('What is the output of the following program?', `my_str = 'qwertykeyboard'
list1 = [ len(my_str[::3]), len(my_str[:5]), my_str[9:] ]
list2 = list1
list3 = list2 + [1, 2, 3]
print(list1.append([11, 12, 13]))
print(list1)
print(list2)
print(list3[:-1])`), ["[5, 5, 'board', [11, 12, 13]]\n[5, 5, 'board', [11, 12, 13]]\n[5, 5, 'board']\n[5, 5, 'board', 1, 2, 3]", "None\n[5, 5, 'board', [11, 12, 13]]\n[5, 5, 'board']\n[5, 5, 'board', 1, 2]", "None\n[5, 5, 'board', [11, 12, 13]]\n[5, 5, 'board', [11, 12, 13]]\n[3, 2, 1, 'board', 5, 5]", "None\n[5, 5, 'board', [11, 12, 13]]\n[5, 5, 'board', [11, 12, 13]]\n[5, 5, 'board', 1, 2]", 'None of the given options are correct.'], 'D', "append returns None, which is what the first print shows. list2 is an alias of list1, so both show the appended list. list3 was built before the append with +, so it is a separate list: [5, 5, 'board', 1, 2, 3], and [:-1] drops the 3."),
  M(7, 11, stem('Consider the computational complexity of function implementations I, II and III, and choose the correct option:', `# I
def search_1(lst, target):
    for i in lst:
        if i == target:
            return True
    return False

# II
def search_2(lst, target):
    found = False
    for i in lst:
        for j in lst:
            if i == target:
                found = True
    return found

# III
def search_3(lst, target):
    for i in lst:
        for j in lst:
            for k in lst:
                if i == target:
                    return True
    return False`), ['Implementation I has a worst-case complexity of O(1).', 'Implementations I and III have the same worst-case complexity.', 'Implementation II has a worst-case complexity of O(n²), where n is the length of lst.', 'All 3 implementations have the same worst-case complexity.', 'None of the given options are correct.'], 'C', 'I is O(n) (a loop over lst). II has two nested full loops, so O(n²). III returns early when the target is found, but when the target is absent it runs three nested loops, so O(n³).'),
  M(8, 8, stem('What is the output of the following code?', `def my_func(my_list):
    my_dict = {}
    for i in range(len(my_list)):
        new_list = my_list + [i]
        my_dict[i] = new_list[i::i+1]
    my_list.append(my_dict[0])
    return my_dict

a_list = [1, 2, 3, 4]
b_list = a_list
my_dict = my_func(a_list)
print(my_dict)
print(a_list)
print(b_list)`), ["{0: [1, 2, 3, 4, 0], 1: [2, 4], 2: [3], 3: [4]}\n[1, 2, 3, 4]\n[1, 2, 3, 4]", "{0: [1, 2, 3, 4], 1: [2, 4], 2: [3], 3: []}\n[1, 2, 3, 4, [1, 2, 3, 4]]\n[1, 2, 3, 4, [1, 2, 3, 4]]", "{0: [1, 2, 3, 4, 0], 1: [2, 4], 2: [3], 3: [4]}\n[1, 2, 3, 4, [1, 2, 3, 4, 0]]\n[1, 2, 3, 4]", "{0: [1, 2, 3, 4, 0], 1: [2, 4], 2: [3], 3: [4]}\n[1, 2, 3, 4, [1, 2, 3, 4, 0]]\n[1, 2, 3, 4, [1, 2, 3, 4, 0]]", 'None of the given options are correct.'], 'D', 'new_list is a fresh copy plus i, so my_dict[0] is the slice [1, 2, 3, 4, 0] (step 1). The function then appends that list to my_list, and a_list and b_list are the same object, so both show the extra element.'),
  M(9, 8, stem('What is the output of the following code?', `def create_dict(my_input):
    new_dict = {}
    key = my_input[0:]
    count = 6
    while(count > 0):
        if key not in new_dict:
            new_dict[key] = count
        else:
            new_dict[key] += count
        count -= 1
        if count > len(my_input) // 2:
            key = my_input[count - 1:]
        elif count > len(my_input) % 3:
            key = my_input[count + 1:]
        else:
            key = my_input[count:]
    return new_dict

my_dict = create_dict((1, 2, 3, 4, 5))
print(my_dict)

my_dict = create_dict((6, 7, 8))
print(my_dict)`), ['{(1, 2, 3, 4, 5): 6, (4, 5): 4, (3, 4, 5): 5, (2, 3, 4, 5): 1}\n{(6, 7, 8): 6, (8,): 4, (7, 8): 2}', '{(1, 2, 3, 4, 5): 6, (3, 4, 5): 5, (2, 3, 4, 5): 1}\n{(6, 7, 8): 6, (): 9, (8,): 4, (7, 8): 2}', '{(1, 2, 3, 4, 5): 6, (5,): 5, (4, 5): 4, (3, 4, 5): 5}\n{(6, 7, 8): 6, (8,): 4, (7, 8): 2}', '{(1, 2, 3, 4, 5): 6, (5,): 5, (4, 5): 4, (3, 4, 5): 5, (2, 3, 4, 5): 1}\n{(6, 7, 8): 6, (): 9, (8,): 4, (7, 8): 2}', 'None of the given options are correct.'], 'D', 'Tuples are valid dictionary keys and the same key accumulates with +=. Trace the keys loop by loop (count 6 down to 1): D is the only option that matches both runs, including the empty tuple () that accumulates 9 in the second run.'),
  M(10, 6, stem('What is the output for the code below?', `def process_lists(list1, list2, list3):
    result = []
    i=0
    while i < max(len(list1), len(list2)):
        if i < len(list1) and i < len(list2):
            str1 = list1[i]
            str2 = list2[i]
            str3 = ''
            if i <= len(list3):
                str3 = list3[i]
            my_dict = {}
            j=0
            while j < len(str1 + str2):
                if j < len(str1):
                    ch = str1[j].lower()
                else:
                    ch = str2[j - len(str1)].lower()
                if ch.isalpha():
                    if ch in my_dict:
                        my_dict[ch] += 1
                    else:
                        my_dict[ch] = 1
                j += 1
            k=0
            while k < len(str3):
                ch = str3[k].lower()
                if ch.isalpha():
                    num = 0
                    for c in str3:
                        if c == ch.lower():
                            num += 1
                    if ch in my_dict:
                        if my_dict[ch] > num:
                            if ch not in result:
                                result.append(ch)
                k += 1
        i += 1
    return result

print(process_lists(["hello", "world", "python"], ["programming", "is", "awesome"], ["hi", "there", "coder"]))
print(process_lists(["x1y2z3", "p4q5r6", "m7n8o9"], ["3z2y1x", "6r5q4p", "9o8n7m"], ["yes", "agree", "mon", "more"]))`), ["['l', 'e']\n['x', 'r', 'm', 'o', 'n']", "['o', 'e']\n['y', 'r', 'm', 'o', 'n']", "['h', 'e']\n['y', 'r', 'm', 'n', 'e']", 'Execution error.', 'None of the given options are correct.'], 'B', 'For each pair of words, my_dict counts the letters of both words together. A letter goes into result when its count there exceeds its count in the third word. Running the first call gives [\'o\', \'e\'] (verified by executing the code).'),
];

const mcq20 = [
  M(101, 1, stem('Which one of the following is a valid variable name (i.e., the name will not cause an error)?'), ['True', 'A-Name', '7_dwarfs', '$money', 'GST_RATE'], 'E', 'True is a keyword, A-Name has a hyphen, 7_dwarfs starts with a digit, $money has a special character. GST_RATE is valid.', 1),
  M(102, 5, stem('What is the output when you run the following program?', `count = 10
for i in range(0, 6):
    count = count - 1
print(count)`), ['0', '4', '5', '6', '10'], 'B', 'range(0, 6) runs the body 6 times, so 10 - 6 = 4.', 2),
  M(103, 1, stem('What is the output when you run the following program?', `my_str = '0123456789'
if 0 in [ my_str ]:
    print(0, end='')

if '1' in my_str:
    print('1', end='')

if '24' in my_str:
    print('24', end='')`), ['0', '1', '01', '0124', '124'], 'B', "0 in [my_str] asks whether the integer 0 is an element of a one-element list holding the string, which is False. '1' is a substring, so it prints 1. '24' is not a substring, because the digits run 2, 3, 4.", 3),
  M(104, 6, stem('What is the output when you run the following program?', `my_list = [10, 9, 8, 7, 6]

print(my_list[len(my_list) - 1])
print(my_list[0:2])
print(my_list[:1])`), ['6\n[10, 9]\n[10]', '[6]\n[10, 9]\n[10]', '[6]\n[10, 9]\n10', '6\n10, 9\n10', '6\n[10, 9]\n10'], 'A', 'Indexing gives the element 6; slicing always gives a list, so [10, 9] and [10].', 4),
  M(105, 3, stem('Given the following code, which statement is correct?', `def test(number, string):
    number = string
    result = number + string

n=1
s = 'X'
answer = test((n, s))
print(n, s, answer)`), ['Line 2 has an error because we cannot assign a string to a number.', 'Line 3 has an error because we cannot add a number and a string.', 'Line 7 has an error because the function test needs 2 parameters, but only one is sent in.', 'Line 7 has an error because the function test does not return any value.', 'There is no error in the code.'], 'C', 'test((n, s)) passes a single tuple argument, so Python raises a TypeError for the missing second argument. Reassigning a variable (line 2) is fine, and a function with no return simply returns None.', 5),
  M(106, 4, stem('What is the output when you run the following program?', `num = 9

if str(num) == '9':
    print("Gryffindor")

if num == int('3' + '6'):
    print("Hufflepuff")

if str(num / 3) == str(3):
    print("Ravenclaw")
else:
    print("Slytherin")`), ['Gryffindor\nHufflepuff\nRavenclaw', 'Gryffindor\nRavenclaw', 'Hufflepuff\nRavenclaw', 'Gryffindor\nHufflepuff\nSlytherin', 'Gryffindor\nSlytherin'], 'E', "str(9) is '9' so Gryffindor prints. int('36') is 36, not 9. num / 3 is the float 3.0, whose string '3.0' is not '3', so the else branch prints Slytherin.", 6),
  M(107, 3, stem('Given the following code, what will be the output?', `def modify_1(my_list):
    my_list = []

def modify_2(my_list):
    my_list[0] = 'Zeus'

def modify_3(my_list):
    your_list = my_list
    your_list.append(['Hades'])

def modify_4(my_list):
    my_value = my_list[0]
    my_value = my_value + '2'

a_list = ['Apollo']
modify_1(a_list)
print(a_list)

a_list = ['Apollo']
modify_2(a_list)
print(a_list)

a_list = ['Apollo']
modify_3(a_list)
print(a_list)

a_list = ['Apollo']
modify_4(a_list)
print(a_list)`), ["[]\n['Zeus']\n['Apollo']\n['Apollo']", "[]\n['Zeus', 'Apollo']\n['Apollo', 'Hades']\n['Apollo2']", "['Apollo']\n['Zeus']\n['Apollo', 'Hades']\n['Apollo']", "[]\n['Zeus']\n['Apollo', ['Hades']]\n['Apollo2']", "['Apollo']\n['Zeus']\n['Apollo', ['Hades']]\n['Apollo']"], 'E', 'modify_1 rebinds a local name, so the caller\'s list is unchanged. modify_2 mutates the shared list. modify_3 appends the list [\'Hades\'] as one element. modify_4 rebinds a local string, so the list is unchanged.', 7),
  M(108, 6, stem('What is the output when you run the following program?', `def do_magic(x):
    return x[0] + x[1]

list_1 = [1, 3, 5]
print(do_magic(list_1))

list_2 = [[1], [3], [5]]
print(do_magic(list_2))

my_str = '135'
print(do_magic(my_str))`), ['4\n[1, 3]\n13', '[1, 3]\n[[1], [3]]\n13', '[1, 3]\n[[1], [3]]\n4', '4\n[[1], [3]]\n13', 'There is an execution error.'], 'A', '+ adds numbers (1 + 3 = 4), joins lists ([1] + [3] = [1, 3]) and joins strings (\'1\' + \'3\' = \'13\').', 8),
  M(109, 5, stem('Given the following function, which print() statement prints True?', `def is_valid(my_str):
    digits = '0123456789'
    letters = 'abcdefghijklmnopqrstuvwxyz'
    count_1 = 0
    for d in digits:
        count_2 = 0
        for ch in my_str:
            if ch == d:
                count_2 += 1
        if count_2 >= 2:
            count_1 += 1

    if count_1 < 5:
        return False

    for l in letters:
        for ch in my_str:
            if ch == l:
                return True

    return False`), ["print(is_valid('01234567890abcdefghijklmnopqrstuvwxyz'))", "print(is_valid('012345xyz'))", "print(is_valid('a-12345-54321'))", "print(is_valid('00,11,22,33,44'))", 'None of the above.'], 'C', "The function needs at least 5 different digits that each appear at least twice, and at least one lowercase letter. 'a-12345-54321' has the digits 1-5 twice each and the letter a. Option A has only the digit 0 twice; B has no repeats; D has no letter.", 9),
  M(110, 11, stem('check_numbers(my_list) returns True if every number in the list is a divisor or a multiple of another number in the list (an empty list returns True, a one-element list returns False). Which implementation(s) are correct?', `# I
def check_numbers(my_list):
    for n in my_list:
        for m in my_list:
            if n != m:
                if n % m != 0 or m % n != 0:
                    return False
    return True

# II
def check_numbers(num_list):
    count = 0
    found = False
    for n in num_list:
        for m in num_list:
            if n != m and not found:
                if n % m == 0 or m % n == 0:
                    found = True
                    count += 1
    if count == len(num_list):
        return True
    else:
        return False

# III
def check_numbers(num_list):
    for i in range(len(num_list)):
        is_valid = False
        for j in range(len(num_list)):
            if j != i:
                if num_list[i] % num_list[j] == 0 or num_list[j] % num_list[i] == 0:
                    is_valid = True
        if not is_valid:
            return False
    return True`), ['I only', 'II only', 'III only', 'I, II and III are all correct', 'None of I, II or III is correct'], 'C', 'I demands that EVERY pair is divisor/multiple, which is too strict (it returns False for [4, 8, 12]). II sets found once and then stops counting, so count never reaches len(num_list) for lists of 2 or more (and gives True for [2]). III resets is_valid for every number and requires at least one partner, so it matches all five examples.', 10),
];

const wr = [
  { n: 11, pts: 8, ch: 5, q: '<b>Alternating case.</b> Write <code>alternate_case(s)</code> that returns a new string where the letters at even positions (starting at 0) are lowercase and the letters at odd positions are uppercase. Non-letters are left unchanged. <code>alternate_case(\'hello world!\')</code> returns <code>\'hElLo wOrLd!\'</code>.', a: `<p>Loop over the index, build a new string, and use the position (not the letter count) to decide the case. Strings are immutable, so we build a new one.</p>${code(`def alternate_case(s):
    return_str = ''
    for i in range(len(s)):
        if i % 2 == 0:
            return_str += s[i].lower()
        else:
            return_str += s[i].upper()
    return return_str`)}<p><b>Marking points:</b> loop over indices, even/odd test with <code>%</code>, <code>.lower()</code>/<code>.upper()</code> (harmless on non-letters, so spaces and digits are unchanged), accumulate into a new string, and <code>return</code> it.</p>` },
  { n: 12, pts: 7, ch: 5, q: '<b>Products.</b> Write <code>get_products(start, limit)</code> returning the list <code>[start*1, start*2, start*3, ...]</code> whose length is exactly <code>limit</code>. <code>get_products(2, 4)</code> returns <code>[2, 4, 6, 8]</code> and <code>get_products(-4, 6)</code> returns <code>[-4, -8, -12, -16, -20, -24]</code>.', a: `<p>Repeat exactly <code>limit</code> times, so use <code>range(limit)</code> and multiply by <code>i + 1</code>.</p>${code(`def get_products(start, limit):
    series = []
    for i in range(limit):
        product = start * (i + 1)
        series.append(product)
    return series`)}<p><b>Marking points:</b> an empty list before the loop, exactly <code>limit</code> iterations, the multiplier is <code>i + 1</code> (not <code>i</code>), append each product, return the list.</p>` },
  { n: 13, pts: 7, ch: 7, q: '<b>FairPrice price lookup.</b> <code>inventory</code> is a list of tuples <code>(product_name, price, on_sale)</code>. Write <code>find_price(product_name, inventory)</code>: return the full price if the product is not on sale, the price after a 15% discount if it is on sale (both rounded to 2 decimal places), or <code>None</code> if it is not in the inventory. Names are case-sensitive. <code>find_price(\'banana\', inventory)</code> returns <code>0.42</code> for <code>(\'banana\', 0.49, True)</code>.', a: `<p>Unpack each tuple, test the name, and only return <code>None</code> after the whole loop has finished.</p>${code(`def find_price(product_name, inventory):
    for item in inventory:
        name, price, on_sale = item
        if name == product_name:
            if on_sale:
                return round(price * 0.85, 2)
            else:
                return round(price, 2)
    return None`)}<p><b>Marking points:</b> tuple unpacking, an equality test on the name, a 0.85 multiplier for sale items, <code>round(..., 2)</code>, an early return inside the loop, and <code>return None</code> placed <b>after</b> the loop. Returning <code>None</code> inside the loop would stop at the first non-matching item.</p>` },
  { n: 14, pts: 3, ch: 5, q: '<b>Playlist.</b> Write <code>build_a_playlist(playlist)</code>. It repeatedly prompts for Title, Artist, Genre and Release Year, appends each song as a tuple <code>(title, artist, genre, year)</code> (the year is an int) and stops when the title entered is the empty string. It returns the playlist; an empty list stays empty if no song is added.', a: `<p>A <code>while</code> loop that stops on an empty title, with the first prompt before the loop.</p>${code(`def build_a_playlist(playlist):
    title = input("Title: ")
    while title != '':
        artist = input("Artist: ")
        genre = input("Genre: ")
        release_year = int(input("Release Year: "))
        song = (title, artist, genre, release_year)
        playlist.append(song)
        title = input("\\nTitle: ")
    return playlist`)}<p><b>Marking points:</b> read the title first, loop while it is not <code>''</code>, convert the year with <code>int()</code>, store a tuple, append to the given list, read the next title at the end of the loop, and return the list.</p>` },
  { n: 15, pts: 6, ch: 8, q: '<b>Actors and movies.</b> (A) <code>actor_db</code> maps each actor to a list of movie titles. Write <code>invert_actor_dictionary(actor_db)</code> returning a dictionary that maps each movie title to the list of actors in it (order does not matter). (B) Write <code>read_actor_db(filename)</code> for a CSV with a header line such as <code>Actor,ActorID,Film,Year,Votes,Rating,FilmID</code>. Return a dictionary whose key is the tuple <code>(film_title, year)</code> (the year is an int) and whose value is the list of actors. Use the header to find the columns, because the column order may change.', a: `<p><b>Part A.</b> Loop over the actor and the movies, and build the inverse mapping, creating each list the first time a movie is seen.</p>${code(`def invert_actor_dictionary(actor_db):
    dct = {}
    for actor, movies in actor_db.items():
        for movie in movies:
            if movie not in dct:
                dct[movie] = []
            dct[movie].append(actor)
    return dct`)}<p><b>Part B.</b> Read the header row once to find the column indices, then use a tuple key.</p>${code(`def read_actor_db(filename):
    dct = {}
    line_num = 0
    with open(filename) as fp:
        for line in fp:
            data = line.rstrip('\\n').split(',')
            if line_num == 0:
                for ix in range(len(data)):
                    if data[ix] == 'Film':
                        film_col = ix
                    if data[ix] == 'Actor':
                        actor_col = ix
                    if data[ix] == 'Year':
                        year_col = ix
            else:
                film_name = data[film_col]
                actor_name = data[actor_col]
                year = int(data[year_col])
                key = film_name, year
                if key not in dct:
                    dct[key] = []
                dct[key].append(actor_name)
            line_num = line_num + 1
    return dct`)}<p><b>Marking points:</b> <code>.items()</code> iteration, nested loop, create-then-append pattern; <code>with open</code>, split on commas, use the header to find the column indices, convert the year to <code>int</code>, tuple key (valid because tuples are immutable), a list of actors per key.</p>` },
];

import { wr2020 } from './wr2020.mjs';
export const exam = () => ({ mcq: [...mcq24, ...mcq20], wr: [...wr, ...wr2020] });
