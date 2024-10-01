<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Peminjaman/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Peminjaman/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
        'users_id' => 'required|exists:users,id', // Validasi ID pengguna harus ada di tabel users
        'tanggal_pinjam' => 'required|date|after_or_equal:today', // Validasi tanggal pinjam harus berupa tanggal dan tidak boleh sebelum hari ini
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Tanggal jatuh tempo tidak boleh sebelum tanggal pinjam
        'status' => 'required|in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Dikembalikan', // Validasi status harus berisi salah satu dari nilai yang valid
        'identitas' => 'required|string|max:255', // Validasi identitas peminjam
        'surat_permohonan' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi file surat permohonan (PDF, DOC, DOCX maksimal 2MB)
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
        'status.in' => 'Status harus berupa salah satu dari: Pengajuan, Sedang di Pinjam, Terlambat, Ditolak, atau Dikembalikan.',
        'identitas.required' => 'Identitas harus diisi.',
        'surat_permohonan.required' => 'File surat permohonan harus diunggah.',
        'surat_permohonan.mimes' => 'Format file surat permohonan harus berupa: pdf, doc, atau docx.',
        'surat_permohonan.max' => 'Ukuran file surat permohonan maksimal 2MB.',
    ]);

    // Proses upload file identitas
    if ($request->hasFile('identitas')) {
        $validatedData['identitas'] = $request->file('identitas')->store('identitas', 'public');
    }
    // Proses upload file surat permohonan
    if ($request->hasFile('surat_permohonan')) {
        $validatedData['surat_permohonan'] = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
    }

    // Simpan data ke dalam database
    Peminjaman::create($validatedData);

    // Redirect atau kirim pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Peminjaman berhasil diajukan.');
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
        // Menampilkan halaman edit dengan data yang diambil
        return Inertia::render('Peminjaman/Edit', [
            'peminjaman' => $peminjaman
            // dd($kelolaKoleksiBatuan)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Peminjaman $peminjaman)
{
    // Validasi data input
    $validatedData = $request->validate([
        'users_id' => 'required|exists:users,id', // Validasi ID pengguna harus ada di tabel users
        'tanggal_pinjam' => 'required|date|after_or_equal:today', // Validasi tanggal pinjam tidak boleh sebelum hari ini
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Tanggal jatuh tempo harus setelah atau sama dengan tanggal pinjam
        'status' => 'required|in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Dikembalikan', // Validasi status yang valid
        'identitas' => 'required|string|max:255', // Validasi identitas peminjam
        'surat_permohonan' => 'nullable|file|mimes:pdf,doc,docx|max:2048', // Validasi file surat permohonan (nullable saat update)
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
        'status.in' => 'Status harus berupa Pengajuan, Sedang di Pinjam, Terlambat, Ditolak, atau Dikembalikan.',
        'identitas.required' => 'Identitas harus diisi.',
        'surat_permohonan.mimes' => 'Format file surat permohonan harus berupa: pdf, doc, atau docx.',
        'surat_permohonan.max' => 'Ukuran file surat permohonan maksimal 2MB.',
    ]);

    // Proses upload file surat permohonan jika ada
    if ($request->hasFile('surat_permohonan')) {
        // Hapus file lama jika ada
        if ($peminjaman->surat_permohonan) {
            Storage::disk('public')->delete($peminjaman->surat_permohonan);
        }
        // Simpan file surat permohonan yang baru
        $validatedData['surat_permohonan'] = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
    }
    // Proses upload file surat permohonan jika ada
    if ($request->hasFile('identitas')) {
        // Hapus file lama jika ada
        if ($peminjaman->identitas) {
            Storage::disk('public')->delete($peminjaman->identitas);
        }
        // Simpan file surat permohonan yang baru
        $validatedData['identitas'] = $request->file('identitas')->store('identitas', 'public');
    }

    // Update data peminjaman dengan data yang telah divalidasi
    $peminjaman->update($validatedData);

    // Redirect ke halaman sebelumnya dengan pesan sukses
    return redirect()->route('peminjaman')->with('success', 'peminjaman berhasil diperbarui.');
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
