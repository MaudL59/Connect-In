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
                Nom Uilisateur
            </span>
            CONNECT'IN
            <bouton>Se déconnecter</bouton>
        </h1>
    );
}
