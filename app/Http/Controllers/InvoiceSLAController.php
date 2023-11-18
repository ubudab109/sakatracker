<?php

namespace App\Http\Controllers;

use App\Models\RevisionExchangeInvoice;
use App\Models\ApproverInvoiceItem;
use App\Models\ApproverInvoice;
use App\Models\ExchangeInvoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class InvoiceSLAController extends Controller
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

        $data['approver_invoices'] = ApproverInvoice::with('approver_invoice_items')
        ->get()
        ->map(function($approver_invoice){
            $approver_invoice['items'] = ApproverInvoiceItem::with('user')->where('approver_invoice_id', $approver_invoice->id)->get();
            
            $approver_invoice['invoices'] = ExchangeInvoice::with('vendor')
            ->where('approver_invoice_id', $approver_invoice->id)->get()
            ->map(function($invoice) use($approver_invoice){
                $invoice['total_sla'] = 0;
                foreach($approver_invoice['items'] as $item)
                {
                    $invoice[$item->user->name] = 0;
                    $getRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $invoice->id)
                    ->where('user_id', $item->user_id)
                    ->where('level', $item->level)
                    ->first();

                    if($getRevision)
                    {
                        if($getRevision->submit_at)
                        {
                            if($getRevision->submit_at < $getRevision->sla_at)
                            {
                                $invoice[$item->user->name] = 1;
                            } else {
                                $invoice[$item->user->name] = 2;
                            }
                        }
                    }

                    $invoice['total_sla'] += $invoice[$item->user->name];
                }

                return $invoice;
            });

            return $approver_invoice;
        });

        return Inertia::render('Admin/MonitoringSLA/Invoice/Index', [
            'data' => $data
        ]);

    }
}
