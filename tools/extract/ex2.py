import re
src="C:/Users/Rui Heng/Downloads/"
for key,f in [("algo","ALGO_study_guide.html"),("bpas","BPAS_study_guide.html"),("idp","IDP_study_guide_v6.html")]:
    s=open(src+f,encoding='utf8').read()
    for i,m in enumerate(re.finditer(r'<script[^>]*>(.*?)</script>',s,re.S)):
        open(f"{key}/script{i}.js","w",encoding='utf8').write(m.group(1)); print(key,i,len(m.group(1)))
