# AR / WORKSTATION — CRT Cinemático, gasto 0 créditos

## Implementación
- Carcasa restaurada de monitor vintage, creada íntegramente con CSS.
- Vidrio curvado sugerido mediante bordes, viñeta y reflejos; patrón RGB/scanlines de intensidad configurable.
- Todas las entradas, rutas, botones, navegación y contacto se renderizan **dentro de `#shell`**, el área del vidrio.
- Encendido inicial con CSS (línea de fósforo, encendido AR/ y skip), recordando la visita en la pestaña.
- Paisaje topográfico 2D dibujado con Canvas. No necesita vídeo, WebGL ni llamadas a APIs de IA.
- 4 proyectos destacados en el escritorio, 18 proyectos accesibles en el índice y rutas anteriores preservadas.
- Móvil con cuerpo CRT más delgado y desplazamiento interno, sin solapar botones; diseño adaptativo.
- Opción `CRT / SUTIL`, `CRT / INTENSO`, `CRT / OFF`, dentro del cristal.
- `prefers-reduced-motion` omite encendido y detiene animaciones. Canvas se pausa si la vista o pestaña no están visibles.

## Costos de generación
**0 créditos Higgsfield:** no se han creado videos ni imágenes con modelos. No se necesitan para esta primera entrega.
En el futuro Higgsfield podría generar 1 sola secuencia de entrada y sustituir o complementar el encendido CSS, previa cotización y aprobación explícita. Mantener el contenido y la UI como elementos web reales.

## Archivos
- `workstation/app.js`: nuevo home y disposición del shell CRT.
- `workstation/crt-immersive.css`: monitor y presentación del sistema.
- `workstation/crt-experience.js`: encendido y render del paisaje.
- `workstation/workstation.css`: estilos base y resto de las vistas, sin alteración destructiva.

## Regresión
`npm ci && npm test`; `node scripts/verify-workstation.cjs`; `node scripts/verify-workstation-browser.cjs`. En CI se comprueba 1440px y 390px.
