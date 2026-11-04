/* Browser regression: recruiter portfolio, mobile interactions, and gallery overview.
   Executed after the static Pages build; screenshots are build artifacts, not claims of pixel-perfect visual QA. */
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');

const root=path.resolve(__dirname,'..','_site');
const out=path.resolve(__dirname,'..','portfolio-qa');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.json':'application/json','.woff2':'font/woff2'};
let server,browser;
async function startServer(){
 server=http.createServer(async(req,res)=>{
  try{
   const u=new URL(req.url,'http://127.0.0.1');
   const name=decodeURIComponent(u.pathname);
   const filename=path.resolve(root,'.'+name,(name.endsWith('/')?'index.html':''));
   if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return;}
   const buffer=await fs.readFile(filename);
   res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store'});
   res.end(buffer);
  }catch{res.writeHead(404).end('Not found');}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 return 'http://127.0.0.1:'+server.address().port;
}
async function main(){
 await fs.mkdir(out,{recursive:true});
 const url=await startServer();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
  const context=await browser.newContext({
    viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce',locale:'es-CL'
  });
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url+'/portafolio/original.html',{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('#estudio').waitFor({state:'visible'});
  assert.equal(await page.locator('#caso-archivo .brand-mosaic .mosaic-tile').count(),12,'All 12 brand examples required');
  assert.equal(await page.locator('#caso-wal .wal-mosaic .mosaic-tile').count(),6,'All 6 WAL campaigns required');
  assert.equal(await page.locator('.collection-list span').count(),16,'All 16 ARCHIVO collections required');
  assert.equal(await page.locator('.experience-step').count(),4,'Four interactive stages required');
  assert.match(await page.locator('.hero h1').innerText(),/análisis de datos/i,'Data-centered professional positioning must be visible');
  assert.ok(await page.locator('a[href^="https://wa.me/"]').count()>=2,'Direct WhatsApp contact');
  const sectionOrder=await page.locator('main > section').evaluateAll(nodes=>nodes.map(n=>n.id));
  assert.deepEqual(sectionOrder.slice(0,3),['inicio','laboratorio','casos'],'Project gallery must be first');
  assert.equal(await page.locator('.arsenal-card').count(),18,'All project cards retained');
  assert.equal(await page.locator('#project-gallery .arsenal-card:visible').count(),6,'Six featured projects on first load');
  assert.equal(await page.locator('.profile-expand').getAttribute('open'),null,'Detailed biography should start collapsed');
  assert.equal(await page.locator('.gobernanza-expand').getAttribute('open'),null,'Detailed AI governance starts collapsed');
  assert.equal(await page.locator('.gallery-method').getAttribute('open'),null,'Extra credentials and method must start collapsed');
  await page.addStyleTag({content:'.site-header{position:static!important}'});
  await page.locator('#laboratorio').screenshot({path:path.join(out,name+'-gallery-first.png'),animations:'disabled',timeout:30000});
  await page.locator('#project-gallery .arsenal-card:visible').first().locator('summary').click();
  assert.ok(await page.locator('#project-gallery .arsenal-card:visible').first().locator('.arsenal-details').getAttribute('open')!==null,
    'Project evidence must expand on click');
  await page.locator('.arsenal-filter[data-filter="all"]').click();
  assert.equal(await page.locator('#project-gallery .arsenal-card:visible').count(),18,'All projects available on demand');
  assert.ok(!(await page.locator('#project-gallery').evaluate(n=>n.classList.contains('is-featured'))),
    'All mode must show a grid');
  await page.locator('.arsenal-filter[data-filter="featured"]').click();
  assert.equal(await page.locator('#project-gallery .arsenal-card:visible').count(),6,'Featured mode restored');
  await page.locator('.estudio-expand > summary').click();
  assert.ok(await page.locator('.estudio-expand').evaluate(n=>n.open),'Interactive studio must open');

  await page.locator('#experience-step-1').click();
  assert.equal(await page.locator('#experience-step-1').getAttribute('aria-selected'),'true','Stage selection update');
  assert.match(await page.locator('#experience-title').innerText(),/consulta|contexto/i,'Content changes after stage');
  await page.locator('#experience-step-1').press('ArrowRight');
  assert.equal(await page.locator('#experience-step-2').getAttribute('aria-selected'),'true','Keyboard next stage');
  await page.locator('.experience-storyboard summary').click();
  assert.equal(await page.locator('.experience-storyboard-grid img').count(),3,'Original campaign story cards');
  const campaignReady=await page.locator('#caso-archivo .brand-mosaic .slide-visual > img').evaluateAll(async images=>{
    return Promise.all(images.map(async image=>{
      image.loading='eager';
      try{await image.decode();return image.naturalWidth>0&&image.naturalHeight>0;}
      catch{return false;}
    }));
  });
  assert.equal(campaignReady.length,12,'All ARCHIVO images present');
  assert.ok(campaignReady.every(Boolean),'Some ARCHIVO campaign images did not decode');
  const motionReady=await page.locator('.experience-storyboard-grid .experience-shot-image > img').evaluateAll(async images=>{
    return Promise.all(images.map(async image=>{
      image.loading='eager';
      try{await image.decode();return image.naturalWidth>0&&image.naturalHeight>0;}
      catch{return false;}
    }));
  });
  assert.ok(motionReady.every(Boolean),'Some storyboard images did not decode');
  // Screenshots of a full section should not contain an artificially fixed
  // header halfway through the crop; functional navigation was tested first.
  await page.addStyleTag({content:'.site-header{position:static!important}'});
  const frame=page.locator('#estudio');
  await frame.screenshot({path:path.join(out,name+'-experience.png'),animations:'disabled',timeout:30000});
  if(name==='desktop'){
   await page.locator('#caso-archivo').screenshot({path:path.join(out,'desktop-archivo.png'),animations:'disabled',timeout:30000});
  }
  if(name==='mobile'){
   const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
   assert.ok(overflow.scrollWidth<=overflow.viewport+3,'Unexpected horizontal overflow: '+JSON.stringify(overflow));
  }
  // Existing viewer still opens; full-screen image should remain uncropped.
  const first=page.locator('#caso-archivo .view-entire-image').first();
  await first.waitFor({state:'attached'});
  await first.click();
  assert.ok(await page.locator('dialog.portfolio-lightbox').isVisible(),'Full image preview must open');
  await page.locator('button.lightbox-close').click();
  assert.ok(!(await page.locator('dialog.portfolio-lightbox').isVisible()),'Full image preview must close');
  assert.deepEqual(errors,[],'Browser page errors: '+errors.join('; '));

  // Evidence-first narrative, agency profile, real Rust rules, and project dossiers.
  assert.ok(await page.locator('#perfil').isVisible(),'Professional biography missing');
  assert.ok(await page.locator('#gobernanza').isVisible(),'Rust governance narrative missing');
  assert.equal(await page.locator('.profile-areas a').count(),8,'Eight interdisciplinary capabilities');
  assert.equal(await page.locator('.arsenal-card .arsenal-dossier-link').count(),18,'Every project must link to its decision dossier');
  await page.locator('#perfil').screenshot({path:path.join(out,name+'-profile.png'),animations:'disabled',timeout:30000});
  await page.locator('.profile-expand > summary').click();
  assert.ok(await page.locator('.profile-expand').evaluate(n=>n.open),'Profile details can be expanded');
  await page.locator('#gobernanza').screenshot({path:path.join(out,name+'-governance.png'),animations:'disabled',timeout:30000});
  await page.locator('.gobernanza-expand > summary').click();
  assert.ok(await page.locator('.gobernanza-expand').evaluate(n=>n.open),'Governance diagram can be expanded');
  await page.goto(url+'/portafolio/criterio/',{waitUntil:'domcontentloaded',timeout:30000});
  await page.addStyleTag({content:'.site-header{position:static!important}'});
  assert.equal(await page.locator('.practice-item').count(),8,'Eight documented disciplines');
  assert.equal(await page.locator('.dossier').count(),18,'All 18 project dossiers present');
  assert.equal(await page.locator('.feature').count(),3,'Creative case studies documented');
  assert.ok(await page.locator('#rust').isVisible(),'Rust decision gate dossier available');
  await page.locator('[data-category-filter="ia"]').click();
  assert.equal(await page.locator('.dossier:visible').count(),7,'Seven agent governance entries');
  await page.locator('#search-project').fill('Meta Harness');
  assert.ok(await page.locator('.dossier:visible').count()>=1,'Dossier search should locate Meta Harness');
  await page.locator('#search-project').fill('');
  await page.locator('[data-category-filter="all"]').click();
  assert.equal(await page.locator('.dossier:visible').count(),18,'Filtering restores full dossier');
  await page.locator('#perfil').screenshot({path:path.join(out,name+'-dossier-intro.png'),animations:'disabled',timeout:30000});
  await page.locator('#rust').screenshot({path:path.join(out,name+'-rust.png'),animations:'disabled',timeout:30000});
  if(name==='mobile'){
    const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
    assert.ok(overflow.scrollWidth<=overflow.viewport+3,'Dossier mobile overflow: '+JSON.stringify(overflow));
  }
  assert.deepEqual(errors,[],'Browser page errors after dossier navigation');
  results.push({name,width,height,brands:12,collections:16,campaigns:6,errors:errors.length});
  await context.close();
 }
 // Observe progressive engines on a normal-motion desktop without making
 // remote CDN availability an essential condition for recruiters.
 const enhancedContext=await browser.newContext({
   viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'no-preference',locale:'es-CL'
 });
 const enhanced=await enhancedContext.newPage();
 const enhancedErrors=[];
 enhanced.on('pageerror',e=>enhancedErrors.push(e.message));
 await enhanced.goto(url+'/portafolio/original.html',{waitUntil:'domcontentloaded',timeout:30000});
 await enhanced.locator('.estudio-expand > summary').click();
 await enhanced.locator('#estudio').scrollIntoViewIfNeeded();
 await enhanced.waitForTimeout(5200);
 const threeLoaded=await enhanced.locator('#experience-canvas-frame[data-visual-engine="threejs"] canvas').count()>0;
 const gsapLoaded=await enhanced.locator('.experience-board[data-motion-engine="gsap-scrolltrigger"]').count()>0;
 await enhanced.addStyleTag({content:'.site-header{position:static!important}'});
 await enhanced.locator('#estudio').screenshot({path:path.join(out,'desktop-enhancement-preview.png'),animations:'disabled',timeout:30000});
 assert.deepEqual(enhancedErrors,[],'Enhanced desktop script errors');
 results.push({name:'optional-engines',threeLoaded,gsapLoaded,errors:enhancedErrors.length});
 await enhancedContext.close();
 await fs.writeFile(path.join(out,'summary.json'),JSON.stringify(results,null,2));
 console.log('PASS portfolio Playwright QA',JSON.stringify(results));
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{
 try{await browser?.close();}catch{}
 try{await new Promise(resolve=>server?.close(resolve)||resolve());}catch{}
});
