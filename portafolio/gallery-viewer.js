/* Full-image gallery viewer: progressive enhancement for original portfolio assets. */
(()=>{
  "use strict";
  const galleries=[...document.querySelectorAll(".case-gallery")];
  if(!galleries.length)return;

  const dialog=document.createElement("dialog");
  dialog.className="portfolio-lightbox";
  dialog.setAttribute("aria-label","Visor de piezas gráficas y capturas originales");
  dialog.innerHTML=
    '<div class="lightbox-shell">'+
      '<div class="lightbox-topbar">'+
        '<div class="lightbox-context"><span class="lightbox-eyebrow">PORTAFOLIO / VISTA COMPLETA</span><strong class="lightbox-title"></strong></div>'+
        '<div class="lightbox-top-actions"><a class="lightbox-source" href="#" target="_blank" rel="noopener noreferrer">Abrir origen ↗</a><button class="lightbox-close" type="button" aria-label="Cerrar imagen ampliada">Cerrar ✕</button></div>'+
      '</div>'+
      '<div class="lightbox-image-stage"><button class="lightbox-prev" type="button" aria-label="Imagen anterior">←</button><img class="lightbox-image" alt="" decoding="async"><button class="lightbox-next" type="button" aria-label="Imagen siguiente">→</button><p class="lightbox-fallback" hidden>Esta imagen no pudo cargarse. Puedes abrir su sitio de origen.</p></div>'+
      '<div class="lightbox-bottom"><p class="lightbox-subtitle"></p><span class="lightbox-position" aria-live="polite"></span></div>'+
    '</div>';
  document.body.append(dialog);

  const title=dialog.querySelector(".lightbox-title");
  const image=dialog.querySelector(".lightbox-image");
  const subtitle=dialog.querySelector(".lightbox-subtitle");
  const source=dialog.querySelector(".lightbox-source");
  const fallback=dialog.querySelector(".lightbox-fallback");
  const position=dialog.querySelector(".lightbox-position");
  const previous=dialog.querySelector(".lightbox-prev");
  const next=dialog.querySelector(".lightbox-next");
  let currentGallery=null;
  let currentIndex=0;
  let opener=null;
  let priorOverflow="";

  function entries(gallery){return [...gallery.querySelectorAll(".slide")];}

  function display(index){
    if(!currentGallery)return;
    const slides=entries(currentGallery);
    currentIndex=Math.max(0,Math.min(slides.length-1,index));
    const slide=slides[currentIndex];
    const original=slide.querySelector(".slide-visual img");
    const caption=slide.querySelector(".slide-caption");
    const anchor=slide.querySelector(".visual-link");
    const caseTitle=slide.closest(".case-card")?.querySelector(".case-copy h3")?.textContent?.replace(/\.$/,"")||"Proyecto";
    const slideTitle=caption?.querySelector("strong")?.textContent||original.alt||"Pieza original";

    title.textContent=caseTitle+" · "+slideTitle;
    subtitle.textContent=caption?.querySelector("span")?.textContent||"Imagen original del proyecto";
    image.alt=original.alt||slideTitle;
    fallback.hidden=true;
    image.hidden=false;
    image.src=original.getAttribute("src");
    const href=anchor?.getAttribute("href");
    source.hidden=!href;
    if(href)source.href=href;
    position.textContent=String(currentIndex+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
    previous.disabled=currentIndex===0;
    next.disabled=currentIndex===slides.length-1;
  }

  function open(gallery,index,trigger){
    if(!("showModal" in dialog)){
      const src=entries(gallery)[index]?.querySelector(".slide-visual img")?.src;
      if(src)window.open(src,"_blank","noopener");
      return;
    }
    currentGallery=gallery;
    opener=trigger;
    display(index);
    priorOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    dialog.showModal();
    dialog.querySelector(".lightbox-close").focus();
  }

  image.addEventListener("error",()=>{
    image.hidden=true;
    fallback.hidden=false;
  });
  previous.addEventListener("click",()=>display(currentIndex-1));
  next.addEventListener("click",()=>display(currentIndex+1));
  dialog.querySelector(".lightbox-close").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener("keydown",event=>{
    if(event.key==="ArrowLeft"){event.preventDefault();display(currentIndex-1);}
    if(event.key==="ArrowRight"){event.preventDefault();display(currentIndex+1);}
  });
  dialog.addEventListener("close",()=>{
    document.body.style.overflow=priorOverflow;
    currentGallery=null;
    opener?.focus();
    opener=null;
  });

  galleries.forEach(gallery=>{
    entries(gallery).forEach((slide,index)=>{
      const visual=slide.querySelector(".slide-visual");
      const original=visual?.querySelector("img");
      if(!visual||!original)return;
      const zoom=document.createElement("button");
      zoom.type="button";
      zoom.className="view-entire-image";
      zoom.textContent="↗ Ver completa";
      zoom.setAttribute("aria-label","Ver imagen completa: "+(original.alt||"pieza gráfica"));
      const invoke=()=>open(gallery,index,zoom);
      zoom.addEventListener("click",invoke);
      visual.append(zoom);
      original.addEventListener("click",invoke);
      original.classList.add("image-zoomable");
      // If the external preview fails, the existing source link and fallback remain.
      if(original.classList.contains("is-unavailable"))zoom.hidden=true;
      original.addEventListener("error",()=>{zoom.hidden=true;});
    });
  });
})();
