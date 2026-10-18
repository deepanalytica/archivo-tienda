"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.join(__dirname,"..","_site");
const read=relative=>fs.readFileSync(path.join(root,relative),"utf8");
const index=read("index.html");
const studio=read("estudio.html");
for(const p of ["archivo-platform.css","assets/identities/archivo-symbol.svg","assets/identities/archivo-lockup.svg","assets/identities/archivo-favicon.svg","assets/identities/archivo-grid.svg","estudio.html"]){
 assert(fs.existsSync(path.join(root,p)),"Falta publicar: "+p);
}
const segment=index.split('<section class="hero archivo-home-hero"')[1]?.split('<section class="brand-line"')[0];
assert(segment,"Portada de casa editorial ausente");
assert.equal((segment.match(/<h1\b/g)||[]).length,1,"Solo un H1 de marca madre");
assert.equal((segment.match(/archivo-wordmark\.svg/g)||[]).length,0,"Wordmark duplicado en hero");
assert.equal((segment.match(/id="hero-image"/g)||[]).length,1);
assert.equal((segment.match(/id="hero-cta"/g)||[]).length,1);
assert.equal((segment.match(/id="hero-sub"/g)||[]).length,1);
assert.equal((segment.match(/id="hero-title"/g)||[]).length,1);
assert.equal((segment.match(/id="hero-brands"/g)||[]).length,1);
assert(index.includes('class="logo archivo-lockup"')&&index.includes('assets/identities/archivo-lockup.svg'),"Logo institucional no instalado");
assert(index.includes('href="estudio.html"'),"Estudio no enlazado");
assert(index.includes('id="archivo-curation-heading"'));
assert(index.includes('id="destacados"'),"No hay selección de producto en inicio");
assert(index.includes('id="archivo-shop-products"'),"No existe rejilla de prendas destacadas");
assert(index.includes('href="archivo-premium.css"'),"No se ha importado la capa premium");
assert(index.includes('src="archivo-premium.js"'),"No se ha importado el catálogo destacado");
assert(!index.includes('class="archivo-platform-main"'),"Manifiesto institucional largo todavía en hero");
assert(!index.includes('class="archivo-manifesto-strip"'),"Tira de manifiesto corporativo todavía arriba");
assert(index.includes('class="hero archivo-home-hero"'),"Hero comercial no encontrado");
assert(read("assets/identities/archivo-lockup.svg").includes('translate(1 79) scale(.105 -.105)'),"Firma editorial vectorial no instalada");
assert(read("film-look.css").includes('.archivo-editorial-card img'),"Falta color grading en campañas con modelos");
for(const p of ["archivo-premium.css","archivo-premium.js"]){assert(fs.existsSync(path.join(root,p)),"Recurso premium no desplegado: "+p);}

assert.equal((index.match(/class="archivo-editorial-card archivo-editorial-card-/g)||[]).length,3);
for(const brand of ["imago","salitre","logic"]){assert(index.includes('estudio.html?marca='+brand),"Curaduría no enlaza "+brand);}
assert(studio.includes("archivo-lockup.svg")&&studio.includes("archivo-favicon.svg"),"Identidad institucional no sincronizada con el estudio");
for(const file of ["archivo-symbol.svg","archivo-lockup.svg","archivo-favicon.svg","archivo-grid.svg"]){
const svg=read("assets/identities/"+file);
assert(svg.includes('xmlns="http://www.w3.org/2000/svg"'),"SVG inválido "+file);
assert(svg.includes("viewBox="),"SVG sin escala "+file);
}
assert(!fs.existsSync(path.join(root,"admin.html")),"Panel administrativo desplegado");
console.log("OK: marca madre, logo singular, portada, curaduría, recursos y privacidad de Pages.");
