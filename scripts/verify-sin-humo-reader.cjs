const fs=require('node:fs');const assert=require('node:assert/strict');const vm=require('node:vm');
const root='_site/portafolio/proyectos/sin-humo';
const html=fs.readFileSync(root+'/index.html','utf8');
const js=fs.readFileSync(root+'/reader.js','utf8');
new vm.Script(js,{filename:'reader.js'}); // syntax only
for(const token of ['id="book-content"','id="chapters-list"','id="search-results"','id="size-plus"','id="size-minus"','id="page-number"','src="./reader.js"','300 páginas','50 capítulos']){
 assert.ok(html.includes(token),'Reader missing '+token);
}
for(const chapter of ['Prólogo · La prohibición','La Factoría','El Tiburón','La Segunda Lectura','Un libro que se niega a terminar','Notas de edición']){
 assert.ok(js.includes(chapter),'Chapter index missing '+chapter);
}
const pages=[];
let totalChars=0;
for(let start=1;start<=300;start+=20){
 const path=root+'/reader/data/pages-'+String(start).padStart(3,'0')+'-'+String(start+19).padStart(3,'0')+'.json';
 const part=JSON.parse(fs.readFileSync(path,'utf8'));
 assert.equal(part.start,start);assert.equal(part.end,start+19);
 assert.equal(part.pages.length,20,'A missing PDF page batch '+start);
 for(const p of part.pages){
  assert.equal(p.n,pages.length+1,'Missing or out-of-order page');
  assert.equal(typeof p.t,'string');
  if(p.n>=8)assert.ok(p.t.trim().length>20,'Unexpectedly empty manuscript page '+p.n);
  totalChars+=p.t.length;
  pages.push(p);
 }
}
assert.equal(pages.length,300);
assert.ok(totalChars>300000,'Manuscript unexpectedly truncated');
assert.ok(pages[8].t.includes('No comenzó con una máquina'),'Prologue did not match original PDF');
assert.ok(pages[299].t.includes('NOTAS')||pages[299].t.includes('sin humo')||pages[299].t.length>50,'Last PDF page missing');
console.log('Sin Humo reader verified:',pages.length,'pages,',totalChars,'source characters. All sections linked and JS parses.');
