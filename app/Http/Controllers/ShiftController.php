<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('shifts/index', [
            'shifts' => Shift::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('shifts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $shift = Shift::create($validatedData);

        return Inertia::render('shifts/show', [
            'shift' => $shift,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift)
    {
        return Inertia::render('shifts/show', [
            'shift' => $shift,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shift $shift)
    {
        return Inertia::render('shifts/edit', [
            'shift' => $shift,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shift $shift)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $shift->update($validatedData);

        return Inertia::render('shifts/show', [
            'shift' => $shift,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();
        return redirect()->route('shifts.index')->with('success', 'Data deleted successfully.');
    }
}
