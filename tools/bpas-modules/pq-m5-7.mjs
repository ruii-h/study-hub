// Context fixes for practice questions in M5, M6 and M7: every stem carries the numbers and the scenario it needs.
import { H } from './pq-past.mjs';
const T = (t, why) => [t, true, why];
const F = (t, why) => [t, false, why];

const BED = 'A hospital manages beds by email. The Admissions Officer (AO) emails a bed request to the Bed Manager (BM), who searches for a bed in the Bed Administrative System (BAS), which is slow and hard to search. If a bed is available, the BM reserves it, emails the ward staff and emails the bed location to the AO, who informs the patient and starts financial counselling. If not, the BM emails alternative bed options and the AO advises the patient. That instance then ends, and a new bed request has to be made later.';

export function patch(d) {
  // M5: SUBWAY workload with the tasks and numbers in the stem
  d.hard[5][3] = H('At SUBWAY, each sandwich needs three Veggie Artist tasks: take the list of toppings (0.5 min), fill in the toppings (1 min) and wrap the sandwich (0.5 min). The shop makes 43,800 sandwiches a year. Each Veggie Artist works 720 hours a year and 3 are available. Which statements are correct?', [
    T('The three tasks give an annual workload of 1,460 hours', '(0.5 + 1 + 0.5) min = 2 min per sandwich. 2 ÷ 60 × 43,800 = 1,460 hours.'),
    T('The required resources are about 2.03 Veggie Artists', 'Required resources = annual workload ÷ annual hours per resource = 1,460 ÷ 720 ≈ 2.03.'),
    T('The utilisation is about 68%', 'Utilisation = required resources ÷ resources available = 2.03 ÷ 3 ≈ 68%.'),
    F('A utilisation of 68% means each sandwich waits 32% of the time', 'Utilisation is the share of available working time used. A static report does not show waiting time.'),
  ], 'Workload = minutes ÷ 60 × instances per year; required resources = workload ÷ annual hours; utilisation = required ÷ available.');

  // M6: path analysis with numbers, plus a what-if question with data
  d.hard[6][3] = H('An insurer’s claims take three paths: 70% go through automatic assessment (average cost $20 per claim), 25% through manual assessment ($100) and 5% to fraud investigation ($800). Which statements are correct?', [
    T('The expected cost contributions are $14, $25 and $40 for the three paths', 'Share × cost: 0.70 × 20 = 14, 0.25 × 100 = 25, 0.05 × 800 = 40.'),
    T('The fraud investigation path adds the most to the average cost although only 5% of claims take it', '$40 is the largest contribution, so an infrequent path can still deserve attention.'),
    F('The automatic path should be improved first because it is the most frequent', 'Frequency alone does not decide. Rank paths by expected contribution (share × value).'),
    T('The three contributions add up to the average cost per claim of $79', '14 + 25 + 40 = 79.'),
  ], 'Expected contribution = share of cases × value of the path.');
  d.hard[6][5] = H('A bank tests how many tellers to staff. Simulation results: 2 tellers — 14.0 min average wait, $30 per customer; 3 tellers — 9.5 min, $36; 4 tellers — 8.9 min, $44; 5 tellers — 8.8 min, $55. The goals are an average wait of at most 10 minutes and an average cost of at most $50 per customer. Which conclusions are supported?', [
    T('3 tellers is the cheapest tested option that meets both goals', '9.5 min ≤ 10 and $36 ≤ $50. 2 tellers misses the wait goal.'),
    T('4 tellers also meets both goals, but gains only 0.6 min of waiting for $8 more per customer', '8.9 min and $44 both meet the goals, but the extra cost buys little.'),
    F('5 tellers meets both goals and is therefore the best choice', '$55 is above the $50 cost goal, so it fails.'),
    F('The option with the lowest waiting time always wins', 'The choice must satisfy all the goals. The lowest wait (5 tellers) breaks the cost goal.'),
  ], 'What-if analysis: find the smallest option that meets every goal, then ask whether more resources are worth the extra cost.');

  // M7: bed management, with the scenario and data in each stem
  d.hard[7] = [
    H(`${BED} Which data items are classified correctly for simulation?`, [
      T('The number of bed requests submitted per month is process-wide data', 'It is how often the process is triggered.'),
      T('The time the BM spends searching availability in the BAS is activity-related data', 'It is the duration of one task.'),
      T('The share of requests that are unsuccessful and must be resubmitted is decision-point data', 'It is the probability on one branch of the availability decision.'),
      F('The utilisation of ward and bed capacity is activity-related data', 'It describes a resource, so it is resource-related data.'),
    ], 'Process-wide = how often it starts; activity-related = time and resources per task; resource-related = cost, number and capacity; decision points = branch probabilities.'),
    H(`${BED} The average delay per activity (time spent waiting for its resource) is: search bed availability 55 min, email bed request 45, email staff in ward 42, reserve bed and update allocation 33, advise bed options 21, email bed location 15, email bed options 14, inform bed location 12, initiate financial advisory process 10. Which statements are correct?`, [
      T('Average delay duration is the time an activity spends waiting for its resource', 'It is the data used to rank bottlenecks.'),
      T('Search bed availability (55 min) and email bed request (45 min) are the two longest delays, so they are the bottlenecks', 'The two largest delays on the process are the bottleneck candidates.'),
      F('The bottlenecks should be ranked by execution time instead of delay', 'The task with the longest execution time is not automatically the bottleneck. Rank by average delay.'),
      T('On the bed-available path the delays total 212 min and the two bottlenecks account for 100 of them (47%)', '45 + 55 + 33 + 42 + 15 + 12 + 10 = 212, and 55 + 45 = 100.'),
    ], 'Rank activities by average delay. A bottleneck table and the RCI model should agree.'),
    H(`${BED} In the RCI model, Issue 1 is the long wait from the bed request until the patient is advised. Its causes are (a) the AO must email the BM, (b) the BAS is slow because its search is hard to use, and (c) the AO cannot access the BAS directly because of department policy. Issue 2 is that sending allocation emails is time-consuming, because the BAS cannot send notifications automatically; the BM does this work. Which statements are correct?`, [
      T('Cause (a) has the root cause "lack of automation" in the Process category', 'Making the request by email is a manual, slow process step.'),
      T('Cause (b) has the root cause "lack of system functionality" in the System category', 'The BAS search is slow and hard to use.'),
      F('Cause (c) is a System root cause because it concerns the BAS', 'The AO is blocked by a department policy, so the category is Policy.'),
      F('For Issue 2 the stakeholder is the Admissions Officer', 'The Bed Manager sends the allocation emails, so the Bed Manager feels the problem. The Stakeholder column replaces the impact level in this template.'),
    ], 'One issue can have several root causes in different categories. The stakeholder is who feels the issue.'),
    H(`${BED} The hospital considers two To-Be options. To-Be 1: let the AO access the BAS directly. To-Be 2: replace the BAS with a cloud-based hospital management system whose data is shared with partnering hospitals. Which statements about their impact are correct?`, [
      T('To-Be 1 has an internal impact only', 'It changes department policy, the BM may feel a loss of control, and the AOs need training.'),
      T('To-Be 2 has an external impact on the partnering hospitals', 'The shared data affects other organisations.'),
      T('To-Be 2 also has an internal impact: BAS users must learn the new system and its maintainers may face job displacement', 'Internal impact covers the people inside the hospital.'),
      F('To-Be 1 has an external impact on the partnering hospitals', 'Only To-Be 2 shares data with partners.'),
    ], 'Internal impact falls on the organisation’s own people and policies; external impact falls on partners, customers or suppliers.'),
    H(`${BED} If the requested bed is unavailable, the process ends with the AO advising the patient on other options, and a new request is made afterwards. Which statements about modelling and measuring this are correct?`, [
      T('The retry is modelled as ending this instance and triggering a new bed request process', 'The unavailable path ends with a "new bed request process trigger".'),
      T('Every retry counts as a separate process instance in the statistics', 'Each new request is a new instance, which affects the process-wide frequency.'),
      F('The retry is a loop back to the start of the same instance', 'Looping back would hide the retries inside one instance.'),
      T('The chance that the requested bed is unavailable is decision-point data', 'It is the probability on the "bed available?" gateway.'),
    ], 'A re-trigger starts a new instance. Branch probabilities are decision-point data.'),
  ];
  d.quiz[7] = [
    { q: 'In the bed management process (the AO emails bed requests to the BM, who searches the slow BAS), which activity has the longest average delay?', o: ['Email bed request (45 min)', 'Search bed availability (55 min)', 'Email staff in ward (42 min)', 'Reserve bed and update allocation (33 min)'], c: 1, e: 'Search bed availability waits 55 minutes on average, the longest delay and rank 1.', w: ['It is second, at 45 min.', null, 'It is third, at 42 min.', 'It is fourth, at 33 min.'] },
    { q: 'In the bed management process, what happens when the requested bed is unavailable and the AO has advised the patient on alternatives?', o: ['The same instance loops back to the search', 'The process ends and a new bed request process is triggered', 'The patient is discharged', 'The BM cancels the hospital stay'], c: 1, e: 'The retry is modelled as ending this instance and starting a new one, so each retry is a separate process instance.', w: ['It does not loop within one instance.', null, 'Discharge is a different process.', 'The scenario has no cancellation.'] },
    { q: 'The bed management RCI template tracks who feels each issue. Which column takes the place of the usual impact level?', o: ['Category', 'Stakeholder', 'Metric', 'Cause'], c: 1, e: 'In this template the Stakeholder column replaces the impact level, for example Admissions Officer or Bed Manager.', w: ['Category is the issue category (Process, System, …).', null, 'Metrics are the business performance metrics.', 'The cause is the cause description.'] },
    { q: 'The hospital considers replacing the BAS with a cloud system whose data is shared with partnering hospitals. What kind of impact does this have?', o: ['Internal only', 'External only', 'Internal and external', 'None'], c: 2, e: 'Internally, BAS users must learn the new system and its maintainers may be displaced. Externally, the data sharing affects the partnering hospitals.', w: ['Partners are also affected.', 'Staff and users are also affected.', null, 'A system replacement always has an impact.'] },
  ];
}
