<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\RevisionRegisterVendor;
use App\Mail\ApproverVendorMail;
use App\Models\ApproverVendor;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\PaymentTerm;
use Illuminate\Support\Str;
use App\Models\SlaHoliday;
use App\Models\SlaWeekend;
use App\Models\Anotation;
use App\Models\UserRole;
use App\Models\Vendor;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Tax;
use Carbon\Carbon;
use Storage;
use Auth;
use Mail;

class AdminVendorProfileController extends Controller
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
        $registerList = RevisionRegisterVendor::where('status', 'menunggu persetujuan')
        ->whereIn('approval_role', $roleUser)
        ->get();

        $vendorIds = []; // Untuk melacak vendor_id yang telah muncul

        $data['revision_vendors'] = $registerList->filter(function ($item) use (&$vendorIds, $roleUser) {
            if (!in_array($item->vendor_id, $vendorIds)) {
                $vendorIds[] = $item->vendor_id; // Menambahkan vendor_id ke dalam array

                $arrayRegister = RevisionRegisterVendor::where('vendor_id', $item->vendor_id)->get();
                
                foreach ($arrayRegister as $key => $item2) {
                    if (in_array($item2->approval_role, $roleUser)) {
                        if ($key > 0 && $arrayRegister[$key - 1]->status == 'disetujui') {
                            return true;
                        } elseif ($key == 0) {
                            return true;
                        }
                    }
                }
            }

            return false;
        })
        ->pluck('id'); // Mengambil nilai id dari hasil filter

        $data['revision_vendors'] = RevisionRegisterVendor::with('vendor')
        ->whereIn('id', $data['revision_vendors'])
        ->orderBy('updated_at')
        ->get();

        return Inertia::render('Admin/VendorProfile/Index', [
            'data' => $data
        ]);
    }

    public function edit($id) {
        // $roleUser = [];
        // if(Auth::user()->user_role != null) {
        //     foreach(Auth::user()->user_role as $item) {
        //         array_push($roleUser, $item->role->name);
        //     }
        // }
        // $data['show_ppn_top'] = false;
        // if(in_array('accounting', $roleUser) || in_array('purchasing', $roleUser)) {
        //     $data['show_ppn_top'] = true;
        // }
        $data['permissions'] = $this->checkPermission('verification');
        
        $data['revision_vendor'] = RevisionRegisterVendor::with('vendor')->where('id', $id)->first();
        $data['approver_revision_done'] = RevisionRegisterVendor::with('vendor')->where('vendor_id', $data['revision_vendor']->vendor_id)->where('status', 'disetujui')->get();
        $data['taxes'] = Tax::all();
        $data['payment_terms'] = PaymentTerm::all();
        $data['latest_vendor'] = Vendor::where('user_id', $data['revision_vendor']->vendor->user_id)->where('status_account', 'disetujui')->latest('created_at')->first();

        $newdocs = [];
        $docs = [];

        if ($data['revision_vendor']) {
            foreach ($data['revision_vendor']->vendor->getAttributes() as $key => $value) {
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

        // dd($docs);
        return Inertia::render('Admin/VendorProfile/Edit', [
            'data' => $data,
            'docs' => $docs,
            'newdocs' => $newdocs
        ]);
    }

    public function update($id, Request $request) {
        $roleUser = [];
        if(Auth::user()->user_role != null) {
            foreach(Auth::user()->user_role as $item) {
                array_push($roleUser, $item->role->name);
            }
        }
        $data = RevisionRegisterVendor::where('id', $id)->first();
        $top = '';
        $ppn = '';
        $document = '';
        $note = '';
        if(in_array('accounting', $roleUser) || in_array('purchasing', $roleUser))
        {
            $top = 'required|string|max:255';
            $ppn = 'required|string|max:255';
        }

        if($request->status == 'ditolak') {
            // $document = 'required|mimes:jpg,png,pdf|max:2048';
            $note = 'required|string|max:1000';
        }

        $request->validate([
            'status' => 'required|string|max:255',
            'note' => $note,
            'document' => $document,
            'top' => $top,
            'ppn' => $ppn,
        ]);

        $documentPath = $data->document ?? '';
        if ($request->hasFile('document')) {
            $save = $request->file('document')->store('public/document');
            $filename = $request->file('document')->hashName();
            $documentPath = url('/') . '/storage/document/' . $filename;
        }

        $data->update([
            'user_id' => Auth::user()->id,
            'status' => $request->status,
            'note' => $request->note,
            'document' => $documentPath,
            'ppn' => $request->ppn ?? '',
            'top' => $request->top ?? '',
        ]);

        $data->vendor->update([
            'ppn' => $request->ppn ?? $data->vendor->ppn,
            'top' => $request->top ?? $data->vendor->top,
            'npwp_note' => $request->npwp_note ?? $data->vendor->npwp_note,
            'sppkp_note' => $request->sppkp_note ?? $data->vendor->sppkp_note,
            'siup_note' => $request->siup_note ?? $data->vendor->siup_note,
            'tdp_note' => $request->tdp_note ?? $data->vendor->tdp_note,
            'nib_note' => $request->nib_note ?? $data->vendor->nib_note,
            'board_of_directors_composition_note' => $request->board_of_directors_composition_note ?? $data->vendor->board_of_directors_composition_note,
            'non_pkp_statement_note' => $request->non_pkp_statement_note ?? $data->vendor->non_pkp_statement_note,
        ]);

        if($request->status == 'ditolak') {        
            $data->vendor->update([
                'status_account' => 'ditolak'
            ]);

            $notif_vendor = Notification::create([
                'user_id' => $data->vendor->user_id,
                'title' => 'Perubahan Data Ditolak',
                'description' => $request->note,
                'url' => '/vendor/' . $data->vendor->id,
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
                        $notifApprover['title'] = 'Perubahan Data Ditolak ' . $data->approval_role;
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

                        $checkNextApproval = RevisionRegisterVendor::where('vendor_id', $data->vendor_id)->where('status', 'menunggu persetujuan')->first();
                        if($checkNextApproval)
                        {
                            $role = Role::where('name', $checkNextApproval->approval_role)->first();
                            if($role)
                            {
                                $user_roles = UserRole::where('role_id', $role->id)->get();
                                foreach($user_roles as $user_role)
                                {
                                    $notifApprover['title'] = 'Perubahan Data Menunggu Verifikasi';
                                    $notifApprover['description'] = 'Perubahan data dengan Kode: ' . $checkNextApproval->vendor->id_manual;
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
                    'title' => 'Perubahan Data Aktif',
                    'description' => 'Silahkan login',
                    'url' => '/login',
                ]);
    
                $notifMailVendor['title'] = $notif_vendor->title;
                $notifMailVendor['description'] = $notif_vendor->description;
                $notifMailVendor['url'] = $notif_vendor->url;
                Mail::to($data->vendor->user->email)->send(new ApproverVendorMail($notifMailVendor));

                $this->generateIdManual($data->vendor_id);
            }
        }

        return Redirect::route('admin.vendor-profile.edit', $data->id);
    }
}
