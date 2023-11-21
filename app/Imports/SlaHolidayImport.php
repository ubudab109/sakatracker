<?php

namespace App\Imports;

use App\Models\SlaHoliday;
use Maatwebsite\Excel\Concerns\ToModel;

class SlaHolidayImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new SlaHoliday([
            'date'     => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[0]),
            'description'    => $row[1], 
        ]);
    }
}
