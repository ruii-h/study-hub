// Predicted Part 3: 15 multiple-choice questions per set (30 marks on the real paper). Every question may have one or more right options.
import { p, mcq, section } from './lib.mjs';

// o(text, right?, why) -> option
const T = (text, why) => [text, true, why];
const F = (text, why) => [text, false, why];
const Q = (set, n, title, stem, opts, expl) => {
  const L = 'ABCDEFGHIJ';
  const ans = opts.map((x, i) => (x[1] ? L[i] : '')).join('');
  return mcq(`PREDICTED MCQ ${set} · Q${n}`, title, p(stem), opts.map((x) => x[0]), ans, expl, opts.map((x) => x[2]));
};

// ============================================================ SET 1: M1 to M5
const s1 = [
  Q(1, 1, 'Alignment', 'Which statements about business and IT alignment are true?', [
    T('Alignment means the IT strategy supports the business goals and objectives.', 'That is the definition used in the course.'),
    T('Project alignment aligns one specific IT solution and uses the Business Process Engineering methodology.', 'Project alignment is about one solution; enterprise alignment is about the whole organisation.'),
    F('Enterprise alignment is delivered through the Business Process Engineering methodology.', 'Enterprise alignment is delivered through Enterprise Architecture; the BPE methodology is for project alignment.'),
    F('Alignment is achieved once IT has chosen the newest technology.', 'Alignment is about serving business goals, not about how new the technology is.'),
    T('Alignment brings shared accountability between the business and IT.', 'Shared accountability is one of the benefits of alignment.')], 'Enterprise = Enterprise Architecture; project = BPE methodology.'),
  Q(1, 2, 'The four Ps', 'Which pairs of business-language dimension and question are correct?', [
    T('Purpose: Why?', 'Mission, vision and goals give the reason a business exists.'),
    T('Participants: Who?', 'Stakeholders, teams, customers and systems.'),
    T('Process: How?', 'The workflows that connect the participants.'),
    T('Product: What?', 'What is delivered to the customer.'),
    F('Project: Where?', 'There is no fourth P called Project in the business language; the fourth is Product.')], 'Purpose, Participants, Process, Product = Why, Who, How, What.'),
  Q(1, 3, 'Objective or not?', 'Which statement is a **business objective**?', [
    F('Be the leading insurer in the region.', 'A future aspiration: a vision.'),
    T('Cut claims processing time by 40% within 18 months.', 'Concrete, measurable and time-bound: a business objective.'),
    F('Provide reliable insurance to families.', 'What the firm does now and for whom: a mission.'),
    F('Launch a mobile claims app.', 'An action to achieve a goal: a strategy.')], 'Objectives carry numbers and dates.'),
  Q(1, 4, 'BPM cycle', 'Which sequence is the BPM cycle?', [
    T('Discover → Model & Analyse → Design Solution → Implement → Monitor & Optimise', 'Correct order; it then loops back, so the cycle never ends.'),
    F('Model & Analyse → Discover → Implement → Design Solution → Monitor & Optimise', 'You cannot model before discovering, or implement before designing.'),
    F('Discover → Design Solution → Model & Analyse → Implement → Monitor & Optimise', 'Models and analysis come before the solution is designed.'),
    F('Discover → Model & Analyse → Implement → Design Solution → Monitor & Optimise', 'The solution must be designed before it is implemented.')], 'The course chapters run Model → Analyse → Solve → Innovate.'),
  Q(1, 5, 'Internal resources', 'In a firm\'s expense process, which resources are **internal**?', [
    T('Employee', 'A human the firm manages.'),
    T('Financial Officer', 'A human the firm manages.'),
    F('Workday Cloud System (paid subscription)', 'The firm pays for it but does not control or operate it, so it is external.'),
    F('The bank\'s Bank System', 'Run by another organisation: external.'),
    T('The firm\'s own Billing System', 'A technology the firm manages: internal.')], 'Internal means you manage it; paying is not the test.'),
  Q(1, 6, 'Automated activities', 'Which activities are **automated**?', [
    T('The Finance system sends an IDOC to the Accounting system.', 'System to system with no human.'),
    F('The clerk keys the order into the portal.', 'A human using a system is interactive.'),
    T('The portal emails the customer an automatic receipt.', 'Done by the system alone.'),
    F('The courier hands the parcel to the customer.', 'A human with no system is manual.'),
    T('The system calculates tax and posts it to the ledger without anyone clicking.', 'Done by the system alone.')], 'Manual = human only · interactive = human + system · automated = system only.'),
  Q(1, 7, 'Business rules', 'Which statements about business rules are true?', [
    T('They are written in plain English using business vocabulary.', 'Not pseudocode or a formal grammar.'),
    T('They can apply to both manual and automated activities.', 'Either kind of activity can need a documented rule.'),
    T('They follow the pattern IF condition THEN consequence.', 'Often chained with AND / OR, sometimes with ELSE.'),
    F('They are drawn as gateways in the workflow model.', 'Rules constrain an activity; gateways only route the flow with labelled exits.'),
    F('They are written in a formal programming grammar.', 'The course keeps them in natural language.')], 'Rules answer “when?” for an activity.'),
  Q(1, 8, 'Workflow rules', 'Which are correct rules for drawing a workflow model?', [
    T('Each activity is in the lane of the participant who performs it.', 'The lane rule.'),
    T('Every gateway exit is labelled.', 'For example Yes / No, Approved / Rejected.'),
    T('Every path ends at an end event.', 'No dead ends.'),
    F('External systems such as a credit bureau are drawn as lanes.', 'External systems are attached to the activity that uses them with a dotted association.'),
    T('A system is attached to the activity that uses it.', 'Dotted association to the system name.')], 'Systems are annotations on activities.'),
  Q(1, 9, 'Root cause', 'Which of the following are **root causes** (not just issues or causes)?', [
    T('Lack of automation', 'A deeper reason behind several delays.'),
    T('Paper-based process', 'The deeper reason behind retyping and errors.'),
    F('Customers wait a long time.', 'That is the issue (the effect).'),
    F('The officer re-types the form.', 'That is a cause: what in the case produces the issue.'),
    T('Government policy', 'An external rule that the process cannot change by itself.')], 'Issue = effect · cause = what produces it · root cause = deeper reason.'),
  Q(1, 10, 'Issue category', 'Issue: “Customers receive wrong quotes because staff were never trained on the new pricing rules.” Which category fits the root cause?', [
    T('People', 'Lack of training is a people root cause.'),
    F('Process', 'The process steps themselves are not the problem.'),
    F('System', 'Nothing says the system lacks a function.'),
    F('Policy', 'No rule or regulation is blocking anything.')], 'Categories: process, system, people, policy, others.'),
  Q(1, 11, 'Good recommendation', 'Which are well-written recommendations?', [
    T('Auto-send the approval email from the portal.', 'States what and where.'),
    F('Improve communication between teams.', 'Too vague: no what or where.'),
    T('Run the credit check and the fraud check in parallel.', 'Concrete and tied to the process.'),
    F('The process is too slow.', 'That restates the issue, it does not recommend anything.')], 'A recommendation = what + where, one per root cause.'),
  Q(1, 12, 'RCR priority', 'Impact: 5 = very high; complexity: 5 = very easy. Which recommendation should be implemented **first**?', [
    T('Impact 5, complexity 4', 'High impact and easy: do it first.'),
    F('Impact 5, complexity 1', 'High impact but very complex: plan it as a project.'),
    F('Impact 2, complexity 5', 'Easy but low impact.'),
    F('Impact 1, complexity 1', 'Low impact and very complex.')], 'Higher is better on both scales.'),
  Q(1, 13, 'Which model?', 'Which statements match the model to what it captures?', [
    T('Organisation model: roles and reporting lines', 'Who reports to whom.'),
    T('Resource model: humans and technology, internal and external', 'Who or what is used, and who controls it.'),
    T('Workflow model: steps, hand-offs and decisions', 'Swimlanes and flow.'),
    F('Business rules model: the order of the activities', 'Rules constrain an activity; the order is the workflow.')], 'Choose the model first, then draw.'),
  Q(1, 14, 'Process roles', 'Which are **process roles** (they exist only because of the process)?', [
    T('Approver', 'The role exists because the process has an approval step.'),
    T('Data Validator', 'Created by the process.'),
    F('Marketing Manager', 'A functional role: a title on the organisation chart.'),
    F('Financial Officer', 'A functional role on the organisation chart.')], 'Functional role = title on the org chart; process role = exists only in the process.'),
  Q(1, 15, 'Advantage', 'According to the course (Carr), what gives a lasting competitive advantage?', [
    F('IT on its own', 'On its own IT is a commodity every competitor can buy.'),
    T('IT combined with business strategy and processes', 'The combination is what is hard to copy.'),
    F('Having more IT staff than competitors', 'Headcount does not create alignment.'),
    F('Buying the most expensive software', 'Price does not create advantage.')], 'Advantage = IT + strategy + processes.'),
];

// ============================================================ SET 2: M5 to M8
const s2 = [
  Q(2, 1, 'Chance of a step', 'A step runs only on branch A (80% of cases) and then on sub-branch A1 (60% of those). What is its input factor?', [
    F('140%', 'Chances along a path are multiplied, never added.'),
    T('48%', '0.8 × 0.6 = 0.48.'),
    F('20%', 'That is 1 − 0.8, the other branch.'),
    F('80%', 'That ignores the second branch.')], 'Multiply along a branch.'),
  Q(2, 2, 'Required resources', 'The yearly workload is 3,000 hours. One person works 1,500 hours a year and 4 people are available. Which are correct?', [
    T('2 people are required', '3,000 ÷ 1,500 = 2.'),
    T('Utilisation is 50%', '2 needed ÷ 4 available = 50%.'),
    F('Utilisation is 200%', 'That would mean 8 people needed.'),
    F('4 people are required', '4 is how many are available, not how many are needed.'),
    F('The team is overloaded', 'Utilisation is below 100%: spare capacity.')], 'Required = workload ÷ hours per person; utilisation = needed ÷ available.'),
  Q(2, 3, 'Cost of a step', 'An activity takes 30 minutes at a rate of $60 per hour and runs in 20% of cases. What does it add to the average cost per case?', [
    F('$30', 'That is the cost when it runs; ignore the 20% chance.'),
    T('$6', '0.5 h × $60 × 0.2 = $6.'),
    F('$12', 'That uses 20% of $60 only.'),
    F('$3', 'That halves the correct value.')], 'Cost × chance that the step runs.'),
  Q(2, 4, 'Biggest time contributor', 'A: 18 min in 10% of cases. B: 6 min in 100%. C: 8 min in 50%. Which contributes the most time per case?', [
    F('A', '18 × 0.10 = 1.8 min.'),
    T('B', '6 × 1.00 = 6 min, the largest.'),
    F('C', '8 × 0.50 = 4 min.')], 'Compare time × chance, not the raw duration.'),
  Q(2, 5, 'Technique match', 'Which statements match the correct technique?', [
    T('Demand is 200 meals a day but only 100 can be made: capacity analysis.', 'Supply (maximum) against demand.'),
    T('The average customer takes 15 minutes in total: cycle time analysis.', 'Whole workflow time per case.'),
    T('Check whether a cashier is over-used or idle: utilisation analysis.', 'Working time against available time.'),
    F('A flood closes the warehouse for two days: what-if analysis.', 'A rare, high-impact event is the unusual event analysis.'),
    F('Change the number of cashiers from 2 to 3 and compare: path analysis.', 'Changing one thing and comparing is what-if analysis.')], 'Match the keyword in the statement.'),
  Q(2, 6, 'Bottleneck evidence', 'Which evidence points to a **bottleneck**?', [
    T('Long average waiting time before the activity', 'Work piles up in front of it.'),
    T('A long queue in front of the activity', 'The same signal from another angle.'),
    T('The resource doing it is over-utilised', 'Demand exceeds its capacity.'),
    F('It is the activity with the longest duration', 'A long task is not a bottleneck unless work also waits for it.'),
    F('The resource is mostly idle', 'An idle resource cannot be holding things up.')], 'Bottleneck = waiting time + queue + busy resource.'),
  Q(2, 7, 'Path analysis', 'Which are uses of **path analysis**?', [
    T('Checking the rejection cases', 'Rejected paths cost time and money for no value.'),
    T('Changing a probability at a decision point and observing the result', 'Probabilities decide which paths are taken.'),
    T('Ranking paths by share × cost', 'Improve the path that contributes most, not the most frequent.'),
    F('Adding a cashier and measuring the cycle time', 'That is a what-if analysis.')], 'Paths come from decision points.'),
  Q(2, 8, 'What-if', 'Which what-if experiments are well designed?', [
    T('Change cashiers from 2 to 3 and observe the average cycle time.', 'One change, one measurement.'),
    F('Change cashiers to 3, service time to 5 min and arrivals to 300 a day at once.', 'Changing several things together hides which one caused the result.'),
    T('Raise the fraud probability from 5% to 10%, nothing else.', 'One change.'),
    F('Run the simulation once and trust the result.', 'Random inputs need many runs.')], 'Change one thing at a time.'),
  Q(2, 9, 'Simulation data', 'Which items are **decision-point** data (not process-wide, activity or resource data)?', [
    T('80% of requests are approved, 20% are rejected', 'Branch probabilities belong to decision points.'),
    F('1,000 requests arrive per day', 'Process-wide data (arrivals).'),
    F('Validation takes 5 minutes', 'Activity data.'),
    F('A clerk costs $30 per hour', 'Resource data.')], 'Four kinds: process-wide, activity, resource, decision-point.'),
  Q(2, 10, 'Four phases', 'Which is the order of the four phases of dynamic analysis?', [
    F('Model & simulate → goals → impact analysis → final selection', 'Goals are set first.'),
    T('Goals → model & simulate → impact analysis → final selection', 'Correct order.'),
    F('Goals → impact analysis → model & simulate → final selection', 'You cannot analyse impact before simulating.'),
    F('Final selection → goals → model & simulate → impact analysis', 'Selection comes last.')], 'As-Is first, then each To-Be.'),
  Q(2, 11, 'Non-functional', 'Which are **non-functional** requirements?', [
    T('Pages load in two seconds.', 'Performance.'),
    T('The system is available 99.9% of the time.', 'Reliability.'),
    F('Users can upload a receipt.', 'A feature: functional.'),
    F('Users can export a report to PDF.', 'A feature: functional.'),
    T('Personal data are encrypted at rest.', 'Security.')], 'Functional = what it does; non-functional = how well.'),
  Q(2, 12, 'Becomes a use case', 'Which TO-BE workflow steps produce a use case?', [
    T('An interactive step: the clerk enters an order in the portal.', 'One use case, linked to the human.'),
    T('An automated email that notifies the customer.', 'One use case, linked to the notified person.'),
    F('The manager and clerk meet to discuss the order.', 'A manual step has no use case.'),
    T('System A calls System B to check stock.', 'Two use cases, one in each system boundary.')], 'Manual = none · interactive = one · automated between two systems = two.'),
  Q(2, 13, 'Use case rules', 'Which statements about use case diagrams are true?', [
    T('Actors use generic role names, such as Patient.', 'Not a person\'s name.'),
    T('There is one system boundary per system.', 'Use cases of different systems sit in different boundaries.'),
    F('An email and an SMS notification may be merged into one use case.', 'Automated use cases are never combined.'),
    T('A solid line joins every actor to the use cases it takes part in.', 'This is how you state the relationships.'),
    F('Packages may group use cases from different systems.', 'A package groups related use cases of one system.')], 'State the relationships explicitly.'),
  Q(2, 14, 'Change type', 'Which note and change-type pairs are correct in a function model?', [
    T('“Currently done in another system”: New', 'The system lacks the function.'),
    T('“Fully supported”: Unchanged', 'Nothing to build.'),
    T('“Needs modification”: To be modified', 'Partly supported.'),
    F('“Currently manual”: Unchanged', 'If people do it manually, the system lacks it: New.')], 'Change type describes the system, not the business practice.'),
  Q(2, 15, 'From package to…', 'In the Solve chapter, each package of use cases becomes a …', [
    T('Function in the function model', 'And later a component in the C4 model.'),
    F('Container', 'Containers are applications or data stores.'),
    F('Actor', 'Actors stay outside the boundary.'),
    F('Gateway', 'A gateway belongs to the workflow model.')], 'Use cases → packages → functions → components.'),
];

// ============================================================ SET 3: M9 to M12 (M12 is tested only as MCQ)
const s3 = [
  Q(3, 1, 'Concept blueprint', 'A Concept Solution Blueprint consists of which models?', [
    T('Architecture model', 'The C4 views.'),
    T('Risk model', 'The risks and mitigation.'),
    T('Cost model', 'Qualitative cost.'),
    F('Vendor selection', 'The blueprint is high-level with no vendor or technology commitment.'),
    F('Detailed program code', 'Code detail is far below the concept level.')], 'Blueprint = architecture + risk + cost.'),
  Q(3, 2, 'C4 context', 'Which statements about the C4 **Context** diagram are true?', [
    T('The system is shown as one box.', 'Nothing is drawn inside it.'),
    T('It shows the people and external systems around it.', 'Plus the arrows between them.'),
    F('It shows the databases inside the system.', 'That is the container level.'),
    T('Everybody, including non-technical people, can read it.', 'It is the widest audience.'),
    F('It shows the classes of one component.', 'That is the code level.')], 'Context: one box, users and external systems.'),
  Q(3, 3, 'Containers', 'Which are **containers** in C4?', [
    T('A web application', 'Something that runs.'),
    T('A database', 'A data store runs as its own container.'),
    T('A mobile app', 'Something that runs.'),
    F('A Java class', 'That is the code level.'),
    F('A Docker engine (because of the name)', 'A C4 container is not a Docker container.')], 'Container = what runs: an application or a data store.'),
  Q(3, 4, 'Risk types', 'Which are risk types in the course\'s risk model?', [
    T('Goal', 'Market and policy.'),
    T('Process flow', 'Unexpected events in the process.'),
    T('Data', 'Risks to the data.'),
    T('Technology', 'Risks from the technology itself.'),
    F('Financial', 'Not one of the course\'s risk types.')], 'Five types: goal, process flow, data, technology, organisational.'),
  Q(3, 5, 'Risk rating', 'Using the rating matrix (A is the highest), which ratings are correct?', [
    T('High impact × Medium likelihood = A', 'High-impact row: Low → B, Medium → A, High → A.'),
    T('Medium impact × Medium likelihood = B', 'The middle cell.'),
    T('Low impact × High likelihood = B', 'Low-impact row: Low → C, Medium → C, High → B.'),
    T('Low impact × Low likelihood = C', 'The lowest cell.'),
    F('High impact × Low likelihood = A', 'That cell is B.')], 'Rating = impact × likelihood from the matrix.'),
  Q(3, 6, 'Cost model', 'Which statements about the concept cost model are true?', [
    T('It rates items Low, Medium or High.', 'Qualitative.'),
    F('It states exact dollar amounts.', 'The concept model is qualitative.'),
    T('Each rating comes with a short justification.', 'For example “new application built from scratch”.'),
    T('A group\'s total rating reflects its items.', 'For example the hardware total.'),
    F('It replaces the risk model.', 'Risk and cost are separate parts of the blueprint.')], 'Low / Medium / High with a one-line reason.'),
  Q(3, 7, 'Gassmann', 'Which statements about the Gassmann triangle are true?', [
    T('What? is the value proposition (the product).', 'Top corner.'),
    T('How? is the value chain (the process).', 'Resources, activities, partners.'),
    T('Who? is the customer segment at the centre.', 'Channels and customer relationships sit with it.'),
    F('Channels belong to How?', 'In the course mapping Channels sit under Who?.'),
    T('Changing two or more corners is business model innovation.', 'One corner alone is product or process innovation.')], 'Who? includes customer segments, channels and relationships.'),
  Q(3, 8, 'RPA', 'Which statements describe **robotic process automation (RPA)**?', [
    T('It works mostly on structured data.', 'Fixed fields and forms.'),
    T('It interacts through the user interface.', 'Like a human clicking.'),
    T('It follows a predefined path.', 'Rule-based.'),
    F('It picks its tools dynamically to reach a goal.', 'That is agentic automation.'),
    F('Its logic is goals, policies and constraints.', 'That is agentic automation; RPA uses explicit rules.')], 'Traditional → RPA → intelligent → agentic.'),
  Q(3, 9, 'IoT use levels', 'Which is the correct order of IoT use levels from basic to advanced?', [
    F('Alert → Monitor → Control → Predict → Optimise', 'Monitor comes first.'),
    T('Monitor → Alert → Predict → Control → Optimise', 'Watch, notify, recommend, act, keep adjusting.'),
    F('Monitor → Predict → Alert → Optimise → Control', 'Alert comes before predict, control before optimise.'),
    F('Optimise → Control → Predict → Alert → Monitor', 'That is the reverse order.')], 'Monitor, Alert, Predict, Control, Optimise.'),
  Q(3, 10, 'BPMN with IoT', 'A humidity sensor reads the humidity itself. Which BPMN task type is that activity, and which others are correct?', [
    T('Script task: the device\'s own hardware function', 'Whose hardware runs the action? The device\'s.'),
    F('User task', 'A user task is a human using an application.'),
    T('Service task: the control system calls a device or service', 'Correct description of a service task.'),
    T('The device is a technology participant with its own lane', 'Devices get their own lane in IoT models.')], 'Ask: whose hardware runs the action?'),
  Q(3, 11, 'Value chain', 'Which statements about value chains are true?', [
    T('A value chain is all the activities to design, produce, market, deliver and support a product.', 'The textbook definition.'),
    T('Value is what buyers are willing to pay.', 'Margin over cost is the advantage.'),
    T('Organisations typically have 3 to 15 value chains.', 'Different products or customers have different chains.'),
    F('A company has exactly one value chain.', 'The course says 3 to 15.')], 'Studying chains shows where to align investment.'),
  Q(3, 12, 'Process types', 'Which statements classify processes correctly?', [
    T('Core processes: critical expertise, outputs go to external customers.', 'The primary value chain.'),
    T('Supporting processes: their outputs are inputs to the core processes.', 'Secondary or supplementary.'),
    T('Management processes: direction, rules, plans, measures and controls.', 'Sometimes called regulation.'),
    F('Supporting processes deliver their outputs straight to external customers.', 'That is the core; supporting feeds the core.')], 'Core, supporting, management.'),
  Q(3, 13, 'Porter', 'Which are Porter\'s **primary** activities?', [
    T('Inbound logistics', 'Primary.'),
    T('Operations', 'Primary.'),
    T('Marketing and sales', 'Primary in Porter\'s model (other course models may treat outreach and marketing as management).'),
    F('Human resource management', 'A support activity.'),
    F('Procurement', 'A support activity.')], 'Primary: inbound logistics, operations, outbound logistics, marketing and sales, service.'),
  Q(3, 14, 'Frameworks', 'Which process architecture frameworks are matched to the right industry?', [
    T('eTOM: telecommunications', 'The telecom process map.'),
    T('SCOR: supply chain', 'Supply chain operations.'),
    T('APQC Process Classification Framework: cross-industry', 'The only one of the three that is cross-industry.'),
    F('SCOR: healthcare', 'SCOR is for supply chains.')], 'eTOM telecom · SCOR supply chain · APQC cross-industry.'),
  Q(3, 15, 'Common traps', 'Which statements are true?', [
    T('Static analysis ignores waiting time and queues.', 'Dynamic (simulation) analysis adds them.'),
    T('A complexity score of 5 means very easy.', 'Higher is better on both scales.'),
    T('A manual activity gets no use case.', 'No system is involved.'),
    F('The bottleneck is always the longest task.', 'It needs waiting time, a queue and a busy resource.'),
    F('The concept cost model uses dollars.', 'It uses Low / Medium / High.')], 'The same traps appear in many questions.'),
];

const sub = (n, what) => `A practice set in the style of Part 3: 15 questions, each with one or more right options (tick all that apply). Topics: ${what}. After you check an answer, every option shows why it is right or wrong.`;
export const mcqMocks = [
  { title: 'Part 3 · MCQ set 1 (Models 1–5)', grp: 'Predicted Questions', ico: '☑️', sub: sub(1, 'alignment, business language, resources, activity types, business rules, workflow rules, root cause analysis and recommendations'), html: section('15 multiple-choice questions', s1) },
  { title: 'Part 3 · MCQ set 2 (Models 5–8)', grp: 'Predicted Questions', ico: '☑️', sub: sub(2, 'static and dynamic analysis, requirements, use cases and the function model'), html: section('15 multiple-choice questions', s2) },
  { title: 'Part 3 · MCQ set 3 (Models 9–12)', grp: 'Predicted Questions', ico: '☑️', sub: sub(3, 'blueprint, C4, risk and cost, innovation, automation, IoT and process architecture (module 12 is tested only as multiple choice)'), html: section('15 multiple-choice questions', s3) },
];
