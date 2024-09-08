import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Importer Swiper et SwiperSlide
import { Navigation, Pagination } from 'swiper/modules'; // Importer les modules Navigation et Pagination
import 'swiper/css'; // Importation des styles de base
import 'swiper/css/navigation'; // Importation des styles pour la navigation
import 'swiper/css/pagination'; // Importation des styles pour la pagination
import '../Styles/PastryCarousel.scss'; // Vos styles personnalisés
import PastryModal from './PastryModal'; // Importer la modal

function PastryCarousel({ pastries }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPastry, setSelectedPastry] = useState(null);

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
      <Swiper
        modules={[Pagination]} // Ajouter la pagination et la navigation comme modules
        spaceBetween={10} // Espace entre les slides
        slidesPerView={1} // Nombre de slides visibles en même temps
        breakpoints={{
        
          340: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1424: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          2000: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        
        
        pagination={{ clickable: true }} // Ajouter une pagination cliquable
       
      >
        {pastries.map((pastry, index) => (
          <SwiperSlide key={index} onClick={() => openModal(pastry)}>
            <div className="pastry-item">
              <img src={pastry.image_url} alt={pastry.title} />
              <h3>{pastry.title}</h3>
              <p>{pastry.price !== undefined ? pastry.price.toFixed(2) : "Prix non disponible"} €</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
