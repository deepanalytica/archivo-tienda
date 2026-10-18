# OWN FORM / Identidad fisica

## Que hace reconocible a la prenda

No depende solo de la frase del frente. El sistema repite tres gestos: una marca interior compacta, una firma geometrica de corchetes y barra diagonal en manga izquierda, y una tarjeta kraft con el codigo del diseno. Las colecciones pueden cambiar de arte y conservar esa familia visual. Es una propuesta de diseno, no una afirmacion de exclusividad legal o calidad de fabricacion ya certificada.

El codigo OF-01, OF-02, OF-03 u OF-04 identifica el diseno, no una unidad irrepetible, una autenticacion digital o una edicion limitada. No hay QR ficticio, numeracion inventada de stock ni sellos ambientales no comprobados.

## Piezas y medidas

| Pieza | Medida del lienzo | Material o tecnica propuesta | Regla |
| --- | --- | --- | --- |
| Interior | 60 x 35 mm | Transfer de marca y talla, sin parche de fondo | Carbon sobre base clara; marfil sobre carbon |
| Manga | 40 x 16 mm | Transfer de una tinta, emblema aprox. 32 x 10 mm | Manga izquierda; posicion nominal 25 mm sobre el borde, sin cruzar costura |
| Colgante | 55 x 90 mm | Kraft cafe sin estucar; referencia de 350 g/m2, tinta carbon y cordon oscuro | Frente comun; reverso con codigo de diseno y flor ASCII |

La manga usa lima en Not Here, marfil en Own Way y carbon en las poleras claras. Es un acento pequeno: no se repite una marca grande en cada costura. Los cuellos tienen plantillas S, M, L y XL; la talla del pedido debe coincidir con la talla de la etiqueta.

No se han inventado porcentajes de fibra, pais de confeccion, certificaciones ni instrucciones de lavado. El transfer interior es identidad de marca y talla; no reemplaza la informacion verdadera de composicion y cuidados que corresponda a la prenda base. No retirar esa informacion al personalizar. Confirmar la muestra y los datos reales antes de producir o comercializar.

## Archivos

`assets/trims/ownform/` contiene 18 SVG con tipografia en contornos y sus 18 PNG transparentes a 300 ppp:

- Ocho interiores: cuatro tallas en dos tintas.
- Tres firmas de manga: carbon, marfil y lima.
- Un frente de kraft y cuatro reversos: OF-01 a OF-04.
- Una guia separada de corte y perforacion de kraft.
- Un estudio de arte Inner Signal.

Los SVG estan dimensionados en milimetros. Los PNG tienen dimensiones de pixel calculadas a 300 ppp. Los fondos de algodon o kraft de las previsualizaciones no forman parte de los archivos de tinta. Mantener el blanco o marfil impreso donde este previsto: transparencia y tinta blanca no son equivalentes.

La guia `hangtag-cut-guide` marca el contorno 55 x 90 y un orificio de diametro 3 mm con centro a 7 mm del borde superior. **No imprimir esta guia magenta como arte.** El fondo cafe procede del papel, no de un rectangulo de tinta. Confirmar con la imprenta papel, calado, posicion de perforacion, registro frente/reverso, tolerancias e imposicion; no se entrega un pliego industrial ni sangrado de color a sangre.

## Uso de la plancha 30 x 30

Cuello y manga son colocaciones separadas del estampado principal, no una sola aplicacion conjunta. Extender solo la capa que se estampa, evitar costuras o superficies desniveladas bajo la zona de presion, y revisar acceso y area util de la plancha real. La tarjeta se imprime en papel y se corta/perfora; no se prensa contra el algodon.

No se proporciona una receta universal de temperatura, tiempo o presion. El proveedor del transfer debe confirmar compatibilidad con la tela, detalle minimo, contacto de la etiqueta interior con la piel y proceso de aplicacion. Probar adherencia, tacto y lavado en muestras de cuello y manga antes de una tirada. Las fotos son mockups: la escala aparente no sustituye las medidas de archivo ni una muestra fisica.

## Inner Signal

Una flor construida con caracteres, cian, lila y arena sobre carbon, con STILL becoming. Lienzo de 260 x 280 mm, tipografia y geometria originales. Las referencias del usuario orientan la relacion entre codigo, figura organica y color; no se copian sus retratos ni interfaces como estampados.

El efecto se plantea como color impreso mate, no foil, vinilo holografico ni material que cambie fisicamente con la luz. Un acabado iridiscente real seria otro desarrollo de materiales y pruebas. Este estudio se muestra fuera del catalogo de venta y no se puede agregar a la bolsa.

## Fotografia y web

Cinco imagenes hechas con ImageGen integrado: interior, kraft, manga, Polera Not Here v2 con terminaciones y modelo con el estudio Inner Signal. PNG originales y WebP de web estan en assets/brands y assets/products, con prefijo ownform. Prompts exactos: `docs/ownform-trims-prompts.json`.

En la web, las fichas OWN FORM permiten recorrer Interior, Kraft y Manga, muestran medidas, y ofrecen las plantillas SVG. La plantilla interior cambia de talla con la seleccion de producto; sin seleccion, M aparece rotulada como muestra. Las fotos macro muestran el sistema de marca, no vistas adicionales exactas de cada SKU. Las prendas y campanas previas se conservan; Not Here utiliza una nueva imagen v2 sin borrar el original.

## Regeneracion

`python scripts/generate-ownform-trims.py` crea los SVG y el manifiesto con fontTools. `node scripts/render-ownform-trims.cjs` crea los PNG con sharp; `SHARP_MODULE` permite indicar el modulo de un runtime local cuando no este instalado en el proyecto. La aplicacion y el build no requieren esas dependencias de desarrollo.

Estado de entrega: **diseno y archivos para prueba de proveedor; terminaciones fisicas aun no validadas**.
