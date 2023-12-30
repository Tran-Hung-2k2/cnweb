import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireUser() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    return user ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
}

export default RequireUser;
