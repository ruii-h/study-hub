import path from 'node:path';
import { pathToFileURL } from 'node:url';
const { default: C } = await import(pathToFileURL(path.resolve('tools/newcourse', process.argv[2], 'course.mjs')).href);
for (const ch of C.chapters) { console.log(`\n== ${ch.n} ${ch.title}`); ch.sections().forEach((s, i) => console.log(`  ${s.unnumbered ? '-' : i + (ch.n == 1 && C.id == 'cf' ? 0 : 1)}. ${s.title.slice(0, 70)}  [${s.md.length}]`)); }
