<?php

namespace App\Http\Controllers;

use App\Models\RevisionExchangeInvoiceAttachment;
use Illuminate\Support\Facades\Redirect;
use App\Models\OracleOutstandingInvoice;
use App\Models\RevisionExchangeInvoice;
use App\Models\ApproverInvoiceItem;
use App\Mail\ApproverInvoiceMail;
use App\Models\ExchangeInvoice;
use App\Models\ApproverInvoice;
use App\Models\OracleRfpView;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\SlaWeekend;
use App\Models\SlaHoliday;
use App\Models\Vendor;
use Inertia\Inertia;
use Carbon\Carbon;
use Storage;
use Auth;
use Mail;

class AdminExchangeInvoiceController extends Controller
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

        if(!in_array($role . '_exchange_invoice', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function generateOutstanding()
    {
        // $outstandings = OracleOutstandingInvoice::get();
        
        // foreach($outstandings as $outstanding)
        // {
        //     $checkExchangeInvoice = ExchangeInvoice::where('invoice_number', $outstanding->invoice_num)->first();
        //     if(!$checkExchangeInvoice)
        //     {
        //         ExchangeInvoice::create([
        //             'invoice_number' => $outstanding->invoice_num,
        //             'date' => $outstanding->invoice_date,
        //             'ppn' => $outstanding->tax_amount,
        //             'total' => $outstanding->total_amount,
        //             'status' => 'disetujui'
        //         ]);
        //     }
        // }
    }

    public function index() {
        $data['permissions'] = $this->checkPermission('index');
        
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        $this->generateOutstanding();

        $revisions = RevisionExchangeInvoice::where('user_id', Auth::user()->id)->get();
        $revisionId = [];
        foreach($revisions as $revision) {
            $checkStatusRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
            ->where('level', $revision->level - 1)
            ->first();
            if($checkStatusRevision) {
                if($checkStatusRevision->status == 'disetujui') {
                    array_push($revisionId, $checkStatusRevision->id);
                }
            }
        }
        $data['invoices'] = ExchangeInvoice::with('purchase_orders')
        ->whereHas('revision_exchange_invoices', function($q) use($permissions, $revisionId){
            if(in_array('is_pic_exchange_invoice', $permissions))
            {
                $q->where('approval_permission', 'is_pic_exchange_invoice');
            } else {
                $q->whereIn('id', $revisionId);
            }
        })
        ->where('status', '!=', 'draft')
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function ($data) {
            if($data['status'] != 'draft')
            {
                $checkRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $data->id)->where('status', '!=', 'disetujui')->first();
                if($checkRevision) {
					if($checkRevision->user) {
						$name = $checkRevision->user->name;
					} else {
						$name = 'PIC Tukar Faktur';
					}
                    $data['status'] = $checkRevision->status . ' ' . $name;
                } else {
                    $checkRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $data->id)->latest()->first();
					if($checkRevision->user) {
						$name = $checkRevision->user->name;
					} else {
						$name = 'PIC Tukar Faktur';
					}
                    if($checkRevision->status == 'disetujui')
                    {
                        $data['status'] = $checkRevision->status;
                    } else {
                        $data['status'] = $checkRevision->status . ' ' . $name;
                    }
                }
            } else {
                $data['status'] = 'draft';
            }
            return $data;
        });

        $exchangeInvoiceOracle = ExchangeInvoice::where('vendor_id', null)->where('is_po', null)->get();

        $data['invoices'] = $data['invoices']->merge($exchangeInvoiceOracle);

        return Inertia::render('Admin/ExchangeInvoice/Index', [
            'data' => $data
        ]);
    }

    public function show($id) {
        $data['invoice'] = ExchangeInvoice::with('purchase_orders', 'exchange_invoice_attachments', 'vendor')->findOrFail($id);
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
        $data['approver_invoices'] = ApproverInvoice::whereHas('approver_invoice_items')->get();
        $listRevisions = RevisionExchangeInvoice::where('exchange_invoice_id', $id)->get();
        $data['timeline'] = [];
        foreach($listRevisions as $revision) {
            $item = [
                'date' => '',
                'title' => '',
                'color' => 'gray',
                'status' => '',
                'body' => '',
            ];
            $item['date'] = $revision->updated_at->format('d-m-Y H:i');
            $item['title'] = $revision->approval_permission != null ? 'PIC Tukar Faktur' : $revision->user->name;
            if($revision->status == 'disetujui') {
                $item['color'] = 'green';
            } else if($revision->status == 'ditolak') {
                $item['color'] = 'red';
            }
            $item['status'] = $revision->status;
            $item['body'] = $revision->note;
            $item['attachments'] = $revision->revision_exchange_invoice_attachments;
            array_push($data['timeline'], $item);
        }

        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }
        
        $data['revision_id'] = null;
        foreach($data['invoice']->revision_exchange_invoices as $revision) {
            $myRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
            ->where('user_id', Auth::user()->id)
            ->first();

            if($myRevision != null) {
                $checkBeforeMyRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                ->where('level', $myRevision->level - 1)
                ->first();
    
                // if($checkBeforeMyRevision->status == 'disetujui' && $myRevision->status == 'menunggu persetujuan') {
                    $data['revision_id'] = $myRevision->id;
                // }
            }

            if($data['revision_id'] == null) {
                if(in_array('is_pic_exchange_invoice', $permissions))
                {
                    $myRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                    ->where('approval_permission', 'is_pic_exchange_invoice')
                    ->where('status', 'menunggu persetujuan')
                    ->first();
                    
                    if($myRevision != null) {
                        $data['revision_id'] = $myRevision->id;
                    }
                }
            }
        }

        $newdocs = [];
        $docs = [];

        if ($data['invoice']->exchange_invoice_attachments) {
            foreach ($data['invoice']->exchange_invoice_attachments as $file) {
                $doc_path = parse_url($file->file, PHP_URL_PATH);
                $nama_doc = basename($doc_path);

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

        $arrayFile = ['invoice', 'tax_invoice', 'quotation', 'bast', 'po'];
        foreach($arrayFile as $array)
        {
            $doc_path = parse_url($data['invoice'][$array], PHP_URL_PATH);
            $nama_doc = basename($doc_path);

            //have edited file
            $folder = explode("/",$doc_path);
            if(count($folder) == 4)
            {
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

        $data['approver_revision_done'] = RevisionExchangeInvoice::with('user')->where('approval_permission', null)->where('exchange_invoice_id', $id)->where('status', 'disetujui')->get();

        $data['outstanding_invoice'] = null;
        // OracleOutstandingInvoice::with('rfp_views')->where('invoice_num', $data['invoice']->invoice_number)->first();

        $data['total_debit'] = $data['outstanding_invoice']->tax_amount ?? 0;
        $data['total_credit'] = $data['outstanding_invoice']->total_amount ?? 0;
        
        if($data['outstanding_invoice'])
        {
            foreach($data['outstanding_invoice']->rfp_views as $rfp_view)
            {
                if((int)$rfp_view->amount_dist > 0)
                {
                    $data['total_debit'] += $rfp_view->amount_dist;
                } else {
                    $data['total_credit'] += $rfp_view->amount_dist;
                }
            }
        }

        $data['printed_date'] = date('d-m-Y H:i:s');

        return Inertia::render('Admin/ExchangeInvoice/Show', [
            'data' => $data,
            'newdocs'=>$newdocs
        ]);
    }

    public function showRfp($id) {
        $data['invoice'] = ExchangeInvoice::with('purchase_orders', 'exchange_invoice_attachments', 'vendor')->findOrFail($id);
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
        $data['approver_invoices'] = ApproverInvoice::whereHas('approver_invoice_items')->get();
        $listRevisions = RevisionExchangeInvoice::where('exchange_invoice_id', $id)->get();
        $data['timeline'] = [];
        foreach($listRevisions as $revision) {
            $item = [
                'date' => '',
                'title' => '',
                'color' => 'gray',
                'status' => '',
                'body' => '',
            ];
            $item['date'] = $revision->updated_at->format('d-m-Y H:i');
            $item['title'] = $revision->approval_permission != null ? 'PIC Tukar Faktur' : $revision->user->name;
            if($revision->status == 'disetujui') {
                $item['color'] = 'green';
            } else if($revision->status == 'ditolak') {
                $item['color'] = 'red';
            }
            $item['status'] = $revision->status;
            $item['body'] = $revision->note;
            $item['attachments'] = $revision->revision_exchange_invoice_attachments;
            array_push($data['timeline'], $item);
        }

        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }
        
        $data['revision_id'] = null;
        foreach($data['invoice']->revision_exchange_invoices as $revision) {
            $myRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
            ->where('user_id', Auth::user()->id)
            ->first();

            if($myRevision != null) {
                $checkBeforeMyRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                ->where('level', $myRevision->level - 1)
                ->first();
    
                // if($checkBeforeMyRevision->status == 'disetujui' && $myRevision->status == 'menunggu persetujuan') {
                    $data['revision_id'] = $myRevision->id;
                // }
            }

            if($data['revision_id'] == null) {
                if(in_array('is_pic_exchange_invoice', $permissions))
                {
                    $myRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                    ->where('approval_permission', 'is_pic_exchange_invoice')
                    ->where('status', 'menunggu persetujuan')
                    ->first();
                    
                    if($myRevision != null) {
                        $data['revision_id'] = $myRevision->id;
                    }
                }
            }
        }

        $newdocs = [];
        $docs = [];

        if ($data['invoice']->exchange_invoice_attachments) {
            foreach ($data['invoice']->exchange_invoice_attachments as $file) {
                $doc_path = parse_url($file->file, PHP_URL_PATH);
                $nama_doc = basename($doc_path);

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

        $arrayFile = ['invoice', 'tax_invoice', 'quotation', 'bast', 'po'];
        foreach($arrayFile as $array)
        {
            $doc_path = parse_url($data['invoice'][$array], PHP_URL_PATH);
            $nama_doc = basename($doc_path);

            //have edited file
            $folder = explode("/",$doc_path);
            if(count($folder) == 4)
            {
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

        $data['approver_revision_done'] = RevisionExchangeInvoice::with('user')->where('approval_permission', null)->where('exchange_invoice_id', $id)->where('status', 'disetujui')->get();

        $data['outstanding_invoice'] = null;
        // OracleOutstandingInvoice::with('rfp_views')->where('invoice_num', $data['invoice']->invoice_number)->first();

        $data['total_debit'] = $data['outstanding_invoice']->tax_amount ?? 0;
        $data['total_credit'] = $data['outstanding_invoice']->total_amount ?? 0;
        
        if($data['outstanding_invoice'])
        {
            foreach($data['outstanding_invoice']->rfp_views as $rfp_view)
            {
                if((int)$rfp_view->amount_dist > 0)
                {
                    $data['total_debit'] += $rfp_view->amount_dist;
                } else {
                    $data['total_credit'] += $rfp_view->amount_dist;
                }
            }
        }

        $data['printed_date'] = date('d-m-Y H:i:s');

        return Inertia::render('Admin/ExchangeInvoice/ShowRfp', [
            'data' => $data,
            'newdocs'=>$newdocs
        ]);
    }

    public function update(Request $request, $id) {
        $data = RevisionExchangeInvoice::findOrFail($id);
        $validateApprovalInvoice = '';
        if($data->status == 'menunggu persetujuan' && $request->disetujui)
        {
            $validateApprovalInvoice = 'required';
        }

        $request->validate([
            'status' => 'required|max:255',
            'note' => $request->status == 'ditolak' ? 'required|max:255' : '',
            'approver_invoice' => $validateApprovalInvoice,
        ]);

        // dd($request->all());

        $data->update([
            'status' => $request->status,
            'note' => $request->note ?? $data->note,
        ]);

        if($request->status == 'ditolak') {
            $data->exchange_invoice->update([
                'status' => 'ditolak',
            ]);

            $notif_vendor = Notification::create([
                'user_id' => $data->exchange_invoice->vendor->user_id,
                'title' => 'Tukar Faktur Ditolak',
                'description' => $request->note,
                'url' => '/exchange-invoice/' . $data->exchange_invoice_id,
            ]);

            $notifMailVendor['title'] = $notif_vendor->title;
            $notifMailVendor['description'] = $notif_vendor->description;
            $notifMailVendor['url'] = $notif_vendor->url;
            Mail::to($data->exchange_invoice->vendor->user->email)->send(new ApproverInvoiceMail($notifMailVendor));

            if($request->reject_user_id)
            {
                $dataRejectUser = RevisionExchangeInvoice::where('exchange_invoice_id', $data->exchange_invoice_id)->where('status', 'disetujui')->where('user_id', $request->reject_user_id)->first();
                if($dataRejectUser)
                {
                    $notifReject = Notification::create([
                        'user_id' => $dataRejectUser->user_id,
                        'title' => 'Tukar Faktur Ditolak ' . $data->user->name,
                        'description' => $request->note,
                        'url' => '/admin/exchange-invoice/' . $dataRejectUser->exchange_invoice_id,
                    ]);
        
                    $notifMailReject['title'] = $notifReject->title;
                    $notifMailReject['description'] = $notifReject->description;
                    $notifMailReject['url'] = $notifReject->url;
                    Mail::to($dataRejectUser->user->email)->send(new ApproverInvoiceMail($notifMailReject));

                    $getLevelHigher = RevisionExchangeInvoice::where('level', '>=', $dataRejectUser->level)->get();
                    foreach($getLevelHigher as $higher)
                    {
                        $revisionApproverUpdate = RevisionExchangeInvoice::where('exchange_invoice_id', $data->exchange_invoice_id)
                        ->where('status', 'disetujui')
                        ->where('user_id', $higher->user_id)
                        ->first();
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
        } else {
            if($data->exchange_invoice->status == 'disetujui' && $data->exchange_invoice->status_approval == '') {
                $data->exchange_invoice->update([
                    'status' => 'menunggu persetujuan',
                ]); 
            } else {
                $data->exchange_invoice->update([
                    'status' => 'sedang berlangsung',
                ]); 
            }
        }

        if($data->user_id != null) {
            $data->exchange_invoice->update([
                'status_approval' => $data->user->name,
            ]);
        }

        if($request->attachment != null) {
            // $data->exchange_invoice_attachments->delete();
            $checkRevisionAttachment = RevisionExchangeInvoiceAttachment::where('r_e_invoice_id', $data->id)->first();
            if($checkRevisionAttachment != null) {
                RevisionExchangeInvoiceAttachment::where('r_e_invoice_id', $data->id)->delete();
            }
            foreach($request->attachment as $attachment) {
                $attachmentPath = '';
                if ($request->hasFile('attachment')) {
                    $save = $attachment->store('public/revision-attachment');
                    $filename = $attachment->hashName();
                    $attachmentPath = url('/') . '/storage/revision-attachment/' . $filename;
                }
                RevisionExchangeInvoiceAttachment::create([
                    'r_e_invoice_id' => $data->id,
                    'file' => $attachmentPath
                ]);
            }
        }
        
        if($request->status == 'disetujui' && $request->approver_invoice != null) {
            $this->generateApprovalInvoice($data->exchange_invoice_id, $data->exchange_invoice->total, $request->approver_invoice);
            $data->exchange_invoice->update([
                'status' => 'sedang berlangsung',
                'status_approval' => 'pic tukar faktur',
                'approver_invoice_id' => $request->approver_invoice
            ]);
        }

        if($request->status == 'disetujui' && $request->approver_invoice == null)
        {
            $dataNext = RevisionExchangeInvoice::where('exchange_invoice_id', $data->exchange_invoice_id)->where('status', 'menunggu persetujuan')->first();
            if($dataNext)
            {
                $notifNext = Notification::create([
                    'user_id' => $dataNext->user_id,
                    'title' => 'Tukar Faktur Menunggu Verifikasi',
                    'description' => 'Tukar Faktur dengan No. Dokumen: ' . $dataNext->exchange_invoice->document_number,
                    'url' => '/admin/exchange-invoice/' . $dataNext->exchange_invoice_id,
                ]);
    
                $notifMailNext['title'] = $notifNext->title;
                $notifMailNext['description'] = $notifNext->description;
                $notifMailNext['url'] = $notifNext->url;
                Mail::to($dataNext->user->email)->send(new ApproverInvoiceMail($notifMailNext));

                $data->update([
                    'submit_at' => date('Y-m-d H:i:s')
                ]);

                $sla_holiday = SlaHoliday::whereDate('date', date('Y-m-d H:i:s'))->first();
                $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

                while ($sla_holiday || $dateCarbon->isWeekend()) {
                    $dateCarbon->addDay();
                    $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                }
                
                $getApproverInvoiceSla = ApproverInvoiceItem::where('user_id', $dataNext->user_id)
                ->where('level', $dataNext->level)
                ->first();

                if($getApproverInvoiceSla)
                {
                    $dataNext->update([
                        'sla_at' => $dateCarbon->addHours($getApproverInvoiceSla->sla)
                    ]);
                }
            } else {
                $data->update([
                    'submit_at' => date('Y-m-d H:i:s')
                ]);
            }
        }

        $checkStatusApproval = RevisionExchangeInvoice::where('exchange_invoice_id', $data->exchange_invoice_id)->whereIn('status', ['menunggu persetujuan', 'ditolak'])->get();
        if(count($checkStatusApproval) < 1) {
            $data->exchange_invoice->update([
                'status' => 'disetujui',
            ]);

            $notif_vendor_done = Notification::create([
                'user_id' => $data->exchange_invoice->vendor->user_id,
                'title' => 'Tukar Faktur Disetujui',
                'description' => 'silahkan login untuk mengecek data',
                'url' => '/exchange-invoice/' . $data->exchange_invoice_id,
            ]);

            $notifMailVendorDone['title'] = $notif_vendor_done->title;
            $notifMailVendorDone['description'] = $notif_vendor_done->description;
            $notifMailVendorDone['url'] = $notif_vendor_done->url;
            Mail::to($data->exchange_invoice->vendor->user->email)->send(new ApproverInvoiceMail($notifMailVendorDone));
        }

        return Redirect::route('admin.exchange-invoice.index');
    }

    public function generateApprovalInvoice($exchange_invoice_id, $total, $approval_invoice_id)
    {
        $approval_invoices = ApproverInvoiceItem::where('approver_invoice_id', $approval_invoice_id)->orderBy('level')->get();
        // dd($approval_invoices);
        $level = 1;
        foreach($approval_invoices as $key => $approval_invoice) {
            if($approval_invoice->end_fee != 0) {
                if((int)$approval_invoice->start_fee  <= (int)$total && (int)$approval_invoice->end_fee >= (int)$total)
                {
                    $revisionExchange = RevisionExchangeInvoice::create([
                        'exchange_invoice_id' => $exchange_invoice_id,
                        'approval_role' => $approval_invoice,
                        'user_id' => $approval_invoice->user_id,
                        'level' => $level,
                        'status' => 'menunggu persetujuan'
                    ]);
                    $level++;

                    if($key == 0)
                    {
                        $notif = Notification::create([
                            'user_id' => $approval_invoice->user_id,
                            'title' => 'Tukar Faktur Menunggu Verifikasi',
                            'description' => 'Tukar Faktur dengan No. Dokumen: ' . $revisionExchange->exchange_invoice->document_number,
                            'url' => 'admin/exchange-invoice/' . $exchange_invoice_id,
                        ]);
            
                        $notifMail['title'] = $notif->title;
                        $notifMail['description'] = $notif->description;
                        $notifMail['url'] = $notif->url;
                        Mail::to($approval_invoice->user->email)->send(new ApproverInvoiceMail($notifMail));

                        $sla_holiday = SlaHoliday::whereDate('date', $revisionExchange->updated_at)->first();
                        $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchange->updated_at);

                        while ($sla_holiday || $dateCarbon->isWeekend()) {
                            $dateCarbon->addDay();
                            $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                        }
                        
                        $revisionExchange->update([
                            'sla_at' => $dateCarbon->addHours($approval_invoice->sla)
                        ]);
                    }
                }
            } else {
                $revisionExchange = RevisionExchangeInvoice::create([
                    'exchange_invoice_id' => $exchange_invoice_id,
                    'approval_role' => $approval_invoice,
                    'user_id' => $approval_invoice->user_id,
                    'level' => $level,
                    'status' => 'menunggu persetujuan'
                ]);
                $level++; 
                if($key == 0)
                {
                    $notif = Notification::create([
                        'user_id' => $approval_invoice->user_id,
                        'title' => 'Tukar Faktur Menunggu Verifikasi',
                        'description' => 'Tukar Faktur dengan No. Dokumen: ' . $revisionExchange->exchange_invoice->document_number,
                        'url' => 'admin/exchange-invoice/' . $exchange_invoice_id,
                    ]);
        
                    $notifMail['title'] = $notif->title;
                    $notifMail['description'] = $notif->description;
                    $notifMail['url'] = $notif->url;
                    Mail::to($approval_invoice->user->email)->send(new ApproverInvoiceMail($notifMail));
                    
                    $sla_holiday = SlaHoliday::whereDate('date', $revisionExchange->updated_at)->first();
                    $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', $revisionExchange->updated_at);

                    while ($sla_holiday || $dateCarbon->isWeekend()) {
                        $dateCarbon->addDay();
                        $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
                    }
                    
                    $revisionExchange->update([
                        'sla_at' => $dateCarbon->addHours($approval_invoice->sla)
                    ]);
                }
            }
        }
    }
}
