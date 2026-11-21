import re,json,sys,os
src="C:/Users/Rui Heng/Downloads/"
for key,f in [("algo","ALGO_study_guide.html"),("bpas","BPAS_study_guide.html"),("idp","IDP_study_guide_v6.html")]:
    s=open(src+f,encoding='utf8').read()
    os.makedirs(key,exist_ok=True)
    css=re.findall(r'<style[^>]*>(.*?)</style>',s,re.S)
    scripts=[(m.group(0)[:m.group(0).index('>')+1],m.group(1)) for m in re.finditer(r'<script([^>]*)>(.*?)</script>',s,re.S) for m in [re.match(r'(<script[^>]*>)(.*)',m.group(0),re.S) and type('M',(),{'group':lambda self,i,_m=re.match(r'(<script[^>]*>)(.*)</script>',m.group(0),re.S):_m.group(i)})()]]
    for i,c in enumerate(css): open(f"{key}/style{i}.css","w",encoding='utf8').write(c)
    for i,(tag,c) in enumerate(scripts): open(f"{key}/script{i}.js","w",encoding='utf8').write(c); print(key,"script",i,tag,len(c))
    head=s[:s.index('<body')]
    open(f"{key}/head.html","w",encoding='utf8').write(re.sub(r'<style.*?</style>','<style/>',re.sub(r'<script.*?</script>','<script/>',head,flags=re.S),flags=re.S))
    body=re.search(r'<body[^>]*>(.*)</body>',s,re.S).group(1)
    body=re.sub(r'<script.*?</script>','<!--SCRIPT-->',body,flags=re.S)
    open(f"{key}/body.html","w",encoding='utf8').write(body)
    print(key,"css",[len(c) for c in css],"body",len(body))
