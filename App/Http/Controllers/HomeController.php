<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\KelolaKoleksiBatuan;
use App\Models\KelolaKoleksiFosil;
use App\Models\KelolaKoleksiSumberDayaGeologi;


class HomeController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }


}
