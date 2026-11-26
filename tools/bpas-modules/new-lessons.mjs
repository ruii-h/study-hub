// Content for the two modules that had no chapter of their own: M4 (modelling exercises) and M7 (analysis exercises).
// Source: W03-M04 / W05-M07 student and solution slides, plus the course notes (BPAS.md).
export const enc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const k = (s) => `<strong class="k-c">${s}</strong>`;
export const p = (s) => `<p>${s}</p>`;
export const ul = (items) => `<ul class="t-rule-list">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
export const callout = (type, s) => `<div class="t-callout ${type}"><p>${s}</p></div>`;
export const figcap = (s) => `<p class="figcap">${s}</p>`;
export const h3 = (s) => `<h3 class="t-h3">${s}</h3>`;
export const swim = (src) => `<pre class="mermaid swim">${enc(src)}\n</pre>`;
export const table = (head, rows) => `<div class="t-table-wrap"><table class="t-mini-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<b>${c}</b>` : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const tableP = (head, rows) => `<div class="t-table-wrap"><table class="t-mini-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const section = (n, i, title, body) => `<div class="t-section reveal" id="s${n}-${i}"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${n}.${i}</span>${title}</div>${body}</div>`;

/* ---------------- Module 4 ---------------- */
export const m4 = {
  title: 'Modelling Exercises: Expense Report & Book Reservation',
  goal: 'Choose the right model for a written scenario and draw the organisation, resource and workflow models, stating your assumptions.',
  icon: '✏️', tag: 'blue',
  why: 'Reading a scenario and choosing the right model is the exam skill. These exercises show how a scenario turns into lanes, systems and end events.',
  hook: 'Roles → Organisation · Humans and systems → Resource · Steps and hand-offs → Workflow. Write your assumptions down.',
  glance: ['Read the scenario', 'Pick the model', 'Draw it', 'State assumptions'],
  sections: [
    ['Lab 2 Part 2: the StarMall workflow in Camunda Modeler', [
      p(`The lab asks you to ${k('develop the workflow model for the StarMall Rental Application Process using Camunda Modeler')}. The solution slides check five things, and each one is a separate notation element on the diagram:`),
      table(['Element', 'What the solution shows'], [
        ['Process trigger', 'A start event for the customer walk-in that starts the process.'],
        ['Usage of systems', 'The systems the activities use (for example IMS) are attached to those activities.'],
        ['Association', 'A system is linked to its activity with an association, not given a lane of its own.'],
        ['Execution time', 'Every task carries its time in minutes, taken from the timing table.'],
        ['Probability', 'Each exclusive gateway branch carries its percentage (75% / 25%, then 90% / 10%).'],
      ]),
      callout('info', `The finished diagram and its timing table are in Module 3 (the StarMall worked example). This lab is where you draw it with a tool.`),
    ]],
    ['Expense Report Process', [
      p(`${k('Scenario.')} An employee clears expenses through the Office Administrator. The steps in the scenario are:`),
      ul([
        'The employee collects all the receipts and creates scanned copies.',
        'The employee fills the Expense Report Form (a Word document) from the scanned receipts.',
        'The employee emails the form and the scanned receipts to the Office Administrator.',
        'The Office Administrator reviews both and checks that everything matches. If not, the administrator emails a mismatch rejection to the employee and the process ends.',
        'If all is good, the administrator uses the employee data to find the manager\'s email in the Workday Cloud System.',
        'The administrator emails the manager the reviewed form and receipts for approval.',
        'If the manager rejects, the administrator emails the employee about the rejection and the process ends.',
        'If the manager approves, the administrator prints the approval email, the form and the scanned receipts and submits them to the Financial Officer.',
        'The Financial Officer sends a pay order to the employee\'s bank account through the external Bank System and the process ends.',
      ]),
      p(`${k('Task.')} Draw the organisation model, the resource model and the process workflow model, and ${k('state all assumptions clearly')}.`),
      h3('Possible organisation model'),
      p(`A CEO at the top. ${k('Managers')} and ${k('Employees')} are ${k('group roles')} (many people share them). The ${k('Financial Officer')} and the ${k('Office Administrator')} are ${k('individual roles')}.`),
      `<pre class="mermaid">${enc(`flowchart TD
    CEO["CEO"] --> M["Managers (Group Role)"]
    CEO --> FO["Financial Officer (Individual Role)"]
    CEO --> OA["Office Administrator (Individual Role)"]
    M --> E["Employees (Group Role)"]`)}
</pre>`,
      h3('Possible resource model'),
      tableP(['', 'Human', 'Technology'], [
        ['<b>Internal</b>', 'Employee, Manager, Office Administrator, Financial Officer', '—'],
        ['<b>External</b>', '—', 'Workday Cloud System, Bank System'],
      ]),
      callout('success', `The Workday Cloud System is ${k('external')} even though the company pays for it: external means the company does not control or operate it.`),
      h3('Possible process workflow model'),
      swim(`flowchart LR
    subgraph L1["Employee"]
        Start(["Expenses to clear"])
        T1["Collect receipts and create scanned copies"]
        T2["Fill in Expense Report Form"]
        T3["Email form and scanned receipts to Office Administrator"]
    end
    subgraph L2["Office Administrator"]
        T4["Review receipts and form; validate they match"]
        G1{"All matches?"}
        T5["Email employee: mismatch rejection"]
        EndA(["Process end"])
        T6["Search manager's email (Workday Cloud System)"]
        T7["Email manager: reviewed form and receipts for approval"]
        T9["Email employee: manager rejection"]
        EndB(["Process end"])
        T10["Print approval email, form and receipts; submit to Financial Officer"]
    end
    subgraph L3["Manager"]
        T8["Approve or reject the expense"]
        G2{"Approved?"}
    end
    subgraph L4["Financial Officer"]
        T11["Send pay order to employee's bank account (Bank System)"]
        EndC(["Expenses paid"])
    end
    Start --> T1 --> T2 --> T3 --> T4 --> G1
    G1 -->|No| T5 --> EndA
    G1 -->|Yes| T6 --> T7 --> T8 --> G2
    G2 -->|Rejected| T9 --> EndB
    G2 -->|Approved| T10 --> T11 --> EndC`),
      figcap('Four lanes and three end events: mismatch rejection, manager rejection and expenses paid. The Workday Cloud System is attached to the search step and the Bank System to the payment step.'),
      callout('warn', `The official solution leaves out the ${k('work products')} (the receipts, the Expense Report Form and the printed approval email) to keep the diagram readable. It also does not draw email as a system: email is the hand-off channel between lanes, not a resource. Say so in your assumptions.`),
    ]],
    ['SMU Book Reservation Process', [
      p(`${k('Scenario.')} A faculty member needs a book for a course:`),
      ul([
        'The faculty submits a book reservation request through corporate email. It includes the book details (name, authors, year of publication) and the number of books.',
        'The school admin fills up the reservation form on the faculty\'s behalf and emails it to the librarian.',
        'The librarian checks the book availability in the library management system (LMS). The LMS is slow and its search function is hard to use.',
        'If the book is available, the librarian reserves it and assigns the faculty and course information in the LMS, then emails the admin the reservation details. The admin updates the faculty, who can share it with the class.',
        'If the book is unavailable, the librarian prepares book quotations and sends quotation requests to the relevant publishers. The publishers have to be found manually and a quotation form is prepared for each.',
        'A separate finance approval process starts. The librarian then updates the reservation status with the arrival details to the admin, and the admin informs the faculty.',
      ]),
      p(`${k('Task.')} Draw the process workflow model and state all assumptions clearly.`),
      swim(`flowchart LR
    subgraph L1["Faculty"]
        Start(["Book needed for a course"])
        T0["Submit book reservation request (corporate email)"]
    end
    subgraph L2["Admin"]
        T1["Fill in reservation form and email it to librarian"]
        T5["Update faculty on reservation details"]
        End1(["Process end"])
        T9["Inform faculty: reservation with arrival details"]
        End2(["Process end"])
    end
    subgraph L3["Librarian"]
        T2["Check book availability in LMS"]
        G1{"Book available?"}
        T3["Reserve book; assign faculty and course in LMS"]
        T4["Email admin: reservation details"]
        T6["Prepare quotations and send requests to publishers"]
        T7["Start finance approval process"]
        T8["Update admin: reservation status and arrival details"]
    end
    Start --> T0 --> T1 --> T2 --> G1
    G1 -->|Yes| T3 --> T4 --> T5 --> End1
    G1 -->|No| T6 --> T7 --> T8 --> T9 --> End2`),
      figcap('Three lanes (Faculty, Admin, Librarian) and two end events. The LMS is attached to the librarian\'s activities.'),
      callout('warn', `The scenario starts a separate finance approval process, but the official solution does not draw it. If you model it, show it as a trigger of another process and state that assumption. The reservation form and the quotations are work products and are left out of the solution too.`),
    ]],
    ['Explore GenAI: draw the workflow as BPMN XML', [
      p(`Activity 3 asks you to ${k('use a GenAI tool to generate the workflow models in XML format')}, ${k('import them into Signavio')} to see whether and how they open, and then ${k('improve the prompts')} to get better models. Expect to try several times.`),
      ul([
        `A model is only worth keeping if it follows the lane rule: the lane is the participant who performs the activity.`,
        `Check every gateway has labelled exits, every path reaches an end event, and systems are attached to activities instead of being drawn as lanes.`,
        `Name the lanes, give the scenario and the notation rules in the prompt, and ask for the diagram in BPMN 2.0 XML.`,
      ]),
      h3('Reading a small BPMN file: the library loan process'),
      p(`The module also supplies a short BPMN file for practice, ${k('library_loan_process.bpmn')}, with two lanes (Member and Librarian). Systems appear as text annotations on the activities, not as lanes, because a system never makes a decision.`),
      swim(`flowchart LR
    subgraph L1["Member"]
        Start(["Start loan process"])
        T1["Use terminal system to find book location"]
        T2["Walk to book location and pick book"]
        G1{"Self-checkout?"}
        T3["Use self-checkout kiosk to borrow book"]
        End1(["Loan process complete"])
        T4["Go to librarian counter to borrow book"]
    end
    subgraph L2["Librarian"]
        T5["Librarian processes book borrowing"]
        End2(["Loan process complete"])
    end
    Start --> T1 --> T2 --> G1
    G1 -->|Yes| T3 --> End1
    G1 -->|No| T4 --> T5 --> End2`),
      figcap('Annotations in the file name the systems: the terminal (book search) system, the self-checkout kiosk (library loan system) and the library loan system used by the librarian.'),
    ]],
    ['Modelling checklist', [
      ul([
        `${k('Choose the model first.')} Roles and reporting lines go in the organisation model, humans and systems in the resource model, steps and hand-offs in the workflow model.`,
        `${k('State every assumption')} (for example, email treated as a channel, work products left out, a separate process only triggered).`,
        `${k('Lane = who performs the activity.')} A hand-off is a change of lane.`,
        `${k('Internal means you manage it.')} External systems are drawn in the resource model but never get a lane.`,
        `${k('Count what the question asks for.')} Only decisions are decision boxes; merges are not.`,
      ]),
    ]],
  ],
  summary: [
    'The module practises choosing the right model for a written scenario and drawing it.',
    'Expense report: four lanes, three end events, Workday and the Bank System are external resources.',
    'Book reservation: three lanes and two end events; the finance approval is a separate process.',
    'GenAI can draft BPMN XML, but check lanes, gateways and end events and improve the prompt.',
    'Always state your assumptions clearly.',
  ],
  cards: [
    ['Expense report lanes', 'Employee, Office Administrator, Manager, Financial Officer.'],
    ['Why is the Workday Cloud System external?', 'The company does not control or operate it, even though it uses it.'],
    ['Book reservation lanes', 'Faculty, Admin, Librarian.'],
    ['Why leave out work products?', 'They keep the solution diagram readable; the official solution omits them and says so.'],
  ],
  bridge: 'Next: Analyse. Static analysis finds the issues and root causes in the As-Is models you just drew.',
  names: [
    ['Expense report process', 'Employee, Office Administrator, Manager and Financial Officer; three end events.', 'Workday Cloud System and Bank System are external resources.'],
    ['SMU book reservation', 'Faculty, Admin and Librarian; two end events.', 'The finance approval is a separate process.'],
    ['Work products', 'The documents that flow through a process (forms, receipts, quotations).', 'Left out of the official solution diagrams.'],
  ],
};

/* ---------------- Module 7 ---------------- */
export const m7 = {
  title: 'Analysis Exercises: Bed Management',
  goal: 'Practise static and dynamic analysis on one hospital process: RCI model, bottlenecks, data categories and impact analysis.',
  icon: '🛏️', tag: 'yellow',
  why: 'One process, five activities. Working them in order shows how an RCI model, a bottleneck table, simulation data and an impact analysis fit together.',
  hook: 'Issues → RCI. Waiting time → bottlenecks. Numbers to collect → five data categories. Change → internal or external impact.',
  glance: ['Complete the RCI', 'Find the bottlenecks', 'Categorise the data', 'Judge the impact'],
  sections: [
    ['The Bed Management process', [
      p(`${k('Scenario.')} A hospital manages beds through emails:`),
      ul([
        'The admissions officer (AO) emails a bed request to the bed manager (BM). It carries the patient profile (name, address, age, gender, condition, admitting doctor, expected length of stay) and the ward or class preference.',
        'The BM checks the bed availability in the ward using the Bed Administrative System (BAS). The BAS is slow and its search function is hard to use.',
        'If a bed of choice is available the BM reserves it and updates the allocation in the BAS, emails the staff in the allocated ward (to prepare for the patient) and emails the bed location to the AO.',
        'If it is unavailable the BM emails alternative bed and ward options to the AO.',
        'With a reserved bed the AO informs the patient of the location and triggers the financial counselling and payment advice activities, and the process ends.',
        'With alternatives the AO advises the patient on the other options and the process ends.',
        `${k('If the original bed request is unsuccessful, a new request must always be made afterwards')}, because availability may have changed in the meantime.`,
      ]),
      swim(`flowchart LR
    subgraph AO["Admissions Officer"]
        S(["New bed request"])
        A1["Email bed request"]
        A6["Inform bed location"]
        A7["Initiate financial advisory process"]
        E1(["Bed reserved"])
        A5["Advise bed options"]
        E2(["New bed request process trigger"])
    end
    subgraph BM["Bed Manager (uses the Bed Administrative System)"]
        B1["Search bed availability"]
        G{"Requested bed available?"}
        B2["Reserve bed and update bed allocation"]
        B3["Email staff in ward"]
        B4["Email bed location"]
        B5["Email bed options"]
    end
    S --> A1 --> B1 --> G
    G -->|Yes| B2 --> B3 --> B4 --> A6 --> A7 --> E1
    G -->|No| B5 --> A5 --> E2`),
      figcap('Two lanes, one system and a re-trigger on the unavailable path.'),
      callout('info', `The unavailable path ends with a ${k('new bed request process trigger')}. The retry is modelled as ending this instance and starting a new one, so every retry counts as a separate process instance in the statistics.`),
      p(`${k('Resource model.')} Humans, internal: Admissions Officer and Bed Manager. Technology: the Bed Administrative System, attached to the search activity. The patient appears in the text only, not as a lane.`),
    ]],
    ['Activity 1: complete the RCI model', [
      p(`The template uses a ${k('Stakeholder')} column in place of the impact level. Two issues are given: a long wait from the bed request to the patient being advised, and the time spent sending allocation emails.`),
      tableP(['#', 'Issue', 'Cause', 'Root cause', 'Category', 'Metric', 'Stakeholder'], [
        ['1', 'Long waiting time from the bed request until the patient is advised on availability', 'The AO must email the BM to make the request, which is complex and slow', 'Lack of automation', 'Process', 'Total process time', 'Admissions Officer'],
        ['1 (second cause)', 'Same issue', 'The BAS is slow because its search function is hard to use', 'Lack of system functionality', 'System', '# of bed requests processed', 'Admissions Officer'],
        ['1 (third cause)', 'Same issue', 'The AO cannot access the BAS directly because of department policy', 'Department policy', 'Policy', '# of customer complaints', 'Admissions Officer'],
        ['2', 'Sending emails on bed allocation notifications is time-consuming', 'The BAS lacks a feature to send notifications automatically', 'Lack of system functionality', 'System', 'Total process time', 'Bed Manager'],
      ]),
      callout('warn', `The last solution slide labels its row "2 (Ibid.)", but its text and stakeholder show it is a further cause of ${k('Issue 1')}, not a new issue.`),
      callout('success', `One issue can have several defensible root causes in different categories (here Process, System and Policy). The stakeholder column says who feels the problem.`),
    ]],
    ['Activity 2: bottleneck analysis', [
      p(`The data is the ${k('average delay duration')}: the time an activity spends waiting for its resource.`),
      table(['Activity', 'Average delay (min)', 'Rank'], [
        ['Search bed availability', '55', '1'], ['Email bed request', '45', '2'], ['Email staff in ward', '42', '3'],
        ['Reserve bed and update bed allocation', '33', '4'], ['Advise bed options', '21', '5'], ['Email bed location', '15', '6'],
        ['Email bed options', '14', '7'], ['Inform bed location', '12', '8'], ['Initiate financial advisory process', '10', '9'],
      ]),
      p(`${k('Official answer:')} two bottlenecks, each with a recommendation and the root cause it addresses.`),
      tableP(['#', 'Bottleneck', 'Recommendation', 'Related root cause'], [
        ['1', 'Search bed availability by the BM (55 min)', 'Improve the performance and usability of the BAS', 'Lack of system functionality'],
        ['2', 'Email bed request by the AO (45 min)', 'Implement a system for bed-request management for the AO', 'Lack of automation'],
        ['2 (alternative)', 'Email bed request by the AO (45 min)', 'Improve the performance and usability of the BAS', 'Lack of system functionality'],
        ['2 (alternative)', 'Email bed request by the AO (45 min)', 'Give the AO access to the BAS', 'Department policy'],
      ]),
      callout('info', `Why these two: if the delays simply add up along a path, the bed-available path waits 45 + 55 + 33 + 42 + 15 + 12 + 10 = 212 min and the unavailable path 45 + 55 + 14 + 21 = 135 min. The two bottlenecks account for 100 of 212 min (47%) and 100 of 135 min (74%).`),
      callout('success', `The third-longest delay (42 min, email staff in ward) is not in the official answer, but it is Issue 2 of the RCI model. A bottleneck table and an RCI model should agree.`),
    ]],
    ['Activity 3: categorise the data', [
      p('Each item an analyst could collect belongs to one of the simulation data categories:'),
      table(['Data item', 'Category', 'Tool field'], [
        ['Number of bed requests submitted (per AO over a period)', 'Process-wide', 'Signavio "Frequency (per year)"; BIMP "Total number of process instances"'],
        ['Time spent checking bed availability in the BAS', 'Activity-related', 'Signavio "Execution Time"; BIMP "Duration" under Tasks'],
        ['Bed request resubmission rate', 'Decision points', 'Signavio "Probability"; BIMP "Gateways"'],
        ['Resource utilisation rate (ward and bed capacity)', 'Resource-related', '—'],
        ['Patient profile data (name, age, gender, condition, doctor, ward preference)', 'Not applicable', 'Only useful if different patient types behave differently'],
      ]),
      p(`The resubmission rate is how often the availability decision goes the failing way, so it is a ${k('probability at a decision point')}. The time to check availability is the duration of one task. The number of requests is how often the process is triggered.`),
    ]],
    ['Activity 4: categorise with GenAI', [
      p(`The task is to ask a GenAI tool for the data an analyst could collect, using the same five categories, and then answer whether there is any difference from Activity 3. The sample answer lists:`),
      ul([
        `${k('Process-wide:')} process start time, end time, duration, outcome (fulfilled or alternatives) and process instance ID.`,
        `${k('Activity-related:')} email submission timestamp, BAS query time, bed reservation timestamp, email notification timestamps, patient notification time and activity completion status.`,
      ]),
      callout('info', `A fair comparison: Activity 3 listed derived metrics (rates, counts, utilisation), while GenAI listed raw event data (timestamps, IDs, statuses) from which those metrics are computed. Outcome and completion status are results to record, not simulation inputs like duration or probability.`),
    ]],
    ['Activity 5: impact analysis', [
      tableP(['Scenario', 'Description', 'Impact (official solution)'], [
        ['<b>To-Be 1</b>', 'Allow the AO to access the BAS directly', '<b>Internal</b>: affects department policy. The BM may feel a lack of control over the process and the AOs need training for the new duty.'],
        ['<b>To-Be 2</b>', 'Replace the BAS with a cloud-based hospital management system whose data is shared with partnering hospitals', '<b>Internal and external.</b> Internal: BAS users must learn the new system and its maintainers may manage it or face job displacement. External: the data sharing affects the partnering hospitals.'],
      ]),
      callout('success', `To-Be 1 is the cheap answer to the department-policy root cause. To-Be 2 answers lack of system functionality with a larger benefit, but its impact chain is far longer.`),
    ]],
  ],
  summary: [
    'Issue 1 of the bed process has three root causes in three categories: process, system and policy.',
    'The two bottlenecks are searching bed availability (55 min) and emailing the bed request (45 min).',
    'Resubmission rate is a decision-point probability; time checking the BAS is activity-related.',
    'To-Be 1 has internal impact only; To-Be 2 has internal and external impact.',
    'A failed request ends the instance and starts a new one.',
  ],
  cards: [
    ['Bed management bottlenecks', 'Search bed availability (55 min) and email bed request (45 min).'],
    ['Category of the resubmission rate', 'Decision points: a probability on the availability decision.'],
    ['Impact of replacing the BAS with a shared cloud system', 'Internal (users, maintainers) and external (partnering hospitals).'],
    ['What does "(Ibid.)" in the RCI solution mean?', 'It is another root cause of Issue 1, not a new issue.'],
  ],
  bridge: 'Next: Solve. The To-Be process becomes functional requirements, starting with the use case model.',
  names: [
    ['Average delay duration', 'The time an activity spends waiting for its resource.', 'The data used to rank bottlenecks.'],
    ['Bottleneck', 'An activity whose wait is among the longest on a path.', 'Each gets a recommendation and a related root cause.'],
    ['Stakeholder (RCI column)', 'Who feels the issue.', 'Replaces the impact-level column in this template.'],
  ],
};

/* ---------------- quiz questions for the two new modules ---------------- */
// hard: {q, o[5], a, e, w[5]} (select all that apply); quiz: {q, o[4], c, e, w[4]}
export const hardQ = {
  m4: [
    { q: 'In the expense report scenario, which statements about the resource model are justified?', o: ['The Workday Cloud System is an external technology resource.', 'The Bank System is an internal technology resource.', 'The Office Administrator is an internal human resource.', 'Email is drawn as a system in the official solution.', 'The Employee is an internal human resource.'], a: 'ACE', e: 'Humans in the company are internal; Workday and the Bank System are external; email is the hand-off channel and not a drawn resource.', w: ['True: The company uses it but does not control or operate it, so it is external.', 'False: The Bank System is external because the company does not control it.', 'True: The Office Administrator works for the company.', 'False: The official solution does not draw email as a system; it is the channel between lanes.', 'True: The employee works for the company.'] },
    { q: 'Which statements about the expense report workflow solution are justified?', o: ['It has four lanes.', 'It has three end events.', 'The Manager is the lane that pays the employee.', 'Work products are left out of the solution diagram.', 'The mismatch rejection path leads back to the Financial Officer.'], a: 'ABD', e: 'Four lanes, three ends, work products omitted; the Financial Officer pays, and the mismatch path simply ends.', w: ['True: Employee, Office Administrator, Manager and Financial Officer.', 'True: mismatch rejection, manager rejection and expenses paid.', 'False: the Financial Officer sends the pay order through the Bank System.', 'True: the receipts, the form and the printed approval email are not drawn.', 'False: after a mismatch rejection the process just ends.'] },
    { q: 'Which statements about the SMU book reservation exercise are justified?', o: ['The lanes are Faculty, Admin and Librarian.', 'The finance approval is drawn as a full sub-flow in the official solution.', 'The solution has two end events.', 'The LMS is slow and hard to search, which is an issue worth stating.', 'The librarian informs the faculty directly.'], a: 'ACD', e: 'Three lanes, two ends; the finance approval is a separate process that the solution does not draw; the admin informs the faculty.', w: ['True: the three participants.', 'False: the solution does not draw it; model it only as a trigger and state the assumption.', 'True: one end for the available path and one for the unavailable path.', 'True: the scenario states it, and it is a candidate issue for analysis.', 'False: the admin informs the faculty in both paths.'] },
    { q: 'Which statements about using GenAI to draft BPMN models are justified?', o: ['The output should be imported into a modelling tool to check that it opens.', 'A generated model is correct if it opens without errors.', 'Better prompts can improve the model.', 'Each gateway still needs labelled exits and each path an end event.', 'Systems should be drawn as lanes.'], a: 'ACD', e: 'Import it, improve the prompt, and check the structure by hand; systems are attached to activities.', w: ['True: Activity 3 asks you to import into Signavio to see how it looks.', 'False: it can open and still break the lane rule or leave paths without ends.', 'True: the activity asks whether you can improve the prompts.', 'True: these are basic checks on any workflow.', 'False: systems are attached to activities, not given lanes.'] },
  ],
  m7: [
    { q: 'Which statements about the bed management RCI model are justified?', o: ['Issue 1 has root causes in the process, system and policy categories.', 'The "2 (Ibid.)" row is a new, third issue.', 'The stakeholder column replaces the impact-level column in this template.', 'Lack of system functionality is a root cause of Issue 2.', 'Issue 2 is stakeholder Admissions Officer.'], a: 'ACD', e: 'Issue 1 has three causes; the Ibid. row belongs to Issue 1; Issue 2 is about the BAS and belongs to the Bed Manager.', w: ['True: lack of automation, lack of system functionality and department policy.', 'False: it repeats the description and is a further cause of Issue 1.', 'True: the template lists the stakeholder instead.', 'True: the BAS lacks a feature to send notifications automatically.', 'False: Issue 2 belongs to the Bed Manager.'] },
    { q: 'Which statements about the bed management bottleneck analysis are justified?', o: ['Search bed availability is the longest delay at 55 minutes.', 'Email bed request is the second longest delay.', 'The official answer names three bottlenecks.', 'Both official bottlenecks can have more than one related root cause.', 'Average delay duration is the time an activity waits for the resource.'], a: 'ABE', e: 'Two official bottlenecks, ranked by waiting time; the email request has alternative root causes.', w: ['True: 55 minutes.', 'True: 45 minutes.', 'False: the official answer names two bottlenecks.', 'False: only the email bed request has alternative root causes in the official answer.', 'True: that is how the slide defines it.'] },
    { q: 'Which classifications are justified for the bed management data?', o: ['Number of bed requests: process-wide.', 'Time checking availability in the BAS: activity-related.', 'Resubmission rate: decision points.', 'Ward utilisation: resource-related.', 'Patient profile data: always a simulation input.'], a: 'ABCD', e: 'The first four are categorised as shown; patient profile data is not applicable unless patient types behave differently.', w: ['True: how often the process is triggered.', 'True: the duration of one task.', 'True: a probability on the availability decision.', 'True: how busy the wards and beds are.', 'False: it is not applicable unless patient types behave differently.'] },
    { q: 'Which statements about the To-Be options for bed management are justified?', o: ['Letting the AO access the BAS has internal impact.', 'Replacing the BAS with a shared cloud system has external impact on partnering hospitals.', 'Replacing the BAS could displace its maintainers.', 'The first option answers the lack-of-system-functionality root cause.', 'The second option has no impact on BAS users.'], a: 'ABC', e: 'The direct-access option fixes the policy cause with internal impact; the cloud option affects users, maintainers and partners.', w: ['True: policy changes and training.', 'True: the shared data affects the partners.', 'True: the maintainers may manage the new system or face job displacement.', 'False: direct access answers the department-policy root cause.', 'False: BAS users must learn the new system.'] },
  ],
};
export const warmQ = {
  m4: [
    { q: 'How many lanes does the official expense report solution have?', o: ['Two', 'Three', 'Four', 'Five'], c: 2, e: 'Employee, Office Administrator, Manager and Financial Officer.', w: ['It has more lanes than that.', 'It has one more lane.', 'Four lanes.', 'It has fewer lanes.'] },
    { q: 'What does the official solution leave out of the workflow diagrams?', o: ['End events', 'Work products', 'Lanes', 'Gateways'], c: 1, e: 'Forms, receipts and quotations are not drawn.', w: ['The end events are drawn.', 'Work products are omitted, as the slide notes.', 'Lanes are the structure of the diagram.', 'Gateways are drawn.'] },
    { q: 'Which element in the book reservation scenario is a separate process?', o: ['Fill in the reservation form', 'Check availability in the LMS', 'Finance approval', 'Inform the faculty'], c: 2, e: 'The solution does not draw the finance approval.', w: ['This is a step in the process.', 'This is a step in the process.', 'It is started separately and is not drawn.', 'This is a step in the process.'] },
    { q: 'Where do systems go in a BPMN workflow model?', o: ['In their own lane', 'In the organisation model only', 'Attached to the activities that use them', 'They are never shown'], c: 2, e: 'A system never decides, so it is attached rather than given a lane.', w: ['Only participants who perform activities get lanes.', 'They also appear in the resource model.', 'They are shown with associations.', 'They are shown as annotations or associations.'] },
  ],
  m7: [
    { q: 'Which activity has the longest average delay in the bed management process?', o: ['Email bed request', 'Search bed availability', 'Email staff in ward', 'Reserve bed'], c: 1, e: 'It waits 55 minutes.', w: ['45 minutes, the second longest.', '55 minutes, the longest.', '42 minutes, the third longest.', '33 minutes.'] },
    { q: 'What happens when a bed request is unsuccessful?', o: ['The same instance loops back', 'The process ends and a new request process is triggered', 'The patient is discharged', 'The bed manager cancels the process'], c: 1, e: 'A new request is always made afterwards, as a new instance.', w: ['The loop is modelled as a new instance.', 'The end event is a new bed request process trigger.', 'Nothing in the scenario says this.', 'Nothing in the scenario says this.'] },
    { q: 'In the RCI template, which column replaces the impact level?', o: ['Category', 'Stakeholder', 'Metric', 'Cause'], c: 1, e: 'The template lists the stakeholder.', w: ['Category is a separate column.', 'The stakeholder column replaces it.', 'Metric is a separate column.', 'Cause is a separate column.'] },
    { q: 'The To-Be option that replaces the BAS with a shared cloud system has which impact?', o: ['Internal only', 'External only', 'Internal and external', 'None'], c: 2, e: 'Internal users and maintainers, and external partner hospitals.', w: ['Partner hospitals are external.', 'Staff are affected too.', 'Both groups are affected.', 'It is a large change.'] },
  ],
};
