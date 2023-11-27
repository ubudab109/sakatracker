<?php

namespace App\Traits;

use App\Models\Notification;

trait NotifySelfTrait
{
    public static function notifySelf($user_id, $title, $desc, $url)
    {
        $notif = Notification::create([
            'user_id' => $user_id,
            'title' => $title,
            'description' => $desc,
            'url' => $url,
        ]); 

        return $notif;
    }

}
