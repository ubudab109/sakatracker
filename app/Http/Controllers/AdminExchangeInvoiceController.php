<?php

namespace App\Http\Controllers;

use App\Models\ApproverPayment;
use App\Models\BatchPaymentInvoice;
use App\Models\BatchPayment;
use App\Models\RevisionBatchPayment;
use App\Models\RevisionExchangeInvoiceAttachment;
use Illuminate\Support\Facades\Redirect;
use App\Models\OracleOutstandingInvoice;
use App\Models\RevisionExchangeInvoice;
use App\Models\ApproverInvoiceItem;
use App\Mail\ApproverInvoiceMail;
use App\Models\ExchangeInvoice;
use App\Traits\NotifySelfTrait;
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
use App\Models\Anotation;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;
use Auth;
use Mail;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminExchangeInvoiceController extends Controller
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

    public function invoiceDatatables(Request $request)
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        $revisions = RevisionExchangeInvoice::where('user_id', Auth::user()->id)
			->where('status', 'menunggu persetujuan')
			->get();
        $revisionId = [];
        foreach($revisions as $revision) {
            $checkStatusRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
            ->where('level', $revision->level - 1)
            ->first();
            if($checkStatusRevision) {
                if($checkStatusRevision->status == 'disetujui') {
                    array_push($revisionId, $revision->id);
                }
            }
        }
        $invoices = ExchangeInvoice::with('purchase_orders')
            ->whereHas('revision_exchange_invoices', function($q) use($permissions, $revisionId, $request){
                if(in_array('is_pic_exchange_invoice', $permissions))
                {
                    if($request->filter != 'me')
                    {
                           $q->where('approval_permission', 'is_pic_exchange_invoice');
                    } else {
                            $q->where('approval_permission', 'is_pic_exchange_invoice');
                         $q->where('status', 'menunggu persetujuan');
                    }
                 } else {
                    $q->whereIn('id', $revisionId);
                 }
            })
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
    
            if(isset($request->filter) && $request->filter != 'me')
            {
                $invoices = $invoices->merge($exchangeInvoiceOracle);
            }
    
            $invoices = $invoices->sortByDesc('updated_at')->values();
            return response()->json($invoices);
    }

    public function index(Request $request) {
        $data['permissions'] = $this->checkPermission('index');
        
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        $this->generateOutstanding();

        $data['filter'] = $request->filter ? true : false;

        $revisions = RevisionExchangeInvoice::where('user_id', Auth::user()->id)
			->where('status', 'menunggu persetujuan')
			->get();
        $revisionId = [];
        foreach($revisions as $revision) {
            $checkStatusRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
            ->where('level', $revision->level - 1)
            ->first();
            if($checkStatusRevision) {
                if($checkStatusRevision->status == 'disetujui') {
                    array_push($revisionId, $revision->id);
                }
            }
        }
		
        return Inertia::render('Admin/ExchangeInvoice/Index', [
            'data' => $data
        ]);
    }

    public function show($id) {
        $data['invoice'] = ExchangeInvoice::with('purchase_orders', 'exchange_invoice_attachments', 'vendor')->findOrFail($id);
        $data['invoice']['bank_account_number'] = $data['invoice']->vendor->bank_account_number;
        $checkSubmitPic = RevisionExchangeInvoice::where('exchange_invoice_id', $data['invoice']->id)->where('approval_permission', 'is_pic_exchange_invoice')->first();
        if($checkSubmitPic)
		{
			if($checkSubmitPic->submit_at != null)
			{
				$dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $checkSubmitPic->submit_at);
				$daysToAdd = $data['invoice']->vendor->top ?? 0;
				$jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
				$jatuhTempo = date('d-M-Y', strtotime($jatuhTempo));	
			} else {
				$jatuhTempo = '-';
				$checkRevisionExchange = RevisionExchangeInvoice::where('exchange_invoice_id', $data['invoice']->id)->get();
				if(count($checkRevisionExchange) > 1)
				{
					$dateSubmitPic = Carbon::createFromFormat('Y-m-d H:i:s', $checkSubmitPic->updated_at);
					$daysToAdd = $data['invoice']->vendor->top ?? 0;
					$jatuhTempo = $dateSubmitPic->addDays($daysToAdd);
					$jatuhTempo = date('d-M-Y', strtotime($jatuhTempo));	
				}
			}
		} else {
			$jatuhTempo = '-';
		}
        $data['invoice']['jatuh_tempo'] = $jatuhTempo;
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
        $data['approver_invoices'] = ApproverInvoice::whereHas('approver_invoice_items')->get();
        $listRevisions = RevisionExchangeInvoice::where('exchange_invoice_id', $id)->orderBy('id', 'asc')->get();
        $data['timeline'] = [];
        foreach($listRevisions as $key => $revision) {
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
            if(isset($listRevisions[$key-1]))
            {
                if($revision->status == 'menunggu persetujuan' && $listRevisions[$key-1]->status == 'disetujui')
                {
                    $item['color'] = 'orange';
                }
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
        $rfpDocs = [];

        $arrayFile = ['pdf_rfp', 'tax_invoice', 'invoice', 'bast', 'quotation', 'po'];
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

        if (!is_null($data['invoice']->pdf_rfp)) {
            $rfpDocPath = parse_url($data['invoice']->pdf_rfp, PHP_URL_PATH);
            $rfpNameDoc = basename($rfpDocPath);
            $folderRfp = explode('/', $rfpDocPath);
            if (count($folderRfp) == 4) {
                $originRfp = $folderRfp[count($folderRfp) - 2] . '/' . $folderRfp[count($folderRfp) - 1];
                $editedRfp = $folderRfp[count($folderRfp) - 2] . '/edited_' . $folderRfp[count($folderRfp) - 1];
                $rfpExists = Storage::disk('public')->exists($editedRfp);
                $newRfpDoc = [
                    'edited' => ($rfpExists ? Storage::disk('public')->url($editedRfp) : Storage::disk('public')->url($originRfp)),
                    'origin' => Storage::disk('public')->url($originRfp),
                    'name' => $folderRfp[count($folderRfp) - 2],
                    'ispdf' => (Str::contains($rfpNameDoc, '.pdf') ? true : false),
                ];
                $rfpDocs[] = $newRfpDoc;
            }
        }

        $data['approver_revision_done'] = RevisionExchangeInvoice::with('user')->where('approval_permission', null)->where('exchange_invoice_id', $id)->where('status', 'disetujui')->get();

        $data['outstanding_invoice'] = $this->outstandingInvoiceRequest($data['invoice']->invoice_number);
        // $data['outstanding_invoice'] = OracleOutstandingInvoice::with('rfp_views')->where('invoice_num', $data['invoice']->invoice_number)->first();
        $data['rfp'] = $this->generateRfp($id);

        $data['total_debit'] = 0;
        $data['total_credit'] = 0;

        if (count($data['outstanding_invoice']) > 0) {
            foreach ($data['outstanding_invoice'] as $rfp_view) {
                if ((int)$rfp_view['amount_dist'] > 0) {
                    $data['total_debit'] += $rfp_view['amount_dist'];
                } else {
                    $data['total_credit'] += $rfp_view['amount_dist'];
                }
            }
        }

        $data['printed_date'] = date('d-m-Y H:i:s');

        $data['im_pic'] = in_array('is_pic_exchange_invoice', $permissions);

        if(count($listRevisions) > 1)
        {
            $data['im_pic'] = false;
        }

        $approverPayment = ApproverPayment::orderBy('level')->get();
        $data['timeline_payment'] = [];
        $batchPaymentInvoice = BatchPaymentInvoice::where('exchange_invoice_id', $data['invoice']->id)->orderByDesc('updated_at')->first();
        if($batchPaymentInvoice)
        {
            $batchPayment = BatchPayment::where('id', $batchPaymentInvoice->batch_payment_id)->first();
            foreach($approverPayment as $approver) {
                if ($batchPayment->total >= $approver->start_fee) {
                    if($approver->end_fee == 0)
                    {
                        $revisionBatchPayment = RevisionBatchPayment::where('batch_payment_id', $batchPayment->id)->where('approval_role', $approver->role->name)->orderBy('id', 'desc')->first();
                        $item = [
                            'date' => '',
                            'title' => '',
                            'color' => 'gray',
                            'status' => '',
                            'body' => '',
                        ];
                        $item['date'] = $approver->updated_at->format('d-m-Y H:i');
                        $item['title'] = $approver->role->name;
                        $item['body'] = '';
                        if($approver->level < $batchPayment->level) {
                            $item['color'] = 'green';
                            $item['status'] = 'disetujui';
                        } else if($approver->level >= $batchPayment->level) {
                            if($approver->level == $batchPayment->level)
                            {
                                if($revisionBatchPayment)
                                    {
                                        $item['date'] = $revisionBatchPayment->updated_at->format('d-m-Y H:i');
                                        if($revisionBatchPayment->status == 'ditolak')
                                        {
                                            $item['color'] = 'red';
                                            $item['status'] = 'ditolak';
                                            $item['body'] = $revisionBatchPayment->note;
                                        }
    
                                        if($revisionBatchPayment->status != 'ditolak')
                                        {
                                            $item['color'] = 'orange';
                                            $item['status'] = 'on progres';
                                            $item['body'] = $revisionBatchPayment->note;
                                        }
                                    } else {
                                        $item['color'] = 'gray';
                                        $item['status'] = 'menunggu';
                                    }
                            } else {
                                if($revisionBatchPayment)
                                {
                                    $item['date'] = $revisionBatchPayment->updated_at->format('d-m-Y H:i');
                                    if($revisionBatchPayment->status == 'ditolak')
                                    {
                                        $item['color'] = 'red';
                                        $item['status'] = 'ditolak';
                                        $item['body'] = $revisionBatchPayment->note;
                                    } else {
                                        $item['color'] = 'gray';
                                        $item['status'] = 'menunggu';	
                                        $item['body'] = $revisionBatchPayment->note;
                                    }
                                } else {
                                    $item['color'] = 'gray';
                                    $item['status'] = 'menunggu';							
                                }
                            }
                        }
                        $item['attachments'] = [];
                        $data['timeline_payment'][] = $item;
                    } else {
                        if($batchPayment->total <= $approver->end_fee)
                        {
                            $revisionBatchPayment = RevisionBatchPayment::where('batch_payment_id', $id)->where('approval_role', $approver->role->name)->orderBy('id', 'desc')->first();
                            $item = [
                                'date' => '',
                                'title' => '',
                                'color' => 'gray',
                                'status' => '',
                                'body' => '',
                            ];
                            $item['date'] = $approver->updated_at->format('d-m-Y H:i');
                            $item['title'] = $approver->role->name;
                            if($approver->level < $batchPayment->level) {
                                $item['color'] = 'green';
                                $item['status'] = 'disetujui';
                                $item['body'] = '';
                            } else if($approver->level >= $batchPayment->level) {
                                $item['body'] = '';
                                if($approver->level == $batchPayment->level)
                                {
                                    if($revisionBatchPayment)
                                        {
                                            $item['date'] = $revisionBatchPayment->updated_at->format('d-m-Y H:i');
                                            if($revisionBatchPayment->status == 'ditolak')
                                            {
                                                $item['color'] = 'red';
                                                $item['status'] = 'ditolak';
                                                $item['body'] = $revisionBatchPayment->note;
                                            }
    
                                            if($revisionBatchPayment->status != 'ditolak')
                                            {
                                                $item['color'] = 'orange';
                                                $item['status'] = 'on progres';
                                                $item['body'] = $revisionBatchPayment->note;
                                            }
                                        } else {
                                            $item['color'] = 'gray';
                                            $item['status'] = 'menunggu';
                                        }
                                } else {
                                    if($revisionBatchPayment)
                                    {
                                        $item['date'] = $revisionBatchPayment->updated_at->format('d-m-Y H:i');
                                        if($revisionBatchPayment->status == 'ditolak')
                                        {
                                            $item['color'] = 'red';
                                            $item['status'] = 'ditolak';
                                            $item['body'] = $revisionBatchPayment->note;
                                        } else {
                                            $item['color'] = 'gray';
                                            $item['status'] = 'menunggu';	
                                            $item['body'] = $revisionBatchPayment->note;
                                        }
                                    } else {
                                        $item['color'] = 'gray';
                                        $item['status'] = 'menunggu';							
                                    }
                                }
                            }
                            $item['attachments'] = [];
                            $data['timeline_payment'][] = $item;
                        }
                    }
                }
            }
        
        }

        return Inertia::render('Admin/ExchangeInvoice/Show', [
            'data' => $data,
            'newdocs'=>$newdocs,
            'rfp_docs' => $rfpDocs,
        ]);
    }

    public function showRfp($id) {
        $response = $this->generateRfp($id);

        return Inertia::render('Admin/ExchangeInvoice/ShowRfp', $response);
    }

    public function rfpGenerate($id)
    {
        $exchangeInvoice = ExchangeInvoice::find($id);
        $outstandingInvoice = $this->outstandingInvoiceRequest($exchangeInvoice->invoice_number);
        $vendor = Vendor::find($exchangeInvoice->vendor_id);
        if ($outstandingInvoice) {
            $response = $this->generateRfp($id);

            $totalDebit = 0;
            $totalCredit = 0;
            foreach ($outstandingInvoice as $rfp_view) {
                if ((int)$rfp_view['amount_dist'] > 0) {
                    $totalDebit += $rfp_view['amount_dist'];
                } else {
                    $totalCredit += $rfp_view['amount_dist'];
                }
            }
            $data = ['outstanding_invoice' => $outstandingInvoice, 'vendor' => $vendor, 'total_debit' => $totalDebit, 'total_credit' => $totalCredit];
            $pdf = PDF::loadView('generated-pdf', $data)->setPaper('a4', 'potrait');
            $fileName =  Str::random(15) . '.pdf';
            Storage::put('public/pdf_rfp/' . $fileName, $pdf->output());
            $rfpAttachment = url('/') . '/storage/pdf_rfp/' . $fileName;
            $doc_path = parse_url($rfpAttachment, PHP_URL_PATH);
            $nama_doc = basename($doc_path);
            $folder = explode('/', $doc_path);
            $rfpDocs = [];
            if (count($folder) == 4) {
                $fileorigin = $folder[count($folder) - 2] . '/' . $folder[count($folder) - 1];
                $fileedited = $folder[count($folder) - 2] . '/edited_' . $folder[count($folder) - 1];
                $exist = Storage::disk('public')->exists($fileedited);
                $newdoc = [
                    'edited' => ($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                    'origin' => Storage::disk('public')->url($fileorigin),
                    'name' => $folder[count($folder) - 2],
                    'ispdf' => (Str::contains($nama_doc, ".pdf") ? true : false)
                ];
                $rfpDocs[] = $newdoc;
            }
            $filename = ['rfp' => $rfpAttachment, 'rfp_docs' => $rfpDocs];
            $data = array_merge($filename, $response);
            $exchangeInvoice->update([
                'pdf_rfp' => $rfpAttachment
            ]);
            return response()->json($data);
        } else {
            return response()->json(null, 404);
        }
    }

    public function update(Request $request, $id) {
        $data = RevisionExchangeInvoice::findOrFail($id);
        $validateApprovalInvoice = '';
		$checkRevisionList = RevisionExchangeInvoice::where('exchange_invoice_id', $data->exchange_invoice_id)->get();
        if($request->status == 'disetujui' && count($checkRevisionList) == 1)
        {
            $validateApprovalInvoice = 'required';
        }

        $validate_tax_invoice_note = '';
        $validate_invoice_note = '';
        $validate_bast_note = '';
        $validate_quotation_note = '';
        $validate_po_note = '';
        $validate_attachment_note = '';

        $validate_file_tax_invoice_validate = '';
        $validate_file_invoice_validate = '';
        $validate_file_bast_validate = '';
        $validate_file_quotation_validate = '';
        $validate_file_po_validate = '';
        $validate_file_attachment_validate = '';

        $validate_file_tax_invoice_validate = 'required';
        $validate_file_invoice_validate = 'required';
        $validate_file_bast_validate = 'required';
        $validate_file_quotation_validate = 'required';
        $validate_file_attachment_validate = 'required';
        if($request->status == 'disetujui') {
            $validate_file_tax_invoice_validate = $request->file_tax_invoice_validate != 'acc' ? 'required|in:acc' : '';
            $validate_file_invoice_validate = $request->file_invoice_validate != 'acc' ? 'required|in:acc' : '';
            $validate_file_bast_validate = $request->file_bast_validate != 'acc' ? 'required|in:acc' : '';
            $validate_file_quotation_validate = $request->file_quotation_validate != 'acc' ? 'required|in:acc' : '';
            $validate_file_attachment_validate = $request->file_attachment_validate != 'acc' ? 'required|in:acc' : '';
        }

        if($request->status == 'ditolak') {
            if($request->file_tax_invoice_validate != 'acc')
            {
                $validate_file_tax_invoice_validate = $request->file_tax_invoice_validate == null ? 'required' : '';
            }
            if($request->file_invoice_validate != 'acc')
            {
                $validate_file_invoice_validate = $request->file_invoice_validate == null ? 'required' : '';
            }
            if($request->file_bast_validate != 'acc')
            {
                $validate_file_bast_validate = $request->file_bast_validate == null ? 'required' : '';
            }
            if($request->file_quotation_validate != 'acc')
            {
                $validate_file_quotation_validate = $request->file_quotation_validate == null ? 'required' : '';
            }
            if($request->file_attachment_validate != 'acc')
            {
                $validate_file_attachment_validate = $request->file_attachment_validate == null ? 'required' : '';
            }
        }

        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->name;
            }
        }
		

        if($data->exchange_invoice->is_po == 1)
        {
            if($request->status == 'disetujui') {
            $validate_file_po_validate = $request->file_po_validate != 'acc' ? 'required|in:acc' : '';
            }

            if($request->status == 'ditolak') {
                if($request->file_po_validate != 'acc')
                {
                    $validate_file_po_validate = $request->file_po_validate == null ? 'required' : '';
                }
            }
        }

        if(!in_array('Preparer', $permissions) && !in_array('PIC TUKAR FAKTUR', $permissions))
		{
			$validate_file_tax_invoice_validate = '';
			$validate_file_invoice_validate = '';
			$validate_file_bast_validate = '';
			$validate_file_quotation_validate = '';
			$validate_file_po_validate = '';
			$validate_file_attachment_validate = '';
		}

        $request->validate([
            'status' => 'required|max:255',
            'note' => $request->status == 'ditolak' ? 'required|max:255' : '',
            'approver_invoice' => $validateApprovalInvoice,
            'file_tax_invoice_validate' => $validate_file_tax_invoice_validate,
            'file_invoice_validate' => $validate_file_invoice_validate,
            'file_bast_validate' => $validate_file_bast_validate,
            'file_quotation_validate' => $validate_file_quotation_validate,
            'file_po_validate' => $validate_file_po_validate,
            'file_attachment_validate' => $validate_file_attachment_validate,
        ]);

        // dd($request->all());

        $data->update([
            'status' => $request->status,
            'note' => $request->note ?? $data->note,
        ]);

        $data->exchange_invoice->update([
            'tax_invoice_note' => $request->file_tax_invoice != 'acc' ? $request->tax_invoice_note ?? $data->exchange_invoice->tax_invoice_note : 'acc',
            'invoice_note' => $request->file_invoice != 'acc' ? $request->invoice_note ?? $data->exchange_invoice->invoice_note : 'acc',
            'bast_note' => $request->file_bast != 'acc' ? $request->bast_note ?? $data->exchange_invoice->bast_note : 'acc',
            'quotation_note' => $request->file_quotation != 'acc' ? $request->quotation_note ?? $data->exchange_invoice->quotation_note : 'acc',
            'po_note' => $request->file_po != 'acc' ? $request->po_note ?? $data->exchange_invoice->po_note : 'acc',
            'attachment_note' => $request->file_attachment != 'acc' ? $request->attachment_note ?? $data->exchange_invoice->attachment_note : 'acc',
        ]);

        if($request->status == 'ditolak') {
            $data->exchange_invoice->update([
                'status' => 'ditolak',
            ]);

            $notif_vendor = Notification::create([
                'user_id' => $data->exchange_invoice->vendor->user_id,
                'title' => 'E-Faktur Ditolak',
                'description' => 'No. Invoice: ' . $data->exchange_invoice->invoice_number,
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
                        'title' => 'E-Faktur Ditolak ' . $data->user->name,
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
            
            $revisionApproverUpdates = RevisionExchangeInvoice::where('exchange_invoice_id', $data->exchange_invoice_id)->where('status', 'disetujui')->get();
            foreach($revisionApproverUpdates as $revision)
            {
                $revision->update([
                    'status' => 'menunggu persetujuan'
                ]);
            }

            $this->notifySelf(Auth::user()->id, 'Manajemen Invoice', 'Berhasil tolak manajemen invoice', '/admin/exchange-invoice/'. $data->exchange_invoice_id);
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

            $this->notifySelf(Auth::user()->id, 'Manajemen Invoice', 'Berhasil setujui manajemen invoice', '/admin/exchange-invoice/'. $data->exchange_invoice_id);
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
                    'title' => 'E-Faktur Menunggu Verifikasi',
                    'description' => 'E-Faktur dengan ID Tukar Faktur: ' . $dataNext->exchange_invoice->tax_invoice_number,
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
                'title' => 'E-Faktur Disetujui',
                'description' => 'silahkan login untuk mengecek data',
                'url' => '/exchange-invoice/' . $data->exchange_invoice_id,
            ]);

            $notifMailVendorDone['title'] = $notif_vendor_done->title;
            $notifMailVendorDone['description'] = $notif_vendor_done->description;
            $notifMailVendorDone['url'] = $notif_vendor_done->url;
            Mail::to($data->exchange_invoice->vendor->user->email)->send(new ApproverInvoiceMail($notifMailVendorDone));
        }

        if($request->status == 'disetujui')
		{
			$data->exchange_invoice->update([
				'tax_invoice_note' => null,
				'invoice_note' => null,
				'bast_note' => null,
				'quotation_note' => null,
				'po_note' => null,
				'attachment_note' => null,
			]);
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

                    $notif = Notification::create([
                        'user_id' => $approval_invoice->user_id,
                        'title' => 'E-Faktur Menunggu Verifikasi',
                        'description' => 'E-Faktur dengan ID Tukar Faktur: ' . $revisionExchange->exchange_invoice->tax_invoice_number,
                        'url' => 'admin/exchange-invoice/' . $exchange_invoice_id,
                    ]);
        
                    $notifMail['title'] = $notif->title;
                    $notifMail['description'] = $notif->description;
                    $notifMail['url'] = $notif->url;
                    Mail::to($approval_invoice->user->email)->send(new ApproverInvoiceMail($notifMail));
                    if($key == 0)
                    {
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
                $notif = Notification::create([
                    'user_id' => $approval_invoice->user_id,
                    'title' => 'E-Faktur Menunggu Verifikasi',
                    'description' => 'E-Faktur dengan ID Tukar Faktur: ' . $revisionExchange->exchange_invoice->tax_invoice_number,
                    'url' => 'admin/exchange-invoice/' . $exchange_invoice_id,
                ]);
    
                $notifMail['title'] = $notif->title;
                $notifMail['description'] = $notif->description;
                $notifMail['url'] = $notif->url;
                Mail::to($approval_invoice->user->email)->send(new ApproverInvoiceMail($notifMail));
                
                if($key == 0)
                {
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

    public function generateRfp($id)
    {
        $data['invoice'] = ExchangeInvoice::with('purchase_orders', 'exchange_invoice_attachments', 'vendor')->findOrFail($id);
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
        $data['approver_invoices'] = ApproverInvoice::whereHas('approver_invoice_items')->get();
        $listRevisions = RevisionExchangeInvoice::where('exchange_invoice_id', $id)->get();
        $data['timeline'] = [];
        foreach ($listRevisions as $revision) {
            $item = [
                'date' => '',
                'title' => '',
                'color' => 'gray',
                'status' => '',
                'body' => '',
            ];
            $item['date'] = $revision->updated_at->format('d-m-Y H:i');
            $item['title'] = $revision->approval_permission != null ? 'PIC Tukar Faktur' : $revision->user->name;
            if ($revision->status == 'disetujui') {
                $item['color'] = 'green';
            } else if ($revision->status == 'ditolak') {
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
        foreach ($data['invoice']->revision_exchange_invoices as $revision) {
            $myRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                ->where('user_id', Auth::user()->id)
                ->first();

            if ($myRevision != null) {
                $checkBeforeMyRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                    ->where('level', $myRevision->level - 1)
                    ->first();

                // if($checkBeforeMyRevision->status == 'disetujui' && $myRevision->status == 'menunggu persetujuan') {
                $data['revision_id'] = $myRevision->id;
                // }
            }

            if ($data['revision_id'] == null) {
                if (in_array('is_pic_exchange_invoice', $permissions)) {
                    $myRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $revision->exchange_invoice_id)
                        ->where('approval_permission', 'is_pic_exchange_invoice')
                        ->where('status', 'menunggu persetujuan')
                        ->first();

                    if ($myRevision != null) {
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
                $folder = explode("/", $doc_path);
                $fileorigin = $folder[count($folder) - 2] . '/' . $folder[count($folder) - 1];
                $fileedited = $folder[count($folder) - 2] . '/edited_' . $folder[count($folder) - 1];
                $exist = Storage::disk('public')->exists($fileedited);
                $newdoc = [
                    'edited' => ($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                    'origin' => Storage::disk('public')->url($fileorigin),
                    'name' => $folder[count($folder) - 2],
                    'ispdf' => (Str::contains($nama_doc, ".pdf") ? true : false)
                ];
                $newdocs[] = $newdoc;
            }
        }

        $arrayFile = ['invoice', 'tax_invoice', 'quotation', 'bast', 'po'];
        foreach ($arrayFile as $array) {
            $doc_path = parse_url($data['invoice'][$array], PHP_URL_PATH);
            $nama_doc = basename($doc_path);

            //have edited file
            $folder = explode("/", $doc_path);
            if (count($folder) == 4) {
                $fileorigin = $folder[count($folder) - 2] . '/' . $folder[count($folder) - 1];
                $fileedited = $folder[count($folder) - 2] . '/edited_' . $folder[count($folder) - 1];
                $exist = Storage::disk('public')->exists($fileedited);
                $newdoc = [
                    'edited' => ($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin)),
                    'origin' => Storage::disk('public')->url($fileorigin),
                    'name' => $folder[count($folder) - 2],
                    'ispdf' => (Str::contains($nama_doc, ".pdf") ? true : false)
                ];
                $newdocs[] = $newdoc;
            }
        }

        $data['approver_revision_done'] = RevisionExchangeInvoice::with('user')->where('approval_permission', null)->where('exchange_invoice_id', $id)->where('status', 'disetujui')->get();

        $data['outstanding_invoice'] = $this->outstandingInvoiceRequest($data['invoice']->invoice_number);

        $data['total_debit'] = $data['outstanding_invoice']['tax_amount'] ?? 0;
        $data['total_credit'] = $data['outstanding_invoice']['total_amount'] ?? 0;

        if ($data['outstanding_invoice']) {
            foreach ($data['outstanding_invoice'] as $rfp_view) {
                if ((int)$rfp_view['amount_dist'] > 0) {
                    $data['total_debit'] += $rfp_view['amount_dist'];
                } else {
                    $data['total_credit'] += $rfp_view['amount_dist'];
                }
            }
        }

        $data['printed_date'] = date('d-m-Y H:i:s');
        return [
            'data' => $data,
            'newdocs' => $newdocs
        ];
    }

    private function outstandingInvoiceRequest($invoiceNumber)
    {
        $client = new Client();
        $response = $client->get('https://sakainvtrack.issbox.com/api/rfp?invoice_number=' . urlencode($invoiceNumber));
        
        $json = json_decode($response->getBody(), true);
        if (!is_null($json['outstanding_invoice'])) {
            $data = collect($json['outstanding_invoice']);
        } else {
            $data = [];
        }
        return $data;
    }
}
