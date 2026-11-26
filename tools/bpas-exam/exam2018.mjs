// AY2018-19 Term 1 sample exam paper (IS210) with the official sample solution, as Exam Practice cards.
// Question text comes from the paper; answers follow the official solution PDF (checked page by page).
import { p, ul, ol, table, note, swim, written, mcq, section, ucSvg, gzSvg, inl } from './lib.mjs';
import { hdbAltFlow, hdbOfficialFlow } from './hdb-flow.mjs';

const C = (q, pts) => `2018 SAMPLE · ${q}${pts ? ' · ' + pts : ''}`;

// ---------- Q1 MCQ
const q1 = mcq(C('Q1', '1 PT'), 'Business Analyst in the BPE team',
  p('Within the BPE team, the Business Analyst is expected to:'),
  ['Understand both the business and IT', 'Understand the business process being studied', 'Design and implement the IT Solution', 'Have deep technical knowledge of a specific technology', 'Translate business requirements into IT solution requirements'],
  'ABE', 'Official key: A, B, E. The Business Analyst is the bridge between business and IT.',
  ['Right. The BA must understand both sides to bridge them.',
    'Right. The BA has to understand the process being studied before translating it.',
    'Wrong. Designing and implementing the IT solution is the job of the IT / solution team, not the BA.',
    'Wrong. Deep knowledge of one specific technology is a specialist skill. The BA needs breadth, not that depth.',
    'Right. Translating business requirements into IT solution requirements is the BA\'s core task.']);

const q2 = mcq(C('Q2', '1 PT'), 'Which activities are Interactive?',
  p('Which of the following activities is/are of the type **Interactive**?'),
  ['Jane enters the delivery details into the Shipping system', 'The SAP (Finance module) system sends an IDOC document containing account details to the Accounting system', 'Marche stacks the items on the warehouse shelves', 'Judith approves the purchase through the Purchase Portal', 'Albert Ching approves the purchase by signing the paper request forms'],
  'AD', 'Interactive = a human working with a system. System to system is automated; a human with no system is manual.',
  ['Right. A human uses a system (the Shipping system): interactive.',
    'Wrong. System to system with no human: automated.',
    'Wrong. A human with no system: manual.',
    'Right. A human uses a system (the Purchase Portal): interactive.',
    'Wrong. Signing paper forms uses no system: manual.']);

// ---------- Q2 Business Process Analysis
const q2scenario = `The leading telecom firm MobileHub has the following "Phone Transfer Service" process. This process enables the customers of the firm to request for the transfer of the phone services to a new address and the process is triggered when the customer submits the transfer request form. The customer will be informed on the outcome at the end of the process. If successful, the process will trigger the "Transfer Installation Process" which is not shown in the workflow diagram.`;
const q2body = `The customer submits a transfer request via the Request Portal. The Request Portal determines if the transfer request needs validation. For a transfer request that needs validation, the Data Validator applies some straightforward rules (IF…X THEN…Y) to validate the transfer request. Data validator then logs into the Customer Relationship System (CRS), searches for the Customer record and retrieves the record. The CRS system is very slow and hard to use, taking up lots of time just to perform the search. After the lookup, the Data validator will email the Approver the customer request. On receiving the approval request email, the Approver will login to the request portal and check the transfer request against the rules to approve or disapprove the transfer request. If rejected, the Approver will send a rejection email to the customer and the process ends. If approved, the Approver will send an approval email and applicant details to the Payroll admin. The Approver has to manually type the applicant details in the email. As Payroll admin is usually quite busy, he sometimes misses the email from the Approver and takes a few hours before taking action on the email. Upon receiving the email from the Approver, the customer details is updated in the Payroll System by the Payroll admin. The Payroll admin will next send an email of the exact same phone registration request and the same applicant details to the Telecom coordinator. Finally the Telecom coordinator will add the customer information to the phone system and the transfer approve process is complete. Similar to the Payroll admin, the Telecom coordinator also takes hours to respond to the email task as he does not check his email frequently. Do note that task by the Telecom coordinator has no dependency with the task by the Payroll Admin of adding the customer details to the Payroll System.`;

const q2flow = swim(`flowchart LR
    subgraph L1["Customer"]
        S(["Need to Transfer"])
        A1["Log Transfer Request (Request Portal)"]
        G1{"Validate request?"}
    end
    subgraph L2["Data Validator"]
        A2["Validate Request (Request Portal)"]
        M1(("merge"))
        A3["Lookup Customer Data (CRS)"]
        A4["Send approval request email"]
    end
    subgraph L3["Approver"]
        A5["Approve Request based on rules (Request Portal)"]
        G2{"Approved?"}
        A6["Send rejection email"]
        E1(["Transfer Rejected"])
        A7["Send approval email and the applicant details"]
    end
    subgraph L4["Payroll Admin"]
        A8["Add to Payroll System (Payroll)"]
        A9["Send email for Phone registration request and applicant details"]
    end
    subgraph L5["Telecom Coordinator"]
        A10["Add to Phone System (Phone System)"]
        E2(["Transfer Approved"])
    end
    S --> A1 --> G1
    G1 -->|Yes| A2 --> M1
    G1 -->|No| M1
    M1 --> A3 --> A4 --> A5 --> G2
    G2 -->|No| A6 --> E1
    G2 -->|Yes| A7 --> A8 --> A9 --> A10 --> E2`);

const report1 = table(['Case Name', 'Average Cost', 'Average Resource Cost', 'Average Elapsed Duration', 'Average Resource Duration', 'Average Delay Duration', 'Distribution', 'No of Instances'], [
  ['Approve Without Validation', 'USD 26.58', 'USD 26.58', '17 hrs 6 min', '1 hrs 15 min', '2 hrs 55 min', '18.00%', '9'],
  ['Approve With Validation', 'USD 29.92', 'USD 29.92', '30 hrs 9 min', '1 hrs 25 min', '1 hrs 39 min', '32.00%', '16'],
  ['Reject with Validation', 'USD 13.43', 'USD 13.43', '26 hrs 55 min', '42 min', '1 hrs 8 min', '28.00%', '14'],
  ['Reject without validation', 'USD 10.10', 'USD 10.10', '16 hrs 29 min', '32 min', '1 hrs 27 min', '22.00%', '11'],
  ['All Cases', 'USD 20.34', 'USD 20.34', '23 hrs 53 min', '59 min', '1 hrs 41 min', '100.00%', '50']]);

const q2a = written(C('Q2 Part A'), 'Highest wastage case (Report 1)',
  p(q2scenario) + p(q2body) + `<p><b>Workflow model (given).</b> Systems are shown in brackets after the activity.</p>` + q2flow + p('**Report 1: Process Path Report** (assume data correctness).') + report1
  + p('**A.** Report 1 shows the results of a dynamic simulation run and the statistical measurements for the various cases of the process. With reference to Report 1, identify the case with the highest wastage. Using the statistical measurements, briefly justify your selection of the case. Suggest **one** solution to minimize this wastage.'),
  table(['i. Name of case', 'ii. Justification of selection', 'iii. Suggested solution (elaborate)'], [
    ['Reject with Validation', 'Data used: Average Resource Cost and Distribution percentage.', 'Validate Request can be automated. We can add validation business rules to the Request portal to do data validation automatically. Task validation request will be moved to the Request portal swim lane.'],
    ['', 'Others with proper justification and justified suggested solution are also accepted: 1. Average Resource Cost and No of instances.', '']])
  + note('**Why this case.** A rejected case produces no value, yet “Reject with Validation” still costs USD 13.43 on average and is the second most frequent case (28%, 14 instances). Expected waste is 0.28 × 13.43 ≈ USD 3.76 per request, more than “Reject without validation” (0.22 × 10.10 ≈ USD 2.22). Its elapsed time (26 h 55 min) is also almost all waiting, since only 42 min is real work.'));

const q2b = written(C('Q2 Part B', '1.5 PTS'), 'Issues, causes, root causes, recommendations',
  p('**B.** Analyse the possible issues (3 issues) in the given workflow and fill up the below table (this is a new template requested by the vendor). Fill in the table provided below. **(1.5 marks)**')
  + table(['Issues No', 'Issue', 'Cause', 'Root Cause', 'Recommendation'], [['1', '', '', '', ''], ['2', '', '', '', ''], ['3', '', '', '', '']]),
  table(['Issues No', 'Issue', 'Cause', 'Root Cause', 'Recommendation'], [
    ['1', 'Look up customer data task is time consuming and ineffective for the Data Validator.', 'CRS is slow and hard to use', 'System functionality is poor as the user interface is hard to use.', 'Integrate Request Portal and Customer Management System to perform automated retrieval of the information which is hard to use and taking lots of time for the user.'],
    ['2', 'Notifications to the payroll admin is manual (email) and time consuming task.', 'Request portal doesn’t have the feature to automatically notify the payroll administrator.', 'Lack of system functionality', 'Add new feature to request portal to notify the payroll admin on the approval process.'],
    ['3', 'The above can be the same for telcom coordinator', '', '', ''],
    ['4', 'The payroll system registration and phone system registration are done sequentially and results in increased process time.', 'The process didn’t consider the independency of the activities.', 'Independent activities', 'Perform the tasks in parallel where approver emails both payroll admin and telcom coordinator simultaneously. Both the tasks can be now done in parallel.'],
    ['', 'Others like manual generation of applicant details can have human errors or mismatch of the applicant info etc are also accepted.', '', '', '']])
  + note('**Method.** Hunt for clues in the text: “very slow and hard to use” → system functionality; “manually type”, “sometimes misses the email” → lack of automation / notification; “no dependency” between two tasks done one after the other → inadequate activity flow (run in parallel). Root cause is the deeper reason, never a restatement of the issue.'));

// ---------- Q3 Business Process Modeling
const q3text = `The Housing and Development Board (HDB) is launching a new resale portal in January 2018. HDB aims to shorten the resale transaction process by half from 16 to 8 weeks. Currently, the process requires two appointments with HDB and multiple manual checks. The new resale portal cuts the process to only one appointment and will automate most of the eligibility checks. After two months of studying of the current process and several rounds of consultations with the stakeholders, Business Process Experts team (BPE) proposed a TO-BE workflow model as described below.`;
const q3steps = ol([
  'Using the new HDB Resale Portal System **HDB-RP**, the buyer applicant shall submit registration details along with their Singapore Personal Access (SingPass).',
  'After receiving the registration request, HDB-RP will retrieve personal data from SingPass Service System by providing buyer\'s SingPass.',
  'HDB-RP will also check the STS (Singapore Tax System) web service to retrieve the buyer\'s income information.',
  'With all this information, the HDB-RP system will automatically validate the buyer\'s eligibility and will notify the applicant of eligibility either success or failure. If not eligible the process ends.',
  'If eligible, HDB-RP will generate application form with automatically filled data (income, personal info etc.) and flats list. HDB-RP will send the application form, the flats list to select to the buyer.',
  'Upon receiving the application form and resale flats list, the eligible buyer will proceed to review and update the application form and select a flat from the resale pool with the proposed price, and submit using the HDB-RP system.',
  'HDB-RP will notify the seller on the buyer proposal.',
  'The seller will then review the proposed price and choose to accept or reject the offer using the HDB-RP system.',
  'If the offer is rejected the HDB-RP system will notify the Buyer. The buyer will proceed to select another flat and the loop repeats.',
  'If the offer is accepted both the buyer and the seller will be notified by HDB-RP and will be given an appointment with the HDB officer.',
  'Both buyer & seller will meet the HDB officer with his given appointment. This is the only required manual appointment, which triggers the subsequent process, "Transaction Management".']);
const q3note = p('Note: SingPass has existing web services that provide authentication & personal data retrieval for government applications to call. STS has an existing web service that allows government applications to call for retrieval of personal income information.');

const q3flow1 = hdbOfficialFlow();

const q3flow2 = hdbAltFlow();

const q3 = written(C('Q3'), 'Business Process Modeling: HDB resale (draw the workflow model)',
  p(q3text) + q3steps + q3note + p('As a member of the BPE team, you are required to develop the **Workflow Model**. Assumptions (only if needed): ______'),
  p('**Figure 4.1: TO-BE Workflow Model** (official solution). Pool: Resale Process at HDB. Lanes: Buyer, HDB-RP, Seller. Systems are attached to the activity: HDB-RP (the buyer and seller activities), SingPass Service, STS. The last activity carries the note “Manual Activity – Seller is also a participant of this activity”.')
  + q3flow1
  + p('**Alternative solution** (also in the official paper). Differences: SingPass access is submitted with the registration; HDB-RP generates the form and then emails it; the buyer\'s work is split into “Review & Update Application Form” and “Select flat from resale pool list with proposed price”; one notification covers both parties; the buyer and the seller each have their own appointment activity, joined before one end event.')
  + q3flow2
  + note('**What earns the marks.** Every activity sits in the lane of who performs it. Systems (HDB-RP, SingPass Service, STS) are attached to activities, never given lanes of their own. Every gateway exit is labelled (Eligible / Non-eligible, Offer Accepted / Offer Rejected). The rejection loop goes back to the buyer\'s select-a-flat step. The two appointment notifications run in parallel (AND split and join) and every path reaches an end event. The appointment itself is manual and uses no system.'));

// ---------- Q4 Business Process Solutioning
const uc = [
  { id: 'u1', label: 'Submit Registration Details' }, { id: 'u2', label: 'Update Application Form and Select Flat' }, { id: 'u3', label: 'Review Offer' },
  { id: 'u4', label: 'Send Buyer Personal Data' }, { id: 'u5', label: "Send Buyer's income data" },
  { id: 'u6', label: "Retrieve Buyer's income data" }, { id: 'u7', label: 'Retrieve Buyer Personal Data' }, { id: 'u8', label: "Validate Buyer's eligibility" },
  { id: 'u9', label: 'Send appointment with HDB officer to the seller' }, { id: 'u10', label: 'Send appointment with HDB officer to the buyer' },
  { id: 'u11', label: 'eMail application form and flats list' }, { id: 'u12', label: "Notify Buyer's eligibility" }, { id: 'u13', label: 'Notify Seller on the buyers proposal' }, { id: 'u14', label: 'Notify Rejection to Buyer' }];
const q4svg = ucSvg({
  boundaries: [{ title: 'HDB-RP use case model', ucs: uc }],
  left: [{ name: 'Buyer', to: ['u1', 'u2'] }, { name: 'Seller', to: ['u3'] }, { name: 'SingPass', to: ['u4'] }, { name: 'STS', to: ['u5'] }],
  right: [{ name: 'HDB-RP', to: ['u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12', 'u13', 'u14'] }],
  label: 'Use case model for the HDB resale portal',
});
const q4 = written(C('Q4'), 'Business Process Solutioning: use case model',
  p('Identify Use Cases from the To-Be workflow model in Question 3. Draw the Use Case Model.'),
  p('**Official answer.** Actors: Buyer, Seller, SingPass, STS and HDB-RP. Every line joins an actor to a use case it takes part in.') + q4svg
  + note('**What the answer shows.** “Appointment with HDB Officer” is manual, so it has no use case. The SingPass and STS hand-offs are automated system-to-system steps, so each produces a pair: a “Retrieve…” use case for HDB-RP and a “Send…” use case for the other system. Every automated notification is its own use case (never combined). The official figure draws HDB-RP as an actor; by the course rule you would put these use cases inside an HDB-RP system boundary and keep the buyer, seller, SingPass and STS as actors, and you should say so as an assumption.'));

// ---------- Q5 Process Innovation
const q5text = `Walmart has focused on the development of progressive and innovative technologies to gain relevancy in today's retail environment and bring novelty to customer experience. New innovations and ideas have ranged from internal technologies to making the shopping experience more convenient and simple. Walmart is testing new approaches at its supercenters to keep up with customers' digitally driven lifestyles. Scan-and-go technology allows customers to skip checkout lines and pay for purchases using smartphones. When the customers are in store, they can simply scan the goods that they like to purchase using an app as they move in the aisles with smart shelfs. Finally, they can checkout the shopping cart and complete the payment. This prevents them to skip the queues and hassle of carrying the goods. They can do a pickup of their shopping at the pick up ATMs after 1 hour. Online to in-store, seamlessly is a concept features an automated pick-up tower, where customers can order something online, have it sent to the store and pick up their purchase seamlessly. The technology allows customers completing online grocery orders at the store to select self-service as a pick-up option. There is a $30 spending threshold for orders, which must be placed during store hours. They also use the pick up ATMs. Other offerings include, all Walmart customers qualification for free two-day shipping. There is no fees or enrolment in membership programs required for this 2 day free-shipping. The concept offers better and more personalized shopping experience and recommendations going forward.`;
const q5gz = gzSvg({
  what: ['Old: In store or online payments. Delivery services.', 'New: Easy payment services, self-service pickup, personalised services, Digitally driven customers'],
  how: ['Old: Counter Payment management, pickup/delivery management', 'New: Shipping costs, self-pick up management, free-two day shipping'],
  value: ['Old: Online or in-store sales, delivery costs', 'New: Continue, self service pick up margin, Scan-to-go checkout management'],
  who: ['Old: mass market', 'New: Continuity'],
  label: 'Business model drawn by the BPM team (Walmart)',
});
const q5a = written(C('Q5a'), 'Gassmann triangle: find the mis-mapped components',
  p(q5text) + p('**Business model using the Gassmann triangle (given).**') + q5gz
  + p('**(a)** Given the background of the company, the BPM team created a business model using the Gassmann Triangle. Identify 3 components incorrectly mapped in the diagram and correct them. For example, “Self-service pickup” is a component which is correctly mapped.'),
  table(['Issue', 'Correction model (Revenue, Value chain, Value proposition, Customer model)', 'Justify'], [
    ['Digitally driven customers', 'Customer Model', 'These are target customers for the offerings'],
    ['Scan-to-go checkout management', 'Value chain', 'This is a process by which the customers perform in-store shopping and payment using an app by scanning the products and payment.'],
    ['Shipping costs', 'Revenue model', 'This is the amount of money that is cost to the Walmart through its free-two delivery process, or revenue generated by normal delivery process.'],
    ['Free-two day shipping', 'Value proposition', 'The offering to the customer.']])
  + note('The question asks for 3 and the official table lists 4, so any 3 of them score. Test for each component: is it a **customer** (Who?), the **offer** (What?), an **activity or resource** that delivers it (How?) or **money in or out** (Value?).'));
const q5b = written(C('Q5b'), '“What technology?”: the self-pickup ATM',
  p('**(b)** Self-service pickup management process is like an “ATM for groceries” where the kiosks can provide customers with the option to pick up their groceries any time of the day or week. During the online purchase, the customer provides the day of self-pickup as an input and a self-pickup code is generated. On the pick up day, the customer keys in the pickup code information in kiosk at the store and waits for the groceries. What technology can be used to collect the correct package from the self-pick up storage room and be handed to the customer efficiently?'),
  table(['Technology (any one is accepted)', 'How it works'], [
    ['RFID tags on the package', 'The staff will be prompted on the location of the package arranged on the shelf. Package can be scanned and staff can pass it to the customer who is at the waiting counter.'],
    ['Smart storage shelves', 'Once the pickup code is keyed in, the smart shelf will blink to indicate the location of the package in the storage. The staff can quickly collect and pass it to the customer who is at the waiting counter.'],
    ['Robots and smart storage shelf', 'Once the pickup code is keyed in, the smart shelf will blink to indicate the location of the package in the storage. The robots can pick up the package and deliver to the customer at the waiting counter.']]));

export const exam2018 = {
  title: '2018 Sample Exam (with solution)', grp: '2018 Sample Exam', ico: '📝',
  sub: 'AY 2018–19 Term 1 sample paper for IS210, with the official sample solution. The question text is from the paper. Do the question first, then open the answer. Notes marked in colour are mine.',
  html: section('1. Multiple Choice Questions (1 mark each)', [q1, q2]) + section('Question 2 · Business Process Analysis', [q2a, q2b]) + section('Question 3 · Business Process Modeling', [q3]) + section('Question 4 · Business Process Solutioning', [q4]) + section('Question 5 · Process Innovation', [q5a, q5b]),
};
