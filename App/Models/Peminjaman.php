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
            'identitas',
            'surat_permohonan',
        ];
    
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

        public function inOutCollection()
    {
        return $this->hasMany(InOutCollection::class, 'no_referensi', 'id');
    }
}
