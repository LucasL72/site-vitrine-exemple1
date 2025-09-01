import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function NavBar({ token, onLogout }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" height="40" />
        </Link>
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/realisations">
              Réalisations
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/apropos">
              À propos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <div className="form-check form-switch me-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              🌙
            </label>
          </div>
          {token ? (
            <button className="btn btn-outline-danger" onClick={onLogout}>
              Déconnexion
            </button>
          ) : (
            <Link className="btn btn-outline-primary" to="/admin/login">
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
