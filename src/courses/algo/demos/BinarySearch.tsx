import { useMemo, useState } from 'react';
import { Stat, Stats, Transport, useSteps } from './kit';
import { Btn, DemoCard, Label, Msg, NumberInput, Row } from './ui';

const A = [4, 10, 22, 35, 36, 57, 65, 71, 79, 83, 87, 89, 90, 91, 93];

interface St { lo: number; hi: number; cmp: number; mid: number; found: boolean; end: boolean; msg: React.ReactNode }

/** Every state of the search, so Back / Play / Step all work. */
function trace(key: number): St[] {
  let lo = -1, hi = A.length, cmp = 0;
  const out: St[] = [{ lo, hi, cmp, mid: -1, found: false, end: false, msg: <>Looking for <b>{key}</b>. Nothing is ruled out yet, so the search region is the whole list (lower = −1 and upper = {A.length} sit just outside it). Press <b>Step</b> to guess the middle.</> }];
  while (hi > lo + 1) {
    const mid = Math.floor((lo + hi) / 2);
    cmp++;
    const v = A[mid];
    if (v === key) {
      out.push({ lo, hi, cmp, mid, found: true, end: true, msg: <>Guess the middle: index {mid} holds <b>{v}</b>. That is the key, so <b>found after {cmp} comparison{cmp > 1 ? 's' : ''}</b>.</> });
      return out;
    }
    if (key < v) {
      out.push({ lo, hi, cmp, mid, found: false, end: false, msg: <>Middle is index {mid}, value <b>{v}</b>. {key} is <b>smaller</b>, so everything from {v} rightwards is out. Move <b>upper</b> to {mid}.</> });
      hi = mid;
    } else {
      out.push({ lo, hi, cmp, mid, found: false, end: false, msg: <>Middle is index {mid}, value <b>{v}</b>. {key} is <b>bigger</b>, so everything up to {v} is out. Move <b>lower</b> to {mid}.</> });
      lo = mid;
    }
    out.push({ lo, hi, cmp, mid: -1, found: false, end: false, msg: <>Region now holds <b>{hi - lo - 1}</b> value{hi - lo - 1 === 1 ? '' : 's'}. {hi - lo - 1 > 0 ? 'Guess its middle next.' : 'Nothing is left to check.'}</> });
  }
  out.push({ lo, hi, cmp, mid: -1, found: false, end: true, msg: <>Region is empty (upper = lower + 1), so <b>{key} is not in the list</b>. Only {cmp} comparison{cmp === 1 ? '' : 's'} were needed to be sure.</> });
  return out;
}

export default function BinarySearch() {
  const [key, setKey] = useState(57);
  const valid = Number.isFinite(key);
  const steps = useMemo(() => trace(valid ? key : 0), [key, valid]);
  const s = useSteps(steps.length);
  const cur = steps[s.k];
  const left = Math.max(0, cur.hi - cur.lo - 1);
  const pick = (v: number) => { setKey(v); s.reset(); };

  return (
    <DemoCard title="Binary search: guess the middle, throw half away">
      <Row>
        <Label htmlFor="bs-key">Key to find</Label>
        <NumberInput id="bs-key" value={valid ? key : ''} onChange={(e) => pick(e.target.valueAsNumber)} />
        <Btn ghost onClick={() => pick(A[Math.floor(Math.random() * A.length)])}>Pick one in the list</Btn>
        <Btn ghost onClick={() => { let v = 0; do v = 1 + Math.floor(Math.random() * 95); while (A.includes(v)); pick(v); }}>Pick one that is absent</Btn>
      </Row>
      <Transport s={s} />
      <div role="list" className="my-3 flex flex-wrap gap-1.5">
        {A.map((v, i) => {
          const out = i <= cur.lo || i >= cur.hi;
          const isMid = i === cur.mid;
          const tag = isMid ? (cur.found ? "found" : "mid") : "";
          return (
            <div key={i} role="listitem" className="flex flex-col items-center gap-0.5">
              <div className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-1 font-bold transition-all duration-200 ${isMid ? (cur.found ? 'border-ok bg-ok/30' : 'border-accent bg-accent/25 -translate-y-1') : out ? 'border-line bg-surface2 line-through opacity-30' : 'border-accent/50 bg-surface2'}`}>{v}</div>
              <div className="text-[11px] text-muted">{i}</div>
              <div className="min-h-[14px] text-[10.5px] font-bold text-accent">{tag}</div>
            </div>
          );
        })}
      </div>
      <Stats>
        <Stat k="Values still possible" v={left} />
        <Stat k="lower / upper" v={`${cur.lo} / ${cur.hi}`} />
        <Stat k="Comparisons" v={cur.cmp} />
      </Stats>
      <Msg live>{cur.msg}</Msg>
      <Msg>Bright outlines = still possible. Struck-out cells were ruled out without ever being looked at. The list has {A.length} values, yet at most 4 comparisons are ever needed.</Msg>
    </DemoCard>
  );
}
