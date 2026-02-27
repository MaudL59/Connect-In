import React from "react";

export default function ProfilPublic({ user, navigation }) {
    // Si par erreur on arrive ici sans utilisateur, on affiche un message
    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
                <p>Utilisateur non trouvé</p>
                <button 
                    onClick={() => navigation("accueil")}
                    className="mt-4 text-blue-500 underline"
                >
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header avec bouton retour */}
            <div className="h-16 bg-blue-800 flex items-center px-4 shadow-lg sticky top-0 z-10">
                <button 
                    onClick={() => navigation("accueil")}
                    className="mr-4 hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                    ← Retour
                </button>
                <h1 className="font-semibold text-lg">Profil de {user.first_name}</h1>
            </div>

            <div className="max-w-4xl mx-auto pb-10">
                {/* Bannière / Couverture */}
                <div className="h-48 bg-gradient-to-r from-blue-900 to-slate-800 w-full rounded-b-xl"></div>

                {/* Photo de profil et Infos principales */}
                <div className="px-6 -mt-12 flex flex-col items-center sm:items-start sm:flex-row sm:gap-6">
                    <div className="h-32 w-32 bg-slate-700 border-4 border-slate-950 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl">
                        {user.first_name?.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="mt-14 sm:mt-16 flex-1 text-center sm:text-left">
                        <h2 className="text-3xl font-bold">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-slate-400">@{user.first_name?.toLowerCase()}_{user.last_name?.toLowerCase()}</p>
                    </div>

                    <div className="mt-6 sm:mt-20 flex gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-all">
                            Ajouter
                        </button>
                        <button className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg font-semibold transition-all border border-slate-700">
                            Message
                        </button>
                    </div>
                </div>

                {/* Contenu du profil (Bio, Amis, Posts) */}
                <div className="mt-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Colonne Gauche : Infos */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                            <h3 className="font-bold mb-4 text-slate-300 uppercase text-xs">À propos</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    📧 <span className="text-slate-400">{user.email}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    📅 <span className="text-slate-400">Membre depuis 2026</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne Droite : Publications (Exemple) */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 text-center">
                            <p className="text-slate-500 italic">Aucune publication pour le moment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}