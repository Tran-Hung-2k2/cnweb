import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { GrUserManager } from 'react-icons/gr';
import { SiCoursera } from 'react-icons/si';
import { BiCategory } from 'react-icons/bi';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/favicon.ico';

const menuItem = [
    { label: 'MENU' },
    {
        title: 'Người dùng',
        child: [
            {
                path: '/profile',
                title: 'Quản lý người dùng',
            },
            {
                path: '/forms/form-layout',
                title: 'Xét duyệt tổ chức',
            },
        ],
        icon: <GrUserManager />,
    },
    {
        title: 'Khóa học',
        child: [
            {
                path: '/forms/form-elements',
                title: 'Xét duyệt học viên',
            },
            {
                path: '/forms/form-elements',
                title: 'Quản lý khóa học',
            },
            {
                path: '/forms/form-layout',
                title: 'Thêm khóa học',
            },
        ],
        icon: <SiCoursera />,
    },
    {
        title: 'Danh mục khóa học',
        child: [
            {
                path: '/forms/form-elements',
                title: 'Quản lý danh mục',
            },
            {
                path: '/forms/form-elements',
                title: 'Thêm danh mục',
            },
        ],
        icon: <BiCategory />,
    },
    {
        label: 'OTHER',
    },
    {
        path: '/ui/alerts',
        title: 'Đăng xuất',
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 shadow-md ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 pt-5.5 border-b-2">
                <NavLink to="/" className="w-full">
                    <img src={Logo} className="h-20 w-full object-cover" alt="Logo" />
                </NavLink>

                <button ref={trigger} onClick={() => setSidebarOpen(!sidebarOpen)} className="block lg:hidden">
                    <IoMdArrowBack className="h-5 w-8 text-white" />
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="lg:px-2">
                    {/* <!-- Menu Group --> */}
                    <ul className="menu w-full rounded-box">
                        {menuItem.map((item, index) =>
                            item.label ? (
                                <h3 className="mt-6 pt-1 pb-1 ml-4 text-base font-bold text-bodylight2 dark:text-white">
                                    {item.label}
                                </h3>
                            ) : (
                                <li key={index}>
                                    {item.child ? (
                                        <details open>
                                            <summary className="relative text-lg gap-2.5 rounded-sm py-2 px-4 font-medium text-bodylight1 duration-300 ease-in-out dark:hover:bg-meta-4 dark:text-white">
                                                <span className={`w-6 h-4.5`}>{item.icon}</span>
                                                {item.title}
                                            </summary>
                                            <ul>
                                                {item.child.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <NavLink
                                                            to={subItem.path}
                                                            className={({ isActive }) =>
                                                                'text-base relative flex items-center gap-2.5 rounded-md font-medium duration-300 ease-in-out hover:text-bodylight dark:text-white transform hover:scale-105 ' +
                                                                (isActive && 'link-primary')
                                                            }
                                                        >
                                                            {subItem.title}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                (isActive && '!bg-primary !text-white') +
                                                ' dark:hover:bg-meta-4 text-lg rounded-md  font-medium text-bodylight1 duration-300 ease-in-out dark:text-white transform hover:scale-105'
                                            }
                                        >
                                            <span className={`w-6 h-4.5`}>{item.icon}</span>
                                            {item.title}
                                        </NavLink>
                                    )}
                                </li>
                            ),
                        )}
                    </ul>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
