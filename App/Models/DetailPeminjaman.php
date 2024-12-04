<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPeminjaman extends Model
{
    use HasFactory;

    protected $table = 'detail_peminjaman';
    protected $primaryKey = 'id';

    protected $fillable = [
        'peminjaman_id',
        'koleksi_id',
        'jumlah_dipinjam',
        'kondisi',
    ];

    // Relasi ke Peminjaman
    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class, 'peminjaman_id');
    }

    // Relasi ke koleksi
    public function koleksi()
    {
        return $this->belongsTo(KelolaKoleksi::class, 'koleksi_id');
    }

     // Relasi balik ke inout_collection
    public function inOutCollections()
    {
        return $this->hasMany(InOutCollection::class, 'detail_peminjaman_id');
    }
}
