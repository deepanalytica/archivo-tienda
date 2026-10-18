'use strict';

// ARCHIVO Brand Office: verificación editorial en modo sólo lectura.
// No altera catalog.js, pedidos, pricing ni assets; requiere Node.js 22+.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const catalog = require(path.join(root, 'catalog.js'));
const reg = JSON.parse(fs.readFileSync(path.join(root, 'docs/brand-office/brand-registry.json'), 'utf8'));
const errors = [];
const add = (ok, message) => { if (!ok) errors.push(message); };
const unique = values => new Set(values).size === values.length;
const brandIds = Object.keys(catalog.brands);
const collectionIds = Object.keys(catalog.collections);
const ids = reg.brands.map(b => b.id);
const declaredCollectionIds = reg.brands.flatMap(b => b.collections);
const products = catalog.products;

add(reg.authority === 'EDITORIAL_OVERLAY_NOT_STOREFRONT_CATALOG', 'El registro no declara su alcance editorial');
add(unique(ids), 'brand_id duplicado');
add(unique(reg.brands.map(b => b.slug)), 'slug de biblia duplicado');
add(unique(declaredCollectionIds), 'colección declarada en dos marcas');
add(brandIds.length === reg.brands.length, 'Recuento de marcas no coincide');
add(collectionIds.length === declaredCollectionIds.length, 'Recuento de colecciones no coincide');
add(brandIds.every(id => ids.includes(id)), 'Marca en catálogo ausente en Brand Office');
add(collectionIds.every(id => declaredCollectionIds.includes(id)), 'Colección en catálogo ausente en Brand Office');
for (const b of reg.brands) {
  const existing = catalog.brands[b.id];
  add(Boolean(existing), `Marca ausente: ${b.id}`);
  if (!existing) continue;
  add(existing.name === b.name, `Nombre desalineado: ${b.id}`);
  add(Boolean(b.signature && b.archetypes_proposed?.primary), `Estrategia incompleta: ${b.id}`);
  add(fs.existsSync(path.join(root,b.brandBible)), `Biblia no encontrada: ${b.brandBible}`);
  for (const id of b.collections) {
    add(Boolean(catalog.collections[id]), `Colección faltante: ${id}`);
    add(catalog.collections[id]?.brand === b.id, `Colección asignada a marca incorrecta: ${id}`);
  }
}
add(unique(products.map(p => p.id)), 'SKU duplicado');
for (const p of products) {
  add(Boolean(catalog.brands[p.brand]), `SKU con marca inválida: ${p.id}`);
  add(Boolean(catalog.collections[p.collection]), `SKU con colección inválida: ${p.id}`);
  add(catalog.collections[p.collection]?.brand === p.brand, `SKU/colección incongruente: ${p.id}`);
}
for (const [key,value] of Object.entries({
  brands:brandIds.length,
  collections:collectionIds.length,
  products:products.length,
})) {
  add(reg.expectedSnapshot[key] === value, `Snapshot desactualizado: ${key} esperado ${reg.expectedSnapshot[key]}, real ${value}`);
}
const counts = {brands:brandIds.length,collections:collectionIds.length,products:products.length,errors:errors.length};
if (process.argv.includes('--csv')) {
  const quote = s => '"' + String(s ?? '').replace(/"/g,'""') + '"';
  const rows = [['sku_id','brand_id','collection_id','category','reference_price_clp','art_status','physical_sample_status'],...products.map(p=>[
    p.id,p.brand,p.collection,p.category,p.price,
    p.print?.svg ? 'arte_para_prueba_no_validado' : 'conciliar_con_mockup',
    'muestra_pendiente'
  ])];
  process.stdout.write(rows.map(row=>row.map(quote).join(',')).join('\n')+'\n');
} else {
  console.log('ARCHIVO Brand Office | auditoría:',JSON.stringify(counts));
  if (errors.length) console.error(errors.map((e,i)=>`${i+1}. ${e}`).join('\n'));
  else console.log('OK: correspondencia catálogo ↔ registro ↔ 12 biblias; no verifica producción física ni derechos.');
}
if (errors.length) process.exitCode=1;
