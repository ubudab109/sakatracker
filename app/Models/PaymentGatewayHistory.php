<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentGatewayHistory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function batch_payments()
    {
        return $this->hasMany('App\Models\BatchPayment');
    }
}
