import { useLayoutEffect } from 'react';
import { useG } from './state';

/** One "Show solutions" switch for every area of every course. `k` is the saved setting: tsol = tutorials and exam practice, psol = past exam, qsol = practice questions. */
export type SolKey = 'tsol' | 'psol' | 'qsol';

export function useSol(k: SolKey = 'tsol') { return !!useG().ST[k]; }

/** Opens or closes every answer under `root` without tapping each one. */
export function useSolutions(root: React.RefObject<HTMLElement | null>, dep: unknown) {
  const on = useSol('tsol');
  useLayoutEffect(() => { root.current?.querySelectorAll<HTMLDetailsElement>('details.model').forEach((d) => { d.open = on; }); }, [on, dep]); // eslint-disable-line
  return on;
}

export default function SolToggle({ k = 'tsol', label = 'Show all solutions' }: { k?: SolKey; label?: string }) {
  const g = useG(); const on = !!g.ST[k];
  return (
    <div className="solbar"><label className="switch"><span>{label}</span>
      <input type="checkbox" role="switch" checked={on} onChange={(e) => g.patch('ST', (o) => ({ ...o, [k]: e.target.checked ? 1 : 0 }))} /><i /></label></div>
  );
}
