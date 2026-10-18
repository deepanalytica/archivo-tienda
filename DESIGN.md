---
name: ARCHIVO
description: Un archivo de mundos propios; fotografía, papel cálido y diez identidades de ropa de autor para playa, montaña y ciudad.
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
  salitre-turquoise: "#69c8c1"
  salitre-papaya: "#ef896b"
  salitre-ivory: "#f4eddd"
  salitre-ink: "#173f3c"
  alto-rust: "#b84a2c"
  alto-celadon: "#b5cbb5"
  alto-ink: "#23353d"
  alto-panel-ink: "#fff8ec"
  limen-cobalt: "#496acb"
  limen-burgundy: "#71334b"
  limen-butter: "#f1e5b9"
  limen-panel-ink: "#fffaf0"
  brava-pink: "#ef9bbb"
  brava-papaya: "#ef7844"
  brava-lavender: "#c7b5dc"
  brava-ink: "#58273e"
  city-panel: "#e9d8de"
  city-panel-ink: "#593044"
  destination-ribbon: "#ef9a79"
  destination-ribbon-ink: "#4b2531"
  brand-ribbon: "#c2c9ef"
  brand-ribbon-ink: "#313e77"
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
  escape-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(35px, 3.5vw, 53px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  destination-ribbon:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(25px, 3.4vw, 48px)"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.025em"
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
  escape-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "12px 4px"
  escape-button-beach:
    backgroundColor: "{colors.salitre-ink}"
    textColor: "{colors.salitre-turquoise}"
    rounded: "{rounded.square}"
    padding: "15px 18px"
  destination-ribbon:
    backgroundColor: "{colors.destination-ribbon}"
    textColor: "{colors.destination-ribbon-ink}"
    typography: "{typography.destination-ribbon}"
  brand-ribbon:
    backgroundColor: "{colors.brand-ribbon}"
    textColor: "{colors.brand-ribbon-ink}"
  identity-stage-salitre:
    backgroundColor: "{colors.salitre-turquoise}"
    textColor: "{colors.salitre-ink}"
    rounded: "{rounded.square}"
    padding: "48px clamp(28px, 4vw, 65px)"
  look-size:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "8px 12px"
  brand-story-solar:
    backgroundColor: "{colors.solar-butter}"
    textColor: "{colors.solar-panel-ink}"
    padding: "30px"
---

# Design System: ARCHIVO

## Overview

**Creative North Star: "Un archivo de mundos propios"**

ARCHIVO reúne diez universos reconocibles dentro de una estructura editorial común. Playa, montaña y ciudad acercan esas identidades a escenas aspiracionales de luz, color y pausa, con prendas de líneas simples y pequeñas firmas gráficas. El papel cálido sostiene fotografías de campaña con materialidad de algodón, grandes firmas tipográficas y paneles de color vinculados a cada marca. El color aparece en superficies amplias, símbolos y prendas; la selección conserva una lectura clara de producto, nombre, color y precio.

La edición Escapes conserva UMBRAL, NEBLINA, WE ARE LOGIC, SOLAR CLUB, MAREA y ÓRBITA e incorpora SALITRE, ALTO SUR, LIMEN e ISLA BRAVA. Sus trece colecciones y treinta y siete prendas amplían el mundo aprobado. La evolución de identidad incorpora firmas de letras contorneadas y símbolos de planos, pliegues y vacíos. Esta documentación registra `styles.css`, `identities.css`, `identities.js`, `identity-ui.js`, `scripts/generate-identities.py`, `catalog.js`, `escapes.js`, `app.js` e `index.html`, según `docs/identity-art-direction.md`, `docs/escapes-art-direction.md`, `PRODUCT.md` y las capturas finales de `output/pages/`. Los destinos y conjuntos ayudan a imaginar cómo vestir esas escenas; la base editorial y sus tokens compartidos permanecen vigentes.

**Key Characteristics:**
- Fotografía protagonista, con prendas y campañas como imágenes distintas.
- Papel cálido compartido y paneles cromáticos propios por marca y colección.
- Archivo para estructura y Fraunces para titulares expresivos; ambas son origen de las firmas vectoriales intervenidas.
- Esquinas rectas, líneas finas y jerarquía por escala y color.
- Diez marcas, tres destinos y conjuntos editables dentro de una misma selección.
- Exploración manual de campañas e identidades, estados de selección explícitos y dos cintas de movimiento opcional.

## Colors

Las primitivas del frontmatter son normativas; los colores de marca y los pares de colección se extraen del catálogo, no de una aproximación a las fotografías.

### Primary

`purple` sostiene anuncio, pie, botones principales, filtros seleccionados, contador de bolsa y avisos. `lime` acompaña el manifiesto y la firma del pie. `accent` identifica el foco de teclado general y del buscador. `purple-hover` es el cambio del botón principal al pasar el cursor.

### Secondary

| Marca | Paleta | Aplicación y símbolo |
| --- | --- | --- |
| SALITRE | `salitre-turquoise`, `salitre-papaya`, `salitre-ivory` | Resort de líneas limpias; S de planos desplazados y pliegue salino. |
| ALTO SUR | `alto-rust`, `alto-celadon`, `alto-ink` | Descanso alpino; A tallada en perspectiva con vacío central. |
| LIMEN | `limen-cobalt`, `limen-burgundy`, `limen-butter` | Galería y arquitectura urbana; dos eles cruzan sus planos. |
| ISLA BRAVA | `brava-pink`, `brava-papaya`, `brava-lavender` | Verano gráfico; corola de cuatro pétalos plegados, con siluetas distintas. |
| SOLAR CLUB | `solar-tangerine`, `solar-butter`, `solar-blue` | Club de verano, cancha y sobremesa; recorridos escalonados de S y C. |
| MAREA | `marea-pacific`, `marea-coral`, `marea-foam` | Costa del Pacífico y gráfica de surf; cintas enlazadas que dejan una M. |
| ÓRBITA | `orbita-lime`, `orbita-lilac`, `orbita-grape` | Retro futuro y formas espaciales; anillo facetado de eje oblicuo. |
| UMBRAL | `umbral-cobalt`, `umbral-clay`, `umbral-bone` | Taller, campos de color y arquitectura cotidiana; dos marcos cruzados con planos compartidos. |
| NEBLINA | `neblina-lavender`, `neblina-pistachio`, `neblina-forest` | Botánica sensible y paisaje; N entretejida entre dos planos. |
| WE ARE LOGIC | `logic-magenta`, `logic-electric`, `logic-pink` | Gráfica modular urbana; tres módulos encajados con profundidad. |

La franja usa el primer color de cada paleta. Las cuatro marcas nuevas usan su tinta propia: `salitre-ink`, `alto-panel-ink`, `limen-panel-ink` y `brava-ink`. Las seis anteriores mantienen blanco salvo SOLAR CLUB (`solar-strip-ink`) y ÓRBITA/NEBLINA (`botanical-strip-ink`). Las muestras de paleta muestran los tres colores sin convertirlos en controles.

**The Collection Pair Rule.** Usa juntos el fondo y la tinta definidos para cada colección; las tarjetas editoriales y el diálogo de marca usan el par de su colección más reciente.

| Colección | Fondo / tinta |
| --- | --- |
| Costa privada | `salitre-turquoise` / `salitre-ink` |
| Aire abierto | `alto-rust` / `alto-panel-ink` |
| Entre horas | `limen-cobalt` / `limen-panel-ink` |
| Flor de un día | `brava-pink` / `brava-ink` |
| Fuera de oficina | `solar-butter` / `solar-panel-ink` |
| Pleamar | `marea-panel` / `marea-panel-ink` |
| Club del futuro | `orbita-lime` / `orbita-grape` |
| Patio | `umbral-cobalt` / `white` |
| Jardín eléctrico | `neblina-panel` / `neblina-forest` |
| Frecuencia | `logic-panel` / `logic-panel-ink` |
| Desfase | `desfase-panel` / `desfase-ink` |
| Entre capas | `entre-capas-panel` / `entre-capas-ink` |
| Principio | `principio-panel` / `principio-ink` |

Los paneles de destino conservan pares propios: Playa usa `salitre-turquoise` / `salitre-ink`; Montaña, `alto-celadon` / `alto-ink`; Ciudad, `city-panel` / `city-panel-ink`. No sustituyas el celadón o el rosa urbano por el fondo de la colección de ALTO SUR o LIMEN. La cinta de destinos usa `destination-ribbon` / `destination-ribbon-ink`; la cinta de marcas, `brand-ribbon` / `brand-ribbon-ink`.

### Neutral

`paper` es el lienzo y la navegación; `ink` la lectura base; `muted` el apoyo editorial. `line` separa controles y filas con tinta translúcida. `product-surface` sostiene imágenes de prendas; `stories-surface` agrupa las marcas. `sand` se conserva en superficies de detalle y resumen. Los colores de producto son datos del SKU y no sustituyen la paleta de marca.

## Typography

**Display Font:** Archivo, Arial, sans-serif. **Expressive Font:** Fraunces, Georgia, serif. Ambas fuentes variables se alojan en `assets/fonts/`; no se necesita una fuente remota.

La firma ARCHIVO es ancha y pesada; Fraunces aporta el contraste de los titulares de campaña, nombres de colección y énfasis editoriales. Los énfasis usan estilo normal y los ejes `SOFT` (60) y `WONK` (1). Las diez firmas de marca son SVG con letras contorneadas: su forma, inclinación y composición ya están dibujadas y no dependen de una fuente al mostrarse.

### Hierarchy

- **Display:** la firma hero utiliza `display`; la navegación reduce la firma a (29px) y la conserva en peso (850). El pie utiliza `clamp(60px, 13vw, 180px)`.
- **Campaign:** `campaign` para el titular sobre fotografía; mantiene saltos de línea y balance de texto. En móvil pasa a `clamp(40px, 12vw, 60px)`.
- **Headline:** `headline` para secciones, con énfasis en Fraunces. En móvil las secciones principales usan (38px).
- **Collection title:** `collection-title`, con ancho máximo (10ch) en escritorio y hasta (14ch) en el diseño apilado; en móvil usa (45px).
- **Escape title:** `escape-title`, con ancho máximo (16ch); pasa a (39px) bajo (1050px), (43px) y (18ch) bajo (760px), (38px) y (16ch) bajo (680px), y (34px) bajo (375px). La cinta de destinos usa `destination-ribbon` y pasa a (31px) en móvil. La cinta de marcas usa las firmas SVG, con altura (65px) en escritorio y (52px) en móvil.
- **Product title:** `product-title`, reducido a (16px) bajo (1050px), (15px) bajo (680px) y (14px) bajo (375px). Los precios usan cifras tabulares.
- **Body:** `body` es la base; los textos editoriales usan `narrative`, con anchos habituales de (30–48ch). La nota de catálogo llega a (76ch).
- **Label:** `label` corresponde a la marca sobre el nombre de prenda, en mayúsculas. Controles y enlaces usan normalmente (11–12px), con ajustes móviles.

Las firmas se componen individualmente a partir de Archivo y Fraunces locales con licencia OFL mediante `scripts/generate-identities.py`. Archivo origina SALITRE, ALTO SUR, LIMEN, MAREA, ÓRBITA, UMBRAL y WE ARE LOGIC; Fraunces origina ISLA BRAVA, SOLAR CLUB y NEBLINA. Hay glifos geométricos propios en la A de ALTO SUR, I/E de LIMEN, T/E de SALITRE, M de MAREA, Ó de ÓRBITA y U de UMBRAL. ALTO SUR, ISLA BRAVA, SOLAR CLUB y WE ARE LOGIC usan composiciones apiladas; NEBLINA desplaza progresivamente sus letras. Conserva los contornos, proporciones, acentos y márgenes de cada SVG.

**The Authored Signature Rule.** Usa los vectores de `identities.js` o `assets/identities/` para cada firma y símbolo; conserva el nombre accesible como texto. No reconstruyas las firmas con texto CSS ni sustituyas sus geometrías por pictogramas literales.

## Layout

No hay una caja central de ancho máximo para toda la página. Las secciones siguen el ancho de ventana con margen interno fluido `page-inline` y ritmo vertical `section-block`; el catálogo usa `catalog-block-start`. La navegación permanece pegada al borde superior con altura (78px), reducida a (68px) en móvil. El desplazamiento a anclas reserva (100px) arriba, o (80px) bajo (680px).

El hero ocupa hasta (730px) con mínimo (560px), fotografía a sangre y texto superpuesto a la izquierda. En móvil usa `calc(100svh - 96px)`, mínimo (540px), recorte de imagen al (67%) horizontal y los gradientes vigentes del hero. La firma queda arriba; el titular y la llamada se asientan sobre el área inferior. Las diez campañas tienen selectores en una fila desplazable con ajuste de posición y flechas anterior/siguiente; cada opción ocupa (145px), (120px) bajo (1050px) y (116px) bajo (680px). La fila usa `scroll-snap-type: x proximity`; las flechas miden (44px) de ancho, o (37px) en móvil, con altura mínima (44px). En móvil el área de texto reserva (138px) inferiores para esta navegación.

La franja de diez marcas tiene cinco columnas y dos filas en escritorio, con botones de altura mínima (92px), o (85px) bajo (1050px). Bajo (680px) mantiene dos filas de (86px), fluye por columnas de (56%) del ancho y se desplaza horizontalmente con ajuste obligatorio de posición. El explorador presenta imagen y panel en proporción (1.25fr / 1fr), ajusta a (1.05fr / 1fr) bajo (1050px) y se apila bajo (760px). Sus trece botones forman una fila con desplazamiento horizontal. El catálogo usa tres columnas, con `grid-row` y `grid-column`; bajo (680px) usa dos columnas y separaciones móviles. Las imágenes de prenda son cuadradas; el precio baja bajo el texto en móvil.

Los tres destinos aparecen antes de las colecciones. Sus pestañas alinean símbolo y nombre; el panel combina fotografía y texto en (1.15fr / 1fr), con altura mínima (580px), y pasa a (1fr / 1fr) y (550px) bajo (1050px). Bajo (760px) se apila, con foto (1.5:1); bajo (680px) la foto es (1.35:1) y el texto tiene relleno (28px 24px). Tres prendas cuadradas, en tres columnas, completan cada panel. El bloque de filtros tiene cuatro columnas (1fr / 1.5fr / 1fr / 1fr), reducidas a dos iguales en móvil.

El catálogo presenta doce prendas inicialmente y añade doce por acción «Ver más prendas»; los cambios de filtro reinician ese límite. El contador indica visibles y total de la selección, y el cierre comunica cuándo ya se ve toda. Las dos cintas se sitúan tras la franja de marcas y antes de las historias, respectivamente; el control de movimiento queda en la banda de destinos.

El conjunto abre un diálogo de (680px), con relleno (45px), filas de imagen (110 × 125px) y texto en dos columnas, separadas (23px). Bajo (680px) ocupa la pantalla y usa relleno (37px 22px), imagen (86 × 105px) y separación (16px). El subtotal queda en una fila propia, con cifras tabulares.

El muestrario de identidades precede las diez historias. Su fila de pestañas se desplaza horizontalmente; el panel usa dos columnas (1fr / 1.2fr), mínimo (430px), relleno vertical (48px) y horizontal fluido (28–65px). Bajo (1050px) usa relleno (35px); bajo (680px) se apila con relleno (32px 26px 54px), símbolo (155px) y firma de hasta (285px) de ancho. En escritorio el símbolo llega a (280px) y la firma a (390px); las composiciones apiladas conservan anchos menores para mantener su proporción.

Las historias usan dos columnas y fotografías (1.52:1); bajo (680px) pasan a una columna y fotos (1.35:1). El diálogo de marca pasa de dos columnas a una bajo (760px), y a toda la pantalla bajo (680px). Producto y revisión también ocupan la pantalla móvil. La bolsa es un panel derecho de (470px), limitado al ancho disponible y con altura de ventana. El panel de navegación central se oculta bajo (680px); permanecen firma, favoritos y bolsa.

## Elevation & Depth

La profundidad procede de fotografía, superficies de color y superposición. No hay sombras de caja en los componentes implementados. Líneas finas separan filtros, tallas, filas y resúmenes; los contenedores editoriales se distinguen por el fondo. El hero usa gradientes oscuros para sostener el texto: `linear-gradient(90deg,#17313c99,transparent 82%)` y `linear-gradient(0deg,#162533df,transparent 65%)`. La fotografía de destino suma un gradiente inferior `#132f31aa` a transparente desde el (55%) de su altura. Los diálogos añaden un velo (`#131511a6`) con desenfoque (5px); los controles de cierre conservan papel opaco. La navegación y el favorito sobre producto usan fondo opaco, sin desenfoque.

Los símbolos añaden profundidad mediante caras rellenas de distinta opacidad dentro de una sola tinta. En el muestrario, una perspectiva de (900px) y la inclinación `rotateY(-13deg) rotateX(8deg)` presentan el símbolo como una pieza; al pasar el cursor o entrar el foco se asienta al plano frontal. No se añaden sombras de caja.

## Shapes

Botones, paneles, fotografías, campos y diálogos conservan esquinas rectas. El contador de bolsa y las muestras de color del producto son circulares; las muestras de paleta de marca son cuadrados de (26px), separados por (5px), con borde fino. Los diez símbolos de marca usan SVG con `viewBox="0 0 96 96"`, relleno `currentColor`, regla par-impar y sin trazo; los planos de opacidad pertenecen a la forma. Los vacíos, cruces y facetas construyen siluetas propias. `assets/identities/` conserva diez símbolos, diez firmas tipográficas y diez conjuntos de símbolo y firma (`*-signature.svg`). Las fotografías de concepto existentes conservan sus gráficas de colección; no definen la geometría de la identidad digital vigente.

## Components

### Buttons and selection

Los botones principales combinan `purple` y blanco; los de hero combinan papel y tinta. La base tiene altura mínima (52px), relleno (18px 22px), texto (12px) y una flecha separada. El botón del hero ajusta altura, texto y relleno al contexto. El botón de colección es transparente, con borde de (1px) en la tinta del panel y altura mínima (48px); al pasar el cursor invierte el par de colección. Los botones se desplazan arriba (2px) al pasar el cursor.

Los filtros de marca usan altura mínima (44px), sin borde; la selección es un bloque violeta con texto blanco y `aria-pressed`. Los botones del explorador mantienen fondo transparente y una línea inferior violeta de (2px) para la colección seleccionada. Cambiar la colección del explorador actualiza imagen, panel y texto; su llamada aplica marca y colección al catálogo. Los filtros de colección incompatibles con la marca quedan deshabilitados.

### Photography and cards

La prenda se presenta sobre un cuadro neutro, con favorito independiente arriba a la derecha y etiqueta de vista abajo a la izquierda. Nombre, marca, color y precio están fuera de la fotografía. La imagen aumenta a escala (1.055) al pasar el cursor, durante (.7s). Las historias combinan fotografía de campaña, firma blanca superpuesta, panel de color, símbolo, tres muestras de paleta y enlace al universo de marca. Su fotografía aumenta a (1.04).

**The View Truth Rule.** Una campaña describe el universo de marca; no es otra vista del SKU. Muestra la pestaña Detalles únicamente cuando el catálogo tiene una imagen de detalle de marca.

### Authored identities

Las firmas vectoriales aparecen en la franja de marcas, las campañas y colecciones, las escapadas, las fotografías editoriales, los perfiles y la cinta de marcas. Cada firma incluye el nombre como texto accesible; el SVG visual es decorativo. La franja combina símbolo (34px) y firma de hasta (158px), con composiciones apiladas de hasta (105px); en móvil el símbolo pasa a (29px), la firma a (136px) y las apiladas a (85px). Los perfiles combinan símbolo (65px) y firma (280px), reducidos a (50px) y (220px) en móvil.

El muestrario «No se parecen. Se reconocen.» abre con SALITRE y mantiene selección manual entre las diez marcas. Usa `tablist`, `tab` y `tabpanel`, `aria-selected` y un solo tabulador activo; flechas izquierda/derecha, Inicio y Fin cambian selección y foco. Cada selección actualiza símbolo, firma, título, nota, gesto y el par cromático de la colección más reciente. «Ver prendas» filtra el catálogo por esa marca. La calidad se comprueba con símbolos distinguibles a (32px) y firmas legibles a (160px), según el contrato de identidad.

Las fotografías de concepto conservan sus gráficas de colección. No muestran necesariamente la firma digital exacta estampada en cada prenda; la evolución vectorial no modifica esas imágenes.

### Inputs and focus

El buscador es una línea abierta, transparente, con icono lineal y altura mínima (44px). El foco de teclado general y del buscador tiene contorno de (3px) en `accent`, con separación de (4px) general y (3px) en búsqueda. El botón de foto conserva un contorno violeta interior a (-6px), más un segundo borde blanco de (2px) situado a (8px); así permanece visible dentro del recorte de imagen. No elimines estos tratamientos al reutilizar el patrón.

Los campos del formulario local usan fondo transparente, borde fino, relleno (12px), esquinas rectas y altura mínima (43px). Los errores se presentan junto al campo o acción con `role="alert"`; las tallas seleccionadas usan fondo tinta, texto papel y borde tinta.

### Navigation, dialogs and feedback

La navegación incluye Escapadas, Colecciones, La selección y Las marcas, con una línea que se revela al pasar el cursor. El hero abre con SALITRE y tiene diez campañas manuales, sin avance automático; el botón seleccionado engrosa su línea superior de (1px) a (3px) y mantiene `aria-pressed`. Cambian fotografía, titular, marca/colección, lema y llamada. La franja de marca filtra el catálogo; la tarjeta editorial abre el diálogo de historia. Son acciones distintas.

Los diálogos nativos se abren con `showModal()`, incluyen cierre accesible y admiten cierre desde fuera de su caja; el fondo de la página queda sin desplazamiento. La bolsa permite mezclar marcas y conserva prendas y tallas en almacenamiento local. Los avisos usan violeta y texto papel, permanecen (2400ms) y se anuncian mediante una región de estado. El recuento del catálogo y la colección destacada también se anuncian con regiones `aria-live`.

La revisión pública descarga una selección: no pide contacto ni muestra una solicitud recibida. No procesa pagos, reservas ni envíos reales; los destinos son escenas creativas, no viajes o alojamientos ofrecidos. El flujo local conserva el formulario y su confirmación de guardado. Mantén esas diferencias en etiquetas, pasos, estados y mensajes; los importes son referenciales en CLP. Las claves de persistencia existentes siguen siendo `archivo-cart-v1` y `archivo-favorites-v1`.

### Destinations and complete looks

Las pestañas Playa, Montaña y Ciudad usan `tablist`, `tab` y `tabpanel`, selección mediante `aria-selected` y foco móvil entre opciones. Flechas izquierda/derecha, Inicio y Fin cambian el destino y su foco. Cada panel actualiza fotografía, par cromático, titular y tres prendas; «Explorar» aplica el destino al catálogo y «Ver el conjunto» abre su selección. El destino también filtra por la asignación de cada marca: Playa reúne SALITRE, ISLA BRAVA, SOLAR CLUB y MAREA; Montaña, ALTO SUR y NEBLINA; Ciudad, LIMEN, ÓRBITA, UMBRAL y WE ARE LOGIC.

| Destino / conjunto | Tres prendas |
| --- | --- |
| Playa / Un día junto al mar | Camisa Horizonte, Short Caleta, Gorro Sombra Clara (SALITRE) |
| Montaña / Aire de montaña | Chaqueta Cumbre, Polera Altitud, Gorro Mirador (ALTO SUR) |
| Ciudad / La ciudad sin agenda | Sobrecamisa Intervalo, Short Pasaje, Gorro Contrapunto (LIMEN) |

El diálogo permite incluir o excluir cada prenda y elegir su talla. Excluir atenúa la fila a (.65) y deshabilita su selector; el subtotal referencial y el texto del botón se actualizan con lo incluido. Sin prendas, el botón se deshabilita. La validación comprueba todas las tallas y el máximo de diez unidades por prenda/talla antes de añadir el conjunto completo a la bolsa. Camisas, Shorts y Chaquetas amplían Poleras, Polerones y Gorros en los filtros, con tallas (S–XL) salvo gorros de talla única. Las etiquetas «Micrográfica» y «Estampado de autor» describen el gesto gráfico de las nuevas prendas.

### Motion

La curva común es `cubic-bezier(.16, 1, .3, 1)`. La apertura asienta la foto desde escala (1.035) durante (1.1s) y revela el cartel mediante recorte y un desplazamiento de (15px), en (.8–1s). El cambio de campaña usa opacidad y escala durante (550ms). El panel de colección entra con recorte lateral y (10px) de desplazamiento en (.5s). El manifiesto se desplaza (25px) al entrar, solo si el navegador admite la línea de tiempo de vista y no hay preferencia de movimiento reducido.

Las dos cintas desplazan una pista duplicada mediante `translateX(0)` a `translateX(-50%)`: destinos en (38s) lineales e infinitos; marcas en (65s), en sentido inverso. Arrancan pausadas por CSS; JavaScript permite correr solo la cinta visible según `IntersectionObserver`, sin pausa manual, preferencia de movimiento reducido ni documento oculto. El foco dentro de la cinta y el cursor en dispositivos con hover la pausan temporalmente. El contenido duplicado se oculta a tecnologías de asistencia; cada región tiene un nombre accesible y puede recibir foco.

El botón «Pausar movimiento» / «Reanudar movimiento» controla ambas cintas y persiste su elección en `archivo-motion-paused-v1`; `aria-pressed` indica pausa manual. Con movimiento reducido se deshabilita con el texto «Movimiento reducido», se oculta la copia y la cinta estática permite desplazamiento horizontal manual. Fuera de pantalla o con pestaña oculta se pausa sin alterar la preferencia guardada. Si no hay `IntersectionObserver`, conserva el estado pausado. Las miniaturas de destino se elevan (4px) al pasar el cursor, con transición (.4s); los paneles usan la entrada ya existente de (.5s). El símbolo del muestrario asienta su inclinación en (.8s), con la curva común, al pasar el cursor o entrar el foco. Con movimiento reducido conserva la forma frontal estática y elimina esa transición.

**The Optional Motion Rule.** Con movimiento reducido, desactiva animaciones y transiciones CSS, omite la animación JavaScript del hero y usa desplazamiento automático al catálogo y al selector de campaña. Conserva todo el contenido y las acciones visibles; las cintas quedan estáticas, sin copia y con desplazamiento manual.

## Do's and Don'ts

### Do:
- Do conservar el papel cálido, Archivo y Fraunces como soporte compartido de las diez marcas.
- Do tomar los pares de colección y las paletas del catálogo, manteniendo cada símbolo y firma asociados a su marca.
- Do reutilizar los SVG contorneados, sus vacíos y planos de opacidad, conservando el nombre de marca accesible.
- Do conservar la selección manual con teclado del muestrario y su perspectiva estática con movimiento reducido.
- Do conservar fotos cuadradas para prendas y composiciones editoriales amplias para campañas.
- Do mantener el foco visible de foto y buscador, los estados `aria-pressed` y el movimiento reducido.
- Do conservar la pausa manual de ambas cintas, su parada fuera de pantalla o con documento oculto y su alternativa estática.
- Do mantener inclusión, talla y subtotal de conjunto antes de añadir prendas a la bolsa.
- Do distinguir la descarga pública de selección y la solicitud guardada en el servidor local en cada mensaje de estado.

### Don't:
- Don't sustituir las diez identidades por un único color o una única firma de marca.
- Don't reconstruir las firmas vectoriales con fuentes CSS ni regresar a pictogramas literales de sol, montaña o planeta.
- Don't afirmar que las fotografías existentes reproducen la firma digital exacta en todas las prendas.
- Don't ocultar prendas tras un primer bloque: muestra todo el catálogo filtrado y conserva la carga diferida de imágenes.

## ARCHIVO Clothing & Art / IMAGO

La capa editorial vigente vive en `editorial.css`: papel calido #F3EDDF, burdeos #572A39 y azul tinta #243B67. La firma maestra es vectorial, con letras A y R intervenidas y descriptor Clothing & Art. El grano SVG es estatico, de baja opacidad y no intercepta controles. El color grade se limita a fotografia editorial: las fotos de catalogo mantienen `filter: none`.

IMAGO agrega Herbario indocil: flores abstractas y mariposas en cuatro prendas, con dos editoriales fotografiadas de concepto. La composicion protege las miradas de los modelos y la lectura del estampado.

## OWN FORM / Self Defined

OWN FORM abre ahora la portada: frases con caracter, sans compacta y serifas inclinadas, micrografica y figuras hechas de caracteres ASCII. Carbon #202B32, marfil #F3EDDF y lima acida #D8E85B; la prenda blanca agrega azul acero y el poleron, arcilla. La portada movil usa el retrato del poleron; escritorio conserva la pareja con ambas poleras. Se mantienen las 45 prendas de doce marcas y quince colecciones.

El bloque editorial OWN FORM usa fondo carbon y un acento lima contenido. La ficha agrega Arte original solo cuando existe `product.print`. La vista del SVG tiene fondo de previsualizacion del color de la prenda; el archivo descargado sigue siendo transparente. Las dimensiones de 8, 26, 27 y 28 cm y el estado pendiente de muestra se indican sin convertir la fotografia en una promesa de produccion exacta.

## Identidad Fisica OWN FORM

Una secuencia de tres fotografias cuadradas muestra interior, kraft y manga sobre papel calido. Se dispone en tres columnas sin tarjetas en escritorio y una columna en movil. El texto distingue sistema de marca de fotografia exacta de SKU. La ficha Detalles agrega tres botones secundarios con estado `aria-pressed` y pie de foto, sin dejar controles residuales al volver a Prenda o abrir otra marca.

El estudio Inner Signal usa fondo carbon, cian y lila suaves, una flor ASCII y una fotografia con modelo. Su estado fuera del catalogo de venta es explicito; el efecto es color impreso, no una simulacion comercial de material holografico real. La firma de manga repite corchetes y barra diagonal; el kraft usa tinta carbon sin sellos o seriales de autenticidad inventados.

## Verano Editorial

`#verano` usa un lienzo papel calido y cinco miniaturas fotograficas, sin tarjetas ornamentales. La imagen principal conserva la escena 3:2 completa, tambien en movil, para no perder cabezas, prendas ni parejas. El color proviene de la ropa y la luz: no hay un filtro global que altere el catalogo. La escena LED diferencia iluminacion de vestuario luminoso. Los enlaces identifican las prendas reales y una nota separa el estilismo del catalogo.

Tabs accesibles con Home, End y flechas; controles anterior/siguiente ciclicos y contador con anuncio discreto. No hay reproduccion automatica. El cambio de escena no modifica filtros, bolsa ni favoritos.
- Don't añadir avance automático a las campañas manuales.
- Don't presentar las campañas como vistas adicionales del SKU ni ofrecer Detalles sin imagen disponible.
- Don't convertir una descarga de Pages en una confirmación de pedido, reserva o cobro.
- Don't reemplazar el sistema de paneles rectos y separación tonal por tarjetas redondeadas con sombras.

## Revelado Filmico

La peticion de acabado cinematografico sustituye la restriccion previa de `filter: none` en fotos de catalogo. `film-look.css`, cargado despues de la capa editorial, conecta dos filtros SVG estaticos definidos en `index.html`: `film-editorial` para campanas, con sombras frias, luces calidas, saturacion contenida y grano fino; `film-product` para prendas y terminaciones, con color casi neutro y menor intensidad de grano. No hay parpadeo ni animacion de ruido.

La ficha cambia de tratamiento segun la vista: Campana usa el revelado editorial, Prenda y Frente micro usan producto, Arte original conserva `filter: none`. No se altera ningun archivo de produccion, descarga, logo, paleta o control. Parametros y alcance en `docs/film-look.md`.
