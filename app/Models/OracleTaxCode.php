<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OracleTaxCode extends Model
{
    use HasFactory;

    protected $connection = 'oracle';

    protected $table = 'xsfl_ask_master_tax';
}
