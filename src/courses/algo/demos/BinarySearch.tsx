import { useState } from 'react';
import { Btn, Cell, Cells, DemoCard, Label, Msg, NumberInput, Row } from './ui';

const A = [4, 10, 22, 35, 36, 57, 65, 71, 79, 83, 87, 89, 90, 91, 93];
const START = (
  <>lower = −1, upper = {A.length}. Press <b>Step</b>. The region is the bright cells.</>
);

interface St { lo: number; hi: number; cmp: number; done: boolean; mid: number; msg: React.ReactNode }
const fresh = (): St => ({ lo: -1, hi: A.length, cmp: 0, done: false, mid: -1, msg: START });

export default function BinarySearch() {
  const [key, setKey] = useState(57);
  const [s, setS] = useState<St>(fresh);

  const step = () =>
    setS((p) => {
      if (p.done || p.hi <= p.lo + 1) {
        const empty = p.hi <= p.lo + 1 && !p.done;
        return { ...p, mid: -1, msg: empty ? `Region empty (upper = lower + 1): key not found after ${p.cmp} comparisons.` : p.msg };
      }
      const mid = Math.floor((p.lo + p.hi) / 2);
      const cmp = p.cmp + 1;
      if (A[mid] === key) {
        return { ...p, cmp, mid, done: true, msg: <>mid = {mid}, a[mid] = {A[mid]} equals the key. <b>Found after {cmp} comparison{cmp > 1 ? 's' : ''}.</b></> };
      }
      if (key < A[mid]) {
        return { ...p, cmp, mid, hi: mid, msg: `mid = ${mid}, a[mid] = ${A[mid]}. ${key} < ${A[mid]}, so upper = ${mid}.` };
      }
      return { ...p, cmp, mid, lo: mid, msg: `mid = ${mid}, a[mid] = ${A[mid]}. ${key} > ${A[mid]}, so lower = ${mid}.` };
    });

  return (
    <DemoCard title="Binary search, step by step">
      <Row>
        <Label htmlFor="bs-key">Key</Label>
        <NumberInput id="bs-key" value={Number.isNaN(key) ? '' : key} onChange={(e) => { setKey(e.target.valueAsNumber); setS(fresh()); }} />
        <Btn onClick={step}>Step</Btn>
        <Btn ghost onClick={() => setS(fresh())}>Reset</Btn>
      </Row>
      <Cells>
        {A.map((v, i) => (
          <Cell key={i} title={`index ${i}`} state={i === s.mid ? (s.done ? 'hit' : 'on') : i <= s.lo || i >= s.hi ? 'out' : undefined}>
            {v}
          </Cell>
        ))}
      </Cells>
      <Msg live>{s.msg}</Msg>
    </DemoCard>
  );
}
