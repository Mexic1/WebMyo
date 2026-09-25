<?php

namespace App\Http\Controllers;

use App\Data\Catalog;
use App\Support\Facets;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The catalog-wide listing: every product the storefront holds, in one
 * place, searchable across categories.
 *
 * This is where somebody goes who knows what they want but not which
 * category it is filed under. The category pages answer "show me the
 * watches"; this one answers "do you have a Galaxy Tab S11".
 */
class CatalogController extends Controller
{
    public function __invoke(): Response
    {
        $products = Catalog::allProducts();
        $config = Catalog::catalogConfig();

        return Inertia::render('Catalog', [
            'products' => $products,
            'facets' => Facets::count($products, $config['facets']),
            'sorts' => $config['sorts'],
            'categories' => Catalog::categories(),
            'company' => Catalog::company(),
        ]);
    }
}
