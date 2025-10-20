import React from 'react'
import { useState } from 'react'

export default function selector() {
    const [mode, setMode] = useState("normal");
    
    const toggleMode = () => {
        setMode(mode === "normal" ? "stream" : "normal");
    };
    
    return (
        <div className="flex gap-3 items-center mb-4">
            <label className="font-semibold text-slate-200">Mode:</label>
            <button
                onClick={toggleMode}
                className="toggle-btn"
                title={`Switch to ${mode === "normal" ? "Real-Time" : "Normal"} mode`}
            >
                <div className={`toggle-slider ${mode === "stream" ? "active" : ""}`}>
                    <span className="toggle-icon">
                        {mode === "normal" ? "🔌" : "⚡"}
                    </span>
                </div>
                <span className="toggle-label">
                    {mode === "normal" ? "Normal (API)" : "Real-Time (Socket)"}
                </span>
            </button>
        </div>
    )
}

