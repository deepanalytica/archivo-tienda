/* Places, complete looks and two controlled kinetic ribbons. */
let activeEscape = 'beach';
let activeLook = null;
const escapeKeys = Object.keys(destinations);
const arrowIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';

function renderEscape() {
  const escape = destinations[activeEscape]; const brand = brands[escape.brand];
  const panel = $('#escape-stage');
  panel.style.setProperty('--escape-bg', escape.color);
  panel.style.setProperty('--escape-ink', escape.ink);
  panel.setAttribute('aria-labelledby', `escape-tab-${activeEscape}`);
  panel.innerHTML = `<div class="escape-photograph"><img src="${brand.campaign}" alt="${escape.name}: ${brand.description}" width="1536" height="1024" loading="lazy"><span class="wordmark wordmark-${escape.brand}">${brand.name}</span></div><div class="escape-copy"><h3>${escape.title}</h3><p>${escape.description}</p><div class="escape-actions"><button type="button" class="button escape-button" data-open-look="${activeEscape}">Ver el conjunto ${arrowIcon}</button><button type="button" class="line-link" data-destination-catalog="${activeEscape}">Explorar ${escape.name.toLowerCase()}</button></div><div class="escape-pieces">${escape.look.map((id) => `<button type="button" data-open-product="${id}" aria-label="Ver ${byId(id).name} de ${brand.name}"><img src="${byId(id).image}" alt="${byId(id).name}" width="300" height="300" loading="lazy"><span>${byId(id).name}</span></button>`).join('')}</div></div>`;
  all('[data-escape]').forEach((button) => {
    const selected = button.dataset.escape === activeEscape;
    button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1;
  });
}
$('#escape-tabs').innerHTML = escapeKeys.map((id) => `<button type="button" role="tab" id="escape-tab-${id}" aria-controls="escape-stage" aria-selected="${id === activeEscape}" tabindex="${id === activeEscape ? 0 : -1}" data-escape="${id}">${brandSymbol(brands[destinations[id].brand].mark)}${destinations[id].name}</button>`).join('');
$('#escape-tabs').addEventListener('keydown', (event) => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const current = escapeKeys.indexOf(activeEscape);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? escapeKeys.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + escapeKeys.length) % escapeKeys.length;
  activeEscape = escapeKeys[next]; renderEscape(); $(`[data-escape="${activeEscape}"]`).focus();
});

function renderLookSubtotal() {
  const included = all('#look-items [data-include-look]:checked').map((input) => byId(input.dataset.includeLook));
  $('#look-subtotal').textContent = money(included.reduce((total, product) => total + product.price, 0));
  $('#add-look').disabled = !included.length;
  $('#add-look').textContent = `Agregar ${included.length} ${included.length === 1 ? 'prenda' : 'prendas'} a la bolsa`;
  all('#look-items .look-line').forEach((line) => { line.querySelector('select').disabled = !line.querySelector('[data-include-look]').checked; });
}
function showLook(id) {
  activeLook = id; const escape = destinations[id];
  $('#look-title').textContent = escape.lookName;
  $('#look-error').textContent = '';
  $('#look-items').innerHTML = escape.look.map((key) => {
    const product = byId(key);
    return `<article class="look-line"><img src="${product.image}" alt="${product.name}" width="160" height="160"><div><label class="look-include"><input type="checkbox" data-include-look="${key}" checked><span>${product.name}</span></label><p>${brands[product.brand].name} · ${money(product.price)}</p><label class="look-size">Talla<select data-look-size="${key}" aria-label="Talla de ${product.name}">${product.sizes.length === 1 ? '' : '<option value="">Elegir talla</option>'}${product.sizes.map((size) => `<option value="${size}">${size}</option>`).join('')}</select></label></div></article>`;
  }).join('');
  renderLookSubtotal(); openDialog($('#look-dialog'));
}
$('#look-items').addEventListener('change', () => { $('#look-error').textContent = ''; renderLookSubtotal(); });
$('#look-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!activeLook) return;
  const selected = all('#look-items [data-include-look]:checked');
  if (!selected.length) { $('#look-error').textContent = 'Elige al menos una prenda para continuar.'; return; }
  const lines = [];
  for (const input of selected) {
    const product = byId(input.dataset.includeLook);
    const select = $(`[data-look-size="${product.id}"]`); const size = select.value;
    if (!product.sizes.includes(size)) { $('#look-error').textContent = `Elige una talla para ${product.name}.`; select.focus(); return; }
    const existing = state.cart.find((line) => line.id === product.id && line.size === size);
    if ((existing?.quantity || 0) >= maxQuantity) { $('#look-error').textContent = `Ya tienes el máximo de 10 unidades de ${product.name}, talla ${size}. Ajusta tu bolsa o excluye esa prenda.`; return; }
    lines.push({ id: product.id, size, quantity: 1 });
  }
  // Validate the whole outfit before changing the cart, so errors never add half a look.
  for (const line of lines) {
    const existing = state.cart.find((item) => item.id === line.id && item.size === line.size);
    if (existing) existing.quantity += 1; else state.cart.push(line);
  }
  persistCart(); renderCart(); $('#look-dialog').close(); openDialog($('#cart-dialog'));
});
document.addEventListener('click', (event) => {
  const escape = event.target.closest('[data-escape]');
  if (escape) { activeEscape = escape.dataset.escape; renderEscape(); }
  const look = event.target.closest('[data-open-look]');
  if (look) showLook(look.dataset.openLook);
  const destination = event.target.closest('[data-destination-catalog]');
  if (destination) { resetFilters(); state.destination = destination.dataset.destinationCatalog; renderCatalog(); scrollToCatalog(); }
});
renderEscape();

const ribbonWords = {
  'ticker-destinations': ['PLAYA', 'MONTAÑA', 'CIUDAD', 'TU PRÓXIMO BUEN RECUERDO'],
  'ticker-brands': universeOrder.map((id) => brands[id].name),
};
for (const [id, words] of Object.entries(ribbonWords)) {
  const group = `<div class="ticker-group">${words.map((word) => `<span>${word}</span>${brandSymbol(id === 'ticker-brands' ? 'flower' : 'sun')}`).join('')}</div>`;
  $(`#${id} .ticker-track`).innerHTML = group + group;
}
let userPausedMotion = load('archivo-motion-paused-v1', false) === true;
const ribbons = all('.color-ticker');
ribbons.forEach((ribbon) => { ribbon.tabIndex = 0; });
function syncRibbonMotion() {
  const blocked = userPausedMotion || reducedMotion.matches || document.hidden;
  for (const ribbon of ribbons) ribbon.dataset.running = String(!blocked && ribbon.dataset.inView === 'true');
  $('#motion-toggle').disabled = reducedMotion.matches;
  $('#motion-toggle').setAttribute('aria-pressed', String(userPausedMotion));
  $('#motion-toggle').textContent = reducedMotion.matches ? 'Movimiento reducido' : userPausedMotion ? 'Reanudar movimiento' : 'Pausar movimiento';
}
$('#motion-toggle').addEventListener('click', () => { userPausedMotion = !userPausedMotion; save('archivo-motion-paused-v1', userPausedMotion); syncRibbonMotion(); });
document.addEventListener('visibilitychange', syncRibbonMotion);
reducedMotion.addEventListener('change', syncRibbonMotion);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => { for (const entry of entries) entry.target.dataset.inView = String(entry.isIntersecting); syncRibbonMotion(); });
  ribbons.forEach((ribbon) => observer.observe(ribbon));
}
syncRibbonMotion();
