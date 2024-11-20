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

    // dd($cartItems);

    // Pastikan data tidak kosong
    if (empty($cartItems)) {
        return redirect()->route('keranjang')->with('error', 'Tidak ada item yang dipilih untuk dipinjam.');
    }

    // Proses data yang diterima
    $checkoutItems = [];
    foreach ($cartItems as $cartItem) {
        // Ambil detail koleksi berdasarkan ID yang diterima
        $itemDetails = KelolaKoleksi::find($cartItem['koleksi_id']);
        if ($itemDetails) {
            // Menyusun data untuk checkout
            $checkoutItems[] = [
                'id' => $cartItem['koleksi_id'],
                'koleksi_id' => $itemDetails->id,
                'nama_koleksi' => $itemDetails->nama_koleksi,
                'gambar_satu' => $itemDetails->gambar_satu,
                'jumlah_dipinjam' => $cartItem['jumlah_dipinjam'],
            ];
        }
    }

    // Pastikan ada item yang valid untuk diproses
    if (empty($checkoutItems)) {
        return redirect()->route('keranjang')->with('error', 'Tidak ada item yang valid untuk dipinjam.');
    }

    // Menyimpan checkout items ke session atau database
    session()->put('checkout_items', $checkoutItems);

    // Kirim data ke halaman Pinjam
    return Inertia::render('Pinjam', [
        'checkoutItems' => $checkoutItems,
        'user' => auth()->user(),
    ]);
}

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

    public function checkout(Request $request)
{

    dd($request->all());
    // Validasi data yang diperlukan untuk peminjaman
    $validator = Validator::make($request->all(), [
        'users_id' => 'required|exists:users,id', // Pastikan pengguna terdaftar di tabel users
        'keperluan' => 'required|string|max:255', //
        'tanggal_pinjam' => 'required|date|after_or_equal:today', // Tanggal pinjam tidak boleh sebelum hari ini
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Jatuh tempo harus setelah atau sama dengan tanggal pinjam
        'status' => 'in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Selesai' ?? 'Pengajuan', // Validasi status peminjaman
        'identitas' => 'required|file|mimes:pdf,doc,docx,jpeg,png,jpg|max:2048', // Validasi file identitas peminjam
        'surat_permohonan' => 'required|file|mimes:pdf,doc,docx,jpeg,png,jpg|max:2048', // Validasi file surat permohonan (PDF, DOC, DOCX maksimal 2MB)

        // Validasi untuk detail peminjaman
        'detail_peminjaman.*.koleksi_id' => 'required|exists:kelola_koleksi,id', // Pastikan koleksi_id valid
        'detail_peminjaman.*.jumlah_dipinjam' => 'required|integer|min:1', // Jumlah barang yang dipinjam harus lebih dari 0
        'detail_peminjaman.*.kondisi' => 'required|string|max:255', // Kondisi barang harus diisi dan maksimal 255 karakter
    ]);

    // Jika validasi gagal, kembalikan dengan pesan error
    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    // Ambil item dari keranjang di sesi
    $cart = session()->get('cart', []);

    // Periksa apakah keranjang kosong
    if (empty($cart)) {
        return back()->with('error', 'Keranjang kosong. Tidak ada item untuk dipinjam.');
    }

    // Mulai transaksi
    DB::beginTransaction();

    try {
        // Buat data peminjaman baru
        $peminjaman = Peminjaman::create([
            'users_id' => Auth::id(),
            'keperluan' => $request->keperluan,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'tanggal_jatuh_tempo' => $request->tanggal_jatuh_tempo,
            'status' => 'Pengajuan', // Status default adalah Pengajuan
            'identitas' => $request->file('identitas')->store('identitas'), // Simpan file identitas
            'surat_permohonan' => $request->file('surat_permohonan')->store('surat_permohonan'), // Simpan file surat permohonan
        ]);

        // Buat data detail peminjaman untuk setiap item di keranjang
        foreach ($cart as $id => $item) {
            DetailPeminjaman::create([
                'peminjaman_id' => $peminjaman->id,
                'koleksi_id' => $id,
                'jumlah_dipinjam' => $item['jumlah_dipinjam'],
                'kondisi' => $item['kondisi'] ?? 'Baik', // Kondisi diambil dari item keranjang
            ]);
        }

        // Hapus keranjang dari sesi
        session()->forget('cart');

        // Komit transaksi
        DB::commit();

        // Kembali ke halaman dengan pesan sukses
        return redirect()->route('peminjaman.index')->with('success', 'Peminjaman berhasil diajukan');
    } catch (\Exception $e) {
        // Rollback transaksi jika terjadi kesalahan
        DB::rollback();

        // Kembali dengan pesan error
        return back()->with('error', 'Terjadi kesalahan saat memproses peminjaman: ' . $e->getMessage());
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
