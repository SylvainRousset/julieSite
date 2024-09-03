import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.scss';

function Footer() {
  return (
    <footer id= "contact" className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h2 className="footer__title">Contact</h2>
          <address className="footer__address">
            <p>Julie Pâtisserie</p>
            <p>123 Rue des Gâteaux</p>
            <p>31000 Toulouse, France</p>
            <p>Tél : <a href="tel:+33123456789">01 23 45 67 89</a></p>
            <p>Email : <a href="mailto:contact@julie-patisserie.com">contact@julie-patisserie.com</a></p>
          </address>
        </div>
        
        <div className="footer__section">
          <h2 className="footer__title">Liens rapides</h2>
          <nav className="footer__nav">
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/produits">Nos Produits</Link></li>
              <li><Link to="/a-propos">À Propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
        
        <div className="footer__section">
          <h2 className="footer__title">Suivez-nous</h2>
          <div className="footer__social">
            <a href="https://facebook.com/julie-patisserie" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/julie-patisserie" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            {/* Nous gardons Twitter comme vous l'avez inclus */}
            <a href="https://twitter.com/julie-patisserie" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; 2024 Julie Pâtisserie. Tous droits réservés.</p>
        <nav>
          <Link to="/mentions-legales">Mentions Légales</Link> | 
          <Link to="/politique-de-confidentialite">Politique de Confidentialité</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;