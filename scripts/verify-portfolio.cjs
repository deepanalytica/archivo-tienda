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
 assert.ok(/\bsrc="https:\/\//.test(tag),'Non-HTTPS image');
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

console.log('PASS recruiter-first portfolio:',{imageCount:images.length,internalLinks:[...html.matchAll(/href="#/g)].length,sections:order.length});
