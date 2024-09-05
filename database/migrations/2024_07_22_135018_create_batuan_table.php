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
        Schema::create('batuan', function (Blueprint $table) {
            // halaman 1 admin
            $table->bigIncrements('id');
            $table->string('kategori_bmn')->default('6.06.01.05.005');
            $table->string('nup_bmn');
            $table->string('tipe_bmn')->default('Batuan');
            $table->string('no_awal');
            $table->string('satuan');
            $table->string('kelompok_koleksi');
            $table->string('jenis_koleksi');
            $table->string('ruang_penyimpanan');
            $table->string('lokasi_penyimpanan');
            $table->string('lantai');
            $table->integer('no_lajur');
            $table->integer('no_lemari');
            $table->integer('no_laci');
            $table->integer('no_slot');

            // halaman 2
            $table->string('kondisi');
            $table->string('nama_koleksi');
            $table->text('deskripsi_koleksi');
            $table->text('keterangan_koleksi');
            $table->string('umur_geologi');
            $table->string('nama_formasi');
            $table->string('ditemukan');
            $table->string('pulau');
            $table->string('provinsi');
            $table->string('kota');
            $table->string('alamat');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('elevasi');
            $table->string('peta');
            $table->string('skala');
            $table->string('lembar_peta');

            // halaman 3
            $table->string('cara_peroleh');
            $table->year('thn_peroleh');
            $table->string('determinator');
            $table->string('kolektor');
            $table->string('kepemilikan_awal');
            $table->text('publikasi')->nullable();
            $table->string('url')->nullable();
            $table->decimal('nilai_peroleh', 15, 2);
            $table->decimal('nilai_buku', 15, 2);

            // halaman 4
            $table->string('gambar_satu')->nullable();
            $table->string('gambar_dua')->nullable();
            $table->string('gambar_tiga')->nullable();
            $table->string('vidio')->nullable();
            $table->string('audio')->nullable();
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batuan');
    }
};
