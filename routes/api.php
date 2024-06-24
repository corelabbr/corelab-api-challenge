<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/todo', [TodoController::class, 'store']);

Route::get('/todos', [TodoController::class, 'index']);

Route::put('/todo/{id}', [TodoController::class, 'update']);

Route::get('/todo/{id}', [TodoController::class, 'show']);

Route::delete('/todo/delete/{id}', [TodoController::Class, 'destroy']);