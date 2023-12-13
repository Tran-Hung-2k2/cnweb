import React, { useState, useEffect } from 'react';

const Carousel = ({ slides, interval = 3000, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, interval);

        return () => clearInterval(timer);
    }, [currentIndex, interval, slides.length]);

    return (
        <div className={`w-full carousel ${className}`}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    id={`slide${index + 1}`}
                    className={`carousel-item relative w-full ${index === currentIndex ? '' : 'hidden'}`}
                >
                    <img src={slide} className="object-contain w-full max-h-96" alt={`Slide ${index + 1}`} />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                            href={`#slide${index === 0 ? slides.length : index}`}
                            className="btn btn-circle"
                            onClick={prevSlide}
                        >
                            ❮
                        </a>
                        <a
                            href={`#slide${index === slides.length - 1 ? 1 : index + 2}`}
                            className="btn btn-circle"
                            onClick={nextSlide}
                        >
                            ❯
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousel;
