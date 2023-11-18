<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OraclePurchaseOrderDetail extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    // protected $table = 'notused_master_porder_line_v';

    protected $table = 'xsfl_po_lines_v';

    public function good_receipt() {
        // return $this->belongsTo('App\Models\OracleGoodReceipt', 'order_id', 'order_id');

        return $this->belongsTo('App\Models\OracleGoodReceipt', 'po_header_id', 'po_header_id');
    }

    public function purchase_order() {
        // return $this->belongsTo('App\Models\OracleGoodReceipt', 'order_id', 'order_id');

        return $this->belongsTo('App\Models\OraclePurchaseOrder', 'po_header_id', 'po_header_id');
    }
}
