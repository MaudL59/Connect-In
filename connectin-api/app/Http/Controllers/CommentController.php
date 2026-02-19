<?php
// CommentController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // On ajoute ça pour aider l'IDE
use App\Interfaces\CommentRepositoryInterface;


class CommentController extends Controller
{
    public function __construct(private CommentRepositoryInterface $comments) {}

    // Fonction de sauvegarde du commentaire
    public function save(Request $request) {
       $user_id = Auth::id();
        $post_id = $request->input('post_id');
        $content = $request->input('content');
        
    // Creation du commentaire
        $this->comments->create([
            'user_id' => $user_id, 
            'post_id' => $post_id, 
            'content' => $content]);
        
        return response()->json(['message' => 'C\'est posté !'], 201);
        // erreur 201 est Quand un utilisateur poste un Commentaire ou un Like.
    }
    // Fonction de supression du commentaire 
    public function delete($id) {
        $comment = $this->comments->find($id);

        // 1. Vérifie si le commentaire existe (pour éviter un crash)
        if (!$comment) {
            return response()->json(['message' => 'Commentaire introuvable'], 404);
            // erreur 404Si on cherche un commentaire qui n'existe plus.
        }

        if ($comment->user_id !== Auth::id()) {
        return response()->json(['message' => 'Attention tu essais de suprimmer le commentaire d\'un autre utilisateur'], 403);
        // erreur 403 est Si un utilisateur tente de supprimer le post d'un autre.
        }
        
         
        
        $this->comments->delete($id);
        return response()->json(['message' => 'Commentaire supprimé avec succé!'], 200);
        // 200 = Succès 
        
             
    
}
}