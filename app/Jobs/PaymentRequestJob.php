<?php

namespace App\Jobs;

use App\Models\BatchPayment;
use App\Services\PaymentGatewayService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PaymentRequestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $batchPayment;

    /**
     * Create a new job instance.
     */
    public function __construct(BatchPayment $batchPayment)
    {
        $this->batchPayment = $batchPayment;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            PaymentGatewayService::MakeTransaction($this->batchPayment);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
        }
    }
}
