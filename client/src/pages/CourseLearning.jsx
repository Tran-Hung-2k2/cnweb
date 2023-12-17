import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import WeekInfo from './WeekInfo';
import Loader from '../components/Loader';
import action from '../redux/course/course.action';
import convertTime from '../utils/convertTime';
import label from '../constants/label';

const CourseLearning = () => {
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            action.setCourse(id, user?.User_ID, (course) => {
                setLoading(false);
            }),
        );
    }, []);

    return (
        <div className="m-12">
            <div className="mx-8 my-2 text-sm breadcrumbs">
                <ul>
                    <li>
                        <NavLink to="/">Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/course">Khóa học</NavLink>
                    </li>
                    <li>{course.Name}</li>
                </ul>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="m-8">
                    <div>
                        <img
                            className="inline-block object-fill h-16 max-w-full mb-6 mr-4"
                            src={course.User.Avatar}
                            alt="organization"
                        />
                        <h3 className="inline-block text-xl font-semibold">{course.User.Name}</h3>
                    </div>
                    <div className="content-center mb-4 ">
                        <div className="flex items-center">
                            <h2 className="inline-block mb-1 text-3xl font-bold ">
                                {course ? course.Name : 'Course Name'}
                            </h2>
                            <div className="py-3 mx-4 text-lg font-semibold badge badge-primary badge-outline">
                                {course.Category.Name}
                            </div>
                        </div>
                        <p className="my-2 text-lg font-bold text-green-600">{course.Level} Level</p>
                        <p className="text-md">
                            <b>Ngày tạo:</b> {convertTime(course.createdAt)}
                        </p>
                        <p className="text-md">
                            <b>Lần cập nhật gần nhất:</b> {convertTime(course.updatedAt)}
                        </p>
                        <p className="mt-4 text-lg">{course.Description}</p>
                    </div>
                    <WeekInfo
                        {...{
                            course,
                            owner,
                            isRegistered: course.Participating_Courses.find(
                                (record) =>
                                    record.User_ID === user.User_ID &&
                                    record.Status != label.parti_course.PENDING_APPROVAL,
                            ),
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CourseLearning;
