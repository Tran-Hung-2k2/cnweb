import _ from 'lodash';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import action from '../redux/category/category.action';

const ManagerLayout = () => {
    const dispatch = useDispatch();
    const { week } = useSelector((state) => state.course);

    useEffect(() => {
        dispatch(action.getCategory());
    }, []);

    return (
        <main className="flex">
            <div className="drawer drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col mt-10 drawer-content">
                    <Outlet />
                </div>
                <div className="sticky left-0 shadow-xl top-20 drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 bg-white menu w-80 text-base-content">
                        <h1 className="mb-4 ml-4 text-xl font-bold">{week.Title}</h1>
                        {_.orderBy(week.Lectures, 'Index', 'asc').map((lecture, index) => (
                            <li key={index}>
                                <details open>
                                    <summary className="font-semibold">{lecture.Lecture_Title}</summary>
                                    <ul>
                                        {_.orderBy(lecture.Lessons, 'Index', 'asc').map((lesson, subIndex) => (
                                            <li key={subIndex}>
                                                <NavLink
                                                    className={({ isActive }) =>
                                                        isActive ? 'bg-slate-200 !text-primary' : ''
                                                    }
                                                    to={`/lesson/learning/${lesson.Lesson_ID}`}
                                                >
                                                    {lesson.Title}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default ManagerLayout;
