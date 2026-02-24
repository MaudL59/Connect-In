import React, { useState, useEffect } from "react";
// On importe la mémoire (useState)

export default function Accueil({ navigation }) {
    // verification de l'utlisation 
    const [user, setUser] = useState(null); // cette ligne permet de stocker l'utilisateur connecter 
    const [loading, setLoading] = useState(true);// cette ligne c'est interrupteur booléen il vaut true si le user existe 
    useEffect(() => {
        // 1. On récupère le token stocké (par exemple dans le localStorage après le login)
        const token = localStorage.getItem("access_token");

        if (!token) {
            // Pas de token ? On redirige vers le login ou register
            navigation("login"); 
            return;
        }

        // 2. On vérifie auprès du backend si le token est valide
        fetch("http://127.0.0.1:8000/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Session expirée");
        })
        .then(data => {
            setUser(data); // On stocke les infos de Toto récupérées du back
            setLoading(false);
        })
        .catch(() => {
            localStorage.removeItem("access_token");
            navigation("login"); // Erreur ? Retour au login
        });
    }, []);

    if (loading) return <div className="text-center mt-10">Vérification de la session...</div>;

    return (
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
            <bouton
                onClick={() => navigation("login")}
                className="cursor-pointer hover:underline"
            >
                Se déconnecter
            </bouton>
        </h1>
    );
}
