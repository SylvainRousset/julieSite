import React from 'react';
import { HashLink } from 'react-router-hash-link';
import '../Styles/Header.scss';
import logo from '../assets/logo5.png';

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <img src={logo} alt="Julie Pâtisserie" className="header__logo-img" />
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li><HashLink smooth to="/#pastries" className="header__nav-link">Pâtisserie</HashLink></li>
            <li><HashLink smooth to="/#party" className="header__nav-link">Pièce Montée</HashLink></li>
            <li><HashLink smooth to="/#contact" className="header__nav-link">Contact</HashLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
