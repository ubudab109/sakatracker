<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use App\Models\ApproverVendor;
use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;
use Auth;

class ApproverVendorController extends Controller
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

        if(!in_array($role . '_approver_vendor', $permissions))
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

        $data['approvers'] = ApproverVendor::with('role')->orderBy('level')->get();

        $this->orderByLevel();

        return Inertia::render('Admin/ApproverVendor/Index', [
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

        return Inertia::render('Admin/ApproverVendor/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            // 'level' => 'required|integer|max:255|unique:'.ApproverVendor::class,
            'role_id' => 'required',
            'sla' => 'required|integer',
        ]);

        $checkLastLevel = ApproverVendor::latest()->first();

        $level = 0;
        if($checkLastLevel) {
            $level = $checkLastLevel->level + 1;
        }
    
        $user = ApproverVendor::create([
           'role_id' => $request->role_id,
           'level' => $level,
           'sla' => $request->sla,
        ]);


        return Redirect::route('approver-vendor.create');
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

        $data['approver'] = ApproverVendor::where('id', $id)->first();
        $data['roles'] = Role::all();

        return Inertia::render('Admin/ApproverVendor/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = ApproverVendor::where('id', $id)->first();

        // $checkLevel = ApproverVendor::where('level', $request->level)->first();

        // $validateLevel = '';

        // if ($checkLevel && $checkLevel->id !== $data->id) {
        //     $validateLevel = '|unique:' . ApproverVendor::class;
        // }

        $request->validate([
            // 'level' => 'required|integer|max:255' . $validateLevel,
            'role_id' => 'required',
            'sla' => 'required|integer',
        ]);

        $data->update([
            // 'level' => $request->level,
            'role_id' => $request->role_id,
            'sla' => $request->sla,
        ]);


        return Redirect::route('approver-vendor.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        ApproverVendor::where('id', $id)->delete();

        return Redirect::route('approver-vendor.index');
    }

    public function swapLevel(Request $request, $id) 
    {
        $data = ApproverVendor::where('id', $id)->first();
        $newLevel = $data->level;
        $oldLevel = $data->level;
        if($request->icon == 'up') {
            $checkUpData = ApproverVendor::where('level', $data->level - 1)->first();
            if($checkUpData) {
                $newLevel = $checkUpData->level;
                $checkUpData->update([
                    'level' => $oldLevel
                ]);
            }
        } else {
            $checkDownData = ApproverVendor::where('level', $data->level + 1)->first();
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

        return Redirect::route('approver-vendor.index');
    }

    public function orderByLevel() {
        $data['approvers'] = ApproverVendor::orderBy('level')->get();

        foreach($data['approvers'] as $key => $approver) {
            $approver->update([
                'level' => $key + 1
            ]);
        }
    }
}
