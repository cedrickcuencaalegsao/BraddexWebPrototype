<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\tbl_menu;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
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
            $id = Auth::user()->id;

            if (Auth::user()->isAdmin === 1) {
                $isAdmin = true;
            } else {
                $isAdmin = false;
            }
            User::find($id)->update(['isOnline' => true]);
            $data = ([
                "token" => $token,
                "id" => $id,
                "isAdmin" => $isAdmin,
                "isOnline" => Auth::user()->isOnline,
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
            'isActive' => 1,
            'isOnine' => 0,
            'isAdmin' => 0,
        ]);
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    public function authLogout($id)
    {
        Session::flush();
        Auth::logout();
        User::find($id)->update(['isOnline' => false]);
        return response()->json(['message' => 'Successfully logout.']);
    }
    public function allUsers()
    {
        $data = User::all();
        return response()->json(['users' => $data]);
    }
    public function updateIsAdmin()
    {
        return response()->json(['message' => 'Update is Admin']);
    }
    public function getUserProfile($id)
    {
        if ($id != null) {
            $data = User::where('id', $id)->first();
            return response()->json(compact('data'));
        } else {
            return response()->json(['message' => 'Invalid user id']);
        }
    }
    public function getMenu()
    {
        $data = tbl_menu::all();
        return response()->json(compact('data'));
    }
    public function uploadMenu(Request $request)
    {
        $created_at = Carbon::now()->toDateTimeString();
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'image' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid empty parameter.']);
        }
        $data = $request->all();
        if ($request->file('image')) {
            // Renaming and Moving the image.
            $image = $request->file('image');
            $destinationPath = 'images/menu';
            $profileImage = time() . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data['image'] = $profileImage;

            // Uploading the Menu to our database.
            tbl_menu::create([
                'menu_name' => $data['name'],
                'price' => $data['price'],
                'image' => $data['image'],
                'bestselling' => true,
                'created_at' => $created_at,
            ]);
        }

        return response()->json(['message' => 'Successfully uploaded...']);
    }
    public function bestSelling()
    {
        $data = tbl_menu::where('bestselling', true)->get();
        return response()->json(compact('data'));
    }
}
