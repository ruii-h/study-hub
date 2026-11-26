// Slide content that the guide did not yet cover, appended as extra sections to M1, M10 and M11.
import { k, p, ul, callout, figcap, h3, swim, table, tableP } from './new-lessons.mjs';

export const m1Extra = [
  ['Learning Journey and BPAS After This Course', [
    p(`The course is taught as ${k('four main chapters')} (the four phases), spread over the term, and each phase uses the modules you are reading here:`),
    table(['Phase', 'Weeks', 'Modules', 'What you produce'], [
      ['Model', '1–3', 'M1–M4', 'As-Is business process models'],
      ['Analyse', '4–6', 'M5–M7', 'Issues, root causes, recommendations and the To-Be choice'],
      ['Solve', '7–9', 'M8–M9', 'Functional requirements and the concept solution blueprint'],
      ['Innovate', '10–13', 'M10–M12', 'Innovation ideas, technology options and the process architecture'],
    ]),
    p(`${k('BPAS after this course.')} The next courses build on this one:`),
    ul([
      `${k('IS213')} Enterprise Solution Development`,
      `${k('IS214')} Enterprise Solution Management`,
      `${k('IS215')} Digital Business Technologies and Transformation`,
      `${k('IS483')} IS Project Experience Applications`,
    ]),
    callout('info', `Digitalisation and digital transformation need a clear view of the problem space: ${k('why')} the transformation is required and ${k('what')} it entails. BPAS gives you the foundation for that analysis, so your digital solutions have clear business value.`),
  ]],
];

export const m10Extra = [
  ['Class Activities: Apple, Grab and Lulu.com', [
    h3('Activity 10.1: Apple and Grab'),
    p(`${k('Apple')} was the first computer company to include music distribution as a process. It linked distribution to the development of the iPod hardware and software and to a continued relationship with customers. The activity asks you to watch the video, create the ${k('Grab Business Model Canvas')}, and compare the traditional taxi model with the Grab model.`),
    p('The comparison table uses the four letters of the business model. Choose two or three key differences for each category:'),
    table(['Category', 'Question', 'Old (traditional taxi)', 'New (Grab)'], [
      ['A', 'What? Value proposition', 'To fill in', 'To fill in'],
      ['B', 'Who? Customer segment', 'To fill in', 'To fill in'],
      ['C', 'How? Business process', 'To fill in', 'To fill in'],
      ['D', 'Value? Revenue model', 'To fill in', 'To fill in'],
    ]),
    callout('info', `The slides give only the template for Grab. Fill it in with your own analysis and cite any LLM or web source you use.`),
    h3('Activity 10.2: Lulu.com'),
    p(`Analyse the models from ${k('Lulu.com')} with the same template. The slide answers:`),
    table(['Old', 'New'], [
      ['Broad content', 'Niche content'],
      ['Publishers control content', 'Authors control content'],
      ['Many copies published', 'Print on demand'],
    ]),
    p(`Its business model canvas reads, in the order of the four categories: ${k('platform for self-publishing services')} (what), ${k('niche authors')} (who), ${k('print on demand')} (how) and ${k('service fees')} (value).`),
    callout('success', `Lulu.com changes the value proposition, the customer, the process and the revenue model together, so it is ${k('business model innovation')}: more than two components change.`),
  ]],
];

const flower = '';
export const m11Extra = [
  ['The IoT Loop, the Digital Twin Cycle and Business Integration', [
    h3('The IoT loop in automation'),
    p(`A sensor observes a physical condition, for example temperature. Rules, analytics or AI then decide what to do. The result is either a ${k('physical action')}, where an actuator adjusts or controls equipment (for example turning on a sprinkler), or a ${k('digital action')}: update a system, send an alert or invoke a workflow.`),
    h3('The digital twin cycle'),
    p(`A digital twin runs a loop of ${k('Sense → Represent → Analyse → Act → Learn')}. IoT supplies the sensing and machine learning supplies the learning. The slides use a food production line, where sensor technologies and advanced data analytics show live readouts, and a healthcare twin as examples.`),
    h3('Why IoT must join the business process'),
    table(['Driver', 'What it means'], [
      ['Customer expectations', 'Customers buy directly from their devices (an Amazon Echo, a smartphone or a smart refrigerator) and expect faster deliveries and better service.'],
      ['Data', 'Consumers use more and more devices that record data. Use it for operations, marketing and product development.'],
      ['Business innovation', 'New product development, or upgrading existing products, services or processes, with optimised processes and new benefits for the customer.'],
    ]),
    h3('Challenges: the four groups'),
    ul([
      `${k('Security:')} software attacks exploit implementation weaknesses through the communication interface (for example hacking of pacemakers or the Ukraine power grid hack). Cryptanalysis attacks try to break the encryption and recover the plaintext (for example health data).`,
      `${k('Privacy')} of the data the devices collect.`,
      `${k('Connectivity:')} power, coverage, data rates, mobility, delay and wireless options; centralised servers may become bottlenecks.`,
      `${k('Compatibility:')} non-unified cloud services, no standard machine-to-machine protocols, and many different firmware and operating systems.`,
    ]),
  ]],
  ['Class Activities: Smart Irrigation and Smart Home', [
    h3('Activity 2: smart irrigation control'),
    p(`There are four participants: ${k('IoT Rainfall')}, ${k('IoT Flowmeter')}, ${k('IoT Irrigation')} and the ${k('Irrigation Control System')}. A timer in the rainfall sensor starts the process every four hours. The task asks you to model the workflow and name one other sensor that makes irrigation more effective (the hint lists greenhouses, compost, animal farming, offspring care and field monitoring).`),
    h3('Hint: smart agriculture devices'),
    table(['Use', 'What the devices do'], [
      ['Greenhouses', 'Control micro-climate conditions to maximise the production and quality of fruits and vegetables.'],
      ['Compost', 'Control humidity and temperature in alfalfa, hay, straw and similar material to prevent fungus and other microbial contaminants.'],
      ['Animal farming and tracking', 'Locate and identify animals grazing in open pastures or big stables; study ventilation and air quality and detect harmful gases from excrement.'],
      ['Offspring care', 'Control the growing conditions of offspring on animal farms to ensure survival and health.'],
      ['Field monitoring', 'Reduce spoilage and crop waste with better monitoring, accurate ongoing data and management of the fields, including better control of fertilising, electricity and watering.'],
    ]),
    swim(`flowchart LR
    subgraph L1["IoT Rainfall"]
        S(["Timer: every 4 hours"])
        R1["Read rainfall"]
        G1{"Raining?"}
        E1(["No action needed"])
    end
    subgraph L2["IoT Irrigation"]
        I1["Irrigate for 30 minutes"]
        I2["Stop irrigating"]
    end
    subgraph L3["IoT Flowmeter"]
        F1["Read water flow level"]
        G2{"Water still flowing?"}
        E2(["Water sealed: end"])
        F2["Send water leak alert"]
    end
    subgraph L4["Irrigation Control System"]
        C1["Record incident"]
        C2["Notify Maintenance Officer"]
        E3(["Maintenance notified"])
    end
    S --> R1 --> G1
    G1 -->|Yes| E1
    G1 -->|No| I1 --> I2 --> F1 --> G2
    G2 -->|No| E2
    G2 -->|Yes| F2 --> C1 --> C2 --> E3`),
    figcap('The four participants become four lanes. The sensor alerts are message flows between lanes.'),
    h3('Activity 3: smart home colour control'),
    p(`The user picks a colour on the smart light sensor panel. The panel messages the ${k('Smart Home Control System (SHCS)')} and the ${k('colour sensor')}. The colour sensor reads the current colour and sends it to the SHCS. The SHCS compares the two colours: if they are the same, no action; if not, it tells the lamp IoT to change colour. The lamp changes colour and the process ends. The task also asks which other sensors a smart home could use for convenience and cost savings.`),
    swim(`flowchart LR
    subgraph L1["User"]
        U1(["Select colour on panel"])
    end
    subgraph L2["Smart Light Sensor Panel"]
        P1["Send colour to SHCS and colour sensor"]
    end
    subgraph L3["Colour Sensor"]
        C1["Read current colour"]
        C2["Send detected colour to SHCS"]
    end
    subgraph L4["Smart Home Control System"]
        H1["Verify both colours"]
        G1{"Same colour?"}
        E1(["No action"])
        H2["Tell lamp to change to new colour"]
    end
    subgraph L5["Lamp IoT"]
        L1a["Change light colour"]
        E2(["End"])
    end
    U1 --> P1 --> C1 --> C2 --> H1 --> G1
    G1 -->|Yes| E1
    G1 -->|No| H2 --> L1a --> E2`),
    figcap('Five participants, five lanes. The colour sensor and the control system compare what the user asked for with what the lamp shows.'),
  ]],
];
