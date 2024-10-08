<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaKoleksi extends Model
{
    use HasFactory;

    protected $table = 'kelola_koleksi';

     // Tentukan atribut mana yang dapat ditetapkan secara massal
        protected $fillable = [
        // halaman 1
        'kategori_bmn',
        'nup_bmn',
        'no_regis',
        'no_inventaris',
        'tipe_bmn',
        'no_awal',
        'satuan',
        'kelompok_koleksi',
        'jenis_koleksi',
        'kode_koleksi',
        'ruang_penyimpanan',
        'lokasi_penyimpanan',
        'lantai',
        'no_lajur',
        'no_lemari',
        'no_laci',
        'no_slot',

        // halaman 2
        'kondisi',
        'nama_koleksi',
        'deskripsi_koleksi',
        'keterangan_koleksi',
        'umur_geologi',
        'nama_formasi',
        'ditemukan',
        'pulau',
        'provinsi',
        'kota',
        'alamat',
        'latitude',
        'longitude',
        'elevasi',
        'peta',
        'skala',
        'lembar_peta',

        // halaman 3
        'cara_peroleh',
        'thn_peroleh',
        'determinator',
        'kolektor',
        'kepemilikan_awal',
        'publikasi',
        'url',
        'nilai_peroleh',
        'nilai_buku',

        // halaman 4
        'gambar_satu',
        'gambar_dua',
        'gambar_tiga',
        'vidio',
        'audio',
        // 'status',
    ];

    public function getGambarSatuUrlAttribute()
    {
        return $this->gambar_satu ? asset('storage/' . $this->gambar_satu) : null;
    }

    public function getGambarDuaUrlAttribute()
    {
        return $this->gambar_dua ? asset('storage/' . $this->gambar_dua) : null;
    }

    public function getGambarTigaUrlAttribute()
    {
        return $this->gambar_tiga ? asset('storage/' . $this->gambar_tiga) : null;
    }

    public function getVidioUrlAttribute()
    {
        return $this->vidio ? asset('storage/' . $this->vidio) : null;
    }

    public function getAudioUrlAttribute()
    {
        return $this->audio ? asset('storage/' . $this->audio) : null;
    }

    public function scopeFilter($query, array $filters)
    {
        // Filter based on search keyword
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('nama_koleksi', 'like', '%' . $search . '%');
        });
    }

    public function detailPeminjaman()
    {
        return $this->hasMany(DetailPeminjaman::class, 'koleksi_id');
    }
}
