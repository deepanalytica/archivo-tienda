#!/usr/bin/env node
// Render opcional: requiere Sharp instalado o SHARP_MODULE. No se ejecuta en Pages.
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
(async () => {
  let sharp;
  try { sharp = require(process.env.SHARP_MODULE || "sharp"); }
  catch { throw Error("Instala sharp localmente o indica SHARP_MODULE; no se añade al runtime público."); }
  const manifests = [
    { name: "prints", path: "assets/prints/brand-lab/manifest.json" },
    { name: "trims", path: "assets/trims/brand-lab/manifest.json" },
  ];
  const dir = path.join(root, "output", "production-renders");
  await fs.mkdir(dir, {recursive:true});
  for (const m of manifests) {
    const list = JSON.parse(await fs.readFile(path.join(root, m.path), "utf8"));
    for (const brand of list) {
      const assets = m.name === "prints" ? [brand.macro, brand.micro] : brand.files;
      for (const rel of assets) {
        const svg = await fs.readFile(path.join(root, rel), "utf8");
        const mm = svg.match(/width="(\d+)mm" height="(\d+)mm"/);
        if (!mm) throw Error("Dimensiones mm faltantes: "+rel);
        const w = Math.round(Number(mm[1])/25.4*300);
        const h = Math.round(Number(mm[2])/25.4*300);
        const dest = path.join(dir, rel.replace(/\//g, "--").replace(/\.svg$/, ".png"));
        await sharp(Buffer.from(svg)).resize(w,h).withMetadata({density:300}).png().toFile(dest);
      }
    }
  }
  console.log("PNG RGBA de 300 ppp generados en output/production-renders/ (archivos no versionados).");
})().catch(e => {console.error(e); process.exitCode = 1;});
