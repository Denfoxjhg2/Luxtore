<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::user() && Auth::user()->is_admin == 1) {
            return $next($request);
        }
        return response([
            'message' => 'You don\'t have permission to perform this action'
        ], 403);
    }
}