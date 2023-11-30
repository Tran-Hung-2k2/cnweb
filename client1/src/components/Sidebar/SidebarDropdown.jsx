// SidebarDropdown.js
import React from 'react';

const SidebarDropdown = ({ isOpen, children }) => {
    return <div className={`translate transform overflow-hidden ${!isOpen && 'hidden'}`}>{children}</div>;
};

export default SidebarDropdown;
