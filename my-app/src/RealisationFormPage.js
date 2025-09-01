import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RealisationForm from './RealisationForm';

const API_URL = 'http://localhost:5000/realisations';

function RealisationFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      const load = async () => {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
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
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_URL}/${id}` : API_URL;
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(realisation)
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur sauvegarde réalisation', err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Modifier' : 'Ajouter'} une réalisation</h2>
      <RealisationForm
        onSubmit={handleSubmit}
        initialData={initialData}
        onCancel={() => navigate('/dashboard')}
      />
    </div>
  );
}

export default RealisationFormPage;
