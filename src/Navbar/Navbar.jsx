// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  const currentPath = window.location.pathname;
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  return (
    <div className={`navbar ${burgerMenuActive ? 'burger-menu-active' : ''}`}>
      <div className='logo-container'>
        {/* Hier kannst du dein Logo einfügen */}
      </div>

      <div className={`links ${burgerMenuActive ? 'burger-menu-active' : ''}`}>
        <Link
          to="/"
          className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
          onClick={() => setBurgerMenuActive(false)}
        >
          Home
        </Link>
        <Link
          to="/fotos"
          className={`nav-link ${currentPath === '/fotos' ? 'active' : ''}`}
          onClick={() => setBurgerMenuActive(false)}
        >
          Fotos
        </Link>
        <Link
          to="/infos"
          className={`nav-link ${currentPath === '/infos' ? 'active' : ''}`}
          onClick={() => setBurgerMenuActive(false)}
        >
          Infos
        </Link>
        <Link
          to="/wunschliste"
          className={`nav-link ${currentPath === '/wunschliste' ? 'active' : ''}`}
          onClick={() => setBurgerMenuActive(false)}
        >
          Wunschliste
        </Link>
        <Link
          to="/login"
          className={`nav-link ${currentPath === '/login' ? 'active' : ''}`}
          onClick={() => setBurgerMenuActive(false)}
        >
          Login
        </Link>
        {/* Füge hier weitere Links hinzu, falls nötig */}
      </div>

      <div className={`burger-menu ${burgerMenuActive ? 'active' : ''}`} onClick={toggleBurgerMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Navbar;
