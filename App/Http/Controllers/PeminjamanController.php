<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use Illuminate\Http\Request;

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
        'koleksi_id' => 'required|integer|exists:batuan,id', // Validasi ID koleksi dari tabel batuan atau sesuaikan jika koleksi dari fosil/sumber_daya_geologi
        'jenis_koleksi' => 'required|string|in:batuan,fosil,sumber_daya_geologi', // Validasi jenis koleksi
        'peminjam' => 'required|string|max:255', // Validasi nama peminjam
        'keperluan' => 'required|string|max:255', // Validasi keperluan peminjaman
        'tanggal_pinjam' => 'required|date', // Validasi tanggal pinjam
        'surat_permohonan' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi file surat permohonan (PDF, DOC, DOCX)
        'identitas_diri' => 'required|file|mimes:jpeg,png,jpg|max:2048', // Validasi file identitas diri (format gambar: jpeg, png, jpg)
    ], [
        'koleksi_id.required' => 'ID koleksi harus diisi.',
        'koleksi_id.integer' => 'ID koleksi harus berupa angka.',
        'koleksi_id.exists' => 'ID koleksi tidak ditemukan.',
        'jenis_koleksi.required' => 'Jenis koleksi harus diisi.',
        'jenis_koleksi.in' => 'Jenis koleksi harus berupa batuan, fosil, atau sumber daya geologi.',
        'peminjam.required' => 'Nama peminjam harus diisi.',
        'keperluan.required' => 'Keperluan peminjaman harus diisi.',
        'tanggal_pinjam.required' => 'Tanggal peminjaman harus diisi.',
        'surat_permohonan.required' => 'File surat permohonan harus diunggah.',
        'surat_permohonan.mimes' => 'Format file surat permohonan harus berupa: pdf, doc, atau docx.',
        'surat_permohonan.max' => 'Ukuran file surat permohonan maksimal 2MB.',
        'identitas_diri.required' => 'Identitas diri harus diunggah.',
        'identitas_diri.mimes' => 'Format file identitas harus berupa: jpeg, png, atau jpg.',
        'identitas_diri.max' => 'Ukuran file identitas maksimal 2MB.',
    ]);

    // Proses upload file surat permohonan
    if ($request->hasFile('surat_permohonan')) {
        $validatedData['surat_permohonan'] = $request->file('surat_permohonan')->store('peminjaman/surat_permohonan', 'public');
    }

    // Proses upload file identitas diri
    if ($request->hasFile('identitas_diri')) {
        $validatedData['identitas_diri'] = $request->file('identitas_diri')->store('peminjaman/identitas_diri', 'public');
    }

    // Set default status peminjaman sebagai 'pengajuan'
    $validatedData['status_peminjaman'] = 'pengajuan';

    // Simpan data peminjaman ke database
    Peminjaman::create($validatedData);

    // Redirect atau kirim pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Data peminjaman berhasil diajukan.');
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
        'koleksi_id' => 'required|exists:batuan,id,exists:fosil,id,exists:sumber_daya_geologi,id',
        'peminjam' => 'required|string|max:255',
        'keperluan' => 'required|string|max:255',
        'tanggal_pinjam' => 'required|date',
        'surat_permohonan' => 'required|string|max:255',
        'identitas_diri' => 'required|string|max:255',
        'jenis_koleksi' => 'required|in:batuan,fosil,sumber_daya_geologi',
        'status_peminjaman' => 'required|in:pengajuan,dipinjam,ditolak,terlambat,selesai',
    ], [
        // Custom error messages
        'koleksi_id.required' => 'Koleksi harus dipilih.',
        'koleksi_id.exists' => 'Koleksi yang dipilih tidak valid.',
        'peminjam.required' => 'Nama peminjam harus diisi.',
        'keperluan.required' => 'Keperluan peminjaman harus diisi.',
        'tanggal_pinjam.required' => 'Tanggal peminjaman harus diisi.',
        'tanggal_pinjam.date' => 'Format tanggal tidak valid.',
        'surat_permohonan.required' => 'Surat permohonan harus diunggah.',
        'identitas_diri.required' => 'Identitas diri harus diunggah.',
        'jenis_koleksi.required' => 'Jenis koleksi harus dipilih.',
        'jenis_koleksi.in' => 'Jenis koleksi harus salah satu dari: batuan, fosil, atau sumber daya geologi.',
        'status_peminjaman.required' => 'Status peminjaman harus diisi.',
        'status_peminjaman.in' => 'Status peminjaman harus salah satu dari: pengajuan, dipinjam, ditolak, terlambat, atau selesai.',
    ]);

    // Update data peminjaman dengan data yang telah divalidasi
    $peminjaman->update($validatedData);

    // Redirect ke halaman sebelumnya dengan pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Data peminjaman berhasil diperbarui.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman)
{
    // Pastikan data peminjaman sudah ada sebelum dihapus
    if (!$peminjaman) {
        return redirect()->route('peminjaman.index')->with('error', 'Data peminjaman tidak ditemukan.');
    }

    // Logika untuk memastikan status peminjaman bisa dihapus (opsional)
    if ($peminjaman->status_peminjaman !== 'selesai') {
        return redirect()->route('peminjaman.index')->with('error', 'Peminjaman yang belum selesai tidak dapat dihapus.');
    }

    // Hapus data peminjaman
    $peminjaman->delete();

    // Redirect ke halaman daftar peminjaman dengan pesan sukses
    return redirect()->route('peminjaman.index')->with('success', 'Data peminjaman berhasil dihapus.');
}

}
