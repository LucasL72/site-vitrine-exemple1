import React, { useEffect, useState } from 'react';
import RealisationsList from './RealisationsList';
import RealisationForm from './RealisationForm';

const API_URL = 'http://localhost:5000/realisations';

function Realisations() {
  const [realisations, setRealisations] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadRealisations = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRealisations(data);
    } catch (err) {
      console.error('Erreur chargement réalisations', err);
    }
  };

  useEffect(() => {
    loadRealisations();
  }, []);

  const handleSubmit = async (realisation) => {
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `${API_URL}/${editing.id}` : API_URL;
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(realisation),
      });
      setEditing(null);
      loadRealisations();
    } catch (err) {
      console.error('Erreur sauvegarde réalisation', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      loadRealisations();
    } catch (err) {
      console.error('Erreur suppression réalisation', err);
    }
  };

  return (
    <div>
      <h2>Réalisations</h2>
      <RealisationForm
        onSubmit={handleSubmit}
        initialData={editing}
        onCancel={() => setEditing(null)}
      />
      <RealisationsList
        realisations={realisations}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Realisations;
