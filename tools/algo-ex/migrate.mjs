// ONE-TIME: lifts the in-class and tutorial sections out of the ALGO theory chapters into tools/algo-ex/orig.json,
// so exercises live in their own "Tutorials" tab. Generated blocks are dropped (build.mjs regenerates them).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const F = path.resolve(here, '../../src/courses/algo/data.json');
const D = JSON.parse(fs.readFileSync(F, 'utf8'));
const strip = (h) => h.replace(/<!--gen:([\w-]+)-->[\s\S]*?<!--\/gen:\1-->/g, '');
const startOf = (h, heading) => { const a = h.indexOf(`class="t-h2">${heading}`); return a < 0 ? -1 : h.lastIndexOf('<div class="t-section', a); };
const endOf = (h, s) => { const n = h.indexOf('<div class="t-section', s + 10); return n < 0 ? h.length : n; };
const orig = {};
for (const L of D.lessons) {
  let h = strip(L.html); const o = {};
  for (const [k, heading] of [['inclass', '📝 In-class exercises'], ['tutorial', '📚 Tutorial questions']]) {
    const s = startOf(h, heading); if (s < 0) continue;
    const e = endOf(h, s); o[k] = h.slice(s, e); h = h.slice(0, s) + h.slice(e);
  }
  orig[L.n] = o; L.html = h;
}
fs.writeFileSync(path.join(here, 'orig.json'), JSON.stringify(orig, null, 1));
fs.writeFileSync(F, JSON.stringify(D));
console.log(Object.entries(orig).map(([n, o]) => n + ':' + Object.keys(o).join('+')).join(' '));
