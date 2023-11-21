<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Notification;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = User::where('email', $request->email)->first();

        $request->validate([
            'email' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    if ($user == null) {
                        $fail('Email tidak ditemukan.');
                    } else {
                        if ($user->email_verified_at == null) {
                            $fail('Email belum terverifikasi.');
                        }
                    }
                },
            ],
        ]);

        $request->authenticate();

        $request->session()->regenerate();

        if($user->role == 'vendor')
        {
            $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
            if($vendor)
            {
                if($vendor->created_at->format('Y') != date('Y'))
                {
                    if($vendor->expired_npwp < date('Y-m-d'))
                    {
                        $this->notifExpired(Auth::user()->id, 'NPWP Expired', 'Silahkan Membuat pengajuan baru', '/vendor');
                    }
    
                    if($vendor->expired_sppkp < date('Y-m-d'))
                    {
                        $this->notifExpired(Auth::user()->id, 'SPPKP Expired', 'Silahkan Membuat pengajuan baru', '/vendor');
                    }
    
                    if($vendor->expired_siup < date('Y-m-d'))
                    {
                        $this->notifExpired(Auth::user()->id, 'SIUP Expired', 'Silahkan Membuat pengajuan baru', '/vendor');
                    }
    
                    if($vendor->expired_tdp < date('Y-m-d'))
                    {
                        $this->notifExpired(Auth::user()->id, 'TDP Expired', 'Silahkan Membuat pengajuan baru', '/vendor');
                    }
    
                    if($vendor->expired_nib < date('Y-m-d'))
                    {
                        $this->notifExpired(Auth::user()->id, 'NIB Expired', 'Silahkan Membuat pengajuan baru', '/vendor');
                    }
    
                    if($vendor->expired_ektp < date('Y-m-d'))
                    {
                        $this->notifExpired(Auth::user()->id, 'E-KTP Expired', 'Silahkan Membuat pengajuan baru', '/vendor');
                    }
                    return Redirect::route('vendor.report.index');
                } else {
                    return Redirect::route('dashboard');
                }
            } else {
                return Redirect::route('dashboard');    
            }
        } else {
            return Redirect::route('dashboard');
        }
    }

    public function notifExpired($user_id, $title, $desc, $url)
    {
        Notification::create([
            'user_id' => $user_id,
            'title' => $title,
            'description' => $desc,
            'url' => $url,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
