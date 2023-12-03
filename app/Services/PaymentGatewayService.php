<?php

namespace App\Services;

use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Models\PaymentGatewayHistory;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class PaymentGatewayService
{
    private $url, $email, $password, $key, $client, $webhook;

    public function __construct()
    {
        $this->url = config('payment.PAYMENT_GATEWAY_URL');
        $this->email = config('payment.PAYMENT_GATEWAY_EMAIL');
        $this->password = config('payment.PAYMENT_GATEWAY_PASSWORD');
        $this->key = config('payment.PAYMENT_GATEWAY_API_KEY');
        $this->webhook = config('payment.PAYMENT_GATEWAY_WEBHOOK_URL');
        $this->client = new Client();
    }

    private function login()
    {
        try {
            $response = $this->client->post($this->url . '/login', [
                'json' => [
                    'email' => $this->email,
                    'password' => $this->password,
                ]
            ]);
            $responseBody = $response->getBody()->getContents();
            $data = json_decode($responseBody, true);
            return [
                'success' => true,
                'message' => 'Logged In Successfully',
                'data' => $data,
            ];
        } catch (\Exception $err) {
            return [
                'success' => false,
                'message' => $err->getMessage(),
                'data' => null,
            ];
        }
    }

    private function storeLogRequest(BatchPayment $batchPayment, array $data)
    {
        PaymentGatewayHistory::create([
            'batch_payment_id' => $batchPayment->id,
            'exchange_invoice_id' => $data['exchange_invoices'],
            'is_success' => $data['is_success'],
            'message' => $data['message'] ?? '',
            'data' => $data['data'] ?? null,
        ]);
    }

    private function webHook(BatchPayment $batchPayment, $data)
    {
        $response = $this->client->post($this->webhook, [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'json' => $data
        ]);
        $status = $response->getStatusCode();
        /**
         * Currently we only check from status code for updating payment gateway status
         */
        if ($status >= 200) {
            $batchPayment->update(['payment_gateway_status' => 'paid']);
        }
    }

    public static function MakeTransaction(BatchPayment $batchPayment)
    {
        $instance = new self();
        $auth = $instance->login();
        try {
            if ($auth['success']) {
                $data = [
                    'transactionDate' => $batchPayment->payment_date,
                    'transactions' => [],
                ];
                $exchangeInvoices = [];
                foreach ($batchPayment->batch_payment_invoices()->get() as $bi) {
                    $invoice = ExchangeInvoice::find($bi->exchange_invoice_id);
                    if ($invoice) {
                        $data['transactions'][] = [
                            'txnReference' => $invoice->invoice_number,
                            'partnerReferenceNo' => $invoice->invoice_number,
                            'txnType' => 'Transfer',
                            'sourceBank' => $invoice->vendor->is_bca ? 'BCA' : 'MUFG',
                            'sourceAccountNo' => $invoice->vendor->bank_account_number,
                            'amount' => $invoice->total,
                            'currency' => 'IDR',
                            'recBank' => $invoice->vendor->bank_name,
                            'recBankCode' => $invoice->vendor->bank_swift_code ?? '',
                            'recAccNo' => $invoice->vendor->bank_account_number,
                            'recAccEmail' => $invoice->vendor->email,
                            'recCurrency' => 'IDR',
                            'recCustResidence' => '1',
                            'customerReference' => $invoice->po_number ?? $invoice->order_id,
                            'remark' => $invoice->note,
                        ];
                        $exchangeInvoices[] = $invoice->id;
                    }
                }
                $response = $instance->client->post($instance->url . '/transactions', [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $auth['token'],
                        'x-api-key' => $instance->key,
                    ],
                    'json' => $data,
                ]);
                $responseBody = $response->getBody()->getContents();
                $data = json_decode($responseBody, true);
                $logRequest = [
                    'exchange_invoices' => json_encode($exchangeInvoices),
                    'is_success' => true,
                    'message' => 'Transaction Successfully Saved',
                    'data' => json_encode($data),
                ];
                // STORING LOG REQUEST
                $instance->storeLogRequest($batchPayment, $logRequest);
                // SEND WEBHOOK
                $instance->webHook($batchPayment, $data);
                return [
                    'success' => true,
                    'message' => 'Transaction Successfully Saved',
                    'data' => $data,
                ];
            } else {
                $logRequest = [
                    'exchange_invoices' => null,
                    'is_success' => false,
                    'message' => $auth['message'],
                    'data' => false,
                ];
                // STORING LOG REQUEST
                $instance->storeLogRequest($batchPayment, $logRequest);
                return [
                    'success' => false,
                    'message' => $auth['message'],
                    'data' => null,
                ];
            }
        } catch (\Exception $err) {
            $logRequest = [
                'exchange_invoices' => null,
                'is_success' => false,
                'message' => $err->getMessage(),
                'data' => false,
            ];
            // STORING LOG REQUEST
            $instance->storeLogRequest($batchPayment, $logRequest);
            return [
                'success' => false,
                'message' => $err->getMessage(),
                'data' => null,
            ];
        }
    }
}
