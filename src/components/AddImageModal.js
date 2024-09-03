// src/components/AddImageModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../Styles/AddImageModal.scss';

Modal.setAppElement('#root');

function AddImageModal({ isOpen, onRequestClose, onSave }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSave({ title, price, image });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ajouter une nouvelle pâtisserie"
      className="add-image-modal"
      overlayClassName="add-image-modal-overlay"
    >
      <button className="close-modal-btn" onClick={onRequestClose}>
        <FaTimes />
      </button>
      <h2>Ajouter une nouvelle pâtisserie</h2>
      <div className="image-upload">
        <label htmlFor="image-upload-input">
          <FaPlus className="image-upload-icon" />
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
        {previewUrl && <img src={previewUrl} alt="Prévisualisation" className="image-preview" />}
      </div>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="save-btn" onClick={handleSubmit}>
        Enregistrer
      </button>
    </Modal>
  );
}

export default AddImageModal;
