<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Auth;

class ApprovalController extends Controller
{
    public function index() {
        $data['users'] = User::with('user_role.role')->where('role', 'approver')->get();

        return Inertia::render('Admin/User/Approver/Index', [
            'data' => $data
        ]);
    }

    public function create() {
        return Inertia::render('Admin/User/Approver/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
           'name' => $request->name,
           'email' => $request->email,
           'role' => 'approver',
           'email_verified_at' => date('Y-m-d H:i:s'),
           'password' => bcrypt($request->password)
        ]);

        return Redirect::route('approver.create');
    }

    public function edit($id) {
        $data = User::findOrFail($id);

        return Inertia::render('Admin/User/Approver/Edit', [
            'data' => $data
        ]);
    }

    public function update(Request $request, $id) {
        $data = User::findOrFail($id);
        $checkEmail = User::where('email', $request->email)->first();
        $validateEmail = null;
        if($checkEmail != null)
        {
            if($checkEmail->id != $data->id) 
            {
                $validateEmail = '|unique:' . User::class;
            }
        }

        $validatePassword = [];
        if($request->password != null)
        {
            $validatePassword = ['required', 'confirmed', Rules\Password::defaults()];
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255' . $validateEmail,
            'password' => $validatePassword
        ]);


        $data->update([
           'name' => $request->name,
           'email' => $request->email,
           'password' => bcrypt($request->password)
        ]);

        return Redirect::route('approver.edit', $data->id);
    }

    public function destroy($id)
    {
        $data = User::findOrFail($id);
        $data->delete();
        
        return Redirect::route('approver.index');
    }
}
