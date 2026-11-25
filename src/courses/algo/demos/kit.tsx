import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Btn, Row } from './ui';

/** Step cursor with optional autoplay. `n` is the number of steps. */
export function useSteps(n: number) {
  const [k, setK] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const last = Math.max(0, n - 1);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => setK((x) => (x >= last ? x : x + 1)), 1100 / speed);
    return () => clearInterval(timer.current);
  }, [playing, last, speed]);
  useEffect(() => { if (k >= last && playing) setPlaying(false); }, [k, last, playing]);
  useEffect(() => { setK((x) => Math.min(x, last)); }, [last]);
  return {
    k: Math.min(k, last), last, playing, speed, setSpeed,
    next: () => setK((x) => Math.min(last, x + 1)),
    prev: () => { setPlaying(false); setK((x) => Math.max(0, x - 1)); },
    reset: () => { setPlaying(false); setK(0); },
    toggle: () => { if (k >= last) setK(0); setPlaying((p) => !p); },
  };
}

export function Transport({ s, label }: { s: ReturnType<typeof useSteps>; label?: string }) {
  return (
    <Row>
      <Btn ghost disabled={s.k <= 0} onClick={s.prev}>Back</Btn>
      <Btn disabled={s.k >= s.last || s.playing} onClick={s.next}>Step</Btn>
      <Btn ghost aria-pressed={s.playing} onClick={s.toggle}>{s.playing ? 'Pause' : 'Play'}</Btn>
      <Btn ghost disabled={s.k === 0 && !s.playing} onClick={s.reset}>Reset</Btn>
      <span className="rounded-md bg-surface2 px-2.5 py-1 text-[12.5px] tabular-nums text-muted">{label ?? 'Step'} <b className="text-ink">{s.k}</b> / {s.last}</span>
      <Btn ghost aria-label="Playback speed" className="px-3" onClick={() => s.setSpeed(s.speed === 1 ? 2 : s.speed === 2 ? 0.5 : 1)}>{s.speed === 1 ? 'Speed 1×' : s.speed === 2 ? 'Speed 2×' : 'Speed 0.5×'}</Btn>
    </Row>
  );
}

/** Segmented choice built from the existing ghost buttons. */
export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: [T, string][] }) {
  return (
    <Row>
      {items.map(([v, t]) => (
        <Btn key={v} ghost={value !== v} aria-pressed={value === v} onClick={() => onChange(v)}>{t}</Btn>
      ))}
    </Row>
  );
}

/** Pseudocode panel with the running line highlighted. */
export function Pseudo({ lines, active }: { lines: string[]; active?: number | number[] }) {
  const on = Array.isArray(active) ? active : active == null ? [] : [active];
  return (
    <pre className="my-2 overflow-x-auto rounded-lg border border-line bg-bg py-2 font-mono text-[12.5px] leading-[1.7]">
      {lines.map((l, i) => (
        <div key={i} className={`whitespace-pre px-3 ${on.includes(i) ? 'bg-accent/20 font-semibold text-ink' : 'text-muted'}`}>{l || ' '}</div>
      ))}
    </pre>
  );
}

export const Stat = ({ k, v }: { k: string; v: ReactNode }) => (
  <div className="min-w-[88px] flex-1 rounded-lg border border-line bg-surface2 px-3 py-1.5">
    <div className="text-[11px] uppercase tracking-wide text-muted">{k}</div>
    <div className="text-[17px] font-bold text-ink">{v}</div>
  </div>
);
export const Stats = ({ children }: { children: ReactNode }) => <div className="my-2 flex flex-wrap gap-2">{children}</div>;

export const Panel = ({ children }: { children: ReactNode }) => (
  <div className="my-2 overflow-hidden rounded-lg border border-line bg-bg">{children}</div>
);

export const COL = {
  accent: 'var(--accent)', ok: 'var(--green)', warn: 'var(--yellow)', bad: 'var(--red)', purple: 'var(--purple)',
  line: 'var(--border)', ink: 'var(--text)', muted: 'var(--muted)', s2: 'var(--surface2)', s3: 'var(--surface3)',
};

/** Small legend chip. */
export const Key = ({ c, children }: { c: string; children: ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
    <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c }} />{children}
  </span>
);

export type Tone = 'on' | 'hit' | 'bad' | 'warn' | 'out' | 'run';
const TONE: Record<Tone, string> = {
  on: 'border-accent bg-accent/25',
  hit: 'border-ok bg-ok/30',
  bad: 'border-[var(--red)] bg-[var(--red)]/25',
  warn: 'border-[var(--yellow)] bg-[var(--yellow)]/25',
  run: 'border-[var(--purple)] bg-[var(--purple)]/20',
  out: 'border-line bg-surface2 opacity-35',
};
/** Row of array cells with an index line under each cell. */
export function Arr({ a, tone = {}, under = {} }: { a: (number | string)[]; tone?: Record<number, Tone>; under?: Record<number, string> }) {
  return (
    <div role="list" className="my-2.5 flex flex-wrap gap-1.5">
      {a.map((v, i) => (
        <div key={i} role="listitem" className="flex flex-col items-center gap-0.5">
          <div className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-1 font-bold transition-colors duration-200 ${tone[i] ? TONE[tone[i]] : 'border-line bg-surface2'}`}>{v}</div>
          <div className="min-h-[14px] text-[11px] text-muted">{under[i] ?? i}</div>
        </div>
      ))}
    </div>
  );
}
