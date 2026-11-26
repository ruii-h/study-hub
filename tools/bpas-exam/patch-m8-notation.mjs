// One-off patch: Module 8.4 showed the PlantUML example only as source text. Draw it (stick figures, system boundary, ovals)
// and keep the source underneath. Idempotent: skips when the drawing is already there.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ucSvg } from './lib.mjs';

const F = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../src/courses/bpas/data.json');
const d = JSON.parse(fs.readFileSync(F, 'utf8'));
let h = d.lessons[7].html;
// redraw: drop an earlier drawing first
h = h.replace(/<div class="t-table-wrap" tabindex="0"><svg[^>]*aria-label="Use case notation example"[\s\S]*?<\/svg><\/div>/, '');
const at = h.indexOf('@startuml');
if (at < 0) throw new Error('PlantUML block not found');
const start = h.lastIndexOf('<div class="t-code">', at);
if (start < 0) throw new Error('code block start not found');

const svg = ucSvg({
  label: 'Use case notation example',
  boundaries: [{ title: 'Order system', ucs: [{ id: 'o', label: 'Enter a New Order' }, { id: 'b', label: 'Enter Billing Information' }] }],
  left: [{ name: 'Customer', to: ['o'] }],
  right: [{ name: 'Finance Clerk', to: ['b'] }, { name: 'Finance Manager', to: ['b'] }],
}).replace('max-width:100%;height:auto', 'min-width:600px;max-width:100%;height:auto');

d.lessons[7].html = h.slice(0, start) + svg + h.slice(start);
fs.writeFileSync(F, JSON.stringify(d));
console.log('patched');
