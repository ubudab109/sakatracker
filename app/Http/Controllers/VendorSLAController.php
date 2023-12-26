<?php

namespace App\Http\Controllers;

use App\Models\RevisionRegisterVendor;
use App\Models\ApproverVendor;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Inertia\Inertia;
use Auth;

class VendorSLAController extends Controller
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

        if (!in_array($role . '_monitoring_sla', $permissions)) {
            return abort(404);
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function generateIdManual()
    {
        $vendors = Vendor::where('id_manual', null)->get();
        foreach ($vendors as $vendor) {
            $vendorName = '';
            $explodeName = explode(' ', strtoupper($vendor->name));
            if (count($explodeName) == 2) {
                if ($explodeName[0] != 'PT.') {
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

            if (count($explodeName) == 3) {
                if ($explodeName[0] != 'PT.') {
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

            if (count($explodeName) == 4) {
                if ($explodeName[0] != 'PT.') {
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

            if (count($explodeName) >= 5) {
                if ($explodeName[0] != 'PT.') {
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

            if ($checkIdManual) {
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
        $this->generateIdManual();
        $data['permissions'] = $this->checkPermission('index');

        $approvers = ApproverVendor::with('role')
        ->join('roles', 'approver_vendors.role_id', 'roles.id')
        ->orderBy('roles.name')
        ->get();
        // $approverVendor = [];
        foreach ($approvers as $index => $approver) {
            $role = $approver->role;
            if (strtolower($role->name) == 'purchasing') {
                $approvers[$index]['order'] = 0;
            } else if (strtolower($role->name) == 'legal') {
                $approvers[$index]['order'] = 1;
            } else if (strtolower($role->name) == 'accounting') {
                $approvers[$index]['order'] = 2;
            } 
            // else {
            //     $approvers[$index]['order'] = $index;
            // }
            
        }
        $sortedArray = collect($approvers)->sortBy('order')->values()->all();
        $data['approver_vendors'] = $sortedArray;
        // foreach ($approvers as $approver) {
        //     // if ($approver->role->)
        // }
        $data['vendors'] = Vendor::where('status_account', '!=', 'draft')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($vendor) {
                $approver_vendors = ApproverVendor::with('role')->get();
                $vendor['total_sla'] = 0;
                foreach ($approver_vendors as $approver_vendor) {
                    $vendor[$approver_vendor->role->name] = 0;
                    $getRevision = RevisionRegisterVendor::where('vendor_id', $vendor->id)
                        ->where('approval_role', $approver_vendor->role->name)
                        ->first();

                    if ($getRevision) {

                        if (!empty($getRevision->submit_at)) {
                            if ($getRevision->submit_at < $getRevision->sla_at) {
                                $vendor[$approver_vendor->role->name] = 1;
                            } else {
                                $vendor[$approver_vendor->role->name] = 2;
                            }
                        } else {
                            $vendor[$approver_vendor->role->name] = 1;
                        }
                    }

                    $vendor['total_sla'] += $vendor[$approver_vendor->role->name];
                }

                return $vendor;
            });

        return Inertia::render('Admin/MonitoringSLA/Vendor/Index', [
            'data' => $data
        ]);
    }
}
