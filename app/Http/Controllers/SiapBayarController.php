<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Models\BatchPaymentInvoice;
use App\Models\ApproverPayment;
use App\Models\UserRole;
use Auth;

class SiapBayarController extends Controller
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

        if(!in_array($role . '_pay_ready', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index(){
        $data['permissions'] = $this->checkPermission('index');
        $data['batch_payments'] = BatchPayment::with('batch_payment_invoices')->where('status', 'ready to paid')->orderBy('updated_at', 'DESC')->get()->map(function($batch_payment){
            $status = 'ready to paid';
            $checkUnpaidCount = $batch_payment->batch_payment_invoices->where('status', 'paid')->count();
            if($checkUnpaidCount == $batch_payment->batch_payment_invoices->count())
            {
                $status = 'paid';
            } else {
                if($checkUnpaidCount > 0)
                {
                    $status = 'Pembayaran Sebagian';
                }
            }
            $batch_payment['status'] = $status;
            return $batch_payment;
        });
        return Inertia::render('Admin/SiapBayar/Index', [
            'data' => $data
        ]);
    }

    public function showSiapBayar($id){
        $data['batch_payment'] = BatchPayment::find($id);

        $data['batch_payment_invoices'] = [];
        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $id)->get();

        foreach ($batch_payment_invoices as $invoice) {
            $exchange_invoice = ExchangeInvoice::find($invoice->exchange_invoice_id);
            array_push($data['batch_payment_invoices'], $exchange_invoice);
        }

        $data['user_role'] = UserRole::where('user_id', Auth::user()->id)->first();

        return Inertia::render('Admin/SiapBayar/Show', [
            'data' => $data
        ]);
    }

    public function paidSiapBayar($id){
        $batch_payment = BatchPayment::find($id);
        $batch_payment->update([
            'status' => 'paid'
        ]);

        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $batch_payment->id)->get();

        foreach ($batch_payment_invoices as $data) {
            $invoice = ExchangeInvoice::find($data->exchange_invoice_id);
            $invoice->update([
                'status' => 'paid'
            ]);
        }

        return redirect()->back();
    }

    public function paidInvoices(Request $request){
        $batch_payment = BatchPayment::find($request->batch_payment['id']);
        
        foreach ($request->invoices as $invoice_id) {
            $invoice = ExchangeInvoice::find($invoice_id);
            $invoice->update([
                'status' => 'paid'
            ]);

            $batch_payment_invoice = BatchPaymentInvoice::where([['batch_payment_id', $batch_payment->id], ['exchange_invoice_id', $invoice_id]])->first();
            $batch_payment_invoice->update([
                'status' => 'paid'
            ]);
        }

        $unpaid_invoices = BatchPaymentInvoice::where([['batch_payment_id', $batch_payment->id], ['status', 'unpaid']])->first();
        if ($unpaid_invoices == null) {
            $batch_payment->update([
                'status' => 'paid'
            ]);
        }

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil melakukan Batch Payment'
        ], 200);
    }

}
