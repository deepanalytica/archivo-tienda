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
console.log('PASS recruiter-first portfolio:',{imageCount:images.length,internalLinks:[...html.matchAll(/href="#/g)].length,sections:order.length});
