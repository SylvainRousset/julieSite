// src/components/HeroCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/HeroCarousel.scss'; // Assurez-vous de créer ce fichier CSS pour le style

function HeroCarousel({ slides }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,  // Désactiver les flèches de navigation
  };

  return (
    <div className="hero-carousel">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="hero-slide">
            <div className="hero-image">
              <img src={slide.src} alt={slide.alt} />
            </div>
            <div className="hero-text-container">
              <div className="hero-text">
                <h2 className="hero-title">{slide.title1}</h2>
                <h3 className="hero-subtitle">{slide.title2}</h3>
                <p className="hero-description">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroCarousel;
