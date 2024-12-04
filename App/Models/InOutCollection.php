<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InOutCollection extends Model
{
    use HasFactory;

    protected $table = 'inout_collection';

    protected $fillable = [
        'users_id',
        'no_referensi',
        'keterangan',
        'pesan',
        'tanggal',
        'status',
        'lampiran',
        'detail_peminjaman_id', // Relasi ke detail peminjaman
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function koleksi()
    {
        return $this->belongsTo(kelolaKoleksi::class, 'koleksi_id');
    }

    public function detailPeminjaman()
    {
        return $this->belongsTo(DetailPeminjaman::class, 'detail_peminjaman_id');
    }
}
