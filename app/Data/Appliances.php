<?php

namespace App\Data;

/**
 * SMEG appliances — 42 products, imported from the client's own
 * WooCommerce Store API on 2026-09-25. Generated file: edit the
 * importer, not this.
 *
 *     scripts/normalise_store_api.py && scripts/generate_data_classes.py
 *
 * `culoare`, `stare` and `pret` are REAL published attributes.
 * `tip` is DERIVED from the product name (14 values: Aparat de spumare, Blender, Cântar, Espressor, Fierbător, Frigider, Mixer, Pachet, Râșniță, Răcitor de vin, Storcător, Tigaie, Toaster, Vas de gătit)
 * because the catalog carries no product-type attribute for this range.
 * It is good enough to filter 42 products and should be replaced by a
 * real attribute at migration.
 *
 * `stare` here is the packaging state — "Sigilat" / "Openbox - Produs
 * Desigilat" — NOT the Bun/Excelent/Ca nou condition ladder. The two are
 * different axes and must not be conflated.
 */
class Appliances
{
    /**
     * @return list<array{slug: string, name: string, price: int, priceMax: ?int, wasPrice: ?int, thumb: ?string, inStock: bool, attributes: array<string, list<string>>}>
     */
    public static function all(): array
    {
        // Rebuilt on every call otherwise, and the category nav counts
        // this on every page.
        static $rows = null;

        return $rows ??= [
            ['slug' => 'aparat-de-spumare-a-laptelui-smeg-50s-style-500w', 'name' => 'Aparat de spumare a laptelui Smeg 50’s Style, 500W', 'price' => 750, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/aparat-de-spumare-a-laptelui-smeg-50s-style-500w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Aparat de spumare'], 'culoare' => ['Black', 'Cream', 'Pastel Green', 'Pink', 'Red', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'aparat-spumare-lapte-smeg-50s-style-500w', 'name' => 'Aparat spumare lapte Smeg 50’s Style, 500W', 'price' => 750, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/aparat-spumare-lapte-smeg-50s-style-500w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Aparat de spumare'], 'culoare' => ['Pink', 'White'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'blender-smeg-50s-style-blf03-800w', 'name' => 'Blender Smeg 50’s Style BLF03, 800W', 'price' => 950, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/blender-smeg-50s-style-blf03-800w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Blender'], 'culoare' => ['Black', 'Cream', 'Pastel Green', 'Red', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'blender-smeg-50s-style-blc01-1400w', 'name' => 'Blender Smeg 50’s Style, BLC01, 1400W', 'price' => 1650, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/blender-smeg-50s-style-blc01-1400w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Blender'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'blender-smeg-50s-style-blf01-800w', 'name' => 'Blender Smeg 50’s Style, BLF01, 800W', 'price' => 850, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/blender-smeg-50s-style-blf01-800w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Blender'], 'culoare' => ['Cream', 'Pastel Blue', 'Pastel Green', 'Silver', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'blender-smeg-50s-style-pbf01-300w', 'name' => 'Blender Smeg 50’s Style, PBF01, 300W', 'price' => 500, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/blender-smeg-50s-style-pbf01-300w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Blender'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'blender-smeg-50s-styles-hbf03-700w', 'name' => 'Blender Smeg 50’s Styles HBF03, 700W', 'price' => 500, 'priceMax' => 550, 'wasPrice' => null, 'thumb' => '/products/smeg/blender-smeg-50s-styles-hbf03-700w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Blender'], 'culoare' => ['Black', 'Cream'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'cantar-de-bucatarie-digital-smeg-50s-style', 'name' => 'Cântar de bucătărie digital Smeg 50’s Style', 'price' => 600, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/cantar-de-bucatarie-digital-smeg-50s-style-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Cântar'], 'culoare' => ['Black', 'Emerald Green', 'Storm Blue', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'espressor-smeg-50s-style-1350w', 'name' => 'Espressor Smeg 50’s Style, 1350W', 'price' => 1400, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/espressor-smeg-50s-style-1350w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Espressor'], 'culoare' => ['Black', 'Pastel Blue', 'Red'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'espressor-smeg-50s-style-dcf02-1050w', 'name' => 'Espressor Smeg 50’s Style, DCF02, 1050W', 'price' => 900, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/espressor-smeg-50s-style-dcf02-1050w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Espressor'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'Slate Grey', 'Steel', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'espressor-smeg-50s-style-ecf02-1350w', 'name' => 'Espressor Smeg 50’s Style, ECF02, 1350W', 'price' => 1400, 'priceMax' => 1650, 'wasPrice' => null, 'thumb' => '/products/smeg/espressor-smeg-50s-style-ecf02-1350w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Espressor'], 'culoare' => ['Black', 'Cream', 'Pastel Green', 'Pink', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'fierbator-smeg-50s-style-kfl03-2400w-1-7-l', 'name' => 'Fierbător Smeg 50’s Style, KFL03, 2400W, 1.7 L', 'price' => 650, 'priceMax' => 750, 'wasPrice' => null, 'thumb' => '/products/smeg/fierbator-smeg-50s-style-kfl03-2400w-1-7-l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Fierbător'], 'culoare' => ['Black', 'Black Matte', 'Champagne', 'Cream', 'Emerald Green', 'Mediterranean Blue', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'Slate Grey', 'Steel', 'Storm Blue', 'White', 'White Matte'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'fierbator-smeg-50s-style-kfl05-0-8-l', 'name' => 'Fierbător Smeg 50’s Style, KFL05, 0.8 L', 'price' => 500, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/fierbator-smeg-50s-style-kfl05-0-8-l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Fierbător'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'fierbator-smeg-50s-style-klf04-2400w-1-7-l', 'name' => 'Fierbător Smeg 50’s Style, KLF04, 2400W, 1.7 L', 'price' => 730, 'priceMax' => 790, 'wasPrice' => null, 'thumb' => '/products/smeg/fierbator-smeg-50s-style-klf04-2400w-1-7-l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Fierbător'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'Steel', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'frigider-smeg-50s-style-fab28', 'name' => 'Frigider Smeg 50’s Style, FAB28', 'price' => 6000, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/frigider-smeg-50s-style-fab28-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Frigider'], 'culoare' => ['Black', 'Cream', 'Pastel Green'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['5.000 lei și peste']]],
            ['slug' => 'frigider-smeg-50s-style-fab30', 'name' => 'Frigider Smeg 50’s Style, FAB30', 'price' => 6000, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/frigider-smeg-50s-style-fab30-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Frigider'], 'culoare' => ['Blue', 'Silver'], 'pret' => ['5.000 lei și peste']]],
            ['slug' => 'frigider-smeg-50s-style-fab32', 'name' => 'Frigider Smeg 50’s Style, FAB32', 'price' => 6999, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/frigider-smeg-50s-style-fab32-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Frigider'], 'pret' => ['5.000 lei și peste']]],
            ['slug' => 'mixer-smeg-50s-style-800w', 'name' => 'Mixer Smeg 50’s Style, 800W', 'price' => 2200, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-smeg-50s-style-800w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'mixer-smeg-50s-style-smf02creu-800w-48-l', 'name' => 'Mixer Smeg 50’s Style, SMF02CREU, 800W, 4,8 L', 'price' => 2200, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-smeg-50s-style-smf02creu-800w-48-l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'mixer-smeg-50s-style-smf03-800w-4-8l', 'name' => 'Mixer Smeg 50’s Style, SMF03, 800W, 4.8L', 'price' => 1600, 'priceMax' => 2400, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-smeg-50s-style-smf03-800w-4-8l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'culoare' => ['Black', 'Cream', 'Pastel Green', 'Pink', 'Red', 'Slate Grey', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'mixer-smeg-50s-style-smf13wheu-800w-48-l', 'name' => 'Mixer Smeg 50’s Style, SMF13WHEU, 800W, 4,8 L', 'price' => 2500, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-smeg-50s-style-smf13wheu-800w-48-l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['2.500 – 4.999 lei']]],
            ['slug' => 'mixer-smeg-50s-style-smf23bleu-800w-48-l', 'name' => 'Mixer Smeg 50’s Style, SMF23BLEU, 800W, 4,8 L', 'price' => 2400, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-smeg-50s-style-smf23bleu-800w-48-l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'mixer-de-mana-smeg-50s-style-hbf11-700w', 'name' => 'Mixer de mână Smeg 50’s Style, HBF11, 700W', 'price' => 400, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-de-mana-smeg-50s-style-hbf11-700w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'culoare' => ['Black', 'Cream', 'Red'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'mixer-de-mana-smeg-50s-style-hmf01', 'name' => 'Mixer de mână Smeg 50’s Style, HMF01', 'price' => 630, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-de-mana-smeg-50s-style-hmf01-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'mixer-vertical-smeg-50s-style-700w-4-8l', 'name' => 'Mixer vertical Smeg 50’s Style, 700W, 4.8L', 'price' => 1000, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/mixer-vertical-smeg-50s-style-700w-4-8l-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Mixer'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'pachet-toaster-smeg-fierbator-smeg', 'name' => 'Pachet Toaster Smeg + Fierbător Smeg', 'price' => 999, 'priceMax' => null, 'wasPrice' => 1150, 'thumb' => '/products/smeg/pachet-toaster-smeg-fierbator-smeg-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Pachet'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'rasnita-de-cafea-smeg-50s-style-lpgjd', 'name' => 'Râșniță de cafea Pavoni, LPGJD', 'price' => 1899, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/rasnita-de-cafea-smeg-50s-style-lpgjd-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Râșniță'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'rasnita-de-cafea-smeg-50s-style-150w', 'name' => 'Râșniță de cafea Smeg 50’s Style, 150W', 'price' => 1000, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/rasnita-de-cafea-smeg-50s-style-150w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Râșniță'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'rasnita-de-cafea-smeg-50s-style-cgf02', 'name' => 'Râșniță de cafea Smeg 50’s Style, CGF02', 'price' => 1150, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/rasnita-de-cafea-smeg-50s-style-cgf02-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Râșniță'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'rasnita-de-cafea-smeg-50s-style-cgf11', 'name' => 'Râșniță de cafea Smeg 50’s Style, CGF11', 'price' => 1000, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/rasnita-de-cafea-smeg-50s-style-cgf11-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Râșniță'], 'pret' => ['1.000 – 2.499 lei']]],
            ['slug' => 'racitor-de-vin-incorporabil-smeg-50s-style', 'name' => 'Răcitor de vin incorporabil Smeg 50’s Style', 'price' => 6500, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/racitor-de-vin-incorporabil-smeg-50s-style-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Răcitor de vin'], 'pret' => ['5.000 lei și peste']]],
            ['slug' => 'storcator-de-citrice-smeg-50s-style-70w', 'name' => 'Storcător de citrice Smeg 50’s Style, 70W', 'price' => 670, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/storcator-de-citrice-smeg-50s-style-70w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Storcător'], 'culoare' => ['Black', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'White Matte'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'storcator-de-citrice-smeg-50s-style-cjf11-70w', 'name' => 'Storcător de citrice Smeg 50’s Style, CJF11, 70W', 'price' => 670, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/storcator-de-citrice-smeg-50s-style-cjf11-70w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Storcător'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'tigaie-smeg-50s-style-26cm', 'name' => 'Tigaie Smeg 50’s Style, 26cm', 'price' => 600, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/tigaie-smeg-50s-style-26cm-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Tigaie'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'tigaie-smeg-50s-style-28cm', 'name' => 'Tigaie Smeg 50’s Style, 28cm', 'price' => 600, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/tigaie-smeg-50s-style-28cm-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Tigaie'], 'culoare' => ['Cream', 'Red'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'tigaie-smeg-50s-style-30cm', 'name' => 'Tigaie Smeg 50’s Style, 30cm', 'price' => 600, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/tigaie-smeg-50s-style-30cm-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Tigaie'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'tigaie-wok-smeg-50s-style', 'name' => 'Tigaie WOK Smeg 50’s Style', 'price' => 600, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/tigaie-wok-smeg-50s-style-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Tigaie'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'toaster-smeg-50s-style-2000w', 'name' => 'Toaster Smeg 50’s Style, 2000W', 'price' => 850, 'priceMax' => 950, 'wasPrice' => null, 'thumb' => '/products/smeg/toaster-smeg-50s-style-2000w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Toaster'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pink', 'Steel'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'toaster-smeg-50s-style-tsf01-950w', 'name' => 'Toaster Smeg 50’s Style, TSF01, 950W', 'price' => 650, 'priceMax' => 750, 'wasPrice' => null, 'thumb' => '/products/smeg/toaster-smeg-50s-style-tsf01-950w-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Toaster'], 'culoare' => ['Black', 'Black Matte', 'Champagne', 'Cream', 'Emerald Green', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'Rose Gold', 'Slate Grey', 'Storm Blue', 'Union Blue', 'White', 'White Matte'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'toaster-extra-wide-smeg-50s-style', 'name' => 'Toaster extra-wide Smeg 50’s Style', 'price' => 750, 'priceMax' => 850, 'wasPrice' => null, 'thumb' => '/products/smeg/toaster-extra-wide-smeg-50s-style-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Toaster'], 'culoare' => ['Black', 'Cream', 'Pastel Blue', 'Pastel Green', 'Pink', 'Red', 'Steel', 'White'], 'stare' => ['Openbox - Produs Desigilat', 'Sigilat'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'vas-de-gatit-smeg-50s-style-ckfs2011', 'name' => 'Vas de gătit Smeg 50’s Style, CKFS2011', 'price' => 600, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/vas-de-gatit-smeg-50s-style-ckfs2011-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Vas de gătit'], 'pret' => ['Sub 1.000 lei']]],
            ['slug' => 'vas-pentru-gatit-smeg-50s-style-26cm', 'name' => 'Vas pentru gătit Smeg 50’s Style, 26cm', 'price' => 700, 'priceMax' => null, 'wasPrice' => null, 'thumb' => '/products/smeg/vas-pentru-gatit-smeg-50s-style-26cm-500.webp', 'inStock' => true, 'attributes' => ['tip' => ['Vas de gătit'], 'pret' => ['Sub 1.000 lei']]],
        ];
    }

    /** One appliance by slug, or null when nothing matches. */
    public static function find(string $slug): ?array
    {
        foreach (self::all() as $appliance) {
            if ($appliance['slug'] === $slug) {
                return $appliance;
            }
        }

        return null;
    }

    /** Other appliances of the same derived type. */
    public static function related(array $appliance, int $limit = 4): array
    {
        $tip = $appliance['attributes']['tip'][0] ?? null;

        return array_slice(array_values(array_filter(
            self::all(),
            fn ($a) => $a['slug'] !== $appliance['slug']
                && ($a['attributes']['tip'][0] ?? null) === $tip,
        )), 0, $limit);
    }

    /**
     * Price band for a value in lei. Kept here so an importer applies
     * the same bands the facet declares.
     */
    public static function band(int $price): string
    {
        return match (true) {
            $price < 1000 => 'Sub 1.000 lei',
            $price < 2500 => '1.000 – 2.499 lei',
            $price < 5000 => '2.500 – 4.999 lei',
            default => '5.000 lei și peste',
        };
    }
}
