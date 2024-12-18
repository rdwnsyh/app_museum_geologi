<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Inbound;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\InOutCollection;
use App\Models\DetailPeminjaman;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class InboundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Mengambil data inbound dengan filter pencarian
        $inbound = InOutCollection::filter($request->only('search'))
            ->with(['users', 'detailPeminjaman'])
            ->where('status', 'Inbound') // Pastikan hanya mengambil data Inbound
            ->paginate(10);

        // Mengirim data ke frontend
        return Inertia::render('Inbound/Index', [
            'inbound' => $inbound,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    // Ambil pengguna yang sedang login
    $user = auth()->user();

    // Ambil koleksi yang tersedia untuk input manual
    $koleksiBaru = KelolaKoleksi::select('id', 'nama_koleksi', 'deskripsi_koleksi')->get();

    // Ambil data pengembalian dengan status 'Selesai'
    $pengembalian = Peminjaman::with(['detailPeminjaman.koleksi', 'users'])
        ->where('status', 'Selesai') // Filter hanya yang selesai
        ->get()
        ->map(function ($peminjaman) {
            return [
                'id' => $peminjaman->id,
                'nama_peminjam' => $peminjaman->users->nama_lengkap ?? 'N/A',
                'tanggal_pinjam' => $peminjaman->tanggal_pinjam,
                'tanggal_jatuh_tempo' => $peminjaman->tanggal_jatuh_tempo,
                'status' => $peminjaman->status,
                'detail_peminjaman' => $peminjaman->detailPeminjaman->map(function ($detail) {
                    return [
                        'koleksi_id' => $detail->koleksi->id ?? null,
                        'nama_koleksi' => $detail->koleksi->nama_koleksi ?? 'N/A',
                        'jumlah_dipinjam' => $detail->jumlah_dipinjam,
                    ];
                }),
            ];
        });

    return Inertia::render('Inbound/Create', [
        'user' => $user, // Data pengguna
        'pengembalian' => $pengembalian, // Data pengembalian dengan detail yang sudah selesai
        'koleksiBaru' => $koleksiBaru, // Koleksi baru untuk input manual
    ]);
}




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         // Validasi data yang diterima dari request
    $validated = $request->validate([
        'users_id' => 'required|exists:users,id', // ID pengguna harus valid
        'no_referensi' => 'nullable|string', // No referensi opsional
        'keterangan' => 'required|string',
        'pesan' => 'nullable|string',
        'tanggal' => 'required|date',
        'status' => 'required|string|in:Inbound', // Status harus Inbound
        'lampiran' => 'nullable|file|mimes:pdf,jpeg,png,jpg,doc,docx|max:2048', // Lampiran opsional
        'pengembalian_id' => 'required|exists:pengembalian,id', // ID pengembalian harus valid
    ], [
        'users_id.required' => 'User ID harus diisi.',
        'users_id.exists' => 'User tidak ditemukan.',
        'no_referensi.string' => 'Referensi harus berupa string.',
        'keterangan.required' => 'Keterangan harus diisi.',
        'tanggal.required' => 'Tanggal harus diisi.',
        'tanggal.date' => 'Tanggal tidak valid.',
        'status.required' => 'Status harus diisi.',
        'status.in' => 'Status harus Inbound.',
        'pengembalian_id.required' => 'ID pengembalian harus diisi.',
        'pengembalian_id.exists' => 'ID pengembalian tidak valid.',
    ]);

    DB::beginTransaction(); // Mulai transaksi untuk menjaga konsistensi data

    try {
        // Simpan data inbound
        $inbound = InOutCollection::create([
            'users_id' => $validated['users_id'],
            'no_referensi' => $validated['no_referensi'] ?? null,
            'keterangan' => $validated['keterangan'],
            'pesan' => $validated['pesan'] ?? null,
            'tanggal' => $validated['tanggal'],
            'status' => $validated['status'], // 'Inbound'
        ]);

        // Upload lampiran jika ada
        if ($request->hasFile('lampiran') && $request->file('lampiran')->isValid()) {
            $lampiranPath = $request->file('lampiran')->store('lampiran', 'public');
            $inbound->lampiran = $lampiranPath;
            $inbound->save();
        }

        // Ambil data pengembalian dan detail peminjamannya
        $pengembalian = Pengembalian::with('peminjaman.detailPeminjaman.koleksi')->find($validated['pengembalian_id']);
        foreach ($pengembalian->peminjaman->detailPeminjaman as $detail) {
            // Perbarui status pengembalian koleksi ke Inbound
            DetailPeminjaman::create([
                'peminjaman_id' => $pengembalian->peminjaman_id,
                'koleksi_id' => $detail->koleksi_id,
                'jumlah_dipinjam' => $detail->jumlah_dipinjam,
                'kondisi' => 'Dikembalikan', // Default kondisi saat inbound
            ]);
        }

        DB::commit(); // Commit transaksi

        return redirect()->route('inbound')->with('success', 'Data inbound berhasil disimpan.');
    } catch (\Exception $e) {
        DB::rollback(); // Rollback transaksi jika terjadi kesalahan

        return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
    }
    }


    public function import(Request $request)
    {
        // dd($request->all());
        // Validasi input data
        $validated = $request->validate([
            'users_id' => 'required|exists:users,id',
            'pengembalian_id' => 'required|exists:peminjaman,id', // Mengacu ke tabel peminjaman
            'no_referensi' => 'required|string',
            'keterangan' => 'required|string',
            'pesan' => 'nullable|string',
            'tanggal' => 'required|date',
        ], [
            'users_id.required' => 'User ID harus diisi.',
            'pengembalian_id.required' => 'ID Pengembalian harus diisi.',
            'pengembalian_id.exists' => 'Data pengembalian tidak valid.',
            'no_referensi.required' => 'Nomor referensi harus diisi.',
            'keterangan.required' => 'Keterangan harus diisi.',
            'tanggal.required' => 'Tanggal harus diisi.',
        ]);
    
        DB::beginTransaction();
    
        try {
            // Ambil data peminjaman dengan status Selesai
            $peminjaman = Peminjaman::with('detailPeminjaman.koleksi')
                ->where('id', $validated['pengembalian_id'])
                ->where('status', 'Selesai') // Hanya data dengan status "Selesai"
                ->first();
    
            if (!$peminjaman) {
                return back()->withErrors(['error' => 'Data pengembalian tidak valid atau belum selesai.']);
            }
    
            // Simpan data inbound ke tabel InOutCollection
            $inbound = InOutCollection::create([
                'users_id' => $validated['users_id'],
                'no_referensi' => $validated['no_referensi'],
                'keterangan' => $validated['keterangan'],
                'pesan' => $validated['pesan'] ?? null,
                'tanggal' => $validated['tanggal'],
                'status' => 'Inbound', // Status Inbound
            ]);
    
            // Looping koleksi dari peminjaman untuk ditambahkan ke detail inbound
            foreach ($peminjaman->detailPeminjaman as $detail) {
                DetailPeminjaman::create([
                    'peminjaman_id' => $inbound->id, // ID dari inbound yang baru dibuat
                    'koleksi_id' => $detail->koleksi_id,
                    'jumlah_dipinjam' => $detail->jumlah_dipinjam,
                    'kondisi' => 'Baik', // Default kondisi
                ]);
            }
    
            DB::commit();
    
            return redirect()->route('inbound')->with('success', 'Data Inbound berhasil diimpor dari pengembalian.');
        } catch (\Exception $e) {
            DB::rollBack();
    
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }
    


    /**
     * Display the specified resource.
     */
    public function show(InOutCollection $inbound)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InOutCollection $inbound): Response
{
    // Muat relasi detail peminjaman, koleksi, dan pengguna
    $inbound->load(['detailPeminjaman.koleksi', 'users']);

    // Map data koleksi untuk memastikan struktur data lebih mudah digunakan di frontend
    $inbound->koleksi = $inbound->detailPeminjaman->map(function ($detail) {
        return [
            'koleksi_id' => $detail->koleksi->id ?? null, // ID koleksi
            'nama_koleksi' => $detail->koleksi->nama_koleksi ?? 'N/A', // Nama koleksi
            'jumlah_dipinjam' => $detail->jumlah_dipinjam, // Jumlah dipinjam
        ];
    });

    return inertia('Inbound/Edit', [
        'inbound' => $inbound // Kirim data outbound dengan koleksi yang sudah diformat
    ]);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InOutCollection $inbound)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InOutCollection $inbound)
    {
        //
    }
}
