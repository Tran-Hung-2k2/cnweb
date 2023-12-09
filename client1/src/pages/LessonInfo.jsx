import _ from 'lodash';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { AiOutlineRead } from 'react-icons/ai';

import action from '../redux/course/course.action';

function LessonInfo({ lecture, owner }) {
    return (
        <>
            {_.sortBy(lecture.Lessons, ['Index', 'createdAt']).map((lesson) => (
                <div key={lesson.Lesson_ID} className="flex items-center gap-4 px-2 hover:bg-slate-100">
                    {lesson.Type == 'video' ? (
                        <MdOutlineSlowMotionVideo className="inline-block w-6 h-10" />
                    ) : (
                        <AiOutlineRead className="inline-block w-6 h-10" />
                    )}
                    <Link to={`/lesson/${lesson.Lesson_ID}`} key={lesson.Lesson_ID} className="inline-block my-2">
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
                    to="/lesson/add"
                    onClick={() => dispatch(action.addCourse(lecture.Lecture_ID))}
                    className="w-full btn btn-outline btn-warning"
                >
                    Thêm tiết học
                </Link>
            )}
        </>
    );
}

export default LessonInfo;
