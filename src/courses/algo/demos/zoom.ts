/** Phone helper: tap any diagram to open it full-screen at a readable size (pan by scrolling). */
let ready = false;
const SEL = 'figure.diagram, .film-tree, .frame';

function openZoom(svg: SVGSVGElement) {
  const vb = (svg.getAttribute('viewBox') || '0 0 600 300').split(/[ ,]+/).map(Number);
  const w = Math.max(vb[2] * 1.2, 680);
  const ov = document.createElement('div');
  ov.className = 'dz-ov';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Enlarged diagram');
  const bar = document.createElement('div');
  bar.className = 'dz-bar';
  const title = document.createElement('span');
  title.textContent = svg.getAttribute('aria-label') || 'Diagram';
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close ✕';
  bar.append(title, close);
  const box = document.createElement('div');
  box.className = 'dz-box';
  const c = svg.cloneNode(true) as SVGSVGElement;
  c.removeAttribute('class');
  c.style.cssText = `width:${w}px;max-width:none;height:auto;display:block;color:var(--text)`;
  box.append(c);
  const hint = document.createElement('div');
  hint.className = 'dz-hint';
  hint.textContent = 'Scroll sideways and down to explore. Tap Close when done.';
  ov.append(bar, box, hint);
  const done = () => { ov.remove(); document.removeEventListener('keydown', key); document.documentElement.style.overflow = ''; };
  const key = (e: KeyboardEvent) => { if (e.key === 'Escape') done(); };
  close.addEventListener('click', done);
  document.addEventListener('keydown', key);
  document.documentElement.style.overflow = 'hidden';
  document.body.append(ov);
  close.focus();
}

export function initDiagramZoom() {
  if (ready || typeof document === 'undefined') return;
  ready = true;
  document.addEventListener('click', (e) => {
    if (window.innerWidth > 640) return;
    const t = e.target as Element | null;
    if (!t || t.closest('.dz-ov') || t.closest('a,button,input,select,summary')) return;
    const f = t.closest(SEL);
    const svg = f?.querySelector('svg');
    if (svg) openZoom(svg as SVGSVGElement);
  });
}
