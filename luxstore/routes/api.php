<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/user', [LoginController::class, 'getUser']);
    Route::post('/logout', [LoginController::class, 'logout']);
});