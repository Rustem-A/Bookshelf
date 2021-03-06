<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books/without_authors', 'BookController@withoutAuthors');

Route::resource('/books', 'BookController');
Route::resource('/authors', 'AuthorController');

Route::get('/books/{book}/authors', 'BookController@authors');
Route::get('/authors/{author}/books/total_price', 'AuthorController@totalPrice');
