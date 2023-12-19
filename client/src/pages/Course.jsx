import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { FaArrowDownAZ } from 'react-icons/fa6';
import { FaArrowUpAZ } from 'react-icons/fa6';

import Loader from '../components/Loader';
import service from '../services/course.service';
import label from '../constants/label';
import Indicator from '../components/Indicator';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState({ field: 'updatedAt', dimension: 'desc' });
    const { user } = useSelector((state) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getCourses({
                Status: label.course.VISIBLE,
                Name: searchParams.get('Name'),
                Category_ID: searchParams.get('Category_ID'),
            });
            const sortedCourses = _.orderBy(res.data, sort.field, sort.dimension);

            setCourses(sortedCourses);
            setLoading(false);
        };

        fetchData();
    }, [sort]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col items-center mx-14">
                    <div className="w-full m-10 ml-20">
                        <span className="ml-3 font-bold">Sắp xếp theo</span>
                        <Indicator
                            primaryColor="success"
                            label="Tên"
                            active={sort.field == 'Name'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'Name') setSort({ ...sort, field: 'Name' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            primaryColor="success"
                            label="Tổ chức"
                            active={sort.field == 'User_ID'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'User_ID') setSort({ ...sort, field: 'User_ID' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            primaryColor="success"
                            label="Ngày cập nhật"
                            active={sort.field == 'updatedAt'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4 text-white" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4 text-white" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'updatedAt') setSort({ ...sort, field: 'updatedAt' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                    </div>

                    <div className="grid items-center gap-4 m-8 w-fit sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        {courses.map((course) => (
                            <div key={course.Course_ID} className="h-full border shadow-xl card bg-base-100">
                                <Link to={`/course/${course.Course_ID}`} className="w-full p-3 border rounded-lg">
                                    <img
                                        className="object-cover w-full rounded-lg h-52"
                                        src={course.Image}
                                        alt={course.Name}
                                    />
                                </Link>
                                <div className="mx-4 my-2">
                                    <img
                                        className="inline-block object-fill h-6 max-w-full mr-3"
                                        src={course.User.Avatar}
                                        alt="organization"
                                    />
                                    <p className="inline-block translate-y-1">{course.User.Name}</p>
                                </div>
                                <Link
                                    to={`/course/${course.Course_ID}`}
                                    className="flex flex-col justify-between p-4 pt-1 card-body"
                                >
                                    <h2 className="card-title">{course.Name}</h2>
                                    <div className="justify-end card-actions">
                                        <button className="mt-4 btn btn-primary">Chi tiết</button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="m-6 justify-self-center join">
                        <button className="join-item btn">«</button>
                        <button className="join-item btn">Trang 1</button>
                        <button className="join-item btn">»</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Course;
