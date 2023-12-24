<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $data['notifications'] = Notification::where('user_id', Auth::user()->id)
        ->orderBy('read', 'desc')
        ->get();
        return Inertia::render('Notifications/Index', ['data' => $data]);
    }
}
