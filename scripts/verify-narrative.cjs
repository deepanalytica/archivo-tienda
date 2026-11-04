const fs=require('node:fs');
const assert=require('node:assert/strict');
const file=path=>fs.readFileSync('_site/portafolio/'+path,'utf8');
const main=file('original.html');
const dossier=file('criterio/index.html');
const stylesheet=file('narrative.css');
const dossierStyles=file('criterio/styles.css');
const dossierJS=file('criterio/reader.js');
const have=(text,term,context)=>assert.ok(text.includes(term),'Missing '+context+': '+term);
for(const id of ['perfil','gobernanza']){
  have(main,'id="'+id+'"','main section');
}
for(const id of ['perfil','practicas','casos','rust','proyectos']){
  have(dossier,'id="'+id+'"','dossier section');
}
have(main,'href="./narrative.css"','CSS reference');
for(const term of ['Comunicación y copy','Branding y dirección de arte',
 'Storytelling y producción','UI/UX y producto','Investigación y datos',
 'Arquitectura de agentes','Verificación de IA','Ingeniería determinista',
 '2018–2023','2024–2025','Rust','MH-EVID-001','MH-KEY-001'])
 have(main,term,'biography/competence');
for(const term of ['id="caso-visual"','id="caso-wal"','id="caso-archivo"',
 'MH-FC-003','Sin Humo','EUREKA','La Escalera','Deep Audio',
 'Integro análisis de datos','No pueden garantizar','Ingeniería determinista'])
 have(dossier,term,'dossier content');
// Editorial contract: keep the profile anchored in analysis and visible engineering work.
for(const t of [
 'Análisis de datos, software','Cruzo datos y desarrollo sistemas',
 'Soy Alexis Reyes Saavedra','Distintas áreas de trabajo que se complementan',
 'Cómo compruebo lo que','decisiones','Conversemos sobre'
])assert.ok(main.includes(t),'Missing grounded editorial positioning: '+t);
for(const t of [
 'Cómo investigo, decido','Integro análisis de datos',
 'reúno información','Cómo verifico respuestas',
 '18 proyectos','fuentes','Rust'
])assert.ok(dossier.toLowerCase().includes(t.toLowerCase()),'Missing natural professional narrative: '+t);
for(const banned of [
 'Un arsenal de capacidades','El trabajo habla antes que el currículum',
 'No parto por la herramienta','Me gusta entender el problema antes de empezar a diseñar'
])assert.ok(!main.includes(banned)&&!dossier.includes(banned),'Avoid generic or inflated copy: '+banned);

const dossierCards=[...dossier.matchAll(/class="dossier" id="proyecto-([a-z0-9-]+)"/g)].map(x=>x[1]);
const expected=['conv','msj','radar','living','prax','harness','atalaya','eureka',
 'tiburon','escalera','euler','geo','geoanalytica','inverse','deeplicita','book','puente','audio'];
assert.equal(dossierCards.length,18,'Expected 18 distinct dossiers');
assert.deepEqual([...dossierCards].sort(),[...expected].sort(),'Dossier catalog changed');
const mainIds=[...main.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(mainIds.length,new Set(mainIds).size,'Duplicate IDs main');
const dossierIds=[...dossier.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(dossierIds.length,new Set(dossierIds).size,'Duplicate IDs dossier');
for(const x of dossier.matchAll(/href="#([^"]+)"/g))assert.ok(dossierIds.includes(x[1]),'Bad dossier anchor #'+x[1]);
for(const x of main.matchAll(/href="\.\/criterio\/#([^"]+)"/g))assert.ok(dossierIds.includes(x[1]),'Bad cross-page anchor #'+x[1]);
const areas=[...dossier.matchAll(/class="practice-item"/g)].length;
assert.equal(areas,8,'Expected eight professional disciplines');
assert.equal((dossier.match(/class="feature" id="caso-/g)||[]).length,3,'Three real main cases missing');
assert.ok(dossier.includes('repositorio sin código publicado'),'Must disclose conceptual Deep Licita status');
assert.ok(dossier.includes('No pueden garantizar')&&dossier.includes('bloqueo'),'Must explain the limits and actual checks of anti-hallucination controls');
for(const v of ['@media(max-width:600px)','prefers-reduced-motion','governance-section','profile-areas'])have(stylesheet,v,'responsive main');
for(const v of ['@media(max-width:600px)','prefers-reduced-motion','rust-board','dossier'])have(dossierStyles,v,'responsive dossier');
for(const v of ['aria-pressed','search-project','normalize','hash','details.open=true'])have(dossierJS,v,'dossier interactions');
console.log('PASS narrative portfolio QA:',{dossiers:dossierCards.length,areas,cases:3,mainSections:2});
