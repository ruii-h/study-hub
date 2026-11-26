// 8.6: say plainly that the StarMall use case model is ONE model drawn as two views, matching the two use-case tables.
import fs from 'fs';
const f = 'src/courses/bpas/data.json'; const d = JSON.parse(fs.readFileSync(f, 'utf8'));
const l = d.lessons.find((x) => x.n === 8); let h = l.html;
const rep = (a, b) => { if (!h.includes(a)) return; h = h.replace(a, () => b); };
rep('Split into two focused views:', 'It is <strong class="k-c">one</strong> use case model. The full picture is too big to read in a single diagram (14 use cases, three system boundaries), so it is drawn as <strong class="k-c">two views of the same model</strong>, matching the two tables above: part 1 holds the <em>interactive</em> use cases (a human uses a system), part 2 holds the <em>automated</em> ones (system to system). Nothing is duplicated except the actors and boundaries that appear in both views.');
rep('StarMall use case model (part 1) — human actors and their interactive use cases.', 'StarMall use case model, view 1 of 2 — interactive use cases: the human actors CSO and MO, inside the RAS and UEN Gov Website boundaries.');
rep('StarMall use case model (part 2) — notifications and system-to-system integrations.', 'StarMall use case model, view 2 of 2 — automated use cases: RAS notifications and the RAS–IMS integrations, with the actors LM, IMS and RAS.');
l.html = h; fs.writeFileSync(f, JSON.stringify(d)); console.log('ok');
// view 1: draw the boundaries the caption talks about
{
  const d2 = JSON.parse(fs.readFileSync(f, 'utf8')); const l2 = d2.lessons.find((x) => x.n === 8);
  const a = l2.html.indexOf('flowchart LR\n    CSO["CSO"] --- A1'); const b = l2.html.indexOf('</pre>', a);
  if (a >= 0) {
    l2.html = l2.html.slice(0, a) + `flowchart LR
    CSO["CSO"]
    MO["MO"]
    subgraph RAS["RAS boundary"]
        A1(["Enter customer requirements in RAS"])
        A2(["Update rental application rejection in RAS"])
        A3(["View rental requirements in RAS"])
        A4(["View industrial spaces in RAS"])
        A5(["Reserve customer selection in RAS"])
        A6(["Update RAS of customer rejection"])
    end
    subgraph UEN["UEN Gov Website boundary"]
        A7(["Verify customer's UEN in Gov website"])
    end
    CSO --- A1
    CSO --- A2
    CSO --- A3
    CSO --- A7
    MO --- A3
    MO --- A4
    MO --- A5
    MO --- A6
` + l2.html.slice(b);
    fs.writeFileSync(f, JSON.stringify(d2)); console.log('view1 boundaries drawn');
  }
}
