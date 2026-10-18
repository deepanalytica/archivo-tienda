# Control de 51 SKU existentes

Ejecutar `node scripts/audit-sku-production.cjs` desde la raíz. Produce `output/production/sku-readiness.csv` y `sku-readiness.json` leyendo **directamente** `catalog.js`, sin copiar el catálogo a otra fuente ni alterar su inventario.

La exportación distingue 10 SKU de OWN FORM con arte SVG específico para pruebas y 41 SKU que todavía no tienen un SVG de estampado exactamente trazado al diseño de sus mockups. Los nuevos 22 SVG de brand-lab son **propuestas conceptuales**, no sustitutos 1:1 aprobados de esas 41 prendas.

Para cada SKU indica método por evaluar, prenda/proveedor/tela pendientes, muestra física, lavado, etiqueta reglamentaria, costo e inventario. Ninguna referencia está marcada como lista para vender.

Conviene elegir primero un único producto demostrable por marca y completar la trazabilidad `SKU → arte → base → proveedor → muestra → QA → costo → stock → comercialización`.
