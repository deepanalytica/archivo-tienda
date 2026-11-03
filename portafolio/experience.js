/* DEEP UI SYSTEM · accessible growth studio. No external dependency required for core interaction. */
(()=>{
  'use strict';
  const board=document.querySelector('.experience-board');
  if(!board)return;

  const tabs=Array.from(board.querySelectorAll('.experience-step'));
  const panel=board.querySelector('#experience-panel');
  const title=board.querySelector('#experience-title');
  const desc=board.querySelector('#experience-desc');
  const phase=board.querySelector('#experience-phase');
  const deliver=board.querySelector('#experience-deliver');
  const related=board.querySelector('#experience-related');
  const counter=board.querySelector('#experience-count');
  const stages=[
    {
      phase:'ESTRATEGIA EDITORIAL',
      title:'Un mensaje que vale la pena detenerse a mirar.',
      desc:'Diseñar hooks, piezas, adaptaciones por canal y una razón clara para iniciar una conversación.',
      deliver:'Un Reel + dos variantes + CTA explícito',
      related:'Campañas ARCHIVO ↗', href:'#caso-archivo'
    },
    {
      phase:'CONVERSACIÓN Y CAPTACIÓN',
      title:'De un comentario a una oportunidad real.',
      desc:'Proponer una secuencia de respuesta, consentimiento, etiquetado y traspaso comercial. El flujo se valida antes de activarlo.',
      deliver:'Mapa de DM, trigger, segmentación y derivación',
      related:'Arquitectura MSJ ↗',href:'#ar-msj'
    },
    {
      phase:'PRODUCCIÓN Y COORDINACIÓN',
      title:'Más claridad para el equipo. Menos tareas perdidas.',
      desc:'Traducir objetivos en briefs, responsables, revisiones y fechas verificables. La calidad no debe depender de improvisar.',
      deliver:'Pipeline de piezas, QA, calendarios y responsables',
      related:'Praxios OS ↗',href:'#ar-prax'
    },
    {
      phase:'MÉTRICAS Y VERIFICACIÓN',
      title:'La IA puede proponer. La evidencia tiene que sostener.',
      desc:'Contrastar cifras con la fuente, separar hipótesis de hechos y decidir qué iterar sin inventar resultados comerciales.',
      deliver:'Hipótesis, fuente, KPI observado y revisión humana',
      related:'Meta Harness ↗',href:'#ar-harness'
    }
  ];
  const svgNodes=[...board.querySelectorAll('.experience-svg-node')];
  function activate(index,focus=false){
    const i=(index+tabs.length)%tabs.length;
    const data=stages[i];
    board.dataset.stage=String(i);
    phase.textContent=data.phase;
    title.textContent=data.title;
    desc.textContent=data.desc;
    deliver.textContent=data.deliver;
    related.textContent=data.related;
    related.setAttribute('href',data.href);
    counter.textContent=String(i+1).padStart(2,'0')+' / 04';
    tabs.forEach((button,j)=>{
      const selected=i===j;
      button.setAttribute('aria-selected',String(selected));
      button.tabIndex=selected?0:-1;
      if(focus&&selected)button.focus();
    });
    panel.setAttribute('aria-labelledby',tabs[i].id);
    svgNodes.forEach((n,j)=>n.setAttribute('aria-hidden',j!==i?'true':'false'));
    board.dispatchEvent(new CustomEvent('deepui:stagechange',{detail:{stage:i}}));
  }
  tabs.forEach((button,i)=>{
    button.addEventListener('click',()=>activate(i));
    button.addEventListener('keydown',event=>{
      let next=i;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=i+1;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=i-1;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();
      activate(next,true);
    });
  });
  activate(0);

  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData=navigator.connection?.saveData===true;
  const stage=document.getElementById('experience-canvas-frame');
  const hasWebGL=()=>{
    try{
      const c=document.createElement('canvas');
      const gl=c.getContext('webgl2',{powerPreference:'low-power'})||c.getContext('webgl',{powerPreference:'low-power'});
      const available=!!gl;
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      return available;
    }catch{return false;}
  };

  // Desktop only. Mobile, reduced-motion users and browsers without WebGL
  // see the complete interactive SVG diagram — no library download.
  if(!prefersReduced.matches&&!saveData&&
     window.matchMedia('(min-width: 901px)').matches&&hasWebGL()&&
     typeof IntersectionObserver!=='undefined'){
    let requested=false;
    const lazy=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)&&!requested){
        requested=true;
        lazy.disconnect();
        import('./experience-three.js').then(mod=>mod.mountThreeStudio?.(board,stage))
          .catch(()=>{ /* SVG fallback stays operational. */ });
      }
    },{rootMargin:'160px 0px'});
    lazy.observe(stage);
  }

  // GSAP + ScrollTrigger are optional enhancements — no content is hidden
  // waiting for the CDN. Existing native responsive interactions always work.
  if(!prefersReduced.matches&&!saveData&&window.matchMedia('(min-width: 901px)').matches){
    const runMotion=async()=>{
      try{
        const [gs,plugin]=await Promise.all([
          import('https://cdn.jsdelivr.net/npm/gsap@3.13.0/+esm'),
          import('https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger.js/+esm')
        ]);
        const gsap=gs.gsap||gs.default;
        const ScrollTrigger=plugin.ScrollTrigger||plugin.default;
        if(!gsap||!ScrollTrigger)return;
        gsap.registerPlugin(ScrollTrigger);
        const context=gsap.context(()=>{
          gsap.fromTo('.experience-intro .section-title',
            {y:20,opacity:.75},{y:0,opacity:1,duration:.9,ease:'power3.out',
            scrollTrigger:{trigger:'.experience-section',start:'top 80%',once:true}});
          gsap.fromTo('.experience-board',
            {y:24,opacity:.88},{y:0,opacity:1,duration:.85,ease:'power2.out',
            scrollTrigger:{trigger:'.experience-board',start:'top 88%',once:true}});
          gsap.to('.experience-live-dot',{boxShadow:'0 0 0 9px rgba(216,251,132,0)',duration:1.6,repeat:-1,yoyo:true,ease:'sine.inOut'});
        });
        window.addEventListener('pagehide',()=>context.revert(),{once:true});
      }catch{ /* CSS-based feedback remains functional. */ }
    };
    // Run only when section is encountered, so CDN imports don't affect the hero.
    if(typeof IntersectionObserver!=='undefined'){
      let once=false;
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(e=>e.isIntersecting)&&!once){
          once=true;observer.disconnect();runMotion();
        }
      },{rootMargin:'220px 0px'});
      observer.observe(board);
    }
  }

  // Support direct navigation to a deep project link filtered out by the atlas.
  const target=location.hash&&/^#[a-zA-Z0-9_-]+$/.test(location.hash)?document.querySelector(location.hash):null;
  if(target?.classList?.contains('arsenal-card')){
    const allButton=document.querySelector('.arsenal-filter[data-filter="all"]');
    allButton?.click();
  }
})();
