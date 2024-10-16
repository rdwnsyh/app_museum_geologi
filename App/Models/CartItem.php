<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\KelolaKoleksi;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CartItem extends Model
{
    use HasFactory;

    // Relasi ke Cart
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    // Relasi ke Koleksi
    public function koleksi()
    {
        return $this->belongsTo(KelolaKoleksi::class);
    }
}
