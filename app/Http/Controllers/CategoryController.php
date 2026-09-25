<?php

namespace App\Http\Controllers;

use App\Data\Catalog;
use App\Support\Facets;
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

        return Inertia::render('Categorie', [
            'category' => $category,
            'products' => $products,
            'facets' => Facets::count($products, $config['facets']),
            'sorts' => $config['sorts'],
            'categories' => Catalog::categories(),
            'company' => Catalog::company(),
        ]);
    }
}
