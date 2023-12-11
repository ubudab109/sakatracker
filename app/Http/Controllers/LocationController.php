<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $data['locations'] = Location::orderBy('name')->get();
        return Inertia::render('Admin/Locations/Index', [
            'data' => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Locations/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);
        Location::create($request->all());
        return Redirect::route('admin.location.index');
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);
        $location = Location::find($id);
        $location->update($request->all());
        return Redirect::route('admin.location.index');
    }

    public function edit($id)
    {
        $data['location'] = Location::find($id);
        return Inertia::render('Admin/Locations/Edit', ['data' => $data]);
    }

    public function destroy($id)
    {
        Location::find($id)->delete();
        return Redirect::back();
    }
}
