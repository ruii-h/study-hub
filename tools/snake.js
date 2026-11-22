function morph(el,html){const t=document.createElement('div');t.innerHTML=html;const sel='button,.theory-group-title,.theory-nav-header,.pq-head';const a=[...el.querySelectorAll(sel)],b=[...t.querySelectorAll(sel)];
 if(a.length&&a.length===b.length&&a.every((x,i)=>x.tagName===b[i].tagName&&x.className.split(' ')[0]===b[i].className.split(' ')[0]&&(x.getAttribute('onclick')||'')===(b[i].getAttribute('onclick')||''))){
  a.forEach((x,i)=>{if(x.className!==b[i].className)x.className=b[i].className;if(x.innerHTML!==b[i].innerHTML)x.innerHTML=b[i].innerHTML;const c=b[i].getAttribute('aria-current');if(c)x.setAttribute('aria-current',c);else x.removeAttribute('aria-current')});return}
 el.innerHTML=html}
/* simple one-way vertical chains (flowchart TD with no branches) become a compact snake of numbered boxes */
function snakeChains(){$$('#theory-content pre.mermaid:not([data-processed])').forEach(pre=>{const src=pre.textContent;if(!/^\s*(%%.*\n)?\s*(flowchart|graph)\s+(TD|TB)/m.test(src)||/subgraph|-\.|==>/.test(src))return;
 const lab={},edges=[];const nodeRe=/([A-Za-z_]\w*)\s*(?:\["([^"]*)"\]|\[([^\]]*)\]|\("([^"]*)"\)|\(([^)]*)\))/g;let m;while((m=nodeRe.exec(src)))lab[m[1]]=(m[2]||m[3]||m[4]||m[5]||'').trim();
 src.replace(nodeRe,'$1').split('\n').forEach(l=>{const p=l.split('-->').map(x=>x.replace(/\|[^|]*\|/g,'').trim());for(let i=0;i<p.length-1;i++){const a=p[i].match(/^[A-Za-z_]\w*/),b=p[i+1].match(/^[A-Za-z_]\w*/);if(a&&b)edges.push([a[0],b[0]])}});
 if(edges.length<3)return;const out={},inn={};edges.forEach(([a,b])=>{out[a]=(out[a]||0)+1;inn[b]=(inn[b]||0)+1});
 if(Object.values(out).some(v=>v>1)||Object.values(inn).some(v=>v>1))return;
 const start=edges.map(e=>e[0]).find(a=>!inn[a]);if(!start)return;const next={};edges.forEach(([a,b])=>next[a]=b);const order=[];let c=start,g=0;while(c&&g++<40){order.push(c);c=next[c]}
 if(order.length<4||order.length!==new Set(order).size)return;
 const w=(pre.parentElement&&pre.parentElement.clientWidth)||600,cols=Math.max(1,Math.min(4,Math.floor(w/210)));
 const d=document.createElement('div');d.className='snake';d.style.setProperty('--cols',cols);
 d.innerHTML=order.map((id,i)=>{const r=Math.floor(i/cols),k=i%cols,col=r%2?cols-k:k+1,last=i===order.length-1,arrow=last?'':(k===cols-1?'↓':(r%2?'←':'→'));
  const t=esc(lab[id]||id).replace(/^\d+\.\s*/,'').replace(/&lt;br\s*\/?&gt;/g,'<br>');return `<div class="sn" style="grid-row:${r+1};grid-column:${col}" data-a="${arrow}"><b>${i+1}</b><span>${t}</span></div>`}).join('');
 pre.replaceWith(d)})}
function mm(){snakeChains();const bl=$$('#theory-content pre.mermaid:not([data-processed])');if(!bl.length)return;if(!window.mermaid){__api.loadMermaid().then(m=>{window.mermaid=m;mm()}).catch(()=>{});return}
 const go=async(nodes,n)=>{try{mermaid.initialize({startOnLoad:false,securityLevel:'loose',theme:(document.documentElement.dataset.theme=='light'?'neutral':'dark')});await mermaid.run({nodes})}catch(e){}
  const bad=nodes.filter(x=>x.isConnected&&!x.querySelector('svg'));if(bad.length&&n<3)setTimeout(()=>go(bad,n+1),600)};go(bl,0)}
