# Revelado Fotografico / ARCHIVO

Tratamiento no destructivo de las fotografias en la web. Los WebP y PNG originales, los SVG de estampado, las plantillas de etiquetas y sus descargas no se modifican.

## Campanas

El filtro `film-editorial` combina saturacion contenida, curvas RGB con negros ligeramente levantados, sombras frias y luces calidas con un blanco suave. Un campo de grano monocromo fino se suma a la fotografia, sin afectar tipografia ni controles superpuestos. El grano es estatico: no parpadea ni exige animacion continua.

Se aplica a portada, Other Nature, editoriales, escenas de verano, escapadas, colecciones y universos de marca. En la ficha de producto, Campana utiliza este mismo tratamiento.

## Catalogo

`film-product` usa curvas casi neutras y la mitad de intensidad de grano para preservar el color y la legibilidad de las prendas. Se aplica a las fotos individuales, miniaturas, terminaciones y bolsa. La vista Arte original siempre lleva `filter: none`.

Los filtros SVG viven en `index.html`, con interpolacion sRGB y recorte por el alfa de la imagen. `film-look.css` los conecta a las fotografias WebP. La biblioteca no es interactiva ni accesible, y permanece fuera del flujo de pagina. No se aplica filtro fotografico a logos, paletas, textos ni artes vectoriales.

Este cambio sustituye la decision anterior de mantener todas las fotos del catalogo sin filtro. La gradacion es deliberadamente mas discreta alli que en las campanas.
