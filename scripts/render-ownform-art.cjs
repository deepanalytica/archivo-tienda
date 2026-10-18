/* Rasterize the native SVG artwork to explicit 300 ppi pixel dimensions. */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

async function render() {
  const root = path.resolve(__dirname, '..');
  const directory = path.join(root, 'assets', 'prints', 'ownform');
  const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
  for (const artwork of manifest) {
    const width = Math.round(artwork.widthMm / 25.4 * artwork.rasterDpi);
    const height = Math.round(artwork.heightMm / 25.4 * artwork.rasterDpi);
    const target = path.join(directory, `${artwork.id}.png`);
    await sharp(path.join(directory, `${artwork.id}.svg`))
      .resize(width, height)
      .withMetadata({ density: artwork.rasterDpi })
      .png()
      .toFile(target);
    const metadata = await sharp(target).metadata();
    if (metadata.width !== width || metadata.height !== height || !metadata.hasAlpha || metadata.density !== 300) {
      throw new Error(`Invalid print raster: ${artwork.id}`);
    }
    console.log(`${artwork.id}: ${width} x ${height}px, ${metadata.density}ppi, alpha`);
  }
}

render().catch((error) => { console.error(error); process.exitCode = 1; });
