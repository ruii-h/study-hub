// One-off patch: Module 8 (lessons[7]) drew its use case models as Mermaid flowcharts (actors as boxes).
// Replace the four of them with real UML use case diagrams (stick-figure actors, ovals, system boundaries) built by ucSvg.
// Re-runnable: node tools/bpas-exam/patch-m8-usecases.mjs  (matches the old Mermaid sources or an earlier drawing with the same aria-label)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ucSvg } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const F = path.join(here, '../../src/courses/bpas/data.json');
const d = JSON.parse(fs.readFileSync(F, 'utf8'));
let h = d.lessons[7].html;

// keep the diagram readable on a phone: never narrower than 600px, scroll sideways inside its own box instead
const wide = (svg) => svg.replace('max-width:100%;height:auto', 'min-width:600px;max-width:100%;height:auto');
const U = (id, label) => ({ id, label });

const diagrams = [
  { start: 'R(["Receptionist (actor)"])', svg: wide(ucSvg({
    label: 'Medical Booking use case diagram',
    boundaries: [{ title: 'Medical Booking System', ucs: [U('a', 'Request Appointment'), U('b', 'Find schedule'), U('c', 'Find available staff'), U('d', 'Book Appointment'), U('e', 'Submit availability')] }],
    left: [{ name: 'Patient', to: ['a'] }, { name: 'Receptionist', to: ['b', 'c', 'd'] }],
    right: [{ name: 'Doctor', to: ['e'] }] })) },
  { start: 'subgraph MBS["MBS System"]', svg: wide(ucSvg({
    label: 'Medical Booking use case model with system boundaries',
    boundaries: [
      { title: 'MBS System', ucs: [U('ra', 'Request Appointment'), U('fs', 'Find Schedule'), U('ba', 'Book Appointment'), U('ft', 'Find Staff'), U('us', 'Update Schedule')] },
      { title: 'OC System', ucs: [U('sa', 'Submit Availability'), U('sv', 'Send Availability (to MBS)')] }],
    left: [{ name: 'Patient', to: ['ra'] }, { name: 'Receptionist', to: ['fs', 'ba', 'ft'] }, { name: 'MBS (system actor)', to: ['sv'] }],
    right: [{ name: 'OC (system actor)', to: ['us'] }, { name: 'Doctor', to: ['sa'] }] })) },
  { start: 'CSO["CSO"]', svg: wide(ucSvg({
    label: 'StarMall use case model, view 1 of 2: interactive use cases',
    boundaries: [
      { title: 'RAS boundary', ucs: [U('a1', 'Enter customer requirements in RAS'), U('a2', 'Update rental application rejection in RAS'), U('a3', 'View rental requirements in RAS'), U('a4', 'View industrial spaces in RAS'), U('a5', 'Reserve customer selection in RAS'), U('a6', 'Update RAS of customer rejection')] },
      { title: 'UEN Gov Website boundary', ucs: [U('a7', "Verify customer's UEN in Gov website")] }],
    left: [{ name: 'CSO', to: ['a1', 'a2', 'a3', 'a7'] }],
    right: [{ name: 'MO', to: ['a3', 'a4', 'a5', 'a6'] }] })) },
  { start: 'subgraph RAS["RAS boundary"]\n        B1', svg: wide(ucSvg({
    label: 'StarMall use case model, view 2 of 2: automated use cases',
    boundaries: [
      { title: 'RAS boundary', ucs: [U('b1', 'Send customer request SMS to MO'), U('b2', 'Send customer request email to MO'), U('b3', 'Send customer application approval request email to LM'), U('b4', 'Send match request to IMS'), U('b5', 'Send customer selection to IMS')] },
      { title: 'IMS boundary', ucs: [U('b6', 'Send match results to RAS'), U('b7', 'Update customer selection sent by RAS')] }],
    left: [{ name: 'MO', to: ['b1', 'b2'] }, { name: 'LM', to: ['b3'] }],
    right: [{ name: 'IMS (actor)', to: ['b4', 'b5'] }, { name: 'RAS (actor)', to: ['b6', 'b7'] }] })) },
];

const decode = (s) => s.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
let done = 0;
h = h.replace(/<pre class="mermaid[^>]*>([\s\S]*?)<\/pre>/g, (all, src) => {
  const s = decode(src);
  const hit = diagrams.find((x) => s.includes(x.start) && /--- /.test(s) && /\(\[/.test(s));
  if (!hit) return all;
  done++;
  return hit.svg;
});
// a drawing made by an earlier run: redraw it
h = h.replace(/<div class="t-table-wrap" tabindex="0"><svg[^>]*aria-label="([^"]*)"[\s\S]*?<\/svg><\/div>/g, (all, label) => {
  const hit = diagrams.find((x) => x.svg.includes('aria-label="' + label + '"'));
  if (!hit) return all;
  done++;
  return hit.svg;
});
console.log('replaced', done, 'of', diagrams.length);
if (done !== diagrams.length) { console.error('unexpected count, not writing'); process.exit(1); }
d.lessons[7].html = h;
fs.writeFileSync(F, JSON.stringify(d));
