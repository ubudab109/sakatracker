<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\OraclePurchaseOrder;
use App\Models\BatchPaymentInvoice;
use App\Models\ExchangeInvoice;
use App\Models\PurchaseOrder;
use App\Models\RevisionRegisterVendor;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;
use Carbon\Carbon;
use Auth;

class VendorReportController extends Controller
{
    public function index(Request $request)
    {
        $data['vendors'] = Vendor::where('user_id', Auth::user()->id)->get();
        $data['latest'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
        $data['month'] = $request->month ?? date('Y-m');
        $data['month_name'] = date('F', strtotime($data['month']));

        $data['card_outstanding'] = $this->cardOutstanding($data['month']);

        $data['chart_outstanding_percentage'] = $this->chartOutstandingPercentage($data['month']);
        $data['revision_vendor'] = $this->revisionVendor();

        $data['chart_overdue'] = $this->chartOverdue($data['month']);

        $data['chart_outstanding_processing'] = $this->chartOutstandingProcessing($data['month']);
        
        if($data['latest'])
        {
            return Inertia::render('Vendor/Report/Index', [
                'data' => $data
            ]);
        } else {
            return Inertia::render('Dashboard');
        }
    }

    public function showOutstandingPurchaseOrder(Request $request)
    {
        $month = $request->month ?? date('Y-m');
        $arrayPo = PurchaseOrder::whereHas('exchange_invoice', function($q) use($month){
            $q->whereDate('date', '>=', $month . '-01');
            $q->whereDate('date', '<=', $month . '-30');
            $q->where('status', 'unpaid');
            $q->whereHas('vendor.user', function($q1){
                $q1->where('user_id', Auth::user()->id);
            });
        })->pluck('order_id')->toArray();
		
		$vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
		if($vendor)
		{
			$data['purchase_orders'] = OraclePurchaseOrder::where('vendor_code', $vendor->id_manual)
			->whereDate('po_date', '>=', $month . '-01')
			->whereDate('po_date', '<=', $month . '-30')
			->whereNotIn('po_header_id', $arrayPo)
			->get();
		} else {
			$data['purchase_orders'] = [];
		}

        return Inertia::render('Vendor/OutstandingPurchaseOrder/Index', [
            'data' => $data
        ]);
    }

    private function revisionVendor()
    {
        $data['revisionApproved'] = RevisionRegisterVendor::where('user_id', Auth::user()->id)->where('status', 'disetujui')->count();
        $data['revisionRejected'] = RevisionRegisterVendor::where('user_id', Auth::user()->id)->where('status', 'ditolak')->count();
        $data['revisionProgress'] = RevisionRegisterVendor::where('user_id', Auth::user()->id)->where('status', 'menunggu persetujuan')->count();
        return $data;
    } 

    public function cardOutstanding($month)
    {
        $arrayPo = PurchaseOrder::whereHas('exchange_invoice', function($q) use($month){
            $q->whereDate('date', '>=', $month . '-01');
            $q->whereDate('date', '<=', $month . '-30');
            $q->where('status', 'unpaid');
            $q->whereHas('vendor.user', function($q1){
                $q1->where('user_id', Auth::user()->id);
            });
        })->pluck('order_id')->toArray();
		
		$vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
		// if($vendor)
		// {
		// 	$data['po_amount'] = OraclePurchaseOrder::
		// 	where('vendor_code', $vendor->id_manual)
		// 	->whereDate('po_date', '>=', $month . '-01')
		// 	->whereDate('po_date', '<=', $month . '-30')
		// 	->whereNotIn('po_header_id', $arrayPo)
		// 	->count();
		// } else {
		// 	$data['po_amount'] = 0;
		// }
        $data['po_amount'] = 0;
        // dd($data);

        $data['invoice_amount'] = ExchangeInvoice::whereDate('date', '>=', $month . '-01')
        ->whereDate('date', '<=', $month . '-30')
        ->where('status', 'unpaid')
        ->whereHas('vendor.user', function($q){
            $q->where('user_id', Auth::user()->id);
        })
        ->count();
		
		$data['invoice_total'] = 0;
        $invoices = ExchangeInvoice::whereDate('date', '>=', $month . '-01')
        ->whereDate('date', '<=', $month . '-30')
        ->whereHas('vendor.user', function($q){
            $q->where('user_id', Auth::user()->id);
        })
        ->where('status', 'unpaid')->get();
		
		foreach($invoices as $invoice)
		{
			$data['invoice_total'] += $invoice->total;
		}

        $data['formated_invoice_total'] = 'Rp. ' . number_format($data['invoice_total'], 0, ',', '.');

        return $data;
    }

    public function chartOutstandingPercentage($month)
    {
        $invoices = BatchPaymentInvoice::with('batch_payment', 'exchange_invoice')
        ->where('status', 'paid')
        ->whereHas('exchange_invoice', function($q) use($month){
            $q->whereDate('date', '>=', $month . '-01');
            $q->whereDate('date', '<=', $month . '-30');
            $q->whereHas('vendor.user', function($q1){
                $q1->where('user_id', Auth::user()->id);
            });
        })->get()
        ->map(function($invoice){
            $invoice['is_late'] = 0;
            $date_expired = Carbon::createFromFormat('Y-m-d', $invoice->batch_payment->jatuh_tempo)->format('Y-m-d');
            $date_batch_payment = Carbon::createFromFormat('Y-m-d H:i:s', $invoice->batch_payment->updated_at)->format('Y-m-d');

            if($date_expired < $date_batch_payment)
            {
                $invoice['is_late'] = 1;
            }

            return $invoice;
        });
        
        $data['on_time'] = 0;
        if($invoices->count() > 0)
        {
            $data['on_time'] = round($invoices->where('is_late', 0)->count()/$invoices->count() * 100, 0);
        }

        $data['late'] = 0;
        if($invoices->count() > 0)
        {
            $data['late'] = round($invoices->where('is_late', 1)->count()/$invoices->count() * 100, 0);
        }

        return $data;
    }

    public function chartOverdue($month)
    {
        $invoices = BatchPaymentInvoice::with('batch_payment', 'exchange_invoice')
        ->whereHas('batch_payment', function($q){
            $q->where('jatuh_tempo', '!=', null);
        })
        ->where('status', 'unpaid')
        ->whereHas('exchange_invoice', function($q) use($month){
            $q->whereDate('date', '>=', $month . '-01');
            $q->whereDate('date', '<=', $month . '-30');
            $q->where('status', 'unpaid');
            $q->whereHas('vendor.user', function($q1){
                $q1->where('user_id', Auth::user()->id);
            });
        })->get()
        ->map(function($invoice){
            $invoice['expired'] = Carbon::createFromFormat('Y-m-d', $invoice->batch_payment->jatuh_tempo)->format('Y-m-d');
            $invoice['batch_created'] = Carbon::createFromFormat('Y-m-d H:i:s', $invoice->batch_payment->created_at)->format('Y-m-d');

            return $invoice;
        });

        $data['overdue_0_30'] = 0;
        $data['overdue_30_60'] = 0;
        $now = Carbon::now();
        foreach($invoices as $invoice)
        {
            if($invoice->expired < date('Y-m-d'))
            {
                if(Carbon::parse(Carbon::now()->addHours('+7'))->diffInDays($invoice->expired) > 30)
                {
                    $data['overdue_30_60'] += 1;
                } else {
                    $data['overdue_0_30'] += 1;
                }
            }
        }

        return $data;
    }

    public function chartOutstandingProcessing($month)
    {
        // $invoices = ExchangeInvoice::whereDate('date', '>=', $month . '-01')
        // ->whereDate('date', '<=', $month . '-31')
        // ->whereIn('status', ['unpaid', 'paid', 'ditolak'])
        // ->get();

        $data['rejected'] = ExchangeInvoice::whereDate('date', '>=', $month . '-01')
        ->whereDate('date', '<=', $month . '-30')
        ->where('status', 'ditolak')
        ->whereHas('vendor.user', function($q){
            $q->where('user_id', Auth::user()->id);
        })
        ->count();

        // $data['rejected'] = 0;
        // if($invoices->count() > 0)
        // {
        //     $data['rejected'] = round($rejected/$invoices->count() * 100, 0);
        // }

        $data['progress'] = ExchangeInvoice::whereDate('date', '>=', $month . '-01')
        ->whereDate('date', '<=', $month . '-30')
        ->where('status', 'unpaid')
        ->whereHas('vendor.user', function($q){
            $q->where('user_id', Auth::user()->id);
        })
        ->count();

        // $data['progress'] = 0;
        // if($invoices->count() > 0)
        // {
        //     $data['progress'] = round($progress/$invoices->count() * 100, 0);
        // }

        $data['payment'] = ExchangeInvoice::whereDate('date', '>=', $month . '-01')
        ->whereDate('date', '<=', $month . '-30')
        ->where('status', 'paid')
        ->whereHas('vendor.user', function($q){
            $q->where('user_id', Auth::user()->id);
        })
        ->count();

        // $data['payment'] = 0;
        // if($invoices->count() > 0)
        // {
        //     $data['payment'] = round($payment/$invoices->count() * 100, 0);
        // }

        return $data;
    }
}



