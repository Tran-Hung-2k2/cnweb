import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';
import RequireOrg from './components/RequireOrg';
import routes from './routes/router';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        // setTimeout(() => setLoading(false), 3000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Toaster position="top-right" reverseOrder={false} containerClassName="overflow-auto" />
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<RequireOrg />}>
                    <Route element={<DefaultLayout />}>
                        <Route path="/" element={<Navigate to="/course_manager" />} />
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
