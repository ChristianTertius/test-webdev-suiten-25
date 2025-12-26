<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PayPeriod;

class Employee extends Model
{
    protected $fillable = [
        'nama_pegawai',
        'gaji_pokok',
        'job_title_id',
        'periode_gajian',
        'nomor_telepon',
        'gaji_harian',
        'nomor_rekening',
        'uang_makan',
        'nama_rekening',
        'uang_makan_tanggal_merah',
        'bank_id',
        'rate_lembur',
        'shift_id',
        'rate_lembur_tanggal_merah',
    ];

    public function job_title()
    {
        return $this->belongsTo(JobTitle::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
