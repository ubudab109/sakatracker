<?php

namespace App\Http\Controllers;

use App\Traits\NotifySelfTrait;
use Illuminate\Support\Facades\Redirect;
use App\Models\RevisionRegisterVendor;
use App\Mail\ApproverVendorMail;
use App\Models\ApproverVendor;
use App\Models\SupplierSite;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\PaymentTerm;
use Illuminate\Support\Str;
use App\Models\SlaHoliday;
use App\Models\SlaWeekend;
use App\Models\Anotation;
use App\Models\OracleCoa;
use App\Models\CoaVendor;
use App\Models\UserRole;
use App\Models\Vendor;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Tax;
use App\Models\ShipTo;
use App\Models\BillTo;
use App\Models\VendorAttachment;
use Carbon\Carbon;
use Storage;
use Auth;
use Mail;

class AdminVendorProfileController extends Controller
{
    use NotifySelfTrait;

    public function checkPermission($role)
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        if(!in_array($role . '_vendor_profile', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function generateIdManual($id) 
    {
        $vendors = Vendor::whereIn('id', [$id])->get();
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

    public function index() {
        $data['permissions'] = $this->checkPermission('index');

        $roleUser = [];
        if(Auth::user()->user_role != null) {
            foreach(Auth::user()->user_role as $item) {
                array_push($roleUser, $item->role->name);
            }
        }
        $registerList = RevisionRegisterVendor::
        where('status', 'menunggu persetujuan')
        ->whereDoesntHave('vendor', function($q){
            $q->where('status_account', 'ditolak');
        })
        ->whereHas('vendor.user')
        ->whereIn('approval_role', $roleUser)
        ->orderBy('id', 'desc')
        ->get();

        $vendorIds = []; // Untuk melacak vendor_id yang telah muncul

        $data['revision_vendors'] = $registerList->filter(function ($item) use (&$vendorIds, $roleUser) {
            if (!in_array($item->vendor_id, $vendorIds)) {
                $vendorIds[] = $item->vendor_id; // Menambahkan vendor_id ke dalam array

                $arrayRegister = RevisionRegisterVendor::where('vendor_id', $item->vendor_id)
                ->where('status', 'disetujui')
                ->orderBy('id', 'desc')
                ->first();
				
				if($arrayRegister)
				{
					if($item->id - 1 == $arrayRegister->id)
					{
						return true;
					}
				} else {
					$arrayRegisterCheck = RevisionRegisterVendor::
				    where('vendor_id', $item->vendor_id)
					->where('status', 'menunggu persetujuan')
					->orderBy('id', 'asc')
					->first();
					if($arrayRegisterCheck->id == $item->id)
					{
						return true;
					}
				}
                
            }

            return false;
        })
        ->pluck('id');
		
        $data['revision_vendors'] = RevisionRegisterVendor::with('vendor.user')
        ->whereIn('id', $data['revision_vendors'])
        ->orderBy('id', 'desc')
        ->get();
        return Inertia::render('Admin/VendorProfile/Index', [
            'data' => $data
        ]);
    }

    public function edit($id) {
        $data['permissions'] = $this->checkPermission('verification');
        $data['revision_vendor'] = RevisionRegisterVendor::with('vendor')->where('id', $id)->first();
        $data['vendor_attachments'] = VendorAttachment::where('vendor_id', $data['revision_vendor']->vendor_id)->get();
        // dd($data['vendor_attachments']);
        $data['supplier_sites'] = SupplierSite::all();
        $data['before_revision_vendor'] = RevisionRegisterVendor::with('vendor')->where('vendor_id', $data['revision_vendor']->vendor_id)->where('status', '!=', 'menunggu persetujuan')->orderBy('id', 'desc')->first();
        $data['timeline'] = RevisionRegisterVendor::with('user')->where('vendor_id', $data['revision_vendor']->vendor_id)->orderBy('id')
        ->get()
        ->map(function($timeline){
            $timeline['timestamp'] = date('d-m-Y H:i:s', strtotime($timeline->updated_at));
            return $timeline;
        });

        
        if(count($data['timeline']) == 0) {
            $data['timeline'] = '';
        }

        $data['coa'] = [
            'entries' => [],
            // 'currentEntry' => [],
        ];
        $coas = CoaVendor::where('vendor_id', $data['revision_vendor']->vendor_id)->get();
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

        // $data['coa_1'] = OracleCoa::where('coa_segment', 1)->get();
        // $data['coa_2'] = OracleCoa::where('coa_segment', 2)->get();
        // $data['coa_3'] = OracleCoa::where('coa_segment', 3)->get();
        // $data['coa_4'] = OracleCoa::where('coa_segment', 4)->get();
        // $data['coa_5'] = OracleCoa::where('coa_segment', 5)->get();
        // $data['coa_6'] = OracleCoa::where('coa_segment', 6)->get();
        // $data['coa_7'] = OracleCoa::where('coa_segment', 7)->get();

        $data['coa_1'] = [];
        $data['coa_2'] = [];
        $data['coa_3'] = [];
        $data['coa_4'] = [];
        $data['coa_5'] = [];
        $data['coa_6'] = [];
        $data['coa_7'] = [];

        $data['approver_revision_done'] = RevisionRegisterVendor::with('vendor')->where('vendor_id', $data['revision_vendor']->vendor_id)->where('status', 'disetujui')->get();
        $data['taxes'] = Tax::all();
        $data['payment_terms'] = PaymentTerm::all();
        $data['ship_to'] = ShipTo::all();
        $data['bill_to'] = BillTo::all();
        $data['latest_vendor'] = Vendor::where('user_id', $data['revision_vendor']->vendor->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();

        $newdocs = [];
        $docs = [];

        if ($data['revision_vendor']) {
            foreach ($data['revision_vendor']->vendor->getAttributes() as $key => $value) {
                if($key == 'file_npwp')
                {
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
                        $newdoc = [
                            'edited'=>($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                            'origin'=>Storage::disk('public')->url($fileorigin),
                            'name'=>$folder[count($folder)-2],
                            'ispdf'=>(Str::contains($nama_doc, ".pdf") ? true : false)
                        ];
                        $newdocs[] = $newdoc;
                    }
                }
                if($data['revision_vendor']->vendor->type_of_business != 'PKP')
                {
                    if($key == 'file_non_pkp_statement')
                    {
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
                            $newdoc = [
                                'edited'=>($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                                'origin'=>Storage::disk('public')->url($fileorigin),
                                'name'=>$folder[count($folder)-2],
                                'ispdf'=>(Str::contains($nama_doc, ".pdf") ? true : false)
                            ];
                            $newdocs[] = $newdoc;
                        }
                    }
                }
                if($data['revision_vendor']->vendor->type_of_business != 'Pribadi') {
                    if($key == 'file_sppkp' || $key == 'file_siup' || $key == 'file_tdp' || $key == 'file_nib' || $key == 'file_board_of_directors_composition'){
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
                            $newdoc = [
                                'edited'=>($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                                'origin'=>Storage::disk('public')->url($fileorigin),
                                'name'=>$folder[count($folder)-2],
                                'ispdf'=>(Str::contains($nama_doc, ".pdf") ? true : false)
                            ];
                            $newdocs[] = $newdoc;
                        }
                    }
                }
            }
        }

        // dd($docs);
        return Inertia::render('Admin/VendorProfile/Edit', [
            'data' => $data,
            'docs' => $docs,
            'newdocs' => $newdocs
        ]);
    }

    public function update($id, Request $request) {
        // dd($request->all());
        $roleUser = [];
        if(Auth::user()->user_role != null) {
            foreach(Auth::user()->user_role as $item) {
                foreach($item->role->permissions as $role_permission)
                {
                    array_push($roleUser, $role_permission->name);
                }
            }
        }
        $data = RevisionRegisterVendor::where('id', $id)->first();

        $checkAvailableApprovalAccount = Vendor::where('user_id', $data->vendor->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();

        $top = '';
        $ppn = '';
        $document = '';
        $note = '';
        if(in_array('update_ppn_top_vendor_profile', $roleUser))
        {
            if($request->status == 'disetujui') {
                $top = 'required|string|max:255';
                $ppn = 'required|string|max:255';
            }
        }

        $skb = '';
        $pph = '';
        $coa_prepayment = '';
        $coa_liability_account = '';
        $coa_receiving = '';
        $ship_to = '';
        $bill_to = '';
        if(in_array('update_skb_accounting_vendor_profile', $roleUser))
        {
            if($request->status == 'disetujui') {
                $skb = '';
                $pph = 'required|string|max:255';
                // $coa_prepayment = 'required|string|max:255';
                // $coa_liability_account = 'required|string|max:255';
                // $coa_receiving = 'required|string|max:255';
                $ship_to = 'max:255';
                $bill_to = 'max:255';
            }
        }

        if($request->status == 'ditolak') {
            // $document = 'required|mimes:jpg,png,pdf|max:5000';
            $note = 'string|max:1000';
        }

        $validate_npwp_note = '';
        $validate_sppkp_note = '';
        $validate_siup_note = '';
        $validate_tdp_note = '';
        $validate_nib_note = '';
        $validate_board_of_directors_composition_note = '';
        $validate_non_pkp_statement_note = '';

        $validate_file_npwp_validate = 'required';
        $validate_file_siup_validate = '';
        $validate_file_sppkp_validate = '';
        $validate_file_tdp_validate = '';
        $validate_file_nib_validate = '';
        $validate_file_board_of_directors_composition_validate = '';
        $validate_file_non_pkp_statement_validate = '';
        

        if($request->status == 'ditolak') {
            if($request->file_npwp_validate != 'Terdapat Kesalahan')
            {
                $validate_npwp_note = $request->npwp_note == null ? 'required' : '';
                $validate_file_npwp_validate = 'required';
            }
        }

        if($data->vendor->type_of_business != 'Pribadi' && $data->vendor->type_of_business != 'Pribadi Non PKP')
        {
            $validate_file_siup_validate = 'required';
            $validate_file_sppkp_validate = 'required';
            $validate_file_tdp_validate = '';
            $validate_file_nib_validate = 'required';
            $validate_file_board_of_directors_composition_validate = 'required';
            if($request->status == 'disetujui') {
                $validate_file_siup_validate = 'required|in:acc';
                $validate_file_sppkp_validate = 'required|in:acc';
                if($data->vendor->file_tdp)
                {
                    $validate_file_tdp_validate = 'required|in:acc';
                }
                $validate_file_nib_validate = 'required|in:acc';
                $validate_file_board_of_directors_composition_validate = 'required|in:acc';
            }

            if($request->status == 'ditolak') {
                if($request->file_sppkp_validate != 'Terdapat Kesalahan')
                {
                    $validate_sppkp_note = $request->sppkp_note == null ? 'required' : '';
                    $validate_file_sppkp_validate = 'required';
                }
                if($request->file_siup_validate != 'Terdapat Kesalahan')
                {
                    $validate_siup_note = $request->siup_note == null ? 'required' : '';
                    $validate_file_siup_validate = 'required';
                }
                if($data->vendor->file_tdp)
                {
                    if($request->file_tdp_validate != 'Terdapat Kesalahan')
                    {
                        $validate_tdp_note = $request->tdp_note == null ? 'required' : '';
                        $validate_file_tdp_validate = 'required';
                    }
                }
                if($request->file_nib_validate != 'Terdapat Kesalahan')
                {
                    $validate_nib_note = $request->nib_note == null ? 'required' : '';
                    $validate_file_nib_validate = 'required';
                }
                if($request->file_board_of_directors_composition_validate != 'Terdapat Kesalahan')
                {
                    $validate_board_of_directors_composition_note = $request->board_of_directors_composition_note == null ? 'required' : '';
                    $validate_file_board_of_directors_composition_validate = 'required';
                }
            }
        }

        if($data->vendor->type_of_business != 'PKP')
        {
            $validate_file_non_pkp_statement_validate = 'required';
            if($request->status == 'disetujui') {
                $validate_file_non_pkp_statement_validate = 'required|in:acc';
            }

            if($request->status == 'ditolak') {
                if($request->file_non_pkp_statement_validate != 'Terdapat Kesalahan')
                {
                    $validate_non_pkp_note = $request->non_pkp_note == null ? 'required' : '';
                    $validate_file_non_pkp_statement_validate = 'required';
                }
            }
        }

        $request->validate([
            'status' => 'required|string|max:255',
            'note' => $note,
            'document' => $document,
            'top' => $top,
            'ppn' => $ppn,

            'skb' => $skb,
            'pph' => $pph,
            'coa_prepayment' => $coa_prepayment,
            'coa_liability_account' => $coa_liability_account,
            'coa_receiving' => $coa_receiving,
            'ship_to' => $ship_to,
            'bill_to' => $bill_to,

            'npwp_note' => $validate_npwp_note,
            'sppkp_note' => $validate_sppkp_note,
            'siup_note' => $validate_siup_note,
            'tdp_note' => $validate_tdp_note,
            'nib_note' => $validate_nib_note,
            'board_of_directors_composition_note' => $validate_board_of_directors_composition_note,
            'non_pkp_statement_note' => $validate_non_pkp_statement_note,

            'file_npwp_validate' => $validate_file_npwp_validate,
            'file_sppkp_validate' => $validate_file_sppkp_validate,
            'file_siup_validate' => $validate_file_siup_validate,
            'file_tdp_validate' => $validate_file_tdp_validate,
            'file_nib_validate' => $validate_file_nib_validate,
            'file_board_of_directors_composition_validate' => $validate_file_board_of_directors_composition_validate,
            'file_non_pkp_statement_validate' => $validate_file_non_pkp_statement_validate,
        ]);

        

        $documentPath = $data->document ?? '';
        if ($request->hasFile('document')) {
            $save = $request->file('document')->store('public/document');
            $filename = $request->file('document')->hashName();
            $documentPath = url('/') . '/storage/document/' . $filename;
        }

        $data->update([
            'user_id' => Auth::user()->id,
			 'ppn' => $request->ppn ?? $data->vendor->ppn,
            'top' => $request->top ?? $data->vendor->top,
            'status' => $request->status,
            'note' => $request->note,
            'document' => $documentPath,
        ]);

        if($request->status == 'ditolak')
        {
            $checkRevisiVendorApprove = RevisionRegisterVendor::where('id', $id)->where('vendor_id', $data->vendor_id)->update([
                'status' => 'ditolak'
            ]);
        }

        $data->vendor->update([
            'ppn' => $request->ppn ?? $data->vendor->ppn,
            'top' => $request->top ?? $data->vendor->top,

            'skb' => $request->skb ?? $data->vendor->skb,
            'pph' => $request->pph ?? $data->vendor->pph,
            'ship_to' => $request->ship_to ?? $data->vendor->ship_to,
            'bill_to' => $request->bill_to ?? $data->vendor->bill_to,
            'npwp_note' => $request->file_npwp != 'acc' ? $request->npwp_note ?? $data->vendor->npwp_note : 'acc',
            'sppkp_note' => $request->file_sppkp != 'acc' ? $request->sppkp_note ?? $data->vendor->sppkp_note : 'acc',
            'siup_note' => $request->file_siup != 'acc' ? $request->siup_note ?? $data->vendor->siup_note : 'acc',
            'tdp_note' => $data->vendor->file_tdp ? $request->file_tdp != 'acc' ? $request->tdp_note ?? $data->vendor->tdp_note : 'acc' : null,
            'nib_note' => $request->file_nib != 'acc' ? $request->nib_note ?? $data->vendor->nib_note : 'acc',
            'board_of_directors_composition_note' => $request->file_board_of_directors_composition != 'acc' ? $request->board_of_directors_composition_note ?? $data->vendor->board_of_directors_composition_note : 'acc',
            'non_pkp_statement_note' => $request->file_non_pkp_statement != 'acc' ? $request->non_pkp_statement_note ?? $data->vendor->non_pkp_statement_note : 'acc',
        ]);
		
		if($request->status == 'disetujui')
		{
			$data->vendor->update([
				'ppn' => $request->ppn,
				'top' => $request->top,
				'skb' => $request->skb ?? $data->vendor->skb,
				'pph' => $request->pph ?? $data->vendor->pph,
				'ship_to' => $request->ship_to ?? $data->vendor->ship_to,
				'bill_to' => $request->bill_to ?? $data->vendor->bill_to,
				
				'npwp_note' => null,
				'sppkp_note' => null,
				'siup_note' => null,
				'tdp_note' => null,
				'nib_note' => null,
				'board_of_directors_composition_note' => null,
				'non_pkp_statement_note' => null,
			]);
		}

        if($request->coa)
        {
            if(CoaVendor::where('vendor_id', $data->vendor_id)->first())
            {
                CoaVendor::where('vendor_id', $data->vendor_id)->delete();
            }
            if($request->coa['currentEntry'])
            {
                if($request->coa['currentEntry']['supplier_site'])
                {
                    CoaVendor::create([
                        'vendor_id' => $data->vendor_id,
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
                        'vendor_id' => $data->vendor_id,
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

        if($request->status == 'ditolak') {        
            $data->vendor->update([
                'status_account' => 'ditolak'
            ]);

            $notif_vendor = Notification::create([
                'user_id' => $data->vendor->user_id,
                'title' => $checkAvailableApprovalAccount ? 'Perubahan Data Ditolak' : 'Registrasi Data Ditolak',
                'description' => $request->note,
                'url' => '/data-change/' . $data->vendor->id,
            ]);

            $notifMailVendor['title'] = $notif_vendor->title;
            $notifMailVendor['description'] = $notif_vendor->description;
            $notifMailVendor['url'] = $notif_vendor->url;
            Mail::to($data->vendor->user->email)->send(new ApproverVendorMail($notifMailVendor));

            if($request->approval_role)
            {
                $role = Role::where('name', $request->approval_role)->first();
                if($role)
                {
                    $revisionApprover = RevisionRegisterVendor::where('vendor_id', $data->vendor_id)->where('approval_role', $request->approval_role)->first();
                    $user_roles = UserRole::where('role_id', $role->id)->get();
                    foreach($user_roles as $user_role)
                    {
                        $notifApprover['title'] = $checkAvailableApprovalAccount ? 'Perubahan Data Ditolak'  . $data->approval_role : 'Registrasi Data Ditolak' . $data->approval_role;
                        $notifApprover['description'] = $request->note;
                        $notifApprover['url'] = '/admin/vendor-profile/' . $revisionApprover->id;

                        Notification::create([
                            'user_id' => $user_role->user_id,
                            'title' => $notifApprover['title'],
                            'description' => $notifApprover['description'],
                            'url' => $notifApprover['url'],
                        ]);
                        $mail = Mail::to($user_role->user->email)->send(new ApproverVendorMail($notifApprover));
                    }

                    $checkLevel = ApproverVendor::where('role_id', $role->id)->first();
                    if($checkLevel)
                    {
                        $getLevelHigher = ApproverVendor::where('level', '>=', $checkLevel->level)->get();
                        foreach($getLevelHigher as $higher)
                        {
                            $revisionApproverUpdate = RevisionRegisterVendor::where('vendor_id', $data->vendor_id)
                            ->where('status', 'disetujui')
                            ->where('approval_role', $higher->role->name)->first();
                            if($revisionApproverUpdate)
                            {
                                if($revisionApproverUpdate->id != $data->id)
                                {
                                    $revisionApproverUpdate->update([
                                        'status' => 'menunggu persetujuan'
                                    ]);
                                }
                            }
                        }
                    }
                }

            }

            $this->notifySelf(Auth::user()->id, $checkAvailableApprovalAccount ? 'Perubahan Data' : 'Registrasi Data', 'Berhasil menolak data: ' . $data->vendor->name, '/admin/vendor/' . $data->vendor_id);
        } else {
            foreach($roleUser as $role) {
                $checkStatus = RevisionRegisterVendor::where('vendor_id', $data->vendor_id)->where('approval_role', $role)->first();
                if($checkStatus) {
                    if($checkStatus->status_account != 'disetujui') {
                        $checkStatus->update([
                            'status' => 'disetujui',
                            'user_id' => Auth::user()->id,
                            'submit_at' => date('Y-m-d H:i:s')
                        ]);
                    }
                }
            }

            $checkNextApproval = RevisionRegisterVendor::where('vendor_id', $data->vendor_id)->where('status', 'menunggu persetujuan')->orderBy('id')->first();
            if($checkNextApproval)
            {
                $role = Role::where('name', $checkNextApproval->approval_role)->first();
                if($role)
                {
                    $approval_vendor = ApproverVendor::where('role_id', $role->id)->first();
                    $user_roles = UserRole::where('role_id', $approval_vendor->role_id)->get();
                    foreach($user_roles as $user_role)
                    {
                        $notifApprover['title'] = $checkAvailableApprovalAccount ? 'Perubahan Data Menunggu Verifikasi' : 'Registrasi Data Menunggu Verifikasi';
                        $notifApprover['description'] = $checkAvailableApprovalAccount ? 'Perubahan data dengan Nama:' . $checkNextApproval->vendor->name : 'Registrasi data dengan Nama:' . $checkNextApproval->vendor->name;
                        $notifApprover['url'] = '/admin/vendor-profile/' . $checkNextApproval->id;

                        Notification::create([
                            'user_id' => $user_role->user_id,
                            'title' => $notifApprover['title'],
                            'description' => $notifApprover['description'],
                            'url' => $notifApprover['url'],
                        ]);
                        $mail = Mail::to($user_role->user->email)->send(new ApproverVendorMail($notifApprover));  
                    }

                    $sla_holiday = SlaHoliday::whereDate('date', date('Y-m-d H:i:s'))->first();
                    $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

                    while ($sla_holiday || $dateCarbon->isWeekend()) {
                        $dateCarbon->addDay();
                        $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                    }
                    
                    $getApproverVendorSla = ApproverVendor::where('role_id', $role->id)->first();
                    if($getApproverVendorSla)
                    {
                        $checkNextApproval->update([
                            'sla_at' => $dateCarbon->addHours($getApproverVendorSla->sla)
                        ]);
                    }
                }
            }

            $checkStatusApproval = RevisionRegisterVendor::where('vendor_id', $data->vendor_id)->whereIn('status', ['menunggu persetujuan', 'ditolak'])->get();
            if(count($checkStatusApproval) < 1) {
                $data->vendor->update([
                    'status_account' => 'disetujui',
                ]);

                $notif_vendor = Notification::create([
                    'user_id' => $data->vendor->user_id,
                    'title' => $checkAvailableApprovalAccount ? 'Perubahan Data Aktif' : 'Registrasi Data Aktif',
                    'description' => 'Silahkan login',
                    'url' => '/login',
                ]);
    
                $notifMailVendor['title'] = $notif_vendor->title;
                $notifMailVendor['description'] = $notif_vendor->description;
                $notifMailVendor['url'] = $notif_vendor->url;
                Mail::to($data->vendor->user->email)->send(new ApproverVendorMail($notifMailVendor));

                if($checkAvailableApprovalAccount)
                {
                    $data->vendor->update([
                        'id_manual' => $checkAvailableApprovalAccount->id_manual
                    ]);
                } else {
                    $this->generateIdManual($data->vendor_id);
                }
            }

            $this->notifySelf(Auth::user()->id, $checkAvailableApprovalAccount ? 'Perubahan Data' : 'Registrasi Data',  'Berhasil menyetujui data: ' . $data->vendor->name, '/admin/vendor/' . $data->vendor_id);
        }

        return redirect()->route('admin.vendor.show', $data->vendor_id);
    }
}
