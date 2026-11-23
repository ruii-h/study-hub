import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useG } from '../../guide/state';
import { html as hl } from '../../course/highlight-web';
import { bundle, phSub } from './play';

const WIDTHS: [string, string, string][] = [['Phone', '375px', '📱'], ['Tablet', '768px', '📲'], ['Full', '100%', '🖥️']];

/** Live playground: highlighted editor, auto-running preview that swaps in only once the new page has loaded (no white flash). */
export default function Playground() {
  const g = useG(); const { D, ST, PW, patch } = g;
  const list = D.play as { id: string; g: string; title: string; desc: string; code: string }[];
  const id = list.find((p) => p.id === ST.play) ? (ST.play as string) : list[0].id;
  const ex = list.find((p) => p.id === id)!;
  const idx = list.indexOf(ex);
  const [code, setCode] = useState<string>(() => PW['pg_' + id] ?? ex.code);
  const [auto, setAuto] = useState(true);
  const [wi, setWi] = useState(2);
  const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null), pre = useRef<HTMLPreElement>(null), ta = useRef<HTMLTextAreaElement>(null);
  const seq = useRef(0), loaded = useRef('');

  const run = useCallback(async (src: string) => {
    const my = ++seq.current; setBusy(true);
    let c = src;
    if (c.includes('{{BS}}')) c = c.split('{{BS}}').join(await bundle());
    if (my !== seq.current || !box.current) return;
    const b = box.current;
    const f = document.createElement('iframe');
    f.className = 'pg-fr'; f.title = 'Live preview'; f.setAttribute('sandbox', 'allow-scripts allow-modals'); f.style.opacity = '0';
    f.onload = () => {
      if (my !== seq.current) { f.remove(); return; }
      f.style.opacity = '1'; setBusy(false);
      setTimeout(() => b.querySelectorAll('iframe').forEach((o) => { if (o !== f) o.remove(); }), 200);
    };
    f.srcdoc = phSub(c); b.appendChild(f);
  }, []);

  // switching exercise: load that exercise's saved (or original) code and run it straight away
  useEffect(() => { const c = PW['pg_' + id] ?? ex.code; setCode(c); loaded.current = id; run(c); }, [id]); // eslint-disable-line
  useEffect(() => { bundle(); }, []);
  // typing: auto-run and save, both debounced
  useEffect(() => {
    if (loaded.current !== id) return;
    const t = setTimeout(() => {
      if (auto) run(code);
      patch('PW', (o) => { const x = { ...o }; if (code === ex.code) delete x['pg_' + id]; else x['pg_' + id] = code; return x; });
    }, 500);
    return () => clearTimeout(t);
  }, [code]); // eslint-disable-line
  const marked = useMemo(() => hl(code) + '\n', [code]);
  const sync = () => { if (pre.current && ta.current) { pre.current.scrollTop = ta.current.scrollTop; pre.current.scrollLeft = ta.current.scrollLeft; } };
  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    if (e.key === 'Tab') { e.preventDefault(); el.setRangeText('  ', el.selectionStart, el.selectionEnd, 'end'); setCode(el.value); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(code); }
  };
  const go = (d: number) => { const p = list[idx + d]; if (p) patch('ST', (o) => ({ ...o, play: p.id })); };
  const modified = code !== ex.code;

  return (
    <div className="pane pgm" id="playm" tabIndex={0}>
      <h1 className="t-h1" style={{ fontSize: 24 }}>{ex.title}</h1>
      <div className="sub">{ex.desc}</div>
      <div className="pg-bar">
        <button className="btn" onClick={() => run(code)}>▶ Run</button>
        <button className="btn ghost" disabled={!modified} onClick={() => { setCode(ex.code); run(ex.code); }}>↺ Reset</button>
        <label className="pg-auto"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} /> Auto-run</label>
        <span className={`pg-state ${busy ? 'on' : ''}`} aria-live="polite">{busy ? 'Updating…' : modified ? 'Edited · saved' : 'Original'}</span>
        <span className="pg-sp" />
        <div className="pg-seg" role="group" aria-label="Preview width">{WIDTHS.map(([n, , ico], i) => <button key={n} className={wi === i ? 'on' : ''} aria-pressed={wi === i} onClick={() => setWi(i)}>{ico} {n}</button>)}</div>
      </div>
      <div className="pg-split">
        <div className="pg-edwrap" aria-label="Code editor">
          <pre ref={pre} className="pg-hl" aria-hidden="true" dangerouslySetInnerHTML={{ __html: marked }} />
          <textarea ref={ta} className="pg-ta" value={code} spellCheck={false} autoCapitalize="off" autoComplete="off" aria-label="Editable source code"
            onChange={(e) => setCode(e.target.value)} onScroll={sync} onKeyDown={onKey} />
        </div>
        <div className="pg-pvwrap"><div className="pg-pvbox" ref={box} style={{ width: WIDTHS[wi][1] }} /></div>
      </div>
      <div className="pg-nav">
        <button className="t-nav-btn" disabled={!list[idx - 1]} onClick={() => go(-1)}><small>Previous</small>{list[idx - 1] ? '← ' + list[idx - 1].title : '—'}</button>
        <button className="t-nav-btn next" disabled={!list[idx + 1]} onClick={() => go(1)}><small>Next</small>{list[idx + 1] ? list[idx + 1].title + ' →' : '—'}</button>
      </div>
    </div>
  );
}
