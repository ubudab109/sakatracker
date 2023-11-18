<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchPaymentInvoice extends Model
{
    use HasFactory;
    
    protected $guarded = ['id'];

    public function batch_payment() {
        return $this->belongsTo('App\Models\BatchPayment');
    }

    public function exchange_invoice() {
        return $this->belongsTo('App\Models\ExchangeInvoice');
    }
}
