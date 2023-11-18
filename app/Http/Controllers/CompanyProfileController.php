<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;
use Auth;

class CompanyProfileController extends Controller
{
    public function index()
    {
        $data['auth'] = Auth::user();
        $data['vendor'] = Vendor::where('user_id', $data['auth']->id)->where('status_account', 'disetujui')->latest('created_at')->first();

        if(!$data['vendor'])
        {
            return Redirect::route('vendor.index');
        }

        return Inertia::render('Vendor/CompanyProfile/Index', [
            'data' => $data
        ]);
    }
}
