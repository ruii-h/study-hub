import { useMemo, useState } from 'react';
import { Btn, DemoCard, Label, Msg, Row, Select } from './ui';

const insertion = (a: number[]) => {
  a = a.slice();
  let c = 0;
  for (let i = 1; i < a.length; i++) {
    const k = a[i];
    let j = i - 1;
    while (j >= 0) {
      c++;
      if (a[j] > k) { a[j + 1] = a[j]; j--; } else break;
    }
    a[j + 1] = k;
  }
  return c;
};

const merge = (a: number[]) => {
  let c = 0;
  let w = 1;
  let cur = a.slice();
  while (w < cur.length) {
    const out: number[] = [];
    for (let s = 0; s < cur.length; s += 2 * w) {
      const L = cur.slice(s, s + w), R = cur.slice(s + w, s + 2 * w);
      let i = 0, j = 0;
      while (i < L.length && j < R.length) { c++; out.push(L[i] <= R[j] ? L[i++] : R[j++]); }
      while (i < L.length) out.push(L[i++]);
      while (j < R.length) out.push(R[j++]);
    }
    cur = out;
    w *= 2;
  }
  return c;
};

const NOTE = {
  sorted: 'Already sorted: insertion sort needs about n comparisons, fewer than merge sort, which always does its full n log n work.',
  rev: 'Reverse sorted: insertion sort reaches its worst case of about n(n−1)/2 comparisons.',
  rand: 'Random input: insertion sort grows roughly with n², merge sort with n log n. Raise the size to see the gap widen.',
};

export default function SortCompare() {
  const [n, setN] = useState(32);
  const [order, setOrder] = useState<'rand' | 'sorted' | 'rev'>('rand');
  const [run, setRun] = useState(0);

  const { ci, cm } = useMemo(() => {
    let a = Array.from({ length: n }, (_, i) => i + 1);
    if (order === 'rand') a = a.sort(() => Math.random() - 0.5);
    if (order === 'rev') a.reverse();
    return { ci: insertion(a), cm: merge(a) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, order, run]);
  const mx = Math.max(ci, cm, 1);

  return (
    <DemoCard title="Comparisons: insertion sort against merge sort">
      <Row>
        <Label htmlFor="sort-n">Size</Label>
        <Select id="sort-n" value={n} onChange={(e) => setN(+e.target.value)}>
          {[8, 16, 32, 64].map((v) => <option key={v}>{v}</option>)}
        </Select>
        <Label htmlFor="sort-o">Input order</Label>
        <Select id="sort-o" value={order} onChange={(e) => setOrder(e.target.value as typeof order)}>
          <option value="rand">Random</option>
          <option value="sorted">Already sorted</option>
          <option value="rev">Reverse sorted</option>
        </Select>
        <Btn ghost onClick={() => setRun((r) => r + 1)}>Run again</Btn>
      </Row>
      <div>
        {([['Insertion sort', ci], ['Merge sort', cm]] as const).map(([t, v]) => (
          <div key={t} className="my-2 flex items-center gap-2.5 text-[13px]">
            <span className="w-27.5 flex-none">{t}</span>
            <i className="block h-4.5 min-w-1 rounded-md bg-accent transition-[width] duration-500 ease-out" style={{ width: `${Math.max(3, (v / mx) * 100)}%` }} />
            <b className="tabular-nums">{v}</b>
          </div>
        ))}
      </div>
      <Msg live>{NOTE[order]}</Msg>
    </DemoCard>
  );
}
