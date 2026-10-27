(function(){
 'use strict';
 const toggle=document.getElementById('s-menu'),nav=document.getElementById('s-navigation');
 function closeMenu(){if(!toggle||!nav)return;nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu ☰';}
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close ×':'Menu ☰';});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const had=nav.classList.contains('is-open');closeMenu();nav.querySelectorAll('details[open]').forEach(x=>x.open=false);if(had)toggle.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.s-header')){closeMenu();nav.querySelectorAll('details[open]').forEach(x=>x.open=false);}});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
 document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
 const frame=document.getElementById('s-contact-frame');
 if(frame){
  const topics={marine:'Sundance Marine Services',advisory:'Sundance Energy Advisory',infrastructure:'Sundance Energy Infrastructure',evaluator:'Project Evaluator'};
  const topic=topics[new URLSearchParams(location.search).get('business')];
  if(topic){
   const url=new URL(frame.dataset.formUrl);url.searchParams.set(frame.dataset.prefillAlias,topic==='Project Evaluator'?'Not sure yet':topic);
   if(topic==='Project Evaluator')url.searchParams.set('MultiLine','Project Evaluator inquiry');
   frame.src=url.href;
   const direct=document.getElementById('s-contact-direct');if(direct)direct.href=url.href;
   const context=document.getElementById('s-inquiry-context');if(context){context.hidden=false;context.textContent='Your inquiry: '+topic;}
  }
 }
 document.querySelectorAll('[data-gallery]').forEach(gallery=>{
  const track=gallery.querySelector('.g-track'),slides=[...gallery.querySelectorAll('.g-slide')],dots=[...gallery.querySelectorAll('.g-dot')];let index=0;
  gallery.setAttribute('role','group');gallery.setAttribute('aria-roledescription','carousel');
  const heading=gallery.closest('article')?.querySelector('h3');if(heading)gallery.setAttribute('aria-label',heading.textContent.trim()+' images');
  function show(next){index=(next+slides.length)%slides.length;track.style.transform='translateX(-'+index*100+'%)';slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.setAttribute('aria-hidden',String(i!==index));});dots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===index);dot.setAttribute('aria-pressed',String(i===index));});}
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
  gallery.querySelector('.g-prev')?.addEventListener('click',()=>show(index-1));gallery.querySelector('.g-next')?.addEventListener('click',()=>show(index+1));show(0);
 });
})();
