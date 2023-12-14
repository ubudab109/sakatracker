<?php

namespace App\Http\Controllers;

use App\Traits\NotifySelfTrait;
use Illuminate\Support\Facades\Redirect;
use App\Models\RevisionRegisterVendor;
use App\Models\Anotation;
use Illuminate\Support\Str;
use Storage;
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
    use NotifySelfTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['vendors'] = Vendor::where('user_id', Auth::user()->id)->orderBy('updated_at', 'desc')->get();
        $data['latest'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest('created_at')->first();

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
        $data['vendor'] = Vendor::with('user')->where('user_id', $data['auth']->id)->latest('created_at')->first();
        $arrayNameFile = ['file_npwp', 'file_sppkp', 'file_siup', 'file_tdp', 'file_nib', 'file_board_of_directors_composition', 'file_non_pkp_statement'];
        foreach($arrayNameFile as $name)
        {
            $nameFile = $name;
            $name = url('/storage/') . '/' . $name . '/'; 
            $testExplode = explode($name, $data['vendor'][$nameFile]);
            $data['vendor'][$nameFile . '_name'] = $nameFile . '.pdf';
            if(count($testExplode) == 2)
            {
                $data['vendor'][$nameFile . '_name'] = $testExplode[1];
            }
        }
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
                'suffix' => $request->type_of_business != 'Pribadi' ? $request->legality == null ? 'required' : '' : '',
                'legality' => $request->type_of_business != 'Pribadi' ? $request->suffix == null ? 'required' : '' : '',
            ]);
        }

        $npwpPath = $data->file_npwp ?? '';
        if ($request->hasFile('file_npwp')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_npwp')->getClientOriginalName();
            $save = $request->file('file_npwp')->storeAs('public/file_npwp', $filename);
            $npwpPath = url('/') . '/storage/file_npwp/' . $filename;
        }

        $sppkpPath = $data->file_sppkp ?? '';
        if ($request->hasFile('file_sppkp')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_sppkp')->getClientOriginalName();
            $save = $request->file('file_sppkp')->storeAs('public/file_sppkp', $filename);
            $sppkpPath = url('/') . '/storage/file_sppkp/' . $filename;
        }

        $siupPath = $data->file_siup ?? '';
        if ($request->hasFile('file_siup')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_siup')->getClientOriginalName();
            $save = $request->file('file_siup')->storeAs('public/file_siup', $filename);
            $siupPath = url('/') . '/storage/file_siup/' . $filename;
        }

        $tdpPath = $data->file_tdp ?? '';
        if ($request->hasFile('file_tdp')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_tdp')->getClientOriginalName();
            $save = $request->file('file_tdp')->storeAs('public/file_tdp', $filename);
            $tdpPath = url('/') . '/storage/file_tdp/' . $filename;
        }

        $nibPath = $data->file_nib ?? '';
        if ($request->hasFile('file_nib')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_nib')->getClientOriginalName();
            $save = $request->file('file_nib')->storeAs('public/file_nib', $filename);
            $nibPath = url('/') . '/storage/file_nib/' . $filename;
        }

        $directorsPath = $data->file_board_of_directors_composition ?? '';
        if ($request->hasFile('file_board_of_directors_composition')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_board_of_directors_composition')->getClientOriginalName();
            $save = $request->file('file_board_of_directors_composition')->storeAs('public/file_board_of_directors_composition', $filename);
            $directorsPath = url('/') . '/storage/file_board_of_directors_composition/' . $filename;
        }

        $nonPkpPath = $data->file_non_pkp_statement ?? '';
        if ($request->hasFile('file_non_pkp_statement')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_non_pkp_statement')->getClientOriginalName();
            $save = $request->file('file_non_pkp_statement')->storeAs('public/file_non_pkp_statement', $filename);
            $nonPkpPath = url('/') . '/storage/file_non_pkp_statement/' . $filename;
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
            'file_non_pkp_statement' => $nonPkpPath,

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

        $checkAvailableApprovalAccount = Vendor::where('user_id', $data->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();

        if($request->status_submit == 'pengajuan perubahan') { 
            $this->createRevisionTimeline($vendor->id);

            $this->notifySelf(Auth::user()->id, $checkAvailableApprovalAccount ? 'Perubahan data' : 'Registrasi Data', $checkAvailableApprovalAccount ? 'Berhasil pengajuan perubahan data' : 'Berhasil pengajuan registrasi data', '/vendor');
        } else {
            $this->notifySelf(Auth::user()->id, $checkAvailableApprovalAccount ? 'Perubahan data' : 'Registrasi Data', 'Berhasil simpan draft data', '/vendor');
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
        $data['vendor'] = Vendor::with('coas')->where('id', $id)->where('user_id', $data['auth']->id)->first();
        $data['timeline'] = RevisionRegisterVendor::with('user')->where('vendor_id', $data['vendor']->id)->get();

        $data['checkRejectedData'] = RevisionRegisterVendor::where('vendor_id', $data['vendor']->id)->where('status', 'ditolak')->first();
        
        if(count($data['timeline']) == 0) {
            $data['timeline'] = '';
        }

        $newdocs = [];
        $docs = [];

        if ($data['vendor']) {
            foreach ($data['vendor']->getAttributes() as $key => $value) {
                if (strpos($key, "file_") === 0 && !empty($value)) {
                    $doc_path = parse_url($value, PHP_URL_PATH);
                    $nama_doc = basename($doc_path);

                    $doc = Anotation::where('doc_id', $nama_doc)->first();
                    if ($doc) array_push($docs, $doc);

                    //have edited file
                    $folder = explode("/",$doc_path);
                    $fileorigin = $folder[count($folder)-2].'/'.$folder[count($folder)-1];
                    $fileedited = $folder[count($folder)-2].'/edited_'.$folder[count($folder)-1];
                    $exist = Storage::disk('public')->exists($fileedited);
                    // $newdoc = [
                        // 'edited'=>($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                        // 'origin'=>Storage::disk('public')->url($fileorigin),
                        // 'name'=>$folder[count($folder)-2],
                        // 'ispdf'=>(Str::contains($nama_doc, ".pdf") ? true : false)
                    // ];
                    $data['vendor'][$folder[count($folder)-2]] = ($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin));
                }
            }
        }

        // $data['vendor']['newdocs'] = $newdocs;

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
        $data['checkVerifiedData'] = Vendor::with('user')->where('user_id', $data['auth']->id)->where('status_account', 'disetujui')->first() == null ? 404 : 200;
        $data['vendor'] = Vendor::with('user')->where('id', $id)->where('user_id', $data['auth']->id)->first();

        $arrayNameFile = ['file_npwp', 'file_sppkp', 'file_siup', 'file_tdp', 'file_nib', 'file_board_of_directors_composition', 'file_non_pkp_statement'];
        foreach($arrayNameFile as $name)
        {
            $nameFile = $name;
            $name = url('/storage/') . '/' . $name . '/'; 
            $testExplode = explode($name, $data['vendor'][$nameFile]);
            $data['vendor'][$nameFile . '_name'] = 'No File Chosen';
            if(count($testExplode) == 2)
            {
                $data['vendor'][$nameFile . '_name'] = $testExplode[1];
            }
        }
        
        return Inertia::render('Vendor/Profile/Edit', [
            'data' => $data,
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

                if($data->npwp_note != null && $data->npwp_note != 'acc' && $data->npwp_note != 'done revisi') {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->sppkp_note != null && $data->sppkp_note != 'acc' && $data->sppkp_note != 'done revisi') {$file_sppkp = 'required|mimes:pdf|max:5000';}
                if($data->siup_note != null && $data->siup_note != 'acc' && $data->siup_note != 'done revisi') {$file_siup = 'required|mimes:pdf|max:5000';}
                if($data->tdp_note != null && $data->tdp_note != 'acc' && $data->tdp_note != 'done revisi') {$file_tdp = 'required|mimes:pdf|max:5000';}
                if($data->nib_note != null && $data->nib_note != 'acc' && $data->nib_note != 'done revisi') {$file_nib = 'required|mimes:pdf|max:5000';}
                if($data->board_of_directors_composition_note != null && $data->board_of_directors_composition_note != 'acc' && $data->board_of_directors_composition_note != 'done revisi') {$file_board_of_directors_composition = 'required|mimes:pdf|max:5000';}
            }
            if($request->type_of_business == 'Non PKP') {
                if($data->file_non_pkp_statement == null) {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                if($data->non_pkp_statement_note != null && $data->non_pkp_statement_note != 'acc' && $data->non_pkp_statement_note != 'done revisi') {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                // if($data->file_front_page_bank == null) {$file_front_page_bank = 'required|mimes:pdf|max:5000';}
                // if($data->file_bank_account_statement_letter == null) {$file_bank_account_statement_letter = 'required|mimes:pdf|max:5000';}
            }
            if($request->type_of_business == 'Pribadi') {
                if($data->file_npwp == null) {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->file_non_pkp_statement == null) {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
                if($data->npwp_note != null && $data->npwp_note != 'acc' && $data->npwp_note != 'done revisi') {$file_npwp = 'required|mimes:pdf|max:5000';}
                if($data->non_pkp_statement_note != null && $data->non_pkp_statement_note != 'acc' && $data->non_pkp_statement_note != 'done revisi') {$file_non_pkp_statement = 'required|mimes:pdf|max:5000';}
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
                'suffix' => $request->type_of_business != 'Pribadi' ? $request->legality == null ? 'required' : '' : '',
                'legality' => $request->type_of_business != 'Pribadi' ? $request->suffix == null ? 'required' : '' : '',
            ]);
        }

        $npwpPath = $data->file_npwp ?? '';
        $npwpNote = $data->npwp_note != 'acc' ? $data->npwp_note : 'acc';
        if ($request->hasFile('file_npwp')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_npwp')->getClientOriginalName();
            $save = $request->file('file_npwp')->storeAs('public/file_npwp', $filename);
            $npwpPath = url('/') . '/storage/file_npwp/' . $filename;
            $npwpNote = 'done revisi';
        }

        $sppkpPath = $data->file_sppkp ?? '';
        $sppkpNote = $data->sppkp_note != 'acc' ? $data->sppkp_note : 'acc';
        if ($request->hasFile('file_sppkp')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_sppkp')->getClientOriginalName();
            $save = $request->file('file_sppkp')->storeAs('public/file_sppkp', $filename);
            $sppkpPath = url('/') . '/storage/file_sppkp/' . $filename;
            $sppkpNote = 'done revisi';
        }

        $siupPath = $data->file_siup ?? '';
        $siupNote = $data->siup_note != 'acc' ? $data->siup_note : 'acc';
        if ($request->hasFile('file_siup')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_siup')->getClientOriginalName();
            $save = $request->file('file_siup')->storeAs('public/file_siup', $filename);
            $siupPath = url('/') . '/storage/file_siup/' . $filename;
            $siupNote = 'done revisi';
        }

        $tdpPath = $data->file_tdp ?? '';
        $tdpNote = $data->tdp_note != 'acc' ? $data->tdp_note : 'acc';
        if ($request->hasFile('file_tdp')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_tdp')->getClientOriginalName();
            $save = $request->file('file_tdp')->storeAs('public/file_tdp', $filename);
            $tdpPath = url('/') . '/storage/file_tdp/' . $filename;
            $tdpNote = 'done revisi';
        }

        $nibPath = $data->file_nib ?? '';
        $nibNote = $data->nib_note != 'acc' ? $data->nib_note : 'acc';
        if ($request->hasFile('file_nib')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_nib')->getClientOriginalName();
            $save = $request->file('file_nib')->storeAs('public/file_nib', $filename);
            $nibPath = url('/') . '/storage/file_nib/' . $filename;
            $nibNote = 'done revisi';
        }

        $directorsPath = $data->file_board_of_directors_composition ?? '';
        $bodcNote = $data->board_of_directors_composition_note != 'acc' ? $data->board_of_directors_composition_note : 'acc';
        if ($request->hasFile('file_board_of_directors_composition')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_board_of_directors_composition')->getClientOriginalName();
            $save = $request->file('file_board_of_directors_composition')->storeAs('public/file_board_of_directors_composition', $filename);
            $directorsPath = url('/') . '/storage/file_board_of_directors_composition/' . $filename;
            $bodcNote = 'done revisi';
        }

        $nonPkpPath = $data->file_non_pkp_statement ?? '';
        $nonpkpNote = $data->non_pkp_statement_note != 'acc' ? $data->non_pkp_statement_note : 'acc';
        if ($request->hasFile('file_non_pkp_statement')) {
            $filename = date('YmdHis') . rand(10, 99) . '_' . $request->file('file_non_pkp_statement')->getClientOriginalName();
            $save = $request->file('file_non_pkp_statement')->storeAs('public/file_non_pkp_statement', $filename);
            $nonPkpPath = url('/') . '/storage/file_non_pkp_statement/' . $filename;
            $nonpkpNote = 'done revisi';
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
            'file_non_pkp_statement' => $nonPkpPath,

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

            'npwp_note' => $npwpNote,
            'sppkp_note' => $sppkpNote,
            'siup_note' => $siupNote,
            'tdp_note' => $tdpNote,
            'nib_note' => $nibNote,
            'board_of_directors_composition_note' => $bodcNote,
            'non_pkp_statement_note' => $nonpkpNote,
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
            $checkRejectedData = RevisionRegisterVendor::where('vendor_id', $data->id)->where('status', 'ditolak')->orderBy('id')->get();
            foreach($checkRejectedData as $key => $rejectedData) {
                RevisionRegisterVendor::where('id', $rejectedData->id)->where('status', 'ditolak')->update([
                    'status' => 'menunggu persetujuan'
                ]);

                if($key == 0)
                {
                    $approval_vendor = ApproverVendor::where('level', 1)->first();
                    $user_roles = UserRole::where('role_id', $approval_vendor->role_id)->get();
                    $checkAvailableApprovalAccount = Vendor::where('user_id', $data->user->id)->where('status_account', 'disetujui')->latest('created_at')->first();
                    foreach($user_roles as $user_role)
                    {
                        $notif['title'] = $checkAvailableApprovalAccount ? 'Perubahan Data Menunggu Verifikasi' : 'Registrasi Data Menunggu Verifikasi';
                        $notif['description'] = $checkAvailableApprovalAccount ? 'Perubahan data dengan Nama: ' . $rejectedData->vendor->name : 'Registrasi data dengan Nama: ' . $rejectedData->vendor->name;
                        $notif['url'] = '/admin/vendor-profile/' . $rejectedData->id;
    
                        Notification::create([
                            'user_id' => $user_role->user_id,
                            'title' => $notif['title'],
                            'description' => $notif['description'],
                            'url' => $notif['url'],
                        ]);
                        $mail = Mail::to($user_role->user->email)->send(new ApproverVendorMail($notif));  
                    }
                }

                $sla_holiday = SlaHoliday::whereDate('date', $rejectedData->updated_at)->first();
                $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', $rejectedData->updated_at);

                while ($sla_holiday || $dateCarbon->isWeekend()) {
                    $dateCarbon->addDay();
                    $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                }
                
                $checkRole = UserRole::where('user_id', $rejectedData->user_id)->first();
                $getApproverVendorSla = ApproverVendor::where('role_id', $rejectedData->role_id)->first();
                if($getApproverVendorSla)
                {
                    $rejectedData->update([
                        'sla_at' => $dateCarbon->addHours($getApproverVendorSla->sla)
                    ]);
                }
            }
            $checkAvailableApprovalAccount = Vendor::where('user_id', $data->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();

            $this->notifySelf(Auth::user()->id, $checkAvailableApprovalAccount ? 'Perubahan data' : 'Registrasi Data', $checkAvailableApprovalAccount ? 'Berhasil pengajuan perubahan data' : 'Berhasil pengajuan registrasi data', '/vendor');
            return Redirect::route('vendor.show', $data->id);
        } else {
            $checkAvailableApprovalAccount = Vendor::where('user_id', $data->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();
            $this->notifySelf(Auth::user()->id, $checkAvailableApprovalAccount ? 'Perubahan data' : 'Registrasi Data', 'Berhasil simpan draft data', '/vendor');
            
            return Redirect::route('vendor.edit', $data->id);
        }

        
    }

    public function createRevisionTimeline($vendor_id) {
        $revision = RevisionRegisterVendor::where('vendor_id', $vendor_id)->first();
        $approval_vendors = ApproverVendor::orderBy('level')->get();
        $vendor = Vendor::where('id', $vendor_id)->first();
        $checkAvailableApprovalAccount = Vendor::where('user_id', $vendor->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();
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
                    $data['title'] = $checkAvailableApprovalAccount ? 'Perubahan Data Menunggu Verifikasi' : 'Registrasi Data Menunggu Verifikasi';
                    $data['description'] = $checkAvailableApprovalAccount ? 'Perubahan data dengan Nama: ' . $revision_vendor->vendor->name : 'Registrasi data dengan Nama: ' . $revision_vendor->vendor->name;
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
