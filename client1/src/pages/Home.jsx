import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Carousel from '../components/Carousel';
import CardSlider from '../components/CardSlider';
import Loader from '../components/Loader';
import service from '../services/course.service';
import Hero from '../components/Hero';

const imgs = [
    'https://www.classcentral.com/report/wp-content/uploads/2021/02/coursera-free-courses.png',
    'https://d540vms5r2s2d.cloudfront.net/mad/uploads/mad_64c39d1950a341690541337.png',
    'https://assets.bitdegree.org/online-learning-platforms/storage/media/coursera-5f7af3e87ac15.o.jpg',
    'https://i.insider.com/60ad2757a412370019d31d41?width=1136&format=jpeg',
    'https://149357281.v2.pressablecdn.com/wp-content/uploads/2021/06/Coursera-Plus-evergreen-animated.gif',
    'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F300899909%2F704280774553%2F1%2Foriginal.20220610-160403?w=1000&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=67b888953fa1eb9e54e9726d0a9a4b73',
];

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getCourses({});
            const sortedCourses = _.orderBy(res.data, 'createdAt', 'desc');
            setCourses(sortedCourses);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-40 mx-20 my-10">
            <Hero />
            <Carousel slides={imgs} interval={2000} />
            <div className="flex flex-col gap-10">
                <h2 className="mb-4 text-3xl font-bold">Bắt đầu học ngay hôm nay</h2>
                {loading ? <Loader /> : <CardSlider cards={courses} />}
                <NavLink to="/course" className="m-auto btn btn-wide btn-outline btn-primary">
                    Xem tất cả
                </NavLink>
            </div>
        </div>
    );
};

export default Home;
