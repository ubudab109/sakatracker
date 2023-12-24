<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Providers\RouteServiceProvider;
use App\Mail\VerificationEmailMail;
use Illuminate\Http\Request;
use App\Models\OtpCode;
use App\Models\User;
use Inertia\Inertia;
use Auth;
use Mail;

class OtpCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('email') && $request->email != '') {
            $user = User::where('email', $request->email)->first() ?? null;
            if ($user && $request->has('code') && $request->code != '') {
                $otp = OtpCode::where('user_id', $user->id)->first();
            } else {
                $otp = null;
            }
        } else {
            $user = User::where('id', $request->user)->first() ?? '';
            $otp = null;
        }
        return Inertia::render('Auth/VerificationEmail', [
            'user' => $user,
            'otp_code' => $otp->code ?? '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->isMethod('post')) {
            $data['user'] = User::where('email', $request->email)->first();
            $request->validate([
                'email' => [
                    'required',
                    function ($attribute, $value, $fail) use($data) {
                        if (!$data['user']) {
                            $fail('Email tidak ditemukan.');
                        }
                    },
                ],
                'otp_code' => [
                    'required',
                    function ($attribute, $value, $fail) use($data) {
                        if($data['user'] != null)
                        {
                            $exists = OtpCode::where('code', $value)->where('user_id', $data['user']->id)->first();
                        } else {
                            $exists = null;
                        }
    
                        if ($exists == null) {
                            $fail('Kode OTP tidak valid.');
                        }
                    },
                ],
            ]);
            User::where('email', $request->email)->update([
                'email_verified_at' => date('Y-m-d H:i:s')
            ]);
    
            $checkOtpCode = OtpCode::where('user_id', $data['user']->id)->first();
        } else if ($request->isMethod('get')) {
            $data['user'] = User::where('email', $request->get('email'))->first();
            if ($data['user']) {
                $checkOtpCode = OtpCode::where('code', $request->get('code'))->where('user_id', $data['user']->id)->first();
            } else {
                $checkOtpCode = null;
            }
        }

        if($checkOtpCode != null)
        {
            $checkOtpCode->delete();
        }

        if (Auth::check()) {
            Auth::login($data['user']);
        }


        return redirect(RouteServiceProvider::HOME);
    }

    public function resendOtp(Request $request) {
        $data['user'] = User::where('email', $request->email)->first();

        if($data['user'] != null)
        {
            $request->validate([
                'email' => [
                    'required',
                    function ($attribute, $value, $fail) use($data) {
                        if (!$data['user']) {
                            $fail('Email tidak ditemukan.');
                        } else {
                            if($data['user']->email_verified_at != null) {
                                $fail('Email telah terverifikasi, silahkan login.');
                            }
                        }
                    },
                ],
            ]);

            $checkOtpCode = OtpCode::where('user_id', $data['user']->id)->first();
            if($checkOtpCode != null)
            {
                $checkOtpCode->delete();
            }
            
            try {
                $randomInt = random_int(100000, 999999);
                OtpCode::create([
                    'user_id' => $data['user']->id,
                    'code' => $randomInt
                ]);

                $data['otp_code'] = $randomInt;
                
                $mail = Mail::to($data['user']->email)->send(new VerificationEmailMail($data));

                return Redirect::route('verification-email', [
                    'status' => 200,
                    'user' => $data['user']
                ]);
            } catch (\Exception $e) {
                return Redirect::route('verification-email', [
                    'status' => 404,
                    'user' => $data['user']
                ]);
            }
        } else if(Auth::user()) {
            $data['user'] = User::where('id', Auth::user()->id)->first();

            $checkOtpCode = OtpCode::where('user_id', $data['user']->id)->first();
            if($checkOtpCode != null)
            {
                $checkOtpCode->delete();
            }
            
            try {
                $randomInt = random_int(100000, 999999);
                OtpCode::create([
                    'user_id' => $data['user']->id,
                    'code' => $randomInt
                ]);

                $data['otp_code'] = $randomInt;

                $email = $request->email ?? $data['user']->email;
                $mail = Mail::to($email)->send(new VerificationEmailMail($data));
                
                $mail = Mail::to($data['user']->email)->send(new VerificationEmailMail($data));

                return Redirect::route('profile.edit', [
                    'status' => 200,
                    'user' => $data['user']
                ]);
            } catch (\Exception $e) {
                return Redirect::route('profile.edit', [
                    'status' => 404,
                    'user' => $data['user']
                ]);
            }
        } else {
	        $data['user'] = User::where('id', $request->user)->first();
			$request->validate([
				'email' => [
					'required',
					function ($attribute, $value, $fail) use($data) {
						if (!$data['user']) {
							$fail('Email tidak ditemukan.');
						} else {
							if($data['user']->email_verified_at != null) {
								$fail('Email telah terverifikasi, silahkan login.');
							}
						}
					},
				],
			]);
			
			$data['user']->update([
				'email' => $request->email	
			]);

			$checkOtpCode = OtpCode::where('user_id', $data['user']->id)->first();
			if($checkOtpCode != null)
			{
				$checkOtpCode->delete();
			}

			try {
				$randomInt = random_int(100000, 999999);
				OtpCode::create([
					'user_id' => $data['user']->id,
					'code' => $randomInt
				]);

				$data['otp_code'] = $randomInt;

				$mail = Mail::to($request->email)->send(new VerificationEmailMail($data));

				return Redirect::route('verification-email', [
					'status' => 200,
					'user' => $data['user']
				]);
			} catch (\Exception $e) {
				return Redirect::route('verification-email', [
					'status' => 404,
					'user' => $data['user']
				]);
			}
		}

        
    }

    /**
     * Display the specified resource.
     */
    public function show(OtpCode $otpCode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OtpCode $otpCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OtpCode $otpCode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OtpCode $otpCode)
    {
        //
    }
}

