<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/db-check', function () {
    try {
        \DB::connection()->getPdo();
        return '✅ DB Connected!';
    } catch (\Exception $e) {
        return '❌ DB Error: ' . $e->getMessage();
    }
});
