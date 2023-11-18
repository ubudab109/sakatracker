<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OracleGoodReceipt extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    // protected $table = 'notused_ask_master_gr_v';

    protected $table = 'xsfl_gr_headers_v';

    public function good_receipt_detail() {
        // return $this->hasOne('App\Models\OracleGoodReceiptDetail', 'receipt_id', 'receipt_id');

        return $this->hasOne('App\Models\OracleGoodReceiptDetail', 'shipment_header_id', 'shipment_header_id');
    }
}
