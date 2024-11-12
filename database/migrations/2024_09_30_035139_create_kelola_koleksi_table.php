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
        Schema::create('kelola_koleksi', function (Blueprint $table) {
            // halaman 1 47 field
            $table->bigIncrements('id');
            $table->string('kategori_bmn')->nullable();
            $table->string('nup_bmn')->nullable();
            $table->string('no_regis')->nullable();
            $table->string('no_inventaris')->nullable();
            $table->string('tipe_bmn')->nullable();
            $table->string('no_awal')->nullable();
            $table->string('satuan')->nullable();
            $table->string('kelompok_koleksi')->nullable();
            $table->string('jenis_koleksi')->nullable();
            $table->string('kode_koleksi')->nullable();
            $table->string('ruang_penyimpanan')->nullable();
            $table->string('lokasi_penyimpanan')->nullable();
            $table->string('lantai')->nullable();
            $table->integer('no_lajur')->nullable();
            $table->integer('no_lemari')->nullable();
            $table->integer('no_laci')->nullable();
            $table->integer('no_slot')->nullable();
        
            // halaman 2
            $table->string('kondisi')->nullable();
            $table->string('nama_koleksi')->nullable();
            $table->text('deskripsi_koleksi')->nullable();
            $table->text('keterangan_koleksi')->nullable();
            $table->string('umur_geologi')->nullable();
            $table->string('nama_formasi')->nullable();
            $table->string('ditemukan')->nullable();
            $table->string('pulau')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kota')->nullable();
            $table->string('alamat')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('elevasi')->nullable();
            $table->string('peta')->nullable();
            $table->string('skala')->nullable();
            $table->string('lembar_peta')->nullable();
        
            // halaman 3
            $table->string('cara_peroleh')->nullable();
            $table->string('thn_peroleh')->nullable();
            $table->string('determinator')->nullable();
            $table->string('kolektor')->nullable();
            $table->string('kepemilikan_awal')->nullable();
            $table->text('publikasi')->nullable();
            $table->string('url')->nullable();
            $table->string('nilai_peroleh')->nullable();
            $table->string('nilai_buku')->nullable();
        
            // halaman 4
            $table->string('gambar_satu')->nullable();
            $table->string('gambar_dua')->nullable();
            $table->string('gambar_tiga')->nullable();
            $table->string('vidio')->nullable();
            $table->string('audio')->nullable();
            $table->enum('status', ['ada', 'tidak ada'])->default('ada')->nullable();
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelola_koleksi');
    }
};
