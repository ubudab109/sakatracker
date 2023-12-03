<?php

namespace App\Console\Commands;

use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Services\PaymentGatewayService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class PaymentGatewayCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:payment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Running Payment Gateway Request according to date payment from batch payment';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Running scheduler');
        try {
            $batchPayments = BatchPayment::where('status', 'paid')
            ->where('payment_gateway_status', 'not_paid')
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
            $this->info('Request successfully made it');
        } catch (\Exception $err) {
            $this->error($err->getMessage());
        }
        $this->info('Done scheduler');
    }
}
