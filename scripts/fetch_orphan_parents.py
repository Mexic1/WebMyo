#!/usr/bin/env python3
"""Fetch parent products that a category feed left out.

WooCommerce hides an out-of-stock parent from a category listing while
its variations still appear. The parent is a real product and is still
fetchable by id, so it is pulled in rather than dropped — otherwise the
catalog silently loses everything that happens to be out of stock.

Run when scripts/normalise_store_api.py reports orphans. Re-runnable:
a parent already present is left alone.
"""
import json, sys, time, urllib.error, urllib.request
from pathlib import Path

RAW = Path('storage/app/import/store-api')
API = 'https://myomobile.ro/wp-json/wc/store/v1/products/'
UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/131.0 Safari/537.36')
DELAY = 1.5


def main() -> int:
    total = 0

    for f in sorted(RAW.glob('p-*.json')):
        rows = json.loads(f.read_text())
        present = {r['id'] for r in rows if r['type'] != 'variation'}
        wanted = sorted({
            r['parent'] for r in rows
            if r['type'] == 'variation' and r.get('parent') and r['parent'] not in present
        })

        if not wanted:
            continue

        print(f'{f.stem[2:]}: {len(wanted)} missing parent(s)')
        added = []

        for pid in wanted:
            try:
                req = urllib.request.Request(f'{API}{pid}', headers={'User-Agent': UA})
                with urllib.request.urlopen(req, timeout=30) as resp:
                    product = json.loads(resp.read())
            except urllib.error.URLError as e:
                print(f'  {pid}: FAILED {e}', file=sys.stderr)
                time.sleep(DELAY)
                continue

            if 'id' not in product:
                print(f'  {pid}: gone from the catalog — skipping', file=sys.stderr)
            else:
                added.append(product)
                stock = 'in stock' if product.get('is_in_stock') else 'OUT OF STOCK'
                print(f'  {pid}: {product["slug"]} ({stock})')

            time.sleep(DELAY)

        if added:
            f.write_text(json.dumps(rows + added, ensure_ascii=False))
            total += len(added)

    print(f'\n{total} parent(s) recovered')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
