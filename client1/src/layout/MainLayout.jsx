import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainHeader from '../components/MainHeader';
import FooterComponent from '../components/Footer';
import action from '../redux/category/category.action';

const MainLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action.getCategory());
    }, []);

    return (
        <main className="flex flex-col">
            <MainHeader className="z-10" />
            <Outlet />
            <FooterComponent />
        </main>
    );
};

export default MainLayout;
