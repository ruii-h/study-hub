import { useState } from 'react';
import { Key, Stat, Stats, Tabs, COL } from './kit';
import { Btn, DemoCard, Msg, Row } from './ui';

type Mode = 'chain' | 'probe';
const N = 7;
const code = (w: string) => [...w].reduce((s, c) => s + c.charCodeAt(0) - 96, 0);
const h = (w: string) => code(w) % N;
const DEL = '⌫';
const WORDS = ['cat', 'dog', 'cow', 'ant', 'bee', 'fox', 'owl', 'elk'];

export default function HashLab() {
  const [mode, setMode] = useState<Mode>('chain');
  const [chain, setChain] = useState<string[][]>(Array.from({ length: N }, () => []));
  const [probe, setProbe] = useState<(string | null)[]>(Array(N).fill(null));
  const [word, setWord] = useState('cat');
  const [msg, setMsg] = useState('Pick a word and insert it. The hash function adds up letter values (a=1, b=2, …) and takes the remainder after dividing by 7.');
  const [hot, setHot] = useState<number[]>([]);
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  const calc = `${[...w].map((c) => c.charCodeAt(0) - 96).join('+') || '0'} = ${code(w)}, ${code(w)} mod ${N} = ${h(w)}`;
  const load = mode === 'chain' ? chain.flat().length : probe.filter((x) => x && x !== DEL).length;

  const insert = () => {
    if (!w) return; const i = h(w);
    if (mode === 'chain') {
      if (chain[i].includes(w)) { setMsg(`${w} is already stored.`); return; }
      const col = chain[i].length > 0;
      setChain(chain.map((c, k) => (k === i ? [...c, w] : c))); setHot([i]);
      setMsg(`${w} → ${calc}. ${col ? `Collision! Row ${i} already holds ${chain[i].join(', ')}, so ${w} is added to that row's chain.` : `Row ${i} was empty: store it there.`}`);
    } else {
      if (probe.includes(w)) { setMsg(`${w} is already stored.`); return; }
      const tried: number[] = []; let j = i;
      for (let s = 0; s < N; s++) { j = (i + s) % N; tried.push(j); if (probe[j] === null || probe[j] === DEL) break; }
      if (probe[j] !== null && probe[j] !== DEL) { setMsg('The table is full.'); return; }
      setProbe(probe.map((x, k) => (k === j ? w : x))); setHot(tried);
      setMsg(`${w} → ${calc}. ${tried.length > 1 ? `Rows ${tried.slice(0, -1).join(', ')} were taken, so probe forward (+1, wrapping round) and store it in row ${j}.` : `Row ${i} was free: store it there.`}`);
    }
  };
  const find = () => {
    if (!w) return; const i = h(w);
    if (mode === 'chain') { const k = chain[i].indexOf(w); setHot([i]); setMsg(`${w} → row ${i}. Scan that chain (${chain[i].length} item${chain[i].length === 1 ? '' : 's'}): ${k >= 0 ? `found at position ${k + 1}.` : 'not found.'}`); return; }
    const tried: number[] = []; let found = false;
    for (let s = 0; s < N; s++) { const j = (i + s) % N; tried.push(j); if (probe[j] === w) { found = true; break; } if (probe[j] === null) break; }
    setHot(tried); setMsg(`${w} → row ${i}. Probe ${tried.length} row${tried.length > 1 ? 's' : ''}: ${found ? 'found.' : 'hit an empty row (a never-used one), so it is not in the table.'} Deleted rows (${DEL}) do not stop the search.`);
  };
  const remove = () => {
    if (!w) return; const i = h(w);
    if (mode === 'chain') { setChain(chain.map((c, k) => (k === i ? c.filter((x) => x !== w) : c))); setHot([i]); setMsg(`${w}: removed from the chain in row ${i} (if it was there).`); return; }
    for (let s = 0; s < N; s++) { const j = (i + s) % N; if (probe[j] === w) { setProbe(probe.map((x, k) => (k === j ? DEL : x))); setHot([j]); setMsg(`${w} removed from row ${j}, but the row is marked ${DEL} (a tombstone), not emptied. Emptying it could break the probe path of keys stored after it.`); return; } if (probe[j] === null) break; }
    setMsg(`${w} was not in the table.`);
  };
  const reset = () => { setChain(Array.from({ length: N }, () => [])); setProbe(Array(N).fill(null)); setHot([]); setMsg('Cleared.'); };
  const fill = () => { const c: string[][] = Array.from({ length: N }, () => []); const p: (string | null)[] = Array(N).fill(null); for (const x of ['cat', 'dog', 'cow']) { c[h(x)].push(x); let j = h(x); while (p[j]) j = (j + 1) % N; p[j] = x; } setChain(c); setProbe(p); setHot([]); setMsg('Loaded cat (row 3), dog (row 5) and cow (row 6). Now insert bee (it hashes to 5, like dog) or fox (it hashes to 3, like cat) and watch the collision.'); };

  return (
    <DemoCard title="Hash table lab: key → number → row, and what happens on a collision">
      <Tabs value={mode} onChange={(v) => { setMode(v); setHot([]); }} items={[['chain', 'Chaining'], ['probe', 'Linear probing']]} />
      <Row>{WORDS.map((x) => <Btn key={x} ghost={w !== x} aria-pressed={w === x} onClick={() => setWord(x)}>{x}</Btn>)}</Row>
      <Row>
        <input aria-label="Key" value={word} onChange={(e) => setWord(e.target.value)} maxLength={8} className="min-h-11 w-36 rounded-lg border border-line bg-bg px-2.5 font-mono text-ink" />
        <Btn onClick={insert}>Insert</Btn><Btn ghost onClick={find}>Search</Btn><Btn ghost onClick={remove}>Delete</Btn><Btn ghost onClick={fill}>Load cat, dog, cow</Btn><Btn ghost onClick={reset}>Clear</Btn>
      </Row>
      <Msg><b>Hash:</b> <code>{w ? calc : '–'}</code></Msg>
      <div className="my-2 grid gap-1">
        {Array.from({ length: N }, (_, i) => (
          <div key={i} className={`grid grid-cols-[34px_1fr] items-center gap-2 rounded-md border px-1.5 py-1 ${hot.includes(i) ? 'border-[var(--yellow)] bg-[var(--yellow)]/15' : 'border-line bg-surface2'}`}>
            <b className="text-center font-mono text-muted">{i}</b>
            <div className="flex min-h-9 flex-wrap items-center gap-1.5">
              {mode === 'chain' ? chain[i].map((x, k) => <span key={x} className="flex items-center gap-1.5">{k > 0 && <span className="text-muted">→</span>}<span className="rounded border border-accent bg-accent/20 px-2 py-0.5 font-mono">{x}</span></span>)
                : probe[i] && <span className={`rounded border px-2 py-0.5 font-mono ${probe[i] === DEL ? 'border-line text-muted' : 'border-accent bg-accent/20'}`}>{probe[i]}</span>}
              {((mode === 'chain' && !chain[i].length) || (mode === 'probe' && !probe[i])) && <span className="text-[12.5px] text-muted">empty</span>}
            </div>
          </div>
        ))}
      </div>
      <Stats><Stat k="Items" v={load} /><Stat k="Rows N" v={N} /><Stat k="Load factor" v={(load / N).toFixed(2)} /></Stats>
      <Row><Key c={COL.warn}>rows touched by the last operation</Key></Row>
      <Msg live>{msg}</Msg>
    </DemoCard>
  );
}
