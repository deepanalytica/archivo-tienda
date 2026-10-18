const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const catalog = require('./catalog.js');

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
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.ttf': 'font/ttf' };
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
      await context.addInitScript(() => {
        window.__archivoScrollBehaviors = [];
        const scrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function(options) {
          window.__archivoScrollBehaviors.push(options?.behavior);
          return scrollIntoView.call(this, options);
        };
      });
      const page = await context.newPage();
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => { if (new URL(request.url()).pathname.includes('/api/')) apiRequests.push(request.url()); });
      await page.goto(base);
      await page.waitForFunction((count) => document.querySelectorAll('.product-card').length === count, Math.min(12, catalog.products.length));
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
      });
      assert.deepEqual(await page.evaluate(() => [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src)), []);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      assert.equal(await page.locator('a[href="admin.html"]').count(), 0);
      assert.equal(await page.locator('#hero-brands button').count(), Object.keys(catalog.brands).length);
      assert.equal(await page.locator('#brand-editorials article').count(), Object.keys(catalog.brands).length);
      assert.equal(await page.locator('#collection-tabs button').count(), Object.keys(catalog.collections).length);
      await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
      await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true });
      await page.locator('#search').focus();
      assert.equal(await page.locator('#search').evaluate((input) => getComputedStyle(input).outlineStyle), 'solid');
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.matches('.product-open')), true);
      assert.equal(await page.locator('.product-open').first().evaluate((button) => Number.parseFloat(getComputedStyle(button).outlineOffset) < 0), true);
      await page.locator('.product-picture').first().screenshot({ path: path.join(output, `${name}-keyboard.png`) });
      for (const [id, escape] of Object.entries(catalog.destinations)) {
        await page.locator(`[data-escape="${id}"]`).click();
        assert.equal(await page.locator('#escape-stage h3').innerText(), escape.title);
        await page.locator('#escape-stage').screenshot({ path: path.join(output, `${name}-${id}.png`) });
        await page.locator(`[data-open-look="${id}"]`).click();
        await page.locator('#add-look').click();
        assert.match(await page.locator('#look-error').innerText(), /Elige una talla/);
        assert.equal(await page.locator('#cart-count').innerText(), '0');
        for (const productId of escape.look) {
          const product = catalog.products.find((item) => item.id === productId);
          if (product.sizes.length > 1) await page.locator(`[data-look-size="${productId}"]`).selectOption('M');
        }
        if (id === 'beach') await page.screenshot({ path: path.join(output, `${name}-look.png`) });
        await page.locator('#add-look').click();
        assert.equal(await page.locator('#cart-count').innerText(), '3');
        assert.equal(await page.locator('.cart-line').count(), 3);
        for (const productId of escape.look) {
          const product = catalog.products.find((item) => item.id === productId);
          const size = product.sizes.length > 1 ? 'M' : product.sizes[0];
          await page.getByRole('button', { name: `Quitar ${product.name}, talla ${size}`, exact: true }).click();
        }
        await page.getByRole('button', { name: 'Cerrar bolsa', exact: true }).click();
        await page.locator(`[data-destination-catalog="${id}"]`).click();
        assert.equal(await page.locator('#destination-filter').inputValue(), id);
        assert.equal(await page.locator('.product-card').count(), Math.min(12, catalog.products.filter((product) => catalog.brands[product.brand].destination === id).length));
        await page.locator('#clear-filters').click();
      }
      await page.locator('[data-escape="beach"]').click();
      await page.locator('[data-escape="beach"]').focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-escape="mountain"]').getAttribute('aria-selected'), 'true');
      await page.locator('[data-escape="beach"]').click();
      for (const category of ['Camisas', 'Shorts', 'Chaquetas']) {
        await page.locator('#category-filter').selectOption(category);
        assert.equal(await page.locator('.product-card').count(), catalog.products.filter((product) => product.category === category).length);
      }
      await page.locator('#clear-filters').click();
      while (await page.locator('#load-more').isVisible()) await page.locator('#load-more').click();
      assert.equal(await page.locator('.product-card').count(), catalog.products.length);
      await page.evaluate(async () => { for (const image of document.querySelectorAll('#product-grid img')) { image.loading = 'eager'; await image.decode(); } });
      for (const [id, collection] of Object.entries(catalog.collections)) {
        await page.locator(`[data-explore-collection="${id}"]`).click();
        assert.equal(await page.locator('#collection-feature h3').innerText(), collection.name);
        await page.locator('#collection-feature [data-collection]').click();
        assert.equal(await page.locator('.product-card').count(), catalog.products.filter((product) => product.collection === id).length);
        assert.equal(await page.locator('#collection-filter').inputValue(), id);
      }
      await page.locator('#clear-filters').click();
      for (const [id, brand] of Object.entries(catalog.brands)) {
        await page.locator(`#hero-brands [data-campaign="${id}"]`).click();
        assert.match(await page.locator('#hero-sub').innerText(), new RegExp(brand.name));
        await page.locator(`#brand-editorials [data-brand-story="${id}"]`).first().click();
        assert.equal(await page.locator('#brand-title').innerText(), brand.name);
        assert.equal(await page.locator('#brand-dialog .brand-palette span').count(), 3);
        if (id === 'orbita') await page.screenshot({ path: path.join(output, `${name}-brand.png`) });
        await page.getByRole('button', { name: 'Cerrar universo de marca' }).click();
      }
      await page.locator('#hero-brands [data-campaign="solar"]').click();
      await page.locator('.brand-filters [data-filter-brand="solar"]').click();
      assert.equal(await page.locator('.product-card').count(), 3);
      await page.getByRole('button', { name: 'Ver Polera Mediodía de SOLAR CLUB', exact: true }).click();
      assert.equal(await page.locator('[data-view="detail"]').isVisible(), false);
      await page.getByRole('button', { name: 'Campaña', exact: true }).click();
      assert.match(await page.locator('#detail-image').getAttribute('src'), /solar-campaign/);
      await page.getByRole('button', { name: 'Talla L', exact: true }).click();
      await page.getByRole('button', { name: /Agregar a la bolsa/ }).click();
      assert.equal(await page.locator('#cart-count').innerText(), '1');
      await page.getByRole('button', { name: 'Quitar Polera Mediodía, talla L', exact: true }).click();
      await page.getByRole('button', { name: 'Cerrar bolsa', exact: true }).click();
      assert.equal(await page.evaluate(() => window.__archivoScrollBehaviors.length > 0 && window.__archivoScrollBehaviors.every((behavior) => behavior === 'auto')), true);
      await page.locator('#clear-filters').click();
      await page.locator('.brand-filters [data-filter-brand="neblina"]').click();
      assert.equal(await page.locator('.product-card').count(), catalog.products.filter((product) => product.brand === 'neblina').length);
      await page.locator('#search').fill('ninguna-coincidencia');
      assert.equal(await page.locator('.product-card').count(), 0);
      await page.getByRole('button', { name: 'Ver toda la selección' }).click();
      while (await page.locator('#load-more').isVisible()) await page.locator('#load-more').click();
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
      results.push({ viewport: name, catalog: `${catalog.products.length} products / progressive loading`, brands: `${Object.keys(catalog.brands).length} stories and campaigns`, collections: `${Object.keys(catalog.collections).length} filters verified`, escapes: '3 looks / required sizes / complete cart additions', images: 'all decoded', cart: 'new and original brands / persisted', download: 'accurate / no submission', projectSubpath: 'ok' });
    }
    const motionContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
    const motionPage = await motionContext.newPage();
    motionPage.on('pageerror', (error) => errors.push(error.message));
    motionPage.on('request', (request) => { if (new URL(request.url()).pathname.includes('/api/')) apiRequests.push(request.url()); });
    await motionPage.goto(base);
    await motionPage.locator('#ticker-destinations').scrollIntoViewIfNeeded();
    await motionPage.mouse.move(1, 1);
    await motionPage.waitForFunction(() => document.querySelector('#ticker-destinations').dataset.running === 'true');
    const initialTransform = await motionPage.locator('#ticker-destinations .ticker-track').evaluate((track) => getComputedStyle(track).transform);
    await motionPage.waitForFunction((initial) => getComputedStyle(document.querySelector('#ticker-destinations .ticker-track')).transform !== initial, initialTransform);
    await motionPage.locator('#motion-toggle').click();
    assert.equal(await motionPage.locator('#ticker-destinations').getAttribute('data-running'), 'false');
    assert.equal(await motionPage.locator('#ticker-destinations .ticker-track').evaluate((track) => getComputedStyle(track).animationPlayState), 'paused');
    await motionPage.locator('#motion-toggle').click();
    await motionPage.waitForFunction(() => document.querySelector('#ticker-destinations').dataset.running === 'true');
    await motionPage.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
    await motionPage.waitForFunction(() => document.querySelector('#ticker-destinations').dataset.running === 'false');
    await motionPage.emulateMedia({ reducedMotion: 'reduce' });
    await motionPage.waitForFunction(() => document.querySelector('#motion-toggle').disabled);
    assert.equal(await motionPage.locator('#motion-toggle').isDisabled(), true);
    assert.equal(await motionPage.locator('#ticker-destinations .ticker-track').evaluate((track) => getComputedStyle(track).animationName), 'none');
    await motionPage.evaluate(() => localStorage.setItem('archivo-cart-v1', JSON.stringify([{ id: 'salitre-shirt', size: 'M', quantity: 10 }])));
    await motionPage.reload();
    await motionPage.locator('[data-open-look="beach"]').click();
    await motionPage.locator('[data-look-size="salitre-shirt"]').selectOption('M');
    await motionPage.locator('[data-look-size="salitre-shorts"]').selectOption('M');
    await motionPage.locator('#add-look').click();
    assert.match(await motionPage.locator('#look-error').innerText(), /máximo de 10/);
    assert.deepEqual(await motionPage.evaluate(() => JSON.parse(localStorage.getItem('archivo-cart-v1'))), [{ id: 'salitre-shirt', size: 'M', quantity: 10 }]);
    await motionPage.evaluate((items) => localStorage.setItem('archivo-cart-v1', JSON.stringify(items)), catalog.products.map((product) => ({ id: product.id, size: product.sizes[0], quantity: 1 })));
    await motionPage.reload();
    assert.equal(await motionPage.locator('#cart-count').innerText(), String(catalog.products.length));
    await motionPage.locator('#cart-toggle').click();
    assert.equal(await motionPage.locator('.cart-line').count(), catalog.products.length);
    await motionContext.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(apiRequests, []);
    const report = { results, motion: 'runs when visible / manual pause / stops offscreen / reduced motion respected', outfitLimit: 'atomic rejection at maximum quantity', expandedCart: `${catalog.products.length} lines persist after reload`, errors, apiRequests, privateFiles: 'excluded' };
    await fs.writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
