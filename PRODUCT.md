# ARCHIVO

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Reunir propuestas de ropa de autor con identidades propias en una tienda que permite descubrir marcas, explorar colecciones y armar una selección entre distintas marcas.

## Users

Personas de alto poder adquisitivo que buscan ropa de autor colorida y reconocible para la playa, la montaña y la ciudad, según la indicación explícita del usuario. La propuesta debe despertar el deseo de imaginarse vistiendo las prendas en esas experiencias. El dueño gestiona solicitudes locales en su equipo.

## Operating Context

Sitio público en GitHub Pages, repositorio deepanalytica/archivo-tienda y publicación desde main mediante GitHub Actions. Servidor Node.js y gestión de solicitudes disponibles exclusivamente en localhost.

## Capabilities and Constraints

- Catálogo de 37 prendas, diez marcas y trece colecciones; búsqueda, filtros por destino, marca, colección y prenda; carga progresiva, favoritos, fichas y bolsa persistente.
- Poleras, polerones, gorros, camisas, shorts y chaquetas. Tres escapadas con conjuntos de tres piezas y elección individual de talla e inclusión.
- Dos cintas cromáticas móviles con pausa manual, parada fuera de pantalla y alternativa para movimiento reducido.
- La versión pública permite descargar una selección; no recibe pedidos, no recoge datos de contacto ni procesa pagos.
- El servidor local guarda solicitudes y permite gestionar estados sin enviar notificaciones.
- Imágenes de concepto y precios referenciales en CLP. No representan stock fabricado ni precios finales aprobados.
- HTML, CSS y JavaScript sin framework. El catálogo es compartido entre cliente y servidor.

## Brand Commitments

Conservar la identidad editorial de ARCHIVO y las seis marcas anteriores, que el usuario valoró positivamente. La expansión debe ser ambiciosa: más marcas, prendas coloridas con diseños simples y llamativos, micrográficas, campañas aspiracionales y banners móviles. SALITRE, ALTO SUR, LIMEN e ISLA BRAVA son las cuatro nuevas propuestas creativas.

## Evidence on Hand

Nueve prendas y campañas originales, conservadas. Las dos ampliaciones incorporan 38 imágenes de ImageGen: la primera añadió doce productos y seis campañas; la actual, dieciséis productos y cuatro campañas. Prompts en docs/image-prompts.json y junto a las imágenes. Pruebas locales y de Pages en verify.cjs y verify-pages.cjs.

## Product Principles

- Cada marca debe tener un universo reconocible y prendas que lo expresen.
- Las colecciones anteriores siguen disponibles y se pueden combinar en la misma bolsa.
- Distinguir claramente descargar una selección de enviar una solicitud.
- La exploración debe funcionar en móvil, con teclado y con movimiento reducido.
