const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

(async () => {
  const root = path.join(__dirname, '_site');
  const prefix = '/archivo-tienda/';
  const output = path.join(__dirname, 'output', 'pages');
  await fs.mkdir(output, { recursive: true });
  // Simulate a project Pages site: no root-relative assets and no API fallback.
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (!url.pathname.startsWith(prefix) || req.method !== 'GET') { res.writeHead(404); res.end(); return; }
      const relative = decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html';
      const target = path.resolve(root, relative);
      if (!target.startsWith(root + path.sep)) { res.writeHead(404); res.end(); return; }
      const data = await fs.readFile(target);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp' };
      res.writeHead(200, { 'Content-Type': `${types[path.extname(target)] || 'application/octet-stream'}` });
      res.end(data);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}${prefix}`;
  let browser;
  const errors = [];
  const apiRequests = [];
  const results = [];
  try {
    for (const privatePath of ['admin.html', 'admin.js', 'server.cjs', 'data/orders.json', 'README.md']) {
      assert.equal((await fetch(base + privatePath)).status, 404, `${privatePath} must not be deployed`);
    }
    browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', acceptDownloads: true });
      const page = await context.newPage();
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => { if (new URL(request.url()).pathname.includes('/api/')) apiRequests.push(request.url()); });
      await page.goto(base);
      await page.waitForFunction(() => document.querySelectorAll('.product-card').length === 9);
      await page.evaluate(async () => {
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
      });
      assert.deepEqual(await page.evaluate(() => [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src)), []);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      assert.equal(await page.locator('a[href="admin.html"]').count(), 0);
      await page.locator('.brand-filters [data-filter-brand="neblina"]').click();
      assert.equal(await page.locator('.product-card').count(), 3);
      await page.locator('#search').fill('ninguna-coincidencia');
      assert.equal(await page.locator('.product-card').count(), 0);
      await page.getByRole('button', { name: 'Ver toda la selección' }).click();
      await page.locator('[data-save="umbral-tee"]').click();
      await page.getByRole('button', { name: 'Ver Polera Desfase de UMBRAL', exact: true }).click();
      await page.getByRole('button', { name: 'Talla M', exact: true }).click();
      await page.getByRole('button', { name: /Agregar a la bolsa/ }).click();
      await page.getByRole('button', { name: 'Cerrar bolsa', exact: true }).click();
      await page.getByRole('button', { name: 'Ver Gorro Módulo de WE ARE LOGIC', exact: true }).click();
      await page.getByRole('button', { name: /Agregar a la bolsa/ }).click();
      await page.reload();
      assert.equal(await page.locator('#favorite-count').innerText(), '1');
      assert.equal(await page.locator('#cart-count').innerText(), '2');
      await page.getByRole('button', { name: 'Abrir bolsa, 2 productos', exact: true }).click();
      await page.getByRole('button', { name: /Revisar mi selección/ }).click();
      assert.equal(await page.locator('#order-form input, #order-form textarea').count(), 0);
      assert.match(await page.locator('.checkout-intro').innerText(), /No se envía a la tienda/);
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: /Descargar mi selección/ }).click();
      const download = await downloadPromise;
      assert.match(download.suggestedFilename(), /^SELECCION-.*\.txt$/);
      const summary = await fs.readFile(await download.path(), 'utf8');
      assert.match(summary, /UMBRAL \/ Polera Desfase \/ M/);
      assert.match(summary, /WE ARE LOGIC \/ Gorro Módulo \/ Única/);
      assert.match(summary, /41[.,]980/);
      assert.match(summary, /No enviada a la tienda/);
      assert.doesNotMatch(summary, /solicitud recibida/);
      assert.equal(await page.locator('#checkout-success').isVisible(), false);
      assert.equal(await page.locator('#cart-count').innerText(), '2');
      await page.screenshot({ path: path.join(output, `${name}-selection.png`) });
      await context.close();
      results.push({ viewport: name, catalog: 'ok', images: 'ok', cart: 'persisted / mixed brands', download: 'accurate / no submission', projectSubpath: 'ok' });
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(apiRequests, []);
    const report = { results, errors, apiRequests, privateFiles: 'excluded' };
    await fs.writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
