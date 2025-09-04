import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ton backend tourne ici
  headers: { 'Content-Type': 'application/json' }
});

export default api;
