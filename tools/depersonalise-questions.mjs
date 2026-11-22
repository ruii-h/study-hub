// One-off: exam-style questions should test syllabus concepts, not trivia about named companies, products or people.
// Rewrites the questions that depended on case-study names so that the concept is tested and the answer is derivable from the course ideas.
import fs from 'node:fs';
const f = 'src/courses/idp/data.json';
const D = JSON.parse(fs.readFileSync(f, 'utf8'));

function set(ch, idx, startsWith, q, o, a, e, w) {
  const old = D.hard[ch][idx];
  if (!old || !old.q.startsWith(startsWith)) throw new Error(`index slip ${ch}:${idx} (${old && old.q.slice(0, 40)})`);
  const truth = [...a].map((l) => 'ABCDE'.indexOf(l));
  D.hard[ch][idx] = { q, o, a, e, w: w.map((t, j) => (truth.includes(j) ? 'True: ' : 'False: ') + t) };
}
function swap(ch, idx, from, to) {
  const q = D.hard[ch][idx];
  const j = JSON.stringify(q);
  if (!j.includes(from)) throw new Error(`swap miss ${ch}:${idx} ${from}`);
  D.hard[ch][idx] = JSON.parse(j.split(from).join(to));
}

swap(5, 6, 'A pixel-perfect Figma mock-up with real content.', 'A pixel-perfect mock-up with real content.');
swap(11, 6, 'as an iOS blur does', 'such as blurring the background behind a dialog');

set(16, 3, 'Which of the following statement(s) about platform ecosystems',
  'Which of the following statement(s) about platform ecosystems are true?',
  ['Platform owners publish design guidelines that apps are expected to follow.', 'Different platforms have different conventions and guidelines.', 'Platform rules and store policies shape what apps can do.', 'Beta testing is done the same way on every platform.', 'Following a platform’s guidelines has no effect on how familiar the app feels to its users.'],
  'ABC', 'A platform owner controls its design guidance and store, so the rules differ between platforms and affect what an app can do.',
  ['owners provide guidelines for their platform.', 'conventions are platform-specific.', 'the owner controls the store, so its rules shape which apps and features are possible.', 'each platform has its own tools and services for beta testing.', 'familiar patterns let users reuse mental models they already have.']);

set(17, 7, 'A manager insists on launching',
  'A manager insists on launching a redesign because “I have seen enough of these.” Which statements rebut this decision made by authority?',
  ['Decisions made by the highest-paid person’s opinion (HiPPO) are decisions by authority, not by data.', 'Data should trump intuition.', 'A small change can have a large effect, such as removing an unnecessary form field.', 'Senior opinions are always more accurate than test data.', 'A/B tests cannot measure the effect of small changes.'],
  'ABC', 'Decide with data, not authority. Small changes can be detected and can matter.',
  ['it is authority, not evidence.', 'testing gives evidence rather than opinion.', 'an unnecessary field is friction that every user has to consider, and a test can measure its effect.', 'authority is not evidence.', 'small changes are exactly what A/B tests can detect.']);

set(20, 4, 'Which statements follow Simon Sinek',
  'A pitch could lead with purpose before the product. Which statements about structuring a pitch are correct?',
  ['Communicate the underlying purpose or belief (why) first.', 'Then explain the approach (how).', 'Then present the product itself (what).', 'Lead with product features before the purpose.', 'This is a replacement for stating the problem and the solution, so those can be dropped.'],
  'ABC', 'Leading with purpose is a complementary storytelling lens, not a replacement for the problem and solution structure.',
  ['purpose comes first.', 'the approach follows.', 'the product comes last.', 'that is the opposite order.', 'it complements the problem and solution structure.']);

set(20, 5, 'The Creative Zen and the Apple iPod',
  'Two products are technically comparable, but one wins because its pitch engages the audience emotionally while the other lists only features. Which points does this illustrate?',
  ['A technically comparable product can lose if its story fails to engage.', 'A pitch should speak to emotion as well as logic.', 'Facts and logic still matter.', 'A feature list alone wins audiences.', 'Emotion has no place in a design pitch.'],
  'ABC', 'Speak to both logic and emotion.',
  ['story and emotion can decide the outcome.', 'a purely logic-driven pitch is weaker than one that also engages emotion.', 'facts still matter.', 'a feature-only pitch can lose to one that tells a story.', 'a pitch should engage emotion too.']);

swap(20, 7, 'A story needs few words, as in “For sale: baby shoes, never worn.”', 'A story needs few words, so a short, clear message is better than a long one.');
swap(20, 7, 'Hemingway’s six words show how few words a story needs.', 'a short story can be told in very few words.');
swap(21, 7, 'the Fast Company article is cited.', 'a view that user-led innovation cannot create breakthroughs is cited.');
swap(21, 7, 'It cites the view that user-led innovation cannot create breakthroughs.', 'It cites a view that user-led innovation cannot create breakthroughs.');

set(22, 5, 'Which statements about Figma Make',
  'Which statements about AI prompt-to-app design tools are correct?',
  ['A plain-language prompt can generate both the UI and its logic.', 'Existing design frames can be converted into a functioning coded interface.', 'They can reference published design guidelines to keep generated elements on-brand.', 'They output real frontend code, bridging designers and engineers.', 'They remove the need to review or refine the generated design.'],
  'ABCD', 'AI proposes and humans decide, so the output still has to be reviewed and refined.',
  ['text-to-app tools turn a prompt into UI and logic.', 'design-to-code reads layout, typography and colour from a design.', 'design system integration keeps the output consistent.', 'the output is real code such as React and CSS.', 'human judgement stays essential at every stage.']);

set(22, 6, 'Which statements about Google Stitch',
  'Which statements about AI design tools that turn prompts or sketches into designs are correct?',
  ['They can turn prompts, wireframes or screenshots into editable UIs and code.', 'Portable design rules can be encoded in a file with accessibility checks built in.', 'They let the designer refine by chat, comments, direct edits or sliders.', 'They can export to common formats or hand off to a coding tool.', 'The tools are so different that they cannot be compared.'],
  'ABCD', 'The tools are comparable alternatives aimed at the same prompt or sketch to working design workflow.',
  ['prompt, wireframe or screenshot to editable UI is the core workflow.', 'design rules can be portable and validated for accessibility.', 'refinement happens interactively.', 'export and hand-off are part of the workflow.', 'they are positioned as comparable alternatives.']);

set(23, 3, 'Which examples show how an AI interface can signal uncertainty',
  'Which examples show how an AI interface can signal uncertainty?',
  ['A text-completion feature shows its suggestion in light grey, so it reads as a suggestion and not committed text.', 'A medical tool displays a confidence score with its result.', 'A response gives a likely answer and says that it might be wrong.', 'Presenting every output as certain.', 'Hiding all uncertainty to look reliable.'],
  'ABC', 'Visible uncertainty helps users calibrate trust.',
  ['grey text signals a suggestion.', 'a confidence score shows how sure the system is.', 'it matches the “likely answers” reframing.', 'false certainty misleads users.', 'hidden uncertainty harms trust calibration.']);

set(23, 5, 'Which are examples of learning-based and collaborative AI interaction',
  'Which are examples of learning-based and collaborative AI interaction?',
  ['Like and dislike buttons that shape later recommendations.', 'A learning app that adjusts difficulty to the learner’s performance.', 'A code assistant whose suggestions the developer can accept, modify or reject.', 'A fixed rule set that never changes.', 'A tool that offers no way to reject a suggestion.'],
  'ABC', 'Human-in-the-loop interaction keeps the person in control.',
  ['feedback shapes later recommendations.', 'difficulty adapts to the learner.', 'the person stays in the loop.', 'that is rule-based and fixed.', 'a lack of control breaks user control and freedom.']);

fs.writeFileSync(f, JSON.stringify(D));
console.log('ok');
