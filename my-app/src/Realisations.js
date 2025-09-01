import React, { useEffect, useState } from 'react';
import RealisationsList from './RealisationsList';
import RealisationForm from './RealisationForm';
import {
  getRealisations,
  saveRealisation,
  deleteRealisation
} from './services/api';

function Realisations() {
  const [realisations, setRealisations] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadRealisations = async () => {
    try {
      const data = await getRealisations();
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
      await saveRealisation(realisation, null, editing && editing.id);
      setEditing(null);
      loadRealisations();
    } catch (err) {
      console.error('Erreur sauvegarde réalisation', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRealisation(id);
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
