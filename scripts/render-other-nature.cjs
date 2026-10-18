const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

(async () => {
  const root = path.resolve(__dirname, '..');
  const previews = path.join(root, 'output/other-nature');
  await fs.mkdir(previews, { recursive: true });
  for (const folder of ['prints', 'trims']) {
    const directory = path.join(root, 'assets', folder, 'other-nature');
    const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
    for (const item of manifest) {
      const width = Math.round(item.widthMm / 25.4 * 300), height = Math.round(item.heightMm / 25.4 * 300);
      await sharp(path.join(directory, `${item.id}.svg`)).resize(width, height).withMetadata({ density: 300 }).png().toFile(path.join(directory, `${item.id}.png`));
      await sharp(path.join(directory, `${item.id}.svg`)).resize({ width: 1100 }).flatten({ background: item.previewBackground }).png().toFile(path.join(previews, `${item.id}-preview.png`));
    }
    console.log(`${folder}: ${manifest.length} transparent 300ppi rasters and previews`);
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
