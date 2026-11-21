const fs=require('fs');
for (const [k,f] of [['algo','algo/script0.js'],['bpas','bpas/script1.js'],['idp','idp/script1.js']]) {
  const s=fs.readFileSync(f,'utf8'); const lines=s.split('\n');
  const di=lines.findIndex(l=>l.startsWith('const D='));
  const line=lines[di];
  // find end of JSON: evaluate progressively using JSON parse from first '{' to last '};'
  const end=line.lastIndexOf('};');
  const json=line.slice(8,end+1);
  let D; try{D=JSON.parse(json)}catch(e){console.log(k,'JSON parse fail',e.message.slice(0,100)); continue}
  const tail=line.slice(end+2);
  console.log(k,'D line',di,'keys',Object.keys(D),'tail',JSON.stringify(tail.slice(0,80)),'other lines before D:',di, 'lessons',D.lessons.length);
  fs.writeFileSync(`${k}/data.json`,JSON.stringify(D));
  const engine=[...lines.slice(0,di),tail,...lines.slice(di+1)].join('\n');
  fs.writeFileSync(`${k}/engine.js`,engine);
  console.log(' engine bytes',engine.length,'KEY:',/const KEY='([^']+)'/.exec(engine)[1]);
}
