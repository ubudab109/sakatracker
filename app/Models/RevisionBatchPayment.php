<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevisionBatchPayment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function batch_payment() {
        return $this->belongsTo('App\Models\BatchPayment', 'batch_payment_id');
    }
}
