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
            $table->bigIncrements('id'); // Primary key
            $table->unsignedBigInteger('users_id'); // Foreign key ke tabel Pengguna
            $table->date('tanggal_pinjam'); // Tanggal saat barang dipinjam
            $table->date('tanggal_jatuh_tempo'); // Tanggal jatuh tempo pengembalian
            $table->enum('status', ['Pengajuan', 'Sedang di Pinjam', 'Terlambat', 'Ditolak', 'Dikembalikan'])->default('Pengajuan'); // Status peminjaman
            $table->string('identitas'); // Status peminjaman
            $table->string('surat_permohonan'); // Status peminjaman
            $table->timestamps();
            
            // Foreign key constraint
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
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
