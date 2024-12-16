<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id'); // Foreign key ke tabel Pengguna
            $table->enum('keperluan', ['Penelitian', 'Pameran', 'Perbaikan', 'Dan Lain-Lain']);
            $table->string('pesan')->nullable();
            $table->date('tanggal_pinjam'); // Tanggal saat barang dipinjam
            $table->date('tanggal_jatuh_tempo'); // Tanggal jatuh tempo pengembalian
            $table->enum('status', ['Pengajuan', 'Disetujui', 'Direvisi', 'Ditolak', 'Selesai'])->default('Pengajuan'); // Status peminjaman
            $table->enum('status_pengembalian', ['Dikembalikan', 'Dipinjam', 'Terlambat']); // Status peminjaman
            $table->string('identitas'); // Status peminjaman
            $table->string('surat_permohonan'); // Status peminjaman
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
