// src/components/EditModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';
import AddImageModal from './AddImageModal';
import '../Styles/EditModal.scss';

Modal.setAppElement('#root');

function EditModal({ isOpen, onRequestClose, pastries, onDelete, onAdd }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSave = (newPastry) => {
    onAdd(newPastry);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modifier les images"
        className="edit-modal"
        overlayClassName="edit-modal-overlay"
      >
        <button className="close-modal-btn" onClick={onRequestClose}>
          <FaTimes />
        </button>
        <h2>Modifier les images</h2>
        <div className="images-grid">
          {pastries.map((pastry, index) => (
            <div key={index} className="image-item">
              <img src={pastry.image_url} alt={pastry.title} />
              <button
                className="delete-button"
                onClick={() => onDelete(pastry.id, pastry.image_url)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>Ajouter</button>
      </Modal>

      <AddImageModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

export default EditModal;
