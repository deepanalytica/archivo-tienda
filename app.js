const { products, brands, collections, destinations, maxQuantity, maxCartLines } = ARCHIVO_CATALOG;
const isStaticStore = document.documentElement.dataset.storeMode === 'static';
const money = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
const $ = (selector) => document.querySelector(selector);
const all = (selector) => [...document.querySelectorAll(selector)];
const byId = (id) => products.find((product) => product.id === id);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* The current session still works when storage is unavailable. */ } }
const storedFavorites = load('archivo-favorites-v1', []);
const storedCart = load('archivo-cart-v1', []);
const state = {
  brand: 'all', collection: 'all', destination: 'all', category: 'all', search: '', sort: 'featured', favoritesOnly: false, campaign: 'ownform', feature: 'other-nature',
  favorites: new Set(Array.isArray(storedFavorites) ? storedFavorites.filter((id) => byId(id)) : []),
  cart: [], product: null, size: null, quantity: 1, view: 'product', finish: 0, requestKey: null, order: null,
};
if (Array.isArray(storedCart)) {
  for (const item of storedCart.slice(0, maxCartLines)) {
    const product = byId(item?.id);
    if (product && product.sizes.includes(item.size) && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= maxQuantity) {
      const existing = state.cart.find((line) => line.id === item.id && line.size === item.size);
      if (existing) existing.quantity = Math.min(maxQuantity, existing.quantity + item.quantity);
      else state.cart.push({ id: item.id, size: item.size, quantity: item.quantity });
    }
  }
}
const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6c-2-2-5.1-1.9-7.1.1L12 6.4l-1.7-1.7c-2-2-5.1-2.1-7.1-.1s-1.9 5.1.1 7.1L12 20l8.7-8.3c2-2 2.1-5.1.1-7.1Z"/></svg>';
const universeOrder = ['ownform', 'imago', 'salitre', 'alto', 'limen', 'brava', 'solar', 'marea', 'orbita', 'umbral', 'neblina', 'logic'];
const collectionOrder = [...new Set([...universeOrder.map((id) => brands[id].latest), ...Object.keys(collections)])];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const campaignViewport = matchMedia('(max-width: 680px)');
function scrollToCatalog() { $('#catalogo').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' }); }
function brandSymbol(mark) {
  const aliases = { sun: 'solar', wave: 'marea', orbit: 'orbita', portal: 'umbral', landscape: 'neblina', angles: 'logic', horizon: 'salitre', peak: 'alto', bars: 'limen', flower: 'brava' };
  const identity = ARCHIVO_IDENTITIES[aliases[mark] || mark];
  return `<svg class="brand-symbol" viewBox="0 0 96 96" fill="currentColor" fill-rule="evenodd" stroke="none" aria-hidden="true">${identity.mark}</svg>`;
}
function brandWordmark(id) {
  const identity = ARCHIVO_IDENTITIES[id]; const lettering = identity.lettering;
  return `<span class="identity-wordmark identity-${id}"><svg viewBox="0 0 ${lettering.width} ${lettering.height}" fill="currentColor" fill-rule="evenodd" aria-hidden="true">${lettering.body}</svg><span class="sr-only">${identity.name}</span></span>`;
}
function paletteHtml(brand) {
  return `<div class="brand-palette" aria-label="Paleta de ${brand.name}">${brand.palette.map((color) => `<span style="background:${color}" title="${color}"></span>`).join('')}</div>`;
}
function renderUniverseNavigation() {
  $('#hero-brands').innerHTML = universeOrder.map((id) => `<button type="button" data-campaign="${id}" aria-pressed="${id === state.campaign}">${brands[id].name}</button>`).join('');
  $('#brand-line').innerHTML = universeOrder.map((id) => `<button type="button" data-filter-brand="${id}" aria-label="${brands[id].name}" class="wordmark wordmark-${id}" style="--brand-bg:${brands[id].palette[0]};--brand-fg:${brands[id].ink || (id === 'orbita' || id === 'neblina' ? '#352044' : id === 'solar' ? '#502719' : '#fff')}">${brandSymbol(id)}${brandWordmark(id)}</button>`).join('');
  $('#brand-filters').innerHTML = '<button type="button" data-filter-brand="all" aria-pressed="true">Todas las marcas</button>' + universeOrder.map((id) => `<button type="button" data-filter-brand="${id}" aria-pressed="false">${brands[id].name}</button>`).join('');
  $('#collection-filter').innerHTML = '<option value="all">Todas las colecciones</option>' + collectionOrder.map((id) => `<option value="${id}">${brands[collections[id].brand].name} / ${collections[id].name}</option>`).join('');
  $('#category-filter').innerHTML = '<option value="all">Todas las prendas</option>' + [...new Set(products.map((product) => product.category))].map((category) => `<option>${category}</option>`).join('');
  $('#collection-tabs').innerHTML = collectionOrder.map((id) => `<button type="button" data-explore-collection="${id}" aria-pressed="${id === state.feature}">${collections[id].name}</button>`).join('');
  $('#collection-directory').innerHTML = collectionOrder.map((id) => {
    const collection = collections[id];
    const count = products.filter((product) => product.collection === id).length;
    return `<button type="button" data-collection="${id}" style="--directory-bg:${collection.color};--directory-ink:${collection.ink}"><span class="eyebrow">${brands[collection.brand].name}</span><strong>${collection.name}</strong><span class="directory-count">${count} ${count === 1 ? 'prenda' : 'prendas'} <span aria-hidden="true">↗</span></span></button>`;
  }).join('');
  $('#catalog-total').textContent = `${products.length} prendas · ${Object.keys(collections).length} colecciones · ${Object.keys(brands).length} marcas`;
  $('#hero-catalog-link').textContent = `Ver las ${products.length} prendas`;
  $('#collection-summary').textContent = `${Object.keys(brands).length} marcas. ${Object.keys(collections).length} colecciones. Encuentra el universo que va contigo.`;
  $('#brand-line').setAttribute('aria-label', `${Object.keys(brands).length} marcas de autor`);
  $('#ticker-brands').setAttribute('aria-label', `${Object.keys(brands).length} marcas, universos propios.`);
  $('#hero-brand-count').textContent = `/${String(Object.keys(brands).length).padStart(2, '0')}`;
  $('#footer-brand-list').textContent = universeOrder.map((id) => brands[id].name).join(' / ');
  $('#brand-editorials').innerHTML = universeOrder.map((id) => {
    const brand = brands[id];
    return `<article class="brand-story brand-${id}" style="--story-bg:${collections[brand.latest].color};--story-ink:${collections[brand.latest].ink}"><button type="button" class="brand-photo" data-brand-story="${id}" aria-label="Conocer ${brand.name}"><img src="${brand.campaign}" alt="${brand.name}: ${brand.world}" loading="lazy" width="1536" height="1024"><span class="wordmark wordmark-${id}">${brandWordmark(id)}</span></button><div class="brand-story-copy"><div class="brand-story-title"><h3>${brand.world}</h3>${brandSymbol(brand.mark)}</div><p>${brand.description}</p><div class="brand-story-bottom">${paletteHtml(brand)}<button type="button" class="line-link" data-brand-story="${id}">Su universo <span aria-hidden="true">↗</span></button></div></div></article>`;
  }).join('');
  renderCollectionFeature();
}
function renderCollectionFeature() {
  const collection = collections[state.feature]; const brand = brands[collection.brand];
  $('#collection-feature').style.setProperty('--feature-bg', collection.color);
  $('#collection-feature').style.setProperty('--feature-ink', collection.ink);
  $('#collection-feature').innerHTML = `<div class="collection-picture"><img src="${collection.campaign}" alt="${brand.name}, colección ${collection.name}" loading="lazy" width="1536" height="1024"></div><div class="collection-copy"><span class="wordmark wordmark-${collection.brand}">${brandWordmark(collection.brand)}</span><h3>${collection.name}</h3><p>${collection.description}</p><button type="button" class="button collection-button" data-collection="${state.feature}">Ver la colección <span aria-hidden="true">↗</span></button><span class="collection-signature">${brandSymbol(brand.mark)}${collection.line}</span></div>`;
  all('[data-explore-collection]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.exploreCollection === state.feature)));
}
function showBrand(id) {
  const brand = brands[id]; if (!brand) return;
  const dialog = $('#brand-dialog');
  dialog.style.setProperty('--story-bg', collections[brand.latest].color);
  dialog.style.setProperty('--story-ink', collections[brand.latest].ink);
  $('#brand-dialog-content').innerHTML = `<img class="brand-dialog-image" src="${brand.campaign}" alt="Campaña de ${brand.name}" width="1536" height="1024"><div class="brand-dialog-copy"><div class="brand-signature">${brandSymbol(id)}<h2 id="brand-title" class="wordmark wordmark-${id}">${brandWordmark(id)}</h2></div><h3>${brand.world}</h3><p>${brand.manifesto}</p><div class="art-direction">${paletteHtml(brand)}<p>${brand.art}</p></div><h3>Sus colecciones</h3><div class="brand-collection-links">${Object.entries(collections).filter(([, collection]) => collection.brand === id).map(([key, collection]) => `<button type="button" data-collection="${key}">${collection.name} <span aria-hidden="true">↗</span></button>`).join('')}</div></div>`;
  openDialog(dialog);
}
renderUniverseNavigation();
let toastTimer;
function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2400);
}
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('has-dialog'); }
all('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => document.body.classList.toggle('has-dialog', Boolean($('dialog[open]'))));
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
all('[data-close]').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));

function renderCatalog() {
  const query = normalize(state.search.trim());
  let visible = products.filter((product) =>
    (state.brand === 'all' || product.brand === state.brand) &&
    (state.collection === 'all' || product.collection === state.collection) &&
    (state.destination === 'all' || brands[product.brand].destination === state.destination) &&
    (state.category === 'all' || product.category === state.category) &&
    (!state.favoritesOnly || state.favorites.has(product.id)) &&
    (!query || normalize([product.name, product.color, product.category, brands[product.brand].name, collections[product.collection].name, destinations[brands[product.brand].destination].name].join(' ')).includes(query))
  );
  if (state.sort === 'featured') visible.sort((a, b) => (a.featuredRank ?? 100) - (b.featuredRank ?? 100) || Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
  if (state.sort === 'price-asc') visible.sort((a, b) => a.price - b.price);
  if (state.sort === 'price-desc') visible.sort((a, b) => b.price - a.price);
  if (state.sort === 'name') visible.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  $('#product-grid').innerHTML = visible.map((product) => `<article class="product-card" data-product="${product.id}"><div class="product-picture"><button type="button" class="product-open" data-open-product="${product.id}" aria-label="Ver ${product.name} de ${brands[product.brand].name}"><img src="${product.image}" alt="${product.name}, ${product.color}, vista ${product.view.toLowerCase()}" width="1000" height="1000" loading="lazy"></button><button type="button" class="save-product" data-save="${product.id}" aria-label="Guardar ${product.name} en favoritos" aria-pressed="${state.favorites.has(product.id)}">${heart}</button><span class="product-view">${product.graphic === 'micro' ? 'Micrográfica' : product.graphic === 'macro' ? 'Estampado de autor' : product.view}</span></div><div class="product-caption"><div><p class="eyebrow">${brands[product.brand].name}</p><h3 class="product-title"><button type="button" data-open-product="${product.id}">${product.name}</button></h3><p class="product-color"><i style="background:${product.swatch}"></i>${product.color}</p></div><span class="product-price">${money(product.price)}</span></div></article>`).join('');
  $('#empty-catalog').hidden = visible.length > 0;
  $('#result-count').textContent = `${visible.length} ${visible.length === 1 ? 'prenda' : 'prendas'}${state.favoritesOnly ? ' en favoritos' : ''}`;
  $('#clear-filters').hidden = state.brand === 'all' && state.collection === 'all' && state.destination === 'all' && state.category === 'all' && !state.search && !state.favoritesOnly;
  $('#destination-filter').value = state.destination;
  $('#collection-filter').value = state.collection;
  all('#collection-filter option').forEach((option) => { option.disabled = option.value !== 'all' && state.brand !== 'all' && collections[option.value].brand !== state.brand; });
  all('.brand-filters [data-filter-brand]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filterBrand === state.brand)));
  $('#favorites-toggle').setAttribute('aria-pressed', String(state.favoritesOnly));
  $('#favorite-count').textContent = state.favorites.size;
}
function resetFilters() {
  Object.assign(state, { brand: 'all', collection: 'all', destination: 'all', category: 'all', search: '', favoritesOnly: false, sort: 'featured' });
  $('#category-filter').value = 'all'; $('#collection-filter').value = 'all'; $('#destination-filter').value = 'all'; $('#search').value = ''; $('#sort').value = 'featured'; renderCatalog();
}
function filterBrand(brand, reset = true) {
  if (reset) resetFilters();
  state.brand = brand;
  if (brand !== 'all' && state.destination !== 'all' && brands[brand].destination !== state.destination) state.destination = 'all';
  if (state.collection !== 'all' && collections[state.collection].brand !== brand) state.collection = 'all';
  renderCatalog();
  if (reset) scrollToCatalog();
}
document.addEventListener('click', (event) => {
  const storyButton = event.target.closest('[data-brand-story]');
  if (storyButton) showBrand(storyButton.dataset.brandStory);
  const featureButton = event.target.closest('[data-explore-collection]');
  if (featureButton) { state.feature = featureButton.dataset.exploreCollection; renderCollectionFeature(); }
  const collectionButton = event.target.closest('[data-collection]');
  if (collectionButton) {
    const id = collectionButton.dataset.collection;
    resetFilters(); state.brand = collections[id].brand; state.collection = id; renderCatalog();
    $('#brand-dialog').close(); scrollToCatalog();
  }
  const brandButton = event.target.closest('[data-filter-brand]');
  if (brandButton) filterBrand(brandButton.dataset.filterBrand, !brandButton.closest('.brand-filters'));
  const productButton = event.target.closest('[data-open-product]');
  if (productButton) showProduct(productButton.dataset.openProduct);
  const favoriteButton = event.target.closest('[data-save]');
  if (favoriteButton) {
    const id = favoriteButton.dataset.save;
    if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
    save('archivo-favorites-v1', [...state.favorites]); renderCatalog();
    $(`[data-save="${id}"]`)?.focus({ preventScroll: true });
  }
});
$('#search').addEventListener('input', (event) => { state.search = event.target.value; renderCatalog(); });
$('#category-filter').addEventListener('change', (event) => { state.category = event.target.value; renderCatalog(); });
$('#collection-filter').addEventListener('change', (event) => { state.collection = event.target.value; renderCatalog(); });
$('#destination-filter').addEventListener('change', (event) => {
  state.destination = event.target.value;
  if (state.brand !== 'all' && state.destination !== 'all' && brands[state.brand].destination !== state.destination) { state.brand = 'all'; state.collection = 'all'; }
  if (state.collection !== 'all' && state.destination !== 'all' && brands[collections[state.collection].brand].destination !== state.destination) state.collection = 'all';
  renderCatalog();
});
$('#show-all-products').addEventListener('click', resetFilters);
$('#sort').addEventListener('change', (event) => { state.sort = event.target.value; renderCatalog(); });
$('#clear-filters').addEventListener('click', resetFilters);
$('#reset-empty').addEventListener('click', resetFilters);
all('[data-reset]').forEach((link) => link.addEventListener('click', resetFilters));
$('#favorites-toggle').addEventListener('click', () => { state.favoritesOnly = !state.favoritesOnly; renderCatalog(); scrollToCatalog(); });

function showCampaign(id) {
  state.campaign = id;
  const brand = brands[state.campaign];
  $('#hero-image').src = campaignViewport.matches && brand.mobileCampaign ? brand.mobileCampaign : brand.campaign;
  $('#hero-image').alt = `Campaña ${brand.name}: ${brand.description}`;
  $('#hero-cta').replaceChildren(document.createTextNode(`Explorar ${brand.name} `), Object.assign(document.createElement('span'), { textContent: '↗' }));
  const headlines = { solar: 'Nos vemos\nafuera.', marea: 'Llévate\nla costa.', orbita: 'Cambia\nde órbita.', umbral: 'El taller\nsale a la calle.', neblina: 'Otra forma\nde florecer.', logic: 'Sube el\nvolumen.' };
  $('#hero-title').textContent = brand.headline || headlines[state.campaign];
  $('#hero-sub').textContent = `${brand.name} / ${collections[brand.latest].name}`;
  $('#inicio').dataset.activeBrand = state.campaign;
  if (!reducedMotion.matches) $('#hero-image').animate([{ opacity: .5, transform: 'scale(1.025)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)' });
  $('#hero-tagline').textContent = brand.tagline;
  all('[data-campaign]').forEach((option) => option.setAttribute('aria-pressed', String(option.dataset.campaign === id)));
  const button = $(`#hero-brands [data-campaign="${id}"]`);
  $('#hero-brands').scrollTo({ left: button.offsetLeft - $('#hero-brands').offsetLeft - 15, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
}
campaignViewport.addEventListener('change', () => showCampaign(state.campaign));
all('[data-campaign]').forEach((button) => button.addEventListener('click', () => showCampaign(button.dataset.campaign)));
$('#campaign-prev').addEventListener('click', () => showCampaign(universeOrder[(universeOrder.indexOf(state.campaign) + universeOrder.length - 1) % universeOrder.length]));
$('#campaign-next').addEventListener('click', () => showCampaign(universeOrder[(universeOrder.indexOf(state.campaign) + 1) % universeOrder.length]));
$('#hero-cta').addEventListener('click', () => filterBrand(state.campaign));

function showProduct(id) {
  const product = byId(id); if (!product) return;
  state.product = product; state.size = product.sizes.length === 1 ? product.sizes[0] : null; state.quantity = 1; state.view = 'product'; state.finish = 0;
  const brand = brands[product.brand];
  $('#detail-brand').textContent = `${brand.name} / ${collections[product.collection].name}`;
  $('[data-view="detail"]').hidden = !brand.detail && !brand.finishes?.length;
  $('[data-view="artwork"]').hidden = !product.print;
  $('[data-view="alternate"]').hidden = !product.alternate;
  $('[data-view="alternate"]').textContent = product.alternate?.label || 'Otra vista';
  $('#print-spec').hidden = !product.print;
  if (product.print) {
    const print = product.print;
    $('#print-spec').innerHTML = `<p class="eyebrow">ARTE / PLANCHA 30 × 30</p><p><strong>${print.widthCm} × ${print.heightCm} cm</strong> · ${print.placement}</p><p>${print.technique}. La escala en el mockup es orientativa; el archivo define la medida.</p><div class="print-downloads"><a href="${print.svg}" download>SVG vectorial ↓</a><a href="${print.png}" download>PNG transparente · 300 ppp ↓</a></div><p class="print-status">${print.status}</p>`;
    if (product.secondaryPrint) {
      const secondary = product.secondaryPrint;
      $('#print-spec').insertAdjacentHTML('beforeend', `<p><strong>Contrapunto micro · ${secondary.widthCm} × ${secondary.heightCm} cm</strong> · ${secondary.placement}</p><div class="print-downloads"><a href="${secondary.svg}" download>SVG frente micro ↓</a><a href="${secondary.png}" download>PNG frente micro · 300 ppp ↓</a></div>`);
    }
  } else $('#print-spec').replaceChildren();
  $('#product-title').textContent = product.name;
  $('#detail-price').textContent = money(product.price);
  $('#detail-description').textContent = product.description;
  $('#detail-color').textContent = product.color;
  $('#detail-swatch').style.background = product.swatch;
  $('#detail-fit').textContent = `${product.fit}. Color: ${product.color}.`;
  $('#detail-quantity').textContent = '1';
  $('#size-error').textContent = '';
  $('#size-options').replaceChildren(...product.sizes.map((size) => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = size;
    button.setAttribute('aria-label', `Talla ${size}`); button.setAttribute('aria-pressed', String(size === state.size));
    button.addEventListener('click', () => { state.size = size; all('#size-options button').forEach((b) => b.setAttribute('aria-pressed', String(b === button))); $('#size-error').textContent = ''; renderTrimSpec(); });
    return button;
  }));
  renderTrimSpec(); renderProductView(); openDialog($('#product-dialog'));
}
function renderTrimSpec() {
  const trims = state.product?.trims;
  const panel = $('#trim-spec');
  panel.hidden = !trims;
  if (!trims) { panel.replaceChildren(); return; }
  const size = state.size || 'M';
  const root = 'assets/trims/ownform/';
  const neckRoot = trims.neckRoot || root;
  const tagRoot = trims.tagRoot || root;
  panel.innerHTML = `<p class="eyebrow">CÓDIGO PROPIO / ${trims.code}</p><p>Interior 60 × 35 mm · manga 40 × 16 mm · kraft 55 × 90 mm.</p><p>Corchetes y barra en manga, marca interior y tarjeta de la pieza. Un mismo sistema, aunque cambie el arte.</p><div class="trim-downloads"><a href="${neckRoot}neck-${size.toLowerCase()}-${trims.neckInk}.svg" download>Interior ${size}${state.size ? '' : ' · muestra'} ↓</a><a href="${root}sleeve-${trims.sleeveInk}.svg" download>Firma de manga ↓</a><a href="${root}hangtag-front.svg" download>Kraft frente ↓</a><a href="${tagRoot}${trims.tagBack}.svg" download>Kraft reverso ↓</a></div><p class="small-note">Sistema de terminaciones propuesto. Revisar materiales y muestra. La marca interior no sustituye la información real de composición y cuidados de la prenda.</p>`;
}
function renderProductView() {
  const product = state.product; const brand = brands[product.brand];
  const isArtwork = state.view === 'artwork' && product.print;
  const finish = state.view === 'detail' ? brand.finishes?.[state.finish] : null;
  const alternate = state.view === 'alternate' ? product.alternate : null;
  $('#detail-image').dataset.filmView = isArtwork ? 'artwork' : state.view === 'campaign' ? 'editorial' : 'product';
  $('#detail-image').src = alternate ? alternate.image : isArtwork ? product.print.svg : state.view === 'product' ? product.image : state.view === 'campaign' ? (product.campaign || collections[product.collection].campaign) : finish?.image || brand.detail;
  $('#detail-image').alt = alternate ? alternate.alt : finish ? finish.alt : isArtwork ? `Arte original ${product.name}, ${product.print.widthCm} por ${product.print.heightCm} centímetros` : state.view === 'product' ? `${product.name}, ${product.color}, ${product.view}` : `${state.view === 'campaign' ? 'Campaña de colección' : 'Etiquetas y terminaciones de la marca'} ${brand.name}`;
  $('#finish-views').hidden = !finish;
  $('#finish-views').innerHTML = finish ? brand.finishes.map((item, index) => `<button type="button" data-finish="${index}" aria-pressed="${index === state.finish}">${item.label}</button>`).join('') : '';
  $('#gallery-caption').hidden = !finish;
  $('#gallery-caption').textContent = finish?.caption || '';
  $('#detail-image').classList.toggle('is-print-art', Boolean(isArtwork));
  $('#detail-image').style.setProperty('--print-background', product.print?.background || 'transparent');
  all('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
}
all('[data-view]').forEach((button) => button.addEventListener('click', () => { state.view = button.dataset.view; renderProductView(); }));
$('#finish-views').addEventListener('click', (event) => {
  const button = event.target.closest('[data-finish]');
  const index = Number(button?.dataset.finish);
  if (!button || !brands[state.product.brand].finishes?.[index]) return;
  state.finish = index; renderProductView();
});
$('#detail-minus').addEventListener('click', () => { state.quantity = Math.max(1, state.quantity - 1); $('#detail-quantity').textContent = state.quantity; });
$('#detail-plus').addEventListener('click', () => { state.quantity = Math.min(maxQuantity, state.quantity + 1); $('#detail-quantity').textContent = state.quantity; });
$('#add-to-cart').addEventListener('click', () => {
  if (!state.size) { $('#size-error').textContent = 'Selecciona una talla para continuar.'; return; }
  const existing = state.cart.find((line) => line.id === state.product.id && line.size === state.size);
  if ((existing?.quantity || 0) + state.quantity > maxQuantity) { $('#size-error').textContent = 'Máximo 10 unidades por prenda y talla en una solicitud.'; return; }
  if (existing) existing.quantity += state.quantity; else state.cart.push({ id: state.product.id, size: state.size, quantity: state.quantity });
  persistCart(); $('#product-dialog').close(); renderCart(); openDialog($('#cart-dialog'));
});
function persistCart() { save('archivo-cart-v1', state.cart); renderCartCount(); }
function subtotal() { return state.cart.reduce((total, line) => total + byId(line.id).price * line.quantity, 0); }
function renderCartCount() {
  const count = state.cart.reduce((total, line) => total + line.quantity, 0);
  $('#cart-count').textContent = count;
  $('#cart-toggle').setAttribute('aria-label', `Abrir bolsa, ${count} productos`);
}
function renderCart() {
  $('#cart-items').innerHTML = state.cart.map((line, index) => {
    const product = byId(line.id);
    return `<article class="cart-line"><img src="${product.image}" alt="${product.name}"><div><div class="cart-line-top"><div><p class="eyebrow">${brands[product.brand].name}</p><h3>${product.name}</h3></div><span class="cart-line-price">${money(product.price * line.quantity)}</span></div><p>Talla ${line.size} · ${product.color}</p><div class="cart-line-bottom"><div class="quantity"><button type="button" data-cart-change="${index}" data-delta="-1" aria-label="Reducir cantidad de ${product.name}, talla ${line.size}">−</button><output>${line.quantity}</output><button type="button" data-cart-change="${index}" data-delta="1" aria-label="Aumentar cantidad de ${product.name}, talla ${line.size}">+</button></div><button type="button" class="remove-item" data-cart-remove="${index}" aria-label="Quitar ${product.name}, talla ${line.size}">Quitar</button></div></div></article>`;
  }).join('');
  $('#cart-empty').hidden = state.cart.length > 0;
  $('#cart-footer').hidden = !state.cart.length;
  $('#cart-subtotal').textContent = money(subtotal());
}
$('#cart-toggle').addEventListener('click', () => { renderCart(); openDialog($('#cart-dialog')); });
$('#continue-shopping').addEventListener('click', () => { $('#cart-dialog').close(); scrollToCatalog(); });
$('#cart-items').addEventListener('click', (event) => {
  const remove = event.target.closest('[data-cart-remove]');
  const change = event.target.closest('[data-cart-change]');
  if (remove) state.cart.splice(Number(remove.dataset.cartRemove), 1);
  else if (change) {
    const index = Number(change.dataset.cartChange); const line = state.cart[index]; const next = line.quantity + Number(change.dataset.delta);
    if (next > maxQuantity) { toast('Máximo 10 unidades por prenda y talla.'); return; }
    if (next < 1) state.cart.splice(index, 1); else line.quantity = next;
  } else return;
  persistCart(); renderCart();
});
$('#start-checkout').addEventListener('click', () => {
  if (!state.cart.length) return;
  state.requestKey = crypto.randomUUID();
  $('#cart-dialog').close();
  $('#checkout-form-view').hidden = false; $('#checkout-success').hidden = true;
  $('#order-error').textContent = '';
  $('#checkout-summary').innerHTML = state.cart.map((line) => `<div><span>${line.quantity} × ${byId(line.id).name} / ${line.size}</span><span>${money(byId(line.id).price * line.quantity)}</span></div>`).join('') + `<div><strong>Subtotal referencial</strong><strong>${money(subtotal())}</strong></div><p>Entrega y precio final por confirmar. No se realiza un pago.</p>`;
  openDialog($('#checkout-dialog'));
});
$('#order-form').addEventListener('submit', async (event) => {
  event.preventDefault(); if (!state.cart.length) return;
  if (isStaticStore) {
    const selection = {
      id: `SELECCION-${state.requestKey}`,
      items: state.cart.map((line) => {
        const product = byId(line.id);
        return { ...line, name: product.name, brand: brands[product.brand].name, price: product.price };
      }),
      subtotal: subtotal(),
    };
    downloadSummary(selection, true);
    toast('Selección descargada. No se ha enviado a la tienda.');
    return;
  }
  const form = event.currentTarget; const button = $('#submit-order');
  button.disabled = true; button.textContent = 'Guardando solicitud…'; $('#order-error').textContent = '';
  try {
    const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestKey: state.requestKey, customer: Object.fromEntries(new FormData(form)), items: state.cart }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo guardar la solicitud.');
    state.order = data.order; state.cart = []; persistCart(); form.reset();
    $('#checkout-form-view').hidden = true; $('#checkout-success').hidden = false;
    $('#success-reference').textContent = `${state.order.id} · ${money(state.order.subtotal)} referenciales`;
    $('#checkout-success').setAttribute('tabindex', '-1'); $('#checkout-success').focus();
  } catch (error) { $('#order-error').textContent = error.message === 'Failed to fetch' ? 'No pudimos conectar con la tienda. Tu bolsa sigue guardada; intenta nuevamente.' : error.message; }
  finally { button.disabled = false; button.replaceChildren(document.createTextNode('Enviar solicitud sin cobro '), Object.assign(document.createElement('span'), { textContent: '↗' })); }
});
$('#download-order').addEventListener('click', () => {
  if (!state.order) return;
  downloadSummary(state.order);
});
function downloadSummary(order, selectionOnly = false) {
  const summary = [selectionOnly ? 'ARCHIVO / Mi selección' : 'ARCHIVO / Solicitud sin cobro', order.id, '', ...order.items.map((item) => `${item.quantity} × ${item.brand} / ${item.name} / ${item.size} / ${money(item.price * item.quantity)}`), '', `Subtotal referencial: ${money(order.subtotal)}`, 'Entrega y precio final por confirmar.', selectionOnly ? 'Selección descargada. No enviada a la tienda. Sin cobro ni reserva.' : 'Estado: solicitud recibida. Sin cobro.'].join('\n');
  const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `${order.id}.txt`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$('#finish-order').addEventListener('click', () => { $('#checkout-dialog').close(); scrollToCatalog(); });
if (isStaticStore) {
  $('.announcement span:last-child').textContent = 'Colección de muestra · Precios referenciales';
  $('footer a[href="admin.html"]').remove();
  $('.footer-bottom span:nth-child(2)').textContent = 'Selección descargable / CLP';
  const steps = all('.how-section li');
  steps[1].querySelector('h3').textContent = 'Descarga tu selección.';
  steps[1].querySelector('p').textContent = 'Guarda un resumen con prendas, tallas, cantidades y precios referenciales. No necesitas dejar datos personales.';
  steps[2].querySelector('h3').textContent = 'Conserva tus favoritos.';
  steps[2].querySelector('p').textContent = 'Tu bolsa queda guardada en este navegador. Esta colección de muestra aún no recibe pedidos ni pagos.';
  $('#start-checkout').textContent = 'Revisar mi selección ↗';
  $('#checkout-form-view > .eyebrow').textContent = 'TU SELECCIÓN / SIN COBRO';
  $('#checkout-title').textContent = 'Tu selección, para guardar.';
  $('.checkout-intro').textContent = 'Descarga el resumen de tu bolsa. No se envía a la tienda ni confirma un pedido.';
  all('#order-form > label, #order-form > .form-row').forEach((field) => field.remove());
  $('#order-form > .small-note').textContent = 'No se envían datos. La descarga no reserva prendas ni realiza cobros.';
  $('#submit-order').textContent = 'Descargar mi selección ↓';
  $('.catalog-note').textContent = 'Colección de muestra. Imágenes de concepto y precios referenciales en CLP. Puedes descargar tu selección; todavía no se reciben pedidos.';
  $('.detail-info > .small-note:last-of-type').textContent = 'Agrega prendas a tu selección. Sin cobro ni reserva.';
}
showCampaign(state.campaign);
renderCatalog(); renderCartCount();
