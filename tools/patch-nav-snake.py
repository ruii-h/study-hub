# One-off: stable side nav (in-place update), snake layout for simple chains, sturdier mermaid, bigger gap when jumping to a section.
import re, glob
snip = open('tools/snake.js', encoding='utf8').read()
for p in glob.glob('src/courses/*/engine.js'):
    s = open(p, encoding='utf8').read()
    n = 0
    s, k = re.subn(r"function mm\(\)\{[^\n]*\n try\{mermaid\.initialize[^\n]*\n", lambda m: snip, s, count=1); n += k
    s, k = re.subn(r"\$\('#nav'\)\.innerHTML=theory;\$\('#mnav'\)\.innerHTML=m;", "morph($('#nav'),theory);morph($('#mnav'),m);", s); n += k
    s, k = re.subn(r"\{const _p=\$\('#pql'\),_s=_p\.scrollTop;_p\.innerHTML=h;_p\.scrollTo\(\{top:_s,behavior:'instant'\}\)\}", "morph($('#pql'),h);", s); n += k
    s, k = re.subn(r"offsetHeight\+8\)", "offsetHeight+32)", s); n += k
    open(p, 'w', encoding='utf8').write(s)
    print(p, n)
m = open('src/course/motion.ts', encoding='utf8').read()
a = m.index("    const bp =")
b = m.index("  };\n  document.addEventListener")
open('src/course/motion.ts', 'w', encoding='utf8').write(m[:a] + m[b:])
