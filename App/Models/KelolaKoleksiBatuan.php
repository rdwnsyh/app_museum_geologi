<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaKoleksiBatuan extends Model
{
    use HasFactory;

     // Tentukan tabel jika tidak mengikuti konvensi penamaan Laravel
    protected $table = 'batuan';

     // Tentukan atribut mana yang dapat ditetapkan secara massal
    protected $fillable = [
        'kategori_bmn', 'nup_bmn', 'tipe_bmn', 'no_awal', 'satuan', 
        'kelompok_koleksi', 'jenis_koleksi', 'ruang_penyimpanan', 
        'lokasi_penyimpanan', 'lantai', 'no_lajur', 'no_lemari', 'no_laci', 'no_slot',
        'kondisi', 'nama_koleksi', 'deskripsi_koleksi', 'keterangan_koleksi',
        'umur_geologi', 'nama_formasi', 'ditemukan', 'pulau', 'provinsi', 
        'kota', 'alamat', 'latitude', 'longitude', 'elevasi', 
        'peta', 'skala', 'lembar_peta', 'cara_peroleh', 'thn_peroleh', 
        'determinator', 'kolektor', 'kepemilikan_awal', 'publikasi', 
        'url', 'nilai_peroleh', 'nilai_buku', 'gambar_satu', 
        'gambar_dua', 'gambar_tiga', 'vidio', 'audio'
    ];

      // Metode boot untuk menangani kejadian model seperti validasi sebelum disimpan
    protected static function boot()
    {
        parent::boot();
  
        static::creating(function ($model) {
            $model->validate();
        });
  
        static::updating(function ($model) {
            $model->validate();
        });
    }
}
