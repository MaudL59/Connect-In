<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'is_connected',
    ]; // ce sont les veriables necessitant l'accès à un utilisateur

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    // permet de vérifier l'etat si l'utilisateur est connecté ou pas 
    protected $casts = [
    'is_connected' => 'boolean'
   ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    //  un utilisateur peut faire plusieurs posts
    public function post() {
    return $this->hasMany(Post::class);  // hasMany ici car l'utilisateur peut effectuer plusieurs post
    }
    // l'utilisateur peut faire plusieurs commentaires  
    public function comments() {
    return $this->hasMany(Comment::class);
    }
    // l'utilisateur peut faire plusieurs likes 
    public function likes() {
    return $this->hasMany(Like::class);
    }

    public function getFullNameAttribute() {
    return "{$this->first_name} {$this->last_name}";// cette fonction permet de recuperer le nom et prénom complet de l'utilisateur
    }
}
