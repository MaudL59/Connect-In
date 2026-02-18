<?php
// PostController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth; // On ajoute ça pour aider l'IDE


class PostController extends Controller
{
    // Fonction de sauvegarde du post
    public function save(request $request) {
        $user_id = Auth::id();
        $content = $request->input('content');
        $image_path = $request->input('image_path');
        
    
    // Creation du post
        Post::create([
            'user_id' => $user_id, 
            'content' => $content,
            'image_path' => $image_path]);
        
        return response()->json(['message' => 'C\'est posté !'], 201);
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

        if ($post->user_id !== Auth::id()) {
        return response()->json(['message' => 'Attention tu essais de suprimmer le post d\'un autre utilisateur'], 403);
        // erreur 403 est Si un utilisateur tente de supprimer le post d'un autre.
        }
        $post->delete(); 
         
        return response()->json(['message' => 'Post supprimé avec succès !'], 200);
        // code 200 = Succès 
                
}
}
