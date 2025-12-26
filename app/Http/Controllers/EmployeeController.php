<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use App\Models\Employee;
use App\Models\JobTitle;
use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('employees/index', [
            'employees' => Employee::with(['job_title', 'bank', 'shift'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('employees/create', [
            'jobtitles' => JobTitle::all(),
            'banks' => Bank::all(),
            'shifts' => Shift::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Log::info('Request data:', $request->all());
        $validatedData = $request->validate([
            'nama_pegawai' => 'required|string|max:255',
            'job_title_id' => 'required|exists:job_titles,id',
            'nomor_telepon' => 'required|string|max:255',
            'nomor_rekening' => 'required|string|max:255',
            'nama_rekening' => 'required|string|max:255',
            'bank_id' => 'required|exists:banks,id',
            'shift_id' => 'required|exists:shifts,id',
            'periode_gajian' => 'required|string|max:255',
            'gaji_pokok' => 'required|string|max:255',
            'gaji_harian' => 'required|string|max:255',
            'uang_makan' => 'required|string|max:255',
            'uang_makan_tanggal_merah' => 'required|string|max:255',
            'rate_lembur' => 'required|string|max:255',
            'rate_lembur_tanggal_merah' => 'required|string|max:255',
        ]);

        $employee = Employee::create($validatedData);

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Pegawai berhasil diupdate.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return Inertia::render('employees/show', [
            'employee' => $employee,
            'jobtitles' => JobTitle::all(),
            'banks' => Bank::all(),
            'shifts' => Shift::all(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('employees/edit', [
            'employee' => $employee->load(['job_title', 'bank', 'shift']),
            'jobtitles' => JobTitle::all(),
            'banks' => Bank::all(),
            'shifts' => Shift::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validatedData = $request->validate([
            'nama_pegawai' => 'required|string|max:255',
            'job_title_id' => 'required|exists:job_titles,id',
            'nomor_telepon' => 'nullable|string|max:255',  // ← Ubah ke nullable
            'nomor_rekening' => 'nullable|string|max:255', // ← Ubah ke nullable
            'nama_rekening' => 'nullable|string|max:255',  // ← Ubah ke nullable
            'bank_id' => 'nullable|exists:banks,id',       // ← Ubah ke nullable
            'shift_id' => 'nullable|exists:shifts,id',     // ← Ubah ke nullable
            'periode_gajian' => 'nullable|string|max:255', // ← Ubah ke nullable
            'gaji_pokok' => 'nullable|numeric|min:0',      // ← Ubah ke nullable & numeric
            'gaji_harian' => 'nullable|numeric|min:0',     // ← Ubah ke nullable & numeric
            'uang_makan' => 'nullable|numeric|min:0',      // ← Ubah ke nullable & numeric
            'uang_makan_tanggal_merah' => 'nullable|numeric|min:0',
            'rate_lembur' => 'nullable|numeric|min:0',
            'rate_lembur_tanggal_merah' => 'nullable|numeric|min:0',
        ]);

        $employee->update($validatedData);

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Pegawai berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index')->with('success', 'Data deleted successfully.');
    }
}
