import React, { useEffect, useState } from 'react';
import RealisationsList from './RealisationsList';
import { getRealisations } from './services/api';

function Realisations() {
  const [realisations, setRealisations] = useState([]);

  useEffect(() => {
    const loadRealisations = async () => {
      try {
        const data = await getRealisations();
        setRealisations(data);
      } catch (err) {
        console.error('Erreur chargement réalisations', err);
      }
    };
    loadRealisations();
  }, []);

  return (
    <div className="container section">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="title">Réalisations</h2>
        </div>
      </div>
      <RealisationsList realisations={realisations} />
    </div>
  );
}

export default Realisations;
