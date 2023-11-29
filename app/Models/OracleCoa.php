<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OracleCoa extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    protected $table = 'xsfl_ask_master_coa_dtl_v';
}
