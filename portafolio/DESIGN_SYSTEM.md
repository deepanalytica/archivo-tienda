# Portafolio 2026 · Sistema de diseño y criterios de mantenimiento

## Objetivo

Presentar una candidatura de **Community Manager con capacidad adicional en Growth, Data Science e IA**, dirigida a reclutadores que valoran ejecución, criterio visual y operaciones comerciales.

La narrativa sigue cuatro preguntas: **¿Qué hace? → ¿Qué puede mostrar? → ¿Cómo trabajaría? → ¿Qué profundidad adicional aporta?**. Los casos visuales permanecen antes del catálogo de sistemas.

## Principios visuales

1. **Espaciado predecible.** Usar un ritmo principal de 8 px: 8, 16, 24, 32, 48, 64 y 96 px. Reservar 4 px para separaciones micro. Son tokens de construcción, no una obligación matemática cuando el contenido requiere ajustes ópticos.
2. **Jerarquía tipográfica.** Base de 16 px con interlineado cercano a 1.55. Escala inspirada en 1,25: 16/20/25/31/39/49/61. Adaptar titulares a pantalla y contexto: no imponer valores fijos a todos los títulos.
3. **Distribución de color.** Priorizar fondo neutral, superficies de apoyo y un solo acento principal. La regla 60/30/10 funciona como una guía de equilibrio, no como cuota exacta de píxeles. Evitar azul acento en superficies azules de contraste insuficiente.
4. **Profundidad sobria.** Sombras tenues teñidas de azul verdoso según superficie y jerarquía, nunca grandes sombras negras opacas. Bordes finos y separación espacial hacen la mayor parte del trabajo.
5. **Legibilidad.** Procurar bloques de texto corrido en torno a 45–75 caracteres por línea en escritorio, aproximadamente 35 en móvil cuando sea razonable; longitud flexible según idioma y tamaño. Contraste de texto normal >= 4.5:1.
6. **Movimiento funcional.** Carruseles horizontales, feedback en hover, tabs accesibles, apariciones moderadas y barra de avance. Respetar `prefers-reduced-motion`. No imponer WebGL o GSAP como requisito sin mejora real de utilidad.

## Estados de evidencia

- **Caso real:** artefactos y sitios verificables; resultados comerciales solo si están documentados.
- **Demo / prototipo:** interfaz original existente, pero sin atribución de ventas o resultados de clientes.
- **Ficha editorial:** explicación de diseño conceptual, sin fingir que es una captura de UI en producción.
- **Investigación:** hipótesis y metodología con límites explícitos.

## Archivos y verificación

- `index.html`: estructura, copy, casos, filtros y lógica.
- `design-system-v2.css`: tokens, tipografía, responsive y profundidad.
- `scripts/verify-portfolio.cjs`: coherencia de contenido, enlaces, evidencia, escala, contraste y CSS publicado.
- GitHub Actions: compilación y verificación antes de despliegue a GitHub Pages.

**Importante:** la revisión automatizada comprueba estructura, no sustituye pruebas reales con navegador móvil ni garantiza accesibilidad integral.

## Criterios de calidad para próximas piezas

Una pieza entra en el portafolio solo si aporta algo en **comunicación, ejecución, criterio o evidencia**. No duplicar capturas, no mostrar mockups como campañas reales y mantener visible una ruta rápida de evaluación antes de dar acceso al catálogo ampliado.
