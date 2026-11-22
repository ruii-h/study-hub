// A shell-escaping slip had put a literal backspace character (0x08) where the regex word boundary \b belongs. Put the real escape back, and drop the debug hooks.
import fs from 'node:fs';
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  const n = (s.match(/\x08/g) || []).length;
  s = s.split('\x08').join('\\b');
  s = s.replace("(window.__DBG=window.__DBG||[]).push([e.title,t,w,t.length,/^(worked|how)/i.test(t)]);", '');
  s = s.replace('window.__WL=T;', '');
  fs.writeFileSync(f, s);
  console.log(id, 'backspaces fixed:', n, 'debug left:', /__DBG|__WL/.test(s));
}
fs.unlinkSync('tools/_dbg.mjs');
