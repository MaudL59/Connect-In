<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserController;

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

// routes vers les fonctions des controllers
Route::middleware('auth:sanctum')-> group(function(){

    // pour les utilisateurs
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);

    // pour les posts
    Route::post('/posts', [PostController::class, 'save']);
    Route::delete('/posts/{id}', [PostController::class, 'delete']);

    // pour les commentaires
    Route::post('/comments', [CommentController::class, 'save']);
    Route::delete('/comments/{id}', [CommentController::class, 'delete']);

    // pour les likes
    Route::post('/likes', [LikeController::class, 'save']);
    Route::delete('/likes/{id}', [LikeController::class, 'delete']);

});