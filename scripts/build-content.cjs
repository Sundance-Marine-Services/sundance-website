'use strict';
// Build-time only: the public site remains plain HTML/CSS/JS.
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const ORIGIN='https://sundance.com.ng';
const COMPANY='Sundance Technologies West Africa Limited';
const CATEGORIES=['Marine Operations','Ports & Cargo','Energy Advisory','Energy Infrastructure'];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function requiredString(value,label,max=10000){if(typeof value!=='string'||!value.trim()||value.length>max)throw Error('Invalid '+label);return value;}
function normalizePosts(input,today=new Date().toISOString().slice(0,10)){
 if(!Array.isArray(input))throw Error('Insights must be an array');
 const seen=new Set();return input.filter(p=>p.published===true).map(p=>{
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||p.slug.length>80||seen.has(p.slug))throw Error('Invalid or duplicate article slug');seen.add(p.slug);
  requiredString(p.title,'article title',48);requiredString(p.description,'description',155);if(p.description.length<120)throw Error('Description must be 120–155 characters');
  requiredString(p.excerpt,'excerpt',500);requiredString(p.author,'byline',120);
  if(!CATEGORIES.includes(p.category))throw Error('Unknown article category');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||Number.isNaN(Date.parse(p.date))||new Date(p.date).toISOString().slice(0,10)!==p.date)throw Error('Invalid publication date');
  if(!Array.isArray(p.blocks)||!p.blocks.length)throw Error('Article body is empty');
  for(const b of p.blocks){if(['paragraph','heading'].includes(b.type))requiredString(b.text,'article block');else if(b.type==='list'&&Array.isArray(b.items)&&b.items.length)b.items.forEach(x=>requiredString(x,'list item'));else throw Error('Unsupported article block');}
  if(p.references!==undefined&&!Array.isArray(p.references))throw Error('References must be an array');
  for(const r of p.references||[]){requiredString(r.label,'reference label',200);if(!/^https:\/\//.test(r.url))throw Error('References must use HTTPS');const url=new URL(r.url);if(url.username||url.password)throw Error('Reference URL cannot contain credentials');}
  return p;
 }).filter(p=>p.date<=today).sort((a,b)=>b.date.localeCompare(a.date)||a.slug.localeCompare(b.slug));
}
const downloadDefinitions={
 'corporate-profile':{page:'about.html',kicker:'Company profile',title:'Get to know Sundance.',description:'Our corporate profile brings together the company overview, business lines and capabilities.',label:'corporate profile'},
 'infrastructure-profile':{page:'sundance-energy-infrastructure.html',kicker:'Energy Infrastructure profile',title:'Explore our project advisory scope.',description:'Project advisory for shallow-water oil-and-gas field development, from the project basis to delivery readiness.',label:'Energy Infrastructure profile'}
};
function downloadSection(id,record,root=ROOT){
 const d=downloadDefinitions[id];if(!d)throw Error('Unknown download section');
 let controls='<p class="s-download-status">The PDF will be available to download here once published.</p>';
 if(record?.path!==null&&record?.path!==undefined){
  const file=record.path;
  if(typeof file!=='string'||!/^assets\/downloads\/[a-z0-9]+(?:-[a-z0-9]+)*\.pdf$/.test(file))throw Error('Download path must be a public PDF in assets/downloads');
  const bytes=fs.readFileSync(path.join(root,file));if(bytes.subarray(0,5).toString()!=='%PDF-')throw Error('Not a PDF: '+file);
  const size=bytes.length<1024*1024?Math.max(1,Math.round(bytes.length/1024))+' KB':(bytes.length/1024/1024).toFixed(1)+' MB';
  controls=`<p class="s-download-status">PDF · ${size}</p><div class="s-download-actions"><a class="s-button" href="${file}" download>Download ${d.label} (PDF)</a><a class="s-link" href="${file}" target="_blank" rel="noopener">View ${d.label} (PDF, opens in a new tab) →</a></div>`;
 }
 return `<!-- download:${id}:start -->\n<section class="s-section" id="${id}"><div class="s-wrap"><div class="s-download-card"><p class="s-kicker">${d.kicker}</p><h2>${d.title}</h2><p>${d.description}</p>${controls}</div></div></section>\n<!-- download:${id}:end -->`;
}
function bodyHtml(p){return p.blocks.map(b=>b.type==='heading'?`<h2>${escapeHtml(b.text)}</h2>`:b.type==='list'?`<ul>${b.items.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:`<p>${escapeHtml(b.text)}</p>`).join('\n')+(p.references?.length?`<section aria-labelledby="article-references"><h2 id="article-references">Sources &amp; further reading</h2><ul>${p.references.map(r=>`<li><a href="${escapeHtml(r.url)}">${escapeHtml(r.label)}</a></li>`).join('')}</ul></section>`:'');}
function dateLabel(s){return new Intl.DateTimeFormat('en-US',{timeZone:'UTC',year:'numeric',month:'long',day:'numeric'}).format(new Date(s+'T12:00:00Z'));}
function chrome(base,meta,main,schema){
 const header=base.match(/<body>([\s\S]*?)<main\b/)[1].replaceAll(' aria-current="page"','').replace('<a href="blog.html">Blog</a>','<a href="blog.html" aria-current="page">Blog</a>');
 const footer=base.slice(base.lastIndexOf('</main>')+7).replace(/<\/body>[\s\S]*/,'');
 const url=ORIGIN+'/'+meta.file,title=escapeHtml(meta.title),description=escapeHtml(meta.description);
 const json=schema?`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`:'';
 return `<!DOCTYPE html>\n<html lang="en-US"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${url}"><link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png"><link rel="apple-touch-icon" href="assets/img/favicon-180.png"><link rel="preload" href="assets/fonts/inter-latin-400.woff2" type="font/woff2" crossorigin="anonymous" as="font"><link rel="preload" href="assets/fonts/fraunces-latin-400.woff2" type="font/woff2" crossorigin="anonymous" as="font"><link rel="stylesheet" href="assets/fonts/fonts.css"><link rel="stylesheet" href="assets/css/main.css"><link rel="stylesheet" href="assets/css/rebuild.css"><link rel="stylesheet" href="assets/css/corrections.css"><link rel="alternate" type="application/rss+xml" title="Sundance Blog &amp; Insights" href="feed.xml"><meta property="og:type" content="${schema?'article':'website'}"><meta property="og:site_name" content="${COMPANY} (RC 1497579)"><meta property="og:locale" content="en_US"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ORIGIN}/assets/img/port-aerial-view.jpg"><meta property="og:image:alt" content="Aerial view of a port and its marine facilities"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${ORIGIN}/assets/img/port-aerial-view.jpg"><meta name="theme-color" content="#0B1F35">${json}</head>\n<body>${header}<main id="main">${main}</main>${footer}</body></html>\n`;
}
function blogMain(posts){
 const cards=posts.map(p=>`<article class="s-insight-card"><p class="s-kicker">${escapeHtml(p.category)}</p><h3><a href="insight-${p.slug}.html">${escapeHtml(p.title)}</a></h3><p class="s-article-meta"><time datetime="${p.date}">${dateLabel(p.date)}</time> · ${escapeHtml(p.author)}</p><p>${escapeHtml(p.excerpt)}</p><a class="s-link" href="insight-${p.slug}.html">Read ${escapeHtml(p.title)} →</a></article>`).join('\n');
 return `<section class="s-page-intro"><div class="s-wrap"><p class="s-kicker">Sundance Blog &amp; Insights</p><h1>Practical perspectives.<br>Clearer project decisions.</h1><p>Insights across marine operations, ports and cargo, energy advisory and field development.</p></div></section><section class="s-section"><div class="s-wrap s-blog-layout"><div><h2>Latest insights</h2>${cards||'<div class="s-blog-empty"><h3>Our first articles are in preparation.</h3><p>Future posts will explore the practical questions behind marine and energy project decisions. There are no articles published yet.</p><a class="s-link" href="project-evaluator.html">Explore the Project Evaluator →</a></div>'}</div><aside aria-labelledby="blog-topics"><div class="s-panel"><h2 id="blog-topics">Areas of focus</h2><ul class="s-blog-topics">${CATEGORIES.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul><p>Have a project question you would like us to explore?</p><a class="s-link" href="contact.html">Contact Sundance →</a></div><p><a class="s-link" href="feed.xml">Follow the RSS feed →</a></p></aside></div></section>`;
}
function feedXml(posts){return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Sundance Blog &amp; Insights</title><link>${ORIGIN}/blog.html</link><description>Marine operations, ports and cargo, energy advisory and field development insights.</description><language>en-us</language><atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>${posts.map(p=>`<item><title>${escapeHtml(p.title)}</title><link>${ORIGIN}/insight-${p.slug}.html</link><guid isPermaLink="true">${ORIGIN}/insight-${p.slug}.html</guid><description>${escapeHtml(p.excerpt)}</description><category>${escapeHtml(p.category)}</category><pubDate>${new Date(p.date+'T12:00:00Z').toUTCString()}</pubDate></item>`).join('')}</channel></rss>\n`;}
function build(root=ROOT,today){
 const posts=normalizePosts(JSON.parse(fs.readFileSync(path.join(root,'content/insights.json'),'utf8')),today);
 const downloads=JSON.parse(fs.readFileSync(path.join(root,'content/downloads.json'),'utf8'));
 // Validate all inputs before writing any generated page.
 const sections=Object.entries(downloadDefinitions).map(([id,d])=>({id,...d,html:downloadSection(id,downloads[id],root)}));
 const outputs=new Map();
 for(const section of sections){const old=fs.readFileSync(path.join(root,section.page),'utf8');const pattern=new RegExp('<!-- download:'+section.id+':start -->[\\s\\S]*?<!-- download:'+section.id+':end -->');if(!pattern.test(old))throw Error('Missing download marker '+section.id);outputs.set(section.page,old.replace(pattern,section.html));}
 const base=outputs.get('about.html');
 outputs.set('blog.html',chrome(base,{file:'blog.html',title:'Blog & Insights | Sundance Marine & Energy',description:'Practical perspectives on marine operations, ports and cargo, energy advisory and shallow-water field development from Sundance in West Africa.'},blogMain(posts)));
 for(const p of posts){const file='insight-'+p.slug+'.html';const schema={'@context':'https://schema.org','@type':'Article',headline:p.title,description:p.description,datePublished:p.date,author:{'@type':'Person',name:p.author},publisher:{'@type':'Organization',name:COMPANY,identifier:'RC 1497579',url:ORIGIN+'/'},mainEntityOfPage:ORIGIN+'/'+file};
  const main=`<section class="s-page-intro"><div class="s-wrap"><p class="s-kicker">${escapeHtml(p.category)}</p><h1>${escapeHtml(p.title)}</h1><p class="s-article-meta"><time datetime="${p.date}">${dateLabel(p.date)}</time> · ${escapeHtml(p.author)}</p></div></section><section class="s-section"><div class="s-wrap"><article class="s-article" aria-label="${escapeHtml(p.title)}">${bodyHtml(p)}<p><a class="s-link" href="blog.html">← All insights</a></p></article></div></section>`;
  outputs.set(file,chrome(base,{file,title:p.title+' | Sundance',description:p.description},main,schema));
 }
 const activeFiles=new Set(posts.map(p=>'insight-'+p.slug+'.html'));
 const stale=fs.readdirSync(root).filter(x=>/^insight-.*\.html$/.test(x)&&!activeFiles.has(x));if(stale.length)throw Error('Retired article output needs explicit review/removal before release: '+stale.join(', '));
 outputs.set('feed.xml',feedXml(posts));
 const htmlFiles=[...new Set([...fs.readdirSync(root).filter(x=>x.endsWith('.html')&&x!=='404.html'),...outputs.keys()].filter(x=>x.endsWith('.html')))].sort();
 outputs.set('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+htmlFiles.map(x=>`  <url><loc>${ORIGIN}/${x==='index.html'?'':x}</loc></url>`).join('\n')+'\n</urlset>\n');
 for(const [file,html]of outputs)fs.writeFileSync(path.join(root,file),html);
 return {articles:posts.length,downloads:sections.filter(x=>downloads[x.id]?.path).length,generated:[...outputs.keys()]};
}
module.exports={build,normalizePosts,downloadSection,bodyHtml,feedXml,chrome};
if(require.main===module)console.log(JSON.stringify(build(),null,2));
