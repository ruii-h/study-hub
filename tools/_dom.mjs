import { parseHTML } from 'file:///C:/Users/RUIHEN~1/AppData/Local/Temp/claude/cfae48da7b4a6b5b/3a4de062-91ec-4162-95f7-8576d9042e7f/scratchpad/node_modules/linkedom/esm/index.js';
import fs from 'node:fs';
const D = JSON.parse(fs.readFileSync('src/courses/idp/data.json', 'utf8'));
const { document } = parseHTML('<div id="r">' + D.lessons[0].html + '</div>');
const r = document.getElementById('r');
const desc = (el) => el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').join('.') : '') + (el.id ? '#' + el.id : '');
for (const el of r.children) {
  const t = el.textContent.replace(/\s+/g, ' ').trim().slice(0, 70);
  console.log(desc(el), '|', t);
  if (/t-section/.test(el.className)) for (const k of el.children) console.log('    ', desc(k), '|', k.textContent.replace(/\s+/g, ' ').trim().slice(0, 60));
}
