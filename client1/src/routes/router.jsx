import { lazy } from 'react';
import AddWeek from '../pages/AddWeek';

const Profile = lazy(() => import('../pages/Profile'));
const CourseManager = lazy(() => import('../pages/CourseManager'));
const CourseInfo = lazy(() => import('../pages/CourseInfo'));
const UserManager = lazy(() => import('../pages/UserManager'));
const Lesson = lazy(() => import('../pages/Lesson'));

const coreRoutes = [
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/course_manager',
        component: CourseManager,
    },
    {
        path: '/user_manager',
        component: UserManager,
    },
    {
        path: '/course/:id',
        component: CourseInfo,
    },
    {
        path: '/lesson/:id',
        component: Lesson,
    },
    {
        path: '/add_week',
        component: AddWeek,
    },
    {
        path: '/add_lecture',
        component: AddWeek,
    },
    {
        path: '/add_lesson',
        component: AddWeek,
    },
];

const routes = [...coreRoutes];
export default routes;
