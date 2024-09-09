<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiBatuan;
use Illuminate\Support\Facades\Validator;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class KelolaKoleksiBatuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Kelola/Batuan/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Kelola/Batuan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
            // Validasi data input
            $validatedData = $request->validate([
            // Halaman 1
            'kategori_bmn' => 'nullable|string|max:255' ?? '6.06.01.05.005',
            'nup_bmn' => 'required|string|max:255',
            'tipe_bmn' => 'nullable|string|max:255' ?? 'Batuan',
            'no_awal' => 'required|string|max:255',
            'satuan' => 'required|string|max:255',
            'kelompok_koleksi' => 'nullable|string|max:255' ?? 'Batuan',
            'jenis_koleksi' => 'required|string|max:255',
            'ruang_penyimpanan' => 'required|string|max:255',
            'lokasi_penyimpanan' => 'required|string|max:255',
            'lantai' => 'required|string|max:255',
            'no_lajur' => 'required|integer',
            'no_lemari' => 'required|integer',
            'no_laci' => 'required|integer',
            'no_slot' => 'required|integer',

            // Halaman 2
            'kondisi' => 'required|string|max:255',
            'nama_koleksi' => 'required|string|max:255',
            'deskripsi_koleksi' => 'required|string',
            'keterangan_koleksi' => 'required|string',
            'umur_geologi' => 'required|string|max:255',
            'nama_formasi' => 'required|string|max:255',
            'ditemukan' => 'required|string|max:255',
            'pulau' => 'required|string|max:255',
            'provinsi' => 'required|string|max:255',
            'kota' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'latitude' => 'required|string|max:255',
            'longitude' => 'required|string|max:255',
            'elevasi' => 'required|string|max:255',
            'peta' => 'required|string|max:255',
            'skala' => 'required|string|max:255',
            'lembar_peta' => 'required|string|max:255',

            // Halaman 3
            'cara_peroleh' => 'required|string|max:255',
            'thn_peroleh' => 'required|integer|min:1900',
            'determinator' => 'required|string|max:255',
            'kolektor' => 'required|string|max:255',
            'kepemilikan_awal' => 'required|string|max:255',
            'publikasi' => 'nullable|string',
            'url' => 'nullable|string|url',
            'nilai_peroleh' => 'required|string|max:255',
            'nilai_buku' => 'required|string|max:255',

            // Halaman 4
            'gambar_satu' => 'nullable|string',
            'gambar_dua' => 'nullable|string',
            'gambar_tiga' => 'nullable|string',
            'vidio' => 'nullable|string',
            'audio' => 'nullable|string',
        ], [
            'kategori_bmn.required' => 'Kategori BMN harus diisi.',
            'nup_bmn.required' => 'NUP BMN harus diisi.',
            // tambah pesan untuk mengisi form
        ]);
    

    // Dump atau debug data yang telah divalidasi
    // dd($validatedData);
    
    // Simpan data ke database
    KelolaKoleksiBatuan::create($validatedData);

    // Redirect or respond with a success message
    return redirect()->route('kelolakoleksibatuan')->with('success', 'Data koleksi batuan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }
}
