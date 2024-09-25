<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('outbound', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_outbound');
            
            // Relasi polymorphic ke batuan, fosil, atau sumber_daya_geologi
            $table->unsignedBigInteger('koleksi_id');
            $table->string('jenis_koleksi'); // bisa 'batuan', 'fosil', atau 'sumber_daya_geologi'
            
            $table->string('tujuan_outbound');
            $table->integer('jumlah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outbound');
    }
};
