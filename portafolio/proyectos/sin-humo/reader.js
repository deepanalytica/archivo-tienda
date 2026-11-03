/* Sin Humo — lector digital de la edición documental de octubre de 2026.
 * Texto íntegro transcrito de PDF de 300 páginas del autor; no genera ni resume capítulos.
 * Publicación estática con recuperación por fragmentos y búsqueda local en el navegador.
 */
(()=>{
"use strict";
const TOTAL=300,BATCH=20;
const TOC=[
 {title:"Portada y preliminares",items:[["Portada",2],["Nota editorial",8],["Prólogo · La prohibición",9]]},
 {title:"I · La chispa",items:[["01 · Súper Prompt Euler",12],["02 · χ — La característica",15],["03 · El Puente",19],["04 · El Prisma",30],["05 · El Sello",35],["06 · El Cuaderno",40],["07 · El Premio",46],["08 · La Hipótesis",53],["09 · La Bitácora",59],["10 · El Eclipse",64],["11 · El Primer Principio",70],["12 · El Holograma",76],["13 · El Mapa",82]]},
 {title:"II · La máquina y el teorema",items:[["14 · La Factoría",91],["15 · Los Elementos",99],["16 · El Engranaje",106],["17 · El Tratado del Concilio",110],["18 · Año 9026",116],["19 · El Libro del Cielo",122],["20 · La Matemática Legente",129],["21 · El Ascenso",135],["22 · Lectores acotados",141],["23 · Metamatemática de lectores acotados",147],["24 · El núcleo que permanece",151],["25 · La Malla",156],["26 · La Heredad",158],["27 · El Autorretrato Espectral",162]]},
 {title:"III · El mundo puesto a prueba",items:[["28 · La Orilla",167],["29 · La Tormenta",184],["30 · El Rayo",188],["31 · La Catedral",192],["32 · El Bosque",197],["33 · La Telaraña",201],["34 · El Tiburón",205],["35 · El Compendio",207],["36 · El Horizonte",218],["37 · La Singularidad",221],["38 · El Momento",224],["39 · El Sexto",227]]},
 {title:"IV · Las evoluciones",items:[["40 · La Segunda Lectura",232],["41 · El Cálculo de la Vigilancia",241],["42 · Mundos Epistemológicos",252],["43 · Transporte y Curvatura",261],["44 · El Orden de las Decisiones",268],["45 · La Paridad de las Pruebas",270],["46 · Certificación Entrópica",278],["47 · El Concilio Revisa",279],["48 · La Sala de Decisiones",284],["49 · El caso de los diecisiete dólares",291],["50 · Un libro que se niega a terminar",294]]},
 {title:"V · La herencia",items:[["Epílogo · La última regla",297],["Carta al lector",299],["Notas de edición y procedencia",300]]}
];
const allEntries=TOC.flatMap(g=>g.items.map(([title,page])=>({title,page,group:g.title})));
const $=id=>document.getElementById(id);
const content=$("book-content"),title=$("chapter-title"),status=$("book-status"),progress=$("book-progress"),pageDisplay=$("page-display"),chapters=$("chapters-list"),searchBox=$("search-input"),searchResults=$("search-results"),resultsCount=$("results-count"),sidebar=$("reader-sidebar"),shade=$("sidebar-shade"),btnMenu=$("open-chapters");
const cache=new Map();
let current=9,readingMode="reading",searching=false,seq=0;

function pad(n){return String(n).padStart(3,"0");}
function filename(page){const start=Math.floor((page-1)/BATCH)*BATCH+1;return "./reader/data/pages-"+pad(start)+"-"+pad(start+19)+".json";}
async function getPage(page){
 const url=filename(page);
 if(!cache.has(url)){
   cache.set(url,fetch(url).then(r=>{if(!r.ok)throw Error("HTTP "+r.status+" · "+url);return r.json()}).catch(e=>{cache.delete(url);throw e}));
 }
 const part=await cache.get(url);
 const item=part.pages.find(p=>p.n===page);
 if(!item)throw Error("La página "+page+" no aparece en el fragmento.");
 return item.t;
}
function chapterAt(page){return [...allEntries].reverse().find(x=>page>=x.page)||allEntries[0];}
function activateChapter(){
 chapters.querySelectorAll("button[data-page]").forEach(el=>{
  const active=Number(el.dataset.page)===chapterAt(current).page;
  el.classList.toggle("current",active);
  if(active)el.setAttribute("aria-current","location");else el.removeAttribute("aria-current");
 });
}
function buildTOC(){
 chapters.replaceChildren();
 for(const [idx,g] of TOC.entries()){
  const details=document.createElement("details");
  details.className="chapter-group";
  details.open=idx===0;
  const summary=document.createElement("summary");
  summary.textContent=g.title;
  details.append(summary);
  for(const [text,n] of g.items){
   const b=document.createElement("button");
   b.type="button";b.dataset.page=String(n);b.textContent=text;
   const page=document.createElement("span");page.textContent=pad(n);
   b.append(page);
   b.addEventListener("click",()=>{go(n);closeSidebar();});
   details.append(b);
  }
  chapters.append(details);
 }
}
function cleanRaw(raw,page){
 let t=String(raw||"").replace(/\r\n?/g,"\n");
 t=t.replace(/^\s*(?:El universo que aprendió a decir «no sé»\s+SIN HUMO|SIN HUMO\s+El universo que aprendió a decir «no sé»)\s*\n+/i,"");
 if(page>1)t=t.replace(new RegExp("\\n\\s*"+String(page-1)+"\\s*$"),"");
 return t.trim();
}
function reflow(raw,page){
 const value=cleanRaw(raw,page);
 const parts=value.split(/\n\s*\n/).filter(x=>x.trim());
 const container=document.createDocumentFragment();
 for(const part of parts){
  const lines=part.split("\n").map(x=>x.trim()).filter(Boolean);
  if(!lines.length)continue;
  const p=document.createElement("p");
  p.className="book-paragraph";
  if(readingMode==="original"){
   p.classList.add("book-literal");
   p.textContent=part.trim();
  }else{
   const isFormula=lines.some(line=>/[∑∫√≠≤≥∂⊂⊆⇒↦\u221E]|\b(?:Pr|Var|lim|sup|inf)\s*[([]/.test(line));
   const isTabular=lines.some(line=>/(?:\s{3,}|\.\s*\.\s*\.)/.test(line))&&lines.length>3;
   if(isFormula||isTabular){
      p.classList.add("book-literal");
      p.textContent=part.trim();
   }else{
      let txt=lines.join(" ").replace(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ])\-\s+([a-záéíóúüñ])/g,"$1$2");
      p.textContent=txt;
   }
  }
  container.append(p);
 }
 return container;
}
function updateUrl(page){const u=new URL(location.href);u.searchParams.set("pagina",String(page));history.replaceState({page},"",u);}
async function go(page,{scroll=true}={}){
 const requested=Math.max(1,Math.min(TOTAL,Number(page)||9)),request=++seq;
 status.textContent="Cargando texto original…";
 content.classList.add("loading");
 try{
  const text=await getPage(requested);
  if(request!==seq)return;
  current=requested;
  content.replaceChildren(reflow(text,current));
  const entry=chapterAt(current);
  title.textContent=entry.title;
  $("section-label").textContent=entry.group;
  pageDisplay.textContent="Página "+current+" / "+TOTAL;
  progress.style.width=(current/TOTAL*100).toFixed(2)+"%";
  $("prev-page").disabled=current<=1;
  $("next-page").disabled=current>=TOTAL;
  $("page-number").value=String(current);
  status.textContent="Texto íntegro de la edición de octubre de 2026";
  content.classList.remove("loading");
  activateChapter();
  updateUrl(current);
  if(scroll)document.getElementById("reader-top").scrollIntoView({behavior:"auto",block:"start"});
 }catch(err){
  if(request!==seq)return;
  status.textContent="No se pudo cargar esta página.";
  content.classList.remove("loading");
  const p=document.createElement("p");p.className="reader-error";p.textContent="Error al acceder al fragmento: "+err.message+". Comprueba tu conexión e inténtalo nuevamente.";
  const retry=document.createElement("button");retry.type="button";retry.textContent="Reintentar";retry.onclick=()=>go(requested,{scroll:false});
  content.replaceChildren(p,retry);
 }
}
function openSidebar(){sidebar.classList.add("is-open");shade.hidden=false;btnMenu.setAttribute("aria-expanded","true");}
function closeSidebar(){sidebar.classList.remove("is-open");shade.hidden=true;btnMenu.setAttribute("aria-expanded","false");}
async function search(){
 const q=searchBox.value.trim().toLocaleLowerCase("es");
 if(q.length<3){searchResults.replaceChildren();resultsCount.textContent="Escribe al menos tres caracteres.";return;}
 if(searching)return;
 searching=true;resultsCount.textContent="Buscando en las 300 páginas…";searchResults.replaceChildren();
 const matches=[];
 try{
   for(let b=1;b<=TOTAL;b+=BATCH){
     const data=await cachePageBatch(b);
     for(const p of data.pages){
       const t=p.t.toLocaleLowerCase("es");const k=t.indexOf(q);
       if(k<0)continue;
       const snippet=p.t.slice(Math.max(0,k-85),Math.min(p.t.length,k+q.length+150)).replace(/\s+/g," ").trim();
       matches.push({n:p.n,snippet});
     }
   }
   resultsCount.textContent=matches.length+" páginas con coincidencias.";
   for(const x of matches.slice(0,80)){
     const b=document.createElement("button");b.type="button";b.className="search-result";
     const label=document.createElement("strong");label.textContent="Página "+x.n+" · "+chapterAt(x.n).title;
     const span=document.createElement("span");span.textContent=x.snippet;
     b.append(label,span);b.onclick=()=>{go(x.n);$("search-drawer").hidden=true;};
     searchResults.append(b);
   }
   if(matches.length>80){const note=document.createElement("p");note.textContent="Se muestran las primeras 80 páginas encontradas.";searchResults.append(note);}
 }catch(err){resultsCount.textContent="No se completó la búsqueda: "+err.message;}
 finally{searching=false;}
}
async function cachePageBatch(n){const url=filename(n);if(!cache.has(url))cache.set(url,fetch(url).then(r=>{if(!r.ok)throw Error(String(r.status));return r.json()}).catch(e=>{cache.delete(url);throw e}));return cache.get(url);}
buildTOC();
$("prev-page").onclick=()=>go(current-1);$("next-page").onclick=()=>go(current+1);
$("go-to-page").onsubmit=e=>{e.preventDefault();go($("page-number").value);};
$("size-plus").onclick=()=>document.documentElement.style.setProperty("--reader-font",Math.min(25,Number(getComputedStyle(document.documentElement).getPropertyValue("--reader-font").replace("px",""))||18+1)+"px");
$("size-minus").onclick=()=>{const computed=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--reader-font"))||18;document.documentElement.style.setProperty("--reader-font",Math.max(14,computed-1)+"px");};
$("theme-toggle").onclick=()=>{document.body.classList.toggle("night-reader");$("theme-toggle").setAttribute("aria-pressed",String(document.body.classList.contains("night-reader")));};
$("mode-toggle").onclick=()=>{readingMode=readingMode==="reading"?"original":"reading";$("mode-toggle").textContent=readingMode==="reading"?"Ver texto original":"Refluir texto";go(current,{scroll:false});};
$("open-chapters").onclick=()=>sidebar.classList.contains("is-open")?closeSidebar():openSidebar();
$("close-chapters").onclick=closeSidebar;
shade.onclick=closeSidebar;
$("search-toggle").onclick=()=>{const panel=$("search-drawer");panel.hidden=!panel.hidden;if(!panel.hidden)searchBox.focus();};
$("search-form").onsubmit=e=>{e.preventDefault();search();};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeSidebar();$("search-drawer").hidden=true;}if(e.target.matches("input,textarea,button,a"))return;if(e.key==="ArrowRight")go(current+1,{scroll:false});if(e.key==="ArrowLeft")go(current-1,{scroll:false});});
const initial=Number(new URLSearchParams(location.search).get("pagina"));
go(Number.isInteger(initial)&&initial>=1&&initial<=TOTAL?initial:9,{scroll:false});
})();
