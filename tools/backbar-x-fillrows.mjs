// One-off: (1) a dismiss "x" on the floating Back pill (right-most 20%); (2) cards that leave an empty grid cell next to them stretch to fill the row.
import fs from 'node:fs';

const BAR_FN = String.raw`function wlBarEl(b){const d=document.createElement('div');d.className='backbar';
   const go=document.createElement('button');go.className='bb-go';go.textContent='↩ '+b.label;go.onclick=()=>goBack();
   const x=document.createElement('button');x.className='bb-x';x.textContent='×';x.title='Dismiss';x.setAttribute('aria-label','Dismiss');x.onclick=()=>d.remove();
   d.append(go,x);return d}
  function wlBar(b){const c=$('#theory-content');let bar=c.querySelector(':scope>.backbar');
   if(!b){if(bar)bar.remove();return}
   const nb=wlBarEl(b);if(bar)bar.replaceWith(nb);else c.insertBefore(nb,c.firstChild)}
  `;

const FILL_FN = String.raw`/* cards that would leave an empty grid cell next to them stretch to fill the row */
  function fillRows(root){const cont=root||$('#theory-content');if(!cont)return;
   cont.querySelectorAll('.t-section,.teach').forEach(s=>{const kids=[...s.children].filter(k=>k.offsetHeight>0&&getComputedStyle(k).position!=='absolute');
    kids.forEach(k=>k.style.removeProperty('grid-column'));
    const tpl=getComputedStyle(s).gridTemplateColumns;if(!tpl||tpl==='none')return;const cols=tpl.split(' ').length;if(cols<2)return;
    const colW=parseFloat(tpl.split(' ')[0]),gap=parseFloat(getComputedStyle(s).columnGap)||0;
    const rows=new Map();kids.forEach(k=>{const key=k.offsetTop;if(!rows.has(key))rows.set(key,[]);rows.get(key).push(k)});
    rows.forEach(list=>{const spans=list.map(k=>Math.max(1,Math.round((k.offsetWidth+gap)/(colW+gap))));const used=spans.reduce((a,b)=>a+b,0);
     if(used<cols){const last=list[list.length-1];last.style.gridColumn='span '+(spans[spans.length-1]+cols-used)}})})}
  var FRT=0;__L(window,'resize',()=>{clearTimeout(FRT);FRT=setTimeout(()=>fillRows(),160)});__undo.push(()=>clearTimeout(FRT));
  `;

const CSS = `
/* ---- back pill: label (80%) + dismiss (20%) ---- */
.theory-content>.backbar{display:flex!important;align-items:stretch;padding:0!important;overflow:hidden;cursor:default}
.backbar .bb-go{flex:1 1 80%;min-width:0;background:none;border:0;color:inherit;font:inherit;text-align:left;padding:10px 12px 10px 20px;min-height:44px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.backbar .bb-x{flex:0 0 20%;background:rgba(0,0,0,.16);border:0;border-left:1px solid rgba(0,0,0,.2);color:inherit;font:700 22px/1 'Segoe UI',system-ui,sans-serif;min-height:44px;cursor:pointer}
@media(hover:hover){.backbar .bb-x:hover{background:rgba(0,0,0,.28)}}
`;

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  // markup for pages opened with a back target
  const oldTpl = "const back=o.back?`<button class=\"backbar\" onclick=\"goBack()\">↩ ${esc(o.back.label)}</button>`:'';";
  const newTpl = "const back=o.back?`<div class=\"backbar\"><button class=\"bb-go\" onclick=\"goBack()\">↩ ${esc(o.back.label)}</button><button class=\"bb-x\" title=\"Dismiss\" aria-label=\"Dismiss\" onclick=\"this.parentNode.remove()\">×</button></div>`:'';";
  if (!s.includes(oldTpl)) throw new Error(id + ' back tpl');
  s = s.replace(oldTpl, () => newTpl);
  // wlBar helper
  const a = s.indexOf('function wlBar(b){');
  const b = s.indexOf('function wlGo(a){');
  if (a < 0 || b < 0) throw new Error(id + ' wlBar');
  s = s.slice(0, a) + BAR_FN + s.slice(b);
  // fillRows: define before autolink, call after links are placed
  const af = '  function autolink(c,n){';
  if (!s.includes(af)) throw new Error(id + ' autolink');
  s = s.replace(af, () => '  ' + FILL_FN + 'function autolink(c,n){');
  const hook = 'autolink(c,n);';
  if (!s.includes(hook)) throw new Error(id + ' hook');
  s = s.replace(hook, () => 'autolink(c,n);fillRows(c);');
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  console.log(id, 'ok');
}
