/**
 * Obsidian code colours for every `.t-code-body` block (python, powershell/bash). Runs after the guide renders
 * and again whenever new blocks appear (questions, ICE answers, search jumps). Palette: see course-extra.css (.tk-*).
 */
import { javascript, css, html, json } from './highlight-web';
const KW = new Set('def return if elif else for while break continue pass import from as class try except finally raise with lambda global nonlocal yield del assert async await'.split(' '));
const LOGIC = new Set(['and', 'or', 'not', 'in', 'is']);
const CONST = new Set(['True', 'False', 'None']);
const BUILTIN = new Set('print len range input int str float list dict set tuple open sorted sum min max enumerate isinstance type round abs bool zip map any all reversed hash chr ord pow format repr id iter next filter bytes'.split(' '));
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const span = (c: string, t: string) => `<span class="tk-${c}">${esc(t)}</span>`;

function python(src: string): string {
  const re = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|[fFrRbB]{0,2}"(?:\\.|[^"\\\n])*"|[fFrRbB]{0,2}'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?(?:[eE][-+]?\d+)?\b)|([A-Za-z_]\w*)|(\*\*=?|\/\/=?|[-+*/%<>=!]=?|->|:=|@)|(\s+)|(.)/g;
  let out = '';
  let m: RegExpExecArray | null;
  let afterDef = false;
  let inParams = false;
  let depth = 0;
  while ((m = re.exec(src))) {
    const [t, com, str, num, id, op, ws] = m;
    if (com) out += span('c', t);
    else if (str) out += span('s', t);
    else if (num) out += span('n', t);
    else if (id) {
      const rest = src.slice(re.lastIndex);
      const call = /^\s*\(/.test(rest);
      if (KW.has(id)) { out += span('k', t); afterDef = id === 'def' || id === 'class'; }
      else if (LOGIC.has(id)) out += span('o', t);
      else if (CONST.has(id)) out += span('b', t);
      else if (afterDef) { out += span('f', t); afterDef = false; inParams = true; depth = 0; }
      else if (inParams) out += span('p', t);
      else if (BUILTIN.has(id)) out += span('bi', t);
      else if (call) out += span('f', t);
      else if (id === 'self') out += span('bi', t);
      else out += span('v', t);
    } else if (op) out += span('o', t);
    else if (ws) out += t;
    else {
      if (inParams) { if (t === '(') depth++; if (t === ')') { depth--; if (depth <= 0) inParams = false; } }
      out += esc(t);
    }
  }
  return out;
}

function shell(src: string): string {
  return src.split('\n').map((line) => {
    let first = true;
    const re = /(#[^\n]*)|("(?:\\.|[^"\\])*"|'[^']*')|(\$\w+|\$\{[^}]*\})|(\s--?[A-Za-z][\w-]*)|(>>?|\||&&|;|\+?=)|(\b\d+\b)|(\S+)|(\s+)/g;
    let out = '';
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      const [t, com, str, vr, opt, op, num, word] = m;
      if (com) out += span('c', t);
      else if (str) { out += span('s', t); first = false; }
      else if (vr) out += span('v', t);
      else if (opt) out += ' ' + span('bi', t.slice(1));
      else if (op) { out += span('o', t); first = op === '|' || op === '&&' || op === ';'; }
      else if (num) out += span('n', t);
      else if (word) { out += first ? span('f', t) : esc(t); first = false; }
      else out += t;
    }
    return out;
  }).join('\n');
}

const LANG: Record<string, (s: string) => string> = { python: python, powershell: shell, bash: shell, sh: shell, shell: shell, javascript, js: javascript, css, html, vue: html, json };

const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
/** Colours one block. */
function paint(el: HTMLElement): void {
  el.dataset.hl = '1';
  const lang = (el.parentElement?.querySelector('.t-code-header span')?.textContent || '').trim().toLowerCase();
  const fn = LANG[lang];
  if (fn) el.innerHTML = fn(el.textContent || '');
}
/** Async version for very large chapters: colours the blocks a few at a time so the page stays responsive; resolves when all are done. */
export async function highlightChunked(root: ParentNode, per = 4): Promise<void> {
  const els = [...root.querySelectorAll<HTMLElement>('.t-code-body:not([data-hl])')];
  for (let i = 0; i < els.length; i += per) { els.slice(i, i + per).forEach(paint); await frame(); }
}

export function highlightAll(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('.t-code-body:not([data-hl])').forEach((el) => {
    if (el.closest('.defer-hl')) return; // a big chapter is colouring these itself (highlightChunked)
    el.dataset.hl = '1';
    const lang = (el.parentElement?.querySelector('.t-code-header span')?.textContent || '').trim().toLowerCase();
    const fn = LANG[lang];
    if (fn) el.innerHTML = fn(el.textContent || '');
  });
}

/** Highlights existing blocks and every block added later; returns a stop function. */
export function watchHighlight(): () => void {
  highlightAll();
  let queued = false;
  const mo = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; highlightAll(); });
  });
  mo.observe(document.body, { childList: true, subtree: true });
  return () => mo.disconnect();
}
