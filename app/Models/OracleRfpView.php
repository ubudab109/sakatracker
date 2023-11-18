<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OracleRfpView extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    // protected $table = 'notused_ask_master_porder_v';
    protected $table = 'xsfl_ap_rfp_view';
}
