<?php

namespace App\Http\Controllers;

use App\Mail\ApproverInvoiceMail;
use App\Models\Notification;
use App\Jobs\PaymentRequestJob;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Models\BatchPaymentInvoice;
use App\Models\ApproverPayment;
use App\Models\UserRole;
use App\Models\RevisionExchangeInvoice;
use App\Models\Vendor;
use App\Services\PaymentGatewayService;
use Carbon\Carbon;
use Auth;
use Mail;

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
        $data['batch_payments'] = BatchPayment::with('batch_payment_invoices')
        ->where('status', 'ready to paid')
        ->orWhere('status', 'paid')
        ->orderBy('updated_at', 'DESC')->get()->map(function($batch_payment){
            $status = 'ready to paid';
            $checkUnpaidCount = $batch_payment->batch_payment_invoices->where('status', 'paid')->count();
            if($checkUnpaidCount == $batch_payment->batch_payment_invoices->count())
            {
                $status = 'paid';
            } else {
                if($checkUnpaidCount > 0)
                {
                    $status = 'Partial Payment';
                }
            }
            $batch_payment['status'] = $status;

            $checkBatchPaymentInvoices = BatchPaymentInvoice::where('batch_payment_id', $batch_payment->id)->get();
            $batch_payment['jatuh_tempo'] = '-';
            foreach($checkBatchPaymentInvoices as $checkBatchPaymentInvoice)
            {
                $exchangeInvoice = ExchangeInvoice::where('id', $checkBatchPaymentInvoice->exchange_invoice_id)->first();
                $revisionExchangeInvoice = RevisionExchangeInvoice::where('exchange_invoice_id', $checkBatchPaymentInvoice->exchange_invoice_id)->where('approval_permission', 'is_pic_exchange_invoice')->first();
                if($revisionExchangeInvoice)
                {
                    $vendor = Vendor::where('id', $exchangeInvoice->vendor_id)->first();
                    if($revisionExchangeInvoice->submit_at)
                    {
                        $dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchangeInvoice->submit_at);
                        $daysToAdd = $vendor->top ?? 0;
                        $jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
                        if($batch_payment['jatuh_tempo'] == '-' || $batch_payment['jatuh_tempo'] < $jatuhTempo)
                        {
                            $batch_payment['periode'] = date('M-Y', strtotime($jatuhTempo));
                            $batch_payment['jatuh_tempo'] = date('d-M-Y', strtotime($jatuhTempo));						
                        }
                    } else {
                        $dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchangeInvoice->updated_at);
                        $daysToAdd = $vendor->top ?? 0;
                        $jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
                        if($batch_payment['jatuh_tempo'] == '-' || $batch_payment['jatuh_tempo'] < $jatuhTempo)
                        {
                            $batch_payment['periode'] = date('M-Y', strtotime($jatuhTempo));
                            $batch_payment['jatuh_tempo'] = date('d-M-Y', strtotime($jatuhTempo));						
                        }
                    }
                } else {
                    $batch_payment['periode'] = 'MT';
                    $batch_payment['jatuh_tempo'] = 'MT';			
                }
            }
            
            return $batch_payment;
        });
        return Inertia::render('Admin/SiapBayar/Index', [
            'data' => $data
        ]);
    }

    public function showSiapBayar($id){
        $data['batch_payment'] = BatchPayment::find($id);
        $checkUnpaidCount = $data['batch_payment']->batch_payment_invoices->where('status', 'paid')->count();
		if($checkUnpaidCount == $data['batch_payment']->batch_payment_invoices->count())
		{
			$data['batch_payment']['status'] = 'paid';
		} else {
			if($checkUnpaidCount > 0)
			{
				$data['batch_payment']['status'] = 'Partial Payment';
			}
		}

        if($data['batch_payment']->batch_payment_invoice)
        {
            $batch = $data['batch_payment']->id;
            $checkBatchPaymentInvoices = BatchPaymentInvoice::where('batch_payment_id', $batch)->get();
            $data['batch_payment']['jatuh_tempo'] = '-';
            foreach($checkBatchPaymentInvoices as $checkBatchPaymentInvoice)
            {
                $exchangeInvoice = ExchangeInvoice::where('id', $checkBatchPaymentInvoice->exchange_invoice_id)->first();
                $revisionExchangeInvoice = RevisionExchangeInvoice::where('exchange_invoice_id', $checkBatchPaymentInvoice->exchange_invoice_id)->where('approval_permission', 'is_pic_exchange_invoice')->first();
                if($revisionExchangeInvoice)
                {
                    $vendor = Vendor::where('id', $exchangeInvoice->vendor_id)->first();
                    if($revisionExchangeInvoice->submit_at)
                    {
                        $dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchangeInvoice->submit_at);
                        $daysToAdd = $vendor->top ?? 0;
                        $jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
                        if($data['batch_payment']['jatuh_tempo'] == '-' || $data['batch_payment']['jatuh_tempo'] < $jatuhTempo)
                        {
                            $data['batch_payment']['jatuh_tempo'] = date('d-M-Y', strtotime($jatuhTempo));						
                        }
                    } else {
                        $dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchangeInvoice->updated_at);
                        $daysToAdd = $vendor->top ?? 0;
                        $jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
                        if($data['batch_payment']['jatuh_tempo'] == '-' || $data['batch_payment']['jatuh_tempo'] < $jatuhTempo)
                        {
                            $data['batch_payment']['jatuh_tempo'] = date('d-M-Y', strtotime($jatuhTempo));						
                        }
                    }
                } else {
                    $data['batch_payment']['jatuh_tempo'] = 'MT';			
                }
            }
        } else {
            $data['batch_payment']['jatuh_tempo'] = 'MT';
        }

        $data['batch_payment_invoices'] = [];
        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $id)->get()
        ->map(function($batch_payment){
            $batch_payment['jatuh_tempo'] = '-';
            $exchangeInvoice = ExchangeInvoice::where('id', $batch_payment->exchange_invoice_id)->first();
            $revisionExchangeInvoice = RevisionExchangeInvoice::where('exchange_invoice_id', $batch_payment->exchange_invoice_id)->where('approval_permission', 'is_pic_exchange_invoice')->first();
            if($revisionExchangeInvoice)
            {
                $vendor = Vendor::where('id', $exchangeInvoice->vendor_id)->first();
                if($revisionExchangeInvoice->submit_at)
                {
                    $dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchangeInvoice->submit_at);
                    $daysToAdd = $vendor->top ?? 0;
                    $jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
                    if($batch_payment['jatuh_tempo'] == '-' || $batch_payment['jatuh_tempo'] < $jatuhTempo)
                    {
                        $batch_payment['jatuh_tempo'] = date('d-M-Y', strtotime($jatuhTempo));						
                    }
                } else {
                    $dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchangeInvoice->updated_at);
                    $daysToAdd = $vendor->top ?? 0;
                    $jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
                    if($batch_payment['jatuh_tempo'] == '-' || $batch_payment['jatuh_tempo'] < $jatuhTempo)
                    {
                        $batch_payment['jatuh_tempo'] = date('d-M-Y', strtotime($jatuhTempo));						
                    }
                }
            } else {
                $batch_payment['jatuh_tempo'] = 'MT';			
            }

            return $batch_payment;
        });

        foreach ($batch_payment_invoices as $invoice) {
            $exchange_invoice = ExchangeInvoice::find($invoice->exchange_invoice_id);
            $exchange_invoice['jatuh_tempo'] = $invoice->jatuh_tempo;
            array_push($data['batch_payment_invoices'], $exchange_invoice);
        }

        $data['user_role'] = UserRole::where('user_id', Auth::user()->id)->first();

        return Inertia::render('Admin/SiapBayar/Show', [
            'data' => $data
        ]);
    }

    public function paidSiapBayar($id){
        $request->validate([
            'payment_date' => 'required',
        ]);

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

            $notif = Notification::create([
                'user_id' => $invoice->vendor->user_id,
                'title' => 'E-Faktur telah dibayar',
                'description' => 'Silahkan login untuk mengecek data',
                'url' => '/exchange-invoice/' . $invoice_id,
            ]);
    
            $notifMail['title'] = $notif->title;
            $notifMail['description'] = $notif->description;
            $notifMail['url'] = $notif->url;
            Mail::to($invoice->vendor->user->email)->send(new ApproverInvoiceMail($notifMail));
        }

        if (date('Y-m-d', strtotime($request->payment_date)) == date('Y-m-d', strtotime(now()))) {
            PaymentGatewayService::MakeTransaction($batch_payment);
        }

        $unpaid_invoices = BatchPaymentInvoice::where([['batch_payment_id', $batch_payment->id], ['status', 'unpaid']])->first();
        if ($unpaid_invoices == null) {
            $batch_payment->update([
                'status' => 'paid',
                'payment_date' => $request->payment_date,
            ]);
        }
        if (date('Y-m-d', strtotime($request->payment_date)) == date('Y-m-d', strtotime(now()))) {
            PaymentRequestJob::dispatch($batch_payment);
        }

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil melakukan Batch Payment'
        ], 200);
    }

}
