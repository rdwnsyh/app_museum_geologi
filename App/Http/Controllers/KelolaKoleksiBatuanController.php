<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\KelolaKoleksiBatuan;

class KelolaKoleksiBatuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Kelola/Batuan/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kelola/Batuan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKoleksiBatuan $kelolaKoleksiBatuan)
    {
        //
    }
}
