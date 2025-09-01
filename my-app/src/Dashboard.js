import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RealisationsList from './RealisationsList';
import { getRealisations, deleteRealisation } from './services/api';

function Dashboard() {
  const [realisations, setRealisations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const loadRealisations = async () => {
    try {
      const data = await getRealisations(token);
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
      await deleteRealisation(id, token);
      loadRealisations();
    } catch (err) {
      console.error('Erreur suppression réalisation', err);
    }
  };

  return (
    <div className="section">
      <h2 className="title">Dashboard</h2>
      <button className="btn-custom" onClick={() => navigate('/dashboard/new')}>
        Ajouter une réalisation
      </button>
      <RealisationsList
        realisations={realisations}
        onEdit={(r) => navigate(`/dashboard/edit/${r.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
