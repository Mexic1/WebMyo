#!/usr/bin/env python3
"""Turn WooCommerce Store API payloads into the flat rows the app reads.

Input  : storage/app/import/store-api/p-<category>.json  (raw API responses)
Output : storage/app/import/normalised.json

Run after re-fetching. The raw files are the source of truth; nothing
here talks to the network, so it is safe to re-run.
"""
import html, json, re, sys
from pathlib import Path

RAW = Path('storage/app/import/store-api')
OUT = Path('storage/app/import/normalised.json')

# Attribute taxonomy -> the facet key the category page filters on.
FACETS = {
    'pa_brand': 'producator',
    'pa_culoare': 'culoare',
    # Two different axes, kept apart on purpose. `pa_stare` is always
    # packaging — Sigilat / Resigilat / Openbox. `pa_conditie` is a
    # condition grade in MYO's own vocabulary. Merging them would let a
    # sealed unit read as a graded one.
    'pa_stare': 'ambalaj',
    'pa_conditie': 'nota',
    'pa_sloturi-sim': 'sloturi',
    'pa_memoria-interna': 'memorie',
    'pa_memorie-ram': 'ram',
    'pa_diagonala-display': 'diagonala',
    'pa_sistem-de-operare': 'sistem',
    'pa_conectivitate': 'conectivitate',
    'pa_tip-sim': 'sim',
    'pa_autonomie': 'autonomie',
    'pa_dimensiune-carcasa': 'carcasa',
    'pa_dimensiune-ecran-inch': 'ecran',
    'pa_tip-procesor': 'procesor',
    'pa_producator-procesor': 'producator-procesor',
    'pa_chipset-video': 'video',
    'pa_tip-placa-video': 'placa-video',
    'pa_tehnologie': 'tehnologie',
}


def clean(s: str) -> str:
    """WooCommerce ships curly quotes and inch marks as HTML entities."""
    return re.sub(r'\s+', ' ', html.unescape(s or '')).strip()


def band(price: int) -> str:
    return ('Sub 1.000 lei' if price < 1000
            else '1.000 – 2.499 lei' if price < 2500
            else '2.500 – 4.999 lei' if price < 5000
            else '5.000 lei și peste')


def phone_model(name: str) -> str:
    """The model a shopper would name, out of a full product title.

    "Samsung Galaxy S24 Ultra, Dual SIM, 12GB RAM, 5G" -> "Galaxy S24
    Ultra". The manufacturer is its own facet and everything after the
    first comma is specification, not identity.
    """
    without_brand = re.sub(r'^(Samsung|Apple)\s+', '', name).strip()
    return without_brand.split(',')[0].strip()


def row(p: dict, category: str = '') -> dict:
    prices = p.get('prices') or {}
    rng = prices.get('price_range') or {}
    low = int(rng.get('min_amount') or prices.get('price') or 0)
    high = int(rng.get('max_amount') or prices.get('price') or 0)
    regular = int(prices.get('regular_price') or 0)

    # A zero price is not a price. It means the product is unconfigured
    # or has no purchasable variation; showing "0 lei" would be a lie,
    # so it becomes null and the card renders a dash.
    if low == 0:
        low = high = None

    attributes = {}
    for a in p.get('attributes') or []:
        key = FACETS.get(a.get('taxonomy') or '')
        terms = [clean(t['name']) for t in (a.get('terms') or [])]
        if key and terms:
            attributes[key] = terms

    # Phones are shopped by model, which no attribute carries.
    if category == 'telefoane':
        attributes['model'] = [phone_model(clean(p['name']))]

    # Price is a facet like any other, so it is counted from the rows.
    if low is not None:
        attributes['pret'] = [band(low)]

    images = [i['src'] for i in (p.get('images') or []) if i.get('src')]

    return {
        'id': p['id'],
        'slug': p['slug'],
        'name': clean(p['name']),
        'permalink': p.get('permalink'),
        'sku': p.get('sku') or None,
        'type': p['type'],
        'price': low,
        'priceMax': high if (high is not None and high != low) else None,
        # Only a genuine strike-through price, not a regular == sale echo.
        'wasPrice': regular if (low is not None and regular > low) else None,
        'inStock': bool(p.get('is_in_stock')),
        'attributes': attributes,
        'images': images,
        'variations': len(p.get('variations') or []),
    }


def main() -> int:
    if not RAW.is_dir():
        print(f'missing {RAW} — fetch first', file=sys.stderr)
        return 1

    out, report, orphaned = {}, [], []
    for f in sorted(RAW.glob('p-*.json')):
        slug = f.stem[2:]
        products = json.loads(f.read_text())

        # Graded iPhones are already held, with real variant data and
        # colour photography the feed does not carry. Re-importing them
        # would duplicate every one under a second slug — and their
        # parents are deliberately absent here, so they are dropped
        # before the orphan check rather than tripping it.
        skipped_apple = 0
        if slug == 'telefoane':
            before = len(products)
            products = [p for p in products if not clean(p['name']).startswith('Apple')]
            skipped_apple = before - len(products)

        parents = [p for p in products if p['type'] != 'variation']
        variations = [p for p in products if p['type'] == 'variation']

        # A variation row duplicates a parent that is already in the
        # feed, and the parent carries the full price range — so
        # dropping it loses nothing. That is only true while the parent
        # IS in the feed. A variation whose parent was filtered out
        # upstream (draft, private, hidden from the catalog) is the only
        # row for a purchasable product, and dropping it silently would
        # lose stock. Fail loudly instead of guessing.
        present = {p['id'] for p in parents}
        orphans = [v for v in variations if v.get('parent') not in present]
        if orphans:
            orphaned.append((slug, orphans))

        rows = sorted((row(p, slug) for p in parents), key=lambda r: r['name'])
        out[slug] = rows
        note = f'{len(variations)} variation rows dropped, all parents present'
        if skipped_apple:
            note += f'; {skipped_apple} Apple rows skipped (held separately)'
        report.append(f'{slug:<12} {len(rows):>3} products ({note})')

    if orphaned:
        print('ORPHANED VARIATIONS — these have no parent in the feed and\n'
              'would be lost. Re-fetch the category, or import them as\n'
              'products in their own right. Nothing was written.\n',
              file=sys.stderr)
        for slug, rows in orphaned:
            for v in rows:
                print(f'  {slug}: id={v["id"]} parent={v.get("parent")} '
                      f'{v.get("name", "")[:60]}', file=sys.stderr)
        return 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2))
    print('\n'.join(report))
    print(f'\n-> {OUT} ({OUT.stat().st_size // 1024} KB)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
