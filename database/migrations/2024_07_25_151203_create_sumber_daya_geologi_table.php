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
        Schema::create('sumber_daya_geologi', function (Blueprint $table) {
            // halaman 1
            $table->bigIncrements('id');
            $table->string('kategori_bmn')->default('6.02.02.99.999')->nullable(false);
            $table->string('nup_bmn');
            $table->string('no_regis');
            $table->string('no_inventaris');
            $table->string('tipe_bmn')->default('Sumber Daya Geologi')->nullable(false); 
            $table->string('no_awal');
            $table->string('satuan');
            $table->string('kelompok_koleksi')->default('Sumber Daya Geologi')->nullable(false);
            $table->string('jenis_koleksi');
            $table->string('kode_koleksi');
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
            $table->string('latitude');
            $table->string('longitude');
            $table->string('elevasi');
            $table->string('peta');
            $table->string('skala');
            $table->string('lembar_peta');

            // halaman 3
            $table->string('cara_peroleh');
            $table->integer('thn_peroleh');
            $table->string('determinator');
            $table->string('kolektor');
            $table->string('kepemilikan_awal');
            $table->text('publikasi')->nullable();
            $table->string('url')->nullable();
            $table->string('nilai_peroleh');
            $table->string('nilai_buku');

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
        Schema::dropIfExists('sumber_daya_geologi');
    }
};
