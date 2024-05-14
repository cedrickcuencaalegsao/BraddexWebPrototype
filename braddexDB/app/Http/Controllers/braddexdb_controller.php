<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\tbl_menu;
use App\Models\tbl_cart;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
    public function updateIsAdmin(Request $request, $id)
    {
        $data = $request->all();
        if ($data['isAdmin'] == 'true') {
            User::find($id)->update([
                'isAdmin' => true,
            ]);
            return response()->json(['message' => 'Updated account type to admin']);
        } else {
            User::find($id)->update([
                'isAdmin' => false,
            ]);
            return response()->json(['message' => 'Updated account type to Client']);
        }
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
    public function onlineUsers()
    {
        $users = count(User::all());
        $offline = count(User::where('isOnline', false)->get());
        $online = count(User::where('isOnline', true)->get());
        return response()->json(compact('users', 'offline', 'online'));
    }
    public function updateProfileDetails(Request $request)
    {
        $id = $request->id;

        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        User::find($id)->update([
            'f_name' => $request->f_name,
            'l_name' => $request->l_name,
            'email' => $request->email,
            'address' => $request->address,
            'phone_no' => $request->phone_no,
            'birthday' => $request->birthday,
        ]);
        return response()->json(['message' => 'Updated successfully'], 201);
    }
    public function updateProfilePicture(Request $request)
    {
        // putting all the request in to one variable.
        $data = $request->all();
        // getting the user if from the request.
        $id = $data['id'];
        // Checking if the user have a recent profile.
        // if we have then were going to delete that image in out system permanently.
        $userData = User::where('id', $id)->first(); // getting the user data from database.
        $recentImage = $userData['prof_pic']; // here we get the image from the user data
        // now we need to condition it.
        // if recent image is null so we upload the image directly, else we need to delete the upload the file from the request.
        if ($recentImage != null) {
            // deleting the file.
            File::delete(public_path('images/profile/' . $recentImage));
            // validate if the request file is an image.
            if ($request->file('image')) {
                // Renaming and Moving the image.
                $image = $request->file('image'); // getting image from the request.
                // directory where we are going to save the file.
                $destinationPath = 'images/profile';
                // renaming the file.
                $profileImage = time() . "." . $image->getClientOriginalExtension();
                // moving the image to our distanation path
                $image->move($destinationPath, $profileImage);
                // the image name we are going to save on the database.
                $data['image'] = $profileImage;
                // update the database.
                User::find($id)->update([
                    'prof_pic' => $data['image'],
                ]);
            }
        } else {
            // here we don't need any file to be deleted so we proceed to validating if the request file is and image.
            if ($request->file('image')) {
                // Renaming and Moving the image.
                $image = $request->file('image'); // getting image from the request.
                // directory where we are going to save the file.
                $destinationPath = 'images/profile';
                // renaming the file.
                $profileImage = time() . "." . $image->getClientOriginalExtension();
                // moving the image to our distanation path
                $image->move($destinationPath, $profileImage);
                // the image name we are going to save on the database.
                $data['image'] = $profileImage;
                // update the database.
                User::find($id)->update([
                    'prof_pic' => $data['image'],
                ]);
            }
        }
        // response that will message the user if the action has been done successfully.
        return response()->json(['message' => 'Successfully updated, please reload the page to see changes']);
    }
    public function addToCart(Request $request)
    {
        $created_at = Carbon::now()->toDateTimeString();
        $data = $request->all();
        $menu_id = $data['menu_id'];
        $val_count = count(tbl_cart::where('menu_id', $menu_id)->get());

        if ($val_count === 0) {
            tbl_cart::insert([
                'created_by' => $data['user_id'],
                'menu_id' => $data['menu_id'],
                'isDeleted' => false,
                'created_at' => $created_at,
            ]);
            return response()->json(['message' => 'Successfully added to cart.'], 201);
        } else {
            return response()->json(['message' => 'Menu already added to cart.']);
        }
    }
    public function getCart($id)
    {
        $data = tbl_cart::where('created_by', $id)->get();
        return response()->json(compact('data'));
    }
    public function getCartMenu(Request $request)
    {
        $ids = $request->all();
        $data = tbl_menu::whereIn('id', $ids)->get();
        return response()->json(compact('data'));
    }
    public function orderNow(Request $request)
    {
        return response()->json("order now");
    }
    public function getTitleImgaes()
    {
        $data = tbl_menu::where('bestselling', true)->get();
        $image = $data->pluck('image');
        return response()->json($image);
    }
}
