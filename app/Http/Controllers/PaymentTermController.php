<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\PaymentTerm;
use Inertia\Inertia;
use Auth;

class PaymentTermController extends Controller
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

        if(!in_array($role . '_payment_term', $permissions))
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

        $data['payment_terms'] = PaymentTerm::get();

        return Inertia::render('Admin/PaymentTerm/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['permissions'] = $this->checkPermission('store');

        return Inertia::render('Admin/PaymentTerm/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.PaymentTerm::class,
            'day' => 'required|string|max:255|unique:'.PaymentTerm::class,
        ]);
    
        PaymentTerm::create([
            'name' => $request->name,
            'day' => $request->day
        ]);

        return Redirect::route('payment-term.create');
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

        $data['payment_term'] = PaymentTerm::where('id', $id)->first();

        return Inertia::render('Admin/PaymentTerm/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = PaymentTerm::where('id', $id)->first();

        $checkName = PaymentTerm::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . PaymentTerm::class;
        }

        $checkDay = PaymentTerm::where('day', $request->day)->first();

        $validateDay = '';

        if ($checkDay && $checkDay->id !== $data->id) {
            $validateDay = '|unique:' . PaymentTerm::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
            'day' => 'required|string|max:255' . $validateDay,
        ]);

        $data->update([
            'name' => $request->name,
            'day' => $request->day,
        ]);


        return Redirect::route('payment-term.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        PaymentTerm::where('id', $id)->delete();

        return Redirect::route('payment-term.index');
    }
}
