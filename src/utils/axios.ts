import axios from 'axios';
// https://bpanetapi.vercel.app   http://localhost:5000
const api = axios.create({
  baseURL: 'https://bpanetapi.vercel.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
