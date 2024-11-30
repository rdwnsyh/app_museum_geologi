<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\InOutCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;


class OutboundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
{
    // Ambil data dari tabel inout_collection dengan relasi 'users'
    $outbound = InOutCollection::with('users:id,nama_lengkap') // Muat relasi dengan kolom tertentu
        ->paginate(10); // Paginate dengan 10 item per halaman

    // Kirim data ke view menggunakan Inertia
    return Inertia::render('Outbound/Index', [
        'outbound' => $outbound, // Kirim data
    ]);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    // Ambil data pengguna yang sedang login
    $outbound = auth()->user(); // Atau sesuaikan jika ada relasi lain
    
    // Jika ada data lain yang diperlukan untuk form, seperti koleksi atau status
    $koleksiOptions = KelolaKoleksi::all(); // Contoh jika perlu data koleksiOptions

    return Inertia::render('Outbound/Create', [
        'outbound' => $outbound, // Mengirim data pengguna ke React component
        'koleksiOptions' => $koleksiOptions, // Jika ada data tambahan yang perlu dikirim
    ]);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request->allFiles());

        // Validasi data input
        $validatedData = $request->validate([
            'users_id' => 'required|exists:users,id',
            'no_referensi' => 'required|string|max:255', // Pastikan no_referensi valid dari tabel peminjaman
            'keterangan' => 'required|in:Peminjaman,Pengembalian,Barang Baru,Pameran,Perbaikan,dll',
            'pesan' => 'nullable|string|max:255',
            'tanggal' => 'required|date',
            'status' => 'required|in:Inbound,Outbound',
            'lampiran' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // Maksimal 2MB
        ], [
            'no_referensi.required' => 'No referensi wajib diisi.',
            'users_id.required' => 'ID pengguna wajib diisi.',
            'keterangan.required' => 'Keterangan aktivitas wajib diisi.',
            'tanggal_keluar.after_or_equal' => 'Tanggal keluar harus sama atau setelah tanggal masuk.',
            'lampiran.required' => 'Lampiran wajib diunggah.',
            'lampiran.mimes' => 'Lampiran harus berupa file dengan format pdf, doc, atau docx.',
            'lampiran.max' => 'Ukuran file lampiran maksimal 2MB.',
        ]);

        // Proses upload file lampiran
        if ($request->hasFile('lampiran')) {
            $validatedData['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
        }

        // Simpan data ke database
        InOutCollection::create($validatedData);

        // Redirect atau respon dengan pesan sukses
        return redirect()->route('outbound')->with('success', 'Data aktivitas koleksi berhasil ditambahkan.');
    }



    /**
     * Display the specified resource.
     */
    public function show(InOutCollection $outbound)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(InOutCollection $outbound): Response
    {
        return Inertia::render('Outbound/Edit', [
            'outbound' => $outbound->load('users') // Pastikan relasi user dimuat
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InOutCollection $outbound)
{
    // Aturan validasi
    $rules = [
        'users_id' => 'required|exists:users,id',
        'no_referensi' => 'required|integer|max:255',
        'keterangan' => 'required|in:Peminjaman,Pengembalian,Barang Baru,Pameran,Perbaikan,dll',
        'pesan' => 'nullable|string|max:255',
        'tanggal' => 'required|date',
        'status' => 'required|in:Inbound,Outbound',
        'lampiran' => 'nullable|file|mimes:pdf,doc,docx|max:2048'
    ];

    // Tambahkan validasi file jika ada
    if ($request->hasFile('lampiran')) {
        $rules['lampiran'] = 'nullable|file|mimes:pdf,doc,docx|max:2048';
    }

    // Validasi data
    $validatedData = $request->validate($rules);

    // Tangani file upload jika ada
    if ($request->hasFile('lampiran')) {
        if ($outbound->lampiran) {
            Storage::delete($outbound->lampiran); // Hapus file lama
        }
        $validatedData['lampiran'] = $request->file('lampiran')->store('lampiran', 'public'); // Simpan file baru
    } else {
        // Jika tidak ada file baru, jangan ubah lampiran yang sudah ada
        unset($validatedData['lampiran']);
    }

    // Update data ke database
    $outbound->update($validatedData);

    return redirect()->route('outbound')->with('success', 'Data berhasil diperbarui.');
}




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InOutCollection $outbound)
{
    // Jika ada file lampiran, hapus dari penyimpanan
    if ($outbound->lampiran) {
        Storage::delete($outbound->lampiran);
    }

    // Hapus data dari database
    $outbound->delete();

    // Redirect atau kembalikan response JSON
    return redirect()->route('outbound')->with('success', 'Data berhasil dihapus.');
}

}
