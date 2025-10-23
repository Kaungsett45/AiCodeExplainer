import React from 'react'
import { useState } from 'react'

export default function selector() {

    const [mode, setMode] = useState("normal");
    
    const toggleMode = () => {
        setMode(mode === "normal" ? "stream" : "normal");
    };
    
    return (
        <div style={{padding:'12px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', color: '#cbd5e1' }}>Mode:</label>
            <button
                onClick={toggleMode}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    color: '#cbd5e1',
                    transition: 'all 0.3s ease'
                }}
                title={`Switch to ${mode === "normal" ? "Real-Time" : "Normal"} mode`}
            >
                <div style={{
                    position: 'relative',
                    width: '40px',
                    height: '20px',
                    background: mode === "stream" ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'rgba(71, 85, 105, 0.5)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px'
                }}>
                    <span style={{
                        position: 'absolute',
                        width: '16px',
                        height: '16px',
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        transition: 'all 0.3s ease',
                        transform: mode === "stream" ? 'translateX(20px)' : 'translateX(0)'
                    }}>
                        {mode === "normal" ? "🔌" : "⚡"}
                    </span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {mode === "normal" ? "Normal (API)" : "Real-Time (Socket)"}
                </span>
            </button>
        </div>
    )
}

