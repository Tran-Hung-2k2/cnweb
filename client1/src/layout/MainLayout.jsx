import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainHeader from '../components/MainHeader';
import FooterComponent from '../components/Footer';
import action from '../redux/category/category.action';
import label from '../constants/label';

const MainLayout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        dispatch(action.getCategory());
    }, []);

    return user && [label.role.ADMIN, label.role.ORGANIZATION].includes(user.Role) ? (
        <Navigate to="/course/manager" state={{ from: location }} replace />
    ) : (
        <main className="flex flex-col">
            <MainHeader />
            <Outlet />
            <FooterComponent />
        </main>
    );
};

export default MainLayout;
