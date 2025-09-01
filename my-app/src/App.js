import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Services from './Services';
import Realisations from './Realisations';
import APropos from './APropos';
import Contact from './pages/Contact';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import RealisationFormPage from './RealisationFormPage';
import NavBar from './components/NavBar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <NavBar token={token} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<div>Bienvenue sur notre site</div>} />
          <Route path="/services" element={<Services />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/apropos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/dashboard/new"
            element={token ? <RealisationFormPage /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/dashboard/edit/:id"
            element={token ? <RealisationFormPage /> : <Navigate to="/admin/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
