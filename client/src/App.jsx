import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import routes from './routes/router';
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';
import LearningLayout from './layout/LearningLayout';
import ManagerLayout from './layout/ManagerLayout';
import RequireOrg from './components/RequireOrg';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifySignup from './pages/VerifySignup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';
import RequireStudent from './components/RequireStudent';
import RequireNotOrg from './components/RequireNotOrg';
import RequireUser from './components/RequireUser';
import ForgetPassword from './pages/ForgetPassword';
import VerifyForgetPassword from './pages/VerifyForgetPassword';

const UserProfile = lazy(() => import('./pages/UserProfile'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const CourseLearning = lazy(() => import('./pages/CourseLearning'));
const Course = lazy(() => import('./pages/Course'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CourseOwner = lazy(() => import('./pages/CourseOwner'));
const Lesson = lazy(() => import('./pages/Lesson'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Routes>
                <Route path="/verify_signup" element={<VerifySignup />} />
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forget_passord" element={<ForgetPassword />} />
                    <Route path="/verify_forget_password" element={<VerifyForgetPassword />} />
                    <Route element={<RequireUser />}>
                        <Route
                            path="/change_password"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ChangePassword />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>

                <Route element={<MainLayout />}>
                    <Route element={<RequireUser />}>
                        <Route
                            path="/profile"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <UserProfile />
                                </Suspense>
                            }
                        />
                    </Route>

                    <Route element={<RequireNotOrg />}>
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
                            path="/course/:id"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <CourseDetail />
                                </Suspense>
                            }
                        />
                    </Route>

                    <Route element={<RequireStudent />}>
                        <Route
                            path="/my_course"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <CourseOwner />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/course/learning/:id"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <CourseLearning />
                                </Suspense>
                            }
                        />
                        <Route element={<LearningLayout />}>
                            <Route
                                path="/lesson/learning/:id"
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Lesson />
                                    </Suspense>
                                }
                            />
                        </Route>
                    </Route>
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
