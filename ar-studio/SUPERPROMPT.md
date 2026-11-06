# AR/ STUDIO — SUPERPROMPT DE ARQUITECTURA, DIRECCIÓN DE ARTE Y PRODUCTO
Versión 1.0 · 06-11-2026 · Documento maestro de ejecución para Codex / Claude Code

## Rol y criterio
Actúa como una célula senior de dirección de arte, product design, diseño de sistemas, front-end engineering, motion design y QA. No generes una plantilla común ni un dashboard SaaS estándar. Desarrolla un portfolio/índice de proyectos para un estudio creativo multidisciplinario: **AR/**. La personalidad es *serena, editorial, experimental y técnicamente rigurosa*.

## Objetivo del producto
Una persona recibe el enlace a AR/ y debe poder: (a) ver inmediatamente los mejores proyectos, (b) entender qué problema resuelve cada uno sin leer una biografía extensa, (c) filtrar por disciplinas, (d) abrir una vista de caso, con material real y trazabilidad, (e) contactar al autor. Métrica UX primordial: primera fila de proyectos visible en desktop sin hacer scroll; en móvil, primer proyecto y filtro accesibles sin recorrido largo.

## Identidad visual y valores
- **AR/** minimalista y memorable; evitar cerebros de IA, partículas genéricas, auroras decorativas sin propósito y frases grandilocuentes.
- **Base blanco perla** (#F7F7F3), superficies blanco cálido (#FFFFFF), tinta verde oscuro (#123A31), texto (#1C2424), texto secundario (#67736F), líneas (#E4EAE6).
- Acentos dosificados: verde señal (#B8FF63), naranja editorial (#FF7849), malva (#A88BF4), azul-cian (#3ED6C5). Cada proyecto posee su universo visual; el contenedor mantiene lenguaje compartido.
- Layout de retícula 12 columnas, contenedor fluido hasta 1480 px, spacing 4/8/12/16/24/32/48/64/96; esquinas radiadas 12/18/24; sombras suaves con elevación discreta (nunca sombras grises densas).
- Combinación tipográfica: sans contemporánea para productos, mono para metadata, display editorial solo para detalles. Jerarquía Display 72/1.0, H1 52, H2 36, H3 24, cuerpo 15–17, caption 12. Escala fluida responsiva.
- Transparencia y calma: las superficies se distinguen por estructura y contraste, no por glow permanente ni exceso de bordes.

## Arquitectura de información
1. **Portada / Explorar:** cabecera mínima, statement breve, arte generativo no invasivo, filtros interactivos y una primera fila de 4 proyectos inmediatamente visible; mínimo 8 proyectos reales en colección.
2. **Colección:** búsqueda, categorías, orden y modos cuadrícula/lista; nunca métricas inventadas de vistas, likes, clientes, satisfacción ni facturación.
3. **Casos:** encabezado con problema / contribución / resultado verificable, galería, decisiones y proceso, enlace a demo/repositorio solo cuando exista, accesibilidad.
4. **Sistema de diseño:** consola visual de tokens + paleta, tipografías, espaciado, radios, sombras, botones, campos, chips, badges, cards, navegación, modales, feedback, layouts y motion.
5. **Laboratorio / Movimiento:** ejemplos de microinteracciones, una escena ligera Three.js y un ejemplo real de composición Remotion (player), no una promesa ni un vídeo ficticio.
6. **Perfil y contacto:** breve, en lenguaje natural, sin sobreexplicar; contacto accesible desde cualquier sección.

## Modelo de proyectos, datos y honestidad
Usar contenido real y verificable. Proyectos prioritarios: Deep Geo (análisis territorial), Praxios / Meta Harness (arquitectura de sistemas), Visual Art AI (comunicación), WAL / Archivo (ecommerce y marca), Conv-OS (investigación y economía unitaria), Deep Analytica. No presentar como resultados comerciales los prototipos. No inventar casos de clientes, métricas, años ni herramientas usadas si no hay fuente. Sustituir imágenes conceptuales por capturas/visualizaciones reales antes de publicar el portafolio definitivo. En preview del design system, distinguir demostración de contenido de producción.

## Motor técnico
- Vite + React + TypeScript, modular, sin backend para el showcase. CSS Variables como fuente de tokens, clases CSS semánticas, no estilos inline masivos.
- **GSAP** para transiciones locales, montajes/reveals con cleanup y prefers-reduced-motion; no encadenar efectos para todo el scroll.
- **React Bits** como librería fuente de patrones inspiracionales; integrar componentes seleccionados desde código propio o instalar CLI, nunca copiar sin verificar licencia/atribución. Componentes sugeridos: AnimatedContent / BlurText / SpotlightCard; cuando no estén disponibles ofrecer fallback sin dependencia obligatoria.
- **Three.js + @react-three/fiber** solo para ilustración topográfica demand-driven, lazy loaded, con fallback SVG/CSS y sin bloquear el contenido principal. Bloquear scroll-jacking.
- **Remotion + @remotion/player** para una composición corta de motion original, lazy loaded en el laboratorio; sin autoplay de sonido ni descarga de recursos innecesarios.
- **GStack** se trata como flujo de agentes/QA, no librería visual: planning, review, browser-QA y checklist; instalar solo si el entorno lo permite.
- Target static deploy GitHub Pages bajo subruta aislada, sin alterar el portafolio actual; alternativa Cloudflare Pages.

## Componentes obligatorios
Button (primary, secondary, ghost, icon, loading, disabled); Chip (filter/removable); Badge; Input (search/focus/error); Tooltip; Tabs; segmented control; toast; modal; Card (project/tile/feature); NavBar; SideNav; TokenSwatch; TypeScale; ShadowCard; SpacingScale; MotionSpec; ProjectDrawer; EmptyState; Skeleton. Los controles de muestra deben ser operativos y accesibles.

## Interacción y motion
- Hover: 160–240 ms, transform <= 3 px, sin cambios de layout; focus-visible con anillo claro; overlay solo si aporta jerarquía.
- Entrada GSAP: escalonamiento 40–70ms, duración 450–700ms, easing power3.out; una sola vez por pantalla.
- Cards: elevación sutil + imagen con escala ≤1.03; transiciones de 240ms. Mantener texto legible al hover.
- Modo reducido: sin parallax, sin animación de scroll, sin flicker.
- Teclado: Tab, Escape, Enter, flechas donde corresponda. Búsqueda mediante Ctrl/Cmd+K.

## Calidad y verificación (no afirmar sin probar)
1. npm install y npm run build; npm run typecheck.
2. Verificación visual a 390, 768, 1024, 1440 px.
3. Revisar contraste WCAG AA texto relevante, focus-visible, teclado, formularios con label.
4. Revisar errores consola, enlaces internos, estados vacíos, combinaciones de filtros.
5. Auditoría rendimiento: importaciones lazy para Three.js y Remotion, imágenes optimizadas, reducir JS, evitar layout shift.
6. QA con pasos GStack o protocolo equivalente, registrar evidencia real y fallos restantes.
7. No confundir concepto de diseño con versión de producción: cada elemento debe indicar si es demo.

## Criterios de aceptación
- AR/ y al menos 4 proyectos visibles antes del primer scroll en 1440x900.
- Navegación real entre Overview, Componentes, Proyectos, Motion y Tokens.
- 4 familias cromáticas de proyectos coexistiendo en la misma UI blanca sin ruido visual.
- Filtros y búsqueda funcionales; ficha de proyecto real, cerrable con Escape.
- Vista tokens con copia de valores, controles de estados y espacios, módulos de movimiento.
- Responsive, sin overflow horizontal ni pantalla vacía si WebGL falla.
- El código fuente y la demo online son reproducibles y separados del sitio de producción.

## Proceso por fases
**Fase A** — diseño base y prototipo navegable; **Fase B** — vincular datos reales y assets; **Fase C** — GSAP/React Bits, Three y Remotion; **Fase D** — QA, accesibilidad, documentación, despliegue en ruta aislada; **Fase E** — selección de identidad final y traslado gradual al portafolio público.

## Prohibiciones
No crear cifras de marketing inventadas. No saturar de glassmorphism, cajas vacías, estadísticas falsas ni un hero que empuje los proyectos debajo del pliegue. No publicar sobre la ruta existente /portafolio. No hacer llamadas externas con llaves en el cliente. No usar 3D que no añada significado.