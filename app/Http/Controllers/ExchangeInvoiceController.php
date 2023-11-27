<?php

namespace App\Http\Controllers;

use App\Traits\ExchangeInvoiceTrait;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;

use Illuminate\Support\Facades\Redirect;
use App\Models\ExchangeInvoiceAttachment;
use App\Models\OracleOutstandingInvoice;
use App\Models\ExchangeInvoiceLocation;
use App\Models\ExchangeInvoiceCategory;
use App\Models\RevisionExchangeInvoice;
use App\Models\OraclePurchaseOrder;
use App\Mail\ApproverInvoiceMail;
use App\Models\ExchangeInvoice;
use App\Models\RolePermission;
use App\Models\PurchaseOrder;
use App\Models\OracleRfpView;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\SlaWeekend;
use App\Models\SlaHoliday;
use Spatie\PdfToImage\Pdf;
use App\Models\UserRole;
use App\Models\Vendor;
use App\Models\User;
use Inertia\Inertia;
use Zxing\QrReader;
use Carbon\Carbon;
use Storage;
use File;
use Auth;
use Mail;

class ExchangeInvoiceController extends Controller
{
    use ExchangeInvoiceTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        $data['invoices'] = ExchangeInvoice::whereHas('vendor', function($q){
            $q->where('user_id', Auth::user()->id);
        })
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function ($invoice) {
            if($invoice['status'] != 'draft')
            {
                // $checkRevision = RevisionExchangeInvoice::
                // where('exchange_invoice_id', $invoice->id)
                // ->where('status', '!=', 'disetujui')
                // ->first();
                // if($checkRevision) {
				// 	if($checkRevision->user) {
				// 		$name = $checkRevision->user->name;
				// 	} else {
				// 		$name = 'PIC Tukar Faktur';
				// 	}
                //     $invoice['status'] = $checkRevision->status . ' ' . $name;
                // } else {
                //     $checkRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $invoice->id)->latest()->first();
                //     if($checkRevision)
                //     {
                //         if($checkRevision->user) {
                //             $name = $checkRevision->user->name;
                //         } else {
                //             $name = 'PIC Tukar Faktur';
                //         }
                //         if($checkRevision->status == 'disetujui')
                //         {
                //             $invoice['status'] = $checkRevision->status;
                //         } else {
                //             $invoice['status'] = $checkRevision->status . ' ' . $name;
                //         }
                //     } else {
                //         $invoice['status'] = 'tukar faktur tidak valid';
                //     }
                // }
            } else {
                $invoice['status'] = 'draft';
            }
            return $invoice;
        });

        $checkVendorProfile = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->first();
        if(!$checkVendorProfile) {
            return Redirect::route('vendor.index');
        }

        return Inertia::render('Vendor/ExchangeInvoice/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $vendor = User::with(['vendor_latest' => function ($q) {
            $q->where('status_account', 'disetujui');
        }])
            ->whereHas('vendor_latest', function ($q) {
                $q->where('status_account', 'disetujui');
            })
            ->where('role', 'vendor')
        ->where('id', Auth::user()->id)
        ->first();
        $data['categories'] = ExchangeInvoiceCategory::get();
        $data['locations'] = ExchangeInvoiceLocation::get();
        // $po = OraclePurchaseOrder::where('vendor_code', $vendor->vendor_latest->id_manual)->orderBy('po_num')->get();
        // $poArray = $po->map(function ($po) {
        //     return [
        //         'value' => $po->po_header_id,
        //         'label' => $po->po_num,
        //     ];
        // });

        // $data['po_array'] = $poArray->toArray();
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();

        return Inertia::render('Vendor/ExchangeInvoice/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
        if($request->status_submit == 'menunggu persetujuan') {
            $poValidate = '';
            if($request->is_po == 1)
            {
                $poValidate = '|required|mimes:pdf';
            }
            $request->validate([
                // 'category' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'date' => 'required|string|max:255',
                'dpp' => 'required|max:255',
                'ppn' => 'required|max:255',
                'total' => 'required|max:255',
                'note' => 'required',
                'tax_invoice' => 'required|mimes:pdf|max:5000',
                'invoice_number' => 'required|max:255',
                'invoice' => 'required|mimes:pdf|max:5000',
                // 'tax_invoice_number' => 'required|max:255',
                'bast' => 'required|mimes:pdf|max:5000',
                'po' => 'max:5000' . $poValidate,
                'quotation' => 'required|mimes:pdf|max:5000',
                // 'attachment' => 'mimes:pdf|max:5000',
            ]);
        }

        $taxInvoicePath = '';
        if ($request->hasFile('tax_invoice')) {
            $save = $request->file('tax_invoice')->store('public/tax_invoice');
            $filenameTax = $request->file('tax_invoice')->hashName();
            $taxInvoicePath = url('/') . '/storage/tax_invoice/' . $filenameTax;
        }

        $invoicePath = '';
        if ($request->hasFile('invoice')) {
            $save = $request->file('invoice')->store('public/invoice');
            $filename = $request->file('invoice')->hashName();
            $invoicePath = url('/') . '/storage/invoice/' . $filename;
        }

        $bastPath = '';
        if ($request->hasFile('bast')) {
            $save = $request->file('bast')->store('public/bast');
            $filename = $request->file('bast')->hashName();
            $bastPath = url('/') . '/storage/bast/' . $filename;
        }

        $poPath = '';
        if ($request->hasFile('po')) {
            $save = $request->file('po')->store('public/po');
            $filename = $request->file('po')->hashName();
            $poPath = url('/') . '/storage/po/' . $filename;
        }

        $quotationPath = '';
        if ($request->hasFile('quotation')) {
            $save = $request->file('quotation')->store('public/quotation');
            $filename = $request->file('quotation')->hashName();
            $quotationPath = url('/') . '/storage/quotation/' . $filename;
        }
        $exchangeInvoice = ExchangeInvoice::create([
            'vendor_id' => $vendor->id,
            // 'category' => $request->category,
            'location' => $request->location,
            'date' => $request->date,
            'dpp' => $request->dpp,
            'ppn' => $request->ppn,
            'total' => $request->total,
            'is_materai' => $request->is_materai ?? 0,
            'note' => $request->note,
            'is_po' => $request->is_po ?? 0,
            'po_number' => $request->po_number,
            'order_id' => $request->order_id,
            'status' => $request->status_submit,
            'invoice_number' => $request->invoice_number,
            'tax_invoice' => $taxInvoicePath,
            'invoice' => $invoicePath,
            'bast' => $bastPath,
            'po' => $poPath,
            'quotation' => $quotationPath,
            'tax_invoice_number' => $this->formatInvoiceNumber($vendor),
        ]);

        $exchangeInvoice->update([
            'document_number' => 'DTF000' . $exchangeInvoice->id
        ]);

        if($request->attachment != null) {
            foreach($request->attachment as $attachment) {
                $attachmentPath = '';
                if ($request->hasFile('attachment')) {
                    $save = $attachment->store('public/attachment');
                    $filename = $attachment->hashName();
                    $attachmentPath = url('/') . '/storage/attachment/' . $filename;
                }
                ExchangeInvoiceAttachment::create([
                    'exchange_invoice_id' => $exchangeInvoice->id,
                    'file' => $attachmentPath
                ]);
            }
        }

        if($request->gr_items != null) {
            foreach($request->gr_items as $item) {
                foreach($item['array'] as $item1) {
                    PurchaseOrder::create([
                        'exchange_invoice_id' => $exchangeInvoice->id,
                        'orderline_id' => $item1['purchase_order_detail']['po_line_id'],
                        'order_id' => $item1['purchase_order_detail']['po_header_id'],
                        'document_number' => $item1['good_receipt']['receipt_num'],
                        'invoice_number' => $request->invoice_number,
                        'date_gr' => $item1['good_receipt']['receive_date'],
                        'quantity' => $item1['purchase_order_detail']['quantity_ordered'],
                        'unit_price' => $item1['purchase_order_detail']['unit_price'],
                        'total_price' => $item1['purchase_order_detail']['sub_total'],
                    ]);
                }
            }
        }

        if($request->status_submit == 'menunggu persetujuan') { 
            ini_set('memory_limit', '614M');
            if($taxInvoicePath != '')
            {
                $pdfBarcode = new Pdf(storage_path('/app/public/tax_invoice/') . $filenameTax);
                $pageNumbers = $pdfBarcode->getNumberOfPages();
    
                $imageArray = [];
    
                for($i=1; $i <= $pageNumbers; $i++)
                {
                    $fileNameBarcode = date('Y-m-dH-i-s');
                    $pdfBarcode->setPage($i)->width(1200)->saveImage(public_path('/images/') . $fileNameBarcode . '.png');
                    $path = public_path('/images/') . $fileNameBarcode . '.png';
                    array_push($imageArray, $path);
                }
    
                $textBarcode = null;
                foreach($imageArray as $image) {
                    $qrcode = new QrReader($image);
                    $textBarcode = $qrcode->text();
                }

                foreach($imageArray as $image)
                {
                    if (File::exists($image)) {
                        File::delete($image);
                    }
                }
            }

            $supplier = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
            $url = $textBarcode;
            $checkUrl = explode('http://svc.efaktur.pajak.go.id/validasi/faktur/', $url);

            if(count($checkUrl) == 2)
            {
                // Initialize Guzzle HTTP client
                $client = new Client();
        
                // Send a GET request to the URL
                $response = $client->get($url);

                if($response);
        
                if ($response->getStatusCode() == 200) {
                    // Get the XML content from the response
                    $xmlContent = (string) $response->getBody();
        
                    // You can now parse and process the $xmlContent as needed
                    // For example, you can use SimpleXMLElement to work with the XML data
        
                    $xml = new \SimpleXMLElement($xmlContent);
        
                    // You can then use $xml to access XML elements and attributes
        
                    if($xml->npwpPenjual == $supplier->npwp && $xml->npwpLawanTransaksi == '017242264007000' && $xml->jumlahDpp == $request->dpp && $xml->tanggalFaktur == date('d/m/Y', strtotime($request->date)))
                    {
                        $revisionExchange = RevisionExchangeInvoice::create([
                            'exchange_invoice_id' => $exchangeInvoice->id,
                            'approval_permission' => 'is_pic_exchange_invoice',
                            'status' => 'menunggu persetujuan',
                            'level' => 0
                        ]);
            
                        $rolePermissions = RolePermission::where('name', 'is_pic_exchange_invoice')->get();
                        foreach($rolePermissions as $rolePermission)
                        {
                            $user_roles = UserRole::where('role_id', $rolePermission->role_id)->get();
                            foreach($user_roles as $user_role)
                            {
                                $notifApprover['title'] = 'Tukar Faktur Menunggu Verifikasi';
                                $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $exchangeInvoice->id;
                                $notifApprover['url'] = '/admin/exchange-invoice/' . $exchangeInvoice->id;
            
                                Notification::create([
                                    'user_id' => $user_role->user_id,
                                    'title' => $notifApprover['title'],
                                    'description' => $notifApprover['description'],
                                    'url' => $notifApprover['url'],
                                ]);
                                $mail = Mail::to($user_role->user->email)->send(new ApproverInvoiceMail($notifApprover));  
                            }
                        }
                    } else {
                        $exchangeInvoice->update([
                            'status' => 'tukar faktur tidak valid'
                        ]);

                        $notifApprover['title'] = 'Tukar Faktur Tidak Valid';
                        $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $exchangeInvoice->id;
                        $notifApprover['url'] = '/exchange-invoice/' . $exchangeInvoice->id;
    
                        Notification::create([
                            'user_id' => $vendor->user_id,
                            'title' => $notifApprover['title'],
                            'description' => $notifApprover['description'],
                            'url' => $notifApprover['url'],
                        ]);
                    }
                } else {
                    // Handle error if the response status code is not 200
                    $exchangeInvoice->update([
                        'status' => 'tukar faktur tidak valid'
                    ]);

                    $notifApprover['title'] = 'Tukar Faktur Tidak Valid';
                    $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $exchangeInvoice->id;
                    $notifApprover['url'] = '/exchange-invoice/' . $exchangeInvoice->id;

                    Notification::create([
                        'user_id' => $vendor->user_id,
                        'title' => $notifApprover['title'],
                        'description' => $notifApprover['description'],
                        'url' => $notifApprover['url'],
                    ]);
                }
            } else {
                $exchangeInvoice->update([
                    'status' => 'tukar faktur tidak valid'
                ]);

                $notifApprover['title'] = 'Tukar Faktur Tidak Valid';
                $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $exchangeInvoice->id;
                $notifApprover['url'] = '/exchange-invoice/' . $exchangeInvoice->id;

                Notification::create([
                    'user_id' => $vendor->user_id,
                    'title' => $notifApprover['title'],
                    'description' => $notifApprover['description'],
                    'url' => $notifApprover['url'],
                ]);
            }
        }

        return Redirect::route('exchange-invoice.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data['invoice'] = ExchangeInvoice::with('purchase_orders', 'exchange_invoice_attachments')->findOrFail($id);
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
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
            $item['title'] = $revision->approval_permission != null ? 'PIC Tukar Faktur' : $revision->approval_role;
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

        // $data['outstanding_invoice'] = OracleOutstandingInvoice::with('rfp_views')->where('invoice_num', $data['invoice']->invoice_number)->first();

        // $data['total_debit'] = $data['outstanding_invoice']->tax_amount ?? 0;
        // $data['total_credit'] = $data['outstanding_invoice']->total_amount ?? 0;
        
        // if($data['outstanding_invoice'])
        // {
        //     foreach($data['outstanding_invoice']->rfp_views as $rfp_view)
        //     {
        //         if((int)$rfp_view->amount_dist > 0)
        //         {
        //             $data['total_debit'] += $rfp_view->amount_dist;
        //         } else {
        //             $data['total_credit'] += $rfp_view->amount_dist;
        //         }
        //     }
        // }

        // $data['printed_date'] = date('d-m-Y H:i:s');

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

        return Inertia::render('Vendor/ExchangeInvoice/Show', [
            'data' => $data,
            'newdocs'=>$newdocs
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['invoice'] = ExchangeInvoice::with('purchase_orders', 'exchange_invoice_attachments')->findOrFail($id);
        $data['categories'] = ExchangeInvoiceCategory::get();
        $data['locations'] = ExchangeInvoiceLocation::get();
        $po = OraclePurchaseOrder::orderBy('po_num')->get();
        $poArray = $po->map(function ($po) {
            return [
                'value' => $po->po_header_id,
                'label' => $po->po_num,
            ];
        });

        $data['po_array'] = $poArray->toArray();
        $data['user'] = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();

        $data['noDraft'] = 0;
        if($data['invoice']->status == 'ditolak') {
            $data['noDraft'] = 1;
        }

        return Inertia::render('Vendor/ExchangeInvoice/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $data = ExchangeInvoice::findOrFail($id);
        if($request->status_submit == 'menunggu persetujuan') {
            $poValidate = '';
            $bastValidate = '';
            $quotationValidate = '';
            if($request->is_po == 1 && $data->po == null)
            {
                $poValidate = '|required|mimes:pdf';
            }
            if($request->bast == null && $data->bast == null)
            {
                $bastValidate = '|required|mimes:pdf';
            }
            if($request->quotation == null && $data->quotation == null)
            {
                $quotationValidate = '|required|mimes:pdf';
            }
            $request->validate([
                // 'category' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'date' => 'required|string|max:255',
                'dpp' => 'required|max:255',
                'ppn' => 'required|max:255',
                'total' => 'required|max:255',
                'note' => 'required',
                'tax_invoice' => $data->tax_invoice != null ? '' : 'required|' . 'mimes:pdf|max:5000',
                'invoice' => $data->invoice != null ? '' : 'required|' . 'mimes:pdf|max:5000',
                'invoice_number' => 'required|max:255',
                // 'tax_invoice_number' => 'required|max:255',
                'bast' => 'max:5000' . $bastValidate,
                'po' => 'max:5000' . $poValidate,
                'quotation' => 'max:5000' . $quotationValidate,
            ]);
        }

        $taxInvoicePath = $data->tax_invoice;
        if($taxInvoicePath)
        {
            $filenameTaxExplode = explode(url('/storage/tax_invoice/'), $taxInvoicePath);
            $filenameTax = $filenameTaxExplode[1];
        }
        if ($request->hasFile('tax_invoice')) {
            $save = $request->file('tax_invoice')->store('public/tax_invoice');
            $filenameTax = $request->file('tax_invoice')->hashName();
            $taxInvoicePath = url('/') . '/storage/tax_invoice/' . $filenameTax;
        }

        $invoicePath = $data->invoice;
        if ($request->hasFile('invoice')) {
            $save = $request->file('invoice')->store('public/invoice');
            $filename = $request->file('invoice')->hashName();
            $invoicePath = url('/') . '/storage/invoice/' . $filename;
        }

        $bastPath = $data->bast;
        if ($request->hasFile('bast')) {
            $save = $request->file('bast')->store('public/bast');
            $filename = $request->file('bast')->hashName();
            $bastPath = url('/') . '/storage/bast/' . $filename;
        }

        $poPath = $data->po;
        if ($request->hasFile('po')) {
            $save = $request->file('po')->store('public/po');
            $filename = $request->file('po')->hashName();
            $poPath = url('/') . '/storage/po/' . $filename;
        }

        $quotationPath = $data->quotation;
        if ($request->hasFile('quotation')) {
            $save = $request->file('quotation')->store('public/quotation');
            $filename = $request->file('quotation')->hashName();
            $quotationPath = url('/') . '/storage/quotation/' . $filename;
        }

        $revisiStatus = 'menunggu persetujuan';
        if($data->status == 'ditolak' && $request->status_submit == 'menunggu persetujuan' && $data->status_approval != '') {
            $revisiStatus = 'sedang berlangsung';
        }

        $data->update([
            // 'category' => $request->category,
            'location' => $request->location,
            'date' => $request->date,
            'dpp' => $request->dpp,
            'ppn' => $request->ppn,
            'total' => $request->total,
            'is_materai' => $request->is_materai ?? 0,
            'note' => $request->note,
            'is_po' => $request->is_po ?? 0,
            'po_number' => $request->po_number,
            'order_id' => $request->order_id,
            'status' => $request->status_submit,
            'tax_invoice' => $taxInvoicePath,
            'invoice_number' => $request->invoice_number,
            'invoice' => $invoicePath,
            'bast' => $bastPath,
            'po' => $poPath,
            'quotation' => $quotationPath,
            // 'tax_invoice_number' => $request->tax_invoice_number,
        ]);

        if($request->status_submit == 'menunggu persetujuan') {
            $data->update([
                'status' => $revisiStatus
            ]);
        }

        if($request->attachment != null) {
            // $data->exchange_invoice_attachments->delete();
            ExchangeInvoiceAttachment::where('exchange_invoice_id', $data->id)->delete();
            foreach($request->attachment as $attachment) {
                $attachmentPath = '';
                if ($request->hasFile('attachment')) {
                    $save = $attachment->store('public/attachment');
                    $filename = $attachment->hashName();
                    $attachmentPath = url('/') . '/storage/attachment/' . $filename;
                }
                ExchangeInvoiceAttachment::create([
                    'exchange_invoice_id' => $data->id,
                    'file' => $attachmentPath
                ]);
            }
        }

        if($request->gr_items != null) {
            // $data->purchase_orders->delete();
            PurchaseOrder::where('exchange_invoice_id', $data->id)->delete();
            foreach($request->gr_items as $item) {
                foreach($item['array'] as $item1) {
                    PurchaseOrder::create([
                        'exchange_invoice_id' => $data->id,
                        'orderline_id' => $item1['purchase_order_detail']['po_line_id'],
                        'order_id' => $item1['purchase_order_detail']['po_header_id'],
                        'document_number' => $item1['good_receipt']['receipt_num'],
                        'invoice_number' => $request->invoice_number,
                        'date_gr' => $item1['good_receipt']['receive_date'],
                        'quantity' => $item1['purchase_order_detail']['quantity_ordered'],
                        'unit_price' => $item1['purchase_order_detail']['unit_price'],
                        'total_price' => $item1['purchase_order_detail']['sub_total'],
                    ]);
                }
            }
        }

        if($request->status_submit == 'menunggu persetujuan' && count($data->revision_exchange_invoices) == 0) { 
            ini_set('memory_limit', '614M');
            if($taxInvoicePath != '')
            {
                $pdfBarcode = new Pdf(storage_path('/app/public/tax_invoice/') . $filenameTax);
                $pageNumbers = $pdfBarcode->getNumberOfPages();
    
                $imageArray = [];
    
                for($i=1; $i <= $pageNumbers; $i++)
                {
                    $fileNameBarcode = date('Y-m-dH-i-s');
                    $pdfBarcode->setPage($i)->width(1200)->saveImage(public_path('/images/') . $fileNameBarcode . '.png');
                    $path = public_path('/images/') . $fileNameBarcode . '.png';
                    array_push($imageArray, $path);
                }
    
                $textBarcode = null;
                foreach($imageArray as $image) {
                    $qrcode = new QrReader($image);
                    $textBarcode = $qrcode->text();
                }

                foreach($imageArray as $image)
                {
                    if (File::exists($image)) {
                        File::delete($image);
                    }
                }
            }

            $supplier = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
            $url = $textBarcode;
            $checkUrl = explode('http://svc.efaktur.pajak.go.id/validasi/faktur/', $url);

            if(count($checkUrl) == 2)
            {
                // Initialize Guzzle HTTP client
                $client = new Client();
        
                // Send a GET request to the URL
                $response = $client->get($url);
        
                if ($response->getStatusCode() == 200) {
                    // Get the XML content from the response
                    $xmlContent = (string) $response->getBody();
        
                    // You can now parse and process the $xmlContent as needed
                    // For example, you can use SimpleXMLElement to work with the XML data
        
                    $xml = new \SimpleXMLElement($xmlContent);
        
                    // You can then use $xml to access XML elements and attributes
                    
                    if($xml->npwpPenjual == $supplier->npwp && $xml->npwpLawanTransaksi == '017242264007000' && $xml->jumlahDpp == $request->dpp && $xml->tanggalFaktur == date('d/m/Y', strtotime($request->date)))
                    {
                        $revisionExchange = RevisionExchangeInvoice::create([
                            'exchange_invoice_id' => $data->id,
                            'approval_permission' => 'is_pic_exchange_invoice',
                            'status' => 'menunggu persetujuan',
                            'level' => 0
                        ]);
            
                        $rolePermissions = RolePermission::where('name', 'is_pic_exchange_invoice')->get();
                        foreach($rolePermissions as $rolePermission)
                        {
                            $user_roles = UserRole::where('role_id', $rolePermission->role_id)->get();
                            foreach($user_roles as $user_role)
                            {
                                $notifApprover['title'] = 'Tukar Faktur Menunggu Verifikasi';
                                $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . $data->document_number;
                                $notifApprover['url'] = '/admin/exchange-invoice/' . $data->id;
            
                                Notification::create([
                                    'user_id' => $user_role->user_id,
                                    'title' => $notifApprover['title'],
                                    'description' => $notifApprover['description'],
                                    'url' => $notifApprover['url'],
                                ]);
                                $mail = Mail::to($user_role->user->email)->send(new ApproverInvoiceMail($notifApprover));  
                            }
                        }
                    } else {
                        $data->update([
                            'status' => 'tukar faktur tidak valid'
                        ]);

                        $notifApprover['title'] = 'Tukar Faktur Tidak Valid';
                        $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $data->id;
                        $notifApprover['url'] = '/exchange-invoice/' . $data->id;
    
                        Notification::create([
                            'user_id' => $data->vendor->user_id,
                            'title' => $notifApprover['title'],
                            'description' => $notifApprover['description'],
                            'url' => $notifApprover['url'],
                        ]);
                    }
                } else {
                    // Handle error if the response status code is not 200
                    $data->update([
                        'status' => 'tukar faktur tidak valid'
                    ]);

                    $notifApprover['title'] = 'Tukar Faktur Tidak Valid';
                    $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $data->id;
                    $notifApprover['url'] = '/exchange-invoice/' . $data->id;

                    Notification::create([
                        'user_id' => $data->vendor->user_id,
                        'title' => $notifApprover['title'],
                        'description' => $notifApprover['description'],
                        'url' => $notifApprover['url'],
                    ]);
                }
            } else {
                $data->update([
                    'status' => 'tukar faktur tidak valid'
                ]);

                $notifApprover['title'] = 'Tukar Faktur Tidak Valid';
                $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . 'DTF000' . $data->id;
                $notifApprover['url'] = '/exchange-invoice/' . $data->id;

                Notification::create([
                    'user_id' => $data->vendor->user_id,
                    'title' => $notifApprover['title'],
                    'description' => $notifApprover['description'],
                    'url' => $notifApprover['url'],
                ]);
            }
        } elseif($request->status_submit == 'menunggu persetujuan') {
            $revisionExchange = RevisionExchangeInvoice::where('status', 'ditolak')->update([
                'status' => 'menunggu persetujuan'
            ]);

            $notifApprover['title'] = 'Tukar Faktur Menunggu Verifikasi';
            $notifApprover['description'] = 'Tukar Faktur dengan No. Dokumen: ' . $data->document_number;
            $notifApprover['url'] = '/admin/exchange-invoice/' . $data->id;

            Notification::create([
                'user_id' => $revisionExchange->user_id,
                'title' => $notifApprover['title'],
                'description' => $notifApprover['description'],
                'url' => $notifApprover['url'],
            ]);
            $mail = Mail::to($revisionExchange->user->email)->send(new ApproverInvoiceMail($notifApprover));  
        }
        
        return Redirect::route('exchange-invoice.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExchangeInvoice $exchangeInvoice)
    {
        //
    }
}
