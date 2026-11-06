# AR/ Studio — Design System (React source)

Versión fuente del sistema de diseño AR/. La demo HTML publicada en `../index.html` es autónoma y puede abrirse sin `npm`. Esta carpeta es la implementación modular en **Vite + React + TypeScript** para evolucionarla a producción.

## Desarrollo

```bash
npm install
npm run typecheck
npm run dev
npm run build
```

La configuración de Vite usa `base: '/archivo-tienda/ar-studio/'` para GitHub Pages. Si se publica el `dist/` en esa ruta, reemplazará la demo estática. **No hacerlo hasta completar QA y revisar los cambios**.

## Integraciones reales presentes en el código

- **GSAP:** `src/App.tsx`, entrada progresiva y replay de microinteracciones, con cleanup y soporte para reduced motion.
- **React Bits:** el patrón de SpotlightCard se implementó de forma original en `src/components/SpotlightCard.tsx`, inspirado en la categoría de microinteracciones de React Bits. **No es código oficial importado desde React Bits**. Para usar componentes oficiales, consultar https://www.reactbits.dev/ y copiar/instalar el componente seleccionado conforme a sus instrucciones.
- **Three.js:** `@react-three/fiber` y `three` en `src/components/TerrainScene.tsx`, importado en forma diferida.
- **Remotion:** `@remotion/player` y una composición original `src/remotion/StudioIntro.tsx`, cargada solo al abrir el laboratorio. Mantener iguales las versiones de `remotion` y `@remotion/player`.
- **GStack:** flujo de gobernanza y QA recomendado en `../SUPERPROMPT.md`. No es una librería visual ni está instalada en la demo.

## Calidad / limitaciones

Esta entrega está compuesta y versionada, pero **no se ejecutó `npm install` ni compilación en el entorno de generación** (sin acceso a npm). Requiere ejecutar `npm run typecheck` y `npm run build` en una máquina con red antes de describir el código React como compilado y listo para producción. La demo HTML publicada sí es independiente de esa compilación.

Los proyectos ilustran un sistema editorial. No se inventan métricas, clientes ni resultados. Sustituir arte abstracto por capturas reales al migrar el portafolio definitivo.