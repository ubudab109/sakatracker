<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Anotation;
use App\Models\Vendor;
use App\Models\User;
use Inertia\Inertia;
use Storage;
use Auth;

class AdminVendorController extends Controller
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

        if(!in_array($role . '_vendors', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function generateIdManual() 
    {
        $vendors = Vendor::where('id_manual', null)->get();
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

    public function index()
    {
        $data['permissions'] = $this->checkPermission('index');
        
        // $this->generateIdManual();
        $data['vendors'] = User::with(['vendor_latest' => function ($q) {
            $q->where('status_account', 'disetujui');
        }])
        ->whereHas('vendor_latest', function ($q) {
            $q->where('status_account', 'disetujui');
        })
        ->where('role', 'vendor')->get();

        return Inertia::render('Admin/Vendor/Index', [
            'data' => $data
        ]);
    }

    public function show($id)
    {
        $data['vendor'] = Vendor::where('id', $id)->first();

        $newdocs = [];
        $docs = [];

        if ($data['vendor']) {
            foreach ($data['vendor']->getAttributes() as $key => $value) {
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

        return Inertia::render('Admin/Vendor/Show', [
            'data' => $data,
            'docs' => $docs,
            'newdocs' => $newdocs
        ]);
    }

    public function saveAnotation(Request $request, $id)
    {
        $validatedAnotation = $request->validate([
            'doc_id' => 'required',
            'xdf_string' => 'required'
        ]);

        $existingAnotation = Anotation::where('doc_id', $validatedAnotation['doc_id'])->first();

        if ($existingAnotation) {

            $existingAnotation->update([
                'xdf_string' => $validatedAnotation['xdf_string']
            ]);
        } else {
            Anotation::create($validatedAnotation);
        }

        return to_route('admin.vendor.show', $id);
    }
}
