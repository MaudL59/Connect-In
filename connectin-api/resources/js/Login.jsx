import React, { useState } from "react";
// On importe la mémoire (useState)

export default function Login({ navigation }) {
    function handleSubmit(e) {
        e.preventDefault();
        navigation("accueil");
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        // Le design Dark Blue avec Tailwind

        <div className="min-h-screen bg-slate-950 flex flex-col">
            <h1 className="h-20 text-white bg-blue-800 flex items-center justify-center text-xl font-semibold  w-full">
                {" "}
                CONNECT'IN
            </h1>
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 w-full max-w-md">
                    <h2 className="text-2xl font-extralight text-white mb-6 text-center">
                        Connexion
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Champ Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="exemple@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                placeholder="mot de passe"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Bouton de connexion */}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors mt-2">
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
