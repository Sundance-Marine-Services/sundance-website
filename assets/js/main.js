(function(){
 'use strict';
 const toggle=document.getElementById('s-menu'),nav=document.getElementById('s-navigation');
 function closeMenu(){if(!toggle||!nav)return;nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu ☰';}
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close ×':'Menu ☰';});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const had=nav.classList.contains('is-open');closeMenu();nav.querySelectorAll('details[open]').forEach(x=>x.open=false);if(had)toggle.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.s-header')){closeMenu();nav.querySelectorAll('details[open]').forEach(x=>x.open=false);}});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
 document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
 const form=document.getElementById('s-enquiry');if(!form)return;
 const message=document.getElementById('s-enquiry-status');
 const preselect=new URLSearchParams(location.search).get('business');
 if(['marine','advisory','infrastructure','evaluator'].includes(preselect))form.elements.business.value=preselect;
 function details(){const f=new FormData(form);return ['Name: '+f.get('name'),'Company: '+f.get('company'),'Email: '+f.get('email'),'Phone: '+f.get('phone'),'Business: '+form.elements.business.selectedOptions[0].text,'','Scope:',f.get('scope')].join('\n');}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const subject='Website enquiry — '+form.elements.business.selectedOptions[0].text;location.href='mailto:contact@sundance.com.ng?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(details());message.textContent='Email draft requested. Review it and send from your email app. This page cannot confirm delivery. You can also copy the details below.';});
 document.getElementById('s-copy-enquiry').addEventListener('click',async()=>{if(!form.reportValidity())return;try{await navigator.clipboard.writeText(details());message.textContent='Enquiry copied. Paste it into an email to contact@sundance.com.ng.';}catch{const box=document.getElementById('s-enquiry-copy');box.hidden=false;box.value=details();box.focus();box.select();message.textContent='Select and copy these details into an email to contact@sundance.com.ng.';}});
})();
