# DEEP UI WORKSPACE — mapa de proyectos para Codex y 21st.dev

Este documento permite localizar los repositorios y delimitar el trabajo de diseño. Es **un índice de repositorios remotos**, no prueba de que estén descargados en Windows. **Codex solo puede editar repositorios que realmente estén accesibles desde su sesión y cuente con permisos**.

## Punto de entrada: portafolio

- Repositorio: `https://github.com/deepanalytica/archivo-tienda`.
- Ruta exacta del portafolio: **`archivo-tienda/portafolio/`**. El HTML de entrada es **`archivo-tienda/portafolio/index.html`**.
- URL publicada: `https://deepanalytica.github.io/archivo-tienda/portafolio/`.
- Build: `npm run build`; validación: `node scripts/verify-portfolio.cjs` y `node scripts/verify-portfolio-browser.cjs` tras generar `_site/`.
- Publicación automática: actualizar `main` dispara GitHub Pages. **Trabajar en ramas de feature y PR**, no publicar directamente cambios de diseño sin validarlos.
- Sistema visual: `portafolio/design-system-v2.css`, `portafolio/experience.css` y `portafolio/DESIGN_SYSTEM.md`.
- Plan de movimiento/3D: `portafolio/EXPERIENCE_ROADMAP.md`.

## Repositorios prioritarios

| Repo | Tipo | Punto de inspección | Prioridad y límite |
|---|---|---|---|
| [archivo-tienda](https://github.com/deepanalytica/archivo-tienda) | PORTAFOLIO DE POSTULACIÓN + TIENDA | `portafolio/index.html`, `portafolio/design-system-v2.css`, `portafolio/experience.css`, `portafolio/experience.js`, `portafolio/experience-three.js`, `portafolio/gallery-viewer.js`, `portafolio/EXPERIENCE_ROADMAP.md`, `scripts/verify-portfolio.cjs`, `scripts/verify-portfolio-browser.cjs` | P0 — solo `portafolio/` y QA. **No modificar la tienda principal**. |
| [visualartai](https://github.com/deepanalytica/visualartai) | Marketing, presencia digital y diseño visual | Inspeccionar `site/` y manifiestos reales antes de cambios | P1 — conversiones, creatividad, mobile |
| [wal.cl](https://github.com/deepanalytica/wal.cl) | Comercio y campañas de sublimación | Inspeccionar `public/assets/campaigns/`, código y manifiestos | P1 — imágenes, carruseles, compra y catálogo |
| [conv-os](https://github.com/deepanalytica/conv-os) | Embudo de adquisición y radar experimental | Inspeccionar `public/`, demos, documentación y tests | P1 — identificar siempre datos DEMO |
| [deep-geo](https://github.com/deepanalytica/deep-geo) | GIS y observatorio territorial | Inspeccionar primero estructura y estado de permisos | P1 — mapas, capas, dashboards |
| [meta-system](https://github.com/deepanalytica/meta-system) | Arquitectura de agentes y verificación | Inspeccionar README, `organs/` y permisos reales | P1 — diagramas y control verificable; arquitectura sensible |
| [praxios](https://github.com/deepanalytica/praxios) | Orquestación y control de agentes | Inspeccionar fuentes del repositorio | P1 — estados, ejecución y observabilidad |
| [inverse-reality-lab](https://github.com/deepanalytica/inverse-reality-lab) | Laboratorio, publicaciones y UI conceptual | Inspeccionar `lab.html`, `praxios.html`, `el-puente/` | P1 — storytelling y legibilidad |
| [msj](https://github.com/deepanalytica/msj) | Conversaciones y procesos multicanal | Inspeccionar README, código y demostraciones | P2 — UI de bandeja y trazabilidad |
| [deep-audio](https://github.com/deepanalytica/deep-audio) | Producción y experiencia audiovisual | Inspeccionar assets reales, README y tecnología | P2 — controles creativos y multimedia |
| [deep-licita](https://github.com/deepanalytica/deep-licita) | Inteligencia de oportunidades | Inspeccionar permisos, flujos y documentación | P2 — filtros, reportes y priorización |
| [deep-analytica-platform](https://github.com/deepanalytica/deep-analytica-platform) | Plataforma tecnológica | Inspeccionar README y manifiestos | P2 — componentes y dashboards |
| [ludusWeb](https://github.com/deepanalytica/ludusWeb) | Experiencias y aplicaciones web | Inspeccionar prototipos publicados y manifiestos | P2 — UX y accesibilidad |
| [clinia](https://github.com/deepanalytica/clinia) | Proyecto de servicios | Inspeccionar estructura antes de asumir alcance | P2 — evaluar interfaz real |
| [jessica](https://github.com/deepanalytica/jessica) | Presencia digital | Inspeccionar estructura antes de asumir alcance | P2 — posicionamiento y conversión |

## Inventario completo de repositorios visibles en GitHub

La cuenta de GitHub conectada expuso los siguientes **62 repositorios**. La inclusión en este inventario no supone que todos estén activos, que sean exclusivamente de UI ni que exista una copia local. Revisar README, rama por defecto, licencia y estado antes de planificar migraciones.

- `dashboard` · `municonectada` · `mejor-ruta` · `smart-city`
- `sitioweb` · `analyticPlatform` · `msj` · `website`
- `webdat` · `web` · `web2022` · `vite-vue-tailwind`
- `ludusWeb` · `app` · `web2` · `sitiowebv2`
- `webv2.1` · `realtimeobjectdetection` · `realtimeod` · `realtime`
- `cpsi` · `Geostein` · `GeoAnalytica` · `GeoAnalyticaApp`
- `respruebas` · `dashboard_donihue` · `dashboard-_san_javier` · `dashboard_sanja`
- `MNE` · `jcp` · `adoptapatitas` · `distrito8`
- `ooparts` · `congresovivo` · `buenbocado` · `erp`
- `rutaoptima` · `jessica` · `licitabot` · `visualartai`
- `fortia` · `edukabot` · `educabot` · `ia-para-humanos-landing`
- `sistema-universal-landing` · `deepanalytica` · `blm` · `deepanalytica.cl`
- `deep-analytica-platform` · `wal.cl` · `ja` · `deep-geo`
- `deep-audio` · `deep-licita` · `meta-system` · `praxios`
- `clinia` · `inverse-reality-lab` · `mix-shary` · `calza`
- `conv-os` · `archivo-tienda`

## Cómo dar acceso a Codex

1. Ejecutar Codex **desde un directorio de trabajo que contenga los repositorios locales autorizados**, por ejemplo `C:\Users\Ale\DEEP-UI-WORKSPACE`.
2. Verificar `git status` y `git remote -v` en cada repositorio antes de modificarlo. No asumir que todos están descargados.
3. Para repos privados se requiere Git autenticado. No copiar tokens ni secretos a prompts, logs o código.
4. Elegir **un repositorio y un objetivo concreto por tanda**. No lanzar cambios masivos sin revisión visual.
5. El plugin 21st.dev está instalado en **Codex local**; no se ejecuta automáticamente en ChatGPT y no descubre carpetas solo por tener el marketplace instalado.

## Método de UI aplicable a todos los productos

**Inventario → diagnóstico visual → propuestas 21st.dev → selección de componentes → rama → implementación → pruebas Playwright desktop/mobile → capturas antes/después → PR → aprobación → publicación.**

Criterios: experiencia móvil, mensajes claros, proporciones correctas de imágenes, accesibilidad, rendimiento, motion reducido y honestidad sobre demos, conversiones y datos. Priorizamos la solución de problemas reales; no instalar todo GSAP/Three.js/Remotion/React Flow en cada proyecto.

## Reglas de aislamiento

- No mezclar presupuestos, secretos, datos personales ni credenciales entre proyectos.
- No tocar producción, pagos, clientes reales, formularios, inventario ni integraciones si el objetivo es solo UI.
- Conservar contenido y marcas existentes, especialmente 12 marcas y 16 colecciones de ARCHIVO, 18 sistemas del portafolio y enlaces a evidencia real.
- Componentes React de 21st.dev requieren plan de integración/build cuando el proyecto original es HTML/JS. No migrar todo por defecto.
- Si un repositorio no está clonado, registrar `pendiente de acceso`, no inventar código ni funcionalidades.
