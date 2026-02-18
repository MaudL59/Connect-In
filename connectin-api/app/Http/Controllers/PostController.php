<?php
// PostController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth; // Gestion utilisateur connecté
use Illuminate\Support\Facades\Gate; // Permet de gérer les autorisations (Gate)
use Carbon\Carbon; // Gestion date et heure

class PostController extends Controller
{   
    public function __construct(private PostRepositoryInterface $posts)
    {
        // Permet d'afficher les dates en français
        // Exemple : "il y a 2 minutes", "15 février 2025"
        Carbon::setLocale('fr');
    }

    // Fonction de sauvegarde du post
    public function save(Request $request) {

        $user_id = Auth::id();
        $content = $request->input('content');
        $image_path = $request->input('image_path');
        
        // Creation du post
        $post = Post::create([
            'user_id' => $user_id, 
            'content' => $content,
            'image_path' => $image_path
        ]);
        
        return response()->json([
            'message' => 'C\'est posté !',

            // Carbon permet d'afficher la date du post en format lisible
            // diffForHumans() = "il y a 3 secondes", "il y a 1 heure"
            'created_at' => Carbon::parse($post->created_at)->diffForHumans()

        ], 201);

        // erreur 201 est Quand un utilisateur poste un Commentaire ou un Like.
    }


    // Fonction de supression du posts
    public function delete($id) {
        
        $post = Post::find($id);

        // 1. Vérifie si le post existe (pour éviter un crash)
        if (!$post) {
            return response()->json(['message' => 'Post introuvable'], 404);
            // erreur 404 Si on cherche un post qui n'existe plus.
        }

        /*
        
        Gate vérifie si l'utilisateur connecté
        est autorisé à modifier/supprimer ce post.

        Le Gate "update-post" doit être défini dans :
        app/Providers/AuthServiceProvider.php

        Gate::denies → refuse si l'utilisateur n'est pas le propriétaire
        */

        if (Gate::denies('update-post', $post)) {
            return response()->json([
                'message' => 'Attention tu essaies de supprimer le post d\'un autre utilisateur'
            ], 403);
            // erreur 403 est Si un utilisateur tente de supprimer le post d'un autre.
        }

        // Si autorisé → suppression
        $post->delete(); 
         
        return response()->json([
            'message' => 'Post supprimé avec succès !',

            // Affiche date suppression en français
            'deleted_at' => Carbon::now()->translatedFormat('d F Y H:i')
        ], 200);

        // code 200 = Succès 
    }
}
