<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExchangeInvoice extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function vendor() {
        return $this->belongsTo('App\Models\Vendor');
    }

    public function revision_exchange_invoices() {
        return $this->hasMany('App\Models\RevisionExchangeInvoice');
    }

    public function exchange_invoice_attachments() {
        return $this->hasMany('App\Models\ExchangeInvoiceAttachment');
    }

    public function purchase_orders() {
        return $this->hasMany('App\Models\PurchaseOrder');
    }

    public function batch_payment_invoice() {
        return $this->hasOne('App\Models\BatchPaymentInvoice');
    }
}
