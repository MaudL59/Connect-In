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
    async function handleSaveLastName() {
        if (isEditingLastName) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                        body: JSON.stringify({
                            last_name: tempLastName,
                            password: verificationPassword,
                        }),
                    },
                );

                const data = await response.json();

                if (response.ok) {
                    // On enregistre les changements pour que seul le nom change
                    setUser({ ...user, last_name: tempLastName });
                    // On ferme l'input
                    setIsEditingLastName(false);
                    setVerificationPassword("");
                    alert("Nom mis à jour !");
                } else {
                    // Si le serveur refuse (ex: mauvais MDP)
                    alert(data.message || "Erreur lors de la modification");
                }
            } catch (error) {
                // Si la connexion a échoué (réseau, serveur éteint)
                console.error("Erreur critique :", error);
                alert("Impossible de joindre le serveur.");
            }
        } else {
            // Si c'était fermé, on l'ouvre
            setIsEditingLastName(true);
        }
    }

    // fonction pour le bouton enregistrement du nouveau prenom
    async function handleSaveFirstName() {
        if (isEditingFirstName) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                        body: JSON.stringify({
                            first_name: tempFirstName,
                            password: verificationPassword,
                        }),
                    },
                );

                const data = await response.json();

                if (response.ok) {
                    // On enregistre les changements pour que seul le prenom change
                    setUser({ ...user, first_name: tempFirstName });
                    // On ferme l'input
                    setIsEditingFirstName(false);
                    setVerificationPassword("");
                    alert("Prenom mis à jour !");
                } else {
                    // Si le serveur refuse (ex: mauvais MDP)
                    alert(data.message || "Erreur lors de la modification");
                }
            } catch (error) {
                // Si la connexion a échoué (réseau, serveur éteint)
                console.error("Erreur critique :", error);
                alert("Impossible de joindre le serveur.");
            }
        } else {
            // Si c'était fermé, on l'ouvre
            setIsEditingFirstName(true);
        }
    }

    // fonction pour le bouton enregistrement du nouveau email
    async function handleSaveEmail() {
        if (isEditingEmail) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            // On récupère le token pour prouver qu'on est connecté
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                        body: JSON.stringify({
                            email: tempEmail,
                            // Le nouvel email que l'on veut enregistrer
                            password: verificationPassword, // Le mot de passe actuel pour vérification
                        }),
                    },
                );

                const data = await response.json();

                if (response.ok) {
                    // Si le serveur confirme que tout est OK (Code 200)
                    setUser({ ...user, email: tempEmail });
                    setIsEditingEmail(false);
                    setVerificationPassword("");
                    alert("Email mis à jour avec succès !");
                } else {
                    // Si le serveur renvoie une erreur (ex: Code 401 "Mot de passe incorrect")
                    alert(data.message || "Erreur lors de la mise à jour.");
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                alert("Impossible de contacter le serveur.");
            }
        } else {
            // Si l'input n'était pas ouvert, on l'affiche
            setIsEditingEmail(true);
        }
    }

    // fonction pour le bouton enregistrement du nouveau mot de passe
    async function handleSavePassword() {
        if (isEditingPassword) {
            // verifie la correspondance entre le mot de passe et la la confirmation mot de passe
            if (tempPassword !== confirmPassword) {
                alert(
                    "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
                );
                return;
            }

            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                        body: JSON.stringify({
                            password: verificationPassword,
                            // mot de passe actuel (pour le Hash::check)
                            new_password: tempPassword,
                            // le nouveau (à enregistrer)
                        }),
                    },
                );

                const data = await response.json();

                if (response.ok) {
                    alert("Mot de passe mis à jour !");
                    setIsEditingPassword(false);
                    setVerificationPassword("");
                    setTempPassword("");
                    setConfirmPassword("");
                } else {
                    alert(data.message || "Erreur lors de la modification");
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                alert("Impossible de joindre le serveur.");
            }
        } else {
            setIsEditingPassword(true);
        }
    }

    // fonction pour suprimer son compte
    async function handleDeleteAccount() {
        // Première confirmation pour éviter les erreurs
        const confirmFirst = window.confirm(
            "Es-tu sûr de vouloir supprimer ton compte ?",
        );
        if (!confirmFirst) return;

        // Deuxième confirmation pour le choix du contenu (RGPD)
        const deleteContent = window.confirm(
            "Souhaites-tu également supprimer tous tes posts et commentaires ? (OK pour tout supprimer, Annuler pour anonymiser)",
        );

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/users/${user.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: JSON.stringify({
                        delete_content: deleteContent, // Envoie true (OK) ou false (Annuler)
                    }),
                },
            );

            if (response.ok) {
                alert("Compte supprimé.");
                localStorage.removeItem("access_token");
                // Redirection vers la page de connexion
                navigation("/login");
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur:", error);
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
                                    <div className="flex flex-col gap-2 py-2">
                                        <input
                                            type="text"
                                            value={tempLastName}
                                            onChange={(e) =>
                                                setTempLastName(e.target.value)
                                            }
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                        />
                                        {/* L'input indispensable pour le Hash::check */}
                                        <input
                                            type="password"
                                            placeholder="Confirmer avec votre mot de passe"
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
                                    <div className="flex flex-col gap-2 py-2">
                                        <input
                                            type="text"
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                            value={tempFirstName}
                                            onChange={(e) =>
                                                setTempFirstName(e.target.value)
                                            }
                                        />
                                        {/* L'input indispensable pour le Hash::check */}
                                        <input
                                            type="password"
                                            placeholder="Confirmer avec votre mot de passe"
                                            value={verificationPassword}
                                            onChange={(e) =>
                                                setVerificationPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="bg-slate-800 text-white p-1 rounded border border-blue-500"
                                        />{" "}
                                    </div>
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

                    <button
                        onClick={handleDeleteAccount}
                        className="text-red-600 cursor-pointer"
                    >
                        Suprimer le compte
                    </button>
                </div>
            </div>
        </div>
    );
}
