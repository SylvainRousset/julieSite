// src/components/PastryCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/PastryCarousel.scss';

function PastryCarousel({ pastries }) {
  const settings = {
    dots: true,
    infinite: pastries.length > 1,  // Désactiver le mode infini s'il n'y a qu'une image
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="pastry-carousel">
      <Slider {...settings}>
        {pastries.map((pastry, index) => (
          <div key={index} className="pastry-item">
            <img src={pastry.image_url} alt={pastry.title} />
            <h3>{pastry.title}</h3>
            <p>{pastry.price !== undefined ? pastry.price.toFixed(2) : "Prix non disponible"} €</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PastryCarousel;
