import type { ReactNode } from 'react';

export interface Item { id: number | string; label: string; sub?: string; tone?: 'hot' | 'ok' | 'bad' | 'dim' }

const tone = (t?: Item['tone'], strong?: boolean) =>
  t === 'bad' ? 'border-[var(--red)] bg-[var(--red)]/20'
  : t === 'ok' ? 'border-ok bg-ok/20'
  : t === 'dim' ? 'border-line bg-surface2 text-muted'
  : strong ? 'border-accent bg-accent/25 shadow-[0_0_0_2px_var(--accent)]'
  : 'border-line bg-surface2';

/** A vertical stack: open at the top, newest item on top, with a pointer to the top. */
export function StackTower({ items, label = 'stack', min = 3, compact }: { items: Item[]; label?: string; min?: number; compact?: boolean }) {
  const rows = Math.max(min, items.length);
  const h = compact ? 30 : 38;
  return (
    <div className="flex items-end gap-2">
      <div>
        <div className="mb-1 text-center text-[11.5px] uppercase tracking-wide text-muted">{label}</div>
        <div className="flex flex-col-reverse justify-start gap-1 rounded-b-xl border-x-[3px] border-b-[3px] border-line bg-bg px-1.5 pb-1.5 pt-1" style={{ minHeight: rows * (h + 4) + 10, minWidth: compact ? 92 : 128 }}>
          {items.map((it, i) => (
            <div key={it.id} className={`vz-drop flex items-center justify-between gap-2 rounded-md border px-2.5 font-mono text-[13.5px] font-bold ${tone(it.tone, i === items.length - 1)}`} style={{ height: h }}>
              <span>{it.label}</span>{it.sub && <span className="text-[11px] font-normal text-muted">{it.sub}</span>}
            </div>
          ))}
        </div>
      </div>
      {items.length > 0 && (
        <div className="mb-auto flex flex-col justify-start pt-7 text-[12px] font-bold text-accent" style={{ minHeight: rows * (h + 4) }}>
          <div className="vz-blink" style={{ marginTop: 0 }}>◀ TOP</div>
        </div>
      )}
    </div>
  );
}

/** A horizontal queue: leaves from the front (left), joins at the back (right). */
export function QueuePipe({ items, label = 'queue', min = 4, priority }: { items: Item[]; label?: string; min?: number; priority?: boolean }) {
  return (
    <div>
      <div className="mb-1 text-[11.5px] uppercase tracking-wide text-muted">{label}</div>
      <div className="flex min-h-[54px] items-center gap-1.5 overflow-x-auto rounded-xl border-y-[3px] border-line bg-bg px-2 py-1.5">
        {items.length === 0 && <span className="m-auto text-[13px] text-muted">empty</span>}
        {items.map((it, i) => (
          <div key={it.id} className={`vz-in flex flex-none flex-col items-center rounded-md border px-2.5 py-1 font-mono text-[13.5px] font-bold ${tone(it.tone, i === 0)}`}>
            <span>{it.label}</span>{it.sub && <span className="text-[10.5px] font-normal text-muted">{it.sub}</span>}
            {i === 0 && <span className="text-[10px] font-bold text-accent">{priority ? 'next out' : 'front'}</span>}
            {i === items.length - 1 && items.length > 1 && !priority && <span className="text-[10px] font-bold text-muted">back</span>}
          </div>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap justify-between gap-x-3 text-[11px] text-muted"><span>◀ leaves here (front)</span><span>joins here (back) ◀</span></div>
    </div>
  );
}

/** A coloured chip that animates away to show a value was returned/removed. */
export function Returned({ v, tick, note }: { v: string | null; tick: number; note?: ReactNode }) {
  if (!v) return <div className="min-h-[34px] text-[12.5px] text-muted">Nothing returned yet.</div>;
  return (
    <div className="flex min-h-[34px] items-center gap-2 text-[13px]">
      <span key={tick} className={`vz-pulse rounded-md border border-ok bg-ok/20 px-2.5 py-0.5 font-mono font-bold`}>{v}</span>
      <span className="text-muted">{note ?? 'was returned to the caller'}</span>
    </div>
  );
}
