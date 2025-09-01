import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RealisationsList from './RealisationsList';

const API_URL = 'http://localhost:5000/realisations';

function Dashboard() {
  const [realisations, setRealisations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const loadRealisations = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setRealisations(data);
    } catch (err) {
      console.error('Erreur chargement réalisations', err);
    }
  };

  useEffect(() => {
    loadRealisations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadRealisations();
    } catch (err) {
      console.error('Erreur suppression réalisation', err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/dashboard/new')}>Ajouter une réalisation</button>
      <RealisationsList
        realisations={realisations}
        onEdit={(r) => navigate(`/dashboard/edit/${r.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
