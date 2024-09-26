<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

     // Nama tabel di database
     protected $table = 'peminjaman';

     // Kolom-kolom yang dapat diisi secara massal
     protected $fillable = [
         'koleksi_id',
         'peminjam',
         'keperluan',
         'tanggal_pinjam',
         'surat_permohonan',
         'identitas_diri',
         'jenis_koleksi',
         'status_peminjaman',
     ];
 
     // Relasi ke tabel Batuan, Fosil, atau Sumber Daya Geologi
     public function koleksi()
     {
         if ($this->jenis_koleksi === 'batuan') {
             return $this->belongsTo(KelolaKoleksiBatuan::class, 'koleksi_id');
         } elseif ($this->jenis_koleksi === 'fosil') {
             return $this->belongsTo(KelolaKOleksiFosil::class, 'koleksi_id');
         } elseif ($this->jenis_koleksi === 'sumber_daya_geologi') {
             return $this->belongsTo(KelolaKoleksiSumberDayaGeologi::class, 'koleksi_id');
         }
 
         return null; // Jika jenis koleksi tidak sesuai
     }
 
     // Accessor untuk status peminjaman
     public function getStatusPeminjamanAttribute($value)
     {
         // Bisa tambahkan logika konversi jika dibutuhkan, misal:
         return ucfirst($value); // Mengubah status menjadi huruf kapital pada awal kata (misal: pengajuan -> Pengajuan)
     }
 
     // Mutator untuk status peminjaman (jika ingin modifikasi data sebelum disimpan ke database)
     public function setStatusPeminjamanAttribute($value)
     {
         $this->attributes['status_peminjaman'] = strtolower($value);
     }
}
