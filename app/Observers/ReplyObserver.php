<?php

namespace App\Observers;

use App\Reply;
use App\Thread;

class ReplyObserver
{
    public function creating(Reply $reply)
    {
        $thread = Thread::find($reply->thread_id);
        $thread->replies_count = $thread->replies_count + 1;
        $thread->save();
    }
}
