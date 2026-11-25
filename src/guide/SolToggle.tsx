import { useLayoutEffect } from 'react';
import { useG } from './state';

/** "Show all solutions" switch for the Tutorials and Exam Practice tabs: opens or closes every answer under `root` without tapping each one. */
export function useSolutions(root: React.RefObject<HTMLElement | null>, dep: unknown) {
  const { ST } = useG(); const on = !!ST.tsol;
  useLayoutEffect(() => { root.current?.querySelectorAll<HTMLDetailsElement>('details.model').forEach((d) => { d.open = on; }); }, [on, dep]); // eslint-disable-line
  return on;
}

export default function SolToggle() {
  const g = useG(); const on = !!g.ST.tsol;
  return (
    <div className="solbar"><label className="switch"><span>Show all solutions</span>
      <input type="checkbox" role="switch" checked={on} onChange={(e) => g.patch('ST', (o) => ({ ...o, tsol: e.target.checked ? 1 : 0 }))} /><i /></label></div>
  );
}
