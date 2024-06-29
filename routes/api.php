<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;

Route::get('person/', [PersonController::class, 'index']);
Route::get('person/{id}', [PersonController::class, 'show']);
Route::post('person', [PersonController::class, 'store']);
Route::put('person/{id}', [PersonController::class, 'update']);
Route::delete('person/{id}', [PersonController::class, 'destroy']);
