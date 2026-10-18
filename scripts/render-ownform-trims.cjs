const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

async function render() {
  const root = path.resolve(__dirname, '..');
  const directory = path.join(root, 'assets/trims/ownform');
  const output = path.join(root, 'output/ownform-trims');
  await fs.mkdir(output, { recursive: true });
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
  for (const item of manifest) {
    const width = Math.round(item.widthMm / 25.4 * item.rasterDpi);
    const height = Math.round(item.heightMm / 25.4 * item.rasterDpi);
    await sharp(path.join(directory, `${item.id}.svg`)).resize(width, height).withMetadata({ density: 300 }).png().toFile(path.join(directory, `${item.id}.png`));
    await sharp(path.join(directory, `${item.id}.svg`)).resize({ width: item.widthMm >= 100 ? 1100 : 800 }).flatten({ background: item.previewBackground }).png().toFile(path.join(output, `${item.id}-preview.png`));
  }
  console.log(`Rendered ${manifest.length} transparent 300ppi print rasters and material previews.`);
}

render().catch((error) => { console.error(error); process.exitCode = 1; });
