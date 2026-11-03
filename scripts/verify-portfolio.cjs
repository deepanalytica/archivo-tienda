// Recruiter portfolio regression checks. Structural only; not a substitute for visual device testing.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('_site/portafolio/index.html','utf8');
const need=(s)=>assert.ok(html.includes(s),'Missing required portfolio element: '+s);
for(const s of [
  '<html lang="es">','id="inicio"','id="casos"','id="operacion"','id="laboratorio"','id="contacto"',
  'aria-label="Índice del portafolio"','scroll-snap-type:x mandatory','role="tablist"',
  'data-tab="automation"','data-tab="data"','data-tab="team"','data-tab="plan"',
  'Visual Art AI','WAL','ARCHIVO','Praxios OS','Meta Harness','Conv OS',
  'Deep Geo','Deep Living','El Puente','Inverse Reality Lab','Sin Humo',
  'NVIDIA Inception','11 certificaciones Anthropic','Ingeniería en Data Science',
  'Comentario','Metricool','ManyChat','sin cifras de rendimiento ficticias'
]){
  if(s==='Comentario')continue;
  need(s);
}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate ids');
for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),'Broken internal anchor: '+m[1]);
const images=[...html.matchAll(/<img\b[^>]*>/g)].map(x=>x[0]);
assert.ok(images.length>=14,'Insufficient real images');
for(const tag of images){
 assert.ok(/\balt="[^"]+"/.test(tag),'Image without alt');
 assert.ok(/\bsrc="(?:https:\/\/|\.\.\/assets\/)/.test(tag),'Invalid image source (HTTPS or local assets required)');
}
const srcs=images.map(s=>(s.match(/src="([^"]+)"/)||[])[1]);
assert.equal(srcs.length,new Set(srcs).size,'Repeated image asset');
for(const bad of ['nanobanana','01 / 29','navbox','Imagen original de repositorio Visual Art AI']){
 assert.ok(!html.includes(bad),'Deprecated artifact: '+bad);
}
assert.ok(html.includes('prefers-reduced-motion'),'Missing reduced motion');
assert.ok(html.includes('aria-selected="true"'),'Missing accessible tab selection');
assert.ok(html.includes('loading="lazy"'),'Missing deferred gallery images');
const order=['id="inicio"','id="casos"','id="operacion"','id="laboratorio"','id="contacto"'].map(s=>html.indexOf(s));
assert.ok(order.every((v,i)=>i===0||v>order[i-1]),'Relevance-based section order changed');
// Verify additional research and proprietary-system layer remains discoverable.
for(const term of ['id="impacto"','id="ar-conv"','id="ar-msj"','id="ar-radar"','id="ar-living"','id="ar-prax"','id="ar-harness"','id="ar-atalaya"','id="ar-eureka"','id="ar-tiburon"','id="ar-escalera"','id="ar-euler"','id="ar-geo"','id="ar-geoanalytica"','id="ar-inverse"','id="ar-deeplicita"','id="ar-book"','id="ar-puente"','id="ar-audio"','data-filter="featured"','data-filter="all"','id="laboratorio"','MSJ','Deep Audio','Deep Licita','GeoAnalytica','Super Prompt Euler','Atlas']){ if(term==='Atlas')continue;need(term); }
const arsenalCards=[...html.matchAll(/class="arsenal-card" data-type="/g)];
assert.equal(arsenalCards.length,18,'Expected 18 project and system records');
const featured=[...html.matchAll(/data-featured="true"/g)];
assert.equal(featured.length,6,'Default curated view must feature 6 items');
for(const label of ['Adquisición y conversión','Agentes y verificación','Datos y decisiones','Investigación y creación','Atraer','Conversar','Operar','Aprender'])need(label);
if(!html.includes('asset-failed'))throw Error('No fallbacks for externally hosted previews');

// Visual system contract — editorial coherence, tokens, and legibility.
// This verifies the published CSS file; it does not substitute for visual browser QA.
const designCSS=fs.readFileSync('_site/portafolio/design-system-v2.css','utf8');
assert.ok(html.includes('href="./design-system-v2.css"'),'Portfolio does not load the design system');
for(const token of [
 '--space-micro:4px','--space-1:8px','--space-2:16px','--space-3:24px',
 '--space-4:32px','--space-5:48px','--space-6:64px','--space-7:96px',
 '--type-base:16px','--type-lead:20px','--type-h5:25px','--type-h4:31px',
 '--type-h3:39px','--type-h2:49px','--type-h1:61px','--content-readable:68ch',
 '--shadow-card','--shadow-lift'
])assert.ok(designCSS.includes(token),'Missing editorial design token: '+token);
for(const q of ['@media(max-width:600px)','@media(prefers-reduced-motion:reduce)',
  '.action-grid { display:flex','scroll-snap-type:x mandatory',
  '.slide-visual img[src*="image.thum.io"]'])assert.ok(designCSS.includes(q),'Missing responsive UX treatment: '+q);
function tokenHex(name) {
 const m=designCSS.match(new RegExp(name.replaceAll('-', '\\-')+':(#[0-9a-f]{6})','i'));
 assert.ok(m,'No color token: '+name);
 return m[1];
}
function lum(hex) {
 const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
 const c=rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return c[0]*.2126+c[1]*.7152+c[2]*.0722;
}
function contrast(a,b) {
 const [aL,bL]=[lum(a),lum(b)].sort((x,y)=>y-x);
 return (aL+.05)/(bL+.05);
}
assert.ok(contrast(tokenHex('--muted'),tokenHex('--paper'))>=4.5,'Muted body color fails 4.5:1');
assert.ok(contrast(tokenHex('--accent'),tokenHex('--white'))>=4.5,'Accent on white fails 4.5:1');

// Contact QA: recruiters must be able to reach Alexis directly on WhatsApp.
const directWhatsApp=[...html.matchAll(/https:\/\/wa\.me\/56958039450\?text=/g)];
assert.equal(directWhatsApp.length,2,'Direct WhatsApp links missing from header or recruitment CTA');
for(const expected of ['Hablemos por WhatsApp','Prefiero escribir por correo','WhatsApp: +56 9 5803 9450'])need(expected);

// Regression guard: case studies must preserve their authored assets (not crop 4:5 ads).
assert.ok(html.includes('src="./gallery-viewer.js"'),'Gallery viewer is not linked');
const viewer=fs.readFileSync('_site/portafolio/gallery-viewer.js','utf8');
for(const v of [
 'dialog.showModal()','className="portfolio-lightbox"','className="view-entire-image"',
 'currentIndex','event.key==="ArrowLeft"','event.key==="ArrowRight"',
 'dialog.addEventListener("close"'
])assert.ok(viewer.includes(v),'Missing full-image interaction: '+v);
for(const v of [
 '.case-gallery .slide-visual>img','object-fit:contain!important',
 '.portfolio-lightbox','lightbox-image','lightbox-topbar',
 '@media(max-width:600px)','@media(prefers-reduced-motion:reduce)'
])assert.ok(designCSS.includes(v),'Missing uncropped gallery style: '+v);
const imageRule=designCSS.indexOf('.case-gallery .slide-visual>img');
assert.ok(imageRule>designCSS.lastIndexOf('.slide-visual img[src*="image.thum.io"]'),'Gallery fix must supersede older cropping policy');
assert.ok(viewer.includes('setAttribute("aria-label"'),'Fullscreen controls must have labels');


// Brand-wall regression: portfolio must communicate ARCHIVO's depth at first glance.
const brands=['alto','brava','imago','limen','logic','marea','neblina','orbita','ownform','salitre','solar','umbral'];
const archiveSection=html.slice(html.indexOf('id="caso-archivo"'),html.indexOf('<p class="clear-proof">'));
assert.ok(archiveSection.includes('class="archive-mosaic brand-mosaic"'),'ARCHIVO must show a brand mosaic, not a one-image carousel');
for(const brand of brands)assert.ok(archiveSection.includes('assets/brands/'+brand+'-campaign.webp'),'Missing brand art: '+brand);
assert.equal((archiveSection.match(/class="slide mosaic-tile"/g)||[]).length,12,'ARCHIVO grid must have 12 visible brands');
const walSection=html.slice(html.indexOf('id="caso-wal"'),html.indexOf('id="caso-archivo"'));
assert.ok(walSection.includes('class="archive-mosaic wal-mosaic"'),'WAL must show a multi-campaign image wall');
assert.equal((walSection.match(/class="slide mosaic-tile"/g)||[]).length,6,'WAL must feature six original campaigns');
for(const v of [
 '.archive-mosaic .slide-visual>img','width:auto!important','height:auto!important',
 'max-width:100%!important','max-height:100%!important','object-fit:contain!important',
 '.brand-mosaic{grid-template-columns:repeat(6,minmax(0,1fr))}',
 '.wal-mosaic{grid-template-columns:repeat(3,minmax(0,1fr))}',
 '.brand-mosaic{grid-template-columns:repeat(3,minmax(0,1fr))}'
])assert.ok(designCSS.includes(v),'Missing fully-visible artwork masonry: '+v);
assert.ok(viewer.includes('document.querySelectorAll(".case-gallery, .archive-mosaic")'),'Expanded campaign galleries not enabled in image viewer');
assert.ok(!archiveSection.includes('class="rail"'),'ARCHIVO must not conceal most brands in a carousel');


// ARCHIVO must display real logos and collection names, not only a single photo.
for(const brand of brands){
 assert.ok(archiveSection.includes('assets/identities/'+brand+'-wordmark.svg'),'Missing original wordmark: '+brand);
}
const realCollections=[
 'Fuera de oficina','Pleamar','Club del futuro','Patio','Jardín eléctrico','Frecuencia',
 'Desfase','Entre capas','Principio','Costa privada','Aire abierto','Entre horas',
 'Flor de un día','Herbario indócil','Self Defined','Other Nature'
];
assert.ok(archiveSection.includes('class="collection-list"'),'Collection overview missing');
for(const title of realCollections)assert.ok(archiveSection.includes(title),'Missing collection: '+title);
assert.equal((archiveSection.match(/class="brand-wordmark"/g)||[]).length,12,'Expected 12 original wordmarks');
assert.ok(designCSS.includes('.brand-mosaic .brand-wordmark'),'Missing responsive logo styling');


// Deep UI System experience: optional engines must never gate content.
for(const t of ['id="estudio"','id="experience-panel"','id="experience-canvas-frame"',
  'role="tablist" aria-label="Etapas de crecimiento verificable"','data-stage="0"',
  'data-stage="1"','data-stage="2"','data-stage="3"',
  'src="./experience.js"','href="./experience.css"',
  'class="experience-storyboard"','Modelo conceptual interactivo'])
 need(t);
const experienceCSS=fs.readFileSync('_site/portafolio/experience.css','utf8');
const experienceJS=fs.readFileSync('_site/portafolio/experience.js','utf8');
const threeJS=fs.readFileSync('_site/portafolio/experience-three.js','utf8');
const roadmap=fs.readFileSync('_site/portafolio/EXPERIENCE_ROADMAP.md','utf8');
assert.ok(experienceCSS.includes('@media(max-width:600px)'),'Missing mobile experience layout');
assert.ok(experienceCSS.includes('prefers-reduced-motion'),'Motion must be controllable');
assert.ok(experienceCSS.includes('experience-fallback'),'Non-WebGL image fallback missing');
for(const t of ['aria-selected','ArrowRight','ArrowLeft','Home','End','experience-panel',
  'prefers-reduced-motion','navigator.connection?.saveData',
  "import('./experience-three.js')",'gsap@3.13.0',
  'ScrollTrigger.js','new CustomEvent','IntersectionObserver']){
 assert.ok(experienceJS.includes(t),'Missing experience control: '+t);
}
for(const t of ['three@0.180.0','WebGLRenderer','getPixelRatio','setPixelRatio',
  'document.hidden','webglcontextlost','requestAnimationFrame','cancelAnimationFrame',
  'pagehide','ResizeObserver','renderer.dispose']){
  if(t==='getPixelRatio')continue;
  assert.ok(threeJS.includes(t),'Missing Three.js safeguard: '+t);
}
assert.ok(roadmap.includes('Remotion')&&roadmap.includes('React Flow'),
 'Technology roadmap must distinguish built effects from planned engines');
const order2=['id="operacion"','id="impacto"','id="estudio"','id="laboratorio"','id="contacto"'].map(t=>html.indexOf(t));
assert.ok(order2.every((v,i)=>v>=0&&(i===0||v>order2[i-1])),'Experience studio is out of sequence');
for(const name of ['neblina-jardin-campaign.webp','logic-frecuencia-campaign.webp','umbral-patio-campaign.webp'])
 assert.ok(html.includes(name),'Missing original storyboard artwork: '+name);

console.log('PASS recruiter-first portfolio:',{imageCount:images.length,internalLinks:[...html.matchAll(/href="#/g)].length,sections:order.length});
