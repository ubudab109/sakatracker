<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\ExchangeInvoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class AdminMatchingController extends Controller
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

        if(!in_array($role . '_matching', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function index(Request $request)
    {
        $data['permissions'] = $this->checkPermission('index');

        if($request->invoice_number)
        {
            $data['invoice'] = ExchangeInvoice::with('vendor', 'exchange_invoice_attachments')
            ->where('invoice_number',  'like', '%' . $request->invoice_number . '%')
            ->orWhere('document_number',  'like', '%' . $request->invoice_number . '%')
            ->get();
        } else {
            $data['invoice'] = [];
        }

        $data['search'] = $request->invoice_number;

        return Inertia::render('Admin/Matching/Index', [
            'data' => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = ExchangeInvoice::findOrFail($id);
        
        $request->validate([
            'status' => 'required|max:255',
        ]);

        $data->update([
            'status_matching' => $request->status,
        ]);


        return Redirect::route('admin.matching.index', ['invoice_number' => $request->invoice_number]);
    }
}
