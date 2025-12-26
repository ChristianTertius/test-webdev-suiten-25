<?php

namespace App\Http\Controllers;

use App\Models\JobTitle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobTitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('jobtitles/index', [
            'jobtitles' => JobTitle::withCount('employees')->get(), // ← Cukup ini saja
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('jobtitles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $jobtitle = JobTitle::create($validatedData);

        return Inertia::render('jobtitles/show', [
            'jobtitle' => $jobtitle,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobTitle $jobtitle)
    {
        return Inertia::render('jobtitles/show', [
            'jobtitle' => $jobtitle,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobTitle $jobtitle)
    {
        return Inertia::render('jobtitles/edit', [
            'jobtitle' => $jobtitle,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobTitle $jobtitle)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $jobtitle->update($validatedData);

        return Inertia::render('jobtitles/show', [
            'jobtitle' => $jobtitle,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobTitle $jobtitle)
    {
        $jobtitle->delete();
        return redirect()->route('jobtitles.index')->with('success', 'Data deleted successfully.');
    }
}
