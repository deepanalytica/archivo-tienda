"""Original OWN FORM finishing system. Dimensions in millimeters, outlined type."""
import importlib.util
import json
import math
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
source = importlib.util.spec_from_file_location('ownform_art', ROOT / 'scripts/generate-ownform-art.py')
art = importlib.util.module_from_spec(source)
source.loader.exec_module(art)
OUT = ROOT / 'assets/trims/ownform'
INK, CREAM, ACID = art.INK, art.CREAM, art.ACID


def sleeve(color):
    return f'<g fill="{color}"><path d="M4 3H11V4.8H5.8V11.2H11V13H4Z"/><path d="M29 3H36V13H29V11.2H34.2V4.8H29Z"/><path d="M14 12 23 4H26L17 12Z"/></g>'


def neck(size, color):
    return ''.join([
        art.lettering('OWN', 4, 4, 29, 7, color),
        art.lettering('FORM', 4, 14, 35, 8, color),
        art.lettering(size, 47, 14, 8, 8, color),
        art.lettering('SELF DEFINED / VOL. 01', 4, 28, 43, 2.2, color, 'regular'),
    ])


def bloom(x, y, size, colors):
    center_x, center_y = x + size / 2, y + size * .36
    def mask(px, py):
        angle = math.atan2(py - center_y, px - center_x)
        radius = math.hypot(px - center_x, py - center_y)
        flower = radius < size * (.235 + .09 * math.cos(5 * angle))
        stem = abs(px - (center_x + math.sin((py - y) / size * 4) * size * .03)) < size * .027 and center_y < py < y + size
        leaf = ((px - center_x + size * .12) / (size * .17)) ** 2 + ((py - y - size * .79) / (size * .07)) ** 2 < 1
        return flower or stem or leaf
    return art.glyph_field(mask, x, y, size, size, 30, 32, colors)


def tag_front():
    return ''.join([
        art.lettering('[ / ]', 19, 14, 17, 4, INK, 'regular'),
        art.lettering('OWN', 7, 28, 35, 10, INK),
        art.lettering('FORM', 7, 41, 41, 10, INK),
        art.lettering('Your form.', 8, 62, 38, 5, INK, 'serif', True),
        art.lettering('YOUR RULES.', 7, 73, 29, 3, INK, 'regular'),
    ])


def tag_back(code, phrase):
    return ''.join([
        art.lettering('SELF DEFINED', 7, 15, 41, 3.8, INK),
        bloom(10, 25, 35, [INK]),
        art.lettering(phrase, 7, 66, 41, 3, INK, 'regular'),
        art.lettering(f'DESIGN / OF-{code}', 7, 75, 32, 2.5, INK, 'regular'),
        art.lettering('WEAR YOUR OWN POINT OF VIEW.', 7, 82, 41, 1.6, INK, 'regular'),
    ])


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    specs = []
    for color_name, color in [('charcoal', INK), ('ivory', CREAM)]:
        for size in ['S', 'M', 'L', 'XL']:
            specs.append((f'neck-{size.lower()}-{color_name}', 60, 35, f'Interior OWN FORM / {size} / {color_name}', neck(size, color), '#202b32' if color_name == 'ivory' else '#f3eddf', 'brand-size-transfer'))
    for color_name, color in [('charcoal', INK), ('ivory', CREAM), ('acid', ACID)]:
        specs.append((f'sleeve-{color_name}', 40, 16, f'Sleeve signature / {color_name}', sleeve(color), '#202b32' if color_name != 'charcoal' else '#f3eddf', 'sleeve-transfer'))
    specs.append(('hangtag-front', 55, 90, 'OWN FORM / Kraft hangtag front', tag_front(), '#b58b60', 'paper-hangtag'))
    guide = '<g fill="none" stroke="#d50087" stroke-width="0.25"><rect x="0.25" y="0.25" width="54.5" height="89.5"/><circle cx="27.5" cy="7" r="1.5"/></g>'
    specs.append(('hangtag-cut-guide', 55, 90, 'CUT AND HOLE GUIDE ONLY / DO NOT PRINT AS ART', guide, '#b58b60', 'production-guide'))
    phrases = [('01', 'QUIET CONFIDENCE.'), ('02', 'NOT HERE TO FIT IN.'), ('03', 'MAKE YOUR OWN WAY.'), ('04', 'SELF DEFINED.')]
    for code, phrase in phrases:
        specs.append((f'hangtag-back-{code}', 55, 90, f'Kraft hangtag / Design OF-{code}', tag_back(code, phrase), '#b58b60', 'paper-hangtag'))
    study = bloom(20, 12, 220, ['#9ed7dd', '#bfa9e3', '#d6bdaf']) + art.lettering('STILL', 15, 239, 93, 23, CREAM) + art.lettering('becoming.', 120, 244, 128, 14, '#bfa9e3', 'serif', True)
    specs.append(('signal-bloom-study', 260, 280, 'Inner Signal / Original ASCII flower study', study, '#202b32', 'digital-art-study'))
    manifest = []
    for key, width, height, title, body, background, kind in specs:
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}mm" height="{height}mm" viewBox="0 0 {width} {height}"><title>{escape(title)}</title><desc>Original OWN FORM concept. Outlined art, transparent background. Supplier proof required. Paper trim and hole guides are separate.</desc><g id="trim-art">{body}</g></svg>'
        (OUT / f'{key}.svg').write_text(svg + '\n', encoding='utf-8')
        manifest.append(dict(id=key, widthMm=width, heightMm=height, kind=kind, previewBackground=background, rasterDpi=300, status='supplier-proof-required'))
    (OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print(f'Built {len(specs)} finishing and study designs. No composition, origin or wash claims invented.')


if __name__ == '__main__':
    main()
