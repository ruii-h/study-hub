/** Central animation presets for the whole guide app: import these instead of writing inline motion props. */
export const ease = [0.4, 0.2, 0.2, 1] as const;
export const fade = { initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.22 } };
export const rise = (i = 0) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25, delay: Math.min(i, 6) * 0.03 } });
export const pop = { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 } };
export const slideX = { initial: { opacity: 0, x: 8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0 }, transition: { duration: 0.18 } };
export const riseSwap = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.2 } };
export const tabSwap = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.2, ease: 'easeOut' as const } };
export const floatUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 16 }, transition: { duration: 0.2 } };
export const chapterSlide = (dir: number) => ({ initial: { opacity: 0, x: dir * 28, y: dir ? 0 : 14 }, animate: { opacity: 1, x: 0, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' as const } });
export const flipTiming = { close: 0.18, open: 0.22, lesson: 0.55 };
