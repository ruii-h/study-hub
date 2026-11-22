// AY2020-21 Section B short-answer questions with worked solutions (every solution was run against the examples in the paper).
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const code = (s, l = 'python') => `<div class="t-code"><div class="t-code-header"><span>${l}</span></div><div class="t-code-body" tabindex="0">${esc(s.replace(/^\n|\n$/g, ''))}</div></div>`;
const note = '<p><i>Solution worked out for this guide (the paper has no answer key) and run against the examples in the question.</i></p>';
export const wr2020 = [
  { n: 111, no: 1, pts: 9, ch: 5, q: '<b>Print digits.</b> Write <code>print_digits(text)</code>. For every digit character in <code>text</code> print the digit itself, and for every other character print <code>#</code>, all on one line. <code>print_digits(\'12a4eu$\')</code> prints <code>12#4###</code> and <code>print_digits(\'#90=\')</code> prints <code>#90#</code>.', a: note + `<p>Loop over the characters, choose what to print, and keep everything on one line with <code>end=''</code>.</p>${code(`def print_digits(text):
    for ch in text:
        if ch.isdigit():
            print(ch, end='')
        else:
            print('#', end='')
    print()`)}<p><b>Marking points:</b> loop over the characters, a digit test (<code>isdigit()</code> or <code>ch in '0123456789'</code>), print <code>#</code> otherwise, no newline between characters, one newline at the end. The final <code>print()</code> ends the line, so an empty string leaves an empty line (the paper\'s sample output does not show that line, so follow your lecturer\'s wording if it matters).</p>` },
  { n: 112, no: 2, pts: 9, ch: 1, q: '<b>Decimal places.</b> Write <code>count_decimal_places(num_value)</code> where <code>num_value</code> is a string holding a whole or decimal number. Return the number of digits to the right of the decimal point (0 for a whole number). <code>\'11.1234\'</code> gives 4, <code>\'3.0\'</code> gives 1, <code>\'3.\'</code> gives 0.', a: note + `<p>Find the position of the point and count what is after it. Do not convert to <code>float</code>: it would lose trailing zeros and precision.</p>${code(`def count_decimal_places(num_value):
    if '.' in num_value:
        return len(num_value) - num_value.index('.') - 1
    return 0`)}<p>Alternative: <code>parts = num_value.split('.')</code> then <code>return len(parts[1]) if len(parts) == 2 else 0</code>.</p><p><b>Marking points:</b> detects whole numbers (no point) and returns 0, locates the point (<code>index</code>, <code>find</code> or <code>split</code>), counts characters after it, handles <code>'3.'</code> (0) and long strings such as <code>'3.12345678908'</code> (11).</p>` },
  { n: 113, no: 3, pts: 8, ch: 7, q: '<b>Fractions (no floats).</b> (A) Write <code>fraction_compare(fraction_1, fraction_2)</code> for tuples <code>(a, b)</code> and <code>(c, d)</code> (b and d are not 0) that returns 1, -1 or 0 when <code>a/b - c/d</code> is positive, negative or zero. You must not create any float and must not use the <code>fractions</code> library. (B) Write <code>get_largest_fraction(fractions)</code> using (A): return the largest fraction in the list, or <code>[]</code> for an empty list.', a: note + `<p><b>Part A.</b> <code>a/b - c/d = (a·d - b·c) / (b·d)</code>. The sign of the result is the sign of the numerator times the sign of the denominator, so we only need integers. Making both denominators positive first keeps the test simple.</p>${code(`def fraction_compare(fraction_1, fraction_2):
    a, b = fraction_1
    c, d = fraction_2
    if b < 0:
        a, b = -a, -b          # move the sign to the numerator
    if d < 0:
        c, d = -c, -d
    diff = a * d - b * c       # b and d are now positive
    if diff > 0:
        return 1
    elif diff < 0:
        return -1
    return 0`)}<p><b>Part B.</b> Keep the largest so far and compare each fraction with it using Part A.</p>${code(`def get_largest_fraction(fractions):
    if fractions == []:
        return []
    largest = fractions[0]
    for f in fractions:
        if fraction_compare(f, largest) == 1:
            largest = f
    return largest`)}<p><b>Marking points:</b> tuple unpacking; cross-multiplication with no <code>/</code>; negative denominators handled; returns the int values 1, -1, 0; Part B calls <code>fraction_compare</code>, handles the empty list, and returns the tuple itself.</p>` },
  { n: 114, no: 4, pts: 7, ch: 8, q: '<b>Blood donation.</b> (A) Write <code>is_compatible(donor, recipient)</code> that returns True if the donor blood type can be given to the recipient, using the compatibility table. You must use a dictionary, no conditionals and no list comprehension. (B) Write <code>get_donors(willing_donors, recipient)</code> using (A): <code>willing_donors</code> is a list of <code>(name, blood_type)</code> tuples; return those whose blood type is compatible.', a: note + `<p><b>Part A.</b> Map each recipient to the set (or list) of donor types it can receive from, then answer with a membership test. <code>in</code> is an expression, not a conditional statement.</p>${code(`COMPATIBLE_DONORS = {
    'O-':  {'O-'},
    'O+':  {'O-', 'O+'},
    'A-':  {'O-', 'A-'},
    'A+':  {'O-', 'O+', 'A-', 'A+'},
    'B-':  {'O-', 'B-'},
    'B+':  {'O-', 'O+', 'B-', 'B+'},
    'AB-': {'O-', 'A-', 'B-', 'AB-'},
    'AB+': {'O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'},
}

def is_compatible(donor, recipient):
    return donor in COMPATIBLE_DONORS[recipient]`)}<p><b>Part B.</b></p>${code(`def get_donors(willing_donors, recipient):
    result = []
    for person in willing_donors:
        if is_compatible(person[1], recipient):
            result.append(person)
    return result`)}<p><b>Marking points:</b> a dictionary keyed by blood type (either direction works if used consistently), no <code>if</code> inside <code>is_compatible</code>, a boolean result from <code>in</code>, Part B loops, calls Part A, keeps the whole tuple, and returns <code>[]</code> naturally for an empty list. (Using <code>if</code> in Part B is allowed; the restriction applies to Part A.)</p>` },
  { n: 115, no: 5, pts: 7, ch: 6, q: '<b>Trace.</b> Give the output of the program below (write <code>error</code> if it crashes, after the output printed so far).' + code(`def do_something(my_list):
    print(my_list[len(my_list) // 2])
    my_list[len(my_list) - 1] = 'golden'
    if len(my_list) > 4:
        return True
    return False

my_list = ['blue', 'white', 'red']
index = 1
while my_list[index] != 'golden':
    if index < 3:
        print(my_list[0])
        my_list = my_list[index:]
        my_list.append('cyan')
        my_list.append('pink')
    elif do_something(my_list):
        print(my_list[1])
    else:
        my_list = my_list + ['yellow', 'orange']
        print(my_list[index + 1])
    index += 1
print(index)`), a: note + `<p>Output (one item per line): <code>blue</code>, <code>white</code>, <code>cyan</code>, <code>yellow</code>, <code>golden</code>, <code>pink</code>, <code>5</code>.</p>${code(`index=1  my_list=['blue','white','red']   my_list[1]='white' != 'golden', index < 3:
         print blue; my_list = my_list[1:] + ['cyan','pink'] = ['white','red','cyan','pink']; index=2
index=2  my_list[2]='cyan':   print white; my_list = my_list[2:] + [...] = ['cyan','pink','cyan','pink']; index=3
index=3  my_list[3]='pink':   index not < 3 -> do_something: prints my_list[2] = cyan,
         sets my_list[3]='golden', len 4 is not > 4 -> False -> else branch:
         my_list = my_list + ['yellow','orange'] = ['cyan','pink','cyan','golden','yellow','orange']; print my_list[4] = yellow; index=4
index=4  my_list[4]='yellow': do_something: prints my_list[3] = golden,
         sets my_list[5]='golden', len 6 > 4 -> True -> print my_list[1] = pink; index=5
index=5  my_list[5]='golden' -> loop ends; print 5`, 'trace')}<p><b>Marking points:</b> slicing <code>my_list[index:]</code> creates a new list each time; <code>do_something</code> mutates the list it is given (so the change is visible after the call) and its own <code>print</code> appears <b>before</b> the caller's print; the final value of <code>index</code> is 5.</p>` },
  { n: 116, no: 6, pts: 5, ch: 8, q: '<b>Social people.</b> <code>meetups</code> is a list of <code>(person1, person2, date)</code> where <code>date</code> is a negative integer (days ago). Write <code>get_social_people(meetups, m, n)</code> returning the people who met at least <code>m</code> <i>different</i> people in the past <code>n</code> days (dates -1, -2, ..., -n). The order of the two names in a tuple does not matter, and the same pair may appear many times.', a: note + `<p>Build a dictionary from each person to the <b>set</b> of different people they met within the last <code>n</code> days. A set ignores repeats, so meeting the same friend twice counts once. Record the meeting for both people.</p>${code(`def get_social_people(meetups, m, n):
    friends = {}
    for p1, p2, day in meetups:
        if -n <= day <= -1:
            if p1 not in friends:
                friends[p1] = set()
            if p2 not in friends:
                friends[p2] = set()
            friends[p1].add(p2)
            friends[p2].add(p1)
    result = []
    for person, met in friends.items():
        if len(met) >= m:
            result.append(person)
    return result`)}<p>Checks against the examples: <code>(…, 2, 3)</code> gives <code>['eric', 'jack']</code>; <code>(…, 3, 5)</code> gives <code>['eric']</code>; <code>(…, 3, 1)</code> gives <code>[]</code>.</p><p><b>Marking points:</b> date filter <code>-n &lt;= day &lt;= -1</code>; both directions recorded; duplicates ignored (set, or <code>if x not in list</code>); count of <i>different</i> friends compared with <code>m</code>; list of names returned.</p><p>Without sets, store a list per person and append only if the friend is not already in it.</p>` },
];
