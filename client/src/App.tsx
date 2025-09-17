import './App.css'
import {Route, Routes} from 'react-router-dom';
import {WelcomePage} from '../pages/WelcomePage.tsx';
import {FormPage} from '../pages/FormPage.tsx';

function App() {

    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/form" element={<FormPage />} />
        </Routes>
    )
}

export default App
