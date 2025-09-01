import React, { useEffect, useState } from 'react';

const emptyForm = { title: '', content: '', image: '', date: '' };

function RealisationForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        date: initialData.date ? initialData.date.slice(0, 10) : ''
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="realisation-form">
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Contenu"
        value={form.content}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="URL de l'image"
        value={form.image}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Enregistrer</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      )}
    </form>
  );
}

export default RealisationForm;
