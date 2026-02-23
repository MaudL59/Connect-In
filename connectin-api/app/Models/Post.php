<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // Autoriser le remplissage de ces colonnes
    protected $fillable = ['content','user_id', 'post_id','image_path'];// variable relative à un poste un texte, une image si necessaire et un utilisateur spécifique
     // un post est associé à un utilisateur specifique , son commentaire et son like
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }
}
