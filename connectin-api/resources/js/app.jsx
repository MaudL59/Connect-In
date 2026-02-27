import "./bootstrap";
import { createRoot } from "react-dom/client";
import { StrictMode, useEffect } from "react"; // Ajoute useEffect ici
import React, { useState } from "react";
import Login from "./Login";
import Inscription from "./Inscription";
import Profil from "./Profil";
import Accueil from "./Accueil";

export default function App() {
    //  On vérifie si un token existe déjà dans le navigateur
    const tokenExiste = localStorage.getItem("access_token");

    //  Si le token existe, on commence sur "accueil", sinon sur "login"
    const [page, setPage] = useState(tokenExiste ? "accueil" : "login");
    
    const [user, setUser] = useState({
        last_name: "",
        first_name: "",
        email: "",
    });

    //   On peut aussi charger les infos de l'utilisateur stockées
    useEffect(() => {
        const savedUser = localStorage.getItem("user_data");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const pages = {
        login: <Login navigation={setPage} setUser={setUser} />,
        inscription: <Inscription navigation={setPage} setUser={setUser} />,
        accueil: <Accueil navigation={setPage} user={user} />,
        profil: <Profil navigation={setPage} user={user} setUser={setUser} />,
    };

    return <div className="App">{pages[page]}</div>;
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);