import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import label from '../constants/label';
import Loader from '../components/Loader';
import service from '../services/lesson.service';

const Lesson = () => {
    const [lesson, setLesson] = useState();
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await service.getLesson({ Lesson_ID: id });
            if (res.data[0].Completed_Lessons.length > 0) setCompleted(true);
            else setCompleted(false);
            setLesson(res.data[0]);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <div className="mx-6 text-sm breadcrumbs">
                <ul>
                    <li>
                        <NavLink to="/">Trang chủ</NavLink>
                    </li>
                    {user.Role == label.role.ADMIN ? (
                        <li>
                            <NavLink to="/course/manager">Quản lý khóa học</NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/course">Khóa học</NavLink>
                        </li>
                    )}
                    {user.Role != label.role.STUDENT ? (
                        <li>
                            <NavLink to={`/course/details/${course.Course_ID}`}>{course.Name}</NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink to={`/course/learning/${course.Course_ID}`}>{course.Name}</NavLink>
                        </li>
                    )}
                </ul>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="w-4/5 m-6">
                    <h2 className="text-3xl font-bold mb-14">{lesson.Title}</h2>
                    {lesson.Type == label.lesson_type.READING ? (
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: lesson.Content }} />
                        </div>
                    ) : (
                        <video id="uploadedVideo" src={lesson.Content} controls></video>
                    )}

                    {user.Role === label.role.STUDENT && (
                        <>
                            {completed ? (
                                <button
                                    onClick={async () => {
                                        await service.deleteCompletedLesson(lesson.Lesson_ID);
                                        setCompleted(false);
                                    }}
                                    className="text-white btn btn-wide mt-14 btn-error"
                                >
                                    Đánh dấu chưa hoàn thành
                                </button>
                            ) : (
                                <button
                                    onClick={async () => {
                                        await service.addCompletedLesson({ Lesson_ID: lesson.Lesson_ID });
                                        setCompleted(true);
                                    }}
                                    className="text-white btn btn-wide mt-14 btn-success"
                                >
                                    Đánh dấu đã hoàn thành
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Lesson;
