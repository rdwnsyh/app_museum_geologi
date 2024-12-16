<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['search'])) {
            $query->where('no_referensi', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('keterangan', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('status', 'like', '%' . $filters['search'] . '%')
                  ->orWhereHas('users', function ($subQuery) use ($filters) {
                      $subQuery->where('nama_lengkap', 'like', '%' . $filters['search'] . '%');
                  });
        }
    }

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
