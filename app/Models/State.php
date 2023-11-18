<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $table = 'states';

    public function cities() {
        return $this->hasMany('App\Models\City', 'id', 'country_id');
    }
}
