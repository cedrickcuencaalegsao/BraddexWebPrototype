<?php

use App\Http\Controllers\braddexdb_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [braddexdb_controller::class, 'authLogin']);
Route::post('register', [braddexdb_controller::class, 'authRegister']);
Route::post('logout/{id}', [braddexdb_controller::class, 'authLogout']);
Route::post('updateIsAdmin/{id}', [braddexdb_controller::class, 'updateIsAdmin']);
Route::post('uploadmenu', [braddexdb_controller::class, 'uploadMenu']);
Route::post('updateprofiledetails', [braddexdb_controller::class, 'updateProfileDetails']);
Route::post('updateprofilepicture', [braddexdb_controller::class, 'updateProfilePicture']);
Route::post('addtocart', [braddexdb_controller::class, 'addToCart']);
Route::post('ordernow', [braddexdb_controller::class, 'orderNow']);
Route::post('getcartmenu',[braddexdb_controller::class, 'getCartMenu']);

Route::get('users', [braddexdb_controller::class, 'allUsers']);
Route::get('profile/{id}', [braddexdb_controller::class, 'getUserProfile']);
Route::get('menu', [braddexdb_controller::class, 'getMenu']);
Route::get('bestselling', [braddexdb_controller::class, 'bestSelling']);
Route::get('onlineusers', [braddexdb_controller::class, 'onlineUsers']);
Route::get('getcart/{id}', [braddexdb_controller::class, 'getCart']);


// images routes for menu.
Route::get('/images/menu/{filename}', function ($filename) {
    return response()->file(public_path('images/menu/' . $filename));
});
Route::get('/images/profile/{filename}', function ($filename) {
    return response()->file(public_path('images/profile/' . $filename));
});
