<?php

use App\Http\Controllers\braddexdb_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [braddexdb_controller::class, 'authLogin']);
Route::post('register', [braddexdb_controller::class, 'authRegister']);
Route::post('logout/{uuid}', [braddexdb_controller::class, 'authLogout']);
Route::post('updateIsAdmin/{id}', [braddexdb_controller::class, 'updateIsAdmin']);
Route::post('uploadmenu', [braddexdb_controller::class, 'uploadMenu']);
Route::post('updateprofiledetails', [braddexdb_controller::class, 'updateProfileDetails']);
Route::post('updateprofilepicture', [braddexdb_controller::class, 'updateProfilePicture']);
Route::post('addtocart', [braddexdb_controller::class, 'addToCart']);
Route::post('ordernow', [braddexdb_controller::class, 'orderNow']);
Route::post('getcartmenu', [braddexdb_controller::class, 'getCartMenu']);
Route::post('updatebestselling', [braddexdb_controller::class, 'updateBestselling']);
Route::post('get-delivery-menu', [braddexdb_controller::class, 'getDeliveryMenu']);
Route::post('get-multiple-order', [braddexdb_controller::class, 'multipleDelivery']);
Route::post('multi-order', [braddexdb_controller::class, 'multiOrder']);
Route::post('update-IsDelete-Cart-Menu', [braddexdb_controller::class, 'updateIsDeleteCartMenu']);
Route::post('multi-isDelete-cart-menu', [braddexdb_controller::class, 'multiIsDeleteCartMenu']);
Route::post('cancel-order', [braddexdb_controller::class, 'cancelOrder']);
Route::post('user-mark-delivered', [braddexdb_controller::class, 'userMarkDeliverd']);


Route::get('profile/{uuid}', [braddexdb_controller::class, 'getUserProfile']);
Route::get('menu', [braddexdb_controller::class, 'getMenu']);
Route::get('bestselling', [braddexdb_controller::class, 'bestSelling']);
Route::get('getcart/{uuid}', [braddexdb_controller::class, 'getCart']);
Route::get('getorder/{uuid}', [braddexdb_controller::class, 'getOrders']);
Route::get('titleimages', [braddexdb_controller::class, 'getTitleImgaes']);
Route::get('get-order-now-menu/{menuID}', [braddexdb_controller::class, 'getOrderNowMenu']);
Route::get('get-user-history/{uuID}', [braddexdb_controller::class, 'getHistory']);
// admin dashboard widgets data.
Route::get('get-admin-users-widgets', [braddexdb_controller::class, 'getAdminUsersWidgets']);
Route::get('get-admin-products-widgets', [braddexdb_controller::class, 'getAdminProductsWidgets']);
Route::get('get-admin-cart-widgets', [braddexdb_controller::class, 'getAdminCartWidget']);
Route::get('get-admin-order-widgets', [braddexdb_controller::class, 'getAdminOrderWidget']);
// get all users data.
Route::get('users', [braddexdb_controller::class, 'allUsers']);
// get all cart data.
Route::get('cart', [braddexdb_controller::class, 'getAllCart']);
// get all menu data.
Route::get('get-menu-data', [braddexdb_controller::class, 'getMenuData']);
// get all order Data
Route::get('get-order-data', [braddexdb_controller::class, 'getOrderData']);
// get all delivery data.
Route::get('get-delivery-data', [braddexdb_controller::class, 'getDeliveryData']);
// get user DB data.
Route::get('get-user-db-data/{uuid}', [braddexdb_controller::class, 'getUserDBData']);




// images routes for menu.
Route::get('/images/menu/{filename}', function ($filename) {
    return response()->file(public_path('images/menu/' . $filename));
});
Route::get('/images/profile/{filename}', function ($filename) {
    return response()->file(public_path('images/profile/' . $filename));
});
