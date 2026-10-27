from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import re,sys
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.ids=[];self.main=0;self.h1=0;self.canonical=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  self.main+=tag=='main';self.h1+=tag=='h1';self.canonical+=tag=='link' and a.get('rel')=='canonical'
  if tag in ['a','link','script','img']:
   value=a.get('src')or a.get('href')
   if value:self.refs.append(value)
errors=[];total=0
for p in sorted(ROOT.glob('*.html')):
 page=Page();text=p.read_text();page.feed(text);total+=1
 if page.main!=1:errors.append(f'{p.name}: expected one main, got {page.main}')
 if page.h1!=1:errors.append(f'{p.name}: expected one h1, got {page.h1}')
 if p.name!='404.html' and page.canonical!=1:errors.append(f'{p.name}: canonical missing or duplicated')
 if len(page.ids)!=len(set(page.ids)):errors.append(f'{p.name}: duplicate IDs')
 if '[[date]]' in text:errors.append(f'{p.name}: date placeholder')
 if 'sundance-energy-infrastructure.html' not in text or 'project-evaluator.html' not in text:errors.append(f'{p.name}: missing business/evaluator navigation')
 for ref in page.refs:
  u=urlparse(ref)
  if u.scheme or ref.startswith('//'):continue
  target=ROOT/(unquote(u.path).lstrip('/') or 'index.html') if u.path else p
  if u.path and not target.is_file():errors.append(f'{p.name}: missing {ref}')
  if u.fragment and target.suffix=='.html' and target.is_file():
   other=Page();other.feed(target.read_text())
   if u.fragment not in other.ids:errors.append(f'{p.name}: missing anchor {ref}')
for p in (ROOT/'assets/css').glob('*.css'):
 for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)',p.read_text()):
  if not urlparse(ref).scheme and not (p.parent/ref).is_file():errors.append(f'{p.name}: missing CSS asset {ref}')
if errors:print('\n'.join(errors));sys.exit(1)
print(f'PASS: {total} pages, local links/assets/anchors, navigation, main landmarks, headings, IDs, metadata and date placeholders.')
