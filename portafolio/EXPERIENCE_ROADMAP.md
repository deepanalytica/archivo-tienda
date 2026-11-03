# DEEP UI SYSTEM — Implantación progresiva en el portafolio

Actualizado: 2026-11-02. Destino: `/portafolio/`. Perfil: Community Management + Growth + Data Science + IA verificable.

## Objetivo de contratación

En una lectura de 20–40 segundos, un reclutador debe comprender el encaje del candidato: **contenido → conversación → coordinación → verificación**. Los tres casos reales son la prueba primaria. La capa de sistemas y herramientas amplía el potencial, pero no debe desplazar el trabajo realizado ni atribuir métricas inexistentes.

## Reglas vinculantes

- No emplear todas las bibliotecas simultáneamente. La palabra *arsenal* significa disponer de módulos adecuados, no añadir megabytes sin propósito.
- Mantener el HTML, galerías, marcas y las 18 fichas de proyectos. Sin recortar creatividades 4:5.
- La página debe funcionar con JavaScript externo desactivado, con fallas del CDN, sin WebGL, con `prefers-reduced-motion` y con dispositivos de baja potencia.
- No fingir resultados, conversiones, ROAS ni integraciones a ManyChat/CRM no existentes.
- Limitar componentes experimentales a una zona demostrativa; no usar navegación invasiva ni animación perpetua a pantalla completa.
- Priorizar desempeño, accesibilidad (WCAG contraste/teclado) y mobile-first.

## Diseño de sistema

| Fase | Tecnología | Entrega | Estado |
|---|---|---|---|
| 0. Contenido/estructura | HTML semántico, design-system-v2.css | Casos y contacto existentes; muestras de IA reales | Ya desplegado |
| 1. Coreografía | GSAP + ScrollTrigger como mejora opcional | Revelaciones, progresión y transiciones de contenido sin bloquear visibilidad | Implementación actual |
| 2. Núcleo visual | Three.js módulo ES, cargado bajo demanda | Modelo 3D de un sistema de adquisición-verificación con fallback SVG y controles accesibles | Implementación actual |
| 3. Motion story | CSS + JS nativo, preparado para Remotion | Storyboard interactivo de hook → utilidad → CTA, sin inventar videos o campañas ejecutadas | Implementación actual |
| 4. Arquitectura de flujos | SVG accesible + estados JS, preparado para React Flow | Diagrama accionable con cuatro etapas, hipótesis y control humano | Implementación actual |
| 5. Biblioteca de componentes | React, TypeScript, R3F/Drei, React Flow, Motion | Migración selectiva cuando exista proyecto React, pruebas y build estable | Siguiente fase, NO cargado en producción |
| 6. Producción audiovisual | Remotion, Rive, Lottie, Jitter | Exportables reales, derechos y formatos validados por proyecto | Siguiente fase, NO cargado en producción |
| 7. Alternativas / exploración | OGL, Pixi, Babylon, Spline, GSAP Flip, Lenis, Embla, Swiper, D3, ECharts, shadcn, Radix | Laboratorio interno, no todas en la home | Disponible para evaluación |

## Diseño visual

A. Índice y portada simples; imágenes reales. B. Tres casos verificables. C. Operación del cargo. D. Simulación interactiva de proceso que el equipo podría usar desde su primer día. E. Arsenal de 18 proyectos con filtro. F. WhatsApp.

El 3D simboliza relaciones y verificaciones, no es una visualización de datos empresariales reales.

## Criterios de aceptación

1. La portada se entiende sin animación ni conexión con un CDN.
2. Three.js solamente se descarga si el módulo entra en pantalla, si se detecta WebGL, si el dispositivo es apropiado y no se reduce el movimiento.
3. El diagrama opera con click, teclado y semántica apropiada; muestra cuatro etapas y sus resultados esperados.
4. La secuencia creativa funciona sin librerías y sin tiempo de carga observable; está rotulada como **propuesta**.
5. Las tarjetas de ARCHIVO conservan las 12 marcas, 16 colecciones y logotipos, WAL conserva seis piezas completas.
6. El lector de Sin Humo y contacto de WhatsApp no cambian.
7. La verificación estructural pasa antes de publicar; si es posible se ejecutan capturas de escritorio/móvil con Playwright.
8. No prometer tasas de conversión ni garantías de crecimiento.

## Rendimiento y guardarraíles

- `IntersectionObserver` para activación.
- `document.visibilityState`, limpieza y limitación de frames para Three.js.
- `devicePixelRatio <= 1.5` y WebGL disponible.
- WebGL no se inicia en móviles, ahorro de datos o movimiento reducido; el SVG de respaldo comunica lo mismo.
- Dependencias remotas siempre opcionales, importación diferida y fallback íntegro.
- Sin autoplay de sonido, loops sobre toda la página, scroll-jacking ni animaciones que desplacen CTA.

## Riesgos a revisar

WebGL no disponible / pérdida de contexto, CDNs bloqueados, efectos que degradan la lectura, sobrecarga de texto, bibliotecas redundantes, imágenes deformadas, dependencias sin versión fija y contenido demostrativo confundido con métricas reales.

## Medida de éxito

- Comprensión del perfil en cinco segundos; casos sin recortes.
- Ruta a WhatsApp al alcance sin explorar todos los proyectos.
- Interacciones accesibles, navegación sin solapamiento y sin errores JS críticos.
- CDN no indispensable para el contenido.
