const fs = require('node:fs/promises');
const path = require('node:path');

async function build() {
  const root = path.resolve(__dirname, '..');
  const destination = path.join(root, '_site');
  // Only this fixed generated directory is replaced. Orders and originals stay outside it.
  await fs.rm(destination, { recursive: true, force: true });
  await fs.mkdir(destination, { recursive: true });
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  if (!html.includes('<html lang="es">')) throw new Error('No se encontró la etiqueta raíz para configurar Pages.');
  await fs.writeFile(path.join(destination, 'index.html'), html.replace('<html lang="es">', '<html lang="es" data-store-mode="static">'));
  for (const file of ['styles.css', 'identities.css', 'editorial.css', 'film-look.css', 'catalog.js', 'identities.js', 'app.js', 'escapes.js', 'identity-ui.js', 'summer-editorial.js', 'estudio.html', 'estudio.css', 'estudio.js', 'archivo-platform.css']) {
    await fs.copyFile(path.join(root, file), path.join(destination, file));
  }
  for (const folder of ['brands', 'products']) {
    const target = path.join(destination, 'assets', folder);
    await fs.mkdir(target, { recursive: true });
    for (const file of await fs.readdir(path.join(root, 'assets', folder))) {
      if (file.endsWith('.webp')) await fs.copyFile(path.join(root, 'assets', folder, file), path.join(target, file));
    }
  }
  await fs.cp(path.join(root, 'assets', 'fonts'), path.join(destination, 'assets', 'fonts'), { recursive: true });
  const identities = path.join(destination, 'assets', 'identities');
  for (const type of ['prints', 'trims']) {
    for (const collection of ['ownform', 'other-nature']) {
      const source = path.join(root, 'assets', type, collection);
      const target = path.join(destination, 'assets', type, collection);
      await fs.mkdir(target, { recursive: true });
      for (const file of await fs.readdir(source)) {
        if (/^[a-z0-9-]+\.(svg|png)$/.test(file)) await fs.copyFile(path.join(source, file), path.join(target, file));
      }
    }
  }
  // Publicar sólo SVG vectoriales del laboratorio, nunca archivos administrativos.
  const labBrands=['imago','umbral','neblina','logic','solar','marea','orbita','salitre','alto','limen','brava'];
  for (const category of ['prints','trims']) {
    for(const id of labBrands){
      const origin=path.join(root,'assets',category,'brand-lab',id);
      const target=path.join(destination,'assets',category,'brand-lab',id);
      await fs.mkdir(target,{recursive:true});
      for(const name of await fs.readdir(origin)){
        if(name.endsWith('.svg')) await fs.copyFile(path.join(origin,name),path.join(target,name));
      }
    }
  }
  await fs.mkdir(identities, { recursive: true });
  for (const file of await fs.readdir(path.join(root, 'assets', 'identities'))) {
    if (file.endsWith('.svg')) await fs.copyFile(path.join(root, 'assets', 'identities', file), path.join(identities, file));
  }
  await fs.writeFile(path.join(destination, '.nojekyll'), '');
  console.log('Pages: catálogo estático generado en _site/. Sin servidor, panel ni datos de solicitudes.');
}
build().catch((error) => { console.error(error); process.exitCode = 1; });
