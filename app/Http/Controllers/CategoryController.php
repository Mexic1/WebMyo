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
    private static function ordered(string $key, array $counts): array
    {
        if ($key === 'memorie') {
            uksort($counts, fn ($a, $b) => (int) $a <=> (int) $b);
        } elseif ($key === 'pret') {
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

    /** The lower bound of a price band, read from its label. */
    private static function lowerBound(string $band): int
    {
        if (str_starts_with(mb_strtolower($band), 'sub')) {
            return -1;
        }

        preg_match('/[\d.]+/', $band, $m);

        return (int) str_replace('.', '', $m[0] ?? '0');
    }
}
