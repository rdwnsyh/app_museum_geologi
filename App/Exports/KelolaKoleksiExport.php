<?php

namespace App\Exports;

use App\Models\KelolaKoleksi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class KelolaKoleksiExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return KelolaKoleksi::all();
    }

    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function view(): View
    {
        return view('exports.kelola_koleksi', [
            'data' => $this->data,
        ]);
    }
}
