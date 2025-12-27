<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use App\Models\JobTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tanggal = $request->get('tanggal', now()->format('Y-m-d'));
        $jobTitleId = $request->get('job_title_id');
        $search = $request->get('search');

        // Get all employees
        $employeesQuery = Employee::with('job_title');

        if ($jobTitleId) {
            $employeesQuery->where('job_title_id', $jobTitleId);
        }

        if ($search) {
            $employeesQuery->where('nama_pegawai', 'like', '%' . $search . '%');
        }

        $employees = $employeesQuery->get();

        // Get or create attendances for the selected date
        $attendances = [];
        foreach ($employees as $employee) {
            $attendance = Attendance::firstOrCreate(
                [
                    'employee_id' => $employee->id,
                    'tanggal' => $tanggal,
                ],
                [
                    'job_title_id' => $employee->job_title_id,
                    'is_present' => false,
                    'hari_kerja' => 0,
                    'jam_lembur' => 0,
                ]
            );

            // Force fresh dari database
            $attendance->refresh();
            $attendance->load(['employee', 'job_title']);

            // Debug log
            Log::info("Loading attendance for {$employee->nama_pegawai}", [
                'id' => $attendance->id,
                'is_present' => $attendance->is_present,
                'jam_pulang' => $attendance->jam_pulang,
                'hari_kerja' => $attendance->hari_kerja,
                'jam_lembur' => $attendance->jam_lembur,
            ]);

            $attendances[] = $attendance;
        }

        return Inertia::render('attendances/index', [
            'attendances' => $attendances,
            'jobtitles' => JobTitle::all(),
            'filters' => [
                'tanggal' => $tanggal,
                'job_title_id' => $jobTitleId,
                'search' => $search,
            ],
        ]);
    }
    public function inputPage(Request $request)
    {
        $tanggal = $request->get('tanggal', now()->format('Y-m-d'));
        $jobTitleId = $request->get('job_title_id');
        $search = $request->get('search');

        // Get all employees
        $employeesQuery = Employee::with('job_title');

        if ($jobTitleId) {
            $employeesQuery->where('job_title_id', $jobTitleId);
        }

        if ($search) {
            $employeesQuery->where('nama_pegawai', 'like', '%' . $search . '%');
        }

        $employees = $employeesQuery->get();

        // Get or create attendances for the selected date
        $attendances = [];
        foreach ($employees as $employee) {
            $attendance = Attendance::firstOrCreate(
                [
                    'employee_id' => $employee->id,
                    'tanggal' => $tanggal,
                ],
                [
                    'job_title_id' => $employee->job_title_id,
                    'is_present' => false,
                    'hari_kerja' => 0,
                    'jam_lembur' => 0,
                ]
            );

            $attendance->load(['employee', 'job_title']);
            $attendances[] = $attendance;
        }

        return Inertia::render('attendances/input', [
            'attendances' => $attendances,
            'jobtitles' => JobTitle::all(),
            'filters' => [
                'tanggal' => $tanggal,
                'job_title_id' => $jobTitleId,
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Attendance/Create', [
            'employees' => Employee::with('job_title')->get(),
            'jobtitles' => JobTitle::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'job_title_id' => 'required|exists:job_titles,id',
            'jam_pulang' => 'nullable|date_format:H:i',
            'hari_kerja' => 'required|integer|min:0',
            'jam_lembur' => 'required|integer|min:0',
            'catatan' => 'nullable|string',
        ]);

        try {
            Attendance::create($validated);

            return redirect()->route('attendances.index')
                ->with('success', 'Data absensi berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menambahkan data absensi. Mungkin sudah ada data untuk pegawai ini di tanggal yang sama.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        return Inertia::render('Attendance/Edit', [
            'attendance' => $attendance->load(['employee', 'job_title']),
            'employees' => Employee::with('job_title')->get(),
            'jobtitles' => JobTitle::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'is_present' => 'required|boolean',
            'jam_pulang' => 'nullable|date_format:H:i',
            'hari_kerja' => 'nullable|integer|min:0',
            'jam_lembur' => 'nullable|integer|min:0',
            'catatan' => 'nullable|string',
        ]);

        // If not present, clear other fields
        if (!$validated['is_present']) {
            $validated['jam_pulang'] = null;
            $validated['hari_kerja'] = 0;
            $validated['jam_lembur'] = 0;
            $validated['catatan'] = null;
        }

        $attendance->update($validated);

        return back()->with('success', 'Data absensi berhasil diperbarui');
    }

    public function bulkUpdate(Request $request)
    {
        try {
            Log::info('Bulk Update Request:', $request->all());

            $validated = $request->validate([
                'attendances' => 'required|array',
                'attendances.*.id' => 'required|exists:attendances,id',
                'attendances.*.is_present' => 'required|boolean',
                'attendances.*.jam_pulang' => 'nullable|string',
                'attendances.*.hari_kerja' => 'nullable|integer|min:0',
                'attendances.*.jam_lembur' => 'nullable|integer|min:0',
                'attendances.*.catatan' => 'nullable|string',
            ]);

            $updated = 0;

            // Gunakan DB transaction untuk memastikan semua tersimpan
            \DB::transaction(function () use ($validated, &$updated) {
                foreach ($validated['attendances'] as $attendanceData) {
                    $attendance = Attendance::find($attendanceData['id']);

                    if (!$attendance) {
                        Log::warning("Attendance not found: {$attendanceData['id']}");
                        continue;
                    }

                    // Prepare data for update
                    $updateData = [
                        'is_present' => $attendanceData['is_present'],
                    ];

                    if (!$attendanceData['is_present']) {
                        $updateData['jam_pulang'] = null;
                        $updateData['hari_kerja'] = 0;
                        $updateData['jam_lembur'] = 0;
                        $updateData['catatan'] = null;
                    } else {
                        $updateData['jam_pulang'] = !empty($attendanceData['jam_pulang']) ? $attendanceData['jam_pulang'] : null;
                        $updateData['hari_kerja'] = $attendanceData['hari_kerja'] ?? 0;
                        $updateData['jam_lembur'] = $attendanceData['jam_lembur'] ?? 0;
                        $updateData['catatan'] = $attendanceData['catatan'] ?? null;
                    }

                    // Update attendance
                    $attendance->update($updateData);
                    $updated++;

                    Log::info("Updated attendance ID {$attendance->id}", $attendance->fresh()->toArray());
                }
            });

            Log::info("Total updated: {$updated}");

            // Redirect ke index dengan data fresh
            return redirect()->route('attendances.index')
                ->with('success', "Berhasil menyimpan {$updated} data absensi");
        } catch (\Exception $e) {
            Log::error('Bulk Update Error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return back()
                ->withErrors(['error' => 'Gagal menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->route('attendances.index')
            ->with('success', 'Data absensi berhasil dihapus');
    }
}
