#!/usr/bin/env python3
"""Comprueba estructura, SVG XML, tamaños de lienzo, identidad y estado de laboratorio."""
import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET

root = Path(__file__).resolve().parent.parent
prints = json.loads((root / "assets/prints/brand-lab/manifest.json").read_text(encoding="utf-8"))
trims = json.loads((root / "assets/trims/brand-lab/manifest.json").read_text(encoding="utf-8"))
assert len(prints) == len(trims) == 11, "Se esperan 11 marcas complementarias a OWN FORM"
assert {x["id"] for x in prints} == {x["id"] for x in trims}
seen = set()
count = 0
for p in prints:
    brand = p["id"]
    assert (root / p["officialSymbol"]).is_file(), f"Símbolo oficial faltante: {brand}"
    files = [(p["macro"], (270, 270)), (p["micro"], (80, 80))]
    t = next(x for x in trims if x["id"] == brand)
    assert len(t["files"]) == 7
    names = ("neck-s.svg", "neck-m.svg", "neck-l.svg", "neck-xl.svg",
             "sleeve-signature.svg", "hangtag-front.svg", "hangtag-back-layout.svg")
    expected = [(60,35)]*4 + [(40,16)] + [(55,90)]*2
    for f, size in zip(t["files"], expected):
        assert f.endswith(names[len(files)-2]), "Desorden de archivos de terminación"
        files.append((f, size))
    for rel, wh in files:
        assert rel not in seen, f"Duplicado: {rel}"
        seen.add(rel)
        src = (root / rel).read_text(encoding="utf-8")
        doc = ET.fromstring(src)
        w, h = wh
        assert doc.tag.endswith("svg")
        assert doc.attrib.get("width") == f"{w}mm", (rel, "ancho")
        assert doc.attrib.get("height") == f"{h}mm", (rel, "alto")
        assert doc.attrib.get("viewBox") == f"0 0 {w} {h}", (rel, "viewBox")
        assert "<text" not in src.lower(), f"Texto dependiente de fuente en {rel}"
        assert "<image" not in src.lower(), f"Raster embebido en {rel}"
        assert not re.search(r"\\b(?:href|xlink:href)=", src), f"Dependencia externa en {rel}"
        assert any(e.tag.endswith(tag) for e in doc.iter() for tag in ("path", "ellipse", "circle", "rect")), rel
        count += 1

assert len(seen) == 99
assert (root / "assets/prints/ownform").is_dir(), "No modificar ni eliminar OWN FORM"
print(f"OK: {count} SVG / 11 marcas; 22 estampados de estudio y 77 terminaciones.")
print("ATENCIÓN: la validación digital NO sustituye la muestra, el taller ni las pruebas de lavado.")
