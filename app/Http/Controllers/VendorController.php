<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\RevisionRegisterVendor;
use App\Mail\ApproverVendorMail;
use App\Models\ApproverVendor;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\SlaWeekend;
use App\Models\SlaHoliday;
use App\Models\UserRole;
use App\Models\Vendor;
use App\Models\Prefix;
use App\Models\Suffix;
use Inertia\Inertia;
use Carbon\Carbon;
use Auth;
use Mail;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['vendors'] = Vendor::where('user_id', Auth::user()->id)->get();
        $data['latest'] = Vendor::where('user_id', Auth::user()->id)->latest('created_at')->first();

        return Inertia::render('Vendor/Profile/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data['auth'] = Auth::user();
        $data['suffix'] = Suffix::all();
        $data['prefix'] = Prefix::all();
        $data['vendor'] = Vendor::where('user_id', $data['auth']->id)->latest('created_at')->first();
        return Inertia::render('Vendor/Profile/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Vendor::where('user_id', Auth::user()->id)->latest('created_at')->first();
        $validateName = null;
        $validateNpwp = null;
        $checkNpwp = Vendor::where('npwp', $request->npwp ?? '')->first();
        $checkName = Vendor::where('name', $request->name ?? '')->first();
        if($data != null)
        {
            if($checkNpwp != null) {
                if($checkNpwp->user_id != $data->user_id) 
                {
                    $validateNpwp = '|unique:' . Vendor::class;
                }
            }
            
            if($checkName != null) {
                if($checkName->user_id != $data->user_id) 
                {
                    $validateName = '|unique:' . Vendor::class;
                }
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

        $file_npwp = '';
        $expired_npwp = '';
        $file_sppkp = '';
        $expired_sppkp = '';
        $file_siup = '';
        $expired_siup = '';
        $file_tdp = '';
        $expired_tdp = '';
        $file_nib = '';
        $expired_nib ='';
        $file_board_of_directors_composition = '';
        $file_front_page_bank = '';
        $file_bank_account_statement_letter = '';
        $file_non_pkp_statement = '';
        $file_ektp = '';
        $expired_ektp = '';

        if($request->type_of_business == 'Pribadi')
        {
            $file_npwp = $request->file_npwp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $expired_npwp = 'required|date|date_format:Y-m-d';
            // $file_ektp = $request->file_ektp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $expired_ektp = 'required|date|date_format:Y-m-d';
            // $file_front_page_bank = $request->file_front_page_bank != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $file_bank_account_statement_letter = $request->file_bank_account_statement_letter != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $file_non_pkp_statement = $request->file_non_pkp_statement != null ? '' : 'required|' . 'mimes:pdf|max:5000';
        }

        if($request->type_of_business == 'Non PKP')
        {
            $file_npwp = $request->file_npwp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $expired_npwp = 'required|date|date_format:Y-m-d';
            $file_sppkp = $request->file_sppkp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_sppkp = 'required|date|date_format:Y-m-d';
            $file_siup = $request->file_siup != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_siup = 'required|date|date_format:Y-m-d';
            $file_tdp = $request->file_tdp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_tdp = 'required|date|date_format:Y-m-d';
            $file_nib = $request->file_nib != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_nib ='required|date|date_format:Y-m-d';
            $file_board_of_directors_composition = $request->file_board_of_directors_composition != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $file_front_page_bank = $request->file_front_page_bank != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $file_bank_account_statement_letter = $request->file_bank_account_statement_letter != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $file_non_pkp_statement = $request->file_non_pkp_statement != null ? '' : 'required|' . 'mimes:pdf|max:5000';
        }

        if($request->type_of_business == 'PKP')
        {
            $file_npwp = $request->file_npwp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $expired_npwp = 'required|date|date_format:Y-m-d';
            $file_sppkp = $request->file_sppkp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_sppkp = 'required|date|date_format:Y-m-d';
            $file_siup = $request->file_siup != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_siup = 'required|date|date_format:Y-m-d';
            $file_tdp = $request->file_tdp != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_tdp = 'required|date|date_format:Y-m-d';
            $file_nib = $request->file_nib != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            $expired_nib ='required|date|date_format:Y-m-d';
            $file_board_of_directors_composition = $request->file_board_of_directors_composition != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $file_front_page_bank = $request->file_front_page_bank != null ? '' : 'required|' . 'mimes:pdf|max:5000';
            // $file_bank_account_statement_letter = $request->file_bank_account_statement_letter != null ? '' : 'required|' . 'mimes:pdf|max:5000';
        }

        if($request->status_submit == 'pengajuan perubahan') {
            $request->validate([
                'name' => 'required|string|max:255'.$validateName,
                'npwp' => 'required|string|max:255'.$validateNpwp,
                'email' => 'required|string|email|max:255',
                'name_business' => 'required|string|max:255',
                'office_address' => 'required|string|max:255',
                'npwp_address' => 'required|string|max:255',
                'country_id' => 'required|max:255',
                'province_id' => 'required|max:255',
                'city_id' => 'required|max:255',
                'postal_code' => 'required|max:255',
                'phone_number' => 'required|max:255',
                'mobile_phone_number' => 'required|max:255',
                'type_of_business' => 'required|string|max:255',
                'director_name' => 'required|string|max:255',
                'director_phone_number' => 'required|string|max:255',
                'director_email' => 'required|string|max:255|email',
                'marketing_key_account' => 'required|string|max:255',
                'marketing_phone_number' => 'required|string|max:255',
                'marketing_email' => 'required|string|max:255|email',
                'fa_name' => 'required|string|max:255',
                'fa_phone_number' => 'required|string|max:255',
                'fa_email' => 'required|string|max:255|email',
                'is_bca' => 'required|max:1',
                'bank_name' => 'required|max:255',
                'is_virtual_account' => 'required|max:1',
                'bank_account_name' => 'required|string|max:255',
                'bank_account_number' => 'required|string|max:255',
                'branch_of_bank' => 'required|string|max:255',
                'bank_swift_code' => 'required|string|max:255',
                'file_npwp' => $file_npwp,
                'expired_npwp' => $expired_npwp,
                'file_sppkp' => $file_sppkp,
                'expired_sppkp' => $expired_sppkp,
                'file_siup' => $file_siup,
                'expired_siup' => $expired_siup,
                'file_tdp' => $file_tdp,
                'expired_tdp' => $expired_tdp,
                'file_nib' => $file_nib,
                'expired_nib' => $expired_nib,
                'file_board_of_directors_composition' => $file_board_of_directors_composition,
                'file_front_page_bank' => $file_front_page_bank,
                'file_bank_account_statement_letter' => $file_bank_account_statement_letter,
                'file_non_pkp_statement' => $file_non_pkp_statement,
                'file_ektp' => $file_ektp,
                'expired_ektp' => $expired_ektp,
                'term_condition' => 'required',
            ]);
        }

        $npwpPath = $data->file_npwp ?? '';
        if ($request->hasFile('file_npwp')) {
            $save = $request->file('file_npwp')->store('public/file_npwp');
            $filename = $request->file('file_npwp')->hashName();
            $npwpPath = url('/') . '/storage/file_npwp/' . $filename;
        }

        $sppkpPath = $data->file_sppkp ?? '';
        if ($request->hasFile('file_sppkp')) {
            $save = $request->file('file_sppkp')->store('public/file_sppkp');
            $filename = $request->file('file_sppkp')->hashName();
            $sppkpPath = url('/') . '/storage/file_sppkp/' . $filename;
        }

        $siupPath = $data->file_siup ?? '';
        if ($request->hasFile('file_siup')) {
            $save = $request->file('file_siup')->store('public/file_siup');
            $filename = $request->file('file_siup')->hashName();
            $siupPath = url('/') . '/storage/file_siup/' . $filename;
        }

        $tdpPath = $data->file_tdp ?? '';
        if ($request->hasFile('file_tdp')) {
            $save = $request->file('file_tdp')->store('public/file_tdp');
            $filename = $request->file('file_tdp')->hashName();
            $tdpPath = url('/') . '/storage/file_tdp/' . $filename;
        }

        $nibPath = $data->file_nib ?? '';
        if ($request->hasFile('file_nib')) {
            $save = $request->file('file_nib')->store('public/file_nib');
            $filename = $request->file('file_nib')->hashName();
            $nibPath = url('/') . '/storage/file_nib/' . $filename;
        }

        $directorsPath = $data->file_board_of_directors_composition ?? '';
        if ($request->hasFile('file_board_of_directors_composition')) {
            $save = $request->file('file_board_of_directors_composition')->store('public/file_board_of_directors_composition');
            $filename = $request->file('file_board_of_directors_composition')->hashName();
            $directorsPath = url('/') . '/storage/file_board_of_directors_composition/' . $filename;
        }

        $frontBankPath = $data->file_front_page_bank ?? '';
        if ($request->hasFile('file_front_page_bank')) {
            $save = $request->file('file_front_page_bank')->store('public/file_front_page_bank');
            $filename = $request->file('file_front_page_bank')->hashName();
            $frontBankPath = url('/') . '/storage/file_front_page_bank/' . $filename;
        }

        $statementBankPath = $data->file_bank_account_statement_letter ?? '';
        if ($request->hasFile('file_bank_account_statement_letter')) {
            $save = $request->file('file_bank_account_statement_letter')->store('public/file_bank_account_statement_letter');
            $filename = $request->file('file_bank_account_statement_letter')->hashName();
            $statementBankPath = url('/') . '/storage/file_bank_account_statement_letter/' . $filename;
        }

        $nonPkpPath = $data->file_non_pkp_statement ?? '';
        if ($request->hasFile('file_non_pkp_statement')) {
            $save = $request->file('file_non_pkp_statement')->store('public/file_non_pkp_statement');
            $filename = $request->file('file_non_pkp_statement')->hashName();
            $nonPkpPath = url('/') . '/storage/file_non_pkp_statement/' . $filename;
        }

        $ektpPath = $data->file_ektp ?? '';
        if ($request->hasFile('file_ektp')) {
            $save = $request->file('file_ektp')->store('public/file_ektp');
            $filename = $request->file('file_ektp')->hashName();
            $ektpPath = url('/') . '/storage/file_ektp/' . $filename;
        }

        $vendor = Vendor::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'email' => $request->email,
            'npwp' => $request->npwp,
            'name_business' => $request->name_business,
            'office_address' => $request->office_address,
            'npwp_address' => $request->npwp_address,
            'country_id' => $request->country_id,
            'country' => $request->country,
            'province_id' => $request->province_id,
            'province_name' => $request->province_name,
            'city_id' => $request->city_id,
            'city_name' => $request->city_name,
            'postal_code' => $request->postal_code,
            'phone_number' => $request->phone_number,
            'mobile_phone_number' => $request->mobile_phone_number,
            'type_of_business' => $request->type_of_business,
            'director_name' => $request->director_name,
            'director_phone_number' => $request->director_phone_number,
            'director_email' => $request->director_email,
            'marketing_key_account' => $request->marketing_key_account,
            'marketing_phone_number' => $request->marketing_phone_number,
            'marketing_email' => $request->marketing_email,
            'fa_name' => $request->fa_name,
            'fa_phone_number' => $request->fa_phone_number,
            'fa_email' => $request->fa_email,
            'is_bca' => $request->is_bca,
            'bank_name' => $request->bank_name,
            'is_virtual_account' => $request->is_virtual_account,
            'bank_account_name' => $request->bank_account_name,
            'bank_account_number' => $request->bank_account_number,
            'branch_of_bank' => $request->branch_of_bank,
            'bank_swift_code' => $request->bank_swift_code,

            'file_npwp' => $npwpPath,
            'expired_npwp' => $request->expired_npwp,

            'file_siup' => $siupPath,
            'expired_siup' => $request->expired_siup,

            'file_sppkp' => $sppkpPath,
            'expired_sppkp' => $request->expired_sppkp,

            'file_tdp' => $tdpPath,
            'expired_tdp' => $request->expired_tdp,

            'file_nib' => $nibPath,
            'expired_nib' => $request->expired_nib,

            'file_board_of_directors_composition' => $directorsPath,
            'file_front_page_bank' => $frontBankPath,
            'file_bank_account_statement_letter' => $statementBankPath,
            'file_non_pkp_statement' => $nonPkpPath,

            'file_ektp' => $ektpPath,
            'expired_ektp' => $request->expired_ektp,

            'status_account' => $request->status_submit,

            'skb' => $request->skb,
            'pph' => $request->pph,
            'coa_prepayment' => $request->coa_prepayment,
            'coa_liability_account' => $request->coa_liability_account,
            'coa_receiving' => $request->coa_receiving,
            'ship_to' => $request->ship_to,
            'bill_to' => $request->bill_to,

            'legality' => $request->legality,
            'suffix' => $request->suffix,
        ]);

        if($request->status_submit == 'pengajuan perubahan') { 
            $this->createRevisionTimeline($vendor->id);
        }

        // if($request->status_submit == 'draft')
        // {
        //     $vendor->update([
        //         'file_npwp' => null,
        //         'file_siup' => null,
        //         'file_sppkp' => null,
        //         'file_tdp' => null,
        //         'file_nib' => null,
        //         'file_board_of_directors_composition' => null,
        //         'file_front_page_bank' => null,
        //         'file_bank_account_statement_letter' => null,
        //         'file_non_pkp_statement' => null,
        //         'file_ektp' => null,
        //         "is_bca" => null,
        //         "bank_name" => null,
        //         "is_virtual_account" => null,
        //     ]);
        // }
        
        return Redirect::route('vendor.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data['auth'] = Auth::user();
        $data['vendor'] = Vendor::where('id', $id)->where('user_id', $data['auth']->id)->first();
        $data['timeline'] = RevisionRegisterVendor::with('user')->where('vendor_id', $data['vendor']->id)->get();

        $data['checkRejectedData'] = RevisionRegisterVendor::where('vendor_id', $data['vendor']->id)->where('status', 'ditolak')->first();
        
        if(count($data['timeline']) == 0) {
            $data['timeline'] = '';
        }

        return Inertia::render('Vendor/Profile/Show', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['auth'] = Auth::user();
        $data['suffix'] = Suffix::all();
        $data['prefix'] = Prefix::all();
        $data['checkVerifiedData'] = Vendor::where('user_id', $data['auth']->id)->where('status_account', 'disetujui')->first() == null ? 404 : 200;
        $data['vendor'] = Vendor::where('id', $id)->where('user_id', $data['auth']->id)->first();
        return Inertia::render('Vendor/Profile/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = Vendor::where('id', $id)->first();
        $validateName = null;
        $validateNpwp = null;
        $checkNpwp = Vendor::where('npwp', $request->npwp ?? '')->first();
        $checkName = Vendor::where('name', $request->name ?? '')->first();
        if($data != null)
        {
            if($checkNpwp != null) {
                if($checkNpwp->user_id != $data->user_id) 
                {
                    $validateNpwp = '|unique:' . Vendor::class;
                }
            }
            
            if($checkName != null) {
                if($checkName->user_id != $data->user_id) 
                {
                    $validateName = '|unique:' . Vendor::class;
                }
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

        $file_npwp = '';
        $expired_npwp = '';
        $file_sppkp = '';
        $expired_sppkp = '';
        $file_siup = '';
        $expired_siup = '';
        $file_tdp = '';
        $expired_tdp = '';
        $file_nib = '';
        $expired_nib ='';
        $file_board_of_directors_composition = '';
        $file_front_page_bank = '';
        $file_bank_account_statement_letter = '';
        $file_non_pkp_statement = '';
        $file_ektp = '';
        $expired_ektp = '';

        if($request->type_of_business == 'Pribadi')
        {
            // $file_npwp = 'required|mimes:pdf|max:5000';
            // $expired_npwp = 'required|date|date_format:Y-m-d';
            // $file_ektp = 'required|mimes:pdf|max:5000';
            // $expired_ektp = 'required|date|date_format:Y-m-d';
            // $file_front_page_bank = 'required|mimes:pdf|max:5000';
            // $file_bank_account_statement_letter = 'required|mimes:pdf|max:5000';
        }

        if($request->type_of_business == 'Non PKP')
        {
            // $file_npwp = 'required|mimes:pdf|max:5000';
            // $expired_npwp = 'required|date|date_format:Y-m-d';
            // $file_sppkp = 'required|mimes:pdf|max:5000';
            $expired_sppkp = 'required|date|date_format:Y-m-d';
            // $file_siup = 'required|mimes:pdf|max:5000';
            $expired_siup = 'required|date|date_format:Y-m-d';
            // $file_tdp = 'required|mimes:pdf|max:5000';
            $expired_tdp = 'required|date|date_format:Y-m-d';
            // $file_nib = 'required|mimes:pdf|max:5000';
            $expired_nib ='required|date|date_format:Y-m-d';
            // $file_board_of_directors_composition = 'required|mimes:pdf|max:5000';
            // $file_non_pkp_statement = 'required|mimes:pdf|max:5000';
        }

        if($request->type_of_business == 'PKP')
        {
            // $file_npwp = 'required|mimes:pdf|max:5000';
            // $expired_npwp = 'required|date|date_format:Y-m-d';
            // $file_sppkp = 'required|mimes:pdf|max:5000';
            $expired_sppkp = 'required|date|date_format:Y-m-d';
            // $file_siup = 'required|mimes:pdf|max:5000';
            $expired_siup = 'required|date|date_format:Y-m-d';
            // $file_tdp = 'required|mimes:pdf|max:5000';
            $expired_tdp = 'required|date|date_format:Y-m-d';
            // $file_nib = 'required|mimes:pdf|max:5000';
            $expired_nib ='required|date|date_format:Y-m-d';
            // $file_board_of_directors_composition = 'required|mimes:pdf|max:5000';
        }

        if($request->status_submit == 'pengajuan perubahan') {
            if($request->type_of_business == 'PKP' || $request->type_of_business == 'Non PKP')
            {
                if($data->file_npwp == null) {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->file_sppkp == null) {$file_sppkp = 'required|mimes:pdf|max:5000';}
                if($data->file_siup == null) {$file_siup = 'required|mimes:pdf|max:5000';}
                if($data->file_tdp == null) {$file_tdp = 'required|mimes:pdf|max:5000';}
                if($data->file_nib == null) {$file_nib = 'required|mimes:pdf|max:5000';}
                if($data->file_board_of_directors_composition == null) {$file_board_of_directors_composition = 'required|mimes:pdf|max:5000';}

                if($data->npwp_note != null) {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->sppkp_note != null) {$file_sppkp = 'required|mimes:pdf|max:5000';}
                if($data->siup_note != null) {$file_siup = 'required|mimes:pdf|max:5000';}
                if($data->tdp_note != null) {$file_tdp = 'required|mimes:pdf|max:5000';}
                if($data->nib_note != null) {$file_nib = 'required|mimes:pdf|max:5000';}
                if($data->board_of_directors_composition_note != null) {$file_board_of_directors_composition = 'required|mimes:pdf|max:5000';}
            }
            if($request->type_of_business == 'Non PKP') {
                if($data->file_non_pkp_statement == null) {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                if($data->non_pkp_statement_note != null) {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                // if($data->file_front_page_bank == null) {$file_front_page_bank = 'required|mimes:pdf|max:5000';}
                // if($data->file_bank_account_statement_letter == null) {$file_bank_account_statement_letter = 'required|mimes:pdf|max:5000';}
            }
            if($request->type_of_business == 'Pribadi') {
                if($data->file_npwp == null) {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->file_non_pkp_statement == null) {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                if($data->npwp_note != null) {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->non_pkp_statement_note != null) {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                // if($data->file_front_page_bank == null) {$file_front_page_bank = 'required|mimes:pdf|max:5000';}
                // if($data->file_bank_account_statement_letter == null) {$file_bank_account_statement_letter = 'required|mimes:pdf|max:5000';}
                // if($data->file_ektp == null) {$file_ektp = 'required|mimes:pdf|max:5000';}
            }
        }

        if($request->status_submit == 'pengajuan perubahan') {
            $request->validate([
                'name' => 'required|string|max:255'.$validateName,
                'npwp' => 'required|string|max:255'.$validateNpwp,
                'email' => 'required|string|email|max:255',
                'name_business' => 'required|string|max:255',
                'office_address' => 'required|string|max:255',
                'npwp_address' => 'required|string|max:255',
                'country_id' => 'required|max:255',
                'province_id' => 'required|max:255',
                'city_id' => 'required|max:255',
                'postal_code' => 'required|max:255',
                'phone_number' => 'required|max:255',
                'mobile_phone_number' => 'required|max:255',
                'type_of_business' => 'required|string|max:255',
                'director_name' => 'required|string|max:255',
                'director_phone_number' => 'required|string|max:255',
                'director_email' => 'required|string|max:255|email',
                'marketing_key_account' => 'required|string|max:255',
                'marketing_phone_number' => 'required|string|max:255',
                'marketing_email' => 'required|string|max:255|email',
                'fa_name' => 'required|string|max:255',
                'fa_phone_number' => 'required|string|max:255',
                'fa_email' => 'required|string|max:255|email',
                'is_bca' => 'required|max:1',
                'bank_name' => 'required|max:255',
                'is_virtual_account' => 'required|max:1',
                'bank_account_name' => 'required|string|max:255',
                'bank_account_number' => 'required|string|max:255',
                'branch_of_bank' => 'required|string|max:255',
                'bank_swift_code' => 'required|string|max:255',
                'file_npwp' => $file_npwp,
                'expired_npwp' => $expired_npwp,
                'file_sppkp' => $file_sppkp,
                'expired_sppkp' => $expired_sppkp,
                'file_siup' => $file_siup,
                'expired_siup' => $expired_siup,
                'file_tdp' => $file_tdp,
                'expired_tdp' => $expired_tdp,
                'file_nib' => $file_nib,
                'expired_nib' => $expired_nib,
                'file_board_of_directors_composition' => $file_board_of_directors_composition,
                'file_front_page_bank' => $file_front_page_bank,
                'file_bank_account_statement_letter' => $file_bank_account_statement_letter,
                'file_non_pkp_statement' => $file_non_pkp_statement,
                'file_ektp' => $file_ektp,
                'expired_ektp' => $expired_ektp,
                'term_condition' => 'required',
            ]);
        }

        $npwpPath = $data->file_npwp ?? '';
        if ($request->hasFile('file_npwp')) {
            $save = $request->file('file_npwp')->store('public/file_npwp');
            $filename = $request->file('file_npwp')->hashName();
            $npwpPath = url('/') . '/storage/file_npwp/' . $filename;
        }

        $sppkpPath = $data->file_sppkp ?? '';
        if ($request->hasFile('file_sppkp')) {
            $save = $request->file('file_sppkp')->store('public/file_sppkp');
            $filename = $request->file('file_sppkp')->hashName();
            $sppkpPath = url('/') . '/storage/file_sppkp/' . $filename;
        }

        $siupPath = $data->file_siup ?? '';
        if ($request->hasFile('file_siup')) {
            $save = $request->file('file_siup')->store('public/file_siup');
            $filename = $request->file('file_siup')->hashName();
            $siupPath = url('/') . '/storage/file_siup/' . $filename;
        }

        $tdpPath = $data->file_tdp ?? '';
        if ($request->hasFile('file_tdp')) {
            $save = $request->file('file_tdp')->store('public/file_tdp');
            $filename = $request->file('file_tdp')->hashName();
            $tdpPath = url('/') . '/storage/file_tdp/' . $filename;
        }

        $nibPath = $data->file_nib ?? '';
        if ($request->hasFile('file_nib')) {
            $save = $request->file('file_nib')->store('public/file_nib');
            $filename = $request->file('file_nib')->hashName();
            $nibPath = url('/') . '/storage/file_nib/' . $filename;
        }

        $directorsPath = $data->file_board_of_directors_composition ?? '';
        if ($request->hasFile('file_board_of_directors_composition')) {
            $save = $request->file('file_board_of_directors_composition')->store('public/file_board_of_directors_composition');
            $filename = $request->file('file_board_of_directors_composition')->hashName();
            $directorsPath = url('/') . '/storage/file_board_of_directors_composition/' . $filename;
        }

        $frontBankPath = $data->file_front_page_bank ?? '';
        if ($request->hasFile('file_front_page_bank')) {
            $save = $request->file('file_front_page_bank')->store('public/file_front_page_bank');
            $filename = $request->file('file_front_page_bank')->hashName();
            $frontBankPath = url('/') . '/storage/file_front_page_bank/' . $filename;
        }

        $statementBankPath = $data->file_bank_account_statement_letter ?? '';
        if ($request->hasFile('file_bank_account_statement_letter')) {
            $save = $request->file('file_bank_account_statement_letter')->store('public/file_bank_account_statement_letter');
            $filename = $request->file('file_bank_account_statement_letter')->hashName();
            $statementBankPath = url('/') . '/storage/file_bank_account_statement_letter/' . $filename;
        }

        $nonPkpPath = $data->file_non_pkp_statement ?? '';
        if ($request->hasFile('file_non_pkp_statement')) {
            $save = $request->file('file_non_pkp_statement')->store('public/file_non_pkp_statement');
            $filename = $request->file('file_non_pkp_statement')->hashName();
            $nonPkpPath = url('/') . '/storage/file_non_pkp_statement/' . $filename;
        }

        $ektpPath = $data->file_ektp ?? '';
        if ($request->hasFile('file_ektp')) {
            $save = $request->file('file_ektp')->store('public/file_ektp');
            $filename = $request->file('file_ektp')->hashName();
            $ektpPath = url('/') . '/storage/file_ektp/' . $filename;
        }

        $data->update([
            'name' => $request->name,
            'email' => $request->email,
            'npwp' => $request->npwp,
            'name_business' => $request->name_business,
            'office_address' => $request->office_address,
            'npwp_address' => $request->npwp_address,
            'country_id' => $request->country_id,
            'country' => $request->country,
            'province_id' => $request->province_id,
            'province_name' => $request->province_name,
            'city_id' => $request->city_id,
            'city_name' => $request->city_name,
            'postal_code' => $request->postal_code,
            'phone_number' => $request->phone_number,
            'mobile_phone_number' => $request->mobile_phone_number,
            'type_of_business' => $request->type_of_business,
            'director_name' => $request->director_name,
            'director_phone_number' => $request->director_phone_number,
            'director_email' => $request->director_email,
            'marketing_key_account' => $request->marketing_key_account,
            'marketing_phone_number' => $request->marketing_phone_number,
            'marketing_email' => $request->marketing_email,
            'fa_name' => $request->fa_name,
            'fa_phone_number' => $request->fa_phone_number,
            'fa_email' => $request->fa_email,
            'is_bca' => $request->is_bca,
            'bank_name' => $request->bank_name,
            'is_virtual_account' => $request->is_virtual_account,
            'bank_account_name' => $request->bank_account_name,
            'bank_account_number' => $request->bank_account_number,
            'branch_of_bank' => $request->branch_of_bank,
            'bank_swift_code' => $request->bank_swift_code,

            'file_npwp' => $npwpPath,
            'expired_npwp' => $request->expired_npwp,

            'file_siup' => $siupPath,
            'expired_siup' => $request->expired_siup,

            'file_sppkp' => $sppkpPath,
            'expired_sppkp' => $request->expired_sppkp,

            'file_tdp' => $tdpPath,
            'expired_tdp' => $request->expired_tdp,

            'file_nib' => $nibPath,
            'expired_nib' => $request->expired_nib,

            'file_board_of_directors_composition' => $directorsPath,
            'file_front_page_bank' => $frontBankPath,
            'file_bank_account_statement_letter' => $statementBankPath,
            'file_non_pkp_statement' => $nonPkpPath,

            'file_ektp' => $ektpPath,
            'expired_ektp' => $request->expired_ektp,

            'status_account' => $request->status_submit,

            'skb' => $request->skb,
            'pph' => $request->pph,
            'coa_prepayment' => $request->coa_prepayment,
            'coa_liability_account' => $request->coa_liability_account,
            'coa_receiving' => $request->coa_receiving,
            'ship_to' => $request->ship_to,
            'bill_to' => $request->bill_to,

            'legality' => $request->legality,
            'suffix' => $request->suffix,
        ]);

        // if($request->status_submit == 'draft')
        // {
        //     $data->update([
        //         'file_npwp' => null,
        //         'file_siup' => null,
        //         'file_sppkp' => null,
        //         'file_tdp' => null,
        //         'file_nib' => null,
        //         'file_board_of_directors_composition' => null,
        //         'file_front_page_bank' => null,
        //         'file_bank_account_statement_letter' => null,
        //         'file_non_pkp_statement' => null,
        //         'file_ektp' => null,
        //         "is_bca" => null,
        //         "bank_name" => null,
        //         "is_virtual_account" => null,
        //     ]);
        // }

        if($request->status_submit == 'pengajuan perubahan') { 
            if(count($data->revision_register_vendors) < 1)
            {
                $this->createRevisionTimeline($data->id);
            }
            $checkRejectedData = RevisionRegisterVendor::where('vendor_id', $data->id)->where('status', 'ditolak')->first();
            if($checkRejectedData != null) {
                RevisionRegisterVendor::where('vendor_id', $data->id)->where('status', 'ditolak')->update([
                    'status' => 'menunggu persetujuan'
                ]);

                $sla_holiday = SlaHoliday::whereDate('date', $checkRejectedData->updated_at)->first();
                $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', $checkRejectedData->updated_at);

                while ($sla_holiday || $dateCarbon->isWeekend()) {
                    $dateCarbon->addDay();
                    $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                }
                
                $checkRole = UserRole::where('user_id', $checkRejectedData->user_id)->first();
                $getApproverVendorSla = ApproverVendor::where('role_id', $checkRole->role_id)->first();
                if($getApproverVendorSla)
                {
                    $checkRejectedData->update([
                        'sla_at' => $dateCarbon->addHours($getApproverVendorSla->sla)
                    ]);
                }
            }
            return Redirect::route('vendor.show', $data->id);
        } else {
            return Redirect::route('vendor.edit', $data->id);
        }

        
    }

    public function createRevisionTimeline($vendor_id) {
        $revision = RevisionRegisterVendor::where('vendor_id', $vendor_id)->first();
        $approval_vendors = ApproverVendor::orderBy('level')->get();
        foreach($approval_vendors as $key => $approval) {
            $revision_vendor = RevisionRegisterVendor::create([
                'vendor_id' => $vendor_id,
                'user_id' => null,
                'status' => 'menunggu persetujuan',
                'document' => '',
                'approval_role' => $approval->role->name
            ]);
            if($key == 0)
            {
                $user_roles = UserRole::where('role_id', $approval->role_id)->get();
                foreach($user_roles as $user_role)
                {
                    $data['title'] = 'Perubahan Data Menunggu Verifikasi';
                    $data['description'] = 'Perubahan data dengan Nama: ' . $revision_vendor->vendor->name;
                    $data['url'] = '/admin/vendor-profile/' . $revision_vendor->id;

                    Notification::create([
                        'user_id' => $user_role->user_id,
                        'title' => $data['title'],
                        'description' => $data['description'],
                        'url' => $data['url'],
                    ]);
                    $mail = Mail::to($user_role->user->email)->send(new ApproverVendorMail($data));  
                }

                $sla_holiday = SlaHoliday::whereDate('date', $revision_vendor->updated_at)->first();
                $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', $revision_vendor->updated_at);

                while ($sla_holiday || $dateCarbon->isWeekend()) {
                    $dateCarbon->addDay();
                    $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                }
                
                $revision_vendor->update([
                    'sla_at' => $dateCarbon->addHours($approval->sla)
                ]);
            }
        }
        // if($revision == null) {
        //     RevisionRegisterVendor::create([
        //         'vendor_id' => $vendor_id,
        //         'user_id' => null,
        //         'status' => 'menunggu persetujuan',
        //         'document' => '',
        //         'approval_role' => 'purchasing'
        //     ]);

        //     RevisionRegisterVendor::create([
        //         'vendor_id' => $vendor_id,
        //         'user_id' => null,
        //         'status' => 'menunggu persetujuan',
        //         'document' => '',
        //         'approval_role' => 'legal'
        //     ]);

        //     RevisionRegisterVendor::create([
        //         'vendor_id' => $vendor_id,
        //         'user_id' => null,
        //         'status' => 'menunggu persetujuan',
        //         'document' => '',
        //         'approval_role' => 'accounting'
        //     ]);
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vendor $vendor)
    {
        //
    }
}
