/** Shared helpers for the WAD2 playground: the offline Bootstrap bundle and placeholder-image substitution. */
const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const PH = (w: number, h: number, bg?: string, fg?: string, t?: string) =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#${bg || 'ccc'}"/><text x="50%" y="50%" fill="#${fg || '969696'}" font-family="sans-serif" font-size="${Math.max(10, Math.min(w, h) / 6 | 0)}" text-anchor="middle" dominant-baseline="middle">${E(t || w + '×' + h)}</text></svg>`);
export const phSub = (s: string) => s.replace(/https:\/\/placehold\.co\/(\d+)x(\d+)(?:\/(\w+)\/(\w+))?(?:\?text=([^"'\s)]+))?/g, (_m, w, h, bg, fg, t) => PH(+w, +h, bg, fg, t && decodeURIComponent(t)));

let cache: Promise<string> | null = null;
/** Loads Bootstrap 5.3 (CSS + JS, bundled with the app) once and keeps it. */
export function bundle(): Promise<string> {
  return (cache ||= Promise.all([import('./bs.css?raw'), import('./bs.js?raw')]).then(([css, js]) => '<style>' + css.default + '</style><script>' + js.default + '<\/script>'));
}
