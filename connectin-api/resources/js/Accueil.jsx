export default function Accueil({ navigation, user }) {
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
                    <button className="bg-white rounded">CRÉER UN POST</button>
                </div>
            </main>
        </div>
    );
}

