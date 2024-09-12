<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaKoleksiFosil extends Model
{
    use HasFactory;

    // Define the table name (optional if it follows Laravel's naming convention)
    protected $table = 'fosil';

    // Specify which fields are mass assignable (fillable)
    protected $fillable = [
        // halaman 1
        // 'kategori_bmn',
        'no_reg',
        // 'tipe_bmn',
        'no_inventaris',
        'satuan',
        // 'kelompok_koleksi',
        'jenis_koleksi',
        'kode_jenis_koleksi',
        'ruang_penyimpanan',
        'lokasi_penyimpanan',
        'lantai',
        'lajur',
        'laci',
        'slot',

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
        'determinator',
        'latitude',
        'longitude',
        'elevasi',
        'peta',
        'skala',
        'lembar_peta',

        // halaman 3
        'cara_peroleh',
        'thn_peroleh',
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
}
