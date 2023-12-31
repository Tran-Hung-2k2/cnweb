import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineRead } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';

import action from '../redux/course/lesson.action';
import confirm from '../utils/confirm';
import notify from '../utils/notify';
import label from '../constants/label';

function LessonInfo({ lecture, week, owner, isRegistered }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function deleteLesson(lesson) {
        confirm({
            title: 'Xóa tiết học',
            message: `Khi bạn xác nhận Tiết học ${lesson.Title} sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: () => {
                dispatch(action.deleteLesson(lesson.Lesson_ID));
            },
        });
    }

    return (
        <>
            {_.sortBy(lecture.Lessons, ['Index', 'createdAt']).map((lesson) => (
                <div
                    key={lesson.Lesson_ID}
                    className="flex items-center justify-between just justy hover:bg-slate-100 group hover:opacity-100"
                >
                    <div className="flex items-center gap-4 px-2">
                        {lesson.Completed_Lessons.length > 0 ? (
                            <FaRegCircleCheck className="inline-block w-6 h-10 text-success" />
                        ) : lesson.Type === 'Video' ? (
                            <MdOutlineSlowMotionVideo className="inline-block w-6 h-10" />
                        ) : (
                            <AiOutlineRead className="inline-block w-6 h-10" />
                        )}
                        <Link
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(action.setWeek(week));
                                if (isRegistered) navigate(`/lesson/learning/${lesson.Lesson_ID}`);
                                else if (owner || user?.Role == label.role.ADMIN)
                                    navigate(`/lesson/${lesson.Lesson_ID}`);
                                else
                                    notify(
                                        'Bạn chưa đăng ký vào khóa học hoặc chưa được xét duyệt. Vui lòng thử lại sau.',
                                        'error',
                                    );
                            }}
                            key={lesson.Lesson_ID}
                            className="inline-block my-2"
                        >
                            {lesson.Title}
                            <div className="text-sm">
                                <span>
                                    {lesson.Type == 'Reading' ? 'Đọc' : 'Video'}
                                    <BsDot className="inline-block" />
                                    {Math.ceil(lesson.Duration / 60)} phút
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        {owner && (
                            <Link to="/lesson/edit">
                                <FaRegEdit
                                    onClick={() => {
                                        dispatch(action.addLesson(lesson.Lesson_ID));
                                    }}
                                    className="inline-block mr-10 text-green-600"
                                />
                            </Link>
                        )}
                        {owner && (
                            <RiDeleteBinLine
                                onClick={() => deleteLesson(lesson)}
                                className="inline-block mr-10 text-error"
                            />
                        )}
                    </div>
                </div>
            ))}
            {owner && (
                <Link
                    to="/lesson/add"
                    onClick={() => dispatch(action.addLecture(lecture.Lecture_ID))}
                    className="w-full mt-4 btn btn-outline btn-warning"
                >
                    Thêm tiết học
                </Link>
            )}
        </>
    );
}

export default LessonInfo;
