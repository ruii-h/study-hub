import { useMemo, useState } from 'react';
import { Btn, Cell, Cells, DemoCard, Msg, Row } from './ui';

const G: Record<string, string[]> = { A: ['B', 'C'], B: ['C', 'D', 'E'], C: ['A', 'D'], D: ['B', 'F'], E: ['D'], F: [] };
interface Step { o: string[]; c: string[]; n: string }
type Mode = 'bfs' | 'dfs';

function build(mode: Mode): Step[] {
  const steps: Step[] = [];
  if (mode === 'bfs') {
    const seen = ['A'], q = ['A'], order: string[] = [];
    steps.push({ o: [], c: [...q], n: 'Mark A and enqueue it.' });
    while (q.length) {
      const u = q.shift()!;
      order.push(u);
      const nw: string[] = [];
      G[u].forEach((v) => { if (!seen.includes(v)) { seen.push(v); q.push(v); nw.push(v); } });
      steps.push({ o: [...order], c: [...q], n: `Dequeue ${u}, visit it${nw.length ? `, enqueue ${nw.join(', ')}` : ', nothing new to enqueue'}.` });
    }
  } else {
    const seen: string[] = [], order: string[] = [], stack: string[] = [];
    const go = (u: string) => {
      seen.push(u); order.push(u); stack.push(u);
      steps.push({ o: [...order], c: [...stack], n: `Enter ${u}.` });
      G[u].forEach((v) => { if (!seen.includes(v)) go(v); });
      stack.pop();
      steps.push({ o: [...order], c: [...stack], n: `Return from ${u}.` });
    };
    go('A');
  }
  return steps;
}

export default function GraphSearch() {
  const [mode, setMode] = useState<Mode>('bfs');
  const [k, setK] = useState(0);
  const steps = useMemo(() => build(mode), [mode]);
  const s = steps[k];

  return (
    <DemoCard title="BFS and DFS on the running example (start at A)">
      <Row>
        <Btn ghost={mode !== 'bfs'} aria-pressed={mode === 'bfs'} onClick={() => { setMode('bfs'); setK(0); }}>BFS</Btn>
        <Btn ghost={mode !== 'dfs'} aria-pressed={mode === 'dfs'} onClick={() => { setMode('dfs'); setK(0); }}>DFS</Btn>
        <Btn ghost disabled={k <= 0} onClick={() => setK(k - 1)}>Back</Btn>
        <Btn disabled={k >= steps.length - 1} onClick={() => setK(k + 1)}>Step</Btn>
      </Row>
      <Cells>
        {Object.keys(G).map((v) => <Cell key={v} state={s.o.includes(v) ? 'hit' : undefined}>{v}</Cell>)}
      </Cells>
      <Msg><b>{mode === 'bfs' ? 'Queue, head on the left' : 'Call stack, top on the right'}:</b> [ {s.c.join(', ')} ]</Msg>
      <Msg live>{s.n} <br /><b>Visit order so far:</b> {s.o.join(', ') || 'none'}</Msg>
    </DemoCard>
  );
}
