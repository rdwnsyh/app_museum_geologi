<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class DashboardPeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Mengambil data dari tabel `peminjaman` beserta data terkait dari tabel `detail_peminjaman`
        $peminjaman = Peminjaman::with(['detailPeminjaman.koleksi', 'users'])->get();

        // Mengirim data ke frontend menggunakan Inertia
        return Inertia::render('Peminjaman/Index', [
            'peminjaman' => $peminjaman
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

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
            'status' => 'required|in:Pengajuan,Terlambat,Ditolak,Diterima',
        ], [
            'status.required' => 'Status harus diisi.',
            'status.in' => 'Status harus salah satu dari: Pengajuan, Terlambat, Ditolak, Diterima.',
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
