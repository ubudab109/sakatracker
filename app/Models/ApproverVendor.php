<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApproverVendor extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function role() {
        return $this->belongsTo('App\Models\Role');
    }
}
