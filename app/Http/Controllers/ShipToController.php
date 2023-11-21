<?php

namespace App\Http\Controllers;

use App\Models\ShipTo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Auth;

class ShipToController extends Controller
{
    public function checkPermission($role)
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        if(!in_array($role . '_ship_to', $permissions))
        {
            return abort(404);   
        } else {
            return $permissions;
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['permissions'] = $this->checkPermission('index');

        $data['datas'] = ShipTo::all();

        return Inertia::render('Admin/ShipTo/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ShipTo/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.ShipTo::class,
        ]);
    
        $ShipTo = ShipTo::create([
            'name' => $request->name
        ]);

        return Redirect::route('ship-to.create');
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
        $data['ship_to'] = ShipTo::where('id', $id)->first();

        return Inertia::render('Admin/ShipTo/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = ShipTo::where('id', $id)->first();

        $checkName = ShipTo::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . ShipTo::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
        ]);

        $data->update([
            'name' => $request->name
        ]);


        return Redirect::route('ship-to.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        ShipTo::where('id', $id)->delete();

        return Redirect::route('ship-to.index');
    }
}
