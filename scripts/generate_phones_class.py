#!/usr/bin/env python3
"""Emit app/Data/Phones.php from the extracted variants and specs.

    storage/app/import/phones.json       (extract_phone_variants.py)
    storage/app/import/phone-specs.json  (fetch_phone_specs.py)
        -> app/Data/Phones.php

Offline and idempotent. Thumb/image paths are written only for files
actually on disk, so re-running after an image pass fills them in.
"""
import json, re, subprocess
from pathlib import Path

PHONES = Path('storage/app/import/phones.json')
SPECS = Path('storage/app/import/phone-specs.json')
IMAGES = Path('public/products/telefoane')
DEST = Path('app/Data/Phones.php')


def php(value, indent=0) -> str:
    pad = ' ' * indent
    if value is None:
        return 'null'
    if value is True:
        return 'true'
    if value is False:
        return 'false'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        if not value:
            return '[]'
        inner = ',\n'.join(pad + '    ' + php(v, indent + 4) for v in value)
        return '[\n' + inner + ',\n' + pad + ']'
    if isinstance(value, dict):
        if not value:
            return '[]'
        inner = ',\n'.join(
            f"{pad}    {php(k)} => {php(v, indent + 4)}" for k, v in value.items())
        return '[\n' + inner + ',\n' + pad + ']'
    return "'" + str(value).replace('\\', '\\\\').replace("'", "\\'") + "'"


def model_key(name: str) -> str:
    head = name.split(',')[0]
    head = re.sub(r'^Samsung\s+', '', head).lower()
    head = re.sub(r'\b(5g|4g|dual sim|ds)\b', ' ', head)
    return re.sub(r'[^a-z0-9+]+', '', head)


def main() -> int:
    data = json.loads(PHONES.read_text())
    specs_by_model = json.loads(SPECS.read_text())

    products, images = [], {}

    for p in data['products']:
        base = p['baseSlug']
        variants = []
        for v in p['variants']:
            image = None
            candidate = IMAGES / f"{base}-{v['colourSlug'] or 'default'}.webp"
            if candidate.exists():
                image = f"/products/telefoane/{candidate.name}"
                images[f"{base}|{v['colourSlug'] or ''}"] = image
            variants.append({
                'colour': v['colour'], 'colourSlug': v['colourSlug'],
                'storage': v['storage'], 'price': v['price'],
                'inStock': v['inStock'], 'sku': v['sku'],
            })
            v['_image'] = image

        first = next((v['_image'] for v in p['variants'] if v.get('_image')), None)

        products.append({
            'slug': p['slug'], 'name': p['name'], 'grade': p['grade'],
            'gradeStep': p['gradeStep'], 'priceFrom': p['priceFrom'],
            'priceTo': p['priceTo'],
            # The feed publishes neither, and they are not worth guessing.
            'dimensions': None, 'weightKg': None,
            'image': first,
            'thumb': re.sub(r'\.webp$', '-600.webp', first) if first else None,
            'variants': variants,
        })

    specs = {}
    for p in data['products']:
        key = model_key(p['name'])
        if key in specs_by_model:
            specs[p['baseSlug']] = specs_by_model[key]

    DEST.write_text(f'''<?php

namespace App\\Data;

/**
 * Samsung phones — {len(products)} products from {len({p['baseSlug'] for p in data['products']})} models, imported from the
 * client's own WooCommerce Store API on 2026-09-25, with manufacturer
 * specifications from GSMArena. Generated file: edit the importers.
 *
 *     scripts/extract_phone_variants.py
 *     scripts/fetch_phone_specs.py
 *     scripts/fetch_phone_colour_images.py
 *     scripts/generate_phones_class.py
 *
 * Shaped exactly like the graded iPhones in `Catalog::products()`, so
 * both flow through one product page: ONE PRODUCT PER CONDITION, each
 * holding its colour and capacity variants. WooCommerce models
 * condition as a third variation axis instead; the importer splits it.
 *
 * The condition ladder is one scale of five, best first: Sigilat,
 * Openbox, Ca nou, Excelent, Bun. Anything the catalog said that is not
 * one of those was mapped DOWN, never up, and reported at import.
 *
 * Specifications are the MANUFACTURER's figures for a model, not claims
 * about the individual unit — unlike condition or battery health, they
 * carry no substantiation risk.
 */
class Phones
{{
    /** @return list<array<string, mixed>> */
    public static function all(): array
    {{
        static $rows = null;

        return $rows ??= {php(products, 8)};
    }}

    /**
     * Model + colour to photograph, keyed the way
     * `Catalog::colourImages()` is so the two merge.
     *
     * @return array<string, string>
     */
    public static function colourImages(): array
    {{
        return {php(images, 8)};
    }}

    /**
     * Manufacturer specifications, keyed by model slug (the product
     * slug without its condition suffix).
     *
     * @return array<string, array<string, string>>
     */
    public static function specs(): array
    {{
        return {php(specs, 8)};
    }}
}}
''')

    try:
        subprocess.run(['php', '-l', str(DEST)], check=True, capture_output=True)
        note = 'syntax OK'
    except (FileNotFoundError, subprocess.CalledProcessError):
        note = 'not linted (no local php)'

    print(f'{DEST}  {DEST.stat().st_size // 1024} KB  {note}')
    print(f'{len(products)} products, {sum(len(p["variants"]) for p in products)} variants, '
          f'{len(images)} colour images, {len(specs)} models with specs')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
