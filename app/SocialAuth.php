<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SocialAuth extends Model
{
    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }
}
