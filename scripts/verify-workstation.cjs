// AR / Workstation — build-time regression (new public portfolio).
const fs=require('node:fs');const assert=require('node:assert/strict');const cp=require('node:child_process');
const root='_site/portafolio';
const file=p=>fs.readFileSync(root+'/'+p,'utf8');
const pages=['index.html','proyectos/index.html','proyectos/detalle/index.html','casos/index.html','casos/archivo/index.html','casos/wal/index.html','casos/visual-art-ai/index.html','laboratorio/index.html','metodo/index.html','biblioteca/index.html','perfil/index.html','contacto/index.html'];
for(const page of pages){let s=file(page);assert.ok(s.includes('lang="es-CL"'),'lang missing '+page);assert.ok(s.includes('workstation/app.js'),'script missing '+page);assert.ok(s.includes('workstation/workstation.css'),'CSS missing '+page);assert.ok(s.includes('workstation'),'shell missing '+page);}
const data=JSON.parse(file('workstation/catalog.json'));
assert.equal(data.projects.length,18,'catalog must preserve 18 projects');assert.equal(new Set(data.projects.map(p=>p.id)).size,18,'duplicate projects');assert.equal(data.cases.length,3,'three commercial cases');
for(const p of data.projects){const path='ar-assets/covers/cover-'+p.id+'.svg';assert.ok(fs.existsSync(root+'/'+path),'Missing cover: '+path);assert.ok(p.problem&&p.approach&&p.proof&&p.status,'Incomplete provenance: '+p.id);assert.ok(file(path).includes('ILUSTRACIÓN CONCEPTUAL'),'Visual provenance missing: '+path)}
for(const c of data.cases){assert.ok(c.hero&&c.problem&&c.approach&&c.proof,'Incomplete commercial case '+c.id);if(!c.hero.startsWith('http'))assert.ok(fs.existsSync('_site/'+c.hero),'Missing local hero '+c.hero);}
const old=file('original.html');for(const s of ['id="inicio"','id="laboratorio"','id="casos"','id="gobernanza"','id="contacto"'])assert.ok(old.includes(s),'Legacy source lost '+s);
assert.ok(fs.existsSync(root+'/criterio/index.html'),'legacy dossier lost');assert.ok(fs.existsSync(root+'/proyectos/sin-humo/reader.js'),'300-page reader lost');assert.ok(fs.existsSync(root+'/proyectos/meta-harness/index.html'),'legacy Meta Harness dossier lost');
const css=file('workstation/workstation.css'),js=file('workstation/app.js');
for(const t of ['@media(max-width:560px)','prefers-reduced-motion','data-crt="off"','object-fit:contain'])assert.ok(css.includes(t),'Missing UX CSS '+t);
for(const t of ['aria-pressed','projectSearch','aria-live','window.print()','cover(p.id)','cases','sessionStorage'])assert.ok(js.includes(t),'Missing interactive contract '+t);
cp.execFileSync(process.execPath,['--check',root+'/workstation/app.js'],{stdio:'pipe'});
console.log('PASS AR Workstation static QA:',{pages:pages.length,projects:data.projects.length,cases:data.cases.length,covers:data.projects.length});