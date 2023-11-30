// SidebarLinkItem.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLinkItem = ({ to, isActive, onClick, children }) => {
    return (
        <NavLink
            to={to}
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodylight1 duration-300 ease-in-out hover:bg-primary dark:hover:bg-meta-4 ${
                isActive && 'bg-second text-white dark:bg-meta-4'
            }`}
            onClick={onClick}
        >
            {children}
        </NavLink>
    );
};

export default SidebarLinkItem;
