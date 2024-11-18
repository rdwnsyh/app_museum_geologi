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
        // $validated = $request->validate([
        //     'users_id' => 'required|exists:users,id',
        //     'keperluan' => 'required|string|max:255', //
        //     'tanggal_pinjam' => 'required|date',
        //     'tanggal_jatuh_tempo' => 'required|date',
        //     'identitas' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        //     'surat_permohonan' => 'required|file|mimes:jpg,jpeg,png,docx,pdf|max:2048',
        // ]);

        // // Create new peminjaman record
        // $peminjaman = new Peminjaman([
        //     'users_id' => $request->users_id,
        //     'tanggal_pinjam' => $request->tanggal_pinjam,
        //     'tanggal_jatuh_tempo' => $request->tanggal_jatuh_tempo,
        // ]);

        // // Handling file uploads
        // if ($request->hasFile('identitas')) {
        //     $peminjaman->identitas = $request->file('identitas')->store('identitas');
        // }

        // if ($request->hasFile('surat_permohonan')) {
        //     $peminjaman->surat_permohonan = $request->file('surat_permohonan')->store('surat_permohonan');
        // }

        // $peminjaman->save();

        // // Redirect to peminjaman.index with success message
        // return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil dibuat!');

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
            'keperluan' => 'required|string|max:255',
            'tanggal_pinjam' => 'required|date',
            'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam',
            'identitas' => 'nullable|file|mimes:png,jpg,jpeg,pdf|max:2048',
            'surat_permohonan' => 'nullable|file|mimes:png,jpg,jpeg,pdf|max:2048',
            'items' => 'required|array',
            'items.*.koleksi_id' => 'required|exists:kelola_koleksi,id',
            'items.*.jumlah_dipinjam' => 'required|integer|min:1',
            'items.*.kondisi' => 'nullable|string',
        ]);

        // Update data peminjaman
        $peminjaman->update([
            'tanggal_pinjam' => $validatedData['tanggal_pinjam'],
            'tanggal_jatuh_tempo' => $validatedData['tanggal_jatuh_tempo'],
        ]);

        // Perbarui file identitas jika ada
        if ($request->hasFile('identitas')) {
            $identitasPath = $request->file('identitas')->store('identitas', 'public');
            $peminjaman->update(['identitas' => $identitasPath]);
        }

        // Perbarui file surat permohonan jika ada
        if ($request->hasFile('surat_permohonan')) {
            $suratPermohonanPath = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
            $peminjaman->update(['surat_permohonan' => $suratPermohonanPath]);
        }

        // Hapus detail peminjaman yang lama
        $peminjaman->detailPeminjaman()->delete();

        // Tambahkan kembali detail peminjaman yang baru
        foreach ($validatedData['items'] as $item) {
            $peminjaman->detailPeminjaman()->create([
                'koleksi_id' => $item['koleksi_id'],
                'jumlah_dipinjam' => $item['jumlah_dipinjam'],
                'kondisi' => $item['kondisi'] ?? null,
            ]);
        }

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
