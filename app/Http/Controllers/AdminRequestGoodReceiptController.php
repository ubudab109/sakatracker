<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\RequestGoodReceipt;
use Illuminate\Http\Request;
use App\Models\Anotation;
use App\Models\Vendor;
use Inertia\Inertia;
use Storage;
use Auth;
use Str;

class AdminRequestGoodReceiptController extends Controller
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

        if(!in_array($role . '_request_gr', $permissions))
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

        $data['request_good_receipts'] = RequestGoodReceipt::with('vendor')->get();

        return Inertia::render('Admin/RequestGR/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['permissions'] = $this->checkPermission('verification');

        $data['request_good_receipt'] = RequestGoodReceipt::with('vendor', 'request_good_receipt_attachments')->where('id', $id)->first();
    
        $data['newdocs'] = [];
        $data['docs'] = [];
        
        if ($data['request_good_receipt']) {
            foreach ($data['request_good_receipt']->request_good_receipt_attachments as $key => $attachment) {
                foreach ($attachment->getAttributes() as $key => $value) {
                    if (strpos($key, "file") === 0 && !empty($value)) {
                        $doc_path = parse_url($value, PHP_URL_PATH);
                        $nama_doc = basename($doc_path);

                        $doc = Anotation::where('doc_id', $nama_doc)->first();
                        if ($doc) array_push($data['docs'], $doc);

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
                        $data['newdocs'][] = $newdoc;
                    }
                }
            }
        }

        return Inertia::render('Admin/RequestGR/Edit', [
            'data' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = RequestGoodReceipt::where('id', $id)->first();

        $data->update([
            'status' => $request->status,
        ]);

        return Redirect::route('admin.request-good-receipt.edit', $data->id);
    }
}
