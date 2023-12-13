import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CardSlider = ({ cards }) => {
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute z-10 text-2xl -translate-y-1/2 text-neutral-200 top-1/2 left-4 focus:outline-none"
            >
                {'❮'}
            </button>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute text-2xl -translate-y-1/2 text-neutral-200 top-1/2 right-4 focus:outline-none"
            >
                {'❯'}
            </button>
        );
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {cards.map((card, index) => (
                <div key={index} className="px-2">
                    <div className="relative w-full shadow-xl card bg-base-100">
                        <figure>
                            <img src={card.image} alt={card.title} className="object-cover w-full h-48" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {card.title}
                                <div className="text-white badge badge-success">MỚI</div>
                            </h2>
                            <p>{card.description}</p>
                            <div className="justify-end card-actions">
                                <div className="badge badge-outline">Fashion</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default CardSlider;
