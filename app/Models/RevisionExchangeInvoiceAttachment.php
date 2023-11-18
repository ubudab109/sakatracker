<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevisionExchangeInvoiceAttachment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function revision_exchange_invoice() {
        return $this->belongsTo('App\Models\RevisionExchangeInvoice', 'r_e_invoice_id');
    }
}
