<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $cart = auth()->user()->cart()->with('cartItems.koleksi')->first();
    
    return Inertia::render('Keranjang', [
        'cartItems' => $cart ? $cart->cartItems->map(function($item) {
            return [
                'id' => $item->id,
                'koleksi_id' => $item->koleksi_id,
                'name' => $item->koleksi->nama_koleksi,
                'imageUrl' => $item->koleksi->gambar_satu,
                'color' => $item->koleksi->kategori_bmn, // Contoh data kategori
                'quantity' => $item->jumlah,
            ];
        }) : [],
    ]);
}


    public function add(Request $request)
{
    $request->validate([
        'koleksi_id' => 'required|exists:kelola_koleksi,id', // Pastikan tabelnya benar, yaitu 'kelola_koleksi'
        'jumlah' => 'required|integer|min:1',
    ]);

    // Ambil keranjang dari user yang sedang login atau buat baru jika belum ada
    $cart = auth()->user()->cart()->firstOrCreate();

    // Cari item di dalam keranjang yang memiliki koleksi_id sesuai dengan permintaan
    $cartItem = $cart->cartItems()->where('koleksi_id', $request->koleksi_id)->first();

    if ($cartItem) {
        // Jika item sudah ada, tambahkan nilai jumlah dengan nilai dari permintaan
        $cartItem->increment('jumlah', $request->jumlah);
    } else {
        // Jika item belum ada, buat item baru dengan koleksi_id dan jumlah yang diberikan
        $cart->cartItems()->create([
            'koleksi_id' => $request->koleksi_id,
            'jumlah' => $request->jumlah,
        ]);
    }

    dd($request);

    // Kembali ke halaman sebelumnya setelah item ditambahkan
    return redirect()->back();
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function destroy($id)
{
    $item = CartItem::findOrFail($id); // Adjust if your model or identifier differs
    $item->delete();

    return response()->json(['success' => true]);
}

}
