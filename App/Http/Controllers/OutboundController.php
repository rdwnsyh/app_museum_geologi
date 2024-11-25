<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Outbound;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\InOutCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;


class OutboundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $outbound = InOutCollection::with('users:id,nama_lengkap')
            ->paginate(10); // Menggunakan pagination

        return inertia('Outbound/Index', [
            'outbound' => $outbound,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    // Ambil data pengguna yang sedang login
    $outbound = Auth::user();

    return inertia('Outbound/Create', [
        'outbound' => [
            'id' => $outbound->id,
            'nama_lengkap' => $outbound->nama_lengkap,
        ],
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request->allFiles());

        // Validasi data input
        $validatedData = $request->validate([
            'users_id' => 'required|exists:users,id',
            'no_referensi' => 'required|string|max:255', // Pastikan no_referensi valid dari tabel peminjaman
            'keterangan' => 'required|in:Peminjaman,Pengembalian,Barang Baru,Pameran,Perbaikan,dll',
            'pesan' => 'nullable|string|max:255',
            'tanggal_masuk' => 'required|date',
            'tanggal_keluar' => 'required|date|after_or_equal:tanggal_masuk',
            'status' => 'required|in:Inbound,Outbound',
            'lampiran' => 'required|file|mimes:pdf,doc,docx|max:2048', // Maksimal 2MB
        ], [
            'no_referensi.required' => 'No referensi wajib diisi.',
            'users_id.required' => 'ID pengguna wajib diisi.',
            'keterangan.required' => 'Keterangan aktivitas wajib diisi.',
            'tanggal_keluar.after_or_equal' => 'Tanggal keluar harus sama atau setelah tanggal masuk.',
            'lampiran.required' => 'Lampiran wajib diunggah.',
            'lampiran.mimes' => 'Lampiran harus berupa file dengan format pdf, doc, atau docx.',
            'lampiran.max' => 'Ukuran file lampiran maksimal 2MB.',
        ]);

        // Proses upload file lampiran
        if ($request->hasFile('lampiran')) {
            $validatedData['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
        }

        // Simpan data ke database
        InOutCollection::create($validatedData);

        // Redirect atau respon dengan pesan sukses
        return redirect()->route('outbound')->with('success', 'Data aktivitas koleksi berhasil ditambahkan.');
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

    public function edit(InOutCollection $outbound)
    {
        return Inertia::render('Outbound/Edit', [
            'outbound' => $outbound->load('users'), // Mengambil data outbound beserta relasi user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InOutCollection $outbound)
{
    // Debug data yang diterima
    // dd($request->all());

    // Validasi data input
    $validatedData = $request->validate([
        'users_id' => 'required|exists:users,id',
        'no_referensi' => 'required|string|max:255',
        'keterangan' => 'required|in:Peminjaman,Pengembalian,Barang Baru,Pameran,Perbaikan,dll',
        'pesan' => 'nullable|string|max:255',
        'tanggal_masuk' => 'required|date',
        'tanggal_keluar' => 'required|date|after_or_equal:tanggal_masuk',
        'status' => 'required|in:Inbound,Outbound',
        'lampiran' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
    ]);

    // Proses file baru jika ada
    if ($request->hasFile('lampiran')) {
        if ($outbound->lampiran) {
            Storage::delete($outbound->lampiran); // Hapus file lama jika ada
        }
        $validatedData['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
    }

    // Update data di database
    $outbound->update($validatedData);

    return redirect()->route('outbound.index')->with('success', 'Data berhasil diperbarui.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InOutCollection $outbound)
    {
        //
    }
}
