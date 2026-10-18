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
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.ttf': 'font/ttf', '.svg': 'image/svg+xml' };
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
      await page.waitForFunction((count) => document.querySelectorAll('.product-card').length === count, catalog.products.length);
      assert.equal(await page.locator('#collection-directory [data-collection]').count(), Object.keys(catalog.collections).length);
      assert.equal(await page.locator('#load-more').count(), 0);
      for (const [id] of Object.entries(catalog.collections)) {
        await page.locator(`#collection-directory [data-collection="${id}"]`).click();
        assert.equal(await page.locator('.product-card').count(), catalog.products.filter((product) => product.collection === id).length);
        assert.equal(await page.locator('#collection-filter').inputValue(), id);
        await page.locator('#show-all-products').click();
        assert.equal(await page.locator('.product-card').count(), catalog.products.length);
      }
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
      });
      assert.deepEqual(await page.evaluate(() => [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src)), []);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      assert.equal(await page.locator('#summer-tabs [role="tab"]').count(), 5);
      for (const id of ['resort', 'color', 'led', 'aesthetic', 'city']) {
        await page.locator(`#summer-tab-${id}`).click();
        assert.equal(await page.locator(`#summer-tab-${id}`).getAttribute('aria-selected'), 'true');
        assert.equal(await page.locator('#summer-panel').getAttribute('aria-labelledby'), `summer-tab-${id}`);
        assert.match(await page.locator('#summer-image').getAttribute('src'), new RegExp(`summer-${id}\\.webp$`));
        await page.locator('#summer-image').evaluate((image) => image.decode());
        assert.equal(await page.locator('#summer-image').evaluate((image) => getComputedStyle(image).objectFit), 'contain');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
        await page.locator('#summer-panel').screenshot({ path: path.join(output, `${name}-summer-${id}.png`) });
        const count = await page.locator('#summer-products button').count();
        assert.ok(count > 0);
        await page.locator('#summer-products button').first().click();
        assert.equal(await page.locator('#product-dialog').isVisible(), true);
        await page.getByRole('button', { name: 'Cerrar ficha de producto', exact: true }).click();
      }
      await page.locator('#summer-tab-resort').focus();
      await page.keyboard.press('End');
      assert.equal(await page.locator('#summer-tab-city').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('Home');
      assert.equal(await page.locator('#summer-tab-resort').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowLeft');
      assert.equal(await page.locator('#summer-tab-city').getAttribute('aria-selected'), 'true');
      await page.locator('#summer-next').click();
      assert.equal(await page.locator('#summer-counter').innerText(), '01 / 05');
      await page.locator('#summer-prev').click();
      assert.equal(await page.locator('#summer-counter').innerText(), '05 / 05');
      await page.locator('#summer-tab-resort').click();
      await page.evaluate(() => window.scrollTo(0, 0));
      assert.equal(await page.locator('a[href="admin.html"]').count(), 0);
      assert.equal(await page.locator('#hero-brands button').count(), Object.keys(catalog.brands).length);
      assert.equal(await page.locator('#brand-editorials article').count(), Object.keys(catalog.brands).length);
      assert.equal(await page.locator('#collection-tabs button').count(), Object.keys(catalog.collections).length);
      for (const image of await page.locator('.trim-editorial-grid img').all()) {
        const ratio = await image.evaluate((image) => image.getBoundingClientRect().height / image.getBoundingClientRect().width);
        assert.ok(Math.abs(ratio - 1) < 0.01, 'Finishing photographs retain their square framing');
      }
      await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
      await page.screenshot({ path: path.join(output, `${name}-full.png`), fullPage: true });
      await page.locator('#brand-line').screenshot({ path: path.join(output, `${name}-signatures.png`) });
      assert.equal(await page.locator('#identity-tabs [role="tab"]').count(), Object.keys(catalog.brands).length);
      assert.equal(await page.locator('.logo .archivo-descriptor').textContent(), 'Clothing & Art');
      assert.equal(await page.locator('#hero-image').evaluate((image) => getComputedStyle(image).objectPosition), name === 'desktop' ? '65% 0%' : '55% 0%');
      assert.equal(await page.locator('#hero-image').getAttribute('src'), name === 'desktop' ? catalog.brands.ownform.campaign : catalog.brands.ownform.mobileCampaign);
      assert.equal(await page.locator('.nature-chapters>div').count(), 4);
      assert.equal(await page.locator('.nature-pieces button').count(), 6);
      await page.locator('#other-nature').screenshot({ path: path.join(output, `${name}-other-nature.png`) });
      await page.locator('#other-nature [data-collection="other-nature"]').click();
      assert.equal(await page.locator('.product-card').count(), 6);
      await page.locator('#clear-filters').click();
      assert.equal(await page.locator('body').evaluate((body) => getComputedStyle(body, '::after').pointerEvents), 'none');
      assert.match(await page.locator('.product-open img').first().evaluate((image) => getComputedStyle(image).filter), /#film-product/);
      assert.match(await page.locator('#hero-image').evaluate((image) => getComputedStyle(image).filter), /#film-editorial/);
      assert.equal(await page.locator('.film-filter-library').getAttribute('aria-hidden'), 'true');
      assert.equal(await page.locator('.film-filter-library animate').count(), 0, 'Film grain is static, including reduced motion');
      assert.equal(await page.locator('.archivo-master>img').count(), 0, 'El wordmark no debe duplicarse en hero');
      assert.equal(await page.locator('.archivo-nav .archivo-logo-complete').count(), 1);
      assert.ok(!(await page.locator('.archivo-nav .archivo-logo-complete').evaluate((image) => getComputedStyle(image).filter)).includes('#film-'), 'Logo institucional sin etalonaje de foto');
      await page.locator('.imago-editorial').screenshot({ path: path.join(output, `${name}-imago-editorial.png`) });
      await page.locator('.imago-editorial [data-collection="herbario-indocil"]').click();
      assert.equal(await page.locator('.product-card').count(), 4);
      await page.locator('.product-open[data-open-product="imago-alas-tee"]').click();
      await page.locator('[data-view="campaign"]').click();
      assert.match(await page.locator('#detail-image').getAttribute('src'), /imago-editorial\.webp$/);
      await page.getByRole('button', { name: 'Cerrar ficha de producto', exact: true }).click();
      await page.locator('#clear-filters').click();
      await page.locator('.ownform-editorial [data-collection="self-defined"]').click();
      assert.equal(await page.locator('.product-card').count(), 4);
      await page.locator('#collection-filter').selectOption('all');
      assert.equal(await page.locator('.product-card').count(), 10);
      for (const product of catalog.products.filter((item) => item.brand === 'ownform')) {
        await page.locator(`.product-open[data-open-product="${product.id}"]`).click();
        assert.equal(await page.locator('[data-view="alternate"]').isVisible(), Boolean(product.alternate));
        if (product.alternate) {
          await page.locator('[data-view="alternate"]').click();
          assert.equal(await page.locator('#detail-image').getAttribute('src'), product.alternate.image);
          await page.locator('#detail-image').evaluate((image) => image.decode());
          await page.screenshot({ path: path.join(output, `${name}-${product.id}-front.png`) });
          assert.equal(await page.locator('#print-spec a').count(), 4);
          for (const file of [product.secondaryPrint.svg, product.secondaryPrint.png]) assert.equal((await fetch(base + file)).status, 200);
        }
        await page.locator('[data-view="artwork"]').click();
        assert.equal(await page.locator('#detail-image').getAttribute('src'), product.print.svg);
        assert.equal(await page.locator('#detail-image').evaluate((image) => getComputedStyle(image).filter), 'none', 'Original print art stays ungraded');
        assert.match(await page.locator('#print-spec').innerText(), new RegExp(`${product.print.widthCm} × ${product.print.heightCm} cm`));
        await page.locator('#detail-image').evaluate((image) => image.decode());
        await page.screenshot({ path: path.join(output, `${name}-${product.id}-art.png`) });
        const downloadEvent = page.waitForEvent('download');
        await page.locator('#print-spec a').first().click();
        const download = await downloadEvent;
        assert.equal(download.suggestedFilename(), path.basename(product.print.svg));
        await download.saveAs(path.join(output, `${name}-${download.suggestedFilename()}`));
        const svgResponse = await fetch(base + product.print.svg);
        assert.equal(svgResponse.status, 200);
        const svgSource = await svgResponse.text();
        assert.ok(!/<text\b|<image\b|<script\b/.test(svgSource), 'Print art is self-contained outlined vector geometry');
        const bounds = await page.evaluate((source) => {
          const svg = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
          document.body.append(svg);
          const box = svg.querySelector('#print-art').getBBox();
          const view = svg.viewBox.baseVal;
          const result = { x: box.x, y: box.y, right: box.x + box.width, bottom: box.y + box.height, width: view.width, height: view.height, physical: svg.getAttribute('width') };
          svg.remove();
          return result;
        }, svgSource);
        assert.equal(bounds.physical, `${product.print.widthCm * 10}mm`);
        assert.ok(bounds.x >= 0 && bounds.y >= 0 && bounds.right <= bounds.width && bounds.bottom <= bounds.height, `${product.id} art stays inside print area: ${JSON.stringify(bounds)}`);
        assert.ok(product.print.widthCm <= 28 && product.print.heightCm <= 28);
        const pngResponse = await fetch(base + product.print.png);
        assert.equal(pngResponse.status, 200);
        const png = Buffer.from(await pngResponse.arrayBuffer());
        assert.equal(png.subarray(1, 4).toString(), 'PNG');
        assert.equal(png.readUInt32BE(16), Math.round(product.print.widthCm / 2.54 * 300));
        assert.equal(png.readUInt32BE(20), Math.round(product.print.heightCm / 2.54 * 300));
        assert.equal(png[25], 6, 'PNG preserves RGBA transparency');
        let density;
        for (let offset = 8; offset + 12 <= png.length;) {
          const length = png.readUInt32BE(offset);
          if (png.toString('ascii', offset + 4, offset + 8) === 'pHYs') {
            assert.equal(png[offset + 16], 1, 'PNG physical units are meters');
            density = png.readUInt32BE(offset + 8) * 0.0254;
          }
          offset += length + 12;
        }
        assert.ok(Math.abs(density - 300) < 0.1, 'PNG stores 300 ppi physical density');
        await page.locator('[data-view="detail"]').click();
        assert.equal(await page.locator('#finish-views button').count(), 3);
        for (const [index, finish] of catalog.brands.ownform.finishes.entries()) {
          await page.locator(`#finish-views [data-finish="${index}"]`).click();
          assert.equal(await page.locator('#detail-image').getAttribute('src'), finish.image);
          assert.equal(await page.locator('#gallery-caption').textContent(), finish.caption);
          await page.locator('#detail-image').evaluate((image) => image.decode());
          if (product.id === 'ownform-quiet-tee') await page.screenshot({ path: path.join(output, `${name}-ownform-${finish.id}.png`) });
        }
        assert.equal(await page.locator('#trim-spec a').count(), 4);
        await page.getByRole('button', { name: 'Talla XL', exact: true }).click();
        assert.match(await page.locator('#trim-spec a').first().getAttribute('href'), /neck-xl-/);
        for (const link of await page.locator('#trim-spec a').all()) {
          const response = await fetch(base + await link.getAttribute('href'));
          assert.equal(response.status, 200, 'Finishing template is included in static build');
        }
        await page.locator('[data-view="product"]').click();
        assert.equal(await page.locator('#finish-views').isVisible(), false);
        assert.equal(await page.locator('#gallery-caption').isVisible(), false);
        await page.getByRole('button', { name: 'Cerrar ficha de producto', exact: true }).click();
      }
      if (name === 'desktop') {
        for (const folder of ['ownform', 'other-nature']) {
        const trims = JSON.parse(await fs.readFile(path.join(__dirname, `assets/trims/${folder}/manifest.json`), 'utf8'));
        for (const trim of trims) {
          const response = await fetch(`${base}assets/trims/${folder}/${trim.id}.svg`);
          assert.equal(response.status, 200);
          const source = await response.text();
          assert.ok(!/<text\b|<image\b|<script\b/.test(source));
          const bounds = await page.evaluate((source) => {
            const svg = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
            document.body.append(svg);
            const box = svg.querySelector('#trim-art').getBBox();
            const result = { x: box.x, y: box.y, right: box.x + box.width, bottom: box.y + box.height, width: svg.viewBox.baseVal.width, height: svg.viewBox.baseVal.height, physical: svg.getAttribute('width') };
            svg.remove(); return result;
          }, source);
          assert.equal(bounds.physical, `${trim.widthMm}mm`);
          assert.ok(bounds.x >= 0 && bounds.y >= 0 && bounds.right <= bounds.width && bounds.bottom <= bounds.height, `${trim.id}: ${JSON.stringify(bounds)}`);
          const pngResponse = await fetch(`${base}assets/trims/${folder}/${trim.id}.png`);
          assert.equal(pngResponse.status, 200);
          const png = Buffer.from(await pngResponse.arrayBuffer());
          assert.equal(png.readUInt32BE(16), Math.round(trim.widthMm / 25.4 * 300));
          assert.equal(png.readUInt32BE(20), Math.round(trim.heightMm / 25.4 * 300));
          assert.equal(png[25], 6);
        }
        }
      }
      await page.locator('#clear-filters').click();
      for (const [id, brand] of Object.entries(catalog.brands)) {
        await page.locator(`[data-identity="${id}"][role="tab"]`).click();
        assert.equal(await page.locator('#identity-stage').getAttribute('data-identity'), id);
        assert.equal(await page.locator(`#identity-tab-${id}`).getAttribute('aria-selected'), 'true');
        const bounds = await page.locator('#identity-stage .identity-wordmark>svg').evaluate((svg) => {
          const box = svg.getBBox(); const view = svg.viewBox.baseVal;
          return { x:box.x, y:box.y, right:box.x+box.width, bottom:box.y+box.height, width:view.width, height:view.height };
        });
        assert.ok(bounds.x >= -1 && bounds.y >= -1 && bounds.right <= bounds.width+1 && bounds.bottom <= bounds.height+1, `${id}: lettering fits its artboard: ${JSON.stringify(bounds)}`);
        for (const asset of ['symbol', 'wordmark', 'signature']) assert.equal((await fetch(`${base}assets/identities/${id}-${asset}.svg`)).status, 200);
        if (['ownform', 'imago', 'salitre', 'orbita', 'logic'].includes(id)) {
          // A tall capture viewport avoids clipping an element taller than mobile's content area.
          if (name === 'mobile') await page.setViewportSize({ width, height: 1200 });
          await page.locator('.identity-atelier').screenshot({ path: path.join(output, `${name}-identity-${id}.png`) });
          if (name === 'mobile') await page.setViewportSize({ width, height });
        }
        await page.locator(`[data-identity-catalog="${id}"]`).click();
        assert.equal(await page.locator('.product-card').count(), catalog.products.filter((product) => product.brand === id).length);
      }
      await page.locator('#identity-tab-logic').focus();
      await page.keyboard.press('Home');
      assert.equal(await page.locator('#identity-stage').getAttribute('data-identity'), 'ownform');
      await page.keyboard.press('End');
      assert.equal(await page.locator('#identity-stage').getAttribute('data-identity'), 'logic');
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('#identity-stage').getAttribute('data-identity'), 'ownform');
      await page.locator('#clear-filters').click();
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
        assert.equal(await page.locator('.product-card').count(), catalog.products.filter((product) => catalog.brands[product.brand].destination === id).length);
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
        assert.equal(await page.locator('#brand-dialog .brand-palette span').count(), brand.palette.length);
        if (id === 'orbita') await page.screenshot({ path: path.join(output, `${name}-brand.png`) });
        await page.getByRole('button', { name: 'Cerrar universo de marca' }).click();
      }
      await page.locator('#hero-brands [data-campaign="solar"]').click();
      await page.locator('.brand-filters [data-filter-brand="solar"]').click();
      assert.equal(await page.locator('.product-card').count(), 3);
      await page.getByRole('button', { name: 'Ver Polera Mediodía de SOLAR CLUB', exact: true }).click();
      assert.equal(await page.locator('[data-view="detail"]').isVisible(), false);
      assert.equal(await page.locator('#trim-spec').isVisible(), false);
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
      results.push({ viewport: name, catalog: `${catalog.products.length} products / complete catalog`, brands: `${Object.keys(catalog.brands).length} stories and campaigns`, collections: `${Object.keys(catalog.collections).length} filters verified`, escapes: '3 looks / required sizes / complete cart additions', images: 'all decoded', cart: 'new and original brands / persisted', download: 'accurate / no submission', projectSubpath: 'ok' });
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
    const report = { results, identities: `${Object.keys(catalog.brands).length} vector signatures / artboard bounds / ${Object.keys(catalog.brands).length * 3} SVG exports / keyboard tabs / brand filtering`, motion: 'runs when visible / manual pause / stops offscreen / reduced motion respected', outfitLimit: 'atomic rejection at maximum quantity', expandedCart: `${catalog.products.length} lines persist after reload`, errors, apiRequests, privateFiles: 'excluded' };
    await fs.writeFile(path.join(output, 'verification.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
