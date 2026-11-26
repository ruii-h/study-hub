// Module 4 practice questions (Modelling Exercises). Every stem carries its own scenario, so nothing depends on remembering the slides.
import { H } from './pq-past.mjs';
const T = (t, why) => [t, true, why];
const F = (t, why) => [t, false, why];

const EXPENSE = 'An employee scans receipts, fills in the Expense Report Form and emails both to the Office Administrator. The Office Administrator checks that they match (if not, emails a rejection and the process ends), looks up the manager\'s email in the Workday Cloud System, and emails the manager for approval (if the manager rejects, the employee is told and the process ends). If approved, the Office Administrator prints the documents and gives them to the Financial Officer, who sends a pay order to the employee\'s bank account through the external Bank System.';
const BOOK = 'A faculty member emails a book reservation request. The school admin fills in the reservation form and emails it to the librarian, who checks availability in the library management system (LMS, which is slow and hard to search). If the book is available, the librarian reserves it in the LMS and emails the admin, and the admin updates the faculty. If not, the librarian prepares quotations and sends requests to publishers (found manually), which starts a separate finance approval process; the librarian then updates the admin, and the admin informs the faculty.';

export const hard4 = [
  H(`${EXPENSE}\n\nYou are drawing the resource model. Which statements are correct?`, [
    T('The Workday Cloud System is an external technology resource', 'External means the company does not control or operate it. A third-party cloud service is external even though the company uses it.'),
    T('The Office Administrator and the Financial Officer are internal human resources', 'They are people working inside the organisation.'),
    F('The Bank System is an internal technology resource because the company uses it to pay', 'The bank owns and runs it, so it is external. Using a system does not make it internal.'),
    F('Email is a technology resource that needs its own lane', 'Email is the channel for hand-offs between lanes. It is not drawn as a system, and you state that as an assumption.'),
  ], 'Classify each resource by who controls it and whether it is a person or a system.'),
  H(`${EXPENSE}\n\nYou are drawing the process workflow model. Which statements are correct?`, [
    T('There are four lanes: Employee, Office Administrator, Manager and Financial Officer', 'A lane is the participant who performs the activity, and each of these four performs at least one step.'),
    T('There are three end events: mismatch rejection, manager rejection and expenses paid', 'Each distinct outcome ends the process in its own way.'),
    F('The Workday Cloud System gets its own lane because the process uses it', 'Systems never get a lane. The Workday Cloud System is attached to the step that uses it.'),
    F('The Manager sends the pay order after approving', 'The Financial Officer sends the pay order. The Manager only approves or rejects.'),
  ], 'Lane = who performs the activity; one end event per outcome; systems are attached, not lanes.'),
  H(`${BOOK}\n\nYou are drawing the process workflow model. Which statements are correct?`, [
    T('The lanes are Faculty, Admin and Librarian', 'These are the participants who perform activities.'),
    T('There are two end events: one when the book is reserved and one after the faculty is informed of the quotation outcome', 'There is one end per outcome, and the available and unavailable branches finish differently.'),
    F('The finance approval is drawn step by step inside this model', 'The scenario only starts a separate finance approval process. Show it as a trigger of another process and state that assumption.'),
    T('The slow, hard-to-search LMS is an issue worth stating', 'It is a real weakness of the current process that the later analysis can pick up.'),
  ], 'Model the participants and outcomes from the scenario, and state the issues you can see.'),
  H(`${EXPENSE}\n\nYour solution leaves out the receipts and forms and treats email as a channel. Which statements about assumptions are correct?`, [
    T('Leaving out work products such as the receipts and the form keeps the diagram readable, and you should say so', 'Work products are not required in the solution diagram, but the choice should be stated.'),
    T('Treating email as a hand-off channel rather than a system is an assumption to write down', 'Stating it explains why email is not in the resource model or attached to the steps.'),
    F('No assumptions are needed once the diagram has the right lanes', 'The task asks you to state all assumptions clearly, because the scenario leaves some choices open.'),
    T('The Workday Cloud System is external even though the company pays for it', 'External depends on who controls it, not on who pays. Writing this down avoids confusion.'),
  ], 'Write down every modelling choice the scenario leaves open.'),
  H(`A student asks a GenAI tool for BPMN XML of the expense report process below.\n\n${EXPENSE}\n\nThe file opens in Signavio, but it shows a lane called "Bank System", a gateway "All matches?" with only a "Yes" exit, and one end event shared by every outcome. Which actions are appropriate?`, [
    T('Move the payment step into the Financial Officer lane and attach the Bank System to it', 'Systems never get a lane. The lane is the person who performs the step.'),
    T('Add a "No" exit from the gateway that leads to the mismatch rejection and its own end event', 'Every gateway needs labelled exits and every path an end event.'),
    F('Accept the model because it opened without errors', 'Opening only shows the file is valid. It must still match the scenario, and this one breaks the lane and end event rules.'),
    T('Improve the prompt: name the four lanes, state the notation rules and the three outcomes, then generate again', 'A clearer prompt gives a better draft. Expect several attempts.'),
  ], 'GenAI gives a draft. You still check lanes, gateways, end events and systems yourself.'),
];

export const quiz4 = [
  { q: 'In the SMU book reservation scenario, the librarian starts a finance approval when the book is unavailable. How does the solution show it?', o: ['As a full sub-flow inside the Librarian lane', 'As a separate Finance lane', 'As a separate process that is only triggered (not drawn)', 'It is not mentioned at all'], c: 2, e: 'Finance approval is a separate process. The model only shows that it starts, and you state that as an assumption.', w: ['The official solution does not draw it step by step.', 'No Finance participant performs activities in this model.', null, 'The scenario states it, so it is acknowledged.'] },
  { q: 'In the expense report, the Office Administrator looks up the manager\'s email in the Workday Cloud System. How is Workday shown in the workflow model?', o: ['As its own lane', 'Attached to the search step that uses it', 'Only in the organisation model', 'It is left out completely'], c: 1, e: 'A system never decides, so it is attached to the activity that uses it rather than given a lane. It also appears in the resource model as an external technology resource.', w: ['Only participants who perform activities get lanes.', null, 'The organisation model shows roles, not systems.', 'It is shown, either as an annotation or association.'] },
];
