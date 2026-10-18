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
  for (const file of ['styles.css', 'catalog.js', 'app.js', 'escapes.js']) {
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
  await fs.writeFile(path.join(destination, '.nojekyll'), '');
  console.log('Pages: catálogo estático generado en _site/. Sin servidor, panel ni datos de solicitudes.');
}
build().catch((error) => { console.error(error); process.exitCode = 1; });
