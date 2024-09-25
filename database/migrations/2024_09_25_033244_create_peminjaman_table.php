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
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_peminjaman');
            
            // Relasi ke batuan, fosil, atau sumber_daya_geologi
            $table->unsignedBigInteger('koleksi_id');
            $table->string('jenis_koleksi'); // Bisa 'batuan', 'fosil', atau 'sumber_daya_geologi'
            
            $table->string('peminjam');
            $table->enum('status_peminjaman', ['dipinjam', 'dikembalikan'])->default('dipinjam');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};
