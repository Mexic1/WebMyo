#!/usr/bin/env python3
"""Turn the Samsung phone feed into the shape the phone page already reads.

A phone page is built per CONDITION: one product per condition, each
holding colour and capacity variants, the way the graded iPhones are
modelled. WooCommerce models condition as a third variation axis
instead, so this splits each parent on that axis.

Reads  storage/app/import/store-api/p-telefoane.json
Writes storage/app/import/phones.json

Offline and re-runnable.
"""
import html, json, re, sys
from collections import defaultdict
from pathlib import Path

RAW = Path('storage/app/import/store-api/p-telefoane.json')
OUT = Path('storage/app/import/phones.json')

# The one condition ladder, best first. Everything the catalog says has
# to land on one of these five.
LADDER = [
    ('Sigilat', 5),
    ('Openbox', 4),
    ('Ca nou', 3),
    ('Excelent', 2),
    ('Bun', 1),
]
STEP = dict(LADDER)

CONDITION = {
    'sigilat': 'Sigilat',
    'openbox': 'Openbox',
    # "Resealed" is the opened box by another name.
    'resigilat': 'Openbox',
    'ca-nou': 'Ca nou',
    'excelent': 'Excelent',
    'bun': 'Bun',
    # NOT one of the five. Mapped DOWN, never up: describing a unit as
    # better than the catalog says is the one error with a cost.
    # Flagged on import — the client should retag these.
    'foarte-bun': 'Bun',
}

AXIS = {'stare': 'condition', 'condiție': 'condition', 'conditie': 'condition',
        'culoare': 'colour', 'memoria interna': 'storage', 'memorie ram': 'ram'}


def clean(s: str) -> str:
    return re.sub(r'\s+', ' ', html.unescape(s or '')).strip()


def main() -> int:
    rows = json.loads(RAW.read_text())
    by_id = {r['id']: r for r in rows}
    parents = [r for r in rows
               if r['type'] != 'variation' and not clean(r['name']).startswith('Apple')]

    products, images, remapped, skipped = [], {}, [], []

    for parent in parents:
        variations = parent.get('variations') or []
        if not variations:
            # A bundle, not a configurable phone.
            skipped.append(clean(parent['name']))
            continue

        # Slug -> label for every term the parent declares.
        labels = {}
        for attribute in parent.get('attributes') or []:
            for term in attribute.get('terms') or []:
                labels[term['slug']] = clean(term['name'])

        groups = defaultdict(list)

        for declared in variations:
            row = by_id.get(declared['id'])
            if row is None:
                continue  # hidden variation; its price is unknown

            picked = {}
            for attribute in declared['attributes']:
                axis = AXIS.get(attribute['name'].strip().lower())
                if axis:
                    picked[axis] = attribute['value']

            raw_condition = picked.get('condition')
            condition = CONDITION.get(raw_condition or '', 'Openbox')
            if raw_condition and CONDITION.get(raw_condition) and raw_condition not in (
                'sigilat', 'openbox', 'ca-nou', 'excelent', 'bun'
            ):
                remapped.append((clean(parent['name']), raw_condition, condition))

            prices = row.get('prices') or {}
            price = int(prices.get('price') or 0) or None
            image = (row.get('images') or [{}])[0].get('src')
            colour_slug = picked.get('colour')

            if image:
                # Some models vary only by capacity. They still have a
                # photograph; it is keyed with an empty colour, which is
                # exactly what Catalog::colourImages() looks up when a
                # variant has no colour.
                images[f"{parent['slug']}|{colour_slug or ''}"] = image

            groups[condition].append({
                'colour': labels.get(colour_slug or '', colour_slug),
                'colourSlug': colour_slug,
                'storage': labels.get(picked.get('storage') or '', picked.get('storage')),
                'ram': labels.get(picked.get('ram') or '', picked.get('ram')),
                'price': price,
                'inStock': bool(row.get('is_in_stock')),
                'sku': row.get('sku') or None,
                'image': image,
            })

        for condition, variants in groups.items():
            # One entry per colour+capacity. Where RAM also varies the
            # cheapest in-stock wins, since RAM is not a selectable axis
            # on this page.
            best = {}
            for v in variants:
                key = (v['colourSlug'], v['storage'])
                current = best.get(key)
                if current is None or (v['inStock'], -(v['price'] or 10**9)) > (
                    current['inStock'], -(current['price'] or 10**9)
                ):
                    best[key] = v

            kept = list(best.values())
            prices = [v['price'] for v in kept if v['price']]

            products.append({
                'slug': f"{parent['slug']}-{condition.lower().replace(' ', '-')}",
                'baseSlug': parent['slug'],
                'name': clean(parent['name']),
                'grade': condition,
                'gradeStep': STEP[condition],
                'priceFrom': min(prices) if prices else None,
                'priceTo': max(prices) if prices else None,
                'variants': kept,
            })

    products.sort(key=lambda p: (p['name'], -p['gradeStep']))
    OUT.write_text(json.dumps(
        {'products': products, 'images': images}, ensure_ascii=False, indent=2))

    print(f'{len(products)} phone products from {len(parents)} feed parents')
    print(f'{sum(len(p["variants"]) for p in products)} variants, '
          f'{len(images)} colour images')
    if skipped:
        print(f'\nskipped (no variations, not configurable phones):')
        for name in skipped:
            print(f'  - {name[:66]}')
    if remapped:
        print(f'\nREMAPPED onto the ladder — confirm with the client:')
        for name, was, now in sorted(set(remapped)):
            print(f'  - {name[:48]:<50} "{was}" -> "{now}"')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
