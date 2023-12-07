import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import courseService from '../services/course.service';
import notify from '../utils/notify';
import Loader from '../components/Loader';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await courseService.getCourses();
                setCourses(res.data);
                setLoading(false);
            } catch (error) {
                notify(error.response.data.details.body[0].message, 'error');
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 gap-4 m-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                        <div key={course.Course_ID} className="border shadow-xl card bg-base-100">
                            <Link to={`/course/${course.Course_ID}`} className="w-full p-3 border rounded-lg">
                                <img className="object-contain w-full h-48" src={course.Image} alt={course.Name} />
                            </Link>
                            <div className="mx-4">
                                <img
                                    className="inline-block object-fill h-6 max-w-full mr-3"
                                    src={course.User.Avatar}
                                    alt="organization"
                                />
                                <p className="inline-block translate-y-1">{course.User.Name}</p>
                            </div>
                            <Link to={`/course/${course.Course_ID}`} className="p-4 pt-1 card-body">
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
