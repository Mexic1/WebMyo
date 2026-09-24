<?php

namespace App\Data;

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
    public const TOTAL_PRODUCTS = 446;

    /**
     * The condition ladder. Three steps, not four: only these 19 products
     * carry a grade at all, and all of them are iPhones.
     *
     * @return list<array{label: string, step: int, note: string}>
     */
    public static function grades(): array
    {
        return [
            ['label' => 'Bun', 'step' => 1, 'note' => 'Urme de folosire vizibile. Funcțional complet.'],
            ['label' => 'Excelent', 'step' => 2, 'note' => 'Urme minime, vizibile de aproape.'],
            ['label' => 'Ca nou', 'step' => 3, 'note' => 'Fără urme vizibile de folosire.'],
        ];
    }

    /** @return list<array{label: string, href: string, count: int}> */
    public static function categories(): array
    {
        return [
            ['label' => 'Telefoane', 'href' => '/categorie/telefoane', 'count' => 145],
            ['label' => 'Accesorii', 'href' => '/categorie/accesorii', 'count' => 171],
            ['label' => 'Smeg', 'href' => '/categorie/smeg', 'count' => 42],
            ['label' => 'Tablete', 'href' => '/categorie/tablete', 'count' => 29],
            ['label' => 'Ceasuri', 'href' => '/categorie/ceasuri', 'count' => 20],
            ['label' => 'Laptopuri', 'href' => '/categorie/laptopuri', 'count' => 13],
        ];
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
    public static function specsFor(string $slug): ?array
    {
        $model = preg_replace('/-(excelent|ca-nou|bun)$/', '', $slug);

        return self::specs()[$model] ?? null;
    }

    /** Every graded product, newest and priciest first. */
    public static function products(): array
    {
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
            $model = preg_replace('/-(excelent|ca-nou|bun)$/', '', $product['slug']);
            $colour = $product['variants'][0]['colourSlug'] ?? null;
            $image = $images[$model.'|'.$colour] ?? null;

            $product['image'] = $image;
            $product['thumb'] = $image ? preg_replace('/\.\w+$/', '-600.webp', $image) : null;
        }

        unset($product);

        usort($products, fn ($a, $b) => ($b['priceFrom'] ?? 0) <=> ($a['priceFrom'] ?? 0));

        return $products;
    }

    /** Category metadata by slug, or null when the slug is not ours. */
    public static function category(string $slug): ?array
    {
        foreach (self::categories() as $category) {
            if ($category['href'] === '/categorie/'.$slug) {
                return $category + ['slug' => $slug];
            }
        }

        return null;
    }

    /**
     * Products held for a category.
     *
     * Only phones are populated today: the 19 graded iPhones are the
     * whole of what we hold. The other categories are declared with
     * their real live counts but carry no products until the catalog
     * migration runs, so they render an honest empty state rather than
     * a 404. See PRODUCT.md.
     */
    public static function productsInCategory(string $slug): array
    {
        return $slug === 'telefoane' ? self::products() : [];
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
        $model = preg_replace('/-(excelent|ca-nou|bun)$/', '', $slug);

        $siblings = array_values(array_filter(
            self::products(),
            fn ($p) => preg_replace('/-(excelent|ca-nou|bun)$/', '', $p['slug']) === $model,
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

        usort($storages, fn ($a, $b) => (int) $a <=> (int) $b);

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
        $model = preg_replace('/-(excelent|ca-nou|bun)$/', '', $slug);
        $siblings = array_filter(
            self::products(),
            fn ($p) => preg_replace('/-(excelent|ca-nou|bun)$/', '', $p['slug']) === $model,
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
