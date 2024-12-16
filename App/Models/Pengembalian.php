<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    protected $table = 'pengembalian';
    protected $primaryKey = 'id';

    protected $fillable = [
        'peminjaman_id',
        'tanggal_kembali',
        'status_pengembalian',
        'keterangan',
    ];

    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['search'])) {
            $query->whereHas('peminjaman.users', function ($subQuery) use ($filters) {
                $subQuery->where('nama_lengkap', 'like', '%' . $filters['search'] . '%');
            })
            ->orWhere('status_pengembalian', 'like', '%' . $filters['search'] . '%')
            ->orWhere('tanggal_kembali', 'like', '%' . $filters['search'] . '%')
            ->orWhere('keterangan', 'like', '%' . $filters['search'] . '%');
        }
    }

    // Relasi ke Peminjaman
    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class, 'peminjaman_id')->with('detailPeminjaman.koleksi');
    }
    

}
