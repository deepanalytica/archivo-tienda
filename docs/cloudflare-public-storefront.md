# ARCHIVO — Publicar tienda con repositorio privado

## Objetivo
**GitHub privado** = código, Brand Office, artes maestros, costos y desarrollo. **Cloudflare Pages público** = tienda editorial, 12 marcas, 16 colecciones, 51 productos conceptuales y bolsa de selección, **sin pagos online activos**. No confundir «sitio público» con «checkout listo».

## Compilación exclusiva para publicación
Cloudflare debe ejecutar `npm ci && npm run build:public`. Esto:
1. Genera `_site/` con la tienda existente.
2. **Elimina `assets/prints/` y `assets/trims/`** de la salida pública.
3. Elimina del catálogo publicado los vínculos para descargar SVG/PNG de impresión y etiquetas (los conserva en el repositorio privado).
4. Mantiene `estudio.html` con perfiles y campañas pero omite la sección técnica de laboratorio; `estudio.js` omite los assets privados.
5. Ejecuta `scripts/verify-cloudflare.cjs` como guardia de publicación. Si se detectan rutas reservadas o assets faltantes, la compilación falla.
6. Conserva pública la firma y símbolos de marca en `assets/identities` (son parte de la identidad comercial), no los archivos maestros de estampación.

El `npm run build` anterior permanece intacto para compatibilidad con la suite GitHub Pages previa. **No usar esa compilación antigua para Cloudflare**, pues publica las plantillas de impresión.

## Conexión inicial (acción desde cuenta de Cloudflare)
1. Iniciar sesión en https://dash.cloudflare.com/ y abrir **Workers & Pages → Create application → Pages → Connect to Git**.
2. Autorizar Cloudflare Pages para GitHub y permitir acceso *únicamente* al repositorio privado `deepanalytica/archivo-tienda`. No hacerlo público.
3. Seleccionar repositorio `deepanalytica/archivo-tienda` y rama de producción `main`.
4. Nombre de proyecto sugerido: `archivo-clothing-art` (se genera una URL `.pages.dev` si el nombre está libre).
5. **Framework preset:** None.
6. **Build command:** `npm ci && npm run build:public`.
7. **Build output directory:** `_site`.
8. **Root directory:** `/` (repositorio raíz).
9. **Node:** `.node-version` fija Node 24. Si el panel usa otra versión, ajustar `NODE_VERSION=24`.
10. **Deploy**. Comprobar que el estado sea Success, visitar la URL real que muestre Cloudflare y probar móvil/escritorio, carga de imágenes, 12 marcas, 16 colecciones y bolsa.

Cloudflare puede desplegar desde repositorios privados con integración Git; la tienda compilada es pública. Su plan gratis tiene límites de compilación/uso que deben comprobarse.

## Seguridad después del primer deploy
- Probar respuestas 404 para `/assets/prints/...`, `/assets/trims/...`, `/admin.html`, `/data/orders.json`, `/docs/brand-office/` y `/server.cjs`.
- Comprobar que ninguna ficha ofrece descarga SVG/PNG maestro y que `estudio.html` muestra solo dirección de arte editorial, no laboratorios prepress.
- Revisar legibilidad de colores, recortes, imágenes reales vs conceptuales, enlaces y rendimiento.
- No conectar API de gestión ni subir variables secretas a archivos públicos.
- **Pago:** no existe checkout público; la interfaz debe informar precios referenciales y ausencia de cobros.
- No publicar afirmaciones sobre stock o textiles certificados basadas exclusivamente en renders.
- Configurar posteriormente dominio personalizado en la sección **Custom domains** del proyecto, con registros DNS verificados. No asumir ningún dominio comprado.

## Cuando se conecte Cloudflare
Cloudflare publicará automáticamente nuevas compilaciones de `main`. Las ramas secundarias pueden crear previews: revisar que no revelen información interna y restringir vista preliminar si se desea.

## Estado al redactar
Sólo se prepara la configuración de build en GitHub. Este commit **no crea ni vincula por sí solo una cuenta Cloudflare, ni certifica despliegue**; la autorización de GitHub dentro de Cloudflare la debe ejecutar el titular de esa cuenta.
