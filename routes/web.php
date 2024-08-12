<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('SignUpPage'),
        'canRegister' => Route::has('LoginPage'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/', function () {
//     return Inertia::render('Welcome');
// });
// Route::get('/SignUpPage', function () {
//     return Inertia::render('Components.SignUpPage');
// });
// Route::get('/LoginPage', function () {
//     return Inertia::render('Components.LoginPage');
// });

// route  login
Route::get('/login', [LoginController::class, 'loginform'])->name('login');
Route::post('/login', [LoginController::class, 'authenticate']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
