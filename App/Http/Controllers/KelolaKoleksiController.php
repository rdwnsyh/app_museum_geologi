<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use App\Exports\KelolaKoleksiExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class KelolaKoleksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    // Ambil data dengan atau tanpa filter pencarian
    $kelolakoleksi = KelolaKoleksi::filter($request->only('search'))->paginate(10);

    // Kirim data ke view
    return Inertia::render('Kelola/Index', [
        'kelolakoleksi' => $kelolakoleksi,
        'filters' => $request->only('search'), // Kirim parameter filter untuk dipakai di frontend
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kelola/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {

        // Validasi data input
        $validatedData = $request->validate([
            // Halaman 1
            'kategori_bmn' => 'string|max:255' ?? '6.06.01.05.005',
            'nup_bmn' => 'nullable|string|max:255',
            'no_regis' => 'required|string|max:255',
            'no_inventaris' => 'required|string|max:255',
            'tipe_bmn' => 'string|max:255' ?? 'Batuan',
            'no_awal' => 'required|string|max:255',
            'satuan' => 'required|string|max:255',
            'kelompok_koleksi' => 'string|max:255' ?? 'Batuan',
            'jenis_koleksi' => 'required|string|max:255',
            'kode_koleksi' => 'required|string|max:255',
            'ruang_penyimpanan' => 'nullable|string|max:255',
            'lokasi_penyimpanan' => 'nullable|string|max:255',
            'lantai' => 'nullable|string|max:255',
            'no_lajur' => 'nullable|string',
            'no_lemari' => 'nullable|string',
            'no_laci' => 'nullable|string',
            'no_slot' => 'nullable|string',

            // Halaman 2
            'kondisi' => 'required|string|max:255',
            'nama_koleksi' => 'required|string|max:255',
            'deskripsi_koleksi' => 'nullable|string',
            'keterangan_koleksi' => 'nullable|string',
            'umur_geologi' => 'nullable|string|max:255',
            'nama_formasi' => 'nullable|string|max:255',
            'ditemukan' => 'required|string|max:255',
            'pulau' => 'required|string|max:255',
            'provinsi' => 'nullable|string|max:255',
            'kota' => 'nullable|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'elevasi' => 'nullable|string|max:255',
            'peta' => 'nullable|string|max:255',
            'skala' => 'required|string|max:255',
            'lembar_peta' => 'required|string|max:255',

            // Halaman 3
            'cara_peroleh' => 'required|string|max:255',
            'thn_peroleh' => 'nullable|string',
            'determinator' => 'nullable|string|max:255',
            'kolektor' => 'nullable|string|max:255',
            'kepemilikan_awal' => 'nullable|string|max:255',
            'publikasi' => 'nullable|string',
            'url' => 'nullable|string',
            'nilai_peroleh' => 'nullable|string|max:255',
            'nilai_buku' => 'nullable|string|max:255',

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
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi', 'public');
    }

    if ($request->hasFile('gambar_dua')) {
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi', 'public');
    }

    if ($request->hasFile('gambar_tiga')) {
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi', 'public');
    }

    // Proses upload audio
    if ($request->hasFile('audio')) {
        $validatedData['audio'] = $request->file('audio')->store('koleksi/audio', 'public');
    }

// Proses upload video
    if ($request->hasFile('vidio')) {
        $validatedData['vidio'] = $request->file('vidio')->store('koleksi/vidio', 'public');
    }


    // Dump atau debug data yang telah divalidasi
    // dd($validatedData);
    
    // Simpan data ke database
    KelolaKoleksi::create($validatedData);

    // Redirect or respond with a success message
    return redirect()->route('kelolakoleksi')->with('success', 'Data koleksi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(KelolaKoleksi $kelolaKoleksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KelolaKoleksi $kelolakoleksi): Response
    {
        // Menampilkan halaman edit dengan data yang diambil
        return Inertia::render('Kelola/Edit', [
            'kelolakoleksi' => $kelolakoleksi
            // dd($kelolaKoleksiBatuan)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksi $kelolakoleksi): RedirectResponse
    {
        // Validasi data
    $validatedData = $request->validate([
        'kategori_bmn' => 'string|max:255' ?? '6.06.01.05.005',
            'nup_bmn' => 'nullable|string|max:255',
            'no_regis' => 'required|string|max:255',
            'no_inventaris' => 'required|string|max:255',
            'tipe_bmn' => 'string|max:255' ?? 'Batuan',
            'no_awal' => 'required|string|max:255',
            'satuan' => 'required|string|max:255',
            'kelompok_koleksi' => 'string|max:255' ?? 'Batuan',
            'jenis_koleksi' => 'required|string|max:255',
            'kode_koleksi' => 'required|string|max:255',
            'ruang_penyimpanan' => 'nullable|string|max:255',
            'lokasi_penyimpanan' => 'nullable|string|max:255',
            'lantai' => 'nullable|string|max:255',
            'no_lajur' => 'nullable|string',
            'no_lemari' => 'nullable|string',
            'no_laci' => 'nullable|string',
            'no_slot' => 'nullable|string',

            // Halaman 2
            'kondisi' => 'required|string|max:255',
            'nama_koleksi' => 'required|string|max:255',
            'deskripsi_koleksi' => 'nullable|string',
            'keterangan_koleksi' => 'nullable|string',
            'umur_geologi' => 'nullable|string|max:255',
            'nama_formasi' => 'nullable|string|max:255',
            'ditemukan' => 'required|string|max:255',
            'pulau' => 'required|string|max:255',
            'provinsi' => 'nullable|string|max:255',
            'kota' => 'nullable|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'elevasi' => 'nullable|string|max:255',
            'peta' => 'nullable|string|max:255',
            'skala' => 'required|string|max:255',
            'lembar_peta' => 'required|string|max:255',

            // Halaman 3
            'cara_peroleh' => 'required|string|max:255',
            'thn_peroleh' => 'nullable|string',
            'determinator' => 'nullable|string|max:255',
            'kolektor' => 'nullable|string|max:255',
            'kepemilikan_awal' => 'nullable|string|max:255',
            'publikasi' => 'nullable|string',
            'url' => 'nullable|string',
            'nilai_peroleh' => 'nullable|string|max:255',
            'nilai_buku' => 'nullable|string|max:255',

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

    if ($request->hasFile('gambar_satu')) {
        // Delete the existing file if present
        if ($kelolakoleksi->gambar_satu) {
            Storage::disk('public')->delete($kelolakoleksi->gambar_satu);
        }
        // Store the new file and save its path
        $validatedData['gambar_satu'] = $request->file('gambar_satu')->store('koleksi', 'public');
    }
    
    if ($request->hasFile('gambar_dua')) {
        // Delete the existing file if present
        if ($kelolakoleksi->gambar_dua) {
            Storage::disk('public')->delete($kelolakoleksi->gambar_dua);
        }
        // Store the new file and save its path
        $validatedData['gambar_dua'] = $request->file('gambar_dua')->store('koleksi', 'public');
    }
    
    if ($request->hasFile('gambar_tiga')) {
        // Delete the existing file if present
        if ($kelolakoleksi->gambar_tiga) {
            Storage::disk('public')->delete($kelolakoleksi->gambar_tiga);
        }
        // Store the new file and save its path
        $validatedData['gambar_tiga'] = $request->file('gambar_tiga')->store('koleksi', 'public');
    }
    
    if ($request->hasFile('audio')) {
        // Delete the existing file if present
        if ($kelolakoleksi->audio) {
            Storage::disk('public')->delete($kelolakoleksi->audio);
        }
        // Store the new audio file in a dedicated directory
        $validatedData['audio'] = $request->file('audio')->store('koleksi/audio', 'public');
    }
    
    if ($request->hasFile('vidio')) { // Make sure to use the correct name 'vidio' or 'video'
        // Delete the existing file if present
        if ($kelolakoleksi->vidio) {
            Storage::disk('public')->delete($kelolakoleksi->vidio);
        }
        // Store the new video file in a dedicated directory
        $validatedData['vidio'] = $request->file('vidio')->store('koleksi/video', 'public');
    }

    // Update data ke database
    $kelolakoleksi->update($validatedData);
    // dd($kelolakoleksi);

    // Redirect ke halaman yang diinginkan
    return redirect()->route('kelolakoleksi')
        ->with('success', 'Data koleksi batuan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksi $kelolakoleksi)
    {
            // Hapus file gambar, video, dan audio yang terkait jika ada
            if ($kelolakoleksi->gambar_satu) {
                Storage::disk('public')->delete($kelolakoleksi->gambar_satu);
            }
        
            if ($kelolakoleksi->gambar_dua) {
                Storage::disk('public')->delete($kelolakoleksi->gambar_dua);
            }
        
            if ($kelolakoleksi->gambar_tiga) {
                Storage::disk('public')->delete($kelolakoleksi->gambar_tiga);
            }
        
            if ($kelolakoleksi->vidio) {
                Storage::disk('public')->delete($kelolakoleksi->vidio);
            }
        
            if ($kelolakoleksi->audio) {
                Storage::disk('public')->delete($kelolakoleksi->audio);
            }
        
            // Hapus data dari database
            $kelolakoleksi->delete();
        
            // Redirect dengan pesan sukses
            return redirect()->route('kelolakoleksi')->with('success', 'Data koleksi batuan berhasil dihapus.');
    }

    public function exportExcel()
    {
        $data = KelolaKoleksi::all();

        return Excel::download(new KelolaKoleksiExport($data), 'kelola_koleksi.xlsx');
    }

    public function exportPdf()
    {
        $data = KelolaKoleksi::all();

        $pdf = Pdf::loadView('exports.kelola_koleksi', compact('data'));
        return $pdf->download('kelola_koleksi.pdf');
    }
}
