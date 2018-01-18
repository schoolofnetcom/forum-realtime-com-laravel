<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function edit()
    {
        $user = \Auth::user();
        return view('profile.form', compact('user'));
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255'
        ]);
        $user = \Auth::user();

        $user->name = $request->input('name');
        $user->photo = $request->file('photo');
        $user->email = $request->input('email');

        if ($request->input('password')) {
            $this->validate($request, [
                'password' => 'string|min:6|confirmed',
            ]);
            $user->password = bcrypt($request->input('password'));
        }

        $user->save();

        return redirect('/');
    }
}
