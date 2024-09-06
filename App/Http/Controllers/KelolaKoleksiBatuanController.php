<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiBatuan;
use Illuminate\Support\Facades\Validator;

class KelolaKoleksiBatuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Kelola/Batuan/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kelola/Batuan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          // Define the validation rules
    $rules = [
        // halaman 1 admin
        'kategori_bmn' => 'nullable|string|max:255',
        'nup_bmn' => 'required|string|max:255',
        'tipe_bmn' => 'nullable|string|max:255',
        'no_awal' => 'required|string|max:255',
        'satuan' => 'required|string|max:255',
        'kelompok_koleksi' => 'required|string|max:255',
        'jenis_koleksi' => 'required|string|max:255',
        'ruang_penyimpanan' => 'required|string|max:255',
        'lokasi_penyimpanan' => 'required|string|max:255',
        'lantai' => 'required|string|max:255',
        'no_lajur' => 'required|integer',
        'no_lemari' => 'required|integer',
        'no_laci' => 'required|integer',
        'no_slot' => 'required|integer',

        // halaman 2
        'kondisi' => 'required|string|max:255',
        'nama_koleksi' => 'required|string|max:255',
        'deskripsi_koleksi' => 'required|string',
        'keterangan_koleksi' => 'nullable|string',
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

        // halaman 3
        'cara_peroleh' => 'required|string|max:255',
        'thn_peroleh' => 'required|integer|min:1900|max:' . date('Y'),
        'determinator' => 'required|string|max:255',
        'kolektor' => 'required|string|max:255',
        'kepemilikan_awal' => 'required|string|max:255',
        'publikasi' => 'nullable|string',
        'url' => 'nullable|max:255',
        'nilai_peroleh' => 'required|numeric|min:0',
        'nilai_buku' => 'required|numeric|min:0',

        // halaman 4
        'gambar_satu' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'gambar_dua' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'gambar_tiga' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'vidio' => 'nullable|mimes:mp4,mov,ogg,qt|max:20000',
        'audio' => 'nullable|mimes:mp3,wav|max:10000',
    ];

    // Custom error messages (optional)
    $messages = [
        'kategori_bmn.required' => 'Kategori BMN harus diisi.',
        'nup_bmn.required' => 'NUP BMN harus diisi.',
        // Add custom messages for other fields as needed
    ];

    // Perform validation
    $validator = Validator::make($request->all(), $rules, $messages);

    // Check if validation fails
    if ($validator->fails()) {
        return redirect()->back()
            ->withErrors($validator)
            ->withInput();
    }

    // If validation passes, save the data to the database
    $batuan = new KelolaKoleksiBatuan($request->all());
    $batuan->save();

    // Redirect or respond with a success message
    return redirect()->route('Kelola/Batuan/Index')->with('success', 'Data batuan berhasil disimpan');
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
