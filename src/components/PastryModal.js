import React from 'react';
import Modal from 'react-modal';
import '../Styles/PastryModal.scss'; // Assurez-vous d'avoir un fichier de styles pour la modal

Modal.setAppElement('#root');

function PastryModal({ isOpen, onRequestClose, selectedPastry }) {
  if (!selectedPastry) return null; // Si aucune pâtisserie n'est sélectionnée, ne rien afficher

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Détails de la pâtisserie"
      className="pastry-modal"
      overlayClassName="pastry-modal-overlay"
    >
      <button className="close-modal-btn" onClick={onRequestClose}>
        &times; {/* Bouton de fermeture */}
      </button>

      <h2 className="modal-title">{selectedPastry.title}</h2>
      <div className="separator"></div>
      <div className="modal-content">
        {/* Section Image */}
        <div className="image-container">
          <img src={selectedPastry.image_url} alt={selectedPastry.title} />
        </div>

        {/* Section Détails avec Titre des ingrédients et Liste */}
        <div className="details-container">
          <h3 className="ingredients-title">Ingrédients</h3>
          <table className="details-table">
            <tbody>
              <tr>
                <td>
                  <ul>
                    {selectedPastry.ingredients && selectedPastry.ingredients.length > 0 ? (
                      selectedPastry.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))
                    ) : (
                      <li>Aucun ingrédient disponible</li>
                    )}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}

export default PastryModal;
