<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function revision_register_vendor_latest() {
        return $this->hasOne('App\Models\RevisionRegisterVendor')->latest('created_at');
    }

    public function revision_register_vendors() {
        return $this->hasMany('App\Models\RevisionRegisterVendor');
    }

    public function coas() {
        return $this->hasMany('App\Models\CoaVendor', 'vendor_id', 'id');
    }
}
