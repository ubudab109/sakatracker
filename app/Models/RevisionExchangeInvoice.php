<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevisionExchangeInvoice extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function exchange_invoice() {
        return $this->belongsTo('App\Models\ExchangeInvoice');
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function revision_exchange_invoice_attachments() {
        return $this->hasMany('App\Models\RevisionExchangeInvoiceAttachment', 'r_e_invoice_id');
    }
}
