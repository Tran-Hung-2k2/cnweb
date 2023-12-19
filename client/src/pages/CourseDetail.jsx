import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import WeekInfo from './WeekInfo';
import Loader from '../components/Loader';
import action from '../redux/course/course.action';
import service from '../services/participating_course.service';

const CourseDetail = () => {
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
                const userHasRegistered = course.Participating_Courses.some((item) => item.User_ID == user?.User_ID);

                if (userHasRegistered) {
                    navigate(`/course/learning/${id}`);
                }
                if (course) setLoading(false);
            }),
        );
    }, []);

    return (
        <div className="mx-12 mb-10">
            <div className="mx-8 my-2 text-sm breadcrumbs">
                <ul>
                    <li>
                        <NavLink to="/">Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/course">Khóa học</NavLink>
                    </li>
                    <li>{course?.Name}</li>
                </ul>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col gap-24">
                    <div className="py-8 -mx-12 bg-slate-100">
                        <div className="mx-20">
                            <div className="relative pb-12">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        className="block object-fill h-12 max-w-full"
                                        src={course.User.Avatar}
                                        alt="organization"
                                    />
                                    <h3 className="block text-2xl font-semibold">{course.User.Name}</h3>
                                </div>
                                <div className="content-center mb-4">
                                    <div className="flex items-center">
                                        <h1 className="inline-block mb-1 text-3xl font-bold ">
                                            {course ? course.Name : 'Course Name'}
                                        </h1>
                                        <div className="py-3 mx-4 text-lg font-semibold badge badge-primary badge-outline">
                                            {course.Category.Name}
                                        </div>
                                    </div>
                                    <p className="mt-4 text-lg">{course.Description}</p>
                                    <button
                                        onClick={() => {
                                            if (user) {
                                                service.addParticipatingCourse({ Course_ID: course.Course_ID });
                                                navigate(`/my_course`);
                                            } else navigate(`/signin`);
                                        }}
                                        className="my-4 text-white btn btn-active btn-primary btn-md"
                                    >
                                        Đăng ký ngay
                                    </button>
                                    <span className="ml-4 font-bold text-primary">
                                        {course.Need_Approval ? 'Cần xét duyệt' : 'Không cần xét duyệt'}
                                    </span>
                                    <p>
                                        <b>{course.Participating_Courses.length}</b> học viên đã đăng ký
                                    </p>
                                </div>

                                <div className="absolute z-10 flex items-center justify-between w-full h-40 gap-10 px-20 bg-white rounded-lg shadow-xl -bottom-1/3">
                                    <div className="pr-20 text-lg font-semibold border-r-2">5 sao</div>
                                    <div className="pr-20 text-lg font-semibold border-r-2">{course.Level} Level</div>
                                    <div className="pr-20 text-lg font-semibold border-r-2">
                                        Xấp xỉ 13 giờ để hoàn thành
                                    </div>
                                    <div className="px-2 text-lg font-semibold">
                                        Học bất kì lúc nào, tại bất kì nơi nào bạn muốn
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-8">
                        <h2 className="my-2 text-2xl font-bold">Lộ trình</h2>
                        {course.Weeks.length > 0 ? <WeekInfo {...{ course, owner }} /> : <p>Chưa có nội dung</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
