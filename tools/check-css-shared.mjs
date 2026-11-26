// Fails if the same CSS rule sits in two course stylesheets: shared rules belong in src/course/guide-base.css so a fix lands in every course.
import fs from 'fs'; import postcss from 'postcss';
const ids = fs.readdirSync('src/courses').filter((d) => d !== 'bpas' && fs.existsSync(`src/courses/${d}/style.css`));
const norm = (n) => n.toString().replace(/\s+/g, ' ').trim();
const where = new Map();
for (const id of ids) for (const n of postcss.parse(fs.readFileSync(`src/courses/${id}/style.css`, 'utf8')).nodes) if (n.type !== 'comment') { const k = norm(n); (where.get(k) || where.set(k, new Set()).get(k)).add(id); }
const dup = [...where].filter(([, s]) => s.size > 1);
for (const [k, s] of dup.slice(0, 15)) console.log([...s].join('+'), k.slice(0, 110));
console.log(dup.length ? `${dup.length} rule(s) are duplicated across courses: move them to src/course/guide-base.css` : 'ok: no CSS duplicated across courses');
process.exit(dup.length ? 1 : 0);
