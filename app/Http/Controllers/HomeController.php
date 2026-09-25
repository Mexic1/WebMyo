<?php

namespace App\Http\Controllers;

use App\Data\Catalog;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $units = array_map(
            fn (array $p) => [
                'name' => $p['name'],
                'grade' => $p['grade'],
                'price' => $p['priceFrom'],
                'storage' => self::storageSummary($p),
                'image' => $p['image'],
                'thumb' => $p['thumb'],
                'href' => '/produs/'.$p['slug'],
            ],
            Catalog::products(),
        );

        $featured = Catalog::find('apple-iphone-16-pro-max-excelent') ?? Catalog::products()[0];

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

    /** Distinct capacities a product is sold in, in ascending order. */
    private static function storageSummary(array $product): ?string
    {
        $sizes = array_values(array_unique(array_filter(
            array_column($product['variants'], 'storage'),
        )));

        usort($sizes, fn ($a, $b) => (int) $a <=> (int) $b);

        return $sizes ? implode(', ', $sizes) : null;
    }
}
