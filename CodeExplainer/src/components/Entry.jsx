import CodeExplainForm from './forms/CodeExplainForm.jsx';
import Navi from './Navigation.jsx';

const Entry = () => {
    return (
        <>
            <Navi />
            <main className="main-content">
                <div className="container">
                   
                    <CodeExplainForm />
                </div>
            </main>
        </>
    )
}

export default Entry;