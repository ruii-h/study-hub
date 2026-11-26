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
  'Vue composables & Pinia': 'Week 11: composables, why a store, Pinia state/getters/actions, the MiniShop example and persistence.',
  'Vue routing & guards': 'Week 11: route params, redirects, router.push, navigation guards, the exercises and a recap.',
  'Testing concepts': 'Week 10: verification vs validation, regression, TDD, load testing and the three test types.',
  'Unit testing with Vitest': 'describe, it, expect, running Vitest, matchers and choosing test cases.',
  'Component & integration testing': 'Vue component tests, stubs, fragile vs robust tests, integration tests and emitted events.',
  'E2E testing with Playwright': 'The tool landscape, installing and recording tests, reading a test and testing a Vue form.',
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
  'Code · Week 10 Testing': 'Full source of the Week 10 Vitest and Playwright exercises and solutions.',
  'Code · Week 11 Pinia & routing': 'Full source of the Week 11 composable, MiniShop backend, stores, views and exercise solutions.',
  'Appendix': 'Pinia, router guards, and what each file in the course archive was used for.',
};
const PLAN = [
  ['🧭 Start & exam toolkit', 'yellow', [['Start here', '🧭'], ['Debugging & mistakes', '🐞'], ['Tooling & exam rules', '📋']]],
  ['🌐 Web foundations', 'blue', [['HTML', '🏷️'], ['JavaScript & web APIs', '⚙️']]],
  ['🎨 Styling', 'orange', [['CSS core', '🎯'], ['CSS layout', '📐'], ['CSS components & extras', '🧩'], ['Bootstrap: grid & utilities', '🧱'], ['Bootstrap: components & workflow', '🪟']]],
  ['💚 Vue', 'green', [['Vue basics', '🌱'], ['Vue directives', '🔀'], ['Vue logic & state', '🧠'], ['Vue components & routing', '🧭'], ['Vue composables & Pinia', '🍍'], ['Vue routing & guards', '🚦']]],
  ['🗄️ Data & servers', 'purple', [['Axios concepts', '📡'], ['Axios CRUD', '🔁'], ['Axios patterns', '🧰'], ['Express & MongoDB', '🍃']]],
  ['🧪 Testing', 'red', [['Testing concepts', '📖'], ['Unit testing with Vitest', '🔬'], ['Component & integration testing', '🧩'], ['E2E testing with Playwright', '🎭']]],
];
const CHEAT_GROUPS = [['1 · CSS', '🎨', 'CSS'], ['2 · Bootstrap', '🧱', 'Bootstrap'], ['3 · Vue', '💚', 'Vue'], ['4 · Axios & backend', '📡', 'Axios & backend'], ['5 · Debugging & exam day', '🐞', 'Debugging & exam day']];
const CODE = [['Code · Index', '🗂️'], ['Code · Week 2 CSS', '🎨'], ['Code · Week 3 Bootstrap', '🧱'], ['Code · Week 4 Vue basics', '🌱'], ['Code · Week 5 Lists & Axios', '📡'], ['Code · Week 6 Components', '🧩'], ['Code · Week 10 Testing', '🧪'], ['Code · Week 11 Pinia & routing', '🍍'], ['Appendix', '📎']];

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
const chapters = []; // {n,dn,title,icon,tag,blurb,secs:[{id,title,html,sub}]}
const topicLoc = {};
let n = 0;
const dnCount = {};
const addChap = (c, scope) => { c.n = ++n; c.scope = scope; c.dn = dnCount[scope] = (dnCount[scope] || 0) + 1; chapters.push(c); c.secs.forEach((x, i) => { x.m = i + 1; x.id = `s${c.n}-${x.m}`; if (x.tid) topicLoc[x.tid] = [c.n, x.id]; }); return c.n; };
const byGroup = (arr, g) => arr.filter((x) => x.group === g);
const topicSec = (t) => ({ tid: t.id, title: t.title, sub: t.subtitle, html: t.html });
const groups = [];
for (const [tt, tag, gs] of PLAN) {
  const ns = [];
  for (const [g, icon] of gs) ns.push(addChap({ title: g, icon, tag, blurb: BLURB[g], secs: byGroup(W.THEORY, g).map(topicSec) }, 'theory'));
  groups.push({ t: tt, ns, tag });
}
const cheatNs = CHEAT_GROUPS.map(([g, icon, nm]) => addChap({ title: nm, icon, tag: 'orange', blurb: 'Scenario-to-code lookups for ' + nm + '. The basics live in the theory chapters.', secs: byGroup(W.CHEAT, g).map(topicSec) }, 'cheat'));
const codeGroups = [['📂 Index', ['Code · Index']], ['📝 Weekly code', ['Code · Week 2 CSS', 'Code · Week 3 Bootstrap', 'Code · Week 4 Vue basics', 'Code · Week 5 Lists & Axios', 'Code · Week 6 Components', 'Code · Week 10 Testing', 'Code · Week 11 Pinia & routing']], ['📎 Appendix', ['Appendix']]];
const codeNs = [], codeGrp = [];
for (const [t, gl] of codeGroups) { const ns = gl.map((g) => addChap({ title: g.replace(/^Code · /, ''), icon: CODE.find((c) => c[0] === g)[1], tag: 'purple', blurb: BLURB[g], secs: byGroup(W.THEORY, g).map(topicSec) }, 'code')); codeNs.push(...ns); codeGrp.push({ t, ns, tag: 'purple' }); }
const play = W.LESSONS.map((l, i) => ({ id: 'p' + (i + 1), g: l.g, title: l.title, desc: l.desc, code: l.code }));

// ---- code clean-up: tabs to two spaces, trim blank edges, collapse blank runs, drop the common indent (whitespace only)
function tidy(escaped) {
  let t = escaped.replace(/\r/g, '').replace(/\t/g, '  ').replace(/[ ]+$/gm, '').replace(/^\n+|\n+$/g, '').replace(/\n{3,}/g, '\n\n');
  t = t.replace(/(&lt;(?:script|template|style)[^\n]*&gt;)\n\n+/g, '$1\n').replace(/\n\n+(&lt;\/(?:script|template|style)&gt;)/g, '\n$1');
  const ind = t.split('\n').filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const m = ind.length ? Math.min(...ind) : 0;
  if (m > 0) t = t.split('\n').map((l) => l.slice(Math.min(m, l.match(/^ */)[0].length))).join('\n');
  return t;
}
const codeBox = (l, body, head) => '<div class="t-code' + (head ? ' filecode' : '') + '"' + (head && head.id ? ' id="' + head.id + '"' : '') + '><div class="t-code-header"><span>' + l + '</span>' + (head ? '<strong class="ft">' + head.title + '</strong><code class="fp">' + head.path + '</code>' : '') + '</div><div class="t-code-body" tabindex="0">' + tidy(body) + '</div></div>';

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
  h = h.replace(/(<h4 class="file"([^>]*)>([\s\S]*?)<\/h4>)?\s*<pre class="code"><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g, (m, h4, h4attr, h4in, attr, code) => {
    let head = null;
    if (h4) { const t = (h4in.match(/<span class="ftitle">([\s\S]*?)<\/span>/) || [])[1] || '', p = (h4in.match(/<code>([^<]*)<\/code>/) || [])[1] || ''; head = { id: (h4attr.match(/id="([^"]+)"/) || [])[1], title: t, path: p }; }
    return codeBox(/data-p/.test(attr) ? 'bash' : lang(code, head ? head.path : ''), code, head);
  });
  h = h.replace(/<pre class="code"><code>([\s\S]*?)<\/code><\/pre>/g, (m, code) => `<div class="t-code"><div class="t-code-header"><span>${lang(code, '')}</span></div><div class="t-code-body" tabindex="0">${code.replace(/\n+$/, '')}</div></div>`);
  h = h.replace(/<pre>([\s\S]*?)<\/pre>/g, (m, code) => codeBox(lang(code, ''), code.replace(/^<code>|<\/code>$/g, '')));
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
  const sec = (x) => `<div class="t-section reveal" id="${x.id}"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${c.dn}.${x.m}</span>${x.title}</div>${x.sub ? `<div class="sub">${x.sub}</div>` : ''}${fix(x.html)}</div>`;
  const plain = (t) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  const road = c.secs.length >= 3 ? `<div class="road"><div class="road-t">🗺️ In this chapter</div><div class="flow">${c.secs.map((x, i) => `${i ? '<i>→</i>' : ''}<span><b>${i + 1}</b>${plain(x.title).length > 46 ? esc(plain(x.title).slice(0, 44)) + '…' : x.title.replace(/<[^>]+>/g, '')}</span>`).join('')}</div></div>` : '';
  return { n: c.n, dn: c.dn, title: c.title, tag: c.tag, icon: c.icon, goal: c.blurb, subtitle: c.blurb, html: `${road}${c.secs.map(sec).join('')}` };
});

const D = { fill: {}, ice: '', hard: {}, lessons, groups, quiz: {}, cards: [], selfq: '', exam: { mcq: [], wr: [] }, play,
  tabs: [
    { key: 'cheat', ico: '📌', label: 'Cheat', x: ' sheets', ns: cheatNs, groups: [{ t: '⚡ Scenario lookups', ns: cheatNs, tag: 'orange' }] },
    { key: 'play', ico: '▶️', label: 'Live', x: ' playground', kind: 'play' },
    { key: 'code', ico: '📦', label: 'Code', x: ' archive', ns: codeNs, groups: codeGrp },
  ] };
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(out + '/data.json', JSON.stringify(D));
fs.writeFileSync(out + '/style.css', fs.readFileSync('src/courses/idp/style.css', 'utf8') + '\n' + fs.readFileSync('tools/newcourse/exr.css', 'utf8') + '\n' + fs.readFileSync('tools/wad2/wad2.css', 'utf8'));
console.log('wad2 chapters', lessons.length, 'theory', dnCount.theory, 'cheat', dnCount.cheat, 'code', dnCount.code, 'play', play.length, 'html KB', Math.round(lessons.reduce((a, l) => a + l.html.length, 0) / 1024));
