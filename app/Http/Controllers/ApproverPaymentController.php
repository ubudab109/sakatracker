<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use App\Models\ApproverPayment;
use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;
use Auth;

class ApproverPaymentController extends Controller
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

        if(!in_array($role . '_approver_payment', $permissions))
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

        $data['approvers'] = ApproverPayment::with('role')->orderBy('level')->get();

        $this->orderByLevel();

        return Inertia::render('Admin/ApproverPayment/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['permissions'] = $this->checkPermission('store');

        $data['roles'] = Role::all();

        return Inertia::render('Admin/ApproverPayment/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            // 'level' => 'required|integer|max:255|unique:'.ApproverPayment::class,
            'role_id' => 'required',
            'start_fee' => 'required|integer',
            'end_fee' => 'required|integer',
            'sla' => 'required|integer',
        ]);
        
        $user = ApproverPayment::create([
            'role_id' => $request->role_id,
            'start_fee' => $request->start_fee,
            'end_fee' => $request->end_fee,
            'sla' => $request->sla,
        //    'level' => $request->level,
        ]);


        return Redirect::route('approver-payment.create');
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

        $data['approver'] = ApproverPayment::where('id', $id)->first();
        $data['roles'] = Role::all();

        return Inertia::render('Admin/ApproverPayment/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = ApproverPayment::where('id', $id)->first();

        // $checkLevel = ApproverPayment::where('level', $request->level)->first();

        // $validateLevel = '';

        // if ($checkLevel && $checkLevel->id !== $data->id) {
        //     $validateLevel = '|unique:' . ApproverPayment::class;
        // }

        $request->validate([
            // 'level' => 'required|integer|max:255' . $validateLevel,
            'role_id' => 'required',
            'start_fee' => 'required|integer',
            'end_fee' => 'required|integer',
            'sla' => 'required|integer',
        ]);

        $data->update([
            // 'level' => $request->level,
            'role_id' => $request->role_id,
            'start_fee' => $request->start_fee,
            'end_fee' => $request->end_fee,
            'sla' => $request->sla,
        ]);


        return Redirect::route('approver-payment.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        ApproverPayment::where('id', $id)->delete();

        return Redirect::route('approver-payment.index');
    }

    public function swapLevel(Request $request, $id) 
    {
        $data = ApproverPayment::where('id', $id)->first();
        $newLevel = $data->level;
        $oldLevel = $data->level;
        if($request->icon == 'up') {
            $checkUpData = ApproverPayment::where('level', $data->level - 1)->first();
            if($checkUpData) {
                $newLevel = $checkUpData->level;
                $checkUpData->update([
                    'level' => $oldLevel
                ]);
            }
        } else {
            $checkDownData = ApproverPayment::where('level', $data->level + 1)->first();
            if($checkDownData) {
                $newLevel = $checkDownData->level;
                $checkDownData->update([
                    'level' => $oldLevel
                ]);
            }
        }

        $data->update([
            'level' => $newLevel
        ]);

        return Redirect::route('approver-payment.index');
    }

    public function orderByLevel() {
        $data['approvers'] = ApproverPayment::orderBy('level')->get();

        foreach($data['approvers'] as $key => $approver) {
            $approver->update([
                'level' => $key + 1
            ]);
        }
    }
}
