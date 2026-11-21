import { useMemo, useState } from 'react';
import { Btn, Cell, Cells, DemoCard, Msg, Row } from './ui';

const G: Record<string, Record<string, number>> = {
  A: { B: 0.9, C: 0.1 }, B: { C: 0.3, D: 0.2, E: 0.5 }, C: { A: 0.9, D: 0.1 }, D: { B: 0.2, F: 0.8 }, E: { D: 1 }, F: {},
};
type Item = [string, number, string];
interface Step { pq: Item[]; done: string[]; n: string }

function build(): Step[] {
  const st: Step[] = [{ pq: [['A', 0, '–']], done: [], n: 'Start: enqueue A at cost 0.' }];
  let pq: Item[] = [['A', 0, '–']];
  const done: string[] = [];
  while (pq.length) {
    pq.sort((a, b) => a[1] - b[1]);
    const [u, c] = pq.shift()!;
    done.push(u);
    let note = `Dequeue ${u} at cost ${c.toFixed(1)}.`;
    if (u === 'F') {
      st.push({ pq: [...pq], done: [...done], n: note + ' The target was dequeued: stop. Cheapest cost 1.0.' });
      break;
    }
    for (const v in G[u]) {
      if (done.includes(v)) continue;
      const nc = +(c + G[u][v]).toFixed(1);
      const ex = pq.find((x) => x[0] === v);
      if (!ex) { pq.push([v, nc, u]); note += ` Enqueue ${v} at ${nc}.`; }
      else if (nc < ex[1]) { note += ` Update ${v}: ${ex[1]} → ${nc} via ${u}.`; ex[1] = nc; ex[2] = u; }
    }
    st.push({ pq: pq.map((x) => [...x] as Item), done: [...done], n: note });
  }
  return st;
}

export default function UniformCost() {
  const st = useMemo(build, []);
  const [k, setK] = useState(0);
  const s = st[k];
  const queue = s.pq.slice().sort((a, b) => a[1] - b[1]).map((x) => `${x[0]}(${x[1]}, ${x[2]})`).join(' · ') || 'empty';

  return (
    <DemoCard title="Uniform cost search from A to F">
      <Row>
        <Btn ghost disabled={k <= 0} onClick={() => setK(k - 1)}>Back</Btn>
        <Btn disabled={k >= st.length - 1} onClick={() => setK(k + 1)}>Step</Btn>
      </Row>
      <Cells>
        {Object.keys(G).map((v) => <Cell key={v} state={s.done.includes(v) ? 'hit' : undefined}>{v}</Cell>)}
      </Cells>
      <Msg><b>Priority queue (cheapest first):</b> {queue}</Msg>
      <Msg live>{s.n}</Msg>
    </DemoCard>
  );
}
