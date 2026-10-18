# ARCHIVO / Viste tu próximo buen recuerdo.

SALITRE, ALTO SUR, LIMEN, ISLA BRAVA, UMBRAL, NEBLINA, WE ARE LOGIC, SOLAR CLUB, MAREA y ÓRBITA. Diez marcas de ropa de autor, trece colecciones y 37 prendas para playa, montaña y ciudad.

## Marcas y colecciones

- SALITRE: Costa privada. Resort de autor, turquesa, papaya y pequeños horizontes bordados.
- ALTO SUR: Aire abierto. Descanso alpino, óxido, celadón y micrográficas de cumbre.
- LIMEN: Entre horas. Galería urbana, cobalto, cielo, burdeos y pequeñas barras desplazadas.
- ISLA BRAVA: Flor de un día. Papaya, buganvilla y flores de cinco pétalos a distintas escalas.

- UMBRAL: Desfase y Patio. Taller, arquitectura, cobalto y arcilla.
- NEBLINA: Entre capas y Jardín eléctrico. Paisaje, lavanda y pistacho.
- WE ARE LOGIC: Principio y Frecuencia. Gráfica modular, magenta y azul eléctrico.
- SOLAR CLUB: Fuera de oficina. Club de verano, mandarina y amarillo mantequilla.
- MAREA: Pleamar. Olas libres, azul Pacífico y coral.
- ÓRBITA: Club del futuro. Retro futuro, lima, lila y uva.

Cada marca tiene campaña, manifiesto, paleta, símbolo y un perfil para explorar sus colecciones. La franja de campañas se puede deslizar; elegir una marca o usar sus flechas cambia la portada. El explorador permite recorrer las trece colecciones y filtrar el catálogo desde cada una. Dirección actual: `docs/escapes-art-direction.md`; universos anteriores: `docs/art-direction.md`.

## Escapadas y movimiento

Playa, Montaña y Ciudad tienen fotografía, relato, color y un conjunto de tres prendas. Puedes elegir tallas, excluir piezas y añadir el conjunto a la bolsa. La operación comprueba todas las prendas antes de añadirlas; un error de talla o cantidad no añade parte del conjunto.

Dos cintas tipográficas dan ritmo al recorrido. El control de pausa se conserva en el navegador. Las cintas paran cuando salen de pantalla, se oculta la pestaña, se pasa el cursor o el foco queda dentro; el movimiento reducido las convierte en franjas estáticas desplazables.

El catálogo comienza con doce prendas y permite cargar más sin perder filtros. Las seis categorías incluyen camisas, shorts y chaquetas además de las prendas iniciales. La bolsa conserva hasta las 118 combinaciones posibles de producto y talla, con un máximo de diez unidades por combinación; el servidor local comparte este límite con el catálogo.

## GitHub y versión pública

- Sitio: https://deepanalytica.github.io/archivo-tienda/
- Repositorio: https://github.com/deepanalytica/archivo-tienda
- Actions: https://github.com/deepanalytica/archivo-tienda/actions

GitHub Pages publica el catálogo, las campañas, los filtros, los favoritos y la bolsa persistente. Puedes revisar y descargar tu selección como archivo de texto. Esta versión pública no recibe solicitudes, no pide datos personales, no cobra ni reserva prendas. La bolsa se conserva después de descargarla.

El servidor y el panel de gestión siguen disponibles para uso local. Pages no ejecuta Node.js ni la API de solicitudes. Para recibir pedidos en Internet hará falta un backend persistente y autenticación para gestión.

Cada push a `main` ejecuta las pruebas de ambas versiones y despliega `_site/` únicamente si pasan. Los pull requests ejecutan las pruebas sin desplegar. También se puede ejecutar el workflow manualmente desde Actions.

`npm run build` genera `_site/` con una lista explícita de archivos públicos y las imágenes WebP. No incluye el panel, el servidor, pedidos ni resultados de pruebas. `data/`, `output/`, `node_modules/`, `.env` y los archivos generados están excluidos del repositorio.

## Abrir

Desde esta carpeta:

```powershell
node server.cjs
```

Tienda: http://127.0.0.1:4178

Gestión: http://127.0.0.1:4178/admin.html

La tienda se debe abrir mediante este servidor, no como un archivo `file://`, para poder guardar las solicitudes.

## Qué funciona

- 37 prendas con fotografías individuales de producto, incluyendo los nueve productos originales.
- Diez perfiles de marca, trece colecciones y tres escapadas con conjuntos completos.
- Búsqueda por prenda, color, marca, colección o destino; filtros por destino, marca, colección y tipo; ordenamiento por precio y favoritos.
- Ficha de producto con prenda, campaña y detalle de marca. Estas últimas son vistas editoriales de la colección, no fotografías adicionales del mismo SKU.
- Tallas S, M, L, XL para prendas y Única para gorros; cantidades de 1 a 10 por producto/talla.
- Bolsa persistente en el navegador. Se pueden mezclar productos de las diez marcas, conservando las selecciones anteriores.
- Solicitud sin cobro: nombre, correo, ciudad y campos opcionales para teléfono y nota.
- Guardado real de las solicitudes en `data/orders.json` dentro de este equipo.
- Resumen descargable para la persona que solicita.
- Panel de gestión con búsqueda, filtro y estados Pendiente, Contactado, Confirmado y Cancelado.
- Exportación JSON desde gestión. Cambiar un estado no envía notificaciones.

## Catálogo y precios

`catalog.js` es la fuente de productos, precios y tallas. El servidor usa el mismo catálogo y vuelve a calcular el subtotal; nunca acepta precios enviados por el navegador.

Los precios son cifras referenciales para diseñar y probar la tienda: poleras $24.990–$38.990; polerones $54.990–$79.990; gorros $16.990–$29.990; camisas $79.990–$89.990; shorts $49.990–$54.990; chaqueta $119.990 CLP. No son una cotización de producción ni precios aprobados por el dueño. Precio final, disponibilidad, medidas, composición y entrega se confirman antes de un pedido real.

Cada fotografía fue generada como mockup de concepto. No acredita stock fabricado. Los nombres de marca no tienen disponibilidad registral verificada en este trabajo.

## Datos y alcance local

El servidor escucha exclusivamente en `127.0.0.1`. El panel de gestión está pensado para el dueño en este mismo equipo y no tiene cuentas de usuario. El servidor y el panel no forman parte del sitio público de Pages.

Esta versión recibe y guarda solicitudes; no cobra, no reserva inventario, no calcula despacho y no envía correos o mensajes. El cliente deja su correo y el dueño gestiona el contacto.

Para abrir la tienda al público, la recepción de solicitudes debe moverse a un alojamiento persistente y el panel de gestión debe contar con autenticación. Esos servicios no se han configurado ni contratado.

No borres `data/orders.json` si contiene pedidos que quieras conservar. Las pruebas automatizadas escriben en carpetas independientes bajo `output/qa-data-*`, nunca en los datos reales.

## Verificación

Con Node.js 22 o superior:

```powershell
npm ci
npx playwright install chromium
npm test
```

También puedes usar Chrome instalado definiendo `PLAYWRIGHT_CHANNEL=chrome`. Playwright solo se necesita para las pruebas; el servidor local y el build usan módulos incluidos en Node.js.

Comprueba navegación y diseño en 1440 y 390 px, búsqueda y filtros, favoritos, persistencia de la bolsa, mezcla de marcas, tallas, cantidades, envío de solicitud, descarga y gestión. En el servidor comprueba recálculo de precios, reintentos concurrentes sin duplicado, rechazo de tallas/cantidades inválidas y que los datos privados no se sirvan como archivos públicos.

Capturas e informe: `output/playwright/`.

`verify-pages.cjs` prueba la versión pública bajo `/archivo-tienda/`, en 1440 y 390 px: imágenes, filtros, persistencia, bolsa con distintas marcas y contenido de la descarga. Comprueba que no se envíen solicitudes a la API, que no aparezca una confirmación de pedido y que los archivos privados queden fuera del sitio. Informe y capturas: `output/pages/`.

## Imágenes

`assets/products/` contiene las 37 prendas en WebP. Se conservan los nueve PNG originales. `assets/brands/` reúne campañas anteriores, diez campañas nuevas de las dos ampliaciones y detalles de las marcas iniciales.

Las ampliaciones incorporan 38 imágenes de ImageGen integrado: 18 de la primera edición y 20 de esta edición de escapadas. Prompts exactos y correspondencia con archivos: `docs/image-prompts.json`. Cada WebP nuevo tiene `.prompt.txt` y procedencia; los PNG nuevos se conservan localmente en `output/imagegen/`. La publicación incluye WebP y tipografías alojadas localmente.

Generación mediante `imagegen` integrado, con las cápsulas anteriores como referencia. Prompt base de cada producto: fotografía de catálogo de una sola prenda, preservar símbolo/paleta/estampado de la referencia, fondo de yeso gris cálido, luz difusa, algodón y costuras reales, formato cuadrado, sin otros productos, personas, maniquíes, marcas ajenas ni watermark. Para poleras y polerones se conserva el frente o espalda indicado en `catalog.js`; para gorros, ángulo frontal de tres cuartos.

Las imágenes originales y el concepto de UMBRAL permanecen en `../umbral/`; NEBLINA y WE ARE LOGIC, en `../marcas/`.
