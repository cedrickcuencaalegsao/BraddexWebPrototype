<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use League\Config\Exception\ValidationException;

class braddexdb_controller extends Controller
{
    public function authLogin(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid Email and password'], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->accessToken;

            if (Auth::user()->isAdmin === 1) {
                $isAdmin = true;
            } else {
                $isAdmin = false;
            }
            $data = ([
                "token" => $token,
                "id" => Auth::user()->id,
                "isAdmin" => $isAdmin,
            ]);
            return response()->json(compact('data'));
        }
        return response()->json(['message' => 'Login Failed'], 401);

    }
    public function authRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        User::create([
            'f_name' => $request->first_name,
            'l_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'isActive' => 0,
            'isOnine' => 0,
            'isAdmin' => 0,
        ]);
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    public function allUsers()
    {
        $data = User::all();
        return response()->json(['users' => $data]);
    }

    public function updateIsAdmin(){
        return response()->json(['message' => 'Update is Admin']);
    }
    public function getUserProfile($id){
        if ($id != null) {
            $data = User::where('id', $id)->first();
            return response()->json(compact('data'));
        } else {
            return response()->json(['message' => 'Invalid user id']);
        }
    }
}
