<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksi;
use App\Models\DetailPeminjaman;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Validator;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Menampilkan isi keranjang
    // Function untuk menampilkan halaman keranjang

    // Menambahkan item ke keranjang
    public function addToCart(Request $request)
    {
        // Validasi input dengan batas maksimum jika ada
        $request->validate([
            'koleksi_id' => 'required|exists:kelola_koleksi,id',
            'jumlah_dipinjam' => 'required|integer|min:1|max:100', // Sesuaikan max dengan kebutuhan Anda
        ]);


        // Ambil ID koleksi dan jumlah item yang ingin ditambahkan
        $itemId = $request->input('koleksi_id');
        $jumlah_dipinjam = $request->input('jumlah_dipinjam', 1); // Default ke 1 jika tidak diberikan

        // Ambil keranjang dari sesi
        $cart = session()->get('cart', []);


        // Cek apakah item sudah ada di keranjang
        if (isset($cart[$itemId])) {
            // Jika item sudah ada, tambahkan jumlahnya
            $cart[$itemId]['jumlah_dipinjam'] += $jumlah_dipinjam;
        } else {
            // Jika item belum ada, ambil data item dari database
            $item = KelolaKoleksi::find($itemId);

            // Cek jika item tidak ditemukan, kembali dengan pesan error (hanya untuk berjaga-jaga)
            if (!$item) {
                return back()->with('error', 'Item tidak ditemukan.');
            }

            // Simpan item ke dalam keranjang dengan atribut yang diperlukan
            $cart[$itemId] = [
                'koleksi_id' => $item->id,
                'gambar_satu' => $item->gambar_satu,
                'nama_koleksi' => $item->nama_koleksi,
                'jumlah_dipinjam' => $jumlah_dipinjam,
                'checked' => $item['checked'] ?? false, // Default false for checked
            ];
        }

        // Simpan data keranjang ke sesi
        session()->put('cart', $cart);

        return back()->with('success', 'Item berhasil ditambahkan ke keranjang.');
    }


public function showCart()
{
    // Ambil data keranjang dari sesi
    $cart = session()->get('cart', []);

    // Siapkan item keranjang dengan detail dari database
    $cartItems = [];
    foreach ($cart as $itemId => $item) {
        $itemDetails = KelolaKoleksi::find($itemId);
        if ($itemDetails) {
            $cartItems[] = [
                'id' => $itemId,
                'koleksi_id' => $itemDetails->id,
                'image_satu' => $itemDetails->gambar_satu,
                'nama_koleksi' => $itemDetails->nama_koleksi,
                'jumlah_dipinjam' => $item['jumlah_dipinjam'] ?? 0,
                'checked' => isset($item['checked']) ? (bool)$item['checked'] : false, // Konversi ke boolean
            ];
        }
    }

    // Kirim item keranjang ke frontend menggunakan Inertia
    return Inertia::render('Keranjang', [
        'cartItems' => $cartItems,
    ]);
}

// Function untuk memproses peminjaman
public function pinjam(Request $request)
{
    // Ambil data cartItems yang dikirim dari frontend
    $cartItems = $request->input('cartItems', []);

    // Pastikan data tidak kosong
    if (empty($cartItems)) {
        return redirect()->route('keranjang')->with('error', 'Tidak ada item yang dipilih untuk dipinjam.');
    }

    // Proses data yang diterima
    $validatedItems = [];
    foreach ($cartItems as $cartItem) {
        // Validasi setiap item di cartItems
        $itemDetails = KelolaKoleksi::find($cartItem['koleksi_id']);
        if ($itemDetails) {
            // Menambahkan item yang valid ke daftar checkout
            $validatedItems[] = [
                'koleksi_id' => $itemDetails->id,
                'nama_koleksi' => $itemDetails->nama_koleksi,
                'gambar_satu' => $itemDetails->gambar_satu,
                'jumlah_dipinjam' => $cartItem['jumlah_dipinjam'],
            ];
        }
    }

    // Pastikan ada item yang valid
    if (empty($validatedItems)) {
        return redirect()->route('keranjang')->with('error', 'Tidak ada item yang valid untuk dipinjam.');
    }

    // Menyimpan data ke session untuk proses checkout
    session()->put('checkout_items', $validatedItems);

    // Kirim data ke halaman Pinjam
    return Inertia::render('Pinjam', [
        'checkoutItems' => $validatedItems,
        'user' => auth()->user(),
    ]);
}



public function checkout(Request $request)
{
    // Ambil data checkout_items dari session
    // dd($request->all());
    $checkoutItems = session()->get('checkout_items', []);

    // Validasi data input dari frontend
    $validator = Validator::make($request->all(), [
        'keperluan' => 'required|string|max:255',
        'tanggal_pinjam' => 'required|date|after_or_equal:today',
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam',
        'identitas' => 'required|file|mimes:pdf,doc,docx,jpeg,png,jpg|max:2048',
        'surat_permohonan' => 'required|file|mimes:pdf,doc,docx,jpeg,png,jpg|max:2048',
        'checkoutItems' => 'required|array',
        'checkoutItems.*.koleksi_id' => 'required|exists:kelola_koleksi,id',
        'checkoutItems.*.jumlah_dipinjam' => 'required|integer|min:1',
    ]);

    // Jika validasi gagal
    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    // Pastikan ada item yang valid untuk dipinjam
    if (empty($checkoutItems)) {
        return back()->with('error', 'Tidak ada item untuk diproses.');
    }

    // Mulai transaksi
    DB::beginTransaction();

    try {
        // Buat data peminjaman
        $peminjaman = Peminjaman::create([
            'users_id' => Auth::id(),
            'keperluan' => $request->keperluan,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'tanggal_jatuh_tempo' => $request->tanggal_jatuh_tempo,
            'status' => 'Pengajuan',
            'identitas' => $request->file('identitas')->store('identitas'),
            'surat_permohonan' => $request->file('surat_permohonan')->store('surat_permohonan'),
        ]);

        // Proses detail peminjaman
        foreach ($checkoutItems as $item) {
            DetailPeminjaman::create([
                'peminjaman_id' => $peminjaman->id,
                'koleksi_id' => $item['koleksi_id'],
                'jumlah_dipinjam' => $item['jumlah_dipinjam'],
                'kondisi' => $item['kondisi'] ?? 'Baik',
            ]);
        }

        // Hapus session checkout_items
        session()->forget('cart');

        // Komit transaksi
        DB::commit();

        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil diajukan.');
    } catch (\Exception $e) {
        // Rollback transaksi jika terjadi kesalahan
        DB::rollback();
        return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
    }
}




    // // Validasi data input
    // $validatedData = $request->validate([
    //     // Tabel Peminjaman
        // 'users_id' => 'required|exists:users,id', // Pastikan pengguna terdaftar di tabel users
        // 'tanggal_pinjam' => 'required|date|after_or_equal:today', // Tanggal pinjam tidak boleh sebelum hari ini
        // 'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Jatuh tempo harus setelah atau sama dengan tanggal pinjam
        // 'status' => 'required|in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Dikembalikan', // Validasi status peminjaman
        // 'identitas' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi identitas peminjam
        // 'surat_permohonan' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi file surat permohonan (PDF, DOC, DOCX maksimal 2MB)

    //     // Tabel Detail Peminjaman
    //     'koleksi_id' => 'required|exists:kelola_koleksi,id', // Pastikan koleksi yang dipinjam ada di tabel kelola_koleksi
    //     'jumlah_dipinjam' => 'required|integer|min:1', // Jumlah barang yang dipinjam
    //     'kondisi' => 'required|string|max:255', // Kondisi barang saat dipinjam
    // ], [
    //     'users_id.required' => 'Pengguna harus diisi.',
    //     'users_id.exists' => 'Pengguna tidak ditemukan.',
    //     'tanggal_pinjam.required' => 'Tanggal pinjam harus diisi.',
    //     'tanggal_pinjam.date' => 'Format tanggal pinjam tidak valid.',
    //     'tanggal_pinjam.after_or_equal' => 'Tanggal pinjam tidak boleh sebelum hari ini.',
    //     'tanggal_jatuh_tempo.required' => 'Tanggal jatuh tempo harus diisi.',
    //     'tanggal_jatuh_tempo.date' => 'Format tanggal jatuh tempo tidak valid.',
    //     'tanggal_jatuh_tempo.after_or_equal' => 'Tanggal jatuh tempo harus sama atau setelah tanggal pinjam.',
    //     'status.required' => 'Status harus diisi.',
    //     'status.in' => 'Status harus berupa salah satu dari: Pengajuan, Sedang di Pinjam, Terlambat, Ditolak, Selesai.',
    //     'identitas.required' => 'Identitas harus diisi.',
    //     'surat_permohonan.required' => 'File surat permohonan harus diunggah.',
    //     'surat_permohonan.mimes' => 'Format file surat permohonan harus berupa: pdf, doc, atau docx.',
    //     'surat_permohonan.max' => 'Ukuran file surat permohonan maksimal 2MB.',
    //     'koleksi_id.exists' => 'Koleksi yang dipilih tidak ditemukan.',
    // ]);

    // // Proses upload file identitas
    // if ($request->hasFile('identitas')) {
    //     $validatedData['identitas'] = $request->file('identitas')->store('identitas', 'public');
    // }

    // // Proses upload file surat permohonan
    // if ($request->hasFile('surat_permohonan')) {
    //     $validatedData['surat_permohonan'] = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
    // }

    // // Simpan data peminjaman ke tabel `peminjaman`
    // $peminjaman = Peminjaman::create([
    //     'users_id' => $validatedData['users_id'],
    //     'tanggal_pinjam' => $validatedData['tanggal_pinjam'],
    //     'tanggal_jatuh_tempo' => $validatedData['tanggal_jatuh_tempo'],
    //     'status' => $validatedData['status'],
    //     'identitas' => $validatedData['identitas'],
    //     'surat_permohonan' => $validatedData['surat_permohonan'],
    // ]);

    // // Store each item borrowed
    // foreach ($request->koleksi as $item) {
    //     DetailPeminjaman::create([
    //         'peminjaman_id' => $peminjaman->id,
    //         'koleksi_id' => $item['id'],
    //         'jumlah_dipinjam' => $item['jumlah_dipinjam'],
    //         'kondisi' => 'baik' // Default condition
    //     ]);
    // }

    // // Redirect atau kirim pesan sukses
    // return redirect()->route('peminjaman')->with('success', 'Peminjaman berhasil diajukan');


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
    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Peminjaman $peminjaman)
{

}





    /**
     * Remove the specified resource from storage.
     */
    public function removeFromCart($id)
{
    // Ambil data keranjang dari sesi
    $cart = session()->get('cart', []);

    // Periksa jika item dengan id tersebut ada di dalam keranjang
    if (isset($cart[$id])) {
        // Hapus item dari keranjang
        unset($cart[$id]);
        
        // Simpan kembali keranjang yang sudah diupdate ke sesi
        session()->put('cart', $cart);
        
        // Mengembalikan response sukses
        return response()->json(['flash' => ['success' => 'Item berhasil dihapus dari keranjang.']]);
    }

    // Jika item tidak ditemukan, kembali dengan pesan error
    return response()->json(['flash' => ['error' => 'Item tidak ditemukan di keranjang.']]);
}




}
