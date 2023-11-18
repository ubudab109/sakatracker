<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApproverInvoice extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function approver_invoice_items() {
        return $this->hasMany('App\Models\ApproverInvoiceItem');
    }
}
