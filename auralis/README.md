# AURALIS Studio 2.0 · Web / PWA

Versión web del AURALIS Studio 2.0 original, para GitHub Pages.

- Sin servidor ni registro; Web Audio API.
- 28 muestras WAV PCM 24-bit / 48 kHz sintetizadas en el proyecto, descargables localmente.
- Afrobeats / House / EDM, 8 canales y 16 pasos, 4 escenas.
- Sintetizador polifónico, DJ FX, exportación WAV, MIDI y JSON.
- Interfaz responsive, instalable como PWA cuando el navegador lo permite.
- Funciona sin conexión tras la primera carga completa y cuando el service worker cachea los sonidos; algunos navegadores restringen caché offline.
- Audio se inicia tras interacción del usuario.

## Limitaciones

No es DAW profesional comparable a Ableton/Logic, no incluye instrumentos grabados, VST ni automatización de stems completa; el rendimiento y la exportación dependen del dispositivo. Los navegadores móviles pueden suspender audio al cambiar de pestaña.

## Desarrollo

Sirve el directorio por HTTP: `python -m http.server 8000` y abre `http://localhost:8000`.

Fuente: adaptación del código Android 2.0 en ZIP entregado en la conversación, sin bibliotecas de terceros.


## 3.0 — Stereo Sound Lab
- 8 mezclas independientes: panorámica, filtro high-pass, tono low-pass, fader, muestras alternativas.
- 28 archivos PCM WAV de 24-bit / 48 kHz + 18 sonidos alternativos generados localmente a 32-bit flotante dentro del navegador, incluidos en el render final de 24 bits.
- Ancho estéreo 0% mono / 100% natural / 150% ampliado. Control L/R de peak por muestra, no LUFS.
- Echo estéreo Clean, Tape (wobble), Dub (filtrado) y Ping Pong, divisiones de tempo y feedback.
- Humanización reproducible por step/bar y conducción de voces entre acordes. Reproducible también en MIDI.
- 12 patches de osciladores/ FM, no muestreo multisample ni VST.
- Los proyectos v2 se conservan y siguen siendo importables. No es una DAW multipista comercial.
- Calidad final depende de control acústico, monitorización y mezcla; WAV 24-bit no implica mastering profesional.
