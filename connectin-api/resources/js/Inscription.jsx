import React, { useState } from "react";

export default function Inscription({ navigation, setUser }) {
    // bouton s'inscrire
    function handleSubmit(e) {
        e.preventDefault();
        // compare le mot de passe et le confirme mot de passe
        if (password !== confirmPassword) {
            alert("Attention : Les mots de passe ne sont pas identiques !");
            return;
        }
        // recupere les informations pour les réutilisers
        setUser({
            last_name: lastName,
            first_name: firstName,
            email: email,
            password: password,
        });
        // si tout va bien aller sur le l'accueil
        navigation("accueil");
    }
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <h1 className="h-20 text-white bg-blue-800 flex items-center justify-center text-xl font-semibold w-full">
                CONNECT'IN
            </h1>

            <div className="flex-1 flex items-center justify-center py-10">
                <div className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 w-full max-w-md">
                    <h2 className="text-2xl font-extralight text-white mb-6 text-center">
                        Inscription
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Champ Nom */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Nom
                            </label>
                            <input
                                type="text"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                                placeholder="Votre nom"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        {/* Champ Prénom */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Prénom
                            </label>
                            <input
                                type="text"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                                placeholder="Votre prénom"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        {/* Champ Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 "
                                required
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
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Créer un mot de passe"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Champ Confirmation Mot de passe */}
                        <div className="flex flex-col gap-1">
                            <label className="text-slate-300 text-sm">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 "
                                placeholder="Confirmer"
                                value={confirmPassword}
                                required
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors mt-2"
                        >
                            S'inscrire
                        </button>

                        <p
                            className="text-slate-400 text-sm text-center mt-4 cursor-pointer hover:underline"
                            onClick={() => navigation("login")}
                        >
                            Déjà un compte ?{" "}
                            {/* <Link to="/" className="text-blue-500 hover:text-blue-400 underline underline-offset-4 transition-colors">
                                Connectez-vous
                            </Link> */}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
