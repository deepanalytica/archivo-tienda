# ARCHIVO BRAND OFFICE / Centro de dirección de marcas

**Versión de trabajo:** 0.1 · 18 octubre 2026 · **Estado:** propuesta interna pendiente de aprobación creativa. No modifica la tienda pública.

ARCHIVO es una casa creativa y plataforma multimarca con **12 marcas propias, 16 colecciones y 51 SKU conceptuales** registrados a la fecha. El catálogo existente (`catalog.js`) es la fuente vigente de marca/colección/producto; el registro de este directorio agrega gobernanza y descripción estratégica, **no crea SKU, stock ni pedidos**.

## Ruta de lectura / directorio de decisiones

| Archivo | Para qué sirve | Autoridad |
|---|---|---|
| [architecture.md](architecture.md) | Jerarquía casa → marca → línea → colección → drop → SKU → campaña | Política propuesta |
| [brand-registry.json](brand-registry.json) | Registro computable, IDs y arquetipos propuestos | Índice editorial, no catálogo |
| [differentiation.md](differentiation.md) | Fronteras creativas y prevención de canibalización | Control de dirección |
| [research-and-personas.md](research-and-personas.md) | Investigación de públicos y validación de compradores hipotéticos | Protocolo de evidencia |
| [portfolio-scorecard.md](portfolio-scorecard.md) | Prioridad comercial, caja y asignación de recursos | Comité de cartera |
| [collections.md](collections.md) | Estado de las 16 colecciones y modelo de temporada | Planeación creativa |
| [creative-direction.md](creative-direction.md) | Proceso del insight al concepto, diseño y dirección de arte | Método de estudio |
| [quality-and-production.md](quality-and-production.md) | Fichas técnicas, muestras, claims y gates físicos | Bloqueante antes de vender |
| [launch-playbook.md](launch-playbook.md) | Calendario, campaign kit, preventa, order flow y métricas | Método comercial |
| [roadmap.md](roadmap.md) | Secuencia de validación y backlog con responsables | Plan por fases |
| [templates.md](templates.md) | Plantillas de brief, colección, prenda, campaña y decisión | Documentación |
| [brands/](brands/) | Doce biblias de marca independientes | Borrador propuesto |
| [visual-spec.md](visual-spec.md) | Fotografía, grano, color, casting, UX editorial y marca madre | Sistema audiovisual |

## Portafolio
- **Streetwear conceptual:** [OWN FORM](brands/own-form.md), [WE ARE LOGIC](brands/we-are-logic.md), [ÓRBITA](brands/orbita.md).
- **Arte y sensibilidad:** [IMAGO](brands/imago.md), [NEBLINA](brands/neblina.md), [ISLA BRAVA](brands/isla-brava.md).
- **Ciudad y diseño:** [UMBRAL](brands/umbral.md), [LIMEN](brands/limen.md).
- **Escape y ocio:** [SALITRE](brands/salitre.md), [MAREA](brands/marea.md), [SOLAR CLUB](brands/solar-club.md), [ALTO SUR](brands/alto-sur.md).

Estos grupos son **herramientas internas de comparación**; no se recomienda mostrarlos como nueva navegación obligatoria en la tienda. Una persona debería descubrir los mundos, no leer nuestro organigrama.

## Tres niveles de verdad documental

1. **Hecho existente:** dato literalmente registrado en `catalog.js`, assets o documentos anteriores. No prueba venta, registro de marca ni fabricación física.
2. **Dirección propuesta:** hipótesis de público, arquetipo, estética ampliada, cápsula futura o precio objetivo; se aprueba por dirección.
3. **Validado:** hay evidencia asociada: entrevista, prueba de material, muestra aceptada, costo real, derechos, foto comprobable, datos de venta.

En todas las fichas se indica cuál nivel corresponde. **Nunca promovemos un concepto a «producto listo» por tener una foto generada.**

## Jerarquía de firmas
ARCHIVO = casa editorial, plataforma y experiencia de compra. Cada marca = firma protagonista de prendas y campañas. Colección = capítulo creativo. Drop = evento comercial. Las prendas no deben añadir un gran logo institucional de ARCHIVO; sello secundario pequeño sólo donde aporte trazabilidad. Mantener reglas de `docs/archivo-brand-system-v2.md`.

## Flujo para crear algo nuevo
`Insight → Brand fit → Concept → Colección → Dirección de arte → SKU/tech pack → Muestra → Aprobación → Campaña → Drop → Métricas → Aprendizaje`.

## Qué NO está completado
Nombres protegidos legalmente, entrevistas y segmentación reales, benchmark de competidores por marca, costos puestos en Chile, certificación textil, artes exactos de todos los mockups, muestra física por SKU, derechos/consentimientos de campaña, pagos online, política logística ejecutada y métricas de compra. Las biblias son **fundamento editorial profesional**, no evidencia comercial.

## Operación y versionado
Cada cambio debe indicar: `marca / colección / autor / fecha / qué cambió / evidencia / decisor`. Mantener histórico de rechazos y razones. No alterar los slugs del catálogo sin una migración. Para verificar correspondencia del registro con `catalog.js`: `node scripts/verify-brand-office.cjs` (una vez integrado este directorio).
