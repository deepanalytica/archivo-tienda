# ARCHIVO / Programa de desarrollo productivo de las once marcas

**Fecha:** 18 octubre 2026 · **Estado:** Laboratorio de arte / sin autorización de fabricación en serie.

OWN FORM conserva su línea de archivos existentes en `assets/prints/ownform`, `assets/prints/other-nature` y `assets/trims/`. Este programa completa la **primera etapa de artes de prueba**, no los acabados industriales de cada uno de los 51 SKU.

## Arquitectura

ARCHIVO es casa editorial y operación de fabricación/comercio. Cada marca mantiene su universo creativo, símbolos y logotipos canónicos en `assets/identities/`. No convertir las once marcas en variantes cosméticas de la misma polera.

## Cobertura de prototipos

| Marca | Colecciones existentes | Universo | Entregables iniciales | Estado |
|---|---|---|---|---|
| IMAGO | Herbario indócil | Grabado botánico y metamorfosis adulta | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| UMBRAL | Patio · Desfase | Arquitectura de taller y geometría desplazada | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| NEBLINA | Jardín eléctrico · Entre capas | Paisaje sensible y botánica atmosférica | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| WE ARE LOGIC | Frecuencia · Principio | Sistema modular y ritmo urbano | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| SOLAR CLUB | Fuera de oficina | Club recreativo, canchas y vida social | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| MAREA | Pleamar | Costa Pacífico, surf gráfico y movimiento | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| ÓRBITA | Club del futuro | Retro-futuro pop y juego espacial | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| SALITRE | Costa privada | Resort pausado y lujo relajado | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| ALTO SUR | Aire abierto | Montaña mineral, refugio y capas | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| LIMEN | Entre horas | Galería y arquitectura urbana refinada | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |
| ISLA BRAVA | Flor de un día | Verano de autor, color y expresión floral | Macro 270 × 270 / micro 80 × 80 mm, etiqueta, manga, hangtag | Muestra y lavado pendientes |

**Capacidad:** prensa de tamaño util a confirmar; arte mayor acotado a 270 × 270 mm sobre placa de referencia nominal 300 × 300 mm. La usuaria/el usuario reporta personalización también de gorros; las gorras requieren prensa y forma específicas. Nada de esto certifica capacidad térmica de la máquina real.

## Jerarquía de archivos

- `assets/prints/brand-lab/<marca>/`: arte vectorial decorativo de prueba, no sustituto del arte preexistente de cada SKU.
- `assets/trims/brand-lab/<marca>/`: etiqueta de marca, manga y colgante, con logos canónicos del repositorio.
- `docs/production/brands/<marca>.md`: dirección de arte, ficha del prototipo, control de muestra y riesgos.
- `docs/production/brand-program.json`: matriz verificable para automatización.
- `docs/production/qa-checklist.md`: protocolo material y aprobación.

## Límites legales, técnicos y honestidad comercial

1. El SVG es vector; sus medidas de lienzo no prueban resolución funcional ni que los trazos finos sobrevivan al transfer. Revisar mínimo de línea, negativas, perfiles ICC, base blanca, sobreimpresiones y margen térmico con proveedor.
2. Los SVG de etiquetas/conceptos pueden servir para cotizaciones, pero **ninguna pieza queda lista para producción industrial o venta sin aprobación de muestra física**.
3. El arte gráfico no contiene declaraciones sobre algodón, origen, certificaciones, instrucciones de lavado, escasez o serie limitada. Estas afirmaciones deben comprobarse por SKU.
4. No eliminar etiquetas reales de origen/composición/cuidados de la prenda base. Verificar rotulación legal para comercializar en Chile.
5. Mockups anteriores no demuestran confección. Dejar `catalog.js` y la web pública sin cambios comerciales mientras no se validen prendas, costos y disponibilidad.

## Siguiente compuerta de producción

Comprar bases en al menos dos calidades y dos proveedores; evaluar tacto, peso verificado, costuras, cuellos, estabilidad dimensional y aspecto tras tres y diez lavados. En estampado validar adherencia, elasticidad, tacto y permanencia de tinta. Medir capacidad real de la prensa, tiempos/costos por unidad y defectos; aprobar muestra maestra por modelo. Solo entonces decidir tiradas, etiquetas reglamentarias, precio real y fecha de entrega.
