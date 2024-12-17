<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    use HasFactory;

    protected $table = 'kelola_koleksi';

    // Define the fillable attributes if you need mass assignment
    protected $fillable = ['lokasi_penyimpanan', 'lantai', 'no_lajur', 'no_lemari', 'no_laci', 'no_slot', 'nama_koleksi', 'gambar_satu', 'gambar_dua', 'gambar_tiga',
        'tipe_bmn', 'dimensions', 'ditemukan', 'deskripsi_koleksi', 'audio', 'vidio'];  
   

    /**
     * Scope for filtering query results.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $filters
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilter($query, $filters)
    {
        // Apply the 'search' filter if provided
        if (isset($filters['search']) && $filters['search']) {
            $query->where(function ($query) use ($filters) {
                $query->where('lokasi_penyimpanan', 'like', '%' . $filters['search'] . '%')
                      ->orWhere('lantai', 'like', '%' . $filters['search'] . '%')
                      // If 'column' is a reserved keyword, use backticks around it or change the column name
                      ->orWhere('no_lajur', 'like', '%' . $filters['search'] . '%');
            });
        }

        // Apply the 'lokasi_penyimpanan' filter if provided
        if (isset($filters['lokasi_penyimpanan']) && $filters['lokasi_penyimpanan']) {
            $query->where('lokasi_penyimpanan', 'like', '%' . $filters['lokasi_penyimpanan'] . '%');
        }

        // Apply the 'lantai' filter if provided
        if (isset($filters['lantai']) && $filters['lantai']) {
            $query->where('lantai', 'like', '%' . $filters['lantai'] . '%');
        }

        // Apply the 'no_lajur' filter if provided
        if (isset($filters['no_lajur']) && $filters['no_lajur']) {
            $query->where('no_lajur', 'like', '%' . $filters['no_lajur'] . '%');
        }

        if (isset($filters['no_lemari']) && $filters['no_lemari']) {
            $query->where('no_lemari', 'like', '%' . $filters['no_lemari'] . '%');
        }

        if (isset($filters['no_laci']) && $filters['no_laci']) {
            $query->where('no_laci', 'like', '%' . $filters['no_laci'] . '%');
        }

        if (isset($filters['no_slot']) && $filters['no_slot']) {
            $query->where('no_slot', 'like', '%' . $filters['no_slot'] . '%');
        }

        return $query;
    }
}
