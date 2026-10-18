# Sistema editorial, fotografía, dirección de arte y experiencia digital

## Identidad de la casa
ARCHIVO funciona como **soporte editorial**, no como una campaña extra de ropa. Mantener el lockup, monograma y espaciado definidos en `docs/archivo-brand-system-v2.md`. Una cabecera institucional limpia, navegación precisa y mucho espacio para que cada mundo respire. **Nunca** duplicar el logotipo madre en una misma escena/hero ni imponer un patrón de fondo intrusivo.

**Tokens casa existentes:** carbón `#252524`, papel `#F3EDDF`, vino `#572A39`, gris tinta `#62605C`. Las marcas conservan sus paletas y símbolos. Usar serif editorial de forma selectiva y contrastes tipográficos disciplinados; evaluar cualquier cambio al wordmark oficial separadamente de la UI.

## Fotografía: dos familias NO intercambiables
1. **EDITORIAL/CAMPAÑA:** fotografía aspiracional y narrativa. Grano fílmico monocromo estático de densidad baja, negros suavemente levantados, medios tonos naturales y gradación cromática coherente con marca. Modelos adultos con piel y cabello realistas, textil creíble, posturas naturales, sombras coherentes.
2. **PRODUCTO/EVIDENCIA:** fotografía neutral y fiel del SKU fabricado. Mostrar proporción real, frente/espalda, textura, costuras, etiqueta e interior. No usar grano o look que altere la percepción del color o esconda defectos. Puede existir una versión editorial adicional, pero no sustituye la evidencia.

La implementación actual `docs/film-look.md` / `film-look.css` aplica filtros no destructivos; prioridad a conservar arte imprimible y marcas vectoriales sin tratamiento de color.

## Gramática por marca
| Marca | Luz/fondo | Óptica/composición | Tratamiento recomendado |
|---|---|---|---|
| OWN FORM | calle cálida o set carbón | frontal, aire tipográfico | contraste medio, grano urbano |
| IMAGO | galería burdeos/papel | escala monumental/closeup grabado | profundidad azul tinta, tonos piel naturales |
| UMBRAL | hormigón, planos | líneas en perspectiva, sombra geométrica | negros estructurados, arcilla/cobalto |
| SALITRE | costa cálida, sombra lenta | horizontes, amplitud, detalles íntimos | marfil brillante controlado |
| ALTO SUR | piedra/refugio | capas, planos medios amplios | verdes fríos y óxido natural |
| LIMEN | galería/terraza | arquitectura habitada, retrato cándido | cobalto y vino moderados |
| ISLA BRAVA | terraza/sol duro | movimiento, composición abierta | papaya/buganvilla vibrantes sin clipping |
| NEBLINA | vegetación/niebla | planos suaves, proximidad textil | lavanda/pistacho atmosféricos |
| WE ARE LOGIC | ciudad modular | repetición, geometría en plano | magenta/azul controlados |
| SOLAR CLUB | cancha/sobremesa | encuadres grupales naturales | verano analógico cálido |
| MAREA | Pacífico/olas | movimiento, horizontes inclinados justificados | azul Pacífico, grano de acción |
| ÓRBITA | set curvo, luz práctica | frontal de pop geométrico | lima/lila sin brillo de tejido falso |

## Shotlist base
`01 key visual; 02 cuerpo entero; 03 medio plano frente; 04 medio plano espalda; 05 close-up estampado; 06 caída del tejido; 07 detalle etiqueta; 08 empaque; 09 retrato editorial; 10 clip vertical movimiento`.
El lookbook aspiracional puede generar las tomas 1, 2 y 9 con IA etiquetada internamente; las tomas 3–8 para vender calidad deben provenir del producto real o indicarse explícitamente como conceptuales.

## Brief de imagen generativa
Incluir: `marca + colección + papel del asset + prenda/arte que no debe alterarse + casting adulto + set/luz + ángulo + textura realista + cámara/lente + frame + color grade + grano fino`. Negative brief: dedos deformes, logos ajenos, estampados reinterpretados, piel plástica, iluminación incompatible, producto inexistente presentado como fabricado, repetición abusiva de palabra ARCHIVO.
Guardar imagen, prompt, seed/versión si existe y referencias/licencias. Exigir inspección humana.

## UI premium no genérica
- **Index editorial:** titulares tipográficos, cartelas pequeñas, fotografía dominante; la composición del contenido cambia por marca, no la legibilidad.
- **Páginas de marca:** apertura con manifiesto, firma protagonista, colección, campaña, piezas y nota curatorial; nunca dos logos madre.
- **Páginas de colección:** historia y editoriales primero; grilla comprensible después; filtros no deben ocultar las 12 marcas.
- **Producto:** talla/material/plazo/precio final cuando validado; CTA claro y honesto; recomendaciones cruzadas por criterio editorial, no por coincidencia aleatoria.
- **Móvil:** contraste, tipografía legible, gestos accesibles, navegación sin animaciones forzadas; respetar `prefers-reduced-motion`.

## QA visual
Revisar 390/768/1440 px, recortes de cabeza y prenda, arte completo, ALT específico, contraste, peso WebP, navegación teclado, estado de carga, foco visible, tiempos razonables y que el grano **nunca** contamine logotipos, estampados descargables ni textos.
