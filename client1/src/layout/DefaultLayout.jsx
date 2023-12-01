import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <main className="flex">
            <div className="relative h-full drawer drawer-open max-w-fit">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <Sidebar />
            </div>
            <div className="w-screen">
                <Header />
                <Outlet />
            </div>
        </main>
    );
};

export default DefaultLayout;
