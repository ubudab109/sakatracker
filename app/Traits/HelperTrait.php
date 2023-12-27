<?php

namespace App\Traits;

use Carbon\Carbon;

class HelperTrait
{
    /**
     * The isEqualDate function checks if a given date is the same as the current date.
     * 
     * @param string $date A string representing a date in any valid format.
     * 
     * @return bool boolean value indicating whether the given date is the same day as the current date.
     */
    public static function isEqualDate(string $date): bool
    {
        $dataDate = Carbon::parse($date);
        $currentDate = Carbon::now();
        return $dataDate->isSameDay($currentDate);
    }
}