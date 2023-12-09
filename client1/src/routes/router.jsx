import { lazy } from 'react';

const UserProfile = lazy(() => import('../pages/UserProfile'));
const CourseManager = lazy(() => import('../pages/CourseManager'));
const CourseInfo = lazy(() => import('../pages/CourseInfo'));
const UserManager = lazy(() => import('../pages/UserManager'));
const Lesson = lazy(() => import('../pages/Lesson'));
const WeekAdd = lazy(() => import('../pages/WeekAdd'));
const WeekEdit = lazy(() => import('../pages/WeekEdit'));
const CourseAdd = lazy(() => import('../pages/CourseAdd'));
const LectureAdd = lazy(() => import('../pages/LectureAdd'));
const CourseEdit = lazy(() => import('../pages/CourseEdit'));
const CategoryManager = lazy(() => import('../pages/CategoryManager'));
const CategoryAdd = lazy(() => import('../pages/CategoryAdd'));
const CategoryEdit = lazy(() => import('../pages/CategoryEdit'));
const LectureEdit = lazy(() => import('../pages/LectureEdit'));

const coreRoutes = [
    {
        path: '/user/profile',
        component: UserProfile,
    },
    {
        path: '/user/manager',
        component: UserManager,
    },
    {
        path: '/course/add',
        component: CourseAdd,
    },
    {
        path: '/course/edit/',
        component: CourseEdit,
    },
    {
        path: '/course/manager',
        component: CourseManager,
    },
    {
        path: '/course/:id',
        component: CourseInfo,
    },
    {
        path: '/week/add',
        component: WeekAdd,
    },
    {
        path: '/week/edit/',
        component: WeekEdit,
    },
    {
        path: '/lecture/add',
        component: LectureAdd,
    },
    {
        path: '/lecture/edit',
        component: LectureEdit,
    },
    {
        path: '/lesson/:id',
        component: Lesson,
    },
    {
        path: '/lesson/add',
        component: WeekAdd,
    },
    {
        path: '/category/add',
        component: CategoryAdd,
    },
    {
        path: '/category/edit/',
        component: CategoryEdit,
    },
    {
        path: '/category/manager',
        component: CategoryManager,
    },
];

const routes = [...coreRoutes];
export default routes;
