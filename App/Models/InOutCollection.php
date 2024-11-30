<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InOutCollection extends Model
{
    use HasFactory;

    protected $table = 'inout_collection';

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'users_id',
        'no_referensi',
        'keterangan',
        'pesan',
        'tanggal',
        'status',
        'lampiran',
    ];    

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function setLampiranAttribute($value)
{
    // Pastikan tidak ada konflik saat menyimpan data
    $this->attributes['lampiran'] = $value;
}
public function koleksi()
{
    return $this->hasMany(KelolaKoleksi::class);
}

    /**
     * Relasi ke model User.
     * Menghubungkan inout_collection dengan tabel users.
     */

    /**
     * Mutator untuk keterangan agar selalu huruf kapital.
     */
}
