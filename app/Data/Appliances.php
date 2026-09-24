<?php

namespace App\Data;

/**
 * SMEG appliances. EMPTY ON PURPOSE — the products are not held yet.
 *
 * The listing page, its facets, its cards and its product pages are all
 * built and wired; this class is the only thing standing between an
 * empty state and a working category. Fill `all()` with rows of the
 * shape below and the category comes to life with no other change.
 *
 * Shape, identical to Accessories so both flow through one code path:
 *
 *     [
 *         'slug'  => 'frigider-smeg-fab28',      // URL segment, unique
 *         'name'  => 'Frigider Smeg FAB28, crem',
 *         'price' => 5499,                        // lei, integer
 *         'thumb' => '/products/smeg/fab28-500.webp',
 *         'tip'   => 'Frigider',                  // facet: product type
 *         'pret'  => '350 lei și peste',          // facet: price band
 *     ]
 *
 * `tip` and `pret` are what `Catalog::categoryConfig('smeg')` filters
 * on. Facet VALUES are counted from the rows, so the dropdowns populate
 * themselves — nothing here or in the page needs to declare them.
 *
 * Do not scrape these from myomobile.ro. That route was exhausted on
 * 2026-09-25 (the host began refusing connections after the accessory
 * import) and it yields facets inferred from product names rather than
 * real attributes. Use a WooCommerce product export or the store REST
 * API, which carries genuine categories, attributes and stock.
 */
class Appliances
{
    /**
     * @return list<array{slug: string, name: string, price: int, thumb: ?string, tip: string, pret: string}>
     */
    public static function all(): array
    {
        return [];
    }

    /** One appliance by slug, or null when nothing matches. */
    public static function find(string $slug): ?array
    {
        foreach (self::all() as $appliance) {
            if ($appliance['slug'] === $slug) {
                return $appliance;
            }
        }

        return null;
    }

    /** Other appliances of the same type. */
    public static function related(array $appliance, int $limit = 4): array
    {
        return array_slice(array_values(array_filter(
            self::all(),
            fn ($a) => $a['slug'] !== $appliance['slug'] && $a['tip'] === $appliance['tip'],
        )), 0, $limit);
    }

    /**
     * Price band for a value in lei. Kept here so an importer applies
     * the same bands the facet declares.
     */
    public static function band(int $price): string
    {
        return match (true) {
            $price < 1000 => 'Sub 1.000 lei',
            $price < 2500 => '1.000 – 2.499 lei',
            $price < 5000 => '2.500 – 4.999 lei',
            default => '5.000 lei și peste',
        };
    }
}
