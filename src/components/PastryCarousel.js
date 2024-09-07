import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/PastryCarousel.scss';
import PastryModal from './PastryModal'; // Import de la modal

function PastryCarousel({ pastries }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPastry, setSelectedPastry] = useState(null);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Coordonnées de départ du clic

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
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

  // Enregistrer la position de la souris/touch au début de l'interaction
  const handleMouseDownOrTouchStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setStartPosition({ x, y });
  };

  // Comparer la position de la souris/touch au moment de la fin pour voir si c'est un glissement ou un clic
  const handleMouseUpOrTouchEnd = (e, pastry) => {
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    const deltaX = Math.abs(x - startPosition.x);
    const deltaY = Math.abs(y - startPosition.y);

    // Seuil pour différencier un glissement d'un clic (ajustez ce seuil si nécessaire)
    if (deltaX < 5 && deltaY < 5) {
      openModal(pastry);
    }
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
          <div
            key={index}
            className="pastry-item"
            onMouseDown={handleMouseDownOrTouchStart}
            onMouseUp={(e) => handleMouseUpOrTouchEnd(e, pastry)}
            onTouchStart={handleMouseDownOrTouchStart} // Pour les appareils tactiles
            onTouchEnd={(e) => handleMouseUpOrTouchEnd(e, pastry)} // Pour les appareils tactiles
          >
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
