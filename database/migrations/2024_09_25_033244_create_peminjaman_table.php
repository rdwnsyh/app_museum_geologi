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
            
            // Relasi ke batuan, fosil, atau sumber_daya_geologi
            $table->unsignedBigInteger('koleksi_id');
            
            $table->string('peminjam');
            $table->string('keperluan');
            $table->date('tanggal_pinjam');
            $table->string('surat_permohonan');
            $table->string('identitas_diri');
            $table->string('jenis_koleksi'); // Bisa 'batuan', 'fosil', atau 'sumber_daya_geologi'
            $table->string('nama_koleksi'); // Bisa 'batuan', 'fosil', atau 'sumber_daya_geologi'
            $table->enum('status_peminjaman', ['pengajuan', 'dipinjam', 'ditolak', 'terlambat', 'selesai'])->default('pengajuan');
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
