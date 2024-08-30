<?php

namespace App\Http\Controllers;

use App\Models\Kelolakoleksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelolakoleksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Kelola/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kelola/Create');
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
    public function show(Kelolakoleksi $kelolakoleksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kelolakoleksi $kelolakoleksi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kelolakoleksi $kelolakoleksi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelolakoleksi $kelolakoleksi)
    {
        //
    }
}
