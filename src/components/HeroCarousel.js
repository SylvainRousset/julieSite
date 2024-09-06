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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,  // Désactiver les flèches de navigation
    pauseOnHover: false,  // Désactiver la pause lors du survol de la souris
    pauseOnFocus: false,  // Désactiver la pause lors du focus (comme un clic)
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
