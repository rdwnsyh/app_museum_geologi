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
        Schema::create('inout_collection', function (Blueprint $table) {
            $table->bigIncrements('id'); // Primary key untuk tabel inout_collection
            $table->unsignedBigInteger('users_id'); // Foreign key yang menghubungkan dengan tabel users (pengguna)
            $table->integer('no_referensi'); 
            $table->enum('keterangan', ['Peminjaman', 'Pengembalian', 'Barang Baru', 'Pameran', 'Perbaikan', 'dll']); // Jenis aktivitas terkait koleksi
            $table->string('pesan')->nullable(); // Pesan tambahan atau catatan terkait aktivitas (opsional)
            $table->date('tanggal_masuk'); // Tanggal barang masuk atau aktivitas dimulai
            $table->date('tanggal_keluar'); // Tanggal barang keluar atau aktivitas berakhir
            $table->enum('status', ['Inbound', 'Outbound']); // Status barang dalam proses: masuk (Inbound) atau keluar (Outbound)
            $table->string('lampiran'); // Nomor atau file referensi untuk surat permohonan terkait aktivitas
            $table->timestamps(); // Timestamps otomatis untuk mencatat waktu pembuatan dan pembaruan data
        
            // Foreign key constraint
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade'); // Hubungan ke tabel users, menghapus data jika pengguna terkait dihapus
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inout_collection');
    }
};
