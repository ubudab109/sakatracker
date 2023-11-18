<?php

namespace App\Http\Controllers;

use App\Models\RevisionRegisterVendor;
use App\Models\ApproverVendor;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;
use Auth;

class SummaryVendorSLAController extends Controller
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

        if(!in_array($role . '_summary_sla', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index() 
    {
        $data['permissions'] = $this->checkPermission('index');

        $data['approver_vendors'] = ApproverVendor::with('role')->get()
        ->map(function($approver_vendor){
            $approver_vendor['on_time'] = 0;
            $approver_vendor['on_delay'] = 0;
            $approver_vendor['achievement'] = 0;

            $revisions = RevisionRegisterVendor::
            whereHas('vendor', function($q){
                $q->where('status_account', '!=', 'draft');
            })
            ->where('approval_role', $approver_vendor->role->name)
            ->get();

            foreach($revisions as $revision)
            {
                if($revision->submit_at)
                {
                    if($revision->submit_at < $revision->sla_at)
                    {
                        $approver_vendor['on_time'] += 1;
                    } else {
                        $approver_vendor['on_delay'] += 1;
                    }
                }
            }

            if ($approver_vendor['on_time'] + $approver_vendor['on_delay'] > 0) {
                $approver_vendor['achievement'] = ($approver_vendor['on_time'] / ($approver_vendor['on_time'] + $approver_vendor['on_delay'])) * 100;
            } else {
                $approver_vendor['achievement'] = 0;
            }

            return $approver_vendor;
        });
        
        return Inertia::render('Admin/SummarySLA/Vendor/Index', [
            'data' => $data
        ]);
    }
}
