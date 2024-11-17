<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use Illuminate\Http\Request;

class DashboardPeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Mengambil data dari tabel `peminjaman` beserta data terkait dari tabel `detail_peminjaman`
    $dataPeminjaman = Peminjaman::with(['detailPeminjaman.koleksi', 'users'])->get();
        // ->where('status', 'Pengajuan') // Contoh kondisi, sesuaikan dengan kebutuhan
    // dd($dataPeminjaman);

    // Mengirim data ke frontend menggunakan Inertia
    return Inertia::render('Peminjaman/Index', [
        'dataPeminjaman' => $dataPeminjaman
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
        $validated = $request->validate([
            'users_id' => 'required|exists:users,id',
            'keperluan' => 'required|string|max:255', //
            'tanggal_pinjam' => 'required|date',
            'tanggal_jatuh_tempo' => 'required|date',
            'identitas' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'surat_permohonan' => 'required|file|mimes:jpg,jpeg,png,docx,pdf|max:2048',
        ]);

        // Create new peminjaman record
        $peminjaman = new Peminjaman([
            'users_id' => $request->users_id,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'tanggal_jatuh_tempo' => $request->tanggal_jatuh_tempo,
        ]);

        // Handling file uploads
        if ($request->hasFile('identitas')) {
            $peminjaman->identitas = $request->file('identitas')->store('identitas');
        }

        if ($request->hasFile('surat_permohonan')) {
            $peminjaman->surat_permohonan = $request->file('surat_permohonan')->store('surat_permohonan');
        }

        $peminjaman->save();

        // Redirect to peminjaman.index with success message
        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil dibuat!');

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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
