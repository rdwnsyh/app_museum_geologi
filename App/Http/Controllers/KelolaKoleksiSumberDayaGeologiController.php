<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiSumberDayaGeologi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class KelolaKoleksiSumberDayaGeologiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Ambil data dari tabel fosil dengan pagination
        $koleksi_sdg = KelolaKoleksiSumberDayaGeologi::paginate(10); // Menampilkan 10 item per halaman

        // Kirim data ke view menggunakan Inertia
        return Inertia::render('Kelola/SumberDayaGeologi/Index', [
            'koleksi_sdg' => $koleksi_sdg
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Kelola/SumberDayaGeologi/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate the request data
    $validatedData = $request->validate([
        'kategori_bmn' => 'nullable|string|max:255' ?? '6.02.02.99.999',
            'nup_bmn' => 'required|string|max:255',
            'no_regis' => 'required|string|max:255',
            'no_inventaris' => 'required|string|max:255',
            'tipe_bmn' => 'nullable|string|max:255' ?? 'Sumber Daya Geologi',
            'no_awal' => 'required|string|max:255',
            'satuan' => 'required|string|max:255',
            'kelompok_koleksi' => 'nullable|string|max:255' ?? 'Sumber Daya Geologi',
            'jenis_koleksi' => 'required|string|max:255',
            'kode_koleksi' => 'required|string|max:255',
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
            // Validasi gambar
            'gambar_satu' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048', // Maksimal ukuran 2MB
            'gambar_dua'  => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'gambar_tiga' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',

             // Validasi audio
            'audio' => 'nullable|mimes:mp3,wav,ogg|max:5120', // Maksimal 5MB

            // Validasi video
            'vidio' => 'nullable|mimes:mp4,avi,mov|max:10240', // Maksimal 10MB
            'status' => 'nullable|in:ada,tidak ada',
        ], [
            'kategori_bmn.required' => 'Kategori BMN harus diisi.',
            'nup_bmn.required' => 'NUP BMN harus diisi.',
             // Custom message untuk validasi gambar
            'gambar_satu.image' => 'File harus berupa gambar.',
            'gambar_satu.mimes' => 'Format gambar harus: jpeg, png, jpg, svg.',
            'gambar_satu.max' => 'Ukuran gambar maksimal 2MB.',
            'audio.mimes' => 'Format file audio harus berupa mp3, wav, atau ogg.',
            'audio.max' => 'Ukuran maksimal file audio adalah 5MB.',
            'vidio.mimes' => 'Format file i harus berupa mp4, avi, atau mov.',
            'vidio.max' => 'Ukuran maksimal file video adalah 10MB.',
        ]);

    // Upload and store files (images, audio, video)
    if ($request->hasFile('gambar_satu')) {
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi_sdg', 'public');
    }

    if ($request->hasFile('gambar_dua')) {
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi_sdg', 'public');
    }

    if ($request->hasFile('gambar_tiga')) {
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi_sdg', 'public');
    }

    if ($request->hasFile('vidio')) {
        $validatedData['vidio'] = $request->file('vidio')->store('koleksi_sdg/video', 'public');
    }

    if ($request->hasFile('audio')) {
        $validatedData['audio'] = $request->file('audio')->store('koleksi_sdg/audio', 'public');
    }

    // Store validated data into the database
    KelolaKoleksiSumberDayaGeologi::create($validatedData);

    // Redirect with success message
    return redirect()->route('kelolakoleksisumberdayageologi')->with('success', 'Data koleksi sumber daya geologi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(KelolaKoleksiSumberDayaGeologi $kelolaKoleksiSumberDayaGeologi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KelolaKoleksiSumberDayaGeologi $koleksi_sdg): Response
    {
        // Menampilkan halaman edit dengan data yang diambil
        return Inertia::render('Kelola/SumberDayaGeologi/Edit', [
            'koleksi_sdg' => $koleksi_sdg
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksiSumberDayaGeologi $koleksi_sdg): RedirectResponse
    {
        // Validate the request data
    $validatedData = $request->validate([
        'kategori_bmn' => 'nullable|string|max:255',
        'nup_bmn' => 'required|string|max:255',
        'no_regis' => 'required|string|max:255',
        'no_inventaris' => 'required|string|max:255',
        'tipe_bmn' => 'nullable|string|max:255',
        'no_awal' => 'required|string|max:255',
        'satuan' => 'required|string|max:255',
        'kelompok_koleksi' => 'nullable|string|max:255',
        'jenis_koleksi' => 'required|string|max:255',
        'kode_koleksi' => 'required|string|max:255',
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
        'thn_peroleh' => 'required|integer|min:1000',
        'determinator' => 'required|string|max:255',
        'kolektor' => 'required|string|max:255',
        'kepemilikan_awal' => 'required|string|max:255',
        'publikasi' => 'nullable|string',
        'url' => 'nullable|string|url',
        'nilai_peroleh' => 'required|string|max:255',
        'nilai_buku' => 'required|string|max:255',

        // Halaman 4: Validasi gambar, audio, dan video
        // 'gambar_satu' => 'image|mimes:jpeg,png,jpg,svg|max:2048',
        // 'gambar_dua' => 'image|mimes:jpeg,png,jpg,svg|max:2048',
        // 'gambar_tiga' => 'image|mimes:jpeg,png,jpg,svg|max:2048',
        // 'audio' => 'mimes:mp3,wav,ogg|max:5120',
        // 'vidio' => 'mimes:mp4,avi,mov|max:10240',
        // 'gambar_satu' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        // 'gambar_dua' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        // 'gambar_tiga' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        // 'audio' => 'mimes:mp3,wav|max:5120', // Max 10MB
        // 'vidio' => 'mimes:mp4,mov,avi|max:10240', // Max 50MB
    ], [
        'kategori_bmn.required' => 'Kategori BMN harus diisi.',
        'nup_bmn.required' => 'NUP BMN harus diisi.',
        'gambar_satu.image' => 'File harus berupa gambar.',
        'gambar_satu.mimes' => 'Format gambar harus: jpeg, png, jpg, svg.',
        'gambar_satu.max' => 'Ukuran gambar maksimal 2MB.',
        'audio.mimes' => 'Format file audio harus berupa mp3, wav, atau ogg.',
        'audio.max' => 'Ukuran maksimal file audio adalah 5MB.',
        'vidio.mimes' => 'Format file video harus berupa mp4, avi, atau mov.',
        'vidio.max' => 'Ukuran maksimal file video adalah 10MB.',
    ]);

    // Proses upload gambar jika ada
    if ($request->hasFile('gambar_satu')) {
        if ($koleksi_sdg->gambar_satu) {
            Storage::disk('public')->delete($koleksi_sdg->gambar_satu);
        }
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi_sdg', 'public');
    }

    if ($request->hasFile('gambar_dua')) {
        if ($koleksi_sdg->gambar_dua) {
            Storage::disk('public')->delete($koleksi_sdg->gambar_dua);
        }
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi_sdg', 'public');
    }

    if ($request->hasFile('gambar_tiga')) {
        if ($koleksi_sdg->gambar_tiga) {
            Storage::disk('public')->delete($koleksi_sdg->gambar_tiga);
        }
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi_sdg', 'public');
    }

    // Proses upload audio jika ada
    if ($request->hasFile('audio')) {
        if ($koleksi_sdg->audio) {
            Storage::disk('public')->delete($koleksi_sdg->audio);
        }
        $validatedData['audio'] = $request->file('audio')->store('koleksi_sdg/audio');
    }

    // Proses upload video jika ada
    if ($request->hasFile('video')) {
        if ($koleksi_sdg->video) {
            Storage::disk('public')->delete($koleksi_sdg->video);
        }
        $validatedData['video'] = $request->file('video')->store('koleksi_sdg/video');
    }

    // Update data dalam database
    $koleksi_sdg->update($validatedData);

    return redirect()->route('kelolakoleksisumberdayageologi')->with('success', 'Data koleksi Sumber Daya Geologi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksiSumberDayaGeologi $koleksi_sdg): RedirectResponse
    {
        // Hapus file gambar, video, dan audio yang terkait jika ada
    if ($koleksi_sdg->gambar_satu) {
        Storage::disk('public')->delete($koleksi_sdg->gambar_satu);
    }

    if ($koleksi_sdg->gambar_dua) {
        Storage::disk('public')->delete($koleksi_sdg->gambar_dua);
    }

    if ($koleksi_sdg->gambar_tiga) {
        Storage::disk('public')->delete($koleksi_sdg->gambar_tiga);
    }

    if ($koleksi_sdg->vidio) {
        Storage::disk('public')->delete($koleksi_sdg->vidio);
    }

    if ($koleksi_sdg->audio) {
        Storage::disk('public')->delete($koleksi_sdg->audio);
    }

    // Hapus data dari database
    $koleksi_sdg->delete();

    // Redirect dengan pesan sukses
    return redirect()->route('kelolakoleksisumberdayageologi')->with('success', 'Data koleksi sumber daya geologi berhasil dihapus.');
    }
}
