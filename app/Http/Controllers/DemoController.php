<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DemoController extends Controller
{
    public function index()
    {
        return Inertia::render('Vendor/ExchangeInvoice/Index');
    }


    public function create()
    {
        return Inertia::render('Vendor/ExchangeInvoice/Create');
    }

    public function show()
    {
        return Inertia::render('Vendor/ExchangeInvoice/Show');
    }

    public function edit()
    {
        return Inertia::render('Vendor/ExchangeInvoice/Edit');
    }
}
