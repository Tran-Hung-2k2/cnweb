import _ from 'lodash';
import { Link } from 'react-router-dom';
import HTMLText from '../components/HTMLText';
import LectureInfo from './LectureInfo';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import notify from '../utils/notify';
import confirm from '../utils/confirm';
import { useDispatch } from 'react-redux';
import action from '../redux/course/week.action';

function WeekInfo({ course, owner }) {
    const dispatch = useDispatch();

    function deleteWeek(week, index) {
        confirm({
            title: 'Xóa tuần học',
            message: `Khi bạn xác nhận Tuần ${index + 1}: ${week.Title} sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa`,
            onConfirm: () => {
                dispatch(
                    action.deleteWeek(week.Week_ID, () => {
                        notify('Xóa tuần học thành công', 'success');
                    }),
                );
            },
        });
    }

    return (
        <>
            {_.sortBy(course.Weeks, ['Index', 'createdAt']).map((week, index) => (
                <div key={week.Week_ID} className="border rounded-none collapse collapse-arrow">
                    <input type="checkbox" />
                    <div className="flex items-center justify-between text-xl font-medium border-b collapse-title hover:bg-sky-50">
                        <div>
                            Tuần {index + 1}: {week.Title}{' '}
                        </div>
                        <div className="z-10">
                            <FaRegEdit className="inline-block mr-10 text-green-600" />
                            <RiDeleteBinLine
                                onClick={() => deleteWeek(week, index)}
                                className="inline-block mr-10 text-error"
                            />
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div className="p-2 mt-4 text-lg">
                            <p>{week.Description}</p>
                        </div>
                        <div className="px-10">
                            <div className="rounded-none collapse collapse-arrow">
                                <input type="checkbox" />
                                <div className="collapse-title text-base font-bold text-primary hover:!bg-sky-50 hover:!underline">
                                    Mục tiêu tuần học
                                </div>
                                <div className="collapse-content">
                                    <HTMLText>{week.Target}</HTMLText>
                                </div>
                            </div>
                        </div>
                        <LectureInfo {...{ week, owner }} />
                    </div>
                </div>
            ))}
            {owner && (
                <Link
                    to="/add_week"
                    onClick={() => dispatch(action.addCourse(course.Course_ID))}
                    className="w-full btn btn-outline btn-primary"
                >
                    Thêm tuần học
                </Link>
            )}
        </>
    );
}

export default WeekInfo;
