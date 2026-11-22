import { parseHTML } from 'file:///C:/Users/RUIHEN~1/AppData/Local/Temp/claude/cfae48da7b4a6b5b/3a4de062-91ec-4162-95f7-8576d9042e7f/scratchpad/node_modules/linkedom/esm/index.js';
import fs from 'node:fs';
const [course, n, pat] = process.argv.slice(2);
const D = JSON.parse(fs.readFileSync(`src/courses/${course}/data.json`, 'utf8'));
const l = D.lessons.find((x) => x.n == +n);
const { document } = parseHTML('<div id="r">' + l.html + '</div>');
const re = new RegExp(pat, 'i');
for (const k of document.querySelectorAll('.t-unit,.t-callout,.case-file')) {
  const t = k.textContent.replace(/\s+/g, ' ').trim();
  if (re.test(t.slice(0, 120))) { console.log('<' + k.tagName.toLowerCase() + ' class="' + k.className + '"> ' + t.length + ' chars'); [...k.children].forEach((c) => console.log('    ' + c.tagName.toLowerCase() + '.' + c.className + ' | ' + c.textContent.replace(/\s+/g, ' ').trim().slice(0, 160))); }
}
