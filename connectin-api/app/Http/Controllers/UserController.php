<?php
// UserController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth; // On ajoute ça pour aider l'IDE


class UserController extends Controller
{
    // permettre à n'importe quel utilisateur de voir le profil d'un autre membre
    public function show($id){
        $user = User::find($id);

        if(!$user){
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
             // erreur 404 Si on cherche un utilisateur qui n'existe plus.
        }        
       
         return response()->json($user, 200);
        //  200 = succés
    }


    // permet à l'utilisateur de modifier son profil
    public function update(Request $request, $id){

        $user = User::find($id);
        // on recherche l'utilisateur
        if(!$user){
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
            // erreur 404 Si on cherche un utilisateur qui n'existe plus.
        }
            

        //  si un utilisaseur tente de modifier le profil d'un autre
        if (Auth::id() !== (int)$id) { 
             return response()->json(['message' => 'C\'est le profil d\'un autre utilisateur'], 403);
           
        }
        // ce que l'utilisateur peut modifier
        $data = [
            'first_name' => $request->input('first_name'),
            'last_name'  => $request->input('last_name'),
            'email'      => $request->input('email'),
        ];

        // On ne change le mot de passe QUE s'il est envoyé dans la requête
        if ($request->has('password')) {
            $data['password'] = bcrypt($request->input('password'));
        }
        // mise a jour du profil
        $user->update($data);

        return response()->json(['message' => 'Profil mis à jour !'], 200); 
        // 200 = succés
    }

    public function delete(Request $request, $id) {
        $user = User::find($id);


        // on recherche l'utilisateur
        if(!$user){
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
            // erreur 404 Si on cherche un utilisateur qui n'existe plus.
        }

        //  si un utilisaseur tente de suprimer le profil d'un autre on vérifie que c'est bien SON profil
        if (Auth::id() !== (int)$id) { 
             return response()->json(['message' => 'C\'est le profil d\'un autre utilisateur'], 403);
           
        }

        // supression de tous les likes
        $user->likes()->delete();

        // 2. Récupérer le choix de l'utilisateur pour les commentaire et post
        $doitToutSupprimer = $request->input('delete_content'); // oui ou non

        if ($doitToutSupprimer) {
            // CAS 1 : On supprime tous, le profil, les posts et les commentaires
            $user->posts()->delete();
            $user->comments()->delete();
            $user->delete();
            return response()->json(['message' => 'Compte et contenus associés supprimés'], 200);
        } else {
            // CAS 2 : On met en anonyme les posts et les commentaires
            $user->posts()->update(['content' => "Utilisateur suprimé"]);
            

            $user->delete();
            
            return response()->json(['message' => 'Compte anonymisé, contenus conservés'], 200);
    }
}
}
