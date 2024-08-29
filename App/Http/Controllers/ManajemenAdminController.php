<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ManajemenAdmin;
use Illuminate\Http\Request;

class ManajemenAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ManajemenAdmin/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(ManajemenAdmin $manajemenAdmin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ManajemenAdmin $manajemenAdmin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ManajemenAdmin $manajemenAdmin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManajemenAdmin $manajemenAdmin)
    {
        //
    }
}
