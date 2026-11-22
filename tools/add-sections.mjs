// One-off: adds scenario-style multi-select questions (modelled on the IS211 exam review) to the IDP data as `secq`,
// grouped as the exam sections: A (empathy -> evaluating design), B (models -> interface/visual design, UI tools, Gestalt), C (methods, experiments, analysis).
import fs from 'node:fs';
const f = 'src/courses/idp/data.json';
const D = JSON.parse(fs.readFileSync(f, 'utf8'));

const Q = (ch, q, o, a, e, w) => ({ q, o, a, e, w, ch });

const A = [
  Q(2, 'Theatre staff add numbered tape labels to switches on the panel that controls the stage lights. The handbook does not explain the labels. Which activities would help you understand why staff use them?',
    ['Observe staff using the panel and note how they use the labels.', 'Use only the handbook to explain why staff added the labels.', 'Ask a staff member to demonstrate how they use the labels.', 'Collect a 1–5 satisfaction rating, without any follow-up questions.', 'After observing, ask: “How does this label help you with this task?”'],
    'ACE', 'Empathy research needs real behaviour plus the user’s own explanation. The handbook does not explain the labels, and a bare rating cannot tell you why.',
    ['True: observation shows what people actually do with the labels.', 'False: the handbook does not explain the labels, so it cannot tell you why staff added them.', 'True: a demonstration shows the real use in context.', 'False: a rating without follow-up questions says nothing about why the labels are used.', 'True: a neutral follow-up question after observing links the behaviour to the user’s reason.']),
  Q(2, 'During an interview about how a team finds a table at the cafeteria, which questions are neutral and open?',
    ['“Can you walk me through how you looked for a table?”', '“Why were you so slow?”', '“How does that sign help you with this task?”', '“Don’t you think the new layout is confusing?”', '“What did you expect to happen when you pressed that button?”'],
    'ACE', 'Neutral, open questions explore what users did and why without suggesting a cause or a judgement.',
    ['True: it is open and asks for the user’s own account.', 'False: “why were you so slow?” blames the user and suggests a cause.', 'True: it asks about the user’s reason without leading.', 'False: it is a leading question that suggests the answer.', 'True: it asks about expectations without suggesting a cause.']),
  Q(3, 'Students share project-task screenshots in Telegram. You observe a student using an older screenshot and starting a task a teammate has already completed. Members say: “Before we start, we need to know which tasks are still unfinished.” Which statements are correct?',
    ['Sharing screenshots is an observed behaviour.', 'The user goal is to share screenshots.', 'A user need is to know which tasks are still unfinished before starting work.', 'The users need a new app.', 'A breakdown is that an old screenshot leads a student to start an already-completed task.'],
    'ACE', 'Behaviour is what people do, a need is the information or support required, a goal is the desired outcome, and a breakdown is where the process obstructs the goal.',
    ['True: it is what people actually do.', 'False: sharing a screenshot is an action. The goal is to complete a needed task without duplicating completed work.', 'True: it is the information the members said they need.', 'False: this jumps to one solution before stating the need.', 'True: the old copy obstructs the goal of finishing needed work.']),
  Q(3, 'A community repair hub lends tool kits. Visitors photograph kit lists, find that some listed kits are unavailable, and ask volunteers to confirm pickup details. Which are well-formed requirements for a service to find, reserve and collect a kit?',
    ['Functional: support checking current kit availability.', 'Data: store kit IDs, availability, reservation status and collection details.', 'Make the service feel modern.', 'Functional: support reserving a kit and receiving confirmation.', 'Use a blue colour scheme.'],
    'ABD', 'Functional requirements describe what the service must support. Data requirements identify the information it must hold. Each should be traceable to the research.',
    ['True: it addresses the unreliable lists visitors currently photograph.', 'True: it names the information the service must keep current.', 'False: “modern” is vague and not tied to any research finding.', 'True: it helps visitors secure a kit and verify pickup details.', 'False: a colour choice is a design decision, not a requirement supported by the research.']),
  Q(4, 'For the repair hub, a team proposes (1) a kit catalogue that starts from the equipment and (2) a repair-task guide that starts from the intended job and suggests suitable kits. Which claims are defensible?',
    ['These are two different concepts, not variations of one layout.', 'Pick the first idea to save time.', 'Each idea should be linked to a specific observation or interview finding.', '“Add notifications” is specific enough as an idea.', 'Compare the alternatives against the needs and requirements before committing to one.'],
    'ACE', 'Ideation produces several genuinely different concepts, links each to research, and compares them before choosing.',
    ['True: they start from different things (equipment versus job).', 'False: alternatives should be compared before committing.', 'True: this keeps each idea grounded in the research.', 'False: it does not say who receives which update, or why.', 'True: comparing alternatives against needs is the point of ideating.']),
  Q(5, 'The repair-hub team tests both the finding flow and the reserving flow with paper screens. Which statements are true?',
    ['A low-fidelity paper prototype lets you compare interaction approaches cheaply before committing to one.', 'A paper prototype must look polished to give valid feedback.', 'The team should state what participants do and what is being tested.', 'Keeping kit and pickup details visible and showing a clear confirmation lets users verify the result.', 'A paper prototype cannot be used to test navigation.'],
    'ACD', 'A low-fidelity prototype is fast and cheap, and it is useful only if you state the task and what is tested.',
    ['True: low-fidelity prototypes are quick to change and cheap to discard.', 'False: polish is not needed for early feedback on flows.', 'True: without a task and a question, “use paper prototypes” says nothing about what is tested.', 'True: visible details and confirmation support the verifiable-result rationale.', 'False: screens on paper can be swapped by hand to test navigation.']),
  Q(13, 'The repair-hub team plans three evaluations: an inspection of labels, navigation and feedback against usability principles; a laboratory study where representative borrowers find and reserve a kit; and a randomised web A/B test of the two implemented versions. Which statements are correct?',
    ['The inspection gives likely problems to address early, but does not prove users can succeed.', 'The laboratory study shows actual task success, time and observed confusion.', 'The A/B test gives evidence of the effect on reservation completion.', 'All three answer the same question, so one is enough.', 'The inspection shows how users behave in the real world.'],
    'ABC', 'The methods answer different questions, so each contribution has to be explained. Combining them (triangulation) covers each one’s blind spot.',
    ['True: experts find likely problems cheaply, but they are not real users.', 'True: users are observed doing real tasks in a controlled setting.', 'True: a randomised comparison of versions measures the effect on reservations.', 'False: each method answers a different question.', 'False: inspection is done by experts, not by users in real use.']),
];

const B = [
  Q(6, 'After renewing an equipment loan, the portal returns to the home page with no confirmation. To check the loan, the borrower must remember an equipment code from the previous screen. Which statements are justified?',
    ['This is a gulf of evaluation: the borrower cannot perceive, interpret and evaluate the outcome.', 'This is a gulf of execution.', 'Showing “Loan renewed until 27 November” beside the equipment name gives concrete feedback.', 'Showing the equipment name, code and due date together supports recognition rather than recall.', 'Naming the three evaluation stages without applying them is a complete answer.'],
    'ACD', 'The borrower has already acted, so the problem is in evaluating the result. Concrete feedback and visible information fix it.',
    ['True: nothing tells the borrower whether the renewal succeeded, failed or is still processing.', 'False: the borrower has already performed the action, so execution is not the problem.', 'True: it states what happened and gives a due date the borrower can verify.', 'True: the information is visible instead of having to be remembered from an earlier screen.', 'False: the stages must be applied by saying what the borrower cannot do at each one.']),
  Q(6, 'A shopping app lets customers return parcels at a locker. Experts inspect a prototype. Later, a user says “I know I can change the locker, but where?” and opens three menus. Which statements are justified?',
    ['An inspection proves users can complete returns successfully.', 'The incident suggests a gulf of execution.', 'Record the task context, actions and comment as a critical incident.', 'Show the correct path immediately whenever a user hesitates.', 'A visible “Change locker” action is a plausible improvement to test.'],
    'BCE', 'The user knows the goal but cannot find the action, which is a gulf of execution. Record the incident and test a visible control.',
    ['False: an inspection finds likely problems, not proof that users succeed.', 'True: the goal is clear, but the way to carry it out is not visible.', 'True: a critical incident keeps the context, actions and comment together.', 'False: stepping in each time hides what the user would really do.', 'True: it addresses the obstacle, and it should be tested rather than assumed.']),
  Q(7, 'A booking form makes people remember a reference code from an earlier screen and type a 16-digit number in one block. Which changes reduce working-memory load?',
    ['Show the reference code on the current screen.', 'Keep requiring the code from the earlier screen.', 'Split the long number into chunks.', 'Rely on a training manual instead of the interface.', 'Show a progress indicator or breadcrumb trail.'],
    'ACE', 'Working memory holds only a few chunks, so interfaces should show needed information, chunk long strings and show where the user is.',
    ['True: recognising a visible code is easier than recalling it.', 'False: it makes users hold the code in working memory.', 'True: chunking groups digits into fewer items.', 'False: a manual does not reduce the load while using the interface.', 'True: it shows where the user is, so they need not remember it.']),
  Q(8, 'A designer is deciding where to place a frequently used button. Which statements about Fitts’s Law are true?',
    ['Larger targets are faster to hit.', 'Moving a frequently used control farther away speeds it up.', 'Screen edges and corners are effectively very large targets for a mouse.', 'Pointing time depends on distance only.', 'Pointing time grows with distance and shrinks with target size.'],
    'ACE', 'Fitts’s Law says that the time to acquire a target depends on both its distance and its size.',
    ['True: a larger target is acquired faster.', 'False: a longer distance increases the pointing time.', 'True: the cursor stops at the edge, so edge targets are easy to hit.', 'False: target size matters as well as distance.', 'True: this is the distance and size relationship in Fitts’s Law.']),
  Q(9, 'A tool tip appears only when the cursor hovers over a control. The team plans to ship the same screen on phones. Which claims are defensible?',
    ['Touch has no hover, so hover-only tooltips cannot be opened.', 'Larger touch targets reduce fat-finger errors.', 'Mobile attention is fragmented by interruptions, so prioritise content.', 'A finger is more precise than a mouse pointer.', 'Hover-only menus are fine on mobile.'],
    'ABC', 'A finger cannot hover, covers the target and is imprecise, and mobile use is interrupted.',
    ['True: a finger cannot hover.', 'True: larger targets cut errors caused by finger occlusion and imprecision.', 'True: mobile use is short and interrupted, so prioritise content.', 'False: a finger is less precise than a mouse pointer.', 'False: those menus cannot be opened on a touchscreen.']),
  Q(10, 'Visitors cannot find application deadlines. The page has vague labels, equally prominent headings and status shown only by colour. Select all defensible changes.',
    ['Rename “More” to “Application deadlines” if that is its destination.', 'Use heading sizes to distinguish sections from body text.', 'Group related information using proximity and consistent styles.', 'Use text or symbols alongside colour to communicate status.', 'Increase saturation so colour alone communicates status.'],
    'ABCD', 'Specific labels, a clear hierarchy, grouping and redundant cues all help. Colour alone excludes users who cannot distinguish the colours.',
    ['True: a specific label tells people where the link goes.', 'True: size shows hierarchy.', 'True: grouping and consistent styles show what belongs together.', 'True: text or symbols mean status does not depend on colour alone.', 'False: stronger colour alone is still colour alone.']),
  Q(11, 'Which design choices use Gestalt principles correctly?',
    ['Put related fields inside one card or bordered box (common region).', 'Squeeze unrelated fields close together to save room (proximity).', 'Style all links in one colour (similarity).', 'Align items in a row or column so they read as a sequence (continuity).', 'A progress ring with a small gap will be read as incomplete and broken (closure).'],
    'ACD', 'Proximity groups things that sit close together, and closure makes us complete small gaps.',
    ['True: a shared boundary makes its contents read as one group.', 'False: elements that sit close together are read as related, so this groups unrelated fields.', 'True: things that look alike are seen as related.', 'True: elements along a line or smooth curve read as a sequence.', 'False: closure means we fill in small gaps and see a whole shape.']),
  Q(11, 'Which statements about the Gestalt principles are correct?',
    ['Closure: we fill in small gaps to see a complete shape.', 'Figure/ground: we separate a stable figure from the background, as an iOS blur does.', '“Enclosure” and “common region” are two different principles.', 'Proximity: closer elements are grouped and separated from those that are farther away.', 'Similarity groups items only if they are enclosed in a box.'],
    'ABD', 'Enclosure is the older name for common region, and similarity needs no boundary.',
    ['True: progress rings and loaders rely on this.', 'True: the blur pushes the background back so the foreground reads as the figure.', 'False: they are the same principle under two names.', 'True: this is the proximity principle.', 'False: similarity depends on shared shape, colour or size, not on a box.']),
  Q(11, 'A form has labels far from their inputs, and every button looks the same. Which changes apply Gestalt principles?',
    ['Place each label close to its input (proximity).', 'Style the primary action differently from secondary actions (similarity and contrast).', 'Use many different fonts and colours so every element stands out.', 'Put related fields in one bordered section (common region).', 'Remove all whitespace to reduce scrolling.'],
    'ABD', 'Gestalt grouping needs distance, shared styles and shared regions that match the real relationships.',
    ['True: closeness shows which label belongs to which input.', 'True: like items look alike, and the primary action is made distinct.', 'False: too many styles break the groups instead of showing them.', 'True: a shared boundary groups the fields.', 'False: whitespace helps separate groups.']),
  Q(16, 'A student must choose a UI tool for a demo tomorrow and for a larger product later. Which statements about tool choice are true?',
    ['Threshold is how hard a tool is to learn or start using.', 'Ceiling is the limit on how sophisticated a result the tool can produce.', 'A good prototyping tool has a high threshold and a low ceiling.', 'Ask whether it supports the intended UX, how easily you can iterate and whether it allows user testing.', 'UI tools remove the need for user testing.'],
    'ABD', 'Choose a tool by its threshold, its ceiling and whether it supports the experience, iteration and testing.',
    ['True: a low threshold means it is easy to start.', 'True: a high ceiling means more sophisticated designs are possible.', 'False: that is the worst combination, hard to start and limited in what it can do.', 'True: these are the three questions for choosing a tool.', 'False: tools do not replace user testing.']),
];

const C = [
  Q(12, 'Which claims about heuristic evaluation (an inspection method) are defensible?',
    ['Several evaluators find more problems than one.', 'It can replace user testing.', 'It suggests likely problems but does not prove users can succeed.', 'Pairing double experts (usability and domain) beats single experts.', 'Evaluators have to be real users.'],
    'ACD', 'An inspection is done by experts, so it is used in addition to, not instead of, user testing.',
    ['True: different evaluators find different problems.', 'False: only real users reveal some problems, so inspection cannot replace user testing.', 'True: experts are not real users.', 'True: knowing both usability and the domain finds more.', 'False: inspection involves experts, not users.']),
  Q(14, 'After a laboratory study, the team has notes from observations and comments. Which steps are good qualitative analysis?',
    ['Put each relevant observation or comment on a separate note and keep its task and participant context.', 'Group related notes and label the recurring issue, keeping contradictory cases.', 'Treat a theme as proof of causation.', 'Discard contradictory cases to keep the themes clean.', 'Use a theme to propose a clearer design and retest it.'],
    'ABE', 'Themes guide explanations and design changes. They do not alone prove causation.',
    ['True: context is needed to interpret the note.', 'True: contradictory cases are kept, not hidden.', 'False: themes guide explanations but do not alone prove causation.', 'False: contradictory cases are evidence and should be preserved.', 'True: revise and test again.']),
  Q(15, 'A team runs a laboratory study where representative borrowers find and reserve a kit. Which statements are true?',
    ['Recruit participants who represent the target users.', 'A pilot with people outside the team checks that the prototype and the method work.', 'A laboratory study is more realistic than a field study.', 'A study protocol is the step-by-step procedure for a session.', '“Measure usability” is a sufficient success definition.'],
    'ABD', 'A laboratory study trades realism for control. It needs observable measures, a protocol and a pilot.',
    ['True: results only transfer to users like the participants.', 'True: a pilot finds problems with the setup before the real sessions.', 'False: a field study is more realistic, a laboratory study gives control.', 'True: it fixes the tasks and steps for every participant.', 'False: it needs an observable definition such as correct reservation and time to correct confirmation.']),
  Q(17, 'The repair-hub team runs a randomised web A/B test of a catalogue-first version A and a repair-task-first version B. Which statements describe a sound design?',
    ['Randomly assign eligible visitors and keep each visitor on the same version.', 'Run A in a quiet week and B in a busy week to save time.', 'Run both versions concurrently.', 'Define the outcome (reservation rate) before collecting data.', 'H0: pA ≠ pB.'],
    'ACD', 'H0 is no difference (pA = pB). Time-based differences are a confound, which concurrency and random assignment control.',
    ['True: this limits selection bias and keeps conditions comparable.', 'False: the difference could come from the week, not from the version.', 'True: concurrency limits a time confound.', 'True: deciding the outcome first avoids picking it after seeing the data.', 'False: H0 says the two versions are equal (pA = pB). The difference is H1.']),
  Q(18, 'Twelve editors use layout A, then layout B, to correct the same caption. B is faster. Which claims are justified?',
    ['This is a within-subjects design.', 'B must be better because each person is their own control.', 'Practice or remembering the answer may make B appear faster.', 'Counterbalance the order and use matched tasks.', 'Treat the 24 observations as independent participants.'],
    'ACD', 'Within-subjects designs are exposed to order and carryover effects. The 24 observations come from only 12 people.',
    ['True: every editor uses both layouts.', 'False: being your own control does not remove order effects.', 'True: this is an order or practice effect.', 'True: half do A then B, half B then A, with tasks of equal difficulty.', 'False: the observations are paired, not independent.']),
  Q(18, 'In a between-subjects A/B experiment, which statements about validity are correct?',
    ['Random assignment from the same visitor stream reduces selection bias.', 'If A runs on a well-stocked day and B on a day with few kits, availability could explain a difference.', 'Running both versions concurrently and monitoring the availability shown under each condition is a matching mitigation.', '“Randomise to solve validity” is enough without naming a threat.', 'Evidence from one quiet week proves the result holds at busy events.'],
    'ABC', 'A good answer names a specific threat, explains an alternative cause and states the matching control. Generalisation is a separate question.',
    ['True: visitors have the same chance of either version.', 'True: availability is a competing explanation for any difference.', 'True: it controls the time confound the threat names.', 'False: it has to name the threat and explain the control.', 'False: external validity would need broader contexts or replication.']),
  Q(19, 'A help centre compares search layouts A and B. Forty different visitors use one version each, 20 per version. Search times are strongly skewed, and three B users take unusually long. Which statements are justified?',
    ['Mann–Whitney U fits independent, skewed observations.', 'A paired t-test is appropriate.', 'An independent t-test is appropriate without checking the skew.', 'H0: equal outcome distributions. H1: different distributions.', 'Drop the three slow B users without explanation.'],
    'AD', 'The visitors are different (between-subjects), so a paired test is wrong. Skewed data calls for a non-parametric test, and exclusions must be explained.',
    ['True: it compares two independent groups without assuming normality.', 'False: the visitors are different, so the observations are not paired.', 'False: a t-test assumes roughly normal data, and these times are strongly skewed.', 'True: these are the hypotheses for a Mann–Whitney U test.', 'False: unexplained exclusions are a common error.']),
  Q(19, 'Which test choices fit the design?',
    ['Each participant tries both interfaces and says which they prefer: binomial test.', 'The same users’ task success (yes/no) before and after a change: McNemar’s test.', 'Task success (yes/no) in two independent groups with small samples: Fisher’s exact test.', 'Likert ratings from two groups: independent t-test, treating the ratings as ratio data.', 'The same people in both conditions, interval and normal: independent t-test.'],
    'ABC', 'Pick the test by the variable type and the design: nominal data with paired or independent groups, or ordinal and non-normal data.',
    ['True: a preference between two options is nominal, and each participant provides one choice, tested against 50/50.', 'True: McNemar’s test compares paired yes/no outcomes.', 'True: Fisher’s exact test is for nominal data from independent groups with small samples.', 'False: Likert data is ordinal, so Mann–Whitney U is the independent-groups test.', 'False: the same people in both conditions need a paired t-test.']),
];

const bad = [];
for (const [k, arr] of Object.entries({ A, B, C })) arr.forEach((q, i) => {
  if (q.o.length !== 5 || q.w.length !== 5 || !/^[A-E]+$/.test(q.a)) bad.push(k + i);
  const truth = [...q.a].map((l) => 'ABCDE'.indexOf(l));
  q.w.forEach((w, j) => { if (truth.includes(j) !== w.startsWith('True')) bad.push(k + i + ' w' + j); });
});
if (bad.length) throw new Error('bad: ' + bad.join(', '));

D.secq = { A, B, C };
fs.writeFileSync(f, JSON.stringify(D));
console.log('A', A.length, 'B', B.length, 'C', C.length);
