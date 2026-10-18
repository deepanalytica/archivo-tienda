# Producto, producción y control de calidad / Standard ARCHIVO v0.1

**Regla de oro:** una ficha bonita no es un SKU listo para vender. Ninguna prenda o proveedor se denomina «premium comprobado» hasta validar evidencia real. `docs/production/prepress.md` explica que los 99 SVG del laboratorio de once marcas son **estudios**, que pueden diferir del mockup aprobado.

## Arquitectura física de cada SKU
`brand_id → collection_id → design_id → sample_revision → blank_supplier_id → color_size_variant → production_method → approved_price → available_regions`.
El `product.id` de `catalog.js` permanece estable. La variante del proveedor no debe exponerse como equivalente a una prenda ARCHIVO si el fit o el tejido cambian.

### Ficha maestra de producto (campos imprescindibles)
| Familia | Campos/evidencia | Aprobador |
|---|---|---|
| Identidad | ID SKU, marca, colección, autor, fecha, licencia, nombre | Dirección |
| Base textil | proveedor/modelo, composición, gramaje g/m², país, certificado documental cuando aplique, talla real, encogimiento | Producto |
| Moldería | fit probado, medidas S/M/L/XL en cm, tolerancias, cintura/pecho/largo, fotos de muestra | QA |
| Arte | master SVG, PNG 300 ppp cuando corresponda, ancho/alto mm, distancia a cuello/costura, técnica, colores, trazos mínimos | Arte |
| Terminación | etiqueta principal, care label conforme datos reales, firma secundaria, colgante, packaging | QA |
| Logística | peso real, dimensiones paquete, destino/país, carrier, impuestos y contingencia | Operación |
| Economía | COGS real, fabricación, envío al cliente, fees, tributos relevantes, devoluciones esperadas, CAC objetivo, margen contribución | Comercial |
| Evidencia | fotos físicas, prueba de lavado, registro de defectos, aprobación, versión del master sample | Dirección + QA |

## Gates de producto
- **P0 / concepto:** idea, mockup, precios referenciales. Se puede mostrar en estudio solo con descripción fiel.
- **P1 / arte preparado:** SVG a escala, técnica propuesta, no equivale a prenda real.
- **P2 / prototipo recibido:** muestra física y proveedor identificado, fotos originales, tabla de medidas.
- **P3 / QA aprobado:** 5 lavados + medición de encogimiento y cambio cromático, tacto/adhesión, costuras, ajuste; repetir 10 lavados para producto principal o campaña relevante. Registrar método y resultado, no inventar tolerancias universales.
- **P4 / oferta aprobada:** precio final, plazos, condiciones de retracto/cambio/devolución aplicables, despacho real, disponibilidad, obligaciones tributarias y atención de incidencias.
- **P5 / disponible:** checkout verificado extremo a extremo, capacidad de fabricación, orden de prueba con tracking, contingencia y publicación coordinada.

**Bloqueantes:** arte no coincide con mockup, bordado ilegible, proveedor cambia blank sin aviso, imposibilidad de cumplir plazo, patente/marca ajena, claims falsos, tallaje ambiguo, checkout sin conciliación.

## Selección de proveedores (sourcing dual)
**Ruta Chile / producción propia:** blanks locales seleccionados → estampadora existente → impresión/transfer/personalización → etiqueta y packaging propios → despacho nacional. Ventajas: control y velocidad posibles; riesgos: consistencia de blank, transfer, stock y capacidad manual. Solicitar muestra y cotización formal.

**Ruta Printful / POD:** usar para referencias efectivamente disponibles por región, idealmente prueba internacional o pequeña serie sin inventario. Ventajas: catálogo y fabricación externa; riesgos: costos/logística internacional, variabilidad de fulfillment, aduanas, branding parcial y cambio de base. No asumir que el proveedor está disponible o autorizado para cada país/diseño sin comprobarlo en una cotización vigente.

**No hacer arbitraje automático** entre proveedores hasta validar equivalencia: un hoodie de 340 g/m² y uno de 270 g/m² NO son el mismo producto.

## Protocolo muestra
1. Elegir dos blanks comparables y el arte más exigente de la colección.
2. Medir con cinta prenda plana antes de intervenir (ancho pecho, largo, manga, hombro, peso).
3. Documentar método de impresión, parámetros específicos del insumo/fabricante y tamaño físico. Nunca aplicar una receta universal.
4. Foto neutral con carta/iluminación de referencia; inspeccionar a 50 cm y 2 metros, costuras y bordes.
5. Lavar bajo instrucción del tejido/transfer, registrar cambios y números antes/después.
6. Registrar aceptación/rechazo y costo puesto en Chile. Si falla, corregir técnica o blank antes de repetir muestra.
7. Archivar el «golden sample» con ID, fecha, proveedor, talle, color y revisión; comparar lotes posteriores.

## Registro de incidencias y sustitución
`INC-ID / SKU / pedido / falla / fotos / proveedor / severidad / solución / costo / prevención`.
Ante stock-out, no sustituir producto silenciosamente; solicitar autorización de cliente o devolver pago conforme obligación y política aplicable.

## Cálculo de rentabilidad
Precio cobrado final − tributos de venta aplicables − comisiones pasarela − COGS − material/impresión − envío subsidiado − consumibles − provisión incidencias − CAC = **contribución de pedido** (evitar dobles conteos según quién pague despacho). El cálculo debe considerar IVA/retenciones en condición tributaria real, no tratar todo IVA como costo universal ni toda transferencia como margen.

## Documentos de producto en este repositorio
- `docs/production/prepress.md`: advertencia sobre mockups y estudio de vectores.
- `docs/ownform-art-direction.md`: tamaños y tecnología preliminar.
- `docs/ownform-identidad-fisica.md`: trims e interiores.
- `docs/other-nature.md`: archivos y límites físicos.
- `docs/film-look.md`: color grade no destructivo.

## Cumplimiento y etiquetado
Verificar normativa comercial/consumidor chilena, rotulado textil y comunicaciones fiscales con especialistas antes de abrir venta. Nunca usar referencias vagamente sostenibles, «100% orgánico», «hecho en Chile», «edición numerada», «impermeable» o «últimas unidades» sin evidencia verificable. Si hay consumo internacional, revisar cada jurisdicción de destino.
