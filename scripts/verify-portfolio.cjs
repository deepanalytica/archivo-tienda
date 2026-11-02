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
  'Comentario','Metricool','ManyChat','sin métricas de rendimiento ficticias'
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
console.log('PASS recruiter-first portfolio:',{imageCount:images.length,internalLinks:[...html.matchAll(/href="#/g)].length,sections:order.length});
