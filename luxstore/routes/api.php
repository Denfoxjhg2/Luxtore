<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\UpdateUserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/categories', [ProductController::class, 'categories']);


Route::middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/logout', action: [LoginController::class, 'logout']);
        Route::post('/update-user', [UpdateUserController::class, 'updateUser']);
        Route::post('/purchase', [UserController::class, 'purchase']);
        Route::post('/addReview', [UserController::class, 'createReview']);
        Route::get('/orders', [UserController::class, 'getUserOrders']);
        Route::post('/cancel-order', [UserController::class, 'cancelOrder']);
        Route::post('/addProduct', action: [AdminController::class, 'addProduct']);
        Route::post('/addCategory', action: [AdminController::class, 'addCategory']);
        Route::get('/allOrders', [AdminController::class, 'getAllOrders']);
        Route::post('/updateStatus', [AdminController::class, 'updateStatus']);
    });