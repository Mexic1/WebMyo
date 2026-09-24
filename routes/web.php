<?php

use App\Http\Controllers\HomeController;
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

Route::get('/magazin', $pending('Catalog', 'Catalogul complet, cu filtrare după notă de stare.'))->name('shop');
Route::get('/cum-notam', $pending('Cum notăm aparatele', 'Procesul de testare și scara de stare, explicate pas cu pas.'))->name('grading');
Route::get('/categorie/{slug}', $pending('Categorie', 'Listarea pe categorie.'))->name('category');
Route::get('/produs/{slug}', $pending('Produs', 'Pagina de produs, cu starea și istoricul unității.'))->name('product');
Route::get('/help/{slug}', $pending('Informații', 'Termeni, confidențialitate, retur și service.'))->name('help');
