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
    $validated = $request->validate([
        'users_id' => 'required|exists:users,id', // Pastikan users_id ada di tabel users
        'no_referensi' => 'nullable|string', // Referensi peminjaman bisa null dan valid jika ada
        'keterangan' => 'required|string',
        'pesan' => 'nullable|string',
        'tanggal' => 'required|date',
        'status' => 'required|string|in:Outbound', // Status hanya bisa Outbound
        'lampiran' => 'nullable|file|mimes:pdf,jpeg,png,jpg,doc,docx|max:2048',
        'koleksi' => 'required|array', // Koleksi yang dipinjam harus berupa array
        'koleksi.*.koleksi_id' => 'required|exists:kelola_koleksi,id', // Koleksi id harus ada di tabel kelola_koleksi
        'koleksi.*.jumlah_dipinjam' => 'required|integer|min:1', // Jumlah koleksi yang dipinjam harus lebih dari 0
    ], [
        'users_id.required' => 'User ID harus diisi.',
        'users_id.exists' => 'User tidak ditemukan.',
        'no_referensi' => 'Referensi harus diisi.',
        'keterangan.required' => 'Keterangan harus diisi.',
        'tanggal.required' => 'Tanggal harus diisi.',
        'tanggal.date' => 'Tanggal tidak valid.',
        'status.in' => 'Status harus Outbound.',
        'koleksi.required' => 'Koleksi yang dipinjam harus dipilih.',
        'koleksi.array' => 'Koleksi harus berupa array.',
        'koleksi.*.koleksi_id.required' => 'ID koleksi harus dipilih.',
        'koleksi.*.koleksi_id.exists' => 'Koleksi tidak ditemukan.',
        'koleksi.*.jumlah_dipinjam.required' => 'Jumlah koleksi yang dipinjam harus diisi.',
        'koleksi.*.jumlah_dipinjam.integer' => 'Jumlah koleksi yang dipinjam harus berupa angka.',
        'koleksi.*.jumlah_dipinjam.min' => 'Jumlah koleksi yang dipinjam tidak boleh kurang dari 1.',
    ]);

    DB::beginTransaction(); // Mulai transaksi untuk menjaga konsistensi data

    try {
        // Simpan data outbound
        $outbound = InOutCollection::create([
            'users_id' => $validated['users_id'],
            'no_referensi' => $validated['no_referensi'] ?? null,  // Bisa kosong jika tidak ada referensi
            'keterangan' => $validated['keterangan'],
            'pesan' => $validated['pesan'] ?? null,  // Pesan bisa kosong jika tidak ada
            'tanggal' => $validated['tanggal'],
            'status' => $validated['status'],
        ]);

        // Tangani upload lampiran jika ada
        if ($request->hasFile('lampiran') && $request->file('lampiran')->isValid()) {
            $lampiranPath = $request->file('lampiran')->store('lampiran', 'public');
            $outbound->lampiran = $lampiranPath;
            $outbound->save();
        }

        // Menyimpan koleksi yang dipinjam pada tabel detail_peminjaman
        foreach ($validated['koleksi'] as $koleksiItem) {
            // Simpan detail peminjaman dengan outbound_id yang baru dibuat
            DetailPeminjaman::create([
                'peminjaman_id' => $outbound->id, // Menggunakan ID outbound yang baru dibuat
                'koleksi_id' => $koleksiItem['koleksi_id'],
                'jumlah_dipinjam' => $koleksiItem['jumlah_dipinjam'],
                'kondisi' => 'Baik', // Default kondisi koleksi
            ]);
        }

        // Commit transaksi jika semuanya berjalan lancar
        DB::commit();

        // Redirect ke halaman yang sesuai dengan pesan sukses
        return redirect()->route('outbound')->with('success', 'Data outbound berhasil disimpan.');
    } catch (\Exception $e) {
        // Rollback transaksi jika terjadi error
        DB::rollback();

        // Tampilkan pesan error
        return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
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
        $outbound->load(['detailPeminjaman.koleksi', 'users']);

        return inertia('Outbound/Edit', [
            'outbound' => $outbound // Kirim data outbound beserta detailPeminjaman ke frontend
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InOutCollection $outbound)
{
    // Validasi data yang diterima dari request
    $validated = $request->validate([
        'users_id' => 'required|exists:users,id', // Pastikan users_id ada di tabel users
        'no_referensi' => 'nullable|exists:peminjaman,id', // Referensi peminjaman bisa null dan valid jika ada
        'keterangan' => 'required|string',
        'pesan' => 'nullable|string',
        'tanggal' => 'required|date',
        'status' => 'required|string|in:Outbound', // Status hanya bisa Outbound
        'lampiran' => 'nullable|file|mimes:pdf,jpeg,png,jpg,doc,docx|max:2048',
        'koleksi' => 'required|array', // Koleksi yang dipinjam harus berupa array
        'koleksi.*.koleksi_id' => 'required|exists:kelola_koleksi,id', // Koleksi id harus ada di tabel kelola_koleksi
        'koleksi.*.jumlah_dipinjam' => 'required|integer|min:1', // Jumlah koleksi yang dipinjam harus lebih dari 0
    ], [
        'users_id.required' => 'User ID harus diisi.',
        'users_id.exists' => 'User tidak ditemukan.',
        'no_referensi.exists' => 'Referensi peminjaman tidak ditemukan.',
        'keterangan.required' => 'Keterangan harus diisi.',
        'tanggal.required' => 'Tanggal harus diisi.',
        'tanggal.date' => 'Tanggal tidak valid.',
        'status.required' => 'Status harus dipilih.',
        'status.in' => 'Status harus Outbound.',
        'koleksi.required' => 'Koleksi yang dipinjam harus dipilih.',
        'koleksi.array' => 'Koleksi harus berupa array.',
        'koleksi.*.koleksi_id.required' => 'ID koleksi harus dipilih.',
        'koleksi.*.koleksi_id.exists' => 'Koleksi tidak ditemukan.',
        'koleksi.*.jumlah_dipinjam.required' => 'Jumlah koleksi yang dipinjam harus diisi.',
        'koleksi.*.jumlah_dipinjam.integer' => 'Jumlah koleksi yang dipinjam harus berupa angka.',
        'koleksi.*.jumlah_dipinjam.min' => 'Jumlah koleksi yang dipinjam tidak boleh kurang dari 1.',
    ]);

    DB::beginTransaction(); // Mulai transaksi untuk menjaga konsistensi data

    try {
        // Update data outbound
        $outbound->update([
            'users_id' => $validated['users_id'],
            'no_referensi' => $validated['no_referensi'] ?? null,  // Bisa kosong jika tidak ada referensi
            'keterangan' => $validated['keterangan'],
            'pesan' => $validated['pesan'] ?? null,  // Pesan bisa kosong jika tidak ada
            'tanggal' => $validated['tanggal'],
            'status' => $validated['status'],
        ]);

        // Tangani upload lampiran jika ada
        if ($request->hasFile('lampiran') && $request->file('lampiran')->isValid()) {
            $lampiranPath = $request->file('lampiran')->store('lampiran', 'public');
            $outbound->lampiran = $lampiranPath;
            $outbound->save();
        }

        // Hapus koleksi yang lama sebelum menyimpan yang baru
        $outbound->koleksi()->detach();

        // Menyimpan koleksi yang dipinjam pada tabel detail_peminjaman
        foreach ($validated['koleksi'] as $koleksiItem) {
            // Simpan detail peminjaman dengan outbound_id yang sudah ada
            DetailPeminjaman::create([
                'peminjaman_id' => $outbound->id, // Menggunakan ID outbound yang sudah ada
                'koleksi_id' => $koleksiItem['koleksi_id'],
                'jumlah_dipinjam' => $koleksiItem['jumlah_dipinjam'],
                'kondisi' => 'Baik', // Default kondisi koleksi
            ]);
        }

        // Commit transaksi jika semuanya berjalan lancar
        DB::commit();

        // Redirect ke halaman yang sesuai dengan pesan sukses
        return redirect()->route('outbound')->with('success', 'Data outbound berhasil diperbarui.');
    } catch (\Exception $e) {
        // Rollback transaksi jika terjadi error
        DB::rollback();

        // Tampilkan pesan error
        return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
}





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InOutCollection $outbound)
    {
        // Jika ada file lampiran, hapus dari penyimpanan
        if ($outbound->lampiran) {
            // Menggunakan Storage untuk menghapus file dengan benar
            Storage::disk('public')->delete($outbound->lampiran);
        }
    
        // Hapus data dari database
        $outbound->delete();
    
        // Redirect atau kembalikan response JSON
        return redirect()->route('outbound')->with('success', 'Data berhasil dihapus.');
    }
    

}
