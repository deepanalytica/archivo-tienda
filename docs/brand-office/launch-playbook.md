# Drops, campañas y lanzamiento / Libro de operación

**Principio:** la comunicación editorial crea deseo; la tienda cobra sólo lo que podemos cumplir. Una colección puede existir sin drop; un drop no implica inventario artificial ni urgencia falsa.

## 0 / Selección de oportunidad
Elegir colección que haya pasado gate de producto. Matriz de prioridad: distinción, señales reales de demanda, facilidad de arte+producción, margen, compatibilidad logística. Para el primer experimento se proponen **OWN FORM / Self Defined** e **IMAGO / Herbario indócil** como hipótesis comparables, pero NO lanzar ambas de manera obligatoria si no pasan QA.

## 1 / Brief comercial
Registrar: mercado Chile o internacional; oferta y precio final; stock real o capacidad/tiempo de preventa; política tributaria/logística; tallas con medidas; audiencia; promesa de valor; claim principal; meta de pedidos; presupuesto en efectivo; contingencia de devoluciones y retrasos.

### Tipos de lanzamiento
- **Preventa verdadera:** cliente conoce claramente que se fabrica después de comprar, fecha estimada y reglas aplicables. Nunca informar «entrega inmediata».
- **Drop con stock:** unidades reales ya disponibles y contadas; solo declarar «limitado» si hay restricción documentada.
- **Edición abierta / evergreen:** sin escasez artificial; disponible según capacidad de producción.
- **Prueba editorial sin cobro:** prototipos y lista de interés, evitando simular ventas.

## 2 / Campaign kit obligatorio
- Concepto 1 frase, motivo del drop, portada 16:9, hero de marca, retrato/modelo 4:5 y reel 9:16.
- 4 tomas mínimas del producto real: frente, espalda, detalle textil/estampa, escala de ajuste.
- Storytelling breve de concepto, copy humano por nivel de conciencia del comprador, tabla de medidas, composición/origen comprobados, plazo total y envío, FAQ de cambios.
- Separar **arte editorial con IA** de **fotografía que acredita el producto real**. Prompts/versiones/derechos archivados.
- Un CTA verificable («Explorar», «Reservar preventa», «Comprar») acorde al estado real.

## 3 / Calendario relativo
| Fase | Plazo orientativo | Entregable y decisión |
|---|---|---|
| T-28 a T-21 | Investigación | hipótesis de demanda, blank, viabilidad y costos |
| T-21 a T-14 | Prototipo | muestra, correcciones, tech pack, cierre QA |
| T-14 a T-7 | Campaña | fotos fieles, storytelling, landing, tabla de tallas, términos |
| T-7 a T-1 | Prelanzamiento | contenido orgánico, lista de interés, test pago+orden+stock |
| T0 | Lanzamiento | aviso claro, canal de venta real, observación de pedidos |
| T+1 a T+14 | Cumplimiento | producción/envío/atención, tracking, incidencias |
| T+14 a T+30 | Revisión | margen, feedback, defectos, decisión de siguiente drop |

Los plazos son guía **condicional**; no publicar fecha antes de saber proveedor, fabricación y tránsito.

## 4 / Funnel y narrativa
- **Descubrimiento:** foto/código potente que hace detener el scroll, sin logo ARCHIVO gigante.
- **Interés:** concepto de marca, diferencia, detalles gráficos y silueta.
- **Deseo:** material/fit de muestra real, combinaciones y valores.
- **Decisión:** precio completo, talla, disponibilidad, envío y medio de pago.
- **Confianza:** políticas, servicio, estado del pedido, pruebas de calidad y canal de contacto.
Diseñar comunicación por cada marca; NO repetir un mismo copy sustituyendo únicamente el nombre.

## 5 / Tecnología de pedidos
`created → payment_pending → payment_confirmed → production_approved → in_production → shipped → delivered` + ramas `cancelled/refund_pending/refunded/incident`.
El backend verifica montos, firma de webhook de pago, idempotencia y stock/capacidad antes de crear una orden. Un redirect exitoso no confirma pago. Printful, si se usa, es costo de proveedor cobrado por separado; la liquidación de la pasarela puede ser posterior. **No habilitar fulfillment automático con caja inicial nula** salvo que exista línea/saldo operativo suficiente y conciliación.
La versión actual GitHub Pages no cobra ni guarda pedidos públicos.

## 6 / Lanzar con caja casi nula
- Construir contenido y lista de espera orgánica; el tráfico no está garantizado.
- Vender preventa con plazo transparente y cobrar antes de ordenar materia prima *solo cuando la ley y capacidad lo permitan*.
- Empezar con una referencia de impresión sencilla y un blank consistente; las muestras, devoluciones, embalaje y discrepancias de cambio pueden exigir dinero, por lo tanto no afirmar «sin capital ni riesgo».
- Separar fondos de órdenes no cumplidas de utilidad distribuible; provisión para incidencias.
- Registrar rentabilidad real por marca sin abrir múltiples pasarelas de pago.

## 7 / Métricas por drop
`visitas landing; sesiones producto; tasa add-to-cart; inicio checkout; tasa pago confirmado; AOV; margen contribución por pedido; CAC; pedidos cumplidos a tiempo; ratio defectos; devoluciones; satisfacción; recompra`.
Con volúmenes bajos mostrar conteos y contexto en lugar de porcentajes engañosos; no deducir product-market fit de 5 ventas.

## 8 / Post-mortem obligatorio
Documentar 5 hechos, 3 aprendizajes, 3 decisiones: continuar, pausar o archivar. Indicar qué parte fue estética y cuál operativa; no corregir una campaña sin explicar si problema era producto, precio, confianza, audiencia o visibilidad.
