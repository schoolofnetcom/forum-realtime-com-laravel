<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('threads.index');
});

Route::get('/threads/{id}', function ($id) {
    $result = \App\Thread::findOrFail($id);
    return view('threads.view', compact('result'));
});

Route::get('/locale/{locale}', function ($locale) {
    session(['locale' => $locale]);
    return back();
});


Route::get('/login/{provider}', 'SocialAuthController@redirect');
Route::get('/login/{provider}/callback', 'SocialAuthController@callback');

Route::get('/threads', 'ThreadsController@index');
Route::get('/replies/{id}', 'RepliesController@show');

Route::middleware(['auth'])
    ->group(function () {
        Route::post('/threads', 'ThreadsController@store');
        Route::put('/threads/{thread}', 'ThreadsController@update');
        Route::get('/threads/{thread}/edit', function (\App\Thread $thread) {
            return view('threads.edit', compact('thread'));
        });

        Route::get('/reply/highligth/{id}', 'RepliesController@highligth');
        Route::get('/thread/pin/{thread}', 'ThreadsController@pin');
        Route::get('/thread/close/{thread}', 'ThreadsController@close');

        Route::get('/profile', 'ProfileController@edit');
        Route::post('/profile', 'ProfileController@update');

        Route::post('/replies', 'RepliesController@store');
    });

Auth::routes();
