#!/usr/bin/env python3
"""Emit the PHP data classes the category pages read.

    storage/app/import/normalised.json  ->  app/Data/Appliances.php
                                            app/Data/Devices.php

Idempotent and offline. Thumb paths are written only for images that
are actually on disk, so re-running after an image pass fills them in.
"""
import json, re, subprocess
from pathlib import Path

SRC = Path('storage/app/import/normalised.json')
PUBLIC = Path('public/products')

# SMEG carries no product-type attribute, so `tip` is derived from the
# name. The range is named regularly enough for this to hold, but it is
# a stopgap: a real attribute should replace it at migration.
SMEG_TYPE_RULES = [
    (r'\bpachet\b', 'Pachet'), (r'espressor|cafea automat', 'Espressor'),
    (r'râșniț|rasnit', 'Râșniță'), (r'\bblender\b', 'Blender'),
    (r'storc|slow juicer', 'Storcător'), (r'mixer', 'Mixer'),
    (r'toaster|prăjitor', 'Toaster'), (r'fierbător|fierbator|kettle', 'Fierbător'),
    (r'spumare|lapte', 'Aparat de spumare'), (r'răcitor de vin', 'Răcitor de vin'),
    (r'cântar', 'Cântar'), (r'tigaie', 'Tigaie'), (r'vas .*g[ăa]tit', 'Vas de gătit'),
    (r'cuptor', 'Cuptor'), (r'microunde', 'Microunde'), (r'frigider', 'Frigider'),
    (r'mașin[ăa] de sp[ăa]lat', 'Mașină de spălat'), (r'robot de buc[ăa]t[ăa]rie', 'Robot de bucătărie'),
    (r'grătar|gratar|grill', 'Grătar'), (r'aspirator', 'Aspirator'),
]


def smeg_type(name: str) -> str:
    low = name.lower()
    for pattern, label in SMEG_TYPE_RULES:
        if re.search(pattern, low):
            return label
    return 'Altele'


def php(value) -> str:
    if value is None:
        return 'null'
    if value is True:
        return 'true'
    if value is False:
        return 'false'
    if isinstance(value, int):
        return str(value)
    if isinstance(value, list):
        return '[' + ', '.join(php(v) for v in value) + ']'
    if isinstance(value, dict):
        return '[' + ', '.join(f"{php(k)} => {php(v)}" for k, v in value.items()) + ']'
    return "'" + str(value).replace('\\', '\\\\').replace("'", "\\'") + "'"


def thumb_for(category: str, slug: str) -> str | None:
    path = PUBLIC / category / f'{slug}-500.webp'
    return f'/products/{category}/{slug}-500.webp' if path.exists() else None


def render_row(category: str, r: dict) -> str:
    attributes = dict(r['attributes'])
    if category == 'smeg':
        attributes = {'tip': [smeg_type(r['name'])], **attributes}
    row = {
        'slug': r['slug'], 'name': r['name'], 'price': r['price'],
        'priceMax': r['priceMax'], 'wasPrice': r['wasPrice'],
        'thumb': thumb_for(category, r['slug']), 'inStock': r['inStock'],
        'attributes': attributes,
    }
    return '            ' + php(row) + ','


HEAD = """<?php

namespace App\\Data;

"""


def write_appliances(rows: list[dict]) -> None:
    body = '\n'.join(render_row('smeg', r) for r in rows)
    types = sorted({smeg_type(r['name']) for r in rows})
    Path('app/Data/Appliances.php').write_text(HEAD + f'''/**
 * SMEG appliances — {len(rows)} products, imported from the client's own
 * WooCommerce Store API on 2026-09-25. Generated file: edit the
 * importer, not this.
 *
 *     scripts/normalise_store_api.py && scripts/generate_data_classes.py
 *
 * `culoare`, `stare` and `pret` are REAL published attributes.
 * `tip` is DERIVED from the product name ({len(types)} values: {', '.join(types)})
 * because the catalog carries no product-type attribute for this range.
 * It is good enough to filter {len(rows)} products and should be replaced by a
 * real attribute at migration.
 *
 * `stare` here is the packaging state — "Sigilat" / "Openbox - Produs
 * Desigilat" — NOT the Bun/Excelent/Ca nou condition ladder. The two are
 * different axes and must not be conflated.
 */
class Appliances
{{
    /**
     * @return list<array{{slug: string, name: string, price: int, priceMax: ?int, wasPrice: ?int, thumb: ?string, inStock: bool, attributes: array<string, list<string>>}}>
     */
    public static function all(): array
    {{
        // Rebuilt on every call otherwise, and the category nav counts
        // this on every page.
        static $rows = null;

        return $rows ??= [
{body}
        ];
    }}

    /** One appliance by slug, or null when nothing matches. */
    public static function find(string $slug): ?array
    {{
        foreach (self::all() as $appliance) {{
            if ($appliance['slug'] === $slug) {{
                return $appliance;
            }}
        }}

        return null;
    }}

    /** Other appliances of the same derived type. */
    public static function related(array $appliance, int $limit = 4): array
    {{
        $tip = $appliance['attributes']['tip'][0] ?? null;

        return array_slice(array_values(array_filter(
            self::all(),
            fn ($a) => $a['slug'] !== $appliance['slug']
                && ($a['attributes']['tip'][0] ?? null) === $tip,
        )), 0, $limit);
    }}

    /**
     * Price band for a value in lei. Kept here so an importer applies
     * the same bands the facet declares.
     */
    public static function band(int $price): string
    {{
        return match (true) {{
            $price < 1000 => 'Sub 1.000 lei',
            $price < 2500 => '1.000 – 2.499 lei',
            $price < 5000 => '2.500 – 4.999 lei',
            default => '5.000 lei și peste',
        }};
    }}
}}
''')


def write_devices(data: dict) -> None:
    blocks = []
    for category in ('tablete', 'ceasuri', 'laptopuri'):
        rows = '\n'.join(render_row(category, r) for r in data[category])
        blocks.append(f"        '{category}' => [\n{rows}\n        ],")
    joined = '\n'.join(blocks)
    counts = ', '.join(f'{c} {len(data[c])}' for c in ('tablete', 'ceasuri', 'laptopuri'))
    Path('app/Data/Devices.php').write_text(HEAD + f'''/**
 * Tablets, watches and laptops — {counts}, imported from the client's
 * own WooCommerce Store API on 2026-09-25. Generated file: edit the
 * importer, not this.
 *
 *     scripts/normalise_store_api.py && scripts/generate_data_classes.py
 *
 * Every attribute here is a REAL published WooCommerce attribute; none
 * is derived from the product name. Which of them a category exposes as
 * a filter is declared by `Catalog::categoryConfig()`.
 *
 * WooCommerce variation rows were dropped at import — each one
 * duplicates a parent that is already in the list, and the parent
 * carries the full price range in `price`/`priceMax`. This is why these
 * counts are lower than the live category pages claim.
 *
 * `stare` is the packaging state — "Sigilat" / "Openbox - Produs
 * Desigilat" — NOT the Bun/Excelent/Ca nou condition ladder.
 */
class Devices
{{
    /**
     * @return list<array{{slug: string, name: string, price: int, priceMax: ?int, wasPrice: ?int, thumb: ?string, inStock: bool, attributes: array<string, list<string>>}}>
     */
    public static function all(string $category): array
    {{
        return self::catalog()[$category] ?? [];
    }}

    /** One device by slug across every category, or null. */
    public static function find(string $slug): ?array
    {{
        foreach (self::catalog() as $category => $rows) {{
            foreach ($rows as $row) {{
                if ($row['slug'] === $slug) {{
                    return $row + ['category' => $category];
                }}
            }}
        }}

        return null;
    }}

    /** Other devices in the same category. */
    public static function related(array $device, int $limit = 4): array
    {{
        $rows = self::all($device['category'] ?? '');

        return array_slice(array_values(array_filter(
            $rows,
            fn ($d) => $d['slug'] !== $device['slug'],
        )), 0, $limit);
    }}

    /** @return array<string, list<array<string, mixed>>> */
    private static function catalog(): array
    {{
        // Rebuilt on every call otherwise, and `find()` scans it.
        static $rows = null;

        return $rows ??= [
{joined}
        ];
    }}
}}
''')


def main() -> int:
    data = json.loads(SRC.read_text())
    write_appliances(data['smeg'])
    write_devices(data)
    for f in ('app/Data/Appliances.php', 'app/Data/Devices.php'):
        size = Path(f).stat().st_size // 1024
        # PHP lives in the Sail container here, so linting is advisory.
        try:
            subprocess.run(['php', '-l', f], check=True, capture_output=True)
            note = 'syntax OK'
        except (FileNotFoundError, subprocess.CalledProcessError) as e:
            note = 'not linted (no local php)' if isinstance(e, FileNotFoundError) \
                else 'SYNTAX ERROR'
        print(f'{f}  {size} KB  {note}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
