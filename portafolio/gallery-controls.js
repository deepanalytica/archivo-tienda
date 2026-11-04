/* Project gallery: swipeable featured work, full filterable grid on demand. */
(()=>{
 'use strict';
 const gallery=document.getElementById('project-gallery');
 const filters=[...document.querySelectorAll('.arsenal-filter')];
 const railControls=document.querySelector('.project-gallery-top');
 if(!gallery||!railControls)return;
 const prev=railControls.querySelector('.gallery-scroll-prev');
 const next=railControls.querySelector('.gallery-scroll-next');
 const hint=railControls.querySelector('span');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let raf=0;
 function scrollSize(){
   const card=gallery.querySelector('.arsenal-card:not(.filtered-out)');
   if(!card)return Math.min(320,gallery.clientWidth);
   const gap=parseFloat(getComputedStyle(gallery).columnGap)||15;
   return card.getBoundingClientRect().width+gap;
 }
 function updateArrows(){
   raf=0;
   const max=gallery.scrollWidth-gallery.clientWidth;
   const enabled=gallery.classList.contains('is-featured')&&max>2;
   prev.disabled=!enabled||gallery.scrollLeft<3;
   next.disabled=!enabled||gallery.scrollLeft>=max-3;
   railControls.classList.toggle('not-scrolling',!gallery.classList.contains('is-featured'));
 }
 function mode(tag){
   const featured=tag==='featured';
   gallery.classList.toggle('is-featured',featured);
   railControls.classList.toggle('not-scrolling',!featured);
   hint.textContent=featured?'Desliza para recorrer los destacados':'Selecciona un proyecto para conocer su proceso';
   if(featured)gallery.scrollLeft=0;
   requestAnimationFrame(updateArrows);
 }
 prev.addEventListener('click',()=>gallery.scrollBy({left:-scrollSize(),behavior:reduced?'instant':'smooth'}));
 next.addEventListener('click',()=>gallery.scrollBy({left:scrollSize(),behavior:reduced?'instant':'smooth'}));
 gallery.addEventListener('scroll',()=>{
   if(!raf)raf=requestAnimationFrame(updateArrows);
 },{passive:true});
 filters.forEach(button=>button.addEventListener('click',()=>mode(button.dataset.filter)));
 const active=filters.find(b=>b.getAttribute('aria-pressed')==='true');
 mode(active?.dataset.filter||'featured');
 window.addEventListener('resize',()=>{if(!raf)raf=requestAnimationFrame(updateArrows)},{passive:true});
 // A deep link must reveal the card even if it belongs to a hidden filter.
 const id=window.location.hash.slice(1);
 if(/^ar-[a-z0-9-]+$/.test(id)){
   const card=document.getElementById(id);
   if(card&&card.classList.contains('filtered-out')){
     filters.find(b=>b.dataset.filter==='all')?.click();
     requestAnimationFrame(()=>card.scrollIntoView({block:'start',behavior:'instant'}));
   }
 }
})();
