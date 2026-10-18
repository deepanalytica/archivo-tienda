# ARCHIVO / Entrega a taller y estado de los archivos

## Qué se ha completado

La rama de laboratorio aporta para las 11 marcas sin un sistema de estampados propio: **11 estudios gráficos macro (270 × 270 mm), 11 microfirmas oficiales (80 × 80 mm), 44 interiores por talla, 11 firmas de manga, 11 frentes de colgante y 11 diseños de reverso todavía incompletos**. Son 99 SVG. OWN FORM se conserva con sus artes previos.

El arte macro es nuevo y no reproduce automáticamente el arte presentado en los mockups de `catalog.js`. Para fabricar un SKU existente, reconciliar explícitamente **SKU → mockup aprobado → SVG definitivo → muestra → ficha y precio**. En particular IMAGO necesita vectorizar/recomponer los artes originales de las mariposas y amapolas si el resultado físico debe coincidir con las fotos.

## Resumen de las once marcas

- IMAGO: grabado y metamorfosis adulta; evitar floral veraniego.
- UMBRAL: estructuras de taller desfasadas, no arquitectura de galería.
- NEBLINA: líneas de paisaje vegetales, no montaña técnica.
- WE ARE LOGIC: secuencias modulares geométricas, no tipografía ASCII.
- SOLAR CLUB: ocio compartido y cancha, no resort privado.
- MAREA: surf y movimiento, no quietud de horizonte.
- ÓRBITA: retrofuturo pop, sin efectos luminosos falsos.
- SALITRE: elegancia costera discreta, no ola ilustrada.
- ALTO SUR: montaña mineral, no ropa de rendimiento probada.
- LIMEN: galería urbana con espacios y micrográficas.
- ISLA BRAVA: flor de cinco pétalos plana, no grabado botánico.

## Protocolos para impresión

1. Abrir SVG original en tamaño milimétrico real; no ajustar la página para rellenar A4 o A3.
2. Confirmar equipo de impresión y tipo de transferencia real; una prensa de gorros no es una placa plana sin más.
3. Solicitar muestras del sustrato por talle y color, con gramaje y composición documentados.
4. Testear trazos y huecos mínimos, uniformidad de temperatura, presión, adhesión, lavado, tacto y estiramiento.
5. Seleccionar qué artes van a ser serigrafía, DTF o bordado; el SVG genérico no es separación de colores ni transfer listo.
6. No reemplazar información de origen, composición y cuidados del fabricante. Las etiquetas nuevas contienen marca y talla, no datos legales.
7. Los reversos de colgantes dejan zona central en blanco: falta texto autorizado de colección, papel definitivo, pruebas de registro e imposición y perforación.
8. Para archivos raster PNG de muestra: con Sharp disponible, ejecutar `node scripts/render-brand-production.cjs`; los PNG de 300 ppp se guardan en `output/production-renders` y no se despliegan.

## Comprobación reproducible

Ejecutar `python scripts/verify-brand-production.py`. Comprobar la etiqueta física original de cada lote y aprobar una muestra maestra por referencia. La validación digital de 99 SVG sólo asegura integridad básica del paquete, no la durabilidad ni el resultado visual impreso.

## Cuál es la próxima decisión

Antes de ampliar las 51 fichas del catálogo, elegir el primer modelo físico de cada universo y definir en centímetros medidas del blank, ubicación exacta del gráfico, prenda y color, técnica y coste. Ninguna venta o inventario online se activa desde esta rama.
