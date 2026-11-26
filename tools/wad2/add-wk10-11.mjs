// Adds Week 10 (Testing) and Week 11 (Composables, Pinia, routing and guards) to tools/wad2/data.json.
// Usage: node tools/wad2/add-wk10-11.mjs <dir with the unzipped course files: w10/ and w11/>
// Safe to re-run: topics whose id starts with "w10" or "w11" are removed first and added again.
import fs from 'fs';
import path from 'path';
const SRC = process.argv[2];
if (!SRC) throw new Error('pass the folder that holds w10/ and w11/');
const J = 'tools/wad2/data.json';
const W = JSON.parse(fs.readFileSync(J, 'utf8'));
W.THEORY = W.THEORY.filter((t) => !/^(w1[01]|sx(1[2-9]|2[0-2]))$|^w1[01]/.test(t.id));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rd = (p) => fs.readFileSync(path.join(SRC, p), 'utf8').replace(/\r/g, '').replace(/\s+$/, '');
const code = (s) => `<pre class="code"><code>${esc(s.replace(/^\n+|\s+$/g, ''))}\n</code></pre>`;
const co = (kind, html) => `<div class="callout ${kind}"><p>${html}</p></div>`;
const tbl = (head, rows) => `<table><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const ul = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const ol = (a) => `<ol>${a.map((x) => `<li>${x}</li>`).join('')}</ol>`;
const src = (s) => `<code>[${s}]</code>`;
const link = (id, t) => `<a class="xl" onclick="go('th','${id}')">${t}</a>`;
let fid = 300;
const file = (title, p, body) => `<h4 class="file" id="f${fid++}"><span class="ftitle">${title}</span><code>${p}</code></h4>${body}`;

const T = []; // {id, group, title, subtitle, html}
const add = (id, group, title, subtitle, html) => T.push({ id, group, title, subtitle, html });

// =====================================================================================
// WEEK 10: TESTING
// =====================================================================================
add('w10a', 'Testing concepts', 'Verification vs validation', 'Two different questions about quality',
  `<p>Testing asks two separate questions ${src('Wk10a slides')}. Keep the wording straight, because exams ask you to tell them apart.</p>` +
  tbl(['', 'Verification', 'Validation'], [
    ['Question', '“Are we building the product <strong>right</strong>?”', '“Are we building the <strong>right</strong> product?”'],
    ['Checks that', 'the software conforms to the specification and design', 'the software meets the users’ real needs'],
    ['Focus', 'correctness', 'fitness for purpose'],
    ['When', 'during development', 'near or after completion'],
  ]) +
  `<h3>Worked example</h3>` +
  `<p>Requirement: <em>“Lock an account after five consecutive failed logins.”</em></p>` +
  ul(['<strong>Verification:</strong> review the design and code to confirm the threshold is exactly 5 and the lockout works as specified.', '<strong>Validation:</strong> the code is correct, but users on phones mistype passwords and get locked out too often. After feedback the team allows 10 attempts or adds a CAPTCHA. The product now meets the users’ actual need.']) +
  co('tip', 'Memory hook: <strong>verify = spec</strong> (did we follow it?), <strong>validate = user</strong> (is it what they wanted?). Good testing needs both.'));

add('w10b', 'Testing concepts', 'Regression testing and test-driven development (TDD)', 'Re-test after changes; write the test first',
  `<h3>Regression testing</h3>` +
  `<p><strong>Regression testing</strong> re-runs previously passed test cases after the software is changed, to confirm existing features still work ${src('Wk10a slides')}. A small change in one place can break another, and regression tests catch these side effects.</p>` +
  tbl(['', 'Retesting', 'Regression testing'], [
    ['Verifies', 'that one specific bug is now fixed', 'that existing features still work after a change'],
    ['Uses', 'test cases tied to that bug', 'tests of the changed <em>and</em> the unaffected functionality'],
  ]) +
  `<p>Teams automate regression tests (JUnit and pytest for code; Selenium, Cypress and Playwright for web apps) and run them in a <strong>CI/CD pipeline</strong> whenever new code is committed.</p>` +
  `<h3>Test-driven development</h3>` +
  `<p><strong>TDD</strong> means writing the test <em>before</em> the code. It applies to unit testing and follows the <strong>Red-Green-Refactor</strong> cycle:</p>` +
  tbl(['Step', 'What you do'], [
    ['<strong>Red</strong>', 'Write a test for the behaviour you want. It should fail, because the code does not exist yet.'],
    ['<strong>Green</strong>', 'Write the simplest code that makes the test pass. It need not be perfect.'],
    ['<strong>Refactor</strong>', 'Improve structure, readability and performance while the tests keep passing.'],
  ]));

add('w10c', 'Testing concepts', 'Load testing', 'Normal expected traffic, not extreme',
  `<p><strong>Load testing</strong> is a kind of performance testing. It checks that a system meets its performance requirements <strong>under its anticipated workload</strong> ${src('Wk10a slides')}.</p>` +
  ul(['The emphasis is expected, normal usage. Extreme conditions beyond that are a <strong>stress test</strong>.', 'Example: a shop expected to support 1000 concurrent users. A load test checks it handles 1000 users with acceptable response times.', 'A load-testing tool simulates many <strong>virtual users</strong> (processes or threads that behave like real users) running realistic scenarios.', 'Tools for web apps: <strong>Apache JMeter</strong>, <strong>k6</strong> (scripts written in JavaScript), <strong>LoadRunner</strong>.']) +
  co('mistake', 'Do not mix these up: <strong>load test</strong> = expected traffic; <strong>stress test</strong> = beyond expected limits.'));

add('w10d', 'Testing concepts', 'Unit vs integration vs E2E tests', 'Scope: how much is involved',
  `<p>The three test types differ in <strong>what they test</strong>, their <strong>scope</strong> and how many components are involved ${src('Wk10a, 10b and 10c slides')}.</p>` +
  tbl(['Test type', 'What is tested', 'Components involved', 'Goal', 'Tool in this course'], [
    ['<strong>Unit</strong>', 'a single unit: a function, method, class (in Vue, a component)', 'one component in isolation', 'an individual unit works correctly', 'Vitest'],
    ['<strong>Integration</strong>', 'the interaction between units or modules', 'two or more integrated components', 'the components work correctly together', 'Vitest + Vue Test Utils'],
    ['<strong>End-to-end (E2E)</strong>', 'the complete system from the user’s perspective', 'the whole app: UI, APIs, databases', 'complete user workflows function correctly', 'Playwright'],
  ]) +
  `<p>Ask yourself: <em>Vitest asks “does this piece of code work?” Playwright asks “can the user complete a task?”</em></p>` +
  co('tip', `In a Vue app, a component counts as a <strong>unit</strong>, so a <strong>component test</strong> is a kind of unit test. Details: ${link('w10h', 'Component tests')}, ${link('w10l', 'Integration tests')}, ${link('w10m', 'E2E tests')}.`));

add('w10e', 'Unit testing with Vitest', 'Anatomy of a unit test: describe, it, expect', 'Suite, test case, assertion, matcher',
  `<p><strong>Vitest</strong> is a modern unit and integration testing framework optimised for Vite projects such as Vue 3 apps ${src('Wk10a slides')}. A unit test of a function calls it and compares the <em>actual</em> result with the <em>expected</em> one.</p>` +
  code(`// function under test (SimpleFunction.js)
export function add(a, b) { return a + b }

// test file (SimpleFunction.spec.js)
import { describe, it, expect } from 'vitest'
import { add } from './SimpleFunction'

describe('TestSuite1: add', () => {                 // a suite: a group of related tests
  it('Test1: adds two positive numbers', () => {    // one test case
    expect(add(2, 3)).toBe(5)                       // an assertion
    expect(add(1, 3)).toBe(4)
    expect(add(999, 999)).toBe(1998)
  })
})`) +
  tbl(['Piece', 'Meaning'], [
    ['<code>describe(name, fn)</code>', 'defines a <strong>test suite</strong>, a group of related test cases'],
    ['<code>it(name, fn)</code> / <code>test(name, fn)</code>', 'defines one <strong>test case</strong>. They are identical; pick one and stay consistent in a file'],
    ['<code>expect(actual)</code>', 'creates an <strong>expectation</strong>: the actual result you want to check'],
    ['<code>.toBe(expected)</code>', 'a <strong>matcher</strong>: the actual value must equal the expected value exactly'],
    ['<code>expect(...).toBe(...)</code>', 'together an <strong>assertion</strong>. If actual equals expected the test passes, otherwise it fails'],
  ]) +
  co('tip', 'Plain English for the example: <em>“In the test suite for add, verify that 2 + 3 gives 5, 1 + 3 gives 4 and 999 + 999 gives 1998.”</em>'));

add('w10f', 'Unit testing with Vitest', 'Running Vitest', 'Install, run one file, watch mode',
  `<p>Setup and commands from Exercise 1 ${src('Wk10a slides, instructions_basic_unit_test.txt')}:</p>` +
  tbl(['Command', 'What it does'], [
    ['<code>pnpm add -D vitest</code>', 'installs Vitest. <code>-D</code> means <strong>development dependency</strong>'],
    ['<code>pnpm vitest SimpleFunction.spec.js</code>', 'runs only that spec file, in <strong>watch mode</strong>: saving the file re-runs the tests automatically. Press <kbd>q</kbd> to quit'],
    ['<code>pnpm vitest</code>', 'with no file, runs every <code>*.spec.js</code> and <code>*.test.js</code> file in the folder'],
    ['<code>pnpm exec vitest run src/components/__tests__/StudentGrade.spec.js</code>', 'runs once (no watch) a named spec inside a Vue project. Without a file name it runs all specs in <code>__tests__</code>'],
  ]) +
  `<p>Put the function file and its spec in the same folder, and name the spec after the file (<code>SimpleFunction.js</code> and <code>SimpleFunction.spec.js</code>). The code is in the ${link('sx12', 'Week 10 code archive')}.</p>` +
  co('gap', 'Both <code>import { add } from &quot;./SimpleFunction&quot;</code> and the file name must match in case on case-sensitive systems. The archive spec imports <code>./simplefunction</code> in lowercase while the file is <code>SimpleFunction.js</code>; this works on Windows, so type the exact file name to be safe.'));

add('w10g', 'Unit testing with Vitest', 'Matchers: toBe, toEqual and the rest', 'Pick the matcher that fits the data',
  tbl(['Matcher', 'What it checks', 'Example'], [
    ['<code>toBe(x)</code>', 'exactly equal for <strong>primitives</strong> (uses <code>Object.is</code>). For objects it asks “same object in memory?”', '<code>expect(add(2,3)).toBe(5)</code>'],
    ['<code>toEqual(x)</code>', '<strong>deep equality</strong> of objects and arrays: same contents, not same identity', '<code>expect(makeStudent(&quot;Alice&quot;,101)).toEqual({ name:&quot;Alice&quot;, id:101, courses:[] })</code>'],
    ['<code>toBeTruthy()</code> / <code>toBeFalsy()</code>', 'whether the value is truthy or falsy in a boolean context', '<code>expect(isValidUsername(&quot;jacky&quot;)).toBeTruthy()</code>'],
    ['<code>toHaveLength(n)</code>', 'the <code>.length</code> of an array or string', '<code>expect([1,2,3]).toHaveLength(3)</code>'],
    ['<code>toContain(x)</code>', 'an array contains an item, or a string contains a substring', '<code>expect(modules).toContain(&quot;IS216&quot;)</code>'],
    ['<code>toThrow(msg)</code>', 'a function throws. Wrap the call in an arrow function', '<code>expect(() =&gt; divide(10,0)).toThrow(&quot;Division by zero&quot;)</code>'],
    ['<code>toBeGreaterThan(n)</code>', 'a number is greater than n', '<code>expect(square(5)).toBeGreaterThan(20)</code>'],
    ['<code>toMatch(regex)</code>', 'a string matches a pattern', '<code>expect(email).toMatch(/@example\\.com$/)</code>'],
    ['<code>toHaveProperty(key)</code>', 'an object has that property', '<code>expect(user).toHaveProperty(&quot;age&quot;)</code>'],
    ['<code>.not</code>', 'flips any matcher', '<code>expect(add(2,2)).not.toBe(5)</code>'],
  ]) +
  `<h3>toBe vs toEqual</h3>` +
  code(`function makeStudent(name, id) { return { name: name, id: id, courses: [] } }

// FAILS: two different objects are never === equal
// expect(makeStudent('Alice', 101)).toBe({ name: 'Alice', id: 101, courses: [] })

// PASSES: toEqual compares the contents recursively
expect(makeStudent('Alice', 101)).toEqual({ name: 'Alice', id: 101, courses: [] })`) +
  co('tip', '<strong>Rule of thumb:</strong> primitives use <code>toBe()</code>; objects and arrays use <code>toEqual()</code>. <code>toBe()</code> is one cheap value comparison; <code>toEqual()</code> runs a recursive deep-equality check, which is wasted effort on a simple number or string.') +
  co('mistake', `JavaScript's falsy values are <code>false</code>, <code>0</code>, <code>''</code>, <code>null</code>, <code>undefined</code> and <code>NaN</code>. <code>toBeTruthy()</code> passes for <code>1</code>, <code>'yes'</code> and even <code>[]</code>. The matcher examples ${src('Wk10a slides, MoreFunctions.spec.js')} are in the ${link('sx12', 'code archive')}.`));

add('w10i', 'Unit testing with Vitest', 'Choosing good test cases', 'Cover categories of input, then edges',
  `<p>Three tests for <code>add</code> cover three <strong>categories of input</strong> ${src('Wk10a slides')}: positive + positive, negative + positive, negative + negative. That is good input coverage, but the suite can be better with <strong>edge cases</strong>:</p>` +
  code(`expect(add(0, 0)).toBe(0)             // both zero
expect(add(0, 5)).toBe(5)             // zero and positive
expect(add(5, 0)).toBe(5)             // positive and zero
expect(add(1000000, 1)).toBe(1000001) // large numbers`) +
  ul(['Group inputs into categories (typical, boundary, invalid) and test at least one of each.', 'Boundaries matter most: for a grade rule “A from 80”, test 79 and 80 (the StudentGrade slides list 80, 79, 70, 69, 60, 59 as untested boundaries).', 'Invalid input (negative numbers, <code>undefined</code>, strings) is another category that is often forgotten.']));

add('w10h', 'Component & integration testing', 'Component tests in Vue', 'Mount one component in isolation',
  `<p>In a Vue app a component is a “unit”, so a <strong>component test</strong> is unit testing, usually done by the developer who wrote the component ${src('Wk10b slides')}. You <code>mount</code> the component with <strong>Vue Test Utils</strong>, pass props, interact with it and assert on what it renders.</p>` +
  code(`import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StudentGrade from '../StudentGrade.vue'

describe('StudentGrade', () => {
  it('displays grade A when score is 85', () => {
    const wrapper = mount(StudentGrade, { props: { score: 85 } })   // props sent straight in
    expect(wrapper.text()).toContain('Grade: A')                    // rendered text
  })
  it('uses red text for failing grades', () => {
    const wrapper = mount(StudentGrade, { props: { score: 45 } })
    expect(wrapper.attributes('style')).toContain('red')            // computed colour
  })
})`) +
  `<h3>Worked example: StudentGrade</h3>` +
  `<p>The component receives <code>score</code> as a prop, computes the letter grade (A from 80, B from 70, C from 60, otherwise F) and shows it in green for A, B, C and red for F. The test sends the score directly; <code>StudentProfile</code> is never used.</p>` +
  tbl(['Test', 'Input', 'Expected', 'Purpose'], [
    ['(1) grade A', '85', 'Grade: A', 'A range'],
    ['(2) grade B', '75', 'Grade: B', 'B range'],
    ['(3) grade C', '65', 'Grade: C', 'C range'],
    ['(4) grade F', '45', 'Grade: F', 'failing grade'],
    ['(5) green for passing', '85', 'style contains green', 'computed colour'],
    ['(6) red for failing (you write it)', '45', 'style contains red', 'computed colour'],
  ]) +
  `<p>It tests two things: the <strong>business logic</strong> (the computed property turns a score into a grade) and the <strong>presentation</strong> (the HTML shows the grade and the colour). Not tested here but worth adding: boundary values and invalid input.</p>` +
  `<h4>Useful Vue Test Utils calls</h4>` +
  tbl(['Call', 'Use'], [
    ['<code>mount(Component, { props })</code>', 'render the real component with props'],
    ['<code>wrapper.text()</code>', 'all visible text'],
    ['<code>wrapper.attributes(&quot;style&quot;)</code>', 'an attribute value, such as the inline style'],
    ['<code>wrapper.findAll(&quot;button&quot;)</code>', 'find elements (then <code>[i]</code> to pick one)'],
    ['<code>await el.trigger(&quot;click&quot;)</code>', 'simulate a user event; <code>await</code> it so the DOM updates before you assert'],
    ['<code>wrapper.emitted(&quot;event-name&quot;)</code>', 'events the component emitted, as an array of argument arrays'],
  ]) +
  co('tip', `Code: ${link('sx13', 'Ex2 Student components')} and ${link('sx14', 'Ex2a CourseReview and RatingSelector')} in the code archive.`));

add('w10j', 'Component & integration testing', 'Stubs: testing a parent without its children', 'Replace children with lightweight fakes',
  `<p>When the component under test contains child components, a <strong>stub</strong> replaces a child with a lightweight “fake” so only the parent’s own job is tested ${src('Wk10b slides (optional)')}. <code>StudentProfile</code> only <em>passes props</em> to <code>StudentName</code> and <code>StudentGrade</code>, so the test checks exactly that.</p>` +
  code(`it('passes the correct name to StudentName', () => {
  const wrapper = mount(StudentProfile, {
    props: { name: 'Alice', score: 85 },
    global: {
      stubs: {
        StudentName: {                              // custom stub: echoes the prop it receives
          props: ['name'],
          template: '<div>Name: {{ name }}</div>'
        },
        StudentGrade: true                          // automatic stub: an empty placeholder
      }
    }
  })
  expect(wrapper.text()).toContain('Name: Alice')
})`) +
  tbl(['Kind of stub', 'Syntax', 'Use when'], [
    ['<strong>Custom stub</strong>', 'an object with <code>props</code> and a <code>template</code>', 'you need to see the props the child received'],
    ['<strong>Automatic stub</strong>', '<code>ChildName: true</code>', 'you do not need the child at all in this test'],
  ]) +
  `<p>StudentProfile has five tests: four check that name and score reach the right child (including a different name and a different score), and the fifth stubs both children and checks that both render with the right props at the same time.</p>`);

add('w10k', 'Component & integration testing', 'What to test: fragile vs robust tests', 'Test behaviour, not implementation',
  `<p>A component test should check the component’s <strong>behaviour and contract</strong>, not everything ${src('Wk10b slides')}. Ask: <em>“If this feature breaks, would a user or another developer care?”</em></p>` +
  tbl(['Usually worth testing', 'Usually not worth testing'], [
    ['props: does it render correctly when props change?', 'every HTML tag'],
    ['conditional rendering and different states', 'every CSS class'],
    ['user interactions: clicks, typing, selections', 'the exact HTML structure'],
    ['emitted events', 'framework functionality (Vue already tests itself)'],
    ['computed values and important business logic', ''],
    ['important links and buttons: correct URLs and actions', ''],
  ]) +
  `<h3>Fragile vs robust</h3>` +
  tbl(['', 'Fragile test', 'Robust test'], [
    ['Fails when', 'harmless refactoring happens, even though the software still works', 'only when the observable behaviour changes unexpectedly'],
    ['Depends on', 'implementation details (a function name, a button ID)', 'what the user sees and can do'],
    ['Effect', 'needs frequent updates; discourages refactoring', 'survives internal refactoring'],
  ]) +
  `<p>Example: a login test that asserts <code>authenticateUser</code> was called breaks the moment a developer removes that function, even if login still works. It also breaks when the button’s ID is renamed. A robust test instead checks the outcome: <em>can the user log in?</em></p>` +
  co('tip', 'Rule of thumb: <strong>“Test behaviour, not implementation.”</strong>'));

add('w10l', 'Component & integration testing', 'Integration tests', 'Mount the real components together',
  `<p>When two or more components interacting with each other are tested together, it is an <strong>integration test</strong> ${src('Wk10b slides')}. Unlike the component tests there are <strong>no stubs</strong>: the real <code>StudentProfile</code>, <code>StudentName</code> and <code>StudentGrade</code> are mounted and exercised as a group.</p>` +
  code(`it('displays grade A for score 85', () => {
  const wrapper = mount(StudentProfile, { props: { name: 'Alice', score: 85 } })
  expect(wrapper.text()).toContain('Alice')        // StudentName received and showed the name
  expect(wrapper.text()).toContain('Grade: A')     // StudentGrade computed and showed the grade
})`) +
  tbl(['Test', 'Input', 'Expected'], [
    ['(1) grade A', 'Alice, 85', 'Alice and Grade: A'],
    ['(2) grade B', 'Bob, 75', 'Bob and Grade: B'],
    ['(3) grade C', 'Charlie, 65', 'Charlie and Grade: C'],
    ['(4) grade F (you write it)', 'David, 45', 'David and Grade: F'],
  ]) +
  `<p>These tests verify props are passed correctly, the name is displayed and the grade is computed. They deliberately <strong>do not check the text colour</strong>: that is already covered by StudentGrade’s own component tests, so the integration test focuses on collaboration, not CSS details.</p>` +
  tbl(['', 'Component test', 'Integration test'], [
    ['Scope', 'one component, children stubbed', 'several real components together'],
    ['Question', 'does this component do its own job?', 'do these components work correctly together?'],
    ['Failure points to', 'a bug inside that component', 'a bug in how components communicate'],
  ]));

add('w10n', 'Component & integration testing', 'Testing emitted events (Ex2a: CourseReview and RatingSelector)', 'The child emits, the parent listens',
  `<p>Exercise 2a (homework) uses a different communication path ${src('Wk10b slides')}: the child <strong>emits a custom event</strong> and the parent listens, instead of the parent passing props down.</p>` +
  tbl(['Component', 'Responsibilities'], [
    ['<strong>CourseReview</strong> (parent)', 'keeps <code>rating</code> in state; receives <code>rating-selected</code> from the child; <code>updateRating()</code> updates it; shows “Your rating: n” and feedback (“Thank you for your positive feedback!” for 4 or above, otherwise “We will work to improve the course.”)'],
    ['<strong>RatingSelector</strong> (child)', 'five buttons (1-5); keeps its own selected rating; <code>selectRating()</code> emits <code>rating-selected</code>; shows “Excellent!” (4-5), “Good” (2-3) or “Poor” (1)'],
  ]) +
  `<h3>Component test: RatingSelector</h3>` +
  code(`const wrapper = mount(RatingSelector)
expect(wrapper.findAll('button')).toHaveLength(5)               // five buttons

await wrapper.findAll('button')[0].trigger('click')             // click rating 1
expect(wrapper.text()).toContain('Poor')

await wrapper.findAll('button')[3].trigger('click')             // click rating 4
expect(wrapper.emitted('rating-selected')).toBeTruthy()         // the event was emitted...
expect(wrapper.emitted('rating-selected')[0]).toEqual([4])      // ...with payload 4 (an array of args)`) +
  `<h3>Component test: CourseReview with a stub child</h3>` +
  code(`const RatingSelectorStub = { template: '<div></div>', emits: ['rating-selected'] }

it('displays the initial rating of 0', () => {
  expect(mount(CourseReview).text()).toContain('Your rating: 0')
})
it('updates when the child emits rating-selected', async () => {
  const wrapper = mount(CourseReview, { global: { stubs: { RatingSelector: RatingSelectorStub } } })
  wrapper.findComponent(RatingSelectorStub).vm.$emit('rating-selected', 5)   // the "child" emits
  await wrapper.vm.$nextTick()                                               // let the DOM update
  expect(wrapper.text()).toContain('Your rating: 5')
  expect(wrapper.text()).toContain('Thank you for your positive feedback!')
})`) +
  `<p>The last test is a contract test: it talks to the parent the way the real child would (by emitting), rather than reaching inside and calling its methods. Tests 2 and 3 in the archive call <code>wrapper.vm.updateRating()</code> directly, which depends on the implementation and is more fragile.</p>` +
  `<h3>Integration test</h3>` +
  `<p>Mount <code>CourseReview</code> without stubs and click the real buttons: click 5 gives “Your rating: 5” and the positive message; click 4 the same; clicks on 3, 2 and 1 give the improvement message. It verifies the whole chain: <strong>user click → child emits event → parent updates state → DOM shows the result</strong>.</p>` +
  co('tip', `Full files: ${link('sx14', 'Ex2a in the code archive')}.`));

add('w10m', 'E2E testing with Playwright', 'End-to-end testing and the tool landscape', 'The whole app from the user’s view',
  `<p><strong>End-to-end (E2E) testing</strong> verifies that the entire application works from the user’s perspective by testing complete workflows across the frontend, backend, database and APIs, in a production-like environment ${src('Wk10c slides')}. It tests complete user workflows, simulates real user interactions and runs against the app as a whole.</p>` +
  tbl(['Tool', 'Primary use', 'Browsers', 'Automatic waiting', 'Languages', 'Best for'], [
    ['<strong>Playwright</strong>', 'E2E testing', 'Chrome, Edge, Firefox, Safari', 'Yes', 'JS, TypeScript, Python, Java, .NET', 'modern web apps'],
    ['Puppeteer', 'browser automation', 'mainly Chrome/Edge', 'No', 'JS, TypeScript', 'scraping, PDFs, screenshots'],
    ['Cypress', 'E2E testing', 'Chrome, Edge, Firefox', 'Yes', 'JS, TypeScript', 'frontend E2E, beginners'],
    ['Selenium', 'E2E testing', 'almost all browsers', 'No', 'Java, Python, C#, JS and more', 'enterprise and legacy apps'],
  ]) +
  `<p><strong>Automatic waiting</strong> (Playwright and Cypress) means the tool waits for an element or page update to be ready before acting or asserting. This makes tests more reliable and removes arbitrary delays. Without it, a test can fail because it acted too early even though the app works.</p>` +
  co('tip', 'Only <strong>Playwright</strong> is covered in this course. Playwright is an open-source framework from Microsoft that drives Chromium (Edge, Chrome), Firefox and WebKit (Safari).'));

add('w10o', 'E2E testing with Playwright', 'Playwright workflow: install, record, run', 'Ex3: a login page',
  `<p>A Playwright test follows five steps: <strong>launch a browser, navigate to the app, interact with the page, verify the results, close the browser</strong> ${src('Wk10c slides')}.</p>` +
  `<h3>Set up</h3>` +
  ol(['Install: <code>pnpm create playwright</code>. Choose JavaScript, put tests in <code>tests</code>, no GitHub Actions workflow, install the browsers. You get <code>tests/example.spec.js</code>.', 'Check it works: <code>pnpm playwright test</code> (6 tests pass: 2 tests × 3 browsers). Report: <code>pnpm exec playwright show-report</code>, then open the URL it prints (port 9323).', 'Install the <strong>Playwright Test for VS Code</strong> extension (Microsoft). A Testing (lab-flask) icon appears; Test Explorer lists your tests and a play button runs them.', 'Host the page under test, e.g. <code>pnpm dlx http-server</code> in the folder with <code>index.html</code>, then open <code>http://127.0.0.1:8080</code>. (<code>dlx</code> runs a package temporarily without installing it.)']) +
  `<h3>Record, then edit</h3>` +
  ol(['In Test Explorer click <strong>Record new</strong>. A browser opens; a <code>test-1.spec.ts</code> file is generated as you act.', 'Enter the URL, type <code>admin</code> / <code>1234</code>, click Login, click “Welcome Admin!”, then close the browser.', 'Clean up the recording: remove unneeded statements and replace the last <em>click</em> with an <strong>assertion</strong>.', 'Rename the test (<code>test</code> is the default name) to something descriptive, e.g. “should successfully log in with valid credentials”.']) +
  code(`await expect(page.getByText('Welcome Admin!')).toBeVisible()`) +
  `<p>Record a second test for a failed login (an invalid account such as Admin/abcd) and assert the text <strong>“Login Failed”</strong>. Run all tests with the play button on the <code>tests</code> folder. To see a failure, deliberately break one assertion and read the error, or use the <strong>Debug</strong> icon to set breakpoints and step through. Do not write failing tests on purpose in real work.</p>`);

add('w10p', 'E2E testing with Playwright', 'Reading a recorded test', 'Locators, await, and the three stages',
  code(`import { test, expect } from '@playwright/test';

test('should successfully log in with valid credentials', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');                                   // (1) setup
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');         // (2) actions
  await page.locator('#password').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Welcome Admin!')).toBeVisible();                // (3) assert
});`) +
  tbl(['Piece', 'Meaning'], [
    ['<code>test(name, fn)</code>', 'defines a test case (the same idea as <code>it()</code>)'],
    ['<code>async</code> / <code>await</code>', 'the function is asynchronous; <code>await</code> pauses until that step finishes. Without it Playwright could look for the Username box before the page has loaded'],
    ['<code>page</code>', 'the browser page controlled by Playwright'],
    ['<code>page.goto(url)</code>', 'navigate to a URL'],
    ['<code>page.getByRole(&quot;button&quot;, { name: &quot;Login&quot; })</code>', 'locate by <strong>role</strong> and accessible name, then act (<code>.click()</code>, <code>.fill()</code>, <code>.press()</code>)'],
    ['<code>page.getByText(...)</code> / <code>page.locator(&quot;#id&quot;)</code>', 'locate by visible text or CSS selector'],
    ['<code>expect(locator).toBeVisible()</code>', 'the assertion: <em>“I expect this text to be visible on the page”</em>'],
  ]) +
  `<p>Most tests have three stages: <strong>(1) setup</strong> (go to the page), <strong>(2) actions</strong> (enter credentials and log in), <strong>(3) assert</strong> (verify the result).</p>` +
  co('mistake', 'A recorded test ends with a <em>click</em> on the result text. A click is not a check: change it to <code>expect(...).toBeVisible()</code>, otherwise the test passes even when the wrong message appears. (The archive’s third test logs in with a wrong user name but asserts “Welcome Admin!”. The app correctly shows “Login Failed”, so that test <strong>fails</strong>: it exists to show you what a failing test report looks like.)'));

add('w10q', 'E2E testing with Playwright', 'Ex3a: E2E test for a Vue app', 'Fill a form, check the grade',
  `<p>Host the Vue app from Exercise 2 and replace <code>Ex2.vue</code> with the version that shows a <strong>form</strong> for name and score ${src('Wk10c slides')}. The workflow to test: enter a name and a score, click Submit, then see the name and the correct letter grade.</p>` +
  code(`await page.goto('http://localhost:5173/Ex2');
await page.getByRole('textbox', { name: 'Name:' }).fill('George');
await page.getByRole('spinbutton', { name: 'Score:' }).fill('49');     // number input = spinbutton role
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page.getByText('George')).toBeVisible();
await expect(page.getByText('Grade: F')).toBeVisible();`) +
  `<p>The model solution repeats this for four students (49 gives F, 59 gives F, 60 gives C, 80 gives A), so the boundaries 59/60 and 80 are covered. Number inputs are found with the <code>spinbutton</code> role.</p>` +
  tbl(['', 'Vitest', 'Playwright'], [
    ['Asks', 'does this piece of code work?', 'can the user complete a task?'],
    ['Runs in', 'a simulated DOM (jsdom)', 'a real browser against the running app'],
    ['Needs a server', 'no', 'yes (the app must be running)'],
    ['Level', 'unit, component, integration', 'end-to-end'],
  ]) +
  co('tip', `Complete test files: ${link('sx15', 'Ex3 and Ex3a code')}.`));

// =====================================================================================
// WEEK 11: COMPOSABLES, PINIA, ROUTING
// =====================================================================================
add('w11a', 'Vue composables & Pinia', 'Composables: reusable stateful logic', 'A function built on the Composition API',
  `<p>A <strong>composable</strong> is a function that uses Vue’s Composition API to encapsulate and reuse <strong>stateful</strong> logic ${src('Wk11 slides')}. Think of it as a self-contained module of reactive state (<code>ref</code>, <code>reactive</code>), computed properties and methods.</p>` +
  `<p><strong>Key characteristic:</strong> a plain utility function only does stateless calculations (e.g. formatting a date). A composable manages <em>reactive data over time</em>. The name starts with <code>use</code>.</p>` +
  code(rd('w11/wk11example_x/example/src/composables/useCounter.js')) +
  code(`<script setup>
import { useCounter } from '../composables/useCounter'
const { count, doubleCount, increment, decrement, reset } = useCounter(10)   // destructure state and methods
</script>`) +
  co('mistake', '<strong>Composables do NOT share state.</strong> Every call to <code>useCounter()</code> creates its own new <code>count</code>, so two components each calling it have separate counters. To share one piece of state across components, use a <strong>store</strong> (Pinia).') +
  `<p>Full files in the ${link('sx16', 'code archive')}.</p>`);

add('w11b', 'Vue composables & Pinia', 'Why state management: prop drilling', 'Shared data needs one source of truth',
  `<p><strong>State</strong> is data that affects what the UI displays: the logged-in user and token, cart items and quantities, a products list from an API, loading and error flags ${src('Wk11 slides')}. Key idea: <em>state changes → the UI updates automatically</em>. Every component already manages its own state with <code>ref</code>.</p>` +
  `<h3>The problem: prop drilling</h3>` +
  `<p>In a single-page app many components need the same data. If the cart lives only in a parent component, you must pass it through props and events across many layers:</p>` +
  ul(['the <strong>Navbar</strong> needs the cart count', 'the <strong>Product card</strong> needs “add to cart”', 'the <strong>Cart page</strong> needs totals and actions']) +
  `<p>That is messy, hard to refactor and hard to share across routes (pages). This is <strong>prop drilling</strong>. A <strong>store</strong> solves it by being a central <strong>source of truth</strong> that any component can read and update.</p>` +
  `<h3>What belongs in a store</h3>` +
  tbl(['Put in a store', 'Keep in the component'], [
    ['data used in many places (user shown in the navbar)', 'local data such as whether an element on one page is visible'],
    ['data kept across pages (a long multi-step form)', ''],
    ['a products list reused by the list page and the detail page', ''],
  ]) +
  co('tip', 'Not every app needs global state. If yours does, Pinia makes it simple. If only a parent and child share data, props and emits are enough (see ' + link('n60', 'Components: props, slots, emits') + ').'));

add('w11c', 'Vue composables & Pinia', 'Pinia: state, getters and actions', 'The official Vue 3 store',
  `<p><strong>Pinia</strong> is the official store library for Vue 3 ${src('Wk11 slides')}. A store has three concepts, which mirror a component:</p>` +
  tbl(['Pinia', 'Meaning', 'Component equivalent', 'Setup-store form'], [
    ['<strong>state</strong>', 'shared reactive data', '<code>data</code>', '<code>ref(...)</code>'],
    ['<strong>getters</strong>', 'derived values', '<code>computed</code>', '<code>computed(...)</code>'],
    ['<strong>actions</strong>', 'methods (sync or async) that update state', '<code>methods</code>', 'plain <code>function</code>s'],
  ]) +
  `<h3>Install and register</h3>` +
  code(`pnpm add pinia        # only if the project does not already list pinia in package.json`) +
  code(rd('w11/wk11example_x/example/src/main.js').replace(/^\/\/ import '.\/assets\/main.css'\n/, '')) +
  `<h3>Define a store</h3>` +
  `<p>Use <code>defineStore(id, setupFunction)</code>. The first argument is a <strong>unique id</strong> across the app. Name the result <code>use…Store</code> by convention.</p>` +
  code(rd('w11/wk11example_x/example/src/stores/products.js')) +
  co('mistake', '<strong>Return everything</strong> you want to expose (<code>return { products, loading, error, fetchProducts }</code>). A state, getter or action left out of the returned object is not available outside the store and the app may break.') +
  co('tip', 'A store is created only when <code>useXxxStore()</code> is first called inside a component’s <code>&lt;script setup&gt;</code> (or another store).'));

add('w11d', 'Vue composables & Pinia', 'Using a store in components', 'State, getters and actions',
  code(`<script setup>
import { onMounted } from "vue"
import { useProductsStore } from "@/stores/products"     // @ = the src folder (Vite alias)
import ProductCard from "../components/ProductCard.vue"

const productsStore = useProductsStore()
onMounted(() => {
  if (productsStore.products.length === 0) productsStore.fetchProducts()   // action: only fetch once
})
</script>

<template>
  <ProductCard v-for="p in productsStore.products" :key="p.id" :product="p" />   <!-- state in the template -->
</template>`) +
  tbl(['Part', 'How to use it', 'Example'], [
    ['<strong>State</strong>', 'read and write it directly on the store instance, in script or template, and bind it with <code>v-model</code>/<code>v-bind</code>', '<code>cart.items</code>, <code>&lt;input v-model=&quot;store.count&quot;&gt;</code>, <code>store.count++</code>'],
    ['<strong>Getters</strong>', 'used like a <code>computed</code>: no parentheses', '<code>cart.totalPrice.toFixed(2)</code>'],
    ['<strong>Actions</strong>', 'called like methods, from script or a template event', '<code>store.randomizeCounter()</code>, <code>@click=&quot;cart.addToCart(product)&quot;</code>'],
  ]) +
  `<h3>Getters and actions in the cart store</h3>` +
  code(`const items = ref([])                                          // state
const itemCount  = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))             // getter
const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))   // getter
const isEmpty    = computed(() => items.value.length === 0)                                    // getter

function removeFromCart(productId) {                           // action
  items.value = items.value.filter((i) => i.productId !== productId)
}`) +
  `<p>Actions hold business logic, for example “give a discount when the order is over $50”. Stores are <strong>reactive</strong> like <code>ref()</code>: when the cart store changes, every component reading it (navbar badge, cart page) updates.</p>` +
  co('gap', 'Inside a setup store, state is <code>ref</code> so you write <code>items.value</code>; outside the store you read <code>store.items</code> with no <code>.value</code> (Pinia unwraps it).'));

add('w11e', 'Vue composables & Pinia', 'MiniShop: the running example', 'Products, cart and login across pages',
  `<p>The Week 11 running example is <strong>MiniShop</strong>, an e-commerce-style app where several pages need the same shared state ${src('Wk11 slides')}. Users can browse products, add to cart, change quantities, see the cart count in the navbar on every page and “log in” to check out.</p>` +
  tbl(['Part', 'Name', 'Role'], [
    ['Views (routes)', '<code>ProductsView</code> (<code>/products</code>)', 'lists products, “Add to cart” buttons'],
    ['', '<code>CartView</code> (<code>/cart</code>)', 'items, quantities, total, Checkout'],
    ['', '<code>LoginView</code> (<code>/login</code>)', 'fake login to demonstrate the auth store and route guards'],
    ['Components', '<code>NavBar</code>', 'cart count and login status'],
    ['', '<code>ProductCard</code>', 'a product and an add button'],
    ['', '<code>CartItemRow</code>', 'quantity controls per item'],
    ['Stores', '<code>useProductsStore</code>', 'state <code>products</code>, <code>loading</code>, <code>error</code>; action <code>fetchProducts()</code> (async call to the Express API)'],
    ['', '<code>useCartStore</code>', 'state <code>items</code> (<code>{productId, title, price, qty}</code>); getters <code>itemCount</code>, <code>totalPrice</code>, <code>isEmpty</code>; actions <code>addToCart</code>, <code>removeFromCart</code>, <code>increaseQty</code>, <code>decreaseQty</code>, <code>clearCart</code>'],
    ['', '<code>useAuthStore</code>', 'state <code>user</code> (null or <code>{name, token}</code>), <code>loading</code>, <code>error</code>; getter <code>isLoggedIn</code>; actions <code>login(username, password)</code>, <code>logout()</code>'],
  ]) +
  `<h3>Data flow</h3>` +
  ol(['User clicks “Add to cart” → calls <code>cartStore.addToCart(product)</code>.', 'The store updates <code>items[]</code>.', 'The navbar reads <code>cartStore.itemCount</code>.', 'The cart page reads <code>cartStore.items</code> and <code>cartStore.totalPrice</code>.']) +
  `<h3>Run it</h3>` +
  tbl(['Part', 'Commands'], [
    ['Frontend (MiniShop)', '<code>cd example</code>, <code>pnpm install</code>, <code>pnpm dev</code>'],
    ['Backend (Node + Express mock API, from <code>server.zip</code>)', '<code>cd server/products</code>, <code>pnpm install</code>, <code>pnpm dev</code>. Serves <code>GET /products</code>, <code>POST /login</code> (accepts any username/password), <code>POST /checkout</code>'],
  ]) +
  `<p>Product data is queried from the backend, so start both. The API also has <code>POST /orders</code> and <code>GET /orders</code> for Exercise 4, protected by <code>Authorization: Bearer fake-token-123</code>. The final demo: <code>/</code> redirects to <code>/products</code>; adding items updates “Cart (3)” in the navbar; clicking Cart while logged out redirects to <code>/login</code> because of the navigation guard. Code: ${link('sx17', 'server')}, ${link('sx18', 'stores')}, ${link('sx20', 'views and components')}.</p>`);

add('w11f', 'Vue composables & Pinia', 'Persisting store state with localStorage', 'Survive a page refresh (Ex1 and Ex3)',
  `<p>A store lives in memory, so a refresh resets it. To keep the cart and the login, save to <code>localStorage</code> ${src('Wk11 slides, Exercises 1 and 3')}. See ${link('n63', 'Saving data in the browser')}.</p>` +
  tbl(['Exercise', 'Do this'], [
    ['<strong>Ex1 Part A</strong>', 'on store creation, initialise <code>items</code> from localStorage (an empty array if nothing is stored)'],
    ['<strong>Ex1 Part B</strong>', 'save to localStorage every time the cart changes (add, remove, increase, decrease, clear)'],
    ['<strong>Ex3 Part A</strong>', 'save <code>{ token, username }</code> when login succeeds; restore both when the store is created, so <code>isLoggedIn</code> becomes true automatically'],
    ['<strong>Ex3 Part B</strong>', '<code>logout()</code> also removes the localStorage key'],
    ['<strong>Ex3 Part C</strong>', 'in <code>LoginView</code>, if already logged in, redirect to <code>/products</code> straight away'],
  ]) +
  code(`const STORAGE_KEY = "minishop_cart"

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []        // never trust stored data
  } catch { return [] }                               // corrupted JSON must not crash the app
}
function saveCart(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) }

const items = ref(loadCart())                         // initial state comes from storage`) +
  co('mistake', 'localStorage stores <strong>strings</strong>: use <code>JSON.stringify</code> to save and <code>JSON.parse</code> to read, and wrap the parse in <code>try/catch</code>. Do not store passwords. The token is stored here only because this is a fake teaching login.'));

add('w11g', 'Vue routing & guards', 'Route parameters and useRoute', 'One component, many URLs',
  `<p>Revisiting routing from Week 4 ${src('Wk11 slides')}: <code>App.vue</code> contains <code>&lt;RouterView /&gt;</code>, which shows the component mapped by <code>router/index.js</code>. Use <code>&lt;RouterLink to=&quot;/products&quot;&gt;</code> to link. See ${link('n61', 'Vue Router')}.</p>` +
  `<p>A <strong>route parameter</strong> is a changing part of the path:</p>` +
  code(`{ path: "/products/:id", component: ProductDetailView }

// visiting /products/1 launches ProductDetailView with id = 1
import { useRoute } from 'vue-router'
const route = useRoute()                    // 1. initialise the route hook
const productId = route.params.id           // 2. read the parameter`) +
  co('mistake', 'Route params are <strong>always strings</strong>. <code>route.params.id</code> is <code>&quot;1&quot;</code>, not <code>1</code>, so compare with <code>Number(route.params.id)</code> (as the solution does with <code>find((p) =&gt; p.id === productId.value)</code>), otherwise <code>1 === &quot;1&quot;</code> is false and the product is “not found”.'));

add('w11h', 'Vue routing & guards', 'Redirects and programmatic navigation', 'Declared in the route table, or in code',
  tbl(['Way', 'Code', 'Use'], [
    ['<strong>Redirect</strong> in the route table', '<code>{ path: &quot;/&quot;, redirect: &quot;/products&quot; }</code>', 'visiting <code>/</code> goes to <code>/products</code>: a default landing page, or a login page after registration'],
    ['<strong>Programmatic</strong> navigation', '<code>router.push(&quot;/products&quot;)</code>', 'navigate from code, e.g. after logout or login'],
  ]) +
  code(`import { useRouter } from "vue-router"
const router = useRouter()

function logout() {
  auth.logout()
  router.push("/products")        // after logout, go back to /products
}`) +
  `<p><code>router.push(url)</code> changes the browser address and loads the component mapped to that route ${src('Wk11 slides')}. <code>useRoute()</code> (read the current route) and <code>useRouter()</code> (navigate) are different hooks: <strong>route = where I am; router = go somewhere</strong>.</p>`);

add('w11i', 'Vue routing & guards', 'Navigation guards', 'Control who can open which route',
  `<p>A <strong>navigation guard</strong> is code that runs before or during navigation and decides whether a route should <strong>proceed, be blocked, or redirect</strong> to a different route ${src('Wk11 slides')}. In a single-page app it is the main tool for rules such as “only logged-in users can open <code>/cart</code>”, “only admins can open <code>/admin</code>” or “confirm before leaving a form with unsaved changes”.</p>` +
  code(`// router/index.js
{ path: "/cart", component: CartView, meta: { requiresAuth: true } }     // custom metadata on the route

router.beforeEach((to) => {                    // runs before EVERY navigation
  if (!to.meta.requiresAuth) return true       // public route: allow
  const auth = useAuthStore()
  if (auth.isLoggedIn) return true             // logged in: allow
  return { path: "/login", query: { redirect: to.fullPath } }   // else: redirect to login, remembering the target
})`) +
  tbl(['<code>to</code> property', 'Contains', 'Example'], [
    ['<code>to.path</code>', 'the destination path', '<code>/cart</code>'],
    ['<code>to.params</code>', 'route parameters', 'the <code>:id</code> value'],
    ['<code>to.fullPath</code>', 'path plus query string', '<code>/cart?sort=asc</code>'],
    ['<code>to.meta</code>', 'custom metadata from the route definition', '<code>{ requiresAuth: true }</code>'],
  ]) +
  tbl(['Guard', 'Runs', 'Typical use'], [
    ['<code>router.beforeEach()</code>', 'before every navigation (most used)', 'authentication, permissions'],
    ['<code>router.afterEach()</code>', 'after navigation', 'analytics, logging'],
  ]) +
  `<h3>Best practices</h3>` +
  ul(['Use <strong>meta flags</strong> (<code>requiresAuth</code>, <code>role</code>) so one guard protects many routes.', 'Keep the guard small and delegate to a store (<code>auth.isLoggedIn</code>, <code>auth.hasRole(...)</code>).', 'Use the <strong>redirect-back-after-login</strong> pattern: send the user to <code>/login?redirect=/cart</code>; after login, <code>router.push(route.query.redirect || &quot;/products&quot;)</code>.']) +
  co('mistake', '<strong>Guards are not real security.</strong> They run in the browser, which the client (possibly malicious) fully controls, so they only improve navigation control and user experience. Your Express API must still verify tokens, credentials and permissions on the server.') +
  `<p>Guards improve security (client-side UI control), user experience (redirect to login, prevent data loss) and correctness (required data exists before a page renders).</p>`);

add('w11j', 'Vue routing & guards', 'Week 11 exercises and model solutions', 'Detail page, persistence, orders',
  `<p>Extend MiniShop with four features ${src('Wk11 slides, Exercises 1 to 4')}. They practise shared state across routes, route params, using one store in several views, authentication state and authorization.</p>` +
  tbl(['Exercise', 'Goal', 'What to change'], [
    ['<strong>1</strong> Cart persistence', 'the cart survives a refresh', '<code>stores/cart.js</code>: load initial items from localStorage, save on every change'],
    ['<strong>2</strong> Product detail', '<code>/products/:id</code> shows one product', 'new <code>ProductDetailView.vue</code> (title, price, description, Add to cart; “Product not found” with a link back to <code>/products</code>); fetch products on mount if empty; add the route; make the title in <code>ProductCard.vue</code> a <code>RouterLink</code>'],
    ['<strong>3</strong> Login persistence', 'stay logged in after a refresh', '<code>stores/auth.js</code> save/restore/clear; <code>LoginView</code> redirects if already logged in'],
    ['<strong>4</strong> Orders', 'checkout creates an order; past orders at the protected <code>/orders</code>', '(A) <code>CartView.checkout()</code> posts to <code>/orders</code>; (B) new <code>stores/orders.js</code> with <code>fetchOrders()</code> sending <code>Authorization: Bearer ${token}</code>; (C) new <code>OrdersView.vue</code>; (D) <code>/orders</code> route with <code>meta.requiresAuth</code>; (E) an Orders link in <code>NavBar</code>'],
  ]) +
  `<p>All the model solutions are in the ${link('sx21', 'code archive')}. An optional extension adds roles and an admin route: ${link('w11l', 'role-based authorisation')}.</p>` +
  co('gap', '(added context) In the archive’s <code>orders.js</code> the action starts with <code>this.loading = true</code>. That style belongs to Options-API stores. In a <strong>setup store</strong> use the refs directly: <code>loading.value = true</code>. The rest of the action (<code>loading.value = false</code> in <code>finally</code>) already does this, so rewrite the first two lines to match.') +
  `<p>The solution <code>auth.js</code> also adds <code>role</code> and an <code>isAdmin</code> getter (<code>user.value?.role === &quot;admin&quot;</code>) for an optional role-based Exercise 5, and a <code>clearError()</code> action.</p>`);

add('w11k', 'Vue routing & guards', 'Week 11 recap', 'Take-away messages',
  ul(['<strong>State management</strong> solves shared-data problems in single-page apps: when several components or pages need the same data (cart count, user session, product list), a store avoids prop drilling.', '<strong>Pinia</strong> structures app-level logic: <em>state</em> for shared reactive data, <em>getters</em> for derived values (total price), <em>actions</em> for business logic and async API calls.', '<strong>Stores and routing work together</strong>: views fetch data in <code>onMounted()</code>, reuse cached store data across routes, and the UI updates everywhere when store state changes.', '<strong>Route guards</strong> use store state: put <code>meta</code> flags such as <code>requiresAuth</code> on routes, check them in <code>router.beforeEach()</code>, and use the redirect-back-after-login pattern.', '<strong>Good UX</strong> handles loading and error states, persists key state (cart, auth) with localStorage when needed, and remembers that guards are for UX only: the backend must still enforce authentication and authorisation.']) +
  tbl(['Need', 'Use'], [
    ['reuse stateful logic, separate state per use', 'a composable (<code>useXxx()</code>)'],
    ['share one state across components and pages', 'a Pinia store'],
    ['parent to child, one level', 'props (and emits back up)'],
    ['show a different component per URL', 'Vue Router'],
    ['block or redirect a route', 'a navigation guard with <code>meta</code>'],
  ]));


add('w10r', 'E2E testing with Playwright', 'Playwright in VS Code: Test Explorer, run, debug', 'The extension workflow',
  `<p>The <strong>Playwright Test for VS Code</strong> extension (published by Microsoft) lets you run, record and debug tests without typing commands ${src('Wk10c slides, Ex3 setup')}.</p>` +
  ol(['Open <strong>Extensions</strong> (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>), search for “Playwright Test for VS Code” and install it. Restart VS Code if needed.', 'A <strong>Testing</strong> icon (a laboratory flask) appears on the Activity Bar. It opens <strong>Test Explorer</strong>. If it says “No tests have been found in this workspace yet”, open the folder where you installed Playwright.', 'Expand <code>tests</code> to see <code>example.spec.js</code>. Right-click it and choose <strong>Go To Test</strong> to open the source.', 'Click the <strong>play</strong> icon beside a file, a single test or the <code>tests</code> folder to run it. Results appear in the <strong>Test Results</strong> tab of the Panel (View → Appearance → Panel if it is hidden).', 'Use the <strong>Debug</strong> icon instead of play to set breakpoints, step over a failure and inspect variables.', 'Use <strong>Record new</strong> to open a browser (with a pink page background) and generate a spec file as you click.']) +
  tbl(['Task', 'Where'], [
    ['run all tests', 'play icon on the <code>tests</code> folder, or <code>pnpm playwright test</code>'],
    ['run one test or file', 'play icon beside it'],
    ['see why a test failed', 'Test Results tab, or the HTML report (<code>pnpm exec playwright show-report</code>)'],
    ['step through a failing test', 'Debug icon'],
  ]) +
  co('tip', `The tests themselves are explained in ${link('w10p', 'Reading a recorded test')}.`));

add('w11l', 'Vue routing & guards', 'Role-based authorisation: an admin-only route', 'Authentication vs authorisation',
  `<p><strong>Authentication</strong> asks “who are you?” (logged in or not). <strong>Authorisation</strong> asks “what may you do?” (your role). The extended Week 11 exercise guide adds a role to the login and an <code>/admin</code> route that only an admin may open ${src('Wk11 exercise guide (temp.js), Exercise 4')}.</p>` +
  ol(['<strong>Backend</strong>: the login response includes a role, e.g. <code>username === &quot;admin&quot; ? &quot;admin&quot; : &quot;user&quot;</code>.', '<strong>Store</strong>: keep <code>user.role</code> and add a getter <code>isAdmin = computed(() =&gt; user.value?.role === &quot;admin&quot;)</code>. Persist the role with the rest of the login.', '<strong>Route</strong>: add <code>meta: { requiresAuth: true, requiresRole: &quot;admin&quot; }</code> to <code>/admin</code>.', '<strong>Guard</strong>: first check login, then check the role.']) +
  code(`router.beforeEach((to) => {
  const auth = useAuthStore()

  // 1) authentication
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: "/login", query: { redirect: to.fullPath } }
  }

  // 2) authorisation (role)
  if (to.meta.requiresRole && auth.user?.role !== to.meta.requiresRole) {
    return { path: "/products" }          // wrong role: send them somewhere safe
  }
  return true
})`) +
  `<p>Test flow: log in as <code>student</code>, who can open <code>/cart</code> but not <code>/admin</code>; log in as <code>admin</code>, who can open <code>/admin</code> too. The archive version shows an <code>alert(&quot;Access denied: admin only&quot;)</code>; a toast component is nicer in a real app.</p>` +
  co('mistake', 'This is <strong>UI control only</strong>. Hiding <code>/admin</code> in the browser does not protect admin data: the Express API must check the token and the role on every admin request. See ' + link('w11i', 'Navigation guards') + '.') +
  `<p>Files: ${link('sx22', 'extended exercise guide in the code archive')}.</p>`);

// =====================================================================================
// CODE ARCHIVE
// =====================================================================================
const w10 = 'w10/wk10_resource_x/resource';
const e2 = `${w10}/Ex2 (component and integration testing)/setup`;
const e2a = `${w10}/Ex2a (extension)/setup`;
const sol = 'w10/wk10_solution_x/solution';
const note = (s) => `<p>${s}</p>`;

add('sx12', 'Code · Week 10 Testing', 'Ex1: unit tests for functions (Vitest)', 'SimpleFunction and MoreFunctions',
  note('Week 10 Exercise 1. Put the three files in one folder, run <code>pnpm add -D vitest</code>, then <code>pnpm vitest SimpleFunction.spec.js</code>. Theory: ' + link('w10e', 'anatomy of a unit test') + ' and ' + link('w10g', 'matchers') + '.') +
  file('function under test', 'Ex1/SimpleFunction.js', code(rd(`${w10}/Ex1 (unit testing functions)/resource/SimpleFunction.js`))) +
  file('first spec: add', 'Ex1/SimpleFunction.spec.js', code(rd(`${w10}/Ex1 (unit testing functions)/resource/SimpleFunction.spec.js`))) +
  file('more matchers: toEqual, toContain, toThrow and more', 'Ex1/MoreFunctions.spec.js', code(rd(`${w10}/Ex1 (unit testing functions)/resource/MoreFunctions.spec.js`))));

add('sx13', 'Code · Week 10 Testing', 'Ex2: Student components, component and integration tests', 'StudentName, StudentGrade, StudentProfile',
  note('Week 10 Exercise 2 (a Vue app with three components). Run one spec with <code>pnpm exec vitest run src/components/__tests__/StudentGrade.spec.js</code>. The specs below are the model solutions (the setup files leave the 6th StudentGrade test and the 4th integration test for you). Theory: ' + link('w10h', 'component tests') + ', ' + link('w10j', 'stubs') + ', ' + link('w10l', 'integration tests') + '.') +
  file('child: shows the name', 'src/components/StudentName.vue', code(rd(`${e2}/components/StudentName.vue`))) +
  file('child: computes and colours the grade', 'src/components/StudentGrade.vue', code(rd(`${e2}/components/StudentGrade.vue`))) +
  file('parent: passes props to both children', 'src/components/StudentProfile.vue', code(rd(`${e2}/components/StudentProfile.vue`))) +
  file('page using the parent', 'src/components/Ex2.vue', code(rd(`${e2}/components/Ex2.vue`))) +
  file('Vitest configuration (jsdom, skip e2e)', 'vitest.config.js', code(rd(`${w10}/Ex2 (component and integration testing)/Ex2/vitest.config.js`))) +
  file('component test: StudentGrade (model solution)', 'src/components/__tests__/StudentGrade.spec.js', code(rd(`${sol}/Ex2/StudentGrade.spec.js`))) +
  file('component test with stubs: StudentProfile', 'src/components/__tests__/StudentProfile.spec.js', code(rd(`${e2}/components/__tests__/StudentProfile.spec.js`))) +
  file('integration test (model solution)', 'src/components/__tests__/IntegrationTest.spec.js', code(rd(`${sol}/Ex2/IntegrationTest.spec.js`))));

add('sx14', 'Code · Week 10 Testing', 'Ex2a: CourseReview and RatingSelector (events)', 'Child emits, parent listens',
  note('Week 10 Exercise 2a (homework extension). The child emits <code>rating-selected</code>. Specs are the model solutions. Theory: ' + link('w10n', 'testing emitted events') + '.') +
  file('parent component', 'src/components/CourseReview.vue', code(rd(`${e2a}/components/CourseReview.vue`))) +
  file('child component', 'src/components/RatingSelector.vue', code(rd(`${e2a}/components/RatingSelector.vue`))) +
  file('component test: RatingSelector', 'src/components/__tests__/RatingSelector.spec.js', code(rd(`${sol}/Ex2a/RatingSelector.spec.js`))) +
  file('component test with a stub: CourseReview', 'src/components/__tests__/CourseReview.spec.js', code(rd(`${sol}/Ex2a/CourseReview.spec.js`))) +
  file('integration test: both components', 'src/components/__tests__/IntegrationTest.spec.js', code(rd(`${sol}/Ex2a/IntegrationTest.spec.js`))));

add('sx15', 'Code · Week 10 Testing', 'Ex3 and Ex3a: Playwright end-to-end tests', 'Login page and the student form',
  note('Week 10 Exercises 3 and 3a. Host the page (e.g. <code>pnpm dlx http-server</code>), then record or run the tests with the Playwright VS Code extension. Theory: ' + link('w10o', 'Playwright workflow') + ' and ' + link('w10p', 'reading a recorded test') + '.') +
  file('the page under test (Ex3)', 'Ex3/index.html', code(rd(`${w10}/Ex3 (e2e Testing)/index.html`))) +
  file('test 1: successful login', 'tests/test-1.spec.ts', code(rd(`${sol}/Ex3/test-1.spec.ts`))) +
  file('test 2: failed login', 'tests/test-2.spec.ts', code(rd(`${sol}/Ex3/test-2.spec.ts`))) +
  file('test 3: a wrong login that wrongly shows the welcome message (should fail)', 'tests/test-3.spec.ts', code(rd(`${sol}/Ex3/test-3.spec.ts`))) +
  file('Ex3a: Ex2.vue with a name and score form', 'src/components/Ex2.vue', code(rd(`${w10}/Ex3a (extension)/Ex2.vue`))) +
  file('Ex3a: E2E test of the form', 'tests/test-4.spec.ts', code(rd(`${sol}/Ex3a/test-4.spec.ts`))));

const E = 'w11/wk11example_x/example';
const S = 'w11/wk11solution_x/solution';
add('sx16', 'Code · Week 11 Pinia & routing', 'Composable: useCounter and CounterWidget', 'Stateful logic you can reuse',
  note('Week 11 slides 3 to 5. Each component that calls <code>useCounter()</code> gets its own separate state. Theory: ' + link('w11a', 'composables') + '.') +
  file('the composable', 'src/composables/useCounter.js', code(rd(`${E}/src/composables/useCounter.js`))) +
  file('a component using it', 'src/components/CounterWiget.vue', code(rd(`${E}/src/components/CounterWiget.vue`))));

add('sx17', 'Code · Week 11 Pinia & routing', 'MiniShop backend: Express mock API', 'products, login, checkout, orders',
  note('From <code>wk11server.zip</code>. Run with <code>cd server/products</code>, <code>pnpm install</code>, <code>pnpm dev</code> (nodemon on port 8000). The token for protected routes is <code>fake-token-123</code>.') +
  file('server', 'server/products/server.js', code(rd('w11/wk11server_x/server/products/server.js'))) +
  file('package.json', 'server/products/package.json', code(rd('w11/wk11server_x/server/products/package.json'))));

add('sx18', 'Code · Week 11 Pinia & routing', 'MiniShop stores (starting point)', 'products, cart and auth',
  note('The Pinia stores as given in the example app (before the exercises). Theory: ' + link('w11c', 'Pinia state, getters and actions') + '.') +
  file('products store: async fetch with loading and error', 'src/stores/products.js', code(rd(`${E}/src/stores/products.js`))) +
  file('cart store: state, getters, actions', 'src/stores/cart.js', code(rd(`${E}/src/stores/cart.js`))) +
  file('auth store: login, logout, isLoggedIn', 'src/stores/auth.js', code(rd(`${E}/src/stores/auth.js`))));

add('sx19', 'Code · Week 11 Pinia & routing', 'MiniShop app shell: main, App, router and NavBar', 'Register Pinia, route table, guard',
  note('Theory: ' + link('w11i', 'navigation guards') + ' and ' + link('w11h', 'redirects and router.push') + '.') +
  file('register Pinia and the router', 'src/main.js', code(rd(`${E}/src/main.js`).replace(/^\/\/ import '.\/assets\/main.css'\n/, ''))) +
  file('root component with the navbar and RouterView', 'src/App.vue', code(rd(`${E}/src/App.vue`))) +
  file('routes, redirect and beforeEach guard', 'src/router/index.js', code(rd(`${E}/src/router/index.js`))) +
  file('navbar: cart count, login status, logout with router.push', 'src/components/NavBar.vue', code(rd(`${E}/src/components/NavBar.vue`))));

add('sx20', 'Code · Week 11 Pinia & routing', 'MiniShop views and components (starting point)', 'Products, cart, login',
  note('The views and components as given in the example app. Theory: ' + link('w11d', 'using a store in components') + '.') +
  file('products page: fetch on mount, loading and error states', 'src/views/ProductsView.vue', code(rd(`${E}/src/views/ProductsView.vue`))) +
  file('a product card with Add to cart', 'src/components/ProductCard.vue', code(rd(`${E}/src/components/ProductCard.vue`))) +
  file('cart page with checkout (Bearer token)', 'src/views/CartView.vue', code(rd(`${E}/src/views/CartView.vue`))) +
  file('one row in the cart', 'src/components/CartItemRow.vue', code(rd(`${E}/src/components/CartItemRow.vue`))) +
  file('login page: redirect back after login', 'src/views/LoginView.vue', code(rd(`${E}/src/views/LoginView.vue`))));

add('sx21', 'Code · Week 11 Pinia & routing', 'MiniShop exercise solutions (Ex1 to Ex4)', 'Persistence, detail page, orders',
  note('Model solutions from <code>wk11solution.zip</code>. Theory: ' + link('w11f', 'persisting store state') + ' and ' + link('w11j', 'the exercises') + '.') +
  file('Ex1: cart store with localStorage', 'src/stores/cart.js', code(rd(`${S}/src/stores/cart.js`))) +
  file('Ex3: auth store with localStorage and role', 'src/stores/auth.js', code(rd(`${S}/src/stores/auth.js`))) +
  file('Ex4: orders store', 'src/stores/orders.js', code(rd(`${S}/src/stores/orders.js`))) +
  file('Ex2 and Ex4: routes /products/:id and /orders (protected)', 'src/router/index.js', code(rd(`${S}/src/router/index.js`))) +
  file('Ex2: product detail page', 'src/views/ProductDetailView.vue', code(rd(`${S}/src/views/ProductDetailView.vue`))) +
  file('Ex2: product card with a RouterLink title', 'src/components/ProductCard.vue', code(rd(`${S}/src/components/ProductCard.vue`))) +
  file('Ex3: login page redirects when already logged in', 'src/views/LoginView.vue', code(rd(`${S}/src/views/LoginView.vue`))) +
  file('Ex4: checkout posts to /orders', 'src/views/CartView.vue', code(rd(`${S}/src/views/CartView.vue`))) +
  file('Ex4: orders page', 'src/views/OrdersView.vue', code(rd(`${S}/src/views/OrdersView.vue`))) +
  file('Ex4: navbar with an Orders link', 'src/components/NavBar.vue', code(rd(`${S}/src/components/NavBar.vue`))));


add('sx22', 'Code · Week 11 Pinia & routing', 'Extended exercise guide: role-based admin route', 'From the course notes file temp.js',
  note('The Week 11 archive also holds a longer markdown guide (<code>src/stores/temp.js</code>, not real JavaScript) with five exercises: cart persistence, product details, auth persistence, <strong>role-based authorisation with an admin route</strong>, and order history. Exercises 1, 2, 3 and 5 match the model solutions in S8 (the slides number the orders exercise 4). The extra material is the admin route below. Theory: ' + link('w11l', 'role-based authorisation') + '.') +
  file('backend: login returns a role', 'server/products/server.js (replace /login)', code(`app.post("/login", (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: "username required" });

  const role = username === "admin" ? "admin" : "user";
  res.json({ token: "fake-token-123", username, role });
});`)) +
  file('admin page', 'src/views/AdminView.vue', code(`<script setup>
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
</script>

<template>
  <div style="padding:16px;">
    <h2>Admin Dashboard</h2>
    <p><strong>User:</strong> {{ auth.user?.username }}</p>
    <p><strong>Role:</strong> {{ auth.user?.role }}</p>
    <p>This page is only accessible to users with role <code>admin</code>.</p>
  </div>
</template>`)) +
  file('routes with requiresRole and a two-step guard', 'src/router/index.js', code(`import { createRouter, createWebHistory } from "vue-router";

import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
import LoginView from "../views/LoginView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import AdminView from "../views/AdminView.vue";

import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/products" },
    { path: "/products", component: ProductsView },
    { path: "/products/:id", component: ProductDetailView },
    { path: "/login", component: LoginView },

    { path: "/cart", component: CartView, meta: { requiresAuth: true } },

    { path: "/admin", component: AdminView, meta: { requiresAuth: true, requiresRole: "admin" } }
  ]
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  // 1) Auth check
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: "/login", query: { redirect: to.fullPath } };
  }

  // 2) Role check
  if (to.meta.requiresRole) {
    const required = to.meta.requiresRole; // "admin"
    const userRole = auth.user?.role;

    if (userRole !== required) {
      // optionally show an alert; better practice is use a toast component
      alert("Access denied: admin only");
      return { path: "/products" };
    }
  }

  return true;
});

export default router;`)) +
  note('Test flow from the guide: run the backend (<code>node server.js</code>) and the frontend (<code>npm run dev</code>); open <code>/products</code> and add items; <code>/cart</code> redirects to login when logged out; log in as <code>student</code> to reach the cart but not <code>/admin</code>; log in as <code>admin</code> to reach <code>/admin</code>; checkout creates an order and <code>/orders</code> lists it.') +
  file('a small extra store from the archive', 'src/stores/counter.js', code(rd(`${S}/src/stores/counter.js`))));

W.THEORY.push(...T);

// Appendix A used to say that the course had no Pinia material; now there is.
for (const t of W.THEORY) if (/^Appendix A/.test(t.title)) {
  t.html = t.html.replace(/<div class="callout gap">\s*<p>Your Week 6 slides do not cover Pinia syntax\.[\s\S]*?<\/p>\s*<\/div>/, `<div class="callout gap"><p>The <strong>Week 11</strong> slides now cover Pinia properly (stores, state, getters, actions, the MiniShop example and navigation guards). Start with ${link('w11c', 'Pinia: state, getters and actions')} and ${link('w11i', 'Navigation guards')}. The short examples below are kept as a quick reminder of the same ideas.</p></div>`);
}


// Code index intro: mention the two new weekly sections
for (const t of W.THEORY) if (t.group === 'Code · Index' && !t.html.includes('S7 (Week 10')) {
  t.html = t.html.replace('<p>The sections S2 to S6 add the complete source files from the course archive (<code>syllabus_code.zip</code>).', '<p>The sections S2 to S6 add the complete source files from the course archive (<code>syllabus_code.zip</code>). S7 (Week 10 testing) and S8 (Week 11 Pinia and routing) add the files from the Week 10 and Week 11 downloads (exercises, examples and model solutions).');
}

fs.writeFileSync(J, JSON.stringify(W));
console.log('added', T.length, 'topics');
