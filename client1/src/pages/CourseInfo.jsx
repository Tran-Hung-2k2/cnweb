import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams, Link } from 'react-router-dom';
import courseService from '../services/course.service';
import notify from '../utils/notify';
import Loader from '../components/Loader';
import { BsDot } from 'react-icons/bs';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { AiOutlineRead } from 'react-icons/ai';

const CourseManager = () => {
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await courseService.getCourseDetail({ Course_ID: id });
                setCourse(res.data);
                setLoading(false);
            } catch (error) {
                notify(error.response.data.details.body[0].message, 'error');
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="m-6">
                    <div>
                        <img
                            className="inline-block object-fill h-20 max-w-full mb-6 mr-4"
                            src={course.User.Avatar}
                            alt="organization"
                        />
                        <h3 className="inline-block text-2xl">{course.User.Name}</h3>
                    </div>
                    <div className="mb-4">
                        <h2 className="font-bold text-2xl mb-1">{course ? course.Name : 'Course Name'}</h2>
                        <p className="text-lg">{course.Description}</p>
                    </div>
                    {_.sortBy(course.Weeks, ['Index', 'createdAt']).map((week, index) => (
                        <div key={week.Week_ID} className="collapse border rounded-none collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium hover:bg-sky-50 border-b ">
                                Tuần {index + 1}: {week.Title}
                            </div>
                            <div className="collapse-content">
                                <div className="p-2">
                                    <p>{week.Description}</p>
                                </div>
                                <div className="px-10">
                                    <div className="collapse collapse-arrow rounded-none">
                                        <input type="checkbox" />
                                        <div className="collapse-title text-base font-bold text-primary hover:!bg-sky-50 hover:!underline">
                                            Mục tiêu tuần học
                                        </div>
                                        <div className="collapse-content">
                                            <p>{week.Target}</p>
                                        </div>
                                    </div>
                                </div>
                                {_.sortBy(week.Lectures, ['Index', 'createdAt']).map((lecture, index) => (
                                    <details
                                        key={lecture.Lecture_ID}
                                        className="collapse collapse-arrow rounded-none hover:border border-primary"
                                    >
                                        <summary className="collapse-title text-xl font-medium hover:bg-sky-50">
                                            Bài giảng {index + 1}: {lecture.Lecture_Title}
                                        </summary>
                                        <div className="collapse-content">
                                            {_.sortBy(lecture.Lessons, ['Index', 'createdAt']).map((lesson) => (
                                                <div
                                                    key={lesson.Lesson_ID}
                                                    className="flex items-center gap-4 px-2 hover:bg-slate-100"
                                                >
                                                    {lesson.Type == 'video' ? (
                                                        <MdOutlineSlowMotionVideo className="inline-block h-10 w-6" />
                                                    ) : (
                                                        <AiOutlineRead className="inline-block h-10 w-6" />
                                                    )}
                                                    <Link
                                                        to={`/lesson/${lesson.Lesson_ID}`}
                                                        key={lesson.Lesson_ID}
                                                        className="inline-block my-2"
                                                    >
                                                        {lesson.Title}
                                                        <div className="text-sm">
                                                            <span>
                                                                {lesson.Type == 'reading' ? 'Đọc' : 'Video'}
                                                                <BsDot className="inline-block" />
                                                                {lesson.Duration / 60} phút
                                                            </span>
                                                            <span className="ml-2"></span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default CourseManager;
