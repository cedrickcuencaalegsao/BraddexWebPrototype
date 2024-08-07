<?php

namespace App\Http\Controllers;

use App\Models\tbl_inventory;
use App\Models\tbl_order;
use App\Models\User;
use App\Models\tbl_cart;
use App\Models\tbl_menu;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class braddexdb_controller extends Controller
{
    #
    # https://github.com/cedrickcuencaalegsao/BraddexWebPrototype.git
    #
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
            $uuid = Auth::user()->userID;
            if (Auth::user()->isAdmin === 1) {
                $isAdmin = true;
            } else {
                $isAdmin = false;
            }
            $id = Auth::user()->id;
            User::find($id)->update(['isOnline' => true, 'isActive' => true]);
            $data = ([
                "token" => $token,
                "uuid" => $uuid,
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
            'uuid' => 'required',
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $created_at = Carbon::now()->toDateTimeString();
        $user = User::insert([
            'userID' => $request->uuid,
            'f_name' => $request->first_name,
            'l_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'isActive' => true,
            'isOnline' => false,
            'isAdmin' => false,
            'created_at' => $created_at,
        ]);

        if ($user) {
            return response()->json(true);
        }

        return response()->json(false);
    }
    public function authLogout($uuid)
    {
        Session::flush();
        Auth::logout();
        // update the isOnline into false.
        $user = User::where('userID', $uuid)->first();
        $id = $user->id;
        if ($id != null) {
            User::find($id)->update(['isOnline' => false]);
            return response()->json(['message' => 'Updated']);
        }
        return response()->json(['message' => 'Signed out successfully.']);
    }
    public function allUsers()
    {
        $data = User::all();
        return response()->json(['users' => $data]);
    }
    public function getUserProfile($uuid)
    {
        if ($uuid !== null) {
            $data = User::where('userID', $uuid)->first();
            return response()->json(compact('data'));
        } else {
            return response()->json(['message' => 'Invalid user id']);
        }
    }
    public function getMenu()
    {
        $data = tbl_menu::all(); // get all data fro
        return response()->json(compact('data'));
    }
    public function getMenuData()
    {
        $menu = tbl_menu::all();
        return response()->json(compact('menu'));
    }
    public function uploadMenu(Request $request)
    {
        $created_at = Carbon::now()->toDateTimeString();
        $validator = Validator::make($request->all(), [
            'menuID' => 'required',
            'name' => 'required',
            'price' => 'required',
            'image' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid empty parameter.']);
        }
        $data = $request->all();
        $name = $data['name'];
        $val_count = count(tbl_menu::where('menu_name', $name)->get());

        if ($val_count == 0) {
            if ($request->file('image')) {
                // Renaming and Moving the image.
                $image = $request->file('image');
                $destinationPath = 'images/menu';
                $profileImage = time() . "." . $image->getClientOriginalExtension();
                $image->move($destinationPath, $profileImage);
                $data['image'] = $profileImage;

                // Uploading the Menu to our database.
                tbl_menu::insert([
                    'menuID' => $data['menuID'],
                    'menu_name' => $data['name'],
                    'price' => $data['price'],
                    'image' => $data['image'],
                    'isAvialable' => "Available", // Available (default), NotAvailable, Limited.
                    'bestselling' => true,
                    'created_at' => $created_at,
                ]);
            }

            return response()->json(['message' => 'Successfully uploaded.']);
        } else {
            return response()->json(['message' => 'Menu already uploaded.']);
        }
    }
    public function bestSelling()
    {
        $data = tbl_menu::where('bestselling', true)->get();
        return response()->json(compact('data'));
    }
    public function getAdminUsersWidgets()
    {
        $users = count(User::all());
        $offline = count(User::where('isOnline', false)->get());
        $online = count(User::where('isOnline', true)->get());
        return response()->json(compact('users', 'offline', 'online'));
    }
    public function getAdminProductsWidgets()
    {
        $menu = count(tbl_menu::all());
        $available = count(tbl_menu::where('isAvialable', 'Available')->get());
        $notAvailable = count(tbl_menu::where('isAvialable', 'notAvailable')->get());
        $limited = count(tbl_menu::where('isAvialable', 'limited')->get());
        return response()->json(compact('menu', 'available', 'notAvailable', 'limited'));
    }
    public function getAdminCartWidget()
    {
        $cart = count(tbl_cart::all());
        $deleted = count(tbl_cart::where('isDeleted', true)->get());
        $notDeleted = count(tbl_cart::where('isDeleted', false)->get());
        return response()->json(compact('cart', 'deleted', 'notDeleted'));
    }
    public function getAdminOrderWidget()
    {
        $order = count(tbl_order::all());
        $deleted = count(tbl_order::where('isDeleted', true)->get());
        $notDeleted = count(tbl_order::where('isDeleted', false)->get());
        $pending = count(tbl_order::where('isDelivered', false)->get());
        $delivered = count(tbl_order::where('isDelivered', true)->get());
        return response()->json(compact('order', 'deleted', 'notDeleted', 'pending', 'delivered'));
    }
    public function getAdminHomeChartData()
    {
        $data = tbl_order::all();
        return response()->json(compact('data'));
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

        $user = User::find($id)->update([
            'f_name' => $request->f_name,
            'l_name' => $request->l_name,
            'email' => $request->email,
            'address' => $request->address,
            'phone_no' => $request->phone_no,
            'birthday' => $request->birthday,
        ]);
        if ($user) {
            return response()->json(true);
        }
    }
    public function updateProfilePicture(Request $request)
    {
        // putting all the request in to one variable.
        $data = $request->all();
        // getting the user if from the request.
        $uuid = $data['uuid'];
        // Checking if the user have a recent profile.
        // if we have then were going to delete that image in out system permanently.
        $userData = User::where('userID', $uuid)->first(); // getting the user data from database.
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
                // moving the image to our target path
                $image->move($destinationPath, $profileImage);
                // the image name we are going to save on the database.
                $data['image'] = $profileImage;
                // update the database.
                User::where('userID', $uuid)->update([
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
                // moving the image to our target path
                $image->move($destinationPath, $profileImage);
                // the image name we are going to save on the database.
                $data['image'] = $profileImage;
                // update the database.
                User::where('userID', $uuid)->update([
                    'prof_pic' => $data['image'],
                ]);
            }
        }
        // response that will message the user if the action has been done successfully.
        return response()->json(['message' => 'Successfully updated, please reload the page to see changes']);
    }
    public function getAllCart()
    {
        $cart = tbl_cart::all();
        return response()->json(compact('cart'));
    }
    public function addToCart(Request $request)
    {
        $created_at = Carbon::now()->toDateTimeString();
        $data = $request->all();
        $menuID = $data['menuID'];
        $userID = $data['userID'];
        $val_count = count(tbl_cart::where('menuID', $menuID)->where('userID', $userID)->where('isDeleted', false)->get());

        if ($val_count === 0) {
            tbl_cart::insert([
                'cartID' => $data['cartID'],
                'userID' => $data['userID'],
                'menuID' => $data['menuID'],
                'isDeleted' => false,
                'created_at' => $created_at,
            ]);
            return response()->json(['message' => 'Successfully added to cart.'], 201);
        } else {
            return response()->json(['message' => 'Menu already added to cart.']);
        }
    }
    public function getCart($uuid)
    {
        $data = tbl_cart::where('userID', $uuid)->where('isDeleted', false)->get();
        return response()->json(compact('data'));
    }
    public function getCartMenu(Request $request)
    {
        $ids = $request->all();
        $data = tbl_menu::whereIn('menuId', $ids)
            ->get();
        return response()->json(compact('data'));
    }
    public function updateIsDeleteCartMenu(Request $request)
    {
        $data = $request->all();
        $uuID = $data['uuID'];
        $menuID = $data['menuID'];
        $response = tbl_cart::where('menuID', $menuID)->where('userID', $uuID)->update(['isDeleted' => true]);
        if ($response !== false) {
            return response()->json(['message' => 'Cart successfully deleted.']);
        } else {
            return response()->json(['message' => 'Request Failed.']);
        }
    }
    public function multiIsDeleteCartMenu(Request $request)
    {
        $req = $request->all();
        foreach ($req as $item) {
            tbl_cart::where('userID', $item['uuID'])->where('menuID', $item['menuID'])->update([
                'isDeleted' => true,
            ]);
        }
        return response()->json(compact('req'));
    }
    public function orderNow(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'uuID' => 'required',
            'menuID' => 'required',
            'menuName' => 'required',
            'menuPrice' => 'required|numeric|not_in:0',
            'orderID' => 'required',
            'paymentType' => 'required',
            'quantity' => 'required|integer|not_in:0',
            'totalAmmount' => 'required|numeric|not_in:0',
            'userAddress' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['response' => $validator->errors()], 422);
        }
        $created_at = Carbon::now()->toDateTimeString();
        $creatOrder = tbl_order::insert([
            'orderID' => $data['orderID'],
            'userID' => $data['uuID'],
            'menuID' => $data['menuID'],
            'paymentType' => $data['paymentType'],
            'userAddress' => $data['userAddress'],
            'totalAmmount' => $data['totalAmmount'],
            'quantity' => $data['quantity'],
            'isPaid' => false,
            'isDelivered' => false,
            'isDeleted' => false,
            'isCancelled' => false,
            'created_at' => $created_at,
        ]);
        if ($creatOrder) {
            return response()->json(['response' => 'Order Created.'], 201);
        } else {
            return response()->json(['response' => 'Order failed.'], 422);
        }
    }
    public function getOrders($uuid)
    {
        $data = tbl_order::where('userID', $uuid)->where('isDeleted', false)->where('isPaid', false)->where('isCancelled', false)->where('isDelivered', false)->get();
        return response()->json(compact('data'));
    }
    public function getOrderData()
    {
        $order = tbl_order::all();
        return response()->json(compact('order'));
    }
    public function getOrderNowMenu($menuID)
    {
        $menu = tbl_menu::where('menuID', $menuID)->first();
        return response()->json(compact('menu'));
    }
    public function multiOrder(Request $request)
    {
        $created_at = Carbon::now()->toDateTimeString();
        $req = $request->all();
        foreach ($req as $item) {
            tbl_order::insert([
                'orderID' => $item['orderID'],
                'userID' => $item['uuID'],
                'menuID' => $item['menuID'],
                'paymentType' => $item['paymentType'],
                'userAddress' => $item['address'],
                'totalAmmount' => $item['totalPrice'],
                'quantity' => $item['Quantity'],
                'isPaid' => false,
                'isDelivered' => false,
                'isCancelled' => false,
                'isDeleted' => false,
                'created_at' => $created_at,
            ]);
        }
        return response()->json(compact('req'));
    }
    public function getDeliveryMenu(Request $request)
    {
        $data = $request->all();
        $menu = tbl_menu::whereIn('menuID', $data)->get();
        return response()->json(compact('menu'));
    }
    public function getDeliveryData()
    {
        $delivery = tbl_order::where('isDelivered', false)->get();
        $countDelivery = count(tbl_order::where('isDelivered', false)->get());
        $cancelled = count(tbl_order::where('isDelivered', false)->where('isCancelled', true)->get());
        $notCancelled = count(tbl_order::where('isDelivered', false)->where('isCancelled', false)->get());
        return response()->json(compact('delivery', 'countDelivery', 'cancelled', 'notCancelled'));
    }
    public function multipleDelivery(Request $request)
    {
        $req = $request->all();
        $menu = tbl_menu::whereIn('menuID', $req)->get();
        return response()->json(compact('menu'));
    }
    public function cancelOrder(Request $request)
    {
        $req = $request->all();
        $uuID = $req['uuID'];
        $menuID = $req['menuID'];
        $updated_at = Carbon::now()->toDateTimeString();
        tbl_order::where('userID', $uuID)->where('menuID', $menuID)->update([
            'isCancelled' => true,
            'updated_at' => $updated_at,
        ]);
        return response()->json(['message' => 'Order canceled successfully. ']);
    }
    public function userMarkDeliverd(Request $request)
    {
        $req = $request->all();
        $uuID = $req['uuID'];
        $menuID = $req['menuID'];
        $updated_at = Carbon::now()->toDateTimeString();
        tbl_order::where('userID', $uuID)->where('menuID', $menuID)->update([
            'isDelivered' => true,
            'updated_at' => $updated_at,
        ]);
        return response()->json(['message' => 'Mark as delivered.']);
    }
    public function getHistory($uuID)
    {
        $cart = tbl_cart::where('userID', $uuID)->where('isDeleted', false)->get();
        $order = tbl_order::where('userID', $uuID)->where('isDeleted', false)->get();
        return response()->json(compact('cart', 'order'));
    }
    public function delCartHistory(Request $request)
    {
        $data = $request->all();
        $userID = $data['uuid'];
        $cartID = $data['cartID'];
        $cart = tbl_cart::where('userID', $userID)->where('cartID', $cartID)->update([
            'isDeleted' => true,
        ]);
        if ($cart) {
            return response()->json(true);
        }
    }
    public function delOrderHistory(Request $request)
    {
        $data = $request->all();
        $userID = $data['uuid'];
        $orderID = $data['orderID'];
        $order = tbl_order::where('userID', $userID)->where('orderID', $orderID)->update([
            'isDeleted' => true
        ]);
        if ($order) {
            return response()->json(true);
        }
    }
    public function getTitleImgaes()
    {
        $data = tbl_menu::all();
        $image = $data->pluck('image');
        return response()->json($image);
    }
    public function getUserDBData($uuid)
    {
        $id = $uuid;
        $order = count(tbl_order::all());
        $userOrder = count(tbl_order::where('userID', $id)->where('isDelivered', false)->get());
        $cancelledOrder = count(tbl_order::where('userID', $id)->where('isCancelled', true)->get());
        $delivered = count(tbl_order::where('userID', $id)->where('isDelivered', true)->get());
        $cart = count(tbl_cart::all());
        $userCart = count(tbl_cart::where('userID', $id)->where('isDeleted', false)->get());
        $data = [
            'order' => $order,
            'userOder' => $userOrder,
            'cancelledOrder' => $cancelledOrder,
            'delivered' => $delivered,
            'cart' => $cart,
            'userCart' => $userCart,
        ];
        return response()->json(compact('data'));
    }
    public function personalInfoNameUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userID' => 'required',
            'f_name' => 'required',
            'l_name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Please check the all inputs.'], 422);
        }
        $data = $request->all();
        $updated_at = Carbon::now()->toDateTimeString();
        $user = User::where('userID', $data['userID'])->update([
            'f_name' => $data['f_name'],
            'l_name' => $data['l_name'],
            'updated_at' => $updated_at,
        ]);
        if ($user) {
            return response()->json(['message' => 'Changes saved. Please refresh the page to see changes']);
        }
        return response()->json(['message' => 'Attempt to save changes failed.']);
    }
    public function personalInfoOtherUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userID' => 'required',
            'address' => 'required',
            'birthDate' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Birthday and Address should not be empty.']);
        }
        $data = $request->all();
        $updated_at = Carbon::now()->toDateTimeString();
        $user = User::where('userID', $data['userID'])->update([
            'address' => $data['address'],
            'birthday' => $data['birthDate'],
            'updated_at' => $updated_at,
        ]);
        if ($user) {
            return response()->json(['message' => 'Changes saved. Refresh the page']);
        }
        return response()->json(['message' => 'Changes Saved failed.']);
    }
    public function personalInfoIsAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userID' => 'required',
            'isActive' => 'required',
            'isAdmin' => 'required',
            'isOnline' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Please check the name.'], 422);
        }
        $data = $request->all();
        $updated_at = Carbon::now()->toDateTimeString();
        $user = User::where('userID', $data['userID'])->update([
            'isActive' => $data['isActive'],
            'isAdmin' => $data['isAdmin'],
            'isOnline' => $data['isOnline'],
            'updated_at' => $updated_at,
        ]);
        if ($user) {
            return response()->json(['message' => 'Changes saved. Refresh the page']);
        }
        return response()->json(['message' => 'Changes Saved failed.']);
    }
    public function getCartData($cartID)
    {
        $cart = tbl_cart::where('cartID', $cartID)->get();
        return response()->json($cart);
    }
    public function getCartDataMenu($menuID)
    {
        $menu = tbl_menu::where('menuID', $menuID)->get();
        return response()->json(compact('menu'));
    }
    public function cartMarkAsDelete(Request $request)
    {
        $data = $request->all();
        $cartID = $data['cartID'];
        $cart = tbl_cart::where('cartID', $cartID)->update(['isDeleted' => true]);
        if ($cart) {
            return response()->json(true);
        }
        return response()->json(false);
    }
    public function changesCartMark(Request $request)
    {
        $data = $request->all();
        $cartID = $data['cartID'];
        $isDeleted = $data['isDeleted'];

        $newStatus = $isDeleted === 0 ? true : false;

        $cart = tbl_cart::where('cartID', $cartID)->update(['isDeleted' => $newStatus]);
        if ($cart) {
            return response()->json(true);
        }
        return response()->json(false);
    }
    public function getUpdateMenu($menuID)
    {
        $menu = tbl_menu::where('menuID', $menuID)->get();
        $cartCount = count(tbl_cart::all());
        $menuInTbl_Cart = count(tbl_cart::where('menuID', $menuID)->where('isDeleted', false)->get());
        $orderCount = count(tbl_order::all());
        $menuInTbl_Order = count(tbl_order::where('menuID', $menuID)->where('isDeleted', false)->get());
        return response()->json(compact('menu', 'cartCount', 'menuInTbl_Cart', 'orderCount', 'menuInTbl_Order'));
    }
    public function changeMenuStatus(Request $request)
    {
        $data = $request->all();
        $menuID = $data['menuID'];
        $menu = tbl_menu::where('menuID', $menuID)->update(['isAvialable' => $data['isAvailable']]);
        if ($menu) {
            return response()->json(['message' => 'Updated successfully']);
        }
        return response()->json(['message' => 'Update Failed']);
    }
    public function updateMenu(Request $request)
    {
        $data = $request->all();
        $menuID = $data['menuID'];
        $menu_name = $data['menu_name'];
        $price = $data['price'];
        $bestselling = $data['bestselling'];
        $menu = tbl_menu::where('menuID', $menuID)->update([
            'bestselling' => $bestselling,
            'menu_name' => $menu_name,
            'price' => $price,
        ]);

        if ($menu) {
            return response()->json(true);
        }
        return response()->json(false);
    }
    public function updateMenuImage(Request $request)
    {
        // validate the request
        $validator = Validator::make($request->all(), [
            'menuID' => 'required',
            'image' => 'required',
        ]);
        // return the error if the validation fails.
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $data = $request->all(); // making all request into one array

        $menuID = $data['menuID']; // get the menu id from the request.

        // get the existing menu data
        $menuData = tbl_menu::where('menuID', $menuID)->first();
        // if false then return the error.
        if (!$menuData) {
            return response()->json(['error' => 'Menu not found']);
        }
        // if true then we update the menu image.
        $recentMenuImage = $menuData['image'];
        // if the recent menu image varaible is not null then we should delete the existing menu image form the syste, this feature is only temporary.
        if ($recentMenuImage != null) {
            File::delete(public_path(
                'images/menu/' . $recentMenuImage
            ));
        }
        // if the file uploaded is an image then we update otherwise the return the error.
        if ($request->file('image')) {
            // renaming the image into the time it has been uploaded by the user.
            $image = $request->file('image'); // get the image.
            $destinationPath = 'images/menu'; // dir where we store the image.
            // rename the image while keeping the orignal extension of the file uploaded.
            $profileImage = time() . "." . $image->getClientOriginalExtension();
            // now we move the file to our destination path.
            $image->move($destinationPath, $profileImage);
            // now we update the database.
            $update = tbl_menu::where('menuID', $menuID)->update([
                'image' => $profileImage,
            ]);
            if ($update) {
                return response()->json(true); // we return true.
            }
        }
        return response()->json(false); // if action files return false.
    }
    public function EditOrderAPI($orderID)
    {
        $order = tbl_order::where('orderID', $orderID)->get();
        return response()->json(compact('order'));
    }
    public function getOrderMenuData($menuID)
    {
        $menu = tbl_menu::where('menuID', $menuID)->get();
        return response()->json(compact('menu'));
    }
    public function updateOrderData(Request $request)
    {
        $data = $request->all();
        $orderID = $data['orderID'];

        $order = tbl_order::where('orderID', $orderID)->update([
            'isPaid' => $data['isPaid'],
            'isCancelled' => $data['isCancelled'],
            'isDelivered' => $data['isDelivered'],
            'isDeleted' => $data['isDeleted'],
            'updated_at' => Carbon::now()->toDateTimeString(),
        ]);
        if ($order) {
            return response()->json(true);
        }
        return response()->json(false);
    }
    public function getAllStatistics()
    {
        // table users data.
        $countUser = count(User::all());
        $onlineUser = count(User::where('isOnline', true)->get());
        $offlineUser = count(User::where('isOnline', false)->get());
        $activeAccount = count(User::where('isActive', true)->get());
        $inActiveAccount = count(User::where('isActive', false)->get());
        $withoutPhone = count(User::where('phone_no', null)->get());
        $withoutAddress = count(User::where('address', null)->get());
        $withoutProfile = count(User::where('prof_pic', null)->get());

        // table cart data.
        $countCart = count(tbl_cart::all());
        $cartDeleted = count(tbl_cart::where('isDeleted', true)->get());
        $cartNotDeleted = count(tbl_cart::where('isDeleted', false)->get());
        $cartNotUpdate = count(tbl_cart::where('updated_at', null)->get());

        // table menu data.
        $countMenu = count(tbl_menu::all());
        $notAvailable = count(tbl_menu::where('isAvialable', 'NotAvailable')->get());
        $limited  = count(tbl_menu::where('isAvialable', "Limited")->get());
        $available = count(tbl_menu::where('isAvialable', 'Available')->get());
        $bestSelling = count(tbl_menu::where('bestselling', true)->get());

        // table order data.
        $countOrder = count(tbl_order::all());
        $isPaid = count(tbl_order::where('isPaid', true)->get());
        $isDelivered = count(tbl_order::where('isDelivered', true)->get());
        $isCancelled = count(tbl_order::where('isCancelled', true)->get());
        $isDeleted = count(tbl_order::where('isDeleted', true)->get());
        $notUpdated = count(tbl_order::where('updated_at', null)->get());

        // user data object.
        $user_data = [
            'count_user' => $countUser,
            'online_user' => $onlineUser,
            'offline_user' => $offlineUser,
            'active_account' => $activeAccount,
            'inactive_account' => $inActiveAccount,
            'without_phone' => $withoutPhone,
            'without_address' => $withoutAddress,
            'without_profile' => $withoutProfile,
        ];

        // cart data object.
        $cart_data = [
            'count_cart' => $countCart,
            'cart_deletd' => $cartDeleted,
            'cart_not_deleted' => $cartNotDeleted,
            'cart_not_updated' => $cartNotUpdate,
        ];

        // menu data object.
        $menu_data = [
            'count_menu' => $countMenu,
            'not_available' => $notAvailable,
            'limited' => $limited,
            'available' => $available,
            'best_selling' => $bestSelling,
        ];

        // order data.
        $order_data = [
            'count_order' => $countOrder,
            'is_paid' => $isPaid,
            'is_delivered' => $isDelivered,
            'is_cancelled' => $isCancelled,
            'is_deleted' => $isDeleted,
            'not_updated' => $notUpdated,
        ];

        return response()->json(compact('user_data', 'cart_data', 'menu_data', 'order_data'));
    }
    public function updateAccountState(Request $request)
    {
        $data = $request->all();
        $uuid = $data['uuid'];
        $user = User::where('userID', $uuid)->update([
            'isActive' => $data['isActive'],
            'isOnline' => $data['isOnline'],
        ]);
        if ($user) {
            return response()->json(true);
        }
    }
    public function updateAdminPersInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required',
            'phone_no' => 'required|integer',
            'address' => 'required|string|max:70',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $data = $request->all();
        $userID = $data['uuid'];
        $user = User::where('userID', $userID)->update([
            'f_name' => $data['first_name'],
            'l_name' => $data['last_name'],
            'email' => $data['email'],
            'phone_no' => $data['phone_no'],
            'address' => $data['address'],
        ]);
        if ($user) {
            return response()->json(true);
        }
    }
    public function getDataClientSettings($uuid)
    {
        $userData = User::where('userID', $uuid)->get();
        $countCart = count(tbl_cart::where('userID', $uuid)->get());
        $userCart = count(tbl_cart::where('userID', $uuid)->where('isDeleted', false)->get());
        $countOrder = count(tbl_order::where('userID', $uuid)->get());
        $userOrder = count(tbl_order::where('userID', $uuid)->where('isDeleted', false)->get());
        return response()->json(compact('userData', 'countCart', 'userCart', 'countOrder', 'userOrder'));
    }
    public function userSettingsUpdate(Request $request)
    {
        $upated_at = Carbon::now()->toDateTimeString();
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'f_name' => 'required|string|max:50',
            'l_name' => 'required|string|max:50',
            'email' => 'required|email',
            'phone_no' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $data = $request->all();
        $userID = $data['userID'];

        $user = User::where('userID', $userID)->update([
            'f_name' => $data['f_name'],
            'l_name' => $data['l_name'],
            'email' => $data['email'],
            'phone_no' => $data['phone_no'],
            'birthday' => $data['birthday'],
            'address' => $data['address'],
            'isOnline' => $data['isOnline'],
            'updated_at' => $upated_at,
        ]);
        if ($user) {
            return response()->json(true);
        }
        return response()->json(false);
    }
    public function getInventoryData()
    {
        $data = tbl_inventory::all();
        return response()->json(compact('data'));
    }
    public function addItems(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'itemID' => 'required',
            'name' => 'required',
            'price' => ' required',
            'quantity' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->all();
        $created_at = Carbon::now()->toDateTimeString();

        if ($request->file('image')) {
            $image = $request->file('image');
            $destinationPath = 'images/items';
            $profileImage = time() . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $data['image'] = $profileImage;

            $item = tbl_inventory::insert([
                'itemID' => $data['itemID'],
                'name' => $data['name'],
                'price' => $data['price'],
                'quantity' => $data['quantity'],
                'image' => $data['image'],
                'isDeleted' => false,
                'created_at' => $created_at,
            ]);
            if ($item) {
                return response()->json(true);
            }
        }
        return response()->json(false);
    }
}
