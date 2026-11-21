import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Card that replaces the old `.algo-demo` box. Tailwind classes read the guide's own CSS variables, so light/dark just work. */
export function DemoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="my-3.5 animate-fade-in rounded-xl border border-line bg-surface px-4 py-3.5 font-sans text-ink">
      <div className="mb-2 font-bold">▶ {title}</div>
      {children}
    </section>
  );
}

export const Row = ({ children }: { children: ReactNode }) => (
  <div className="my-2 flex flex-wrap items-center gap-2">{children}</div>
);

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { ghost?: boolean };
export function Btn({ ghost, className = '', ...p }: BtnProps) {
  const base =
    'min-h-11 min-w-11 cursor-pointer rounded-md px-4 font-sans text-xs font-bold transition duration-150 hover:brightness-110 active:animate-press-pop disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:brightness-100 aria-pressed:outline-2 aria-pressed:outline-accent';
  const tone = ghost
    ? 'border border-line bg-surface2 text-ink'
    : 'border-0 bg-accent text-black in-data-[theme=light]:text-white';
  return <button type="button" className={`${base} ${tone} ${className}`} {...p} />;
}

export const Label = ({ htmlFor, children }: { htmlFor: string; children: ReactNode }) => (
  <label htmlFor={htmlFor} className="text-[13px] text-muted">{children}</label>
);

const field = 'min-h-11 rounded-lg border border-line bg-bg px-2.5 font-sans text-ink';
export const NumberInput = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input type="number" inputMode="numeric" className={`${field} w-25`} {...p} />
);
export const Select = (p: React.SelectHTMLAttributes<HTMLSelectElement>) => <select className={field} {...p} />;

export const Cells = ({ children }: { children: ReactNode }) => (
  <div role="list" className="my-2.5 flex flex-wrap gap-1.5">{children}</div>
);

export function Cell({ children, state, title }: { children: ReactNode; state?: 'on' | 'hit' | 'out'; title?: string }) {
  const tone =
    state === 'on' ? 'border-accent bg-accent/25 animate-chip-in'
    : state === 'hit' ? 'border-ok bg-ok/30 animate-chip-in'
    : state === 'out' ? 'border-line bg-surface2 opacity-35'
    : 'border-line bg-surface2';
  return (
    <div role="listitem" title={title} className={`flex min-h-11 min-w-11 items-center justify-center rounded-lg border font-bold transition-colors duration-200 ${tone}`}>
      {children}
    </div>
  );
}

export const Msg = ({ children, live }: { children: ReactNode; live?: boolean }) => (
  <div {...(live ? { role: 'status', 'aria-live': 'polite' as const } : {})} className="min-h-11 text-[13.5px] leading-[1.65] text-muted">
    {children}
  </div>
);
