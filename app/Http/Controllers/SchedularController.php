<?php

namespace App\Http\Controllers;

use App\Mail\ApproverVendorMail;
use App\Mail\AuditVendorMail;
use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Models\Notification;
use App\Models\User;
use App\Models\Vendor;
use App\Services\PaymentGatewayService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SchedularController extends Controller
{
    public function cron()
    {
        $this->notificationExpiredDocument();
        $this->paymentGatewayRequest();
        $this->auditYearly();
        return response()->json(['success' => true, 'message' => 'Job Runned']);
    }
    
    public function notificationExpiredDocument()
    {
        $vendors = Vendor::all();
        
        foreach ($vendors as $vendor) {
            $notificationData = [
                'user_id' => $vendor->user_id,
                'vendor_id' => $vendor->id,
                'description' => 'Silahkan membuat pengajuan baru'
            ];
            // EXPIRED NPWP
            if ($this->isExpired($vendor->expired_npwp)) {
                $this->sendNotification(array_merge($notificationData, [
                    'title' => 'NPWP Expired',
                ]));
            }

            // EXPIRED SPPKP
            if ($this->isExpired($vendor->expired_sppkp)) {
                $this->sendNotification(array_merge($notificationData, [
                    'title' => 'SPPKP Expired',
                ]));
            }

            // EXPIRED SIUP
            if ($this->isExpired($vendor->expired_siup)) {
                $this->sendNotification(array_merge($notificationData, [
                    'title' => 'SIUP Expired',
                ]));
            }

            // EXPIRED TDP
            if ($this->isExpired($vendor->expired_tdp)) {
                $this->sendNotification(array_merge($notificationData, [
                    'title' => 'TDP Expired',
                ]));
            }

            // EXPIRED NIB
            if ($this->isExpired($vendor->expired_nib)) {
                $this->sendNotification(array_merge($notificationData, [
                    'title' => 'NIB Expired',
                ]));
            }

            // EXPIRED NIB
            if ($this->isExpired($vendor->expired_ektp)) {
                $this->sendNotification(array_merge($notificationData, [
                    'title' => 'E-KTP Expired',
                ]));
            }

            return [
                'success' => true,
                'message' => 'Success',
            ];
        }
    }

    public function paymentGatewayRequest()
    {
        try {
            $batchPayments = BatchPayment::where('status', 'paid')
            ->whereNotNull('payment_date')
            ->get();
            foreach ($batchPayments as $payment) {
                foreach ($payment->batch_payment_invoice()->get() as $invoice) {
                    $exchangeInvoice = ExchangeInvoice::find($invoice->exchange_invoice_id);
                    if ($exchangeInvoice) {
                        if ($payment->payment_date && $exchangeInvoice->vendor->payment_time) {
                            $paymentDate = $payment->payment_date;
                            $paymentTime = $exchangeInvoice->vendor->payment_time;
                            $currentDateTime = Carbon::now();
                            $paymentDateTime = Carbon::parse($paymentDate. ' '. $paymentTime);
                            if ($currentDateTime->greaterThanOrEqualTo($paymentDateTime)) {
                                PaymentGatewayService::MakeTransaction($payment);
                            }
                        }
                    }
                }
            }
            return [
                'success' => true,
                'message' => 'Success',
            ];
        } catch (\Exception $err) {
            Log::info($err->getMessage());
            return [
                'success' => false,
                'message' => $err->getMessage(),
            ];
        }
    }

    public function auditYearly()
    {
        $vendors = Vendor::all();
        foreach ($vendors as $vendor) {
            $lastUpdate = $vendor->updated_at;
            if ($this->isMoreThanOneYear($lastUpdate)) {
                $notificationData = [
                    'user_id' => $vendor->user_id,
                    'vendor_id' => $vendor->id,
                    'title' => 'Perubahan Data Telah Melebihi 1 Tahun',
                    'description' => 'Silahkan perbarui data anda'
                ];
                $user = User::find($vendor->user_id);
                $notifEmail['vendor'] = $vendor;
                $notifEmail['user'] = $user;
                Mail::to($vendor->email ?? $user->email)->send(new AuditVendorMail($notifEmail));
                $this->sendNotification($notificationData);
            }
        }
    }

    private function isMoreThanOneYear(string $date)
    {
        $dateData = Carbon::parse($date);
        $currentDate = Carbon::now();
        $yearDifference = $currentDate->diffInYears($dateData);
        return $yearDifference > 1;
    }
    private function isExpired(string $date = null): bool
    {
        if ($date) {
            $expirationDate = Carbon::parse($date);
            return $expirationDate->isPast();
        }
        return false;
    }

    private function sendNotification(array $data)
    {
        Notification::create([
            'user_id' => $data['user_id'],
            'title' => $data['title'],
            'description' => $data['description'],
            'url' => '/data-change/' . $data['vendor_id'],
        ]);
    }
}