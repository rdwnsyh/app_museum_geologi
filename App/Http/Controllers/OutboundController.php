<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\InOutCollection;
use App\Models\DetailPeminjaman;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        // Ambil data koleksi yang tersedia untuk outbound
        $koleksi = KelolaKoleksi::all();

        // Ambil data peminjaman yang sedang berlangsung untuk menampilkan referensi
        $peminjaman = Peminjaman::where('status', 'Diterima')->get(); // Peminjaman yang diterima

        // Ambil data pengguna yang sedang login
        $user = auth()->user();

        // Pass data ke React component menggunakan Inertia
        return Inertia::render('Outbound/Create', [
            'koleksi' => $koleksi,
            'peminjaman' => $peminjaman,
            'user' => $user, // Mengirimkan data pengguna yang sedang login
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request): RedirectResponse
{
    // Validasi data yang diterima dari request
    // Validasi data yang diterima dari request
$validated = $request->validate([
    'users_id' => 'required|exists:users,id', // Pastikan users_id ada di tabel users
    'no_referensi' => 'nullable|exists:peminjaman,id', // Referensi peminjaman harus ada
    'keterangan' => 'required|string',
    'pesan' => 'nullable|string',
    'tanggal' => 'required|date',
    'status' => 'required|string|in:Outbound',
    'lampiran' => 'nullable|file|mimes:pdf,jpeg,png,jpg,doc,docx|max:2048',
    'koleksi' => 'required|array',
    'koleksi.*.koleksi_id' => 'required|exists:kelola_koleksi,id',
    'koleksi.*.jumlah_dipinjam' => 'required|integer|min:1',
]);

// Mulai transaksi untuk menjaga konsistensi data
DB::beginTransaction();
try {
    // Simpan data outbound
    $outbound = InOutCollection::create([
        'users_id' => $validated['users_id'],
        'no_referensi' => $validated['no_referensi'] ?? null,  // Pastikan 'no_referensi' bisa null
        'keterangan' => $validated['keterangan'],
        'pesan' => $validated['pesan'] ?? null,  // Pastikan pesan bisa null
        'tanggal' => $validated['tanggal'],
        'status' => $validated['status'],
    ]);

    // Tangani upload lampiran jika ada
    if ($request->hasFile('lampiran')) {
        $lampiranPath = $request->file('lampiran')->store('lampiran', 'public');
        $outbound->lampiran = $lampiranPath;
        $outbound->save();
    }

    // Menyimpan koleksi yang dipinjam
    foreach ($validated['koleksi'] as $koleksiItem) {
        $outbound->koleksi()->attach($koleksiItem['koleksi_id'], [
            'jumlah_dipinjam' => $koleksiItem['jumlah_dipinjam'],
        ]);
    }

    // Commit transaksi
    DB::commit();

    // Redirect ke halaman yang sesuai
    return redirect()->route('outbound')->with('success', 'Data outbound berhasil disimpan.');
} catch (\Exception $e) {
    // Rollback transaksi jika terjadi error
    DB::rollback();

    // Tampilkan pesan error
    return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
}

}
    
//     public function store(Request $request): RedirectResponse
// {
//     // dd($request->all());
//     $validatedData = $request->validate([
//         'users_id' => 'required|integer|exists:users,id',
//         'no_referensi' => 'required|string|max:255',
//         'keterangan' => 'required|string|max:255',
//         'pesan' => 'nullable|string',
//         'tanggal' => 'required|date',
//         'status' => 'required|in:Inbound,Outbound',
//         'lampiran' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
//         'koleksi' => 'required|array',
//         'koleksi.*.koleksi_id' => 'required|integer|exists:kelola_koleksi,id',
//         'koleksi.*.nama_koleksi' => 'required|string',
//         'koleksi.*.jumlah_dipinjam' => 'required|integer|min:1',
//     ]);


//     DB::beginTransaction();

//     try {
//         // Simpan data peminjaman
//         $inOutCollection = InOutCollection::create([
//             'users_id' => $validatedData['users_id'],
//             'no_referensi' => $validatedData['no_referensi'],
//             'keterangan' => $validatedData['keterangan'],
//             'pesan' => $validatedData['pesan'],
//             'tanggal' => $validatedData['tanggal'],
//             'status' => $validatedData['status'],
//             'lampiran' => $request->hasFile('lampiran') 
//                 ? $request->file('lampiran')->store('lampiran') 
//                 : null,
//         ]);
    
//         // Simpan detail koleksi
//         foreach ($validatedData['koleksi'] as $koleksi) {
//             $koleksiRecord = KelolaKoleksi::where('nama_koleksi', $koleksi['nama_koleksi'])->first();
    
//             if (!$koleksiRecord) {
//                 DetailPeminjaman::create([
//                     'peminjaman_id' => $inOutCollection->id,
//                     'koleksi_id' => $koleksiRecord->id,
//                     'jumlah_dipinjam' => $koleksi['jumlah_dipinjam'],
//                     'kondisi' => 'baik', // Bisa disesuaikan jika ada kolom kondisi
//                 ]);
//             }
//         }
    
//         DB::commit();
//         return redirect()->route('outbound')->with('success', 'Peminjaman berhasil dibuat.');
//     } catch (\Exception $e) {
//         DB::rollback();
//         Log::error('Error occurred during outbound store: ' . $e->getMessage());
//         return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage());
//     }
// }




    // public function store(Request $request): RedirectResponse
    // {
    //     // dd($request->allFiles());

    //     // Validasi data input
    //     $validatedData = $request->validate([
    //         'users_id' => 'required|exists:users,id',
    //         'no_referensi' => 'required|string|max:255', // Pastikan no_referensi valid dari tabel peminjaman
    //         'keterangan' => 'required|in:Peminjaman,Pengembalian,Barang Baru,Pameran,Perbaikan,dll',
    //         'pesan' => 'nullable|string|max:255',
    //         'tanggal' => 'required|date',
    //         'status' => 'required|in:Inbound,Outbound',
    //         'lampiran' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // Maksimal 2MB
    //     ], [
    //         'no_referensi.required' => 'No referensi wajib diisi.',
    //         'users_id.required' => 'ID pengguna wajib diisi.',
    //         'keterangan.required' => 'Keterangan aktivitas wajib diisi.',
    //         'tanggal_keluar.after_or_equal' => 'Tanggal keluar harus sama atau setelah tanggal masuk.',
    //         'lampiran.required' => 'Lampiran wajib diunggah.',
    //         'lampiran.mimes' => 'Lampiran harus berupa file dengan format pdf, doc, atau docx.',
    //         'lampiran.max' => 'Ukuran file lampiran maksimal 2MB.',
    //     ]);

    //     // Proses upload file lampiran
    //     if ($request->hasFile('lampiran')) {
    //         $validatedData['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
    //     }

    //     // Simpan data ke database
    //     InOutCollection::create($validatedData);

    //     // Redirect atau respon dengan pesan sukses
    //     return redirect()->route('outbound')->with('success', 'Data aktivitas koleksi berhasil ditambahkan.');
    // }



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
