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
        $filters = $request->only([
            'lokasi_penyimpanan',
            'lantai',
            'no_lajur',
        ]);
    
        // Fetch distinct options from database
        $lokasi_penyimpananOptions = Storage::distinct()->pluck('lokasi_penyimpanan');
        $lantaiOptions = Storage::distinct()->pluck('lantai');
        $noLajurOptions = Storage::distinct()->pluck('no_lajur');
    
        // Query to get data based on filters
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
            ->paginate(10);
    
        // Return the data along with the filter options
        return Inertia::render('Storage/Index', [
            'kelolakoleksi' => $kelolakoleksi,
            'filters' => $filters,
            'lokasi_penyimpanan_options' => $lokasi_penyimpananOptions,
            'lantai_options' => $lantaiOptions,
            'no_lajur_options' => $noLajurOptions,
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

        // Fetch distinct options from database
        $no_lemariOptions = Storage::distinct()->pluck('no_lemari');
        $no_laciOptions = Storage::distinct()->pluck('no_laci');
        $no_slotOptions = Storage::distinct()->pluck('no_slot');

        // Query to get data based on filters
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
            ->paginate(10);

        // Return the data along with the filter options
        return Inertia::render('Storage/Lemari', [
            'kelolakoleksi' => $kelolakoleksi,
            'filters' => $filters,
            'no_lemari_options' => $no_lemariOptions,
            'no_laci_options' => $no_laciOptions,
            'no_slot_options' => $no_slotOptions,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function showDetail($id)
    {
        // Ambil data koleksi berdasarkan ID dari tabel kelolakoleksi
        $item = Storage::find($id);  // Use Koleksi instead of Storage

        // Jika data koleksi tidak ditemukan, redirect dengan pesan error
        if (!$item) {
            return redirect()->route('storage.index')->with('error', 'Koleksi tidak ditemukan.');
        }

        // Kirim data koleksi ke halaman detail
        return inertia('Storage/Detail', [
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
