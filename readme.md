Connect'In API - Backend Laravel

Bienvenue sur le backend de Connect'In, un réseau social développé avec Laravel. Cette API gère l'authentification, les publications, les commentaires et les interactions (likes).

 Installation et Configuration
Pour faire fonctionner ce projet sur votre machine locale, suivez ces étapes :

1. Cloner le projet et installer les dépendances
Bash
git clone <url-du-depot>
cd connectin-api
composer install
2. Configuration de l'environnement
Copiez le fichier d'exemple et générez la clé d'application :
cp .env.example .env
php artisan key:generate

Note : Il est important de modifier .env pour configurer vos accès à la base de données (DB_DATABASE, DB_USERNAME, DB_PASSWORD).
3. Nettoyage et Optimisation
Si vous rencontrez des problèmes de cache lors de l'installation :
php artisan optimize:clear

* Architecture de la Base de Données
Ce projet utilise les migrations Laravel pour garantir une structure uniforme. Voici les tables principales créées :
Tables Globales

- users : Gère les profils (nom, prénom, username, email, bio, photo de profil).


- posts : Contient les publications et gère l'auto-relation pour les commentaires via post_id.

- likes : Gère les interactions entre utilisateurs et posts avec une contrainte d'unicité.

- personal_access_tokens : Table indispensable pour Laravel Sanctum (authentification par token).

Schéma des Migrations
Pour mettre en place la base de données avec toutes les relations :
php artisan migrate:fresh

Important : Cette commande nettoie toutes les tables existantes et recrée la structure propre avec les champs username, bio et profile_photo que nous avons uniformisés.


* Tests API avec Postman
Nous utilisons Postman pour valider nos routes CRUD et nos politiques de sécurité (Policies).

Accéder à la collection
Le fichier de configuration est inclus dans le projet pour faciliter la collaboration :

Fichier : [Télécharger la collection Postman](./docs/postman/My_Collection.postman_collection.json)

Base URL : http://127.0.0.1:8000/api
Format : JSON
Authentification : Bearer Token (via Laravel Sanctum)
1. Authentification
Toutes les routes (sauf Register et Login) nécessitent d'envoyer le header suivant :

Authorization: Bearer {votre_token}

Méthode	Route	Description	Body (JSON)
POST	/register	Créer un compte	first_name, last_name, username, email, password, password_confirmation
POST	/login	Se connecter	email, password
POST	/logout	Déconnexion	Aucun
exemple de  création d'un utilisateur via post man 

{
    "message": "Utilisateur créé avec succès !",
    "user": {
        "first_name": "Louis",
        "last_name": "toto",
        "email": "louis@test.com",
        "is_connected": false,
        "updated_at": "2026-03-03T09:19:30.000000Z",
        "created_at": "2026-03-03T09:19:30.000000Z",
        "id": 8,
        "full_name": "Louis toto",
        "profile_photo_url": "https://ui-avatars.com/api/?name=Louis+toto"
    },
    "access_token": "52|nB2ptGiASX08QRJeNsYO9dcCPPUXPNe3m2p2Kbt3637fc99c",
    "token_type": "Bearer"
}

2. Gestion des Posts

Routes pour gérer le fil d'actualité.

GET /posts : Récupère tous les posts (avec user, comments_count et likes_count).

POST /posts : Crée un nouveau post.

Body : {"content": "Mon message", "image_path": null}

GET /posts/{id} : Récupère les détails d'un post spécifique et ses commentaires.

PUT /posts/{id} : Modifie un post (Seulement si vous êtes l'auteur).

DELETE /posts/{id} : Supprime un post.

exemple via Postman
 {
    "message": "Post ajouté avec succès !",
    "post": {
        "id": 15,
        "content": "Mon sécond post sur ConnectIn !",
        "image_path": null,
        "user": {
            "id": 8,
            "name": "louis-jean toto",
            "avatar": "https://ui-avatars.com/api/?name=louis-jean+toto"
        },
        "created_at": "il y a 0 seconde"
    }
}
 . modification du post 
 {
    "message": "Post mis à jour avec succès !",
    "data": {
        "id": 15,
        "content": "contenu mis à jour",
        "user_id": 8,
        "post_id": null,
        "image_path": null,
        "created_at": "2026-03-03T09:59:38.000000Z",
        "updated_at": "2026-03-03T10:03:18.000000Z"
    }
}
. suppréssion de post 
{
    "message": "Post supprimé avec succès !",
    "deleted_at": "03 mars 2026 10:05"
}


 3. Commentaires &  Likes       
Actions sociales sur les posts.
* Commentaires 
- POST /comments : Ajouter un commentaire à un post.
. body : {
   "post_id": 14, "content": "Super post !"  
}
exemple  via postman 
{
    "content": "Super post !",
    "post_id": 14,
    "user_id": 8,
    "updated_at": "2026-03-03T10:11:46.000000Z",
    "created_at": "2026-03-03T10:11:46.000000Z",
    "id": 13
}
- DELETE /comments/{id} : Supprime un commentaire.
exemple via postman 
{
    "message": "Commentaire supprimé avec succé!"
}

* likes
- POST /likes : Liker un post.

. Body : {"post_id": 14}
exemple via postman 
{
    "message": "C'est Liké!"
}

- DELETE /likes/{id} : Retirer un like (Unlike).

4. Utilisateurs (Profil)

- GET /user : Récupère les infos de l'utilisateur actuellement connecté (via le Token).

- PUT /users/{id} : Met à jour les informations du profil (bio, username, profile_photo).

5. Codes de Réponse (Status Codes)
Voici les codes que l'API renvoie couramment :

- 200 OK : Succès.

- 201 Created : Ressource créée avec succès (ex: après un Register ou Post).

- 401 Unauthorized : Token manquant ou invalide.

- 403 Forbidden : Vous n'avez pas le droit de modifier/supprimer cette ressource.

- 422 Unprocessable Entity : Erreur de validation (ex: email déjà pris ou mot de passe trop court).

* Stack Technique

- Framework : Laravel 11

- Authentification : Laravel Sanctum

- Base de données : MySQL / MariaDB

- Frontend (Tests) : React , Taildwin css 

