"""Rebuild ARCHIVO's vector signatures from its local OFL fonts.

Development utility: Python + fontTools. No runtime or CI dependency.
"""
import json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'identities'

def path(d, opacity=1):
    return f'<path d="{d}"' + (f' opacity="{opacity}"' if opacity != 1 else '') + '/>'

# Authored filled geometry. Recessed planes belong to each form, not a drop shadow.
MARKS = {
 'salitre': path('M14 21 63 8 82 20 38 32 65 40 65 57 20 70 5 58 49 46 14 37Z') + path('M20 70 65 57 65 40 82 29 82 70 35 85 20 76Z', .48) + path('M38 32 82 20 82 29 55 37Z', .7),
 'alto': path('M9 72 36 13 60 7 84 66 65 72 48 27 29 78Z') + path('M36 13 48 27 29 78 9 72Z', .58) + path('M37 55 60 48 65 60 32 70Z') + path('M60 7 87 19 94 67 84 66Z', .35),
 'limen': path('M12 17 33 9 33 61 74 47 74 69 12 89Z') + path('M33 9 47 20 47 51 33 56Z', .45) + path('M45 16 83 28 83 81 63 88 63 46 45 40Z') + path('M33 61 74 47 83 54 42 69Z', .6),
 'brava': path('M48 8C69 5 84 16 81 33L56 49 48 31 30 36C27 22 35 12 48 8Z') + path('M81 33C93 52 87 72 71 78L45 65 56 49 48 31Z', .66) + path('M71 78C51 94 30 90 24 72L30 36 48 42 45 65Z') + path('M24 72C5 63 5 44 18 32L30 36 28 56 45 65Z', .43),
 'solar': path('M13 13H68V29H31V43H57V59H13Z') + path('M83 83H28V67H65V53H39V37H83Z') + path('M13 13 25 5H80L68 13Z', .45) + path('M83 83 91 71V25L83 37Z', .45),
 'marea': path('M8 60C8 28 24 12 43 20 53 24 57 38 57 53V68L42 73V51C42 38 36 31 30 35S23 49 23 65Z') + path('M39 42C39 17 57 4 74 15S91 54 80 73L62 84 56 71C69 65 74 48 70 35S55 32 55 43Z', .65) + path('M8 60 23 65 42 55 42 73 23 83 8 76Z'),
 'orbita': path('M23 18 60 7 84 26 72 67 35 80 11 60Zm12 15L28 56 39 63 59 57 66 33 56 26Z') + path('M35 80 72 67 84 26 91 45 81 82 45 94Z', .45) + path('M23 18 35 33 56 26 60 7Z', .7),
 'umbral': path('M9 27 49 8 75 20 75 68 59 76V30L49 25 25 37V84L9 76Z') + path('M32 43 58 30 87 43V86L71 93V53L58 47 48 52V84L32 91Z') + path('M9 27 25 37 49 25 49 8Z', .55) + path('M58 30 58 47 71 53 87 43Z', .55),
 'neblina': path('M10 73V20L26 12 61 55V13L77 5V77L61 85 26 42V81Z') + path('M26 12 41 20 86 73 77 77 61 55Z', .5) + path('M10 73 26 81 26 42 37 55 37 88 21 95 10 88Z', .4),
 'logic': path('M8 8H47V23H23V47H8Z') + path('M30 30H69V45H45V69H30Z') + path('M52 52H91V91H76V67H52Z') + path('M8 47 19 56 30 56V41L23 35V47Z', .45) + path('M45 69 56 80 76 80V67L65 56V69Z', .45),
}
SPECS = {
 'salitre': dict(name='SALITRE', family='archivo', axes={'wght':540,'wdth':112}, tracking=70, slant=0, lines=[('SALITRE',1)], title='Un horizonte que se pliega.', note='Una S de planos desplazados. La firma se abre entre letras y vuelve a cerrarse en el símbolo.', gesture='Pliegue salino'),
 'alto': dict(name='ALTO SUR', family='archivo', axes={'wght':850,'wdth':78}, tracking=-10, slant=-.08, lines=[('ALTO',1),('SUR',1)], title='El volumen está en el vacío.', note='Una A tallada en perspectiva. Dos niveles de letras compactas sostienen una silueta vertical.', gesture='A tallada'),
 'limen': dict(name='LIMEN', family='archivo', axes={'wght':480,'wdth':114}, tracking=50, slant=0, lines=[('LIMEN',1)], title='Una puerta dentro de otra.', note='Dos eles cruzan sus planos. El intervalo entre las letras es parte de la firma.', gesture='Doble intervalo'),
 'brava': dict(name='ISLA BRAVA', family='fraunces', axes={'wght':720,'opsz':110,'SOFT':65,'WONK':1}, tracking=-15, slant=.13, lines=[('ISLA',.4),('BRAVA',1)], title='Una flor que no se queda quieta.', note='Cuatro pétalos se doblan sin repetir su silueta. La letra suave contrasta con el giro del emblema.', gesture='Corola plegada'),
 'solar': dict(name='SOLAR CLUB', family='fraunces', axes={'wght':850,'opsz':100,'SOFT':20,'WONK':1}, tracking=-20, slant=0, lines=[('SOLAR',1),('CLUB',.58)], title='El club tiene otra cara.', note='Dos recorridos escalonados forman una S y una C. Una firma de curvas densas, sin rayos ni escudos.', gesture='Contracampo'),
 'marea': dict(name='MAREA', family='archivo', axes={'wght':760,'wdth':105}, tracking=-20, slant=.2, lines=[('MAREA',1)], title='Una vuelta que encuentra otra.', note='Dos cintas se enlazan y dejan una M en el aire. La firma inclinada conserva la tensión del recorrido.', gesture='Retorno continuo'),
 'orbita': dict(name='ÓRBITA', family='archivo', axes={'wght':720,'wdth':122}, tracking=25, slant=.12, lines=[('ÓRBITA',1)], title='El eje cambia la mirada.', note='Un anillo facetado revela una cara lateral. La O baja y ancha introduce una trayectoria propia.', gesture='Anillo oblicuo'),
 'umbral': dict(name='UMBRAL', family='archivo', axes={'wght':720,'wdth':93}, tracking=15, slant=0, lines=[('UMBRAL',1)], title='Entras por un lado. Sales por otro.', note='Dos marcos atraviesan un mismo espacio. Letras anchas y uniones tensas conservan el pulso del taller.', gesture='Umbrales cruzados'),
 'neblina': dict(name='NEBLINA', family='fraunces', axes={'wght':480,'opsz':100,'SOFT':90,'WONK':1}, tracking=5, slant=.08, lines=[('NEBLINA',1)], title='Hay formas entre las capas.', note='Una N se teje entre dos planos. El ritmo de la firma asciende apenas, como una capa que se desplaza.', gesture='N entretejida'),
 'logic': dict(name='WE ARE LOGIC', family='archivo', axes={'wght':850,'wdth':70}, tracking=5, slant=0, lines=[('WE ARE',.36),('LOGIC',1)], title='Una regla. Tres desvíos.', note='Tres módulos se encajan con profundidad. La firma combina una cabecera pequeña con un bloque de letras compacto.', gesture='Ensamble lógico'),
}

def signature(key, spec):
    font = instantiateVariableFont(TTFont(ROOT / 'assets/fonts' / f'{spec["family"]}.ttf'), spec['axes'], inplace=True)
    glyphs = font.getGlyphSet(); cmap = font.getBestCmap()
    cap_scale = 720 / font['OS/2'].sCapHeight
    # Explicit geometric glyphs alter the local type rather than merely selecting a face.
    custom = {
      ('alto','A'): 'M0 0 235 720H435L670 0H485L440 160H218L172 0ZM260 315H400L330 570Z',
      ('limen','I'): 'M40 0H122V300H40ZM40 380H122V720H40Z',
      ('limen','E'): 'M0 0H470V78H88V321H400V399H88V642H470V720H0Z',
      ('salitre','T'): 'M0 635H240V0H338V635H580V720H0Z',
      ('salitre','E'): 'M0 0H465V84H98V332H355V416H98V636H465V720H0Z',
      ('marea','M'): 'M0 0V720H155L350 230 545 720H700V0H550V435L395 45H305L150 435V0Z',
      ('umbral','U'): 'M0 720H155V190L240 125H375L460 190V720H615V120L455 0H160L0 120Z',
      ('orbita','Ó'): 'M360 -10C100 -10 0 115 0 330S100 670 360 670 720 545 720 330 620 -10 360 -10ZM360 130C510 130 550 200 550 330S510 530 360 530 170 460 170 330 210 130 360 130ZM330 740H465L550 880H390Z',
    }
    groups=[]; maxwidth=0; baseline=0
    for line, size in spec['lines']:
      x=0; items=[]
      for i, char in enumerate(line):
        if char == ' ': x += 220; continue
        g=glyphs[cmap[ord(char)]]; pen=SVGPathPen(glyphs); g.draw(TransformPen(pen,(cap_scale,0,0,cap_scale,0,0)))
        d=custom.get((key,char), pen.getCommands())
        custom_widths={('alto','A'):690,('limen','I'):190,('limen','E'):510,('orbita','Ó'):750,('salitre','T'):580,('salitre','E'):500,('marea','M'):730,('umbral','U'):650}
        advance = custom_widths.get((key,char),g.width*cap_scale)
        offset= i*5 if key=='neblina' else (18 if key=='limen' and char=='M' else 0)
        items.append(f'<path transform="translate({x} {-offset})" d="{d}"/>')
        x+=advance+spec['tracking']
      # Font coordinates point upwards. Keep every outline as geometry, no SVG text.
      groups.append(f'<g transform="translate(0 {baseline + 900*size}) scale({size} {-size}) skewX({-spec["slant"]*57.2958})">{"".join(items)}</g>')
      maxwidth=max(maxwidth,x*size+150); baseline += 930*size
    height=baseline+70
    return {'body': ''.join(groups), 'width': round(maxwidth), 'height': round(height)}

def svg(body, width, height, name):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" fill="currentColor" fill-rule="evenodd" role="img" aria-label="{name}"><title>{name}</title>{body}</svg>'

def build():
    OUT.mkdir(exist_ok=True)
    data={}
    for key,spec in SPECS.items():
      lettering=signature(key,spec)
      # Comfortable artboard margins keep serifs, accents and obliques intact.
      left_margin=round(70+abs(spec['slant'])*900)
      lettering['body']=f'<g transform="translate({left_margin} 80)">{lettering["body"]}</g>'
      lettering['width']+=left_margin+130; lettering['height']+=160
      data[key] = {k:spec[k] for k in ['name','title','note','gesture']}
      data[key].update(mark=MARKS[key], lettering=lettering)
      mark=svg(MARKS[key],96,96,spec['name'])
      word=svg(lettering['body'],lettering['width'],lettering['height'],spec['name'])
      (OUT/f'{key}-symbol.svg').write_text(mark+'\n',encoding='utf-8',newline='\n')
      (OUT/f'{key}-wordmark.svg').write_text(word+'\n',encoding='utf-8',newline='\n')
      symbolwidth=lettering['height']*.85
      lockup=f'<g transform="translate(0 {lettering["height"]*.075}) scale({symbolwidth/96})">{MARKS[key]}</g><g transform="translate({symbolwidth+100} 0)">{lettering["body"]}</g>'
      (OUT/f'{key}-signature.svg').write_text(svg(lockup,round(lettering['width']+symbolwidth+100),lettering['height'],spec['name'])+'\n',encoding='utf-8',newline='\n')
    payload=json.dumps(data,ensure_ascii=False,separators=(',',':'))
    (ROOT/'identities.js').write_text(f'/* Authored vector identities. Rebuild with scripts/generate-identities.py. */\n(function(root) {{\n  const identities = {payload};\n  if (typeof module !== "undefined" && module.exports) module.exports = identities;\n  root.ARCHIVO_IDENTITIES = identities;\n}})(typeof window !== "undefined" ? window : globalThis);\n',encoding='utf-8',newline='\n')
    (OUT/'provenance.json').write_text(json.dumps({'source':'Original vector geometry authored for ARCHIVO. Letter outlines derived and individually composed from locally hosted OFL Archivo and Fraunces.','generator':'scripts/generate-identities.py','fonts':'../fonts/archivo-OFL.txt; ../fonts/fraunces-OFL.txt','brands':list(SPECS)},ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    print('Built 10 symbols, 10 wordmarks, 10 signatures and browser identity data.')

if __name__=='__main__': build()
