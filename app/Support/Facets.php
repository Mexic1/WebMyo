<?php

namespace App\Support;

/**
 * Counts facet values off a set of products.
 *
 * Shared by the category listings and the catalog-wide one, which
 * differ only in which products they are handed and which attributes
 * they declare. Neither knows what a phone or an appliance is.
 */
class Facets
{
    /**
     * Facets in the order declared, each with its values and how many
     * products carry them. A facet no product carries is dropped, so a
     * listing never shows an empty dropdown.
     *
     * @param  list<array<string, mixed>>  $products
     * @param  array<string, string>  $declared  key => label
     * @return list<array{key: string, label: string, options: list<array{value: string, count: int}>}>
     */
    public static function count(array $products, array $declared): array
    {
        $facets = [];

        foreach ($declared as $key => $label) {
            $counts = [];

            foreach ($products as $product) {
                foreach ($product['attributes'][$key] ?? [] as $value) {
                    if ($value === '' || $value === null) {
                        continue;
                    }

                    $counts[$value] = ($counts[$value] ?? 0) + 1;
                }
            }

            if ($counts === []) {
                continue;
            }

            $facets[] = [
                'key' => $key,
                'label' => $label,
                'options' => self::ordered($key, $counts),
            ];
        }

        return $facets;
    }

    /** Facets whose values are storage sizes: 4 GB, 512 GB, 1 TB. */
    private const CAPACITY_FACETS = ['memorie', 'ram'];

    /**
     * Facets whose values are ranges: "Sub 1.5 inch", "24 - 48h",
     * "Peste 12 inch", "1.000 – 2.499 lei". All sort by lower bound.
     */
    private const BAND_FACETS = ['pret', 'diagonala', 'ecran', 'autonomie', 'carcasa'];

    /**
     * Facet values in the order a reader expects: capacities and price
     * bands ascend, everything else leads with the largest group.
     */
    private static function ordered(string $key, array $counts): array
    {
        if (in_array($key, self::CAPACITY_FACETS, true)) {
            uksort($counts, fn ($a, $b) => Size::inGb($a) <=> Size::inGb($b));
        } elseif (in_array($key, self::BAND_FACETS, true)) {
            // Sorted by the band's lower bound, read off the label, so
            // any category can declare its own bands without this
            // method learning them. "Sub X" is always the first band.
            uksort($counts, fn ($a, $b) => self::lowerBound($a) <=> self::lowerBound($b));
        } elseif ($key === 'model') {
            ksort($counts, SORT_NATURAL);
        } else {
            arsort($counts);
        }

        return array_map(
            fn ($value, $count) => ['value' => $value, 'count' => $count],
            array_keys($counts),
            array_values($counts),
        );
    }

    /**
     * The lower bound of a range label. "Sub X" always sorts first;
     * everything else is read from its first number.
     */
    private static function lowerBound(string $band): float
    {
        if (str_starts_with(mb_strtolower($band), 'sub')) {
            return -INF;
        }

        // A label with no number in it is not a band on the scale —
        // "Preț la cerere" is not cheaper than "Sub 500 lei". Send it
        // to the end rather than letting it read as the first step.
        if (! preg_match('/\d+(?:[.,]\d+)?/', $band, $m)) {
            return INF;
        }

        $number = $m[0];

        // Romanian writes thousands as 1.000 and decimals as 10,5 — but
        // these labels also carry English decimals like "10.1 inch". A
        // dot followed by exactly three digits is a thousands
        // separator; anything else is a decimal point.
        $number = preg_replace('/\.(\d{3})\b/', '$1', $number);

        return (float) str_replace(',', '.', $number);
    }
}
