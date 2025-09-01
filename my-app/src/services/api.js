const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Erreur API');
    }
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const login = (credentials) =>
  apiFetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

export const getRealisations = (token) =>
  apiFetch('/realisations', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

export const getRealisation = (id, token) =>
  apiFetch(`/realisations/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

export const saveRealisation = (realisation, token, id) =>
  apiFetch(id ? `/realisations/${id}` : '/realisations', {
    method: id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(realisation)
  });

export const deleteRealisation = (id, token) =>
  apiFetch(`/realisations/${id}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

export const sendContact = (payload) =>
  apiFetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

export default {
  login,
  getRealisations,
  getRealisation,
  saveRealisation,
  deleteRealisation,
  sendContact
};
