// One-off: no raw "§" numbers left anywhere. Same-section / flex-container references become plain titles; data-level fixes for buttons, diagram labels and ALGO's old xref anchors.
import fs from 'node:fs';

// ---- engine: plain titles instead of skipping
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  const a = s.indexOf('function autoref(c,n){');
  const b = s.indexOf('/* cards that would leave an empty grid cell');
  let seg = s.slice(a, b);
  const rep = (x, y) => { if (!seg.includes(x)) throw new Error(id + ' missing ' + x.slice(0, 50)); seg = seg.split(x).join(y); };
  rep("if(/flex|grid/.test(getComputedStyle(t.parentElement).display))continue;\n", '');
  rep("if(info.n==n&&(!info.id||info.id==sid))continue;\n", "const plain=(info.n==n&&(!info.id||info.id==sid))||/flex|grid/.test(getComputedStyle(t.parentElement).display);const mk=(i,tx)=>plain?document.createTextNode(tx):wlAnchor(i,tx);\n");
  rep("frag.appendChild(wlAnchor(", "frag.appendChild(mk(");
  s = s.slice(0, a) + seg + s.slice(b);
  fs.writeFileSync(f, s);
  console.log(id, 'engine ok');
}

// ---- data
const idpF = 'src/courses/idp/data.json';
const D = JSON.parse(fs.readFileSync(idpF, 'utf8'));
const chap = (n) => D.lessons.find((l) => l.n == n).title.replace(/\s*\(.*$/, '');
for (const l of D.lessons) {
  l.html = l.html.replace(/See all four compared in §13\.2/g, 'See all four compared in Evaluating Designs');
  l.html = l.html.replace(/<pre class="mermaid">[\s\S]*?<\/pre>/g, (p) => {
    if (!/§/.test(p)) return p;
    return p.replace(/\(([^()"]*§[^()"]*)\)/g, (m, inner) => {
      const ns = [...inner.matchAll(/§(\d+)/g)].map((x) => +x[1]);
      return '(' + [...new Set(ns)].map(chap).join(', ') + ')';
    });
  });
}
fs.writeFileSync(idpF, JSON.stringify(D));

const algoF = 'src/courses/algo/data.json';
const A = JSON.parse(fs.readFileSync(algoF, 'utf8'));
let n = 0;
for (const l of A.lessons) {
  l.html = l.html.replace(/([A-Za-z][A-Za-z -]*?)\s*\((<a class="xref"[^>]*>)§\d+(?:\.\d+)?<\/a>\)/g, (m, name, open) => { n++; return open + name.trim() + '</a>'; });
}
fs.writeFileSync(algoF, JSON.stringify(A));
console.log('algo xrefs rewritten:', n);
