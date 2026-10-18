"""Create original, outlined garment artwork at physical print dimensions.

Native vector artwork, not a conversion of the user's reference photographs.
Requires the existing development dependency fontTools.
"""
import json
import math
from functools import lru_cache
from pathlib import Path
from xml.sax.saxutils import escape
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'prints' / 'ownform'
INK, CREAM, ACID, BLUE = '#202b32', '#f3eddf', '#d8e85b', '#477a91'


@lru_cache
def font(style):
    serif = style == 'serif'
    axes = {'wght': 620, 'opsz': 110, 'SOFT': 15, 'WONK': 1} if serif else {'wght': 860 if style == 'bold' else 650, 'wdth': 80 if style == 'bold' else 100}
    return instantiateVariableFont(TTFont(ROOT / 'assets/fonts' / ('fraunces.ttf' if serif else 'archivo.ttf')), axes, inplace=True)


@lru_cache
def outlines(text, style='bold'):
    face = font(style)
    glyphs, cmap = face.getGlyphSet(), face.getBestCmap()
    parts, x = [], 0
    bounds = []
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        pen, box = SVGPathPen(glyphs), BoundsPen(glyphs)
        glyph.draw(pen)
        glyph.draw(box)
        if box.bounds:
            left, bottom, right, top = box.bounds
            bounds.append((left + x, bottom, right + x, top))
        parts.append(f'<path transform="translate({x} 0)" d="{pen.getCommands()}"/>')
        x += glyph.width
    return ''.join(parts), (min(b[0] for b in bounds), min(b[1] for b in bounds), max(b[2] for b in bounds), max(b[3] for b in bounds))


def lettering(text, x, y, width, height, color=INK, style='bold', italic=False):
    body, (left, bottom, right, top) = outlines(text, style)
    sx, sy = width / (right - left), height / (top - bottom)
    skew = ' skewX(-9)' if italic else ''
    return f'<g fill="{color}" aria-label="{escape(text)}" transform="translate({x} {y}){skew}"><g transform="scale({sx} {-sy}) translate({-left} {-top})">{body}</g></g>'


def inside(x, y, polygon):
    result = False
    previous = polygon[-1]
    for current in polygon:
        ax, ay = previous
        bx, by = current
        if (ay > y) != (by > y) and x < (bx - ax) * (y - ay) / (by - ay) + ax:
            result = not result
        previous = current
    return result


def glyph_field(mask, x, y, width, height, columns, rows, colors):
    parts = []
    charset = '/+X:#@'
    dx, dy = width / columns, height / rows
    for row in range(rows):
        for col in range(columns):
            px, py = x + col * dx, y + row * dy
            if not mask(px + dx / 2, py + dy / 2):
                continue
            value = (row * 13 + col * 7 + int(5 * math.sin(col * .6))) % 17
            if value == 0:
                continue
            char = charset[value % len(charset)]
            parts.append(lettering(char, px, py, dx * .68, dy * .74, colors[(col // 7 + row // 5) % len(colors)], 'regular'))
    return ''.join(parts)


def footer(width, number, color):
    return lettering(f'OWN FORM / SELF DEFINED / {number}', 10, width - 12, 150, 3.5, color, 'regular')


def quiet():
    cloud = [(65, 172, 42, 27), (107, 154, 40, 37), (148, 170, 48, 36), (187, 181, 47, 25), (119, 191, 67, 24)]
    mask = lambda x, y: any(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1 for cx, cy, rx, ry in cloud)
    return ''.join([
        lettering('OWN FORM / VOL. 01', 10, 8, 55, 3.5, BLUE, 'regular'),
        lettering('QUIET', 10, 23, 240, 48),
        lettering('confidence.', 15, 80, 235, 29, BLUE, 'serif', True),
        glyph_field(mask, 16, 116, 228, 104, 52, 20, [INK, BLUE]),
        lettering('NO NEED TO BE LOUD.', 10, 235, 95, 4.5, INK, 'regular'),
        footer(260, '01', BLUE),
    ])


def not_fit():
    profile = [(97, 150), (116, 138), (145, 142), (158, 154), (157, 168), (173, 179), (160, 182), (164, 190), (155, 199), (142, 205), (142, 218), (178, 232), (198, 250), (64, 250), (78, 232), (111, 218), (111, 205), (94, 191), (89, 169)]
    return ''.join([
        lettering('NOT HERE', 8, 15, 254, 43, CREAM),
        lettering('to', 10, 75, 33, 30, ACID, 'serif', True),
        lettering('FIT IN.', 55, 72, 205, 44, CREAM),
        lettering('[', 23, 141, 11, 90, ACID),
        glyph_field(lambda x, y: inside(x, y, profile), 60, 134, 141, 118, 32, 23, [CREAM, ACID]),
        lettering(']', 237, 141, 11, 90, ACID),
        footer(270, '02', CREAM),
    ])


def own_way():
    plane = [(179, 167), (263, 118), (236, 208), (218, 179), (204, 187), (206, 169)]
    mask = lambda x, y: inside(x, y, plane)
    return ''.join([
        lettering('MAKE', 10, 14, 260, 49, INK),
        lettering('your own', 17, 76, 219, 30, CREAM, 'serif', True),
        lettering('WAY.', 10, 125, 157, 51, INK),
        glyph_field(mask, 177, 117, 88, 96, 22, 19, [INK, CREAM]),
        lettering('///  ///  ///  ///  ///', 13, 221, 204, 8, CREAM, 'regular'),
        lettering('DIRECTION IS A CHOICE.', 10, 245, 120, 5, INK, 'regular'),
        footer(280, '03', INK),
    ])


def self_defined():
    return ''.join([
        lettering('SELF', 5, 10, 69, 15, INK),
        lettering('defined.', 8, 33, 66, 12, INK, 'serif', True),
        lettering('[ + / + ]', 5, 56, 43, 6, INK, 'regular'),
        lettering('OWN FORM / 04', 5, 70, 39, 3, INK, 'regular'),
    ])


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    specs = [
        ('quiet-confidence', 'QUIET confidence.', 260, 'Pecho centrado', quiet()),
        ('not-here', 'NOT HERE to FIT IN.', 270, 'Pecho centrado', not_fit()),
        ('own-way', 'MAKE your own WAY.', 280, 'Espalda, sobre el bolsillo delantero', own_way()),
        ('self-defined', 'SELF defined.', 80, 'Pecho izquierdo', self_defined()),
    ]
    manifest = []
    for key, title, size, placement, body in specs:
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}mm" height="{size}mm" viewBox="0 0 {size} {size}" fill-rule="nonzero"><title>{escape(title)}</title><desc>Original OWN FORM artwork. Outlined type. Transparent background. Artboard {size} x {size} mm.</desc><g id="print-art">{body}</g></svg>'
        (OUT / f'{key}.svg').write_text(svg + '\n', encoding='utf-8')
        manifest.append(dict(id=key, phrase=title, widthMm=size, heightMm=size, placement=placement, background='transparent', typography='outlined', rasterDpi=300, maxPressMm=300, status='supplier-proof-required'))
    (OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print(f'Created {len(specs)} original outlined print designs, maximum 280 x 280 mm.')


if __name__ == '__main__':
    main()
