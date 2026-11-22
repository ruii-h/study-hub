// One-off: align the IDP Gestalt content with "idp final.md" §11.5 — six principles, one fixed name and wording each:
// Similarity, Proximity, Closure, Common region (older name: enclosure), Continuity, Figure/ground.
// Lecture 11 teaches four of them in full (Closure, Common region, Figure/ground, Proximity).
import fs from 'node:fs';

const f = 'src/courses/idp/data.json';
const D = JSON.parse(fs.readFileSync(f, 'utf8'));

const ROWS = [
  ['Similarity', 'Elements that look alike (shape, colour, size) are seen as related; dissimilar elements are seen as separate groups', 'Links styled in one colour read as one group of links'],
  ['Proximity', 'We group closer-together elements and separate them from elements that are farther away', "A progress bar's segments read as one connected sequence because they sit close together"],
  ['Closure', 'We prefer complete shapes and automatically fill in small gaps to perceive a whole', 'A partially drawn shape or logo is still read as complete'],
  ['Common region', 'We group elements that share the same enclosed or bounded region (older name: <em>enclosure</em>)', 'Elements inside the same card or bordered box are read as related'],
  ['Continuity', 'Elements arranged along a line or smooth curve are perceived as related (good continuation)', 'Items in a row or aligned column read as a sequence'],
  ['Figure/ground', 'We dislike ambiguity and seek solid, stable items to perceive as the "figure" against a background', 'An iOS blur/focus effect pushes the background out of focus so the foreground reads clearly'],
];
const SHORT = [
  ['Similarity', 'Things that look alike are seen as related', 'All links share one colour'],
  ['Proximity', 'Closer elements are grouped; farther ones are separated', 'Segments of a progress bar'],
  ['Closure', 'We fill in small gaps to see a whole shape', 'A partly drawn logo still reads as complete'],
  ['Common region', 'Elements inside the same bounded area are grouped (older name: enclosure)', 'Items in one card or bordered box'],
  ['Continuity', 'Elements along a line or smooth curve are seen as related', 'Items in a row or an aligned column'],
  ['Figure/ground', 'We separate a stable “figure” from the background', 'Blurred background behind foreground content'],
];

function must(h, a, label) { const i = h.indexOf(a); if (i < 0) throw new Error('missing: ' + label); return i; }

/* ----- lecture 1 ----- */
{
  let h = D.lessons[0].html;
  const s = h.indexOf('<p><strong class="k-c">Gestalt principles (added context):</strong>');
  if (s < 0) throw new Error('L1 callout');
  const e = h.indexOf('</p>', s) + 4;
  h = h.slice(0, s) + '<p><strong class="k-c">Gestalt principles (added context):</strong> these are perceptual rules describing how humans automatically group visual elements — <em>similarity</em> (things that look alike are seen as related), <em>proximity</em> (things placed close together are seen as related), and <em>common region</em> (things inside a shared boundary are seen as one group). The full set of six is listed in §11.5. (Lecture 1, slide 2 calls the third one <em>enclosure</em>; it is the same idea as <em>common region</em> in Lecture 11.) They recur later under Visual Design (§11) and are why "add a border/background" or "align things into columns" is a real design decision, not decoration.</p>' + h.slice(e);
  D.lessons[0].html = h;
}
D.cards[6].d = 'Similarity, proximity, closure, common region, continuity, figure/ground — perceptual grouping rules';

/* ----- lecture 11 ----- */
{
  let h = D.lessons[10].html;
  h = h.replace('SEE IT — the five Gestalt principles, drawn', 'SEE IT — the six Gestalt principles, drawn');

  // demo cards: canonical order, plus a Continuity card
  const start = must(h, '<div class="dm-card"><div class="dm-t">Similarity</div>', 'demo start');
  const logo = must(h, '<div class="dm-card"><div class="dm-t">Logo fonts', 'demo end');
  const cards = h.slice(start, logo).split('<div class="dm-card">').filter(Boolean).map((c) => '<div class="dm-card">' + c);
  const by = (t) => cards.find((c) => c.includes(`<div class="dm-t">${t}`));
  const cont = '<div class="dm-card"><div class="dm-t">Continuity</div><svg viewBox="0 0 160 70" class="gs"><path d="M8 54 C40 54 50 16 80 16 S120 54 152 54" fill="none" stroke="#9aa4b0" stroke-width="2" stroke-dasharray="3 5"/><g fill="#4c8dff"><circle cx="14" cy="54" r="6"/><circle cx="38" cy="46" r="6"/><circle cx="58" cy="26" r="6"/><circle cx="80" cy="16" r="6"/><circle cx="102" cy="26" r="6"/><circle cx="122" cy="46" r="6"/><circle cx="146" cy="54" r="6"/></g></svg><div class=dm-cap>Dots along a smooth curve read as one flowing line.</div></div>';
  const ordered = [by('Similarity'), by('Proximity'), by('Closure'), by('Common region'), cont, by('Figure')];
  if (ordered.some((x) => !x)) throw new Error('cards');
  h = h.slice(0, start) + ordered.join('') + h.slice(logo);

  h = h.replace('the five Gestalt principles are given full treatment here, describing how people perceive structure, logic, and patterns:', 'the Gestalt principles are given full treatment here, describing how people perceive structure, logic, and patterns. <strong class="k-c">These are the standard names used everywhere in this guide:</strong> Similarity, Proximity, Closure, Common region, Continuity, Figure/ground.');

  // main table
  const t0 = must(h, '<td><strong class="k-c">Similarity</strong></td>', 'table');
  const trStart = h.lastIndexOf('<tr>', t0);
  const tbEnd = h.indexOf('</tbody>', t0);
  const rows = ROWS.map(([n, d, e]) => `<tr>\n<td><strong class="k-c">${n}</strong></td>\n<td>${d}</td>\n<td>${e}</td>\n</tr>\n`).join('');
  h = h.slice(0, trStart) + rows + h.slice(tbEnd);
  // note after the table
  const afterTable = h.indexOf('</table></div>', trStart) + '</table></div>'.length;
  h = h.slice(0, afterTable) + '\n<p><strong class="k-c">Source conflict, resolved.</strong> The lecture slides use two different lists. Lecture 1 (slide 2) names <em>similarity, enclosure, proximity</em>; Lecture 11 (slides 46–48 and the closing summary) teaches four: <strong class="k-c">Closure, Common region, Figure/ground and Proximity</strong>. “Enclosure” and “Common region” are the same principle, so this guide uses <strong class="k-c">Common region</strong>. Lecture 11’s overview slide also lists “similarity” among the principles behind visual design, and the Notion notes add <strong class="k-c">Continuity</strong>, so Similarity and Continuity are in the table even though Lecture 11 does not teach them in full. Two further grouping principles appear in Lecture 10 / Notion Ch. 9: <em>symmetry</em> and <em>periodicity</em> (Weinschenk, 2011).</p>' + h.slice(afterTable);

  // "exact names" glance table
  const g0 = must(h, '<tr><td><b>Similarity</b></td>', 'glance');
  const g1 = h.indexOf('</tbody>', g0);
  h = h.slice(0, g0) + SHORT.map(([n, d, e]) => `<tr><td><b>${n}</b></td><td>${d}</td><td>${e}</td></tr>`).join('') + h.slice(g1);

  h = h.replace('<em>Similarity</em>: things that look alike (colour, shape, size) are seen as related — e.g. one colour for every link.</p>', '<em>Similarity</em>: elements that look alike are seen as related — e.g. one colour for every link. <em>Continuity</em>: elements along a line or smooth curve read as a sequence — e.g. an aligned column of items.</p>');
  D.lessons[10].html = h;
}
D.cards[53].t = 'Closure / Common region / Figure-ground / Proximity (Gestalt)';
D.cards[53].d = 'The four principles on the Lecture 11 slides (full set of six in §11.5)';
// the same flashcard is also printed inside lecture 11's own "flip to recall" block
{
  let h = D.lessons[10].html;
  h = h.split('Similarity / Proximity / Common region / Closure / Figure-ground (Gestalt)').join('Closure / Common region / Figure-ground / Proximity (Gestalt)');
  h = h.split('Five perceptual grouping principles').join('The four principles on the Lecture 11 slides (full set of six in §11.5)');
  D.lessons[10].html = h;
}

/* ----- self-check Q17 (matches the notes: four taught in Lecture 11, two more in §11.5) ----- */
{
  let s = D.selfq;
  s = s.replace('Name the five Gestalt principles covered in Lecture 11 and give a one-line description of each.', 'Name the four Gestalt principles covered in Lecture 11 and give a one-line description of each (§11.5 lists two more: similarity and continuity).');
  const a = s.indexOf('Similarity — things that look alike (colour, shape, size) are seen as related. Proximity');
  if (a < 0) throw new Error('Q17 answer');
  const b = s.indexOf('</p>', a);
  s = s.slice(0, a) + 'Closure — we prefer complete shapes and mentally fill in small gaps. Common region — we group elements that share the same enclosed/bordered area. Figure/ground — we seek a stable, unambiguous "figure" against a background rather than tolerating visual ambiguity. Proximity — we group elements that sit physically closer together, separating them from more distant elements.' + s.slice(b);
  D.selfq = s;
}

fs.writeFileSync(f, JSON.stringify(D));
console.log('ok');
