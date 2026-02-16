<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- LA PARTIE À AJOUTER ---
// Cette route répond à GET /api/ping
Route::get('/ping', function () {
    return response()->json([
        'message' => 'L\'API fonctionne !'
    ]);
});