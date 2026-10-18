/* Manual summer lookbook: no autoplay and no additions to the product catalog. */
const summerScenes = [
  { id: 'resort', label: 'Resort', title: 'El verano tiene otra forma.', brands: 'SALITRE × ISLA BRAVA', description: 'Turquesa, papaya y lavanda. Una camisa abierta al día y una flor que ocupa su espacio.', alt: 'Hombre rubio con camisa marfil de SALITRE y mujer rubia con camisa papaya de ISLA BRAVA junto a una puerta cobalto y el mar', products: ['salitre-shirt', 'brava-shirt'], palette: ['#37b9c5', '#f37932', '#c5b2df'], note: 'Camisas del catálogo. Shorts, calzado y accesorios: estilismo editorial.' },
  { id: 'color', label: 'Color', title: 'Sin bajar la intensidad.', brands: 'ÓRBITA × ISLA BRAVA', description: 'Lima ácida, buganvilla y papaya. Micrográficas discretas sobre color protagonista y proporciones elegantes.', alt: 'Modelo rubio con polera lima ÓRBITA y modelo rubia con polera buganvilla ISLA BRAVA, pantalones amplios y muro azul', products: ['orbita-tee', 'brava-tee'], palette: ['#d4ed51', '#e72c84', '#f58b43'], note: 'Poleras del catálogo. Pantalones, calzado y accesorios: estilismo. El aspecto flúor es cromático; pigmento y acabado se validan con muestra.' },
  { id: 'led', label: 'LED', title: 'Cuando el sol cambia de lugar.', brands: 'OWN FORM × WE ARE LOGIC', description: 'Carbón, magenta y cobalto. Luz cian y rosa, mirada directa y una noche que todavía no termina.', alt: 'Hombre rubio con polera Not Here y mujer rubia con polera Frecuencia de espaldas, entre luces LED cian y magenta', products: ['ownform-not-here-tee', 'logic-frecuencia-tee'], palette: ['#242d33', '#e6258f', '#28d6eb'], note: 'Poleras del catálogo. Pantalón, shorts y accesorios: estilismo. Los LED iluminan la escena; las prendas no emiten luz.' },
  { id: 'aesthetic', label: 'Aesthetic', title: 'La última luz se queda.', brands: 'NEBLINA', description: 'Lavanda, pistacho y el reflejo del atardecer. Una capa de color para alargar la tarde.', alt: 'Mujer rubia con polerón lavanda Invernadero de NEBLINA y shorts marfil en un patio al atardecer', products: ['neblina-jardin-hoodie'], palette: ['#c8b5e3', '#c8dca1', '#edb094'], note: 'Polerón del catálogo. Shorts, calzado y accesorios: estilismo. Fotografía de concepto, sin composición o peso de tela verificados.' },
  { id: 'city', label: 'Ciudad', title: 'Presencia, sin levantar la voz.', brands: 'OWN FORM', description: 'Blanco cálido, azul cobalto y una nube de caracteres. Una polera de autor también puede vestirse con sastrería.', alt: 'Hombre rubio de cabello ondulado con polera Quiet Confidence y pantalones cobalto frente a pared durazno y puerta turquesa', products: ['ownform-quiet-tee'], palette: ['#f3eddf', '#2454bd', '#67a9a4'], note: 'Polera del catálogo. Pantalones, calzado y accesorios: estilismo. Mockup editorial de concepto.' },
];
let activeSummerScene = 0;

function renderSummerScene(index) {
  activeSummerScene = (index + summerScenes.length) % summerScenes.length;
  const scene = summerScenes[activeSummerScene];
  $('#summer-image').src = `assets/brands/summer-${scene.id}.webp`;
  $('#summer-image').alt = scene.alt;
  $('#summer-panel').setAttribute('aria-labelledby', `summer-tab-${scene.id}`);
  $('#summer-title').textContent = scene.title;
  $('#summer-brands').textContent = scene.brands;
  $('#summer-description').textContent = scene.description;
  $('#summer-note').textContent = scene.note;
  $('#summer-counter').textContent = `${String(activeSummerScene + 1).padStart(2, '0')} / ${String(summerScenes.length).padStart(2, '0')}`;
  $('#summer-palette').innerHTML = scene.palette.map((color) => `<span style="background:${color}" aria-hidden="true"></span>`).join('');
  $('#summer-products').innerHTML = scene.products.map((id) => {
    const product = byId(id);
    return `<button type="button" data-open-product="${id}">${brands[product.brand].name} / ${product.name} <span aria-hidden="true">↗</span></button>`;
  }).join('');
  all('#summer-tabs [role="tab"]').forEach((tab, tabIndex) => {
    tab.setAttribute('aria-selected', String(tabIndex === activeSummerScene));
    tab.tabIndex = tabIndex === activeSummerScene ? 0 : -1;
  });
}

$('#summer-tabs').innerHTML = summerScenes.map((scene, index) => `<button type="button" id="summer-tab-${scene.id}" role="tab" aria-controls="summer-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-summer-index="${index}"><img src="assets/brands/summer-${scene.id}.webp" alt="" width="1536" height="1024" loading="lazy"><span>${String(index + 1).padStart(2, '0')} / ${scene.label}</span></button>`).join('');
$('#summer-tabs').addEventListener('click', (event) => {
  const tab = event.target.closest('[data-summer-index]');
  if (tab) renderSummerScene(Number(tab.dataset.summerIndex));
});
$('#summer-tabs').addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? summerScenes.length - 1 : activeSummerScene + (event.key === 'ArrowRight' ? 1 : -1);
  renderSummerScene(next);
  $(`#summer-tab-${summerScenes[activeSummerScene].id}`).focus({ preventScroll: true });
});
$('#summer-prev').addEventListener('click', () => renderSummerScene(activeSummerScene - 1));
$('#summer-next').addEventListener('click', () => renderSummerScene(activeSummerScene + 1));
renderSummerScene(0);
