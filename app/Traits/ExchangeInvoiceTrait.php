<?php

namespace App\Traits;

use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Models\Vendor;

trait ExchangeInvoiceTrait
{
    /**
     * The function `formatInvoiceNumber` generates a formatted invoice number based on the vendor's
     * name, the current month and year, and a running number.
     * 
     * @param Vendor $vendor The vendor parameter is an instance of the Vendor class.
     * 
     * @return string.
     */
    public static function formatInvoiceNumber(Vendor $vendor)
    {
        $month = date('n');
        $monthNumber = [
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X',
            11 => 'XI',
            12 => 'XII'
        ];
        $formatMonth = $monthNumber[$month];
        $year = date('y');
        $latestExchangeInvoice = ExchangeInvoice::latest()->first();
        $runningNumber = ($latestExchangeInvoice) ? $latestExchangeInvoice->id + 1 : 1;
        $formattedRunningNumber = sprintf('%06d', $runningNumber);
        $format = $vendor->id_manual . '/' . $formatMonth . '/' . $year . '/' . $formattedRunningNumber;
        return $format;
    }

    public static function formatBatchInvoiceNumber(Vendor $vendor = null)
    {
        $month = date('n');
        $monthNumber = [
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X',
            11 => 'XI',
            12 => 'XII'
        ];
        $formatMonth = $monthNumber[$month];
        $year = date('y');
        $latestBatchPayments = BatchPayment::latest()->first();
        $runningNumber = ($latestBatchPayments) ? $latestBatchPayments->id + 1 : 1;
        $formattedRunningNumber = sprintf('%06d', $runningNumber);
        if ($vendor) {
            $firstFormatBank = $vendor->is_bca == 1 ? 'BCA' : 'MUFG';
        } else {
            $firstFormatBank = 'MUFG';
        }
        $format = $firstFormatBank . '/' . $formatMonth . '/' . $year . '/' . $formattedRunningNumber;
        return $format;
    }
}
