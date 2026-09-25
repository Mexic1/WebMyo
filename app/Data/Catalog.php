<?php

namespace App\Data;

use App\Support\Size;

/**
 * The catalog, as measured from the live myomobile.ro site on 2026-09-24.
 *
 * Every value here is real: names, condition grades, per-variant prices,
 * colours, capacities, SKUs, dimensions, weights and stock flags all come
 * from each product's own `variation-sale-data` payload. Nothing is
 * invented — see PRODUCT.md "Evidence on Hand".
 *
 * This class is the seam. It stands in for Eloquent models until the
 * catalog migration lands; when it does, only the bodies below change and
 * every caller keeps working. Callers must not reach past these methods.
 *
 * Note: no product on the live site carries a description, so none is
 * recorded here. The product page must not fabricate one.
 */
class Catalog
{
    /** Total products in the live catalog, across every category. */
    /**
     * The live myomobile.ro catalog, measured 2026-09-24. Kept as a
     * migration target to check imports against — NOT for display, and
     * not what this storefront holds. Use `totalProducts()` for that.
     */
    public const LIVE_CATALOG_SIZE = 446;

    /**
     * The condition ladder. Three steps, not four: only these 19 products
     * carry a grade at all, and all of them are iPhones.
     *
     * @return list<array{label: string, step: int, note: string}>
     */
    public static function grades(): array
    {
        // One scale for every phone, best last. Sigilat and Openbox
        // describe a box that was never used; the three below them
        // describe how much use shows. A product carries exactly one.
        return [
            ['label' => 'Bun', 'step' => 1, 'note' => 'Urme de folosire vizibile. Funcțional complet.'],
            ['label' => 'Excelent', 'step' => 2, 'note' => 'Urme minime, vizibile de aproape.'],
            ['label' => 'Ca nou', 'step' => 3, 'note' => 'Fără urme vizibile de folosire.'],
            ['label' => 'Openbox', 'step' => 4, 'note' => 'Nefolosit. Cutia a fost desigilată.'],
            ['label' => 'Sigilat', 'step' => 5, 'note' => 'Nedesfăcut, în cutia originală.'],
        ];
    }

    /** @return list<array{label: string, href: string, count: int}> */
    /**
     * The storefront's categories, in nav order. This is the ONLY list:
     * a category exists here or it does not exist.
     *
     * @return list<array{slug: string, label: string, href: string}>
     */
    private static function categoryList(): array
    {
        return [
            ['slug' => 'telefoane', 'label' => 'Telefoane'],
            ['slug' => 'accesorii', 'label' => 'Accesorii'],
            ['slug' => 'smeg', 'label' => 'Smeg'],
            ['slug' => 'tablete', 'label' => 'Tablete'],
            ['slug' => 'ceasuri', 'label' => 'Ceasuri'],
            ['slug' => 'laptopuri', 'label' => 'Laptopuri'],
        ];
    }

    /**
     * Every category with the number of products actually held.
     *
     * The count is COUNTED, never written down. A hardcoded one is a
     * promise the catalog has to keep, and it did not: the tile claimed
     * 145 phones against 19 held and 171 accessories against 164, so a
     * visitor following either landed on a shorter page than the number
     * that sent them there. Adding or removing a product now moves the
     * tile with it, and when this data layer is replaced by real tables
     * only `productsInCategory()` changes — this keeps working.
     *
     * @return list<array{slug: string, label: string, href: string, count: int}>
     */
    public static function categories(): array
    {
        // Every page renders the nav, and counting means building each
        // category's product list, so hold the answer for the request.
        static $categories = null;

        return $categories ??= array_map(fn (array $c) => [
            'slug' => $c['slug'],
            'label' => $c['label'],
            'href' => '/categorie/'.$c['slug'],
            'count' => count(self::productsInCategory($c['slug'])),
        ], self::categoryList());
    }

    /** Everything the storefront holds, across every category. */
    public static function totalProducts(): int
    {
        return array_sum(array_column(self::categories(), 'count'));
    }

    /** @return array{legalName: string, cui: string, address: string, phone: string, returnDays: int, warrantyMonths: int} */
    public static function company(): array
    {
        return [
            'legalName' => 'MYOMOBILE TRADING SRL',
            'cui' => '46108435',
            'address' => 'Str. Mărășești 11C, Buziaș, Timiș',
            'phone' => '0720 512 157',
            'returnDays' => 14,
            'warrantyMonths' => 12,
        ];
    }

    /**
     * Model-level hardware specification, keyed by model slug.
     *
     * These are manufacturer facts — panel, chip, memory, camera and
     * battery — not claims about the individual unit. Verified against
     * each model's GSMArena page on 2026-09-24; the page is linked from
     * the product so the full sheet is one click away and attributed.
     *
     * Eight models were looked up by hand. Do NOT scale this by scraping:
     * GSMArena's terms do not allow bulk extraction, and a 446-product
     * catalog needs a licensed spec feed instead. See PRODUCT.md.
     *
     * @return array<string, array{display: ?string, chipset: ?string, ram: ?string, cameraMain: ?string, cameraFront: ?string, battery: ?string, gsmarena: ?string}>
     */
    public static function specs(): array
    {
        return [
            'apple-iphone-12' => [
                'display' => '6.1″ OLED, 1170 × 2532 (460 ppi)',
                'chipset' => 'Apple A14 Bionic',
                'ram' => '4 GB',
                'cameraMain' => '12 MP + 12 MP',
                'cameraFront' => '12 MP',
                'battery' => '2815 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_12-10509.php',
            ],
            'apple-iphone-13-pro' => [
                'display' => '6.1″ OLED, 1170 × 2532 (460 ppi), 120 Hz',
                'chipset' => 'Apple A15 Bionic',
                'ram' => '6 GB',
                'cameraMain' => '12 MP + 12 MP + 12 MP',
                'cameraFront' => '12 MP',
                'battery' => '3095 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_13_pro-11102.php',
            ],
            'apple-iphone-14' => [
                'display' => '6.1″ OLED, 1170 × 2532 (460 ppi)',
                'chipset' => 'Apple A15 Bionic',
                'ram' => '6 GB',
                'cameraMain' => '12 MP + 12 MP',
                'cameraFront' => '12 MP',
                'battery' => '3279 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_14-11861.php',
            ],
            'apple-iphone-14-plus' => [
                'display' => '6.7″ OLED, 1284 × 2778 (458 ppi)',
                'chipset' => 'Apple A15 Bionic',
                'ram' => '6 GB',
                'cameraMain' => '12 MP + 12 MP',
                'cameraFront' => '12 MP',
                'battery' => '4323 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_14_plus-11862.php',
            ],
            'apple-iphone-14-pro' => [
                'display' => '6.1″ OLED, 1179 × 2556 (460 ppi), 120 Hz',
                'chipset' => 'Apple A16 Bionic',
                'ram' => '6 GB',
                'cameraMain' => '48 MP + 12 MP + 12 MP',
                'cameraFront' => '12 MP',
                'battery' => '3200 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_14_pro-11860.php',
            ],
            'apple-iphone-14-pro-max' => [
                'display' => '6.7″ OLED, 1290 × 2796 (460 ppi), 120 Hz',
                'chipset' => 'Apple A16 Bionic',
                'ram' => '6 GB',
                'cameraMain' => '48 MP + 12 MP + 12 MP',
                'cameraFront' => '12 MP',
                'battery' => '4323 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_14_pro_max-11773.php',
            ],
            'apple-iphone-16-pro-max' => [
                'display' => '6.9″ OLED, 1320 × 2868 (460 ppi), 120 Hz',
                'chipset' => 'Apple A18 Pro',
                'ram' => '8 GB',
                'cameraMain' => '48 MP + 12 MP + 48 MP',
                'cameraFront' => '12 MP',
                'battery' => '4685 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_16_pro_max-13123.php',
            ],
            'apple-iphone-se' => [
                'display' => '4.7″ LCD, 750 × 1334 (326 ppi)',
                'chipset' => 'Apple A15 Bionic',
                'ram' => '4 GB',
                'cameraMain' => '12 MP',
                'cameraFront' => '7 MP',
                'battery' => '2018 mAh',
                'gsmarena' => 'https://www.gsmarena.com/apple_iphone_se_(2022)-11410.php',
            ],
        ];
    }

    /** Hardware specification for the model a product belongs to. */
/**
     * A product slug without its condition suffix — the model that
     * siblings at other conditions share. Every suffix in the ladder
     * has to be listed here or those siblings stop finding each other.
     */
/**
     * Romanian-aware comparison for names shown to a reader. The
     * catalog mixes Romanian and English colour names, and a plain
     * strcmp files "Ș" after "Z"; the collator does not.
     */
    private static function byName(string $a, string $b): int
    {
        static $collator = null;

        if ($collator === null && class_exists(\Collator::class)) {
            $collator = new \Collator('ro_RO');
        }

        return $collator ? $collator->compare($a, $b) : strnatcasecmp($a, $b);
    }

    public static function modelSlug(string $slug): string
    {
        return preg_replace('/-(sigilat|openbox|ca-nou|excelent|bun)$/', '', $slug);
    }

    public static function specsFor(string $slug): ?array
    {
        $model = self::modelSlug($slug);

        return self::specs()[$model] ?? Phones::specs()[$model] ?? null;
    }

    /** Every graded product, newest and priciest first. */
    public static function products(): array
    {
        static $merged = null;

        if ($merged !== null) {
            return $merged;
        }

        $products = [
                [
                    'slug' => 'apple-iphone-12-bun',
                    'name' => 'Apple iPhone 12',
                    'grade' => 'Bun',
                    'gradeStep' => 1,
                    'priceFrom' => 999,
                    'priceTo' => 999,
                    'dimensions' => '146.7 × 71.5 × 7.40 mm',
                    'weightKg' => 0.164,
                    'variants' => [
                        [
                            'colour' => 'Negru',
                            'colourSlug' => 'black',
                            'storage' => '128 GB',
                            'price' => 999,
                            'inStock' => false,
                            'sku' => 'mgja3rm/a',
                        ],
                        [
                            'colour' => 'Negru',
                            'colourSlug' => 'black',
                            'storage' => '64 GB',
                            'price' => 999,
                            'inStock' => true,
                            'sku' => 'mgj53rm/a',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-12-excelent',
                    'name' => 'Apple iPhone 12',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 999,
                    'priceTo' => 999,
                    'dimensions' => '146.7 × 71.5 × 7.40 mm',
                    'weightKg' => 0.164,
                    'variants' => [
                        [
                            'colour' => 'Negru',
                            'colourSlug' => 'black',
                            'storage' => '64 GB',
                            'price' => 999,
                            'inStock' => true,
                            'sku' => 'mgj53rm/a/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-13-pro-bun',
                    'name' => 'Apple iPhone 13 Pro',
                    'grade' => 'Bun',
                    'gradeStep' => 1,
                    'priceFrom' => 2199,
                    'priceTo' => 2199,
                    'dimensions' => '146.7 × 71.5 × 7.65 mm',
                    'weightKg' => 0.204,
                    'variants' => [
                        [
                            'colour' => 'Argintiu',
                            'colourSlug' => 'silver',
                            'storage' => '512 GB',
                            'price' => 2199,
                            'inStock' => true,
                            'sku' => 'PHT15266',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-bun',
                    'name' => 'Apple iPhone 14',
                    'grade' => 'Bun',
                    'gradeStep' => 1,
                    'priceFrom' => 1500,
                    'priceTo' => 1700,
                    'dimensions' => '146.7 × 71.5 × 7.8 mm',
                    'weightKg' => 0.172,
                    'variants' => [
                        [
                            'colour' => 'Albastru',
                            'colourSlug' => 'blue',
                            'storage' => '128 GB',
                            'price' => 1500,
                            'inStock' => false,
                            'sku' => 'MPVN3RX/A/1',
                        ],
                        [
                            'colour' => 'Albastru',
                            'colourSlug' => 'blue',
                            'storage' => '256 GB',
                            'price' => 1500,
                            'inStock' => false,
                            'sku' => 'MPVN3RX/A/3',
                        ],
                        [
                            'colour' => 'Mov',
                            'colourSlug' => 'purple',
                            'storage' => '128 GB',
                            'price' => 1500,
                            'inStock' => true,
                            'sku' => 'MPV03RX/A',
                        ],
                        [
                            'colour' => 'Starlight',
                            'colourSlug' => 'starlight',
                            'storage' => '128 GB',
                            'price' => 1600,
                            'inStock' => true,
                            'sku' => 'MPUR3RX/A-1',
                        ],
                        [
                            'colour' => 'Starlight',
                            'colourSlug' => 'starlight',
                            'storage' => '256 GB',
                            'price' => 1700,
                            'inStock' => true,
                            'sku' => 'MPVX3RX/A/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-ca-nou',
                    'name' => 'Apple iPhone 14',
                    'grade' => 'Ca nou',
                    'gradeStep' => 3,
                    'priceFrom' => 1700,
                    'priceTo' => 1900,
                    'dimensions' => '146.7 × 71.5 × 7.8 mm',
                    'weightKg' => 0.172,
                    'variants' => [
                        [
                            'colour' => 'Albastru',
                            'colourSlug' => 'blue',
                            'storage' => '256 GB',
                            'price' => 1700,
                            'inStock' => true,
                            'sku' => 'MPWP3RX/A',
                        ],
                        [
                            'colour' => 'Starlight',
                            'colourSlug' => 'starlight',
                            'storage' => '128 GB',
                            'price' => 1750,
                            'inStock' => true,
                            'sku' => 'MPUR3RX/A/1',
                        ],
                        [
                            'colour' => 'Starlight',
                            'colourSlug' => 'starlight',
                            'storage' => '256 GB',
                            'price' => 1900,
                            'inStock' => true,
                            'sku' => 'MPVX3RX/A/3',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-excelent',
                    'name' => 'Apple iPhone 14',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 1650,
                    'priceTo' => 1750,
                    'dimensions' => '146.7 × 71.5 × 7.8 mm',
                    'weightKg' => 0.172,
                    'variants' => [
                        [
                            'colour' => 'Albastru',
                            'colourSlug' => 'blue',
                            'storage' => '128 GB',
                            'price' => 1650,
                            'inStock' => true,
                            'sku' => 'MPVN3RX/A/2',
                        ],
                        [
                            'colour' => 'Albastru',
                            'colourSlug' => 'blue',
                            'storage' => '256 GB',
                            'price' => 1750,
                            'inStock' => true,
                            'sku' => 'MPVN3RX/A',
                        ],
                        [
                            'colour' => 'Midnight',
                            'colourSlug' => 'midnight',
                            'storage' => '256 GB',
                            'price' => 1750,
                            'inStock' => true,
                            'sku' => 'MPVX3RX/A',
                        ],
                        [
                            'colour' => 'Starlight',
                            'colourSlug' => 'starlight',
                            'storage' => '128 GB',
                            'price' => 1650,
                            'inStock' => true,
                            'sku' => 'MPUR3RX/A',
                        ],
                        [
                            'colour' => 'Starlight',
                            'colourSlug' => 'starlight',
                            'storage' => '256 GB',
                            'price' => 1750,
                            'inStock' => true,
                            'sku' => 'MPW43RX/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-plus-ca-nou',
                    'name' => 'Apple iPhone 14 Plus',
                    'grade' => 'Ca nou',
                    'gradeStep' => 3,
                    'priceFrom' => 2100,
                    'priceTo' => 2100,
                    'dimensions' => '160.8 × 78.1 × 7.8 mm',
                    'weightKg' => 0.203,
                    'variants' => [
                        [
                            'colour' => 'Midnight',
                            'colourSlug' => 'midnight',
                            'storage' => '256 GB',
                            'price' => 2100,
                            'inStock' => true,
                            'sku' => 'MQ4X3RX/A/2',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-plus-excelent',
                    'name' => 'Apple iPhone 14 Plus',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 2000,
                    'priceTo' => 2200,
                    'dimensions' => '160.8 × 78.1 × 7.8 mm',
                    'weightKg' => 0.203,
                    'variants' => [
                        [
                            'colour' => 'Albastru',
                            'colourSlug' => 'blue',
                            'storage' => '512 GB',
                            'price' => 2200,
                            'inStock' => true,
                            'sku' => 'MQ5G3RX/A',
                        ],
                        [
                            'colour' => 'Midnight',
                            'colourSlug' => 'midnight',
                            'storage' => '256 GB',
                            'price' => 2000,
                            'inStock' => true,
                            'sku' => 'MQ4X3RX/A/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-pro-bun',
                    'name' => 'Apple iPhone 14 Pro',
                    'grade' => 'Bun',
                    'gradeStep' => 1,
                    'priceFrom' => 2600,
                    'priceTo' => 2600,
                    'dimensions' => '147.5 × 71.5 × 7.8 mm',
                    'weightKg' => 0.206,
                    'variants' => [
                        [
                            'colour' => 'Mov intens',
                            'colourSlug' => 'deep-purple',
                            'storage' => '256 GB',
                            'price' => 2600,
                            'inStock' => true,
                            'sku' => 'MQ1F3RX/A',
                        ],
                        [
                            'colour' => 'Mov intens',
                            'colourSlug' => 'deep-purple',
                            'storage' => '512 GB',
                            'price' => 2600,
                            'inStock' => true,
                            'sku' => 'MQ293RX/A',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '256 GB',
                            'price' => 2600,
                            'inStock' => true,
                            'sku' => 'MQ0T3RX/A',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '512 GB',
                            'price' => 2600,
                            'inStock' => true,
                            'sku' => 'MQ1M3RX/A/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-pro-ca-nou',
                    'name' => 'Apple iPhone 14 Pro',
                    'grade' => 'Ca nou',
                    'gradeStep' => 3,
                    'priceFrom' => 2750,
                    'priceTo' => 2750,
                    'dimensions' => '147.5 × 71.5 × 7.8 mm',
                    'weightKg' => 0.206,
                    'variants' => [
                        [
                            'colour' => 'Mov intens',
                            'colourSlug' => 'deep-purple',
                            'storage' => '256 GB',
                            'price' => 2750,
                            'inStock' => true,
                            'sku' => 'MQ1F3YC/A',
                        ],
                        [
                            'colour' => 'Argintiu',
                            'colourSlug' => 'silver',
                            'storage' => '256 GB',
                            'price' => 2750,
                            'inStock' => true,
                            'sku' => 'MQ103RX/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-pro-excelent',
                    'name' => 'Apple iPhone 14 Pro',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 2600,
                    'priceTo' => 3050,
                    'dimensions' => '147.5 × 71.5 × 7.8 mm',
                    'weightKg' => 0.206,
                    'variants' => [
                        [
                            'colour' => 'Argintiu',
                            'colourSlug' => 'silver',
                            'storage' => '256 GB',
                            'price' => 3050,
                            'inStock' => true,
                            'sku' => 'MQ1W3RX/A',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '256 GB',
                            'price' => 2600,
                            'inStock' => true,
                            'sku' => 'MQ0T3RX/A/1',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '512 GB',
                            'price' => 2750,
                            'inStock' => true,
                            'sku' => 'MQ1M3RX/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-pro-max-bun',
                    'name' => 'Apple iPhone 14 Pro Max',
                    'grade' => 'Bun',
                    'gradeStep' => 1,
                    'priceFrom' => 2899,
                    'priceTo' => 3000,
                    'dimensions' => '160.7 × 77.6 × 7.85 mm',
                    'weightKg' => 0.24,
                    'variants' => [
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '128 GB',
                            'price' => 2899,
                            'inStock' => true,
                            'sku' => 'MQ9P3RX/A',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '256 GB',
                            'price' => 3000,
                            'inStock' => true,
                            'sku' => 'MQ9U3RX/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-pro-max-ca-nou',
                    'name' => 'Apple iPhone 14 Pro Max',
                    'grade' => 'Ca nou',
                    'gradeStep' => 3,
                    'priceFrom' => 2999,
                    'priceTo' => 2999,
                    'dimensions' => '160.7 × 77.6 × 7.85 mm',
                    'weightKg' => 0.24,
                    'variants' => [
                        [
                            'colour' => 'Argintiu',
                            'colourSlug' => 'silver',
                            'storage' => '512 GB',
                            'price' => 2999,
                            'inStock' => true,
                            'sku' => 'MQAH3RX/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-14-pro-max-excelent',
                    'name' => 'Apple iPhone 14 Pro Max',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 3050,
                    'priceTo' => 3050,
                    'dimensions' => '160.7 × 77.6 × 7.85 mm',
                    'weightKg' => 0.24,
                    'variants' => [
                        [
                            'colour' => 'Mov intens',
                            'colourSlug' => 'deep-purple',
                            'storage' => '512 GB',
                            'price' => 3050,
                            'inStock' => false,
                            'sku' => 'MQAM3RX/A',
                        ],
                        [
                            'colour' => 'Argintiu',
                            'colourSlug' => 'silver',
                            'storage' => '512 GB',
                            'price' => 3050,
                            'inStock' => true,
                            'sku' => 'silver, 512GB',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '256 GB',
                            'price' => 3050,
                            'inStock' => true,
                            'sku' => 'MQ9U3RX/A/2',
                        ],
                        [
                            'colour' => 'Negru spațial',
                            'colourSlug' => 'space-black',
                            'storage' => '512 GB',
                            'price' => 3050,
                            'inStock' => true,
                            'sku' => 'MQAF3RX/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-16-pro-max-ca-nou',
                    'name' => 'Apple iPhone 16 Pro Max',
                    'grade' => 'Ca nou',
                    'gradeStep' => 3,
                    'priceFrom' => 4299,
                    'priceTo' => 4299,
                    'dimensions' => '163 × 77.6 × 8.25 mm',
                    'weightKg' => 0.227,
                    'variants' => [
                        [
                            'colour' => 'Titan negru',
                            'colourSlug' => 'black-titanium',
                            'storage' => '256 GB',
                            'price' => 4299,
                            'inStock' => true,
                            'sku' => 'MYWV3ZD/A/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-16-pro-max-excelent',
                    'name' => 'Apple iPhone 16 Pro Max',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 3700,
                    'priceTo' => 3700,
                    'dimensions' => '163 × 77.6 × 8.25 mm',
                    'weightKg' => 0.227,
                    'variants' => [
                        [
                            'colour' => 'Titan natural',
                            'colourSlug' => 'natural-titanium',
                            'storage' => '256 GB',
                            'price' => 3700,
                            'inStock' => false,
                            'sku' => 'MYWY3ZD/A/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-se-bun',
                    'name' => 'Apple iPhone SE',
                    'grade' => 'Bun',
                    'gradeStep' => 1,
                    'priceFrom' => 650,
                    'priceTo' => 650,
                    'dimensions' => '138.4 × 67.3 × 7.3 mm',
                    'weightKg' => 0.144,
                    'variants' => [
                        [
                            'colour' => 'Negru',
                            'colourSlug' => 'black',
                            'storage' => '128 GB',
                            'price' => 650,
                            'inStock' => true,
                            'sku' => 'MMXJ3RM/A',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-se-ca-nou',
                    'name' => 'Apple iPhone SE',
                    'grade' => 'Ca nou',
                    'gradeStep' => 3,
                    'priceFrom' => 700,
                    'priceTo' => 700,
                    'dimensions' => '138.4 × 67.3 × 7.3 mm',
                    'weightKg' => 0.144,
                    'variants' => [
                        [
                            'colour' => 'Negru',
                            'colourSlug' => 'black',
                            'storage' => '128 GB',
                            'price' => 700,
                            'inStock' => true,
                            'sku' => 'MMXJ3RM/1',
                        ],
                    ],
                ],
                [
                    'slug' => 'apple-iphone-se-excelent',
                    'name' => 'Apple iPhone SE',
                    'grade' => 'Excelent',
                    'gradeStep' => 2,
                    'priceFrom' => 800,
                    'priceTo' => 800,
                    'dimensions' => '138.4 × 67.3 × 7.3 mm',
                    'weightKg' => 0.144,
                    'variants' => [
                        [
                            'colour' => 'Negru',
                            'colourSlug' => 'black',
                            'storage' => '256 GB',
                            'price' => 800,
                            'inStock' => true,
                            'sku' => 'mxvt2rm/a',
                        ],
                    ],
                ],
            ];

        // Imagery is keyed by model and colour, never duplicated per
        // product: a product shows the photo of the first colour it is
        // sold in. One file, one name.
        $images = self::colourImages();

        foreach ($products as &$product) {
            $model = self::modelSlug($product['slug']);
            $colour = $product['variants'][0]['colourSlug'] ?? null;
            $image = $images[$model.'|'.$colour] ?? null;

            $product['image'] = $image;
            $product['thumb'] = $image ? preg_replace('/\.\w+$/', '-600.webp', $image) : null;
        }

        unset($product);

        // The Samsung range arrives already in this shape, with its own
        // imagery resolved at generation time.
        $products = [...$products, ...Phones::all()];

        usort($products, fn ($a, $b) => ($b['priceFrom'] ?? 0) <=> ($a['priceFrom'] ?? 0));

        return $merged = $products;
    }

    /** Category metadata by slug, or null when the slug is not ours. */
    public static function category(string $slug): ?array
    {
        foreach (self::categories() as $category) {
            if ($category['slug'] === $slug) {
                return $category;
            }
        }

        return null;
    }

    /**
     * Human labels for the attribute keys, in the order a spec list
     * reads best. Every label a facet or a product page shows comes
     * from here, so one key can never carry two names.
     *
     * @return array<string, string>
     */
    public static function attributeLabels(): array
    {
        return [
            'categorie' => 'Categorie',
            'tip' => 'Tip',
            'producator' => 'Producător',
            'model' => 'Model',
            'diagonala' => 'Diagonală',
            'ecran' => 'Ecran',
            'carcasa' => 'Carcasă',
            'procesor' => 'Procesor',
            'producator-procesor' => 'Producător procesor',
            'video' => 'Chipset video',
            'placa-video' => 'Placă video',
            'ram' => 'RAM',
            'memorie' => 'Stocare',
            'autonomie' => 'Autonomie',
            'conectivitate' => 'Conectivitate',
            'sim' => 'SIM',
            'tehnologie' => 'Tehnologie',
            'sistem' => 'Sistem de operare',
            'culoare' => 'Culoare',
            // Two axes, never one dropdown. `nota` is MYO's condition
            // grade; `ambalaj` is whether the box was opened.
            'nota' => 'Notă de stare',
            'ambalaj' => 'Ambalaj',
            'sloturi' => 'SIM',
            'compatibilitate' => 'Compatibilitate',
            'pret' => 'Preț',
        ];
    }

    /**
     * Keys that name a filter but not a fact about the product. A price
     * band belongs in a dropdown, never in a spec table.
     */
    private const FACET_ONLY = ['pret'];

    /**
     * An imported row's attributes as an ordered list of label/value
     * pairs, ready to print. Facet-only keys are left out.
     *
     * @return list<array{label: string, value: string}>
     */
    public static function specList(array $attributes): array
    {
        $specs = [];

        foreach (self::attributeLabels() as $key => $label) {
            $values = $attributes[$key] ?? [];

            if ($values !== [] && ! in_array($key, self::FACET_ONLY, true)) {
                $specs[] = ['label' => $label, 'value' => implode(', ', $values)];
            }
        }

        return $specs;
    }

/**
     * One price band scheme for the whole catalog.
     *
     * Each category declares its own bands, tuned to its own range —
     * accessories split around 200 and 350 lei, appliances around 1.000
     * and 5.000. Those are right per category and meaningless across
     * them: pooled into one dropdown they overlap and contradict. The
     * catalog-wide listing therefore rebands every product with this,
     * ignoring whatever its category said.
     */
    public static function priceBand(?int $price): string
    {
        return match (true) {
            $price === null => 'Preț la cerere',
            $price < 500 => 'Sub 500 lei',
            $price < 1000 => '500 – 999 lei',
            $price < 2500 => '1.000 – 2.499 lei',
            $price < 5000 => '2.500 – 4.999 lei',
            default => '5.000 lei și peste',
        };
    }

    /**
     * Every product the storefront holds, across every category, in one
     * flat list for the catalog-wide listing.
     *
     * Two attributes are rewritten on the way out: `categorie`, which
     * only means something once categories are mixed, and `pret`, which
     * is rebanded onto the shared scheme above.
     *
     * Note `stare` is deliberately left as each category supplied it and
     * is NOT offered as a catalog-wide facet: a phone's Bun/Excelent/Ca
     * nou grade and an appliance's Sigilat/Openbox packaging state are
     * different claims, and one dropdown listing all five would invite
     * a visitor to read them as one ladder.
     */
    public static function allProducts(): array
    {
        static $all = null;

        if ($all !== null) {
            return $all;
        }

        $all = [];

        foreach (self::categories() as $category) {
            foreach (self::productsInCategory($category['slug']) as $product) {
                $product['category'] = $category['label'];
                $product['categorySlug'] = $category['slug'];
                $product['attributes']['categorie'] = [$category['label']];
                $product['attributes']['pret'] = [self::priceBand($product['price'])];

                $all[] = $product;
            }
        }

        return $all;
    }

    /**
     * What the catalog-wide listing filters and sorts by. Only
     * attributes that mean the same thing in every category can appear.
     *
     * @return array{facets: array<string, string>, sorts: list<array{value: string, label: string}>}
     */
    public static function catalogConfig(): array
    {
        return [
            // `producator` is published for phones and imported devices
            // but not for accessories or appliances, so selecting any
            // manufacturer drops roughly 200 of 277 products rather
            // than showing them as "no manufacturer". That is correct —
            // we do not know who made them — but it reads as a broken
            // filter if you are not expecting it.
            'facets' => self::facets(['categorie', 'producator', 'pret']),
            'sorts' => [
                ['value' => 'name-asc', 'label' => 'Nume, A–Z'],
                ['value' => 'price-asc', 'label' => 'Preț crescător'],
                ['value' => 'price-desc', 'label' => 'Preț descrescător'],
            ],
        ];
    }

    /**
     * Facet keys resolved to their shared labels. Categories declare
     * WHICH attributes they filter on; what those attributes are
     * CALLED is not theirs to decide.
     *
     * @param  list<string>  $keys
     * @return array<string, string>
     */
    private static function facets(array $keys): array
    {
        $labels = self::attributeLabels();

        return array_combine(
            $keys,
            array_map(fn (string $key) => $labels[$key] ?? $key, $keys),
        );
    }

    /**
     * What a category filters and sorts by. Facets are declared per
     * category because a phone and a phone case have nothing in common
     * to filter on: the listing page renders whatever it is handed and
     * knows about neither.
     *
     * @return array{facets: array<string, string>, sorts: list<array{value: string, label: string}>}
     */
    public static function categoryConfig(string $slug): array
    {
        $byPrice = [
            ['value' => 'price-desc', 'label' => 'Preț descrescător'],
            ['value' => 'price-asc', 'label' => 'Preț crescător'],
        ];

        if ($slug === 'telefoane') {
            return [
                'facets' => self::facets([
                    'producator', 'model', 'memorie', 'culoare', 'nota', 'ambalaj',
                ]),
                'sorts' => [...$byPrice, ['value' => 'rank-desc', 'label' => 'Stare, de la cea mai bună']],
            ];
        }

        if ($slug === 'accesorii') {
            return [
                'facets' => self::facets(['tip', 'compatibilitate', 'pret']),
                'sorts' => [...$byPrice, ['value' => 'name-asc', 'label' => 'Nume, A–Z']],
            ];
        }

        $byName = [...$byPrice, ['value' => 'name-asc', 'label' => 'Nume, A–Z']];

        // Facet VALUES are counted from the products, so a dropdown
        // populates itself and disappears when nothing carries the
        // attribute. Which attributes appear is chosen by coverage: an
        // attribute only a handful of rows carry filters more away than
        // it helps, and a single-valued one is not a choice at all.
        if ($slug === 'smeg') {
            return [
                'facets' => self::facets(['tip', 'culoare', 'ambalaj', 'pret']),
                'sorts' => $byName,
            ];
        }

        if ($slug === 'tablete') {
            return [
                'facets' => self::facets(['diagonala', 'memorie', 'ram', 'conectivitate', 'culoare', 'pret']),
                'sorts' => $byName,
            ];
        }

        if ($slug === 'ceasuri') {
            return [
                'facets' => self::facets(['carcasa', 'ecran', 'autonomie', 'culoare', 'ambalaj', 'pret']),
                'sorts' => $byName,
            ];
        }

        if ($slug === 'laptopuri') {
            return [
                'facets' => self::facets(['diagonala', 'procesor', 'ram', 'memorie', 'placa-video', 'pret']),
                'sorts' => $byName,
            ];
        }

        return ['facets' => [], 'sorts' => $byPrice];
    }

    /**
     * Products held for a category, in one shape whatever the category.
     *
     * `attributes` carries whatever that category filters on; `badge`
     * and `meta` are what its card shows. Categories with no data yet
     * return nothing and the page says so.
     */

/**
     * A card badge is a label, not a sentence.
     *
     * The catalog writes packaging state in full — "Openbox - Produs
     * Desigilat" — which wraps to two lines and shouts over the product
     * name. The leading term carries the meaning, so the badge shows
     * that; the full value stays in `attributes`, which is what the
     * filter matches on, so nothing is lost.
     */
    private static function badgeLabel(?string $value): string
    {
        if ($value === null) {
            return '';
        }

        return trim(preg_split('/\s+[-–]\s+/', $value)[0]);
    }

    /**
     * Imported rows already carry their real attributes, so a category
     * only has to say which one reads as the card's badge and which
     * make up its second line.
     *
     * `$badgeKeys` is tried in order and the first attribute a product
     * actually has wins. On a refurbished listing the badge should say
     * what condition the unit is in, and which of the two condition
     * axes a product carries varies per product.
     *
     * @param  list<array<string, mixed>>  $rows
     * @param  string|list<string>  $badgeKeys
     * @param  list<string>  $metaKeys
     */
    private static function fromImport(array $rows, string|array $badgeKeys, array $metaKeys): array
    {
        $badgeKeys = (array) $badgeKeys;

        return array_map(function (array $r) use ($badgeKeys, $metaKeys) {
            $meta = [];
            foreach ($metaKeys as $key) {
                $value = $r['attributes'][$key][0] ?? null;
                if ($value !== null) {
                    $meta[] = $value;
                }
            }

            return [
                'slug' => $r['slug'],
                'name' => $r['name'],
                'price' => $r['price'],
                // Set only when the product is a range, so the card can
                // say "de la" instead of quoting one variant's price as
                // if it were the whole product's.
                'priceMax' => $r['priceMax'] ?? null,
                'wasPrice' => $r['wasPrice'] ?? null,
                'thumb' => $r['thumb'] ?? null,
                'href' => '/produs/'.$r['slug'],
                'badge' => self::badgeLabel(array_reduce(
                    $badgeKeys,
                    fn ($found, $key) => $found ?? ($r['attributes'][$key][0] ?? null),
                )),
                'meta' => implode(' · ', $meta),
                'inStock' => $r['inStock'] ?? true,
                'rank' => 0,
                'attributes' => $r['attributes'],
            ];
        }, $rows);
    }

    public static function productsInCategory(string $slug): array
    {
        if ($slug === 'telefoane') {
            // Every phone, graded or sealed, is one product shape with
            // one condition ladder — see Catalog::grades().
            $graded = array_map(fn (array $p) => [
                'slug' => $p['slug'],
                'name' => $p['name'],
                'price' => $p['priceFrom'],
                'thumb' => $p['thumb'],
                'href' => '/produs/'.$p['slug'],
                'badge' => $p['grade'],
                'meta' => implode(', ', self::sizes($p)),
                'inStock' => (bool) array_filter(array_column($p['variants'], 'inStock')),
                'rank' => $p['gradeStep'],
                'attributes' => [
                    'producator' => [explode(' ', trim($p['name']), 2)[0]],
                    // The model a shopper would name. Everything after
                    // the first comma is specification, not identity:
                    // "Galaxy S24 Ultra", not "Galaxy S24 Ultra, Dual
                    // SIM, 12GB RAM, 5G".
                    'model' => [trim(explode(',', explode(' ', trim($p['name']), 2)[1] ?? $p['name'])[0])],
                    'memorie' => self::sizes($p),
                    'culoare' => array_values(array_unique(array_filter(
                        array_column($p['variants'], 'colour'),
                    ))),
                    'nota' => [$p['grade']],
                ],
            ], self::products());

            return $graded;
        }

        if ($slug === 'smeg') {
            return self::fromImport(Appliances::all(), 'tip', []);
        }

        if ($slug === 'tablete') {
            return self::fromImport(Devices::all('tablete'), 'diagonala', ['ram', 'memorie']);
        }

        if ($slug === 'ceasuri') {
            return self::fromImport(Devices::all('ceasuri'), 'carcasa', ['autonomie']);
        }

        if ($slug === 'laptopuri') {
            return self::fromImport(Devices::all('laptopuri'), 'procesor', ['ram', 'memorie']);
        }

        if ($slug === 'accesorii') {
            return array_map(fn (array $a) => [
                'slug' => $a['slug'],
                'name' => $a['name'],
                'price' => $a['price'],
                'thumb' => $a['thumb'],
                'href' => '/produs/'.$a['slug'],
                'badge' => $a['tip'],
                'meta' => $a['compatibilitate'] === 'Altele' ? '' : $a['compatibilitate'],
                'inStock' => true,
                'rank' => 0,
                'attributes' => [
                    'tip' => [$a['tip']],
                    'compatibilitate' => [$a['compatibilitate']],
                    'pret' => [$a['pret']],
                ],
            ], Accessories::all());
        }

        return [];
    }

    /** Distinct capacities a product is sold in, ascending. */
    private static function sizes(array $product): array
    {
        return Size::sort(array_values(array_unique(array_filter(
            array_column($product['variants'], 'storage'),
        ))));
    }

    /** One product by slug, or null when nothing matches. */
    public static function find(string $slug): ?array
    {
        foreach (self::products() as $product) {
            if ($product['slug'] === $slug) {
                return $product;
            }
        }

        return null;
    }

    /**
     * Product photography keyed by model and colour, because a colour
     * swatch that does not change the picture is not a swatch.
     *
     * @return array<string, string>
     */
    public static function colourImages(): array
    {
        return [
            'apple-iphone-12|black' => '/products/apple-iphone-12-black.webp',
            'apple-iphone-13-pro|silver' => '/products/apple-iphone-13-pro-silver.jpg',
            'apple-iphone-14-plus|blue' => '/products/apple-iphone-14-plus-blue.avif',
            'apple-iphone-14-plus|midnight' => '/products/apple-iphone-14-plus-midnight.avif',
            'apple-iphone-14-pro-max|deep-purple' => '/products/apple-iphone-14-pro-max-deep-purple.webp',
            'apple-iphone-14-pro-max|silver' => '/products/apple-iphone-14-pro-max-silver.webp',
            'apple-iphone-14-pro-max|space-black' => '/products/apple-iphone-14-pro-max-space-black.webp',
            'apple-iphone-14-pro|deep-purple' => '/products/apple-iphone-14-pro-deep-purple.webp',
            'apple-iphone-14-pro|silver' => '/products/apple-iphone-14-pro-silver.avif',
            'apple-iphone-14-pro|space-black' => '/products/apple-iphone-14-pro-space-black.webp',
            'apple-iphone-14|blue' => '/products/apple-iphone-14-blue.avif',
            'apple-iphone-14|midnight' => '/products/apple-iphone-14-midnight.webp',
            'apple-iphone-14|purple' => '/products/apple-iphone-14-purple.webp',
            'apple-iphone-14|starlight' => '/products/apple-iphone-14-starlight.avif',
            'apple-iphone-16-pro-max|black-titanium' => '/products/apple-iphone-16-pro-max-black-titanium.avif',
            'apple-iphone-16-pro-max|natural-titanium' => '/products/apple-iphone-16-pro-max-natural-titanium.avif',
            'apple-iphone-se|black' => '/products/apple-iphone-se-black.avif',
            // The Samsung set is generated, not hand-prepared, so it
            // joins here rather than being pasted in.
            ...Phones::colourImages(),
        ];
    }

    /**
     * Every option the MODEL offers, across all of its grades, plus the
     * full matrix of which combinations actually exist.
     *
     * The product page renders this whole set on every grade, so the
     * colour and capacity rows never reshuffle as the visitor changes
     * their mind. A combination that does not exist is shown and marked,
     * not removed: an option that vanishes takes its information with it
     * ("this colour only comes in Ca nou" is worth knowing).
     *
     * @return array{colours: list<array{slug: string, label: string}>, storages: list<string>, combos: list<array{grade: string, colour: ?string, storage: ?string, slug: string, price: ?int, inStock: bool, sku: ?string, image: ?string, thumb: ?string}>}
     */
    public static function modelMatrix(string $slug): array
    {
        $model = self::modelSlug($slug);

        $siblings = array_values(array_filter(
            self::products(),
            fn ($p) => self::modelSlug($p['slug']) === $model,
        ));

        $colours = [];
        $storages = [];
        $combos = [];

        foreach ($siblings as $product) {
            foreach ($product['variants'] as $variant) {
                if ($variant['colourSlug'] && ! isset($colours[$variant['colourSlug']])) {
                    $colours[$variant['colourSlug']] = $variant['colour'] ?? $variant['colourSlug'];
                }

                if ($variant['storage'] && ! in_array($variant['storage'], $storages, true)) {
                    $storages[] = $variant['storage'];
                }

                $image = self::colourImages()[$model.'|'.$variant['colourSlug']] ?? $product['image'];

                $combos[] = [
                    'grade' => $product['grade'],
                    'colour' => $variant['colourSlug'],
                    'storage' => $variant['storage'],
                    'slug' => $product['slug'],
                    'price' => $variant['price'],
                    'inStock' => $variant['inStock'],
                    'sku' => $variant['sku'],
                    'image' => $image,
                    'thumb' => $image ? preg_replace('/\.\w+$/', '-600.webp', $image) : null,
                ];
            }
        }

        $storages = Size::sort($storages);

        // Colours have no natural order, so they get a stable one.
        // Left alone they follow the order variants happen to arrive
        // in, which is the feed's order for imported products and would
        // shuffle the pills on the next import for no visible reason.
        // This does NOT pick the card photograph — that follows the
        // product's first variant, not this list.
        uasort($colours, self::byName(...));

        return [
            'colours' => array_map(
                fn ($slug, $label) => ['slug' => $slug, 'label' => $label],
                array_keys($colours),
                array_values($colours),
            ),
            'storages' => $storages,
            'combos' => $combos,
        ];
    }

    /**
     * The same model at every condition grade, so the product page can
     * offer state as a third axis beside colour and capacity. Grades the
     * seller does not stock come back unavailable rather than missing,
     * so the ladder always reads as a complete scale.
     *
     * @return list<array{label: string, step: int, note: string, slug: ?string, price: ?int, available: bool}>
     */
    public static function gradesForModel(string $slug): array
    {
        $model = self::modelSlug($slug);
        $siblings = array_filter(
            self::products(),
            fn ($p) => self::modelSlug($p['slug']) === $model,
        );

        return array_map(function (array $grade) use ($siblings) {
            $match = null;

            foreach ($siblings as $sibling) {
                if ($sibling['grade'] === $grade['label']) {
                    $match = $sibling;
                    break;
                }
            }

            return [
                'label' => $grade['label'],
                'step' => $grade['step'],
                'note' => $grade['note'],
                'slug' => $match['slug'] ?? null,
                'price' => $match['priceFrom'] ?? null,
                'available' => $match !== null,
            ];
        }, self::grades());
    }

}
