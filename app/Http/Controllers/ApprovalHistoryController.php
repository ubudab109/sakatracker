<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\RevisionRegisterVendor;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class ApprovalHistoryController extends Controller
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

        if(!in_array($role . '_vendor_profile', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index(Request $request) {
        $data['permissions'] = $this->checkPermission('index');

        $roleUser = [];
        if(Auth::user()->user_role != null) {
            foreach(Auth::user()->user_role as $item) {
                array_push($roleUser, $item->role->name);
            }
        }
        
        $data['approval_histories'] = RevisionRegisterVendor::with('vendor.user')
        ->whereHas('vendor.user')
        ->whereIn('approval_role', $roleUser)
        ->where('status', 'disetujui')
        ->get()
        ->map(function($approval){
            $checkLastApproval = RevisionRegisterVendor::where('vendor_id', $approval->vendor_id)
            ->where('status', 'disetujui')->orderByDesc('id')->first();
            if($checkLastApproval)
            {
                $approval['status'] = 'disetujui oleh ' . $checkLastApproval->approval_role;
            }

            $approval['new_updated_at'] = $approval->vendor->updated_at;
            return $approval;
        });

        $data['approval_histories'] = $data['approval_histories']->sortByDesc('new_updated_at')->values()->all();

        return Inertia::render('Admin/ApprovalHistory/Index', [
            'data' => $data
        ]);
    }
}
