<?php
// PostController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth; // Gestion utilisateur connecté
use Illuminate\Support\Facades\Gate; // Permet de gérer les autorisations (Gate)
use Carbon\Carbon; // Gestion date et heure
use App\Interfaces\PostRepositoryInterface;

class PostController extends Controller
{
    public function __construct(private PostRepositoryInterface $posts)
    {
        // Permet d'afficher les dates en français
        // Exemple : "il y a 2 minutes", "15 février 2025"
        Carbon::setLocale('fr');
    }
    // Fonction pour récupérer tous les posts
    public function index()
    {
        /*
    On récupère tous les posts via le Repository.

    with() permet de charger les relations :
    - user → auteur du post
    - comments → commentaires liés
    - likes → likes liés

    (optionnel mais recommandé pour éviter trop de requêtes SQL)
    */
        $posts = $this->posts->all();

        /*
    On transforme les données pour ajouter
    une date lisible avec Carbon
    */
        $formattedPosts = $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'content' => $post->content,
                'image_path' => $post->image_path,

                // Auteur du post
                'user' => [
                    'id' => $post->user->id ?? null,
                    'name' => $post->user->full_name ?? null,
                    'avatar' => $post->user->profile_photo_url,
                ],

                // Nombre de commentaires et likes
                'comments_count' => $post->comments->count(),
                'likes_count' => $post->likes->count(),

                // Date lisible en français
                'created_at' => Carbon::parse($post->created_at)->diffForHumans()
            ];
        });

        return response()->json($formattedPosts, 200);
    }

    public function update(Request $request, $id)
    {
        // 1. Trouver le post ou renvoyer une erreur 404
        $post = Post::findOrFail($id);

        // 2. Valider les données reçues
        $validated = $request->validate([
            'content' => 'sometimes|string',
            'image_path' => 'sometimes|nullable|string',
            'post_id' => 'sometimes|nullable|exists:posts,id'
        ]);

        // 3. Mettre à jour
        $post->update($validated);

        // 4. Retourner le post mis à jour
        return response()->json([
            'message' => 'Post mis à jour avec succès !',
            'data' => $post
        ]);
    }
    public function add(Request $request)
    {

        // 1. Validation : On vérifie que le contenu n'est pas vide
        $validated = $request->validate([
            'content' => 'required|string', // Limite style 
            'image_path' => 'nullable|string'       // L'image est optionnelle
        ]);

        // 2. Récupération de l'ID de l'utilisateur connecté
        $user_id = Auth::id();

        // 3. Création via le Repository
        $post = $this->posts->create([
            'user_id' => $user_id,
            'content' => $validated['content'],
            'image_path' => $validated['image_path'] ?? null
        ]);

        // 4. Réponse au format JSON
        return response()->json([
            'message' => 'Post ajouté avec succès !',
            'post' => $post,
            'human_date' => Carbon::parse($post->created_at)->diffForHumans()
        ], 201); // 201 = Création réussie
    }
    // Fonction pour récupérer UN post spécifique par son ID
    public function show($id)
    {
        // 1. On récupère le post via le repository
        $post = $this->posts->find($id);

        // 2. Vérification si le post existe
        if (!$post) {
            return response()->json(['message' => 'Post introuvable'], 404);
        }

        // 3. On formate les données (comme dans ton index)
        $formattedPost = [
            'id' => $post->id,
            'content' => $post->content,
            'image_path' => $post->image_path,
            'user' => [
                'id' => $post->user->id ?? null,
                'name' => $post->user->full_name ?? null
            ],
            // Chargement des relations pour voir les commentaires et likes liés
            'comments' => $post->comments, 
            'likes_count' => $post->likes->count(),
            'created_at' => Carbon::parse($post->created_at)->diffForHumans()
        ];

        return response()->json($formattedPost, 200);
    }
    // Fonction de sauvegarde du post
    public function save(Request $request)
    {

        $user_id = Auth::id();
        $content = $request->input('content');
        $image_path = $request->input('image_path');

        // Creation du post
        $post = $this->posts->create([
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
    public function delete($id)
    {

        $post = $this->posts->find($id);

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
        $this->posts->delete($id);

        return response()->json([
            'message' => 'Post supprimé avec succès !',

            // Affiche date suppression en français
            'deleted_at' => Carbon::now()->translatedFormat('d F Y H:i')
        ], 200);

        // code 200 = Succès 
    }
}
