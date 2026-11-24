import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CourseMeta } from '../courses/registry';
import { makeWiki } from './wiki';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TabDef = { key: string; ico: string; label: string; x: string; ns?: number[]; groups?: { t: string; ns: number[]; tag: string }[]; kind?: string };
export type Lesson = { n: number; dn?: number; title: string; tag: string; icon: string; goal: string; html: string };
export interface Data {
  lessons: Lesson[]; groups: { t: string; ns: number[]; tag: string }[]; cards: { t: string; d: string; f: string }[];
  quiz: Record<string, any[]>; hard: Record<string, any[]>; fill?: Record<string, any[]>; exam: { mcq: any[]; wr: any[] };
  selfq?: string; selfn?: number; ice?: string; pqg?: [string, number[]][]; secs?: Record<string, [number, number, string, string?]>;
  pastNote?: string; cmock?: any[]; pastSingle?: boolean; tabs?: TabDef[]; play?: any[];
}
export type Back = { tab: string; sel: string | number; y: number; label: string; up: Back | null; sec?: string; q?: number } | null;
type Json = Record<string, any>;

const read = (k: string, d: any) => { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? d; } catch { return d; } };

export interface Ctx {
  D: Data; meta: CourseMeta; wiki: ReturnType<typeof makeWiki>; api?: Record<string, any>;
  S: Json; V: Json; K: Json; P: Json; ST: Json; M: Json; QP: Json; PS: Json; PW: Json;
  patch: (name: 'S' | 'V' | 'K' | 'P' | 'ST' | 'M' | 'QP' | 'PS' | 'PW', fn: (o: Json) => Json) => void;
  resetAll: () => void;
  tab: string; setTab: (t: string) => void; tabOf: (n: number) => string; cur: number; back: Back; setBack: (b: Back) => void;
  openChapter: (n: number, o?: { back?: Back; sec?: string; y?: number }) => void;
  pendingScroll: React.MutableRefObject<{ sec?: string; y?: number } | null>;
  pqSel: string | number; setPqSel: (s: string | number) => void; pqMode: string; setPqMode: (m: string) => void;
  pastSec: string; setPastSec: (s: string) => void; cch: number; setCch: (n: number) => void;
  goQuiz: (n: number, mode?: string) => void; goBack: () => void; navOpen: boolean; setNavOpen: (b: boolean) => void;
}
const C = createContext<Ctx>(null as unknown as Ctx);
export const useG = () => useContext(C);

export function GuideProvider({ meta, D, api, children }: { meta: CourseMeta; D: Data; api?: Record<string, any>; children: ReactNode }) {
  const KEY = meta.storageKey;
  const names = ['scores', 'visited', 'known', 'past', 'settings', 'mistakes', 'qstate', 'pastsel', 'pastwrite'] as const;
  const map = { S: 'scores', V: 'visited', K: 'known', P: 'past', ST: 'settings', M: 'mistakes', QP: 'qstate', PS: 'pastsel', PW: 'pastwrite' } as const;
  const [st, setSt] = useState<Record<string, Json>>(() => Object.fromEntries(Object.entries(map).map(([k, n]) => [k, read(KEY + n, {})])));
  const stRef = useRef(st); stRef.current = st;
  const timer = useRef<number>(0);
  const persist = useCallback((next: Record<string, Json>) => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { try { Object.entries(map).forEach(([k, n]) => localStorage.setItem(KEY + n, JSON.stringify(next[k]))); } catch { /* ignore */ } }, 150);
  }, [KEY]); // eslint-disable-line
  const patch = useCallback((name: keyof typeof map, fn: (o: Json) => Json) => {
    setSt((s) => { const next = { ...s, [name]: fn(s[name]) }; stRef.current = next; persist(next); return next; });
  }, [persist]);
  useEffect(() => () => { clearTimeout(timer.current); try { Object.entries(map).forEach(([k, n]) => localStorage.setItem(KEY + n, JSON.stringify(stRef.current[k]))); } catch { /* ignore */ } }, [KEY]); // eslint-disable-line
  void names;

  const ST = st.ST;
  const first = D.lessons.find((l) => l.n === ST.last) ? (ST.last as number) : D.lessons[0].n;
  const tabOf = useCallback((n: number) => D.tabs?.find((t) => t.ns?.includes(n))?.key ?? 'theory', [D]);
  const [cur, setCur] = useState(first);
  const [tab, setTabRaw] = useState<string>(() => { const t = ST.tab && ST.tab !== 'exam' ? ST.tab : 'theory'; return D.tabs?.length && (t === 'theory' || D.tabs.some((x) => x.key === t && x.ns)) ? tabOf(first) : t; });
  const [back, setBack] = useState<Back>(null);
  const [pqSel, setPqSelRaw] = useState<string | number>(ST.pq !== undefined && (ST.pq === 'mx' || ST.pq === 'sc' || D.lessons.find((l) => l.n === ST.pq)) ? ST.pq : D.lessons[0].n);
  const [pqMode, setPqMode] = useState<string>(ST.pqm === 'warm' ? 'warm' : 'hard');
  const [pastSec, setPastSecRaw] = useState<string>(ST.psec && D.secs?.[ST.psec] ? ST.psec : Object.keys(D.secs || {})[0] || '');
  const [cch, setCchRaw] = useState<number>(ST.cch || 0);
  const [navOpen, setNavOpen] = useState(false);
  const pendingScroll = useRef<{ sec?: string; y?: number } | null>(null);
  const wiki = useMemo(() => makeWiki(D), [D]);

  const setTab = useCallback((t: string) => {
    setTabRaw(t); setNavOpen(false);
    let n: number | null = null;
    if (D.tabs?.length && t !== 'play' && (t === 'theory' || D.tabs.some((x) => x.key === t && x.ns)) && tabOf(cur) !== t) {
      const sc = D.tabs.find((x) => x.key === t);
      n = (stRef.current.ST['last_' + t] as number) || (sc?.ns ? sc.ns[0] : D.lessons.find((l) => tabOf(l.n) === 'theory')!.n);
      setCur(n);
    }
    patch('ST', (o) => ({ ...o, tab: t, ...(n !== null ? { last: n, ['last_' + t]: n } : {}) }));
    if (n !== null) patch('V', (v) => ({ ...v, [n as number]: 1 }));
  }, [patch, D, cur, tabOf]);
  const openChapter = useCallback((n: number, o?: { back?: Back; sec?: string; y?: number }) => {
    pendingScroll.current = o && (o.sec || o.y) ? { sec: o.sec, y: o.y } : null;
    const t = tabOf(n);
    setCur(n); setBack(o?.back ?? null); setTabRaw(t); setNavOpen(false);
    patch('V', (v) => ({ ...v, [n]: 1 })); patch('ST', (s) => ({ ...s, last: n, tab: t, ['last_' + t]: n }));
  }, [patch, tabOf]);
  const setPqSel = useCallback((s: string | number) => { setPqSelRaw(s); patch('ST', (o) => ({ ...o, pq: s })); setNavOpen(false); }, [patch]);
  const setPastSec = useCallback((s: string) => { setPastSecRaw(s); patch('ST', (o) => ({ ...o, psec: s })); setNavOpen(false); }, [patch]);
  const setCch = useCallback((n: number) => { setCchRaw(n); patch('ST', (o) => ({ ...o, cch: n })); setNavOpen(false); }, [patch]);
  const goQuiz = useCallback((n: number, mode = 'hard') => { setPqMode(mode); setPqSelRaw(n); setTabRaw('practice'); setNavOpen(false); }, []);
  const goBack = useCallback(() => {
    const b = back; if (!b) return;
    if (b.tab === 'cheat' || b.tab === 'cards') { setBack(null); setTab(b.tab); return; }
    if (b.tab === 'theory') { if (+b.sel === cur) { setBack(b.up); pendingScroll.current = { y: b.y }; setCur((c) => c); document.getElementById('theory-content')?.scrollTo({ top: b.y, behavior: 'smooth' }); } else openChapter(+b.sel, { back: b.up ?? undefined, y: b.y }); return; }
    setBack(null);
    if (b.tab === 'practice') { setPqSelRaw(b.sel === 'mx' ? 'mx' : b.sel); setTabRaw('practice'); }
    else if (b.tab === 'past') { if (b.sec) setPastSecRaw(b.sec); setTabRaw('past'); setTimeout(() => document.getElementById('pq' + b.q)?.scrollIntoView({ block: 'start' }), 80); }
  }, [back, cur, openChapter, setTab]);
  const resetAll = useCallback(() => {
    setSt((s) => { const next = { S: {}, V: {}, K: {}, P: {}, M: {}, QP: {}, PS: {}, PW: {}, ST: { theme: s.ST.theme, fs: s.ST.fs } }; stRef.current = next; persist(next); return next; });
  }, [persist]);

  const value: Ctx = { D, meta, wiki, api, ...(st as any), patch, resetAll, tab, setTab, tabOf, cur, back, setBack, openChapter, pendingScroll, pqSel, setPqSel, pqMode, setPqMode, pastSec, setPastSec, cch, setCch, goQuiz, goBack, navOpen, setNavOpen };
  return <C.Provider value={value}>{children}</C.Provider>;
}

export const shuffle = <T,>(a: T[]): T[] => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const scoreClass = (s: { s: number; t: number }) => (s.s / s.t >= 0.8 ? 'ok' : s.s / s.t >= 0.5 ? 'mid' : 'lo');
export const cardChap = (c: { f: string }) => { const m = /(\d+)\./.exec(c.f); return m ? +m[1] : 0; };
export const html = (h: string) => ({ __html: h });
