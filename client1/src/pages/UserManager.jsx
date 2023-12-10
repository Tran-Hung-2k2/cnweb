import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Loader from '../components/Loader';
import service from '../services/user.service';
import label from '../constants/label';
import Indicator from '../components/Indicator';

const UserManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(label.course.VISIBLE);
    const [sort, setSort] = useState({ field: 'updatedAt', dimension: 'desc' });
    const [count, setCount] = useState({});
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getUser({
                User_ID: user.Role != label.role.ADMIN ? user.User_ID : null,
            });
            const sortedCourses = _.orderBy(res.data, sort.field, sort.dimension);

            const statusCounts = {};
            sortedCourses.forEach((course) => {
                statusCounts[course.Status] = (statusCounts[course.Status] || 0) + 1;
            });

            setCount(statusCounts);
            setCourses(sortedCourses.filter((course) => course.Status === status));
            setLoading(false);
        };

        fetchData();
    }, [status, sort]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="m-6">
                        <Indicator
                            primaryColor="primary"
                            label="Hiện"
                            active={status == label.course.VISIBLE}
                            subLabel={count[label.course.VISIBLE] || 0}
                            onClick={() => setStatus(label.course.VISIBLE)}
                        />
                        <Indicator
                            primaryColor="primary"
                            label="Đã ẩn"
                            active={status == label.course.HIDDEN}
                            subLabel={count[label.course.HIDDEN] || 0}
                            onClick={() => setStatus(label.course.HIDDEN)}
                        />
                        <Indicator
                            primaryColor="primary"
                            label="Chờ xét duyệt"
                            active={status == label.course.PENDING_APPROVAL}
                            subLabel={count[label.course.PENDING_APPROVAL] || 0}
                            onClick={() => setStatus(label.course.PENDING_APPROVAL)}
                        />
                    </div>
                    <div className="m-6">
                        <span className="ml-3 font-bold">Sắp xếp theo</span>
                        <Indicator
                            primaryColor="success"
                            label="Tên"
                            active={sort.field == 'Name'}
                            subLabel={sort.dimension == 'asc' ? 'Tăng' : 'Giảm'}
                            onClick={() => {
                                if (sort.field != 'Name') setSort({ ...sort, field: 'Name' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            primaryColor="success"
                            label="Tổ chức"
                            active={sort.field == 'User_ID'}
                            subLabel={sort.dimension == 'asc' ? 'Tăng' : 'Giảm'}
                            onClick={() => {
                                if (sort.field != 'User_ID') setSort({ ...sort, field: 'User_ID' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            primaryColor="success"
                            label="Ngày cập nhật"
                            active={sort.field == 'updatedAt'}
                            subLabel={sort.dimension == 'asc' ? 'Tăng' : 'Giảm'}
                            onClick={() => {
                                if (sort.field != 'updatedAt') setSort({ ...sort, field: 'updatedAt' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                    </div>

                    <div className="m-6 overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Vai trò</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>
                                        <label>1</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 mask mask-squircle">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Zemlak, Daniel and Leannon
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default UserManager;
