import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/PastryCarousel.scss';
import PastryModal from './PastryModal'; // Import de la modal

function PastryCarousel({ pastries }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPastry, setSelectedPastry] = useState(null);

  const settings = {
    dots: true,
    infinite: pastries.length > 1,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    touchMove: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = (pastry) => {
    setSelectedPastry(pastry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPastry(null);
    setIsModalOpen(false);
  };

  return (
    <div className="pastry-carousel">
      <Slider {...settings}>
        {pastries.map((pastry, index) => (
          <div key={index} className="pastry-item" onClick={() => openModal(pastry)}>
            <img src={pastry.image_url} alt={pastry.title} />
            <h3>{pastry.title}</h3>
            <p>{pastry.price !== undefined ? pastry.price.toFixed(2) : "Prix non disponible"} €</p>
          </div>
        ))}
      </Slider>

      {/* Modal pour afficher les détails du dessert */}
      <PastryModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedPastry={selectedPastry}
      />
    </div>
  );
}

export default PastryCarousel;
