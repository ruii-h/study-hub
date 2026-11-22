// One-off: back pill v3 — sticky at the bottom of the lesson column (so it is centred on the page content, not the window),
// calmer look, 85/15 split, and no press animation spilling over the dismiss button.
import fs from 'node:fs';

const CSS = `
/* ---- back pill v3 ---- */
.theory-content>.backbar{position:sticky!important;top:auto!important;left:auto!important;bottom:18px;transform:none!important;
 display:flex!important;align-items:stretch;width:min(calc(100% - 24px),380px)!important;max-width:none!important;margin:18px auto 0!important;padding:0!important;
 min-height:0;height:42px;overflow:hidden;border-radius:999px;z-index:60;
 background:var(--surface2,#1c2128)!important;color:var(--text,#e6edf3)!important;border:1px solid var(--cy,#67d4f5)!important;
 box-shadow:0 6px 22px rgba(0,0,0,.4),0 0 0 1px rgba(0,0,0,.2);animation:wlPop2 .22s cubic-bezier(.2,.7,.2,1) backwards}
@keyframes wlPop2{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.backbar button{animation:none!important;transform:none!important;filter:none!important;box-shadow:none!important;border-radius:0!important;margin:0;-webkit-tap-highlight-color:transparent}
.backbar .bb-go{flex:1 1 85%!important;min-width:0;min-height:0!important;height:100%;padding:0 6px 0 18px!important;background:none!important;color:inherit!important;font:600 13.5px/1 'Segoe UI',system-ui,sans-serif!important;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;border:0!important}
.backbar .bb-x{flex:0 0 15%!important;min-height:0!important;height:100%;background:none!important;color:var(--muted,#8b949e)!important;font:400 20px/1 'Segoe UI',system-ui,sans-serif!important;border:0!important;border-left:1px solid var(--border,#30363d)!important;cursor:pointer;padding:0!important}
.backbar .bb-go::first-letter{color:var(--cy,#67d4f5)}
@media(hover:hover){.backbar .bb-go:hover{background:rgba(103,212,245,.12)!important}.backbar .bb-x:hover{background:rgba(255,255,255,.08)!important;color:var(--text,#e6edf3)!important}}
.backbar .bb-go:active,.backbar .bb-x:active{background:rgba(103,212,245,.2)!important}
@media(max-width:900px){.theory-content>.backbar{bottom:calc(14px + env(safe-area-inset-bottom))}}
`;

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  // markup for pages opened with a back target: move the bar to the END of the page (sticky-bottom pill)
  const lead = "$('#theory-content').innerHTML=`${back}<div class=\"t-hero\">";
  if (!s.includes(lead)) throw new Error(id + ' lead');
  s = s.replace(lead, () => "$('#theory-content').innerHTML=`<div class=\"t-hero\">");
  const tail = "Take the Final Exam →</button>`}</div>`;";
  if (!s.includes(tail)) throw new Error(id + ' tail');
  s = s.replace(tail, () => "Take the Final Exam →</button>`}</div>${back}`;");
  // wlBar: append at the end
  const ins = "else c.insertBefore(nb,c.firstChild)}";
  if (!s.includes(ins)) throw new Error(id + ' insert');
  s = s.replace(ins, () => 'else c.appendChild(nb)}');
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  console.log(id, 'ok');
}
