declare module '*.html?raw' { const s: string; export default s; }
declare module '*.css?inline' { const s: string; export default s; }
declare module '*/engine.js' { const mount: (D: unknown, api: unknown) => () => void; export default mount; }
