// Export the full theory (data.json lessons[]) of a course to Markdown.
// Usage: node tools/export-theory.mjs bpas exports/bpas-theory.md
import fs from 'fs';

const id = process.argv[2] || 'bpas';
const out = process.argv[3] || `exports/${id}-theory.md`;
const d = JSON.parse(fs.readFileSync(`src/courses/${id}/data.json`, 'utf8'));

const ent = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&');

// tiny tokenizer: tags and text
function tokens(html) {
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z0-9]+)([^>]*?)(\/?)>|([^<]+)/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!--')) continue;
    if (m[5] !== undefined) out.push({ t: 'text', v: m[5] });
    else out.push({ t: m[1] ? 'close' : 'open', n: m[2].toLowerCase(), a: m[3] || '', self: !!m[4] });
  }
  return out;
}

const cls = (a) => (/class="([^"]*)"/.exec(a) || [, ''])[1];

function convert(html) {
  html = html.replace(/<svg[\s\S]*?<\/svg>/g, '\n\n*[diagram omitted]*\n\n')
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  const toks = tokens(html);
  let md = '';
  const stack = []; // list contexts
  let inPre = false;
  let tbl = null; // {rows:[[cells]], cur:[], cell:''}
  const emit = (s) => {
    if (tbl && tbl.cell !== null) tbl.cell += s;
    else md += s;
  };
  for (const k of toks) {
    if (k.t === 'text') {
      let v = ent(k.v);
      if (!inPre) v = v.replace(/\s+/g, ' ');
      if (tbl && tbl.cell !== null) tbl.cell += v;
      else md += v;
      continue;
    }
    const n = k.n;
    const open = k.t === 'open';
    if (n === 'br') { emit(tbl && tbl.cell !== null ? ' / ' : '\n'); continue; }
    if (n === 'table') {
      if (open) { tbl = { rows: [], cur: null, cell: null, head: false }; md += '\n\n'; }
      else if (tbl) {
        const rows = tbl.rows.filter((r) => r.length);
        const w = Math.max(...rows.map((r) => r.length), 1);
        const line = (r) => '| ' + Array.from({ length: w }, (_, i) => (r[i] || '').replace(/\|/g, '\\|').trim()).join(' | ') + ' |';
        rows.forEach((r, i) => {
          md += line(r) + '\n';
          if (i === 0) md += '|' + ' --- |'.repeat(w) + '\n';
        });
        md += '\n';
        tbl = null;
      }
      continue;
    }
    if (tbl) {
      if (n === 'tr') { if (open) tbl.cur = []; else if (tbl.cur) { tbl.rows.push(tbl.cur); tbl.cur = null; } continue; }
      if (n === 'td' || n === 'th') {
        if (open) tbl.cell = '';
        else if (tbl.cell !== null) { (tbl.cur || (tbl.cur = [])).push(tbl.cell.replace(/\s+/g, ' ')); tbl.cell = null; }
        continue;
      }
    }
    if (n === 'b' || n === 'strong') { emit(open ? '**' : '**@@S@@'); continue; }
    if (n === 'i' || n === 'em') { emit(open ? '*' : '*@@S@@'); continue; }
    if (n === 'code') { emit('`'); continue; }
    if (n === 'pre') { inPre = open; emit(open ? '\n\n```\n' : '\n```\n\n'); continue; }
    if (n === 'ul' || n === 'ol') {
      if (open) stack.push({ ord: n === 'ol', i: 0 }); else stack.pop();
      if (!stack.length) emit('\n');
      else if (open) emit('\n');
      continue;
    }
    if (n === 'li') {
      if (open) {
        const c = stack[stack.length - 1] || { ord: false, i: 0 };
        c.i++;
        emit('\n' + '  '.repeat(Math.max(0, stack.length - 1)) + (c.ord ? c.i + '. ' : '- '));
      }
      continue;
    }
    if (/^h[1-6]$/.test(n) || (n === 'div' && open && /t-h2|t-h3|gt|road-t/.test(k.a))) {
      if (open) emit('\n\n#### ');
      else emit('\n\n');
      if (!open) continue;
      if (/^h[1-6]$/.test(n)) continue;
      // div heading: close handled by the matching div close below via marker
      stack.push({ divHeading: true });
      continue;
    }
    if (n === 'div' || n === 'p' || n === 'section') {
      if (open) emit('\n\n'); else {
        if (stack.length && stack[stack.length - 1].divHeading) stack.pop();
        emit('\n\n');
      }
      continue;
    }
  }
  return md
    .replace(/\*→\*@@S@@/g, ' → ')
    .replace(/\*\*@@S@@\*\*/g, ' ')
    .replace(/@@S@@(?=[A-Za-z0-9(“"])/g, ' ')
    .replace(/@@S@@/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\*{4}/g, '')
    .replace(/(#### [\d.]+)(?=[A-Za-z])/g, '$1 ')
    .replace(/```\n(?=(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|mindmap))/g, '```mermaid\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

let md = `# ${id.toUpperCase()} theory (full course content)\n\nExported from the Study Hub lessons. Diagrams are omitted; every table, list and callout is kept as text.\n\n---\n\n`;
for (const l of d.lessons) {
  md += `## Module ${l.n}. ${l.title}\n\n`;
  if (l.goal) md += `**Goal:** ${l.goal}\n\n`;
  md += convert(l.html) + '\n\n---\n\n';
}
fs.writeFileSync(out, md);
console.log('wrote', out, md.length, 'chars');
