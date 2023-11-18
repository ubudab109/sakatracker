<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Auth;

class AdminController extends Controller
{
    public function index() {
        $data['users'] = User::where('role', 'admin')->get();

        return Inertia::render('Admin/User/Admin/Index', [
            'data' => $data
        ]);
    }

    public function create() {
        return Inertia::render('Admin/User/Admin/Create');
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
           'role' => 'admin',
           'email_verified_at' => date('Y-m-d H:i:s'),
           'password' => bcrypt($request->password)
        ]);

        return Redirect::route('admin.create');
    }

    public function edit($id) {
        $data = User::findOrFail($id);

        return Inertia::render('Admin/User/Admin/Edit', [
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

        return Redirect::route('admin.edit', $data->id);
    }

    public function destroy($id)
    {
        $data = User::findOrFail($id);
        $data->delete();
        
        return Redirect::route('admin.index');
    }
}
