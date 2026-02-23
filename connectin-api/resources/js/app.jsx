import "./bootstrap";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import React, { useState } from "react";
import Login from "./Login";

export default function App() {
    return (
        <div className="App">
            <Login />
        </div>
    );
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Vérifie que le nom du fichier est bien Login.jsx
import Inscription from './Inscription'; // Vérifie que c'est bien Inscription.jsx

function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion par défaut */}
        <Route path="/" element={<Login />} />
        
        {/* Route pour l'inscription */}
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  );
}

// export default App;