<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\JobTitleController;
use App\Http\Controllers\ShiftController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('employees', EmployeeController::class);
    Route::resource('jobtitles', JobTitleController::class);
    Route::resource('banks', BankController::class);
    Route::resource('shifts', ShiftController::class);
    // Route::resource('attendances', AttendanceController::class);
    Route::get('/attendances/input', [AttendanceController::class, 'inputPage'])->name('attendances.input');
    Route::post('/attendances/bulk-update', [AttendanceController::class, 'bulkUpdate'])->name('attendances.bulk-update');
    Route::resource('attendances', AttendanceController::class);
});

require __DIR__ . '/settings.php';
