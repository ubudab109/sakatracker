<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use App\Models\SlaWeekend;
use App\Models\SlaHoliday;
use Inertia\Inertia;
use Auth;

class SlaWeekendController extends Controller
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

    public function generateData()
    {
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu'];
        foreach($days as $day)
        {
            SlaWeekend::create([
                'day' => $day
            ]);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['permissions'] = $this->checkPermission('index');
        
        if(count(SlaWeekend::get()) < 1)
        {
            $this->generateData();
        }
        $data['sla_weekend_days'] = SlaWeekend::get()->pluck('day');
        $data['sla_weekend_is_holidays'] = SlaWeekend::get()->pluck('is_holiday');
        $data['sla_weekend_start_times'] = SlaWeekend::get()->pluck('start_time');
        $data['sla_weekend_end_times'] = SlaWeekend::get()->pluck('end_timee');
        $data['sla_weekends'] = SlaWeekend::get();
        $data['sla_holidays'] = SlaHoliday::orderBy('updated_at')->get();

        return Inertia::render('Admin/SlaCalendar/Index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        foreach($request->day as $key => $day)
        {
            SlaWeekend::where('day', $day)->update([
                'is_holiday' => $request->is_holiday[$key] == true ? 1 : 0,
                'start_time' => $request->is_holiday[$key] == true ? null : $request->start_time[$key],
                'end_time' => $request->is_holiday[$key] == true ? null : $request->end_time[$key],
            ]);
        }

        return Redirect::route('admin.sla-calendar.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(SlaWeekend $slaWeekend)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SlaWeekend $slaWeekend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SlaWeekend $slaWeekend)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SlaWeekend $slaWeekend)
    {
        //
    }
}
