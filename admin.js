const money = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
let orders = [];
const $ = (selector) => document.querySelector(selector);
function element(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; }
function renderOrders() {
  const query = $('#order-search').value.toLowerCase().trim();
  const status = $('#status-filter').value;
  const visible = orders.filter((order) => (status === 'all' || order.status === status) && (!query || [order.id, order.customer.name, order.customer.email].join(' ').toLowerCase().includes(query)));
  $('#order-count').textContent = `${visible.length} solicitudes`;
  $('#orders-list').replaceChildren();
  if (!visible.length) { $('#orders-list').append(element('p', 'Todavía no hay solicitudes en esta vista.', 'admin-message')); return; }
  for (const order of visible) {
    const article = element('article', undefined, 'admin-order');
    const customer = element('div'); customer.append(element('p', new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Santiago' }).format(new Date(order.createdAt)), 'eyebrow'), element('h2', order.id), element('p', `${order.customer.name}\n${order.customer.email}\n${order.customer.city}${order.customer.phone ? ` / ${order.customer.phone}` : ''}`));
    if (order.customer.note) customer.append(element('p', order.customer.note, 'customer-note'));
    const items = element('div'); const list = element('ul');
    order.items.forEach((item) => list.append(element('li', `${item.quantity} × ${item.brand} / ${item.name} / Talla ${item.size} / ${money(item.price * item.quantity)}`)));
    items.append(list, element('p', `Subtotal referencial: ${money(order.subtotal)}`), element('p', 'Sin cobro / Entrega por confirmar', 'small-note'));
    const actions = element('div'); const label = element('label', 'Estado '); const select = element('select'); select.setAttribute('aria-label', `Estado de ${order.id}`);
    ['Pendiente', 'Contactado', 'Confirmado', 'Cancelado'].forEach((status) => { const option = element('option', status); option.value = status; select.append(option); });
    select.value = order.status;
    select.addEventListener('change', async () => {
      select.disabled = true; $('#admin-error').textContent = '';
      try {
        const response = await fetch(`/api/orders/${order.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: select.value }) });
        const data = await response.json(); if (!response.ok) throw new Error(data.error);
        orders = orders.map((item) => item.id === order.id ? data.order : item); renderOrders();
      } catch (error) { select.value = order.status; $('#admin-error').textContent = error.message; }
      finally { select.disabled = false; }
    });
    label.append(select); actions.append(label, element('p', 'Solo seguimiento interno.', 'small-note')); article.append(customer, items, actions); $('#orders-list').append(article);
  }
}
async function loadOrders() {
  $('#admin-error').textContent = ''; $('#refresh-orders').disabled = true;
  try { const response = await fetch('/api/orders'); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudieron leer las solicitudes.'); orders = data.orders; renderOrders(); }
  catch (error) { $('#admin-error').textContent = error.message; }
  finally { $('#refresh-orders').disabled = false; }
}
$('#refresh-orders').addEventListener('click', loadOrders);
$('#order-search').addEventListener('input', renderOrders);
$('#status-filter').addEventListener('change', renderOrders);
$('#export-orders').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), orders }, null, 2)], { type: 'application/json' }));
  const link = element('a'); link.href = url; link.download = 'archivo-solicitudes.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
loadOrders();
