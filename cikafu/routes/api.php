<?php
Route::get('/ping', function () {
    return response()->json(['msg' => 'pong']);
});
Route::get('/posts', [PostController::class, 'index']);
