<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = ['highlighted'];

    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    public function thread()
    {
        return $this->belongsTo(\App\Thread::class);
    }
}
