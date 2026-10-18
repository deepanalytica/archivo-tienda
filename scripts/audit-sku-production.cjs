#!/usr/bin/env node
"use strict";
// Exporta matriz de readiness a partir de catalog.js (fuente de verdad).
// No modifica catálogo ni sitio público.
const fs = require("node:fs");
const path = require("node:path");
const catalog = require("../catalog.js");
const root = path.resolve(__dirname, "..");
const printStudies = JSON.parse(fs.readFileSync(path.join(root,"assets/prints/brand-lab/manifest.json"),"utf8"));
const byBrand = new Map(printStudies.map(i=>[i.id,i]));
const dest = path.join(root,"output","production");
const csv = value => '"' + String(value ?? "").replaceAll('"','""').replaceAll("\r"," ").replaceAll("\n"," ") + '"';
const rows = catalog.products.map(p => {
  const mark = byBrand.get(p.brand);
  const hasArt = Boolean(p.print && p.print.svg);
  const method = p.category === "Gorros" ? "Prensa de gorros (verificar equipo y área)"
    : ["Poleras","Polerones"].includes(p.category) ? "Prensa plana (verificar tela, placa y transfer)"
    : "Procesamiento/confección especializada por validar";
  return {
    sku_id:p.id,
    marca:catalog.brands[p.brand]?.name || p.brand,
    coleccion:catalog.collections[p.collection]?.name || p.collection,
    categoria:p.category,producto:p.name,
    precio_referencial_clp:p.price,
    imagen_concepto:p.image,
    arte_especifico_svg:hasArt?p.print.svg:"",
    propuesta_estudio_no_equivale_a_sku:mark?.macro || "",
    madurez_arte:hasArt ? "arte SVG para prueba de proveedor" : "arte final exacto del SKU pendiente",
    proceso_a_evaluar:method,
    proveedor_prenda:"pendiente",composicion_verificada:"pendiente",
    gramaje_verificado:"pendiente",muestra_fisica_aprobada:"NO",
    lavado_aprobado:"NO",terminaciones_aprobadas:"NO",
    costo_real_aprobado:"NO",stock_real_aprobado:"NO",
    habilitado_para_venta:"NO",
  };
});
const brandCount=Object.keys(catalog.brands).length;
const collectionCount=Object.keys(catalog.collections).length;
if(rows.length!==51||brandCount!==12||collectionCount!==16)throw Error("El catálogo cambió: revisar exportación/README. "+JSON.stringify({products:rows.length,brands:brandCount,collections:collectionCount}));
if(rows.filter(x=>x.arte_especifico_svg).length!==10)throw Error("Revisar artes exactos OWN FORM en catálogo.");
const columns=Object.keys(rows[0]);
fs.mkdirSync(dest,{recursive:true});
fs.writeFileSync(path.join(dest,"sku-readiness.csv"),columns.join(",")+"\n"+rows.map(r=>columns.map(k=>csv(r[k])).join(",")).join("\n")+"\n");
fs.writeFileSync(path.join(dest,"sku-readiness.json"),JSON.stringify({generated_at:new Date().toISOString(),summary:{total:rows.length,brands:brandCount,collections:collectionCount,svgBySku:10,stillNotCommercial:rows.length},items:rows},null,2)+"\n");
console.log("Matriz lista: 51 SKU, 12 marcas, 16 colecciones; 10 SVG específicos de prueba; 41 artes específicos pendientes.");
console.log("Salida: output/production/sku-readiness.csv y .json");
