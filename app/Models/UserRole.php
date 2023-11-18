<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function role() {
        return $this->belongsTo('App\Models\Role');
    }

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
