<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaKoleksiSumberDayaGeologi extends Model
{
    use HasFactory;

     // Define the table name (optional if it follows Laravel's naming convention)
    protected $table = 'sumber_daya_geologi';

    // Specify which fields are mass assignable (fillable)
    protected $fillable = [
        // halaman 1
        // 'kategori_bmn',
        'nup_bmn',
        'no_regis',
        'no_inventaris',
        // 'tipe_bmn',
        'no_awal',
        'satuan',
        // 'kelompok_koleksi',
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
        'status',
    ];
}
