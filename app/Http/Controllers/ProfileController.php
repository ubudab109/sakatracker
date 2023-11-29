<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Vendor;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\VerificationEmailMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\OtpCode;
use Mail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
        $vendorData = $vendor;
        return Inertia::render('Profile/Edit', [
            'vendorData' => $vendorData,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        if(Auth::user()->email != $request->email)
        {
            $checkOtpCode = OtpCode::where('user_id', Auth::user()->id)->first();
            if($request->code == $checkOtpCode->code)
            {
                Auth::user()->update([
                    'name' => $request->name,
                    'email' => $request->email,
                ]);
                
                $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
                if($vendor)
                {
                    $vendor->update([
                        'email' => $request->email
                    ]);
                }
            } else {
                $request->validate([
                    'code' => [
                        'required',
                        function ($attribute, $value, $fail) {
                            $fail('OTP Kode tidak valid.');
                        },
                    ],
                ]);

                return Redirect::route('profile.edit');
            }
        } else {
            $request->user()->fill($request->validated());
            $request->user()->save();
        }

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }


        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function updateVendorPayment(Request $request)
    {
        $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();
        $inputArray = $request->all();
        foreach($inputArray as $input) {
            if ($input['payment_time'] == null || $input['payment_time'] == '') {
                continue;
            }
            Vendor::find($vendor->id)->update(['payment_time' => $input['payment_time']]);
        }
        return Redirect::back();
    }
}
