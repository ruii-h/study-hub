/* DOM post-processing of lesson HTML: table stacking, snake layout for chains, Mermaid, reveal-on-scroll. */
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));

export function stackTables(c: HTMLElement) {
  if (innerWidth > 600) return;
  c.querySelectorAll<HTMLElement>('.t-table-wrap').forEach((w) => {
    if (w.scrollWidth <= w.clientWidth + 1) return;
    const tb = w.querySelector('table'); if (!tb || (tb.tHead == null && !tb.querySelector('th'))) return;
    const hs = [...tb.rows[0].cells].map((x) => x.textContent!.trim());
    tb.querySelectorAll('tr').forEach((r, i) => { if (i === 0) return; [...(r as HTMLTableRowElement).cells].forEach((cell, j) => { if (hs[j] && j > 0) cell.setAttribute('data-l', hs[j]); }); });
    w.classList.add('stack');
  });
}

/** Simple one-way vertical chains (flowchart TD, no branches) become a compact snake of numbered boxes. */
export function snakeChains(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('pre.mermaid:not([data-processed])').forEach((pre) => {
    const src = pre.textContent || '';
    if (!/^\s*(%%.*\n)?\s*(flowchart|graph)\s+(TD|TB)/m.test(src) || /subgraph|-\.|==>/.test(src)) return;
    const lab: Record<string, string> = {}, edges: [string, string][] = [];
    const nodeRe = /([A-Za-z_]\w*)\s*(?:\["([^"]*)"\]|\[([^\]]*)\]|\("([^"]*)"\)|\(([^)]*)\))/g; let m;
    while ((m = nodeRe.exec(src))) lab[m[1]] = (m[2] || m[3] || m[4] || m[5] || '').trim();
    src.replace(nodeRe, '$1').split('\n').forEach((l) => { const p = l.split('-->').map((x) => x.replace(/\|[^|]*\|/g, '').trim()); for (let i = 0; i < p.length - 1; i++) { const a = p[i].match(/^[A-Za-z_]\w*/), b = p[i + 1].match(/^[A-Za-z_]\w*/); if (a && b) edges.push([a[0], b[0]]); } });
    if (edges.length < 3) return;
    const out: Record<string, number> = {}, inn: Record<string, number> = {};
    edges.forEach(([a, b]) => { out[a] = (out[a] || 0) + 1; inn[b] = (inn[b] || 0) + 1; });
    if (Object.values(out).some((v) => v > 1) || Object.values(inn).some((v) => v > 1)) return;
    const start = edges.map((e) => e[0]).find((a) => !inn[a]); if (!start) return;
    const next: Record<string, string> = {}; edges.forEach(([a, b]) => (next[a] = b));
    const order: string[] = []; let c: string | undefined = start, g = 0; while (c && g++ < 40) { order.push(c); c = next[c]; }
    if (order.length < 4 || order.length !== new Set(order).size) return;
    const w = pre.parentElement?.clientWidth || 600, cols = Math.max(1, Math.min(4, Math.floor(w / 210)));
    const d = document.createElement('div'); d.className = 'snake'; d.style.setProperty('--cols', String(cols));
    d.innerHTML = order.map((id, i) => {
      const r = Math.floor(i / cols), k = i % cols, col = r % 2 ? cols - k : k + 1, last = i === order.length - 1, arrow = last ? '' : k === cols - 1 ? '↓' : r % 2 ? '←' : '→';
      const t = esc(lab[id] || id).replace(/^\d+\.\s*/, '').replace(/&lt;br\s*\/?&gt;/g, '<br>');
      return `<div class="sn" style="grid-row:${r + 1};grid-column:${col}" data-a="${arrow}"><b>${i + 1}</b><span>${t}</span></div>`;
    }).join('');
    pre.replaceWith(d);
  });
}

type MermaidLike = { initialize: (o: unknown) => void; render: (id: string, text: string) => Promise<{ svg: string }> };
let mid = 0;
const vbWidth = (svg: string) => { const m = /viewBox="[-\d.]+ [-\d.]+ ([\d.]+) ([\d.]+)"/.exec(svg); return m ? +m[1] : 0; };

/**
 * Renders every `pre.mermaid` block. For readability a wide left-to-right flowchart is flipped top-down when fitting it
 * to the page would shrink its text below ~78%, and anything still too wide keeps a readable size and scrolls sideways.
 * Blocks keep their source in data-src so they re-render when the theme changes.
 */
export function runMermaid(root: HTMLElement, load: () => Promise<MermaidLike>, theme: string): Promise<void> {
  if (!root.dataset.dgClick) { root.dataset.dgClick = '1'; root.addEventListener('click', (e) => { const p = (e.target as HTMLElement).closest?.('pre.mermaid') as HTMLElement | null; if (p && p.querySelector('svg')) openDiagram(p); }); }
  const all = [...root.querySelectorAll<HTMLElement>('pre.mermaid')].filter((x) => x.dataset.rendered !== theme);
  if (!all.length) return Promise.resolve();
  return load().then(async (mermaid) => {
    const dark = theme !== 'light';
    const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    // one palette for every diagram type, matched to the app (labels and arrows stay readable in both themes)
    const P = dark
      ? { background: '#0d1117', primaryColor: '#1f2a3a', primaryTextColor: '#e6edf3', primaryBorderColor: '#58a6ff', secondaryColor: '#1e2d24', tertiaryColor: '#161b22', lineColor: '#9aa7b4', textColor: '#e6edf3', edgeLabelBackground: '#10161d', clusterBkg: '#131a22', clusterBorder: '#3b4654', titleColor: '#e6edf3', noteBkgColor: '#2b2a17', noteTextColor: '#f0e6b0', noteBorderColor: '#a89a3c', actorBkg: '#1f2a3a', actorBorder: '#58a6ff', actorTextColor: '#e6edf3', actorLineColor: '#6b7785', signalColor: '#c9d1d9', signalTextColor: '#e6edf3', labelBoxBkgColor: '#1f2a3a', labelBoxBorderColor: '#58a6ff', labelTextColor: '#e6edf3', loopTextColor: '#e6edf3', activationBkgColor: '#2b3a52', sequenceNumberColor: '#0d1117' }
      : { background: '#ffffff', primaryColor: '#e8f1fb', primaryTextColor: '#1f2328', primaryBorderColor: '#0969da', secondaryColor: '#e9f6ec', tertiaryColor: '#f6f8fa', lineColor: '#57606a', textColor: '#1f2328', edgeLabelBackground: '#ffffff', clusterBkg: '#f6f8fa', clusterBorder: '#c9d1d9', titleColor: '#1f2328', noteBkgColor: '#fff8c5', noteTextColor: '#3d3300', noteBorderColor: '#d4a72c', actorBkg: '#e8f1fb', actorBorder: '#0969da', actorTextColor: '#1f2328', actorLineColor: '#8c959f', signalColor: '#24292f', signalTextColor: '#1f2328', labelBoxBkgColor: '#e8f1fb', labelBoxBorderColor: '#0969da', labelTextColor: '#1f2328', loopTextColor: '#1f2328', activationBkgColor: '#d0e4fa', sequenceNumberColor: '#ffffff' };
    mermaid.initialize({
      startOnLoad: false, securityLevel: 'loose', theme: 'base',
      themeVariables: { fontSize: '16px', fontFamily: FONT, ...P },
      flowchart: { htmlLabels: true, curve: 'basis', nodeSpacing: 36, rankSpacing: 46, padding: 14, wrappingWidth: 230, useMaxWidth: true },
      sequence: { useMaxWidth: true, actorMargin: 60, messageFontSize: 15, noteFontSize: 15, actorFontSize: 15 },
      mindmap: { useMaxWidth: true, padding: 14 },
    });
    for (const el of all) {
      if (!el.isConnected) continue;
      const src = el.dataset.src ?? (el.dataset.src = (el.textContent || '').trim());
      const avail = el.parentElement?.clientWidth || el.clientWidth || 720;
      try {
        let { svg } = await mermaid.render('mmd' + ++mid, src);
        let w = vbWidth(svg);
        if (w && avail / w < 0.78 && /^\s*(flowchart|graph)\s+(LR|RL)\b/.test(src)) {
          const td = src.replace(/^(\s*(?:flowchart|graph)\s+)(?:LR|RL)\b/, '$1TB');
          const r2 = await mermaid.render('mmd' + ++mid, td);
          if (vbWidth(r2.svg) < w) { svg = r2.svg; w = vbWidth(r2.svg); }
        }
        if (!el.isConnected) continue;
        el.innerHTML = svg; el.dataset.rendered = theme; el.dataset.processed = 'true';
        const s = el.querySelector('svg');
        if (s && w && avail / w < 0.78) { s.style.minWidth = Math.round(w * 0.78) + 'px'; el.classList.add('mm-scroll'); } else el.classList.remove('mm-scroll');
      } catch (err) { console.warn('mermaid render failed', err); }
    }
  }).catch((err) => console.warn('mermaid load failed', err));
}

/** Full-screen diagram viewer: scrollable both ways with zoom buttons, so even the widest diagram can be read at full size. */
function openDiagram(el: HTMLElement) {
  const svg = el.querySelector('svg'); if (!svg) return;
  const vb = svg.viewBox.baseVal, W = vb.width || svg.getBoundingClientRect().width, H = vb.height || svg.getBoundingClientRect().height;
  const ov = document.createElement('div'); ov.className = 'dg-ov'; ov.setAttribute('role', 'dialog');
  const bar = document.createElement('div'); bar.className = 'dg-bar';
  const view = document.createElement('div'); view.className = 'dg-view';
  const c = svg.cloneNode(true) as SVGSVGElement; c.removeAttribute('style'); c.removeAttribute('width'); c.removeAttribute('height'); c.classList.add('dg-svg');
  view.appendChild(c);
  let z = Math.min(1.4, Math.max(0.3, (innerWidth - 24) / W));
  const apply = () => { c.style.width = Math.round(W * z) + 'px'; c.style.height = Math.round(H * z) + 'px'; label.textContent = Math.round(z * 100) + '%'; };
  const mk = (t: string, f: () => void, cls = '') => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.className = cls; b.onclick = f; bar.appendChild(b); return b; };
  const label = document.createElement('span');
  mk('−', () => { z = Math.max(0.2, z / 1.25); apply(); });
  bar.appendChild(label);
  mk('+', () => { z = Math.min(4, z * 1.25); apply(); });
  mk('Fit', () => { z = Math.min(1.4, Math.max(0.2, (innerWidth - 24) / W)); apply(); });
  mk('100%', () => { z = 1; apply(); });
  const close = () => { ov.remove(); removeEventListener('keydown', key); };
  const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
  mk('✕ Close', close, 'dg-x');
  addEventListener('keydown', key);
  ov.append(bar, view); document.body.appendChild(ov); apply();
}

/** Adds `.in` to `.reveal` blocks as they scroll into view (the CSS animates the rest). */
export function reveal(root: HTMLElement, scroller: HTMLElement) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { root: scroller, threshold: 0.05 });
  root.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => { el.style.transitionDelay = Math.min(i, 4) * 60 + 'ms'; io.observe(el); });
  return () => io.disconnect();
}

/**
 * Content-aware widths: when several `.t-unit` cards share a row, wrap them in a flex row where each card grows in
 * proportion to how much text it holds, so a long card is wide and a short one is narrow. Re-run on every size change.
 */
export function balanceUnits(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.unit-row').forEach((w) => { [...w.children].forEach((u) => ((u as HTMLElement).style.flex = '')); w.replaceWith(...w.childNodes); });
  root.querySelectorAll<HTMLElement>('.t-section').forEach((sec) => {
    if (getComputedStyle(sec).display !== 'grid') return;
    [...sec.children].forEach((k) => (k as HTMLElement).style.removeProperty('grid-column'));
    const rows = new Map<number, HTMLElement[]>();
    [...sec.children].filter((k) => k.classList.contains('t-unit') && (k as HTMLElement).offsetHeight > 0).forEach((u) => { const t = (u as HTMLElement).offsetTop; rows.set(t, [...(rows.get(t) || []), u as HTMLElement]); });
    rows.forEach((list) => {
      if (list.length < 2) return;
      const w = document.createElement('div'); w.className = 'unit-row'; list[0].before(w);
      list.forEach((u) => { u.style.flex = `${Math.max(120, (u.textContent || '').length)} 1 220px`; w.appendChild(u); });
    });
  });
}

/**
 * Small two-entity comparison tables (blank corner cell, 2-3 entities as columns, up to 4 attribute rows for two entities, 3 for three) read better
 * flipped: each entity becomes a row and the attributes become the columns.
 */
export function transposeTables(root: HTMLElement) {
  root.querySelectorAll<HTMLTableElement>('table.t-mini-table:not([data-flipped])').forEach((tb) => {
    const head = tb.tHead?.rows[0]; if (!head) return;
    const corner = head.cells[0].textContent!.trim();
    const nCols = head.cells.length - 1; const body = [...(tb.tBodies[0]?.rows || [])];
    if (!(corner === '' || /^(Aspect|Feature|Attribute|Dimension|Criterion|Property)$/.test(corner)) || nCols < 2 || nCols > 3 || body.length < 2 || (nCols === 2 ? body.length > 4 : body.length > 3)) return;
    const entities = [...head.cells].slice(1).map((c) => c.innerHTML);
    const attrs = body.map((r) => r.cells[0].innerHTML);
    const strip = (h: string) => h.replace(/^\s*<strong[^>]*>([\s\S]*?)<\/strong>\s*$/, '$1');
    let h = '<thead><tr><th></th>' + attrs.map((a) => `<th>${strip(a)}</th>`).join('') + '</tr></thead><tbody>';
    entities.forEach((e, j) => { h += `<tr><td><strong class="k-c">${e}</strong></td>` + body.map((r) => `<td>${r.cells[j + 1]?.innerHTML ?? ''}</td>`).join('') + '</tr>'; });
    tb.innerHTML = h + '</tbody>'; tb.dataset.flipped = '1';
  });
}

/** Blank cells under a filled cell in the same column become one merged (rowspan) cell, so grouped rows read as a group. */
export function mergeCells(root: HTMLElement) {
  root.querySelectorAll<HTMLTableElement>('table:not([data-flipped]):not([data-merged])').forEach((tb) => {
    if (tb.closest('.stack')) return;
    const rows = [...(tb.tBodies[0]?.rows || [])]; if (rows.length < 2) return;
    const n = Math.max(...rows.map((r) => r.cells.length));
    if (rows.some((r) => r.cells.length !== n)) return;
    const blank = (c: HTMLElement) => /^\s*$/.test(c.textContent || '') && !c.querySelector('img,svg,input');
    let did = false;
    for (let j = 0; j < n - 1; j++) {
      let top: HTMLTableCellElement | null = null;
      for (const r of rows) {
        const c = r.cells[j] as HTMLTableCellElement | undefined; if (!c) continue;
        if (blank(c) && top) { top.rowSpan += 1; c.remove(); did = true; } else top = blank(c) ? null : c;
      }
    }
    if (did) { tb.dataset.merged = '1'; tb.classList.add('has-merge'); }
  });
}
