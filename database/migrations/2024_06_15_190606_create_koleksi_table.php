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
        Schema::create('koleksi', function (Blueprint $table) {
            $table->bigIncrements('id_koleksi');
            $table->string('nama_koleksi', length:255);
            $table->string('jenis_koleksi', length:100);
            $table->text('deskripsi');
            $table->date('tgl_masuk');
            $table->string('asal', length:255);
            $table->string('umur_geologi', length:100);
            $table->boolean('status')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('koleksi');
    }
};
