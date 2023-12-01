import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));
const CourseManager = lazy(() => import('../pages/CourseManager'));

const coreRoutes = [
    {
        path: '/profile',
        title: 'Thông tin người dùng',
        component: Profile,
    },
    {
        path: '/course_manager',
        title: 'Quản lý khóa học',
        component: CourseManager,
    },
];

const routes = [...coreRoutes];
export default routes;
