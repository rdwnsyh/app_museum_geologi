<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\InboundController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OutboundController;
use App\Http\Controllers\PeminjamanController;
// use App\Http\Controllers\ManajemenUserController;
use App\Models\KelolaKoleksiSumberDayaGeologi;
use App\Http\Controllers\PersetujuanController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\KelolakoleksiController;
use App\Http\Controllers\ManajemenAdminController;
use App\Http\Controllers\DashboardPeminjamanController;

Route::get('/', [HomeController::class, 'index']);


// Route untuk pencarian dari halaman utama
Route::get('/search', [SearchController::class, 'search'])->name('search');

// Route untuk halaman detail koleksi berdasarkan ID dan tipe
Route::get('/detail/{id}/{type}', [SearchController::class, 'detail'])->name('detail');

// Route untuk halaman (keranjang)
Route::middleware(['auth'])->group(function () {
    // Menampilkan isi keranjang
    Route::get('/keranjang', [PeminjamanController::class, 'showCart'])->name('keranjang');
    // Menambahkan item ke kyeranjang
    Route::post('/keranjang/add', [PeminjamanController::class, 'addToCart'])->name('keranjang.add');
    
    // Proses checkout dari keranjang
    Route::match(['get', 'post', 'put'], '/keranjang/pinjam', [PeminjamanController::class, 'pinjam'])->name('keranjang.pinjam');

    // Proses checkout dari keranjang
    Route::post('/keranjang/checkout', [PeminjamanController::class, 'checkout'])->name('keranjang.checkout');

    // Menghapus item dari keranjang
    Route::delete('/keranjang/remove/{id}', [PeminjamanController::class, 'removeFromCart'])->name('keranjang.remove');
});



// Route Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');


// Route Storage
Route::get('storage', [StorageController::class, 'index'])
    ->name('storage')
    ->middleware('auth');

Route::get('/storage/{storage}/lemari', [StorageController::class, 'showLemari'])
    ->name('storage.Lemari')
    ->middleware('auth');

Route::get('/storage/{storage}/detail', [StorageController::class, 'showDetail'])
    ->name('storage.detail')
    ->middleware('auth');

// Route ke halaman create storage
Route::get('storage/create', [StorageController::class, 'create'])
    ->name('storage.create')
    ->middleware('auth');
// proses create storage
Route::post('storage', [StorageController::class, 'store'])
    ->name('storage.store')
    ->middleware('auth');
// route ke halaman edit storage
    Route::get('storage/{storage}/edit', [StorageController::class, 'edit'])
    ->name('storage.edit')
    ->middleware('auth');
// proses edit storage
Route::put('storage/{storage}', [StorageController::class, 'update'])
    ->name('storage.update')
    ->middleware('auth');
// route ke halaman hapus storage
Route::delete('storage/{storage}', [StorageController::class, 'destroy'])
    ->name('storage.destroy')
    ->middleware('auth');
// proses hapus storage
Route::put('storage/{storage}/restore', [StorageController::class, 'restore'])
    ->name('storage.restore')
    ->middleware('auth');


// Route Peminjaman
Route::get('peminjaman', [DashboardPeminjamanController::class, 'index'])
    ->name('peminjaman')
    ->middleware('auth');
// Route ke halaman create peminjaman
Route::get('peminjaman/create', [DashboardPeminjamanController::class, 'create'])
    ->name('peminjaman.create')
    ->middleware('auth');
// proses create peminjaman
Route::post('peminjaman', [DashboardPeminjamanController::class, 'store'])
    ->name('peminjaman.store')
    ->middleware('auth');
    
// route ke halaman edit peminjaman
    Route::get('peminjaman/{peminjaman}/edit', [DashboardPeminjamanController::class, 'edit'])
    ->name('peminjaman.edit')
    ->middleware('auth');
// proses edit peminjaman
Route::put('peminjaman/{peminjaman}', [DashboardPeminjamanController::class, 'update'])
    ->name('peminjaman.update')
    ->middleware('auth');
// route ke halaman hapus peminjaman
Route::delete('peminjaman/{peminjaman}', [DashboardPeminjamanController::class, 'destroy'])
    ->name('peminjaman.destroy')
    ->middleware('auth');
// proses hapus peminjaman
Route::put('peminjaman/{peminjaman}/restore', [DashboardPeminjamanController::class, 'restore'])
    ->name('peminjaman.restore')
    ->middleware('auth');


// Route Pengembalian
Route::get('pengembalian', [PengembalianController::class, 'index'])
    ->name('pengembalian')
    ->middleware('auth');
// Route ke halaman create pengembalian
Route::get('pengembalian/create', [PengembalianController::class, 'create'])
    ->name('pengembalian.create')
    ->middleware('auth');
// proses create pengembalian
Route::post('pengembalian', [PengembalianController::class, 'store'])
    ->name('pengembalian.store')
    ->middleware('auth');
// route ke halaman edit pengembalian
    Route::get('pengembalian/{pengembalian}/edit', [PengembalianController::class, 'edit'])
    ->name('pengembalian.edit')
    ->middleware('auth');
// proses edit pengembalian
Route::put('pengembalian/{pengembalian}', [PengembalianController::class, 'update'])
    ->name('pengembalian.update')
    ->middleware('auth');
// route ke halaman hapus pengembalian
Route::delete('pengembalian/{pengembalian}', [PengembalianController::class, 'destroy'])
    ->name('pengembalian.destroy')
    ->middleware('auth');
// proses hapus pengembalian
Route::put('pengembalian/{pengembalian}/restore', [PengembalianController::class, 'restore'])
    ->name('pengembalian.restore')
    ->middleware('auth');


// Route Outbond
Route::get('outbound', [OutboundController::class, 'index'])
    ->name('outbound')
    ->middleware('auth');
// Route ke halaman create outbound
Route::get('outbound/create', [OutboundController::class, 'create'])
    ->name('outbound.create')
    ->middleware('auth');
// proses create outbound
Route::post('outbound', [OutboundController::class, 'store'])
    ->name('outbound.store')
    ->middleware('auth');
Route::post('outbound', [OutboundController::class, 'import'])
    ->name('outbound.import')
    ->middleware('auth');
// route ke halaman edit outbound
    Route::get('outbound/{outbound}/edit', [OutboundController::class, 'edit'])
    ->name('outbound.edit')
    ->middleware('auth');
// proses edit outbound
Route::put('outbound/{outbound}', [OutboundController::class, 'update'])
    ->name('outbound.update')
    ->middleware('auth');
// route ke halaman hapus outbound
Route::delete('outbound/{outbound}', [OutboundController::class, 'destroy'])
    ->name('outbound.destroy')
    ->middleware('auth');


// Route Inbound
Route::get('inbound', [InboundController::class, 'index'])
    ->name('inbound')
    ->middleware('auth');
// Route ke halaman create Inbound
Route::get('inbound/create', [InboundController::class, 'create'])
    ->name('inbound.create')
    ->middleware('auth');
// proses create inbound
Route::post('inbound/store', [InboundController::class, 'store'])
    ->name('inbound.store')
    ->middleware('auth');

Route::post('inbound/import', [InboundController::class, 'import'])
    ->name('inbound.import')
    ->middleware('auth');
// route ke halaman edit inbound
    Route::get('inbound/{inbound}/edit', [InboundController::class, 'edit'])
    ->name('inbound.edit')
    ->middleware('auth');
// proses edit inbound
Route::put('inbound/{inbound}', [InboundController::class, 'update'])
    ->name('inbound.update')
    ->middleware('auth');
// route ke halaman hapus inbound
Route::delete('inbound/{inbound}', [InboundController::class, 'destroy'])
    ->name('inbound.destroy')
    ->middleware('auth');
// proses hapus inbound
Route::put('inbound/{inbound}/restore', [InboundController::class, 'restore'])
    ->name('inbound.restore')
    ->middleware('auth');


// // Route Kelola Koleksi 
Route::get('kelolakoleksi', [KelolaKoleksiController::class, 'index'])
    ->name('kelolakoleksi')
    ->middleware('auth');
// Route ke halaman create kelolakoleksi
Route::get('kelolakoleksi/create', [KelolaKoleksiController::class, 'create'])
    ->name('kelolakoleksi.create')
    ->middleware('auth');
// proses create kelolakoleksi
Route::post('kelolakoleksi', [KelolaKoleksiController::class, 'store'])
    ->name('kelolakoleksi.store')
    ->middleware('auth');
// route ke halaman edit kelolakoleksi
    Route::get('kelolakoleksi/{kelolakoleksi}/edit', [KelolaKoleksiController::class, 'edit'])
    ->name('kelolakoleksi.edit')
    ->middleware('auth');
// proses edit kelolakoleksi
Route::put('kelolakoleksi/{kelolakoleksi}', [KelolaKoleksiController::class, 'update'])
    ->name('kelolakoleksi.update')
    ->middleware('auth');
// route ke halaman hapus kelolakoleksi
Route::delete('kelolakoleksi/{kelolakoleksi}', [KelolaKoleksiController::class, 'destroy'])
    ->name('kelolakoleksi.destroy')
    ->middleware('auth');

    Route::get('/kelolakoleksi/export/excel', [KelolaKoleksiController::class, 'exportExcel'])->name('kelolakoleksi.export.excel');
Route::get('/kelolakoleksi/export/pdf', [KelolaKoleksiController::class, 'exportPdf'])->name('kelolakoleksi.export.pdf');

// // Route Kelola Koleksi Batuan
// Route::resource('kelolakoleksibatuan', KelolaKoleksiBatuanController::class)
//     ->middleware('auth');

// // Route Kelola Koleksi Fosil
// Route::resource('kelolakoleksifosil', KelolaKoleksiFosilController::class)
//     ->middleware('auth');

// // Route Kelola Koleksi Sumber Daya Geologi
// Route::resource('kelolakoleksisumberdayageologi', KelolaKoleksiSumberDayaGeologiController::class)
//     ->middleware('auth');




    // Manajemen Admin
Route::get('manajemenadmin', [ManajemenAdminController::class, 'index'])
    ->name('manajemenadmin')
    ->middleware('auth');
// Route ke halaman create manajemenadmin
Route::get('manajemenadmin/create', [ManajemenAdminController::class, 'create'])
    ->name('manajemenadmin.create')
    ->middleware('auth');
// proses create manajemenadmin
Route::post('manajemenadmin', [ManajemenAdminController::class, 'store'])
    ->name('manajemenadmin.store')
    ->middleware('auth');
// route ke halaman edit manajemenadmin
    Route::get('manajemenadmin/{manajemenadmin}/edit', [ManajemenAdminController::class, 'edit'])
    ->name('manajemenadmin.edit')
    ->middleware('auth');
// proses edit manajemenadmin
Route::put('manajemenadmin/{manajemenadmin}', [ManajemenAdminController::class, 'update'])
    ->name('manajemenadmin.update')
    ->middleware('auth');
// route ke halaman hapus manajemenadmin
Route::delete('manajemenadmin/{manajemenadmin}', [ManajemenAdminController::class, 'destroy'])
    ->name('manajemenadmin.destroy')
    ->middleware('auth');
// proses hapus manajemenadmin
Route::put('manajemenadmin/{manajemenadmin}/restore', [ManajemenAdminController::class, 'restore'])
    ->name('manajemenadmin.restore')
    ->middleware('auth');   


    // persetujuan
Route::get('persetujuan', [PersetujuanController::class, 'index'])
    ->name('persetujuan')
    ->middleware('auth');
// Route ke halaman create persetujuan
Route::get('persetujuan/create', [PersetujuanController::class, 'create'])
    ->name('persetujuan.create')
    ->middleware('auth');
// proses create persetujuan
Route::post('persetujuan', [PersetujuanController::class, 'store'])
    ->name('persetujuan.store')
    ->middleware('auth');
// route ke halaman edit persetujuan
    Route::get('persetujuan/{persetujuan}/edit', [PersetujuanController::class, 'edit'])
    ->name('persetujuan.edit')
    ->middleware('auth');
// proses edit persetujuan
Route::put('persetujuan/{persetujuan}', [PersetujuanController::class, 'update'])
    ->name('persetujuan.update')
    ->middleware('auth');
// route ke halaman hapus persetujuan
Route::delete('persetujuan/{persetujuan}', [PersetujuanController::class, 'destroy'])
    ->name('persetujuan.destroy')
    ->middleware('auth');
// proses hapus persetujuan
Route::put('persetujuan/{persetujuan}/restore', [PersetujuanController::class, 'restore'])
    ->name('persetujuan.restore')
    ->middleware('auth');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
