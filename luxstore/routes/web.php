<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('{any?}', fn() => view('app'))->where('any', '.*');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
