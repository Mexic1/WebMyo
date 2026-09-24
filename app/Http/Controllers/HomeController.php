<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Homepage.
 *
 * Every figure below is measured from the live myomobile.ro catalog on
 * 2026-09-24: category counts from each category's result count, unit
 * prices from each product's own variation data. These stand in for
 * database queries until the catalog migration lands. Nothing here is
 * invented — see PRODUCT.md "Evidence on Hand" for what may not be.
 *
 * The condition vocabulary is three steps, not four: only 19 of 446
 * products carry a grade, all iPhones, graded Bun / Excelent / Ca nou.
 */
class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', [
            'catalog' => [
                'unitCount' => 446,
                'gradedCount' => 19,
                'grades' => [
                    ['label' => 'Bun', 'step' => 1, 'note' => 'Urme de folosire vizibile. Funcțional complet.'],
                    ['label' => 'Excelent', 'step' => 2, 'note' => 'Urme minime, vizibile de aproape.'],
                    ['label' => 'Ca nou', 'step' => 3, 'note' => 'Fără urme vizibile de folosire.'],
                ],
            ],
            'categories' => [
                ['label' => 'Telefoane', 'href' => '/categorie/telefoane', 'count' => 145],
                ['label' => 'Accesorii', 'href' => '/categorie/accesorii', 'count' => 171],
                ['label' => 'Smeg', 'href' => '/categorie/smeg', 'count' => 42],
                ['label' => 'Tablete', 'href' => '/categorie/tablete', 'count' => 29],
                ['label' => 'Ceasuri', 'href' => '/categorie/ceasuri', 'count' => 20],
                ['label' => 'Laptopuri', 'href' => '/categorie/laptopuri', 'count' => 13],
            ],
            'featured' => [
                'name' => 'Apple iPhone 16 Pro Max',
                'grade' => 'Excelent',
                'price' => 3700,
                'storage' => '256 GB',
                'image' => '/products/apple-iphone-16-pro-max-2.avif', 'thumb' => '/products/apple-iphone-16-pro-max-2-600.webp',
                'href' => '/produs/apple-iphone-16-pro-max-excelent',
            ],
            'units' => [
                ['name' => 'Apple iPhone 16 Pro Max', 'grade' => 'Ca nou', 'price' => 4299, 'storage' => '256 GB', 'image' => '/products/apple-iphone-16-pro-max.avif', 'thumb' => '/products/apple-iphone-16-pro-max-600.webp', 'href' => '/produs/apple-iphone-16-pro-max-ca-nou'],
                ['name' => 'Apple iPhone 16 Pro Max', 'grade' => 'Excelent', 'price' => 3700, 'storage' => '256 GB', 'image' => '/products/apple-iphone-16-pro-max-2.avif', 'thumb' => '/products/apple-iphone-16-pro-max-2-600.webp', 'href' => '/produs/apple-iphone-16-pro-max-excelent'],
                ['name' => 'Apple iPhone 14 Pro Max', 'grade' => 'Excelent', 'price' => 3050, 'storage' => '256 GB, 512 GB', 'image' => '/products/apple-iphone-14-pro-max-2.webp', 'thumb' => '/products/apple-iphone-14-pro-max-2-600.webp', 'href' => '/produs/apple-iphone-14-pro-max-excelent'],
                ['name' => 'Apple iPhone 14 Pro Max', 'grade' => 'Ca nou', 'price' => 2999, 'storage' => '512 GB', 'image' => '/products/apple-iphone-14-pro-max-2.webp', 'thumb' => '/products/apple-iphone-14-pro-max-2-600.webp', 'href' => '/produs/apple-iphone-14-pro-max-ca-nou'],
                ['name' => 'Apple iPhone 14 Pro Max', 'grade' => 'Bun', 'price' => 2899, 'storage' => '128 GB, 256 GB', 'image' => '/products/apple-iphone-14-pro-max.webp', 'thumb' => '/products/apple-iphone-14-pro-max-600.webp', 'href' => '/produs/apple-iphone-14-pro-max-bun'],
                ['name' => 'Apple iPhone 14 Pro', 'grade' => 'Ca nou', 'price' => 2750, 'storage' => '256 GB', 'image' => '/products/apple-iphone-14-pro.webp', 'thumb' => '/products/apple-iphone-14-pro-600.webp', 'href' => '/produs/apple-iphone-14-pro-ca-nou'],
                ['name' => 'Apple iPhone 14 Pro', 'grade' => 'Bun', 'price' => 2600, 'storage' => '256 GB, 512 GB', 'image' => '/products/apple-iphone-14-pro.webp', 'thumb' => '/products/apple-iphone-14-pro-600.webp', 'href' => '/produs/apple-iphone-14-pro-bun'],
                ['name' => 'Apple iPhone 14 Pro', 'grade' => 'Excelent', 'price' => 2600, 'storage' => '256 GB, 512 GB', 'image' => '/products/apple-iphone-14-pro-2.avif', 'thumb' => '/products/apple-iphone-14-pro-2-600.webp', 'href' => '/produs/apple-iphone-14-pro-excelent'],
                ['name' => 'Apple iPhone 13 Pro', 'grade' => 'Bun', 'price' => 2199, 'storage' => '512 GB', 'image' => '/products/apple-iphone-13-pro.jpg', 'thumb' => '/products/apple-iphone-13-pro-600.webp', 'href' => '/produs/apple-iphone-13-pro-bun'],
                ['name' => 'Apple iPhone 14 Plus', 'grade' => 'Ca nou', 'price' => 2100, 'storage' => '256 GB', 'image' => '/products/apple-iphone-14-plus.avif', 'thumb' => '/products/apple-iphone-14-plus-600.webp', 'href' => '/produs/apple-iphone-14-plus-ca-nou'],
                ['name' => 'Apple iPhone 14 Plus', 'grade' => 'Excelent', 'price' => 2000, 'storage' => '256 GB, 512 GB', 'image' => '/products/apple-iphone-14-plus.avif', 'thumb' => '/products/apple-iphone-14-plus-600.webp', 'href' => '/produs/apple-iphone-14-plus-excelent'],
                ['name' => 'Apple iPhone 14', 'grade' => 'Ca nou', 'price' => 1700, 'storage' => '128 GB, 256 GB', 'image' => '/products/apple-iphone-14-2.avif', 'thumb' => '/products/apple-iphone-14-2-600.webp', 'href' => '/produs/apple-iphone-14-ca-nou'],
                ['name' => 'Apple iPhone 14', 'grade' => 'Excelent', 'price' => 1650, 'storage' => '128 GB, 256 GB', 'image' => '/products/apple-iphone-14-2.avif', 'thumb' => '/products/apple-iphone-14-2-600.webp', 'href' => '/produs/apple-iphone-14-excelent'],
                ['name' => 'Apple iPhone 14', 'grade' => 'Bun', 'price' => 1500, 'storage' => '128 GB, 256 GB', 'image' => '/products/apple-iphone-14.webp', 'thumb' => '/products/apple-iphone-14-600.webp', 'href' => '/produs/apple-iphone-14-bun'],
                ['name' => 'Apple iPhone 12', 'grade' => 'Bun', 'price' => 999, 'storage' => '128 GB, 64 GB', 'image' => '/products/apple-iphone-12.webp', 'thumb' => '/products/apple-iphone-12-600.webp', 'href' => '/produs/apple-iphone-12-bun'],
                ['name' => 'Apple iPhone 12', 'grade' => 'Excelent', 'price' => 999, 'storage' => '64 GB', 'image' => '/products/apple-iphone-12.webp', 'thumb' => '/products/apple-iphone-12-600.webp', 'href' => '/produs/apple-iphone-12-excelent'],
                ['name' => 'Apple iPhone SE', 'grade' => 'Excelent', 'price' => 800, 'storage' => '256 GB', 'image' => '/products/apple-iphone-se.avif', 'thumb' => '/products/apple-iphone-se-600.webp', 'href' => '/produs/apple-iphone-se-excelent'],
                ['name' => 'Apple iPhone SE', 'grade' => 'Ca nou', 'price' => 700, 'storage' => '128 GB', 'image' => '/products/apple-iphone-se.avif', 'thumb' => '/products/apple-iphone-se-600.webp', 'href' => '/produs/apple-iphone-se-ca-nou'],
                ['name' => 'Apple iPhone SE', 'grade' => 'Bun', 'price' => 650, 'storage' => '128 GB', 'image' => '/products/apple-iphone-se.avif', 'thumb' => '/products/apple-iphone-se-600.webp', 'href' => '/produs/apple-iphone-se-bun'],
            ],
            'company' => [
                'legalName' => 'MYOMOBILE TRADING SRL',
                'cui' => '46108435',
                'address' => 'Str. Mărășești 11C, Buziaș, Timiș',
                'phone' => '0720 512 157',
                'returnDays' => 14,
                'warrantyMonths' => 12,
            ],
        ]);
    }
}
