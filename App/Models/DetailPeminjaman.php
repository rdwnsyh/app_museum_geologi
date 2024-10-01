<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPeminjaman extends Model
{
    use HasFactory;

    protected $table = 'detail_peminjaman';
    protected $primaryKey = 'detail_id';

    protected $fillable = [
        'peminjaman_id',
        'barang_id',
        'jumlah_dipinjam',
        'kondisi',
    ];

    // Relasi ke Peminjaman
    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class, 'peminjaman_id');
    }

    // Relasi ke Barang
    public function barang()
    {
        return $this->belongsTo(KelolaKoleksi::class, 'koleksi_id');
    }
}
