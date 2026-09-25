<?php

namespace App\Http\Controllers;

use App\Data\Catalog;
use App\Support\Size;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $phones = Catalog::products();

        $units = array_map(
            fn (array $p) => [
                'name' => $p['name'],
                'grade' => $p['grade'],
                'price' => $p['priceFrom'],
                'storage' => self::storageSummary($p),
                'image' => $p['image'],
                'thumb' => $p['thumb'],
                'href' => '/produs/'.$p['slug'],
                'inStock' => self::inStock($p),
            ],
            $phones,
        );

        // The headline unit is the dearest phone that can actually be
        // bought — chosen, never named. Add a dearer one and it takes
        // the slot; sell this one and the next takes it back. Naming a
        // slug here is how the homepage came to headline a sold-out
        // iPhone. Only if nothing at all is in stock does the column
        // fall back to the dearest overall, so it is never empty.
        $available = array_values(array_filter($phones, self::inStock(...)));
        $featured = ($available ?: $phones)[0];

        return Inertia::render('Home', [
            'catalog' => [
                'unitCount' => Catalog::totalProducts(),
                'gradedCount' => count($units),
                'grades' => Catalog::grades(),
            ],
            'categories' => Catalog::categories(),
            'featured' => [
                'name' => $featured['name'],
                'grade' => $featured['grade'],
                'price' => $featured['priceFrom'],
                'storage' => self::storageSummary($featured),
                'image' => $featured['image'],
                'thumb' => $featured['thumb'],
                'href' => '/produs/'.$featured['slug'],
            ],
            'units' => $units,
            'company' => Catalog::company(),
        ]);
    }

    /** A product is available while any one of its variants is. */
    private static function inStock(array $product): bool
    {
        return (bool) array_filter(array_column($product['variants'], 'inStock'));
    }

    /** Distinct capacities a product is sold in, in ascending order. */
    private static function storageSummary(array $product): ?string
    {
        $sizes = Size::sort(array_values(array_unique(array_filter(
            array_column($product['variants'], 'storage'),
        ))));

        return $sizes ? implode(', ', $sizes) : null;
    }
}
