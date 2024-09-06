import React from 'react';
import '../Styles/Presentation.scss'; // Assurez-vous d'avoir le fichier de style

import portrait from '../assets/portrait_presentation.png'; // Remplacez par le chemin correct vers l'image de portrait

const Presentation = () => {
  return (
    <div className="presentation">
      <div className="presentation__image">
        <img src={portrait} alt="Portrait de la pâtissière" />
      </div>
      <div className="presentation__text">
        <h2>À propos de notre pâtisserie</h2>
        <p>
          Bienvenue chez Julie Pâtisserie, où chaque création est faite maison avec des ingrédients locaux de haute qualité. 
          Notre chef pâtissière, avec plus de 10 ans d'expérience dans diverses maisons renommées, vous propose une gamme 
          délicieuse de pâtisseries artisanales, alliant tradition et modernité. Que ce soit pour une occasion spéciale ou pour 
          se faire plaisir, nos produits sont préparés avec amour et passion, tout en respectant les savoir-faire locaux.
        </p>
        <p>
          Venez découvrir nos pâtisseries gourmandes et faites l'expérience du goût authentique, élaboré avec soin par une pâtissière
          dévouée à son art depuis plus d'une décennie.
        </p>
      </div>
    </div>
  );
};

export default Presentation;
