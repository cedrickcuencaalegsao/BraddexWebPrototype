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
    #
    # https://github.com/SEVENthNotes7/braddexWebPrototype.git
    #
    public function authLogin(Request $request)
    {
        // this function is use to validate login and authenticate the session.
        // step 1. here we validate the input from the request.
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|email',
            'password' => 'required|string|min:6',
        ]);
        // step 2. let's have the condition that if the validator fails.
        // we resturn message such as invalid email and password
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid Email and password'], 422);
        }
        // step 3. here we make sure that the request is only email and password.
        // otherwise the login request should be a failed request.
        $credentials = $request->only('email', 'password');
        // step 4. if credentials if okay then we attemp to authenticate the session.
        if (Auth::attempt($credentials)) {
            // get user data from our table users.
            $user = Auth::user();
            // create token and get id to be store on out browser local storage..
            $token = $user->createToken('AuthToken')->accessToken;
            $id = Auth::user()->id;
            // identify if the logging in user is and administrator or regular user only.
            if (Auth::user()->isAdmin === 1) {
                $isAdmin = true;
            } else {
                $isAdmin = false;
            }
            // update the table to make the user online.
            User::find($id)->update(['isOnline' => true]);
            // now we create an object called data to be return on our frontend.
            $data = ([
                "token" => $token,
                "id" => $id,
                "isAdmin" => $isAdmin,
                "isOnline" => Auth::user()->isOnline,
            ]);
            // returning the object in json format
            return response()->json(compact('data'));
        }
        // if and only if the login authentication failed.
        return response()->json(['message' => 'Login Failed'], 401);

    }
    public function authRegister(Request $request)
    {
        // this fucntion uses POST to add new user on our table users.
        // step 1. always validate the input if neccessary.
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
        // step 2. return error validator messages to our frontend.
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        // step 3. if the validator don't have any error response.
        // we insert all data to our table users.
        // with a default value on the following columns: isActive, isOnline and isAdmin
        // note that was boolean data types so we can use 0 and 1 or True or False as a default.
        User::create([
            'f_name' => $request->first_name,
            'l_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'isActive' => 1,
            'isOnline' => 0,
            'isAdmin' => 0,
        ]);
        // step 4. return message to our frontend to tell the user that they have successfully registered.
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    public function authLogout($id)
    {
        // we flush the seasion.
        Session::flush();
        // invalidate the authentication or logout.
        Auth::logout();
        // update the isOnline into false.
        User::find($id)->update(['isOnline' => false]);
        // return response that we are logout.
        return response()->json(['message' => 'Successfully logout.']);
    }
    public function allUsers()
    {
        // get all data from the table users.
        $data = User::all();
        // return the data in json format.
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
        $data = tbl_menu::all();
        $image = $data->pluck('image');
        return response()->json($image);
    }
}
