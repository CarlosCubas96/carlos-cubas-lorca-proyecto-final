import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';


import AppRouter from './route/AppRouter'; 

function App() {
    return (
            <div className="container mt-3">
                <AppRouter />
            </div>
    );
}

export default App;
