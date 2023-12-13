import { NavLink } from 'react-router-dom';
import Carousel from '../components/Carousel';
import CardSlider from '../components/CardSlider';

const imgs = [
    'https://www.classcentral.com/report/wp-content/uploads/2021/02/coursera-free-courses.png',
    'https://d540vms5r2s2d.cloudfront.net/mad/uploads/mad_64c39d1950a341690541337.png',
    'https://assets.bitdegree.org/online-learning-platforms/storage/media/coursera-5f7af3e87ac15.o.jpg',
    'https://i.insider.com/60ad2757a412370019d31d41?width=1136&format=jpeg',
];

const cards = [
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    {
        title: 'Shoes!',
        image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        description: 'If a dog chews shoes whose shoes does he choose?',
    },
    // Add more cards as needed
];

const Home = () => {
    return (
        <div className="flex flex-col gap-20 mx-20 my-10">
            <div className="hero">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <img
                        src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=2&w=459&h=497&q=40 2x, https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=3&w=459&h=497&q=40 3x"
                        className="rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Khám phá kiến thức không giới hạn</h1>
                        <p className="py-6">
                            Bắt đầu, chuyển đổi, hoặc phát triển sự nghiệp của bạn với hơn 5,800 khóa học, Chứng chỉ
                            Chuyên Nghiệp, và bằng cấp từ những trường đại học và công ty hàng đầu trên thế giới.
                        </p>
                        <NavLink to="/signup" className="btn btn-primary">
                            Bắt đầu ngay
                        </NavLink>
                    </div>
                </div>
            </div>
            <Carousel slides={imgs} interval={2000} />
            <div>
                <h2 className="mb-4 text-3xl font-bold">Bắt đầu học ngay hôm nay</h2>
                <CardSlider cards={cards} />
            </div>
        </div>
    );
};

export default Home;
