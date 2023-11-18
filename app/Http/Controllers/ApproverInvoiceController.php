<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\ApproverInvoiceItem;
use Illuminate\Validation\Rules;
use App\Models\ApproverInvoice;
use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;
use Auth;

class ApproverInvoiceController extends Controller
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
        $data['permissions'] = $this->checkPermission('index');

        $data['approvers'] = ApproverInvoice::orderBy('name')->get();

        return Inertia::render('Admin/ApproverInvoice/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['permissions'] = $this->checkPermission('store');

        return Inertia::render('Admin/ApproverInvoice/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:'.ApproverInvoice::class,
        ]);
        
        $user = ApproverInvoice::create([
           'name' => $request->name,
        ]);


        return Redirect::route('approver-invoice.create');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data['permissions'] = $this->checkPermission('index');
        
        $data['approver'] = ApproverInvoice::where('id', $id)->first() ?? abort(404);
        $data['approver_items'] = ApproverInvoiceItem::with('user')->where('approver_invoice_id', $data['approver']->id)->orderBy('level')->get();

        $this->orderByLevel();

        return Inertia::render('Admin/ApproverInvoiceItem/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['permissions'] = $this->checkPermission('update');

        $data['approver'] = ApproverInvoice::where('id', $id)->first();

        return Inertia::render('Admin/ApproverInvoice/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = ApproverInvoice::where('id', $id)->first();

        $checkName = ApproverInvoice::where('name', $request->name)->first();

        $validateName = '';

        if ($checkName && $checkName->id !== $data->id) {
            $validateName = '|unique:' . ApproverInvoice::class;
        }

        $request->validate([
            'name' => 'required|string|max:255' . $validateName,
        ]);

        $data->update([
            'name' => $request->name,
        ]);


        return Redirect::route('approver-invoice.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        ApproverInvoice::where('id', $id)->delete();

        return Redirect::route('approver-invoice.index');
    }

    public function orderByLevel() {
        $data['approvers'] = ApproverInvoice::with(['approver_invoice_items' => function($q){
            $q->orderBy('level');
        }])->get();

        foreach($data['approvers'] as $approver) {
            foreach($approver->approver_invoice_items as $key => $item) {
                $item->update([
                    'level' => $key + 1
                ]);
            }
        }
    }
}
