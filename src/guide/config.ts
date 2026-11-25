/** Per-course extras that used to be hard-coded inside each guide's engine (past-exam sections, practice grouping). */
export interface Extra { secs?: Record<string, [number, number, string, string?]>; pastLabel?: string; pastNote?: string; pqg?: [string, number[]][]; singleQ?: boolean }

export const EXTRA: Record<string, Extra> = {
  idp: {
    secs: { A: [1, 20, 'Section A · Q1–20 (multiple select)'], B: [21, 40, 'Section B · Q21–40 (multiple select)'], C: [41, 60, 'Section C · Q41–60 (multiple select)'], D: [61, 70, 'Section D · Q61–70 (written, 15 pts each)'], E: [71, 73, 'Section E · Q71–73 (long written, 50 pts each)'] },
    pastLabel: 'Important:',
    pastNote: 'these are the questions you transcribed (73 in total). Your file has <b>no answer key</b>, so the answers and model answers below are <b>my own, worked out from the course notes</b>. Use them as a study aid; if your lecturer or a marked paper disagrees, trust that. Where I am less sure, the explanation says so. Multiple-select questions need <b>all</b> the right options and none of the wrong ones.',
    pqg: [['Section A · Introduction to prototypes', [1, 2, 3, 4, 5]], ['Section B · Models, cognition, input and interface design', [6, 7, 8, 9, 10, 11, 16]], ['Section C · Evaluation methods, experiments and analysis', [12, 13, 14, 15, 17, 18, 19]], ['Presenting, review and AI', [20, 21, 22, 23]]],
  },

};
