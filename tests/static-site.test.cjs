const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const {JSDOM}=require('jsdom');
const ROOT=path.join(__dirname,'..');const pages=fs.readdirSync(ROOT).filter(x=>x.endsWith('.html'));
test('all pages share working navigation, offices, phone links and unique metadata',()=>{
 const titles=new Set(),footers=new Set(),headers=new Set();assert.ok(pages.length>=27);
 for(const name of pages){
  const dom=new JSDOM(fs.readFileSync(path.join(ROOT,name),'utf8'),{url:'https://sundance.com.ng/'+name});const d=dom.window.document;
  try{
   assert.equal(d.querySelectorAll('main#main').length,1,name);assert.equal(d.querySelectorAll('h1').length,1,name);assert.ok(d.querySelector('a[href="#main"]'),name);assert.ok(d.querySelector('.s-topline a[href="mailto:contact@sundance.com.ng"]'),name);
   const title=d.title;assert.ok(title.length<=60,name);assert.ok(!titles.has(title),name);titles.add(title);const desc=d.querySelector('meta[name=description]').content;assert.ok(desc.length>=120&&desc.length<=155,name);assert.equal(d.querySelectorAll('link[rel=canonical]').length,1,name);
   for(const key of ['title','description','url','image'])assert.ok(d.querySelector('meta[property="og:'+key+'"]').content,name);
   const footer=d.querySelector('footer');assert.ok(footer.textContent.includes('Port Harcourt'),name);assert.ok(footer.querySelector('a[href="tel:+2349090168479"]'),name);assert.ok(footer.querySelector('a[href="tel:+2342014538414"]'),name);assert.ok(footer.querySelector('a[href="https://wa.me/2349090168479"]'),name);assert.match(footer.textContent,/Marine services, energy advisory and infrastructure project advisory across West Africa\./);
   const normalize=e=>{const c=e.cloneNode(true);c.querySelectorAll('[aria-current]').forEach(x=>x.removeAttribute('aria-current'));c.querySelectorAll('[href],[src]').forEach(x=>{for(const a of ['href','src'])if(x.getAttribute(a)?.startsWith('/'))x.setAttribute(a,x.getAttribute(a).slice(1));});return c.outerHTML;};headers.add(normalize(d.querySelector('.s-header')));footers.add(normalize(footer));
   const h=[...d.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')].map(x=>Number(x.tagName[1]));for(let i=1;i<h.length;i++)assert.ok(h[i]<=h[i-1]+1,name);
   for(const image of d.querySelectorAll('main img')){assert.ok(image.alt.trim(),name+' '+image.src);assert.ok(Number(image.width)>0&&Number(image.height)>0,name);}
   assert.equal(d.querySelectorAll('link[href*="fonts.googleapis.com"],link[href*="fonts.gstatic.com"]').length,0,name);
   assert.equal(d.querySelector('meta[name=theme-color]').content,'#0B1F35',name);
  }finally{dom.window.close();}
 }
 assert.equal(headers.size,1);assert.equal(footers.size,1);
});
test('local page links, anchors, scripts, fonts and specification PDFs resolve',()=>{
 let pdfs=new Set();
 for(const name of pages){const dom=new JSDOM(fs.readFileSync(path.join(ROOT,name),'utf8'),{url:'https://sundance.com.ng/'+name});try{const d=dom.window.document;for(const el of d.querySelectorAll('a[href],img[src],script[src],link[href]')){const v=el.getAttribute(el.hasAttribute('src')?'src':'href');const u=new URL(v,d.URL);if(u.hostname!=='sundance.com.ng')continue;const p=decodeURIComponent(u.pathname).slice(1)||'index.html';const file=path.join(ROOT,p);assert.ok(fs.existsSync(file),name+' -> '+p);if(p.endsWith('.pdf')){pdfs.add(p);assert.equal(fs.readFileSync(file).subarray(0,5).toString(),'%PDF-');}if(u.hash&&p.endsWith('.html')){const target=new JSDOM(fs.readFileSync(file,'utf8'));try{assert.ok(target.window.document.getElementById(decodeURIComponent(u.hash.slice(1))),name+' -> '+v);}finally{target.window.close();}}}}finally{dom.window.close();}}
 assert.equal(pdfs.size,18+Object.values(JSON.parse(fs.readFileSync(path.join(ROOT,'content/downloads.json'),'utf8'))).filter(x=>x.path).length);
});
test('release has no obsolete cards, internal image wording or unsupported regulatory evaluator link',()=>{
 for(const name of pages){const d=new JSDOM(fs.readFileSync(path.join(ROOT,name),'utf8'));try{const text=d.window.document.querySelector('main').textContent;assert.doesNotMatch(text,/specification in progress|image pending|supplied gallery|asset-light|turnkey|purpose-built|bankable/i,name);}finally{d.window.close();}}
 const d=new JSDOM(fs.readFileSync(path.join(ROOT,'energy-regulatory-compliance.html'),'utf8'));try{assert.equal(d.window.document.querySelectorAll('.s-crosslink a[href*="project-evaluator"]').length,0);}finally{d.window.close();}
});
