<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;

class CheckStatusAccountController extends Controller
{
    public function index() {
        return Inertia::render('Auth/CheckStatusAccount');
    }

    public function checkStatus(Request $request) {
        $request->validate([
            'npwp' => 'required|string|max:255',
            'name' => 'required|string|max:255',
        ]);

        $data = Vendor::where([['npwp', $request->npwp ?? ''], ['name', $request->name ?? '']])->first();

        if($data != null) {
            return Redirect::route('revision-account', ['npwp' => $request->npwp, 'name' => $request->name]);
        } else {
            return Inertia::render('Auth/CheckStatusAccount', [
                'message' => 'Akun tidak ditemukan, silahkan mendaftar terlebih dahulu.'
            ]);
        }

    }

    public function revisionAccount(Request $request) {
        $data = Vendor::where([['npwp', $request->npwp ?? ''], ['name', $request->name ?? '']])->first();

        return Inertia::render('Auth/RevisionAccount', [
            'data' => $data,
        ]);
    }
}
