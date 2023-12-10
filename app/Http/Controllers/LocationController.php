<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $data['locations'] = Location::orderBy('name')->get();
        return Inertia::render('Admin/Locations/Index', [
            'data' => $data,
        ]);
    }
}
