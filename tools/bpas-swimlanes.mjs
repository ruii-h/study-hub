// Turns the BPAS process-workflow diagrams into swimlane diagrams (rendered by src/guide/swimlane.ts).
// Each source stays a valid Mermaid flowchart (subgraph = lane). Run: node tools/bpas-swimlanes.mjs
import fs from 'node:fs';
const P = new URL('../src/courses/bpas/data.json', import.meta.url);
const d = JSON.parse(fs.readFileSync(P, 'utf8'));
const enc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const NEW = {
  // chapter index -> [marker text that identifies the old diagram, new source]
  5: [
    ['Traveler arrives at check-in counter', `flowchart LR
    subgraph L1["Traveler"]
        Start(["Traveler arrives at check-in counter"])
        T1["Present travel documents to staff (Booking Confirmation + Passport)"]
        End(["Proceed to luggage handling"])
    end
    subgraph L2["Check-in Staff"]
        T2["Enter booking details into Check-in System"]
        T5["Pass travel documents, boarding pass & luggage tag to traveler"]
    end
    subgraph L3["Check-in System"]
        T3["Process booking details (+ sub-process)"]
        T4["Print boarding pass & luggage tag"]
    end
    Start --> T1 --> T2 --> T3 --> T4 --> T5 --> End`],
    ['Customer arrives', null], // sandwich: already has lanes, just mark it
    ['Customer walk-in', `flowchart LR
    subgraph L1["Customer Service Officer (CSO)"]
        Start(["Customer walk-in"])
        T1["CSO gathers customer requirements & fills rental application form"]
        T11["CSO collects rental application form & booking fee, notes payment, issues receipt"]
        EndC(["Process end"])
    end
    subgraph L2["Office Dispatcher (OD)"]
        T2["OD dispatches rental application form from CSO to MO"]
    end
    subgraph L3["Marketing Officer (MO)"]
        T3["MO checks availability of choice industrial space using IMS"]
        T4["MO proceeds to CSC to meet customer"]
        T5["MO obtains customer UEN & verifies eligibility from govt website"]
        G1{"Eligible customer?"}
        T6["MO markets choice industrial spaces to customer"]
        T7["MO informs customer of ineligibility, updates form to rejected"]
        EndA(["Process end"])
        G2{"Customer decision?"}
        T8["MO updates form: customer rejection"]
        EndB(["Process end"])
        T9["MO reserves selection in IMS, updates form, passes to customer"]
        T10["MO emails LM for rental application approval"]
    end
    Start --> T1 --> T2 --> T3 --> T4 --> T5 --> G1
    G1 -->|"Yes 75%"| T6
    G1 -->|"Not eligible 25%"| T7 --> EndA
    T6 --> G2
    G2 -->|"Reject 10%"| T8 --> EndB
    G2 -->|"Accept 90%"| T9 --> T10 --> T11 --> EndC`],
    ['Visit online store on phone', `flowchart LR
    subgraph L1["Customer"]
        Start(["Visit online store on phone"])
        T1["Place or modify order on phone"]
        G1{"Order type?"}
    end
    subgraph L2["Sales Agent"]
        T2["Create sales order in Sales System"]
        T3["Modify sales order in Sales System"]
        M1(("merge"))
        T4["Validate sales order"]
        G2{"Valid?"}
        T5["Inform customer of invalid order"]
        EndInvalid(["Terminate: invalid order"])
    end
    subgraph L3["Sales System"]
        T6["Email sales order to store keeper"]
    end
    subgraph L4["Store Keeper"]
        T7["Check item availability"]
        G3{"Available?"}
        T8["Keep order as backorder"]
        P1(("parallel split"))
        T9["Pack order"]
        T10["Create invoices"]
        P2(("parallel join"))
        T11["Ship order"]
        EndComplete(["End: order completion"])
    end
    Start --> T1 --> G1
    G1 -->|New order| T2
    G1 -->|Existing order| T3
    T2 --> M1
    T3 --> M1
    M1 --> T4 --> G2
    G2 -->|No| T5 --> EndInvalid
    G2 -->|Yes| T6 --> T7 --> G3
    G3 -->|No| T8
    T8 -.->|"wait 1 day (timer)"| T7
    G3 -->|Yes| P1
    P1 --> T9
    P1 --> T10
    T9 --> P2
    T10 --> P2
    P2 --> T11 --> EndComplete`],
  ],
  8: [
    ['CSO obtains customer UEN and verifies', `flowchart LR
    subgraph L1["CSO"]
        S(["Customer walk-in"])
        C1["CSO obtains customer UEN and verifies eligibility from government website"]
        G1{"Eligible customer?"}
        C2["CSO informs customer of application rejection and updates RAS"]
        E1(["Process end"])
        C3["CSO gathers requirements and updates RAS"]
        C4["CSO collects booking fee from customer and informs of 2 working-day waiting time"]
        P2(("AND join"))
        E3(["Process end"])
    end
    subgraph L2["RAS (system)"]
        R1["RAS matches request with IMS"]
        R2["RAS emails and SMS MO of request"]
        R3["RAS sends email to LM for application approval and updates IMS with customer's selection"]
    end
    subgraph L3["MO"]
        M1["MO proceeds to CSC to meet customer"]
        M2["MO reviews and markets choice industrial spaces retrieved by RAS to customer"]
        G2{"Customer decision?"}
        M3["MO updates RAS of customer's rejection"]
        E2(["Process end"])
        M4["MO reserves customer's selection in RAS"]
        P1(("AND split"))
    end
    S --> C1 --> G1
    G1 -->|"Not eligible 25%"| C2 --> E1
    G1 -->|"Yes, eligible 75%"| C3 --> R1 --> R2 --> M1 --> M2 --> G2
    G2 -->|"Reject choice 10%"| M3 --> E2
    G2 -->|"Accept choice 90%"| M4 --> P1
    P1 --> C4
    P1 --> R3
    C4 --> P2
    R3 --> P2
    P2 --> E3`],
  ],
  11: [
    ['Pool: Temperature IoT', `flowchart LR
    subgraph TEMP["Pool: Temperature IoT"]
        T0(["Timer start: every 4 hours"]) --> T1["Script task: Record Orchid Temperature"]
        T1 --> TG{"Temp below threshold?"}
        TG -->|Yes| TE1(["End without Alert"])
        TG -->|No| T2["Send task: Send Temperature Alert"] --> TE2(["End with Alert"])
    end
    subgraph SHELF["Pool: ShelfPrice IoT"]
        S0(["Message start: Receive Updated Price"]) --> S1["Script task: Update Price Tag"] --> SE(["Update Completed"])
    end`],
    ['(from Temperature IoT)', `flowchart LR
    subgraph A["Pool: Temperature IoT"]
        TA["(from Temperature IoT)"]
    end
    subgraph B["Pool: Smart Pricing Control System"]
        P0(["Message start: Receive Temperature Alert"]) --> P1["Service task: Estimate Goods Shelf Life"]
        P1 --> PG{"Life below threshold?"}
        PG -->|Yes| P2["Send task: Notify Storekeeper to Remove Goods"] --> PE1(["End with Removal Notification"])
        PG -->|No| P3["Service task: Calculate Orchid Price"] --> AS(("AND split"))
        AS --> P4["Send task: Send Updated Orchid Price"]
        AS --> P5["Service task: Update Price in POS System"]
        P4 --> AJ(("AND join"))
        P5 --> AJ
        AJ --> PE2(["End with Price Updated"])
    end
    subgraph C["Pool: ShelfPrice IoT"]
        SH["(to ShelfPrice IoT)"]
    end
    TA -.->|message| P0
    P4 -.->|message| SH`],
  ],
};

let changed = 0;
for (const [ch, list] of Object.entries(NEW)) {
  let html = d.lessons[+ch].html;
  for (const [marker, src] of list) {
    let hit = false;
    html = html.replace(/<pre class="mermaid(?: swim)?">([\s\S]*?)<\/pre>/g, (m, body) => {
      if (hit || !body.replace(/&quot;/g, '"').replace(/&amp;/g, '&').includes(marker.replace(/&/g, '&'))) return m;
      hit = true;
      return `<pre class="mermaid swim">${src ? enc(src) : body}\n</pre>`;
    });
    if (!hit) throw new Error('no diagram for marker ' + marker);
    changed++;
  }
  d.lessons[+ch].html = html;
}
fs.writeFileSync(P, JSON.stringify(d));
console.log('swimlane diagrams set:', changed);
