import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import label from '../constants/label';

function RequireNotOrg() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    return user ? (
        [label.role.ADMIN, label.role.ORGANIZATION].includes(user.Role) ? (
            <Navigate to="/course/manager" state={{ from: location }} replace />
        ) : (
            <Outlet />
        )
    ) : (
        <Outlet />
    );
}

export default RequireNotOrg;
