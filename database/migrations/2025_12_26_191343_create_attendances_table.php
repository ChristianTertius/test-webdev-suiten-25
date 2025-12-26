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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->foreignId('job_title_id')->constrained()->onDelete('cascade');
            $table->boolean('is_present')->default(false);
            $table->time('jam_pulang')->nullable();
            $table->integer('hari_kerja')->default(0);
            $table->integer('jam_lembur')->default(0);
            $table->text('catatan')->nullable();
            $table->timestamps();

            // Unique constraint untuk mencegah duplikasi absensi per hari
            // $table->unique(['employee_id', 'tanggal']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
