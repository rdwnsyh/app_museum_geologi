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
            $table->id();
            $table->foreignId('users_id'); // Foreign key ke tabel users
            $table->foreignId('detail_peminjaman_id')->nullable(); // Menghubungkan ke detail peminjaman
            $table->string('no_referensi')->nullable(); // Referensi untuk peminjaman atau transaksi terkait
            $table->string('keterangan');
            $table->string('pesan')->nullable();
            $table->date('tanggal'); // Tanggal barang keluar atau aktivitas dimulai
            $table->enum('status', ['Inbound', 'Outbound']); // Status Inbound atau Outbound
            $table->string('lampiran')->nullable();
            $table->timestamps();
        
            // // Foreign key untuk menghubungkan ke tabel users
            // $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
        
            // // Relasi ke detail_peminjaman (untuk Outbound)
            // $table->foreign('detail_peminjaman_id')->references('id')->on('detail_peminjaman')->onDelete('cascade');
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
