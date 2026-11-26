// Predicted Part 2: scenario-based short answer questions (25 marks on the real paper), plus fill-in-the-blank and true/false.
import { p, ul, ol, table, note, written, section, gzSvg } from './lib.mjs';

const C = (q, pts) => `PREDICTED · ${q}${pts ? ' · ' + pts : ''}`;

// ---------------------------------------------------------------- alignment and classification
const s1 = written(C('S1', '5 PTS'), 'Business and IT alignment: why it matters and why it fails',
  p('FreshMart is a grocery chain. Its IT team reports success when the checkout system is up 99.9% of the time, but store managers complain that checkout is still slow at peak hours. IT builds new features without asking the stores, and store managers see IT as a cost they cannot control. Loyalty rules change every month, but the systems take about three months to change.')
  + p('**(a)** Explain why business and IT alignment matters. (2 marks) **(b)** Identify **two** reasons for misalignment in this case, with evidence from the case. (3 marks)'),
  p('**(a)** Alignment means IT supports the business goals and objectives. Without it, IT investments may not meet business needs, wasting resources and missing opportunities. With it, IT is an enabler: the business goals drive technology decisions, IT enables business innovation, accountability is shared, teams communicate effectively and the technology strategy is integrated with the business strategy.')
  + table(['Reason for misalignment', 'Evidence in the case'], [
    ['Lack of appreciation of the business process by IT', 'IT measures uptime (99.9%) but does not look at how slow checkout is for stores at peak hours; it builds features without asking the stores.'],
    ['Lack of appreciation of the value of IT by the business', 'Store managers see IT as a cost they cannot control.'],
    ['Growing / changing business', 'Loyalty rules change every month but the systems take three months to change.']])
  + note('Pick any two. Always quote the case (“because in the case…”). Distinguish the two scopes if asked: **enterprise alignment** covers the whole organisation (Enterprise Architecture), **project alignment** covers one IT solution (the BPE methodology).'));

const s2 = written(C('S2', '4 PTS'), 'Mission, vision, business objective or strategy?',
  p('Classify each statement of FreshMart as a **mission**, a **vision**, a **business objective** or a **strategy**, and justify with one phrase from the statement. (0.5 mark each)')
  + ol([
    'To provide fresh, affordable groceries to every neighbourhood.',
    'Be the most trusted grocer in Southeast Asia.',
    'Increase online orders to 30% of sales by December 2027.',
    'Launch a mobile app and open ten dark stores.',
    'Cut checkout time to under two minutes in all stores within twelve months.',
    'Partner with local farms and automate stock replenishment.',
    'Serve our community with quality food every day.',
    'Become the first choice for family shopping.']),
  table(['#', 'Answer', 'Justification'], [
    ['1', 'Mission', '“provide … to every neighbourhood”: what we do now and for whom (descriptive words)'],
    ['2', 'Vision', '“Be the most trusted”: a future aspiration, abstract and inspirational'],
    ['3', 'Business objective', '“30% … by December 2027”: concrete, measurable and time-bound'],
    ['4', 'Strategy', '“Launch … open”: actions to achieve the objectives'],
    ['5', 'Business objective', '“under two minutes … within twelve months”: a measurable target with a deadline'],
    ['6', 'Strategy', '“Partner … automate”: an action or plan'],
    ['7', 'Mission', '“Serve our community … every day”: the present purpose'],
    ['8', 'Vision', '“Become the first choice”: a future aspiration']])
  + note('Tell-tales: **mission** = present, what we do and for whom · **vision** = future, aspirational, abstract · **objective** = numbers and dates · **strategy** = verbs of action (launch, expand, partner, automate). The cascade runs mission and vision → business objectives → strategies → process performance goals → metrics.'));

// ---------------------------------------------------------------- RCA, RCI, RCR
const s3 = written(C('S3', '6 PTS'), 'Root cause analysis: StarCinema refunds',
  p('At StarCinema a customer who wants a refund fills in a paper form at the counter. The counter staff re-type it into the Booking System, which freezes during peak hours. The staff then email the Finance Officer, who checks refund emails only once a day. If the ticket was bought online, the staff must check the payment in the Payment Portal, a separate system that is not linked to the Booking System. Finance policy says refunds above $50 need manager approval, and managers are in meetings most afternoons.')
  + p('**(a)** Complete the table for **three** issues: Issue, Cause, Root cause, Issue category, Recommendation. (4.5 marks) **(b)** Add a metric and an impact level (5 very high … 1 very low) for one issue. (1.5 marks)'),
  table(['Issue', 'Cause', 'Root cause', 'Category', 'Recommendation'], [
    ['Refund requests are captured slowly and with mistakes', 'Staff re-type a paper form into the Booking System', 'Paper-based process', 'Process', 'Online refund form that feeds the Booking System'],
    ['Booking System freezes at peak hours', 'The system cannot handle peak load', 'Lack of system functionality (capacity)', 'System', 'Upgrade capacity or move the module to a scalable service'],
    ['Refunds wait a day before Finance acts', 'The Finance Officer checks the emails once a day', 'No automatic notification', 'Process', 'Booking System alerts Finance as soon as a refund is submitted'],
    ['Online refunds take extra manual checking', 'Payment Portal is a separate system', 'Lack of system integration', 'System', 'Integrate Payment Portal and Booking System'],
    ['Large refunds are delayed', 'Managers are in meetings and must approve above $50', 'Finance approval policy', 'Policy', 'Review the threshold or allow delegated approval']])
  + p('**(b) Metric and impact (RCI row).** Issue: slow, error-prone capture of refund requests leads to complaints and rework. Metric: number of errors per refund form. Impact: **High (4)**, because it affects every refund.')
  + note('Three rows are enough for (a); the table shows all five clues. Rows differ by the **clue in the text**: “re-type / paper” → paper-based; “freezes” → system; “checks once a day” → notification; “separate system, not linked” → integration; “policy says” → policy. Do not restate the issue as the root cause.'));

const s4 = written(C('S4', '3 PTS'), 'Root cause recommendation (RCR): what to implement first',
  p('The StarCinema team scores each recommendation by **impact** (5 = very high … 1 = very low) and **complexity** (5 = very easy … 1 = very complex). Higher is better on both scales.')
  + table(['Recommendation', 'Impact', 'Complexity'], [['R1 Online refund form', '4', '4'], ['R2 Integrate Payment Portal and Booking System', '5', '2'], ['R3 Auto-notify the Finance Officer', '3', '5'], ['R4 Delegated manager approval', '2', '3'], ['R5 Upgrade Booking System capacity', '4', '3']])
  + p('Recommend the order of implementation and justify it.'),
  p('**Order: R1, then R3 and R5, then R2, then R4.**')
  + ul(['**R1 first**: high impact (4) and easy (4), so a quick win.', '**R3 and R5 next**: R3 is the easiest (5) with medium impact; R5 has the same impact as R1 but is harder (3).', '**R2 next**: the highest impact (5), but complexity 2 means a project of its own. Plan it, do not start with it.', '**R4 last**: low impact and not easy.'])
  + note('The principle is **high impact and easy first**. Another order is accepted if you reason from both scores. A recommendation is “what + where” (for example “auto-send an alert from the Booking System to Finance”), not “improve communication”.'));

// ---------------------------------------------------------------- dynamic and static analysis
const tech = [
  ['The kiosk can serve at most 120 customers a day but 200 arrive.', 'Capacity analysis', 'supply (maximum) against demand'],
  ['On average each customer spends 15 minutes and $4 in the whole workflow.', 'Process cycle time / cost analysis', 'time and cost of the whole workflow per case'],
  ['The two cashiers work 95% of their available time, the packers only 30%.', 'Resource utilisation analysis', 'over-used or idle resources'],
  ['The “Quality check” activity takes 6 minutes and costs $3.', 'Activity time / cost analysis', 'one activity, not the whole workflow'],
  ['Orders wait 40 minutes before packing and the queue averages 25 orders.', 'Bottleneck analysis', 'long waiting time, long queue and a busy resource'],
  ['Change the probability of fraud claims from 5% to 15% and see the effect.', 'Path analysis', 'probabilities at decision points'],
  ['A flood closes the warehouse for two days.', 'Unusual event analysis', 'rare, high-impact event'],
  ['Add a third cashier and see whether the average cycle time drops from 20 to 10 minutes.', 'What-if analysis', 'change one thing, compare the result']];
const s5 = written(C('S5', '4 PTS'), 'Which dynamic analysis technique?',
  p('Name the dynamic analysis technique each statement describes. (0.5 mark each)') + ol(tech.map((t) => t[0])),
  table(['#', 'Technique', 'Keyword'], tech.map((t, i) => [String(i + 1), t[1], t[2]]))
  + note('Match the **keyword**. Capacity is supply against demand. Cycle time is the whole workflow. Utilisation is busy against idle. The bottleneck needs waiting time **and** queue length (it is not simply the longest task). What-if changes **one** thing at a time.'));

const s6 = written(C('S6', '6 PTS'), 'Reading a process path report',
  p('A dynamic simulation of an insurance claim process gave this path report (assume the data are correct).')
  + table(['Case', 'Avg cost', 'Avg elapsed', 'Avg resource (work) time', 'Avg delay (waiting)', 'Distribution', 'Instances'], [
    ['Auto-approve', 'USD 14', '2 h', '30 min', '1 h 30 min', '60%', '60'],
    ['Manual review, approved', 'USD 25', '30 h', '1 h', '29 h', '30%', '30'],
    ['Rejected after review', 'USD 12', '26 h', '42 min', '25 h 18 min', '10%', '10'],
    ['All cases', '', '', '', '', '100%', '100']])
  + p('**(a)** Which case has the highest wastage? Justify with the statistics and suggest one solution. (3 marks) **(b)** Which path should be improved first to cut the average waiting time, and why? (3 marks)'),
  p('**(a)** **Rejected after review.** A rejected claim produces no value, yet it still costs USD 12 on average and runs 26 h, of which only 42 min is real work and about 25 h is waiting. It is also not rare (10 of 100 cases). **Solution:** check the rejection rules at the start (for example, add automatic eligibility rules to the intake system) so that these claims are rejected in minutes, not after a full review.')
  + p('**(b)** Compare **share × waiting time**, not the case that is simply most frequent.')
  + table(['Case', 'Share × avg delay', 'Contribution'], [['Auto-approve', '0.60 × 1.5 h', '0.90 h'], ['Manual review, approved', '0.30 × 29 h', '**8.70 h**'], ['Rejected after review', '0.10 × 25.3 h', '2.53 h']])
  + p('The average delay per claim is 0.90 + 8.70 + 2.53 = 12.13 h. **Manual review, approved** contributes most (8.70 h of 12.13 h), so it is improved first (for example, auto-notify the reviewer or review in parallel), even though auto-approve is the most frequent path.')
  + note('Average cost per claim = 0.6 × 14 + 0.3 × 25 + 0.1 × 12 = USD 17.10. Rank paths by **contribution** (share × value), not by frequency alone.'));

const s7 = written(C('S7', '7 PTS'), 'Static analysis: cycle time, cost, workload and utilisation',
  p('A claims process: **Register** (Clerk, 6 min, every claim) → **Assess** (Assessor, 30 min) → a decision: **80%** of claims go straight to **Pay** (Clerk, 4 min); **20%** go to **Investigate** (Investigator, 90 min) and then to **Pay** (Clerk, 4 min).')
  + p('Hourly cost: Clerk $30, Assessor $60, Investigator $90. There are 12,000 claims a year. One person works 1,500 hours a year. Three Investigators are available. Use static analysis (no waiting or queues).')
  + p('**(a)** Average cycle time per claim. **(b)** Average cost per claim. **(c)** Annual workload of the Investigators, the number of Investigators required and their utilisation. **(d)** The investigation is cut to 60 minutes. Give the percentage improvement in cycle time.'),
  table(['Part', 'Working', 'Answer'], [
    ['(a) Cycle time', '6 + 30 + 0.8 × 4 + 0.2 × (90 + 4) = 36 + 3.2 + 18.8', '**58 min**'],
    ['(b) Cost', 'Register 6/60 × 30 = 3.00 · Assess 30/60 × 60 = 30.00 · Pay 4/60 × 30 = 2.00 (every claim pays) · Investigate 0.2 × 90/60 × 90 = 27.00', '**USD 62.00**'],
    ['(c) Workload', '12,000 × 0.2 × 1.5 h = 3,600 h a year', '**3,600 h**'],
    ['(c) Required', '3,600 ÷ 1,500 = 2.4 Investigators', '**2.4**'],
    ['(c) Utilisation', '2.4 needed ÷ 3 available', '**80%**'],
    ['(d) Improvement', 'new cycle time 6 + 30 + 3.2 + 0.2 × 64 = 52 min; (58 − 52) ÷ 58', '**10.3%**']])
  + note('Along a branch you **multiply** the chances. Time and cost of a step = its value × the chance that the step runs. Required resources = workload ÷ hours one person works. Utilisation above 100% means overloaded; low means idle. With only two Investigators the utilisation would be 120%.'));

// ---------------------------------------------------------------- function model
const s8 = written(C('S8', '5 PTS'), 'Function model: spot the errors',
  p('The library room system **LRS** is being extended. It will call the external **Calendar Service (CAL)**. This function model was prepared by a junior analyst. **Three** rows contain an error in the **change type** or in the **system / function** column. Identify them and correct them.')
  + table(['#', 'System', 'Function', 'Use case', 'Change type', 'Technical notes'], [
    ['1', 'LRS', 'Booking Module', 'Reserve Room', 'New', 'Currently done manually at the counter'],
    ['2', 'LRS', 'Booking Module', 'Cancel Reservation', 'Unchanged', 'Currently manual, staff cancel by phone'],
    ['3', 'LRS', 'Notification Module', 'Send Reminder', 'To be modified', 'Fully supported; LRS already sends reminder emails'],
    ['4', 'LRS', 'Integration Module @LRS', 'Check Calendar Slots', 'New', 'System integration with CAL (HTTPS/REST)'],
    ['5', 'LRS', 'Integration Module @CAL', 'Provide Free Slots', 'New', 'System integration'],
    ['6', 'LRS', 'Search Module', 'Search Room', 'To be modified', 'Currently interactive; add a capacity filter']]),
  table(['Row', 'Error', 'Correction'], [
    ['2', 'Change type is Unchanged, but the note says the task is done **manually** (the system lacks it).', 'Change type should be **New**.'],
    ['3', 'Change type is To be modified, but the note says it is **fully supported** and already exists.', 'Change type should be **Unchanged**.'],
    ['5', 'The use case “Provide Free Slots” belongs to the **Calendar Service**, not to LRS (the receiver half of the hand-off sits in the other system).', 'System should be **CAL** (function Integration Module @CAL).']])
  + note('Rows 1, 4 and 6 are correct. Check **every row**: (1) does the note agree with the change type, (2) is the use case under the right system and function, (3) is the integration noted. Change type describes the **system**, not what people do today. The model answer wording: “Row [n]: the change type should be [New / To be modified / Unchanged] because the technical note says “…”.”'));

// ---------------------------------------------------------------- Gassmann
const s9 = written(C('S9', '5 PTS'), 'Gassmann triangle: mis-mapped components and innovation',
  p('BookBox, a bookstore chain, launches a “Book of the Month” subscription. Customers pay a monthly fee, books are picked by a recommendation algorithm that uses their reading history, and a courier partner delivers from a central warehouse. The stores keep selling single books. The BPM team drew the model below.')
  + gzSvg({
    what: ['Monthly book box', 'Personalised book picks', 'Avid readers'],
    how: ['Central warehouse', 'Recommendation algorithm', '$20 monthly fee', 'Online shop (channel)'],
    value: ['Single-book sales', 'Delivery costs'],
    who: ['Casual readers', 'Courier partner'],
    label: 'Business model drawn by the BPM team (BookBox)',
  })
  + p('**(a)** Identify **three** components that are mapped to the wrong corner and correct them, with a reason. (3 marks) **(b)** Is this business model innovation? Explain. (2 marks)'),
  table(['Component', 'Drawn under', 'Belongs under', 'Reason'], [
    ['Avid readers', 'What?', '**Who?**', 'They are a customer segment, not the offer'],
    ['Courier partner', 'Who?', '**How?**', 'A key partner that delivers the value, not the customer'],
    ['$20 monthly fee', 'How?', '**Value?**', 'A revenue stream (the revenue model)'],
    ['Online shop (channel)', 'How?', '**Who?**', 'A channel is how the value proposition reaches the customer; in the course mapping it sits on the customer side (Who?)']])
  + p('**(b)** **Yes.** What? changes (a monthly subscription box with personalised picks), How? changes (warehouse, algorithm and courier partner) and Value? changes (subscription fee instead of single sales). When **two or more corners** change, it is business model innovation (a change to one corner alone is product or process innovation).')
  + note('Three of the four errors are enough for (a). The test for each item: is it a **customer** (Who?), the **offer** (What?), an **activity, resource or partner** (How?) or **money in or out** (Value?). Channels and customer relationships sit under Who? in this course.'));

// ---------------------------------------------------------------- technology
const s10 = written(C('S10', '6 PTS'), 'What technology would you use?',
  p('For each scenario, name **one** suitable technology and explain briefly how it works. (2 marks each)')
  + ol([
    'A hospital wastes hours every day looking for wheelchairs and infusion pumps. It wants to know where each item is, in real time.',
    'An insurer receives 5,000 scanned invoices a day. Clerks copy the data into the claims system by hand.',
    'A cold-chain warehouse must keep goods below 5 °C. Staff want the system to react automatically when it gets warmer.']),
  table(['#', 'Technology', 'How it works'], [
    ['1', 'RFID tags with readers (IoT location tracking)', 'Each device carries a tag; readers at doors and in rooms read it and update the location on a dashboard, so staff search the screen instead of the ward.'],
    ['2', 'Intelligent automation: RPA with AI-based document reading', 'The scanned invoice is read by AI (the data are unstructured), and an RPA robot copies the fields into the claims system through its user interface. A human checks cases the AI is unsure about.'],
    ['3', 'IoT temperature sensors with an actuator', 'Sensors read the temperature and send it over the network. When it passes 5 °C the system raises an alert and switches the cooling unit on (the **Control** level of IoT use).']])
  + note('This is a “what technology?” answer: **name it, then say how it works** in one or two sentences tied to the scenario. IoT use levels, from basic to advanced: Monitor → Alert → Predict → Control → Optimise.'));

// ---------------------------------------------------------------- risk and cost, impact analysis
const s11 = written(C('S11', '5 PTS'), 'Risk model and cost model for a new system',
  p('A clinic will replace its appointment system. Senior doctors may resist the change. Hardware (servers) is bought once; the database software is already licensed; staff training is a large one-off effort.')
  + p('**(a)** Write **one** risk using the risk model (type, impact, likelihood, rating, mitigation). (3 marks) **(b)** Give a concept cost model entry (fixed, maintenance, total) for **servers** and **training**, with a one-line justification. (2 marks)'),
  p('**(a)** Risk: senior doctors resist the new appointment system and delay its use. Type: **organisational** (people and roles). Impact **High** × likelihood **Medium** = rating **A** (the rating matrix: High × Medium is A). Mitigation: **reduction**, by involving senior doctors in design workshops to build ownership (may slow rollout slightly).')
  + table(['Item', 'Fixed', 'Maintenance', 'Total', 'Justification'], [['Servers (hardware)', 'Medium', 'Low', 'Medium', 'bought once; limited upkeep'], ['Staff training', 'High', 'Medium', 'High', 'many staff, large one-off effort, refreshers needed']])
  + note('Risk types: goal, process flow, data, technology, organisational. Mitigations: reduction, transfer, acceptance, elimination. Rating A is the highest. The concept cost model is **qualitative (Low / Medium / High)**, not dollars, plus a short justification.'));

const s12 = written(C('S12', '4 PTS'), 'Impact analysis of a To-Be option (internal / external, hard / soft)',
  p('StarCinema considers **Option 1: online refund form** against Option 2: hire two more counter staff. Describe the impact of Option 1 as **internal** and **external**, and give one **hard** and one **soft** impact.'),
  p('**Internal impact (on staff and the organisation):** counter staff are retrained and lose manual control of refunds; the refund policy and the Booking System change. **External impact (on customers and partners):** customers submit refunds online without queuing; the Payment Portal must exchange data with the new form.')
  + table(['Kind', 'Example'], [['Hard (quantifiable)', 'Training cost, hours saved per refund, number of form errors'], ['Soft (not easily measured)', 'Staff resistance to change, customer trust in the online form']])
  + note('Write the impact on **people first** (staff internal, customers external). Hard = can be counted in money, hours or numbers. Soft = attitudes and trust. Finish by saying whether the goals are met with acceptable impact.'));

// ---------------------------------------------------------------- fill in the blank and T/F
const blanks = [
  ['The four dimensions of business language are Purpose, Participants, Process and ______.', 'Product'],
  ['A ______ statement is future-oriented, abstract and inspirational.', 'vision'],
  ['In the resource model, a system the company does not control or operate is classified as ______.', 'external'],
  ['An activity in which a human works with a system is called ______.', 'interactive'],
  ['The deeper reason behind a cause, found by asking “why” repeatedly, is the ______.', 'root cause'],
  ['______ analysis checks whether a resource is over-used or idle.', 'Resource utilisation'],
  ['In the Gassmann triangle, changing two or more corners is ______ innovation.', 'business model'],
  ['The C4 diagram that shows the system as one box with its users and external systems is the ______ diagram.', 'context'],
  ['A High-impact, High-likelihood risk has the rating ______ (A, B or C).', 'A'],
  ['The concept cost model rates items Low, Medium or ______.', 'High']];
const s13 = written(C('S13', '5 PTS'), 'Fill in the blank',
  p('Fill in each blank with the best word or phrase. (0.5 mark each)') + ol(blanks.map((b) => b[0])),
  table(['#', 'Answer'], blanks.map((b, i) => [String(i + 1), `**${b[1]}**`])));

const tf = [
  ['Business rules are drawn on gateways.', 'False', 'Business rules constrain an **activity** (IF…THEN); gateways only route with labelled exits.'],
  ['A manual activity gets no use case.', 'True', 'A manual step involves no system, so there is nothing to put in the model.'],
  ['The bottleneck is always the activity with the longest duration.', 'False', 'A bottleneck needs long waiting time and a long queue at a busy resource, not just a long task.'],
  ['An automated email and an automated SMS may be combined into one “Notify” use case.', 'False', 'Automated use cases are never combined: one per interaction.'],
  ['In C4, a container means a Docker container.', 'False', 'A container is something that runs (an application or a data store), not Docker.'],
  ['Internal / external in the resource model depends on who controls and operates the resource, not on who pays for it.', 'True', 'A paid cloud service is still external.'],
  ['A complexity score of 5 means the recommendation is very complex.', 'False', 'On the course scale 5 = very easy and 1 = very complex; higher is better.'],
  ['Agentic automation means no human is involved.', 'False', 'A human still approves, supervises or takes escalations.']];
const s14 = written(C('S14', '4 PTS'), 'True or false (with a reason)',
  p('State whether each statement is true or false. (0.5 mark each)') + ol(tf.map((t) => t[0])),
  table(['#', 'T / F', 'Reason'], tf.map((t, i) => [String(i + 1), `**${t[1]}**`, t[2]])));

export const saqMock = {
  title: 'Part 2 · Short answer (25 marks)', grp: 'Predicted Questions', ico: '🗒️',
  sub: 'The real paper has five scenario-based short questions: business and IT alignment, mission / vision / objective / strategy, root cause analysis and process analysis, dynamic analysis techniques, the function model, the Gassmann triangle and “what technology?”. Answer in full sentences on paper, then compare with the model answer.',
  html: section('Alignment and business language', [s1, s2]) + section('Root cause analysis and recommendations (RCI / RCR)', [s3, s4]) + section('Static and dynamic analysis', [s5, s6, s7]) + section('Solutioning: the function model', [s8]) + section('Innovation, technology, risk and cost', [s9, s10, s11, s12]) + section('Quick fire: fill in the blank and true / false', [s13, s14]),
};
