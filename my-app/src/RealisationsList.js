import React from 'react';

function RealisationsList({ realisations, onEdit, onDelete }) {
  if (!realisations.length) {
    return <p>Aucune réalisation trouvée.</p>;
  }

  return (
    <div>
      {realisations.map((realisation) => (
        <div key={realisation.id} className="realisation-item">
          <h3>{realisation.title}</h3>
          <p>{realisation.content}</p>
          {realisation.image && (
            <img src={realisation.image} alt={realisation.title} width="200" />
          )}
          <p>{realisation.date ? new Date(realisation.date).toLocaleDateString() : ''}</p>
          {onEdit && (
            <button onClick={() => onEdit(realisation)}>Modifier</button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(realisation.id)}>Supprimer</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default RealisationsList;
