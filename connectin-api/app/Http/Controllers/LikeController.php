<?php
// LikeController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // On ajoute ça pour aider l'IDE
use App\Interfaces\LikeRepositoryInterface;


class LikeController extends Controller
{
    
    public function __construct(private LikeRepositoryInterface $likes)
{
}

    // Fonction de sauvegarde et de supression du like
    public function save(Request $request) {
        

        $request->validate([
        'post_id' => 'required|exists:posts,id', 
        ]);

        $user_id = Auth::id();
        $post_id = $request->input('post_id');

        $existingLike = Like::where([
            'user_id' => $user_id, 
            'post_id' => $post_id])->first();

        if ($existingLike) {
            $this->likes->deleteSpecific($post_id, $user_id);
            return response()->json(['message' => 'Like retiré'], 200);
        // 200 code de succés 
        }    

        $this->likes->create([
            'user_id' => $user_id, 
            'post_id' => $post_id]);
        return response()->json(['message' => 'C\'est Liké!'], 201);
        // erreur 201 est Quand un utilisateur poste un Commentaire ou un Like.
        }


    // Fonction de supression du like
    public function delete($id) {
        $this->likes->find($id);

        // Vérifie si le like existe (pour éviter un crash)
        if (!$like) {
            return response()->json(['message' => 'Like introuvable'], 404);
            // erreur 404 Si on cherche un like qui n'existe plus.
        }

        if ($like->user_id !== Auth::id()) {
        return response()->json(['message' => 'Attention tu essais de suprimmer le like d\'un autre utilisateur'], 403);
        // erreur 403 est Si un utilisateur tente de supprimer le like d'un autre.
        }
        $this->likes->delete($id); 
         
        
        return response()->json(['message' => 'Like supprimé avec succès !'], 200);
    }
        // 200 = Succès 
}

