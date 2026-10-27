const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const ROOT=path.join(__dirname,'..');
function setup(page='project-evaluator.html',query=''){
 const dom=new JSDOM(fs.readFileSync(path.join(ROOT,page),'utf8'),{url:'https://sundance.com.ng/'+page+query,runScripts:'outside-only'});
 const w=dom.window;w.confirm=()=>true;w.URL.createObjectURL=blob=>{w.savedBlob=blob;return 'blob:fictional-assessment';};w.URL.revokeObjectURL=()=>{};w.Blob=Blob;w.HTMLAnchorElement.prototype.click=function(){w.savedFilename=this.download;};
 for(const file of page==='project-evaluator.html'?['assets/js/main.js','assets/js/evaluator-model.js','assets/js/evaluator.js']:['assets/js/main.js'])w.eval(fs.readFileSync(path.join(ROOT,file),'utf8'));
 return {dom,w,d:w.document,close:()=>w.close()};
}
function change(w,el,value){el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));}
async function imported(w,d,content,size){const input=d.getElementById('ev-import');Object.defineProperty(input,'files',{configurable:true,value:[{size:size??Buffer.byteLength(content),text:async()=>content}]});input.dispatchEvent(new w.Event('change',{bubbles:true}));await new Promise(setImmediate);}
test('evaluator supports roving tab focus, arrow keys, Home and End',()=>{
 const {w,d,close}=setup();try{const tabs=[...d.querySelectorAll('[role=tab]')];assert.equal(tabs.filter(t=>t.tabIndex===0).length,1);tabs[0].focus();tabs[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(d.activeElement.id,'ev-tab-requirements');assert.equal(d.getElementById('ev-panel').getAttribute('aria-labelledby'),'ev-tab-requirements');d.activeElement.dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(d.activeElement.id,'ev-tab-results');assert.match(d.getElementById('evaluator-status').textContent,/Evaluation updated/);d.activeElement.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert.equal(d.activeElement.id,'ev-tab-context');}finally{close();}
});
test('candidate input change updates mandatory failures and displayed entered costs',()=>{
 const {w,d,close}=setup();try{d.getElementById('ev-example').click();assert.match(d.getElementById('ev-panel').textContent,/634,000/);d.getElementById('ev-tab-candidates').click();change(w,d.querySelector('[data-cap="rovDepth"][data-key="value"]'),'100');d.getElementById('ev-tab-results').click();const text=d.getElementById('ev-panel').textContent;assert.match(text,/Does not meet/);assert.match(text,/83%/);assert.match(text,/634,000/);assert.equal(d.querySelector('.ev-table-wrap').tabIndex,0);}finally{close();}
});
test('saved project content reopens through the application import handler',async()=>{
 const {w,d,close}=setup();try{d.getElementById('ev-example').click();d.getElementById('ev-save').click();const saved=await w.savedBlob.text();const state=JSON.parse(saved);assert.equal(state.candidates.length,2);assert.match(w.savedFilename,/\.json$/);d.getElementById('ev-new').click();assert.equal(d.querySelector('[data-project=name]').value,'');await imported(w,d,saved);assert.equal(d.querySelector('[data-project=name]').value,state.project.name);assert.match(d.getElementById('evaluator-status').textContent,/Project imported/);d.getElementById('ev-tab-results').click();assert.match(d.getElementById('ev-panel').textContent,/634,000/);assert.match(d.getElementById('ev-panel').textContent,/559,000/);}finally{close();}
});
test('malformed and oversized imports announce errors without replacing the assessment',async()=>{
 const {w,d,close}=setup();try{change(w,d.querySelector('[data-project=name]'),'Fictional retained assessment');await imported(w,d,'{invalid');assert.equal(d.querySelector('[data-project=name]').value,'Fictional retained assessment');assert.equal(d.getElementById('evaluator-status').getAttribute('role'),'alert');await imported(w,d,'{}',1024*1024+1);assert.match(d.getElementById('evaluator-status').textContent,/smaller than 1 MB/);}finally{close();}
});
test('imported labels render as text and the evaluator has no email gate',async()=>{
 const {w,d,close}=setup();try{const state=w.SundanceEvaluator.example();state.project.name='<img src=x onerror=alert(1)>';await imported(w,d,JSON.stringify(state));d.getElementById('ev-tab-results').click();assert.match(d.getElementById('ev-panel').textContent,/<img src=x/);assert.equal(d.querySelectorAll('#evaluator-app img').length,0);assert.equal(d.querySelectorAll('#evaluator-app input[type=email]').length,0);assert.equal(d.querySelectorAll('#evaluator-app form[action]').length,0);}finally{close();}
});
test('contact links preserve each requested business context in the supplied Zoho form',()=>{
 for(const [key,label] of Object.entries({marine:'Sundance Marine Services',advisory:'Sundance Energy Advisory',infrastructure:'Sundance Energy Infrastructure',evaluator:'Project Evaluator'})){
  const {d,close}=setup('contact.html','?business='+key);try{const url=new URL(d.getElementById('s-contact-frame').src);assert.equal(url.hostname,'forms.zohopublic.com');assert.equal(url.searchParams.get('Dropdown1'),key==='evaluator'?'Not sure yet':label);assert.match(d.getElementById('s-inquiry-context').textContent,new RegExp(label));assert.equal(d.querySelectorAll('#s-enquiry').length,0);if(key==='evaluator')assert.equal(url.searchParams.get('MultiLine'),'Project Evaluator inquiry');}finally{close();}
 }
});
test('gallery controls expose one current image and update pressed indicators',()=>{
 const {d,close}=setup('fleet.html');try{const gallery=[...d.querySelectorAll('[data-gallery]')].find(g=>g.querySelectorAll('.g-slide').length>1);assert.equal(gallery.querySelectorAll('.g-slide[aria-hidden=false]').length,1);gallery.querySelector('.g-next').click();assert.equal(gallery.querySelectorAll('.g-slide[aria-hidden=false]').length,1);assert.equal(gallery.querySelectorAll('.g-dot[aria-pressed=true]').length,1);assert.equal(gallery.querySelector('.g-dot[aria-pressed=true]').getAttribute('data-idx'),'1');}finally{close();}
});
test('Escape closes mobile navigation and returns focus to its trigger',()=>{
 const {w,d,close}=setup('about.html');try{const button=d.getElementById('s-menu');button.click();assert.equal(button.getAttribute('aria-expanded'),'true');d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(button.getAttribute('aria-expanded'),'false');assert.equal(d.activeElement,button);}finally{close();}
});
