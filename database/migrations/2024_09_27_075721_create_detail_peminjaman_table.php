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
            $table->bigIncrements('id');

            // $table->unsignedBigInteger('peminjaman_id');
            // // relasi ke tabel kelola koleksi
            // $table->foreign('peminjaman_id')->references('id')->on('peminjaman')->onDelete('cascade');

            // $table->unsignedBigInteger('koleksi_id');
            // // relasi ke tabel kelola koleksi
            // $table->foreign('koleksi_id')->references('id')->on('kelola_koleksi')->onDelete('cascade');

            $table->integer('jumlah_pinjam');
            $table->string('kondisi');
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
