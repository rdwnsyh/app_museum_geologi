<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiBatuan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KelolaKoleksiBatuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
         // Ambil data dari tabel batuan dengan pagination
        $koleksibatuan = KelolaKoleksiBatuan::paginate(10); // Menampilkan 10 item per halaman

        // Kirim data ke view menggunakan Inertia
        return Inertia::render('Kelola/Batuan/Index', [
            'koleksibatuan' => $koleksibatuan
        ]);
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
            'no_regis' => 'required|string|max:255',
            'no_inventaris' => 'required|string|max:255',
            'tipe_bmn' => 'nullable|string|max:255' ?? 'Batuan',
            'no_awal' => 'required|string|max:255',
            'satuan' => 'required|string|max:255',
            'kelompok_koleksi' => 'nullable|string|max:255' ?? 'Batuan',
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
    

      // Proses upload gambar
    if ($request->hasFile('gambar_satu')) {
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi_batuan', 'public');
    }

    if ($request->hasFile('gambar_dua')) {
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi_batuan', 'public');
    }

    if ($request->hasFile('gambar_tiga')) {
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi_batuan', 'public');
    }

    // Proses upload audio
    if ($request->hasFile('audio')) {
        $validatedData['audio'] = $request->file('audio')->store('koleksi_batuan/audio', 'public');
    }

// Proses upload video
    if ($request->hasFile('vidio')) {
        $validatedData['vidio'] = $request->file('vidio')->store('koleksi_batuan/vidio', 'public');
    }


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
    public function edit(KelolaKoleksiBatuan $koleksibatuan): Response
    {
        // Menampilkan halaman edit dengan data yang diambil
        return Inertia::render('Kelola/Batuan/Edit', [
            'koleksibatuan' => $koleksibatuan
            // dd($kelolaKoleksiBatuan)
        ]);

         // Mengambil URL file dari storage
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksiBatuan $koleksibatuan): RedirectResponse
{
    // Validasi data
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
    ]);

    if ($request->hasFile('gambar_satu')) {
        // Delete the existing file if present
        if ($koleksibatuan->gambar_satu) {
            Storage::disk('public')->delete($koleksibatuan->gambar_satu);
        }
        // Store the new file and save its path
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi_batuan', 'public');
    }
    
    if ($request->hasFile('gambar_dua')) {
        // Delete the existing file if present
        if ($koleksibatuan->gambar_dua) {
            Storage::disk('public')->delete($koleksibatuan->gambar_dua);
        }
        // Store the new file and save its path
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi_batuan', 'public');
    }
    
    if ($request->hasFile('gambar_tiga')) {
        // Delete the existing file if present
        if ($koleksibatuan->gambar_tiga) {
            Storage::disk('public')->delete($koleksibatuan->gambar_tiga);
        }
        // Store the new file and save its path
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi_batuan', 'public');
    }
    
    if ($request->hasFile('audio')) {
        // Delete the existing file if present
        if ($koleksibatuan->audio) {
            Storage::disk('public')->delete($koleksibatuan->audio);
        }
        // Store the new audio file in a dedicated directory
        $validatedData['audio'] = $request->file('audio')->store('koleksi_batuan/audio', 'public');
    }
    
    if ($request->hasFile('vidio')) { // Make sure to use the correct name 'vidio' or 'video'
        // Delete the existing file if present
        if ($koleksibatuan->vidio) {
            Storage::disk('public')->delete($koleksibatuan->vidio);
        }
        // Store the new video file in a dedicated directory
        $validatedData['vidio'] = $request->file('vidio')->store('koleksi_batuan/video', 'public');
    }

    // Update data ke database
    $koleksibatuan->update($validatedData);
    // dd($koleksibatuan);

    // Redirect ke halaman yang diinginkan
    return redirect()->route('kelolakoleksibatuan')
        ->with('success', 'Data koleksi batuan berhasil diperbarui.');
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksiBatuan $koleksibatuan): RedirectResponse
    {
            // Hapus file gambar, video, dan audio yang terkait jika ada
        if ($koleksibatuan->gambar_satu) {
            Storage::disk('public')->delete($koleksibatuan->gambar_satu);
        }
    
        if ($koleksibatuan->gambar_dua) {
            Storage::disk('public')->delete($koleksibatuan->gambar_dua);
        }
    
        if ($koleksibatuan->gambar_tiga) {
            Storage::disk('public')->delete($koleksibatuan->gambar_tiga);
        }
    
        if ($koleksibatuan->vidio) {
            Storage::disk('public')->delete($koleksibatuan->vidio);
        }
    
        if ($koleksibatuan->audio) {
            Storage::disk('public')->delete($koleksibatuan->audio);
        }
    
        // Hapus data dari database
        $koleksibatuan->delete();
    
        // Redirect dengan pesan sukses
        return redirect()->route('kelolakoleksibatuan')->with('success', 'Data koleksi batuan berhasil dihapus.');
    }
}
