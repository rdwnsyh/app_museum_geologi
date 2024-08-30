<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Outbound;
use Illuminate\Http\Request;

class OutboundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Outbound/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Outbound/Create');
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
    public function show(Outbound $outbound)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Outbound $outbound)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Outbound $outbound)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outbound $outbound)
    {
        //
    }
}
