import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import CoursePage from './pages/Course';


function App() {
    return (
        <div className="flex items-center justify-center h-screen min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/course" element={<CoursePage />} />
                        
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
