<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;

class RegisterAccountController extends Controller
{
    public function stepOne(Request $request) {
        $data = Vendor::where([['npwp', $request->npwp ?? ''], ['name', $request->name ?? '']])->first();

        return Inertia::render('Auth/RegisterStepOne', [
            'data' => $data ?? '',
        ]);
    }

    public function stepOneStore(Request $request) {
        $data = Vendor::where([['npwp', $request->fnpwp ?? ''], ['name', $request->fname ?? '']])->first();
        $validateName = null;
        $validateNpwp = null;
        $checkNpwp = Vendor::where('npwp', $request->npwp ?? '')->first();
        $checkName = Vendor::where('name', $request->name ?? '')->first();
        if($data != null)
        {
            if($checkNpwp->id != $data->id) 
            {
                $validateNpwp = '|unique:' . Vendor::class;
            }

            if($checkName->id != $data->id) 
            {
                $validateName = '|unique:' . Vendor::class;
            }
        } else {
            if($checkNpwp != null)
            {
                $validateNpwp = '|unique:' . Vendor::class;
            }

            if($checkName != null)
            {
                $validateName = '|unique:' . Vendor::class;
            }
        }
        $request->validate([
            'name' => 'required|string|max:255'.$validateName,
            'npwp' => 'required|string|max:255'.$validateNpwp,
            'npwp_address' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'province_id' => 'required|max:255',
            'city_id' => 'required|max:255',
            'subdistrict_id' => 'required|max:255',
            'postal_code' => 'required|max:255',
            'phone_number' => 'required|max:255',
            'mobile_phone_number' => 'required|max:255',
            'email' => 'required|string|email|max:255',
            'type_of_business' => 'required|string|max:255',
        ]);

        if($data == null) {
            Vendor::create([
                'status_account' => 'tidak aktif',
                'step_account' => 1,
                'type_of_business' => $request->type_of_business,
                'name' => $request->name,
                'npwp' => $request->npwp,
                'npwp_address' => $request->npwp_address,
                'country' => $request->country,
                'province_id' => $request->province_id,
                'city_id' => $request->city_id,
                'subdistrict_id' => $request->subdistrict_id,
                'postal_code' => $request->postal_code,
                'phone_number' => $request->phone_number,
                'mobile_phone_number' => $request->mobile_phone_number,
                'email' => $request->email,
            ]);
        } else {
            $data->update([
                'type_of_business' => $request->type_of_business,
                'name' => $request->name,
                'npwp' => $request->npwp,
                'npwp_address' => $request->npwp_address,
                'country' => $request->country,
                'province_id' => $request->province_id,
                'city_id' => $request->city_id,
                'subdistrict_id' => $request->subdistrict_id,
                'postal_code' => $request->postal_code,
                'phone_number' => $request->phone_number,
                'mobile_phone_number' => $request->mobile_phone_number,
                'email' => $request->email,
            ]);
        }

        return Redirect::route('register-account.step-2', ['name' => $request->name, 'npwp' => $request->npwp]);
    }

    public function stepTwo(Request $request) {
        $data = Vendor::where([['npwp', $request->npwp ?? ''], ['name', $request->name ?? '']])->first();

        if($data != null)
        {
            return Inertia::render('Auth/RegisterStepTwo', [
                'data' => $data ?? '',
            ]);
        } else {
            abort('404');
        }
    }

    public function stepTwoStore(Request $request) {
        $data = Vendor::where([['npwp', $request->fnpwp ?? ''], ['name', $request->fname ?? '']])->first();

        $request->validate([
            'director_name' => 'required|string|max:255',
            'director_phone_number' => 'required|string|max:255',
            'director_email' => 'required|string|email|max:255',
            'fa_name' => 'required|string|max:255',
            'fa_phone_number' => 'required|string|max:255',
            'fa_email' => 'required|string|email|max:255',
            'marketing_key_account' => 'required|string|max:255',
            'marketing_phone_number' => 'required|string|max:255',
            'marketing_email' => 'required|string|email|max:255',
            'is_virtual_account' => 'required|max:1',
            'is_bca' => 'required|max:1',
            'bank_account_name' => 'required|string|max:255',
            'bank_account_number' => 'required|string|max:255',
            'branch_of_bank' => 'required|string|max:255',
            'bank_swift_code' => 'required|string|max:255',
        ]);

        $data->update([
            'step_account' => 2,
            'director_name' => $request->director_name,
            'director_phone_number' => $request->director_phone_number,
            'director_email' => $request->director_email,
            'fa_name' => $request->fa_name,
            'fa_phone_number' => $request->fa_phone_number,
            'fa_email' => $request->fa_email,
            'marketing_key_account' => $request->marketing_key_account,
            'marketing_phone_number' => $request->marketing_phone_number,
            'marketing_email' => $request->marketing_email,
            'is_virtual_account' => $request->is_virtual_account,
            'is_bca' => $request->is_bca,
            'bank_account_name' => $request->bank_account_name,
            'bank_account_number' => $request->bank_account_number,
            'branch_of_bank' => $request->branch_of_bank,
            'bank_swift_code' => $request->bank_swift_code,
        ]);

        return Redirect::route('register-account.step-3', ['name' => $request->fname, 'npwp' => $request->fnpwp]);
    }

    public function stepThree(Request $request) {
        $data = Vendor::where([['npwp', $request->npwp ?? ''], ['name', $request->name ?? '']])->first();

        if($data != null)
        {
            return Inertia::render('Auth/RegisterStepThree', [
                'data' => $data ?? '',
            ]);
        } else {
            abort('404');
        }
    }
}
