// Builds src/courses/wad2/{data.json,style.css} from tools/wad2/data.json (extracted from the standalone WAD2 page).
// Content is kept word for word; only the wrapping (chapters, sections, tables, code, callouts, links) changes.
import fs from 'fs';
const W = JSON.parse(fs.readFileSync('tools/wad2/data.json', 'utf8'));
const out = 'src/courses/wad2';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dec = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

// ---- chapter plan: [track title, [[group, icon, tag, blurb], ...]]
const BLURB = {
  'Start here': 'Scope, exam format and how the four layers fit together.',
  'HTML': 'Tags, inputs, semantic elements and meta tags.',
  'JavaScript & web APIs': 'Events, promises, async/await, fetch and what an API is.',
  'CSS core': 'Attaching CSS, selectors, specificity, the box model, units, text and display.',
  'CSS layout': 'Positioning, flexbox, grid and responsive design.',
  'CSS components & extras': 'Tables, links, lists, forms, variables, animations and pseudo-selectors.',
  'Bootstrap: grid & utilities': 'Install, the 12-column grid, breakpoints and utility classes.',
  'Bootstrap: components & workflow': 'Buttons, cards, forms, navbar, carousel, modal and fixing layouts.',
  'Vue basics': 'Why Vue, project setup, single-file components, ref and expressions.',
  'Vue directives': 'v-if, v-bind, v-on, v-model and v-for.',
  'Vue logic & state': 'computed, watch, lifecycle hooks and localStorage.',
  'Vue components & routing': 'Props, slots, emits, Vue Router and the Options API.',
  'Axios concepts': 'Promises, the four methods, the response object and JSON shape.',
  'Axios CRUD': 'GET, POST, PUT and DELETE with worked code.',
  'Axios patterns': 'Headers, .env keys, CORS, the full CRUD skeleton and a mini project.',
  'Express & MongoDB': 'Routes, controllers, models, REST design, Mongoose and EJS.',
  'Debugging & mistakes': 'Symptom to fix tables and the traps found in the course files.',
  'Tooling & exam rules': 'Running lab projects, marking rules and the rules found in the question scripts.',
  'Code · Index': 'The syllabus code index and the shared Bootstrap shell.',
  'Code · Week 2 CSS': 'Full source of the Week 2 examples and exercise solutions.',
  'Code · Week 3 Bootstrap': 'Full source of the Week 3 examples and exercise solutions.',
  'Code · Week 4 Vue basics': 'Full source of the Week 4 Vue examples and solutions.',
  'Code · Week 5 Lists & Axios': 'Full source of the Week 5 examples and solutions.',
  'Code · Week 6 Components': 'Full source of the Week 6 views, components and solutions.',
  'Appendix': 'Pinia, router guards, and what each file in the course archive was used for.',
};
const PLAN = [
  ['🚀 Start', 'blue', [['Start here', '🧭']]],
  ['🌐 Web foundations', 'blue', [['HTML', '🏷️'], ['JavaScript & web APIs', '⚙️']]],
  ['🎨 Styling', 'orange', [['CSS core', '🎯'], ['CSS layout', '📐'], ['CSS components & extras', '🧩'], ['Bootstrap: grid & utilities', '🧱'], ['Bootstrap: components & workflow', '🪟']]],
  ['💚 Vue', 'green', [['Vue basics', '🌱'], ['Vue directives', '🔀'], ['Vue logic & state', '🧠'], ['Vue components & routing', '🧭']]],
  ['🗄️ Data & servers', 'purple', [['Axios concepts', '📡'], ['Axios CRUD', '🔁'], ['Axios patterns', '🧰'], ['Express & MongoDB', '🍃']]],
  ['🛠️ Exam toolkit', 'yellow', [['Debugging & mistakes', '🐞'], ['Tooling & exam rules', '📋']]],
];
const CHEAT_GROUPS = [['1 · CSS', '🎨', 'CSS'], ['2 · Bootstrap', '🧱', 'Bootstrap'], ['3 · Vue', '💚', 'Vue'], ['4 · Axios & backend', '📡', 'Axios & backend'], ['5 · Debugging & exam day', '🐞', 'Debugging & exam day']];
const CODE = [['Code · Index', '🗂️'], ['Code · Week 2 CSS', '🎨'], ['Code · Week 3 Bootstrap', '🧱'], ['Code · Week 4 Vue basics', '🌱'], ['Code · Week 5 Lists & Axios', '📡'], ['Code · Week 6 Components', '🧩'], ['Appendix', '📎']];

// ---- code language detection
function lang(t, hint) {
  const x = dec(t);
  if (/\.vue\b/.test(hint || '')) return 'vue';
  if (/\.html?\b/.test(hint || '')) return 'html';
  if (/\.css\b/.test(hint || '')) return 'css';
  if (/\.(json)\b/.test(hint || '')) return 'json';
  if (/\.(m?js|ts)\b/.test(hint || '')) return 'javascript';
  if (/<template>|<script setup|<style scoped|<script>[\s\S]*<template/.test(x)) return 'vue';
  if (/^\s*(npm|npx|cd|node|git|mkdir|pip|\$)\s/m.test(x) && !/[{;]\s*$/m.test(x.split('\n')[0])) return 'bash';
  if (/^\s*(<!doctype|<[a-z!])/i.test(x)) return 'html';
  if (/^\s*[{\[]\s*"/.test(x) && !/\b(const|let|function)\b/.test(x)) return 'json';
  if (/^\s*[@.#:\w\-\[\], >*+~]+\s*\{[^}]*:[^}]*;?[^}]*\}/m.test(x) && !/\b(const|let|var|function|=>|import|return)\b/.test(x)) return 'css';
  return 'javascript';
}

// ---- links: topic id -> [chapter n, section id]
const chapters = []; // {n,title,icon,tag,blurb,secs:[{id,title,html,sub}]}
const topicLoc = {};
let n = 0;
const groups = [];
const addChap = (c) => { c.n = ++n; chapters.push(c); c.secs.forEach((s, i) => { s.m = i + 1; s.id = `s${c.n}-${s.m}`; if (s.tid) topicLoc[s.tid] = [c.n, s.id]; }); return c.n; };
const byGroup = (arr, g) => arr.filter((x) => x.group === g);
const topicSec = (t) => ({ tid: t.id, title: t.title, sub: t.subtitle, html: t.html });
for (const [tt, tag, gs] of PLAN) {
  const ns = [];
  for (const [g, icon] of gs) ns.push(addChap({ title: g, icon, tag, blurb: BLURB[g], secs: byGroup(W.THEORY, g).map(topicSec) }));
  groups.push({ t: tt, ns, tag });
}
{ const ns = CHEAT_GROUPS.map(([g, icon, nm]) => addChap({ title: 'Cheat sheet · ' + nm, icon, tag: 'orange', blurb: 'Scenario-to-code lookups for ' + nm + '. The basics live in the theory chapters.', secs: byGroup(W.CHEAT, g).map((t) => ({ tid: t.id, title: t.title, sub: t.subtitle, html: t.html })) })); groups.push({ t: '⚡ Cheat sheets', ns, tag: 'orange' }); }
{
  const ns = [];
  for (const [g, icon, blurb] of [['Week 2 · CSS', '🎨', 'Ten Week 2 CSS exercises you can edit and run in the page.'], ['Week 3 · Bootstrap', '🧱', 'Four Week 3 Bootstrap exercises with Bootstrap 5.3 loaded offline.']]) {
    ns.push(addChap({ title: 'Live playground · ' + g.replace(' · ', ' '), icon, tag: 'green', blurb, playground: true, secs: W.LESSONS.filter((l) => l.g === g).map((l) => ({ title: l.title, sub: '', html: `<p>${esc(l.desc)}</p><div class="demo-slot" data-bs="${/\{\{BS\}\}/.test(l.code) ? 1 : 0}"><textarea class="pg-src" hidden>${esc(l.code)}</textarea></div>` })) }));
  }
  groups.push({ t: '▶️ Live playground', ns, tag: 'green' });
}
{ const ns = CODE.map(([g, icon]) => addChap({ title: g, icon, tag: 'purple', blurb: BLURB[g], secs: byGroup(W.THEORY, g).map(topicSec) })); groups.push({ t: '📦 Code archive', ns, tag: 'purple' }); }

// ---- html transforms
const CALLOUT = { tip: 'success', warning: 'warn', mistake: 'danger', gap: 'info', fix: 'info' };
function fix(html) {
  let h = html;
  // practice links are dropped (no practice yet); theory links become wiki links
  h = h.replace(/<p class="use">([\s\S]*?)<\/p>/g, (m, inner) => {
    const th = [...inner.matchAll(/<a class="xl" onclick="go\('th','([^']+)'\)">([\s\S]*?)<\/a>/g)];
    if (!th.length) return '';
    return m;
  });
  h = h.replace(/<a class="xl" onclick="go\('th','([^']+)'\)">([\s\S]*?)<\/a>/g, (m, id, text) => {
    const loc = topicLoc[id]; if (!loc) return text;
    return `<a class="wl" href="#${loc[1]}" data-n="${loc[0]}" data-id="${loc[1]}">${text}</a>`;
  });
  h = h.replace(/<a class="xl" onclick="go\('(?:pr|ch)','[^']*'\)">([\s\S]*?)<\/a>/g, '$1');
  // code blocks (the file heading before a block names the language)
  h = h.replace(/(<h4 class="file"[^>]*>[\s\S]*?<\/h4>)?\s*<pre class="code"><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g, (m, head, attr, code) => {
    const hint = head ? (head.match(/<code>([^<]*)<\/code>/) || [])[1] : '';
    const body = code.replace(/\n+$/, '');
    return (head || '') + `<div class="t-code"><div class="t-code-header"><span>${(/data-p/.test(attr) ? 'bash' : lang(code, hint))}</span></div><div class="t-code-body" tabindex="0">${body}</div></div>`;
  });
  h = h.replace(/<pre class="code"><code>([\s\S]*?)<\/code><\/pre>/g, (m, code) => `<div class="t-code"><div class="t-code-header"><span>${lang(code, '')}</span></div><div class="t-code-body" tabindex="0">${code.replace(/\n+$/, '')}</div></div>`);
  h = h.replace(/<pre>([\s\S]*?)<\/pre>/g, (m, code) => `<div class="t-code"><div class="t-code-header"><span>${lang(code, '')}</span></div><div class="t-code-body" tabindex="0">${code.replace(/^<code>|<\/code>$/g, '').replace(/\n+$/, '')}</div></div>`);
  // callouts and quotes
  h = h.replace(/<div class="callout ([a-z]+)">([\s\S]*?)<\/div>/g, (m, c, b) => `<div class="t-callout ${CALLOUT[c] || 'info'}">${b}</div>`);
  h = h.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (m, b) => `<div class="t-callout ${/^\s*(<p>)?\s*💡/.test(b) ? 'success' : 'info'}">${b}</div>`);
  // tables
  h = h.replace(/<table>/g, '<div class="t-table-wrap" tabindex="0"><table class="t-mini-table">').replace(/<\/table>/g, '</table></div>');
  h = h.replace(/<details>/g, '<details class="wd">');
  return h;
}

// ---- assemble lessons
const lessons = chapters.map((c) => {
  const sec = (s) => `<div class="t-section reveal" id="${s.id}"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${c.n}.${s.m}</span>${s.title}</div>${s.sub ? `<div class="sub">${s.sub}</div>` : ''}${fix(s.html)}</div>`;
  const road = c.secs.length >= 3 ? `<div class="road"><div class="road-t">🗺️ In this chapter</div><div class="flow">${c.secs.map((s, i) => `${i ? '<i>→</i>' : ''}<span><b>${i + 1}</b>${s.title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').length > 46 ? esc(s.title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').slice(0, 44)) + '…' : s.title.replace(/<[^>]+>/g, '')}</span>`).join('')}</div></div>` : '';
  return { n: c.n, title: c.title, tag: c.tag, icon: c.icon, goal: c.blurb, subtitle: c.blurb, html: `${road}${c.secs.map(sec).join('')}` };
});

// the cheat-sheet chapters are rebuilt after all ids are known so cross-links resolve; re-run for safety
const D = { fill: {}, ice: '', hard: {}, lessons, groups, quiz: {}, cards: [], selfq: '', exam: { mcq: [], wr: [] } };
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(out + '/data.json', JSON.stringify(D));
fs.writeFileSync(out + '/style.css', fs.readFileSync('src/courses/idp/style.css', 'utf8') + '\n' + fs.readFileSync('tools/newcourse/exr.css', 'utf8') + '\n' + fs.readFileSync('tools/wad2/wad2.css', 'utf8'));
console.log('wad2 chapters', lessons.length, 'sections', chapters.reduce((a, c) => a + c.secs.length, 0), 'html KB', Math.round(lessons.reduce((a, l) => a + l.html.length, 0) / 1024));
