<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchPayment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function batch_payment_invoices()
    {
        return $this->hasMany('App\Models\BatchPaymentInvoice');
    }
    public function batch_payment_invoice()
    {
        return $this->hasOne('App\Models\BatchPaymentInvoice');
    }
}
