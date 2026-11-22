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

type MermaidLike = { initialize: (o: unknown) => void; run: (o: { nodes: HTMLElement[] }) => Promise<void> };
export function runMermaid(root: HTMLElement, load: () => Promise<MermaidLike>, theme: string) {
  const bl = [...root.querySelectorAll<HTMLElement>('pre.mermaid:not([data-processed])')]; if (!bl.length) return;
  load().then((mermaid) => {
    const go = async (nodes: HTMLElement[], n: number) => {
      try { mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: theme === 'light' ? 'neutral' : 'dark' }); await mermaid.run({ nodes }); } catch { /* retried below */ }
      const bad = nodes.filter((x) => x.isConnected && !x.querySelector('svg'));
      if (bad.length && n < 3) setTimeout(() => go(bad, n + 1), 600);
    };
    go(bl, 0);
  }).catch(() => undefined);
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
