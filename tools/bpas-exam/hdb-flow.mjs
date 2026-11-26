// Hand-laid-out BPMN picture of the 2018 HDB resale workflow (the alternative official solution), following the exam paper's figure.
// The automatic swimlane layout tangled this one, so every coordinate is fixed here. Static SVG, no Mermaid needed.
import { esc } from './lib.mjs';

const BOX = (cx, cy, w, h, lines) => {
  const x = cx - w / 2, y = cy - h / 2, n = lines.length, top = cy - (n - 1) * 6.8 + 4;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fff8cc" stroke="#6b6b3a" stroke-width="1.3"/>`
    + `<text text-anchor="middle" font-size="11.5" fill="#1f2328">${lines.map((l, i) => `<tspan x="${cx}" y="${(top + i * 13.6).toFixed(1)}">${esc(l)}</tspan>`).join('')}</text>`;
};
const XGW = (cx, cy, r = 18) => `<polygon points="${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}" fill="var(--surface,#fff)" stroke="currentColor" stroke-width="1.6"/>`
  + `<path d="M${cx - 7} ${cy - 7}L${cx + 7} ${cy + 7}M${cx + 7} ${cy - 7}L${cx - 7} ${cy + 7}" stroke="currentColor" stroke-width="2.6"/>`;
const AND = (cx, cy, r = 20) => `<polygon points="${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}" fill="var(--surface,#fff)" stroke="currentColor" stroke-width="1.6"/>`
  + `<path d="M${cx - 9} ${cy}H${cx + 9}M${cx} ${cy - 9}V${cy + 9}" stroke="currentColor" stroke-width="2.8"/>`;
const EV = (cx, cy, thick) => `<circle cx="${cx}" cy="${cy}" r="13" fill="var(--surface,#fff)" stroke="currentColor" stroke-width="${thick ? 3.2 : 1.5}"/>`;
const PC = (cx, cy, name, ly) => `<g stroke="#555" stroke-width="1.2" fill="var(--surface,#fff)"><rect x="${cx - 14}" y="${cy - 14}" width="28" height="19" rx="2"/><path d="M${cx - 18} ${cy + 9}H${cx + 18}L${cx + 14} ${cy + 5}H${cx - 14}Z"/></g>`
  + `<text x="${cx}" y="${ly}" text-anchor="middle" font-size="11" fill="currentColor">${esc(name)}</text>`;
const LINE = (pts) => `<path d="${pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ')}" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#hd-a)"/>`;
const DOT = (pts) => `<path d="${pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ')}" fill="none" stroke="#666" stroke-width="1.2" stroke-dasharray="2 3"/>`;
const LBL = (x, y, t, anchor = 'middle', rot) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="11.5" fill="currentColor"${rot ? ` transform="rotate(-90 ${x} ${y})"` : ''}>${esc(t)}</text>`;

/** Figure 4.1, the main official solution: same drawing style, fixed layout. */
export function hdbOfficialFlow() {
  const W = 1700, H = 640, R = W - 8, laneY = [18, 215, 470, 628];
  let s = '<defs><marker id="hd-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>';
  s += `<rect x="30" y="${laneY[0]}" width="${R - 30}" height="${laneY[3] - laneY[0]}" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="52" y1="${laneY[0]}" x2="52" y2="${laneY[3]}" stroke="currentColor" stroke-width="1.2"/>`;
  s += `<line x1="30" y1="${laneY[1]}" x2="${R}" y2="${laneY[1]}" stroke="currentColor" stroke-width="1.2"/><line x1="30" y1="${laneY[2]}" x2="${R}" y2="${laneY[2]}" stroke="currentColor" stroke-width="1.2"/>`;
  s += `<text transform="rotate(-90 20 ${(laneY[0] + laneY[3]) / 2})" x="20" y="${(laneY[0] + laneY[3]) / 2 + 4}" text-anchor="middle" font-size="12.5" font-weight="600" fill="currentColor">Resale Process at HDB</text>`;
  ['Buyer', 'HDB-RP', 'Seller'].forEach((n, i) => { const my = (laneY[i] + laneY[i + 1]) / 2; s += `<text transform="rotate(-90 41 ${my})" x="41" y="${my + 4}" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${n}</text>`; });
  // connectors
  s += LINE([[99, 110], [116, 110]]);
  s += LINE([[178, 145], [178, 247]]);
  s += LINE([[228, 282], [268, 282]]) + LINE([[368, 282], [408, 282]]) + LINE([[508, 282], [548, 282]]);
  s += LINE([[648, 282], [712, 282]]);
  s += LINE([[748, 282], [820, 282]]);
  s += LINE([[730, 300], [730, 400], [785, 400]]);
  s += LINE([[870, 247], [870, 128]]);
  s += LINE([[888, 110], [938, 110]]);
  s += LINE([[1000, 145], [1000, 247]]);
  s += LINE([[1000, 317], [1000, 500]]);
  s += LINE([[1055, 535], [1112, 535]]);
  s += LINE([[1130, 517], [1130, 317]]);
  s += LINE([[1130, 247], [1130, 50], [870, 50], [870, 92]]);
  s += LINE([[1148, 535], [1230, 535], [1230, 317]]);
  s += LINE([[1250, 297], [1275, 297], [1275, 250], [1305, 250]]) + LINE([[1275, 297], [1275, 345], [1305, 345]]);
  s += LINE([[1455, 250], [1468, 250], [1468, 297], [1480, 297]]) + LINE([[1455, 345], [1468, 345], [1468, 297]]);
  s += LINE([[1500, 277], [1500, 155]]);
  s += LINE([[1565, 110], [1587, 110]]);
  // nodes
  s += EV(86, 110, false);
  s += BOX(178, 110, 124, 70, ['Submit Registration', 'Details', '(HDB-RP)']);
  s += BOX(178, 282, 100, 70, ['Retrieve Buyer', 'Personal Data', '(SingPass Service)']);
  s += BOX(318, 282, 100, 70, ["Retrieve Buyer's", 'income data', '(STS)']);
  s += BOX(458, 282, 100, 70, ['Validate Buyers', 'Eligibility']);
  s += BOX(598, 282, 100, 70, ["Notify Buyer's", 'eligibility']);
  s += XGW(730, 282);
  s += LBL(730, 252, 'Eligible?');
  s += BOX(870, 282, 100, 70, ['eMail Application', 'Form and flats list']);
  s += EV(800, 400, true);
  s += LBL(800, 432, 'End (non-eligible)');
  s += XGW(870, 110);
  s += BOX(1000, 110, 124, 70, ['Update Application', 'Form and select flat', '(HDB-RP)']);
  s += BOX(1000, 282, 100, 70, ['Notify Seller on', 'the Buyer', 'proposal']);
  s += BOX(1000, 535, 110, 70, ['Review Offer', '(HDB-RP)']);
  s += XGW(1130, 535);
  s += LBL(1130, 578, 'Offer decision?');
  s += BOX(1130, 282, 100, 70, ['Notify Rejection', 'to Buyer']);
  s += AND(1230, 297);
  s += BOX(1380, 250, 150, 54, ['Send appointment with', 'HDB officer to the seller']);
  s += BOX(1380, 345, 150, 54, ['Send appointment with', 'HDB officer to the buyer']);
  s += AND(1500, 297);
  s += BOX(1500, 110, 130, 90, ['Appointment with', 'HDB Officer', '(manual; the seller', 'is also a participant)']);
  s += EV(1600, 110, true);
  // labels
  s += LBL(742, 360, 'Non-eligible', 'start');
  s += LBL(784, 274, 'Eligible', 'middle');
  s += LBL(1122, 430, 'Offer Rejected', 'end');
  s += LBL(1190, 524, 'Offer Accepted');
  return `<div class="t-table-wrap" tabindex="0"><svg viewBox="0 0 ${W} ${H}" width="${W}" style="min-width:1100px;max-width:100%;height:auto;color:var(--text,#222)" role="img" aria-label="TO-BE workflow model of the HDB resale process (official solution)" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif">${s}</svg></div>`;
}

export function hdbAltFlow() {
  const W = 1456, H = 640;
  const laneY = [18, 215, 470, 628];
  let s = '<defs><marker id="hd-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>';
  // pool + lanes
  s += `<rect x="30" y="${laneY[0]}" width="1418" height="${laneY[3] - laneY[0]}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  s += `<line x1="52" y1="${laneY[0]}" x2="52" y2="${laneY[3]}" stroke="currentColor" stroke-width="1.2"/>`;
  s += `<line x1="30" y1="${laneY[1]}" x2="1448" y2="${laneY[1]}" stroke="currentColor" stroke-width="1.2"/><line x1="30" y1="${laneY[2]}" x2="1448" y2="${laneY[2]}" stroke="currentColor" stroke-width="1.2"/>`;
  s += `<text transform="rotate(-90 20 ${(laneY[0] + laneY[3]) / 2})" x="20" y="${(laneY[0] + laneY[3]) / 2 + 4}" text-anchor="middle" font-size="12.5" font-weight="600" fill="currentColor">Resale Process at HDB</text>`;
  ['Buyer', 'HDB-RP', 'Seller'].forEach((n, i) => {
    const my = (laneY[i] + laneY[i + 1]) / 2;
    s += `<text transform="rotate(-90 41 ${my})" x="41" y="${my + 4}" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${n}</text>`;
  });
  // connectors first so boxes sit on top
  s += LINE([[99, 72], [128, 72]]);
  s += LINE([[178, 107], [178, 247]]);
  s += LINE([[202, 282], [240, 282]]) + LINE([[340, 282], [363, 282]]);
  s += LINE([[413, 317], [413, 369]]);
  s += LINE([[431, 387], [500, 387], [500, 282], [511, 282]]);
  s += LINE([[413, 405], [413, 430], [527, 430]]);
  s += LINE([[627, 430], [682, 430]]);
  s += LINE([[611, 282], [646, 282]]);
  s += LINE([[696, 247], [696, 107]]);
  s += LINE([[746, 72], [812, 72]]);
  s += LINE([[830, 90], [830, 126]]);
  s += LINE([[830, 190], [830, 247]]);
  s += LINE([[830, 317], [830, 500]]);
  s += LINE([[882, 535], [934, 535]]);
  s += LINE([[952, 517], [952, 317]]);
  s += LINE([[952, 247], [952, 72], [848, 72]]);
  s += LINE([[970, 535], [1104, 535], [1104, 322]]);
  s += LINE([[1164, 282], [1213, 282]]);
  s += LINE([[1233, 262], [1233, 136]]);
  s += LINE([[1233, 302], [1233, 506]]);
  s += LINE([[1282, 104], [1320, 104], [1320, 262]]);
  s += LINE([[1282, 540], [1320, 540], [1320, 302]]);
  s += LINE([[1340, 282], [1372, 282]]);
  // system attachments (dotted)
  s += DOT([[226, 62], [318, 46]]) + DOT([[226, 92], [318, 150]]);
  s += DOT([[151, 317], [128, 360]]) + DOT([[290, 317], [280, 360]]);
  s += DOT([[712, 107], [726, 150]]) + DOT([[788, 160], [756, 164]]);
  s += DOT([[790, 542], [756, 556]]);
  // nodes
  s += EV(86, 72, false);
  s += BOX(178, 72, 100, 70, ['Submit', 'Registration details', '& Singpass access']);
  s += BOX(151, 282, 100, 70, ['Retrieve Buyer', 'Personal Data']);
  s += BOX(290, 282, 100, 70, ["Retrieve Buyer's", 'income data']);
  s += BOX(413, 282, 100, 70, ['Validate Buyers', 'Eligibility']);
  s += XGW(413, 387);
  s += BOX(561, 282, 100, 70, ['Generate', 'Application Form', 'and flats list']);
  s += BOX(696, 282, 100, 70, ['Email Application', 'Form and flats list', 'to buyer &', 'application success']);
  s += BOX(696, 72, 100, 70, ['Review & Update', 'Application Form']);
  s += XGW(830, 72);
  s += BOX(830, 158, 100, 64, ['Select flat from', 'resale pool list', 'with proposed', 'price']);
  s += BOX(830, 282, 100, 70, ['Notify Seller on', 'the Buyer', 'proposal']);
  s += BOX(952, 282, 100, 70, ['Notify Rejection', 'to Buyer']);
  s += BOX(577, 430, 100, 64, ['Notify Buyer of', 'application', 'failure']);
  s += EV(695, 430, true);
  s += BOX(830, 535, 100, 70, ['Review Offer &', 'choose to accept', 'or reject offer']);
  s += XGW(952, 535);
  s += BOX(1104, 282, 120, 80, ['Notify both buyer', 'and seller of offer', 'acceptance &', 'appointment date', 'with HDB officer']);
  s += AND(1233, 282);
  s += AND(1320, 282);
  s += EV(1385, 282, true);
  s += BOX(1233, 104, 98, 64, ['Appointment', 'with HDB Officer']);
  s += BOX(1233, 540, 98, 64, ['Appointment', 'with HDB Officer']);
  // computers (systems used)
  s += PC(333, 44, 'SingPass Service', 74) + PC(333, 150, 'HDB-RP', 180);
  s += PC(733, 158, 'HDB-RP', 188);
  s += PC(733, 556, 'HDB-RP', 586);
  s += PC(124, 372, 'SingPass Service', 402) + PC(280, 372, 'STS', 402);
  // labels
  s += LBL(418 - 44, 374, 'Eligibility', 'end') + LBL(418 - 44, 387, 'status', 'end');
  s += LBL(442, 380, 'Eligible', 'start');
  s += LBL(404, 452, 'Non-eligible', 'middle', true);
  s += LBL(910, 380, 'Offer Rejected', 'end');
  s += LBL(952, 572, 'Offer Status');
  s += LBL(1030, 528, 'Offer Accepted', 'middle');
  return `<div class="t-table-wrap" tabindex="0"><svg viewBox="0 0 ${W} ${H}" width="${W}" style="min-width:1000px;max-width:100%;height:auto;color:var(--text,#222)" role="img" aria-label="TO-BE workflow model of the HDB resale process (alternative solution)" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif">${s}</svg></div>`;
}
