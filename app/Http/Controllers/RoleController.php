<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use App\Models\RolePermission;
use App\Models\OracleTaxCode;
use Illuminate\Http\Request;
use App\Models\UserRole;
use App\Models\User;
use App\Models\Role;
use Inertia\Inertia;
use Auth;

class RoleController extends Controller
{
    public function arrayPermissions()
    {
        $data = [
            [
                'title' => 'Role',
                'name' => 'role',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ],[
                'title' => 'Suffix',
                'name' => 'suffix',
                'permission' => ['index'],
                'label' => ['Lihat']
            ],[
                'title' => 'Prefix',
                'name' => 'prefix',
                'permission' => ['index'],
                'label' => ['Lihat']
            ],[
                'title' => 'ShipTo',
                'name' => 'ship_to',
                'permission' => ['index'],
                'label' => ['Lihat']
            ],[
                'title' => 'BillTo',
                'name' => 'bill_to',
                'permission' => ['index'],
                'label' => ['Lihat']
            ],[
                'title' => 'Master User',
                'name' => 'user',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ],[
                'title' => 'Master Location',
                'name' => 'locations',
                'permission' => ['index'],
                'label' => ['Lihat']
            ],
            [
                'title' => 'Master Supplier Site',
                'name' => 'supplier_site',
                'permission' => ['index'],
                'label' => ['Lihat']
            ], [
                'title' => 'Master Approver Vendor',
                'name' => 'approver_vendor',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ], [
                'title' => 'Master Approver Invoice',
                'name' => 'approver_invoice',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ], [
                'title' => 'Master Approver Payment',
                'name' => 'approver_payment',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ], [
                'title' => 'Payment Term',
                'name' => 'payment_term',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ], [
                'title' => 'Tax',
                'name' => 'tax',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ], [
                'title' => 'SLA Calendar',
                'name' => 'sla_calendar',
                'permission' => ['index', 'store', 'update', 'delete'],
                'label' => ['Lihat', 'Tambah', 'Edit', 'Hapus']
            ], [
                'title' => 'Request GR',
                'name' => 'request_gr',
                'permission' => ['index', 'verification'],
                'label' => ['Lihat', 'Verifikasi']
            ],[
                'title' => 'Manajemen Invoice',
                'name' => 'exchange_invoice',
                'permission' => ['index', 'is_pic'],
                'label' => ['Lihat', 'PIC']
            ], [
                'title' => 'Batch Payment',
                'name' => 'batch_payment',
                'permission' => ['index'],
                'label' => ['Lihat']
            ], [
                'title' => 'Siap Bayar',
                'name' => 'pay_ready',
                'permission' => ['index'],
                'label' => ['Lihat']
            ], [
                'title' => 'Matching',
                'name' => 'matching',
                'permission' => ['index', 'edit'],
                'label' => ['Lihat', 'Edit']
            ], [
                'title' => 'Vendor',
                'name' => 'vendors',
                'permission' => ['index'],
                'label' => ['Lihat']
            ], [
                'title' => 'Perubahan Data',
                'name' => 'vendor_profile',
                'permission' => ['index', 'verification', 'update_ppn_top', 'update_skb_accounting'],
                'label' => ['Lihat', 'Verifikasi', 'Edit PPN & TOP', 'SKB Accounting']
            ], [
                'title' => 'Monitoring SLA',
                'name' => 'monitoring_sla',
                'permission' => ['index'],
                'label' => ['Lihat']
            ], [
                'title' => 'Summary SLA',
                'name' => 'summary_sla',
                'permission' => ['index'],
                'label' => ['Lihat']
            ], [
                'title' => 'Report',
                'name' => 'report',
                'permission' => ['index'],
                'label' => ['Lihat']
            ],
        ];

        return $data;
    }

    public function checkPermission($role)
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        if(!in_array($role . '_role', $permissions))
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
        // dd($data);
        $data['roles'] = Role::with('permissions')->get()
        ->map(function ($role) {
            $arrayPermission = [];
            foreach($role->permissions as $permission)
            {
                array_push($arrayPermission, $permission->name);
            }
            $role['arrayPermissions'] = $arrayPermission;

            return $role;
        });
        $data['array_permissions'] = $this->arrayPermissions();

        return Inertia::render('Admin/Role/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['permissions'] = $this->checkPermission('store');

        $data['array_permissions'] = $this->arrayPermissions();
        
        return Inertia::render('Admin/Role/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.Role::class,
        ]);
    
        $role = Role::create([
            'name' => $request->name
        ]);

        foreach($request->permissions as $permission)
        {
            RolePermission::create([
                'role_id' => $role->id,
                'name' => $permission
            ]);
        }

        return Redirect::route('role.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['permissions'] = $this->checkPermission('update');

        $data['role'] = Role::where('id', $id)->first();
        $arrayPermission = [];
        foreach($data['role']->permissions as $permission)
        {
            array_push($arrayPermission, $permission->name);
        }
        $data['arrayPermissions'] = $arrayPermission;

        $data['array_permissions'] = $this->arrayPermissions();

        return Inertia::render('Admin/Role/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = Role::where('id', $id)->first();

        $checkName = Role::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . Role::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
        ]);

        $data->update([
            'name' => $request->name
        ]);

        if(RolePermission::where('role_id', $data->id)->first())
        {
            RolePermission::where('role_id', $data->id)->delete();
        }
        foreach($request->permissions as $permission)
        {
            RolePermission::create([
                'role_id' => $data->id,
                'name' => $permission
            ]);
        }


        return Redirect::route('role.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        Role::where('id', $id)->delete();

        return Redirect::route('role.index');
    }
}
