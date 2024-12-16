<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use Illuminate\Support\Facades\DB;

class PengembalianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Mengambil data pengembalian dengan filter pencarian
        $pengembalian = Pengembalian::filter($request->only('search'))
            ->with(['peminjaman.users'])
            ->paginate(10);

        // Mengirim data ke frontend
        return Inertia::render('Pengembalian/Index', [
            'pengembalian' => $pengembalian,
            'filters' => $request->only('search'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    $peminjaman = Peminjaman::where('status', 'Disetujui')
        ->whereDoesntHave('pengembalian') // Pastikan belum ada pengembalian
        ->with(['users', 'detailPeminjaman.koleksi']) // Load pengguna dan koleksi
        ->get();

    return Inertia::render('Pengembalian/Create', [
        'peminjaman' => $peminjaman,
    ]);
}



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // dd($request->all());
    // Validasi input
    $validated = $request->validate([
        'peminjaman_id' => 'required|exists:peminjaman,id', // Pastikan peminjaman ada
        'tanggal_kembali' => 'required|date|after_or_equal:tanggal_pinjam', // Tanggal kembali harus valid dan tidak sebelum tanggal pinjam
        'status_pengembalian' => 'required|in:Dikembalikan,Terlambat', // Status pengembalian harus valid
        'keterangan' => 'nullable|string|max:255', // Keterangan opsional
    ], [
        'peminjaman_id.required' => 'Peminjaman harus dipilih.',
        'peminjaman_id.exists' => 'Peminjaman tidak ditemukan.',
        'tanggal_kembali.required' => 'Tanggal kembali harus diisi.',
        'tanggal_kembali.date' => 'Tanggal kembali tidak valid.',
        'tanggal_kembali.after_or_equal' => 'Tanggal kembali tidak boleh sebelum tanggal pinjam.',
        'status_pengembalian.required' => 'Status pengembalian harus diisi.',
        'status_pengembalian.in' => 'Status pengembalian tidak valid.',
    ]);

    try {
        // Mulai transaksi database
        DB::beginTransaction();

        // Periksa apakah peminjaman valid untuk pengembalian
        $peminjaman = Peminjaman::findOrFail($validated['peminjaman_id']);
        if ($peminjaman->status !== 'Disetujui') {
            return redirect()->back()->withErrors([
                'peminjaman_id' => 'Peminjaman ini tidak valid untuk pengembalian.',
            ]);
        }

        // Simpan data pengembalian
        Pengembalian::create([
            'peminjaman_id' => $validated['peminjaman_id'],
            'tanggal_kembali' => $validated['tanggal_kembali'],
            'status_pengembalian' => $validated['status_pengembalian'],
            'keterangan' => $validated['keterangan'],
        ]);

        // Perbarui status peminjaman
        $peminjaman->update(['status' => 'Selesai']);

        // Commit transaksi
        DB::commit();

        return redirect()->route('pengembalian')->with('success', 'Pengembalian berhasil disimpan.');
    } catch (\Exception $e) {
        // Rollback jika terjadi kesalahan
        DB::rollBack();
        return redirect()->back()->withErrors([
            'error' => 'Terjadi kesalahan: ' . $e->getMessage(),
        ]);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(Pengembalian $pengembalian)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengembalian $pengembalian)
{
    // Muat data pengembalian beserta detail peminjaman dan koleksi
    $pengembalian->load('peminjaman.detailPeminjaman.koleksi', 'peminjaman.users');

    return Inertia::render('Pengembalian/Edit', [
        'pengembalian' => $pengembalian,
    ]);
}





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengembalian $pengembalian)
{
    // Validasi input
    $validatedData = $request->validate([
        'tanggal_kembali' => 'required|date',
        'status_pengembalian' => 'required|in:Dikembalikan,Terlambat',
        'keterangan' => 'nullable|string|max:255',
    ]);

    try {
        // Perbarui data pengembalian
        $pengembalian->update($validatedData);

        // Berikan respon sukses
        return redirect()
            ->route('pengembalian')
            ->with('success', 'Data pengembalian berhasil diperbarui.');
    } catch (\Exception $e) {
        // Berikan respon jika ada error
        return redirect()
            ->back()
            ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengembalian $pengembalian)
{
    try {
        // Hapus data pengembalian
        $pengembalian->delete();

        // Berikan respon sukses
        return redirect()
            ->route('pengembalian')
            ->with('success', 'Data pengembalian berhasil dihapus.');
    } catch (\Exception $e) {
        // Berikan respon jika ada error
        return redirect()
            ->back()
            ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
}

}
