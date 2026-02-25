// Profil.jsx
import React, { useState } from "react";
// On importe la mémoire (useState)

export default function Profil({ navigation, user, setUser }) {
    // pour que le nom se modifie
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [tempLastName, setTempLastName] = useState(user.last_name);
    // pour le prenom
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [tempFirstName, setTempFirstName] = useState(user.first_name);
    // pour l'email
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [tempEmail, setTempEmail] = useState(user.email);
    // on utilise le mot de passe pour changer l'email et le mot de passe
    const [verificationPassword, setVerificationPassword] = useState("");
    // pour le mot de passe
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [tempPassword, setTempPassword] = useState("");
    // onconfirme le mot de passe
    const [confirmPassword, setConfirmPassword] = useState("");

    // fonction pour le bouton enregistrement du nouveau nom
    function handleSaveLastName() {
        if (isEditingLastName) {
            // On enregistre les changements pour que seul le nom change
            setUser({ ...user, last_name: tempLastName });
            // On ferme l'input
            setIsEditingLastName(false);
        } else {
            // Si c'était fermé, on l'ouvre
            setIsEditingLastName(true);
        }
    }
    // fonction pour le bouton enregistrement du nouveau prenom
    function handleSaveFirstName() {
        if (isEditingFirstName) {
            // On enregistre les changements pour que seul le prenom change
            setUser({ ...user, first_name: tempFirstName });
            // On ferme l'input
            setIsEditingFirstName(false);
        } else {
            // Si c'était fermé, on l'ouvre
            setIsEditingFirstName(true);
        }
    }

    // fonction pour le bouton enregistrement du nouveau email
    function handleSaveEmail() {
        if (isEditingEmail) {
            // si le mot de passe actuel est correct
            if (verificationPassword === user.password) {
                // si oui on enregistre
                setUser({ ...user, email: tempEmail });
                setIsEditingEmail(false);
                setVerificationPassword("");
            } else {
                // si non, on prévient l'utilisateur
                alert("Mot de passe incorrect !");
            }
        } else {
            setIsEditingEmail(true);
        }
    }

    // fonction pour le bouton enregistrement du nouveau mot de passe
    function handleSavePassword() {
        if (isEditingPassword) {
            // si le mot de passe actuel est correct
            if (verificationPassword === user.password) {
                // confirmé le nouveau mot de passe
                if (tempPassword === confirmPassword) {
                    // si oui, enregistre
                    setUser({ ...user, password: tempPassword });
                    setIsEditingPassword(false);
                    setVerificationPassword("");
                    setConfirmPassword("");
                } else {
                    // si sa ne correspond pas
                    alert(
                        "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
                    );
                }
            } else {
                // si le mot passe actuel saisie est incorrect
                alert("Mot de passe actuel incorrect !");
            }
        } else {
            setIsEditingPassword(true);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <h1 className="h-20 text-white bg-blue-800 flex justify-around items-center text-xl font-semibold  w-full">
                {" "}
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
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 w-full max-w-md">
                    <h2 className="text-center py-10 text-white text-xl font-semibold">
                        Mon Profil
                    </h2>

                    <div>
                        {/* champ Nom/ LastName */}
                        <div className="flex justify-between items-center border-b border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Nom</span>
                                {isEditingLastName ? (
                                    <input
                                        type="text"
                                        className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                        value={tempLastName}
                                        onChange={(e) =>
                                            setTempLastName(e.target.value)
                                        }
                                    />
                                ) : (
                                    <span className="text-white">
                                        {user.last_name}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleSaveLastName}
                                className="text-white cursor-pointer hover:text-red-600"
                            >
                                {isEditingLastName ? "Enregistrer" : "Modifier"}
                            </button>
                        </div>
                        {/* champ prenom/ FirstName */}
                        <div className="flex justify-between items-center border-b border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Prénom</span>
                                {isEditingFirstName ? (
                                    <input
                                        type="text"
                                        className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                        value={tempFirstName}
                                        onChange={(e) =>
                                            setTempFirstName(e.target.value)
                                        }
                                    />
                                ) : (
                                    <span className="text-white">
                                        {user.first_name}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleSaveFirstName}
                                className="text-white cursor-pointer hover:text-red-600"
                            >
                                {isEditingFirstName
                                    ? "Enregistrer"
                                    : "Modifier"}
                            </button>
                        </div>
                        {/* champ email */}
                        <div className="flex justify-between items-center border-b border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Email</span>
                                {isEditingEmail ? (
                                    <div className="flex flex-col gap-2 py-2">
                                        <input
                                            type="text"
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                            value={tempEmail}
                                            onChange={(e) =>
                                                setTempEmail(e.target.value)
                                            }
                                        />
                                        {/* securité avec le mot de passe actuel */}
                                        <input
                                            type="password"
                                            placeholder="Mot de passe actuel"
                                            value={verificationPassword}
                                            onChange={(e) =>
                                                setVerificationPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-white">
                                        {user.email}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleSaveEmail}
                                className="text-white cursor-pointer hover:text-red-600"
                            >
                                {isEditingEmail ? "Enregistrer" : "Modifier"}
                            </button>
                        </div>

                        {/* champ du mot de passe */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <span className="text-slate-400">
                                    Mot de Passe
                                </span>
                                {isEditingPassword ? (
                                    <div className="flex flex-col gap-2 py-2">
                                        {/* verifie le mot de passe actuel */}
                                        <input
                                            type="password"
                                            placeholder="Mot de passe actuel"
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                            value={verificationPassword}
                                            onChange={(e) =>
                                                setVerificationPassword(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {/* le nouveau mot de passe */}
                                        <input
                                            type="password"
                                            placeholder="Nouveau mot de passe"
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                            value={tempPassword}
                                            onChange={(e) =>
                                                setTempPassword(e.target.value)
                                            }
                                        />
                                        {/* confirmation du nouveau mot de passe */}
                                        <input
                                            type="password"
                                            placeholder="Confirmer nouveau"
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                ) : (
                                    <span className="text-white">
                                        **********
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleSavePassword}
                                className="text-white cursor-pointer hover:text-red-600"
                            >
                                {isEditingPassword ? "Enregistrer" : "Modifier"}
                            </button>
                        </div>
                    </div>

                    <button className="text-red-600">Suprimer le compte</button>
                </div>
            </div>
        </div>
    );
}
