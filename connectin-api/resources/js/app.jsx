import "./bootstrap";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import React, { useState } from "react";
import Login from "./Login";
import Inscription from "./Inscription";



export default function App() {
    return (
        <div className="App">
            <Inscription />
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