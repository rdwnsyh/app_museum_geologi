<?php

use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\KelolakoleksiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\ManajemenAdminController;
use App\Http\Controllers\ManajemenUserController;
use App\Http\Controllers\PersetujuanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('storage', [StorageController::class, 'index'])
    ->name('storage')
    ->middleware('auth');

Route::get('peminjaman', [PeminjamanController::class, 'index'])
    ->name('peminjaman')
    ->middleware('auth');

Route::get('pengembalian', [PengembalianController::class, 'index'])
    ->name('pengembalian')
    ->middleware('auth');

Route::get('kelolakoleksi', [KelolakoleksiController::class, 'index'])
    ->name('kelolakoleksi')
    ->middleware('auth');

Route::get('manajemenadmin', [ManajemenAdminController::class, 'index'])
    ->name('manajemenadmin')
    ->middleware('auth');

Route::get('manajemenuser', [ManajemenUserController::class, 'index'])
    ->name('manajemenuser')
    ->middleware('auth');

Route::get('persetujuan', [PersetujuanController::class, 'index'])
    ->name('persetujuan')
    ->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
