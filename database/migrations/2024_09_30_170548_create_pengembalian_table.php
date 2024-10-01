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
        Schema::create('pengembalian', function (Blueprint $table) {
            $table->bigIncrements('id'); // Primary key
            $table->unsignedBigInteger('peminjaman_id'); // Foreign key ke tabel Peminjaman
            $table->date('tanggal_kembali'); // Tanggal pengembalian barang
            $table->string('status_pengembalian'); // Status pengembalian
            $table->string('keterangan')->nullable(); // Keterangan (misalnya denda)
            $table->timestamps();
            
            // Foreign key constraint
            $table->foreign('peminjaman_id')->references('id')->on('peminjaman')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengembalian');
    }
};
