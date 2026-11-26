import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('src/courses/bpas/data.json', 'utf8'));
d.lessons.forEach((l) => { const m = /<div class="road">[\s\S]*?<\/div><\/div>/.exec(l.html); console.log(l.n, m ? m[0].replace(/<\/span>/g, ' | ').replace(/<[^>]+>/g, '') : 'NO ROAD'); });
