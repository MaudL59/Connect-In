import React, { useState } from "react";
// On importe la mémoire (useState)

export default function Accueil({ navigation, user }) {
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
