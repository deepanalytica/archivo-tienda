const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

const photos = [
  'products/ownform-signal-bloom-tee',
  'products/ownform-root-system-tee',
  'products/ownform-free-frequency-tee',
  'products/ownform-refract-isles-hoodie',
  'products/ownform-refract-isles-front',
  'products/ownform-open-horizon-tee',
  'products/ownform-little-elsewhere-tee',
  'brands/ownform-other-nature-campaign',
  'brands/ownform-other-nature-editorial',
];

async function main() {
  for (const photo of photos) {
    const base = path.resolve(__dirname, '..', 'assets', photo);
    await sharp(`${base}.png`).resize({ width: photo.includes('campaign') ? 1800 : 1200, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(`${base}.webp`);
  }
  console.log(`OTHER NATURE: ${photos.length} photographic mockups optimized.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
