# IS115 Algorithms & Programming: question bank

Types: **MCQ** one correct option, **MSQ** select all that apply, **Fill** type the answer, **Short** short answer (self-marked). Correct options are marked ✅.

---

## Chapter 1. Counting

1. **[MCQ]** Which rule multiplies the ways of every stage when all stages are needed for one outcome?
   - Sum rule
   - ✅ Product rule
   - Complement rule
   - Pigeonhole principle
   *Why:* Each outcome takes one choice from every stage, so the counts multiply.

2. **[MCQ]** Which formula counts ordered selections of `r` objects from `n` distinct objects?
   - ✅ `n!/(n−r)!`
   - `n!/(r!(n−r)!)`
   - `nʳ`
   - `(n−1)!`
   *Why:* This is `P(n, r)`: the product of `r` shrinking choices.

3. **[MCQ]** Which method treats objects that must stay together as one unit?
   - Gap method
   - Complement rule
   - Circular arrangement
   - ✅ Block method
   *Why:* The required objects form a block, which is then multiplied by its internal arrangements.

4. **[MCQ]** How many ways can 6 distinct objects be arranged in a line?
   - 36
   - 120
   - ✅ 720
   - 66
   *Why:* There are `6! = 6 × 5 × 4 × 3 × 2 × 1`.

5. **[MCQ]** How many arrangements of 5 distinct people around a round table exist when rotations are identical and reflections count as different?
   - 120
   - ✅ 24
   - 12
   - 25
   *Why:* The count is `(5 − 1)! = 4! = 24`.

6. **[MSQ]** Which of the following statement(s) about the product rule and the sum rule is/are true?
   - ✅ The product rule applies when every stage is needed to build one outcome.
   - ✅ The sum rule applies when exactly one of several mutually exclusive cases is chosen.
   - The word "or" in English always means that the counts should be added.
   - Three-letter codes from five letters with no repeats number `5³`.
   - ✅ Binary strings of length `n` number `2ⁿ`.
   *Why:* Multiply for required stages, add for exclusive cases, and count how choices shrink when repeats are banned.

7. **[MSQ]** Which of the following statement(s) about permutations and combinations is/are true?
   - ✅ `P(n, r) = n!/(n−r)!` counts ordered selections of `r` objects from `n`.
   - ✅ `C(n, r) = P(n, r)/r!` because each unordered group appears `r!` times among the ordered selections.
   - If swapping two chosen items gives a different valid outcome, a combination is needed.
   - ✅ `C(n, r) = C(n, n−r)`.
   - `P(n, n) = 1`.
   *Why:* Order matters for permutations; combinations divide out the `r!` internal orders.

8. **[MSQ]** Which of the following statement(s) about the block method and the gap method is/are true?
   - ✅ Six distinct objects in a row with two required adjacent give `5! × 2!` arrangements.
   - ✅ Omitting the internal arrangements of the block undercounts.
   - ✅ Arranging `m` ordinary objects creates `m + 1` gaps.
   - If more than `m + 1` special objects must be pairwise non-adjacent among `m` ordinary objects, the count is positive but small.
   - After choosing the gaps, the order of distinct special objects does not matter.
   *Why:* Blocks multiply by internal orders; gaps number `m + 1` and need `k!` for distinct special objects.

9. **[MSQ]** Which of the following statement(s) about circular arrangements, the complement rule and the pigeonhole principle is/are true?
   - ✅ `n` distinct people at a round table, with rotations identical, give `(n − 1)!` arrangements.
   - ✅ If reflections are also identical, divide `(n−1)!` by 2 for `n ≥ 3`.
   - Twelve students are enough to guarantee two with the same birth month.
   - ✅ "At least one digit" is counted as all strings minus the strings with no digit.
   - To guarantee `m` objects in some one of `k` categories you need `k·m` objects.
   *Why:* Fix one person for circles, subtract the unwanted set, and use `k(m−1)+1` for pigeonhole.

10. **[MSQ]** Which of the following statement(s) about inclusion–exclusion is/are true?
   - ✅ `|A ∪ B| = |A| + |B| − |A ∩ B|`.
   - ✅ The integers 1–1000 divisible by 3 or 5 number 467.
   - `333 + 200 = 533` is correct because every multiple is counted once.
   - ✅ The multiples of both 3 and 5 are exactly the multiples of 15, and there are 66 of them up to 1000.
   - It is used only when the two cases cannot happen together.
   *Why:* Subtract the overlap once when cases can happen together.

---

## Chapter 2. Complexity and Big-O

11. **[MCQ]** Which complexity class has the bound `O(n log n)`?
   - Logarithmic
   - Linear
   - ✅ Linearithmic
   - Exponential
   *Why:* `n` work at each of about `log n` levels gives `n log n`, as in merge sort.

12. **[MCQ]** What does Big-O describe?
   - The exact running time in seconds
   - ✅ An upper bound on how the operation count grows with input size
   - Only the memory an algorithm uses
   - Only the best case
   *Why:* It captures the shape of growth, not an exact count.

13. **[MCQ]** What does `O(n² + 5n + 20)` simplify to?
   - ✅ `O(n²)`
   - `O(n)`
   - `O(n² + 5n)`
   - `O(20)`
   *Why:* The dominant quadratic term decides the growth.

14. **[MCQ]** About how many iterations does a loop run when its index is halved with `i = i // 2` from `n` down to 1?
   - `n`
   - `n/2`
   - `n²`
   - ✅ `log₂ n`
   *Why:* Each pass removes half of the remaining range.

15. **[MCQ]** Which case does the course use by default when quoting a Big-O bound?
   - Best case
   - Average case
   - ✅ Worst case
   - Amortised case
   *Why:* It is a dependable upper limit on the work.

16. **[MSQ]** Which of the following statement(s) about algorithms and the cases of Big-O analysis is/are true?
   - ✅ An algorithm needs inputs, outputs and a finite sequence of precise, effective steps.
   - Efficiency is measured by the programming language and processor speed.
   - ✅ Worst case is the default because average case needs input frequencies that are usually unknown.
   - The best case is the most representative case because it is the cheapest.
   - ✅ Amortised time divides the total cost of a sequence of operations across them without assuming randomness.
   *Why:* Measure operation growth, default to the worst case, and know amortised time is not random.

17. **[MSQ]** Which of the following statement(s) about simplifying Big-O is/are true?
   - ✅ `O(7n)` simplifies to `O(n)`.
   - ✅ `O(n² + 5n + 20)` simplifies to `O(n²)`.
   - `0.0001 · 2.1ⁿ` is bounded by `O(2ⁿ)` because the coefficient is tiny.
   - ✅ `5ⁿ + 2ⁿ` simplifies to `O(5ⁿ)`.
   - For independent inputs, `O(2ᵐ + 2ⁿ)` can always be reduced to `O(2ⁿ)`.
   *Why:* Drop multipliers, not bases, and keep independent variables.

18. **[MSQ]** Which of the following statement(s) about growth rates is/are true?
   - ✅ Doubling `n` makes an `O(n²)` algorithm perform about four times the operations.
   - ✅ Doubling `n` adds about one more operation for an `O(log n)` algorithm.
   - Doubling `n` doubles the operations of an `O(2ⁿ)` algorithm.
   - ✅ The growth order is `1 < log n < n < n log n < n² < n³ < 2ⁿ < n!`.
   - A machine 1000 times faster helps an `n!` algorithm as much as it helps a polynomial one.
   *Why:* Quadratic quadruples, logarithmic adds one, exponential doubles per extra unit.

19. **[MSQ]** Which of the following statement(s) about analysing loops is/are true?
   - ✅ `range(0, n, 2)` runs about `n/2` iterations and is `O(n)`.
   - ✅ A loop that doubles its index each pass runs about `log₂ n` iterations.
   - Consecutive loops over `n` items and `m` items cost `O(nm)`.
   - ✅ Nested independent loops over `n` and `m` items cost `O(nm)`.
   - ✅ A triangular loop whose inner count is `i` costs `Σ i = n(n+1)/2`, which is `O(n²)`.
   *Why:* Add consecutive blocks, multiply nested loops, sum triangular ones.

20. **[MSQ]** Which of the following statement(s) about the six-step method and logarithms is/are true?
   - ✅ Loop iterations should be counted exactly before simplifying to Big-O.
   - A function call can be treated as `O(1)` automatically.
   - ✅ The log base does not matter in Big-O.
   - ✅ `log(n²)` is `O(log n)`.
   - `(log n)²` is `O(log n)`.
   *Why:* Count first, cost calls honestly, and remember log(n²) differs from (log n)².

---

## Chapter 3. Searching and Sorting

21. **[MCQ]** Which precondition does binary search need?
   - The array must have no duplicates
   - The array length must be a power of 2
   - The key must be at the end
   - ✅ The array must be sorted
   *Why:* Sorted order lets each comparison discard half the region.

22. **[MCQ]** What is the name for a fact that stays true before and after every iteration of a loop?
   - Stopping rule
   - State
   - ✅ Invariant
   - Progress
   *Why:* It is the property that justifies correctness.

23. **[MCQ]** What is the worst-case complexity of insertion sort?
   - `O(n log n)`
   - ✅ `O(n²)`
   - `O(n)`
   - `O(log n)`
   *Why:* A reverse-ordered array forces about `n(n−1)/2` comparisons.

24. **[MCQ]** What is the time complexity of bottom-up merge sort?
   - ✅ `O(n log n)`
   - `O(n²)`
   - `O(n)`
   - `O(log n)`
   *Why:* `log₂ n` levels, each moving `n` elements.

25. **[MCQ]** How does the group size change from one level of bottom-up merge sort to the next?
   - It halves
   - It increases by 1
   - It stays the same
   - ✅ It doubles
   *Why:* Two neighbouring sorted groups merge into one group twice the size.

26. **[MSQ]** Which of the following statement(s) about iterative reasoning and linear search is/are true?
   - ✅ An invariant is a fact that stays true before and after every iteration.
   - ✅ A successful linear search takes about `(n + 1)/2` comparisons on average.
   - An unsuccessful linear search takes only about `n/2` comparisons on average.
   - Linear search requires the array to be sorted.
   - ✅ When tracing by hand, execute one iteration, record every changed variable and check the stopping condition before the next row.
   *Why:* Invariants, average cost and the row-by-row trace.

27. **[MSQ]** Which of the following statement(s) about binary search is/are true?
   - ✅ It requires the array to be sorted.
   - ✅ Its worst case takes about `log₂ n + 1` steps, so it is `O(log n)`.
   - Its best case is `O(log n)`.
   - ✅ Searching for 57 in the 15-item sorted example needs 3 comparisons.
   - The base of the logarithm changes the Big-O class.
   *Why:* Sorted input, `O(log n)` worst, `O(1)` best.

28. **[MSQ]** Which of the following statement(s) about insertion sort is/are true?
   - ✅ It keeps the left part of the array sorted.
   - ✅ Its worst case occurs on a strictly reverse-ordered array.
   - On an already sorted array it takes `O(n²)` time.
   - ✅ It has nested loops because moving the key left is itself a loop.
   - Its best case is `O(log n)`.
   *Why:* Insertion sort is quadratic in the worst case and linear in the best case.

29. **[MSQ]** Which of the following statement(s) about bottom-up merge sort is/are true?
   - ✅ The group size doubles at each level, from 1 to 2 to 4 and so on.
   - ✅ Going from size 1 to size `n` takes `log₂ n` levels.
   - ✅ At every level, the merges together touch each element once.
   - On an already sorted array it runs in `O(n)`.
   - Small groups move fewer elements per level, so early levels are cheaper.
   *Why:* Levels times work per level gives `n log n`, in every case.

30. **[MSQ]** Which of the following statement(s) about merging and combining sorting with other steps is/are true?
   - ✅ Taking the smaller front value is safe because both inputs are sorted.
   - ✅ Merging lists of lengths `n` and `m` takes `O(n + m)` time.
   - Insertion sort makes more comparisons than merge sort on an already sorted array.
   - Binary search can be applied to an unsorted array as long as you start in the middle.
   - ✅ Sorting first and then doing an `O(n)` scan costs `O(n log n)` overall.
   *Why:* Merging is linear; sort-then-scan is dominated by the sort.

---

## Chapter 4. Recursion

31. **[MCQ]** Which part of a recursive function states in one sentence what `f(input)` returns?
   - ✅ Contract
   - Base case
   - Reduction step
   - Combination step
   *Why:* It fixes the meaning of the function so each smaller call can be trusted.

32. **[MCQ]** What is the base case of a recursive function?
   - The input that makes the most calls
   - The step that shrinks the problem
   - The value returned by the first call
   - ✅ The smallest input answered directly, without a recursive call
   *Why:* It is where the chain of calls stops.

33. **[MCQ]** What is the complexity of `T(n) = T(n−1) + O(n)`?
   - `O(n)`
   - `O(log n)`
   - ✅ `O(n²)`
   - `O(n log n)`
   *Why:* The sum `n + (n−1) + ⋯ + 1` equals `n(n+1)/2`.

34. **[MCQ]** What does recursion depth measure?
   - The total number of calls made
   - ✅ The longest chain of simultaneously unfinished calls
   - The number of base cases
   - The number of return statements
   *Why:* It determines how many stack frames exist at once.

35. **[MCQ]** How many base cases does Fibonacci need?
   - ✅ Two
   - One
   - None
   - Three
   *Why:* `fibonacci(n−2)` can land on either 0 or 1.

36. **[MSQ]** Which of the following statement(s) about the structure of recursive functions is/are true?
   - ✅ A recursive function has a contract, a base case, a reduction step and a combination step.
   - Fibonacci needs only one base case because `fibonacci(n−1)` always reaches it.
   - ✅ A base case written after an unconditional recursive call is dead code, so the recursion never stops.
   - ✅ If the base case is `n == 1` but `n = 0` is possible, subtracting 1 can skip past it.
   - Recursion depth is the total number of calls made.
   *Why:* Four parts, enough base cases, and a reachable base case.

37. **[MSQ]** Which of the following statement(s) about tracing `factorial(4)` is/are true?
   - ✅ It makes four calls but only three multiplications.
   - The base case performs a multiplication.
   - ✅ `factorial(3)` returns `3 × 2 = 6` once `factorial(2)` has returned 2.
   - The number of calls always equals the number of operations.
   - ✅ Each unfinished call keeps its own parameters in a stack frame.
   *Why:* Calls differ from operations, and values return upwards.

38. **[MSQ]** Which of the following statement(s) about Fibonacci is/are true?
   - ✅ Tracing `fibonacci(4)` computes `fibonacci(2)` more than once.
   - ✅ The number of additions grows roughly like `1.6ⁿ`.
   - A loop that keeps the last two values is `O(2ⁿ)`.
   - Recursion is automatically more efficient than iteration.
   - ✅ Since `1.6ⁿ < 2ⁿ`, both `O(1.6ⁿ)` and `O(2ⁿ)` are valid upper bounds.
   *Why:* Repeated subproblems make recursive Fibonacci exponential; the loop is linear.

39. **[MSQ]** Which of the following statement(s) about halving the exponent when computing a power is/are true?
   - ✅ Halving the exponent with two recursive calls per level gives `T(n) = 2T(n/2) + O(1) = O(n)`.
   - Halving the input always gives `O(log n)`.
   - ✅ Saving the half-power and reusing it gives `T(n) = T(n/2) + O(1) = O(log n)`.
   - ✅ Reducing the exponent by 1 each time performs about `n` multiplications for exponent `n`.
   - Writing the same recursive call twice runs it only once because the second result is reused.
   *Why:* One call per level is what makes halving logarithmic.

40. **[MSQ]** Which of the following statement(s) about recurrences is/are true?
   - ✅ `T(n) = T(n−1) + c` is `O(n)`.
   - ✅ `T(n) = T(n/2) + c` is `O(log n)`.
   - `T(n) = T(n−1) + O(n)` is `O(n log n)`.
   - ✅ `T(n) = T(n/2) + O(n)` is `O(n)`.
   - A recursive call may be counted as `O(1)` when computing local work.
   *Why:* Chains add, geometric sums collapse, and recursive calls are never `O(1)`.

---

## Chapter 5. Linear Data Structures

41. **[MCQ]** Which order does a stack follow?
   - First in, first out
   - ✅ Last in, first out
   - Smallest value first
   - Random order
   *Why:* Only the most recently added item is accessible.

42. **[MCQ]** Which operation removes and returns the head of a queue?
   - ✅ `dequeue`
   - `enqueue`
   - `peek`
   - `push`
   *Why:* It removes the earliest added item still present.

43. **[MCQ]** What is the cost of `dequeue` in a plain array queue with the head at index 0?
   - `O(1)`
   - `O(log n)`
   - `O(n²)`
   - ✅ `O(n)`
   *Why:* Every remaining item shifts down by one index.

44. **[MCQ]** What does `dequeue` return in a priority queue?
   - The oldest item
   - The newest item
   - ✅ The item with the best priority
   - The largest number
   *Why:* Arrival order does not decide which item leaves.

45. **[MCQ]** Which end of a list should hold the stack top for `O(1)` push and pop?
   - The front, at index 0
   - ✅ The end
   - The middle
   - Either end is the same
   *Why:* Appending and popping at the end shifts no items.

46. **[MSQ]** Which of the following statement(s) about stacks and queues is/are true?
   - ✅ A stack is last in, first out.
   - A queue is last in, first out.
   - ✅ A list-based stack with its top at index 0 has `O(n)` push and pop.
   - ✅ A stack with its top at the end of the list has `O(1)` push and pop.
   - `peek` removes the accessible item.
   *Why:* LIFO against FIFO, and which end of the array matters.

47. **[MSQ]** Which of the following statement(s) about array-backed queues is/are true?
   - ✅ With the head at index 0, `enqueue` is `O(1)`.
   - With the head at index 0, `dequeue` is `O(1)`.
   - ✅ Whichever end is removable, array operations at that end cost `O(n)`.
   - ✅ A palindrome can be tested by comparing stack pops with queue dequeues of the same characters.
   - The palindrome test needs only `O(1)` extra space.
   *Why:* The shifting cost sits at the removable end.

48. **[MSQ]** Which of the following statement(s) about priority queues is/are true?
   - ✅ `dequeue` returns the best-priority item regardless of arrival order.
   - ✅ An unsorted-list implementation has `O(1)` `enqueue` and `O(n)` `dequeue`.
   - A sorted-list implementation has `O(1)` `enqueue`.
   - ✅ A min-heap gives `O(log n)` `enqueue` and `dequeue` and `O(1)` `peek`.
   - One implementation is best for every access pattern.
   *Why:* Each implementation moves cost between insertion and removal.

49. **[MSQ]** Which of the following statement(s) about abstract data types is/are true?
   - ✅ An ADT is defined by its operations and hides its representation.
   - ✅ Localisation means a changed implementation does not break client code.
   - Flexibility means the client must choose the implementation.
   - A list is a linear structure with one accessible end.
   - ✅ A stack implements the recursive call stack.
   *Why:* ADTs hide the representation and give localisation and flexibility.

50. **[MSQ]** Which of the following statement(s) about a queue built from two stacks is/are true?
   - ✅ `IN` receives arriving items and `OUT` serves departing items.
   - ✅ Transferring `IN` to `OUT` reverses the order a second time, restoring first-in, first-out.
   - The transfer happens on every `dequeue`.
   - ✅ Each item moves from `IN` to `OUT` at most once, giving amortised `O(1)` per operation.
   - A single `dequeue` is always `O(1)`.
   *Why:* Reverse twice and amortise the transfers.

---

## Chapter 6. Trees

51. **[MCQ]** Which node of a tree has no children?
   - Root
   - Sibling
   - ✅ Leaf
   - Ancestor
   *Why:* A leaf is a node with no children.

52. **[MCQ]** Which traversal visits the parent before either of its subtrees?
   - Inorder
   - ✅ Preorder
   - Postorder
   - Binary search
   *Why:* The "pre" marks the parent first.

53. **[MCQ]** Which traversal of a BST visits the keys in ascending order?
   - ✅ Inorder
   - Preorder
   - Postorder
   - None of them
   *Why:* It visits the left subtree, then the parent, then the right subtree.

54. **[MCQ]** What is the worst-case complexity of searching a BST with `n` nodes?
   - `O(log n)`
   - `O(1)`
   - `O(n log n)`
   - ✅ `O(n)`
   *Why:* A skewed tree has height `n`, and search costs the height.

55. **[MCQ]** Which binary tree shape requires every node to have exactly 0 or 2 children?
   - Complete
   - Perfect
   - ✅ Full
   - Height-balanced
   *Why:* No node has exactly one child.

56. **[MSQ]** Which of the following statement(s) about tree terminology is/are true?
   - ✅ The root is the topmost node and sits at level 1.
   - ✅ Height is the maximum level of any node, and an empty tree has height 0.
   - An ancestor is always a direct parent.
   - ✅ Siblings share the same parent.
   - A leaf has exactly two children.
   *Why:* Root at level 1, height is the maximum level.

57. **[MSQ]** Which of the following statement(s) about binary tree shapes is/are true?
   - ✅ In a full tree every node has 0 or 2 children.
   - ✅ In a complete tree every level except possibly the last is full and the last is packed left.
   - ✅ In a perfect tree all leaves are at the same depth and every internal node has 2 children.
   - Every full tree is complete.
   - ✅ With the root at level 1, a perfect tree of height `h` has `2ʰ − 1` nodes.
   *Why:* Full, complete, perfect and height-balanced are different properties.

58. **[MSQ]** Which of the following statement(s) about traversals is/are true?
   - ✅ Preorder visits the parent before both subtrees.
   - ✅ Inorder of a BST visits keys in ascending order.
   - Postorder visits the parent first.
   - ✅ Each traversal is `O(n)` because each node is visited once with `O(1)` work.
   - The postorder of the BST built from 2, 10, 4, 7, 19, 5, 8, 11, 3, 15 starts with 2.
   *Why:* Parent first, middle or last; all linear.

59. **[MSQ]** Which of the following statement(s) about binary search trees is/are true?
   - ✅ Every value in a node's left subtree is smaller and every value in its right subtree is larger.
   - ✅ A new key is inserted exactly where a search for it would have failed.
   - ✅ Removing a node with one child lets the parent adopt that child.
   - ✅ Removing a node with two children can use the left-most node of the right subtree.
   - Removing a leaf requires replacing it with its successor.
   *Why:* The ordering property drives search, insert and the three removal cases.

60. **[MSQ]** Which of the following statement(s) about BST efficiency is/are true?
   - ✅ The maximum number of comparisons equals the height of the tree.
   - ✅ A balanced tree of `n` nodes has height about `⌊log₂ n⌋ + 1`, so operations are `O(log n)`.
   - Inserting already sorted keys one at a time produces a balanced tree.
   - A completely skewed BST still supports `O(log n)` search.
   - ✅ For a non-empty BST with root at level 1, `⌈log₂(n+1)⌉ ≤ h ≤ n`.
   *Why:* Cost equals height, and insertion order decides the height.

---

## Chapter 7. Heaps

61. **[MCQ]** Which two rules define a min-heap?
   - Left subtree < node < right subtree, with no shape rule
   - Perfect shape and sorted array order
   - Every node has 0 or 2 children and the leaves are sorted
   - ✅ Complete shape and every parent ≤ its children
   *Why:* The shape rule keeps height logarithmic and the order rule puts the minimum at the root.

62. **[MCQ]** Where is the minimum key in a min-heap?
   - At the left-most leaf
   - At the last array position
   - ✅ At the root
   - In the middle of the array
   *Why:* Every path going down never decreases, so the root is smallest.

63. **[MCQ]** In a 0-based array heap, where is the left child of index `j`?
   - `2j`
   - ✅ `2j + 1`
   - `j + 1`
   - `2j + 2`
   *Why:* Levels are stored consecutively, so this index follows from doubling.

64. **[MCQ]** What is the time complexity of BuildHeap on `n` entries?
   - ✅ `O(n)`
   - `O(n log n)`
   - `O(log n)`
   - `O(n²)`
   *Why:* Most nodes are near the leaves and fall only a short way.

65. **[MCQ]** Which sorting algorithm results from using a heap-based priority queue?
   - Selection sort
   - Insertion sort
   - Merge sort
   - ✅ Heap sort
   *Why:* Both phases cost `O(log n)` per item, giving `O(n log n)`.

66. **[MSQ]** Which of the following statement(s) about the definition of a min-heap is/are true?
   - ✅ A heap is a complete tree in which every parent is ≤ both children.
   - ✅ The minimum key is at the root.
   - `[2, 5, 4, 1]` is a valid min-heap.
   - The inorder traversal of a heap is always sorted.
   - ✅ Searching a heap for an arbitrary key costs `O(n)`.
   *Why:* Complete shape, parent ≤ children, minimum at the root.

67. **[MSQ]** Which of the following statement(s) about storing a heap in a 0-based array is/are true?
   - ✅ The left child of index `j` is at `2j + 1`.
   - ✅ The right child of index `j` is at `2j + 2`.
   - ✅ The parent of index `j` is at `⌊(j − 1)/2⌋`.
   - The last parent is at index `⌊n/2⌋`.
   - In a 10-entry heap, index 4 has a right child at index 10.
   *Why:* Index arithmetic, 0-based.

68. **[MSQ]** Which of the following statement(s) about heap insertion and removal is/are true?
   - ✅ Insertion appends at index `n` because that keeps the tree complete.
   - ✅ Up-heap swaps the new key upward while it is smaller than its parent.
   - ✅ removeMin moves the last entry into the root and then down-heaps.
   - Down-heap swaps with the larger child.
   - ✅ Insertion and removeMin both cost `O(log n)` because they follow one root-to-leaf path.
   *Why:* One path, smaller child, `O(log n)`.

69. **[MSQ]** Which of the following statement(s) about BuildHeap is/are true?
   - ✅ It runs down-heap from the last parent back to the root.
   - ✅ It is correct bottom-up because both child subtrees are already heaps when a node is repaired.
   - It costs `O(n log n)`.
   - ✅ For a full 15-node tree the maximum swap count is `1·3 + 2·2 + 4·1 + 8·0 = 11`.
   - The leaves are processed first with down-heap.
   *Why:* Bottom-up from the last parent, `O(n)`.

70. **[MSQ]** Which of the following statement(s) about sorting with a priority queue is/are true?
   - ✅ An unsorted-list queue gives selection sort with an `O(n²)` worst case.
   - ✅ A sorted-list queue gives insertion sort with an `O(n²)` worst case.
   - ✅ A heap queue gives heap sort with an `O(n log n)` worst case.
   - Inserting `n` keys one at a time into a heap costs `O(n)` in total.
   - In selection sort, phase 1 keeps the queue sorted.
   *Why:* The queue implementation determines which sort you get.

---

## Chapter 8. Hash Maps

71. **[MCQ]** What does a hash function compute?
   - ✅ The row of the table where a key belongs
   - The sorted position of the key
   - How many times the key occurs
   - A new random row on every call
   *Why:* It maps a key to a row number in `0 … N−1`.

72. **[MCQ]** What is a collision in a hash table?
   - The same key inserted twice
   - The table being completely full
   - A key that cannot be found
   - ✅ Two different keys hashing to the same row
   *Why:* Both want the same position and need a strategy to resolve it.

73. **[MCQ]** What is the load factor of a hash table with `n` entries and `N` rows?
   - `N/n`
   - `n − N`
   - ✅ `n/N`
   - `1 − n/N`
   *Why:* It is the average number of entries per row.

74. **[MCQ]** Which strategy places a colliding key in the next free row of the main array?
   - Separate chaining
   - ✅ Linear probing
   - Binary search
   - Inorder traversal
   *Why:* The probe moves forward, wrapping with `% N`.

75. **[MCQ]** Why does linear probing leave a deletion marker?
   - ✅ So later lookups continue past the row
   - To free memory immediately
   - To speed up insertion into empty rows
   - To keep the keys sorted
   *Why:* An empty row would make a lookup stop too early.

76. **[MSQ]** Which of the following statement(s) about hash functions and collisions is/are true?
   - ✅ A good hash function distributes keys uniformly and is deterministic.
   - A hash function that returns a different random row on each call is acceptable.
   - ✅ The two-stage design turns the key into an integer, then takes the remainder by `N`.
   - A larger table removes every collision.
   - ✅ With a random hash, 100 words in 1,000 rows have a 99.29% chance of at least one collision.
   *Why:* Uniform, deterministic, and collisions are frequent.

77. **[MSQ]** Which of the following statement(s) about separate chaining is/are true?
   - ✅ The load factor is `λ = n/N`.
   - ✅ The load factor can exceed 1.
   - ✅ A large load factor makes lookups generally slower.
   - Each row holds at most one entry.
   - Looking up 24 in the example with `N = 7` scans the whole table.
   *Why:* Buckets grow with load factor.

78. **[MSQ]** Which of the following statement(s) about linear probing is/are true?
   - ✅ A colliding key tries `A[(h(k) + i) % N]` for `i = 1, 2, …` until an empty row is found.
   - ✅ The `% N` makes the probe wrap from the last row back to row 0.
   - A delete can simply empty the row.
   - ✅ A lookup continues past a deletion marker.
   - The load factor can exceed 1.
   *Why:* Wrap-around, markers and a bounded load factor.

79. **[MSQ]** Which of the following statement(s) about the example `N = 7`, `h(k) = k mod 7` inserting 10, 17, 24 and 8 with linear probing is/are true?
   - ✅ The key 17 is placed at row 4, after testing rows 3 and 4.
   - ✅ The key 24 is placed at row 5.
   - ✅ The key 8 is placed at row 1.
   - After deleting 17 and leaving an ordinary empty row 4, a lookup of 24 still finds it.
   - ✅ With a deletion marker at row 4, a lookup of 24 continues to row 5 and finds it.
   *Why:* Probe sequences, and why markers matter.

80. **[MSQ]** Which of the following statement(s) about the cost and use of hash tables is/are true?
   - ✅ `get`, `put` and `remove` are expected `O(1)`.
   - ✅ The worst case for those operations is `O(n)`.
   - Listing all keys is `O(1)`.
   - A hash table is the right choice when data must be iterated in sorted order.
   - ✅ A Python `dict` is a hash table and a `set` is a hash table of keys only.
   *Why:* Expected `O(1)`, worst `O(n)`, unordered.

---

## Chapter 9. Graphs: Traversal and Topological Sort

81. **[MCQ]** Which data structure does BFS use to hold vertices waiting to be explored?
   - A stack
   - ✅ A queue
   - A priority queue
   - A binary search tree
   *Why:* A FIFO container delivers nearest-first order.

82. **[MCQ]** What is the length of a path measured in?
   - ✅ The number of edges
   - The number of vertices
   - The sum of the edge weights
   - The number of cycles
   *Why:* It is one less than the number of vertices on the path.

83. **[MCQ]** What is the running time of BFS or DFS with adjacency lists?
   - `O(V²)`
   - `O(V × E)`
   - `O(log V)`
   - ✅ `O(V + E)`
   *Why:* Each vertex is visited once and each adjacency entry checked once.

84. **[MCQ]** What is a directed acyclic graph?
   - An undirected graph with no cycles
   - A directed graph in which every vertex has in-degree 0
   - ✅ A directed graph with no cycles
   - A graph in which every edge has a weight
   *Why:* It is the kind of graph that has a topological ordering.

85. **[MCQ]** Which ordering lists every vertex so that every edge points forward?
   - A BFS visit order
   - ✅ A topological ordering
   - An inorder traversal
   - A preorder traversal
   *Why:* It requires `u` before `v` for every edge `u → v`.

86. **[MSQ]** Which of the following statement(s) about graph terminology is/are true?
   - ✅ The length of a path is its number of edges, which is one less than its number of vertices.
   - A directed edge `u → v` also gives an edge `v → u`.
   - ✅ In a directed graph, the in-degrees and the out-degrees each sum to `|E|`.
   - A→B→D→B→E is a simple path.
   - ✅ A simple undirected graph on `n` vertices has at most `n(n−1)/2` edges.
   *Why:* Count edges, and remember that direction matters.

87. **[MSQ]** Which of the following statement(s) about graph representations is/are true?
   - ✅ An adjacency list uses `O(V + E)` space.
   - ✅ An adjacency matrix uses `O(V²)` space.
   - ✅ With a matrix, testing whether edge `u → v` exists takes `O(1)`.
   - With a matrix, listing the neighbours of `u` takes `O(out-degree)`.
   - A weighted matrix should store 0 for a missing edge.
   *Why:* Space, edge tests and the missing-edge marker.

88. **[MSQ]** Which of the following statement(s) about BFS and DFS is/are true?
   - ✅ BFS uses a queue and visits nearer vertices first.
   - ✅ In an unweighted graph, BFS finds a fewest-edge path to each vertex when first discovered.
   - BFS always minimises total weight on weighted graphs.
   - ✅ DFS follows one path as deep as possible before backtracking.
   - DFS finds fewest-edge paths.
   *Why:* Queue and layers against stack and depth.

89. **[MSQ]** Which of the following statement(s) about traversal running time and conventions is/are true?
   - ✅ A traversal with adjacency lists runs in `O(V + E)`.
   - ✅ A traversal with an adjacency matrix runs in `O(V²)`.
   - A traversal with adjacency lists costs `O(V × E)`.
   - ✅ Under the Week 9 convention, stack DFS pushes neighbours in reverse list order.
   - Marking BFS vertices only when dequeued is harmless.
   *Why:* Lists add, matrices square, and conventions matter.

90. **[MSQ]** Which of the following statement(s) about topological sorting is/are true?
   - ✅ A topological ordering lists every vertex once so that each edge `u → v` has `u` first.
   - ✅ Every DAG has at least one topological ordering.
   - A graph with a cycle has exactly one ordering.
   - The ordering of a DAG is always unique.
   - ✅ The DFS method pushes each vertex when its call finishes, then pops for the order.
   *Why:* Orderings exist exactly for DAGs and need not be unique.

---

## Chapter 10. Graph Search and Shortest Paths

91. **[MCQ]** Which container does uniform cost search use for its frontier?
   - A queue
   - A stack
   - ✅ A priority queue
   - A hash table
   *Why:* Priority is the total path cost from the start.

92. **[MCQ]** When does uniform cost search stop?
   - When the target is first enqueued
   - ✅ When the target is dequeued
   - When the queue first has two entries
   - After visiting every vertex once
   *Why:* Only then is its cost guaranteed to be the lowest.

93. **[MCQ]** Which strategy guarantees the lowest total weight when weights are non-negative?
   - ✅ Uniform cost search
   - Breadth-first search
   - Depth-first search
   - Topological sort
   *Why:* It always expands the cheapest path so far.

94. **[MCQ]** In state-space search, what does an edge represent?
   - A weight that must be summed
   - A goal state
   - An invalid state
   - ✅ A legal move from one state to another
   *Why:* Following edges builds a sequence of actions.

95. **[MCQ]** What is the priority of an entry in the UCS priority queue?
   - The number of edges from the start
   - An estimate of the remaining distance to the goal
   - ✅ The total path cost from the start so far
   - The alphabetical order of the vertex
   *Why:* A smaller cost means higher priority.

96. **[MSQ]** Which of the following statement(s) about state-space search is/are true?
   - ✅ A state describes a complete situation, such as who stands on the starting bank.
   - ✅ Edges represent legal moves between states.
   - Repeated states are worth re-exploring because they may lead somewhere new.
   - ✅ Invalid states, such as the wolf and goat left together without the farmer, are not expanded.
   - ✅ The aim is to find a sequence of actions that leads to a goal state.
   *Why:* States, moves, invalid and repeated states.

97. **[MSQ]** Which of the following statement(s) about uniform cost search is/are true?
   - ✅ It expands the vertex with the least total cost from the start so far.
   - ✅ It keeps its candidates in a priority queue ordered by path cost.
   - It stops as soon as the target is first enqueued.
   - ✅ A queued vertex reached more cheaply keeps only the cheaper entry.
   - It guarantees the lowest total weight even with negative weights.
   *Why:* Priority by cost, update rule, stop on dequeue.

98. **[MSQ]** Which of the following statement(s) comparing BFS, DFS and UCS is/are true?
   - ✅ BFS uses a queue, DFS a stack and UCS a priority queue.
   - DFS guarantees the fewest edges.
   - ✅ UCS uses edge weights, while BFS and DFS ignore them.
   - BFS guarantees the lowest total weight on weighted graphs.
   - ✅ UCS guarantees the lowest total weight when weights are non-negative.
   *Why:* Containers and guarantees.

99. **[MSQ]** Which of the following statement(s) about hops and total weight is/are true?
   - ✅ The fewest-edge route and the cheapest route can differ.
   - ✅ With edges S→A 2, S→B 6, S→T 9, A→B 1, A→T 8, B→T 2, the route S→T has 1 edge and weight 9.
   - ✅ In that graph, S→A→B→T has weight 5.
   - A route with fewer edges always has lower total weight.
   - BFS on that weighted graph returns the cheapest route.
   *Why:* Sum weights separately from counting edges.

100. **[MSQ]** Which of the following statement(s) about the UCS trace from A to F in the example graph is/are true?
   - ✅ B's cost is updated from 0.9 to 0.4 via D.
   - ✅ The cheapest path is A→C→D→F with cost 1.0.
   - F is dequeued at step 3, when it is first enqueued.
   - ✅ After step 2 the queue holds B(0.9, A) and D(0.2, C).
   - The search stops at step 4 when E is enqueued.
   *Why:* Reading the UCS trace.

---

## Chapter 11. Heuristics: TSP, Greedy and Local Search

101. **[MCQ]** How many distinct round-trip tours exist for `n` cities with symmetric distances?
   - `n!`
   - `(n−1)!`
   - `n!/2`
   - ✅ `(n−1)!/2`
   *Why:* Divide `n!` by `n` start cities and by 2 for direction.

102. **[MCQ]** What is the complexity of exhaustive search for TSP?
   - `O(n²)`
   - `O(2ⁿ)`
   - ✅ `O(n!)`
   - `O(kn)`
   *Why:* It evaluates `(n−1)!/2` tours.

103. **[MCQ]** Which strategy always travels to the nearest unvisited city?
   - Exhaustive search
   - ✅ Nearest neighbour
   - Random search
   - 2-opt
   *Why:* It makes the locally cheapest choice at every step.

104. **[MCQ]** What does 2-opt do to a tour?
   - ✅ Deletes 2 edges and reconnects the pieces
   - Builds a tour city by city
   - Evaluates all `n!` tours
   - Picks `k` random tours
   *Why:* The result is a different valid tour.

105. **[MCQ]** What is a local optimum?
   - The best solution of all
   - The first solution found
   - A solution with no ties
   - ✅ A solution that no small modification improves
   *Why:* Local search stops there, even if a better solution exists elsewhere.

106. **[MSQ]** Which of the following statement(s) about counting TSP tours is/are true?
   - ✅ A round trip with symmetric distances has `(n−1)!/2` tours.
   - ✅ A round trip with asymmetric distances has `(n−1)!` tours.
   - An open path with symmetric distances has `n!` tours.
   - ✅ Five cities give 12 distinct symmetric round trips.
   - The `n!` orderings of cities each count a distinct tour once.
   *Why:* Divide by `n` for the start and 2 for direction when applicable.

107. **[MSQ]** Which of the following statement(s) about the trade-offs of TSP strategies is/are true?
   - ✅ Exhaustive search is optimal but `O(n!)`.
   - ✅ Random search of `k` tours costs `O(kn)`.
   - Random search guarantees an optimal tour.
   - ✅ Heuristics are fast and general but not guaranteed optimal.
   - Methods that are both general and optimal are fast.
   *Why:* Pick two of general, optimal and fast.

108. **[MSQ]** Which of the following statement(s) about nearest neighbour is/are true?
   - ✅ It runs in `O(n²)`.
   - ✅ From Belfast in the Ireland example it gives 985 km against an optimum of 940 km.
   - It looks ahead to the closing edge back to the start.
   - A tie should be broken without saying how.
   - ✅ It has a complete solution only after the last city is added.
   *Why:* Fast, local and short-sighted.

109. **[MSQ]** Which of the following statement(s) about local search and 2-opt is/are true?
   - ✅ Local search starts from a complete solution.
   - ✅ Local search can end at a local optimum that is not the global optimum.
   - ✅ 2-opt deletes 2 edges and reconnects the pieces into a different valid tour.
   - ✅ The 2-opt neighbourhood has `n(n−3)/2` tours, which is `O(n²)`.
   - Local search always reaches the global optimum if given enough time.
   *Why:* Start complete, improve, stop at a local optimum.

110. **[MSQ]** Which of the following statement(s) about greedy algorithms beyond TSP is/are true?
   - ✅ With coins 100, 60, 35, 5, 1, greedy gives 3 coins for 70 while 35 + 35 uses 2.
   - Greedy is always optimal for coin change.
   - ✅ In the 7 kg knapsack case, value-per-weight greedy takes E then D ($11), while B + E gives $14.
   - ✅ In the tree example, greedy gives 50 while the best path gives 91.
   - Greedy fails because it looks too far ahead.
   *Why:* Locally best is not always globally best.

---

## Chapter 12. Limits of Computation

111. **[MCQ]** What does class P contain?
   - ✅ Problems with a known polynomial-time solving algorithm
   - Problems that can only be verified quickly
   - All problems that are hard to solve
   - Problems solvable only in exponential time
   *Why:* These are solvable efficiently.

112. **[MCQ]** What does NP stand for?
   - Not Polynomial
   - New Problem
   - Non-Primitive
   - ✅ Non-deterministic Polynomial
   *Why:* It concerns polynomial-time verification of a proposed answer.

113. **[MCQ]** Which relationship between P and NP is known to hold?
   - NP ⊆ P
   - P = NP
   - ✅ P ⊆ NP
   - P ∩ NP is empty
   *Why:* A solver can verify an answer by solving and comparing.

114. **[MCQ]** What does it mean to reduce problem 1 to problem 2?
   - Prove problem 2 has fewer inputs
   - ✅ Convert any instance of problem 1 into an instance of problem 2
   - Remove constants from the Big-O of problem 1
   - Solve problem 1 by brute force
   *Why:* An algorithm for problem 2 then solves problem 1.

115. **[MCQ]** How is the class NP-complete defined in terms of other classes?
   - ✅ NP-hard ∩ NP
   - NP-hard ∪ P
   - P ∩ NP
   - NP-hard only
   *Why:* It is both NP-hard and in NP.

116. **[MSQ]** Which of the following statement(s) about efficiency and tractability is/are true?
   - ✅ An efficient algorithm runs in polynomial time or lower, `O(nᵏ)`.
   - ✅ Exponential and factorial algorithms are inefficient.
   - ✅ A problem is tractable if a polynomial-time solution is known.
   - A problem with only exponential-time algorithms known is tractable.
   - ✅ At one operation per nanosecond, `O(n!)` with `n = 20` takes about 77 years.
   *Why:* Polynomial is efficient; a known polynomial solution makes a problem tractable.

117. **[MSQ]** Which of the following statement(s) about solving and verifying is/are true?
   - ✅ Brute-force subset sum tries `2ⁿ` subsets and costs `O(2ⁿ × n)`.
   - ✅ Verifying a proposed subset takes `O(n)`.
   - Given two factors, checking them needs a long search.
   - ✅ `{5, −1, −4}` is a subset of `[11, 5, −3, −1, −2, 7, −4]` summing to 0.
   - Multiplying two numbers is as hard as factoring their product.
   *Why:* Verification is cheap while solving is expensive.

118. **[MSQ]** Which of the following statement(s) about P and NP is/are true?
   - ✅ P contains problems solved in polynomial time by a known algorithm.
   - ✅ NP contains problems whose proposed solutions can be verified in polynomial time.
   - NP stands for "not polynomial".
   - ✅ P ⊆ NP, because a solver can be used to verify an answer.
   - Every NP problem is known to be solvable in polynomial time.
   *Why:* P solves, NP verifies, and P is inside NP.

119. **[MSQ]** Which of the following statement(s) about reductions and NP-completeness is/are true?
   - ✅ A reduction converts any instance of problem 1 into an instance of problem 2.
   - ✅ If problem 1 reduces to problem 2, an algorithm for problem 2 also solves problem 1.
   - ✅ Subtraction reduces to addition by computing `A + (−B)`.
   - ✅ NP-complete problems are the intersection of NP-hard and NP.
   - Subset sum and SAT are NP-hard but outside NP.
   *Why:* Reductions transfer solvers; NP-complete is NP-hard and in NP.

120. **[MSQ]** Which of the following statement(s) about NP-hardness and P = NP is/are true?
   - ✅ Optimisation TSP is NP-hard because a tour cannot easily be checked to be shortest.
   - Minimum graph colouring is solvable in polynomial time.
   - P = NP has been proven false.
   - ✅ If P = NP, much cryptography such as RSA would collapse.
   - ✅ If P ≠ NP, approximations and heuristics remain necessary for NP-complete problems.
   *Why:* NP-hardness, cryptography and the open question.
