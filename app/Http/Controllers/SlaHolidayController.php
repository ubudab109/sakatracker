<?php

namespace App\Http\Controllers;

use App\Imports\SlaHolidayImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\SlaHoliday;
use Inertia\Inertia;
use Auth;

class SlaHolidayController extends Controller
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

        if(!in_array($role . '_sla_calendar', $permissions))
        {
            return abort(404);   
        } else {
            return implode(' | ', $permissions);
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            'excel' => 'required|mimes:xlsx|max:2048'
        ]);

        $filePath = '';
        if ($request->hasFile('excel')) {
            $save = $request->file('excel')->store('public/excel');
            $filename = $request->file('excel')->hashName();
            $filePath = url('/') . '/storage/excel/' . $filename;
        }

        Excel::import(new SlaHolidayImport, storage_path('/app/public/excel/') . $filename);
        
        return Redirect::route('admin.sla-calendar.index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['permissions'] = $this->checkPermission('store');

        return Inertia::render('Admin/SlaCalendar/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date|max:255|unique:'.SlaHoliday::class,
            'description' => 'required|string|max:255',
        ]);
    
        SlaHoliday::create([
            'date' => $request->date,
            'description' => $request->description
        ]);

        return Redirect::route('admin.sla-holiday.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(SlaHoliday $slaHoliday)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $data['permissions'] = $this->checkPermission('update');

        $data['sla_holiday'] = SlaHoliday::where('id', $id)->first();

        return Inertia::render('Admin/SlaCalendar/Edit', [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = SlaHoliday::where('id', $id)->first();

        $checkDate = SlaHoliday::where('date', $request->date)->first();

        $validateDate = '';

        if ($checkDate && $checkDate->id !== $data->id) {
            $validateDate = '|unique:' . SlaHoliday::class;
        }

        $request->validate([
            'date' => 'required|date|max:255' . $validateDate,
            'description' => 'required|string|max:255',
        ]);

        $data->update([
            'date' => $request->date,
            'description' => $request->description,
        ]);


        return Redirect::route('admin.sla-holiday.edit', $data->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data['permissions'] = $this->checkPermission('delete');
        
        SlaHoliday::where('id', $id)->delete();

        return Redirect::route('admin.sla-calendar.index');
    }
}
