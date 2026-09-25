<?php

namespace App\Http\Controllers;

use App\Data\Accessories;
use App\Data\Appliances;
use App\Data\Devices;
use App\Data\Catalog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * One product page, driven entirely by the slug. Every product renders
 * through this single surface; nothing about it is per-product bespoke.
 */
class ProductController extends Controller
{
    public function __invoke(Request $request, string $slug): Response
    {
        $product = Catalog::find($slug);

        if (! $product) {
            // Everything that is not a graded phone is a simple
            // product: no grade, no variants, no condition ladder. They
            // share one much shorter page. Accessories carry facets
            // derived from their names; appliances and devices carry
            // the real attributes the catalog publishes.
            if ($simple = Accessories::find($slug)) {
                $related = Accessories::related($simple);
                $categorySlug = 'accesorii';
            } elseif ($simple = Appliances::find($slug)) {
                $related = Appliances::related($simple);
                $categorySlug = 'smeg';
            } elseif ($simple = Devices::find($slug)) {
                $related = Devices::related($simple);
                $categorySlug = $simple['category'];
            }

            if (isset($simple)) {
                $attributes = $simple['attributes'] ?? [];

                return Inertia::render('Accesoriu', [
                    'accessory' => [
                        'slug' => $simple['slug'],
                        'name' => $simple['name'],
                        'price' => $simple['price'],
                        'priceMax' => $simple['priceMax'] ?? null,
                        'wasPrice' => $simple['wasPrice'] ?? null,
                        'thumb' => $simple['thumb'],
                        'inStock' => $simple['inStock'] ?? true,
                        // Accessories keep their flat derived keys; an
                        // imported row's badge comes out of its
                        // attributes instead.
                        'tip' => $simple['tip'] ?? ($attributes['tip'][0] ?? ''),
                        'compatibilitate' => $simple['compatibilitate'] ?? 'Altele',
                        'specs' => Catalog::specList($attributes),
                    ],
                    // The breadcrumb trail leads back to the category the
                    // product is actually in, not to a fixed one.
                    'category' => Catalog::category($categorySlug),
                    'related' => array_map(fn (array $r) => [
                        'slug' => $r['slug'],
                        'name' => $r['name'],
                        'price' => $r['price'],
                        'thumb' => $r['thumb'],
                        'tip' => $r['tip'] ?? ($r['attributes']['tip'][0] ?? ''),
                        'compatibilitate' => $r['compatibilitate'] ?? 'Altele',
                    ], $related),
                    'categories' => Catalog::categories(),
                    'company' => Catalog::company(),
                ]);
            }

            throw new NotFoundHttpException("No product matches [{$slug}].");
        }

        $grades = Catalog::grades();
        $grade = collect($grades)->firstWhere('label', $product['grade']);

        return Inertia::render('Product', [
            'product' => $product,
            'grade' => $grade,
            'gradeCount' => count($grades),
            'gradeOptions' => Catalog::gradesForModel($slug),
            'specs' => Catalog::specsFor($slug),
            'matrix' => Catalog::modelMatrix($slug),
            // Carried across a grade change so the visitor's colour and
            // capacity survive the navigation.
            'initial' => [
                'colour' => $request->query('culoare'),
                'storage' => $request->query('memorie'),
            ],
            'categories' => Catalog::categories(),
            'company' => Catalog::company(),
        ]);
    }
}
