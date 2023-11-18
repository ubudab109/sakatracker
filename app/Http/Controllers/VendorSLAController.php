<?php

namespace App\Http\Controllers;

use App\Models\RevisionRegisterVendor;
use App\Models\ApproverVendor;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;
use Auth;

class VendorSLAController extends Controller
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

        if(!in_array($role . '_monitoring_sla', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index() 
    {
        $data['permissions'] = $this->checkPermission('index');

        $data['approver_vendors'] = ApproverVendor::with('role')->get();

        $data['vendors'] = Vendor::
        where('status_account', '!=', 'draft')
        ->orderBy('id', 'desc')
        ->get()
        ->map(function($vendor){
            $approver_vendors = ApproverVendor::with('role')->get();
            $vendor['total_sla'] = 0;
            foreach($approver_vendors as $approver_vendor)
            {
                $vendor[$approver_vendor->role->name] = 0;
                $getRevision = RevisionRegisterVendor::where('vendor_id', $vendor->id)
                ->where('approval_role', $approver_vendor->role->name)
                ->first();

                if($getRevision)
                {
                    if($getRevision->submit_at)
                    {
                        if($getRevision->submit_at < $getRevision->sla_at)
                        {
                            $vendor[$approver_vendor->role->name] = 1;
                        } else {
                            $vendor[$approver_vendor->role->name] = 2;
                        }
                    }
                }

                $vendor['total_sla'] += $vendor[$approver_vendor->role->name];
            }

            return $vendor;
        });

        return Inertia::render('Admin/MonitoringSLA/Vendor/Index', [
            'data' => $data
        ]);

    }
}
