import React from 'react';
import Modal from 'react-modal';
import '../Styles/PastryModal.scss';

const PastryModal = ({ isOpen, onRequestClose, selectedPastry }) => {
  if (!selectedPastry) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="pastry-modal"
      overlayClassName="pastry-modal-overlay"
    >
      <div className="modal-content">
        <img src={selectedPastry.image_url} alt={selectedPastry.title} className="modal-image" />
        <h2>{selectedPastry.title}</h2>
        <div className="modal-ingredients">
          <h3>Ingrédients</h3>
          <ul>
            {selectedPastry.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <button onClick={onRequestClose} className="modal-close-btn">Fermer</button>
      </div>
    </Modal>
  );
};

export default PastryModal;
