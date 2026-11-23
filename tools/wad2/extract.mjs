// One-shot: pulls the data arrays and the offline Bootstrap bundle out of the standalone WAD2 page.
// Usage: node tools/wad2/extract.mjs "<path to wad2 html>"
import fs from 'fs';
const src = process.argv[2] || 'C:/Users/Rui Heng/Downloads/wad2 that works offline.html';
const html = fs.readFileSync(src, 'utf8');
const t = html.split('\n');
const out = {};
for (let i = 100; i < t.length; i++) { const m = /^const (THEORY|CHEAT|LESSONS)=([\[{][\s\S]*);\s*$/.exec(t[i]); if (m) out[m[1]] = eval('(' + m[2] + ')'); }
fs.writeFileSync('tools/wad2/data.json', JSON.stringify(out));
const grab = (id) => { const open = '<script type="text/plain" id="' + id + '">'; const a = html.indexOf(open) + open.length; return html.slice(a, html.indexOf('</' + 'script>', a)); };
fs.mkdirSync('src/courses/wad2', { recursive: true });
fs.writeFileSync('src/courses/wad2/bs.css', grab('bs-css'));
fs.writeFileSync('src/courses/wad2/bs.js', grab('bs-js'));
console.log(Object.entries(out).map(([k, v]) => k + ':' + v.length).join(' '));
