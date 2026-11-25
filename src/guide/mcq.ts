/* Behaviour for the multiple-choice cards of Exam Practice (markup comes from tools/algo-ex/mcq.mjs):
   tick options, "Check answer", right/wrong colouring, and a "why" note under every option. Same look as the IS211 quiz. */
const L = 'ABCDEFGHIJKL';
const nums = (s?: string) => (s || '').split(',').filter((x) => x !== '').map(Number);
const same = (a: number[], b: number[]) => a.length === b.length && a.every((x) => b.includes(x));

/** Draws one card from its state (data-sel, data-checked) and from the "show all solutions" switch. */
export function paintMcq(m: HTMLElement, sol: boolean) {
  const A = nums(m.dataset.ans), sel = nums(m.dataset.sel), checked = m.dataset.checked === '1', done = checked || sol;
  m.querySelectorAll<HTMLElement>('.mcq-o').forEach((o, i) => {
    const lab = o.querySelector('label')!, inp = lab.querySelector('input')!, isA = A.includes(i), isS = sel.includes(i);
    lab.className = 'eo ' + (!done && isS ? 'sel ' : '') + (sol ? (isA ? 'right' : '') : checked ? (isA && isS ? 'right' : isS ? 'wrong' : isA ? 'miss' : '') : '');
    inp.checked = sol ? isA : isS; inp.disabled = done;
    const w = o.querySelector<HTMLElement>('.why'); if (w) w.hidden = !done;
  });
  const btn = m.querySelector<HTMLButtonElement>('.mcq-check'); if (btn) { btn.disabled = checked || !sel.length; (btn.parentElement as HTMLElement).hidden = sol; }
  const v = m.querySelector<HTMLElement>('.mcq-verdict'); if (!v) return;
  v.hidden = !done;
  if (!done) return;
  const ok = checked && same(sel, A);
  v.className = 'verdict mcq-verdict ' + (sol || ok ? 'ok' : 'no');
  v.querySelector('.mcq-head')!.innerHTML = `<b>${sol ? 'Solution:' : ok ? '✅ Correct.' : '❌ Not quite.'}</b> Answer: <b>${A.map((i) => L[i]).join(', ')}</b>.`;
  const r = v.querySelector<HTMLElement>('.row'); if (r) r.hidden = sol;
}

/** One listener on the page body handles every card in it. Returns a cleanup function. */
export function wireMcq(root: HTMLElement, isSol: () => boolean) {
  const onChange = (e: Event) => {
    const inp = e.target as HTMLInputElement; const m = inp.closest<HTMLElement>('.mcq'); if (!m || !inp.matches('.mcq-o input')) return;
    const i = [...m.querySelectorAll('.mcq-o')].indexOf(inp.closest('.mcq-o')!);
    let sel = nums(m.dataset.sel);
    if (m.dataset.multi === '1') sel = inp.checked ? [...sel, i] : sel.filter((x) => x !== i); else sel = inp.checked ? [i] : [];
    m.dataset.sel = sel.join(','); paintMcq(m, isSol());
  };
  const onClick = (e: Event) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.mcq-check, .mcq-retry'); if (!b) return;
    const m = b.closest<HTMLElement>('.mcq')!;
    if (b.classList.contains('mcq-check')) m.dataset.checked = '1'; else { m.dataset.checked = ''; m.dataset.sel = ''; }
    paintMcq(m, isSol());
  };
  root.addEventListener('change', onChange); root.addEventListener('click', onClick);
  return () => { root.removeEventListener('change', onChange); root.removeEventListener('click', onClick); };
}

export const paintAll = (root: HTMLElement, sol: boolean) => root.querySelectorAll<HTMLElement>('.mcq').forEach((m) => paintMcq(m, sol));
