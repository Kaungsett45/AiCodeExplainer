import CodeExplainForm from './forms/CodeExplainForm.jsx';
import Navi from './Navigation.jsx';

const Entry = () => {
    return (
        <>
          <Navi/>
            <main className="main-content">
                <div className="container">
                    <div className="hero-section">
                        
                        <p className="hero-subtitle">
                            Intelligent code analysis powered by advanced AI
                        </p>
                    </div>
                    <CodeExplainForm />
                </div>
            </main>
        </>
    )
}

export default Entry;