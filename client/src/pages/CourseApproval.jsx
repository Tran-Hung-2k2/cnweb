import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FaArrowUpShortWide } from 'react-icons/fa6';
import { FaArrowUpWideShort } from 'react-icons/fa6';

import Loader from '../components/Loader';
import service from '../services/participating_course.service';
import label from '../constants/label';
import avatar from '../assets/images/avatar.jpg';
import confirm from '../utils/confirm';

function CourseApproval() {
    const [courses, setCourses] = useState([]);
    const [sort, setSort] = useState({ field: 'updatedAt', dimension: 'desc' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getParticipatingCourseOrg();
            const sortedCourses = _.orderBy(res.data.Courses, 'createdAt', 'asc');
            setCourses(sortedCourses);
            setLoading(false);
        };

        fetchData();
    }, []);

    const removeParticipatingCourse = (userId, courseId) => {
        setCourses((prevCourses) => {
            // Sử dụng toán tử dải để tạo một bản sao mới của mảng courses
            return prevCourses.map((course) => {
                // Nếu Course_ID không phải là Course_ID cần xóa, trả về nguyên mảng
                if (course.Course_ID !== courseId) {
                    return course;
                }

                // Nếu có Course_ID tương ứng, xóa Participating_Courses có User_ID tương ứng
                return {
                    ...course,
                    Participating_Courses: course.Participating_Courses.filter((participatingCourse) => {
                        // Lọc ra các participatingCourse có User_ID khác với userId cần xóa
                        return participatingCourse.User_ID !== userId;
                    }),
                };
            });
        });
    };

    function deleteParticipatingCourse(partiCourse) {
        confirm({
            title: 'Xóa đăng ký của học viên',
            message: `Khi bạn xác nhận đăng ký của học viên sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: async () => {
                await service.deleteParticipatingCourse(partiCourse.User_ID, partiCourse.Course_ID);
                removeParticipatingCourse(partiCourse.User_ID, partiCourse.Course_ID);
            },
        });
    }

    const updateParticipatingCourseStatus = (userId, courseId, newStatus) => {
        setCourses((prevCourses) => {
            // Sử dụng toán tử dải để tạo một bản sao mới của mảng courses
            return prevCourses.map((course) => {
                // Nếu Course_ID không phải là Course_ID cần cập nhật, trả về nguyên mảng
                if (course.Course_ID !== courseId) {
                    return course;
                }

                // Nếu có Course_ID tương ứng, cập nhật Participating_Courses
                return {
                    ...course,
                    Participating_Courses: course.Participating_Courses.map((participatingCourse) => {
                        // Nếu User_ID không phải là User_ID cần cập nhật, trả về nguyên participatingCourse
                        if (participatingCourse.User_ID !== userId) {
                            return participatingCourse;
                        }

                        // Nếu có User_ID tương ứng, cập nhật trạng thái mới
                        return {
                            ...participatingCourse,
                            Status: newStatus,
                        };
                    }),
                };
            });
        });
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="m-6">
                    {courses.map((course, index) => (
                        <div
                            key={course.Course_ID}
                            className="mt-2 border border-black rounded-md collapse collapse-arrow"
                        >
                            <input type="checkbox" />
                            <div className="flex items-center justify-between text-xl font-medium border-b collapse-title hover:bg-sky-50">
                                <div>
                                    Khóa học {index + 1}: {course.Name}
                                </div>
                                {_.orderBy(course.Participating_Courses, 'Status', 'asc').filter(
                                    (participant) => participant.Status === 'Pending approval',
                                ).length > 0 && (
                                    <div className="ml-6 text-white badge badge-info badge-lg">
                                        {
                                            course.Participating_Courses.filter(
                                                (participant) => participant.Status === 'Pending approval',
                                            ).length
                                        }
                                    </div>
                                )}
                            </div>
                            <div className="collapse-content">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Họ và tên</th>
                                            <th
                                                onClick={() => {
                                                    if (sort.field != 'User.Email')
                                                        setSort({ ...sort, field: 'User.Email' });
                                                    else
                                                        setSort({
                                                            ...sort,
                                                            dimension: sort.dimension == 'asc' ? 'desc' : 'asc',
                                                        });
                                                }}
                                            >
                                                <button>
                                                    Email
                                                    {sort.dimension == 'asc' ? (
                                                        <FaArrowUpWideShort className="inline-block w-4 h-4 ml-2" />
                                                    ) : (
                                                        <FaArrowUpShortWide className="inline-block w-4 h-4 ml-2" />
                                                    )}
                                                </button>
                                            </th>
                                            <th
                                                onClick={() => {
                                                    if (sort.field != 'Status') setSort({ ...sort, field: 'Status' });
                                                    else
                                                        setSort({
                                                            ...sort,
                                                            dimension: sort.dimension == 'asc' ? 'desc' : 'asc',
                                                        });
                                                }}
                                            >
                                                <button>
                                                    Trạng thái
                                                    {sort.dimension == 'asc' ? (
                                                        <FaArrowUpWideShort className="inline-block w-4 h-4 ml-2" />
                                                    ) : (
                                                        <FaArrowUpShortWide className="inline-block w-4 h-4 ml-2" />
                                                    )}
                                                </button>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_.orderBy(course.Participating_Courses, sort.field, sort.dimension).map(
                                            (partiCourse, index) => (
                                                <tr key={index}>
                                                    <th>
                                                        <label>{index + 1}</label>
                                                    </th>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="w-12 h-12 mask mask-squircle">
                                                                    <img
                                                                        src={partiCourse.User.Avatar || avatar}
                                                                        alt="Avatar"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{partiCourse.User.Name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{partiCourse.User.Email}</td>
                                                    <td>{partiCourse.Status}</td>
                                                    <th>
                                                        {partiCourse.Status == label.parti_course.PENDING_APPROVAL ? (
                                                            <button
                                                                onClick={async () => {
                                                                    await service.updateParticipatingCourseStatus(
                                                                        {
                                                                            Status: label.parti_course.NOT_COMPLETED,
                                                                        },
                                                                        partiCourse.User_ID,
                                                                        partiCourse.Course_ID,
                                                                    );
                                                                    updateParticipatingCourseStatus(
                                                                        partiCourse.User_ID,
                                                                        partiCourse.Course_ID,
                                                                        label.parti_course.NOT_COMPLETED,
                                                                    );
                                                                }}
                                                                className="px-8 mx-1 text-white btn btn-success btn-xs"
                                                            >
                                                                Duyệt
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={async () => {
                                                                    await service.updateParticipatingCourseStatus(
                                                                        {
                                                                            Status: label.parti_course.PENDING_APPROVAL,
                                                                        },
                                                                        partiCourse.User_ID,
                                                                        partiCourse.Course_ID,
                                                                    );
                                                                    updateParticipatingCourseStatus(
                                                                        partiCourse.User_ID,
                                                                        partiCourse.Course_ID,
                                                                        label.parti_course.PENDING_APPROVAL,
                                                                    );
                                                                }}
                                                                className="mx-1 text-white btn btn-error btn-xs"
                                                            >
                                                                Hủy xét duyệt
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                deleteParticipatingCourse(partiCourse);
                                                            }}
                                                            className="mx-1 text-white btn btn-error btn-xs"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </th>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default CourseApproval;
