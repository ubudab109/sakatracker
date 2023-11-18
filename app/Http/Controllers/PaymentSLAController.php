<?php

namespace App\Http\Controllers;

use App\Models\RevisionBatchPayment;
use App\Models\ApproverPayment;
use App\Models\BatchPayment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class PaymentSLAController extends Controller
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

        $data['approver_payments'] = ApproverPayment::with('role')->get();

        $data['batch_payments'] = BatchPayment::
        where('status', '!=', 'draft')
        ->orderBy('id', 'desc')
        ->get()
        ->map(function($batch_payment){
            $approver_payments = ApproverPayment::with('role')->get();
            $batch_payment['total_sla'] = 0;
            foreach($approver_payments as $approver_payment)
            {
                $batch_payment[$approver_payment->role->name] = 0;
                $getRevision = RevisionBatchPayment::where('batch_payment_id', $batch_payment->id)
                ->where('approval_role', $approver_payment->role->name)
                ->first();

                if($getRevision)
                {
                    if($getRevision->submit_at)
                    {
                        if($getRevision->submit_at < $getRevision->sla_at)
                        {
                            $batch_payment[$approver_payment->role->name] = 1;
                        } else {
                            $batch_payment[$approver_payment->role->name] = 2;
                        }
                    }
                }

                $batch_payment['total_sla'] += $batch_payment[$approver_payment->role->name];
            }

            return $batch_payment;
        });
        
        return Inertia::render('Admin/MonitoringSLA/Payment/Index', [
            'data' => $data
        ]);
    }
}

