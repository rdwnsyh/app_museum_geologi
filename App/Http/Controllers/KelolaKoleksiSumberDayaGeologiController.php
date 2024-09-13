<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiSumberDayaGeologi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class KelolaKoleksiSumberDayaGeologiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Ambil data dari tabel fosil dengan pagination
        $datasumberdayageologi = KelolaKoleksiSumberDayaGeologi::paginate(10); // Menampilkan 10 item per halaman

        // Kirim data ke view menggunakan Inertia
        return Inertia::render('Kelola/SumberDayaGeologi/Index', [
            'sumberdayageologi' => $datasumberdayageologi
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
        // halaman 1
        'kategori_bmn' => 'nullable|string|max:255',
        'nup_bmn' => 'required|string|max:255',
        'no_regis' => 'required|string|max:255',
        'no_inventaris' => 'required|string|max:255',
        'tipe_bmn' => 'nullable|string|max:255',
        'no_awal' => 'nullable|string|max:255',
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
        'thn_peroleh' => 'required|integer|min:1000',
        'determinator' => 'required|string|max:255',
        'kolektor' => 'required|string|max:255',
        'kepemilikan_awal' => 'required|string|max:255',
        'publikasi' => 'nullable|string',
        'url' => 'nullable|url',
        'nilai_peroleh' => 'required|string|max:255',
        'nilai_buku' => 'required|string|max:255',

        // halaman 4
        'gambar_satu' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'gambar_dua' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'gambar_tiga' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'vidio' => 'nullable|mimes:mp4,avi,mov|max:10240',
        'audio' => 'nullable|mimes:mp3,wav,ogg|max:5120',
        'status' => 'nullable|in:ada,tidak ada',
    ]);

    // Upload and store files (images, audio, video)
    if ($request->hasFile('gambar_satu')) {
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('sumber_daya_geologi', 'public');
    }

    if ($request->hasFile('gambar_dua')) {
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('sumber_daya_geologi', 'public');
    }

    if ($request->hasFile('gambar_tiga')) {
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('sumber_daya_geologi', 'public');
    }

    if ($request->hasFile('vidio')) {
        $validatedData['vidio'] = $request->file('vidio')->store('sumber_daya_geologi/video', 'public');
    }

    if ($request->hasFile('audio')) {
        $validatedData['audio'] = $request->file('audio')->store('sumber_daya_geologi/audio', 'public');
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
    public function edit(KelolaKoleksiSumberDayaGeologi $kelolaKoleksiSumberDayaGeologi)
    {
        // Menampilkan halaman edit dengan data yang diambil
        return Inertia::render('Kelola/Fosil/Edit', [
            'koleksisumberdayageologi' => $kelolaKoleksiSumberDayaGeologi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksiSumberDayaGeologi $kelolaKoleksiSumberDayaGeologi): RedirectResponse
    {
        // Validate the request data
    $validatedData = $request->validate([
        // halaman 1
        'kategori_bmn' => 'nullable|string|max:255',
        'nup_bmn' => 'required|string|max:255',
        'no_regis' => 'required|string|max:255',
        'no_inventaris' => 'required|string|max:255',
        'tipe_bmn' => 'nullable|string|max:255',
        'no_awal' => 'nullable|string|max:255',
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
        'thn_peroleh' => 'required|integer|min:1000',
        'determinator' => 'required|string|max:255',
        'kolektor' => 'required|string|max:255',
        'kepemilikan_awal' => 'required|string|max:255',
        'publikasi' => 'nullable|string',
        'url' => 'nullable|url',
        'nilai_peroleh' => 'required|string|max:255',
        'nilai_buku' => 'required|string|max:255',

        // halaman 4
        'gambar_satu' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'gambar_dua' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'gambar_tiga' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        'vidio' => 'nullable|mimes:mp4,avi,mov|max:10240',
        'audio' => 'nullable|mimes:mp3,wav,ogg|max:5120',
        'status' => 'nullable|in:ada,tidak ada',
    ]);

    // Check and upload new files (if any)
    if ($request->hasFile('gambar_satu')) {
        // Delete old file (optional)
        if ($kelolaKoleksiSumberDayaGeologi->gambar_satu) {
            Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->gambar_satu);
        }
        // Upload new file
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('sumber_daya_geologi', 'public');
    }

    if ($request->hasFile('gambar_dua')) {
        if ($kelolaKoleksiSumberDayaGeologi->gambar_dua) {
            Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->gambar_dua);
        }
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('sumber_daya_geologi', 'public');
    }

    if ($request->hasFile('gambar_tiga')) {
        if ($kelolaKoleksiSumberDayaGeologi->gambar_tiga) {
            Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->gambar_tiga);
        }
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('sumber_daya_geologi', 'public');
    }

    if ($request->hasFile('vidio')) {
        if ($kelolaKoleksiSumberDayaGeologi->vidio) {
            Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->vidio);
        }
        $validatedData['vidio'] = $request->file('vidio')->store('sumber_daya_geologi/video', 'public');
    }

    if ($request->hasFile('audio')) {
        if ($kelolaKoleksiSumberDayaGeologi->audio) {
            Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->audio);
        }
        $validatedData['audio'] = $request->file('audio')->store('sumber_daya_geologi/audio', 'public');
    }

    // Update the data in the database
    $kelolaKoleksiSumberDayaGeologi->update($validatedData);

    // Redirect with a success message
    return redirect()->route('kelolakoleksisumberdayageologi')->with('success', 'Data koleksi sumber daya geologi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksiSumberDayaGeologi $kelolaKoleksiSumberDayaGeologi)
    {
        // Hapus file gambar, video, dan audio yang terkait jika ada
    if ($kelolaKoleksiSumberDayaGeologi->gambar_satu) {
        Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->gambar_satu);
    }

    if ($kelolaKoleksiSumberDayaGeologi->gambar_dua) {
        Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->gambar_dua);
    }

    if ($kelolaKoleksiSumberDayaGeologi->gambar_tiga) {
        Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->gambar_tiga);
    }

    if ($kelolaKoleksiSumberDayaGeologi->vidio) {
        Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->vidio);
    }

    if ($kelolaKoleksiSumberDayaGeologi->audio) {
        Storage::disk('public')->delete($kelolaKoleksiSumberDayaGeologi->audio);
    }

    // Hapus data dari database
    $kelolaKoleksiSumberDayaGeologi->delete();

    // Redirect dengan pesan sukses
    return redirect()->route('kelolakoleksisumberdayageologi')->with('success', 'Data koleksi sumber daya geologi berhasil dihapus.');
    }
}
