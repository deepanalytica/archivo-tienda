# AURALIS Studio 4 · Live Music Workstation

AURALIS is a mobile-first music workstation for Afrobeats, House and EDM. It combines an offline Web Audio engine, original drum kits, sampled instruments, chord pads, a tempo-synchronised arpeggiator, a 16-step lead sequencer, DJ performance effects and WAV/MIDI export.

## New in 4.0
- **Recorded instrument library:** Meta Upright Piano, Meta Nylon Guitar and Meta Steel Guitar. 172 curated multisamples, with velocity layers and string zones.
- **Synthesizer expansion:** seven-voice stereo supersaw, resonant acid bass/lead and deep sine/triangle sub patch, alongside the existing keys, pads, bells and plucks.
- **Live performance:** 8 chord pads, 8 drum pads, touch keyboard, scene launch, tap tempo, arpeggiator (up/down/up-down/random), octave range, gate and 16-step melodic sequence.
- **Independent layers:** drums, chords, bass, arpeggiator and lead.
- **Mix intelligence:** sample-peak-based gain staging, role-based corrective EQ, soft compression on each drum channel and each musical bus, plus a fast master peak limiter. Manual faders remain under the user's control.
- **DJ rack:** tempo-aware filter, echo send, reverb, master fader, echo-out, filter sweep, beat roll, riser, impact and brake.
- **Progressive offline library:** samples are loaded on demand and cached by the service worker. “Preparar biblioteca” downloads all 172 OGG previews for offline sessions.

## Audio and sample provenance
The Meta Open Sound instrument source recordings are 48 kHz / 24-bit WAV under CC0 1.0. The browser app uses the source collection's mono OGG Vorbis web previews to keep the mobile footprint manageable. The Pages build downloads the pinned CC0 files into the static site; playback never streams from the third-party repository. See [SAMPLE-LICENSES.md](SAMPLE-LICENSES.md).

## Run locally
From this folder, serve the site over HTTP (required for AudioContext, service worker and sample fetches):
`python -m http.server 8000`
Then open `http://localhost:8000`.

## Honest technical limits
This is a browser-based performance workstation, not yet a full commercial DAW. It does not host VST/AU plugins, multitrack audio recording or the original 24-bit WAV masters in the browser. OGG instrument previews are decoded to browser AudioBuffers; the final export engine renders stereo WAV 48 kHz / 24-bit. Auto-mix is a local rules-based gain/EQ assistant, not an AI mastering service. A limiter reduces peaks but does not replace monitoring, arrangement and mastering by an audio engineer.
