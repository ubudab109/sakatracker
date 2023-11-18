<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Auth;

class UserController extends Controller
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

        if(!in_array($role . '_user', $permissions))
        {
            return abort(404);   
        } else {
            return $permissions;
        }
    }

    public function index() {
        $data['permissions'] = $this->checkPermission('index');

        $data['users'] = User::get();

        return Inertia::render('User/Index', [
            'data' => $data
        ]);
    }

    public function create() {
        $data['permissions'] = $this->checkPermission('store');

        return Inertia::render('User/Create');
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
           'password' => bcrypt($request->password)
        ]);

        return Redirect::route('user.create');
    }

    public function edit($id) {
        $data = User::findOrFail($id);

        return Inertia::render('Admin/User/Partials/Form', [
            'data' => $data
        ]);
    }

    public function update(Request $request, $id) {
        $data['permissions'] = $this->checkPermission('update');

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

        return Redirect::route('user.edit', $data->id);
    }

    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        $data = User::findOrFail($id);
        $data->delete();
        
        return Redirect::route('user.index');
    }
}
