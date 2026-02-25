import "./bootstrap";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import React, { useState } from "react";
import Login from "./Login";
import Inscription from "./Inscription";
import Profil from "./Profil";
import Accueil from "./Accueil";

export default function App() {
    const [page, setPage] = useState("login");
    const [user, setUser] = useState({
        last_name: "",
        first_name: "",
        email: "",
        password: "",
    });
    const pages = {
        login: <Login navigation={setPage} />,
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
