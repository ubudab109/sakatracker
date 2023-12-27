<?php

namespace App\Http\Controllers;

use App\Models\RequestGoodReceiptAttachment;
use App\Mail\ApproverInvoiceMail;
use Illuminate\Support\Facades\Redirect;
use App\Models\OraclePurchaseOrder;
use App\Models\RequestGoodReceipt;
use App\Traits\NotifySelfTrait;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Vendor;
use App\Models\User;
use Inertia\Inertia;
use Mail;
use Auth;

class RequestGoodReceiptController extends Controller
{
    use NotifySelfTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $checkVendorProfile = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->first();
        if (!$checkVendorProfile) {
            return Redirect::route('vendor.index');
        }

        $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();
        $data['request_good_receipts'] = RequestGoodReceipt::where('vendor_id', $vendor->id)->orderByDesc('updated_at')->get();

        return Inertia::render('Vendor/RequestGR/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
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
        // $po = OraclePurchaseOrder::where('vendor_code', $vendor->vendor_latest->id_manual)->orderBy('po_num')->get();
        // $poArray = $po->map(function ($po) {
        //     return [
        //         'value' => $po->po_num,
        //         'label' => $po->po_num,
        //     ];
        // });

        $poArray = [
            [
                'value' => '1',
                'label' => 1,
            ]
        ];

        $data['po_array'] = $poArray;

        $data['po_number'] = $request->po_number ?? null;

        return Inertia::render('Vendor/RequestGR/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $vendor = Vendor::where('user_id', Auth::user()->id)->where('status_account', 'disetujui')->latest()->first();

        $gr = RequestGoodReceipt::create([
            'vendor_id' => $vendor->id,
            'po_number' => $request->po_number,
            'document_number' => $request->document_number,
            // 'invoice_number' => $request->invoice_number,
            'date_gr' => $request->date_gr,
            // 'quantity' => $request->quantity,
            // 'unit_price' => $request->unit_price,
            // 'total_price' => $request->quantity * $request->unit_price,
            'status' => 'pending'
        ]);

        if ($request->attachment != null) {
            foreach ($request->attachment as $attachment) {
                $attachmentPath = '';
                if ($request->hasFile('attachment')) {
                    $save = $attachment->store('public/attachment');
                    $filename = $attachment->hashName();
                    $attachmentPath = url('/') . '/storage/attachment/' . $filename;
                }
                RequestGoodReceiptAttachment::create([
                    'request_g_r_id' => $gr->id,
                    'file' => $attachmentPath
                ]);
            }
        }

        $this->notifyPurchasing('Request GR', 'Menunggu verifikasi dengan No. PO: ' . $gr->po_number, '/admin/request-good-receipt/' . $gr->id . '/edit');

        $this->notifySelf(Auth::user()->id, 'Request GR', 'Berhasil tambah request GR', '/request-good-receipt');

        return Redirect::route('request-good-receipt.create');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['request_good_receipt'] = RequestGoodReceipt::where('id', $id)->first();
        $vendor = User::with(['vendor_latest' => function ($q) {
            $q->where('status_account', 'disetujui');
        }])
            ->whereHas('vendor_latest', function ($q) {
                $q->where('status_account', 'disetujui');
            })
            ->where('role', 'vendor')
            ->where('id', Auth::user()->id)
            ->first();
        // $po = OraclePurchaseOrder::where('vendor_code', $vendor->vendor_latest->id_manual)->orderBy('po_num')->get();
        // $poArray = $po->map(function ($po) {
        //     return [
        //         'value' => $po->po_num,
        //         'label' => $po->po_num,
        //     ];
        // });

        // $data['po_array'] = $poArray->toArray();

        return Inertia::render('Vendor/RequestGR/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = RequestGoodReceipt::where('id', $id)->first();

        $data->update([
            'document_number' => $request->document_number,
            'po_number' => $request->po_number,
            // 'invoice_number' => $request->invoice_number,
            'date_gr' => $request->date_gr,
            'status' => 'pending',
            // 'quantity' => $request->quantity,
            // 'unit_price' => $request->unit_price,
            // 'total_price' => $request->quantity * $request->unit_price,
        ]);

        if ($request->attachment != null) {
            // $data->exchange_invoice_attachments->delete();
            RequestGoodReceiptAttachment::where('request_g_r_id', $data->id)->delete();
            foreach ($request->attachment as $attachment) {
                $attachmentPath = '';
                if ($request->hasFile('attachment')) {
                    $save = $attachment->store('public/attachment');
                    $filename = $attachment->hashName();
                    $attachmentPath = url('/') . '/storage/attachment/' . $filename;
                }
                RequestGoodReceiptAttachment::create([
                    'request_g_r_id' => $data->id,
                    'file' => $attachmentPath
                ]);
            }
        }

        $this->notifySelf(Auth::user()->id, 'Request GR', 'Berhasil ubah request GR', '/request-good-receipt');

        $this->notifyPurchasing('Request GR', 'Menunggu verifikasi dengan No. PO: ' . $data->po_number, '/admin/request-good-receipt/' . $data->id . '/edit');

        return Redirect::route('request-good-receipt.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        RequestGoodReceipt::where('id', $id)->delete();

        $this->notifySelf(Auth::user()->id, 'Request GR', 'Berhasil hapus request GR', '/request-good-receipt');

        return Redirect::route('request-good-receipt.index');
    }

    public function notifyPurchasing($title, $description, $url)
    {
        $users = User::whereHas('user_role.role.permissions', function ($q) {
            $q->where('name', 'verification_request_gr');
        })->get();
        foreach ($users as $user) {
            $notif_vendor = Notification::create([
                'user_id' => $user->id,
                'title' => $title,
                'description' => $description,
                'url' => $url,
            ]);

            $notifMailVendor['title'] = $title;
            $notifMailVendor['description'] = $description;
            $notifMailVendor['url'] = $url;
            Mail::to($user->email)->send(new ApproverInvoiceMail($notifMailVendor));
        }
    }
}
