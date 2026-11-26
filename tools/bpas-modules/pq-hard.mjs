// Scenario-style select-all questions per module (M1..M12 = n 1..12, review = 13).
import { H } from './pq-past.mjs';
const T = (t, why) => [t, true, why];
const F = (t, why) => [t, false, why];

export const hard = {
  1: [
    H('A bakery chain describes itself with the four dimensions of business language (Purpose, Product, Participants, Process). Which items sit under the correct dimension?', [
      T('"Make fresh bread affordable in every neighbourhood" is Purpose', 'Purpose answers Why? and includes the mission, vision and strategic goals.'),
      T('Customers, bakers and delivery partners are Participants', 'Participants answers Who? and covers everyone involved, including partners.'),
      T('Sourdough loaves and an online ordering service are Product', 'Product answers What? and can be goods, a service or a hybrid, including digital services.'),
      F('The steps for taking and packing a pre-order are Product', 'Steps of work are the Process (How?), not the Product.'),
    ], 'Purpose = Why, Product = What, Participants = Who, Process = How.'),
    H('A bank wants its IT investments to support the strategy of the whole organisation, and also wants one new loan system to support the loan process being redesigned. Which statements are correct?', [
      T('Aligning IT investments with the bank’s overall strategy is enterprise-level alignment', 'Enterprise alignment covers the whole organisation.'),
      T('Checking that the new loan system supports the redesigned loan process is project-level alignment', 'Project alignment concerns one project and its processes.'),
      F('Enterprise alignment is delivered through the Business Process Engineering Methodology', 'That methodology delivers project alignment. Enterprise alignment is delivered through Enterprise Architecture.'),
      F('Project alignment covers the whole organisation', 'It covers only the scope of one project.'),
    ], 'Enterprise alignment: whole organisation (Enterprise Architecture). Project alignment: one project (Business Process Engineering Methodology).'),
    H('A hospital writes three statements. (1) "We provide emergency and specialist care to the northern region." (2) "To be the region’s most trusted hospital." (3) "Cut average emergency waiting time to 30 minutes by December." Which classifications are correct?', [
      T('Statement 1 is a mission', 'A mission describes what the organisation does now.'),
      T('Statement 2 is a vision', 'A vision describes the future the organisation aspires to.'),
      T('Statement 3 is a business objective', 'An objective is measurable and time-bound.'),
      F('A vision should be written as a measurable, time-bound target', 'That describes an objective. A vision is an aspiration.'),
    ], 'Mission = now, vision = future aspiration, objective = measurable and time-bound.'),
    H('A university starts the Discover phase for improving course registration. Which approaches are appropriate?', [
      T('List the processes in scope and the stakeholders', 'Discover outputs include the list of in-scope processes.'),
      T('Observe staff and interview them when the documentation is incomplete', 'Observing and interviewing makes up for missing documentation.'),
      F('Model every process in full detail before moving on', 'Discover is deliberately shallow. Detailed modelling comes later.'),
      F('Run simulations of the To-Be alternatives', 'Simulation belongs to the Analyse chapter.'),
    ], 'Discover understands the current state and sets context. It stays shallow.'),
    H('A team has just finished As-Is BPMN models of its onboarding process. Which statements correctly describe what follows in the course journey?', [
      T('Analyse produces issues and recommendations', 'Analysis finds what is wrong and what to do about it.'),
      T('Solve specifies the IT functional and non-functional requirements and a concept solution blueprint', 'Solve turns the To-Be design into requirements and a blueprint.'),
      T('Innovate is the last chapter and extends the To-Be design with new ideas', 'Innovation comes after the process is understood.'),
      F('Solve comes before Analyse', 'Solutions are specified for problems that analysis has found, so Analyse comes first.'),
    ], 'The order is Model, Analyse, Solve, Innovate.'),
  ],
  2: [
    H('A clinic’s "Patient registration" is a business process. Which statements describe it correctly?', [
      T('It is started by a business event such as a patient arriving or booking', 'Processes are initiated by one or more business events.'),
      T('It uses resources such as the receptionist and the registration system to turn inputs into outputs', 'Processes transform inputs into outputs using resources.'),
      T('It has performance indicators such as the time taken to register a patient', 'Processes have measurable objectives and indicators.'),
      F('It is a one-off series of activities done once', 'A process is repeatable.'),
    ], 'A business process is a repeatable series of activities with events, resources and measures.'),
    H('A manager organises what she knows about a retail business under the six questions. Which placements are correct?', [
      T('The online store and physical outlets answer Where?', 'Where? covers location, online or face-to-face.'),
      T('Products, raw materials and customer data answer What?', 'What? covers raw materials, data and products.'),
      T('The staff and systems doing the work answer Who?', 'Who? covers people and systems.'),
      F('Business rules and business events answer How?', 'Time, business rules and business events sit under When?.'),
    ], 'Who, What, Where, When, How, Why.'),
    H('A project team must decide which model to build to answer questions about a hospital. Which matches are correct?', [
      T('"Who reports to the Head of Nursing?" is answered by the Organisation Model', 'It shows roles and reporting structures.'),
      T('"Which clinics are in which buildings and countries?" is answered by the Location Model', 'It shows where stakeholders and activities are located.'),
      T('"Which staff and systems take part in the process?" is answered by the Resource Model', 'It lists the resources that participate.'),
      F('"In what order do the steps happen?" is answered by the Organisation Model', 'Order of steps is the Process Workflow Model.'),
    ], 'Choose the model by the question it answers.'),
    H('A hospital team builds the Organisation Model for its discharge process. Which statements are correct?', [
      T('It shows roles and reporting structures', 'That is the purpose of the model.'),
      T('A Process Role, such as Bed Coordinator, may not appear on the formal org chart', 'Process roles exist for the process, not necessarily in the hierarchy.'),
      T('It helps decide access control for the IT solution', 'Roles determine who may see and do what.'),
      F('A Functional Role exists only for the length of one workflow', 'A Functional Role is a standing role in the organisation. A Process Role is tied to a process.'),
    ], 'Organisation Model = roles and who reports to whom.'),
    H('A hospital group plans to roll out one system across clinics in several countries. Which statements about the Location Model are correct?', [
      T('It informs decisions on where the IT solution is deployed', 'Where people work affects deployment.'),
      T('It helps identify location-specific needs such as language', 'Each place may need different languages or rules.'),
      T('It shows how stakeholders are distributed across physical locations', 'That is its core content.'),
      F('It shows the sequence of activities in the process', 'Sequence is the Process Workflow Model.'),
    ], 'The Location Model answers Where?'),
  ],
  3: [
    H('A pharmacy’s order process uses: a pharmacist employed by the company, a rented cloud inventory system from a vendor, the company’s own dispensing robot, and a driver from a courier firm. Which classifications are correct?', [
      T('The pharmacist is an internal human resource', 'An employee of the company.'),
      T('The rented cloud inventory system is an external technology resource', 'It belongs to a third party.'),
      T('The dispensing robot is an internal technology resource', 'The company owns and runs it.'),
      F('The courier’s driver is an internal human resource', 'The driver works for another firm, so is external.'),
    ], 'Internal/external depends on who the resource belongs to. Human/technology depends on what it is.'),
    H('In a bank’s loan process: the customer fills in an application on a web form; the system checks the credit score automatically; a clerk reviews the application on screen and approves it; a courier hand-delivers the signed contract. Which activity types are correct?', [
      T('Filling in the web form is interactive', 'A human uses a system.'),
      T('The credit score check is automated', 'The system does it alone.'),
      F('The clerk reviewing on screen is manual', 'The clerk uses a system, so it is interactive.'),
      T('The courier delivering the contract is manual', 'A human does it without a system.'),
    ], 'Manual = human alone, interactive = human with a system, automated = system alone.'),
    H('Which BPMN symbol or arrow suits each situation?', [
      T('Approved or rejected, exactly one path: a diamond with X', 'Exclusive gateway.'),
      T('Two activities that must start together: a diamond with a plus', 'Parallel gateway.'),
      T('An invoice produced by an activity: a dashed arrow from the activity to the work product', 'Dashed arrows link a work product to an activity.'),
      F('The hand-off to the next activity in the same lane: a dashed arrow', 'The transition is a solid arrow.'),
    ], 'Diamond X = choose one, diamond + = all in parallel, solid arrow = sequence, dashed arrow = work product.'),
    H('An airline writes business rules for check-in. Which statements are correct?', [
      T('"IF baggage weight is over 23 kg THEN charge an excess baggage fee" is a valid rule', 'Rules follow IF … THEN.'),
      T('Rules are written in plain natural language', 'Anyone in the business must be able to read them.'),
      T('A rule may attach to a manual activity as well as an automated one', 'Rules attach to activities, whoever performs them.'),
      F('Rules attach only to decision gateways', 'They attach to activities, not gateways.'),
    ], 'Business rules: plain language, IF … THEN, attached to activities.'),
    H('A BA draws swimlanes for an order process with Customer, Sales, Warehouse and a Courier Company. The Customer only receives an invoice and performs no activity. Which statements are correct?', [
      T('A stakeholder needs an actual activity to earn a lane', 'Lanes belong to participants who do something.'),
      T('The Customer gets no lane in this process', 'Receiving a document is not an activity.'),
      T('A change of lane in the diagram is a hand-off between roles', 'The work passes from one participant to another.'),
      F('A lane represents the tools used', 'A lane groups the activities of one business participant.'),
    ], 'A swimlane = one participant who performs at least one activity.'),
    H('At a first decision, 70% of cases go to path A. At a second decision on path A, 50% go on to path A1, where task T sits. T takes 10 minutes. Which statements are correct?', [
      T('The input factor of T is 35%', '0.7 × 0.5 = 0.35. Nested branches multiply.'),
      T('Branch percentages multiply along a nested path', 'The joint probability is a product.'),
      T('T adds 3.5 minutes to the average cycle time', '10 × 35% = 3.5 minutes.'),
      F('The input factor of T is 120%', 'Adding 70% and 50% is wrong. A probability cannot exceed 100%.'),
    ], 'Multiply probabilities along the path to get the input factor.'),
  ],
  4: [
    H('In the expense report scenario (an employee submits expenses, the Workday Cloud System records them, the Office Administrator and Bank System are involved), which resource classifications are justified?', [
      T('The Workday Cloud System is an external technology resource', 'It is a third-party cloud system.'),
      F('The Bank System is an internal technology resource', 'The bank is an outside party, so its system is external.'),
      T('The Office Administrator is an internal human resource', 'An employee of the organisation.'),
      T('The Employee is an internal human resource', 'An employee of the organisation.'),
    ], 'Classify each resource by who owns it and whether it is a person or a system.'),
    H('A team models the expense report workflow. Which statements about a good solution are justified?', [
      T('Work products (documents) may be left out of the solution diagram', 'The official solution leaves them out.'),
      T('Each distinct outcome, such as approved or rejected, has its own end event', 'Every path must finish.'),
      F('The Manager lane is where the employee is paid', 'Paying the employee is not a Manager activity in the official solution.'),
      F('The mismatch rejection path leads back to the Financial Officer', 'The official solution does not route it that way.'),
    ], 'Keep the diagram clear: every path ends, and the right participant does each activity.'),
    H('For the SMU book reservation exercise, which statements are justified?', [
      T('The lanes are Faculty, Admin and Librarian', 'These are the participants who perform activities.'),
      F('The finance approval is drawn as a full sub-flow in the official solution', 'It is shown at a high level.'),
      T('The solution has more than one end event', 'There is one end per outcome.'),
      T('The LMS being slow and hard to search is an issue worth stating', 'It is a real issue with the current process.'),
    ], 'Model the participants and outcomes from the scenario, and state the issues you can see.'),
    H('A student uses GenAI to draft a BPMN model for the book reservation process. Which statements show good practice?', [
      T('Import the output into a modelling tool to check that it opens', 'A file that does not open is not a usable model.'),
      F('The model is correct if it opens without errors', 'Opening is not the same as correct. Check it against the scenario.'),
      T('Improve the prompt to improve the model', 'Clearer prompts give better models.'),
      T('Each gateway still needs labelled exits and each path an end event', 'Check the structure yourself.'),
    ], 'GenAI helps with drafts. You must still check the model.'),
  ],
  5: [
    H('A hospital wants to understand why discharge takes long. It has As-Is models and interview notes but no time to run experiments. Which statements about its choice are correct?', [
      T('Static analysis examines the process without executing it', 'It uses documents and models that already exist.'),
      F('Static analysis can show waiting and queuing', 'Nothing runs, so waiting and randomness are invisible.'),
      T('Dynamic analysis can run a simulation with real or assumed data', 'It executes a model of the process.'),
      T('Static analysis is cheap and immediate', 'It uses information the team already has.'),
    ], 'Static = no execution, no waiting. Dynamic = simulation.'),
    H('A team writes an RCI Model for the issue "orders wait too long at packing". Which statements are correct?', [
      T('The root cause is the underlying reason, not a restatement of the issue', '"Orders wait" is the issue. A root cause explains why.'),
      T('It includes an Issue Category column', 'The categories are process, system, people and policy.'),
      T('It includes the Business Performance Metrics affected', 'These show how the issue is measured.'),
      F('The root cause is the first effect that someone observes', 'The first effect observed is the symptom (the issue).'),
    ], 'The RCI Model links an issue to its causes, root causes, category, metrics and impact.'),
    H('A team has two recommendations. Fix A: impact 5, complexity 5. Fix B: impact 2, complexity 1. Which statements about the RCR Model are correct?', [
      T('Impact 5 means Very High', 'A higher impact is better.'),
      T('Complexity 5 means Very Easy', 'The complexity scale is reversed. 1 is Very Complex.'),
      T('Fix A is the better first choice', 'It has high impact and is easy.'),
      F('Complexity 5 means Very Complex', 'It is the opposite.'),
    ], 'RCR turns the RCI into prioritised recommendations. High impact and easy to do go first.'),
    H('At the SUBWAY example, Veggie Artists have a total annual workload of 1,460 hours. Each Veggie Artist works 720 hours a year, and 3 are available. Which statements are correct?', [
      T('Required resources = annual workload ÷ annual hours per resource, about 2.03', '1,460 ÷ 720 ≈ 2.03.'),
      T('Utilisation = required resources ÷ resources available, about 68%', '2.03 ÷ 3 ≈ 68%.'),
      F('The static report shows the average waiting time of each customer', 'A static report cannot show waiting time.'),
      T('Annual workload per task = time in hours × instances per year', 'For example, 0.75 ÷ 60 × 43,800 = 547.5 hours.'),
    ], 'Workload → required resources → utilisation.'),
    H('Task X takes 10 minutes and has an input factor of 30%. Task Y takes 4 minutes and has an input factor of 100%. Which statements are correct?', [
      T('X adds 3 minutes to the average cycle time and Y adds 4 minutes', 'Each task time is multiplied by its input factor.'),
      T('The average cycle time is 7 minutes', '3 + 4 = 7.'),
      T('At $30 per hour, X costs $1.50 per instance on average', '10 ÷ 60 × 30 × 0.3 = $1.50.'),
      F('X contributes more because its execution time is longer', 'It is rarely executed, so it contributes less than Y.'),
    ], 'Weight each task by its probability of being executed.'),
  ],
  6: [
    H('A hospital applies the phases of dynamic analysis to its discharge process. Which activities belong to the right phase?', [
      T('Setting the target "average waiting time of at most 10 minutes" is Phase 1', 'Phase 1 establishes performance goals.'),
      T('Running the simulation for the As-Is and each To-Be alternative is Phase 2', 'Phase 2 produces numbers for each alternative.'),
      T('Finding who is affected by each alternative is Phase 3', 'Phase 3 analyses impact on internal and external parties.'),
      F('Establishing performance goals is the last phase', 'Goals come first.'),
    ], 'Goals, model and simulate, impact, then final selection.'),
    H('A hospital collects data for its simulation. Which classifications are correct?', [
      T('30% of patients go to the laboratory after consultation: decision points', 'It is the probability of a path.'),
      T('The number and hourly cost of nurses: resource-related', 'Resource data covers the cost and number of resources per role.'),
      T('How a queue of waiting patients is handled: activity-related', 'It describes how an activity works.'),
      F('The pattern of patient arrivals: resource-related', 'Arrival patterns are process-wide data.'),
    ], 'Four data types: process-wide, activity-related, decision points, resource-related.'),
    H('Which analysis technique suits each question?', [
      T('"Which route is slow or costly?" suits path analysis', 'It examines the paths created by decision points.'),
      T('"Does adding a packer meet our waiting-time goal?" suits what-if analysis', 'It tests different scenarios.'),
      T('"Where does work queue for a scarce resource?" suits bottleneck analysis', 'It combines process, resource and activity analysis.'),
      F('"How much does each activity cost?" suits capacity analysis', 'Capacity analysis finds the maximum the resources can handle.'),
    ], 'Pick the technique by the question.'),
    H('An insurer’s claims go 70% through automatic assessment, 25% through manual assessment and 5% to fraud investigation. Which statements are correct?', [
      T('Paths should be ranked by expected contribution: share of cases × value', 'This weighs how often and how much.'),
      F('The most frequent path must always be improved first', 'Frequency alone does not decide priority.'),
      T('In what-if analysis, find the smallest option that meets the goal, then price it', 'That gives the cheapest option that works.'),
      F('The option with the lowest waiting time always wins', 'It may cost too much or have a large impact.'),
    ], 'Weigh frequency with cost and outcome. Meet the goal at the lowest cost.'),
    H('A team compares To-Be alternatives for final selection. Which statements are correct?', [
      T('A large impact on staff or partners can rule out an otherwise good alternative', 'Impact can outweigh performance.'),
      F('Simulation always reflects reality perfectly', 'It is only as good as its data and assumptions.'),
      T('The final selection draws on goals, simulation results, impact and management decisions', 'All four inform the choice.'),
      T('Impact is judged as hard or soft and as internal or external', 'These are the dimensions of impact.'),
    ], 'Choose using goals, numbers, impact and management judgement.'),
  ],
  7: [
    H('In the bed management case, a hospital’s Admissions Officer (AO) searches the Bed Availability System (BAS) and emails ward requests. Which data classifications are correct?', [
      T('The number of bed requests per day: process-wide', 'It describes the whole process.'),
      T('The time to check availability in the BAS: activity-related', 'It is the time of one activity.'),
      T('The resubmission rate of unsuccessful requests: decision points', 'It is the probability of a path.'),
      F('Ward utilisation: activity-related', 'It is the use of a resource, so it is resource-related.'),
    ], 'Classify each number by what it describes.'),
    H('A study of bed management finds that "Search bed availability" waits 55 minutes on average and "Email bed request" is the second longest delay. Which statements are justified?', [
      T('Average delay duration is the time an activity waits for its resource', 'It measures waiting, not working time.'),
      T('Search bed availability is the longest delay, so it is a bottleneck candidate', 'It has the largest wait.'),
      F('The activity with the longest execution time is automatically the bottleneck', 'A bottleneck is where work waits for a scarce resource.'),
      F('Email bed request has the shortest delay', 'It is the second longest.'),
    ], 'Look at waiting, not just working time, to find bottlenecks.'),
    H('Which statements about the bed management RCI Model are justified?', [
      T('Issue 1 has root causes in the process, system and policy categories', 'One issue can have several categories.'),
      F('The "2 (Ibid.)" row is a new third issue', '"Ibid." means the same issue as the row above, so it continues Issue 2.'),
      T('The stakeholder column replaces the impact-level column in this template', 'This exercise uses a stakeholder column.'),
      T('Lack of system functionality is a root cause of Issue 2', 'The BAS lacks functions the AO needs.'),
    ], 'Read the RCI row by row: issue, cause, root cause, category.'),
    H('Which statements about the To-Be options for bed management are justified?', [
      T('Letting the AO access the BAS directly has internal impact', 'It changes work inside the hospital.'),
      T('Replacing the BAS with a shared cloud system has external impact on partner hospitals', 'Partner hospitals would use the shared system.'),
      T('Replacing the BAS could displace the staff who maintain it', 'Their work would change.'),
      F('The shared cloud option has no impact on BAS users', 'Those users must change how they work.'),
    ], 'Judge each option by internal and external impact.'),
  ],
  8: [
    H('A hospital builds a patient portal. Which requirements are classified correctly?', [
      T('"Patients must be able to cancel an appointment" is functional', 'It states what the system does.'),
      T('"Pages must load within two seconds" is non-functional', 'It states performance.'),
      T('"Patient records must be encrypted" is non-functional', 'It states security.'),
      F('"The portal must be available 99.9% of the time" is functional', 'Availability is a quality, so non-functional.'),
    ], 'Functional = what. Non-functional = how well.'),
    H('A library system is used by members, librarians, "Mrs Tan" and an external payment gateway. Which statements about actors and use cases are correct?', [
      T('An actor is a generic role such as Member, not a person’s name such as Mrs Tan', 'Actors are roles.'),
      T('A use case is a verb–noun phrase such as Reserve Book', 'That is the naming convention.'),
      T('The external payment gateway can be an actor', 'External systems can be actors.'),
      F('A use case is drawn as a stick figure', 'Actors are stick figures. Use cases are ovals.'),
    ], 'Actors are roles. Use cases are actions drawn as ovals.'),
    H('A workflow has: the customer submits a request online (interactive), the system automatically sends it to an external system, and a clerk files a paper copy by hand. Which statements are correct?', [
      T('The interactive activity becomes a use case for the customer actor', 'A human uses the system.'),
      T('The manual filing becomes no use case', 'It touches no system.'),
      T('The automated system-to-system call gives a client/server pair of use cases', 'One use case on each system.'),
      F('The automated use cases should be combined into one', 'Each system has its own use case.'),
    ], 'Derive use cases from interactive and automated activities only.'),
    H('An online bookstore groups its use cases into packages. Which statements are correct?', [
      T('Login and Reset Password can form an Authentication package', 'They serve the same purpose.'),
      T('Use cases of different systems should not share a package', 'A package belongs to one system.'),
      T('Integration use cases are typically grouped in an Integration package', 'Interfaces to other systems form their own package.'),
      F('A package needs no name', 'Every package has a name.'),
    ], 'Group related use cases of one system and name the package.'),
    H('Which statements about the Function Model are correct?', [
      T('It records the change type, system ownership and technical notes of each use case', 'That is its content.'),
      T('It organises use cases by system and functional area', 'That is its structure.'),
      T('A use case the system already has and will keep unchanged is Existing/Unchanged', 'No change is needed.'),
      F('New means the system already supports the use case', 'New means the system does not yet support it.'),
    ], 'Change types: Existing/Unchanged, To-be Modified, New, To-be Removed.'),
  ],
  9: [
    H('A team starts a Concept Solution Blueprint. Which statements are correct?', [
      T('Its framework has three steps: Architecture, Risk and Cost modelling', 'That is the course framework.'),
      T('It gives an initial high-level view of the end-to-end solution', 'That is its purpose.'),
      T('It does not commit to technical implementation details at this stage', 'It is conceptual.'),
      F('It fixes the operating system and the vendor', 'Technology choices come later.'),
    ], 'The concept blueprint is high level and conceptual.'),
    H('Which C4 diagram suits each need?', [
      T('Who uses the system and which external systems it talks to: Context', 'It shows the system as a single box with users and neighbours.'),
      T('The applications and data stores inside the system: Container', 'A container is an application or data store.'),
      T('Context and Container diagrams are recommended for most teams', 'They give the most value.'),
      F('The Code diagram is recommended for every team', 'Only if it adds value.'),
    ], 'C4 has four levels: Context, Container, Component, Code.'),
    H('A project team builds a risk model. Which statements are correct?', [
      T('Reduction lowers the probability or the impact of an adverse event', 'It does not remove the risk.'),
      T('Transfer shifts the risk to another party, for example through insurance', 'Another party carries the risk.'),
      F('Acceptance means shifting the risk to others', 'Acceptance means living with the outcome.'),
      T('Rating A is the highest rating', 'Impact and likelihood combine into A, B or C.'),
    ], 'Strategies: acceptance, reduction, transfer, elimination.'),
    H('A team prepares a concept cost model. Which statements are correct?', [
      T('It is qualitative', 'It rates costs instead of giving amounts.'),
      T('It rates fixed cost, maintenance cost and total cost', 'Those are its columns.'),
      F('It is filled with dollar estimates', 'It uses ratings, not dollars.'),
      F('It is built before the architecture model', 'It follows the architecture model.'),
    ], 'The cost model rates costs at concept level.'),
  ],
  10: [
    H('Uber changed how a taxi service works. Which statements about the Magic Triangle are correct?', [
      T('What? corresponds to the value proposition', 'What is offered.'),
      T('How? corresponds to the value chain', 'How it is delivered.'),
      T('Who? is at the centre', 'The customer sits at the centre.'),
      F('Value? corresponds to the value proposition', 'Value? is the revenue model.'),
    ], 'What, How, Value around Who in the centre.'),
    H('A bank makes three changes. Which classifications are correct?', [
      T('A new credit card with new benefits changes only What?: product innovation', 'Only one corner changes.'),
      T('Redesigning loan approval to be faster changes only How?: process innovation', 'Only the value chain changes.'),
      T('Moving from branch fees to a subscription platform for new customers changes several corners: business model innovation', 'Two or more corners change.'),
      F('Process innovation changes Who? only', 'It changes How?.'),
    ], 'One corner = product or process innovation. Two or more = business model innovation.'),
    H('Which statements about creativity, invention and innovation are correct?', [
      T('Innovation is the commercialisation of an invention', 'It brings the invention to the market.'),
      F('Innovation comes before invention', 'The invention comes first.'),
      T('Invention creates something new using scientific skills', 'That is invention.'),
      F('Creativity does not need to be useful', 'Creativity concerns novel and useful ideas.'),
    ], 'Creativity → invention → innovation.'),
    H('A company can tune its order process step by step or reengineer it from scratch. Which statements are correct?', [
      T('Radical innovation is riskier than incremental improvement', 'It changes more.'),
      T('Radical innovation can raise value by 50%, 100% or more', 'That is the potential.'),
      T('Process reengineering is a traditional term for radical innovation', 'It redesigns the process from scratch.'),
      F('Radical innovation needs less cultural change', 'It needs more.'),
    ], 'Incremental = small steps, low risk. Radical = large change, high risk, high reward.'),
  ],
  11: [
    H('A bank’s operations use: a bot that clicks through legacy screens, a rule-based workflow on structured data, AI that reads documents inside the workflow, and an agent that picks its own path within policies. Which statements are correct?', [
      T('RPA interacts through the application’s user interface', 'It imitates a user.'),
      T('Traditional digital automation works on structured data with explicit rules', 'The rules are fixed in advance.'),
      T('Intelligent automation embeds AI in workflows', 'AI handles unstructured work.'),
      F('Agentic automation removes the human role entirely', 'It works within goals, policies and constraints set by people.'),
    ], 'The spectrum runs from RPA to digital, intelligent and agentic automation.'),
    H('A factory uses IoT sensors and a digital twin. Which statements are correct?', [
      T('At the Monitor level, a human observes information displayed from the device', 'It is the least automated level.'),
      T('An IoT device can be modelled as a technology participant with its own lane', 'It performs activities.'),
      T('A digital twin is updated using real-world data', 'It mirrors the real asset.'),
      F('A digital twin is a static image of an asset', 'It is a living model.'),
    ], 'IoT senses and acts. A digital twin mirrors.'),
    H('In an IoT BPMN model, which statements about tasks are correct?', [
      T('A service task is a control system calling a device or service', 'The system calls the device.'),
      T('A user task is a human using a software application', 'A human is involved.'),
      T('A script task is an IoT device’s own hardware function', 'The device does it itself.'),
      F('A timer start event ends the process', 'A start event starts it.'),
    ], 'Match the task type to who does the work.'),
    H('A city plans an IoT rollout. Which statements are correct?', [
      T('Compatibility between devices is a named challenge', 'Devices and standards differ.'),
      T('The smart device or sensor layer is the lowest layer of the architecture', 'It senses the world.'),
      F('The application layer is the lowest layer', 'The lowest layer is the smart device or sensor layer.'),
      F('Five challenges are named', 'The slides name four groups: security, privacy, connectivity and compatibility.'),
    ], 'Know the layers and the challenges.'),
  ],
  12: [
    H('A retailer sorts its processes. Which classifications are correct?', [
      T('Customer order fulfilment, whose output external customers receive, is a core process', 'Core processes produce what external customers get.'),
      T('Payroll, whose output is an input to core processes, is a supporting process', 'Supporting processes feed the core.'),
      T('Strategic planning, which gives directions, rules and best practices, is a management process', 'Management processes direct the others.'),
      F('A management process is also called a value chain', 'A value chain is a different concept: the activities that create value for a product.'),
    ], 'Three types: core, supporting, management.'),
    H('Which statements about value chains are correct?', [
      T('A value chain includes the activities to design, produce, market, deliver and support a product', 'That is its scope.'),
      T('Organisations typically support 3 to 15 value chains', 'That is the usual range.'),
      T('The course shows two notations for drawing value chains', 'Two notations are shown.'),
      F('Value is the cost of production', 'Value is what the customer is willing to pay for.'),
    ], 'A value chain is the chain of activities that creates value.'),
    H('Which statements about the Process Executive and Hierarchy models are correct?', [
      T('The Process Executive Model shows functional units as columns', 'It maps processes to units.'),
      T('The Process Hierarchy Model starts from a level-3 process', 'It breaks a process down.'),
      T('A process bar spanning several columns means several functional units are involved', 'The process crosses units.'),
      F('The Process Hierarchy Model shows functional units as columns', 'That is the Executive Model.'),
    ], 'Executive = who. Hierarchy = how it breaks down.'),
    H('A company picks an industry reference framework. Which statements are correct?', [
      T('SCOR is for supply chain management', 'That is its focus.'),
      T('The APQC Process Classification Framework is cross-industry', 'It spans industries.'),
      T('eTOM is for telecoms', 'It is telecom-specific.'),
      F('eTOM is cross-industry', 'It is for telecoms.'),
    ], 'Pick the framework for your industry, or APQC across industries.'),
  ],
  13: [
    H('A consultant must choose a model for each question. Which matches are correct?', [
      T('"Who reports to whom?" needs the Organisation Model', 'Structure and reporting.'),
      T('"How is the discount decided?" needs the Business Rules Model', 'Decision logic.'),
      T('"In what order do the steps happen between people?" needs the Process Workflow Model', 'Sequence and interaction.'),
      F('"Where are the offices?" needs the Resource Model', 'Geography is the Location Model.'),
    ], 'Match the question to the model.'),
    H('A consultant must choose an analysis technique for each question. Which matches are correct?', [
      T('"Does waiting or randomness matter?" needs dynamic analysis', 'Only simulation shows these.'),
      T('"Which fix should we do first?" is answered by the RCR Model', 'It prioritises recommendations.'),
      T('"How many staff do we need to hit a goal?" needs dynamic analysis', 'It tests alternatives.'),
      F('"Where does work queue up?" is answered by a static report', 'A static report cannot show queues.'),
    ], 'Static = documents. Dynamic = simulation.'),
    H('Which statements avoid a common mistake?', [
      T('Business rules attach to activities, not gateways', 'That is where they apply.'),
      T('The longest task is not automatically the bottleneck', 'A bottleneck is where work waits.'),
      T('A static report does not show waiting', 'Nothing is executed.'),
      F('Complexity 5 means Very Complex', 'It means Very Easy.'),
    ], 'Watch the scales and what each model shows.'),
    H('When deriving use cases from a To-Be workflow, which statements are correct?', [
      T('Automated system-to-system activities give a client/server pair', 'Two use cases.'),
      T('Interactive activities give one use case for the human actor', 'One use case.'),
      F('Manual activities give a use case for the human actor', 'Manual activities give none.'),
      F('Automated activities sit in a human lane', 'They sit in a system lane.'),
    ], 'Activity type decides the use case.'),
  ],
};

/** warm-up questions that tested trivia (counts, which lane, which time standard): removed */
export const dropQuiz = { 2: [6], 3: [6, 8], 4: [0, 1], 6: [2], 12: [1] };
