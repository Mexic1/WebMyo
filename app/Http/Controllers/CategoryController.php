<?php

namespace App\Http\Controllers;

use App\Data\Catalog;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * One category listing for every category. Facets are counted from the
 * products actually held, in the order the category declares, so this
 * controller never learns what a phone or an accessory is.
 */
class CategoryController extends Controller
{
    public function __invoke(string $slug): Response
    {
        $category = Catalog::category($slug);

        if (! $category) {
            throw new NotFoundHttpException("No category matches [{$slug}].");
        }

        $products = Catalog::productsInCategory($slug);
        $config = Catalog::categoryConfig($slug);

        $facets = [];

        foreach ($config['facets'] as $key => $label) {
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

            $counts = self::ordered($key, $counts);

            $facets[] = ['key' => $key, 'label' => $label, 'options' => $counts];
        }

        return Inertia::render('Categorie', [
            'category' => $category,
            'products' => $products,
            'facets' => $facets,
            'sorts' => $config['sorts'],
            'categories' => Catalog::categories(),
            'company' => Catalog::company(),
        ]);
    }

    /**
     * Facet values in the order a reader expects: capacities and price
     * bands ascend, everything else leads with the largest group.
     */
    /** Facets whose values are storage sizes: 4 GB, 512 GB, 1 TB. */
    private const CAPACITY_FACETS = ['memorie', 'ram'];

    /**
     * Facets whose values are ranges: "Sub 1.5 inch", "24 - 48h",
     * "Peste 12 inch", "1.000 – 2.499 lei". All sort by lower bound.
     */
    private const BAND_FACETS = ['pret', 'diagonala', 'ecran', 'autonomie', 'carcasa'];

    private static function ordered(string $key, array $counts): array
    {
        if (in_array($key, self::CAPACITY_FACETS, true)) {
            uksort($counts, fn ($a, $b) => self::capacity($a) <=> self::capacity($b));
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
     * A capacity in GB. "1 TB" has to outrank "512 GB", which a plain
     * integer cast gets backwards.
     */
    private static function capacity(string $value): float
    {
        if (! preg_match('/([\d.,]+)\s*(TB|GB|MB)?/i', $value, $m)) {
            return 0;
        }

        $size = (float) str_replace(',', '.', $m[1]);

        return match (mb_strtoupper($m[2] ?? 'GB')) {
            'TB' => $size * 1024,
            'MB' => $size / 1024,
            default => $size,
        };
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

        if (! preg_match('/\d+(?:[.,]\d+)?/', $band, $m)) {
            return 0;
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
