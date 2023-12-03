<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Redirect;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Mail\VerificationEmailMail;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\OtpCode;
use App\Models\Vendor;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Suffix;
use App\Models\Prefix;
use Mail;
use DB;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $data['suffix'] = Suffix::all();
        $data['prefix'] = Prefix::all();

        return Inertia::render('Auth/Register', [
            'data' => $data
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'document_type' => 'required_if:type_of_business,Pribadi',
            'npwp' => 'required_if:document_type,npwp|unique:'.Vendor::class,
            'ktp' => 'required_if:document_type,ktp',
            'legality' => 'max:255',
            'name' => 'required|string|max:255|unique:'.Vendor::class,
            'name_business' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'office_address' => 'required|string|max:255',
            'npwp_address' => 'required_if:document_type,npwp',
            'ktp_address' => 'required_if:document_type,ktp',
            'country_id' => 'required|max:255',
            'province_id' => 'required|max:255',
            'city_id' => 'required|max:255',
            'postal_code' => 'required|max:255',
            'phone_number' => 'required|max:255',
            'mobile_phone_number' => 'required|max:255',
            'type_of_business' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            DB::beginTransaction();
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'vendor',
                'is_first_login' => 0
            ]);
            $vendorData = [
                'user_id' => $user->id,
                'status_account' => 'draft',
                'type_of_business' => $request->type_of_business,
                'name_business' => $request->name_business,
                'legality' => $request->legality,
                'name' => $request->name,
                'npwp' => $request->npwp ?? null,
                'ktp' => $request->ktp ?? null,
                'ktp_address' => $request->ktp_address ?? null,
                'office_address' => $request->office_address,
                'npwp_address' => $request->npwp_address ?? null,
                'country_id' => $request->country_id,
                'country' => $request->country,
                'province_id' => $request->province_id,
                'province_name' => $request->province_name,
                'city_id' => $request->city_id,
                'city_name' => $request->city_name,
                'postal_code' => $request->postal_code,
                'phone_number' => $request->phone_number,
                'mobile_phone_number' => $request->mobile_phone_number,
                'email' => $request->email,
                'suffix' => $request->suffix,
                'prefix' => $request->prefix,
                'file_npwp' => '',
                'file_sppkp' => '',
                'file_siup' => '',
                'file_tdp' => '',
                'file_nib' => '',
                'file_board_of_directors_composition' => '',
                'file_front_page_bank' => '',
                'file_bank_account_statement_letter' => '',
                'file_non_pkp_statement' => '',
                'file_ektp' => '',
            ];
            Vendor::create($vendorData);
    
            $randomInt = random_int(100000, 999999);
            OtpCode::create([
                'user_id' => $user->id,
                'code' => $randomInt
            ]);

            $data['user'] = $user;
            $data['otp_code'] = $randomInt;
            
            $mail = Mail::to($user->email)->send(new VerificationEmailMail($data));    
            DB::commit();
            return Redirect::route('verification-email', [
                'user' => $user
            ]);
        } catch (\Exception $e) {
            DB::rollback();
        }
        
        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
    }
}
