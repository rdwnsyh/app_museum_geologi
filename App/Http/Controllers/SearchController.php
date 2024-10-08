<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\KelolaKoleksiFosil;
use App\Models\KelolaKoleksiBatuan;
use App\Models\KelolaKoleksiSumberDayaGeologi;

class SearchController extends Controller
{
    // Method untuk pencarian berdasarkan nama koleksi
    // SearchController.php

public function search(Request $request)
{
    $search = $request->input('search');

    // Query to search collections based on name in multiple tables
    $results = KelolaKoleksi::filter(['search' => $search])->get(); // Searching across the relevant table

    // dd($results);

    // Render new page to display search results
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
            case 'koleksi':
                $item = KelolaKoleksi::findOrFail($id);
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
