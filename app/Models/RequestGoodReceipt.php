<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestGoodReceipt extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function vendor()
    {
        return $this->belongsTo('App\Models\Vendor', 'vendor_id', 'id');
    }

    public function request_good_receipt_attachments() {
        return $this->hasMany('App\Models\RequestGoodReceiptAttachment', 'request_g_r_id');
    }
}
