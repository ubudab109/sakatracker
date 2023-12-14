<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\SupplierSite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Anotation;
use App\Models\Vendor;
use App\Models\User;
use App\Models\Tax;
use App\Models\CoaVendor;
use App\Models\PaymentTerm;
use App\Models\OracleCoa;
use Inertia\Inertia;
use Storage;
use Auth;

class AdminVendorController extends Controller
{
    public function checkPermission($role)
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        if(!in_array($role . '_vendors', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function generateIdManual() 
    {
        $vendors = Vendor::where('id_manual', null)->get();
        foreach($vendors as $vendor)
        {
            $vendorName = '';
            $explodeName = explode(' ', strtoupper($vendor->name));
            if(count($explodeName) == 2)
            {
                if($explodeName[0] != 'PT.')
                {
                    $word1 = $explodeName[0];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[1];
                    $split_word2 = str_split($word2);

                    $vendorName = $split_word1[0] . $split_word1[1] . $split_word2[count($split_word2) - 1];
                } else {
                    $word1 = $explodeName[1];
                    $split_word1 = str_split($word1);

                    $vendorName = $split_word1[0] . $split_word1[1] . $split_word1[count($split_word1) - 1];
                }
            }

            if(count($explodeName) == 3)
            {
                if($explodeName[0] != 'PT.')
                {
                    $word1 = $explodeName[0];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[1];
                    $split_word2 = str_split($word2);
                    $word3 = $explodeName[2];
                    $split_word3 = str_split($word3);

                    $vendorName = $split_word1[0] . $split_word2[0] . $split_word3[0];
                } else {
                    $word1 = $explodeName[1];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[2];
                    $split_word2 = str_split($word2);

                    $vendorName = $split_word1[0] . $split_word2[0] . $split_word2[count($split_word2) - 1];
                }
            }

            if(count($explodeName) == 4)
            {
                if($explodeName[0] != 'PT.')
                {
                    $word1 = $explodeName[0];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[1];
                    $split_word2 = str_split($word2);
                    $word3 = $explodeName[2];
                    $split_word3 = str_split($word3);
                    $word4 = $explodeName[3];
                    $split_word4 = str_split($word4);

                    $vendorName = $split_word1[0] . $split_word2[0] . $split_word4[count($split_word4) - 1];
                } else {
                    $word1 = $explodeName[1];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[2];
                    $split_word2 = str_split($word2);
                    $word3 = $explodeName[3];
                    $split_word3 = str_split($word3);

                    $vendorName = $split_word1[0] . $split_word2[0] . $split_word3[0];
                }
            }

            if(count($explodeName) >= 5)
            {
                if($explodeName[0] != 'PT.')
                {
                    $word1 = $explodeName[0];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[1];
                    $split_word2 = str_split($word2);
                    $word3 = $explodeName[2];
                    $split_word3 = str_split($word3);
                    $word4 = $explodeName[3];
                    $split_word4 = str_split($word4);

                    $vendorName = $split_word1[0] . $split_word2[0] . $split_word4[count($split_word4) - 1];
                } else {
                    $word1 = $explodeName[1];
                    $split_word1 = str_split($word1);
                    $word2 = $explodeName[2];
                    $split_word2 = str_split($word2);
                    $word3 = $explodeName[3];
                    $split_word3 = str_split($word3);
                    $word4 = $explodeName[4];
                    $split_word4 = str_split($word4);

                    $vendorName = $split_word1[0] . $split_word2[0] . $split_word4[count($split_word4) - 1];
                }
            }

            $checkIdManual = Vendor::where('id_manual', 'like', '%' . $vendorName . '%')->orderBy('updated_at', 'desc')->first();

            if($checkIdManual)
            {
                $angka = '';
                if (preg_match('/\d+/', $checkIdManual->id_manual, $matches)) {
                    $angka = sprintf("%03d", intval($matches[0]) + 1);
                }
                $vendor->update([
                    'id_manual' => $vendorName . $angka
                ]);
            } else {
                $vendor->update([
                    'id_manual' => $vendorName . '001'
                ]);
            }


        }
    }

    public function index()
    {
        $data['permissions'] = $this->checkPermission('index');
        
        // $this->generateIdManual();
        $data['vendors'] = User::with(['vendor_latest' => function ($q) {
            $q->where('status_account', 'disetujui');
            $q->with('user');
        }])
        ->whereHas('vendor_latest', function ($q) {
            $q->where('status_account', 'disetujui');
        })
        ->where('role', 'vendor')
        ->get()
        ->map(function($vendor){
            $vendor['updated_at'] = $vendor->vendor_latest->updated_at;
            return $vendor;
        })
        ->sortByDesc('updated_at')
        ->values();


        return Inertia::render('Admin/Vendor/Index', [
            'data' => $data
        ]);
    }

    public function show($id)
    {
        $data['permissions'] = $this->checkPermission('index');
        $data['vendor'] = Vendor::with('coas')->where('id', $id)->first();
        $data['taxes'] = Tax::all();
        $data['payment_terms'] = PaymentTerm::all();
        $data['supplier_sites'] = SupplierSite::all();

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

        $data['coa'] = [
            'entries' => [],
            // 'currentEntry' => [],
        ];
        $coas = CoaVendor::where('vendor_id', $data['vendor']->id)->get();
        foreach($coas as $key => $coa)
        {
            $data['coa']['entries'][] = [
                'supplier_site' => [$coa->supplier_site],
                'coa_prepayment' => [
                    'coa_prepayment_1' => $coa->coa_prepayment_1,
                    'coa_prepayment_2' => $coa->coa_prepayment_2,
                    'coa_prepayment_3' => $coa->coa_prepayment_3,
                    'coa_prepayment_4' => $coa->coa_prepayment_4,
                    'coa_prepayment_5' => $coa->coa_prepayment_5,
                    'coa_prepayment_6' => $coa->coa_prepayment_6,
                    'coa_prepayment_7' => $coa->coa_prepayment_7,
                ],
                'coa_liability_account' => [
                    'coa_liability_account_1' => $coa->coa_liability_account_1,
                    'coa_liability_account_2' => $coa->coa_liability_account_2,
                    'coa_liability_account_3' => $coa->coa_liability_account_3,
                    'coa_liability_account_4' => $coa->coa_liability_account_4,
                    'coa_liability_account_5' => $coa->coa_liability_account_5,
                    'coa_liability_account_6' => $coa->coa_liability_account_6,
                    'coa_liability_account_7' => $coa->coa_liability_account_7,
                ],
                'coa_receiving' => [
                    'coa_receiving_1' => $coa->coa_receiving_1,
                    'coa_receiving_2' => $coa->coa_receiving_2,
                    'coa_receiving_3' => $coa->coa_receiving_3,
                    'coa_receiving_4' => $coa->coa_receiving_4,
                    'coa_receiving_5' => $coa->coa_receiving_5,
                    'coa_receiving_6' => $coa->coa_receiving_6,
                    'coa_receiving_7' => $coa->coa_receiving_7,
                ],
            ];
        }

        $data['coa_1'] = OracleCoa::where('coa_segment', 1)->get();
        $data['coa_2'] = OracleCoa::where('coa_segment', 2)->get();
        $data['coa_3'] = OracleCoa::where('coa_segment', 3)->get();
        $data['coa_4'] = OracleCoa::where('coa_segment', 4)->get();
        $data['coa_5'] = OracleCoa::where('coa_segment', 5)->get();
        $data['coa_6'] = OracleCoa::where('coa_segment', 6)->get();
        $data['coa_7'] = OracleCoa::where('coa_segment', 7)->get();

        // $data['coa_1'] = [];
        // $data['coa_2'] = [];
        // $data['coa_3'] = [];
        // $data['coa_4'] = [];
        // $data['coa_5'] = [];
        // $data['coa_6'] = [];
        // $data['coa_7'] = [];

        return Inertia::render('Admin/Vendor/Show', [
            'data' => $data,
            'docs' => $docs,
            'newdocs' => $newdocs
        ]);
    }

    public function update($id, Request $request)
    {
        $vendor = Vendor::findOrFail($id);
        if($request->can_edit_top_ppn)
        {
            $vendor->update([
                'top' => $request->top,
                'ppn' => $request->ppn,
            ]);
        }

        if($request->can_edit_pph_coa)
        {
            $vendor->update([
                'pph' => $request->pph,
            ]);

            if($request->coa)
            {
                if(CoaVendor::where('vendor_id', $vendor->id)->first())
                {
                    CoaVendor::where('vendor_id', $vendor->id)->delete();
                }
                if($request->coa['currentEntry'])
                {
                    if($request->coa['currentEntry']['supplier_site'])
                    {
                        CoaVendor::create([
                            'vendor_id' => $vendor->id,
                            'supplier_site' => $request->coa['currentEntry']['supplier_site'][0],
                            'coa_prepayment_1' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_1'],
                            'coa_prepayment_2' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_2'],
                            'coa_prepayment_3' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_3'],
                            'coa_prepayment_4' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_4'],
                            'coa_prepayment_5' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_5'],
                            'coa_prepayment_6' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_6'],
                            'coa_prepayment_7' => $request->coa['currentEntry']['coa_prepayment']['coa_prepayment_7'],

                            'coa_liability_account_1' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_1'],
                            'coa_liability_account_2' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_2'],
                            'coa_liability_account_3' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_3'],
                            'coa_liability_account_4' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_4'],
                            'coa_liability_account_5' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_5'],
                            'coa_liability_account_6' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_6'],
                            'coa_liability_account_7' => $request->coa['currentEntry']['coa_liability_account']['coa_liability_account_7'],

                            'coa_receiving_1' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_1'],
                            'coa_receiving_2' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_2'],
                            'coa_receiving_3' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_3'],
                            'coa_receiving_4' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_4'],
                            'coa_receiving_5' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_5'],
                            'coa_receiving_6' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_6'],
                            'coa_receiving_7' => $request->coa['currentEntry']['coa_receiving']['coa_receiving_7'],
                        ]);
                    }
                }
                if($request->coa['entries'])
                {
                    foreach($request->coa['entries'] as $entry)
                    {
                        // dd($entry['supplier_site'][0]);
                        CoaVendor::create([
                            'vendor_id' => $vendor->id,
                            'supplier_site' => $entry['supplier_site'][0],
                            'coa_prepayment_1' => $entry['coa_prepayment']['coa_prepayment_1'],
                            'coa_prepayment_2' => $entry['coa_prepayment']['coa_prepayment_2'],
                            'coa_prepayment_3' => $entry['coa_prepayment']['coa_prepayment_3'],
                            'coa_prepayment_4' => $entry['coa_prepayment']['coa_prepayment_4'],
                            'coa_prepayment_5' => $entry['coa_prepayment']['coa_prepayment_5'],
                            'coa_prepayment_6' => $entry['coa_prepayment']['coa_prepayment_6'],
                            'coa_prepayment_7' => $entry['coa_prepayment']['coa_prepayment_7'],

                            'coa_liability_account_1' => $entry['coa_liability_account']['coa_liability_account_1'],
                            'coa_liability_account_2' => $entry['coa_liability_account']['coa_liability_account_2'],
                            'coa_liability_account_3' => $entry['coa_liability_account']['coa_liability_account_3'],
                            'coa_liability_account_4' => $entry['coa_liability_account']['coa_liability_account_4'],
                            'coa_liability_account_5' => $entry['coa_liability_account']['coa_liability_account_5'],
                            'coa_liability_account_6' => $entry['coa_liability_account']['coa_liability_account_6'],
                            'coa_liability_account_7' => $entry['coa_liability_account']['coa_liability_account_7'],

                            'coa_receiving_1' => $entry['coa_receiving']['coa_receiving_1'],
                            'coa_receiving_2' => $entry['coa_receiving']['coa_receiving_2'],
                            'coa_receiving_3' => $entry['coa_receiving']['coa_receiving_3'],
                            'coa_receiving_4' => $entry['coa_receiving']['coa_receiving_4'],
                            'coa_receiving_5' => $entry['coa_receiving']['coa_receiving_5'],
                            'coa_receiving_6' => $entry['coa_receiving']['coa_receiving_6'],
                            'coa_receiving_7' => $entry['coa_receiving']['coa_receiving_7'],
                        ]);
                    }
                }
            }
        }

        return redirect()->route('admin.vendor.index');
    }

    public function saveAnotation(Request $request, $id)
    {
        $validatedAnotation = $request->validate([
            'doc_id' => 'required',
            'xdf_string' => 'required'
        ]);

        $existingAnotation = Anotation::where('doc_id', $validatedAnotation['doc_id'])->first();

        if ($existingAnotation) {

            $existingAnotation->update([
                'xdf_string' => $validatedAnotation['xdf_string']
            ]);
        } else {
            Anotation::create($validatedAnotation);
        }

        return to_route('admin.vendor.show', $id);
    }
}
