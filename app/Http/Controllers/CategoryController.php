<?php

namespace App\Http\Controllers;

use App\Data\Catalog;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * One category listing, driven by the slug. Facets are derived from the
 * products actually held, never hardcoded, so a category gains filters
 * as its catalog fills.
 */
class CategoryController extends Controller
{
    public function __invoke(string $slug): Response
    {
        $category = Catalog::category($slug);

        if (! $category) {
            throw new NotFoundHttpException("No category matches [{$slug}].");
        }

        $products = array_map(fn (array $p) => [
            'slug' => $p['slug'],
            'name' => $p['name'],
            // Brand is the first word of the name, model the remainder:
            // "Apple iPhone 14 Pro Max" -> Apple / iPhone 14 Pro Max.
            'brand' => self::brand($p['name']),
            'model' => self::model($p['name']),
            'grade' => $p['grade'],
            'gradeStep' => $p['gradeStep'],
            'price' => $p['priceFrom'],
            'thumb' => $p['thumb'],
            'href' => '/produs/'.$p['slug'],
            'storages' => array_values(array_unique(array_filter(
                array_column($p['variants'], 'storage'),
            ))),
            'colours' => array_values(array_unique(array_filter(
                array_column($p['variants'], 'colour'),
            ))),
            'inStock' => (bool) array_filter(array_column($p['variants'], 'inStock')),
        ], Catalog::productsInCategory($slug));

        $facet = function (string $key) use ($products) {
            $values = [];

            foreach ($products as $product) {
                foreach ((array) $product[$key] as $value) {
                    $values[$value] = ($values[$value] ?? 0) + 1;
                }
            }

            return $values;
        };

        $storages = $facet('storages');
        uksort($storages, fn ($a, $b) => (int) $a <=> (int) $b);

        $grades = [];
        foreach (Catalog::grades() as $grade) {
            $count = count(array_filter($products, fn ($p) => $p['grade'] === $grade['label']));

            if ($count > 0) {
                $grades[$grade['label']] = $count;
            }
        }

        $brands = [];
        $models = [];

        foreach ($products as $product) {
            $brands[$product['brand']] = ($brands[$product['brand']] ?? 0) + 1;
            $models[$product['model']] = ($models[$product['model']] ?? 0) + 1;
        }

        ksort($models, SORT_NATURAL);

        return Inertia::render('Categorie', [
            'category' => $category,
            'products' => $products,
            'facets' => [
                'brands' => $brands,
                'models' => $models,
                'grades' => $grades,
                'storages' => $storages,
                'colours' => $facet('colours'),
            ],
            'categories' => Catalog::categories(),
            'company' => Catalog::company(),
        ]);
    }

    private static function brand(string $name): string
    {
        return explode(' ', trim($name), 2)[0];
    }

    private static function model(string $name): string
    {
        $parts = explode(' ', trim($name), 2);

        return $parts[1] ?? $parts[0];
    }
}
