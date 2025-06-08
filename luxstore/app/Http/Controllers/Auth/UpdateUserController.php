<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UpdateUserController extends Controller
{
    public function updateUser(Request $request){
         try {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'address' => 'required',
        ]);

        $user = User::find($request->id);

        if (!$user) {
            throw new Exception('User not found');
        }

        $user->update($request->only([
            'first_name',
            'last_name',
            'email',
            'phone',
            'address',
        ]));

        \Log::info('User updated:', $user->toArray());

        return response()->json(['message' => 'User updated', 'data' => $user]);
    } catch (Exception $e) {
        \Log::error('Error updating user:', $e->getMessage());
        return response()->json(['message' => 'Error updating user'], 500);
    }
    }
}
