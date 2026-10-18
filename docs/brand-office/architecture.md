# Arquitectura de ARCHIVO / Casa de marcas

## Modelo elegido
**Casa de marcas curada (house of brands) con operación editorial compartida**. ARCHIVO no es una decimotercera etiqueta textil, ni un marketplace abierto a terceros hoy. Es marca de confianza institucional, interfaz, curaduría y operación. La firma principal visible sobre el producto pertenece a OWN FORM, IMAGO, UMBRAL u otra marca de la casa.

## Objetos y cardinalidad
```text
ARCHIVO [casa: 1]
├─ BRAND [12; identidad de largo plazo]
│  ├─ LINE [0..N; permanencia opcional, p.ej. Core]
│  ├─ COLLECTION [1..N; idea creativa; 16 registradas]
│  │  ├─ CHAPTER [0..N; subtema narrativo, no necesariamente SKU]
│  │  └─ PRODUCT DESIGN [0..N; concepto visual]
│  │     └─ SKU VARIANT [talla/color/proveedor; producción validada pendiente]
│  └─ BRAND ASSETS [firma, símbolo, paleta, voz, fotografía]
├─ DROP [evento con inicio/fin; puede reunir diseños aprobados]
├─ CAMPAIGN [narrativa/media; puede acompañar uno o más drops]
├─ SEASON [contexto comercial; Chile, hemisferio sur]
└─ ORDER / SUPPLY / FINANCE [operación de plataforma, no promesa de marca]
```

**Regla esencial:** una temporada no es una colección; un drop no es una marca; una campaña no prueba stock; un mockup no es ficha técnica. El catálogo actual almacena `brands`, `collections`, `products`; ninguna nueva estructura reemplaza esas claves en producción sin plan técnico.

## Campos obligatorios
| Objeto | Campos clave | Estado |
|---|---|---|
| Marca | ID estable, manifiesto, diferencial, público hipotético, arquetipos propuestos, paleta, no-go, voz, assets, responsable | Biblia |
| Colección | ID, marca, concepto, tesis, códigos, referencias, SKU, dependencia técnica, estado y aprobador | Registro |
| Producto | ID, referencia de mockup, geometría exacta, blank, medidas, variante, técnica, prueba de lavado, costo, foto de muestra | Ficha técnica |
| Drop | Fecha, horario, target, países, reglas de preventa, medio de pago, promesa de entrega, stock/capacidad, plan de respaldo | Plan |
| Campaña | Idea, one-line brief, mensajes, casting y derechos, shotlist, assets, color grade, formatos, CTA y métricas | Kit |

## Gobernanza
- **Dirección creativa ARCHIVO:** aprueba brand fit, colecciones, arte final y coherencia del portafolio.
- **Arte y contenidos:** desarrolla visuales, manual de campaña y control fílmico sin alterar el estampado en fotos de producto.
- **Producto/QA:** valida blanks, fit, tamaño físico, técnicas de impresión, muestras y trazabilidad.
- **Comercial/operación:** determina precio final, margen, promesa de entrega, cobro, cumplimiento y atención.
- Al inicio una sola persona puede asumir varios roles, **pero las aprobaciones son controles distintos**, no firmas ficticias.

## Principios de arquitectura visual
- ARCHIVO presenta y edita, **no compite** con la creatividad de sus marcas.
- No duplicar wordmark de ARCHIVO en un mismo viewport o fotografía.
- Paletas y letras de cada marca no deben colorearse globalmente por el theme de la casa.
- El catálogo integra filtros compartidos; la landing de marca puede cambiar tono, imagen, copy y relación de productos.
- La UI muestra estado real («concepto» o «disponible», según datos verificados), nunca checkout simulado.

## Marca vs línea vs colección
**Core** podría ser una línea permanente de OWN FORM si se valida la demanda y reposición; hoy NO existe como catálogo aprobado. «Self Defined» y «Other Nature» sí son colecciones documentadas; «SIGNAL», «REFRACT», «AFTERIMAGE» y «ARCHIVE» son capítulos creativos de Other Nature, no nuevas marcas.

## Propiedad y derechos
Toda creación debe tener ficha de procedencia (autor, herramienta, referencias, licencias y uso autorizado). Buscar disponibilidad de nombres y signos en INAPI antes de invertir en inventario o campañas; no presentar como registradas las denominaciones actuales.

## Conflicto entre creatividad y conversión
La métrica comercial no autoriza copiar otra marca ganadora. Si un diseño vende en una marca, se amplía dentro de **su propio lenguaje** o se propone una colaboración con intención explícita. Nunca replicar el mismo estampado en diferentes firmas sin una política curatorial y contractual clara.
