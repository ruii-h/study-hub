/** Live playground for the WAD2 chapters: an editable source box and a sandboxed preview. Bootstrap 5.3 is bundled, so it runs offline. */
const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PH = (w: number, h: number, bg?: string, fg?: string, t?: string) =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#${bg || 'ccc'}"/><text x="50%" y="50%" fill="#${fg || '969696'}" font-family="sans-serif" font-size="${Math.max(10, Math.min(w, h) / 6 | 0)}" text-anchor="middle" dominant-baseline="middle">${E(t || w + '×' + h)}</text></svg>`);
const phSub = (s: string) => s.replace(/https:\/\/placehold\.co\/(\d+)x(\d+)(?:\/(\w+)\/(\w+))?(?:\?text=([^"'\s)]+))?/g, (_m, w, h, bg, fg, t) => PH(+w, +h, bg, fg, t && decodeURIComponent(t)));

let bsCache: string | null = null;
async function bundle(): Promise<string> {
  if (bsCache) return bsCache;
  const [css, js] = await Promise.all([import('./bs.css?raw'), import('./bs.js?raw')]);
  bsCache = '<style>' + css.default + '</style><script>' + js.default + '<\/script>';
  return bsCache;
}

const mounted = new WeakSet<Element>();
export function mountDemos(hosts: Element[]) {
  for (const host of hosts) {
    if (mounted.has(host)) continue;
    mounted.add(host);
    const src = host.querySelector<HTMLTextAreaElement>('.pg-src')?.value ?? '';
    const bar = document.createElement('div'); bar.className = 'pg-bar';
    const run = document.createElement('button'); run.type = 'button'; run.className = 'btn'; run.textContent = '▶ Run';
    const reset = document.createElement('button'); reset.type = 'button'; reset.className = 'btn ghost'; reset.textContent = '↺ Reset';
    const hint = document.createElement('span'); hint.className = 'pg-hint'; hint.textContent = 'Edit the code, then press Run (Ctrl+Enter)';
    bar.append(run, reset, hint);
    const ed = document.createElement('textarea'); ed.className = 'pg-ed'; ed.spellcheck = false; ed.value = src; ed.setAttribute('aria-label', 'Editable source code');
    ed.rows = Math.min(22, Math.max(8, src.split('\n').length + 1));
    const fr = document.createElement('div'); fr.className = 'pg-pv';
    host.append(bar, ed, fr);
    const go = async () => {
      const f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-scripts allow-modals'); f.title = 'Live preview';
      let code = ed.value;
      if (code.includes('{{BS}}')) code = code.split('{{BS}}').join(await bundle());
      f.srcdoc = phSub(code);
      fr.replaceChildren(f);
    };
    run.onclick = go;
    reset.onclick = () => { ed.value = src; go(); };
    ed.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { e.preventDefault(); const a = ed.selectionStart; ed.setRangeText('  ', a, ed.selectionEnd, 'end'); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); go(); }
    });
    go();
  }
}
export function disposeDemos() { /* iframes are removed together with the chapter */ }
