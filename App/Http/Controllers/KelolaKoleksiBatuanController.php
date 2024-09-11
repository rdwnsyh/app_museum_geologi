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
        $dataBatuan = KelolaKoleksiBatuan::paginate(10); // Menampilkan 10 item per halaman

        // Kirim data ke view menggunakan Inertia
        return Inertia::render('Kelola/Batuan/Index', [
            'batuan' => $dataBatuan
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
            // Validasi gambar
            'gambar_satu' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048', // Maksimal ukuran 2MB
            'gambar_dua'  => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'gambar_tiga' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',

             // Validasi audio
            'audio' => 'nullable|mimes:mp3,wav,ogg|max:5120', // Maksimal 5MB

            // Validasi video
            'video' => 'nullable|mimes:mp4,avi,mov|max:10240', // Maksimal 10MB
        ], [
            'kategori_bmn.required' => 'Kategori BMN harus diisi.',
            'nup_bmn.required' => 'NUP BMN harus diisi.',
             // Custom message untuk validasi gambar
            'gambar_satu.image' => 'File harus berupa gambar.',
            'gambar_satu.mimes' => 'Format gambar harus: jpeg, png, jpg, svg.',
            'gambar_satu.max' => 'Ukuran gambar maksimal 2MB.',
            'audio.mimes' => 'Format file audio harus berupa mp3, wav, atau ogg.',
            'audio.max' => 'Ukuran maksimal file audio adalah 5MB.',
            'video.mimes' => 'Format file video harus berupa mp4, avi, atau mov.',
            'video.max' => 'Ukuran maksimal file video adalah 10MB.',
        ]);
    

     // Proses upload gambar
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
        $validatedData['audio'] = $request->file('audio')->store('koleksi_batuan/audio');
    }

    // Proses upload video
    if ($request->hasFile('video')) {
        $validatedData['video'] = $request->file('video')->store('koleksi_batuan/video');
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
    public function edit(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        // Menampilkan halaman edit dengan data yang diambil
        return Inertia::render('Kelola/Batuan/Edit', [
            'koleksibatuan' => $kelolaKoleksiBatuan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
         // Validasi data input termasuk gambar, audio, dan video
         $validatedData = $request->validate([
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
            // Validasi gambar
            'gambar_satu' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048', // Maksimal ukuran 2MB
            'gambar_dua'  => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'gambar_tiga' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',

             // Validasi audio
            'audio' => 'nullable|mimes:mp3,wav,ogg|max:5120', // Maksimal 5MB

            // Validasi video
            'video' => 'nullable|mimes:mp4,avi,mov|max:10240', // Maksimal 10MB
        ], [
            'kategori_bmn.required' => 'Kategori BMN harus diisi.',
            'nup_bmn.required' => 'NUP BMN harus diisi.',
             // Custom message untuk validasi gambar
            'gambar_satu.image' => 'File harus berupa gambar.',
            'gambar_satu.mimes' => 'Format gambar harus: jpeg, png, jpg, svg.',
            'gambar_satu.max' => 'Ukuran gambar maksimal 2MB.',
            'audio.mimes' => 'Format file audio harus berupa mp3, wav, atau ogg.',
            'audio.max' => 'Ukuran maksimal file audio adalah 5MB.',
            'video.mimes' => 'Format file video harus berupa mp4, avi, atau mov.',
            'video.max' => 'Ukuran maksimal file video adalah 10MB.',
        ]);

        // Proses upload gambar, audio, dan video
        if ($request->hasFile('gambar_satu')) {
            // Hapus gambar lama jika ada
            if ($kelolaKoleksiBatuan->gambar_satu) {
                Storage::delete($kelolaKoleksiBatuan->gambar_satu);
            }
            $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi_batuan');
        }

        if ($request->hasFile('gambar_dua')) {
            if ($kelolaKoleksiBatuan->gambar_dua) {
                Storage::delete($kelolaKoleksiBatuan->gambar_dua);
            }
            $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi_batuan');
        }

        if ($request->hasFile('gambar_tiga')) {
            if ($kelolaKoleksiBatuan->gambar_tiga) {
                Storage::delete($kelolaKoleksiBatuan->gambar_tiga);
            }
            $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi_batuan');
        }

        if ($request->hasFile('audio')) {
            if ($kelolaKoleksiBatuan->audio) {
                Storage::delete($kelolaKoleksiBatuan->audio);
            }
            $validatedData['audio'] = $request->file('audio')->store('koleksi_batuan/audio');
        }

        if ($request->hasFile('video')) {
            if ($kelolaKoleksiBatuan->video) {
                Storage::delete($kelolaKoleksiBatuan->video);
            }
            $validatedData['video'] = $request->file('video')->store('koleksi_batuan/video');
        }

        // Update data ke database
        $kelolaKoleksiBatuan->update($validatedData);

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('kelolakoleksibatuan')
            ->with('success', 'Data koleksi batuan berhasil diperbarui.');
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
         // Hapus gambar, audio, dan video jika ada
         if ($kelolaKoleksiBatuan->gambar_satu) {
            Storage::delete($kelolaKoleksiBatuan->gambar_satu);
        }

        if ($kelolaKoleksiBatuan->gambar_dua) {
            Storage::delete($kelolaKoleksiBatuan->gambar_dua);
        }

        if ($kelolaKoleksiBatuan->gambar_tiga) {
            Storage::delete($kelolaKoleksiBatuan->gambar_tiga);
        }

        if ($kelolaKoleksiBatuan->audio) {
            Storage::delete($kelolaKoleksiBatuan->audio);
        }

        if ($kelolaKoleksiBatuan->video) {
            Storage::delete($kelolaKoleksiBatuan->video);
        }

        // Hapus data dari database
        $kelolaKoleksiBatuan->delete();

        // Redirect ke halaman indeks dengan pesan sukses
        return redirect()->route('kelolakoleksibatuan')
            ->with('success', 'Data koleksi batuan berhasil dihapus.');
    }
}
