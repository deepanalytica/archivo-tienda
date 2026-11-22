const fs=require('node:fs');const assert=require('node:assert/strict');const cp=require('node:child_process');
const root='_site/auralis';const read=p=>fs.readFileSync(root+'/'+p,'utf8');
const html=read('index.html'),app=read('app.js'),sampler=read('sampler.js'),live=read('live.js'),sw=read('sw.js');
assert.ok(html.includes('id="view-live"'),'Live performance view missing');assert.ok(html.includes('id="liveChordPads"')&&html.includes('id="liveDrumPads"'),'Live pads missing');assert.ok(html.includes('id="smartMixApply"'),'Smart mix control missing');assert.ok(['supersaw','acid303','subbass'].every(p=>html.includes('value="'+p+'"')),'New synth patches missing');
assert.ok(html.includes('src="sampler.js"')&&html.includes('src="live.js"'),'Live audio scripts missing');
assert.ok(app.includes('window.AURALIS_API=')&&app.includes('AURALIS_LIVE')&&app.includes('onStep'),'App/live API integration missing');
const soundbank=read('soundbank.js');assert.ok(['afro_rim_alt','afro_perc_alt','house_rim_alt','house_crash_alt','edm_rim_alt','edm_crash_alt'].every(k=>soundbank.includes(k)),'Expanded drum alternates missing');
const manifest=JSON.parse(read('instrument-manifest.json'));assert.equal(manifest.sampleCount,172,'Expected curated 172-sample library');
const all=[];for(const inst of Object.values(manifest.instruments)){all.push(...(inst.samples||[]));for(const z of inst.strings||[])all.push(...z.samples)}assert.equal(all.length,172);
for(const s of all){const p=root+'/'+s.file;assert.ok(fs.existsSync(p),'Missing instrument sample '+s.file);const b=fs.readFileSync(p);assert.ok(b.length>1024&&b.subarray(0,4).toString()==='OggS','Invalid OGG '+s.file)}
cp.execFileSync(process.execPath,['--check',root+'/app.js'],{stdio:'pipe'});cp.execFileSync(process.execPath,['--check',root+'/sampler.js'],{stdio:'pipe'});cp.execFileSync(process.execPath,['--check',root+'/live.js'],{stdio:'pipe'});
console.log('PASS AURALIS v4 build QA:',{samples:all.length,instruments:Object.keys(manifest.instruments).length,live:true,smartMix:true});