
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..','_site');
const out=path.resolve(__dirname,'..','portfolio-qa');
let server,browser;
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
async function start(){
 server=http.createServer(async(req,res)=>{
  try{const uri=new URL(req.url,'http://localhost').pathname;
   const url=decodeURIComponent(uri).replace(/^\/archivo-tienda(?=\/)/,'');
   const name=path.resolve(root,'.'+url,url.endsWith('/')?'index.html':'');
   if(!name.startsWith(root+path.sep)){res.writeHead(403).end();return;}
   const buf=await fs.readFile(name);res.writeHead(200,{'Content-Type':mime[path.extname(name)]||'application/octet-stream'}).end(buf);
  }catch(e){res.writeHead(404).end('Not Found');}
 });
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 return 'http://127.0.0.1:'+server.address().port+'/archivo-tienda/portafolio/';
}
async function run(){
 await fs.mkdir(out,{recursive:true});
 const base=await start();browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const [type,w,h] of [['desktop',1440,900],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.locator('.os-intro h1').waitFor({state:'visible'});
  assert.match(await page.locator('.os-intro h1').innerText(),/Ideas que.*funcionan/s);
  assert.equal(await page.locator('.os-card').count(),4,'Four visual projects must be inside CRT');
  assert.equal(await page.locator('.crt-glass-overlay').count(),1,'Glass layer missing');
  assert.ok(await page.locator('#crtUnit').isVisible(),'Physical CRT frame missing');
  await page.waitForFunction(()=>document.querySelector('#crtTerrain')?.width>100);
  const leaked=await page.evaluate(()=>[...document.querySelectorAll('a,button,input,select,textarea')].filter(el=>!el.closest('#shell')).map(el=>el.outerHTML.slice(0,120)));
  assert.deepEqual(leaked,[],'Interactive controls leaked outside CRT glass');
  await page.screenshot({path:path.join(out,'ar-'+type+'-home.png'),animations:'disabled',fullPage:true});
  await page.goto(base+'proyectos/',{waitUntil:'domcontentloaded'});
  await page.locator('.project-tile').first().waitFor();
  assert.equal(await page.locator('.project-tile').count(),18);
  await page.locator('[data-filter="data"]').click();
  assert.equal(await page.locator('.project-tile').count(),4,'Expected four territorial/data projects');
  await page.locator('[data-filter="all"]').click();
  await page.locator('#projectSearch').fill('Sin Humo');
  assert.equal(await page.locator('.project-tile').count(),1);
  await page.locator('#projectSearch').fill('');
  await page.locator('#viewList').click();
  assert.equal(await page.locator('.project-grid.list .project-tile').count(),18);
  await page.screenshot({path:path.join(out,'ar-'+type+'-projects.png'),animations:'disabled',fullPage:true});
  for(const [route,selector,n] of [['casos/archivo/','.media-mosaic figure',12],['casos/wal/','.media-mosaic figure',7]]){
   await page.goto(base+route,{waitUntil:'domcontentloaded'});
   await page.locator('.case-hero h1').waitFor({state:'visible'});
   assert.equal(await page.locator(selector).count(),n,'Original artwork must remain visible');
  }
  await page.goto(base+'metodo/',{waitUntil:'domcontentloaded'});
  await page.locator('[data-phase="3"]').click();
  assert.match(await page.locator('#methodPanel h2').innerText(),/Construir/);
  await page.goto(base+'laboratorio/',{waitUntil:'domcontentloaded'});
  await page.locator('[data-step="2"]').click();
  assert.match(await page.locator('#labPanel h3').innerText(),/Verificar/);
  for(const route of ['casos/','biblioteca/','perfil/','contacto/','proyectos/detalle/?id=deep-geo']){
   await page.goto(base+route,{waitUntil:'domcontentloaded'});
   await page.locator('#app h1').waitFor({state:'visible'});
   assert.ok((await page.locator('#app h1').innerText()).trim().length>1,'Missing heading '+route);
  }
  if(type==='mobile'){
   for(const route of ['','proyectos/','casos/archivo/','perfil/']){
    await page.goto(base+route,{waitUntil:'domcontentloaded'});
    await page.locator('#app h1').waitFor({state:'visible'});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    assert.ok(overflow<=3,'Horizontal overflow '+route+': '+overflow);
   }
  }
  assert.deepEqual(errors,[],'Browser script exceptions '+errors.join('; '));
  await context.close();
 }
 console.log('PASS AR Workstation browser QA: homepage, 18 project filters, editorial cases, lab, method, 8 routes, mobile.');
}
run().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{try{await browser?.close()}catch{}try{await new Promise(ok=>server?.close(ok)||ok())}catch{}});
