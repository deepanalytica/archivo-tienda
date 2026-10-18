/* Manual exploration of the authored signatures. */
let activeIdentity = universeOrder[0];
function renderIdentity() {
  const id = activeIdentity; const identity = ARCHIVO_IDENTITIES[id]; const brand = brands[id];
  const stage = $('#identity-stage');
  stage.style.setProperty('--identity-paper', collections[brand.latest].color);
  stage.style.setProperty('--identity-ink', collections[brand.latest].ink);
  stage.dataset.identity = id;
  stage.setAttribute('aria-labelledby', `identity-tab-${id}`);
  stage.innerHTML = `<div class="identity-sculpture" aria-hidden="true">${brandSymbol(id)}</div><div class="identity-composition"><div class="identity-display">${brandWordmark(id)}</div><h3>${identity.title}</h3><p>${identity.note}</p><button type="button" class="line-link" data-identity-catalog="${id}">Ver prendas de ${brand.name} <span aria-hidden="true">↗</span></button></div><span class="identity-gesture" aria-hidden="true">${identity.gesture}</span>`;
  all('#identity-tabs [data-identity]').forEach((tab) => { const selected = tab.dataset.identity === id; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
}
$('#identity-tabs').innerHTML = universeOrder.map((id) => `<button type="button" role="tab" id="identity-tab-${id}" aria-controls="identity-stage" data-identity="${id}" aria-selected="${id === activeIdentity}" tabindex="${id === activeIdentity ? 0 : -1}">${brandSymbol(id)}<span>${brands[id].name}</span></button>`).join('');
$('#identity-tabs').addEventListener('click', (event) => {
  const tab = event.target.closest('[data-identity]'); if (!tab) return;
  activeIdentity = tab.dataset.identity; renderIdentity();
});
$('#identity-tabs').addEventListener('keydown', (event) => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault(); const current = universeOrder.indexOf(activeIdentity);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? universeOrder.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + universeOrder.length) % universeOrder.length;
  activeIdentity = universeOrder[next]; renderIdentity();
  const tab = $(`#identity-tab-${activeIdentity}`); tab.focus({ preventScroll: true });
  tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
});
$('#identity-stage').addEventListener('click', (event) => {
  const button = event.target.closest('[data-identity-catalog]');
  if (button) filterBrand(button.dataset.identityCatalog);
});
renderIdentity();
