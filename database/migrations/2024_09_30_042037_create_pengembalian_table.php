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
            $table->bigIncrements('id');

            // $table->unsignedBigInteger('peminjaman_id');
            // // relasi ke tabel kelola koleksi
            // $table->foreign('peminjaman_id')->references('id')->on('peminjaman')->onDelete('cascade');
            $table->date('tanggal_kembali');
            $table->string('status_pengembalian');
            $table->decimal('keterangan', total: 10, places: 2);

            $table->timestamps();
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
