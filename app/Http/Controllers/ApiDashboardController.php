<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\User;
use Auth;

class ApiDashboardController extends Controller
{
    public function checkFirstLogin(Request $request) {
        $user = User::where('id', $request->user_id)->first();
        if($user->role != 'vendor') {
            $data['first_login'] = false;

            return response()->json($data);
        }
        $vendor = Vendor::where([['status_account', '!=', 'ditolak'], ['status_account', '!=', 'draft']])->where('user_id', $user->id)->count();
        $data['vendor'] = Vendor::where('user_id', $user->id)->first();
        $data['first_login'] = false;
        if($vendor == 0) {
            $data['first_login'] = true;
        }
        
        return response()->json($data);
    }
}
