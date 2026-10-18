"""Original OTHER NATURE artwork and trims, using local OFL font outlines."""
import importlib.util
import json
import math
import random
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
source = importlib.util.spec_from_file_location('ownform_art', ROOT / 'scripts/generate-ownform-art.py')
art = importlib.util.module_from_spec(source)
source.loader.exec_module(art)
INK, CREAM, CYAN, LIME = '#24333c', '#f3eddf', '#87dce0', '#d4e769'


def line(d, color=INK, width=.65):
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'


def label(text, x, y, width, height=3, color=INK):
    return art.lettering(text, x, y, width, height, color, 'regular')


def polar(cx, cy, rx, ry, scale=1):
    points = []
    for index in range(121):
        angle = index * 2 * math.pi / 120
        warp = 1 + .16 * math.sin(3 * angle + .6) + .08 * math.cos(5 * angle)
        points.append((cx + rx * scale * warp * math.cos(angle), cy + ry * scale * warp * math.sin(angle)))
    return 'M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in points) + 'Z'


def bloom():
    def mask(x, y):
        angle = math.atan2(y - 116, x - 131)
        flower = math.hypot(x - 131, y - 116) < 58 + 19 * math.cos(7 * angle)
        stem = abs(x - (132 + 8 * math.sin(y / 30))) < 2.5 and 125 < y < 217
        leaf1 = ((x - 111) / 27) ** 2 + ((y - 188) / 9) ** 2 < 1
        leaf2 = ((x - 149) / 21) ** 2 + ((y - 168) / 8) ** 2 < 1
        return flower or stem or leaf1 or leaf2
    return ''.join([
        art.lettering('SIGNAL', 10, 9, 202, 28, CREAM),
        label('BLOOM / OTHER NATURE / OF-05', 10, 43, 126, 3.2, CYAN),
        art.glyph_field(mask, 20, 53, 220, 167, 54, 42, [CYAN, LIME, CYAN]),
        art.lettering('STILL', 10, 237, 103, 23, CREAM),
        art.lettering('becoming.', 128, 243, 122, 15, CYAN, 'serif', True),
        label('OWN FORM / VOL. 02', 10, 270, 78, 2.6, CREAM),
    ])


def tree():
    rng = random.Random(412)
    branches = [line('M128 211C137 176 119 144 131 99', width=2.2)]
    for index in range(44):
        angle = math.pi * (.12 + .76 * index / 43)
        target_x = 130 + 85 * math.cos(angle) + rng.uniform(-10, 10)
        target_y = 143 - 68 * math.sin(angle) + rng.uniform(-12, 10)
        join_y = 164 + rng.uniform(-18, 24)
        branches.append(line(f'M130 {join_y:.1f}Q{(130+target_x)/2:.1f} {target_y+24:.1f} {target_x:.1f} {target_y:.1f}', width=.7))
        for side in [-1, 1]:
            tip_x, tip_y = target_x + side * rng.uniform(7, 15), target_y - rng.uniform(4, 14)
            branches.append(line(f'M{target_x:.1f} {target_y+7:.1f}Q{tip_x:.1f} {target_y:.1f} {tip_x:.1f} {tip_y:.1f}', width=.55))
            for leaf_index in range(3):
                px = tip_x + rng.uniform(-5, 5)
                py = tip_y + rng.uniform(-4, 4)
                branches.append(f'<path d="M{px:.1f} {py+3:.1f}q-4-4 1-7q4 4-1 7Z" fill="{INK}"/>')
    for index in range(19):
        end_x = 42 + index * 9.6
        end_y = 233 + 7 * math.sin(index * .8)
        branches.append(line(f'M130 201Q{115+(index-9)*2:.1f} 219 {end_x:.1f} {end_y:.1f}', width=.7))
        branches.append(line(f'M{end_x:.1f} {end_y:.1f}l{(-1 if index%2 else 1)*5} 5', width=.5))
    return ''.join([
        label('ARCHIVE / FIELD NOTES / OF-06', 10, 8, 130),
        art.lettering('ROOTED', 10, 21, 240, 31, INK),
        ''.join(branches),
        art.lettering('not fixed.', 54, 250, 161, 17, INK, 'serif', True),
        label('OWN FORM / OTHER NATURE', 10, 273, 108, 2.5),
    ])


def bird():
    left = [(131,151),(111,124),(77,105),(22,95),(38,119),(86,145),(118,159)]
    right = [(133,151),(159,119),(199,98),(241,87),(229,115),(178,148),(148,161)]
    body = [(121,147),(133,142),(146,151),(148,167),(136,180),(129,205),(124,184),(126,166)]
    def mask(x, y):
        return any(art.inside(x, y, polygon) for polygon in [left, right, body]) or (x-148)**2 + (y-146)**2 < 58
    return ''.join([
        art.lettering('FREE', 10, 9, 148, 32, CREAM),
        art.lettering('frequency.', 15, 51, 202, 23, '#ec987b', 'serif', True),
        art.glyph_field(mask, 15, 84, 230, 126, 56, 32, [CYAN, CREAM, '#ec987b']),
        line('M152 144 170 148 152 150', CYAN, .9),
        line('M24 180Q58 191 98 178M19 187Q55 199 94 185', '#ec987b', .6),
        label('AFTERIMAGE / IN FLIGHT / OF-07', 10, 234, 142, 3.1, CREAM),
        label('OWN FORM / OTHER NATURE', 10, 250, 103, 2.5, CYAN),
    ])


def islands():
    colors = [CYAN, '#aba0e0', '#efb5a7', CREAM]
    shapes = []
    for cx, cy, rx, ry in [(133,128,75,45),(211,187,25,16),(59,193,30,18)]:
        for index in range(24):
            shapes.append(line(polar(cx,cy,rx,ry,1-index*.037), colors[index%4], .8))
    for index in range(8):
        y = 87 + index * 17
        shapes.append(line(f'M242 {y}h{8-index%3*2}', colors[index%4], 1))
    return ''.join([
        art.lettering('REFRACT', 10, 10, 250, 29, CREAM),
        label('ISLES / NO FIXED COORDINATES / OF-08', 10, 48, 170, 3.2, CYAN),
        ''.join(shapes),
        art.lettering('ELSEWHERE.', 10, 239, 249, 23, '#efb5a7'),
        label('OWN FORM / OTHER NATURE', 10, 273, 108, 2.5, CREAM),
    ])


def horizon():
    paths = []
    for level in range(22):
        points = []
        for index in range(81):
            x = 12 + index * 3.2
            mountain = 35 * math.exp(-((x-100)/35)**2) + 49 * math.exp(-((x-170)/30)**2) + 22*math.exp(-((x-232)/23)**2)
            y = 111 + level * .9 - mountain * (1 - level * .023) + 1.4*math.sin(x*.11+level*.22)
            points.append(f'{x:.2f} {y:.2f}')
        paths.append(line('M' + ' L'.join(points), INK, .55))
    return ''.join([
        label('ARCHIVE / OPEN HORIZON / OF-09', 10, 8, 137),
        f'<circle cx="229" cy="45" r="10" fill="#b26f58"/>',
        ''.join(paths),
        art.lettering('OUTSIDE', 10, 145, 135, 18, INK),
        art.lettering('the noise.', 160, 149, 109, 13, '#b26f58', 'serif', True),
        label('OWN FORM / OTHER NATURE', 10, 174, 102, 2.4),
    ])


def micro():
    return ''.join([
        label('OWN FORM / OF-10', 5, 5, 44, 2.5),
        ''.join(line(polar(40,35,26,14,1-index*.1), INK,.65) for index in range(9)),
        line('M8 57Q21 53 33 57T59 57T73 57', INK,.6),
        art.lettering('ELSEWHERE.', 5, 66, 69, 5.8, INK),
    ])


def front():
    return ''.join([
        art.lettering('[ / ]', 4, 6, 30, 8, CREAM, 'regular'),
        label('OWN FORM', 4, 22, 34, 3, CREAM),
        ''.join(line(polar(60,16,13,8,1-index*.16), CYAN,.55) for index in range(5)),
    ])


def write_specs(folder, specs, group):
    target = ROOT / 'assets' / folder / 'other-nature'
    target.mkdir(parents=True, exist_ok=True)
    manifest = []
    for key,width,height,title,body,background in specs:
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}mm" height="{height}mm" viewBox="0 0 {width} {height}"><title>{escape(title)}</title><desc>Original OWN FORM OTHER NATURE artwork. Outlined type, transparent background, physical sample and supplier proof required.</desc><g id="{group}">{body}</g></svg>'
        (target / f'{key}.svg').write_text(svg+'\n',encoding='utf-8')
        manifest.append(dict(id=key,widthMm=width,heightMm=height,previewBackground=background,rasterDpi=300,status='supplier-proof-required'))
    (target / 'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')


def main():
    specs = [
        ('signal-bloom',260,280,'SIGNAL / Bloom',bloom(),'#202b32'),
        ('root-system',260,280,'ARCHIVE / Root System',tree(),'#eee7d9'),
        ('free-frequency',260,260,'AFTERIMAGE / Free Frequency',bird(),'#233640'),
        ('refract-isles',280,280,'REFRACT / Isles',islands(),'#202b32'),
        ('open-horizon',280,180,'ARCHIVE / Open Horizon',horizon(),'#f5f1e8'),
        ('little-elsewhere',80,80,'Elsewhere / Micro island',micro(),'#d8dfac'),
        ('refract-micro-front',80,35,'REFRACT / Micro front',front(),'#202b32'),
    ]
    write_specs('prints',specs,'print-art')
    trims = []
    for ink_name, ink, background in [('charcoal',INK,CREAM),('ivory',CREAM,INK)]:
        for size in ['S','M','L','XL']:
            body = art.lettering('OWN',4,4,29,7,ink) + art.lettering('FORM',4,14,35,8,ink) + art.lettering(size,47,14,8,8,ink) + label('OTHER NATURE / VOL. 02',4,28,44,2.2,ink)
            trims.append((f'neck-{size.lower()}-{ink_name}',60,35,f'OTHER NATURE interior / {size}',body,background))
    for code, phrase in [('05','STILL BECOMING.'),('06','ROOTED. NOT FIXED.'),('07','FREE FREQUENCY.'),('08','ELSEWHERE.'),('09','OUTSIDE THE NOISE.'),('10','LITTLE ELSEWHERE.')]:
        body = label('OTHER NATURE',7,15,41,3.8) + ''.join(line(polar(28,43,16,10,1-i*.12),INK,.45) for i in range(8)) + label(phrase,7,65,41,3) + label(f'DESIGN / OF-{code}',7,75,32,2.5) + label('WEAR YOUR OWN POINT OF VIEW.',7,82,41,1.6)
        trims.append((f'hangtag-back-{code}',55,90,f'Kraft reverse / OF-{code}',body,'#b58b60'))
    write_specs('trims',trims,'trim-art')
    print('Built 7 print artworks and 14 coordinated finishing templates for OTHER NATURE.')


if __name__ == '__main__': main()
