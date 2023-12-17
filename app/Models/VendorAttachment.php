<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorAttachment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function revisionVendors()
    {
        return $this->belongsTo('App\Models\Vendor', 'id', 'vendor_id');
    }
}
