// Turns the multiple-choice cards of Exam Practice into interactive ones (like the IS211 quiz):
// tick options, "Check answer", right/wrong colouring, and a note under every option saying why it is right or wrong.
import { WHY } from './mcq-why.mjs';

const L = 'ABCDEFGHIJKL';
const text = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/\s+/g, ' ').trim();
const norm = (s) => text(s).replace(/\s*\((marked answer|cannot be|possible|Your pick[^)]*)\)\s*/gi, '').replace(/[.]+$/, '').toLowerCase();

// growth classes, smallest to largest, for the automatic "too small / too big" notes on Big-O lists
const RANK = ['O(1)', 'O(log (log n))', 'O(log n)', 'O(√n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n² log n)', 'O(n³)', 'O(2ⁿ)', 'O(3ⁿ)', 'O(n!)', 'O(nⁿ)'];
function autoBigO(opts, ci) {
  if (ci.length !== 1) return null;
  const t = opts.map(text); const C = RANK.indexOf(t[ci[0]]);
  if (C < 0 || t.some((x) => RANK.indexOf(x) < 0)) return null;
  return t.map((x, i) => {
    if (i === ci[0]) return null;
    return RANK.indexOf(x) < C
      ? `Too small. The cost really grows like ${t[ci[0]]}, which is faster than ${x}.`
      : `Too big. ${x} is only a loose upper bound. The cost really grows like ${t[ci[0]]}, so that is the tight answer.`;
  });
}

const CARD = /(<div class="exr reveal"><div class="exr-head"><span class="cf-tag">)([^<]*)(<\/span><h4>)([\s\S]*?)(<\/h4><\/div><div class="exr-q"><div>)([\s\S]*?)(<\/div><\/div><details class="model"><summary>)[^<]*(<\/summary><div class="ma">)([\s\S]*?)(<\/div><\/details><\/div>)/g;

function keyOf(chip) {
  const m = /^(MOCK FINAL|MOCK MIDTERM|ACTUAL MIDTERM)(?: (\d))? · Q(\d+)/.exec(chip); if (!m) return '';
  return (m[1] === 'MOCK FINAL' ? 'F' + m[2] : m[1] === 'MOCK MIDTERM' ? 'M' + m[2] : 'AM') + 'Q' + m[3];
}

export function mcqify(html, log = []) {
  return html.replace(CARD, (all, a, chip, b, title, c, q, d, e, ma, z) => {
    const key = keyOf(chip);
    // the options are the last <ul> of the question and must end it
    const u = /<ul>((?:(?!<ul>)[\s\S])*)<\/ul>$/.exec(q); if (!u) return all;
    const lis = [...u[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((x) => x[1]); if (lis.length < 2) return all;
    if (!/^<p><b>(Correct option|Answer)/.test(ma)) return all;
    // which options are right
    let rightTxt = [], rest = ma;
    const lm = /^<p><b>Correct options?\.<\/b><\/p><ul>([\s\S]*?)<\/ul>/.exec(ma);
    if (lm) { rightTxt = [...lm[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((x) => norm(x[1])); rest = ma.slice(lm[0].length); }
    else { const am = /^<p><b>Answer: ([\s\S]*?)<\/b>/.exec(ma); if (am) rightTxt = [norm(am[1])]; rest = ma; }
    const on = lis.map(norm); const ci = [];
    for (const r of rightTxt) { let i = on.indexOf(r); if (i < 0) i = on.findIndex((o) => o && (r.startsWith(o) || o.startsWith(r))); if (i >= 0 && !ci.includes(i)) ci.push(i); }
    if (!ci.length || ci.length !== rightTxt.length) { log.push('NO MATCH ' + key + ' ' + JSON.stringify(rightTxt)); return all; }
    ci.sort((x, y) => x - y);
    const stem = q.slice(0, u.index);
    lis.forEach((x, i) => { lis[i] = x.replace(/s*((cannot be|possible))/gi, ''); }); // the answer hints are shown only after checking
    const multi = ci.length > 1 || /select all|choose (1 or more|2|two|3|three)|select \d|\(select/i.test(text(stem + ' ' + title));
    let why = WHY[key] || autoBigO(lis, ci);
    if (WHY[key] && WHY[key].length !== lis.length) { log.push(`WHY LENGTH ${key}: ${WHY[key].length} vs ${lis.length}`); why = null; }
    if (!why) log.push('NO WHY ' + key);
    const opts = lis.map((o, i) => {
      const w = why && why[i];
      return `<div class="mcq-o"><label class="eo"><input type="checkbox"><i>${L[i]}.</i><span>${o}</span></label>${w ? `<div class="why ${ci.includes(i) ? 'wy' : 'wn'}" hidden><b>${ci.includes(i) ? 'Why this is right' : 'Why this is wrong'}:</b> ${w}</div>` : ''}</div>`;
    }).join('');
    const expl = rest.replace(/^<p><b>Answer: [\s\S]*?<\/b>\s*/, '<p>');
    const out = `<div class="mcq" data-ans="${ci.join(',')}" data-multi="${multi ? 1 : 0}">${stem}<div class="qh"><span class="ms">${multi ? 'SELECT ALL THAT APPLY' : 'CHOOSE THE BEST ANSWER'}</span></div>`
      + `<div role="group" aria-label="Answer options">${opts}</div>`
      + `<div class="row"><button type="button" class="btn mcq-check" disabled>Check answer</button></div>`
      + `<div class="verdict mcq-verdict" hidden><div class="mcq-head"></div><div class="mcq-expl">${expl}</div><div class="row"><button type="button" class="btn ghost mcq-retry">↺ Try again</button></div></div></div>`;
    return a + chip + b + title + c + out + '</div></div></div>';
  });
}
