import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import routes from './routes/router';
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';
import ManagerLayout from './layout/ManagerLayout';
import RequireOrg from './components/RequireOrg';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifySignup from './pages/VerifySignup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';

const Course = lazy(() => import('./pages/Course'));
const CourseOwner = lazy(() => import('./pages/CourseOwner'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Toaster position="top-right" reverseOrder={false} containerClassName="overflow-auto" />
            <Routes>
                <Route path="/verify_signup" element={<VerifySignup />} />
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/course"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Course />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/my_course"
                        element={
                            <Suspense fallback={<Loader />}>
                                <CourseOwner />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<RequireOrg />}>
                    <Route element={<ManagerLayout />}>
                        {routes.map((routes, index) => {
                            const { path, component: Component } = routes;
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={
                                        <Suspense fallback={<Loader />}>
                                            <Component />
                                        </Suspense>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
