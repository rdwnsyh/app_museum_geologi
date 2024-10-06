<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\DetailPeminjaman;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $peminjaman = Peminjaman::with('details.koleksi', 'user')->where('users_id', Auth::id())->get();
    return inertia('Peminjaman/Index', compact('peminjaman'));
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $koleksi = KelolaKoleksi::where('status', 'ada')->get(); // Only available items
        return inertia('Peminjaman/Create', compact('koleksi'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    // Validasi data input
    $validatedData = $request->validate([
        // Tabel Peminjaman
        'users_id' => 'required|exists:users,id', // Pastikan pengguna terdaftar di tabel users
        'tanggal_pinjam' => 'required|date|after_or_equal:today', // Tanggal pinjam tidak boleh sebelum hari ini
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Jatuh tempo harus setelah atau sama dengan tanggal pinjam
        'status' => 'required|in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Dikembalikan', // Validasi status peminjaman
        'identitas' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi identitas peminjam
        'surat_permohonan' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi file surat permohonan (PDF, DOC, DOCX maksimal 2MB)

        // Tabel Detail Peminjaman
        'koleksi_id' => 'required|exists:kelola_koleksi,id', // Pastikan koleksi yang dipinjam ada di tabel kelola_koleksi
        'jumlah_dipinjam' => 'required|integer|min:1', // Jumlah barang yang dipinjam
        'kondisi' => 'required|string|max:255', // Kondisi barang saat dipinjam
    ], [
        'users_id.required' => 'Pengguna harus diisi.',
        'users_id.exists' => 'Pengguna tidak ditemukan.',
        'tanggal_pinjam.required' => 'Tanggal pinjam harus diisi.',
        'tanggal_pinjam.date' => 'Format tanggal pinjam tidak valid.',
        'tanggal_pinjam.after_or_equal' => 'Tanggal pinjam tidak boleh sebelum hari ini.',
        'tanggal_jatuh_tempo.required' => 'Tanggal jatuh tempo harus diisi.',
        'tanggal_jatuh_tempo.date' => 'Format tanggal jatuh tempo tidak valid.',
        'tanggal_jatuh_tempo.after_or_equal' => 'Tanggal jatuh tempo harus sama atau setelah tanggal pinjam.',
        'status.required' => 'Status harus diisi.',
        'status.in' => 'Status harus berupa salah satu dari: Pengajuan, Sedang di Pinjam, Terlambat, Ditolak, Selesai.',
        'identitas.required' => 'Identitas harus diisi.',
        'surat_permohonan.required' => 'File surat permohonan harus diunggah.',
        'surat_permohonan.mimes' => 'Format file surat permohonan harus berupa: pdf, doc, atau docx.',
        'surat_permohonan.max' => 'Ukuran file surat permohonan maksimal 2MB.',
        'koleksi_id.exists' => 'Koleksi yang dipilih tidak ditemukan.',
    ]);

    // Proses upload file identitas
    if ($request->hasFile('identitas')) {
        $validatedData['identitas'] = $request->file('identitas')->store('identitas', 'public');
    }

    // Proses upload file surat permohonan
    if ($request->hasFile('surat_permohonan')) {
        $validatedData['surat_permohonan'] = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
    }

    // Simpan data peminjaman ke tabel `peminjaman`
    $peminjaman = Peminjaman::create([
        'users_id' => $validatedData['users_id'],
        'tanggal_pinjam' => $validatedData['tanggal_pinjam'],
        'tanggal_jatuh_tempo' => $validatedData['tanggal_jatuh_tempo'],
        'status' => $validatedData['status'],
        'identitas' => $validatedData['identitas'],
        'surat_permohonan' => $validatedData['surat_permohonan'],
    ]);

    // Store each item borrowed
    foreach ($request->koleksi as $item) {
        DetailPeminjaman::create([
            'peminjaman_id' => $peminjaman->id,
            'koleksi_id' => $item['id'],
            'jumlah_dipinjam' => $item['jumlah_dipinjam'],
            'kondisi' => 'baik' // Default condition
        ]);
    }

    // Redirect atau kirim pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Peminjaman berhasil diajukan');
}


    /**
     * Display the specified resource.
     */
    public function show(Peminjaman $peminjaman)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Peminjaman $peminjaman)
    {
         // Memuat data peminjaman beserta detail peminjaman dan koleksi yang terkait
        $peminjaman->load('detailPeminjaman.koleksi', 'user');

        // Mengirim data ke frontend untuk ditampilkan di form edit
        return Inertia::render('Peminjaman/Edit', [
            'peminjaman' => $peminjaman
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Peminjaman $peminjaman)
{
    // Validate the incoming status field
    $request->validate([
        'status' => 'required|in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Selesai'
    ]);

    // Update the status of the peminjaman
    $peminjaman->update([
        'status' => $request->status
    ]);

    // Return back with a success message
    return back()->with('success', 'Status peminjaman diperbarui');
}





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman)
{
    // Pastikan data peminjaman sudah ada sebelum dihapus
    if (!$peminjaman) {
        return redirect()->route('peminjaman')->with('error', 'Data peminjaman tidak ditemukan.');
    }

    // Logika untuk memastikan status peminjaman bisa dihapus (opsional)
    if ($peminjaman->status_peminjaman !== 'selesai') {
        return redirect()->route('peminjaman')->with('error', 'Peminjaman yang belum selesai tidak dapat dihapus.');
    }

    // Hapus file surat permohonan jika ada
    if ($peminjaman->surat_permohonan) {
        Storage::disk('public')->delete($peminjaman->surat_permohonan);
    }

    // Hapus file identitas diri jika ada
    if ($peminjaman->identitas_diri) {
        Storage::disk('public')->delete($peminjaman->identitas_diri);
    }

    // Hapus data peminjaman
    $peminjaman->delete();

    // Redirect ke halaman daftar peminjaman dengan pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Data peminjaman dan file terkait berhasil dihapus.');
}

}
