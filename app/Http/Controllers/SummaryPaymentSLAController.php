<?php

namespace App\Http\Controllers;

use App\Models\RevisionBatchPayment;
use App\Models\ApproverPayment;
use App\Models\BatchPayment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class SummaryPaymentSLAController extends Controller
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

        $data['approver_payments'] = ApproverPayment::with('role')->get()
        ->map(function($approver_payment){
            $approver_payment['on_time'] = 0;
            $approver_payment['on_delay'] = 0;
            $approver_payment['achievement'] = 0;

            $revisions = RevisionBatchPayment::
            whereHas('batch_payment', function($q){
                $q->where('status', '!=', 'draft');
            })
            ->where('approval_role', $approver_payment->role->name)
            ->get();

            foreach($revisions as $revision)
            {
                if($revision->submit_at)
                {
                    if($revision->submit_at < $revision->sla_at)
                    {
                        $approver_payment['on_time'] += 1;
                    } else {
                        $approver_payment['on_delay'] += 1;
                    }
                }
            }

            if ($approver_payment['on_time'] + $approver_payment['on_delay'] > 0) {
                $approver_payment['achievement'] = ($approver_payment['on_time'] / ($approver_payment['on_time'] + $approver_payment['on_delay'])) * 100;
            } else {
                $approver_payment['achievement'] = 0;
            }

            return $approver_payment;
        });

        return Inertia::render('Admin/SummarySLA/Payment/Index', [
            'data' => $data
        ]);

    }
}
