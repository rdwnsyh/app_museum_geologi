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
        Schema::create('detail_peminjaman', function (Blueprint $table) {
            $table->id();
            $table->foreignId('peminjaman_id'); // Foreign key ke tabel Peminjaman
            $table->foreignId('koleksi_id'); // Foreign key ke tabel Barang
            $table->integer('jumlah_dipinjam'); // Jumlah barang yang dipinjam
            $table->string('kondisi'); // Kondisi barang
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_peminjaman');
    }
};
