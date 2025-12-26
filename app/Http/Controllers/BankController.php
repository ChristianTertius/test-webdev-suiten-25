<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('banks/index', [
            'banks' => Bank::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('banks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $bank = Bank::create($validatedData);

        return Inertia::render('banks/show', [
            'bank' => $bank,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bank $bank)
    {
        return Inertia::render('banks/show', [
            'bank' => $bank,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bank $bank)
    {
        return Inertia::render('banks/edit', [
            'bank' => $bank,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bank $bank)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $bank->update($validatedData);

        return Inertia::render('banks/show', [
            'bank' => $bank,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bank $bank)
    {
        $bank->delete();
        return redirect()->route('banks.index')->with('success', 'Data deleted successfully.');
    }
}
