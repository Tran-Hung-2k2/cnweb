import _ from 'lodash';
import { Link } from 'react-router-dom';
import action from '../redux/course/course.action';
import LessonInfo from './LessonInfo';

function LectureInfo({week, owner}) {
    return (
        <>
            {_.sortBy(week.Lectures, ['Index', 'createdAt']).map((lecture, index) => (
                <details
                    key={lecture.Lecture_ID}
                    className="rounded-none collapse collapse-arrow hover:border border-primary"
                >
                    <summary className="text-xl font-medium collapse-title hover:bg-sky-50">
                        Bài giảng {index + 1}: {lecture.Lecture_Title}
                    </summary>
                    <div className="collapse-content">
                        <LessonInfo {...{ lecture, owner }} />
                        {/* {_.sortBy(lecture.Lessons, ['Index', 'createdAt']).map((lesson) => (
                            <div key={lesson.Lesson_ID} className="flex items-center gap-4 px-2 hover:bg-slate-100">
                                {lesson.Type == 'video' ? (
                                    <MdOutlineSlowMotionVideo className="inline-block w-6 h-10" />
                                ) : (
                                    <AiOutlineRead className="inline-block w-6 h-10" />
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
                        {owner && (
                            <Link
                                to="/add_lesson"
                                onClick={() => dispatch(action.addCourse(lecture.Lecture_ID))}
                                className="w-full btn btn-outline btn-warning"
                            >
                                Thêm tiết học
                            </Link>
                        )} */}
                    </div>
                </details>
            ))}
            {owner && (
                <Link
                    to="/add_lecture"
                    onClick={() => dispatch(action.addWeek(week.Week_ID))}
                    className="w-full btn btn-outline btn-success"
                >
                    Thêm bài giảng
                </Link>
            )}
        </>
    );
}

export default LectureInfo;
