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
