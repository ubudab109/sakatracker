<?php

namespace App\Http\Controllers;

use App\Models\RevisionExchangeInvoice;
use App\Models\ApproverInvoiceItem;
use App\Models\ApproverInvoice;
use App\Models\ExchangeInvoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class SummaryInvoiceSLAController extends Controller
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

        $data['approver_invoices'] = ApproverInvoice::with('approver_invoice_items')
        ->get()
        ->map(function($approver_invoice){
            $approver_invoice['items'] = ApproverInvoiceItem::with('user')->where('approver_invoice_id', $approver_invoice->id)->get()
            ->map(function($item){
                $item['on_time'] = 0;
                $item['on_delay'] = 0;
                $item['achievement'] = 0;

                $getRevisions = RevisionExchangeInvoice::
                where('user_id', $item->user_id)
                ->where('level', $item->level)
                ->get();
                
                foreach($getRevisions as $getRevision)
                {
                    if($getRevision)
                    {
                        if($getRevision->submit_at)
                        {
                            if($getRevision->submit_at < $getRevision->sla_at)
                            {
                                $item['on_time'] += 1;
                            } else {
                                $item['on_delay'] += 1;
                            }
                        }
                    }
                }
    
                if ($item['on_time'] + $item['on_delay'] > 0) {
                    $item['achievement'] = ($item['on_time'] / ($item['on_time'] + $item['on_delay'])) * 100;
                } else {
                    $item['achievement'] = 0;
                }

                return $item;
            });

            return $approver_invoice;
        });
        
        return Inertia::render('Admin/SummarySLA/Invoice/Index', [
            'data' => $data
        ]);

    }
}
