<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;

    protected $fillable = ['nama_koleksi',];

    public function scopeFilter($query, array $filters)
    {
        // Filter berdasarkan keyword pencarian
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('nama_koleksi', 'like', '%' . $search . '%');
                // ->orWhere('description', 'like', '%' . $search . '%');
        });
    }
}


