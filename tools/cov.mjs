import fs from 'fs';
const md=fs.readFileSync('tools/newcourse/cf/source/IS114_Question_Bank.md','utf8');
const d=JSON.parse(fs.readFileSync('src/courses/cf/data.json','utf8'));
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&\w+;/g,' ').toLowerCase();
const tok=s=>new Set(strip(s).replace(/[^a-z0-9 ]+/g,' ').split(/\s+/).filter(w=>w.length>3));
const chap=n=>(n<=2?4:n===22||n===29?4:n<=35?3:n===38?1:n<=76?5:n<=96?6:n<=123?1:n<=151?2:n<=199?4:n<=223?3:n<=240?5:n<=261?6:n<=280?7:n<=310?8:9);
const th={};for(const l of d.lessons)th[l.n]=tok(l.html);
const out=[];let tot=0;
for(const blk of md.split(/\n(?=\d+\. \*\*\[)/)){const m=/^(\d+)\. \*\*\[Short\]\*\* ([^\n]*)\n\s*\*\*Answer:\*\* ([\s\S]*?)$/.exec(blk.trim());if(!m)continue;tot++;
 const n=+m[1],c=chap(n);const a=tok(m[3]);let k=0;for(const w of a)if(th[c].has(w))k++;const cov=k/Math.max(3,a.size);
 out.push({n,c,cov:+cov.toFixed(2),q:m[2].slice(0,70)});}
const low=out.filter(x=>x.cov<0.6);console.log(tot,'shorts;',low.length,'poorly covered by theory');
const by={};low.forEach(x=>(by[x.c]=by[x.c]||[]).push(x));for(const c in by){console.log('ch'+c,by[c].length);by[c].forEach(x=>console.log('  ',x.n,x.cov,x.q))}
