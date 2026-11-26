// 8.7 package diagram: stack the packages in one narrow column (was one 1970px-wide row that overlapped), one use case per line.
import fs from 'fs';
const f = 'src/courses/bpas/data.json'; const d = JSON.parse(fs.readFileSync(f, 'utf8'));
const l = d.lessons.find((x) => x.n === 8);
const a = l.html.indexOf('flowchart TB\n    subgraph UENsys'); if (a < 0) { console.log('already fixed'); process.exit(0); }
const b = l.html.indexOf('</pre>', a);
const br = '&lt;br/&gt;';
const M = `flowchart TB
    subgraph RASsys["RAS"]
        RR["Rental-Request Mgmt:${br}Enter customer requirements${br}View rental requirements${br}Update rental application rejection"]
        RV["Reservation Module:${br}View industrial space${br}Reserve customer selection${br}Update RAS of customer rejection"]
        CM["Communication Mgmt:${br}Send request SMS to MO${br}Send request email to MO${br}Send approval request email to LM"]
        IR["Integration Module RAS:${br}Send customer selection to IMS${br}Send match request to IMS"]
    end
    subgraph IMSsys["IMS"]
        II["Integration Module IMS:${br}Update customer selection sent by RAS${br}Send match results to RAS"]
    end
    subgraph UENsys["UEN Gov Website"]
        V["Verification Module:${br}Verify customer's UEN in Gov website"]
    end
    RR ~~~ RV
    RV ~~~ CM
    CM ~~~ IR
    IR ~~~ II
    II ~~~ V
`;
l.html = l.html.slice(0, a) + M + l.html.slice(b);
fs.writeFileSync(f, JSON.stringify(d)); console.log('ok');
