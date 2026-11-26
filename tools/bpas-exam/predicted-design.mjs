// Predicted Part 1: the three design questions (35 marks on the real paper, drawn with pen and paper).
import { p, ul, ol, table, note, swim, written, section, ucSvg, c4Svg } from './lib.mjs';

const C = (q, pts) => `PREDICTED · ${q}${pts ? ' · ' + pts : ''}`;

// ------------------------------------------------------------------ Q1 use case diagram: FitBook
const fit = written(C('D1', 'USE CASE'), 'Use case diagram: gym booking app (state the relationships)',
  p('FitBook is a new mobile app for a gym chain. The BPE team proposed this TO-BE workflow.')
  + ol([
    'A member logs into the FitBook app and requests a class slot.',
    'FitBook retrieves the slots still open from the Class Scheduling System (CSS) through its web service.',
    'The member picks a slot. FitBook asks the Payment Gateway (PG), through its web service, to charge the member\'s card.',
    'FitBook sends the member a confirmation email.',
    'On the day, a gym staff member opens the day\'s bookings on FitBook to see who is attending.',
    'The member attends the class (a physical activity).'])
  + p('Identify the use cases from the TO-BE workflow and draw the **Use Case Diagram**. **State the relationships** between the actors and the use cases, and state your assumptions. (12 marks)'),
  ucSvg({
    boundaries: [
      { title: 'FitBook', ucs: [{ id: 'a1', label: 'Request Class Slot' }, { id: 'a2', label: 'Retrieve Open Slots' }, { id: 'a3', label: 'Request Card Payment' }, { id: 'a4', label: 'Send Confirmation Email' }, { id: 'a5', label: 'View Day Bookings' }] },
      { title: 'Class Scheduling System (CSS)', ucs: [{ id: 'b1', label: 'Provide Open Slots' }] },
      { title: 'Payment Gateway (PG)', ucs: [{ id: 'c1', label: 'Process Card Payment' }] }],
    left: [{ name: 'Member', to: ['a1', 'a4'] }, { name: 'Gym Staff', to: ['a5'] }],
    right: [{ name: 'CSS', to: ['a2'] }, { name: 'PG', to: ['a3'] }, { name: 'FitBook', to: ['b1', 'c1'] }],
    label: 'Use case diagram for FitBook',
  })
  + p('**Relationships (every line in the diagram).**')
  + table(['Actor', 'Associated with (use case)', 'Why'], [
    ['Member', 'Request Class Slot', 'Interactive: a human uses FitBook'],
    ['Member', 'Send Confirmation Email', 'The member is the one who is notified by the automated step'],
    ['Gym Staff', 'View Day Bookings', 'Interactive: staff use FitBook'],
    ['CSS (system)', 'Retrieve Open Slots', 'FitBook is the client; CSS is the actor it calls'],
    ['FitBook (system)', 'Provide Open Slots (in the CSS boundary)', 'The receiving half of the same hand-off: FitBook is the actor of CSS\'s use case'],
    ['PG (system)', 'Request Card Payment', 'FitBook is the client; PG is the actor it calls'],
    ['FitBook (system)', 'Process Card Payment (in the PG boundary)', 'The receiving half of the payment hand-off']])
  + note('**How the use cases were derived.** Steps 1 and 5 are interactive (a human uses the app): one use case each, linked to that human. Steps 2 and 3 are automated between two systems, so each gives **two** use cases, a sender in FitBook and a receiver in the other system. Step 4 is automated and notifies a person, so the member is its actor. Step 6 is manual, so it gets **no use case**. The email use case is separate from the payment ones: automated use cases are never combined. State as assumptions: the system boundary is drawn per system, actors are generic role names (Member, not “Jane”), and CSS and PG are external systems owned by someone else.'));

// ------------------------------------------------------------------ Q1b use case diagram: PharmaLink
const pharma = written(C('D2', 'USE CASE'), 'Use case diagram: pharmacy refills (two systems)',
  p('PharmaLink is a refill service for a hospital pharmacy. TO-BE workflow:')
  + ol([
    'The patient requests a refill on PharmaLink.',
    'PharmaLink sends a prescription check to the Hospital Records System (HRS), which answers with the prescription details.',
    'A pharmacist reviews the refill request on PharmaLink and approves it.',
    'The pharmacist packs the medicine (no system involved).',
    'PharmaLink sends the patient an SMS that the refill is ready.',
    'The patient collects the medicine at the counter from the pharmacist.'])
  + p('Draw the **Use Case Diagram** for this TO-BE workflow and state the relationships. (10 marks)'),
  ucSvg({
    boundaries: [
      { title: 'PharmaLink', ucs: [{ id: 'a1', label: 'Request Refill' }, { id: 'a2', label: 'Check Prescription' }, { id: 'a3', label: 'Review and Approve Refill' }, { id: 'a4', label: 'Send Ready SMS' }] },
      { title: 'Hospital Records System (HRS)', ucs: [{ id: 'b1', label: 'Provide Prescription Details' }] }],
    left: [{ name: 'Patient', to: ['a1', 'a4'] }, { name: 'Pharmacist', to: ['a3'] }],
    right: [{ name: 'HRS', to: ['a2'] }, { name: 'PharmaLink', to: ['b1'] }],
    label: 'Use case diagram for PharmaLink',
  })
  + table(['Step', 'Type', 'Result'], [
    ['1 Request a refill', 'Interactive (patient + PharmaLink)', 'Request Refill, Patient'],
    ['2 Prescription check', 'Automated, two systems', 'Check Prescription (PharmaLink, actor HRS) and Provide Prescription Details (HRS, actor PharmaLink)'],
    ['3 Review and approve', 'Interactive (pharmacist + PharmaLink)', 'Review and Approve Refill, Pharmacist'],
    ['4 Pack medicine', 'Manual', '**No use case**'],
    ['5 SMS to patient', 'Automated, notifies a person', 'Send Ready SMS, Patient'],
    ['6 Collect medicine', 'Manual', '**No use case**']])
  + note('Relationships: Patient — Request Refill, Patient — Send Ready SMS, Pharmacist — Review and Approve Refill, HRS — Check Prescription, PharmaLink — Provide Prescription Details. Hand-offs between systems always come as a pair, one use case per system boundary.'));

// ------------------------------------------------------------------ Q2 C4 context diagrams for two systems
const c4a = c4Svg({
  w: 860, h: 380, label: 'C4 context diagram for CampusEats',
  nodes: [
    { id: 'st', x: 16, y: 40, w: 160, h: 86, kind: 'person', name: 'Student', type: 'Person', desc: 'Browses menus and orders food' },
    { id: 'ow', x: 16, y: 250, w: 160, h: 86, kind: 'person', name: 'Stall Owner', type: 'Person', desc: 'Receives orders and updates menus' },
    { id: 'ce', x: 340, y: 140, w: 190, h: 110, kind: 'sys', name: 'CampusEats', type: 'Software System', desc: 'Lets students order from campus stalls' },
    { id: 'pg', x: 690, y: 16, w: 160, h: 90, kind: 'ext', name: 'PayNow Gateway', type: 'External System', desc: 'Processes payments' },
    { id: 'pn', x: 690, y: 146, w: 160, h: 90, kind: 'ext', name: 'Push Service', type: 'External System', desc: 'Delivers alerts to phones' },
    { id: 'sso', x: 690, y: 276, w: 160, h: 90, kind: 'ext', name: 'University SSO', type: 'External System', desc: 'Signs students in' },
  ],
  edges: [
    { a: 'st', b: 'ce', label: 'Places orders [HTTPS]', dy: -14 }, { a: 'ow', b: 'ce', label: 'Receives orders, updates menu [HTTPS]', dy: 14 },
    { a: 'ce', b: 'pg', label: 'Requests payment [HTTPS/REST]', dx: -6 }, { a: 'ce', b: 'pn', label: 'Sends order-ready alerts [HTTPS/REST]' },
    { a: 'ce', b: 'sso', label: 'Verifies student login [OAuth 2.0]', dx: -6 }],
});
const c4b = c4Svg({
  w: 860, h: 380, label: 'C4 context diagram for ClinicQ',
  nodes: [
    { id: 'pa', x: 16, y: 16, w: 160, h: 86, kind: 'person', name: 'Patient', type: 'Person', desc: 'Joins the queue and waits to be called' },
    { id: 're', x: 16, y: 150, w: 160, h: 86, kind: 'person', name: 'Receptionist', type: 'Person', desc: 'Registers patients' },
    { id: 'do', x: 16, y: 284, w: 160, h: 86, kind: 'person', name: 'Doctor', type: 'Person', desc: 'Calls the next patient' },
    { id: 'cq', x: 340, y: 140, w: 190, h: 110, kind: 'sys', name: 'ClinicQ', type: 'Software System', desc: 'Manages the clinic queue' },
    { id: 'em', x: 690, y: 60, w: 160, h: 90, kind: 'ext', name: 'Hospital EMR', type: 'External System', desc: 'Holds patient records' },
    { id: 'sm', x: 690, y: 240, w: 160, h: 90, kind: 'ext', name: 'SMS Gateway', type: 'External System', desc: 'Sends text messages' },
  ],
  edges: [
    { a: 'pa', b: 'cq', label: 'Gets a queue number [HTTPS]', dy: -16 }, { a: 're', b: 'cq', label: 'Registers patients [HTTPS]' }, { a: 'do', b: 'cq', label: 'Calls next patient [HTTPS]', dy: 16 },
    { a: 'cq', b: 'em', label: 'Reads patient record [HTTPS/REST]', dx: -4 }, { a: 'cq', b: 'sm', label: 'Sends “your turn” SMS [HTTPS/REST]', dx: -4 }],
});
const c4 = written(C('D3', 'C4 CONTEXT'), 'C4 context diagrams for two different systems',
  p('The university and a clinic each commission a new system. Draw a **C4 context diagram** for **each** system and **label what each box is**. (12 marks)')
  + p('**System 1: CampusEats.** Students order food from campus stalls with the CampusEats app and pay through the PayNow Gateway. Stall owners receive the orders and update their menus. Students sign in with the University SSO. CampusEats sends an “order ready” alert through an external Push Service.')
  + p('**System 2: ClinicQ.** Patients get a queue number. The receptionist registers each patient, and ClinicQ reads the patient\'s record from the Hospital EMR. The doctor calls the next patient on ClinicQ. When a patient\'s turn is near, ClinicQ sends a text through an external SMS Gateway.'),
  p('**System 1.**') + c4a + p('**System 2.**') + c4b
  + note('**Marking points.** The system in scope is **one box** and nothing is drawn inside it (no database, no app, no screens). People and the external systems you do not own sit around it. **Every box carries its name, its type in brackets and a one-line description** (Person, Software System, External System). **Every arrow is labelled** with what flows and the protocol. Two systems means two separate diagrams, each with its own users and its own external systems.'));

// ------------------------------------------------------------------ Q3a resource model + RCA
const ub = written(C('D4', 'RESOURCE MODEL + RCA'), 'Resource model and root cause analysis: UrbanBank personal loans',
  p('UrbanBank offers personal loans. A customer visits a branch and fills in a paper application form. The Branch Officer types the form details into the Loan Origination System (LOS). The LOS is slow and its screens are hard to navigate, so entry takes a long time and typing mistakes are common. The Branch Officer then emails a scan of the form to the Credit Analyst, who logs into the external Credit Bureau System (CBS) to check the customer\'s credit score. Only after that does the Credit Analyst start the fraud check in the Fraud Screening System (FSS), although the two checks do not depend on each other. The Credit Analyst works out the debt-to-income ratio by hand in a spreadsheet and emails the Risk Manager for approval. The Risk Manager receives more than 100 emails a day and often misses the request, so approvals can wait for days. If the loan is rejected the Branch Officer phones the customer. If it is approved the Branch Officer prints the loan agreement, and because the regulator requires a wet-ink signature the customer must come back to the branch to sign it. The Branch Officer then updates the LOS and the Finance Officer pays out the loan through the bank\'s Core Banking System.')
  + p('**(a)** Draw the **Resource Model** (humans and technology, internal and external). (4 marks)')
  + p('**(b)** Identify **four** issues and complete the table: Issue, Cause, Root cause, Issue category, Recommendation. (8 marks)'),
  p('**(a) Resource model.** Internal means UrbanBank manages it. Only resources that take part in the process belong in the model.')
  + table(['', 'Internal', 'External'], [
    ['**Human**', 'Branch Officer, Credit Analyst, Risk Manager, Finance Officer', 'Customer'],
    ['**Technology**', 'Loan Origination System (LOS), Fraud Screening System (FSS), Core Banking System', 'Credit Bureau System (CBS)']])
  + p('The spreadsheet is a personal tool and email is only the hand-off channel, so neither is drawn as a resource. The regulator takes no part in the workflow.')
  + p('**(b) Root cause analysis** (any four well-argued rows score; more are shown here).')
  + table(['#', 'Issue', 'Cause', 'Root cause', 'Category', 'Recommendation'], [
    ['1', 'Typing mistakes when the application is captured', 'The officer re-types a paper form into the LOS', 'Paper-based process', 'Process', 'Customer fills an online form that feeds the LOS directly'],
    ['2', 'Data entry takes a long time', 'LOS is slow and the screens are hard to navigate', 'Lack of system functionality (poor user interface)', 'System', 'Improve the LOS screens and search, or replace the module'],
    ['3', 'Approvals wait for days', 'The Risk Manager misses the approval email among 100+ a day', 'No automatic notification (approval by email)', 'Process (People if framed as workload)', 'LOS creates an approval task and alerts the Risk Manager'],
    ['4', 'Total processing time is longer than needed', 'The fraud check starts only after the credit check', 'Inadequate activity flow: independent activities done in sequence', 'Process', 'Run the credit check and the fraud check in parallel'],
    ['5', 'Extra effort and calculation errors', 'The Credit Analyst works out the debt-to-income ratio by hand', 'Lack of automation', 'Process', 'LOS calculates the ratio automatically from the captured data'],
    ['6', 'Customer must make a second branch visit', 'The regulator requires a wet-ink signature', 'Government / regulatory policy', 'Policy', 'Work with the regulator to accept e-signatures (high benefit, very hard to achieve)']])
  + note('**Method.** Read the scenario for clues: “slow and hard to navigate” → system functionality; “types / re-types” → paper-based or lack of integration; “often misses the email” → no auto-notification; “do not depend on each other” but run in sequence → activity flow; “the regulator requires” → policy. The root cause is the deeper reason and is never a restatement of the issue. No impact level was asked for here; if a template does include an Impact column, rate each issue from 5 (very high) to 1 (very low).'));

// ------------------------------------------------------------------ Q3b workflow drawing
const wf1 = written(C('D5', 'WORKFLOW'), 'Workflow model drawing: UrbanBank TO-BE loan process',
  p('After the review, UrbanBank adopts the TO-BE process below. Draw the **Workflow Model** (swimlanes, systems attached to activities, labelled gateways, process ends). No advanced notation is needed. (10 marks)')
  + ol([
    'The customer submits the loan application on the Loan Portal (LP).',
    'LP validates the application automatically. If it is incomplete LP emails the customer the errors and the process ends.',
    'If it is valid, LP at the same time gets the credit score from the Credit Bureau System (CBS) and runs the fraud screening in the Fraud Screening System (FSS), both through web services.',
    'When both are done, LP calculates the debt-to-income ratio automatically and creates an approval task.',
    'The Risk Manager reviews the case in LP and approves or rejects it.',
    'If it is rejected LP emails the customer and the process ends.',
    'If it is approved LP generates the loan agreement and notifies the customer and the Branch Officer.',
    'The customer signs the agreement in person with the Branch Officer at the branch.',
    'The Branch Officer uploads the signed agreement in LP.',
    'LP instructs the Core Banking System (CBS-Core) to pay out the loan and notifies the customer. The process ends.']),
  swim(`flowchart LR
    subgraph L1["Customer"]
        S(["Needs a loan"])
        A1["Submit loan application (LP)"]
        E1(["Process end"])
        A9["Sign agreement in person (manual)"]
        E3(["Loan paid out"])
    end
    subgraph L2["Loan Portal (system)"]
        G1{"Valid?"}
        A2["Validate application"]
        A3["Email customer the errors"]
        P1(("AND split"))
        A4["Get credit score (CBS)"]
        A5["Run fraud screening (FSS)"]
        P2(("AND join"))
        A6["Calculate debt-to-income ratio and create approval task"]
        A10["Generate loan agreement and notify customer and officer"]
        A11["Pay out loan (Core Banking System)"]
        A12["Notify customer"]
        A13["Email rejection to customer"]
        E2(["Process end"])
    end
    subgraph L3["Risk Manager"]
        A7["Review case (LP)"]
        G2{"Approved?"}
    end
    subgraph L4["Branch Officer"]
        A8["Upload signed agreement (LP)"]
    end
    S --> A1 --> A2 --> G1
    G1 -->|Incomplete| A3 --> E1
    G1 -->|Valid| P1
    P1 --> A4 --> P2
    P1 --> A5 --> P2
    P2 --> A6 --> A7 --> G2
    G2 -->|Rejected| A13 --> E2
    G2 -->|Approved| A10 --> A9 --> A8 --> A11 --> A12 --> E3`)
  + note('**Checklist.** Each activity is in the lane of the participant who does it. The Loan Portal gets a lane because it performs automated activities; CBS, FSS and the Core Banking System are attached to the activity that uses them (they never get a lane, and a system never makes a decision). Every gateway exit is labelled, and the rejection path and the incomplete-application path each reach an end. The credit and fraud checks are independent, so they sit between an AND split and an AND join. Signing is manual, so no system is attached to it.'));

const wf2 = written(C('D6', 'WORKFLOW'), 'Workflow model drawing: online store returns',
  p('Draw the **Workflow Model** for this returns process of an online fashion store. The Web Store (WS) is the store\'s system. (8 marks)')
  + ol([
    'The customer requests a return on the Web Store.',
    'WS checks automatically whether the item is within 14 days of delivery. If not, WS emails a rejection and the process ends.',
    'If it is eligible, WS emails the customer a return label.',
    'The customer posts the item back (manual).',
    'A warehouse staff member inspects the item and records the result on WS: **resalable**, **damaged** or **worn**.',
    'Resalable: WS refunds the full amount through the Payment Gateway (PG). Damaged: WS refunds half. Worn: WS emails a rejection.',
    'After a refund, WS emails the customer a refund receipt and the process ends.']),
  swim(`flowchart LR
    subgraph L1["Customer"]
        S(["Wants to return an item"])
        A1["Request return (WS)"]
        A4["Post the item back (manual)"]
        E1(["Process end"])
    end
    subgraph L2["Web Store (system)"]
        A2["Check 14-day window"]
        G1{"Within 14 days?"}
        A3["Email rejection"]
        A3b["Email return label"]
        G2{"Inspection result?"}
        A6["Refund full amount (Payment Gateway)"]
        A7["Refund half the amount (Payment Gateway)"]
        A8["Email rejection (worn item)"]
        M1(("merge"))
        A9["Email refund receipt"]
        E2(["Process end"])
        E3(["Process end"])
    end
    subgraph L3["Warehouse Staff"]
        A5["Inspect item and record result (WS)"]
    end
    S --> A1 --> A2 --> G1
    G1 -->|No| A3 --> E1
    G1 -->|Yes| A3b --> A4 --> A5 --> G2
    G2 -->|Resalable| A6 --> M1
    G2 -->|Damaged| A7 --> M1
    G2 -->|Worn| A8 --> E3
    M1 --> A9 --> E2`)
  + note('A three-way decision is drawn as **one** gateway with three labelled exits. The two refund paths rejoin at a merge before the receipt. “Post the item back” is manual and the inspection is interactive (a human records it in a system). Payment Gateway is attached to the refund activities, not drawn as a lane.'));

export const designMock = {
  title: 'Part 1 · Design questions (35 marks)', grp: 'Predicted Questions', ico: '✏️',
  sub: 'The real paper has three design questions on pen and paper: a use case diagram, C4 context diagrams for two systems, and a resource model with root cause analysis plus a workflow drawing. Draw each answer on paper first, then open the model answer and compare line by line.',
  html: section('Use case diagram (state the relationships)', [fit, pharma]) + section('C4 context diagram', [c4]) + section('Resource model, root cause analysis and workflow drawing', [ub, wf1, wf2]),
};
