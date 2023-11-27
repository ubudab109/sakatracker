<?php

namespace App\Http\Controllers;

use App\Models\RevisionBatchPayment;
use App\Models\SlaWeekend;
use App\Models\SlaHoliday;
use App\Models\Vendor;
use App\Traits\ExchangeInvoiceTrait;
use Carbon\Carbon;

use App\Models\RevisionExchangeInvoice;
use App\Mail\ApproverPaymentMail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BatchPayment;
use App\Models\ExchangeInvoice;
use App\Models\BatchPaymentInvoice;
use App\Models\ApproverPayment;
use App\Models\UserRole;
use App\Models\Notification;
use App\Models\Role;
use Auth;
use Mail;

class BatchPaymentController extends Controller
{
    use ExchangeInvoiceTrait;

    public function checkPermission($role)
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        if(!in_array($role . '_batch_payment', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index(){
        $data['permissions'] = $this->checkPermission('index');
        
        $data['batch_payments'] = BatchPayment::orderBy('id', 'DESC')->where('status', '!=', 'ready to paid')->get();
        return Inertia::render('Admin/BatchPayment/Index', [
            'data' => $data
        ]);
    }

    public function outstandingInvoicePage(){
        $data['outstanding_invoices'] = ExchangeInvoice::with('vendor')->where("status", "disetujui")->get()
        ->map(function($invoice){
            $invoice['jatuh_tempo'] = '-';
            if(count($invoice->revision_exchange_invoices) > 1)
            {
                $latestRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $invoice->id)->latest('id')->first();
                $dateApprove = Carbon::createFromFormat('Y-m-d H:i:s', $latestRevision->submit_at);
                $dateApprove->addDays($invoice->vendor->top ?? 0);
                $invoice['jatuh_tempo'] = $dateApprove->format('d-m-Y');
            }

            return $invoice;
        });
        return Inertia::render('Admin/BatchPayment/OutstandingInvoice', [
            'data' => $data
        ]);
    }

    public function createBatchPayment(Request $request){
        $batchPayment = BatchPayment::create();
        $noBatch      = $this->formatBatchInvoiceNumber();
    
        $batchPayment->update([
            'no_batch' => $noBatch,
            'status'   => 'draft'
        ]);

        $invoiceIds = [];
		$total = 0;
        if($request->invoice_id)
        {
            $invoiceIds = explode(',', $request->invoice_id);
            foreach($invoiceIds as $invoiceid)
            {
                BatchPaymentInvoice::create([
                    'batch_payment_id' => $batchPayment->id,
                    'exchange_invoice_id' => $invoiceid
                ]);
				$invoice = ExchangeInvoice::where('id', $invoiceid)->with('vendor')->first();
                if ($invoice->vendor) {
                    $vendor = Vendor::find($invoice->vendor->id);
                    $noBatch = $this->formatBatchInvoiceNumber($vendor);
                    $batchPayment->update([
                        'no_batch' => $noBatch
                    ]);
                }
				$total += $invoice->total;
            }
        }
		
		$batchPayment->update([
			'total' => $total,
		]);

        return $this->updateBatchPayment($batchPayment->id, $invoiceIds);
    }

    public function updateBatchPayment($id, $invoiceIds = []){
        $data['batch_payment'] = BatchPayment::find($id);
        $data['outstanding_invoices'] = ExchangeInvoice::with('vendor')->where("status", "disetujui")->whereNotIn('id', $invoiceIds)->get()
        ->map(function($invoice){
            $invoice['jatuh_tempo'] = '-';
            if(count($invoice->revision_exchange_invoices) > 1)
            {
                $latestRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $invoice->id)->latest('id')->first();
                $dateApprove = Carbon::createFromFormat('Y-m-d H:i:s', $latestRevision->submit_at);
                $dateApprove->addDays($invoice->vendor->top ?? 0);
                $invoice['jatuh_tempo'] = $dateApprove->format('d-m-Y');
            }

            return $invoice;
        });
        $data['batch_payment_invoices'] = [];
        
        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $id)->get();

        foreach ($batch_payment_invoices as $invoice) {
            $exchange_invoice = ExchangeInvoice::with('vendor')->find($invoice->exchange_invoice_id);
            $exchange_invoice['jatuh_tempo'] = '-';
            if(count($exchange_invoice->revision_exchange_invoices) > 1)
            {
                $latestRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $exchange_invoice->id)->latest('id')->first();
                $dateApprove = Carbon::createFromFormat('Y-m-d H:i:s', $latestRevision->submit_at);
                $dateApprove->addDays($exchange_invoice->vendor->top ?? 0);
                $exchange_invoice['jatuh_tempo'] = $dateApprove->format('d-m-Y');
            }
            array_push($data['batch_payment_invoices'], $exchange_invoice);
        }

        return Inertia::render('Admin/BatchPayment/UpdateBatchPayment', [
            'data' => $data
        ]);
    }

    public function addInvoice(Request $request){
        $batch_payment_invoice = BatchPaymentInvoice::create([
            'batch_payment_id' => $request->batch_payment_id,
            'exchange_invoice_id' => $request->exchange_invoice_id
        ]);

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil menambahkan data invoice',
            'batch_payment_invoice' => $batch_payment_invoice
        ], 200);
    }

    public function getInvoices($id){
        $data['batch_payment_invoices'] = [];
        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $id)->get();

        foreach ($batch_payment_invoices as $invoice) {
            $exchange_invoice = ExchangeInvoice::with('vendor')->find($invoice->exchange_invoice_id);
            $exchange_invoice['jatuh_tempo'] = '-';
            if(count($exchange_invoice->revision_exchange_invoices) > 1)
            {
                $latestRevision = RevisionExchangeInvoice::where('exchange_invoice_id', $exchange_invoice->id)->latest('id')->first();
                $dateApprove = Carbon::createFromFormat('Y-m-d H:i:s', $latestRevision->submit_at);
                $dateApprove->addDays($exchange_invoice->vendor->top ?? 0);
                $exchange_invoice['jatuh_tempo'] = $dateApprove->format('d-m-Y');
            }
            array_push($data['batch_payment_invoices'], $exchange_invoice);
        }

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil mengambil data invoices',
            'invoices' => $data['batch_payment_invoices']
        ], 200);
    }

    public function saveDraft(Request $request){
        $batch_payment = BatchPayment::find($request->batch_payment["id"]);
        
        $batch_payment->update([
            'periode' => $request->periode,
            'jatuh_tempo' => $request->jatuh_tempo,
            'total' => $request->total
        ]);

        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $request->batch_payment["id"])->get();
        $batch_payment_invoices->each->delete();

        foreach ($request->batch_payment_invoices as $invoice) {
            $batch_payment_invoice = BatchPaymentInvoice::create([
                'batch_payment_id' => $request->batch_payment["id"],
                'exchange_invoice_id' => $invoice["id"]
            ]);
        }

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil menyimpan Draft Batch Payment',
            'batch_payment' => $batch_payment
        ], 200);
    }

    public function saveBatchPayment(Request $request){
        $approver_payment = ApproverPayment::orderBy('level')->first();
        $batch_payment = BatchPayment::findOrFail($request->batch_payment["id"]);
        
        $batch_payment->update([
            'periode' => $request->periode,
            'jatuh_tempo' => $request->jatuh_tempo,
            'total' => $request->total,
            'status' => 'on progress',
            'level' => $approver_payment->level,
            'role_id' => $approver_payment->role_id
        ]);

        if($approver_payment)
        {
            $sla_holiday = SlaHoliday::whereDate('date', date('Y-m-d H:i:s'))->first();
            $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

            while ($sla_holiday || $dateCarbon->isWeekend()) {
                $dateCarbon->addDay();
                $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
            }
            
            RevisionBatchPayment::create([
                'batch_payment_id' => $batch_payment->id,
                'approval_role' => $approver_payment->role->name,
                'sla_at' => $dateCarbon->addHours($approver_payment->sla)
            ]);
        }

        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $request->batch_payment["id"])->get();
        $batch_payment_invoices->each->delete();

        foreach ($request->batch_payment_invoices as $invoice) {
            $batch_payment_invoice = BatchPaymentInvoice::create([
                'batch_payment_id' => $request->batch_payment["id"],
                'exchange_invoice_id' => $invoice["id"]
            ]);
        }

        $notificationData = [
            "title" => "Batch Payment Menunggu Verifikasi",
            "description" => "Batch Payment dengan Nomor: " .  $batch_payment->no_batch . " menunggu verifikasi",
            "url" => "/admin/batch-payment/" . $batch_payment->id,
            "user_id" => null,
        ];

        $this->sendBatchPaymentNotifications($approver_payment->role_id, $notificationData);

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil menyimpan Batch Payment',
            'batch_payment' => $batch_payment
        ], 200);
    }

    public function showBatchPayment($id){
        $data['batch_payment'] = BatchPayment::find($id);

        $data['batch_payment_invoices'] = [];
        $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $id)->get();

        foreach ($batch_payment_invoices as $invoice) {
            $exchange_invoice = ExchangeInvoice::find($invoice->exchange_invoice_id);
            if ($exchange_invoice->status === 'disetujui') $data['batch_payment']->status = 'disetujui';
            array_push($data['batch_payment_invoices'], $exchange_invoice);
        }

        $data['user_role'] = UserRole::where('user_id', Auth::user()->id)->first();

        return Inertia::render('Admin/BatchPayment/Show', [
            'data' => $data
        ]);
    }

    public function deleteBatchPayment($id){
        $batch_payment = BatchPayment::find($id);
        $batch_payment->delete();

        return redirect('/admin/batch-payment');
    }

    public function processBatchPayment($id){
        $batch_payment = BatchPayment::find($id);

        $approver_payment_now = ApproverPayment::where('level', $batch_payment->level)->first();
        if($approver_payment_now)
        {
            $checkRevisionBatchPayment = RevisionBatchPayment::where('approval_role', $approver_payment_now->role->name)->first();
            if($checkRevisionBatchPayment)
            {
                $checkRevisionBatchPayment->update([
                    'user_id' => Auth::user()->id,
                    'submit_at' => date('Y-m-d H:i:s')
                ]);
            } 
        }

        $level = $batch_payment->level + 1;

        $approver_payment = ApproverPayment::where('level', $level)->first();

        if ($approver_payment != null) {
            $sla_holiday = SlaHoliday::whereDate('date', date('Y-m-d H:i:s'))->first();
            $dateCarbon = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

            while ($sla_holiday || $dateCarbon->isWeekend()) {
                $dateCarbon->addDay();
                $sla_holiday = SlaHoliday::whereDate('date', $dateCarbon)->first();
            }

            $revision = RevisionBatchPayment::create([
                'batch_payment_id' => $batch_payment->id,
                'approval_role' => $approver_payment->role->name,
                'sla_at' => $dateCarbon->addHours($approver_payment->sla)
            ]);

            $batch_payment->update([
                'level' => $approver_payment->level,
                'role_id' => $approver_payment->role_id
            ]);

            $notificationData = [
                "title" => "Batch Payment Menunggu Verifikasi",
                "description" => "Batch Payment dengan Nomor: " .  $batch_payment->no_batch . " menunggu verifikasi",
                "url" => "/admin/batch-payment/" . $batch_payment->id,
                "user_id" => null,
            ];

            $this->sendBatchPaymentNotifications($approver_payment->role_id, $notificationData);
        } else {
            $batch_payment->update([
                'status' => 'ready to paid'
            ]);

            $batch_payment_invoices = BatchPaymentInvoice::where('batch_payment_id', $batch_payment->id)->get();

            foreach ($batch_payment_invoices as $data) {
                $invoice = ExchangeInvoice::find($data->exchange_invoice_id);
                $invoice->update([
                    'status' => 'unpaid'
                ]);
            }

            $manager = Role::where('name', 'Manager')->first();

            $notificationData = [
                "title" => "Batch Payment Siap Dibayar",
                "description" => "Batch Payment dengan Nomor: " .  $batch_payment->no_batch . " siap dibayar",
                "url" => "/admin/siap-bayar/" . $batch_payment->id,
                "user_id" => null,
            ];

            $this->sendBatchPaymentNotifications($manager->id, $notificationData);
        }

        return redirect()->back();
    }

    public function sendBatchPaymentNotifications($role_id, $notificationData){
        $users = UserRole::where('role_id', $role_id)->get();

        foreach ($users as $user) {
            $notificationData['user_id'] = $user->user_id;
            $this->sendNotification($notificationData);
        }
    }

    public function sendNotification($notificationData){
        $notification = Notification::create($notificationData);
        
        $notifMail['title'] = $notification->title;
        $notifMail['description'] = $notification->description;
        $notifMail['url'] = $notification->url;

        Mail::to($notification->user->email)->send(new ApproverPaymentMail($notifMail));
    }

}

