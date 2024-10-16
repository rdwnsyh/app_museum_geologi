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

    if (!$cart) {
    // Jika keranjang belum ada, Anda bisa membuatnya atau menampilkan pesan
    return Inertia::render('Keranjang', ['cart' => null]);
    }

    return Inertia::render('Keranjang');
    }

    public function add(Request $request)
    {
        $request->validate([
            'koleksi_id' => 'required|exists:koleksi,id',
            'jumlah' => 'required|integer|min:1',
        ]);

        $cart = auth()->user()->cart()->firstOrCreate();
        $cart->cartItems()->updateOrCreate(
            ['koleksi_id' => $request->koleksi_id],
            ['jumlah' => DB::raw('jumlah + ' . $request->jumlah)]
        );

        return redirect()->back();
    }

    public function remove($itemId)
    {
        $cartItem = CartItem::findOrFail($itemId);
        $cartItem->delete();

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
    public function destroy(string $id)
    {
        //
    }
}
