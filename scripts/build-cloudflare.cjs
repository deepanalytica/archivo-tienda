// Public storefront build for Cloudflare Pages.
// Keeps the private source and print masters private while publishing only editorial/catalogue assets.
'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
const read = name => fs.readFile(path.join(output,name), 'utf8');
const write = (name,content) => fs.writeFile(path.join(output,name),content,'utf8');
const mustReplace = (source,target,replacement,label) => {
  if (!source.includes(target)) throw new Error('No se encontró marcador público: '+label);
  return source.replace(target,replacement);
};

async function main(){
  execFileSync(process.execPath,[path.join(__dirname,'build-pages.cjs')],{cwd:root,stdio:'inherit'});

  // Print masters are intellectual property. Shipping these from a private repository
  // would make them publicly downloadable from the CDN.
  for (const dir of ['assets/prints','assets/trims']) {
    await fs.rm(path.join(output,dir),{recursive:true,force:true});
  }

  // Remove the production/download affordances from the deployed catalogue.
  // Keep in the private source catalog.js: it is still useful for approved workshop production.
  let catalog=await read('catalog.js');
  catalog+='\n;(function(){const c=globalThis.ARCHIVO_CATALOG;if(!c)return;for(const p of c.products){delete p.print;delete p.secondaryPrint;delete p.trims;}for(const b of Object.values(c.brands)){delete b.finishes;}})();\n';
  await write('catalog.js',catalog);

  // Studio remains an editorial destination, but prepress studies are not distributed.
  let estudio=await read('estudio.html');
  const start=estudio.indexOf('<section class="section laboratory" id="taller">');
  const end=estudio.indexOf('</section>',start);
  if(start<0||end<=start)throw new Error('Studio lab section not found: review export before deploying');
  estudio=estudio.slice(0,start)+estudio.slice(end+'</section>'.length);
  estudio=mustReplace(estudio,'<span>03 / PIEZAS DE CADA MARCA</span>','<span>02 / PIEZAS DE CADA MARCA</span>','studio section numbering');
  estudio=estudio.replace('sus propios colecciones','sus propias colecciones');
  await write('estudio.html',estudio);

  let estudioJS=await read('estudio.js');
  const labStart=estudioJS.indexOf(' const own=key==="ownform";');
  const labEnd=estudioJS.indexOf(' const grid=get("brand-products");',labStart);
  if(labStart<0||labEnd<=labStart)throw new Error('Studio prepress bindings changed: review before publishing');
  estudioJS=estudioJS.slice(0,labStart)+estudioJS.slice(labEnd);
  await write('estudio.js',estudioJS);

  // Public Pages is a curated catalogue and selection flow, not a completed checkout.
  let index=await read('index.html');
  index=mustReplace(index,'<span>PRECIOS REFERENCIALES · SOLICITUDES SIN COBRO</span>','<span>CATÁLOGO EN DESARROLLO · SIN COBROS EN LÍNEA</span>','checkout claim');
  await write('index.html',index);

  console.log('PUBLIC BUILD: _site/ listo para Cloudflare Pages. Sin originales de imprenta, panel, servidores ni archivos internos.');
}
main().catch(error=>{console.error(error);process.exitCode=1});
