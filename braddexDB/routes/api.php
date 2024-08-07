<?php

use App\Http\Controllers\braddexdb_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [braddexdb_controller::class, 'authLogin']);
Route::post('register', [braddexdb_controller::class, 'authRegister']);
Route::post('logout/{uuid}', [braddexdb_controller::class, 'authLogout']);
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
Route::post('personal-Info-Name-Update', [braddexdb_controller::class, 'personalInfoNameUpdate']);
Route::post('personal-Info-Other-Update', [braddexdb_controller::class, 'personalInfoOtherUpdate']);
Route::post('personal-Info-IsAdmin', [braddexdb_controller::class, 'personalInfoIsAdmin']);
Route::post('cart-mark-as-deleted', [braddexdb_controller::class, 'cartMarkAsDelete']);
Route::post('change-cart-mark', [braddexdb_controller::class, 'changesCartMark']);
Route::post('change-menu-status', [braddexdb_controller::class, 'changeMenuStatus']);
Route::post('update-menu', [braddexdb_controller::class, 'updateMenu']);
Route::post('update-menu-image', [braddexdb_controller::class, 'updateMenuImage']);
Route::post('update-order-image', [braddexdb_controller::class, 'updateOrderData']);
Route::post('update-account-state', [braddexdb_controller::class, 'updateAccountState']);
Route::post('update-admin-pers-info', [braddexdb_controller::class, 'updateAdminPersInfo']);
Route::post('del-cart-history', [braddexdb_controller::class, 'delCartHistory']);
Route::post('del-order-history', [braddexdb_controller::class, 'delOrderHistory']);
Route::post('user-settings-update', [braddexdb_controller::class, 'userSettingsUpdate']);
Route::post('add-items', [braddexdb_controller::class, 'addItems']);

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
Route::get('get-admin-home-chart-data', [braddexdb_controller::class, 'getAdminHomeChartData']);
// get all users data.
Route::get('users', [braddexdb_controller::class, 'allUsers']);
// get all cart data.
Route::get('cart', [braddexdb_controller::class, 'getAllCart']);
// get all menu data.
Route::get('get-menu-data', [braddexdb_controller::class, 'getMenuData']);
// get menu-Edit Menu.
Route::get('get-menu-data/{menuID}', [braddexdb_controller::class, 'getUpdateMenu']);
// get all order Data
Route::get('get-order-data', [braddexdb_controller::class, 'getOrderData']);
// get all delivery data.
Route::get('get-delivery-data', [braddexdb_controller::class, 'getDeliveryData']);
// get user DB data.
Route::get('get-user-db-data/{uuid}', [braddexdb_controller::class, 'getUserDBData']);
// get cart db data.
Route::get('get-cart-data/{cartID}', [braddexdb_controller::class, 'getCartData']);
// get cart menu data.
Route::get('get-cart-data-menu/{menuID}', [braddexdb_controller::class, 'getCartDataMenu']);
// get edit order API.
Route::get('edit-order-API/{orderID}', [braddexdb_controller::class, 'EditOrderAPI']);
// get edit oder menu data.
Route::get('get-order-menu-data/{menuID}', [braddexdb_controller::class, 'getOrderMenuData']);
// get all system statistics.
Route::get('gel-all-statistics', [braddexdb_controller::class, 'getAllStatistics']);
Route::get('getDataClientSettings/{uuid}', [braddexdb_controller::class, 'getDataClientSettings']);
Route::get('get-inventory-data', [braddexdb_controller::class, 'getInventoryData']);

// images routes for menu.
Route::get('/images/menu/{filename}', function ($filename) {
    return response()->file(public_path('images/menu/' . $filename));
});
// images routes for profile.
Route::get('/images/profile/{filename}', function ($filename) {
    return response()->file(public_path('images/profile/' . $filename));
});
// images route for no preview.
Route::get('/images/preview/{filename}', function ($filename) {
    return response()->file(public_path('images/preview/' . $filename));
});
