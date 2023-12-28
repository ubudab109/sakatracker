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

class AdminDashboardReportController extends Controller
{
    public function index(Request $request)
    {
        $data['month'] = $request->month ?? date('Y-m');
        $data['month_name'] = date('F', strtotime($data['month']));

        $data['card_outstanding'] = $this->cardOutstanding($data['month']);

        $data['chart_outstanding_percentage'] = $this->chartOutstandingPercentage($data['month']);

        $data['chart_overdue'] = $this->chartOverdue($data['month']);

        $data['chart_outstanding_processing'] = $this->chartOutstandingProcessing($data['month']);
        
        return Inertia::render('Admin/DashboardReport/Index', [
            'data' => $data
        ]);
    }

    public function cardOutstanding($month)
    {
        $arrayPo = PurchaseOrder::whereHas('exchange_invoice', function($q) use($month){
            // $q->whereDate('date', '>=', $month . '-01');
            // $q->whereDate('date', '<=', $month . '-30');
            // $q->where('status', 'unpaid');

            [$year, $month] = explode('-', $month);

            $q->whereYear('date', $year);
            $q->whereMonth('date', $month);
            $q->where('status', 'unpaid');
        })->pluck('order_id')->toArray();

        $data['po_amount'] = 0;
        // dd($data);

        [$year, $month] = explode('-', $month);

        $data['invoice_amount'] = ExchangeInvoice::whereYear('date', $year)->whereMonth('date', $month)
        ->where('status', 'unpaid')
        ->count();
		
		$data['invoice_total'] = 0;
        $invoices = ExchangeInvoice::whereYear('date', $year)->whereMonth('date', $month)
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
            [$year, $month] = explode('-', $month);

            $q->whereYear('date', $year);
            $q->whereMonth('date', $month);
        })->get()
        ->map(function($invoice){
            $invoice['is_late'] = 0;
            if ($invoice->batch_payment->jatuh_tempo) {
                $date_expired = Carbon::createFromFormat('Y-m-d', $invoice->batch_payment->jatuh_tempo)->format('Y-m-d');
            } else {
                $date_expired = null;
            }
            $date_batch_payment = Carbon::createFromFormat('Y-m-d H:i:s', $invoice->batch_payment->updated_at)->format('Y-m-d');

            if(!is_null($date_expired) && $date_expired < $date_batch_payment) {
                $invoice['is_late'] = 1;
            } else {
                $invoice['is_late'] = 0;
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
            [$year, $month] = explode('-', $month);

            $q->whereYear('date', $year);
            $q->whereMonth('date', $month);
            $q->where('status', 'unpaid');
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
        [$year, $month] = explode('-', $month);

        $data['rejected'] = ExchangeInvoice::whereYear('date', $year)->whereMonth('date', $month)
        ->where('status', 'ditolak')
        ->count();

        $data['progress'] = ExchangeInvoice::whereYear('date', $year)->whereMonth('date', $month)
        ->where('status', 'unpaid')
        ->count();

        $data['payment'] = ExchangeInvoice::whereYear('date', $year)->whereMonth('date', $month)
        ->where('status', 'paid')
        ->count();

        return $data;
    }
}
