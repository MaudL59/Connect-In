import { useState, useEffect } from 'react';
export default function Accueil({ navigation, user }) {

    const [showForm, setShowForm] = useState(false);// verifie l'etat du formulaire à la base est faux et passe à true si user souhaite créer un post 
    const [content, setContent] = useState("");// lorsque user créer un post , permet d'écrire en temps réel    
    const [posts, setPosts] = useState([]);// permet d'afficher tous les posts au démarrage
    const [image, setImage] = useState(null); // permet de gerer l'ajout d'image
    const [commentTexts, setCommentTexts] = useState({}); // Pour stocker le texte de chaque post individuellement
    // Récupere les posts depuis L'API LARAVEL
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/posts");
            const data = await response.json();
            setPosts(data);   // ici permet de sctoker tous les posts  
        } catch (error) {
            console.error("Erreur API :", error);
        }
    };
    // fonction de publication 
    const handleCreatePost = async () => {
        if (!content.trim() && !image) {
            alert("Veuillez ajouter du texte ou une image !");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);
        formData.append("user_id", user.id);
        if (image) {
            formData.append("image", image); // Ajoute le fichier image
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/posts", {
                method: "POST",
                body: formData, // On envoie le FormData (pas de JSON.stringify ici !)
                headers: {
                    // verifie qui publie grâce au token 
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setContent("");
                setImage(null);
                setShowForm(false);
                fetchPosts(); // Recharge la liste pour voir le nouveau post
            }
        } catch (error) {
            console.error("Erreur publication :", error);
        }
    };
    // fonction qui permet de pouvoir commenter un post 
    // Ajoute cet état en haut de ton composant
    const handleAddComment = async (postId) => {
        const text = commentTexts[postId];
        if (!text) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content: text,
                    post_id: postId,
                    user_id: user.id
                })
            });

            if (response.ok) {
                setCommentTexts({ ...commentTexts, [postId]: "" }); // Vide le champ
                fetchPosts(); // Rafraîchit pour voir le commentaire apparaître
            }
        } catch (error) {
            console.error("Erreur commentaire :", error);
        }
    };
    //  Charger les posts automatiquement quand on arrive sur la page
    useEffect(() => {
        fetchPosts();
    }, []);
    return (

        <div className="min-h-screen bg-slate-950 flex flex-col items-center">
            {/* Le Header */}
            <h1 className="h-20 text-white bg-blue-800 flex justify-around items-center text-xl font-semibold w-full">
                <span
                    onClick={() => navigation("profil")}
                    className="cursor-pointer hover:underline"
                >
                    Bienvenue, {user.first_name} {user.last_name} !
                </span>
                <span
                    onClick={() => navigation("accueil")}
                    className="cursor-pointer hover:underline"
                >
                    CONNECT'IN
                </span>
                <button
                    onClick={() => navigation("login")}
                    className="cursor-pointer hover:underline"
                >
                    Se déconnecter
                </button>
            </h1>

            {/* Le contenu principal */}
            <main className="w-full max-w-2xl mt-8 px-4 flex flex-col gap-6">
                <div className="flex flex-row gap-4 items-center">
                    <label className="text-white">Recherche</label>
                    <input
                        className="flex-1 rounded-full px-4 py-2 text-black bg-white"
                        placeholder="RECHERCHE UTILISATEUR"
                        type="search"
                    />
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-slate-200"
                    >
                        {showForm ? "ANNULER" : "CRÉER UN POST"}
                    </button>
                </div>
                {/* Formulaire de création (apparaît si showForm est true) */}
                {showForm && (
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col gap-3">
                        <textarea
                            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 outline-none"
                            placeholder="Quoi de neuf ?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        {/* CHAMP IMAGE */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="text-sm text-slate-400"
                        />

                        <button
                            onClick={handleCreatePost} // APPEL DE LA FONCTION ICI
                            className="bg-blue-600 py-2 rounded font-semibold text-white hover:bg-blue-700"
                        >
                            Publier
                        </button>
                    </div>
                )}
                {/* LISTE DES POSTS (Le Feed) */}
                <div className="flex flex-col gap-6 mt-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                            <h3 className="text-blue-400 font-bold">{post.user.name}</h3>
                            <p className="mt-2 text-slate-300">{post.content}</p>
                            {/* AFFICHAGE DE L'IMAGE SI ELLE EXISTE */}
                            {post.image_path && (
                                <img
                                    src={post.image_path}
                                    alt="Post"
                                    className="mt-4 rounded-lg w-full max-h-80 object-cover"
                                />)
                            }


                            {/* Interactions */}
                            <div className="flex gap-4 mt-4 text-sm text-slate-400 border-t border-slate-800 pt-3">
                                <button className="hover:text-white">👍 {post.likes_count} Likes</button>
                                <button className="hover:text-white">💬 {post.comments_count} Commentaires</button>
                            </div>
                            {/* Liste des commentaires existants */}
                            <div className="flex flex-col gap-2 mb-4">
                                {post.comments && post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-slate-800 p-2 rounded text-sm">
                                        <span className="font-bold text-blue-400">{comment.user.name} : </span>
                                        <span>{comment.content}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Formulaire pour ajouter un commentaire */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-slate-800 border-none rounded px-3 py-1 text-sm outline-none"
                                    placeholder="Écrire un commentaire..."
                                    value={commentTexts[post.id] || ""}
                                    onChange={(e) => setCommentTexts({
                                        ...commentTexts,
                                        [post.id]: e.target.value
                                    })}
                                />
                                <button
                                    onClick={() => handleAddComment(post.id)}
                                    className="bg-blue-600 px-3 py-1 rounded text-sm font-bold"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            </main>
        </div>
    );
}


