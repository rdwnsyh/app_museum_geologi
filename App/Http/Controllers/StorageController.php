<?php

namespace App\Http\Controllers;

use App\Models\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Define the filter parameters with default values
        $filters = $request->only(['lokasi_penyimpanan', 'lantai', 'no_lajur']);

        // Query the Storage model, applying filters if provided
        $kelolakoleksi = Storage::query()
            ->when($filters['lokasi_penyimpanan'] ?? null, function ($query, $lokasi_penyimpanan) {
                return $query->where('lokasi_penyimpanan', 'like', "%{$lokasi_penyimpanan}%");
            })
            ->when($filters['lantai'] ?? null, function ($query, $lantai) {
                return $query->where('lantai', $lantai);
            })
            ->when($filters['no_lajur'] ?? null, function ($query, $no_lajur) {
                return $no_lajur === 'non' 
                    ? $query->whereNull('no_lajur') 
                    : $query->where('no_lajur', $no_lajur);
            })
            ->paginate(10);  // Adjust pagination limit as needed

        // Return the data to the Inertia view
        return Inertia::render('Storage/Index', [
            'kelolakoleksi' => $kelolakoleksi,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Storage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        //
    }

    public function showLemari(Request $request)
    {
        // Mendapatkan filter dari request
        $filters = $request->only([
            'lokasi_penyimpanan',
            'lantai',
            'no_lajur',
            'no_lemari',
            'no_laci',
            'no_slot',
        ]);

        // Query untuk mendapatkan data berdasarkan filter yang diberikan
        $kelolakoleksi = Storage::query()
            ->when($filters['lokasi_penyimpanan'] ?? null, function ($query, $lokasi_penyimpanan) {
                return $query->where('lokasi_penyimpanan', 'like', "%{$lokasi_penyimpanan}%");
            })
            ->when($filters['lantai'] ?? null, function ($query, $lantai) {
                return $query->where('lantai', 'like', "%{$lantai}%");
            })
            ->when($filters['no_lajur'] ?? null, function ($query, $no_lajur) {
                return $query->when($no_lajur === 'non', function ($query) {
                    return $query->whereNull('no_lajur');
                }, function ($query) use ($no_lajur) {
                    return $query->where('no_lajur', $no_lajur);
                });
            })
            ->when($filters['no_lemari'] ?? null, function ($query, $no_lemari) {
                return $query->where('no_lemari', $no_lemari);
            })
            ->when($filters['no_laci'] ?? null, function ($query, $no_laci) {
                return $query->where('no_laci', $no_laci);
            })
            ->when($filters['no_slot'] ?? null, function ($query, $no_slot) {
                return $query->where('no_slot', $no_slot);
            })
            ->paginate(10); // Pagination dengan 10 item per halaman

        // Mengirim data dan filter ke frontend
        return Inertia::render('Storage/Lemari', [
            'kelolakoleksi' => $kelolakoleksi,
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function showDetail($id)
    {
        // Ambil data koleksi berdasarkan ID dari tabel kelolakoleksi
        $item = Storage::find($id);

        // Jika data koleksi tidak ditemukan, redirect dengan pesan error
        if (!$item) {
            return redirect()->route('koleksi.index')->with('error', 'Koleksi tidak ditemukan.');
        }

        // Kirim data koleksi ke halaman detail
        return inertia('Detail', [
            'item' => $item,  // Kirim data koleksi ke frontend
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Storage $storage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Storage $storage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Storage $storage)
    {
        //
    }
}
