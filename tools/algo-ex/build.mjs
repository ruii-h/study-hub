// Adds tutorial + in-class exercise sections to the ALGO chapters from tools/algo-ex/chNN.mjs. Safe to re-run (generated blocks are marked and replaced).
// usage: node tools/algo-ex/build.mjs [chapterNumbers...]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
// Exercises no longer live in the theory chapters: orig.json holds the original in-class / tutorial sections (see migrate.mjs)
// and the result is written to data.json -> tuts[] (one entry per chapter), shown in the "Tutorials" tab.
import { DIAGRAMS } from './diagrams.mjs';
const ORIG = JSON.parse(fs.readFileSync(path.join(here, 'orig.json'), 'utf8'));
const SENT = '<div class="t-section" id="__end"><div role="heading" aria-level="2" class="t-h2">⚡ Quick examples</div></div>';
const F = path.resolve(here, '../../src/courses/algo/data.json');
const D = JSON.parse(fs.readFileSync(F, 'utf8'));
const only = process.argv.slice(2).map(Number);

const wrap = (id, html) => `<!--gen:${id}-->${html}<!--/gen:${id}-->`;
const strip = (h) => h.replace(/<!--gen:([\w-]+)-->[\s\S]*?<!--\/gen:\1-->/g, '');
const startOfSection = (h, heading) => {
  const a = h.indexOf(`class="t-h2">${heading}`);
  return a < 0 ? -1 : h.lastIndexOf('<div class="t-section', a);
};
const endOfSection = (h, start) => {
  const n = h.indexOf('<div class="t-section', start + 10);
  return n < 0 ? h.length : n;
};
const toChip = (h, chipOf) => {
  // <div class="exr reveal"><div class="exr-q"><span class="exr-n">N</span><div><b>Title.</b> rest</div></div>
  let i = 0;
  return h.replace(/<div class="exr reveal"><div class="exr-q"><span class="exr-n">(\d+)<\/span><div>(?:<b>([^<]*?)<\/b>\s*)?/g, (m, n, title) => {
    i++;
    const t = (title ?? `Question ${n}`).replace(/\.$/, '');
    return `<div class="exr reveal"><div class="exr-head"><span class="cf-tag">${chipOf(i, +n)}</span><h4>${t}</h4></div><div class="exr-q"><div>`;
  });
};

const files = fs.readdirSync(here).filter((f) => /^ch\d+\.mjs$/.test(f)).sort();
for (const f of files) {
  const num = +f.match(/\d+/)[0];
  if (only.length && !only.includes(num)) continue;
  const M = (await import(pathToFileURL(path.join(here, f)).href)).default;
  const L = D.lessons[num - 1];
  const o = ORIG[num] || {};
  let h = (o.inclass || '') + (o.tutorial || '') + SENT;

  // 1. chips on the existing in-class and tier-1 sections
  const cut = (heading, chipOf) => {
    const s = startOfSection(h, heading);
    if (s < 0) return;
    const e = endOfSection(h, s);
    h = h.slice(0, s) + toChip(h.slice(s, e), chipOf) + h.slice(e);
  };
  cut('📝 In-class exercises', (i, n) => `IN-CLASS · Q${(M.inclassNums?.[i - 1]) ?? n}`);
  cut('📚 Tutorial questions', (i, n) => M.tier1Chip ? M.tier1Chip(M.tier1Nums?.[i - 1] ?? n) : `TUTORIAL ${M.week} · TIER 1 · Q${(M.tier1Nums?.[i - 1]) ?? n}`);
  if (M.tier1Sub) { const s = startOfSection(h, '📚 Tutorial questions'); h = h.slice(0, s) + h.slice(s).replace(/<div class="sub">.*?<\/div>/, `<div class="sub">${M.tier1Sub}</div>`); }

  // 2. extra tier-1 items appended to the existing tutorial section
  if (M.tier1More?.length) {
    const s = startOfSection(h, '📚 Tutorial questions');
    const e = endOfSection(h, s);
    const at = h.lastIndexOf('</div>', e);
    h = h.slice(0, at) + wrap('t1more', M.tier1More.join('')) + h.slice(at);
  }
  // 3. extra in-class items appended to the existing in-class section, or a new section when there is none
  const quick = () => startOfSection(h, '⚡ Quick examples');
  if (M.inclassMore?.length) {
    const s = startOfSection(h, '📝 In-class exercises');
    if (s >= 0) {
      const e = endOfSection(h, s);
      const at = h.lastIndexOf('</div>', e);
      h = h.slice(0, at) + wrap('icmore', M.inclassMore.join('')) + h.slice(at);
    }
  }
  if (M.inclassNew) {
    const at = startOfSection(h, '📚 Tutorial questions') >= 0 ? startOfSection(h, '📚 Tutorial questions') : quick();
    h = h.slice(0, at) + wrap('icnew', M.inclassNew) + h.slice(at);
  }
  // 4. tier-2 tutorial section after the tier-1 one
  if (M.tier2) {
    const s = startOfSection(h, '📚 Tutorial questions');
    const at = s >= 0 ? endOfSection(h, s) : quick();
    h = h.slice(0, at) + wrap('tier2', M.tier2) + h.slice(at);
  }
  // 5. a whole tier-1 section when the chapter had none
  if (M.tier1New) {
    const at = quick();
    h = h.slice(0, at) + wrap('t1new', M.tier1New) + h.slice(at);
  }
  h = h.replace(SENT, '');
  // whole cards replaced by title (used to correct an existing card)
  for (const [title, card] of Object.entries(M.replace || {})) {
    const parts = h.split('<div class="exr reveal">'); let hit = 0;
    for (let k = 1; k < parts.length; k++) { if (((/<h4>([^<]*)<\/h4>/.exec(parts[k]) || [])[1] || '') === title) { parts[k] = card.replace(/^<div class="exr reveal">/, ''); hit++; } }
    if (!hit) console.warn(`ch${num}: no card to replace "${title}"`);
    h = parts.join('<div class="exr reveal">');
  }
  // diagrams for existing cards (matched by title)
  for (const d of DIAGRAMS[num] || []) {
    const parts = h.split('<div class="exr reveal">'); let hit = 0;
    for (let k = 1; k < parts.length; k++) {
      const title = (/<h4>([^<]*)<\/h4>/.exec(parts[k]) || [])[1] || '';
      if (!title.includes(d.t)) continue;
      hit++;
      if (d.at === 'q') parts[k] = parts[k].replace('</div></div><details class="model">', () => '</div></div>' + d.h + '<details class="model">');
      else if (d.at === 'ans') parts[k] = parts[k].replace('<summary>Show answer</summary><div class="ma">', () => '<summary>Show answer</summary><div class="ma">' + d.h);
      else parts[k] = parts[k].replace(/(<summary>Show full working[^<]*<\/summary><div class="ma">)/, (m0, g1) => g1 + d.h);
    }
    if (!hit) console.warn(`ch${num}: no card matches "${d.t}"`);
    h = parts.join('<div class="exr reveal">');
  }
  const cur = (D.tuts ||= []);
  const i = cur.findIndex((t) => t.n === L.n);
  const rec = { n: L.n, count: (h.match(/class="exr reveal"/g) || []).length, html: h };
  if (i < 0) cur.push(rec); else cur[i] = rec;
  console.log(`ch${num}: ok (${rec.count} exercises)`);
}
if (D.tuts) D.tuts.sort((a, b) => a.n - b.n);
fs.writeFileSync(F, JSON.stringify(D));
