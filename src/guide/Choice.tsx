import { AnimatePresence, motion } from 'framer-motion';
import { fade } from './motion';

/** Shared pieces of every multiple-choice question in the guide (chapter quizzes, mixed banks, past exams, mock exams), so they look and behave the same in every course. */
const LETTERS = 'ABCDEF';
export const letter = (i: number) => LETTERS[i];
export const letterIdx = (l: string) => LETTERS.indexOf(l);

export const WhyRow = ({ ok, r, head }: { ok: boolean; r?: string | null; head?: string }) => (r ? <div className={`why ${ok ? 'wy' : 'wn'}`}><b>{head || (ok ? 'Why this is right' : 'Why this is wrong')}:</b> {r}</div> : null);

/** open = answering, checked = answered (shows what you picked), sol = solution revealed without answering. */
export type OptMode = 'open' | 'checked' | 'sol';

export function Options({ o, a, sel, mode, w, multi = true, name, label, onChange, head }: {
  o: string[]; a: number[]; sel: number[]; mode: OptMode; w?: (string | null)[]; multi?: boolean; name?: string; label: string;
  onChange: (j: number, on: boolean) => void; head?: (isA: boolean, isS: boolean) => string;
}) {
  const chk = mode === 'checked', sol = mode === 'sol', done = chk || sol;
  return (
    <div role="group" aria-label={label}>
      {o.map((x, j) => {
        const isA = a.includes(j), isS = sel.includes(j);
        const cls = `eo ${!done && isS ? 'sel' : ''} ${sol ? (isA ? 'right' : '') : chk ? (isA && isS ? 'right' : isS ? 'wrong' : isA ? 'miss' : '') : ''}`;
        return (
          <div key={j}>
            <label className={cls}><input type={multi ? 'checkbox' : 'radio'} name={name} checked={sol ? isA : isS} disabled={done} onChange={(e) => onChange(j, e.target.checked)} /><i>{letter(j)}.</i><span dangerouslySetInnerHTML={{ __html: x }} /></label>
            <AnimatePresence>{done && w?.[j] && <motion.div {...fade}><WhyRow ok={isA} r={w[j]} head={head?.(isA, isS)} /></motion.div>}</AnimatePresence>
          </div>);
      })}
    </div>
  );
}
