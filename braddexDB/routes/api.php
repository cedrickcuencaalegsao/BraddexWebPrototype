<?php

use App\Http\Controllers\braddexdb_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [braddexdb_controller::class, 'authLogin']);
Route::post('register', [braddexdb_controller::class, 'authRegister']);
Route::post('logout/{id}', [braddexdb_controller::class, 'authLogout']);
Route::post('updateIsAdmin', [braddexdb_controller::class, 'updateIsAdmin']);
Route::post('uploadmenu', [braddexdb_controller::class, 'uploadMenu']);

Route::get('users', [braddexdb_controller::class, 'allUsers']);
Route::get('profile/{id}', [braddexdb_controller::class, 'getUserProfile']);
Route::get('menu', [braddexdb_controller::class, 'getMenu']);
Route::get('bestselling', [braddexdb_controller::class, 'bestSelling']);


// images routes for menu.
Route::get('/images/menu/{filename}', function ($filename) {
    return response()->file(public_path('images/menu/' . $filename));
});
