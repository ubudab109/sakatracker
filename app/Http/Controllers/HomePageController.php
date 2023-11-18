<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index() {
        $data = [
            'title' => 'Home',
            'description' => 'Ini home page'
        ];
        
        return Inertia::render('HomePage', $data);
    }
}
