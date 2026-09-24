<?php

namespace App\Http\Controllers;

use App\Data\Accessories;
use App\Data\Appliances;
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
            // Accessories are simple products: no grade, no variants, no
            // condition ladder. They get their own, much shorter page.
            $accessory = Accessories::find($slug) ?? Appliances::find($slug);

            if ($accessory) {
                return Inertia::render('Accesoriu', [
                    'accessory' => $accessory + ['compatibilitate' => $accessory['compatibilitate'] ?? 'Altele'],
                    'related' => Accessories::find($slug)
                        ? Accessories::related($accessory)
                        : Appliances::related($accessory),
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
