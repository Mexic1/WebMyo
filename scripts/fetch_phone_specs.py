#!/usr/bin/env python3
"""Manufacturer specifications for the imported phones, from GSMArena.

These are the maker's published figures for a MODEL — screen, chipset,
cameras, battery. They are not claims about the individual unit, so
unlike condition or battery health they carry no substantiation risk.

GSMArena's search sits behind a Cloudflare challenge, so models are
matched against the brand index instead of guessed from a URL pattern.
A model that cannot be matched is reported, never approximated.

Writes storage/app/import/phone-specs.json. Throttled and resumable.
"""
import html, json, re, sys, time, urllib.error, urllib.request
from pathlib import Path

SRC = Path('storage/app/import/phones.json')
OUT = Path('storage/app/import/phone-specs.json')
BASE = 'https://www.gsmarena.com/'
INDEX_PAGES = 8          # newest ~400 models; everything imported is recent
DELAY = 3.0              # GSMArena is strict; do not lower this
UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/131.0 Safari/537.36')

SPEC_FIELDS = {
    'displaySize': r'data-spec="displaysize-hl">([^<]+)',
    'displayRes': r'data-spec="displayres-hl">([^<]+)',
    'displayType': r'data-spec="displaytype">(.*?)</td>',
    'chipset': r'data-spec="chipset-hl">([^<]+)',
    'cameraMain': r'data-spec="cam1modules">(.*?)</td>',
    'cameraFront': r'data-spec="cam2modules">(.*?)</td>',
    'battery': r'data-spec="batsize-hl">([^<]+)',
    'ram': r'data-spec="ramsize-hl">([^<]+)',
}


CACHE = Path('storage/app/import/gsmarena-cache')


def strip_tags(value: str) -> str:
    return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', ' ', value))).strip()


def get(url: str) -> str:
    """Fetched once, then served from disk: re-runs cost nothing and
    do not hammer a host that challenges aggressively."""
    CACHE.mkdir(parents=True, exist_ok=True)
    cached = CACHE / (re.sub(r'[^a-z0-9]+', '-', url.lower()).strip('-') + '.html')

    if cached.exists():
        return cached.read_text(encoding='utf-8')

    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read().decode('utf-8', 'replace')
    if 'Turnstile' in body:
        raise RuntimeError('challenged by Cloudflare')

    cached.write_text(body, encoding='utf-8')
    time.sleep(DELAY)
    return body


def norm(name: str) -> str:
    """Compare model names without punctuation or marketing suffixes."""
    name = html.unescape(name).lower()
    name = re.sub(r'\b(5g|4g|dual sim|ds)\b', ' ', name)
    return re.sub(r'[^a-z0-9+]+', '', name)


def build_index() -> dict[str, str]:
    index = {}
    for page in range(1, INDEX_PAGES + 1):
        url = (BASE + 'samsung-phones-9.php' if page == 1
               else f'{BASE}samsung-phones-f-9-0-p{page}.php')
        try:
            body = get(url)
        except (urllib.error.URLError, RuntimeError) as e:
            print(f'  index page {page}: {e}', file=sys.stderr)
            break
        found = re.findall(
            r'<a href="(samsung_[a-z0-9_+\-.]+\.php)">.*?<strong><span>(.*?)</span>',
            body, re.S)
        for href, label in found:
            index.setdefault(norm(re.sub('<[^>]+>', '', label)), BASE + href)
        print(f'  index page {page}: {len(found)} models')
    return index


def model_key(name: str) -> str:
    """"Samsung Galaxy S24 Ultra, Dual SIM, 12GB RAM, 5G" -> galaxys24ultra"""
    head = name.split(',')[0]
    return norm(re.sub(r'^Samsung\s+', '', head))


def main() -> int:
    data = json.loads(SRC.read_text())
    wanted = {}
    for p in data['products']:
        wanted.setdefault(model_key(p['name']), p['name'].split(',')[0].strip())

    print(f'{len(wanted)} distinct models to resolve\n')
    print('building GSMArena index...')
    index = build_index()
    print(f'  {len(index)} models indexed\n')

    specs, unresolved = {}, []

    for key, label in sorted(wanted.items()):
        url = index.get(key)
        if not url:
            unresolved.append(label)
            print(f'  {label}: NOT IN INDEX', file=sys.stderr)
            continue
        try:
            body = get(url)
        except (urllib.error.URLError, RuntimeError) as e:
            unresolved.append(label)
            print(f'  {label}: {e}', file=sys.stderr)
            continue

        raw = {}
        for field, pattern in SPEC_FIELDS.items():
            m = re.search(pattern, body, re.S)
            if m:
                raw[field] = strip_tags(m.group(1))

        # Composed into the same fields the iPhone specs already use, so
        # the page renders both without knowing where they came from.
        size = raw.get('displaySize', '').replace('"', '\u2033')
        res = re.sub(r'\s*pixels.*$', '', raw.get('displayRes', ''))
        res = res.replace('x', ' \u00d7 ')
        panel = (raw.get('displayType', '').split(',')[0] or '').strip()

        found = {
            'display': ', '.join(x for x in [
                ' '.join(x for x in [size, panel] if x), res] if x),
            'chipset': raw.get('chipset', ''),
            'ram': raw.get('ram', ''),
            'cameraMain': re.sub(r'\s*\([^)]*\)', '', raw.get('cameraMain', '')),
            'cameraFront': re.sub(r'\s*\([^)]*\)', '', raw.get('cameraFront', '')),
            'battery': raw.get('battery', ''),
            'gsmarena': url,
        }
        found = {k: v for k, v in found.items() if v}
        specs[key] = found
        print(f'  {label}: {found.get("display","?")} · {found.get("chipset","?")[:30]}')

    OUT.write_text(json.dumps(specs, ensure_ascii=False, indent=2))
    print(f'\n{len(specs)} resolved, {len(unresolved)} unresolved')
    if unresolved:
        print('UNRESOLVED (no specs will be shown for these):')
        for label in unresolved:
            print(f'  - {label}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
