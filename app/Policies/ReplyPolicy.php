<?php

namespace App\Policies;

use App\User;
use App\Reply;
use Illuminate\Auth\Access\HandlesAuthorization;

class ReplyPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Reply $reply)
    {
        return $user->role === 'admin';
    }

    public function isClosed(User $user, Reply $reply)
    {
        return !$reply->thread->closed;
    }
}
