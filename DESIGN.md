---
name: ARCHIVO
description: Un archivo de mundos propios; fotografía, papel cálido y seis identidades de ropa de autor.
colors:
  paper: "#f6f4ee"
  ink: "#21221f"
  muted: "#595b52"
  line: "#21221f25"
  sand: "#e9e5dc"
  accent: "#2945bd"
  purple: "#402650"
  lime: "#d5ea72"
  white: "#ffffff"
  purple-hover: "#573763"
  product-surface: "#eee9df"
  stories-surface: "#ede9e2"
  umbral-cobalt: "#2453d4"
  umbral-clay: "#d96837"
  umbral-bone: "#f3e6cc"
  neblina-lavender: "#c8b5e3"
  neblina-pistachio: "#d4e4a8"
  neblina-forest: "#354d3d"
  logic-magenta: "#ca287b"
  logic-electric: "#1847c7"
  logic-pink: "#f5c6d7"
  solar-tangerine: "#f36b36"
  solar-butter: "#f6e39e"
  solar-blue: "#234ac6"
  marea-pacific: "#204bc7"
  marea-coral: "#eb6559"
  marea-foam: "#e5eef2"
  orbita-lime: "#d4ed51"
  orbita-lilac: "#c8b6e4"
  orbita-grape: "#4a2a66"
  solar-panel-ink: "#67351c"
  marea-panel: "#dce9ef"
  marea-panel-ink: "#14368f"
  neblina-panel: "#d5e4b3"
  logic-panel: "#edbbd3"
  logic-panel-ink: "#642344"
  desfase-panel: "#e7dbce"
  desfase-ink: "#602f37"
  entre-capas-panel: "#dce2d8"
  entre-capas-ink: "#35453e"
  principio-panel: "#e9dfc4"
  principio-ink: "#373329"
  solar-strip-ink: "#502719"
  botanical-strip-ink: "#352044"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(65px, 8.2vw, 112px)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  campaign:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(40px, 5.3vw, 76px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(34px, 4.5vw, 64px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  collection-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(36px, 4.2vw, 62px)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  product-title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "14px"
  narrative:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "13px"
    lineHeight: 1.8
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "10px"
    lineHeight: 1.6
    letterSpacing: "0.065em"
rounded:
  square: "0px"
  circular: "50%"
spacing:
  section-block: "clamp(55px, 7vw, 105px)"
  page-inline: "clamp(20px, 4vw, 64px)"
  catalog-block-start: "clamp(72px, 8vw, 120px)"
  grid-column: "24px"
  grid-row: "42px"
  mobile-grid-column: "13px"
  mobile-grid-row: "30px"
  story-copy: "30px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "18px 22px"
  button-primary-hover:
    backgroundColor: "{colors.purple-hover}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "18px 22px"
  button-collection:
    backgroundColor: "transparent"
    textColor: "inherit"
    rounded: "{rounded.square}"
    padding: "15px 18px"
  filter-selected:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
    padding: "11px 15px"
  product-card:
    backgroundColor: "{colors.product-surface}"
    rounded: "{rounded.square}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "78px"
  search:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    height: "44px"
  collection-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "12px 0"
  campaign-switch:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    padding: "14px 0"
  brand-tile-solar:
    backgroundColor: "{colors.solar-tangerine}"
    textColor: "{colors.solar-strip-ink}"
    padding: "22px 12px"
  brand-story-solar:
    backgroundColor: "{colors.solar-butter}"
    textColor: "{colors.solar-panel-ink}"
    padding: "30px"
---

# Design System: ARCHIVO

## Overview

**Creative North Star: "Un archivo de mundos propios"**

ARCHIVO reúne seis universos reconocibles dentro de una estructura editorial común. El papel cálido sostiene fotografías de campaña con materialidad de algodón, grandes firmas tipográficas y paneles de color vinculados a cada marca. El color aparece en superficies amplias, símbolos y prendas; la selección conserva una lectura clara de producto, nombre, color y precio.

La extensión conserva el mundo de UMBRAL, NEBLINA y WE ARE LOGIC e incorpora SOLAR CLUB, MAREA y ÓRBITA. Esta documentación describe la implementación existente en `styles.css`, `catalog.js`, `app.js` e `index.html`, contrastada con `docs/art-direction.md` y capturas de `output/pages/`. No hubo una composición aprobada previa ni una semilla de diseño: la autoridad es la superficie construida y su contrato de dirección.

**Key Characteristics:**
- Fotografía protagonista, con prendas y campañas como imágenes distintas.
- Papel cálido compartido y paneles cromáticos propios por marca y colección.
- Archivo para estructura y Fraunces para titulares expresivos y determinadas firmas.
- Esquinas rectas, líneas finas y jerarquía por escala y color.
- Exploración manual, estados de selección explícitos y movimiento opcional.

## Colors

Las primitivas del frontmatter son normativas; los colores de marca y los pares de colección se extraen del catálogo, no de una aproximación a las fotografías.

### Primary

`purple` sostiene anuncio, pie, botones principales, filtros seleccionados, contador de bolsa y avisos. `lime` acompaña el manifiesto y la firma del pie. `accent` identifica el foco de teclado general y del buscador. `purple-hover` es el cambio del botón principal al pasar el cursor.

### Secondary

| Marca | Paleta | Aplicación y símbolo |
| --- | --- | --- |
| SOLAR CLUB | `solar-tangerine`, `solar-butter`, `solar-blue` | Club de verano, cancha y sobremesa; sol de ocho rayos. |
| MAREA | `marea-pacific`, `marea-coral`, `marea-foam` | Costa del Pacífico y gráfica de surf; doble ola. |
| ÓRBITA | `orbita-lime`, `orbita-lilac`, `orbita-grape` | Retro futuro y formas espaciales; elipse y planeta. |
| UMBRAL | `umbral-cobalt`, `umbral-clay`, `umbral-bone` | Taller, campos de color y arquitectura cotidiana; dos umbrales desplazados. |
| NEBLINA | `neblina-lavender`, `neblina-pistachio`, `neblina-forest` | Botánica sensible y paisaje; líneas de montaña. |
| WE ARE LOGIC | `logic-magenta`, `logic-electric`, `logic-pink` | Gráfica modular urbana; ángulos repetidos. |

La franja usa el primer color de cada paleta. Su texto es blanco salvo SOLAR CLUB (`solar-strip-ink`) y ÓRBITA/NEBLINA (`botanical-strip-ink`). Las muestras de paleta muestran los tres colores sin convertirlos en controles.

**The Collection Pair Rule.** Usa juntos el fondo y la tinta definidos para cada colección; las tarjetas editoriales y el diálogo de marca usan el par de su colección más reciente.

| Colección | Fondo / tinta |
| --- | --- |
| Fuera de oficina | `solar-butter` / `solar-panel-ink` |
| Pleamar | `marea-panel` / `marea-panel-ink` |
| Club del futuro | `orbita-lime` / `orbita-grape` |
| Patio | `umbral-cobalt` / `white` |
| Jardín eléctrico | `neblina-panel` / `neblina-forest` |
| Frecuencia | `logic-panel` / `logic-panel-ink` |
| Desfase | `desfase-panel` / `desfase-ink` |
| Entre capas | `entre-capas-panel` / `entre-capas-ink` |
| Principio | `principio-panel` / `principio-ink` |

### Neutral

`paper` es el lienzo y la navegación; `ink` la lectura base; `muted` el apoyo editorial. `line` separa controles y filas con tinta translúcida. `product-surface` sostiene imágenes de prendas; `stories-surface` agrupa las marcas. `sand` se conserva en superficies de detalle y resumen. Los colores de producto son datos del SKU y no sustituyen la paleta de marca.

## Typography

**Display Font:** Archivo, Arial, sans-serif. **Expressive Font:** Fraunces, Georgia, serif. Ambas fuentes variables se alojan en `assets/fonts/`; no se necesita una fuente remota.

La firma ARCHIVO es ancha y pesada; Fraunces aporta el contraste de los titulares de campaña, nombres de colección y énfasis editoriales. Los énfasis usan estilo normal y los ejes `SOFT` (60) y `WONK` (1). Las firmas de MAREA y NEBLINA solicitan cursiva en CSS; la fuente local declarada es normal.

### Hierarchy

- **Display:** la firma hero utiliza `display`; la navegación reduce la firma a (29px) y la conserva en peso (850). El pie utiliza `clamp(60px, 13vw, 180px)`.
- **Campaign:** `campaign` para el titular sobre fotografía; mantiene saltos de línea y balance de texto. En móvil pasa a `clamp(40px, 12vw, 60px)`.
- **Headline:** `headline` para secciones, con énfasis en Fraunces. En móvil las secciones principales usan (38px).
- **Collection title:** `collection-title`, con ancho máximo (10ch) en escritorio y hasta (14ch) en el diseño apilado; en móvil usa (45px).
- **Product title:** `product-title`, reducido a (16px) bajo (1050px), (15px) bajo (680px) y (14px) bajo (375px). Los precios usan cifras tabulares.
- **Body:** `body` es la base; los textos editoriales usan `narrative`, con anchos habituales de (30–48ch). La nota de catálogo llega a (76ch).
- **Label:** `label` corresponde a la marca sobre el nombre de prenda, en mayúsculas. Controles y enlaces usan normalmente (11–12px), con ajustes móviles.

Las firmas distinguen las marcas sin cambiar la estructura de interacción: SOLAR CLUB usa Fraunces (750); MAREA Fraunces (650) y cursiva; NEBLINA Fraunces (450) y cursiva; ÓRBITA Archivo (750), expansión (125%) y espaciado (.035em); WE ARE LOGIC Archivo (800) y condensación (85%); UMBRAL Archivo (600) y espaciado (.045em).

## Layout

No hay una caja central de ancho máximo para toda la página. Las secciones siguen el ancho de ventana con margen interno fluido `page-inline` y ritmo vertical `section-block`; el catálogo usa `catalog-block-start`. La navegación permanece pegada al borde superior con altura (78px), reducida a (68px) en móvil. El desplazamiento a anclas reserva (100px) arriba, o (80px) bajo (680px).

El hero ocupa hasta (730px) con mínimo (560px), fotografía a sangre y texto superpuesto a la izquierda. En móvil usa `calc(100svh - 96px)`, mínimo (540px), recorte de imagen al (67%) horizontal y gradiente inferior más intenso. La firma queda arriba; el titular y la llamada se asientan sobre el área inferior. Los seis selectores pasan de seis columnas a tres columnas y dos filas bajo (680px).

La franja de marcas pasa de seis a tres columnas bajo (760px). El explorador presenta imagen y panel en proporción (1.25fr / 1fr), ajusta a (1.05fr / 1fr) bajo (1050px) y se apila bajo (760px). Sus nueve botones forman una fila con desplazamiento horizontal. El catálogo usa tres columnas, con `grid-row` y `grid-column`; bajo (680px) usa dos columnas y separaciones móviles. Las imágenes de prenda son cuadradas; el precio baja bajo el texto en móvil.

Las historias usan dos columnas y fotografías (1.52:1); bajo (680px) pasan a una columna y fotos (1.35:1). El diálogo de marca pasa de dos columnas a una bajo (760px), y a toda la pantalla bajo (680px). Producto y revisión también ocupan la pantalla móvil. La bolsa es un panel derecho de (470px), limitado al ancho disponible y con altura de ventana. El panel de navegación central se oculta bajo (680px); permanecen firma, favoritos y bolsa.

## Elevation & Depth

La profundidad procede de fotografía, superficies de color y superposición. No hay sombras de caja en los componentes implementados. Líneas finas separan filtros, tallas, filas y resúmenes; los contenedores editoriales se distinguen por el fondo. El hero usa gradientes oscuros para sostener el texto. Los diálogos añaden un velo (`#131511a6`) con desenfoque (5px); los controles de cierre conservan papel opaco. La navegación y el favorito sobre producto usan fondo opaco, sin desenfoque.

## Shapes

Botones, paneles, fotografías, campos y diálogos conservan esquinas rectas. El contador de bolsa y las muestras de color del producto son circulares; las muestras de paleta de marca son cuadrados de (26px), separados por (5px), con borde fino. Los símbolos de marca usan SVG lineal de (48 × 48), sin relleno y trazo (2), adaptado al tamaño del contexto.

## Components

### Buttons and selection

Los botones principales combinan `purple` y blanco; los de hero combinan papel y tinta. La base tiene altura mínima (52px), relleno (18px 22px), texto (12px) y una flecha separada. El botón del hero ajusta altura, texto y relleno al contexto. El botón de colección es transparente, con borde de (1px) en la tinta del panel y altura mínima (48px); al pasar el cursor invierte el par de colección. Los botones se desplazan arriba (2px) al pasar el cursor.

Los filtros de marca usan altura mínima (44px), sin borde; la selección es un bloque violeta con texto blanco y `aria-pressed`. Los botones del explorador mantienen fondo transparente y una línea inferior violeta de (2px) para la colección seleccionada. Cambiar la colección del explorador actualiza imagen, panel y texto; su llamada aplica marca y colección al catálogo. Los filtros de colección incompatibles con la marca quedan deshabilitados.

### Photography and cards

La prenda se presenta sobre un cuadro neutro, con favorito independiente arriba a la derecha y etiqueta de vista abajo a la izquierda. Nombre, marca, color y precio están fuera de la fotografía. La imagen aumenta a escala (1.055) al pasar el cursor, durante (.7s). Las historias combinan fotografía de campaña, firma blanca superpuesta, panel de color, símbolo, tres muestras de paleta y enlace al universo de marca. Su fotografía aumenta a (1.04).

**The View Truth Rule.** Una campaña describe el universo de marca; no es otra vista del SKU. Muestra la pestaña Detalles únicamente cuando el catálogo tiene una imagen de detalle de marca.

### Inputs and focus

El buscador es una línea abierta, transparente, con icono lineal y altura mínima (44px). El foco de teclado general y del buscador tiene contorno de (3px) en `accent`, con separación de (4px) general y (3px) en búsqueda. El botón de foto conserva un contorno violeta interior a (-6px), más un segundo borde blanco de (2px) situado a (8px); así permanece visible dentro del recorte de imagen. No elimines estos tratamientos al reutilizar el patrón.

Los campos del formulario local usan fondo transparente, borde fino, relleno (12px), esquinas rectas y altura mínima (43px). Los errores se presentan junto al campo o acción con `role="alert"`; las tallas seleccionadas usan fondo tinta, texto papel y borde tinta.

### Navigation, dialogs and feedback

La navegación usa enlaces de texto con una línea que se revela al pasar el cursor. El hero tiene seis campañas manuales, sin avance automático; el botón seleccionado engrosa su línea superior de (1px) a (3px) y mantiene `aria-pressed`. Cambian fotografía, titular, marca/colección, lema y llamada. La franja de marca filtra el catálogo; la tarjeta editorial abre el diálogo de historia. Son acciones distintas.

Los diálogos nativos se abren con `showModal()`, incluyen cierre accesible y admiten cierre desde fuera de su caja; el fondo de la página queda sin desplazamiento. La bolsa permite mezclar marcas y conserva prendas y tallas en almacenamiento local. Los avisos usan violeta y texto papel, permanecen (2400ms) y se anuncian mediante una región de estado. El recuento del catálogo y la colección destacada también se anuncian con regiones `aria-live`.

La revisión pública descarga una selección: no pide contacto ni muestra una solicitud recibida. El flujo local conserva el formulario y su confirmación de guardado. Mantén esas diferencias en etiquetas, pasos, estados y mensajes; los importes son referenciales en CLP. Las claves de persistencia existentes siguen siendo `archivo-cart-v1` y `archivo-favorites-v1`.

### Motion

La curva común es `cubic-bezier(.16, 1, .3, 1)`. La apertura asienta la foto desde escala (1.035) durante (1.1s) y revela el cartel mediante recorte y un desplazamiento de (15px), en (.8–1s). El cambio de campaña usa opacidad y escala durante (550ms). El panel de colección entra con recorte lateral y (10px) de desplazamiento en (.5s). El manifiesto se desplaza (25px) al entrar, solo si el navegador admite la línea de tiempo de vista y no hay preferencia de movimiento reducido.

**The Optional Motion Rule.** Con movimiento reducido, desactiva animaciones y transiciones CSS, omite la animación JavaScript del hero y usa desplazamiento automático al catálogo. Conserva todo el contenido y las acciones visibles.

## Do's and Don'ts

### Do:
- Do conservar el papel cálido, Archivo y Fraunces como soporte compartido de las seis marcas.
- Do tomar los pares de colección y las paletas del catálogo, manteniendo cada símbolo y firma asociados a su marca.
- Do conservar fotos cuadradas para prendas y composiciones editoriales amplias para campañas.
- Do mantener el foco visible de foto y buscador, los estados `aria-pressed` y el movimiento reducido.
- Do distinguir la descarga pública de selección y la solicitud guardada en el servidor local en cada mensaje de estado.

### Don't:
- Don't sustituir las seis identidades por un único color o una única firma de marca.
- Don't añadir avance automático a las campañas manuales.
- Don't presentar las campañas como vistas adicionales del SKU ni ofrecer Detalles sin imagen disponible.
- Don't convertir una descarga de Pages en una confirmación de pedido, reserva o cobro.
- Don't reemplazar el sistema de paneles rectos y separación tonal por tarjetas redondeadas con sombras.
