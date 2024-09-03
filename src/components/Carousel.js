// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/Carousel.scss';

function Carousel({ slides }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,       // Désactive les flèches de navigation
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className="image-container">
              <img src={slide.src} alt={slide.title1 || slide.title} />
            </div>
            <div className="caption">
              {slide.title1 && <h2 className="title1">{slide.title1}</h2>}
              {slide.title2 && <h3 className="title2">{slide.title2}</h3>}
              {slide.title && <h2 className="title">{slide.title}</h2>}
              {slide.description && <p>{slide.description}</p>}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;