<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\JobTitle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'christian160103@gmail.com'],
            [
                'name' => 'Christian',
                'password' => 'jjjjjjjjj',
                'email_verified_at' => now(),
            ]
        );
        // Seed Job Titles
        $jobTitles = [
            ['name' => 'Manager', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Supervisor', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Staff', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Operator', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('job_titles')->insert($jobTitles);

        // Seed Banks
        $banks = [
            ['name' => 'BCA', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mandiri', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'BNI', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'BRI', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'CIMB Niaga', 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('banks')->insert($banks);

        // Seed Shifts
        $shifts = [
            ['name' => 'Pagi (07:00 - 15:00)', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Siang (15:00 - 23:00)', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Malam (23:00 - 07:00)', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Full Day (08:00 - 17:00)', 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('shifts')->insert($shifts);

        // Seed Employees
        $employees = [
            [
                'nama_pegawai' => 'Budi Santoso',
                'gaji_pokok' => '5000000',
                'job_title_id' => 1,
                'shift_id' => 4,
                'bank_id' => 1,
                'periode_gajian' => 'Bulanan',
                'nomor_telepon' => '081234567890',
                'gaji_harian' => '200000',
                'nomor_rekening' => '1234567890',
                'uang_makan' => '50000',
                'nama_rekening' => 'Budi Santoso',
                'uang_makan_tanggal_merah' => 75000,
                'rate_lembur' => 25000,
                'rate_lembur_tanggal_merah' => 50000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pegawai' => 'Siti Nurhaliza',
                'gaji_pokok' => '4000000',
                'job_title_id' => 2,
                'shift_id' => 1,
                'bank_id' => 2,
                'periode_gajian' => 'Bulanan',
                'nomor_telepon' => '081234567891',
                'gaji_harian' => '160000',
                'nomor_rekening' => '2234567890',
                'uang_makan' => '45000',
                'nama_rekening' => 'Siti Nurhaliza',
                'uang_makan_tanggal_merah' => 70000,
                'rate_lembur' => 20000,
                'rate_lembur_tanggal_merah' => 40000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pegawai' => 'Ahmad Dahlan',
                'gaji_pokok' => '3500000',
                'job_title_id' => 3,
                'shift_id' => 2,
                'bank_id' => 3,
                'periode_gajian' => 'Bulanan',
                'nomor_telepon' => '081234567892',
                'gaji_harian' => '140000',
                'nomor_rekening' => '3234567890',
                'uang_makan' => '40000',
                'nama_rekening' => 'Ahmad Dahlan',
                'uang_makan_tanggal_merah' => 65000,
                'rate_lembur' => 18000,
                'rate_lembur_tanggal_merah' => 36000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pegawai' => 'Dewi Lestari',
                'gaji_pokok' => '3000000',
                'job_title_id' => 4,
                'shift_id' => 3,
                'bank_id' => 4,
                'periode_gajian' => 'Bulanan',
                'nomor_telepon' => '081234567893',
                'gaji_harian' => '120000',
                'nomor_rekening' => '4234567890',
                'uang_makan' => '35000',
                'nama_rekening' => 'Dewi Lestari',
                'uang_makan_tanggal_merah' => 60000,
                'rate_lembur' => 15000,
                'rate_lembur_tanggal_merah' => 30000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pegawai' => 'Rudi Hartono',
                'gaji_pokok' => '3200000',
                'job_title_id' => 5,
                'shift_id' => 4,
                'bank_id' => 5,
                'periode_gajian' => 'Bulanan',
                'nomor_telepon' => '081234567894',
                'gaji_harian' => '130000',
                'nomor_rekening' => '5234567890',
                'uang_makan' => '40000',
                'nama_rekening' => 'Rudi Hartono',
                'uang_makan_tanggal_merah' => 65000,
                'rate_lembur' => 17000,
                'rate_lembur_tanggal_merah' => 34000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('employees')->insert($employees);
        // JobTitle::create([
        //     'name' => 'Tukang Kayu',
        // ]);
        //
        // JobTitle::create([
        //     'name' => 'Tukang Cat',
        // ]);
        //
        // JobTitle::create([
        //     'name' => 'Tukang Listrik',
        // ]);
        //
        // JobTitle::create([
        //     'name' => 'Tukang Batu',
        // ]);
        // // Seed Employees
        // DB::table('employees')->insert([
        //     [
        //         'nama_pegawai' => 'Budi Santoso',
        //         'gaji_pokok' => '5000000',
        //         'bagian' => 'Tukang Kayu',
        //         'periode_gajian' => '2 Minggu',
        //         'nomor_telepon' => '081234567890',
        //         'gaji_harian' => '250000',
        //         'nomor_rekening' => '1234567890',
        //         'uang_makan' => '50000',
        //         'nama_rekening' => 'Budi Santoso',
        //         'uang_makan_tanggal_merah' => 75000.00,
        //         'bank' => 'Permata Bank - Menteng',
        //         'rate_lembur' => 35000.00,
        //         'shift' => 'Ratio 1',
        //         'rate_lembur_tanggal_merah' => 50000.00,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'nama_pegawai' => 'Andi Wijaya',
        //         'gaji_pokok' => '4500000',
        //         'bagian' => 'Tukang Besi',
        //         'periode_gajian' => '1 Minggu',
        //         'nomor_telepon' => '082345678901',
        //         'gaji_harian' => '225000',
        //         'nomor_rekening' => '0987654321',
        //         'uang_makan' => '45000',
        //         'nama_rekening' => 'Andi Wijaya',
        //         'uang_makan_tanggal_merah' => 65000.00,
        //         'bank' => 'BCA - Sudirman',
        //         'rate_lembur' => 30000.00,
        //         'shift' => 'Ratio 2',
        //         'rate_lembur_tanggal_merah' => 45000.00,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'nama_pegawai' => 'Siti Nurhaliza',
        //         'gaji_pokok' => '6000000',
        //         'bagian' => 'Mandor',
        //         'periode_gajian' => '1 Bulan',
        //         'nomor_telepon' => '083456789012',
        //         'gaji_harian' => '300000',
        //         'nomor_rekening' => '1122334455',
        //         'uang_makan' => '60000',
        //         'nama_rekening' => 'Siti Nurhaliza',
        //         'uang_makan_tanggal_merah' => 90000.00,
        //         'bank' => 'Mandiri - Thamrin',
        //         'rate_lembur' => 40000.00,
        //         'shift' => 'Ratio 1',
        //         'rate_lembur_tanggal_merah' => 60000.00,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'nama_pegawai' => 'Joko Prasetyo',
        //         'gaji_pokok' => '4000000',
        //         'bagian' => 'Helper',
        //         'periode_gajian' => '2 Minggu',
        //         'nomor_telepon' => '084567890123',
        //         'gaji_harian' => '200000',
        //         'nomor_rekening' => '5544332211',
        //         'uang_makan' => '40000',
        //         'nama_rekening' => 'Joko Prasetyo',
        //         'uang_makan_tanggal_merah' => 60000.00,
        //         'bank' => 'BNI - Kuningan',
        //         'rate_lembur' => 25000.00,
        //         'shift' => 'Ratio 3',
        //         'rate_lembur_tanggal_merah' => 40000.00,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'nama_pegawai' => 'Rina Wati',
        //         'gaji_pokok' => '5500000',
        //         'bagian' => 'Operator',
        //         'periode_gajian' => '1 Minggu',
        //         'nomor_telepon' => '085678901234',
        //         'gaji_harian' => '275000',
        //         'nomor_rekening' => '6677889900',
        //         'uang_makan' => '55000',
        //         'nama_rekening' => 'Rina Wati',
        //         'uang_makan_tanggal_merah' => 80000.00,
        //         'bank' => 'Permata Bank - Menteng',
        //         'rate_lembur' => 37500.00,
        //         'shift' => 'Ratio 2',
        //         'rate_lembur_tanggal_merah' => 55000.00,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        // ]);
    }
}
