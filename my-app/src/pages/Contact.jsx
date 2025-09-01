import React, { useState } from 'react';
import { sendContact } from '../services/api';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContact({ name, email, message });

      setNotification({ type: 'success', text: 'Votre message a été envoyé.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setNotification({ type: 'danger', text: "Une erreur s'est produite. Veuillez réessayer." });
    }
  };

  return (
    <div className="container mt-4 section">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h2 className="title">Contact</h2>
        </div>
      </div>
      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.text}
        </div>
      )}
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control mb-3"
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <button type="submit" className="btn-custom">Envoyer</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

