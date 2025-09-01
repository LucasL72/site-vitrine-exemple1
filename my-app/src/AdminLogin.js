import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = 'http://localhost:5000/login';

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      onLogin && onLogin(data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur connexion', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">
      <h2>Connexion Admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default AdminLogin;
