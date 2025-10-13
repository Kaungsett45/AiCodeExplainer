import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function CodeExplanation({ explanation }) {
    return (
        <div className="explanation-container">
            <h3 style={{ 
                color: '#f1f5f9', 
                marginBottom: '0.75rem', 
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                💡 AI Analysis
            </h3>
            <div className="explanation-text">
                <Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
            </div>
        </div>
    )
}
