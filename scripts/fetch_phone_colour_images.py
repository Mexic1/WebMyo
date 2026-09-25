#!/usr/bin/env python3
"""One photograph per phone model + colour, the way the iPhone set works.

Reads the image map from storage/app/import/phones.json and writes
public/products/telefoane/<model-slug>-<colour-slug>.webp plus the
-600.webp thumbnail the grids use.

White ground, subject centred: the page composites product photography
with mix-blend-mode: multiply, so anything other than pure white shows
as a visible rectangle. Throttled and resumable.
"""
import json, subprocess, sys, time, urllib.error, urllib.request
from pathlib import Path

from imageprep import prepare

SRC = Path('storage/app/import/phones.json')
OUT = Path('public/products/telefoane')
DELAY = 1.5
UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/131.0 Safari/537.36')



def main() -> int:
    images = json.loads(SRC.read_text())['images']
    OUT.mkdir(parents=True, exist_ok=True)

    todo = []
    for key, url in sorted(images.items()):
        model, colour = key.split('|', 1)
        full = OUT / f'{model}-{colour or "default"}.webp'
        if not full.exists():
            todo.append((url, full))

    print(f'{len(todo)} to fetch, {len(images) - len(todo)} already on disk\n')
    ok = failed = 0

    for i, (url, full) in enumerate(todo, 1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=30) as resp:
                raw = resp.read()
            prepare(raw, full, 1200)
            prepare(raw, full.with_name(full.stem + '-600.webp'), 600)
            ok += 1
            print(f'  [{i}/{len(todo)}] {full.name}')
        except (urllib.error.URLError, subprocess.CalledProcessError, OSError) as e:
            failed += 1
            print(f'  [{i}/{len(todo)}] FAILED {full.name}: {e}', file=sys.stderr)
            if isinstance(e, urllib.error.HTTPError) and e.code in (403, 429):
                print('\nhost is refusing requests — stopping', file=sys.stderr)
                break
        time.sleep(DELAY)

    print(f'\n{ok} fetched, {failed} failed')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
