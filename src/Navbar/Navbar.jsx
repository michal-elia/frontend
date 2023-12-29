import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  const currentPath = window.location.pathname;

  return (
    <div className='navbar'>
      <div className='logo-container'>
        {/* Hier kannst du dein Logo einfügen */}
      </div>

      <div className='links'>
        <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/fotos" className={`nav-link ${currentPath === '/fotos' ? 'active' : ''}`}>
          Fotos
        </Link>
        <Link to="/infos" className={`nav-link ${currentPath === '/infos' ? 'active' : ''}`}>
          Infos
        </Link>
        <Link to="/login" className={`nav-link ${currentPath === '/login' ? 'active' : ''}`}>
          Login
        </Link>
        {/* Füge hier weitere Links hinzu, falls nötig */}
      </div>
    </div>
  );
}

export default Navbar;
