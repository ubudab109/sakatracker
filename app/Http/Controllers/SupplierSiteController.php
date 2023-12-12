<?php

namespace App\Http\Controllers;

use App\Models\SupplierSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SupplierSiteController extends Controller
{
    public function index()
    {
        $data['locations'] = SupplierSite::orderBy('name')->get();
        return Inertia::render('Admin/SupplierSite/Index', [
            'data' => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/SupplierSite/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);
        SupplierSite::create($request->all());
        return Redirect::route('admin.supplier-site.index');
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);
        $location = SupplierSite::find($id);
        $location->update($request->all());
        return Redirect::route('admin.supplier-site.index');
    }

    public function edit($id)
    {
        $data['supplier_site'] = SupplierSite::find($id);
        return Inertia::render('Admin/SupplierSite/Edit', ['data' => $data]);
    }

    public function destroy($id)
    {
        SupplierSite::find($id)->delete();
        return Redirect::back();
    }
}
