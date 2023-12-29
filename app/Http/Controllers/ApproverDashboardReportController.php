<?php

namespace App\Http\Controllers;

use App\Models\BatchPayment;
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

class ApproverDashboardReportController extends Controller
{
    public function index(Request $request)
    {
        $data['month'] = $request->month ?? date('Y-m');
        $data['month_name'] = date('F', strtotime($data['month']));
        $data['card_new_invoice'] = $this->cardInvoice('new', $data['month']);
        $data['card_pending_invoice'] = $this->cardInvoice('pending', $data['month']);
        $data['card_bp_new'] = $this->cardBatchPayments('new', $data['month']);
        $data['card_bp_pending'] = $this->cardBatchPayments('pending', $data['month']);
        $data['card_bp_rejected'] = $this->cardBatchPayments('rejected', $data['month']);
        $data['chart_outstanding_percentage'] = $this->chartOutstandingPercentage($data['month']);
        return Inertia::render('Admin/ApproverDashboardReport/Index', [
            'data' => $data
        ]);
    }

    private function cardBatchPayments(string $type, $month)
    {
        $startOfMonth = Carbon::parse($month . '-01');
        $endOfMonth = $startOfMonth->copy()->endOfMonth();
        if ($type == 'new') {
            $batchPayment = BatchPaymentInvoice::whereHas('exchange_invoice', function($q) use($startOfMonth, $endOfMonth){
                $q->whereDate('date', '>=', $startOfMonth);
                $q->whereDate('date', '<=', $endOfMonth);
                $q->where('status', 'sedang berlangsung')
                ->orderBy('created_at', 'desc');
            })->count();
        } else if ($type == 'pending') {
            $batchPayment = BatchPaymentInvoice::whereHas('exchange_invoice', function($q) use($startOfMonth, $endOfMonth){
                $q->whereDate('date', '>=', $startOfMonth);
                $q->whereDate('date', '<=', $endOfMonth);
                $q->where('status', 'menunggu persetujuan');
            })->count();
        } else if ($type == 'rejected') {
            $batchPayment = BatchPaymentInvoice::whereHas('exchange_invoice', function($q) use($startOfMonth, $endOfMonth){
                $q->whereDate('date', '>=', $startOfMonth);
                $q->whereDate('date', '<=', $endOfMonth);
                $q->where('status', 'ditolak');
            })->count();
        } else {
            $batchPayment = null;
        }
        return $batchPayment;
    }
    private function cardInvoice(string $type, $month)
    {
        $startOfMonth = Carbon::parse($month . '-01');
        $endOfMonth = $startOfMonth->copy()->endOfMonth();
        if ($type == 'new') {
            $invoices = ExchangeInvoice::where('status', 'sedang berlangsung')
            ->orderBy('created_at', 'desc')
            ->whereDate('date', '>=', $startOfMonth)
            ->whereDate('date', '<=', $endOfMonth)
            ->count();
        } else if ($type == 'pending') {
            $invoices = ExchangeInvoice::where('status', 'menunggu persetujuan')
            ->whereDate('date', '>=', $startOfMonth)
            ->whereDate('date', '<=', $endOfMonth)
            ->count();
        } else {
            return null;
        }

        return $invoices;
    }

    public function chartOutstandingPercentage($month)
    {
        $startOfMonth = Carbon::parse($month . '-01');
        $endOfMonth = $startOfMonth->copy()->endOfMonth();
        $invoices = BatchPaymentInvoice::with('batch_payment', 'exchange_invoice')
        ->where('status', 'paid')
        ->whereHas('exchange_invoice', function($q) use($startOfMonth, $endOfMonth){
            $q->whereDate('date', '>=', $startOfMonth);
            $q->whereDate('date', '<=', $endOfMonth);
        })->get()
        ->map(function($invoice){
            $invoice['is_late'] = 0;
            if ($invoice->batch_payment->jatuh_tempo) {
                $date_expired = Carbon::createFromFormat('Y-m-d', $invoice->batch_payment->jatuh_tempo)->format('Y-m-d');
                $date_batch_payment = Carbon::createFromFormat('Y-m-d H:i:s', $invoice->batch_payment->updated_at)->format('Y-m-d');
    
                if($date_expired < $date_batch_payment)
                {
                    $invoice['is_late'] = 1;
                }
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

}
