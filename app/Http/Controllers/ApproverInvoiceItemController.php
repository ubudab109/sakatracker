<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\ApproverInvoiceItem;
use Illuminate\Validation\Rules;
use App\Models\ApproverInvoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Auth;

class ApproverInvoiceItemController extends Controller
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

        if(!in_array($role . '_approver_invoice', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data['permissions'] = $this->checkPermission('store');

        $data['approver'] = ApproverInvoice::where('id', $request->id)->first() ?? abort(404);
        $data['users'] = User::where('role', '!=', 'vendor')->get();
        return Inertia::render('Admin/ApproverInvoiceItem/Create', [
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'start_fee' => 'required|integer',
            'end_fee' => 'required|integer',
            'sla' => 'required|integer',
        ]);
        
        $user = ApproverInvoiceItem::create([
            'approver_invoice_id' => $request->approver_invoice_id,
            'user_id' => $request->user_id,
            'start_fee' => $request->start_fee,
            'end_fee' => $request->end_fee,
            'sla' => $request->sla,
        ]);

        return Redirect::route('approver-invoice-item.create', ['id' => $request->approver_invoice_id]);
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
        $data['permissions'] = $this->checkPermission('update');

        $data['approver_item'] = ApproverInvoiceItem::where('id', $id)->first() ?? abort(404);
        $data['approver'] = ApproverInvoice::where('id', $data['approver_item']->approver_invoice_id)->first();
        $data['users'] = User::where('role', '!=', 'vendor')->get();

        return Inertia::render('Admin/ApproverInvoiceItem/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = ApproverInvoiceItem::where('id', $id)->first();

        $request->validate([
            'user_id' => 'required',
            'start_fee' => 'required|integer',
            'end_fee' => 'required|integer',
            'sla' => 'required|integer',
        ]);

        $data->update([
            'user_id' => $request->user_id,
            'start_fee' => $request->start_fee,
            'end_fee' => $request->end_fee,
            'sla' => $request->sla,
        ]);

        return Redirect::route('approver-invoice-item.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        $data = ApproverInvoiceItem::where('id', $id)->first() ?? abort(404);
        $approverInvoiceId = $data->approver_invoice_id;
        $data->delete();

        return Redirect::route('approver-invoice.show', $approverInvoiceId);
    }

    public function swapLevel(Request $request, $id) 
    {
        $data = ApproverInvoiceItem::where('id', $id)->first();
        $newLevel = $data->level;
        $oldLevel = $data->level;
        if($request->icon == 'up') {
            $checkUpData = ApproverInvoiceItem::where('approver_invoice_id', $data->approver_invoice_id)->where('level', $data->level - 1)->first();
            if($checkUpData) {
                $newLevel = $checkUpData->level;
                $checkUpData->update([
                    'level' => $oldLevel
                ]);
            }
        } else {
            $checkDownData = ApproverInvoiceItem::where('approver_invoice_id', $data->approver_invoice_id)->where('level', $data->level + 1)->first();
            if($checkDownData) {
                $newLevel = $checkDownData->level;
                $checkDownData->update([
                    'level' => $oldLevel
                ]);
            }
        }

        $data->update([
            'level' => $newLevel
        ]);

        return Redirect::route('approver-invoice.show', $data->approver_invoice_id);
    }

}
