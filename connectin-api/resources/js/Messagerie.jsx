import React, { useState } from "react";

export default function Messagerie({ user, userVisite, navigation }) {
    const [message, setMessage] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        console.log("Envoi du message à " + userVisite.first_name + " : " + message);
        setMessage(""); // On vide le champ après envoi
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            {/* Header du Chat */}
            <div className="h-16 bg-blue-800 flex items-center px-4 shadow-lg">
                <button onClick={() => navigation("ProfilPublic")} className="mr-4">←</button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold">
                        {userVisite?.first_name?.charAt(0)}
                    </div>
                    <span className="font-semibold">{userVisite?.first_name} {userVisite?.last_name}</span>
                </div>
            </div>

            {/* Zone des messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="flex justify-start">
                    <div className="bg-slate-800 p-3 rounded-2xl max-w-xs text-sm">
                        Salut ! Comment ça va ?
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-blue-600 p-3 rounded-2xl max-w-xs text-sm text-white">
                    </div>
                </div>
            </div>

            {/* Input d'envoi */}
            <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
                <input 
                    type="text"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Écrivez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                    ✈️
                </button>
            </form>
        </div>
    );
}