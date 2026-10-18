const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const catalog = require('./catalog.js');

function createStoreServer(options = {}) {
  const dataDir = options.dataDir || path.join(__dirname, 'data');
  const ordersPath = path.join(dataDir, 'orders.json');
  let writeQueue = Promise.resolve();
  async function readOrders() {
    try { return JSON.parse(await fs.readFile(ordersPath, 'utf8')); }
    catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  }
  function mutateOrders(change) {
    const operation = writeQueue.then(async () => {
      const orders = await readOrders();
      const result = change(orders);
      await fs.mkdir(dataDir, { recursive: true });
      const temporary = `${ordersPath}.${crypto.randomUUID()}.tmp`;
      await fs.writeFile(temporary, JSON.stringify(orders, null, 2), { encoding: 'utf8', mode: 0o600 });
      await fs.rename(temporary, ordersPath);
      return result;
    });
    writeQueue = operation.catch(() => {});
    return operation;
  }
  function json(res, code, payload) {
    res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(payload));
  }
  async function body(req) {
    if (!req.headers['content-type']?.startsWith('application/json')) throw Object.assign(new Error('Se requiere JSON.'), { status: 415 });
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 24000) throw Object.assign(new Error('La solicitud es demasiado grande.'), { status: 413 });
      chunks.push(chunk);
    }
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw Object.assign(new Error('La solicitud no es válida.'), { status: 400 }); }
  }
  function text(value, min, max) { return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max; }
  function validateOrder(input) {
    const customer = input?.customer;
    if (!customer || !text(customer.name, 2, 100) || !text(customer.email, 5, 150) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim()) || !text(customer.city, 2, 100)) throw Object.assign(new Error('Revisa nombre, correo y ciudad.'), { status: 400 });
    if (customer.phone && (!text(customer.phone, 6, 30) || !/^[+\d ()-]+$/.test(customer.phone))) throw Object.assign(new Error('Revisa el teléfono de contacto.'), { status: 400 });
    if (customer.note && !text(customer.note, 0, 600)) throw Object.assign(new Error('La nota admite hasta 600 caracteres.'), { status: 400 });
    if (!Array.isArray(input.items) || !input.items.length || input.items.length > 36) throw Object.assign(new Error('La bolsa no contiene productos válidos.'), { status: 400 });
    const consolidated = new Map();
    for (const item of input.items) {
      const product = catalog.products.find((p) => p.id === item?.id);
      if (!product || !product.sizes.includes(item.size) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > catalog.maxQuantity) throw Object.assign(new Error('Revisa las prendas, tallas y cantidades.'), { status: 400 });
      const key = `${product.id}:${item.size}`;
      const quantity = (consolidated.get(key)?.quantity || 0) + item.quantity;
      if (quantity > catalog.maxQuantity) throw Object.assign(new Error('Máximo 10 unidades por prenda y talla.'), { status: 400 });
      consolidated.set(key, { id: product.id, name: product.name, brand: catalog.brands[product.brand].name, size: item.size, quantity, price: product.price });
    }
    const items = [...consolidated.values()];
    return { customer: { name: customer.name.trim(), email: customer.email.trim(), city: customer.city.trim(), phone: (customer.phone || '').trim(), note: (customer.note || '').trim() }, items, subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0) };
  }
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
    try {
      const host = `127.0.0.1:${server.address().port}`;
      if (req.headers.host !== host) return json(res, 403, { error: 'Este servidor solo admite acceso local.' });
      if (req.headers.origin && req.headers.origin !== `http://${host}`) return json(res, 403, { error: 'Origen no permitido.' });
      const url = new URL(req.url, `http://${host}`);
      if (url.pathname === '/api/health' && req.method === 'GET') return json(res, 200, { status: 'ok', mode: 'request-only', referencePrices: true });
      if (url.pathname === '/api/orders' && req.method === 'GET') return json(res, 200, { orders: await readOrders() });
      if (url.pathname === '/api/orders' && req.method === 'POST') {
        const input = await body(req);
        const valid = validateOrder(input);
        if (!/^[a-zA-Z0-9-]{10,80}$/.test(input.requestKey || '')) return json(res, 400, { error: 'Falta el identificador de la solicitud.' });
        const order = await mutateOrders((orders) => {
          const existing = orders.find((o) => o.requestKey === input.requestKey);
          if (existing) {
            if (JSON.stringify({ customer: existing.customer, items: existing.items }) !== JSON.stringify({ customer: valid.customer, items: valid.items })) throw Object.assign(new Error('El identificador corresponde a otra solicitud.'), { status: 409 });
            return existing;
          }
          const created = { id: `AR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, requestKey: input.requestKey, createdAt: new Date().toISOString(), status: 'Pendiente', ...valid, currency: 'CLP', referencePrices: true, payment: 'Sin cobro', shipping: 'Por confirmar' };
          orders.unshift(created);
          return created;
        });
        return json(res, 201, { order });
      }
      const orderMatch = url.pathname.match(/^\/api\/orders\/([A-Z0-9-]+)$/);
      if (orderMatch && req.method === 'PATCH') {
        const input = await body(req);
        if (!['Pendiente', 'Contactado', 'Confirmado', 'Cancelado'].includes(input?.status)) return json(res, 400, { error: 'Estado no válido.' });
        const order = await mutateOrders((orders) => {
          const found = orders.find((o) => o.id === orderMatch[1]);
          if (!found) throw Object.assign(new Error('Solicitud no encontrada.'), { status: 404 });
          found.status = input.status;
          return found;
        });
        return json(res, 200, { order });
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Método no permitido.' });
      const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const publicFiles = ['/index.html', '/styles.css', '/catalog.js', '/app.js', '/admin.html', '/admin.js'];
      if (!publicFiles.includes(pathname) && !/^\/assets\/[a-z0-9_./-]+\.(webp|png|svg)$/.test(pathname)) return json(res, 404, { error: 'Página no encontrada.' });
      const target = path.resolve(__dirname, `.${pathname}`);
      if (!target.startsWith(__dirname + path.sep)) return json(res, 403, { error: 'Ruta no permitida.' });
      const data = await fs.readFile(target);
      const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' }[path.extname(target)];
      res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=3600' : 'no-cache' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch (error) {
      json(res, error.status || (error.code === 'ENOENT' ? 404 : 500), { error: error.status ? error.message : error.code === 'ENOENT' ? 'Archivo no encontrado.' : 'No se pudo guardar la solicitud. Intenta nuevamente.' });
    }
  });
  return server;
}
if (require.main === module) {
  const port = Number(process.env.PORT || 4178);
  createStoreServer().listen(port, '127.0.0.1', () => console.log(`ARCHIVO: http://127.0.0.1:${port}\nGestion: http://127.0.0.1:${port}/admin.html`));
}
module.exports = { createStoreServer };
