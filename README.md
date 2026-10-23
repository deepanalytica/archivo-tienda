# ARCHIVO Clothing & Art / Arte que se lleva.

OWN FORM, IMAGO, SALITRE, ALTO SUR, LIMEN, ISLA BRAVA, UMBRAL, NEBLINA, WE ARE LOGIC, SOLAR CLUB, MAREA y ÓRBITA. Doce marcas de ropa de autor, dieciséis colecciones y 51 prendas para playa, montaña y ciudad.

## Marcas y colecciones

- OWN FORM: Self Defined. Frases en inglés, tipografía de contraste y arte ASCII. Tres estampados grandes de 26, 27 y 28 cm y una micrográfica de 8 cm, con SVG y PNG transparentes para prueba de proveedor. Dirección y límites de producción: `docs/ownform-art-direction.md`.
- Su identidad física agrega interior, colgante kraft café y firma de manga; las fichas permiten recorrer los tres detalles y descargar plantillas. `docs/ownform-identidad-fisica.md` reúne medidas y límites de producción. Inner Signal es un estudio aparte, no un nuevo SKU en venta.
- IMAGO: Herbario indócil. Mariposas, flores abstractas de gran escala, azul tinta, amapola y blanco cálido. Dos poleras, un polerón y un gorro; dos fotografías editoriales con modelos.
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

Cada marca tiene campaña, manifiesto, paleta, símbolo y un perfil para explorar sus colecciones. La franja de campañas se puede deslizar; elegir una marca o usar sus flechas cambia la portada. El explorador permite recorrer las quince colecciones y filtrar el catálogo desde cada una. Dirección actual: `docs/ownform-art-direction.md`; IMAGO: `docs/imago-art-direction.md`; escapadas: `docs/escapes-art-direction.md`; universos anteriores: `docs/art-direction.md`.

## Firmas con otra dimensión

Las doce marcas tienen firmas vectoriales y símbolos dibujados para esta edición: letras intervenidas, monogramas, pliegues, encajes y planos en perspectiva. Aparecen en la franja de marcas, colecciones, campañas editoriales, escapadas, perfiles y cinta de marcas. El muestrario «No se parecen. Se reconocen.» permite recorrerlas con ratón o teclado y pasar a sus prendas.

`assets/identities/` entrega treinta y seis SVG de marcas, además de la firma maestra de ARCHIVO: símbolo, firma tipográfica y combinación de ambos para cada marca. `identities.js` comparte sus trazados con la interfaz. Los contornos tipográficos derivan de las fuentes locales Archivo y Fraunces, con sus licencias OFL conservadas. Se pueden regenerar con `python scripts/generate-identities.py` (requiere fontTools, sólo para desarrollo). Dirección: `docs/identity-art-direction.md`.

Las fotografías de concepto conservan las gráficas de sus colecciones; las nuevas firmas digitales no se presentan como estampados exactos de todas las prendas.

## Escapadas y movimiento

La galería `#verano` agrega cinco campañas con modelos rubios y rubias: Resort, Color, LED, Aesthetic y Ciudad. Se recorre mediante miniaturas, flechas o teclado, sin autoplay y sin recortar las fotos en móvil. Enlaza las prendas existentes; los complementos de estilismo no se añaden al catálogo. Dirección: `docs/summer-art-direction.md`; prompts: `docs/summer-image-prompts.json`.

Playa, Montaña y Ciudad tienen fotografía, relato, color y un conjunto de tres prendas. Puedes elegir tallas, excluir piezas y añadir el conjunto a la bolsa. La operación comprueba todas las prendas antes de añadirlas; un error de talla o cantidad no añade parte del conjunto.

Dos cintas tipográficas dan ritmo al recorrido. El control de pausa se conserva en el navegador. Las cintas paran cuando salen de pantalla, se oculta la pestaña, se pasa el cursor o el foco queda dentro; el movimiento reducido las convierte en franjas estáticas desplazables.

El catálogo muestra las 51 prendas desde el inicio, con carga diferida de imágenes. Un índice visible reúne las quince colecciones y muestra cuántas prendas contiene cada una. «Ver todo el catálogo» elimina los filtros activos. Las seis categorías incluyen camisas, shorts y chaquetas además de las prendas iniciales. La bolsa admite todas las combinaciones de producto y talla del catálogo, con un máximo de diez unidades por combinación; el servidor local comparte este límite con el catálogo.

## GitHub y versión pública

- Sitio: https://deepanalytica.github.io/archivo-tienda/
- Repositorio: https://github.com/deepanalytica/archivo-tienda
- Actions: https://github.com/deepanalytica/archivo-tienda/actions

GitHub Pages publica el catálogo, las campañas, los filtros, los favoritos y la bolsa persistente. Puedes revisar y descargar tu selección como archivo de texto. Esta versión pública no recibe solicitudes, no pide datos personales, no cobra ni reserva prendas. La bolsa se conserva después de descargarla.

El servidor y el panel de gestión siguen disponibles para uso local. Pages no ejecuta Node.js ni la API de solicitudes. Para recibir pedidos en Internet hará falta un backend persistente y autenticación para gestión.

Cada push a `main` ejecuta las pruebas de ambas versiones y despliega `_site/` únicamente si pasan. Los pull requests ejecutan las pruebas sin desplegar. También se puede ejecutar el workflow manualmente desde Actions.

`npm run build` genera `_site/` con una lista explícita de archivos públicos y las imágenes WebP. No incluye el panel, el servidor, pedidos ni resultados de pruebas. `data/`, `output/`, `node_modules/`, `.env` y los archivos generados están excluidos del repositorio.

Los nuevos PNG originales de fotografía se conservan localmente y se excluyen del repositorio; la publicación usa WebP. Los PNG transparentes de artes y etiquetas sí se versionan e incluyen en el sitio, porque forman parte de las descargas. El modo de producción acordado es catálogo público y selección descargable, sin recepción de pedidos ni cobros online.

## Abrir

Desde esta carpeta:

```powershell
npm start
```

Tienda: http://127.0.0.1:4178

Gestión: http://127.0.0.1:4178/admin.html

La tienda se debe abrir mediante este servidor, no como un archivo `file://`, para poder guardar las solicitudes. `npm start` vigila los cambios del servidor y su catálogo y reinicia el proceso cuando cambian, para que las rutas y los productos no queden en una versión anterior. `/api/health` informa los totales del catálogo que el servidor tiene cargado.

## Qué funciona

- 51 prendas con fotografías individuales de producto, incluyendo los nueve productos originales.
- Doce perfiles de marca, dieciséis colecciones y tres escapadas con conjuntos completos.
- OTHER NATURE de OWN FORM agrega seis piezas en cuatro capítulos: SIGNAL, REFRACT, AFTERIMAGE y ARCHIVE. Flores ASCII, árbol, ave, islas y paisaje; incluye contrapunto micro y vista frontal del polerón.
- OWN FORM incluye una vista del arte original, medidas físicas y descargas SVG/PNG de 300 ppp en cada ficha; requieren prueba de proveedor antes de producción.
- Sus terminaciones incluyen 32 plantillas SVG/PNG: interiores por talla, tres tintas de manga, frente y reversos de kraft, guía de corte y estudio ASCII. La etiqueta interior descargable sigue la talla elegida; sin selección muestra M claramente identificada como ejemplo. OTHER NATURE tiene interiores y reversos propios.
- Búsqueda por prenda, color, marca, colección o destino; filtros por destino, marca, colección y tipo; ordenamiento por precio y favoritos.
- Ficha de producto con prenda, campaña y detalle de marca. Estas últimas son vistas editoriales de la colección, no fotografías adicionales del mismo SKU.
- Tallas S, M, L, XL para prendas y Única para gorros; cantidades de 1 a 10 por producto/talla.
- Bolsa persistente en el navegador. Se pueden mezclar productos de las doce marcas, conservando las selecciones anteriores.
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

Las fotografías se muestran con un revelado fílmico no destructivo: curvas RGB cálidas, sombras suaves y grano monocromo estático en campañas; tratamiento más neutro en producto. Las vistas de arte, archivos descargables, logos y controles quedan fuera del efecto. Implementación y alcance: `docs/film-look.md` y `film-look.css`.

`assets/products/` contiene las 51 prendas en WebP, además de la vista frontal micro de Refract Isles. Se conservan los PNG originales disponibles. `assets/brands/` reúne campañas anteriores y detalles de las marcas iniciales. IMAGO y Self Defined de OWN FORM agregan seis imágenes de concepto cada una: cuatro prendas y dos editoriales, con PNG local y WebP para la web. Prompts de Self Defined: `docs/ownform-image-prompts.json`.

OTHER NATURE incorpora nueve mockups finales: siete vistas de prenda y dos editoriales. Artes y terminaciones: `assets/prints/other-nature/` y `assets/trims/other-nature/`. Dirección, medidas y precauciones de fabricación: `docs/other-nature.md`. Prompts exactos: `docs/other-nature-image-prompts.json`.

Las ampliaciones incorporan 38 imágenes de ImageGen integrado: 18 de la primera edición y 20 de esta edición de escapadas. Prompts exactos y correspondencia con archivos: `docs/image-prompts.json`. Cada WebP nuevo tiene `.prompt.txt` y procedencia; los PNG nuevos se conservan localmente en `output/imagegen/`. La publicación incluye WebP y tipografías alojadas localmente.

Generación mediante `imagegen` integrado, con las cápsulas anteriores como referencia. Prompt base de cada producto: fotografía de catálogo de una sola prenda, preservar símbolo/paleta/estampado de la referencia, fondo de yeso gris cálido, luz difusa, algodón y costuras reales, formato cuadrado, sin otros productos, personas, maniquíes, marcas ajenas ni watermark. Para poleras y polerones se conserva el frente o espalda indicado en `catalog.js`; para gorros, ángulo frontal de tres cuartos.

Las imágenes originales y el concepto de UMBRAL permanecen en `../umbral/`; NEBLINA y WE ARE LOGIC, en `../marcas/`.

## Laboratorio de preproducción para las 12 marcas

OWN FORM mantiene sus artes, trims y guías existentes. La carpeta `docs/production/` detalla un programa de desarrollo para las otras once marcas: 22 estudios de estampado vectoriales, 77 plantillas de marca/colgante y una matriz de validaciones pendiente por calidad y prenda. Es material **de estudio para cotizaciones y muestras**, no arte listo para tirada en serie ni nuevos SKU aprobados. Revisa `assets/prints/brand-lab/`, `assets/trims/brand-lab/` y `docs/production/prepress.md`.

Validación de los 99 SVG: `python scripts/verify-brand-production.py`. Rasterización opcional: `node scripts/render-brand-production.cjs`, que requiere Sharp disponible localmente y guarda PNG en `output/production-renders`; este paso no participa en el despliegue público.

## Identidad institucional de ARCHIVO / V2

La portada `index.html` separa la **marca madre** de las 12 campañas autónomas: un único lockup en cabecera, hero manifiesto «Un archivo. Muchos mundos.», índice curado y acceso a `estudio.html`. Logotipo combinado, monograma, favicon y retícula están en `assets/identities/archivo-*.svg`; reglas de uso en `docs/archivo-brand-system-v2.md` y estilos en `archivo-platform.css`.

Las nuevas secciones **no cambian el catálogo ni convierten las imágenes conceptuales en productos fabricados**. El despliegue en GitHub Pages continúa sin pasarela de pago. El control de regresión `node scripts/verify-brand-platform.cjs` comprueba que el logo no se repita en el hero y que los recursos estén publicados.

## Publicación web y recuperación de Pages

La web pública se genera desde el workflow `.github/workflows/pages.yml` con `npm test` y `scripts/build-pages.cjs`; publica `_site` mediante GitHub Actions. La URL prevista es https://deepanalytica.github.io/archivo-tienda/. Si el repositorio cambia de visibilidad, comprobar nuevamente `Settings → Pages → Build and deployment: GitHub Actions` y ejecutar un flujo completo para regenerar el artefacto `github-pages`. Volver a ejecutar únicamente el trabajo `deploy` de un flujo anterior puede fallar si el artefacto del nuevo intento no está disponible.

La portada comercial usa el logo tipográfico y los estilos `archivo-premium.css` / `archivo-premium.js`; su estado de producción debe confirmarse con el resultado de Actions y el sitio accesible.
