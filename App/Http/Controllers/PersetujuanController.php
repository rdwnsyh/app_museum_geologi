<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Persetujuan;
use Illuminate\Http\Request;

class PersetujuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Persetujuan/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Persetujuan/Create');
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
    public function show(Persetujuan $persetujuan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Persetujuan $persetujuan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Persetujuan $persetujuan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Persetujuan $persetujuan)
    {
        //
    }
}
