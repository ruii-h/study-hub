import { useMemo, useState } from 'react';
import { Arr, Pseudo, Stat, Stats, Tabs, Transport, useSteps, type Tone } from './kit';
import { Btn, DemoCard, Label, Msg, NumberInput, Row } from './ui';

type Algo = 'linear' | 'insertion' | 'merge';
interface St { a: number[]; tone: Record<number, Tone>; under?: Record<number, string>; line: number; note: string; cmp: number }

const CODE: Record<Algo, string[]> = {
  linear: [
    'def linear_search(a, key):',
    '    for i in range(len(a)):',
    '        if a[i] == key:',
    '            return i',
    '    return -1',
  ],
  insertion: [
    'def insertion_sort(a):',
    '    for i in range(1, len(a)):',
    '        j = i',
    '        while j > 0 and a[j-1] > a[j]:',
    '            a[j-1], a[j] = a[j], a[j-1]',
    '            j -= 1',
  ],
  merge: [
    'def merge_sort(a):          # bottom-up',
    '    w = 1',
    '    while w < len(a):',
    '        for s in range(0, len(a), 2*w):',
    '            merge(a, s, s+w, s+2*w)',
    '        w *= 2',
  ],
};

function linear(a: number[], key: number): St[] {
  const out: St[] = [{ a, tone: {}, line: 0, note: `Looking for ${key}. Start at index 0.`, cmp: 0 }];
  for (let i = 0; i < a.length; i++) {
    const tone: Record<number, Tone> = {};
    for (let j = 0; j < i; j++) tone[j] = 'out';
    tone[i] = a[i] === key ? 'hit' : 'on';
    out.push({ a, tone, line: 2, cmp: i + 1, note: a[i] === key ? `a[${i}] = ${a[i]} equals the key. Return ${i} after ${i + 1} comparison${i ? 's' : ''}.` : `a[${i}] = ${a[i]} is not ${key}. Move on.` });
    if (a[i] === key) return out;
  }
  const tone: Record<number, Tone> = {};
  a.forEach((_, j) => (tone[j] = 'out'));
  out.push({ a, tone, line: 4, cmp: a.length, note: `Every element checked, ${key} is absent. Return −1 after ${a.length} comparisons (the worst case).` });
  return out;
}

function insertion(src: number[]): St[] {
  const a = src.slice();
  const out: St[] = [{ a: a.slice(), tone: { 0: 'hit' }, line: 0, note: 'The left part (green) is sorted. Each new element walks left until it is in place.', cmp: 0 }];
  let cmp = 0;
  for (let i = 1; i < a.length; i++) {
    let j = i;
    out.push({ a: a.slice(), tone: { ...Object.fromEntries(Array.from({ length: i }, (_, x) => [x, 'hit' as Tone])), [i]: 'on' }, line: 1, cmp, note: `Take a[${i}] = ${a[i]} as the next element to place.` });
    while (j > 0) {
      cmp++;
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        out.push({ a: a.slice(), tone: { [j - 1]: 'warn', [j]: 'warn' }, line: 4, cmp, note: `${a[j]} > ${a[j - 1]}, so swap them. The element moves one place left.` });
        j--;
      } else {
        out.push({ a: a.slice(), tone: { [j - 1]: 'hit', [j]: 'on' }, line: 3, cmp, note: `${a[j - 1]} ≤ ${a[j]}: the element is in place. Stop moving left.` });
        break;
      }
    }
  }
  out.push({ a: a.slice(), tone: Object.fromEntries(a.map((_, x) => [x, 'hit' as Tone])), line: 0, cmp, note: `Sorted using ${cmp} comparisons.` });
  return out;
}

function mergeSort(src: number[]): St[] {
  let cur = src.slice();
  const n = cur.length;
  const out: St[] = [{ a: cur.slice(), tone: {}, line: 0, cmp: 0, note: 'Start with n runs of length 1. Each pass merges neighbouring runs into runs twice as long.' }];
  let cmp = 0;
  for (let w = 1; w < n; w *= 2) {
    out.push({ a: cur.slice(), tone: {}, line: 2, cmp, note: `Pass with run width w = ${w}.` });
    const next: number[] = [];
    for (let s = 0; s < n; s += 2 * w) {
      const L = cur.slice(s, s + w), R = cur.slice(s + w, s + 2 * w);
      let i = 0, j = 0;
      const part: number[] = [];
      while (i < L.length && j < R.length) { cmp++; part.push(L[i] <= R[j] ? L[i++] : R[j++]); }
      while (i < L.length) part.push(L[i++]);
      while (j < R.length) part.push(R[j++]);
      next.push(...part);
      const tone: Record<number, Tone> = {};
      for (let x = s; x < Math.min(n, s + 2 * w); x++) tone[x] = x < s + w ? 'on' : 'run';
      out.push({ a: [...next, ...cur.slice(next.length)], tone, line: 4, cmp, note: `Merge [${L.join(', ')}] with [${R.join(', ')}] → [${part.join(', ')}].` });
    }
    cur = next;
  }
  out.push({ a: cur.slice(), tone: Object.fromEntries(cur.map((_, x) => [x, 'hit' as Tone])), line: 0, cmp, note: `Sorted in about log₂ n passes, ${cmp} comparisons in total.` });
  return out;
}

const DATA = [34, 7, 23, 32, 5, 62, 14, 41];

export default function IterationLab() {
  const [algo, setAlgo] = useState<Algo>('insertion');
  const [key, setKey] = useState(32);
  const steps = useMemo(() => (algo === 'linear' ? linear(DATA, key) : algo === 'insertion' ? insertion(DATA) : mergeSort(DATA)), [algo, key]);
  const s = useSteps(steps.length);
  const cur = steps[s.k];
  const swap = (v: Algo) => { setAlgo(v); s.reset(); };

  return (
    <DemoCard title="Iteration lab: watch the loop, the pointers and the line that runs">
      <Tabs value={algo} onChange={swap} items={[['linear', 'Linear search'], ['insertion', 'Insertion sort'], ['merge', 'Merge sort (bottom-up)']]} />
      {algo === 'linear' && (
        <Row>
          <Label htmlFor="il-key">Key</Label>
          <NumberInput id="il-key" value={Number.isNaN(key) ? '' : key} onChange={(e) => { setKey(e.target.valueAsNumber); s.reset(); }} />
          <Btn ghost onClick={() => { setKey(DATA[Math.floor(Math.random() * DATA.length)]); s.reset(); }}>Pick one in the array</Btn>
          <Btn ghost onClick={() => { setKey(99); s.reset(); }}>Pick one that is absent</Btn>
        </Row>
      )}
      <Transport s={s} />
      <Arr a={cur.a} tone={cur.tone} />
      <Stats><Stat k="Comparisons" v={cur.cmp} /><Stat k="n" v={DATA.length} /></Stats>
      <Pseudo lines={CODE[algo]} active={cur.line} />
      <Msg live>{cur.note}</Msg>
    </DemoCard>
  );
}
