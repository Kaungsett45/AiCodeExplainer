import React from 'react'
import { useActionState } from 'react'
import { explain } from '../../actions/index.js'
import CodeExplanation from '../CodeExplanation.jsx'

export default function CodeExplainForm() {
    const [formState, formAction, isPending] = useActionState(explain, null)

    return (
        <div className="form-container">
            <form action={formAction}>
                <div className="form-group">
                    <label htmlFor="language" className="form-label">
                        💻 Select Language
                    </label>
                    <select
                        name="language"
                        id="language"
                        className="form-select"
                        defaultValue="JavaScript"
                    >
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="React">React</option>
                        <option value="Node.js">Node.js</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="code" className="form-label">
                        📝 Code Input
                    </label>
                    <textarea
                        name="code"
                        id="code"
                        required
                        className="form-textarea"
                        placeholder="// Paste your code here for AI analysis..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="submit-btn"
                >
                    {isPending ? "✨ Analyzing..." : "🚀 Analyze Code"}
                </button>
            </form>

            {isPending && (
                <div className="loading-text">
                    🧠 AI is processing your code...
                </div>
            )}

            {formState?.success && (
                <CodeExplanation explanation={formState?.data.explaination} />
            )}

            {formState?.success === false && (
                <div className="error-message">
                    {formState?.error}
                </div>
            )}
        </div>
    )
}
