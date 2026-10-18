const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const site=x=>path.join(__dirname,"_site",x);
for(const file of ["estudio.html","estudio.js","estudio.css"])assert(fs.existsSync(site(file)),file);
assert(fs.readFileSync(site("index.html"),"utf8").includes('href="estudio.html"'));
assert(fs.readFileSync(site("estudio.html"),"utf8").includes('lang="es"'));
for(const id of ["imago","umbral","neblina","logic","solar","marea","orbita","salitre","alto","limen","brava"]){
 for(const file of ["assets/prints/brand-lab/"+id+"/macro-study.svg","assets/trims/brand-lab/"+id+"/neck-m.svg","assets/trims/brand-lab/"+id+"/sleeve-signature.svg","assets/trims/brand-lab/"+id+"/hangtag-front.svg","assets/identities/"+id+"-signature.svg"])assert(fs.existsSync(site(file)),file);
}
for(const priv of ["admin.html","server.cjs","data/orders.json","docs/production/brand-program.json"])assert(!fs.existsSync(site(priv)),priv);
console.log("OK: estudio de 12 marcas y recursos gráficos publicados, sin datos privados.");
