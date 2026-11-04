# AR / WORKSTATION — Guía de implementación
## Estado
Rama `feat/ar-workstation-redesign` — implementación inicial de la identidad, las 8 vistas, 18 proyectos y 3 casos comerciales. Diseño original para el portafolio `deepanalytica/archivo-tienda`.

## Reglas
- No falsear resultados, ventas o métricas. Diferenciar demo, investigación y ficha conceptual.
- Mantener `portafolio/original.html`, `portafolio/criterio/`, `portafolio/proyectos/meta-harness/` y `portafolio/proyectos/sin-humo/`.
- Evitar el recorte de piezas comerciales que contienen texto.
- Conservar enlaces a evidencia pública y a los originales.
- Estética de terminal CRT a pantalla completa, en HTML real y accesible. Sin dependencia de WebGL.
- Archivo original de 18 portadas editoriales: `portafolio/ar-assets/covers/`. NO son capturas reales.
- Base de GitHub Pages: `/archivo-tienda/portafolio/`. Las rutas no deben apuntar a `/portafolio/` desde la raíz del dominio.
- Validar menú con teclado, 360/390/768/1440 px, `prefers-reduced-motion`, assets, enlaces, libro de 300 páginas.
- Aplicar cambios a `main` solo tras revisión.
## Vistas
`/` Inicio; `proyectos/` índice; `casos/` casos; `laboratorio/` laboratorio; `metodo/` método; `biblioteca/` libro; `perfil/` perfil; `contacto/` contacto.
## Tecnología
Sitio estático (HTML + CSS + JavaScript de módulos ligeros), sin nuevas librerías obligatorias. El CSS implementa fósforo, líneas y viñeta con preferencias de movimiento accesibles; por seguridad y usabilidad no deforma el texto real.
## Fuente
Documento editorial desarrollado a partir de la propuesta de dirección de arte AR/2026. Ver también `portafolio/DESIGN_SYSTEM.md` y `portafolio/EXPERIENCE_ROADMAP.md`.
