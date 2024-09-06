import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../Styles/AddImageModal.scss';

Modal.setAppElement('#root');

function AddImageModal({ isOpen, onRequestClose, onSave }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ingredients, setIngredients] = useState(['']); // Pour les ingrédients
 
 
  // Réinitialiser les champs lorsque la modal est fermée
 useEffect(() => {
  if (!isOpen) {
    setTitle('');
    setPrice('');
    setImage(null);
    setPreviewUrl(null);
    setIngredients(['']);
  }
}, [isOpen]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Gérer les changements dans les champs d'ingrédients
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Ajouter un champ d'ingrédients
  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  // Supprimer un champ d'ingrédients
  const removeIngredientField = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = () => {
    const filteredIngredients = ingredients.filter((ing) => ing !== ''); // Ne garder que les ingrédients non vides
    onSave({ title, price, image, ingredients: filteredIngredients });
     // Réinitialiser les champs après l'ajout
     setTitle('');
     setPrice('');
     setImage(null);
     setPreviewUrl(null);
     setIngredients(['']);
 
     onRequestClose(); // Fermer la modal après l'ajout
    
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

      {/* Gestion dynamique des ingrédients */}
      <h3>Ingrédients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder={`Ingrédient ${index + 1}`}
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            required
          />
          {ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => removeIngredientField(index)}
              style={{ marginLeft: '0.5rem', backgroundColor: 'red', color: 'white' }}
            >
              <FaTimes />
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addIngredientField} style={{ marginBottom: '1rem' }}>
        Ajouter un ingrédient
      </button>

      <button className="save-btn" onClick={handleSubmit}>
        Enregistrer
      </button>
    </Modal>
  );
}

export default AddImageModal;
