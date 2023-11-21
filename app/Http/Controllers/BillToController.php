<?php

namespace App\Http\Controllers;

use App\Models\BillTo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Auth;

class BillToController extends Controller
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

        if(!in_array($role . '_bill_to', $permissions))
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

        $data['datas'] = BillTo::all();

        return Inertia::render('Admin/BillTo/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/BillTo/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.BillTo::class,
        ]);
    
        $BillTo = BillTo::create([
            'name' => $request->name
        ]);

        return Redirect::route('bill-to.create');
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
        $data['bill_to'] = BillTo::where('id', $id)->first();

        return Inertia::render('Admin/BillTo/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = BillTo::where('id', $id)->first();

        $checkName = BillTo::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . BillTo::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
        ]);

        $data->update([
            'name' => $request->name
        ]);


        return Redirect::route('bill-to.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        BillTo::where('id', $id)->delete();

        return Redirect::route('bill-to.index');
    }
}
