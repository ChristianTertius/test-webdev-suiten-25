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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pegawai');
            $table->decimal('gaji_pokok', 15, 2)->default(0);

            $table->foreignId('job_title_id')->constrained()->onDelete('cascade');
            $table->foreignId('shift_id')->constrained()->onDelete('cascade');
            $table->foreignId('bank_id')->constrained()->onDelete('cascade');

            $table->string('periode_gajian', 20);
            $table->string('nomor_telepon');
            $table->string('gaji_harian');
            $table->string('nomor_rekening');
            $table->string('uang_makan');
            $table->string('nama_rekening');
            $table->decimal('uang_makan_tanggal_merah', 15, 2)->default(0);
            $table->decimal('rate_lembur', 15, 2)->default(0);
            $table->decimal('rate_lembur_tanggal_merah', 15, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
