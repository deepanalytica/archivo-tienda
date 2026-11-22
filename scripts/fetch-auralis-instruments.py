#!/usr/bin/env python3
"""Fetch pinned CC0 Meta Open Sound OGG previews into the Pages build.
The browser then loads these local assets; it never streams from Meta at runtime.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import hashlib, json, urllib.request

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "auralis" / "instrument-manifest.json"
manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
jobs = []
for instrument in manifest["instruments"].values():
    samples = instrument.get("samples", [])
    for zone in instrument.get("strings", []):
        samples += zone.get("samples", [])
    for sample in samples:
        jobs.append((instrument, sample))

def fetch(job):
    instrument, sample = job
    target = ROOT / "auralis" / sample["file"]
    if target.exists() and target.stat().st_size > 1024:
        with target.open("rb") as f:
            if f.read(4) == b"OggS":
                return ("cached", sample["file"], target.stat().st_size)
    url = ("https://raw.githubusercontent.com/facebookincubator/Meta-open-sound/"
           + instrument["sourceTag"] + "/" + instrument["sourcePath"] + "/"
           + sample["sourceFile"].replace(".wav", ".ogg"))
    request = urllib.request.Request(url, headers={"User-Agent": "AURALIS-Studio-Build/4.0"})
    with urllib.request.urlopen(request, timeout=45) as response:
        data = response.read()
    if not data.startswith(b"OggS") or len(data) < 1024:
        raise RuntimeError("Invalid OGG payload: " + url)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    return ("downloaded", sample["file"], len(data), hashlib.sha256(data).hexdigest())

results, errors = [], []
with ThreadPoolExecutor(max_workers=8) as pool:
    futures = [pool.submit(fetch, job) for job in jobs]
    for future in as_completed(futures):
        try:
            results.append(future.result())
        except Exception as exc:
            errors.append(str(exc))
if errors:
    raise SystemExit("AURALIS instrument library incomplete: " + " | ".join(errors[:8]))
print("AURALIS CC0 instrument library ready:", len(results), "samples;",
      sum(1 for r in results if r[0] == "downloaded"), "downloaded;",
      sum(r[2] for r in results) // (1024 * 1024), "MiB")
