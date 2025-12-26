<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'tanggal',
        'employee_id',
        'job_title_id',
        'is_present',
        'jam_pulang',
        'hari_kerja',
        'jam_lembur',
        'catatan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'is_present' => 'boolean',
        'jam_pulang' => 'datetime:H:i',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function job_title()
    {
        return $this->belongsTo(JobTitle::class);
    }
}
