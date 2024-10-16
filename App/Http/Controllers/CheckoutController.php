<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Models\DetailPeminjaman;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
{
    // Validasi data input
    $validatedData = $request->validate([
        // Tabel Peminjaman
        'users_id' => 'required|exists:users,id', // Pastikan pengguna terdaftar di tabel users
        'tanggal_pinjam' => 'required|date|after_or_equal:today', // Tanggal pinjam tidak boleh sebelum hari ini
        'tanggal_jatuh_tempo' => 'required|date|after_or_equal:tanggal_pinjam', // Jatuh tempo harus setelah atau sama dengan tanggal pinjam
        'status' => 'required|in:Pengajuan,Sedang di Pinjam,Terlambat,Ditolak,Dikembalikan', // Validasi status peminjaman
        'identitas' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi identitas peminjam
        'surat_permohonan' => 'required|file|mimes:pdf,doc,docx|max:2048', // Validasi surat permohonan
    ], [
        'users_id.required' => 'Pengguna harus diisi.',
        'users_id.exists' => 'Pengguna tidak ditemukan.',
        'tanggal_pinjam.required' => 'Tanggal pinjam harus diisi.',
        'tanggal_pinjam.date' => 'Format tanggal pinjam tidak valid.',
        'tanggal_pinjam.after_or_equal' => 'Tanggal pinjam tidak boleh sebelum hari ini.',
        'tanggal_jatuh_tempo.required' => 'Tanggal jatuh tempo harus diisi.',
        'tanggal_jatuh_tempo.date' => 'Format tanggal jatuh tempo tidak valid.',
        'tanggal_jatuh_tempo.after_or_equal' => 'Tanggal jatuh tempo harus sama atau setelah tanggal pinjam.',
        'status.required' => 'Status harus diisi.',
        'status.in' => 'Status harus berupa salah satu dari: Pengajuan, Sedang di Pinjam, Terlambat, Ditolak, Dikembalikan.',
        'identitas.required' => 'Identitas harus diisi.',
        'surat_permohonan.required' => 'File surat permohonan harus diunggah.',
        'surat_permohonan.mimes' => 'Format file surat permohonan harus berupa: pdf, doc, atau docx.',
        'surat_permohonan.max' => 'Ukuran file surat permohonan maksimal 2MB.',
    ]);

    // Proses upload file identitas
    if ($request->hasFile('identitas')) {
        $validatedData['identitas'] = $request->file('identitas')->store('identitas', 'public');
    }

    // Proses upload file surat permohonan
    if ($request->hasFile('surat_permohonan')) {
        $validatedData['surat_permohonan'] = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
    }

    // Ambil data keranjang pengguna
    $cart = auth()->user()->cart()->with('cartItems.koleksi')->first();

    if (!$cart || $cart->cartItems->isEmpty()) {
        return redirect()->back()->withErrors('Keranjang Anda kosong, silakan tambahkan koleksi.');
    }

    // Simpan data peminjaman ke tabel `peminjaman`
    $peminjaman = Peminjaman::create([
        'users_id' => $validatedData['users_id'],
        'tanggal_pinjam' => $validatedData['tanggal_pinjam'],
        'tanggal_jatuh_tempo' => $validatedData['tanggal_jatuh_tempo'],
        'status' => $validatedData['status'],
        'identitas' => $validatedData['identitas'],
        'surat_permohonan' => $validatedData['surat_permohonan'],
    ]);

    // Simpan setiap item dari keranjang ke detail_peminjaman
    foreach ($cart->cartItems as $item) {
        DetailPeminjaman::create([
            'peminjaman_id' => $peminjaman->id,
            'koleksi_id' => $item->koleksi_id,
            'jumlah_dipinjam' => $item->jumlah,
            'kondisi' => 'baik', // Default condition
        ]);
    }

    // Hapus keranjang setelah checkout
    $cart->cartItems()->delete(); // Hapus item di keranjang
    $cart->delete(); // Hapus keranjang

    // Redirect atau kirim pesan sukses
    return redirect()->route('peminjaman')->with('success', 'Peminjaman berhasil diajukan');
}

}
