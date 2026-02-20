import "./bootstrap";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

export default function App() {
    return (
        <div className="App">
            <h1 class="text-white">Hello World !!</h1>
            <h2 class="text-red">Nouvel essai sur react</h2>
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
