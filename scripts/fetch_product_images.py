#!/usr/bin/env python3
"""Download one product photograph per imported product.

Reads storage/app/import/normalised.json, writes
public/products/<category>/<slug>-500.webp at the same 500x400 white-
ground size the accessory imagery already uses. Framing is handled by
scripts/imageprep.py, which trims the ground so the subject fills the
canvas — see public/products/README.md.

Deliberately slow. The host began refusing connections during an
earlier bulk image pull, so requests are spaced and the run is
resumable: an image already on disk is skipped, so re-running after an
interruption only fetches what is missing.
"""
import json, subprocess, sys, time, urllib.error, urllib.request
from pathlib import Path

from imageprep import prepare

SRC = Path('storage/app/import/normalised.json')
OUT = Path('public/products')
DELAY = 1.5          # seconds between requests
UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/131.0 Safari/537.36')



def main() -> int:
    data = json.loads(SRC.read_text())
    todo, skipped = [], 0

    for category, rows in data.items():
        for r in rows:
            dest = OUT / category / f"{r['slug']}-500.webp"
            if dest.exists():
                skipped += 1
            elif r['images']:
                todo.append((r['images'][0], dest, r['name']))

    print(f'{len(todo)} to fetch, {skipped} already on disk\n')
    ok = failed = 0

    for i, (url, dest, name) in enumerate(todo, 1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=30) as resp:
                prepare(resp.read(), dest, (500, 400))
            ok += 1
            print(f'  [{i}/{len(todo)}] {dest.name}')
        except (urllib.error.URLError, subprocess.CalledProcessError, OSError) as e:
            failed += 1
            print(f'  [{i}/{len(todo)}] FAILED {name[:40]}: {e}', file=sys.stderr)
            # A refusal means the host is pushing back; stop rather than
            # hammer it and lose access for every other task.
            if isinstance(e, urllib.error.HTTPError) and e.code in (403, 429):
                print('\nhost is refusing requests — stopping', file=sys.stderr)
                break
        time.sleep(DELAY)

    print(f'\n{ok} fetched, {failed} failed')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
