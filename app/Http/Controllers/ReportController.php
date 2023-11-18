<?php

namespace App\Http\Controllers;

use App\Models\ExchangeInvoice;
use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use Auth;

class ReportController extends Controller
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

        if(!in_array($role . '_report', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index(Request $request) 
    {
        $this->checkPermission('index');

        $data['start_date'] = $request->start_date;
        $data['end_date'] = $request->end_date;

        $data['count_invoice'] = $this->getInvoiceUnpaidCount($data['start_date'], $data['end_date']) + $this->getInvoicePaidCount($data['start_date'], $data['end_date']);

        $data['count_invoice_unpaid'] = $this->getInvoiceUnpaidCount($data['start_date'], $data['end_date']);

        $data['count_invoice_paid'] = $this->getInvoicePaidCount($data['start_date'], $data['end_date']);

        $totalPriceInvoice = $this->getTotalPriceInvoiceUnpaid($data['start_date'], $data['end_date']) + $this->getTotalPriceInvoicePaid($data['start_date'], $data['end_date']);
        $data['total_price_invoice'] = number_format($totalPriceInvoice, 0, ',', '.');

        $totalPriceInvoiceUnpaid = $this->getTotalPriceInvoiceUnpaid($data['start_date'], $data['end_date']);
        $data['total_price_invoice_unpaid'] = number_format($totalPriceInvoiceUnpaid, 0, ',', '.');

        $totalPriceInvoicePaid = $this->getTotalPriceInvoicePaid($data['start_date'], $data['end_date']);
        $data['total_price_invoice_paid'] = number_format($totalPriceInvoicePaid, 0, ',', '.');

        $data['count_vendor'] = $this->getVendorCount($data['start_date'], $data['end_date']);

        $data['count_vendor_waiting'] = $this->getVendorWaitingCount($data['start_date'], $data['end_date']);

        $start_date = Carbon::parse($data['start_date']);
        $end_date = Carbon::parse($data['end_date'])->addDays(1);
        $periodDates = new DatePeriod(
            $start_date,
            new DateInterval('P1D'),
            $end_date
        );
        
        $datesArray = [];
        $invoicePriceArray = [];
        foreach ($periodDates as $date) {
			$totalUnpaid = 0;
			$totalPaid = 0;
            $unpaidInvoice = ExchangeInvoice::whereDate('date', $date->format('Y-m-d'))->where('status', 'unpaid')->get();
			foreach($unpaidInvoice as $unpaid)
			{
				$totalUnpaid += $unpaid->total;
			}
            $paidInvoice = ExchangeInvoice::whereDate('date', $date->format('Y-m-d'))->where('status', 'paid')->get();
			foreach($paidInvoice as $paid)
			{
				$totalPaid += $paid->total;
			}
            $datesArray[] = $date->format('Y-m-d');
            $invoicePriceArray[] = $totalUnpaid + $totalPaid;
        }
        
        $data['period_dates'] = $datesArray;
        $data['invoice_period_dates'] = $invoicePriceArray;

        return Inertia::render('Admin/Report/Index', [
            'data' => $data
        ]);

    }

    // protected function getInvoiceCount($startDate, $endDate)
    // {
    //     return ExchangeInvoice::whereBetween('date', [$startDate, $endDate])->count();
    // }

    protected function getInvoiceUnpaidCount($startDate, $endDate)
    {
        return ExchangeInvoice::whereBetween('date', [$startDate, $endDate])->where('status', 'unpaid')->count();
    }

    protected function getInvoicePaidCount($startDate, $endDate)
    {
        return ExchangeInvoice::whereBetween('date', [$startDate, $endDate])->where('status', 'paid')->count();
    }

    // protected function getTotalPriceInvoice($startDate, $endDate)
    // {
    //     return ExchangeInvoice::whereBetween('date', [$startDate, $endDate])->sum('total');
    // }

    protected function getTotalPriceInvoiceUnpaid($startDate, $endDate)
    {
		$total = 0;
		$datas = ExchangeInvoice::whereBetween('date', [$startDate, $endDate])->where('status', 'unpaid')->get();
		foreach($datas as $data)
		{
			$total += $data->total;
		}
        return $total;
    }

    protected function getTotalPriceInvoicePaid($startDate, $endDate)
    {
		$total = 0;
		$datas = ExchangeInvoice::whereBetween('date', [$startDate, $endDate])->where('status', 'paid')->get();
		foreach($datas as $data)
		{
			$total += $data->total;
		}
        return $total;
    }

    protected function getVendorCount($startDate, $endDate)
    {
        return User::with(['vendor_latest' => function ($q) {
            $q->where('status_account', 'disetujui');
        }])
        ->whereHas('vendor_latest', function ($q) {
            $q->where('status_account', 'disetujui');
        })
        ->whereBetween('updated_at', [$startDate, $endDate])
        ->where('role', 'vendor')->count();
    }

    protected function getVendorWaitingCount($startDate, $endDate)
    {
        return Vendor::where('status_account', 'pengajuan perubahan')
        ->whereBetween('updated_at', [$startDate, $endDate])
        ->count();
    }
}
