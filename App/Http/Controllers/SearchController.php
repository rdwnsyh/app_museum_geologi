<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiFosil;
use App\Models\KelolaKoleksiBatuan;
use App\Models\KelolaKoleksiSumberDayaGeologi;

class SearchController extends Controller
{
    // Method untuk pencarian berdasarkan nama koleksi
    public function search(Request $request)
    {
        $search = $request->input('search');

        // Query untuk mencari nama koleksi dari tiga tabel
        $batuan = KelolaKoleksiBatuan::where('nama_koleksi', 'like', '%' . $search . '%')->get();
        // $fosil = KelolaKoleksiFosil::where('nama_koleksi', 'like', '%' . $search . '%')->get();
        // $sdg = KelolaKoleksiSumberDayaGeologi::where('nama_koleksi', 'like', '%' . $search . '%')->get();

        // Gabungkan hasil pencarian dari ketiga tabel
        $results = $batuan;

    //     $search = $request->input('search');

    // // Query untuk mencari nama koleksi dari tiga tabel
    // $batuan = KelolaKoleksiBatuan::where('nama_koleksi', 'like', '%' . $search . '%')->get()->map(function ($item) {
    //     $item->type = 'batuan';
    //     return $item;
    // });

    // $fosil = KelolaKoleksiFosil::where('nama_koleksi', 'like', '%' . $search . '%')->get()->map(function ($item) {
    //     $item->type = 'fosil';
    //     return $item;
    // });

    // $sdg = KelolaKoleksiSumberDayaGeologi::where('nama_koleksi', 'like', '%' . $search . '%')->get()->map(function ($item) {
    //     $item->type = 'sdg';
    //     return $item;
    // });

    // // Gabungkan hasil pencarian dari ketiga tabel
    // $results = $batuan->merge($fosil)->merge($sdg);

        // Render halaman baru untuk menampilkan hasil pencarian
        return Inertia::render('KoleksiMuseum', [
            'results' => $results,
            'searchQuery' => $search,
        ]);
    }

    // Method untuk menampilkan detail koleksi berdasarkan ID dan tipe (table)
    public function detail($id, $type)
    {
        // Temukan data berdasarkan tipe (table) dan ID
        switch ($type) {
            case 'batuan':
                $item = KelolaKoleksiBatuan::findOrFail($id);
                break;
            case 'fosil':
                $item = KelolaKoleksiFosil::findOrFail($id);
                break;
            case 'sdg':
                $item = KelolaKoleksiSumberDayaGeologi::findOrFail($id);
                break;
            default:
                abort(404); // Jika tipe tidak ditemukan
        }

        // Render halaman detail koleksi
        return Inertia::render('DetailKoleksi', [
            'item' => $item,
            'type' => $type, // Untuk keperluan navigasi frontend
        ]);
    }
}
