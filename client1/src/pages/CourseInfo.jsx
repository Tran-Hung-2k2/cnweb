import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import WeekInfo from './WeekInfo';
import BackButton from '../components/BackButton';
import action from '../redux/course/course.action';

const CourseManager = () => {
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            action.setCourse(id, (course) => {
                if (course.User_ID == user.User_ID) setOwner(true);
                setLoading(false);
            }),
        );
    }, []);

    return (
        <>
            <BackButton className="ml-8" />
            {loading ? (
                <Loader />
            ) : (
                <div className="m-6">
                    <div>
                        <img
                            className="inline-block object-fill h-20 max-w-full mb-6 mr-4"
                            src={course.User.Avatar}
                            alt="organization"
                        />
                        <h3 className="inline-block text-2xl">{course.User.Name}</h3>
                    </div>
                    <div className="mb-4">
                        <h2 className="mb-1 text-2xl font-bold">{course ? course.Name : 'Course Name'}</h2>
                        <p className="text-lg">{course.Description}</p>
                    </div>
                    <WeekInfo {...{ course, owner }} />
                </div>
            )}
        </>
    );
};

export default CourseManager;
