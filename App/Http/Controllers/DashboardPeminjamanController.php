<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\DetailPeminjaman;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class DashboardPeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    // Ambil data peminjaman menggunakan filter dari model
    $peminjaman = Peminjaman::filter($request->only('search'))->with(['detailPeminjaman.koleksi', 'users'])->paginate(10);

    // Kirim data ke view menggunakan Inertia
    return Inertia::render('Peminjaman/Index', [
        'peminjaman' => $peminjaman,
        'filters' => $request->only('search'), // Kirim parameter filter untuk dipakai di frontend
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ambil data koleksi yang tersedia untuk peminjaman
        $koleksi = KelolaKoleksi::all();

        // Ambil data pengguna yang sedang login
        $user = auth()->user();

        // Pass data ke React component menggunakan Inertia
        return Inertia::render('Peminjaman/Create', [
            'koleksi' => $koleksi,
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
        'keperluan' => 'required|in:Penelitian,Pameran,Perbaikan,Dan Lain-Lain',
        'pesan' => 'nullable|string', // Pesan bisa kosong
        'tanggal_pinjam' => 'required|date', // Tanggal pinjam harus diisi dan valid
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Jatuh tempo harus setelah atau sama dengan tanggal pinjam
        'identitas' => 'required|file|mimes:pdf,jpeg,png,jpg,doc,docx|max:2048', // Identitas peminjam wajib diisi
        'surat_permohonan' => 'required|file|mimes:pdf,jpeg,png,jpg,doc,docx|max:2048', // Surat permohonan wajib diisi
        'koleksi' => 'required|array', // Koleksi yang dipinjam harus berupa array
        'koleksi.*.koleksi_id' => 'required|exists:kelola_koleksi,id', // Koleksi id harus valid
        'koleksi.*.jumlah_dipinjam' => 'required|integer|min:1', // Jumlah koleksi minimal 1
    ], [
        'users_id.required' => 'User ID harus diisi.',
        'users_id.exists' => 'User tidak ditemukan.',
        'keperluan.required' => 'Keperluan harus diisi.',
        'tanggal_pinjam.required' => 'Tanggal pinjam harus diisi.',
        'tanggal_pinjam.date' => 'Tanggal pinjam tidak valid.',
        'tanggal_jatuh_tempo.required' => 'Tanggal jatuh tempo harus diisi.',
        'tanggal_jatuh_tempo.date' => 'Tanggal jatuh tempo tidak valid.',
        'tanggal_jatuh_tempo.after_or_equal' => 'Tanggal jatuh tempo harus setelah atau sama dengan tanggal pinjam.',
        'identitas.required' => 'File identitas wajib diunggah.',
        'identitas.file' => 'File identitas tidak valid.',
        'identitas.mimes' => 'File identitas harus berupa PDF, DOC, DOCX, JPEG, PNG, atau JPG.',
        'surat_permohonan.required' => 'File surat permohonan wajib diunggah.',
        'surat_permohonan.file' => 'File surat permohonan tidak valid.',
        'surat_permohonan.mimes' => 'File surat permohonan harus berupa PDF, DOC, DOCX, JPEG, PNG, atau JPG.',
        'koleksi.required' => 'Koleksi harus dipilih.',
        'koleksi.array' => 'Koleksi harus berupa array.',
        'koleksi.*.koleksi_id.required' => 'ID koleksi harus dipilih.',
        'koleksi.*.koleksi_id.exists' => 'Koleksi tidak ditemukan.',
        'koleksi.*.jumlah_dipinjam.required' => 'Jumlah koleksi harus diisi.',
        'koleksi.*.jumlah_dipinjam.integer' => 'Jumlah koleksi harus berupa angka.',
        'koleksi.*.jumlah_dipinjam.min' => 'Jumlah koleksi minimal 1.',
    ]);

    DB::beginTransaction(); // Mulai transaksi untuk menjaga konsistensi data

    try {
        // Tangani upload file untuk identitas
        $identitasPath = $request->file('identitas')->store('identitas', 'public');

        // Tangani upload file untuk surat_permohonan
        $suratPermohonanPath = $request->file('surat_permohonan')->store('surat_permohonan', 'public');

        // Simpan data peminjaman
        $peminjaman = Peminjaman::create([
            'users_id' => $validated['users_id'],
            'keperluan' => $validated['keperluan'],
            'pesan' => $validated['pesan'] ?? null, // Pesan opsional
            'tanggal_pinjam' => $validated['tanggal_pinjam'],
            'tanggal_jatuh_tempo' => $validated['tanggal_jatuh_tempo'],
            'status' => 'Pengajuan',
            'status_pengembalian' => 'Dipinjam',
            'identitas' => $identitasPath, // Simpan path file identitas
            'surat_permohonan' => $suratPermohonanPath, // Simpan path file surat permohonan
        ]);

        // Menyimpan koleksi yang dipinjam pada tabel detail_peminjaman
        foreach ($validated['koleksi'] as $koleksiItem) {
            DetailPeminjaman::create([
                'peminjaman_id' => $peminjaman->id, // Menggunakan ID peminjaman yang baru dibuat
                'koleksi_id' => $koleksiItem['koleksi_id'],
                'jumlah_dipinjam' => $koleksiItem['jumlah_dipinjam'],
                'kondisi' => 'Baik', // Default kondisi koleksi
            ]);
        }

        // Commit transaksi jika semuanya berjalan lancar
        DB::commit();

        // Redirect ke halaman yang sesuai dengan pesan sukses
        return redirect()->route('peminjaman')->with('success', 'Data peminjaman berhasil disimpan.');
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Peminjaman $peminjaman): Response
    {
        $peminjaman = Peminjaman::with(['detailPeminjaman.koleksi', 'users'])->find($peminjaman->id);

        return Inertia::render('Peminjaman/Edit', [
            'peminjaman' => $peminjaman
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Peminjaman $peminjaman): RedirectResponse
    {

        // Validasi input dari form
        $validatedData = $request->validate([
            'pesan' => 'required|string|max:255',
            'status' => 'required|in:Pengajuan,Disetujui,Direvisi,Ditolak,Selesai',
        ], [
            'status.required' => 'Status harus diisi.',
            'status.in' => 'Status harus salah satu dari: Pengajuan, Disetujui, Direvisi, Ditolak',
        ]);

        // Update data peminjaman
        $peminjaman->update([
            'status' => $validatedData['status'],
            'pesan' => $validatedData['pesan'],
        ]);


        // Redirect ke halaman sebelumnya dengan pesan sukses
        return redirect()->route('peminjaman')->with('success', 'Data peminjaman berhasil diperbarui.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman)
{
    // Menghapus detail peminjaman terkait terlebih dahulu
    $peminjaman->detailPeminjaman()->delete();

    // Menghapus file identitas dan surat permohonan jika ada
    if ($peminjaman->identitas && Storage::exists('public/' . $peminjaman->identitas)) {
        Storage::delete('public/' . $peminjaman->identitas);
    }

    if ($peminjaman->surat_permohonan && Storage::exists('public/' . $peminjaman->surat_permohonan)) {
        Storage::delete('public/' . $peminjaman->surat_permohonan);
    }

    // Menghapus data peminjaman
    $peminjaman->delete();

    // Redirect ke halaman sebelumnya dengan pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Data peminjaman berhasil dihapus.');
}

}
