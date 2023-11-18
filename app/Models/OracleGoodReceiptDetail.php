<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OracleGoodReceiptDetail extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    // protected $table = 'notused_ask_master_gr_line_v';

    protected $table = 'xsfl_gr_lines_v';

    public function good_receipt() {
        return $this->belongsTo('App\Models\OracleGoodReceipt', 'shipment_header_id', 'shipment_header_id');
    }

    public function purchase_order_detail() {
        // return $this->belongsTo('App\Models\OraclePurchaseOrderDetail', 'orderline_id', 'orderline_id');

        return $this->belongsTo('App\Models\OraclePurchaseOrderDetail', 'po_line_id', 'po_line_id');
    }
}
