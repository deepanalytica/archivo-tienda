// Audit only what Cloudflare uploads. Fail closed if proprietary files leak.
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..','_site');
const file=rel=>path.join(base,rel);
const has=rel=>fs.existsSync(file(rel));
const read=rel=>fs.readFileSync(file(rel),'utf8');
assert(has('index.html'),'No public entrypoint');
assert(has('estudio.html'),'No editorial page');
assert(has('catalog.js'),'No public catalogue');
for(const priv of ['admin.html','admin.js','server.cjs','data','docs','output','README.md','package.json','assets/prints','assets/trims']){
  assert(!has(priv),`No se debe publicar: ${priv}`);
}
assert(!read('index.html').includes('Solicitar un presupuesto con SVG'), 'No prepress CTA allowed');
assert(!read('estudio.html').includes('id="taller"'),'Studio laboratory is internal');
assert(!read('estudio.js').includes('assets/prints'),'Studio references internal assets');
assert(!read('estudio.js').includes('assets/trims'),'Studio references internal assets');
const context=vm.createContext({});
vm.runInContext(read('catalog.js'),context,{timeout:5000});
const cat=context.ARCHIVO_CATALOG;
assert(cat && Array.isArray(cat.products), 'Catalog must be available');
assert.equal(cat.products.length,51,'Review catalog change / snapshot');
assert.equal(Object.keys(cat.brands).length,12,'Review brands count');
assert.equal(Object.keys(cat.collections).length,16,'Review collection count');
for(const p of cat.products){
  assert(!p.print && !p.trims && !p.secondaryPrint,`Se filtraron datos de imprenta: ${p.id}`);
  assert(has(p.image),`Imagen faltante ${p.image}`);
  assert(has(cat.brands[p.brand].campaign),`Campaña faltante ${p.brand}`);
}
for(const k of ['app.js','styles.css','estudio.js','estudio.css','assets/identities/archivo-lockup.svg']){
  assert(has(k),`Recurso público faltante ${k}`);
}
console.log('PUBLIC BUILD QA OK:',cat.products.length,'productos,',Object.keys(cat.brands).length,'marcas y',Object.keys(cat.collections).length,'colecciones; sin SVG/PNG maestros de impresión.');
