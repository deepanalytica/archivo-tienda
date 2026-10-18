# ARCHIVO

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Reunir propuestas de ropa de autor con identidades propias en una tienda que permite descubrir marcas, explorar colecciones y armar una selección entre distintas marcas.

## Users

Visitantes que exploran ropa y el dueño que gestiona solicitudes en su equipo. El público demográfico preciso queda abierto; se consultó durante esta ampliación sin convertir la respuesta en un requisito para avanzar. La propuesta creativa actual explora streetwear de siluetas amplias para uso cotidiano.

## Operating Context

Sitio público en GitHub Pages, repositorio deepanalytica/archivo-tienda y publicación desde main mediante GitHub Actions. Servidor Node.js y gestión de solicitudes disponibles exclusivamente en localhost.

## Capabilities and Constraints

- Catálogo, búsqueda, filtros por marca, colección y prenda, orden por precio o nombre, favoritos, fichas y bolsa persistente.
- La versión pública permite descargar una selección; no recibe pedidos, no recoge datos de contacto ni procesa pagos.
- El servidor local guarda solicitudes y permite gestionar estados sin enviar notificaciones.
- Imágenes de concepto y precios referenciales en CLP. No representan stock fabricado ni precios finales aprobados.
- HTML, CSS y JavaScript sin framework. El catálogo es compartido entre cliente y servidor.

## Brand Commitments

Conservar ARCHIVO, UMBRAL, NEBLINA y WE ARE LOGIC. La solicitud actual autoriza ampliar el universo con más marcas, colecciones coloridas, direcciones de arte propias y una página con más vida. SOLAR CLUB, MAREA y ÓRBITA son las nuevas propuestas creativas desarrolladas para esa ampliación.

## Evidence on Hand

Nueve imágenes de prendas y campañas originales. Dieciocho imágenes nuevas generadas con ImageGen: doce productos y seis campañas. Prompts en docs/image-prompts.json y junto a las imágenes. Pruebas locales y de Pages en verify.cjs y verify-pages.cjs.

## Product Principles

- Cada marca debe tener un universo reconocible y prendas que lo expresen.
- Las colecciones anteriores siguen disponibles y se pueden combinar en la misma bolsa.
- Distinguir claramente descargar una selección de enviar una solicitud.
- La exploración debe funcionar en móvil, con teclado y con movimiento reducido.
