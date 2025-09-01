import React from 'react';

function RealisationsList({ realisations, onEdit, onDelete }) {
  if (!realisations.length) {
    return <p className="text-center">Aucune réalisation trouvée.</p>;
  }

  return (
    <div className="responsive-grid">
      {realisations.map((realisation) => (
        <div key={realisation.id} className="p-3 h-100 border text-center">
          <h3 className="h5 mb-2">{realisation.title}</h3>
          <p className="mb-2">{realisation.content}</p>
          {realisation.image && (
            <img
              src={realisation.image}
              alt={realisation.title}
              className="img-fluid mb-2"
            />
          )}
          <p className="mb-2">
            {realisation.date ? new Date(realisation.date).toLocaleDateString() : ''}
          </p>
          {onEdit && (
            <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(realisation)}>
              Modifier
            </button>
          )}
          {onDelete && (
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(realisation.id)}>
              Supprimer
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default RealisationsList;
