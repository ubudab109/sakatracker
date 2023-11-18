<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OracleOutstandingInvoice extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    // protected $table = 'notused_ask_master_porder_v';
    protected $table = 'xsfl_outstanding_invoices';

    public function rfp_views() {
        // return $this->hasOne('App\Models\OracleGoodReceiptDetail', 'receipt_id', 'receipt_id');

        return $this->hasMany('App\Models\OracleRfpView', 'invoice_batch_name', 'batch_name');
    }
}
