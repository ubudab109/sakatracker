<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tax;
use Auth;

class TaxController extends Controller
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

        if(!in_array($role . '_tax', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['permissions'] = $this->checkPermission('index');

        $data['taxes'] = Tax::get();

        return Inertia::render('Admin/Tax/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['permissions'] = $this->checkPermission('store');

        return Inertia::render('Admin/Tax/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.Tax::class,
            'tax' => 'required|string|max:255|unique:'.Tax::class,
        ]);
    
        Tax::create([
            'name' => $request->name,
            'tax' => $request->tax
        ]);

        return Redirect::route('tax.create');
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
        $data['permissions'] = $this->checkPermission('update');

        $data['tax'] = Tax::where('id', $id)->first();

        return Inertia::render('Admin/Tax/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = Tax::where('id', $id)->first();

        $checkName = Tax::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . Tax::class;
        }

        $checkTax = Tax::where('tax', $request->tax)->first();

        $validateTax = '';

        if ($checkTax && $checkTax->id !== $data->id) {
            $validateTax = '|unique:' . Tax::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
            'tax' => 'required|string|max:255' . $validateTax,
        ]);

        $data->update([
            'name' => $request->name,
            'tax' => $request->tax,
        ]);


        return Redirect::route('tax.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        Tax::where('id', $id)->delete();

        return Redirect::route('tax.index');
    }
}
