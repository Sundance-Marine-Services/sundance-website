const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const ROOT=path.join(__dirname,'..');

test('withdrawn photo is absent and the evaluator explicitly uses the approved vessel preview',()=>{
 const withdrawn='assets/img/rov-operations-offshore.jpg';
 assert.equal(fs.existsSync(path.join(ROOT,withdrawn)),false);
 for(const page of fs.readdirSync(ROOT).filter(name=>name.endsWith('.html'))){
  assert.ok(!fs.readFileSync(path.join(ROOT,page),'utf8').includes(withdrawn),page);
 }
 const dom=new JSDOM(fs.readFileSync(path.join(ROOT,'project-evaluator.html'),'utf8'));
 try{
  const d=dom.window.document;
  for(const selector of ['meta[property="og:image"]','meta[name="twitter:image"]']){
   assert.equal(d.querySelectorAll(selector).length,1);
   assert.equal(d.querySelector(selector).content,'https://sundance.com.ng/assets/img/crew-boat-dusk.jpg');
  }
  assert.equal(d.querySelector('meta[property="og:image:alt"]').content,'Crew boat underway on open water near another vessel');
  assert.equal(d.querySelector('meta[property="og:image:width"]').content,'1000');
  assert.equal(d.querySelector('meta[property="og:image:height"]').content,'750');
 }finally{dom.window.close();}
});
