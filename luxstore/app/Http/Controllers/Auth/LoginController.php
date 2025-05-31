<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if (!$user->isAdmin()) {
                return response()->json(['message' => 'You are not an admin'], 401);
            }
            $token = $user->createToken('main')->plainTextToken;
            return response([
                'user' => new UserResource($user),
                'token' => $token
            ]);
        } else {
            return response()->json(['message' => 'Email or password is incorrect'], 401);
        }

    }

    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
    public function getUser(Request $request)
    {
        return new UserResource($request->user());
    }
}