import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import label from '../constants/label';
import Loader from '../components/Loader';
import ButtonBack from '../components/ButtonBack';
import service from '../services/lesson.service';

const Lesson = () => {
    const [lesson, setLesson] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await service.getLesson({ Lesson_ID: id });
            setLesson(res.data[0]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            <ButtonBack className="ml-6" />
            {loading ? (
                <Loader />
            ) : (
                <div className="w-4/5 m-6">
                    <h2 className="text-3xl font-bold mb-14">{lesson.Title}</h2>
                    {lesson.Type == label.lesson_type.READING ? (
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: lesson.Content }} />
                        </div>
                    ) : (
                        <video id="uploadedVideo" src={lesson.Content} controls></video>
                    )}
                    {user.Role == 'student' && (
                        <button className="btn btn-wide mt-14 btn-primary">Đánh dấu đã hoàn thành</button>
                    )}
                </div>
            )}
        </>
    );
};

export default Lesson;
