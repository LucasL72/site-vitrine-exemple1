import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './services/api';

function AdminLogin({ onLogin }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email: loginEmail, password });
      localStorage.setItem('token', data.token);
      onLogin && onLogin(data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur connexion', err);
    }
  };

  return (
    <div className="section">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2 className="title">Connexion Admin</h2>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-custom">Se connecter</button>
      </form>
    </div>
  );
}

export default AdminLogin;
