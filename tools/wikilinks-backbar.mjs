// One-off: the "Back" bar floats at the bottom of the screen (fixed, out of the page flow) so it never collides with the sticky section tabs
// and never shifts the text under the reader.
import fs from 'node:fs';
const CSS = `
/* ---- back bar: floating pill, out of flow ---- */
.theory-content>.backbar{position:fixed!important;top:auto!important;bottom:22px;left:50%;transform:translateX(-50%);width:auto!important;max-width:min(92vw,460px)!important;margin:0!important;z-index:60;border-radius:999px;padding:10px 20px;box-shadow:0 8px 24px rgba(0,0,0,.45);animation:wlPop .22s cubic-bezier(.2,.7,.2,1) backwards}
@keyframes wlPop{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}
@media(max-width:900px){.theory-content>.backbar{bottom:calc(84px + env(safe-area-inset-bottom))}}
`;
const edits = [
  ["if(!b){if(bar){const h=bar.offsetHeight+12;bar.remove();c.scrollTop=Math.max(0,c.scrollTop-h)}return}", "if(!b){if(bar)bar.remove();return}"],
  ["c.insertBefore(bar,c.firstChild);c.scrollTop+=bar.offsetHeight+12}}", "c.insertBefore(bar,c.firstChild)}}"],
];
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  for (const [a, b] of edits) {
    if (!s.includes(a)) throw new Error(id + ': ' + a.slice(0, 50));
    s = s.replace(a, () => b);
  }
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  console.log(id, 'ok');
}
