// Profil.jsx
import React, { useState } from "react";
// On importe la mémoire (useState)

export default function Profil({ navigation, user }) {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <h1 className="h-20 text-white bg-blue-800 flex justify-around items-center text-xl font-semibold  w-full">
                {" "}
                <span
                    onClick={() => navigation("profil")}
                    className="cursor-pointer hover:underline"
                >
                    {user.first_name} {user.last_name}
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
                        <div className="flex justify-between items-center border-b border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Nom</span>
                                <span className="text-white">
                                    {user.last_name}
                                </span>
                            </div>
                            <button className="text-white cursor-pointer hover:text-red-600">
                                Modifier
                            </button>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-slate-400">Prénom</span>
                                <span className="text-white">
                                    {user.first_name}
                                </span>
                            </div>
                            <button className="text-white cursor-pointer hover:text-red-600">
                                Modifier
                            </button>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-slate-400">E-mail</span>
                                <span className="text-white">{user.email}</span>
                            </div>
                            <button className="text-white cursor-pointer hover:text-red-600">
                                Modifier
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-slate-400">
                                    Mot de Passe
                                </span>
                                <span className="text-white">**********</span>
                            </div>
                            <button className="text-white cursor-pointer hover:text-red-600">
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
