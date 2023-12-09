import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import service from '../services/course.service';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await service.getCourses();
            setCourses(res.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="grid items-center gap-4 m-8 w-fit sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                        <div key={course.Course_ID} className="h-full border shadow-xl card bg-base-100">
                            <Link to={`/course/${course.Course_ID}`} className="w-full p-3 border rounded-lg">
                                <img className="object-cover w-full rounded-lg h-52" src={course.Image} alt={course.Name} />
                            </Link>
                            <div className="mx-4 my-2">
                                <img
                                    className="inline-block object-fill h-6 max-w-full mr-3"
                                    src={course.User.Avatar}
                                    alt="organization"
                                />
                                <p className="inline-block translate-y-1">{course.User.Name}</p>
                            </div>
                            <Link to={`/course/${course.Course_ID}`} className="flex flex-col justify-between p-4 pt-1 card-body">
                                <h2 className="card-title">{course.Name}</h2>
                                <div className="justify-end card-actions">
                                    <button className="mt-4 btn btn-primary">Chi tiết</button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default CourseManager;
