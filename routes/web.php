<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

/*
 * Surfaces not yet built. They resolve to a marked placeholder in the
 * committed world rather than a 404, so nothing on the homepage is a
 * broken promise. Each is replaced as its real surface lands.
 */
$pending = fn (string $title, string $note) => fn () => Inertia::render('Pending', [
    'title' => $title,
    'note' => $note,
]);

Route::get('/magazin', CatalogController::class)->name('shop');
Route::get('/cum-notam', $pending('Cum notăm aparatele', 'Procesul de testare și scara de stare, explicate pas cu pas.'))->name('grading');
Route::get('/categorie/{slug}', CategoryController::class)->name('category')->where('slug', '[a-z0-9-]+');
Route::get('/produs/{slug}', ProductController::class)->name('product')->where('slug', '[a-z0-9-]+');
Route::get('/cos', $pending('Coș', 'Coșul și finalizarea comenzii, cu plată în rate prin LeanPay și TBI Credit.'))->name('cart');
Route::get('/help/trimite-un-produs-in-service', fn () => Inertia::render('Service', [
    'categories' => App\Data\Catalog::categories(),
    'company' => App\Data\Catalog::company(),
]))->name('service');

Route::get('/help/returneaza-un-produs', fn () => Inertia::render('Retur', [
    'categories' => App\Data\Catalog::categories(),
    'company' => App\Data\Catalog::company(),
    // The client's own FanCourier return-AWB endpoint, as linked on the
    // live page. Replace if their courier account changes.
    'courierUrl' => 'https://retur.fancourier.ro/generare-retur-curier/1289820',
]))->name('returns');

Route::get('/help/termeni-si-conditii', fn () => Inertia::render('Termeni', [
    'categories' => App\Data\Catalog::categories(),
    'company' => App\Data\Catalog::company(),
]))->name('terms');

Route::get('/help/politica-de-confidentialitate', fn () => Inertia::render('Confidentialitate', [
    'categories' => App\Data\Catalog::categories(),
    'company' => App\Data\Catalog::company(),
    // Published by the client inside this policy. Note it differs from
    // the phone shown elsewhere on their site — see PRODUCT.md.
    'contactEmail' => 'contact@myomobile.ro',
    'dpoPhone' => '0758 808 911',
]))->name('privacy');

// Catch-all: keep it LAST, or a specific /help/x below is shadowed.
Route::get('/help/{slug}', $pending('Informații', 'Termeni, confidențialitate, retur și service.'))->name('help')->where('slug', '[a-z0-9-]+');
