import React, { useState } from "react";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Pour afficher si le login échoue

    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); // On réinitialise l'erreur à chaque tentative

        try {
            // LIAISON BACKEND : Envoi des données vers Laravel
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Si Laravel dit OK : on stocke le token et on change de page
                localStorage.setItem("access_token", data.token);
                navigation("accueil");
            } else {
                // Si Laravel dit NON (mauvais mdp, etc.)
                setError(data.message || "Identifiants incorrects");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur.");
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <h1 className="h-20 text-white bg-blue-800 flex items-center justify-center text-xl font-semibold w-full">
                CONNECT'IN
            </h1>
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 w-full max-w-md">
                    <h2 className="text-2xl font-extralight text-white mb-6 text-center">
                        Connexion
                    </h2>

                    {/* Affichage de l'erreur si elle existe */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">Email</label>
                            <input
                                type="email"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="exemple@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">Mot de passe</label>
                            <input
                                type="password"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors mt-2">
                            Se connecter
                        </button>

                        <p className="text-slate-400 text-sm text-center mt-4">
                            Pas encore inscrit ?{" "}
                            <span
                                onClick={() => navigation("inscription")}
                                className="text-blue-500 hover:text-blue-400 cursor-pointer underline underline-offset-4 transition-colors"
                            >
                                Cliquez ici
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}