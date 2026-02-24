// Profil.jsx
import React, { useState } from "react";
// On importe la mémoire (useState)

export default function Profil({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <h1 className="h-20 text-white bg-blue-800 flex justify-around items-center text-xl font-semibold  w-full">
                {" "}
                <span
                    onClick={() => navigation("profil")}
                    className="cursor-pointer hover:underline"
                >
                    Nom Uilisateur
                </span>
                <span
                    onClick={() => navigation("profil")}
                    className="cursor-pointer hover:underline"
                >
                    CONNECT'IN
                </span>
                <bouton>Se déconnecter</bouton>
            </h1>
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 w-full max-w-md">
                    <h2 className="text-center py-10 text-white text-xl font-semibold">
                        Mon Profil
                    </h2>

                    <form className="flex flex-col gap-4">
                        {/* Champ Last_name/Nom */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Nom
                            </label>
                            <input
                                type="email"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={email}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <button>Modifier</button>
                        </div>

                        {/* Champ First_name/Nom */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Prénom
                            </label>
                            <input
                                type="email"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={email}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <button>Modifier</button>
                        </div>

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
                            <button>Modifier</button>
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
                            <button>Modifier</button>
                        </div>

                        {/* Bouton de connexion */}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors mt-2">
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
