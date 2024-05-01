<?php

use App\Http\Controllers\braddexdb_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [braddexdb_controller::class, 'authLogin']);
Route::post('register', [braddexdb_controller::class, 'authRegister']);
Route::post('logout', [braddexdb_controller::class, 'authLogout']);
Route::post('updateIsAdmin', [braddexdb_controller::class, 'updateIsAdmin']);

Route::get('users', [braddexdb_controller::class, 'allUsers']);
Route::get('profile/{id}', [braddexdb_controller::class, 'getUserProfile']);
