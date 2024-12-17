<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

        // Nama tabel di database
        protected $table = 'peminjaman';
        protected $primaryKey = 'id';
        
        protected $fillable = [
            'users_id',
            'keperluan',
            'pesan',
            'tanggal_pinjam',
            'tanggal_jatuh_tempo',
            'status',
            'status_pengembalian',
            'identitas',
            'surat_permohonan',
        ];

        public function scopeFilter($query, $filters)
        {
            if (!empty($filters['search'])) {
                $query->whereHas('users', function ($query) use ($filters) {
                    $query->where('nama_lengkap', 'like', '%' . $filters['search'] . '%');
                })
                ->orWhere('pesan', 'like', '%' . $filters['search'] . '%')
                ->orWhere('tanggal_pinjam', 'like', '%' . $filters['search'] . '%')
                ->orWhere('tanggal_jatuh_tempo', 'like', '%' . $filters['search'] . '%')
                ->orWhere('keperluan', 'like', '%' . $filters['search'] . '%');
            }
        }

    
        // Relasi ke User
        public function users()
        {
            return $this->belongsTo(User::class, 'users_id');
        }
    
        // Relasi ke Detail Peminjaman
        public function detailPeminjaman()
        {
            return $this->hasMany(DetailPeminjaman::class, 'peminjaman_id');
        }

    
        // Relasi ke Pengembalian
        public function pengembalian()
        {
            return $this->hasOne(Pengembalian::class, 'peminjaman_id');
        }

        public function inOutCollections()
        {
            return $this->hasManyThrough(InOutCollection::class, DetailPeminjaman::class, 'peminjaman_id', 'detail_peminjaman_id');
        }
}
