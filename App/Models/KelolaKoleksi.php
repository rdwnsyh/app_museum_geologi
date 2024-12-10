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



    public function scopeFilter($query, array $filters)
    {
        // Filter based on search keyword
        $query->when($filters['search'] ?? false, function ($query, $search) {
            return $query->where('nama_koleksi', 'like', '%' . $search . '%')
                ->orWhere('deskripsi_koleksi', 'like', '%' . $search . '%')
                ->orWhere('ditemukan', 'like', '%' . $search . '%')
                ->orWhere('pulau', 'like', '%' . $search . '%')
                ->orWhere('kota', 'like', '%' . $search . '%')
                ->orWhere('alamat', 'like', '%' . $search . '%')
                ->orWhere('tipe_bmn', 'like', '%' . $search . '%')
                ->orWhere('provinsi', 'like', '%' . $search . '%');
        });
    }

    public function detailPeminjaman()
    {
        return $this->hasMany(DetailPeminjaman::class, 'koleksi_id');
    }

     // Relasi ke inout_collection
    public function inOutCollections()
    {
        return $this->hasMany(InOutCollection::class, 'koleksi_id');
    }
}
