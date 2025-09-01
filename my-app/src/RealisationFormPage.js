import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RealisationForm from './RealisationForm';
import { getRealisation, saveRealisation } from './services/api';

function RealisationFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      const load = async () => {
        try {
          const data = await getRealisation(id, token);
          setInitialData(data);
        } catch (err) {
          console.error('Erreur chargement réalisation', err);
        }
      };
      load();
    }
  }, [id, token]);

  const handleSubmit = async (realisation) => {
    try {
      await saveRealisation(realisation, token, id);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur sauvegarde réalisation', err);
    }
  };

  return (
    <div className="section">
      <h2 className="title">{id ? 'Modifier' : 'Ajouter'} une réalisation</h2>
      <RealisationForm
        onSubmit={handleSubmit}
        initialData={initialData}
        onCancel={() => navigate('/dashboard')}
      />
    </div>
  );
}

export default RealisationFormPage;
