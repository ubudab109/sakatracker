<?php

namespace App\Http\Controllers;

use App\Models\Suffix;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class SuffixController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['datas'] = Suffix::all();

        return Inertia::render('Admin/Suffix/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Suffix/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.Suffix::class,
        ]);
    
        $suffix = Suffix::create([
            'name' => $request->name
        ]);

        return Redirect::route('suffix.create');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['suffix'] = Suffix::where('id', $id)->first();

        return Inertia::render('Admin/Suffix/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = Suffix::where('id', $id)->first();

        $checkName = Suffix::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . Suffix::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
        ]);

        $data->update([
            'name' => $request->name
        ]);


        return Redirect::route('suffix.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Suffix::where('id', $id)->delete();

        return Redirect::route('suffix.index');
    }
}
