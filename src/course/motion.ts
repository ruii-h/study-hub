/**
 * Flashcard flips run through the Web Animations API, so they animate even where CSS transitions are switched off
 * (OS "reduce motion", user stylesheets). The CSS classes still decide the final state; this only plays the in-between.
 */
export function watchMotion(): () => void {
  const onClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null;
    if (!t || t.closest('button,a')) return;
    const fc = t.closest<HTMLElement>('.fcard');
    if (fc) {
      const fi = fc.querySelector<HTMLElement>('.fi');
      const was = fc.classList.contains('flip'); // inline onclick toggles after this capture handler
      if (fi) fi.animate([{ transform: was ? 'rotateY(180deg)' : 'rotateY(0deg)' }, { transform: was ? 'rotateY(0deg)' : 'rotateY(180deg)' }], { duration: 550, easing: 'cubic-bezier(.4,.2,.2,1)' });
      return;
    }
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
