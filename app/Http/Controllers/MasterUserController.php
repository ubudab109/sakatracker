<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\UserRole;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Auth;

class MasterUserController extends Controller
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
            return implode(' | ', $permissions);
        }
    }

    public function index() {
        $data['permissions'] = $this->checkPermission('index');

        $data['users'] = User::with('user_role.role')->where('role', '!=','vendor')->get();

        return Inertia::render('Admin/MasterUser/Index', [
            'data' => $data
        ]);
    }

    public function create() {
        $data['permissions'] = $this->checkPermission('store');

        $roles = Role::all();

        $roleArray = $roles->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        $data['roles'] = $roleArray->toArray();

        return Inertia::render('Admin/MasterUser/Create', [
            'data' => $data
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role_id' => 'required',
        ]);
        
        $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'role' => 'approver',
           'email_verified_at' => date('Y-m-d H:i:s'),
           'password' => bcrypt($request->password)
        ]);

        foreach($request->role_id as $role) {
            UserRole::create([
                'user_id' => $user->id,
                'role_id' => $role['value']
            ]);
        }


        return Redirect::route('master-user.create');
    }

    public function edit($id) {
        $data['permissions'] = $this->checkPermission('update');

        $data = User::findOrFail($id);

        $userRoles = UserRole::with('role')->where('user_id', $id)->get();
        $userRoleIds = UserRole::where('user_id', $id)->pluck('role_id');

        $userRoleArray = $userRoles->map(function($role) {
            return [
                'value' => $role->role_id,
                'label' => $role->role->name
            ];
        });

        $data['user_roles'] = $userRoleArray->toArray();

        $roles = Role::get();

        $roleArray = $roles->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        $data['roles'] = $roleArray->toArray();

        return Inertia::render('Admin/MasterUser/Edit', [
            'data' => $data
        ]);
    }

    public function update(Request $request, $id) {
        $data = User::with('user_role')->findOrFail($id);
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
            'password' => $validatePassword,
            'role_id' => 'required',
        ]);

        $checkUserRole = UserRole::where('user_id', $id)->first();
        if($checkUserRole != null) {
            UserRole::where('user_id', $id)->delete();
        }
    
        foreach($request->role_id as $role) {
            UserRole::create([
                'user_id' => (int)$id,
                'role_id' => $role['value']
            ]);
        }

        $data->update([
           'name' => $request->name,
           'email' => $request->email,
        ]);

        if($request->password != null) {
            $data->update([
                'password' => bcrypt($request->password)
            ]);
        }

        return Redirect::route('master-user.edit', $data->id);
    }

    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');

        $data = User::findOrFail($id);
        $data->delete();
        
        return Redirect::route('master-user.index');
    }
}
